import {
  cancel,
  confirm,
  intro,
  isCancel,
  log,
  note,
  outro,
  select,
  spinner,
  text,
} from "@clack/prompts";
import * as fs from "fs-extra";
import { resolve } from "node:path";
import pc from "picocolors";

import { throwWithContext } from "../errors.ts";
import {
  detectPackageManager,
  installDependencies,
} from "../services/package-manager.ts";
import { copyTemplate } from "../services/template-manager.ts";
import { ensureVibeRulesPostinstall } from "../services/vibe-rules.ts";
import type {
  CreateInput,
  EditorType,
  ProjectContext,
  TemplateType,
} from "../types.ts";
import { ProjectNameSchema, TEMPLATE_DEFINITIONS } from "../types.ts";

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
      options: TEMPLATE_DEFINITIONS.map((t) => ({
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

  const templateDefinition = TEMPLATE_DEFINITIONS.find(
    (t) => t.name === selectedTemplate,
  );
  if (!templateDefinition) {
    throw new Error(
      `Template '${pc.yellow(selectedTemplate)}' not found. Available templates: ${TEMPLATE_DEFINITIONS.map((t) => pc.cyan(t.name)).join(", ")}`,
    );
  }

  const path = resolve(process.cwd(), name);
  let packageManager = options.pm || detectedPm;

  let shouldInstall = true;
  if (options.install !== undefined) {
    shouldInstall = options.install;
    log.info(
      `Dependencies installation: ${pc.yellow(shouldInstall ? "enabled" : "disabled")}`,
    );
  } else if (!options.yes) {
    const installResult = await confirm({
      message: "Install dependencies?",
      initialValue: true,
    });

    if (isCancel(installResult)) {
      cancel(pc.red("Operation cancelled."));
      process.exit(0);
    }

    shouldInstall = installResult;
  }

  return {
    name,
    path,
    template: selectedTemplate,
    packageManager,
    isTest,
    options: {
      ...options,
      install: shouldInstall,
    },
  };
}

async function handleDirectoryOverwrite(
  context: ProjectContext,
): Promise<void> {
  if (!fs.existsSync(context.path)) {
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
    throwWithContext(error, "Directory removal failed");
  }
}

async function initializeTemplate(context: ProjectContext): Promise<void> {
  const templateDefinition = TEMPLATE_DEFINITIONS.find(
    (t) => t.name === context.template,
  );
  if (!templateDefinition) {
    throw new Error(`Template definition not found for: ${context.template}`);
  }

  try {
    await copyTemplate(context.template, context);
  } catch (error) {
    throwWithContext(
      error,
      `Template initialization failed for '${context.template}'`,
    );
  }
}

async function setupVibeRules(context: ProjectContext): Promise<void> {
  let selectedEditor: EditorType | undefined = context.options.vibeRules;

  if (!selectedEditor && !context.isTest && !context.options.yes) {
    const setupResult = await confirm({
      message: "Setup vibe-rules for AI development assistance?",
      initialValue: true,
    });

    if (isCancel(setupResult) || !setupResult) {
      return;
    }

    const editorResult = await select({
      message: "Which editor would you like to configure?",
      options: [
        { label: "Cursor", value: "cursor" },
        { label: "Windsurf", value: "windsurf" },
        { label: "VSCode", value: "vscode" },
        { label: "Zed", value: "zed" },
        { label: "Claude Code", value: "claude-code" },
        { label: "Gemini", value: "gemini" },
        { label: "Codex", value: "codex" },
        { label: "Amp", value: "amp" },
        { label: "Cline Rules", value: "clinerules" },
        { label: "Roo", value: "roo" },
        { label: "Unified (.rules)", value: "unified" },
      ],
    });

    if (isCancel(editorResult)) {
      return;
    }

    selectedEditor = editorResult;
  }

  if (!selectedEditor) {
    return;
  }

  const s = spinner();
  s.start("Configuring vibe-rules...");

  try {
    await ensureVibeRulesPostinstall(context.path, selectedEditor);

    await installDependencies(context, {
      devDependencies: ["vibe-rules"],
    });

    // we need to install dependencies to trigger the postinstall script
    await installDependencies(context);

    s.stop("vibe-rules configured");
  } catch (error) {
    s.stop("Failed to configure vibe-rules");
    throwWithContext(error, "Failed to configure vibe-rules");
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

    const installInstructions =
      context.options.install === false
        ? `
${pc.cyan("📦 Install dependencies:")}
   cd ${context.name}
   ${context.packageManager} install

`
        : "";

    await setupVibeRules(context);

    note(
      `
${pc.cyan("📁 Navigate to your project:")}
   cd ${context.name}

${installInstructions}${pc.cyan("🚀 Deploy your project:")}
   ${context.packageManager} run deploy

${pc.cyan("🧹 Destroy your project:")}
   ${context.packageManager} run destroy

${pc.cyan("📚 Learn more:")}
   https://alchemy.run
`,
      "Next Steps:",
    );

    outro(
      pc.green(`✅ Project ${pc.yellow(context.name)} created successfully!`),
    );
  } catch (error) {
    log.error("An unexpected error occurred:");
    if (error instanceof Error) {
      log.error(`${pc.red("Error:")} ${error.message}`);
      if (error.stack && process.env.DEBUG) {
        log.error(`${pc.gray("Stack trace:")}\n${error.stack}`);
      }
    } else {
      log.error(pc.red(String(error)));
    }
    process.exit(1);
  }
}
