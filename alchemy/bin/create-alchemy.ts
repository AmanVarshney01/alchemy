import {
  cancel,
  confirm,
  intro,
  isCancel,
  log,
  outro,
  select,
  spinner,
  text,
} from "@clack/prompts";
import { existsSync } from "node:fs";
import * as fs from "node:fs/promises";
import { join, resolve } from "node:path";
import pc from "picocolors";
import { templates } from "./templates/index.ts";
import type { CreateInput, ProjectContext, TemplateType } from "./types.ts";
import { ProjectNameSchema } from "./types.ts";
import { detectPackageManager } from "./utils.ts";

const isTest = process.env.NODE_ENV === "test";

async function createProjectContext(
  cliOptions: CreateInput,
): Promise<ProjectContext> {
  const detectedPm = detectPackageManager();
  const options = { yes: isTest, ...cliOptions };

  let name: string;
  if (options.name) {
    const result = ProjectNameSchema.safeParse(options.name);
    if (!result.success) {
      throw new Error(
        `Invalid project name: ${result.error.errors[0]?.message}`,
      );
    }
    name = options.name;
    log.info(`Using project name: ${pc.yellow(name)}`);
  } else {
    const nameResult = await text({
      message: "What is your project name?",
      placeholder: "my-alchemy-app",
      validate: (value) => {
        const result = ProjectNameSchema.safeParse(value);
        return result.success ? undefined : result.error.errors[0]?.message;
      },
    });

    if (isCancel(nameResult)) {
      cancel(pc.red("Operation cancelled."));
      process.exit(0);
    }

    name = nameResult;
  }

  let selectedTemplate: TemplateType;
  if (options.template) {
    selectedTemplate = options.template;
    log.info(`Using template: ${pc.yellow(selectedTemplate)}`);
  } else {
    const templateResult = await select({
      message: "Which template would you like to use?",
      options: templates.map((t) => ({
        label: t.description,
        value: t.name as TemplateType,
      })),
    });

    if (isCancel(templateResult)) {
      cancel(pc.red("Operation cancelled."));
      process.exit(0);
    }

    selectedTemplate = templateResult;
  }

  const templateDefinition = templates.find((t) => t.name === selectedTemplate);
  if (!templateDefinition) {
    throw new Error(
      `Template '${pc.yellow(selectedTemplate)}' not found. Available templates: ${templates.map((t) => pc.cyan(t.name)).join(", ")}`,
    );
  }

  const path = resolve(process.cwd(), name);
  const packageManager = options.packageManager || detectedPm;

  return {
    name,
    path,
    template: selectedTemplate,
    packageManager,
    alchemyVersion: `alchemy${isTest ? "@file:../../alchemy" : ""}`,
    isTest,
    options,
  };
}

async function handleDirectoryOverwrite(
  context: ProjectContext,
): Promise<void> {
  if (!existsSync(context.path)) {
    return;
  }

  let shouldOverwrite = false;

  if (context.options.overwrite) {
    shouldOverwrite = true;
    log.warn(
      `Directory ${pc.yellow(context.name)} already exists. Overwriting due to ${pc.cyan("--overwrite")} flag.`,
    );
  } else {
    const overwriteResult = await confirm({
      message: `Directory ${pc.yellow(context.name)} already exists. Overwrite?`,
      initialValue: false,
    });

    if (isCancel(overwriteResult)) {
      cancel(pc.red("Operation cancelled."));
      process.exit(0);
    }

    shouldOverwrite = overwriteResult;
  }

  if (!shouldOverwrite) {
    cancel(pc.red("Operation cancelled."));
    process.exit(0);
  }

  const s = spinner();
  s.start(`Removing existing directory: ${pc.yellow(context.path)}`);
  try {
    await fs.rm(context.path, { recursive: true, force: true });
    s.stop(`Directory ${pc.yellow(context.path)} removed.`);
  } catch (error) {
    s.stop(pc.red(`Failed to remove directory ${pc.yellow(context.path)}.`));
    const errorMsg = error instanceof Error ? error.message : String(error);
    throw new Error(`Directory removal failed: ${errorMsg}`);
  }
}

async function initializeTemplate(context: ProjectContext): Promise<void> {
  const templateDefinition = templates.find((t) => t.name === context.template);
  if (!templateDefinition) {
    throw new Error(`Template definition not found for: ${context.template}`);
  }

  log.step(
    `Creating ${pc.cyan(context.template)} project in ${pc.yellow(context.path)}...`,
  );

  try {
    await templateDefinition.init(context);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Template initialization failed for '${context.template}': ${errorMsg}`,
    );
  }

  const gitignorePath = join(context.path, ".gitignore");
  if (!existsSync(gitignorePath)) {
    try {
      await fs.writeFile(
        gitignorePath,
        "node_modules/\n.env\n.env.local\ndist/\nlib/\n.wrangler/\nwrangler.jsonc\n*.tsbuildinfo\n",
      );
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      log.warn(`Failed to create .gitignore: ${errorMsg}`);
    }
  }
}

export async function createAlchemy(cliOptions: CreateInput): Promise<void> {
  try {
    intro(pc.cyan("🧪 Welcome to Alchemy!"));
    log.info("Creating a new Alchemy project...");

    const context = await createProjectContext(cliOptions);

    log.info(`Detected package manager: ${pc.green(context.packageManager)}`);

    await handleDirectoryOverwrite(context);

    await initializeTemplate(context);

    outro(
      pc.green(`✅ Project ${pc.yellow(context.name)} created successfully!`),
    );

    log.message("");
    log.info(pc.cyan("📁 Navigate to your project:"));
    log.message(`   cd ${context.name}`);
    log.message("");
    log.info(pc.cyan("🚀 Deploy your project:"));
    log.message(`   ${context.packageManager} run deploy`);
    log.message("");
    log.info(pc.cyan("🧹 Destroy your project:"));
    log.message(`   ${context.packageManager} run destroy`);
    log.message("");
    log.info(pc.cyan("📚 Learn more:"));
    log.message("   https://alchemy.run");
  } catch (error) {
    log.error("An unexpected error occurred:");
    if (error instanceof Error) {
      log.error(`${pc.red("Error:")} ${error.message}`);
      if (error.stack && process.env.DEBUG) {
        log.error(`${pc.gray("Stack:")} ${error.stack}`);
      }
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}
