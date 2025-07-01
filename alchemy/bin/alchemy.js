#!/usr/bin/env node
#!/usr/bin/env node
import { createRequire } from "node:module";
import { EventEmitter, addAbortListener, on, once, setMaxListeners } from "node:events";
import { ChildProcess, execFile, spawn, spawnSync } from "node:child_process";
import * as path$1 from "node:path";
import path, { join, resolve } from "node:path";
import fs, { appendFileSync, createReadStream, createWriteStream, existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import y, { execArgv, execPath, hrtime, platform, stdin, stdout } from "node:process";
import { z } from "zod";
import { aborted, callbackify, debuglog, inspect, promisify, stripVTControlCharacters } from "node:util";
import * as g from "node:readline";
import O from "node:readline";
import { Duplex, PassThrough, Readable, Transform, Writable, getDefaultHighWaterMark } from "node:stream";
import { fileURLToPath } from "node:url";
import { StringDecoder } from "node:string_decoder";
import tty from "node:tty";
import { scheduler, setImmediate as setImmediate$1, setTimeout as setTimeout$1 } from "node:timers/promises";
import { constants } from "node:os";
import { serialize } from "node:v8";
import { finished } from "node:stream/promises";
import { Buffer as Buffer$1 } from "node:buffer";
import fsPromises from "node:fs/promises";

//#region rolldown:runtime
var __create$1 = Object.create;
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames$1 = Object.getOwnPropertyNames;
var __getProtoOf$1 = Object.getPrototypeOf;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __commonJS$1 = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames$1(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps$1 = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames$1(from), i$1 = 0, n$1 = keys.length, key; i$1 < n$1; i$1++) {
		key = keys[i$1];
		if (!__hasOwnProp$1.call(to, key) && key !== except) __defProp$1(to, key, {
			get: ((k$2) => from[k$2]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM$1 = (mod, isNodeMode, target) => (target = mod != null ? __create$1(__getProtoOf$1(mod)) : {}, __copyProps$1(isNodeMode || !mod || !mod.__esModule ? __defProp$1(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var __require = /* @__PURE__ */ createRequire(import.meta.url);

//#endregion
//#region ../node_modules/@trpc/server/dist/utils-BhNVZA-c.cjs
var require_utils_BhNVZA_c = __commonJS$1({ "../node_modules/@trpc/server/dist/utils-BhNVZA-c.cjs"(exports) {
	/**
	* JSON-RPC 2.0 Error codes
	*
	* `-32000` to `-32099` are reserved for implementation-defined server-errors.
	* For tRPC we're copying the last digits of HTTP 4XX errors.
	*/
	const TRPC_ERROR_CODES_BY_KEY = {
		PARSE_ERROR: -32700,
		BAD_REQUEST: -32600,
		INTERNAL_SERVER_ERROR: -32603,
		NOT_IMPLEMENTED: -32603,
		BAD_GATEWAY: -32603,
		SERVICE_UNAVAILABLE: -32603,
		GATEWAY_TIMEOUT: -32603,
		UNAUTHORIZED: -32001,
		PAYMENT_REQUIRED: -32002,
		FORBIDDEN: -32003,
		NOT_FOUND: -32004,
		METHOD_NOT_SUPPORTED: -32005,
		TIMEOUT: -32008,
		CONFLICT: -32009,
		PRECONDITION_FAILED: -32012,
		PAYLOAD_TOO_LARGE: -32013,
		UNSUPPORTED_MEDIA_TYPE: -32015,
		UNPROCESSABLE_CONTENT: -32022,
		TOO_MANY_REQUESTS: -32029,
		CLIENT_CLOSED_REQUEST: -32099
	};
	const TRPC_ERROR_CODES_BY_NUMBER = {
		[-32700]: "PARSE_ERROR",
		[-32600]: "BAD_REQUEST",
		[-32603]: "INTERNAL_SERVER_ERROR",
		[-32001]: "UNAUTHORIZED",
		[-32002]: "PAYMENT_REQUIRED",
		[-32003]: "FORBIDDEN",
		[-32004]: "NOT_FOUND",
		[-32005]: "METHOD_NOT_SUPPORTED",
		[-32008]: "TIMEOUT",
		[-32009]: "CONFLICT",
		[-32012]: "PRECONDITION_FAILED",
		[-32013]: "PAYLOAD_TOO_LARGE",
		[-32015]: "UNSUPPORTED_MEDIA_TYPE",
		[-32022]: "UNPROCESSABLE_CONTENT",
		[-32029]: "TOO_MANY_REQUESTS",
		[-32099]: "CLIENT_CLOSED_REQUEST"
	};
	/**
	* tRPC error codes that are considered retryable
	* With out of the box SSE, the client will reconnect when these errors are encountered
	*/
	const retryableRpcCodes = [
		TRPC_ERROR_CODES_BY_KEY.BAD_GATEWAY,
		TRPC_ERROR_CODES_BY_KEY.SERVICE_UNAVAILABLE,
		TRPC_ERROR_CODES_BY_KEY.GATEWAY_TIMEOUT,
		TRPC_ERROR_CODES_BY_KEY.INTERNAL_SERVER_ERROR
	];
	/**
	* Ensures there are no duplicate keys when building a procedure.
	* @internal
	*/
	function mergeWithoutOverrides(obj1, ...objs) {
		const newObj = Object.assign(Object.create(null), obj1);
		for (const overrides of objs) for (const key in overrides) {
			if (key in newObj && newObj[key] !== overrides[key]) throw new Error(`Duplicate key ${key}`);
			newObj[key] = overrides[key];
		}
		return newObj;
	}
	/**
	* Check that value is object
	* @internal
	*/
	function isObject$3(value) {
		return !!value && !Array.isArray(value) && typeof value === "object";
	}
	function isFunction(fn) {
		return typeof fn === "function";
	}
	/**
	* Create an object without inheriting anything from `Object.prototype`
	* @internal
	*/
	function omitPrototype(obj) {
		return Object.assign(Object.create(null), obj);
	}
	const asyncIteratorsSupported = typeof Symbol === "function" && !!Symbol.asyncIterator;
	function isAsyncIterable(value) {
		return asyncIteratorsSupported && isObject$3(value) && Symbol.asyncIterator in value;
	}
	/**
	* Run an IIFE
	*/
	const run = (fn) => fn();
	function noop$6() {}
	function identity$2(it) {
		return it;
	}
	/**
	* Generic runtime assertion function. Throws, if the condition is not `true`.
	*
	* Can be used as a slightly less dangerous variant of type assertions. Code
	* mistakes would be revealed at runtime then (hopefully during testing).
	*/
	function assert(condition, msg = "no additional info") {
		if (!condition) throw new Error(`AssertionError: ${msg}`);
	}
	function sleep(ms = 0) {
		return new Promise((res) => setTimeout(res, ms));
	}
	/**
	* Ponyfill for
	* [`AbortSignal.any`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static).
	*/
	function abortSignalsAnyPonyfill(signals$1) {
		if (typeof AbortSignal.any === "function") return AbortSignal.any(signals$1);
		const ac = new AbortController();
		for (const signal of signals$1) {
			if (signal.aborted) {
				trigger();
				break;
			}
			signal.addEventListener("abort", trigger, { once: true });
		}
		return ac.signal;
		function trigger() {
			ac.abort();
			for (const signal of signals$1) signal.removeEventListener("abort", trigger);
		}
	}
	Object.defineProperty(exports, "TRPC_ERROR_CODES_BY_KEY", {
		enumerable: true,
		get: function() {
			return TRPC_ERROR_CODES_BY_KEY;
		}
	});
	Object.defineProperty(exports, "TRPC_ERROR_CODES_BY_NUMBER", {
		enumerable: true,
		get: function() {
			return TRPC_ERROR_CODES_BY_NUMBER;
		}
	});
	Object.defineProperty(exports, "abortSignalsAnyPonyfill", {
		enumerable: true,
		get: function() {
			return abortSignalsAnyPonyfill;
		}
	});
	Object.defineProperty(exports, "assert", {
		enumerable: true,
		get: function() {
			return assert;
		}
	});
	Object.defineProperty(exports, "identity", {
		enumerable: true,
		get: function() {
			return identity$2;
		}
	});
	Object.defineProperty(exports, "isAsyncIterable", {
		enumerable: true,
		get: function() {
			return isAsyncIterable;
		}
	});
	Object.defineProperty(exports, "isFunction", {
		enumerable: true,
		get: function() {
			return isFunction;
		}
	});
	Object.defineProperty(exports, "isObject", {
		enumerable: true,
		get: function() {
			return isObject$3;
		}
	});
	Object.defineProperty(exports, "mergeWithoutOverrides", {
		enumerable: true,
		get: function() {
			return mergeWithoutOverrides;
		}
	});
	Object.defineProperty(exports, "noop", {
		enumerable: true,
		get: function() {
			return noop$6;
		}
	});
	Object.defineProperty(exports, "omitPrototype", {
		enumerable: true,
		get: function() {
			return omitPrototype;
		}
	});
	Object.defineProperty(exports, "retryableRpcCodes", {
		enumerable: true,
		get: function() {
			return retryableRpcCodes;
		}
	});
	Object.defineProperty(exports, "run", {
		enumerable: true,
		get: function() {
			return run;
		}
	});
	Object.defineProperty(exports, "sleep", {
		enumerable: true,
		get: function() {
			return sleep;
		}
	});
} });

//#endregion
//#region ../node_modules/@trpc/server/dist/getErrorShape-DKiEF6Zc.cjs
var require_getErrorShape_DKiEF6Zc = __commonJS$1({ "../node_modules/@trpc/server/dist/getErrorShape-DKiEF6Zc.cjs"(exports) {
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __commonJS = (cb, mod) => function() {
		return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i$1 = 0, n$1 = keys.length, key; i$1 < n$1; i$1++) {
			key = keys[i$1];
			if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: ((k$2) => from[k$2]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	const require_utils$9 = require_utils_BhNVZA_c();
	const noop$5 = () => {};
	const freezeIfAvailable = (obj) => {
		if (Object.freeze) Object.freeze(obj);
	};
	function createInnerProxy(callback, path$28, memo) {
		var _memo$cacheKey;
		const cacheKey = path$28.join(".");
		(_memo$cacheKey = memo[cacheKey]) !== null && _memo$cacheKey !== void 0 || (memo[cacheKey] = new Proxy(noop$5, {
			get(_obj, key) {
				if (typeof key !== "string" || key === "then") return void 0;
				return createInnerProxy(callback, [...path$28, key], memo);
			},
			apply(_1, _2, args) {
				const lastOfPath = path$28[path$28.length - 1];
				let opts = {
					args,
					path: path$28
				};
				if (lastOfPath === "call") opts = {
					args: args.length >= 2 ? [args[1]] : [],
					path: path$28.slice(0, -1)
				};
				else if (lastOfPath === "apply") opts = {
					args: args.length >= 2 ? args[1] : [],
					path: path$28.slice(0, -1)
				};
				freezeIfAvailable(opts.args);
				freezeIfAvailable(opts.path);
				return callback(opts);
			}
		}));
		return memo[cacheKey];
	}
	/**
	* Creates a proxy that calls the callback with the path and arguments
	*
	* @internal
	*/
	const createRecursiveProxy = (callback) => createInnerProxy(callback, [], Object.create(null));
	/**
	* Used in place of `new Proxy` where each handler will map 1 level deep to another value.
	*
	* @internal
	*/
	const createFlatProxy = (callback) => {
		return new Proxy(noop$5, { get(_obj, name) {
			if (name === "then") return void 0;
			return callback(name);
		} });
	};
	const JSONRPC2_TO_HTTP_CODE = {
		PARSE_ERROR: 400,
		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		PAYMENT_REQUIRED: 402,
		FORBIDDEN: 403,
		NOT_FOUND: 404,
		METHOD_NOT_SUPPORTED: 405,
		TIMEOUT: 408,
		CONFLICT: 409,
		PRECONDITION_FAILED: 412,
		PAYLOAD_TOO_LARGE: 413,
		UNSUPPORTED_MEDIA_TYPE: 415,
		UNPROCESSABLE_CONTENT: 422,
		TOO_MANY_REQUESTS: 429,
		CLIENT_CLOSED_REQUEST: 499,
		INTERNAL_SERVER_ERROR: 500,
		NOT_IMPLEMENTED: 501,
		BAD_GATEWAY: 502,
		SERVICE_UNAVAILABLE: 503,
		GATEWAY_TIMEOUT: 504
	};
	const HTTP_CODE_TO_JSONRPC2 = {
		400: "BAD_REQUEST",
		401: "UNAUTHORIZED",
		402: "PAYMENT_REQUIRED",
		403: "FORBIDDEN",
		404: "NOT_FOUND",
		405: "METHOD_NOT_SUPPORTED",
		408: "TIMEOUT",
		409: "CONFLICT",
		412: "PRECONDITION_FAILED",
		413: "PAYLOAD_TOO_LARGE",
		415: "UNSUPPORTED_MEDIA_TYPE",
		422: "UNPROCESSABLE_CONTENT",
		429: "TOO_MANY_REQUESTS",
		499: "CLIENT_CLOSED_REQUEST",
		500: "INTERNAL_SERVER_ERROR",
		501: "NOT_IMPLEMENTED",
		502: "BAD_GATEWAY",
		503: "SERVICE_UNAVAILABLE",
		504: "GATEWAY_TIMEOUT"
	};
	function getStatusCodeFromKey(code) {
		var _JSONRPC2_TO_HTTP_COD;
		return (_JSONRPC2_TO_HTTP_COD = JSONRPC2_TO_HTTP_CODE[code]) !== null && _JSONRPC2_TO_HTTP_COD !== void 0 ? _JSONRPC2_TO_HTTP_COD : 500;
	}
	function getStatusKeyFromCode(code) {
		var _HTTP_CODE_TO_JSONRPC;
		return (_HTTP_CODE_TO_JSONRPC = HTTP_CODE_TO_JSONRPC2[code]) !== null && _HTTP_CODE_TO_JSONRPC !== void 0 ? _HTTP_CODE_TO_JSONRPC : "INTERNAL_SERVER_ERROR";
	}
	function getHTTPStatusCode(json) {
		const arr = Array.isArray(json) ? json : [json];
		const httpStatuses = new Set(arr.map((res) => {
			if ("error" in res && require_utils$9.isObject(res.error.data)) {
				var _res$error$data;
				if (typeof ((_res$error$data = res.error.data) === null || _res$error$data === void 0 ? void 0 : _res$error$data["httpStatus"]) === "number") return res.error.data["httpStatus"];
				const code = require_utils$9.TRPC_ERROR_CODES_BY_NUMBER[res.error.code];
				return getStatusCodeFromKey(code);
			}
			return 200;
		}));
		if (httpStatuses.size !== 1) return 207;
		const httpStatus = httpStatuses.values().next().value;
		return httpStatus;
	}
	function getHTTPStatusCodeFromError(error) {
		return getStatusCodeFromKey(error.code);
	}
	var require_typeof = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(exports$1, module$1) {
		function _typeof$2(o$2) {
			"@babel/helpers - typeof";
			return module$1.exports = _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1$1) {
				return typeof o$1$1;
			} : function(o$1$1) {
				return o$1$1 && "function" == typeof Symbol && o$1$1.constructor === Symbol && o$1$1 !== Symbol.prototype ? "symbol" : typeof o$1$1;
			}, module$1.exports.__esModule = true, module$1.exports["default"] = module$1.exports, _typeof$2(o$2);
		}
		module$1.exports = _typeof$2, module$1.exports.__esModule = true, module$1.exports["default"] = module$1.exports;
	} });
	var require_toPrimitive = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(exports$1, module$1) {
		var _typeof$1 = require_typeof()["default"];
		function toPrimitive$1(t$1, r$1) {
			if ("object" != _typeof$1(t$1) || !t$1) return t$1;
			var e$1 = t$1[Symbol.toPrimitive];
			if (void 0 !== e$1) {
				var i$1 = e$1.call(t$1, r$1 || "default");
				if ("object" != _typeof$1(i$1)) return i$1;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === r$1 ? String : Number)(t$1);
		}
		module$1.exports = toPrimitive$1, module$1.exports.__esModule = true, module$1.exports["default"] = module$1.exports;
	} });
	var require_toPropertyKey = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(exports$1, module$1) {
		var _typeof = require_typeof()["default"];
		var toPrimitive = require_toPrimitive();
		function toPropertyKey$1(t$1) {
			var i$1 = toPrimitive(t$1, "string");
			return "symbol" == _typeof(i$1) ? i$1 : i$1 + "";
		}
		module$1.exports = toPropertyKey$1, module$1.exports.__esModule = true, module$1.exports["default"] = module$1.exports;
	} });
	var require_defineProperty = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(exports$1, module$1) {
		var toPropertyKey = require_toPropertyKey();
		function _defineProperty(e$1, r$1, t$1) {
			return (r$1 = toPropertyKey(r$1)) in e$1 ? Object.defineProperty(e$1, r$1, {
				value: t$1,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : e$1[r$1] = t$1, e$1;
		}
		module$1.exports = _defineProperty, module$1.exports.__esModule = true, module$1.exports["default"] = module$1.exports;
	} });
	var require_objectSpread2 = __commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(exports$1, module$1) {
		var defineProperty = require_defineProperty();
		function ownKeys(e$1, r$1) {
			var t$1 = Object.keys(e$1);
			if (Object.getOwnPropertySymbols) {
				var o$2 = Object.getOwnPropertySymbols(e$1);
				r$1 && (o$2 = o$2.filter(function(r$1$1) {
					return Object.getOwnPropertyDescriptor(e$1, r$1$1).enumerable;
				})), t$1.push.apply(t$1, o$2);
			}
			return t$1;
		}
		function _objectSpread2(e$1) {
			for (var r$1 = 1; r$1 < arguments.length; r$1++) {
				var t$1 = null != arguments[r$1] ? arguments[r$1] : {};
				r$1 % 2 ? ownKeys(Object(t$1), !0).forEach(function(r$1$1) {
					defineProperty(e$1, r$1$1, t$1[r$1$1]);
				}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e$1, Object.getOwnPropertyDescriptors(t$1)) : ownKeys(Object(t$1)).forEach(function(r$1$1) {
					Object.defineProperty(e$1, r$1$1, Object.getOwnPropertyDescriptor(t$1, r$1$1));
				});
			}
			return e$1;
		}
		module$1.exports = _objectSpread2, module$1.exports.__esModule = true, module$1.exports["default"] = module$1.exports;
	} });
	var import_objectSpread2$4 = __toESM(require_objectSpread2(), 1);
	/**
	* @internal
	*/
	function getErrorShape(opts) {
		const { path: path$28, error, config } = opts;
		const { code } = opts.error;
		const shape = {
			message: error.message,
			code: require_utils$9.TRPC_ERROR_CODES_BY_KEY[code],
			data: {
				code,
				httpStatus: getHTTPStatusCodeFromError(error)
			}
		};
		if (config.isDev && typeof opts.error.stack === "string") shape.data.stack = opts.error.stack;
		if (typeof path$28 === "string") shape.data.path = path$28;
		return config.errorFormatter((0, import_objectSpread2$4.default)((0, import_objectSpread2$4.default)({}, opts), {}, { shape }));
	}
	Object.defineProperty(exports, "HTTP_CODE_TO_JSONRPC2", {
		enumerable: true,
		get: function() {
			return HTTP_CODE_TO_JSONRPC2;
		}
	});
	Object.defineProperty(exports, "JSONRPC2_TO_HTTP_CODE", {
		enumerable: true,
		get: function() {
			return JSONRPC2_TO_HTTP_CODE;
		}
	});
	Object.defineProperty(exports, "__commonJS", {
		enumerable: true,
		get: function() {
			return __commonJS;
		}
	});
	Object.defineProperty(exports, "__toESM", {
		enumerable: true,
		get: function() {
			return __toESM;
		}
	});
	Object.defineProperty(exports, "createFlatProxy", {
		enumerable: true,
		get: function() {
			return createFlatProxy;
		}
	});
	Object.defineProperty(exports, "createRecursiveProxy", {
		enumerable: true,
		get: function() {
			return createRecursiveProxy;
		}
	});
	Object.defineProperty(exports, "getErrorShape", {
		enumerable: true,
		get: function() {
			return getErrorShape;
		}
	});
	Object.defineProperty(exports, "getHTTPStatusCode", {
		enumerable: true,
		get: function() {
			return getHTTPStatusCode;
		}
	});
	Object.defineProperty(exports, "getHTTPStatusCodeFromError", {
		enumerable: true,
		get: function() {
			return getHTTPStatusCodeFromError;
		}
	});
	Object.defineProperty(exports, "getStatusCodeFromKey", {
		enumerable: true,
		get: function() {
			return getStatusCodeFromKey;
		}
	});
	Object.defineProperty(exports, "getStatusKeyFromCode", {
		enumerable: true,
		get: function() {
			return getStatusKeyFromCode;
		}
	});
	Object.defineProperty(exports, "require_defineProperty", {
		enumerable: true,
		get: function() {
			return require_defineProperty;
		}
	});
	Object.defineProperty(exports, "require_objectSpread2", {
		enumerable: true,
		get: function() {
			return require_objectSpread2;
		}
	});
} });

//#endregion
//#region ../node_modules/@trpc/server/dist/tracked-HoF8L_mq.cjs
var require_tracked_HoF8L_mq = __commonJS$1({ "../node_modules/@trpc/server/dist/tracked-HoF8L_mq.cjs"(exports) {
	const require_getErrorShape$2 = require_getErrorShape_DKiEF6Zc();
	const require_utils$8 = require_utils_BhNVZA_c();
	const defaultFormatter = ({ shape }) => {
		return shape;
	};
	var import_defineProperty$1 = require_getErrorShape$2.__toESM(require_getErrorShape$2.require_defineProperty(), 1);
	var UnknownCauseError = class extends Error {};
	function getCauseFromUnknown(cause) {
		if (cause instanceof Error) return cause;
		const type = typeof cause;
		if (type === "undefined" || type === "function" || cause === null) return void 0;
		if (type !== "object") return new Error(String(cause));
		if (require_utils$8.isObject(cause)) return Object.assign(new UnknownCauseError(), cause);
		return void 0;
	}
	function getTRPCErrorFromUnknown(cause) {
		if (cause instanceof TRPCError) return cause;
		if (cause instanceof Error && cause.name === "TRPCError") return cause;
		const trpcError = new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			cause
		});
		if (cause instanceof Error && cause.stack) trpcError.stack = cause.stack;
		return trpcError;
	}
	var TRPCError = class extends Error {
		constructor(opts) {
			var _ref, _opts$message, _this$cause;
			const cause = getCauseFromUnknown(opts.cause);
			const message = (_ref = (_opts$message = opts.message) !== null && _opts$message !== void 0 ? _opts$message : cause === null || cause === void 0 ? void 0 : cause.message) !== null && _ref !== void 0 ? _ref : opts.code;
			super(message, { cause });
			(0, import_defineProperty$1.default)(this, "cause", void 0);
			(0, import_defineProperty$1.default)(this, "code", void 0);
			this.code = opts.code;
			this.name = "TRPCError";
			(_this$cause = this.cause) !== null && _this$cause !== void 0 || (this.cause = cause);
		}
	};
	var import_objectSpread2$1$1 = require_getErrorShape$2.__toESM(require_getErrorShape$2.require_objectSpread2(), 1);
	/**
	* @internal
	*/
	function getDataTransformer(transformer) {
		if ("input" in transformer) return transformer;
		return {
			input: transformer,
			output: transformer
		};
	}
	/**
	* @internal
	*/
	const defaultTransformer = {
		input: {
			serialize: (obj) => obj,
			deserialize: (obj) => obj
		},
		output: {
			serialize: (obj) => obj,
			deserialize: (obj) => obj
		}
	};
	function transformTRPCResponseItem(config, item) {
		if ("error" in item) return (0, import_objectSpread2$1$1.default)((0, import_objectSpread2$1$1.default)({}, item), {}, { error: config.transformer.output.serialize(item.error) });
		if ("data" in item.result) return (0, import_objectSpread2$1$1.default)((0, import_objectSpread2$1$1.default)({}, item), {}, { result: (0, import_objectSpread2$1$1.default)((0, import_objectSpread2$1$1.default)({}, item.result), {}, { data: config.transformer.output.serialize(item.result.data) }) });
		return item;
	}
	/**
	* Takes a unserialized `TRPCResponse` and serializes it with the router's transformers
	**/
	function transformTRPCResponse(config, itemOrItems) {
		return Array.isArray(itemOrItems) ? itemOrItems.map((item) => transformTRPCResponseItem(config, item)) : transformTRPCResponseItem(config, itemOrItems);
	}
	/** @internal */
	function transformResultInner(response, transformer) {
		if ("error" in response) {
			const error = transformer.deserialize(response.error);
			return {
				ok: false,
				error: (0, import_objectSpread2$1$1.default)((0, import_objectSpread2$1$1.default)({}, response), {}, { error })
			};
		}
		const result = (0, import_objectSpread2$1$1.default)((0, import_objectSpread2$1$1.default)({}, response.result), (!response.result.type || response.result.type === "data") && {
			type: "data",
			data: transformer.deserialize(response.result.data)
		});
		return {
			ok: true,
			result
		};
	}
	var TransformResultError = class extends Error {
		constructor() {
			super("Unable to transform response from server");
		}
	};
	/**
	* Transforms and validates that the result is a valid TRPCResponse
	* @internal
	*/
	function transformResult(response, transformer) {
		let result;
		try {
			result = transformResultInner(response, transformer);
		} catch (_unused) {
			throw new TransformResultError();
		}
		if (!result.ok && (!require_utils$8.isObject(result.error.error) || typeof result.error.error["code"] !== "number")) throw new TransformResultError();
		if (result.ok && !require_utils$8.isObject(result.result)) throw new TransformResultError();
		return result;
	}
	var import_objectSpread2$3 = require_getErrorShape$2.__toESM(require_getErrorShape$2.require_objectSpread2(), 1);
	const lazySymbol = Symbol("lazy");
	function once$1(fn) {
		const uncalled = Symbol();
		let result = uncalled;
		return () => {
			if (result === uncalled) result = fn();
			return result;
		};
	}
	/**
	* Lazy load a router
	* @see https://trpc.io/docs/server/merging-routers#lazy-load
	*/
	function lazy(importRouter) {
		async function resolve$1() {
			const mod = await importRouter();
			if (isRouter(mod)) return mod;
			const routers = Object.values(mod);
			if (routers.length !== 1 || !isRouter(routers[0])) throw new Error("Invalid router module - either define exactly 1 export or return the router directly.\nExample: `lazy(() => import('./slow.js').then((m) => m.slowRouter))`");
			return routers[0];
		}
		resolve$1[lazySymbol] = true;
		return resolve$1;
	}
	function isLazy(input) {
		return typeof input === "function" && lazySymbol in input;
	}
	function isRouter(value) {
		return require_utils$8.isObject(value) && require_utils$8.isObject(value["_def"]) && "router" in value["_def"];
	}
	const emptyRouter = {
		_ctx: null,
		_errorShape: null,
		_meta: null,
		queries: {},
		mutations: {},
		subscriptions: {},
		errorFormatter: defaultFormatter,
		transformer: defaultTransformer
	};
	/**
	* Reserved words that can't be used as router or procedure names
	*/
	const reservedWords = [
		"then",
		"call",
		"apply"
	];
	/**
	* @internal
	*/
	function createRouterFactory(config) {
		function createRouterInner(input) {
			const reservedWordsUsed = new Set(Object.keys(input).filter((v$1) => reservedWords.includes(v$1)));
			if (reservedWordsUsed.size > 0) throw new Error("Reserved words used in `router({})` call: " + Array.from(reservedWordsUsed).join(", "));
			const procedures = require_utils$8.omitPrototype({});
			const lazy$1 = require_utils$8.omitPrototype({});
			function createLazyLoader(opts) {
				return {
					ref: opts.ref,
					load: once$1(async () => {
						const router$1$1 = await opts.ref();
						const lazyPath = [...opts.path, opts.key];
						const lazyKey = lazyPath.join(".");
						opts.aggregate[opts.key] = step(router$1$1._def.record, lazyPath);
						delete lazy$1[lazyKey];
						for (const [nestedKey, nestedItem] of Object.entries(router$1$1._def.lazy)) {
							const nestedRouterKey = [...lazyPath, nestedKey].join(".");
							lazy$1[nestedRouterKey] = createLazyLoader({
								ref: nestedItem.ref,
								path: lazyPath,
								key: nestedKey,
								aggregate: opts.aggregate[opts.key]
							});
						}
					})
				};
			}
			function step(from, path$28 = []) {
				const aggregate = require_utils$8.omitPrototype({});
				for (const [key, item] of Object.entries(from !== null && from !== void 0 ? from : {})) {
					if (isLazy(item)) {
						lazy$1[[...path$28, key].join(".")] = createLazyLoader({
							path: path$28,
							ref: item,
							key,
							aggregate
						});
						continue;
					}
					if (isRouter(item)) {
						aggregate[key] = step(item._def.record, [...path$28, key]);
						continue;
					}
					if (!isProcedure(item)) {
						aggregate[key] = step(item, [...path$28, key]);
						continue;
					}
					const newPath = [...path$28, key].join(".");
					if (procedures[newPath]) throw new Error(`Duplicate key: ${newPath}`);
					procedures[newPath] = item;
					aggregate[key] = item;
				}
				return aggregate;
			}
			const record = step(input);
			const _def = (0, import_objectSpread2$3.default)((0, import_objectSpread2$3.default)({
				_config: config,
				router: true,
				procedures,
				lazy: lazy$1
			}, emptyRouter), {}, { record });
			const router$1 = (0, import_objectSpread2$3.default)((0, import_objectSpread2$3.default)({}, record), {}, {
				_def,
				createCaller: createCallerFactory()({ _def })
			});
			return router$1;
		}
		return createRouterInner;
	}
	function isProcedure(procedureOrRouter) {
		return typeof procedureOrRouter === "function";
	}
	/**
	* @internal
	*/
	async function getProcedureAtPath(router$1, path$28) {
		const { _def } = router$1;
		let procedure = _def.procedures[path$28];
		while (!procedure) {
			const key = Object.keys(_def.lazy).find((key$1) => path$28.startsWith(key$1));
			if (!key) return null;
			const lazyRouter = _def.lazy[key];
			await lazyRouter.load();
			procedure = _def.procedures[path$28];
		}
		return procedure;
	}
	/**
	* @internal
	*/
	async function callProcedure(opts) {
		const { type, path: path$28 } = opts;
		const proc = await getProcedureAtPath(opts.router, path$28);
		if (!proc || !isProcedure(proc) || proc._def.type !== type && !opts.allowMethodOverride) throw new TRPCError({
			code: "NOT_FOUND",
			message: `No "${type}"-procedure on path "${path$28}"`
		});
		/* istanbul ignore if -- @preserve */
		if (proc._def.type !== type && opts.allowMethodOverride && proc._def.type === "subscription") throw new TRPCError({
			code: "METHOD_NOT_SUPPORTED",
			message: `Method override is not supported for subscriptions`
		});
		return proc(opts);
	}
	function createCallerFactory() {
		return function createCallerInner(router$1) {
			const { _def } = router$1;
			return function createCaller(ctxOrCallback, opts) {
				return require_getErrorShape$2.createRecursiveProxy(async ({ path: path$28, args }) => {
					const fullPath = path$28.join(".");
					if (path$28.length === 1 && path$28[0] === "_def") return _def;
					const procedure = await getProcedureAtPath(router$1, fullPath);
					let ctx = void 0;
					try {
						if (!procedure) throw new TRPCError({
							code: "NOT_FOUND",
							message: `No procedure found on path "${path$28}"`
						});
						ctx = require_utils$8.isFunction(ctxOrCallback) ? await Promise.resolve(ctxOrCallback()) : ctxOrCallback;
						return await procedure({
							path: fullPath,
							getRawInput: async () => args[0],
							ctx,
							type: procedure._def.type,
							signal: opts === null || opts === void 0 ? void 0 : opts.signal
						});
					} catch (cause) {
						var _opts$onError, _procedure$_def$type;
						opts === null || opts === void 0 || (_opts$onError = opts.onError) === null || _opts$onError === void 0 || _opts$onError.call(opts, {
							ctx,
							error: getTRPCErrorFromUnknown(cause),
							input: args[0],
							path: fullPath,
							type: (_procedure$_def$type = procedure === null || procedure === void 0 ? void 0 : procedure._def.type) !== null && _procedure$_def$type !== void 0 ? _procedure$_def$type : "unknown"
						});
						throw cause;
					}
				});
			};
		};
	}
	function mergeRouters(...routerList) {
		var _routerList$;
		const record = require_utils$8.mergeWithoutOverrides({}, ...routerList.map((r$1) => r$1._def.record));
		const errorFormatter = routerList.reduce((currentErrorFormatter, nextRouter) => {
			if (nextRouter._def._config.errorFormatter && nextRouter._def._config.errorFormatter !== defaultFormatter) {
				if (currentErrorFormatter !== defaultFormatter && currentErrorFormatter !== nextRouter._def._config.errorFormatter) throw new Error("You seem to have several error formatters");
				return nextRouter._def._config.errorFormatter;
			}
			return currentErrorFormatter;
		}, defaultFormatter);
		const transformer = routerList.reduce((prev, current) => {
			if (current._def._config.transformer && current._def._config.transformer !== defaultTransformer) {
				if (prev !== defaultTransformer && prev !== current._def._config.transformer) throw new Error("You seem to have several transformers");
				return current._def._config.transformer;
			}
			return prev;
		}, defaultTransformer);
		const router$1 = createRouterFactory({
			errorFormatter,
			transformer,
			isDev: routerList.every((r$1) => r$1._def._config.isDev),
			allowOutsideOfServer: routerList.every((r$1) => r$1._def._config.allowOutsideOfServer),
			isServer: routerList.every((r$1) => r$1._def._config.isServer),
			$types: (_routerList$ = routerList[0]) === null || _routerList$ === void 0 ? void 0 : _routerList$._def._config.$types
		})(record);
		return router$1;
	}
	const trackedSymbol = Symbol();
	/**
	* Produce a typed server-sent event message
	* @deprecated use `tracked(id, data)` instead
	*/
	function sse(event) {
		return tracked(event.id, event.data);
	}
	function isTrackedEnvelope(value) {
		return Array.isArray(value) && value[2] === trackedSymbol;
	}
	/**
	* Automatically track an event so that it can be resumed from a given id if the connection is lost
	*/
	function tracked(id, data) {
		if (id === "") throw new Error("`id` must not be an empty string as empty string is the same as not setting the id at all");
		return [
			id,
			data,
			trackedSymbol
		];
	}
	Object.defineProperty(exports, "TRPCError", {
		enumerable: true,
		get: function() {
			return TRPCError;
		}
	});
	Object.defineProperty(exports, "callProcedure", {
		enumerable: true,
		get: function() {
			return callProcedure;
		}
	});
	Object.defineProperty(exports, "createCallerFactory", {
		enumerable: true,
		get: function() {
			return createCallerFactory;
		}
	});
	Object.defineProperty(exports, "createRouterFactory", {
		enumerable: true,
		get: function() {
			return createRouterFactory;
		}
	});
	Object.defineProperty(exports, "defaultFormatter", {
		enumerable: true,
		get: function() {
			return defaultFormatter;
		}
	});
	Object.defineProperty(exports, "defaultTransformer", {
		enumerable: true,
		get: function() {
			return defaultTransformer;
		}
	});
	Object.defineProperty(exports, "getCauseFromUnknown", {
		enumerable: true,
		get: function() {
			return getCauseFromUnknown;
		}
	});
	Object.defineProperty(exports, "getDataTransformer", {
		enumerable: true,
		get: function() {
			return getDataTransformer;
		}
	});
	Object.defineProperty(exports, "getProcedureAtPath", {
		enumerable: true,
		get: function() {
			return getProcedureAtPath;
		}
	});
	Object.defineProperty(exports, "getTRPCErrorFromUnknown", {
		enumerable: true,
		get: function() {
			return getTRPCErrorFromUnknown;
		}
	});
	Object.defineProperty(exports, "isTrackedEnvelope", {
		enumerable: true,
		get: function() {
			return isTrackedEnvelope;
		}
	});
	Object.defineProperty(exports, "lazy", {
		enumerable: true,
		get: function() {
			return lazy;
		}
	});
	Object.defineProperty(exports, "mergeRouters", {
		enumerable: true,
		get: function() {
			return mergeRouters;
		}
	});
	Object.defineProperty(exports, "sse", {
		enumerable: true,
		get: function() {
			return sse;
		}
	});
	Object.defineProperty(exports, "tracked", {
		enumerable: true,
		get: function() {
			return tracked;
		}
	});
	Object.defineProperty(exports, "transformResult", {
		enumerable: true,
		get: function() {
			return transformResult;
		}
	});
	Object.defineProperty(exports, "transformTRPCResponse", {
		enumerable: true,
		get: function() {
			return transformTRPCResponse;
		}
	});
} });

//#endregion
//#region ../node_modules/@trpc/server/dist/initTRPC-IT4M4lu3.cjs
var require_initTRPC_IT4M4lu3 = __commonJS$1({ "../node_modules/@trpc/server/dist/initTRPC-IT4M4lu3.cjs"(exports) {
	const require_getErrorShape$1 = require_getErrorShape_DKiEF6Zc();
	const require_tracked$1 = require_tracked_HoF8L_mq();
	const require_utils$7 = require_utils_BhNVZA_c();
	var import_objectSpread2$2 = require_getErrorShape$1.__toESM(require_getErrorShape$1.require_objectSpread2(), 1);
	/** @internal */
	const middlewareMarker = "middlewareMarker";
	/**
	* @internal
	*/
	function createMiddlewareFactory() {
		function createMiddlewareInner(middlewares) {
			return {
				_middlewares: middlewares,
				unstable_pipe(middlewareBuilderOrFn) {
					const pipedMiddleware = "_middlewares" in middlewareBuilderOrFn ? middlewareBuilderOrFn._middlewares : [middlewareBuilderOrFn];
					return createMiddlewareInner([...middlewares, ...pipedMiddleware]);
				}
			};
		}
		function createMiddleware(fn) {
			return createMiddlewareInner([fn]);
		}
		return createMiddleware;
	}
	/**
	* Create a standalone middleware
	* @see https://trpc.io/docs/v11/server/middlewares#experimental-standalone-middlewares
	* @deprecated use `.concat()` instead
	*/
	const experimental_standaloneMiddleware = () => ({ create: createMiddlewareFactory() });
	/**
	* @internal
	* Please note, `trpc-openapi` uses this function.
	*/
	function createInputMiddleware(parse$6) {
		const inputMiddleware = async function inputValidatorMiddleware(opts) {
			let parsedInput;
			const rawInput = await opts.getRawInput();
			try {
				parsedInput = await parse$6(rawInput);
			} catch (cause) {
				throw new require_tracked$1.TRPCError({
					code: "BAD_REQUEST",
					cause
				});
			}
			const combinedInput = require_utils$7.isObject(opts.input) && require_utils$7.isObject(parsedInput) ? (0, import_objectSpread2$2.default)((0, import_objectSpread2$2.default)({}, opts.input), parsedInput) : parsedInput;
			return opts.next({ input: combinedInput });
		};
		inputMiddleware._type = "input";
		return inputMiddleware;
	}
	/**
	* @internal
	*/
	function createOutputMiddleware(parse$6) {
		const outputMiddleware = async function outputValidatorMiddleware({ next }) {
			const result = await next();
			if (!result.ok) return result;
			try {
				const data = await parse$6(result.data);
				return (0, import_objectSpread2$2.default)((0, import_objectSpread2$2.default)({}, result), {}, { data });
			} catch (cause) {
				throw new require_tracked$1.TRPCError({
					message: "Output validation failed",
					code: "INTERNAL_SERVER_ERROR",
					cause
				});
			}
		};
		outputMiddleware._type = "output";
		return outputMiddleware;
	}
	var import_defineProperty = require_getErrorShape$1.__toESM(require_getErrorShape$1.require_defineProperty(), 1);
	/** A schema error with useful information. */
	var StandardSchemaV1Error$1 = class extends Error {
		/**
		* Creates a schema error with useful information.
		*
		* @param issues The schema issues.
		*/
		constructor(issues) {
			var _issues$;
			super((_issues$ = issues[0]) === null || _issues$ === void 0 ? void 0 : _issues$.message);
			(0, import_defineProperty.default)(this, "issues", void 0);
			this.name = "SchemaError";
			this.issues = issues;
		}
	};
	function getParseFn(procedureParser) {
		const parser = procedureParser;
		const isStandardSchema = "~standard" in parser;
		if (typeof parser === "function" && typeof parser.assert === "function") return parser.assert.bind(parser);
		if (typeof parser === "function" && !isStandardSchema) return parser;
		if (typeof parser.parseAsync === "function") return parser.parseAsync.bind(parser);
		if (typeof parser.parse === "function") return parser.parse.bind(parser);
		if (typeof parser.validateSync === "function") return parser.validateSync.bind(parser);
		if (typeof parser.create === "function") return parser.create.bind(parser);
		if (typeof parser.assert === "function") return (value) => {
			parser.assert(value);
			return value;
		};
		if (isStandardSchema) return async (value) => {
			const result = await parser["~standard"].validate(value);
			if (result.issues) throw new StandardSchemaV1Error$1(result.issues);
			return result.value;
		};
		throw new Error("Could not find a validator fn");
	}
	var require_objectWithoutPropertiesLoose = require_getErrorShape$1.__commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutPropertiesLoose.js"(exports$1, module$1) {
		function _objectWithoutPropertiesLoose(r$1, e$1) {
			if (null == r$1) return {};
			var t$1 = {};
			for (var n$1 in r$1) if ({}.hasOwnProperty.call(r$1, n$1)) {
				if (e$1.includes(n$1)) continue;
				t$1[n$1] = r$1[n$1];
			}
			return t$1;
		}
		module$1.exports = _objectWithoutPropertiesLoose, module$1.exports.__esModule = true, module$1.exports["default"] = module$1.exports;
	} });
	var require_objectWithoutProperties = require_getErrorShape$1.__commonJS({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectWithoutProperties.js"(exports$1, module$1) {
		var objectWithoutPropertiesLoose = require_objectWithoutPropertiesLoose();
		function _objectWithoutProperties$1(e$1, t$1) {
			if (null == e$1) return {};
			var o$2, r$1, i$1 = objectWithoutPropertiesLoose(e$1, t$1);
			if (Object.getOwnPropertySymbols) {
				var s = Object.getOwnPropertySymbols(e$1);
				for (r$1 = 0; r$1 < s.length; r$1++) o$2 = s[r$1], t$1.includes(o$2) || {}.propertyIsEnumerable.call(e$1, o$2) && (i$1[o$2] = e$1[o$2]);
			}
			return i$1;
		}
		module$1.exports = _objectWithoutProperties$1, module$1.exports.__esModule = true, module$1.exports["default"] = module$1.exports;
	} });
	var import_objectWithoutProperties = require_getErrorShape$1.__toESM(require_objectWithoutProperties(), 1);
	var import_objectSpread2$1 = require_getErrorShape$1.__toESM(require_getErrorShape$1.require_objectSpread2(), 1);
	const _excluded = [
		"middlewares",
		"inputs",
		"meta"
	];
	function createNewBuilder(def1, def2) {
		const { middlewares = [], inputs, meta } = def2, rest = (0, import_objectWithoutProperties.default)(def2, _excluded);
		return createBuilder((0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, require_utils$7.mergeWithoutOverrides(def1, rest)), {}, {
			inputs: [...def1.inputs, ...inputs !== null && inputs !== void 0 ? inputs : []],
			middlewares: [...def1.middlewares, ...middlewares],
			meta: def1.meta && meta ? (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, def1.meta), meta) : meta !== null && meta !== void 0 ? meta : def1.meta
		}));
	}
	function createBuilder(initDef = {}) {
		const _def = (0, import_objectSpread2$1.default)({
			procedure: true,
			inputs: [],
			middlewares: []
		}, initDef);
		const builder = {
			_def,
			input(input) {
				const parser = getParseFn(input);
				return createNewBuilder(_def, {
					inputs: [input],
					middlewares: [createInputMiddleware(parser)]
				});
			},
			output(output) {
				const parser = getParseFn(output);
				return createNewBuilder(_def, {
					output,
					middlewares: [createOutputMiddleware(parser)]
				});
			},
			meta(meta) {
				return createNewBuilder(_def, { meta });
			},
			use(middlewareBuilderOrFn) {
				const middlewares = "_middlewares" in middlewareBuilderOrFn ? middlewareBuilderOrFn._middlewares : [middlewareBuilderOrFn];
				return createNewBuilder(_def, { middlewares });
			},
			unstable_concat(builder$1) {
				return createNewBuilder(_def, builder$1._def);
			},
			concat(builder$1) {
				return createNewBuilder(_def, builder$1._def);
			},
			query(resolver) {
				return createResolver((0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, _def), {}, { type: "query" }), resolver);
			},
			mutation(resolver) {
				return createResolver((0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, _def), {}, { type: "mutation" }), resolver);
			},
			subscription(resolver) {
				return createResolver((0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, _def), {}, { type: "subscription" }), resolver);
			},
			experimental_caller(caller) {
				return createNewBuilder(_def, { caller });
			}
		};
		return builder;
	}
	function createResolver(_defIn, resolver) {
		const finalBuilder = createNewBuilder(_defIn, {
			resolver,
			middlewares: [async function resolveMiddleware(opts) {
				const data = await resolver(opts);
				return {
					marker: middlewareMarker,
					ok: true,
					data,
					ctx: opts.ctx
				};
			}]
		});
		const _def = (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, finalBuilder._def), {}, {
			type: _defIn.type,
			experimental_caller: Boolean(finalBuilder._def.caller),
			meta: finalBuilder._def.meta,
			$types: null
		});
		const invoke = createProcedureCaller(finalBuilder._def);
		const callerOverride = finalBuilder._def.caller;
		if (!callerOverride) return invoke;
		const callerWrapper = async (...args) => {
			return await callerOverride({
				args,
				invoke,
				_def
			});
		};
		callerWrapper._def = _def;
		return callerWrapper;
	}
	const codeblock = `
This is a client-only function.
If you want to call this function on the server, see https://trpc.io/docs/v11/server/server-side-calls
`.trim();
	async function callRecursive(index, _def, opts) {
		try {
			const middleware = _def.middlewares[index];
			const result = await middleware((0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, opts), {}, {
				meta: _def.meta,
				input: opts.input,
				next(_nextOpts) {
					var _nextOpts$getRawInput;
					const nextOpts = _nextOpts;
					return callRecursive(index + 1, _def, (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, opts), {}, {
						ctx: (nextOpts === null || nextOpts === void 0 ? void 0 : nextOpts.ctx) ? (0, import_objectSpread2$1.default)((0, import_objectSpread2$1.default)({}, opts.ctx), nextOpts.ctx) : opts.ctx,
						input: nextOpts && "input" in nextOpts ? nextOpts.input : opts.input,
						getRawInput: (_nextOpts$getRawInput = nextOpts === null || nextOpts === void 0 ? void 0 : nextOpts.getRawInput) !== null && _nextOpts$getRawInput !== void 0 ? _nextOpts$getRawInput : opts.getRawInput
					}));
				}
			}));
			return result;
		} catch (cause) {
			return {
				ok: false,
				error: require_tracked$1.getTRPCErrorFromUnknown(cause),
				marker: middlewareMarker
			};
		}
	}
	function createProcedureCaller(_def) {
		async function procedure(opts) {
			if (!opts || !("getRawInput" in opts)) throw new Error(codeblock);
			const result = await callRecursive(0, _def, opts);
			if (!result) throw new require_tracked$1.TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "No result from middlewares - did you forget to `return next()`?"
			});
			if (!result.ok) throw result.error;
			return result.data;
		}
		procedure._def = _def;
		procedure.procedure = true;
		procedure.meta = _def.meta;
		return procedure;
	}
	var _globalThis$process, _globalThis$process2, _globalThis$process3;
	/**
	* The default check to see if we're in a server
	*/
	const isServerDefault = typeof window === "undefined" || "Deno" in window || ((_globalThis$process = globalThis.process) === null || _globalThis$process === void 0 || (_globalThis$process = _globalThis$process.env) === null || _globalThis$process === void 0 ? void 0 : _globalThis$process["NODE_ENV"]) === "test" || !!((_globalThis$process2 = globalThis.process) === null || _globalThis$process2 === void 0 || (_globalThis$process2 = _globalThis$process2.env) === null || _globalThis$process2 === void 0 ? void 0 : _globalThis$process2["JEST_WORKER_ID"]) || !!((_globalThis$process3 = globalThis.process) === null || _globalThis$process3 === void 0 || (_globalThis$process3 = _globalThis$process3.env) === null || _globalThis$process3 === void 0 ? void 0 : _globalThis$process3["VITEST_WORKER_ID"]);
	var import_objectSpread2 = require_getErrorShape$1.__toESM(require_getErrorShape$1.require_objectSpread2(), 1);
	var TRPCBuilder = class TRPCBuilder$1 {
		/**
		* Add a context shape as a generic to the root object
		* @see https://trpc.io/docs/v11/server/context
		*/
		context() {
			return new TRPCBuilder$1();
		}
		/**
		* Add a meta shape as a generic to the root object
		* @see https://trpc.io/docs/v11/quickstart
		*/
		meta() {
			return new TRPCBuilder$1();
		}
		/**
		* Create the root object
		* @see https://trpc.io/docs/v11/server/routers#initialize-trpc
		*/
		create(opts) {
			var _opts$transformer, _opts$isDev, _globalThis$process$1, _opts$allowOutsideOfS, _opts$errorFormatter, _opts$isServer;
			const config = (0, import_objectSpread2.default)((0, import_objectSpread2.default)({}, opts), {}, {
				transformer: require_tracked$1.getDataTransformer((_opts$transformer = opts === null || opts === void 0 ? void 0 : opts.transformer) !== null && _opts$transformer !== void 0 ? _opts$transformer : require_tracked$1.defaultTransformer),
				isDev: (_opts$isDev = opts === null || opts === void 0 ? void 0 : opts.isDev) !== null && _opts$isDev !== void 0 ? _opts$isDev : ((_globalThis$process$1 = globalThis.process) === null || _globalThis$process$1 === void 0 ? void 0 : _globalThis$process$1.env["NODE_ENV"]) !== "production",
				allowOutsideOfServer: (_opts$allowOutsideOfS = opts === null || opts === void 0 ? void 0 : opts.allowOutsideOfServer) !== null && _opts$allowOutsideOfS !== void 0 ? _opts$allowOutsideOfS : false,
				errorFormatter: (_opts$errorFormatter = opts === null || opts === void 0 ? void 0 : opts.errorFormatter) !== null && _opts$errorFormatter !== void 0 ? _opts$errorFormatter : require_tracked$1.defaultFormatter,
				isServer: (_opts$isServer = opts === null || opts === void 0 ? void 0 : opts.isServer) !== null && _opts$isServer !== void 0 ? _opts$isServer : isServerDefault,
				$types: null
			});
			{
				var _opts$isServer2;
				const isServer = (_opts$isServer2 = opts === null || opts === void 0 ? void 0 : opts.isServer) !== null && _opts$isServer2 !== void 0 ? _opts$isServer2 : isServerDefault;
				if (!isServer && (opts === null || opts === void 0 ? void 0 : opts.allowOutsideOfServer) !== true) throw new Error(`You're trying to use @trpc/server in a non-server environment. This is not supported by default.`);
			}
			return {
				_config: config,
				procedure: createBuilder({ meta: opts === null || opts === void 0 ? void 0 : opts.defaultMeta }),
				middleware: createMiddlewareFactory(),
				router: require_tracked$1.createRouterFactory(config),
				mergeRouters: require_tracked$1.mergeRouters,
				createCallerFactory: require_tracked$1.createCallerFactory()
			};
		}
	};
	/**
	* Builder to initialize the tRPC root object - use this exactly once per backend
	* @see https://trpc.io/docs/v11/quickstart
	*/
	const initTRPC = new TRPCBuilder();
	Object.defineProperty(exports, "StandardSchemaV1Error", {
		enumerable: true,
		get: function() {
			return StandardSchemaV1Error$1;
		}
	});
	Object.defineProperty(exports, "createBuilder", {
		enumerable: true,
		get: function() {
			return createBuilder;
		}
	});
	Object.defineProperty(exports, "createInputMiddleware", {
		enumerable: true,
		get: function() {
			return createInputMiddleware;
		}
	});
	Object.defineProperty(exports, "createMiddlewareFactory", {
		enumerable: true,
		get: function() {
			return createMiddlewareFactory;
		}
	});
	Object.defineProperty(exports, "createOutputMiddleware", {
		enumerable: true,
		get: function() {
			return createOutputMiddleware;
		}
	});
	Object.defineProperty(exports, "experimental_standaloneMiddleware", {
		enumerable: true,
		get: function() {
			return experimental_standaloneMiddleware;
		}
	});
	Object.defineProperty(exports, "getParseFn", {
		enumerable: true,
		get: function() {
			return getParseFn;
		}
	});
	Object.defineProperty(exports, "initTRPC", {
		enumerable: true,
		get: function() {
			return initTRPC;
		}
	});
	Object.defineProperty(exports, "isServerDefault", {
		enumerable: true,
		get: function() {
			return isServerDefault;
		}
	});
	Object.defineProperty(exports, "middlewareMarker", {
		enumerable: true,
		get: function() {
			return middlewareMarker;
		}
	});
} });

//#endregion
//#region ../node_modules/@trpc/server/dist/index.cjs
var require_dist$1 = __commonJS$1({ "../node_modules/@trpc/server/dist/index.cjs"(exports) {
	const require_getErrorShape = require_getErrorShape_DKiEF6Zc();
	const require_tracked = require_tracked_HoF8L_mq();
	require_utils_BhNVZA_c();
	const require_initTRPC = require_initTRPC_IT4M4lu3();
	exports.StandardSchemaV1Error = require_initTRPC.StandardSchemaV1Error;
	exports.TRPCError = require_tracked.TRPCError;
	exports.callTRPCProcedure = require_tracked.callProcedure;
	exports.createTRPCFlatProxy = require_getErrorShape.createFlatProxy;
	exports.createTRPCRecursiveProxy = require_getErrorShape.createRecursiveProxy;
	exports.experimental_lazy = require_tracked.lazy;
	exports.experimental_standaloneMiddleware = require_initTRPC.experimental_standaloneMiddleware;
	exports.experimental_trpcMiddleware = require_initTRPC.experimental_standaloneMiddleware;
	exports.getErrorShape = require_getErrorShape.getErrorShape;
	exports.getTRPCErrorFromUnknown = require_tracked.getTRPCErrorFromUnknown;
	exports.getTRPCErrorShape = require_getErrorShape.getErrorShape;
	exports.initTRPC = require_initTRPC.initTRPC;
	exports.isTrackedEnvelope = require_tracked.isTrackedEnvelope;
	exports.lazy = require_tracked.lazy;
	exports.sse = require_tracked.sse;
	exports.tracked = require_tracked.tracked;
	exports.transformTRPCResponse = require_tracked.transformTRPCResponse;
} });

//#endregion
//#region ../node_modules/trpc-cli/node_modules/commander/lib/error.js
var require_error$1 = __commonJS$1({ "../node_modules/trpc-cli/node_modules/commander/lib/error.js"(exports) {
	/**
	* CommanderError class
	*/
	var CommanderError$2 = class extends Error {
		/**
		* Constructs the CommanderError class
		* @param {number} exitCode suggested exit code which could be used with process.exit
		* @param {string} code an id string representing the error
		* @param {string} message human-readable description of the error
		*/
		constructor(exitCode, code, message) {
			super(message);
			Error.captureStackTrace(this, this.constructor);
			this.name = this.constructor.name;
			this.code = code;
			this.exitCode = exitCode;
			this.nestedError = void 0;
		}
	};
	/**
	* InvalidArgumentError class
	*/
	var InvalidArgumentError$3 = class extends CommanderError$2 {
		/**
		* Constructs the InvalidArgumentError class
		* @param {string} [message] explanation of why argument is invalid
		*/
		constructor(message) {
			super(1, "commander.invalidArgument", message);
			Error.captureStackTrace(this, this.constructor);
			this.name = this.constructor.name;
		}
	};
	exports.CommanderError = CommanderError$2;
	exports.InvalidArgumentError = InvalidArgumentError$3;
} });

//#endregion
//#region ../node_modules/trpc-cli/node_modules/commander/lib/argument.js
var require_argument = __commonJS$1({ "../node_modules/trpc-cli/node_modules/commander/lib/argument.js"(exports) {
	const { InvalidArgumentError: InvalidArgumentError$2 } = require_error$1();
	var Argument$2 = class {
		/**
		* Initialize a new command argument with the given name and description.
		* The default is that the argument is required, and you can explicitly
		* indicate this with <> around the name. Put [] around the name for an optional argument.
		*
		* @param {string} name
		* @param {string} [description]
		*/
		constructor(name, description) {
			this.description = description || "";
			this.variadic = false;
			this.parseArg = void 0;
			this.defaultValue = void 0;
			this.defaultValueDescription = void 0;
			this.argChoices = void 0;
			switch (name[0]) {
				case "<":
					this.required = true;
					this._name = name.slice(1, -1);
					break;
				case "[":
					this.required = false;
					this._name = name.slice(1, -1);
					break;
				default:
					this.required = true;
					this._name = name;
					break;
			}
			if (this._name.length > 3 && this._name.slice(-3) === "...") {
				this.variadic = true;
				this._name = this._name.slice(0, -3);
			}
		}
		/**
		* Return argument name.
		*
		* @return {string}
		*/
		name() {
			return this._name;
		}
		/**
		* @package
		*/
		_concatValue(value, previous) {
			if (previous === this.defaultValue || !Array.isArray(previous)) return [value];
			return previous.concat(value);
		}
		/**
		* Set the default value, and optionally supply the description to be displayed in the help.
		*
		* @param {*} value
		* @param {string} [description]
		* @return {Argument}
		*/
		default(value, description) {
			this.defaultValue = value;
			this.defaultValueDescription = description;
			return this;
		}
		/**
		* Set the custom handler for processing CLI command arguments into argument values.
		*
		* @param {Function} [fn]
		* @return {Argument}
		*/
		argParser(fn) {
			this.parseArg = fn;
			return this;
		}
		/**
		* Only allow argument value to be one of choices.
		*
		* @param {string[]} values
		* @return {Argument}
		*/
		choices(values) {
			this.argChoices = values.slice();
			this.parseArg = (arg, previous) => {
				if (!this.argChoices.includes(arg)) throw new InvalidArgumentError$2(`Allowed choices are ${this.argChoices.join(", ")}.`);
				if (this.variadic) return this._concatValue(arg, previous);
				return arg;
			};
			return this;
		}
		/**
		* Make argument required.
		*
		* @returns {Argument}
		*/
		argRequired() {
			this.required = true;
			return this;
		}
		/**
		* Make argument optional.
		*
		* @returns {Argument}
		*/
		argOptional() {
			this.required = false;
			return this;
		}
	};
	/**
	* Takes an argument and returns its human readable equivalent for help usage.
	*
	* @param {Argument} arg
	* @return {string}
	* @private
	*/
	function humanReadableArgName$2(arg) {
		const nameOutput = arg.name() + (arg.variadic === true ? "..." : "");
		return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
	}
	exports.Argument = Argument$2;
	exports.humanReadableArgName = humanReadableArgName$2;
} });

//#endregion
//#region ../node_modules/trpc-cli/node_modules/commander/lib/help.js
var require_help = __commonJS$1({ "../node_modules/trpc-cli/node_modules/commander/lib/help.js"(exports) {
	const { humanReadableArgName: humanReadableArgName$1 } = require_argument();
	/**
	* TypeScript import types for JSDoc, used by Visual Studio Code IntelliSense and `npm run typescript-checkJS`
	* https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types
	* @typedef { import("./argument.js").Argument } Argument
	* @typedef { import("./command.js").Command } Command
	* @typedef { import("./option.js").Option } Option
	*/
	var Help$2 = class {
		constructor() {
			this.helpWidth = void 0;
			this.minWidthToWrap = 40;
			this.sortSubcommands = false;
			this.sortOptions = false;
			this.showGlobalOptions = false;
		}
		/**
		* prepareContext is called by Commander after applying overrides from `Command.configureHelp()`
		* and just before calling `formatHelp()`.
		*
		* Commander just uses the helpWidth and the rest is provided for optional use by more complex subclasses.
		*
		* @param {{ error?: boolean, helpWidth?: number, outputHasColors?: boolean }} contextOptions
		*/
		prepareContext(contextOptions) {
			this.helpWidth = this.helpWidth ?? contextOptions.helpWidth ?? 80;
		}
		/**
		* Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
		*
		* @param {Command} cmd
		* @returns {Command[]}
		*/
		visibleCommands(cmd) {
			const visibleCommands = cmd.commands.filter((cmd$1) => !cmd$1._hidden);
			const helpCommand = cmd._getHelpCommand();
			if (helpCommand && !helpCommand._hidden) visibleCommands.push(helpCommand);
			if (this.sortSubcommands) visibleCommands.sort((a$1, b$2) => {
				return a$1.name().localeCompare(b$2.name());
			});
			return visibleCommands;
		}
		/**
		* Compare options for sort.
		*
		* @param {Option} a
		* @param {Option} b
		* @returns {number}
		*/
		compareOptions(a$1, b$2) {
			const getSortKey = (option) => {
				return option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
			};
			return getSortKey(a$1).localeCompare(getSortKey(b$2));
		}
		/**
		* Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
		*
		* @param {Command} cmd
		* @returns {Option[]}
		*/
		visibleOptions(cmd) {
			const visibleOptions = cmd.options.filter((option) => !option.hidden);
			const helpOption = cmd._getHelpOption();
			if (helpOption && !helpOption.hidden) {
				const removeShort = helpOption.short && cmd._findOption(helpOption.short);
				const removeLong = helpOption.long && cmd._findOption(helpOption.long);
				if (!removeShort && !removeLong) visibleOptions.push(helpOption);
				else if (helpOption.long && !removeLong) visibleOptions.push(cmd.createOption(helpOption.long, helpOption.description));
				else if (helpOption.short && !removeShort) visibleOptions.push(cmd.createOption(helpOption.short, helpOption.description));
			}
			if (this.sortOptions) visibleOptions.sort(this.compareOptions);
			return visibleOptions;
		}
		/**
		* Get an array of the visible global options. (Not including help.)
		*
		* @param {Command} cmd
		* @returns {Option[]}
		*/
		visibleGlobalOptions(cmd) {
			if (!this.showGlobalOptions) return [];
			const globalOptions = [];
			for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
				const visibleOptions = ancestorCmd.options.filter((option) => !option.hidden);
				globalOptions.push(...visibleOptions);
			}
			if (this.sortOptions) globalOptions.sort(this.compareOptions);
			return globalOptions;
		}
		/**
		* Get an array of the arguments if any have a description.
		*
		* @param {Command} cmd
		* @returns {Argument[]}
		*/
		visibleArguments(cmd) {
			if (cmd._argsDescription) cmd.registeredArguments.forEach((argument) => {
				argument.description = argument.description || cmd._argsDescription[argument.name()] || "";
			});
			if (cmd.registeredArguments.find((argument) => argument.description)) return cmd.registeredArguments;
			return [];
		}
		/**
		* Get the command term to show in the list of subcommands.
		*
		* @param {Command} cmd
		* @returns {string}
		*/
		subcommandTerm(cmd) {
			const args = cmd.registeredArguments.map((arg) => humanReadableArgName$1(arg)).join(" ");
			return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + (args ? " " + args : "");
		}
		/**
		* Get the option term to show in the list of options.
		*
		* @param {Option} option
		* @returns {string}
		*/
		optionTerm(option) {
			return option.flags;
		}
		/**
		* Get the argument term to show in the list of arguments.
		*
		* @param {Argument} argument
		* @returns {string}
		*/
		argumentTerm(argument) {
			return argument.name();
		}
		/**
		* Get the longest command term length.
		*
		* @param {Command} cmd
		* @param {Help} helper
		* @returns {number}
		*/
		longestSubcommandTermLength(cmd, helper) {
			return helper.visibleCommands(cmd).reduce((max, command) => {
				return Math.max(max, this.displayWidth(helper.styleSubcommandTerm(helper.subcommandTerm(command))));
			}, 0);
		}
		/**
		* Get the longest option term length.
		*
		* @param {Command} cmd
		* @param {Help} helper
		* @returns {number}
		*/
		longestOptionTermLength(cmd, helper) {
			return helper.visibleOptions(cmd).reduce((max, option) => {
				return Math.max(max, this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option))));
			}, 0);
		}
		/**
		* Get the longest global option term length.
		*
		* @param {Command} cmd
		* @param {Help} helper
		* @returns {number}
		*/
		longestGlobalOptionTermLength(cmd, helper) {
			return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
				return Math.max(max, this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option))));
			}, 0);
		}
		/**
		* Get the longest argument term length.
		*
		* @param {Command} cmd
		* @param {Help} helper
		* @returns {number}
		*/
		longestArgumentTermLength(cmd, helper) {
			return helper.visibleArguments(cmd).reduce((max, argument) => {
				return Math.max(max, this.displayWidth(helper.styleArgumentTerm(helper.argumentTerm(argument))));
			}, 0);
		}
		/**
		* Get the command usage to be displayed at the top of the built-in help.
		*
		* @param {Command} cmd
		* @returns {string}
		*/
		commandUsage(cmd) {
			let cmdName = cmd._name;
			if (cmd._aliases[0]) cmdName = cmdName + "|" + cmd._aliases[0];
			let ancestorCmdNames = "";
			for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) ancestorCmdNames = ancestorCmd.name() + " " + ancestorCmdNames;
			return ancestorCmdNames + cmdName + " " + cmd.usage();
		}
		/**
		* Get the description for the command.
		*
		* @param {Command} cmd
		* @returns {string}
		*/
		commandDescription(cmd) {
			return cmd.description();
		}
		/**
		* Get the subcommand summary to show in the list of subcommands.
		* (Fallback to description for backwards compatibility.)
		*
		* @param {Command} cmd
		* @returns {string}
		*/
		subcommandDescription(cmd) {
			return cmd.summary() || cmd.description();
		}
		/**
		* Get the option description to show in the list of options.
		*
		* @param {Option} option
		* @return {string}
		*/
		optionDescription(option) {
			const extraInfo = [];
			if (option.argChoices) extraInfo.push(`choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`);
			if (option.defaultValue !== void 0) {
				const showDefault = option.required || option.optional || option.isBoolean() && typeof option.defaultValue === "boolean";
				if (showDefault) extraInfo.push(`default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`);
			}
			if (option.presetArg !== void 0 && option.optional) extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
			if (option.envVar !== void 0) extraInfo.push(`env: ${option.envVar}`);
			if (extraInfo.length > 0) {
				const extraDescription = `(${extraInfo.join(", ")})`;
				if (option.description) return `${option.description} ${extraDescription}`;
				return extraDescription;
			}
			return option.description;
		}
		/**
		* Get the argument description to show in the list of arguments.
		*
		* @param {Argument} argument
		* @return {string}
		*/
		argumentDescription(argument) {
			const extraInfo = [];
			if (argument.argChoices) extraInfo.push(`choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`);
			if (argument.defaultValue !== void 0) extraInfo.push(`default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`);
			if (extraInfo.length > 0) {
				const extraDescription = `(${extraInfo.join(", ")})`;
				if (argument.description) return `${argument.description} ${extraDescription}`;
				return extraDescription;
			}
			return argument.description;
		}
		/**
		* Format a list of items, given a heading and an array of formatted items.
		*
		* @param {string} heading
		* @param {string[]} items
		* @param {Help} helper
		* @returns string[]
		*/
		formatItemList(heading, items, helper) {
			if (items.length === 0) return [];
			return [
				helper.styleTitle(heading),
				...items,
				""
			];
		}
		/**
		* Group items by their help group heading.
		*
		* @param {Command[] | Option[]} unsortedItems
		* @param {Command[] | Option[]} visibleItems
		* @param {Function} getGroup
		* @returns {Map<string, Command[] | Option[]>}
		*/
		groupItems(unsortedItems, visibleItems, getGroup) {
			const result = new Map();
			unsortedItems.forEach((item) => {
				const group = getGroup(item);
				if (!result.has(group)) result.set(group, []);
			});
			visibleItems.forEach((item) => {
				const group = getGroup(item);
				if (!result.has(group)) result.set(group, []);
				result.get(group).push(item);
			});
			return result;
		}
		/**
		* Generate the built-in help text.
		*
		* @param {Command} cmd
		* @param {Help} helper
		* @returns {string}
		*/
		formatHelp(cmd, helper) {
			const termWidth = helper.padWidth(cmd, helper);
			const helpWidth = helper.helpWidth ?? 80;
			function callFormatItem(term, description) {
				return helper.formatItem(term, termWidth, description, helper);
			}
			let output = [`${helper.styleTitle("Usage:")} ${helper.styleUsage(helper.commandUsage(cmd))}`, ""];
			const commandDescription = helper.commandDescription(cmd);
			if (commandDescription.length > 0) output = output.concat([helper.boxWrap(helper.styleCommandDescription(commandDescription), helpWidth), ""]);
			const argumentList = helper.visibleArguments(cmd).map((argument) => {
				return callFormatItem(helper.styleArgumentTerm(helper.argumentTerm(argument)), helper.styleArgumentDescription(helper.argumentDescription(argument)));
			});
			output = output.concat(this.formatItemList("Arguments:", argumentList, helper));
			const optionGroups = this.groupItems(cmd.options, helper.visibleOptions(cmd), (option) => option.helpGroupHeading ?? "Options:");
			optionGroups.forEach((options, group) => {
				const optionList = options.map((option) => {
					return callFormatItem(helper.styleOptionTerm(helper.optionTerm(option)), helper.styleOptionDescription(helper.optionDescription(option)));
				});
				output = output.concat(this.formatItemList(group, optionList, helper));
			});
			if (helper.showGlobalOptions) {
				const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
					return callFormatItem(helper.styleOptionTerm(helper.optionTerm(option)), helper.styleOptionDescription(helper.optionDescription(option)));
				});
				output = output.concat(this.formatItemList("Global Options:", globalOptionList, helper));
			}
			const commandGroups = this.groupItems(cmd.commands, helper.visibleCommands(cmd), (sub) => sub.helpGroup() || "Commands:");
			commandGroups.forEach((commands, group) => {
				const commandList = commands.map((sub) => {
					return callFormatItem(helper.styleSubcommandTerm(helper.subcommandTerm(sub)), helper.styleSubcommandDescription(helper.subcommandDescription(sub)));
				});
				output = output.concat(this.formatItemList(group, commandList, helper));
			});
			return output.join("\n");
		}
		/**
		* Return display width of string, ignoring ANSI escape sequences. Used in padding and wrapping calculations.
		*
		* @param {string} str
		* @returns {number}
		*/
		displayWidth(str) {
			return stripColor$1(str).length;
		}
		/**
		* Style the title for displaying in the help. Called with 'Usage:', 'Options:', etc.
		*
		* @param {string} str
		* @returns {string}
		*/
		styleTitle(str) {
			return str;
		}
		styleUsage(str) {
			return str.split(" ").map((word) => {
				if (word === "[options]") return this.styleOptionText(word);
				if (word === "[command]") return this.styleSubcommandText(word);
				if (word[0] === "[" || word[0] === "<") return this.styleArgumentText(word);
				return this.styleCommandText(word);
			}).join(" ");
		}
		styleCommandDescription(str) {
			return this.styleDescriptionText(str);
		}
		styleOptionDescription(str) {
			return this.styleDescriptionText(str);
		}
		styleSubcommandDescription(str) {
			return this.styleDescriptionText(str);
		}
		styleArgumentDescription(str) {
			return this.styleDescriptionText(str);
		}
		styleDescriptionText(str) {
			return str;
		}
		styleOptionTerm(str) {
			return this.styleOptionText(str);
		}
		styleSubcommandTerm(str) {
			return str.split(" ").map((word) => {
				if (word === "[options]") return this.styleOptionText(word);
				if (word[0] === "[" || word[0] === "<") return this.styleArgumentText(word);
				return this.styleSubcommandText(word);
			}).join(" ");
		}
		styleArgumentTerm(str) {
			return this.styleArgumentText(str);
		}
		styleOptionText(str) {
			return str;
		}
		styleArgumentText(str) {
			return str;
		}
		styleSubcommandText(str) {
			return str;
		}
		styleCommandText(str) {
			return str;
		}
		/**
		* Calculate the pad width from the maximum term length.
		*
		* @param {Command} cmd
		* @param {Help} helper
		* @returns {number}
		*/
		padWidth(cmd, helper) {
			return Math.max(helper.longestOptionTermLength(cmd, helper), helper.longestGlobalOptionTermLength(cmd, helper), helper.longestSubcommandTermLength(cmd, helper), helper.longestArgumentTermLength(cmd, helper));
		}
		/**
		* Detect manually wrapped and indented strings by checking for line break followed by whitespace.
		*
		* @param {string} str
		* @returns {boolean}
		*/
		preformatted(str) {
			return /\n[^\S\r\n]/.test(str);
		}
		/**
		* Format the "item", which consists of a term and description. Pad the term and wrap the description, indenting the following lines.
		*
		* So "TTT", 5, "DDD DDDD DD DDD" might be formatted for this.helpWidth=17 like so:
		*   TTT  DDD DDDD
		*        DD DDD
		*
		* @param {string} term
		* @param {number} termWidth
		* @param {string} description
		* @param {Help} helper
		* @returns {string}
		*/
		formatItem(term, termWidth, description, helper) {
			const itemIndent = 2;
			const itemIndentStr = " ".repeat(itemIndent);
			if (!description) return itemIndentStr + term;
			const paddedTerm = term.padEnd(termWidth + term.length - helper.displayWidth(term));
			const spacerWidth = 2;
			const helpWidth = this.helpWidth ?? 80;
			const remainingWidth = helpWidth - termWidth - spacerWidth - itemIndent;
			let formattedDescription;
			if (remainingWidth < this.minWidthToWrap || helper.preformatted(description)) formattedDescription = description;
			else {
				const wrappedDescription = helper.boxWrap(description, remainingWidth);
				formattedDescription = wrappedDescription.replace(/\n/g, "\n" + " ".repeat(termWidth + spacerWidth));
			}
			return itemIndentStr + paddedTerm + " ".repeat(spacerWidth) + formattedDescription.replace(/\n/g, `\n${itemIndentStr}`);
		}
		/**
		* Wrap a string at whitespace, preserving existing line breaks.
		* Wrapping is skipped if the width is less than `minWidthToWrap`.
		*
		* @param {string} str
		* @param {number} width
		* @returns {string}
		*/
		boxWrap(str, width) {
			if (width < this.minWidthToWrap) return str;
			const rawLines = str.split(/\r\n|\n/);
			const chunkPattern = /[\s]*[^\s]+/g;
			const wrappedLines = [];
			rawLines.forEach((line) => {
				const chunks = line.match(chunkPattern);
				if (chunks === null) {
					wrappedLines.push("");
					return;
				}
				let sumChunks = [chunks.shift()];
				let sumWidth = this.displayWidth(sumChunks[0]);
				chunks.forEach((chunk) => {
					const visibleWidth = this.displayWidth(chunk);
					if (sumWidth + visibleWidth <= width) {
						sumChunks.push(chunk);
						sumWidth += visibleWidth;
						return;
					}
					wrappedLines.push(sumChunks.join(""));
					const nextChunk = chunk.trimStart();
					sumChunks = [nextChunk];
					sumWidth = this.displayWidth(nextChunk);
				});
				wrappedLines.push(sumChunks.join(""));
			});
			return wrappedLines.join("\n");
		}
	};
	/**
	* Strip style ANSI escape sequences from the string. In particular, SGR (Select Graphic Rendition) codes.
	*
	* @param {string} str
	* @returns {string}
	* @package
	*/
	function stripColor$1(str) {
		const sgrPattern = /\x1b\[\d*(;\d*)*m/g;
		return str.replace(sgrPattern, "");
	}
	exports.Help = Help$2;
	exports.stripColor = stripColor$1;
} });

//#endregion
//#region ../node_modules/trpc-cli/node_modules/commander/lib/option.js
var require_option = __commonJS$1({ "../node_modules/trpc-cli/node_modules/commander/lib/option.js"(exports) {
	const { InvalidArgumentError: InvalidArgumentError$1 } = require_error$1();
	var Option$2 = class {
		/**
		* Initialize a new `Option` with the given `flags` and `description`.
		*
		* @param {string} flags
		* @param {string} [description]
		*/
		constructor(flags, description) {
			this.flags = flags;
			this.description = description || "";
			this.required = flags.includes("<");
			this.optional = flags.includes("[");
			this.variadic = /\w\.\.\.[>\]]$/.test(flags);
			this.mandatory = false;
			const optionFlags = splitOptionFlags(flags);
			this.short = optionFlags.shortFlag;
			this.long = optionFlags.longFlag;
			this.negate = false;
			if (this.long) this.negate = this.long.startsWith("--no-");
			this.defaultValue = void 0;
			this.defaultValueDescription = void 0;
			this.presetArg = void 0;
			this.envVar = void 0;
			this.parseArg = void 0;
			this.hidden = false;
			this.argChoices = void 0;
			this.conflictsWith = [];
			this.implied = void 0;
			this.helpGroupHeading = void 0;
		}
		/**
		* Set the default value, and optionally supply the description to be displayed in the help.
		*
		* @param {*} value
		* @param {string} [description]
		* @return {Option}
		*/
		default(value, description) {
			this.defaultValue = value;
			this.defaultValueDescription = description;
			return this;
		}
		/**
		* Preset to use when option used without option-argument, especially optional but also boolean and negated.
		* The custom processing (parseArg) is called.
		*
		* @example
		* new Option('--color').default('GREYSCALE').preset('RGB');
		* new Option('--donate [amount]').preset('20').argParser(parseFloat);
		*
		* @param {*} arg
		* @return {Option}
		*/
		preset(arg) {
			this.presetArg = arg;
			return this;
		}
		/**
		* Add option name(s) that conflict with this option.
		* An error will be displayed if conflicting options are found during parsing.
		*
		* @example
		* new Option('--rgb').conflicts('cmyk');
		* new Option('--js').conflicts(['ts', 'jsx']);
		*
		* @param {(string | string[])} names
		* @return {Option}
		*/
		conflicts(names) {
			this.conflictsWith = this.conflictsWith.concat(names);
			return this;
		}
		/**
		* Specify implied option values for when this option is set and the implied options are not.
		*
		* The custom processing (parseArg) is not called on the implied values.
		*
		* @example
		* program
		*   .addOption(new Option('--log', 'write logging information to file'))
		*   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
		*
		* @param {object} impliedOptionValues
		* @return {Option}
		*/
		implies(impliedOptionValues) {
			let newImplied = impliedOptionValues;
			if (typeof impliedOptionValues === "string") newImplied = { [impliedOptionValues]: true };
			this.implied = Object.assign(this.implied || {}, newImplied);
			return this;
		}
		/**
		* Set environment variable to check for option value.
		*
		* An environment variable is only used if when processed the current option value is
		* undefined, or the source of the current value is 'default' or 'config' or 'env'.
		*
		* @param {string} name
		* @return {Option}
		*/
		env(name) {
			this.envVar = name;
			return this;
		}
		/**
		* Set the custom handler for processing CLI option arguments into option values.
		*
		* @param {Function} [fn]
		* @return {Option}
		*/
		argParser(fn) {
			this.parseArg = fn;
			return this;
		}
		/**
		* Whether the option is mandatory and must have a value after parsing.
		*
		* @param {boolean} [mandatory=true]
		* @return {Option}
		*/
		makeOptionMandatory(mandatory = true) {
			this.mandatory = !!mandatory;
			return this;
		}
		/**
		* Hide option in help.
		*
		* @param {boolean} [hide=true]
		* @return {Option}
		*/
		hideHelp(hide = true) {
			this.hidden = !!hide;
			return this;
		}
		/**
		* @package
		*/
		_concatValue(value, previous) {
			if (previous === this.defaultValue || !Array.isArray(previous)) return [value];
			return previous.concat(value);
		}
		/**
		* Only allow option value to be one of choices.
		*
		* @param {string[]} values
		* @return {Option}
		*/
		choices(values) {
			this.argChoices = values.slice();
			this.parseArg = (arg, previous) => {
				if (!this.argChoices.includes(arg)) throw new InvalidArgumentError$1(`Allowed choices are ${this.argChoices.join(", ")}.`);
				if (this.variadic) return this._concatValue(arg, previous);
				return arg;
			};
			return this;
		}
		/**
		* Return option name.
		*
		* @return {string}
		*/
		name() {
			if (this.long) return this.long.replace(/^--/, "");
			return this.short.replace(/^-/, "");
		}
		/**
		* Return option name, in a camelcase format that can be used
		* as an object attribute key.
		*
		* @return {string}
		*/
		attributeName() {
			if (this.negate) return camelcase(this.name().replace(/^no-/, ""));
			return camelcase(this.name());
		}
		/**
		* Set the help group heading.
		*
		* @param {string} heading
		* @return {Option}
		*/
		helpGroup(heading) {
			this.helpGroupHeading = heading;
			return this;
		}
		/**
		* Check if `arg` matches the short or long flag.
		*
		* @param {string} arg
		* @return {boolean}
		* @package
		*/
		is(arg) {
			return this.short === arg || this.long === arg;
		}
		/**
		* Return whether a boolean option.
		*
		* Options are one of boolean, negated, required argument, or optional argument.
		*
		* @return {boolean}
		* @package
		*/
		isBoolean() {
			return !this.required && !this.optional && !this.negate;
		}
	};
	/**
	* This class is to make it easier to work with dual options, without changing the existing
	* implementation. We support separate dual options for separate positive and negative options,
	* like `--build` and `--no-build`, which share a single option value. This works nicely for some
	* use cases, but is tricky for others where we want separate behaviours despite
	* the single shared option value.
	*/
	var DualOptions$1 = class {
		/**
		* @param {Option[]} options
		*/
		constructor(options) {
			this.positiveOptions = new Map();
			this.negativeOptions = new Map();
			this.dualOptions = new Set();
			options.forEach((option) => {
				if (option.negate) this.negativeOptions.set(option.attributeName(), option);
				else this.positiveOptions.set(option.attributeName(), option);
			});
			this.negativeOptions.forEach((value, key) => {
				if (this.positiveOptions.has(key)) this.dualOptions.add(key);
			});
		}
		/**
		* Did the value come from the option, and not from possible matching dual option?
		*
		* @param {*} value
		* @param {Option} option
		* @returns {boolean}
		*/
		valueFromOption(value, option) {
			const optionKey = option.attributeName();
			if (!this.dualOptions.has(optionKey)) return true;
			const preset = this.negativeOptions.get(optionKey).presetArg;
			const negativeValue = preset !== void 0 ? preset : false;
			return option.negate === (negativeValue === value);
		}
	};
	/**
	* Convert string from kebab-case to camelCase.
	*
	* @param {string} str
	* @return {string}
	* @private
	*/
	function camelcase(str) {
		return str.split("-").reduce((str$1, word) => {
			return str$1 + word[0].toUpperCase() + word.slice(1);
		});
	}
	/**
	* Split the short and long flag out of something like '-m,--mixed <value>'
	*
	* @private
	*/
	function splitOptionFlags(flags) {
		let shortFlag;
		let longFlag;
		const shortFlagExp = /^-[^-]$/;
		const longFlagExp = /^--[^-]/;
		const flagParts = flags.split(/[ |,]+/).concat("guard");
		if (shortFlagExp.test(flagParts[0])) shortFlag = flagParts.shift();
		if (longFlagExp.test(flagParts[0])) longFlag = flagParts.shift();
		if (!shortFlag && shortFlagExp.test(flagParts[0])) shortFlag = flagParts.shift();
		if (!shortFlag && longFlagExp.test(flagParts[0])) {
			shortFlag = longFlag;
			longFlag = flagParts.shift();
		}
		if (flagParts[0].startsWith("-")) {
			const unsupportedFlag = flagParts[0];
			const baseError = `option creation failed due to '${unsupportedFlag}' in option flags '${flags}'`;
			if (/^-[^-][^-]/.test(unsupportedFlag)) throw new Error(`${baseError}
- a short flag is a single dash and a single character
  - either use a single dash and a single character (for a short flag)
  - or use a double dash for a long option (and can have two, like '--ws, --workspace')`);
			if (shortFlagExp.test(unsupportedFlag)) throw new Error(`${baseError}
- too many short flags`);
			if (longFlagExp.test(unsupportedFlag)) throw new Error(`${baseError}
- too many long flags`);
			throw new Error(`${baseError}
- unrecognised flag format`);
		}
		if (shortFlag === void 0 && longFlag === void 0) throw new Error(`option creation failed due to no flags found in '${flags}'.`);
		return {
			shortFlag,
			longFlag
		};
	}
	exports.Option = Option$2;
	exports.DualOptions = DualOptions$1;
} });

//#endregion
//#region ../node_modules/trpc-cli/node_modules/commander/lib/suggestSimilar.js
var require_suggestSimilar = __commonJS$1({ "../node_modules/trpc-cli/node_modules/commander/lib/suggestSimilar.js"(exports) {
	const maxDistance = 3;
	function editDistance(a$1, b$2) {
		if (Math.abs(a$1.length - b$2.length) > maxDistance) return Math.max(a$1.length, b$2.length);
		const d$2 = [];
		for (let i$1 = 0; i$1 <= a$1.length; i$1++) d$2[i$1] = [i$1];
		for (let j = 0; j <= b$2.length; j++) d$2[0][j] = j;
		for (let j = 1; j <= b$2.length; j++) for (let i$1 = 1; i$1 <= a$1.length; i$1++) {
			let cost = 1;
			if (a$1[i$1 - 1] === b$2[j - 1]) cost = 0;
			else cost = 1;
			d$2[i$1][j] = Math.min(d$2[i$1 - 1][j] + 1, d$2[i$1][j - 1] + 1, d$2[i$1 - 1][j - 1] + cost);
			if (i$1 > 1 && j > 1 && a$1[i$1 - 1] === b$2[j - 2] && a$1[i$1 - 2] === b$2[j - 1]) d$2[i$1][j] = Math.min(d$2[i$1][j], d$2[i$1 - 2][j - 2] + 1);
		}
		return d$2[a$1.length][b$2.length];
	}
	/**
	* Find close matches, restricted to same number of edits.
	*
	* @param {string} word
	* @param {string[]} candidates
	* @returns {string}
	*/
	function suggestSimilar$1(word, candidates) {
		if (!candidates || candidates.length === 0) return "";
		candidates = Array.from(new Set(candidates));
		const searchingOptions = word.startsWith("--");
		if (searchingOptions) {
			word = word.slice(2);
			candidates = candidates.map((candidate) => candidate.slice(2));
		}
		let similar = [];
		let bestDistance = maxDistance;
		const minSimilarity = .4;
		candidates.forEach((candidate) => {
			if (candidate.length <= 1) return;
			const distance = editDistance(word, candidate);
			const length = Math.max(word.length, candidate.length);
			const similarity = (length - distance) / length;
			if (similarity > minSimilarity) {
				if (distance < bestDistance) {
					bestDistance = distance;
					similar = [candidate];
				} else if (distance === bestDistance) similar.push(candidate);
			}
		});
		similar.sort((a$1, b$2) => a$1.localeCompare(b$2));
		if (searchingOptions) similar = similar.map((candidate) => `--${candidate}`);
		if (similar.length > 1) return `\n(Did you mean one of ${similar.join(", ")}?)`;
		if (similar.length === 1) return `\n(Did you mean ${similar[0]}?)`;
		return "";
	}
	exports.suggestSimilar = suggestSimilar$1;
} });

//#endregion
//#region ../node_modules/trpc-cli/node_modules/commander/lib/command.js
var require_command = __commonJS$1({ "../node_modules/trpc-cli/node_modules/commander/lib/command.js"(exports) {
	const EventEmitter$1 = __require("node:events").EventEmitter;
	const childProcess = __require("node:child_process");
	const path$27 = __require("node:path");
	const fs$32 = __require("node:fs");
	const process$2 = __require("node:process");
	const { Argument: Argument$1, humanReadableArgName } = require_argument();
	const { CommanderError: CommanderError$1 } = require_error$1();
	const { Help: Help$1, stripColor } = require_help();
	const { Option: Option$1, DualOptions } = require_option();
	const { suggestSimilar } = require_suggestSimilar();
	var Command$2 = class Command$2 extends EventEmitter$1 {
		/**
		* Initialize a new `Command`.
		*
		* @param {string} [name]
		*/
		constructor(name) {
			super();
			/** @type {Command[]} */
			this.commands = [];
			/** @type {Option[]} */
			this.options = [];
			this.parent = null;
			this._allowUnknownOption = false;
			this._allowExcessArguments = false;
			/** @type {Argument[]} */
			this.registeredArguments = [];
			this._args = this.registeredArguments;
			/** @type {string[]} */
			this.args = [];
			this.rawArgs = [];
			this.processedArgs = [];
			this._scriptPath = null;
			this._name = name || "";
			this._optionValues = {};
			this._optionValueSources = {};
			this._storeOptionsAsProperties = false;
			this._actionHandler = null;
			this._executableHandler = false;
			this._executableFile = null;
			this._executableDir = null;
			this._defaultCommandName = null;
			this._exitCallback = null;
			this._aliases = [];
			this._combineFlagAndOptionalValue = true;
			this._description = "";
			this._summary = "";
			this._argsDescription = void 0;
			this._enablePositionalOptions = false;
			this._passThroughOptions = false;
			this._lifeCycleHooks = {};
			/** @type {(boolean | string)} */
			this._showHelpAfterError = false;
			this._showSuggestionAfterError = true;
			this._savedState = null;
			this._outputConfiguration = {
				writeOut: (str) => process$2.stdout.write(str),
				writeErr: (str) => process$2.stderr.write(str),
				outputError: (str, write) => write(str),
				getOutHelpWidth: () => process$2.stdout.isTTY ? process$2.stdout.columns : void 0,
				getErrHelpWidth: () => process$2.stderr.isTTY ? process$2.stderr.columns : void 0,
				getOutHasColors: () => useColor() ?? (process$2.stdout.isTTY && process$2.stdout.hasColors?.()),
				getErrHasColors: () => useColor() ?? (process$2.stderr.isTTY && process$2.stderr.hasColors?.()),
				stripColor: (str) => stripColor(str)
			};
			this._hidden = false;
			/** @type {(Option | null | undefined)} */
			this._helpOption = void 0;
			this._addImplicitHelpCommand = void 0;
			/** @type {Command} */
			this._helpCommand = void 0;
			this._helpConfiguration = {};
			/** @type {string | undefined} */
			this._helpGroupHeading = void 0;
			/** @type {string | undefined} */
			this._defaultCommandGroup = void 0;
			/** @type {string | undefined} */
			this._defaultOptionGroup = void 0;
		}
		/**
		* Copy settings that are useful to have in common across root command and subcommands.
		*
		* (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
		*
		* @param {Command} sourceCommand
		* @return {Command} `this` command for chaining
		*/
		copyInheritedSettings(sourceCommand) {
			this._outputConfiguration = sourceCommand._outputConfiguration;
			this._helpOption = sourceCommand._helpOption;
			this._helpCommand = sourceCommand._helpCommand;
			this._helpConfiguration = sourceCommand._helpConfiguration;
			this._exitCallback = sourceCommand._exitCallback;
			this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
			this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
			this._allowExcessArguments = sourceCommand._allowExcessArguments;
			this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
			this._showHelpAfterError = sourceCommand._showHelpAfterError;
			this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
			return this;
		}
		/**
		* @returns {Command[]}
		* @private
		*/
		_getCommandAndAncestors() {
			const result = [];
			for (let command = this; command; command = command.parent) result.push(command);
			return result;
		}
		/**
		* Define a command.
		*
		* There are two styles of command: pay attention to where to put the description.
		*
		* @example
		* // Command implemented using action handler (description is supplied separately to `.command`)
		* program
		*   .command('clone <source> [destination]')
		*   .description('clone a repository into a newly created directory')
		*   .action((source, destination) => {
		*     console.log('clone command called');
		*   });
		*
		* // Command implemented using separate executable file (description is second parameter to `.command`)
		* program
		*   .command('start <service>', 'start named service')
		*   .command('stop [service]', 'stop named service, or all if no name supplied');
		*
		* @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
		* @param {(object | string)} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
		* @param {object} [execOpts] - configuration options (for executable)
		* @return {Command} returns new command for action handler, or `this` for executable command
		*/
		command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
			let desc = actionOptsOrExecDesc;
			let opts = execOpts;
			if (typeof desc === "object" && desc !== null) {
				opts = desc;
				desc = null;
			}
			opts = opts || {};
			const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
			const cmd = this.createCommand(name);
			if (desc) {
				cmd.description(desc);
				cmd._executableHandler = true;
			}
			if (opts.isDefault) this._defaultCommandName = cmd._name;
			cmd._hidden = !!(opts.noHelp || opts.hidden);
			cmd._executableFile = opts.executableFile || null;
			if (args) cmd.arguments(args);
			this._registerCommand(cmd);
			cmd.parent = this;
			cmd.copyInheritedSettings(this);
			if (desc) return this;
			return cmd;
		}
		/**
		* Factory routine to create a new unattached command.
		*
		* See .command() for creating an attached subcommand, which uses this routine to
		* create the command. You can override createCommand to customise subcommands.
		*
		* @param {string} [name]
		* @return {Command} new command
		*/
		createCommand(name) {
			return new Command$2(name);
		}
		/**
		* You can customise the help with a subclass of Help by overriding createHelp,
		* or by overriding Help properties using configureHelp().
		*
		* @return {Help}
		*/
		createHelp() {
			return Object.assign(new Help$1(), this.configureHelp());
		}
		/**
		* You can customise the help by overriding Help properties using configureHelp(),
		* or with a subclass of Help by overriding createHelp().
		*
		* @param {object} [configuration] - configuration options
		* @return {(Command | object)} `this` command for chaining, or stored configuration
		*/
		configureHelp(configuration) {
			if (configuration === void 0) return this._helpConfiguration;
			this._helpConfiguration = configuration;
			return this;
		}
		/**
		* The default output goes to stdout and stderr. You can customise this for special
		* applications. You can also customise the display of errors by overriding outputError.
		*
		* The configuration properties are all functions:
		*
		*     // change how output being written, defaults to stdout and stderr
		*     writeOut(str)
		*     writeErr(str)
		*     // change how output being written for errors, defaults to writeErr
		*     outputError(str, write) // used for displaying errors and not used for displaying help
		*     // specify width for wrapping help
		*     getOutHelpWidth()
		*     getErrHelpWidth()
		*     // color support, currently only used with Help
		*     getOutHasColors()
		*     getErrHasColors()
		*     stripColor() // used to remove ANSI escape codes if output does not have colors
		*
		* @param {object} [configuration] - configuration options
		* @return {(Command | object)} `this` command for chaining, or stored configuration
		*/
		configureOutput(configuration) {
			if (configuration === void 0) return this._outputConfiguration;
			this._outputConfiguration = Object.assign({}, this._outputConfiguration, configuration);
			return this;
		}
		/**
		* Display the help or a custom message after an error occurs.
		*
		* @param {(boolean|string)} [displayHelp]
		* @return {Command} `this` command for chaining
		*/
		showHelpAfterError(displayHelp = true) {
			if (typeof displayHelp !== "string") displayHelp = !!displayHelp;
			this._showHelpAfterError = displayHelp;
			return this;
		}
		/**
		* Display suggestion of similar commands for unknown commands, or options for unknown options.
		*
		* @param {boolean} [displaySuggestion]
		* @return {Command} `this` command for chaining
		*/
		showSuggestionAfterError(displaySuggestion = true) {
			this._showSuggestionAfterError = !!displaySuggestion;
			return this;
		}
		/**
		* Add a prepared subcommand.
		*
		* See .command() for creating an attached subcommand which inherits settings from its parent.
		*
		* @param {Command} cmd - new subcommand
		* @param {object} [opts] - configuration options
		* @return {Command} `this` command for chaining
		*/
		addCommand(cmd, opts) {
			if (!cmd._name) throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
			opts = opts || {};
			if (opts.isDefault) this._defaultCommandName = cmd._name;
			if (opts.noHelp || opts.hidden) cmd._hidden = true;
			this._registerCommand(cmd);
			cmd.parent = this;
			cmd._checkForBrokenPassThrough();
			return this;
		}
		/**
		* Factory routine to create a new unattached argument.
		*
		* See .argument() for creating an attached argument, which uses this routine to
		* create the argument. You can override createArgument to return a custom argument.
		*
		* @param {string} name
		* @param {string} [description]
		* @return {Argument} new argument
		*/
		createArgument(name, description) {
			return new Argument$1(name, description);
		}
		/**
		* Define argument syntax for command.
		*
		* The default is that the argument is required, and you can explicitly
		* indicate this with <> around the name. Put [] around the name for an optional argument.
		*
		* @example
		* program.argument('<input-file>');
		* program.argument('[output-file]');
		*
		* @param {string} name
		* @param {string} [description]
		* @param {(Function|*)} [parseArg] - custom argument processing function or default value
		* @param {*} [defaultValue]
		* @return {Command} `this` command for chaining
		*/
		argument(name, description, parseArg, defaultValue) {
			const argument = this.createArgument(name, description);
			if (typeof parseArg === "function") argument.default(defaultValue).argParser(parseArg);
			else argument.default(parseArg);
			this.addArgument(argument);
			return this;
		}
		/**
		* Define argument syntax for command, adding multiple at once (without descriptions).
		*
		* See also .argument().
		*
		* @example
		* program.arguments('<cmd> [env]');
		*
		* @param {string} names
		* @return {Command} `this` command for chaining
		*/
		arguments(names) {
			names.trim().split(/ +/).forEach((detail) => {
				this.argument(detail);
			});
			return this;
		}
		/**
		* Define argument syntax for command, adding a prepared argument.
		*
		* @param {Argument} argument
		* @return {Command} `this` command for chaining
		*/
		addArgument(argument) {
			const previousArgument = this.registeredArguments.slice(-1)[0];
			if (previousArgument && previousArgument.variadic) throw new Error(`only the last argument can be variadic '${previousArgument.name()}'`);
			if (argument.required && argument.defaultValue !== void 0 && argument.parseArg === void 0) throw new Error(`a default value for a required argument is never used: '${argument.name()}'`);
			this.registeredArguments.push(argument);
			return this;
		}
		/**
		* Customise or override default help command. By default a help command is automatically added if your command has subcommands.
		*
		* @example
		*    program.helpCommand('help [cmd]');
		*    program.helpCommand('help [cmd]', 'show help');
		*    program.helpCommand(false); // suppress default help command
		*    program.helpCommand(true); // add help command even if no subcommands
		*
		* @param {string|boolean} enableOrNameAndArgs - enable with custom name and/or arguments, or boolean to override whether added
		* @param {string} [description] - custom description
		* @return {Command} `this` command for chaining
		*/
		helpCommand(enableOrNameAndArgs, description) {
			if (typeof enableOrNameAndArgs === "boolean") {
				this._addImplicitHelpCommand = enableOrNameAndArgs;
				if (enableOrNameAndArgs && this._defaultCommandGroup) this._initCommandGroup(this._getHelpCommand());
				return this;
			}
			const nameAndArgs = enableOrNameAndArgs ?? "help [command]";
			const [, helpName, helpArgs] = nameAndArgs.match(/([^ ]+) *(.*)/);
			const helpDescription = description ?? "display help for command";
			const helpCommand = this.createCommand(helpName);
			helpCommand.helpOption(false);
			if (helpArgs) helpCommand.arguments(helpArgs);
			if (helpDescription) helpCommand.description(helpDescription);
			this._addImplicitHelpCommand = true;
			this._helpCommand = helpCommand;
			if (enableOrNameAndArgs || description) this._initCommandGroup(helpCommand);
			return this;
		}
		/**
		* Add prepared custom help command.
		*
		* @param {(Command|string|boolean)} helpCommand - custom help command, or deprecated enableOrNameAndArgs as for `.helpCommand()`
		* @param {string} [deprecatedDescription] - deprecated custom description used with custom name only
		* @return {Command} `this` command for chaining
		*/
		addHelpCommand(helpCommand, deprecatedDescription) {
			if (typeof helpCommand !== "object") {
				this.helpCommand(helpCommand, deprecatedDescription);
				return this;
			}
			this._addImplicitHelpCommand = true;
			this._helpCommand = helpCommand;
			this._initCommandGroup(helpCommand);
			return this;
		}
		/**
		* Lazy create help command.
		*
		* @return {(Command|null)}
		* @package
		*/
		_getHelpCommand() {
			const hasImplicitHelpCommand = this._addImplicitHelpCommand ?? (this.commands.length && !this._actionHandler && !this._findCommand("help"));
			if (hasImplicitHelpCommand) {
				if (this._helpCommand === void 0) this.helpCommand(void 0, void 0);
				return this._helpCommand;
			}
			return null;
		}
		/**
		* Add hook for life cycle event.
		*
		* @param {string} event
		* @param {Function} listener
		* @return {Command} `this` command for chaining
		*/
		hook(event, listener) {
			const allowedValues = [
				"preSubcommand",
				"preAction",
				"postAction"
			];
			if (!allowedValues.includes(event)) throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
			if (this._lifeCycleHooks[event]) this._lifeCycleHooks[event].push(listener);
			else this._lifeCycleHooks[event] = [listener];
			return this;
		}
		/**
		* Register callback to use as replacement for calling process.exit.
		*
		* @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
		* @return {Command} `this` command for chaining
		*/
		exitOverride(fn) {
			if (fn) this._exitCallback = fn;
			else this._exitCallback = (err) => {
				if (err.code !== "commander.executeSubCommandAsync") throw err;
			};
			return this;
		}
		/**
		* Call process.exit, and _exitCallback if defined.
		*
		* @param {number} exitCode exit code for using with process.exit
		* @param {string} code an id string representing the error
		* @param {string} message human-readable description of the error
		* @return never
		* @private
		*/
		_exit(exitCode, code, message) {
			if (this._exitCallback) this._exitCallback(new CommanderError$1(exitCode, code, message));
			process$2.exit(exitCode);
		}
		/**
		* Register callback `fn` for the command.
		*
		* @example
		* program
		*   .command('serve')
		*   .description('start service')
		*   .action(function() {
		*      // do work here
		*   });
		*
		* @param {Function} fn
		* @return {Command} `this` command for chaining
		*/
		action(fn) {
			const listener = (args) => {
				const expectedArgsCount = this.registeredArguments.length;
				const actionArgs = args.slice(0, expectedArgsCount);
				if (this._storeOptionsAsProperties) actionArgs[expectedArgsCount] = this;
				else actionArgs[expectedArgsCount] = this.opts();
				actionArgs.push(this);
				return fn.apply(this, actionArgs);
			};
			this._actionHandler = listener;
			return this;
		}
		/**
		* Factory routine to create a new unattached option.
		*
		* See .option() for creating an attached option, which uses this routine to
		* create the option. You can override createOption to return a custom option.
		*
		* @param {string} flags
		* @param {string} [description]
		* @return {Option} new option
		*/
		createOption(flags, description) {
			return new Option$1(flags, description);
		}
		/**
		* Wrap parseArgs to catch 'commander.invalidArgument'.
		*
		* @param {(Option | Argument)} target
		* @param {string} value
		* @param {*} previous
		* @param {string} invalidArgumentMessage
		* @private
		*/
		_callParseArg(target, value, previous, invalidArgumentMessage) {
			try {
				return target.parseArg(value, previous);
			} catch (err) {
				if (err.code === "commander.invalidArgument") {
					const message = `${invalidArgumentMessage} ${err.message}`;
					this.error(message, {
						exitCode: err.exitCode,
						code: err.code
					});
				}
				throw err;
			}
		}
		/**
		* Check for option flag conflicts.
		* Register option if no conflicts found, or throw on conflict.
		*
		* @param {Option} option
		* @private
		*/
		_registerOption(option) {
			const matchingOption = option.short && this._findOption(option.short) || option.long && this._findOption(option.long);
			if (matchingOption) {
				const matchingFlag = option.long && this._findOption(option.long) ? option.long : option.short;
				throw new Error(`Cannot add option '${option.flags}'${this._name && ` to command '${this._name}'`} due to conflicting flag '${matchingFlag}'
-  already used by option '${matchingOption.flags}'`);
			}
			this._initOptionGroup(option);
			this.options.push(option);
		}
		/**
		* Check for command name and alias conflicts with existing commands.
		* Register command if no conflicts found, or throw on conflict.
		*
		* @param {Command} command
		* @private
		*/
		_registerCommand(command) {
			const knownBy = (cmd) => {
				return [cmd.name()].concat(cmd.aliases());
			};
			const alreadyUsed = knownBy(command).find((name) => this._findCommand(name));
			if (alreadyUsed) {
				const existingCmd = knownBy(this._findCommand(alreadyUsed)).join("|");
				const newCmd = knownBy(command).join("|");
				throw new Error(`cannot add command '${newCmd}' as already have command '${existingCmd}'`);
			}
			this._initCommandGroup(command);
			this.commands.push(command);
		}
		/**
		* Add an option.
		*
		* @param {Option} option
		* @return {Command} `this` command for chaining
		*/
		addOption(option) {
			this._registerOption(option);
			const oname = option.name();
			const name = option.attributeName();
			if (option.negate) {
				const positiveLongFlag = option.long.replace(/^--no-/, "--");
				if (!this._findOption(positiveLongFlag)) this.setOptionValueWithSource(name, option.defaultValue === void 0 ? true : option.defaultValue, "default");
			} else if (option.defaultValue !== void 0) this.setOptionValueWithSource(name, option.defaultValue, "default");
			const handleOptionValue = (val, invalidValueMessage, valueSource) => {
				if (val == null && option.presetArg !== void 0) val = option.presetArg;
				const oldValue = this.getOptionValue(name);
				if (val !== null && option.parseArg) val = this._callParseArg(option, val, oldValue, invalidValueMessage);
				else if (val !== null && option.variadic) val = option._concatValue(val, oldValue);
				if (val == null) if (option.negate) val = false;
				else if (option.isBoolean() || option.optional) val = true;
				else val = "";
				this.setOptionValueWithSource(name, val, valueSource);
			};
			this.on("option:" + oname, (val) => {
				const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
				handleOptionValue(val, invalidValueMessage, "cli");
			});
			if (option.envVar) this.on("optionEnv:" + oname, (val) => {
				const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
				handleOptionValue(val, invalidValueMessage, "env");
			});
			return this;
		}
		/**
		* Internal implementation shared by .option() and .requiredOption()
		*
		* @return {Command} `this` command for chaining
		* @private
		*/
		_optionEx(config, flags, description, fn, defaultValue) {
			if (typeof flags === "object" && flags instanceof Option$1) throw new Error("To add an Option object use addOption() instead of option() or requiredOption()");
			const option = this.createOption(flags, description);
			option.makeOptionMandatory(!!config.mandatory);
			if (typeof fn === "function") option.default(defaultValue).argParser(fn);
			else if (fn instanceof RegExp) {
				const regex = fn;
				fn = (val, def) => {
					const m$1 = regex.exec(val);
					return m$1 ? m$1[0] : def;
				};
				option.default(defaultValue).argParser(fn);
			} else option.default(fn);
			return this.addOption(option);
		}
		/**
		* Define option with `flags`, `description`, and optional argument parsing function or `defaultValue` or both.
		*
		* The `flags` string contains the short and/or long flags, separated by comma, a pipe or space. A required
		* option-argument is indicated by `<>` and an optional option-argument by `[]`.
		*
		* See the README for more details, and see also addOption() and requiredOption().
		*
		* @example
		* program
		*     .option('-p, --pepper', 'add pepper')
		*     .option('--pt, --pizza-type <TYPE>', 'type of pizza') // required option-argument
		*     .option('-c, --cheese [CHEESE]', 'add extra cheese', 'mozzarella') // optional option-argument with default
		*     .option('-t, --tip <VALUE>', 'add tip to purchase cost', parseFloat) // custom parse function
		*
		* @param {string} flags
		* @param {string} [description]
		* @param {(Function|*)} [parseArg] - custom option processing function or default value
		* @param {*} [defaultValue]
		* @return {Command} `this` command for chaining
		*/
		option(flags, description, parseArg, defaultValue) {
			return this._optionEx({}, flags, description, parseArg, defaultValue);
		}
		/**
		* Add a required option which must have a value after parsing. This usually means
		* the option must be specified on the command line. (Otherwise the same as .option().)
		*
		* The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
		*
		* @param {string} flags
		* @param {string} [description]
		* @param {(Function|*)} [parseArg] - custom option processing function or default value
		* @param {*} [defaultValue]
		* @return {Command} `this` command for chaining
		*/
		requiredOption(flags, description, parseArg, defaultValue) {
			return this._optionEx({ mandatory: true }, flags, description, parseArg, defaultValue);
		}
		/**
		* Alter parsing of short flags with optional values.
		*
		* @example
		* // for `.option('-f,--flag [value]'):
		* program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
		* program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
		*
		* @param {boolean} [combine] - if `true` or omitted, an optional value can be specified directly after the flag.
		* @return {Command} `this` command for chaining
		*/
		combineFlagAndOptionalValue(combine = true) {
			this._combineFlagAndOptionalValue = !!combine;
			return this;
		}
		/**
		* Allow unknown options on the command line.
		*
		* @param {boolean} [allowUnknown] - if `true` or omitted, no error will be thrown for unknown options.
		* @return {Command} `this` command for chaining
		*/
		allowUnknownOption(allowUnknown = true) {
			this._allowUnknownOption = !!allowUnknown;
			return this;
		}
		/**
		* Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
		*
		* @param {boolean} [allowExcess] - if `true` or omitted, no error will be thrown for excess arguments.
		* @return {Command} `this` command for chaining
		*/
		allowExcessArguments(allowExcess = true) {
			this._allowExcessArguments = !!allowExcess;
			return this;
		}
		/**
		* Enable positional options. Positional means global options are specified before subcommands which lets
		* subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
		* The default behaviour is non-positional and global options may appear anywhere on the command line.
		*
		* @param {boolean} [positional]
		* @return {Command} `this` command for chaining
		*/
		enablePositionalOptions(positional = true) {
			this._enablePositionalOptions = !!positional;
			return this;
		}
		/**
		* Pass through options that come after command-arguments rather than treat them as command-options,
		* so actual command-options come before command-arguments. Turning this on for a subcommand requires
		* positional options to have been enabled on the program (parent commands).
		* The default behaviour is non-positional and options may appear before or after command-arguments.
		*
		* @param {boolean} [passThrough] for unknown options.
		* @return {Command} `this` command for chaining
		*/
		passThroughOptions(passThrough = true) {
			this._passThroughOptions = !!passThrough;
			this._checkForBrokenPassThrough();
			return this;
		}
		/**
		* @private
		*/
		_checkForBrokenPassThrough() {
			if (this.parent && this._passThroughOptions && !this.parent._enablePositionalOptions) throw new Error(`passThroughOptions cannot be used for '${this._name}' without turning on enablePositionalOptions for parent command(s)`);
		}
		/**
		* Whether to store option values as properties on command object,
		* or store separately (specify false). In both cases the option values can be accessed using .opts().
		*
		* @param {boolean} [storeAsProperties=true]
		* @return {Command} `this` command for chaining
		*/
		storeOptionsAsProperties(storeAsProperties = true) {
			if (this.options.length) throw new Error("call .storeOptionsAsProperties() before adding options");
			if (Object.keys(this._optionValues).length) throw new Error("call .storeOptionsAsProperties() before setting option values");
			this._storeOptionsAsProperties = !!storeAsProperties;
			return this;
		}
		/**
		* Retrieve option value.
		*
		* @param {string} key
		* @return {object} value
		*/
		getOptionValue(key) {
			if (this._storeOptionsAsProperties) return this[key];
			return this._optionValues[key];
		}
		/**
		* Store option value.
		*
		* @param {string} key
		* @param {object} value
		* @return {Command} `this` command for chaining
		*/
		setOptionValue(key, value) {
			return this.setOptionValueWithSource(key, value, void 0);
		}
		/**
		* Store option value and where the value came from.
		*
		* @param {string} key
		* @param {object} value
		* @param {string} source - expected values are default/config/env/cli/implied
		* @return {Command} `this` command for chaining
		*/
		setOptionValueWithSource(key, value, source) {
			if (this._storeOptionsAsProperties) this[key] = value;
			else this._optionValues[key] = value;
			this._optionValueSources[key] = source;
			return this;
		}
		/**
		* Get source of option value.
		* Expected values are default | config | env | cli | implied
		*
		* @param {string} key
		* @return {string}
		*/
		getOptionValueSource(key) {
			return this._optionValueSources[key];
		}
		/**
		* Get source of option value. See also .optsWithGlobals().
		* Expected values are default | config | env | cli | implied
		*
		* @param {string} key
		* @return {string}
		*/
		getOptionValueSourceWithGlobals(key) {
			let source;
			this._getCommandAndAncestors().forEach((cmd) => {
				if (cmd.getOptionValueSource(key) !== void 0) source = cmd.getOptionValueSource(key);
			});
			return source;
		}
		/**
		* Get user arguments from implied or explicit arguments.
		* Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
		*
		* @private
		*/
		_prepareUserArgs(argv$1, parseOptions) {
			if (argv$1 !== void 0 && !Array.isArray(argv$1)) throw new Error("first parameter to parse must be array or undefined");
			parseOptions = parseOptions || {};
			if (argv$1 === void 0 && parseOptions.from === void 0) {
				if (process$2.versions?.electron) parseOptions.from = "electron";
				const execArgv$1 = process$2.execArgv ?? [];
				if (execArgv$1.includes("-e") || execArgv$1.includes("--eval") || execArgv$1.includes("-p") || execArgv$1.includes("--print")) parseOptions.from = "eval";
			}
			if (argv$1 === void 0) argv$1 = process$2.argv;
			this.rawArgs = argv$1.slice();
			let userArgs;
			switch (parseOptions.from) {
				case void 0:
				case "node":
					this._scriptPath = argv$1[1];
					userArgs = argv$1.slice(2);
					break;
				case "electron":
					if (process$2.defaultApp) {
						this._scriptPath = argv$1[1];
						userArgs = argv$1.slice(2);
					} else userArgs = argv$1.slice(1);
					break;
				case "user":
					userArgs = argv$1.slice(0);
					break;
				case "eval":
					userArgs = argv$1.slice(1);
					break;
				default: throw new Error(`unexpected parse option { from: '${parseOptions.from}' }`);
			}
			if (!this._name && this._scriptPath) this.nameFromFilename(this._scriptPath);
			this._name = this._name || "program";
			return userArgs;
		}
		/**
		* Parse `argv`, setting options and invoking commands when defined.
		*
		* Use parseAsync instead of parse if any of your action handlers are async.
		*
		* Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
		*
		* Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
		* - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
		* - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
		* - `'user'`: just user arguments
		*
		* @example
		* program.parse(); // parse process.argv and auto-detect electron and special node flags
		* program.parse(process.argv); // assume argv[0] is app and argv[1] is script
		* program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
		*
		* @param {string[]} [argv] - optional, defaults to process.argv
		* @param {object} [parseOptions] - optionally specify style of options with from: node/user/electron
		* @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
		* @return {Command} `this` command for chaining
		*/
		parse(argv$1, parseOptions) {
			this._prepareForParse();
			const userArgs = this._prepareUserArgs(argv$1, parseOptions);
			this._parseCommand([], userArgs);
			return this;
		}
		/**
		* Parse `argv`, setting options and invoking commands when defined.
		*
		* Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
		*
		* Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
		* - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
		* - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
		* - `'user'`: just user arguments
		*
		* @example
		* await program.parseAsync(); // parse process.argv and auto-detect electron and special node flags
		* await program.parseAsync(process.argv); // assume argv[0] is app and argv[1] is script
		* await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
		*
		* @param {string[]} [argv]
		* @param {object} [parseOptions]
		* @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
		* @return {Promise}
		*/
		async parseAsync(argv$1, parseOptions) {
			this._prepareForParse();
			const userArgs = this._prepareUserArgs(argv$1, parseOptions);
			await this._parseCommand([], userArgs);
			return this;
		}
		_prepareForParse() {
			if (this._savedState === null) this.saveStateBeforeParse();
			else this.restoreStateBeforeParse();
		}
		/**
		* Called the first time parse is called to save state and allow a restore before subsequent calls to parse.
		* Not usually called directly, but available for subclasses to save their custom state.
		*
		* This is called in a lazy way. Only commands used in parsing chain will have state saved.
		*/
		saveStateBeforeParse() {
			this._savedState = {
				_name: this._name,
				_optionValues: { ...this._optionValues },
				_optionValueSources: { ...this._optionValueSources }
			};
		}
		/**
		* Restore state before parse for calls after the first.
		* Not usually called directly, but available for subclasses to save their custom state.
		*
		* This is called in a lazy way. Only commands used in parsing chain will have state restored.
		*/
		restoreStateBeforeParse() {
			if (this._storeOptionsAsProperties) throw new Error(`Can not call parse again when storeOptionsAsProperties is true.
- either make a new Command for each call to parse, or stop storing options as properties`);
			this._name = this._savedState._name;
			this._scriptPath = null;
			this.rawArgs = [];
			this._optionValues = { ...this._savedState._optionValues };
			this._optionValueSources = { ...this._savedState._optionValueSources };
			this.args = [];
			this.processedArgs = [];
		}
		/**
		* Throw if expected executable is missing. Add lots of help for author.
		*
		* @param {string} executableFile
		* @param {string} executableDir
		* @param {string} subcommandName
		*/
		_checkForMissingExecutable(executableFile, executableDir, subcommandName) {
			if (fs$32.existsSync(executableFile)) return;
			const executableDirMessage = executableDir ? `searched for local subcommand relative to directory '${executableDir}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory";
			const executableMissing = `'${executableFile}' does not exist
 - if '${subcommandName}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
			throw new Error(executableMissing);
		}
		/**
		* Execute a sub-command executable.
		*
		* @private
		*/
		_executeSubCommand(subcommand, args) {
			args = args.slice();
			let launchWithNode = false;
			const sourceExt = [
				".js",
				".ts",
				".tsx",
				".mjs",
				".cjs"
			];
			function findFile(baseDir, baseName) {
				const localBin = path$27.resolve(baseDir, baseName);
				if (fs$32.existsSync(localBin)) return localBin;
				if (sourceExt.includes(path$27.extname(baseName))) return void 0;
				const foundExt = sourceExt.find((ext) => fs$32.existsSync(`${localBin}${ext}`));
				if (foundExt) return `${localBin}${foundExt}`;
				return void 0;
			}
			this._checkForMissingMandatoryOptions();
			this._checkForConflictingOptions();
			let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
			let executableDir = this._executableDir || "";
			if (this._scriptPath) {
				let resolvedScriptPath;
				try {
					resolvedScriptPath = fs$32.realpathSync(this._scriptPath);
				} catch {
					resolvedScriptPath = this._scriptPath;
				}
				executableDir = path$27.resolve(path$27.dirname(resolvedScriptPath), executableDir);
			}
			if (executableDir) {
				let localFile = findFile(executableDir, executableFile);
				if (!localFile && !subcommand._executableFile && this._scriptPath) {
					const legacyName = path$27.basename(this._scriptPath, path$27.extname(this._scriptPath));
					if (legacyName !== this._name) localFile = findFile(executableDir, `${legacyName}-${subcommand._name}`);
				}
				executableFile = localFile || executableFile;
			}
			launchWithNode = sourceExt.includes(path$27.extname(executableFile));
			let proc;
			if (process$2.platform !== "win32") if (launchWithNode) {
				args.unshift(executableFile);
				args = incrementNodeInspectorPort(process$2.execArgv).concat(args);
				proc = childProcess.spawn(process$2.argv[0], args, { stdio: "inherit" });
			} else proc = childProcess.spawn(executableFile, args, { stdio: "inherit" });
			else {
				this._checkForMissingExecutable(executableFile, executableDir, subcommand._name);
				args.unshift(executableFile);
				args = incrementNodeInspectorPort(process$2.execArgv).concat(args);
				proc = childProcess.spawn(process$2.execPath, args, { stdio: "inherit" });
			}
			if (!proc.killed) {
				const signals$1 = [
					"SIGUSR1",
					"SIGUSR2",
					"SIGTERM",
					"SIGINT",
					"SIGHUP"
				];
				signals$1.forEach((signal) => {
					process$2.on(signal, () => {
						if (proc.killed === false && proc.exitCode === null) proc.kill(signal);
					});
				});
			}
			const exitCallback = this._exitCallback;
			proc.on("close", (code) => {
				code = code ?? 1;
				if (!exitCallback) process$2.exit(code);
				else exitCallback(new CommanderError$1(code, "commander.executeSubCommandAsync", "(close)"));
			});
			proc.on("error", (err) => {
				if (err.code === "ENOENT") this._checkForMissingExecutable(executableFile, executableDir, subcommand._name);
				else if (err.code === "EACCES") throw new Error(`'${executableFile}' not executable`);
				if (!exitCallback) process$2.exit(1);
				else {
					const wrappedError = new CommanderError$1(1, "commander.executeSubCommandAsync", "(error)");
					wrappedError.nestedError = err;
					exitCallback(wrappedError);
				}
			});
			this.runningCommand = proc;
		}
		/**
		* @private
		*/
		_dispatchSubcommand(commandName, operands, unknown) {
			const subCommand = this._findCommand(commandName);
			if (!subCommand) this.help({ error: true });
			subCommand._prepareForParse();
			let promiseChain;
			promiseChain = this._chainOrCallSubCommandHook(promiseChain, subCommand, "preSubcommand");
			promiseChain = this._chainOrCall(promiseChain, () => {
				if (subCommand._executableHandler) this._executeSubCommand(subCommand, operands.concat(unknown));
				else return subCommand._parseCommand(operands, unknown);
			});
			return promiseChain;
		}
		/**
		* Invoke help directly if possible, or dispatch if necessary.
		* e.g. help foo
		*
		* @private
		*/
		_dispatchHelpCommand(subcommandName) {
			if (!subcommandName) this.help();
			const subCommand = this._findCommand(subcommandName);
			if (subCommand && !subCommand._executableHandler) subCommand.help();
			return this._dispatchSubcommand(subcommandName, [], [this._getHelpOption()?.long ?? this._getHelpOption()?.short ?? "--help"]);
		}
		/**
		* Check this.args against expected this.registeredArguments.
		*
		* @private
		*/
		_checkNumberOfArguments() {
			this.registeredArguments.forEach((arg, i$1) => {
				if (arg.required && this.args[i$1] == null) this.missingArgument(arg.name());
			});
			if (this.registeredArguments.length > 0 && this.registeredArguments[this.registeredArguments.length - 1].variadic) return;
			if (this.args.length > this.registeredArguments.length) this._excessArguments(this.args);
		}
		/**
		* Process this.args using this.registeredArguments and save as this.processedArgs!
		*
		* @private
		*/
		_processArguments() {
			const myParseArg = (argument, value, previous) => {
				let parsedValue = value;
				if (value !== null && argument.parseArg) {
					const invalidValueMessage = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'.`;
					parsedValue = this._callParseArg(argument, value, previous, invalidValueMessage);
				}
				return parsedValue;
			};
			this._checkNumberOfArguments();
			const processedArgs = [];
			this.registeredArguments.forEach((declaredArg, index) => {
				let value = declaredArg.defaultValue;
				if (declaredArg.variadic) {
					if (index < this.args.length) {
						value = this.args.slice(index);
						if (declaredArg.parseArg) value = value.reduce((processed, v$1) => {
							return myParseArg(declaredArg, v$1, processed);
						}, declaredArg.defaultValue);
					} else if (value === void 0) value = [];
				} else if (index < this.args.length) {
					value = this.args[index];
					if (declaredArg.parseArg) value = myParseArg(declaredArg, value, declaredArg.defaultValue);
				}
				processedArgs[index] = value;
			});
			this.processedArgs = processedArgs;
		}
		/**
		* Once we have a promise we chain, but call synchronously until then.
		*
		* @param {(Promise|undefined)} promise
		* @param {Function} fn
		* @return {(Promise|undefined)}
		* @private
		*/
		_chainOrCall(promise$1, fn) {
			if (promise$1 && promise$1.then && typeof promise$1.then === "function") return promise$1.then(() => fn());
			return fn();
		}
		/**
		*
		* @param {(Promise|undefined)} promise
		* @param {string} event
		* @return {(Promise|undefined)}
		* @private
		*/
		_chainOrCallHooks(promise$1, event) {
			let result = promise$1;
			const hooks = [];
			this._getCommandAndAncestors().reverse().filter((cmd) => cmd._lifeCycleHooks[event] !== void 0).forEach((hookedCommand) => {
				hookedCommand._lifeCycleHooks[event].forEach((callback) => {
					hooks.push({
						hookedCommand,
						callback
					});
				});
			});
			if (event === "postAction") hooks.reverse();
			hooks.forEach((hookDetail) => {
				result = this._chainOrCall(result, () => {
					return hookDetail.callback(hookDetail.hookedCommand, this);
				});
			});
			return result;
		}
		/**
		*
		* @param {(Promise|undefined)} promise
		* @param {Command} subCommand
		* @param {string} event
		* @return {(Promise|undefined)}
		* @private
		*/
		_chainOrCallSubCommandHook(promise$1, subCommand, event) {
			let result = promise$1;
			if (this._lifeCycleHooks[event] !== void 0) this._lifeCycleHooks[event].forEach((hook) => {
				result = this._chainOrCall(result, () => {
					return hook(this, subCommand);
				});
			});
			return result;
		}
		/**
		* Process arguments in context of this command.
		* Returns action result, in case it is a promise.
		*
		* @private
		*/
		_parseCommand(operands, unknown) {
			const parsed = this.parseOptions(unknown);
			this._parseOptionsEnv();
			this._parseOptionsImplied();
			operands = operands.concat(parsed.operands);
			unknown = parsed.unknown;
			this.args = operands.concat(unknown);
			if (operands && this._findCommand(operands[0])) return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
			if (this._getHelpCommand() && operands[0] === this._getHelpCommand().name()) return this._dispatchHelpCommand(operands[1]);
			if (this._defaultCommandName) {
				this._outputHelpIfRequested(unknown);
				return this._dispatchSubcommand(this._defaultCommandName, operands, unknown);
			}
			if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) this.help({ error: true });
			this._outputHelpIfRequested(parsed.unknown);
			this._checkForMissingMandatoryOptions();
			this._checkForConflictingOptions();
			const checkForUnknownOptions = () => {
				if (parsed.unknown.length > 0) this.unknownOption(parsed.unknown[0]);
			};
			const commandEvent = `command:${this.name()}`;
			if (this._actionHandler) {
				checkForUnknownOptions();
				this._processArguments();
				let promiseChain;
				promiseChain = this._chainOrCallHooks(promiseChain, "preAction");
				promiseChain = this._chainOrCall(promiseChain, () => this._actionHandler(this.processedArgs));
				if (this.parent) promiseChain = this._chainOrCall(promiseChain, () => {
					this.parent.emit(commandEvent, operands, unknown);
				});
				promiseChain = this._chainOrCallHooks(promiseChain, "postAction");
				return promiseChain;
			}
			if (this.parent && this.parent.listenerCount(commandEvent)) {
				checkForUnknownOptions();
				this._processArguments();
				this.parent.emit(commandEvent, operands, unknown);
			} else if (operands.length) {
				if (this._findCommand("*")) return this._dispatchSubcommand("*", operands, unknown);
				if (this.listenerCount("command:*")) this.emit("command:*", operands, unknown);
				else if (this.commands.length) this.unknownCommand();
				else {
					checkForUnknownOptions();
					this._processArguments();
				}
			} else if (this.commands.length) {
				checkForUnknownOptions();
				this.help({ error: true });
			} else {
				checkForUnknownOptions();
				this._processArguments();
			}
		}
		/**
		* Find matching command.
		*
		* @private
		* @return {Command | undefined}
		*/
		_findCommand(name) {
			if (!name) return void 0;
			return this.commands.find((cmd) => cmd._name === name || cmd._aliases.includes(name));
		}
		/**
		* Return an option matching `arg` if any.
		*
		* @param {string} arg
		* @return {Option}
		* @package
		*/
		_findOption(arg) {
			return this.options.find((option) => option.is(arg));
		}
		/**
		* Display an error message if a mandatory option does not have a value.
		* Called after checking for help flags in leaf subcommand.
		*
		* @private
		*/
		_checkForMissingMandatoryOptions() {
			this._getCommandAndAncestors().forEach((cmd) => {
				cmd.options.forEach((anOption) => {
					if (anOption.mandatory && cmd.getOptionValue(anOption.attributeName()) === void 0) cmd.missingMandatoryOptionValue(anOption);
				});
			});
		}
		/**
		* Display an error message if conflicting options are used together in this.
		*
		* @private
		*/
		_checkForConflictingLocalOptions() {
			const definedNonDefaultOptions = this.options.filter((option) => {
				const optionKey = option.attributeName();
				if (this.getOptionValue(optionKey) === void 0) return false;
				return this.getOptionValueSource(optionKey) !== "default";
			});
			const optionsWithConflicting = definedNonDefaultOptions.filter((option) => option.conflictsWith.length > 0);
			optionsWithConflicting.forEach((option) => {
				const conflictingAndDefined = definedNonDefaultOptions.find((defined) => option.conflictsWith.includes(defined.attributeName()));
				if (conflictingAndDefined) this._conflictingOption(option, conflictingAndDefined);
			});
		}
		/**
		* Display an error message if conflicting options are used together.
		* Called after checking for help flags in leaf subcommand.
		*
		* @private
		*/
		_checkForConflictingOptions() {
			this._getCommandAndAncestors().forEach((cmd) => {
				cmd._checkForConflictingLocalOptions();
			});
		}
		/**
		* Parse options from `argv` removing known options,
		* and return argv split into operands and unknown arguments.
		*
		* Side effects: modifies command by storing options. Does not reset state if called again.
		*
		* Examples:
		*
		*     argv => operands, unknown
		*     --known kkk op => [op], []
		*     op --known kkk => [op], []
		*     sub --unknown uuu op => [sub], [--unknown uuu op]
		*     sub -- --unknown uuu op => [sub --unknown uuu op], []
		*
		* @param {string[]} argv
		* @return {{operands: string[], unknown: string[]}}
		*/
		parseOptions(argv$1) {
			const operands = [];
			const unknown = [];
			let dest = operands;
			const args = argv$1.slice();
			function maybeOption(arg) {
				return arg.length > 1 && arg[0] === "-";
			}
			const negativeNumberArg = (arg) => {
				if (!/^-\d*\.?\d+(e[+-]?\d+)?$/.test(arg)) return false;
				return !this._getCommandAndAncestors().some((cmd) => cmd.options.map((opt) => opt.short).some((short) => /^-\d$/.test(short)));
			};
			let activeVariadicOption = null;
			while (args.length) {
				const arg = args.shift();
				if (arg === "--") {
					if (dest === unknown) dest.push(arg);
					dest.push(...args);
					break;
				}
				if (activeVariadicOption && (!maybeOption(arg) || negativeNumberArg(arg))) {
					this.emit(`option:${activeVariadicOption.name()}`, arg);
					continue;
				}
				activeVariadicOption = null;
				if (maybeOption(arg)) {
					const option = this._findOption(arg);
					if (option) {
						if (option.required) {
							const value = args.shift();
							if (value === void 0) this.optionMissingArgument(option);
							this.emit(`option:${option.name()}`, value);
						} else if (option.optional) {
							let value = null;
							if (args.length > 0 && (!maybeOption(args[0]) || negativeNumberArg(args[0]))) value = args.shift();
							this.emit(`option:${option.name()}`, value);
						} else this.emit(`option:${option.name()}`);
						activeVariadicOption = option.variadic ? option : null;
						continue;
					}
				}
				if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
					const option = this._findOption(`-${arg[1]}`);
					if (option) {
						if (option.required || option.optional && this._combineFlagAndOptionalValue) this.emit(`option:${option.name()}`, arg.slice(2));
						else {
							this.emit(`option:${option.name()}`);
							args.unshift(`-${arg.slice(2)}`);
						}
						continue;
					}
				}
				if (/^--[^=]+=/.test(arg)) {
					const index = arg.indexOf("=");
					const option = this._findOption(arg.slice(0, index));
					if (option && (option.required || option.optional)) {
						this.emit(`option:${option.name()}`, arg.slice(index + 1));
						continue;
					}
				}
				if (dest === operands && maybeOption(arg) && !(this.commands.length === 0 && negativeNumberArg(arg))) dest = unknown;
				if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
					if (this._findCommand(arg)) {
						operands.push(arg);
						if (args.length > 0) unknown.push(...args);
						break;
					} else if (this._getHelpCommand() && arg === this._getHelpCommand().name()) {
						operands.push(arg);
						if (args.length > 0) operands.push(...args);
						break;
					} else if (this._defaultCommandName) {
						unknown.push(arg);
						if (args.length > 0) unknown.push(...args);
						break;
					}
				}
				if (this._passThroughOptions) {
					dest.push(arg);
					if (args.length > 0) dest.push(...args);
					break;
				}
				dest.push(arg);
			}
			return {
				operands,
				unknown
			};
		}
		/**
		* Return an object containing local option values as key-value pairs.
		*
		* @return {object}
		*/
		opts() {
			if (this._storeOptionsAsProperties) {
				const result = {};
				const len = this.options.length;
				for (let i$1 = 0; i$1 < len; i$1++) {
					const key = this.options[i$1].attributeName();
					result[key] = key === this._versionOptionName ? this._version : this[key];
				}
				return result;
			}
			return this._optionValues;
		}
		/**
		* Return an object containing merged local and global option values as key-value pairs.
		*
		* @return {object}
		*/
		optsWithGlobals() {
			return this._getCommandAndAncestors().reduce((combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()), {});
		}
		/**
		* Display error message and exit (or call exitOverride).
		*
		* @param {string} message
		* @param {object} [errorOptions]
		* @param {string} [errorOptions.code] - an id string representing the error
		* @param {number} [errorOptions.exitCode] - used with process.exit
		*/
		error(message, errorOptions) {
			this._outputConfiguration.outputError(`${message}\n`, this._outputConfiguration.writeErr);
			if (typeof this._showHelpAfterError === "string") this._outputConfiguration.writeErr(`${this._showHelpAfterError}\n`);
			else if (this._showHelpAfterError) {
				this._outputConfiguration.writeErr("\n");
				this.outputHelp({ error: true });
			}
			const config = errorOptions || {};
			const exitCode = config.exitCode || 1;
			const code = config.code || "commander.error";
			this._exit(exitCode, code, message);
		}
		/**
		* Apply any option related environment variables, if option does
		* not have a value from cli or client code.
		*
		* @private
		*/
		_parseOptionsEnv() {
			this.options.forEach((option) => {
				if (option.envVar && option.envVar in process$2.env) {
					const optionKey = option.attributeName();
					if (this.getOptionValue(optionKey) === void 0 || [
						"default",
						"config",
						"env"
					].includes(this.getOptionValueSource(optionKey))) if (option.required || option.optional) this.emit(`optionEnv:${option.name()}`, process$2.env[option.envVar]);
					else this.emit(`optionEnv:${option.name()}`);
				}
			});
		}
		/**
		* Apply any implied option values, if option is undefined or default value.
		*
		* @private
		*/
		_parseOptionsImplied() {
			const dualHelper = new DualOptions(this.options);
			const hasCustomOptionValue = (optionKey) => {
				return this.getOptionValue(optionKey) !== void 0 && !["default", "implied"].includes(this.getOptionValueSource(optionKey));
			};
			this.options.filter((option) => option.implied !== void 0 && hasCustomOptionValue(option.attributeName()) && dualHelper.valueFromOption(this.getOptionValue(option.attributeName()), option)).forEach((option) => {
				Object.keys(option.implied).filter((impliedKey) => !hasCustomOptionValue(impliedKey)).forEach((impliedKey) => {
					this.setOptionValueWithSource(impliedKey, option.implied[impliedKey], "implied");
				});
			});
		}
		/**
		* Argument `name` is missing.
		*
		* @param {string} name
		* @private
		*/
		missingArgument(name) {
			const message = `error: missing required argument '${name}'`;
			this.error(message, { code: "commander.missingArgument" });
		}
		/**
		* `Option` is missing an argument.
		*
		* @param {Option} option
		* @private
		*/
		optionMissingArgument(option) {
			const message = `error: option '${option.flags}' argument missing`;
			this.error(message, { code: "commander.optionMissingArgument" });
		}
		/**
		* `Option` does not have a value, and is a mandatory option.
		*
		* @param {Option} option
		* @private
		*/
		missingMandatoryOptionValue(option) {
			const message = `error: required option '${option.flags}' not specified`;
			this.error(message, { code: "commander.missingMandatoryOptionValue" });
		}
		/**
		* `Option` conflicts with another option.
		*
		* @param {Option} option
		* @param {Option} conflictingOption
		* @private
		*/
		_conflictingOption(option, conflictingOption) {
			const findBestOptionFromValue = (option$1) => {
				const optionKey = option$1.attributeName();
				const optionValue = this.getOptionValue(optionKey);
				const negativeOption = this.options.find((target) => target.negate && optionKey === target.attributeName());
				const positiveOption = this.options.find((target) => !target.negate && optionKey === target.attributeName());
				if (negativeOption && (negativeOption.presetArg === void 0 && optionValue === false || negativeOption.presetArg !== void 0 && optionValue === negativeOption.presetArg)) return negativeOption;
				return positiveOption || option$1;
			};
			const getErrorMessage = (option$1) => {
				const bestOption = findBestOptionFromValue(option$1);
				const optionKey = bestOption.attributeName();
				const source = this.getOptionValueSource(optionKey);
				if (source === "env") return `environment variable '${bestOption.envVar}'`;
				return `option '${bestOption.flags}'`;
			};
			const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
			this.error(message, { code: "commander.conflictingOption" });
		}
		/**
		* Unknown option `flag`.
		*
		* @param {string} flag
		* @private
		*/
		unknownOption(flag) {
			if (this._allowUnknownOption) return;
			let suggestion = "";
			if (flag.startsWith("--") && this._showSuggestionAfterError) {
				let candidateFlags = [];
				let command = this;
				do {
					const moreFlags = command.createHelp().visibleOptions(command).filter((option) => option.long).map((option) => option.long);
					candidateFlags = candidateFlags.concat(moreFlags);
					command = command.parent;
				} while (command && !command._enablePositionalOptions);
				suggestion = suggestSimilar(flag, candidateFlags);
			}
			const message = `error: unknown option '${flag}'${suggestion}`;
			this.error(message, { code: "commander.unknownOption" });
		}
		/**
		* Excess arguments, more than expected.
		*
		* @param {string[]} receivedArgs
		* @private
		*/
		_excessArguments(receivedArgs) {
			if (this._allowExcessArguments) return;
			const expected = this.registeredArguments.length;
			const s = expected === 1 ? "" : "s";
			const forSubcommand = this.parent ? ` for '${this.name()}'` : "";
			const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
			this.error(message, { code: "commander.excessArguments" });
		}
		/**
		* Unknown command.
		*
		* @private
		*/
		unknownCommand() {
			const unknownName = this.args[0];
			let suggestion = "";
			if (this._showSuggestionAfterError) {
				const candidateNames = [];
				this.createHelp().visibleCommands(this).forEach((command) => {
					candidateNames.push(command.name());
					if (command.alias()) candidateNames.push(command.alias());
				});
				suggestion = suggestSimilar(unknownName, candidateNames);
			}
			const message = `error: unknown command '${unknownName}'${suggestion}`;
			this.error(message, { code: "commander.unknownCommand" });
		}
		/**
		* Get or set the program version.
		*
		* This method auto-registers the "-V, --version" option which will print the version number.
		*
		* You can optionally supply the flags and description to override the defaults.
		*
		* @param {string} [str]
		* @param {string} [flags]
		* @param {string} [description]
		* @return {(this | string | undefined)} `this` command for chaining, or version string if no arguments
		*/
		version(str, flags, description) {
			if (str === void 0) return this._version;
			this._version = str;
			flags = flags || "-V, --version";
			description = description || "output the version number";
			const versionOption = this.createOption(flags, description);
			this._versionOptionName = versionOption.attributeName();
			this._registerOption(versionOption);
			this.on("option:" + versionOption.name(), () => {
				this._outputConfiguration.writeOut(`${str}\n`);
				this._exit(0, "commander.version", str);
			});
			return this;
		}
		/**
		* Set the description.
		*
		* @param {string} [str]
		* @param {object} [argsDescription]
		* @return {(string|Command)}
		*/
		description(str, argsDescription) {
			if (str === void 0 && argsDescription === void 0) return this._description;
			this._description = str;
			if (argsDescription) this._argsDescription = argsDescription;
			return this;
		}
		/**
		* Set the summary. Used when listed as subcommand of parent.
		*
		* @param {string} [str]
		* @return {(string|Command)}
		*/
		summary(str) {
			if (str === void 0) return this._summary;
			this._summary = str;
			return this;
		}
		/**
		* Set an alias for the command.
		*
		* You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
		*
		* @param {string} [alias]
		* @return {(string|Command)}
		*/
		alias(alias) {
			if (alias === void 0) return this._aliases[0];
			/** @type {Command} */
			let command = this;
			if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) command = this.commands[this.commands.length - 1];
			if (alias === command._name) throw new Error("Command alias can't be the same as its name");
			const matchingCommand = this.parent?._findCommand(alias);
			if (matchingCommand) {
				const existingCmd = [matchingCommand.name()].concat(matchingCommand.aliases()).join("|");
				throw new Error(`cannot add alias '${alias}' to command '${this.name()}' as already have command '${existingCmd}'`);
			}
			command._aliases.push(alias);
			return this;
		}
		/**
		* Set aliases for the command.
		*
		* Only the first alias is shown in the auto-generated help.
		*
		* @param {string[]} [aliases]
		* @return {(string[]|Command)}
		*/
		aliases(aliases) {
			if (aliases === void 0) return this._aliases;
			aliases.forEach((alias) => this.alias(alias));
			return this;
		}
		/**
		* Set / get the command usage `str`.
		*
		* @param {string} [str]
		* @return {(string|Command)}
		*/
		usage(str) {
			if (str === void 0) {
				if (this._usage) return this._usage;
				const args = this.registeredArguments.map((arg) => {
					return humanReadableArgName(arg);
				});
				return [].concat(this.options.length || this._helpOption !== null ? "[options]" : [], this.commands.length ? "[command]" : [], this.registeredArguments.length ? args : []).join(" ");
			}
			this._usage = str;
			return this;
		}
		/**
		* Get or set the name of the command.
		*
		* @param {string} [str]
		* @return {(string|Command)}
		*/
		name(str) {
			if (str === void 0) return this._name;
			this._name = str;
			return this;
		}
		/**
		* Set/get the help group heading for this subcommand in parent command's help.
		*
		* @param {string} [heading]
		* @return {Command | string}
		*/
		helpGroup(heading) {
			if (heading === void 0) return this._helpGroupHeading ?? "";
			this._helpGroupHeading = heading;
			return this;
		}
		/**
		* Set/get the default help group heading for subcommands added to this command.
		* (This does not override a group set directly on the subcommand using .helpGroup().)
		*
		* @example
		* program.commandsGroup('Development Commands:);
		* program.command('watch')...
		* program.command('lint')...
		* ...
		*
		* @param {string} [heading]
		* @returns {Command | string}
		*/
		commandsGroup(heading) {
			if (heading === void 0) return this._defaultCommandGroup ?? "";
			this._defaultCommandGroup = heading;
			return this;
		}
		/**
		* Set/get the default help group heading for options added to this command.
		* (This does not override a group set directly on the option using .helpGroup().)
		*
		* @example
		* program
		*   .optionsGroup('Development Options:')
		*   .option('-d, --debug', 'output extra debugging')
		*   .option('-p, --profile', 'output profiling information')
		*
		* @param {string} [heading]
		* @returns {Command | string}
		*/
		optionsGroup(heading) {
			if (heading === void 0) return this._defaultOptionGroup ?? "";
			this._defaultOptionGroup = heading;
			return this;
		}
		/**
		* @param {Option} option
		* @private
		*/
		_initOptionGroup(option) {
			if (this._defaultOptionGroup && !option.helpGroupHeading) option.helpGroup(this._defaultOptionGroup);
		}
		/**
		* @param {Command} cmd
		* @private
		*/
		_initCommandGroup(cmd) {
			if (this._defaultCommandGroup && !cmd.helpGroup()) cmd.helpGroup(this._defaultCommandGroup);
		}
		/**
		* Set the name of the command from script filename, such as process.argv[1],
		* or require.main.filename, or __filename.
		*
		* (Used internally and public although not documented in README.)
		*
		* @example
		* program.nameFromFilename(require.main.filename);
		*
		* @param {string} filename
		* @return {Command}
		*/
		nameFromFilename(filename) {
			this._name = path$27.basename(filename, path$27.extname(filename));
			return this;
		}
		/**
		* Get or set the directory for searching for executable subcommands of this command.
		*
		* @example
		* program.executableDir(__dirname);
		* // or
		* program.executableDir('subcommands');
		*
		* @param {string} [path]
		* @return {(string|null|Command)}
		*/
		executableDir(path$28) {
			if (path$28 === void 0) return this._executableDir;
			this._executableDir = path$28;
			return this;
		}
		/**
		* Return program help documentation.
		*
		* @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
		* @return {string}
		*/
		helpInformation(contextOptions) {
			const helper = this.createHelp();
			const context = this._getOutputContext(contextOptions);
			helper.prepareContext({
				error: context.error,
				helpWidth: context.helpWidth,
				outputHasColors: context.hasColors
			});
			const text = helper.formatHelp(this, helper);
			if (context.hasColors) return text;
			return this._outputConfiguration.stripColor(text);
		}
		/**
		* @typedef HelpContext
		* @type {object}
		* @property {boolean} error
		* @property {number} helpWidth
		* @property {boolean} hasColors
		* @property {function} write - includes stripColor if needed
		*
		* @returns {HelpContext}
		* @private
		*/
		_getOutputContext(contextOptions) {
			contextOptions = contextOptions || {};
			const error = !!contextOptions.error;
			let baseWrite;
			let hasColors$1;
			let helpWidth;
			if (error) {
				baseWrite = (str) => this._outputConfiguration.writeErr(str);
				hasColors$1 = this._outputConfiguration.getErrHasColors();
				helpWidth = this._outputConfiguration.getErrHelpWidth();
			} else {
				baseWrite = (str) => this._outputConfiguration.writeOut(str);
				hasColors$1 = this._outputConfiguration.getOutHasColors();
				helpWidth = this._outputConfiguration.getOutHelpWidth();
			}
			const write = (str) => {
				if (!hasColors$1) str = this._outputConfiguration.stripColor(str);
				return baseWrite(str);
			};
			return {
				error,
				write,
				hasColors: hasColors$1,
				helpWidth
			};
		}
		/**
		* Output help information for this command.
		*
		* Outputs built-in help, and custom text added using `.addHelpText()`.
		*
		* @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
		*/
		outputHelp(contextOptions) {
			let deprecatedCallback;
			if (typeof contextOptions === "function") {
				deprecatedCallback = contextOptions;
				contextOptions = void 0;
			}
			const outputContext = this._getOutputContext(contextOptions);
			/** @type {HelpTextEventContext} */
			const eventContext = {
				error: outputContext.error,
				write: outputContext.write,
				command: this
			};
			this._getCommandAndAncestors().reverse().forEach((command) => command.emit("beforeAllHelp", eventContext));
			this.emit("beforeHelp", eventContext);
			let helpInformation = this.helpInformation({ error: outputContext.error });
			if (deprecatedCallback) {
				helpInformation = deprecatedCallback(helpInformation);
				if (typeof helpInformation !== "string" && !Buffer.isBuffer(helpInformation)) throw new Error("outputHelp callback must return a string or a Buffer");
			}
			outputContext.write(helpInformation);
			if (this._getHelpOption()?.long) this.emit(this._getHelpOption().long);
			this.emit("afterHelp", eventContext);
			this._getCommandAndAncestors().forEach((command) => command.emit("afterAllHelp", eventContext));
		}
		/**
		* You can pass in flags and a description to customise the built-in help option.
		* Pass in false to disable the built-in help option.
		*
		* @example
		* program.helpOption('-?, --help' 'show help'); // customise
		* program.helpOption(false); // disable
		*
		* @param {(string | boolean)} flags
		* @param {string} [description]
		* @return {Command} `this` command for chaining
		*/
		helpOption(flags, description) {
			if (typeof flags === "boolean") {
				if (flags) {
					if (this._helpOption === null) this._helpOption = void 0;
					if (this._defaultOptionGroup) this._initOptionGroup(this._getHelpOption());
				} else this._helpOption = null;
				return this;
			}
			this._helpOption = this.createOption(flags ?? "-h, --help", description ?? "display help for command");
			if (flags || description) this._initOptionGroup(this._helpOption);
			return this;
		}
		/**
		* Lazy create help option.
		* Returns null if has been disabled with .helpOption(false).
		*
		* @returns {(Option | null)} the help option
		* @package
		*/
		_getHelpOption() {
			if (this._helpOption === void 0) this.helpOption(void 0, void 0);
			return this._helpOption;
		}
		/**
		* Supply your own option to use for the built-in help option.
		* This is an alternative to using helpOption() to customise the flags and description etc.
		*
		* @param {Option} option
		* @return {Command} `this` command for chaining
		*/
		addHelpOption(option) {
			this._helpOption = option;
			this._initOptionGroup(option);
			return this;
		}
		/**
		* Output help information and exit.
		*
		* Outputs built-in help, and custom text added using `.addHelpText()`.
		*
		* @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
		*/
		help(contextOptions) {
			this.outputHelp(contextOptions);
			let exitCode = Number(process$2.exitCode ?? 0);
			if (exitCode === 0 && contextOptions && typeof contextOptions !== "function" && contextOptions.error) exitCode = 1;
			this._exit(exitCode, "commander.help", "(outputHelp)");
		}
		/**
		* // Do a little typing to coordinate emit and listener for the help text events.
		* @typedef HelpTextEventContext
		* @type {object}
		* @property {boolean} error
		* @property {Command} command
		* @property {function} write
		*/
		/**
		* Add additional text to be displayed with the built-in help.
		*
		* Position is 'before' or 'after' to affect just this command,
		* and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
		*
		* @param {string} position - before or after built-in help
		* @param {(string | Function)} text - string to add, or a function returning a string
		* @return {Command} `this` command for chaining
		*/
		addHelpText(position, text) {
			const allowedValues = [
				"beforeAll",
				"before",
				"after",
				"afterAll"
			];
			if (!allowedValues.includes(position)) throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
			const helpEvent = `${position}Help`;
			this.on(helpEvent, (context) => {
				let helpStr;
				if (typeof text === "function") helpStr = text({
					error: context.error,
					command: context.command
				});
				else helpStr = text;
				if (helpStr) context.write(`${helpStr}\n`);
			});
			return this;
		}
		/**
		* Output help information if help flags specified
		*
		* @param {Array} args - array of options to search for help flags
		* @private
		*/
		_outputHelpIfRequested(args) {
			const helpOption = this._getHelpOption();
			const helpRequested = helpOption && args.find((arg) => helpOption.is(arg));
			if (helpRequested) {
				this.outputHelp();
				this._exit(0, "commander.helpDisplayed", "(outputHelp)");
			}
		}
	};
	/**
	* Scan arguments and increment port number for inspect calls (to avoid conflicts when spawning new command).
	*
	* @param {string[]} args - array of arguments from node.execArgv
	* @returns {string[]}
	* @private
	*/
	function incrementNodeInspectorPort(args) {
		return args.map((arg) => {
			if (!arg.startsWith("--inspect")) return arg;
			let debugOption;
			let debugHost = "127.0.0.1";
			let debugPort = "9229";
			let match;
			if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) debugOption = match[1];
			else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
				debugOption = match[1];
				if (/^\d+$/.test(match[3])) debugPort = match[3];
				else debugHost = match[3];
			} else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
				debugOption = match[1];
				debugHost = match[3];
				debugPort = match[4];
			}
			if (debugOption && debugPort !== "0") return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
			return arg;
		});
	}
	/**
	* @returns {boolean | undefined}
	* @package
	*/
	function useColor() {
		if (process$2.env.NO_COLOR || process$2.env.FORCE_COLOR === "0" || process$2.env.FORCE_COLOR === "false") return false;
		if (process$2.env.FORCE_COLOR || process$2.env.CLICOLOR_FORCE !== void 0) return true;
		return void 0;
	}
	exports.Command = Command$2;
	exports.useColor = useColor;
} });

//#endregion
//#region ../node_modules/trpc-cli/node_modules/commander/index.js
var require_commander = __commonJS$1({ "../node_modules/trpc-cli/node_modules/commander/index.js"(exports) {
	const { Argument } = require_argument();
	const { Command: Command$1 } = require_command();
	const { CommanderError, InvalidArgumentError } = require_error$1();
	const { Help } = require_help();
	const { Option } = require_option();
	exports.program = new Command$1();
	exports.createCommand = (name) => new Command$1(name);
	exports.createOption = (flags, description) => new Option(flags, description);
	exports.createArgument = (name, description) => new Argument(name, description);
	/**
	* Expose classes
	*/
	exports.Command = Command$1;
	exports.Option = Option;
	exports.Argument = Argument;
	exports.Help = Help;
	exports.CommanderError = CommanderError;
	exports.InvalidArgumentError = InvalidArgumentError;
	exports.InvalidOptionArgumentError = InvalidArgumentError;
} });

//#endregion
//#region ../node_modules/trpc-cli/dist/completions.js
var require_completions = __commonJS$1({ "../node_modules/trpc-cli/dist/completions.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.addCompletions = addCompletions;
	/** uses omelette to add completions to a commander program */
	function addCompletions(program, completion) {
		const commandSymbol = Symbol("command");
		const cTree = {};
		function addCommandCompletions(command, cTreeNode) {
			command.commands.forEach((c$1) => {
				const node = cTreeNode[c$1.name()] ||= {};
				Object.defineProperty(node, commandSymbol, {
					value: c$1,
					enumerable: false
				});
				addCommandCompletions(c$1, node);
			});
		}
		addCommandCompletions(program, cTree);
		completion.on("complete", (fragment, params) => {
			const segments = params.line.split(/ +/).slice(1, params.fragment);
			const last = segments.at(-1);
			let node = cTree;
			const existingFlags = new Set();
			for (const segment of segments) {
				if (segment.startsWith("-")) {
					existingFlags.add(segment);
					continue;
				}
				if (existingFlags.size > 0) continue;
				node = node[segment];
				if (!node) return;
			}
			const correspondingCommand = node[commandSymbol];
			if (correspondingCommand?.options?.length) {
				const suggestions = [];
				for (const o$2 of correspondingCommand.options) {
					if (last === o$2.long || last === o$2.short) {
						if (o$2.argChoices) suggestions.push(...o$2.argChoices);
						if (!o$2.isBoolean()) break;
					}
					if (existingFlags.has(o$2.long)) continue;
					if (existingFlags.has(o$2.short)) continue;
					suggestions.push(o$2.long);
				}
				return void params.reply(suggestions);
			}
		});
		completion.tree(cTree).init();
	}
} });

//#endregion
//#region ../node_modules/trpc-cli/dist/errors.js
var require_errors$1 = __commonJS$1({ "../node_modules/trpc-cli/dist/errors.js"(exports) {
	/** An error thrown when the trpc procedure results in a bad request */
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.FailedToExitError = exports.CliValidationError = void 0;
	var CliValidationError = class extends Error {};
	exports.CliValidationError = CliValidationError;
	/** An error which is only thrown when a custom \`process\` parameter is used. Under normal circumstances, this should not be used, even internally. */
	var FailedToExitError = class extends Error {
		exitCode;
		constructor(message, { exitCode, cause }) {
			const fullMessage = `${message}. The process was expected to exit with exit code ${exitCode} but did not. This may be because a custom \`process\` parameter was used. The exit reason is in the \`cause\` property.`;
			super(fullMessage, { cause });
			this.exitCode = exitCode;
		}
	};
	exports.FailedToExitError = FailedToExitError;
} });

//#endregion
//#region ../node_modules/trpc-cli/dist/json.js
var require_json$1 = __commonJS$1({ "../node_modules/trpc-cli/dist/json.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.commandToJSON = void 0;
	/**
	* Convert a commander `Command` instance to a JSON object.
	*
	* Note: in theory you could use this with any `Command` instance, it doesn't have
	* to be one built by `trpc-cli`. Implementing here because it's pretty simple to do and `commander` doesn't seem to provide a way to do it.
	*
	* Note: falsy values for strings are replaced with `undefined` in the output - e.g. if there's an empty description, it will be `undefined` in the output.
	*/
	const commandToJSON = (command) => {
		const json = {};
		const name = command.name();
		if (name) json.name = name;
		const version = command.version();
		if (version) json.version = version;
		const description = command.description();
		if (description) json.description = description;
		const usage = command.usage();
		if (usage) json.usage = usage;
		json.arguments = command.registeredArguments.map((arg) => {
			const result = { name: arg.name() };
			result.variadic = arg.variadic;
			result.required = arg.required;
			if (arg.description) result.description = arg.description;
			if (arg.defaultValue) result.defaultValue = arg.defaultValue;
			if (arg.defaultValueDescription) result.defaultValueDescription = arg.defaultValueDescription;
			if (arg.argChoices) result.choices = arg.argChoices;
			return result;
		});
		json.options = command.options.map((o$2) => {
			const result = { name: o$2.name() };
			result.required = o$2.required;
			result.optional = o$2.optional;
			result.negate = o$2.negate;
			result.variadic = o$2.variadic;
			if (o$2.flags) result.flags = o$2.flags;
			if (o$2.short) result.short = o$2.short;
			if (o$2.description) result.description = o$2.description;
			if (o$2.argChoices) result.choices = o$2.argChoices;
			const attributeName = o$2.attributeName();
			if (attributeName) result.attributeName = attributeName;
			if (o$2.defaultValue) result.defaultValue = o$2.defaultValue;
			if (o$2.defaultValueDescription) result.defaultValueDescription = o$2.defaultValueDescription;
			return result;
		});
		json.commands = command.commands.map((c$1) => (0, exports.commandToJSON)(c$1));
		return json;
	};
	exports.commandToJSON = commandToJSON;
} });

//#endregion
//#region ../node_modules/trpc-cli/dist/json-schema.js
var require_json_schema = __commonJS$1({ "../node_modules/trpc-cli/dist/json-schema.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getEnumChoices = exports.getSchemaTypes = exports.getDescription = exports.incompatiblePropertyPairs = exports.flattenedProperties = void 0;
	const capitaliseFromCamelCase = (camel) => {
		const parts = camel.split(/(?=[A-Z])/);
		return capitalise(parts.map((p$2) => p$2.toLowerCase()).join(" "));
	};
	const capitalise = (s) => s.slice(0, 1).toUpperCase() + s.slice(1);
	const flattenedProperties = (sch) => {
		if ("properties" in sch) return sch.properties;
		if ("allOf" in sch) return Object.fromEntries(sch.allOf.flatMap((subSchema) => Object.entries((0, exports.flattenedProperties)(subSchema))));
		if ("anyOf" in sch) {
			const isExcluded = (v$1) => Object.keys(v$1).join(",") === "not";
			const entries = sch.anyOf.flatMap((subSchema) => {
				const flattened = (0, exports.flattenedProperties)(subSchema);
				const excluded = Object.entries(flattened).flatMap(([name, propSchema]) => {
					return isExcluded(propSchema) ? [`--${name}`] : [];
				});
				return Object.entries(flattened).map(([k$2, v$1]) => {
					if (!isExcluded(v$1) && excluded.length > 0) return [k$2, Object.assign({}, v$1, { "Do not use with": excluded })];
					return [k$2, v$1];
				});
			});
			return Object.fromEntries(entries.sort((a$1, b$2) => {
				const scores = [a$1, b$2].map(([_k, v$1]) => isExcluded(v$1) ? 0 : 1);
				return scores[0] - scores[1];
			}));
		}
		return {};
	};
	exports.flattenedProperties = flattenedProperties;
	/** For a union type, returns a list of pairs of properties which *shouldn't* be used together (because they don't appear in the same type variant) */
	const incompatiblePropertyPairs = (sch) => {
		const isUnion = "anyOf" in sch;
		if (!isUnion) return [];
		const sets = sch.anyOf.map((subSchema) => {
			const keys = Object.keys((0, exports.flattenedProperties)(subSchema));
			return {
				keys,
				set: new Set(keys)
			};
		});
		const compatiblityEntries = sets.flatMap(({ keys }) => {
			return keys.map((key) => {
				return [key, new Set(sets.filter((other) => other.set.has(key)).flatMap((other) => other.keys))];
			});
		});
		const allKeys = sets.flatMap(({ keys }) => keys);
		return compatiblityEntries.flatMap(([key, compatibleWith]) => {
			const incompatibleEntries = allKeys.filter((other) => key < other && !compatibleWith.has(other)).map((other) => [key, other]);
			return incompatibleEntries;
		});
	};
	exports.incompatiblePropertyPairs = incompatiblePropertyPairs;
	/**
	* Tries fairly hard to build a roughly human-readable description of a json-schema type.
	* A few common properties are given special treatment, most others are just stringified and output in `key: value` format.
	*/
	const getDescription = (v$1, depth$1 = 0) => {
		if ("items" in v$1 && v$1.items) {
			const { items,...rest } = v$1;
			return [
				(0, exports.getDescription)(items, 1),
				(0, exports.getDescription)(rest),
				"array"
			].filter(Boolean).join(" ");
		}
		return Object.entries(v$1).filter(([k$2, vv]) => {
			if (k$2 === "default" || k$2 === "additionalProperties" || k$2 === "optional") return false;
			if (k$2 === "type" && typeof vv === "string") return depth$1 > 0;
			if (k$2.startsWith("$")) return false;
			if (k$2 === "maximum" && vv === Number.MAX_SAFE_INTEGER) return false;
			if (depth$1 <= 1 && k$2 === "enum" && (0, exports.getEnumChoices)(v$1)?.type === "string_enum") return false;
			return true;
		}).sort(([a$1], [b$2]) => {
			const scores = [a$1, b$2].map((k$2) => k$2 === "description" ? 0 : 1);
			return scores[0] - scores[1];
		}).map(([k$2, vv], i$1) => {
			if (k$2 === "type" && Array.isArray(vv)) return `type: ${vv.join(" or ")}`;
			if (k$2 === "description" && i$1 === 0) return String(vv);
			if (k$2 === "properties") return `Object (json formatted)`;
			if (typeof vv === "object") return `${capitaliseFromCamelCase(k$2)}: ${JSON.stringify(vv)}`;
			return `${capitaliseFromCamelCase(k$2)}: ${vv}`;
		}).join("; ") || "";
	};
	exports.getDescription = getDescription;
	const getSchemaTypes = (propertyValue) => {
		const array$1 = [];
		if ("type" in propertyValue) array$1.push(...[propertyValue.type].flat());
		if ("enum" in propertyValue && Array.isArray(propertyValue.enum)) array$1.push(...propertyValue.enum.flatMap((s) => typeof s));
		if ("const" in propertyValue && propertyValue.const === null) array$1.push("null");
		else if ("const" in propertyValue) array$1.push(typeof propertyValue.const);
		if ("oneOf" in propertyValue) array$1.push(...propertyValue.oneOf.flatMap(exports.getSchemaTypes));
		if ("anyOf" in propertyValue) array$1.push(...propertyValue.anyOf.flatMap(exports.getSchemaTypes));
		return [...new Set(array$1)];
	};
	exports.getSchemaTypes = getSchemaTypes;
	const getEnumChoices = (propertyValue) => {
		if (!propertyValue) return null;
		if (!("enum" in propertyValue && Array.isArray(propertyValue.enum))) {
			if ("anyOf" in propertyValue && propertyValue.anyOf?.every((subSchema) => {
				if (subSchema && "const" in subSchema && Object.keys(subSchema).length === 1 && typeof subSchema.const === "string") return true;
				return false;
			})) return {
				type: "string_enum",
				choices: propertyValue.anyOf.map((subSchema) => subSchema.const)
			};
			if ("anyOf" in propertyValue && propertyValue.anyOf?.every((subSchema) => {
				if (subSchema && "const" in subSchema && Object.keys(subSchema).length === 1 && typeof subSchema.const === "number") return true;
				return false;
			})) return {
				type: "number_enum",
				choices: propertyValue.anyOf.map((subSchema) => subSchema.const)
			};
			return null;
		}
		if (propertyValue.enum.every((s) => typeof s === "string")) return {
			type: "string_enum",
			choices: propertyValue.enum
		};
		if (propertyValue.enum.every((s) => typeof s === "number")) return {
			type: "number_enum",
			choices: propertyValue.enum
		};
		return null;
	};
	exports.getEnumChoices = getEnumChoices;
} });

//#endregion
//#region ../node_modules/trpc-cli/dist/logging.js
var require_logging = __commonJS$1({ "../node_modules/trpc-cli/dist/logging.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.lineByLineConsoleLogger = exports.lineByLineLogger = void 0;
	exports.lineByLineLogger = getLoggerTransformer((log) => {
		/**
		* @param args values to log. if `logger.info('a', 1)` is called, `args` will be `['a', 1]`
		* @param depth tracks whether the current call recursive. Used to make sure we don't flatten nested arrays
		*/
		const wrapper = (args, depth$1) => {
			if (args.length === 1 && Array.isArray(args[0]) && depth$1 === 0) args[0].forEach((item) => wrapper([item], 1));
			else if (args.every(isPrimitive)) log(...args);
			else if (args.length === 1) log(JSON.stringify(args[0], null, 2));
			else log(JSON.stringify(args, null, 2));
		};
		return (...args) => wrapper(args, 0);
	});
	const isPrimitive = (value) => {
		const type = typeof value;
		return type === "string" || type === "number" || type === "boolean";
	};
	/** Takes a function that wraps an individual log function, and returns a function that wraps the `info` and `error` functions for a logger */
	function getLoggerTransformer(transform$1) {
		return (logger) => {
			const info = logger.info && transform$1(logger.info);
			const error = logger.error && transform$1(logger.error);
			return {
				info,
				error
			};
		};
	}
	/**
	* A logger which uses `console.log` and `console.error` to log in the following way:
	* - Primitives are logged directly
	* - Arrays are logged item-by-item
	* - Objects are logged as JSON
	*
	* This is useful for logging structured data in a human-readable way, and for piping logs to other tools.
	*/
	exports.lineByLineConsoleLogger = (0, exports.lineByLineLogger)(console);
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/Options.js
var require_Options = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/Options.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getDefaultOptions = exports.defaultOptions = exports.jsonDescription = exports.ignoreOverride = void 0;
	exports.ignoreOverride = Symbol("Let zodToJsonSchema decide on which parser to use");
	const jsonDescription = (jsonSchema, def) => {
		if (def.description) try {
			return {
				...jsonSchema,
				...JSON.parse(def.description)
			};
		} catch {}
		return jsonSchema;
	};
	exports.jsonDescription = jsonDescription;
	exports.defaultOptions = {
		name: void 0,
		$refStrategy: "root",
		basePath: ["#"],
		effectStrategy: "input",
		pipeStrategy: "all",
		dateStrategy: "format:date-time",
		mapStrategy: "entries",
		removeAdditionalStrategy: "passthrough",
		allowedAdditionalProperties: true,
		rejectedAdditionalProperties: false,
		definitionPath: "definitions",
		target: "jsonSchema7",
		strictUnions: false,
		definitions: {},
		errorMessages: false,
		markdownDescription: false,
		patternStrategy: "escape",
		applyRegexFlags: false,
		emailStrategy: "format:email",
		base64Strategy: "contentEncoding:base64",
		nameStrategy: "ref"
	};
	const getDefaultOptions = (options) => typeof options === "string" ? {
		...exports.defaultOptions,
		name: options
	} : {
		...exports.defaultOptions,
		...options
	};
	exports.getDefaultOptions = getDefaultOptions;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/Refs.js
var require_Refs = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/Refs.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getRefs = void 0;
	const Options_js_1$1 = require_Options();
	const getRefs = (options) => {
		const _options = (0, Options_js_1$1.getDefaultOptions)(options);
		const currentPath = _options.name !== void 0 ? [
			..._options.basePath,
			_options.definitionPath,
			_options.name
		] : _options.basePath;
		return {
			..._options,
			currentPath,
			propertyPath: void 0,
			seen: new Map(Object.entries(_options.definitions).map(([name, def]) => [def._def, {
				def: def._def,
				path: [
					..._options.basePath,
					_options.definitionPath,
					name
				],
				jsonSchema: void 0
			}]))
		};
	};
	exports.getRefs = getRefs;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/errorMessages.js
var require_errorMessages = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/errorMessages.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.setResponseValueAndErrors = exports.addErrorMessage = void 0;
	function addErrorMessage(res, key, errorMessage, refs) {
		if (!refs?.errorMessages) return;
		if (errorMessage) res.errorMessage = {
			...res.errorMessage,
			[key]: errorMessage
		};
	}
	exports.addErrorMessage = addErrorMessage;
	function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
		res[key] = value;
		addErrorMessage(res, key, errorMessage, refs);
	}
	exports.setResponseValueAndErrors = setResponseValueAndErrors;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/any.js
var require_any = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/any.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseAnyDef = void 0;
	function parseAnyDef() {
		return {};
	}
	exports.parseAnyDef = parseAnyDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/array.js
var require_array$1 = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/array.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseArrayDef = void 0;
	const zod_1$3 = __require("zod");
	const errorMessages_js_1$5 = require_errorMessages();
	const parseDef_js_1$17 = require_parseDef();
	function parseArrayDef(def, refs) {
		const res = { type: "array" };
		if (def.type?._def && def.type?._def?.typeName !== zod_1$3.ZodFirstPartyTypeKind.ZodAny) res.items = (0, parseDef_js_1$17.parseDef)(def.type._def, {
			...refs,
			currentPath: [...refs.currentPath, "items"]
		});
		if (def.minLength) (0, errorMessages_js_1$5.setResponseValueAndErrors)(res, "minItems", def.minLength.value, def.minLength.message, refs);
		if (def.maxLength) (0, errorMessages_js_1$5.setResponseValueAndErrors)(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
		if (def.exactLength) {
			(0, errorMessages_js_1$5.setResponseValueAndErrors)(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
			(0, errorMessages_js_1$5.setResponseValueAndErrors)(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
		}
		return res;
	}
	exports.parseArrayDef = parseArrayDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/bigint.js
var require_bigint = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/bigint.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseBigintDef = void 0;
	const errorMessages_js_1$4 = require_errorMessages();
	function parseBigintDef(def, refs) {
		const res = {
			type: "integer",
			format: "int64"
		};
		if (!def.checks) return res;
		for (const check of def.checks) switch (check.kind) {
			case "min":
				if (refs.target === "jsonSchema7") if (check.inclusive) (0, errorMessages_js_1$4.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
				else (0, errorMessages_js_1$4.setResponseValueAndErrors)(res, "exclusiveMinimum", check.value, check.message, refs);
				else {
					if (!check.inclusive) res.exclusiveMinimum = true;
					(0, errorMessages_js_1$4.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
				}
				break;
			case "max":
				if (refs.target === "jsonSchema7") if (check.inclusive) (0, errorMessages_js_1$4.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
				else (0, errorMessages_js_1$4.setResponseValueAndErrors)(res, "exclusiveMaximum", check.value, check.message, refs);
				else {
					if (!check.inclusive) res.exclusiveMaximum = true;
					(0, errorMessages_js_1$4.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
				}
				break;
			case "multipleOf":
				(0, errorMessages_js_1$4.setResponseValueAndErrors)(res, "multipleOf", check.value, check.message, refs);
				break;
		}
		return res;
	}
	exports.parseBigintDef = parseBigintDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/boolean.js
var require_boolean = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/boolean.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseBooleanDef = void 0;
	function parseBooleanDef() {
		return { type: "boolean" };
	}
	exports.parseBooleanDef = parseBooleanDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/branded.js
var require_branded = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/branded.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseBrandedDef = void 0;
	const parseDef_js_1$16 = require_parseDef();
	function parseBrandedDef(_def, refs) {
		return (0, parseDef_js_1$16.parseDef)(_def.type._def, refs);
	}
	exports.parseBrandedDef = parseBrandedDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/catch.js
var require_catch = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/catch.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseCatchDef = void 0;
	const parseDef_js_1$15 = require_parseDef();
	const parseCatchDef = (def, refs) => {
		return (0, parseDef_js_1$15.parseDef)(def.innerType._def, refs);
	};
	exports.parseCatchDef = parseCatchDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/date.js
var require_date = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/date.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseDateDef = void 0;
	const errorMessages_js_1$3 = require_errorMessages();
	function parseDateDef(def, refs, overrideDateStrategy) {
		const strategy = overrideDateStrategy ?? refs.dateStrategy;
		if (Array.isArray(strategy)) return { anyOf: strategy.map((item, i$1) => parseDateDef(def, refs, item)) };
		switch (strategy) {
			case "string":
			case "format:date-time": return {
				type: "string",
				format: "date-time"
			};
			case "format:date": return {
				type: "string",
				format: "date"
			};
			case "integer": return integerDateParser(def, refs);
		}
	}
	exports.parseDateDef = parseDateDef;
	const integerDateParser = (def, refs) => {
		const res = {
			type: "integer",
			format: "unix-time"
		};
		if (refs.target === "openApi3") return res;
		for (const check of def.checks) switch (check.kind) {
			case "min":
				(0, errorMessages_js_1$3.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
				break;
			case "max":
				(0, errorMessages_js_1$3.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
				break;
		}
		return res;
	};
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/default.js
var require_default = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/default.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseDefaultDef = void 0;
	const parseDef_js_1$14 = require_parseDef();
	function parseDefaultDef(_def, refs) {
		return {
			...(0, parseDef_js_1$14.parseDef)(_def.innerType._def, refs),
			default: _def.defaultValue()
		};
	}
	exports.parseDefaultDef = parseDefaultDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/effects.js
var require_effects = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/effects.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseEffectsDef = void 0;
	const parseDef_js_1$13 = require_parseDef();
	function parseEffectsDef(_def, refs) {
		return refs.effectStrategy === "input" ? (0, parseDef_js_1$13.parseDef)(_def.schema._def, refs) : {};
	}
	exports.parseEffectsDef = parseEffectsDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/enum.js
var require_enum = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/enum.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseEnumDef = void 0;
	function parseEnumDef(def) {
		return {
			type: "string",
			enum: Array.from(def.values)
		};
	}
	exports.parseEnumDef = parseEnumDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/intersection.js
var require_intersection = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/intersection.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseIntersectionDef = void 0;
	const parseDef_js_1$12 = require_parseDef();
	const isJsonSchema7AllOfType = (type) => {
		if ("type" in type && type.type === "string") return false;
		return "allOf" in type;
	};
	function parseIntersectionDef(def, refs) {
		const allOf = [(0, parseDef_js_1$12.parseDef)(def.left._def, {
			...refs,
			currentPath: [
				...refs.currentPath,
				"allOf",
				"0"
			]
		}), (0, parseDef_js_1$12.parseDef)(def.right._def, {
			...refs,
			currentPath: [
				...refs.currentPath,
				"allOf",
				"1"
			]
		})].filter((x$2) => !!x$2);
		let unevaluatedProperties = refs.target === "jsonSchema2019-09" ? { unevaluatedProperties: false } : void 0;
		const mergedAllOf = [];
		allOf.forEach((schema) => {
			if (isJsonSchema7AllOfType(schema)) {
				mergedAllOf.push(...schema.allOf);
				if (schema.unevaluatedProperties === void 0) unevaluatedProperties = void 0;
			} else {
				let nestedSchema = schema;
				if ("additionalProperties" in schema && schema.additionalProperties === false) {
					const { additionalProperties,...rest } = schema;
					nestedSchema = rest;
				} else unevaluatedProperties = void 0;
				mergedAllOf.push(nestedSchema);
			}
		});
		return mergedAllOf.length ? {
			allOf: mergedAllOf,
			...unevaluatedProperties
		} : void 0;
	}
	exports.parseIntersectionDef = parseIntersectionDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/literal.js
var require_literal = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/literal.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseLiteralDef = void 0;
	function parseLiteralDef(def, refs) {
		const parsedType = typeof def.value;
		if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") return { type: Array.isArray(def.value) ? "array" : "object" };
		if (refs.target === "openApi3") return {
			type: parsedType === "bigint" ? "integer" : parsedType,
			enum: [def.value]
		};
		return {
			type: parsedType === "bigint" ? "integer" : parsedType,
			const: def.value
		};
	}
	exports.parseLiteralDef = parseLiteralDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/string.js
var require_string$1 = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/string.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseStringDef = exports.zodPatterns = void 0;
	const errorMessages_js_1$2 = require_errorMessages();
	let emojiRegex = void 0;
	/**
	* Generated from the regular expressions found here as of 2024-05-22:
	* https://github.com/colinhacks/zod/blob/master/src/types.ts.
	*
	* Expressions with /i flag have been changed accordingly.
	*/
	exports.zodPatterns = {
		cuid: /^[cC][^\s-]{8,}$/,
		cuid2: /^[0-9a-z]+$/,
		ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
		email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
		emoji: () => {
			if (emojiRegex === void 0) emojiRegex = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
			return emojiRegex;
		},
		uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
		ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
		ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
		ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
		ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
		base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
		base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
		nanoid: /^[a-zA-Z0-9_-]{21}$/,
		jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
	};
	function parseStringDef(def, refs) {
		const res = { type: "string" };
		if (def.checks) for (const check of def.checks) switch (check.kind) {
			case "min":
				(0, errorMessages_js_1$2.setResponseValueAndErrors)(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
				break;
			case "max":
				(0, errorMessages_js_1$2.setResponseValueAndErrors)(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
				break;
			case "email":
				switch (refs.emailStrategy) {
					case "format:email":
						addFormat(res, "email", check.message, refs);
						break;
					case "format:idn-email":
						addFormat(res, "idn-email", check.message, refs);
						break;
					case "pattern:zod":
						addPattern(res, exports.zodPatterns.email, check.message, refs);
						break;
				}
				break;
			case "url":
				addFormat(res, "uri", check.message, refs);
				break;
			case "uuid":
				addFormat(res, "uuid", check.message, refs);
				break;
			case "regex":
				addPattern(res, check.regex, check.message, refs);
				break;
			case "cuid":
				addPattern(res, exports.zodPatterns.cuid, check.message, refs);
				break;
			case "cuid2":
				addPattern(res, exports.zodPatterns.cuid2, check.message, refs);
				break;
			case "startsWith":
				addPattern(res, RegExp(`^${escapeLiteralCheckValue(check.value, refs)}`), check.message, refs);
				break;
			case "endsWith":
				addPattern(res, RegExp(`${escapeLiteralCheckValue(check.value, refs)}$`), check.message, refs);
				break;
			case "datetime":
				addFormat(res, "date-time", check.message, refs);
				break;
			case "date":
				addFormat(res, "date", check.message, refs);
				break;
			case "time":
				addFormat(res, "time", check.message, refs);
				break;
			case "duration":
				addFormat(res, "duration", check.message, refs);
				break;
			case "length":
				(0, errorMessages_js_1$2.setResponseValueAndErrors)(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
				(0, errorMessages_js_1$2.setResponseValueAndErrors)(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
				break;
			case "includes": {
				addPattern(res, RegExp(escapeLiteralCheckValue(check.value, refs)), check.message, refs);
				break;
			}
			case "ip": {
				if (check.version !== "v6") addFormat(res, "ipv4", check.message, refs);
				if (check.version !== "v4") addFormat(res, "ipv6", check.message, refs);
				break;
			}
			case "base64url":
				addPattern(res, exports.zodPatterns.base64url, check.message, refs);
				break;
			case "jwt":
				addPattern(res, exports.zodPatterns.jwt, check.message, refs);
				break;
			case "cidr": {
				if (check.version !== "v6") addPattern(res, exports.zodPatterns.ipv4Cidr, check.message, refs);
				if (check.version !== "v4") addPattern(res, exports.zodPatterns.ipv6Cidr, check.message, refs);
				break;
			}
			case "emoji":
				addPattern(res, exports.zodPatterns.emoji(), check.message, refs);
				break;
			case "ulid": {
				addPattern(res, exports.zodPatterns.ulid, check.message, refs);
				break;
			}
			case "base64": {
				switch (refs.base64Strategy) {
					case "format:binary": {
						addFormat(res, "binary", check.message, refs);
						break;
					}
					case "contentEncoding:base64": {
						(0, errorMessages_js_1$2.setResponseValueAndErrors)(res, "contentEncoding", "base64", check.message, refs);
						break;
					}
					case "pattern:zod": {
						addPattern(res, exports.zodPatterns.base64, check.message, refs);
						break;
					}
				}
				break;
			}
			case "nanoid": addPattern(res, exports.zodPatterns.nanoid, check.message, refs);
			case "toLowerCase":
			case "toUpperCase":
			case "trim": break;
			default:
 /* c8 ignore next */
			((_$2) => {})(check);
		}
		return res;
	}
	exports.parseStringDef = parseStringDef;
	function escapeLiteralCheckValue(literal, refs) {
		return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(literal) : literal;
	}
	const ALPHA_NUMERIC = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
	function escapeNonAlphaNumeric(source) {
		let result = "";
		for (let i$1 = 0; i$1 < source.length; i$1++) {
			if (!ALPHA_NUMERIC.has(source[i$1])) result += "\\";
			result += source[i$1];
		}
		return result;
	}
	function addFormat(schema, value, message, refs) {
		if (schema.format || schema.anyOf?.some((x$2) => x$2.format)) {
			if (!schema.anyOf) schema.anyOf = [];
			if (schema.format) {
				schema.anyOf.push({
					format: schema.format,
					...schema.errorMessage && refs.errorMessages && { errorMessage: { format: schema.errorMessage.format } }
				});
				delete schema.format;
				if (schema.errorMessage) {
					delete schema.errorMessage.format;
					if (Object.keys(schema.errorMessage).length === 0) delete schema.errorMessage;
				}
			}
			schema.anyOf.push({
				format: value,
				...message && refs.errorMessages && { errorMessage: { format: message } }
			});
		} else (0, errorMessages_js_1$2.setResponseValueAndErrors)(schema, "format", value, message, refs);
	}
	function addPattern(schema, regex, message, refs) {
		if (schema.pattern || schema.allOf?.some((x$2) => x$2.pattern)) {
			if (!schema.allOf) schema.allOf = [];
			if (schema.pattern) {
				schema.allOf.push({
					pattern: schema.pattern,
					...schema.errorMessage && refs.errorMessages && { errorMessage: { pattern: schema.errorMessage.pattern } }
				});
				delete schema.pattern;
				if (schema.errorMessage) {
					delete schema.errorMessage.pattern;
					if (Object.keys(schema.errorMessage).length === 0) delete schema.errorMessage;
				}
			}
			schema.allOf.push({
				pattern: stringifyRegExpWithFlags(regex, refs),
				...message && refs.errorMessages && { errorMessage: { pattern: message } }
			});
		} else (0, errorMessages_js_1$2.setResponseValueAndErrors)(schema, "pattern", stringifyRegExpWithFlags(regex, refs), message, refs);
	}
	function stringifyRegExpWithFlags(regex, refs) {
		if (!refs.applyRegexFlags || !regex.flags) return regex.source;
		const flags = {
			i: regex.flags.includes("i"),
			m: regex.flags.includes("m"),
			s: regex.flags.includes("s")
		};
		const source = flags.i ? regex.source.toLowerCase() : regex.source;
		let pattern$1 = "";
		let isEscaped = false;
		let inCharGroup = false;
		let inCharRange = false;
		for (let i$1 = 0; i$1 < source.length; i$1++) {
			if (isEscaped) {
				pattern$1 += source[i$1];
				isEscaped = false;
				continue;
			}
			if (flags.i) {
				if (inCharGroup) {
					if (source[i$1].match(/[a-z]/)) {
						if (inCharRange) {
							pattern$1 += source[i$1];
							pattern$1 += `${source[i$1 - 2]}-${source[i$1]}`.toUpperCase();
							inCharRange = false;
						} else if (source[i$1 + 1] === "-" && source[i$1 + 2]?.match(/[a-z]/)) {
							pattern$1 += source[i$1];
							inCharRange = true;
						} else pattern$1 += `${source[i$1]}${source[i$1].toUpperCase()}`;
						continue;
					}
				} else if (source[i$1].match(/[a-z]/)) {
					pattern$1 += `[${source[i$1]}${source[i$1].toUpperCase()}]`;
					continue;
				}
			}
			if (flags.m) {
				if (source[i$1] === "^") {
					pattern$1 += `(^|(?<=[\r\n]))`;
					continue;
				} else if (source[i$1] === "$") {
					pattern$1 += `($|(?=[\r\n]))`;
					continue;
				}
			}
			if (flags.s && source[i$1] === ".") {
				pattern$1 += inCharGroup ? `${source[i$1]}\r\n` : `[${source[i$1]}\r\n]`;
				continue;
			}
			pattern$1 += source[i$1];
			if (source[i$1] === "\\") isEscaped = true;
			else if (inCharGroup && source[i$1] === "]") inCharGroup = false;
			else if (!inCharGroup && source[i$1] === "[") inCharGroup = true;
		}
		try {
			new RegExp(pattern$1);
		} catch {
			console.warn(`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`);
			return regex.source;
		}
		return pattern$1;
	}
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/record.js
var require_record = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/record.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseRecordDef = void 0;
	const zod_1$2 = __require("zod");
	const parseDef_js_1$11 = require_parseDef();
	const string_js_1$1 = require_string$1();
	const branded_js_1$1 = require_branded();
	function parseRecordDef(def, refs) {
		if (refs.target === "openAi") console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.");
		if (refs.target === "openApi3" && def.keyType?._def.typeName === zod_1$2.ZodFirstPartyTypeKind.ZodEnum) return {
			type: "object",
			required: def.keyType._def.values,
			properties: def.keyType._def.values.reduce((acc, key) => ({
				...acc,
				[key]: (0, parseDef_js_1$11.parseDef)(def.valueType._def, {
					...refs,
					currentPath: [
						...refs.currentPath,
						"properties",
						key
					]
				}) ?? {}
			}), {}),
			additionalProperties: refs.rejectedAdditionalProperties
		};
		const schema = {
			type: "object",
			additionalProperties: (0, parseDef_js_1$11.parseDef)(def.valueType._def, {
				...refs,
				currentPath: [...refs.currentPath, "additionalProperties"]
			}) ?? refs.allowedAdditionalProperties
		};
		if (refs.target === "openApi3") return schema;
		if (def.keyType?._def.typeName === zod_1$2.ZodFirstPartyTypeKind.ZodString && def.keyType._def.checks?.length) {
			const { type,...keyType } = (0, string_js_1$1.parseStringDef)(def.keyType._def, refs);
			return {
				...schema,
				propertyNames: keyType
			};
		} else if (def.keyType?._def.typeName === zod_1$2.ZodFirstPartyTypeKind.ZodEnum) return {
			...schema,
			propertyNames: { enum: def.keyType._def.values }
		};
		else if (def.keyType?._def.typeName === zod_1$2.ZodFirstPartyTypeKind.ZodBranded && def.keyType._def.type._def.typeName === zod_1$2.ZodFirstPartyTypeKind.ZodString && def.keyType._def.type._def.checks?.length) {
			const { type,...keyType } = (0, branded_js_1$1.parseBrandedDef)(def.keyType._def, refs);
			return {
				...schema,
				propertyNames: keyType
			};
		}
		return schema;
	}
	exports.parseRecordDef = parseRecordDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/map.js
var require_map = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/map.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseMapDef = void 0;
	const parseDef_js_1$10 = require_parseDef();
	const record_js_1$1 = require_record();
	function parseMapDef(def, refs) {
		if (refs.mapStrategy === "record") return (0, record_js_1$1.parseRecordDef)(def, refs);
		const keys = (0, parseDef_js_1$10.parseDef)(def.keyType._def, {
			...refs,
			currentPath: [
				...refs.currentPath,
				"items",
				"items",
				"0"
			]
		}) || {};
		const values = (0, parseDef_js_1$10.parseDef)(def.valueType._def, {
			...refs,
			currentPath: [
				...refs.currentPath,
				"items",
				"items",
				"1"
			]
		}) || {};
		return {
			type: "array",
			maxItems: 125,
			items: {
				type: "array",
				items: [keys, values],
				minItems: 2,
				maxItems: 2
			}
		};
	}
	exports.parseMapDef = parseMapDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/nativeEnum.js
var require_nativeEnum = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/nativeEnum.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseNativeEnumDef = void 0;
	function parseNativeEnumDef(def) {
		const object = def.values;
		const actualKeys = Object.keys(def.values).filter((key) => {
			return typeof object[object[key]] !== "number";
		});
		const actualValues = actualKeys.map((key) => object[key]);
		const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
		return {
			type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
			enum: actualValues
		};
	}
	exports.parseNativeEnumDef = parseNativeEnumDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/never.js
var require_never = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/never.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseNeverDef = void 0;
	function parseNeverDef() {
		return { not: {} };
	}
	exports.parseNeverDef = parseNeverDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/null.js
var require_null = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/null.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseNullDef = void 0;
	function parseNullDef(refs) {
		return refs.target === "openApi3" ? {
			enum: ["null"],
			nullable: true
		} : { type: "null" };
	}
	exports.parseNullDef = parseNullDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/union.js
var require_union = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/union.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseUnionDef = exports.primitiveMappings = void 0;
	const parseDef_js_1$9 = require_parseDef();
	exports.primitiveMappings = {
		ZodString: "string",
		ZodNumber: "number",
		ZodBigInt: "integer",
		ZodBoolean: "boolean",
		ZodNull: "null"
	};
	function parseUnionDef(def, refs) {
		if (refs.target === "openApi3") return asAnyOf(def, refs);
		const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
		if (options.every((x$2) => x$2._def.typeName in exports.primitiveMappings && (!x$2._def.checks || !x$2._def.checks.length))) {
			const types = options.reduce((types$1, x$2) => {
				const type = exports.primitiveMappings[x$2._def.typeName];
				return type && !types$1.includes(type) ? [...types$1, type] : types$1;
			}, []);
			return { type: types.length > 1 ? types : types[0] };
		} else if (options.every((x$2) => x$2._def.typeName === "ZodLiteral" && !x$2.description)) {
			const types = options.reduce((acc, x$2) => {
				const type = typeof x$2._def.value;
				switch (type) {
					case "string":
					case "number":
					case "boolean": return [...acc, type];
					case "bigint": return [...acc, "integer"];
					case "object": if (x$2._def.value === null) return [...acc, "null"];
					case "symbol":
					case "undefined":
					case "function":
					default: return acc;
				}
			}, []);
			if (types.length === options.length) {
				const uniqueTypes = types.filter((x$2, i$1, a$1) => a$1.indexOf(x$2) === i$1);
				return {
					type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
					enum: options.reduce((acc, x$2) => {
						return acc.includes(x$2._def.value) ? acc : [...acc, x$2._def.value];
					}, [])
				};
			}
		} else if (options.every((x$2) => x$2._def.typeName === "ZodEnum")) return {
			type: "string",
			enum: options.reduce((acc, x$2) => [...acc, ...x$2._def.values.filter((x$3) => !acc.includes(x$3))], [])
		};
		return asAnyOf(def, refs);
	}
	exports.parseUnionDef = parseUnionDef;
	const asAnyOf = (def, refs) => {
		const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x$2, i$1) => (0, parseDef_js_1$9.parseDef)(x$2._def, {
			...refs,
			currentPath: [
				...refs.currentPath,
				"anyOf",
				`${i$1}`
			]
		})).filter((x$2) => !!x$2 && (!refs.strictUnions || typeof x$2 === "object" && Object.keys(x$2).length > 0));
		return anyOf.length ? { anyOf } : void 0;
	};
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/nullable.js
var require_nullable = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/nullable.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseNullableDef = void 0;
	const parseDef_js_1$8 = require_parseDef();
	const union_js_1$1 = require_union();
	function parseNullableDef(def, refs) {
		if ([
			"ZodString",
			"ZodNumber",
			"ZodBigInt",
			"ZodBoolean",
			"ZodNull"
		].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
			if (refs.target === "openApi3") return {
				type: union_js_1$1.primitiveMappings[def.innerType._def.typeName],
				nullable: true
			};
			return { type: [union_js_1$1.primitiveMappings[def.innerType._def.typeName], "null"] };
		}
		if (refs.target === "openApi3") {
			const base$1 = (0, parseDef_js_1$8.parseDef)(def.innerType._def, {
				...refs,
				currentPath: [...refs.currentPath]
			});
			if (base$1 && "$ref" in base$1) return {
				allOf: [base$1],
				nullable: true
			};
			return base$1 && {
				...base$1,
				nullable: true
			};
		}
		const base = (0, parseDef_js_1$8.parseDef)(def.innerType._def, {
			...refs,
			currentPath: [
				...refs.currentPath,
				"anyOf",
				"0"
			]
		});
		return base && { anyOf: [base, { type: "null" }] };
	}
	exports.parseNullableDef = parseNullableDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/number.js
var require_number = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/number.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseNumberDef = void 0;
	const errorMessages_js_1$1 = require_errorMessages();
	function parseNumberDef(def, refs) {
		const res = { type: "number" };
		if (!def.checks) return res;
		for (const check of def.checks) switch (check.kind) {
			case "int":
				res.type = "integer";
				(0, errorMessages_js_1$1.addErrorMessage)(res, "type", check.message, refs);
				break;
			case "min":
				if (refs.target === "jsonSchema7") if (check.inclusive) (0, errorMessages_js_1$1.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
				else (0, errorMessages_js_1$1.setResponseValueAndErrors)(res, "exclusiveMinimum", check.value, check.message, refs);
				else {
					if (!check.inclusive) res.exclusiveMinimum = true;
					(0, errorMessages_js_1$1.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
				}
				break;
			case "max":
				if (refs.target === "jsonSchema7") if (check.inclusive) (0, errorMessages_js_1$1.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
				else (0, errorMessages_js_1$1.setResponseValueAndErrors)(res, "exclusiveMaximum", check.value, check.message, refs);
				else {
					if (!check.inclusive) res.exclusiveMaximum = true;
					(0, errorMessages_js_1$1.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
				}
				break;
			case "multipleOf":
				(0, errorMessages_js_1$1.setResponseValueAndErrors)(res, "multipleOf", check.value, check.message, refs);
				break;
		}
		return res;
	}
	exports.parseNumberDef = parseNumberDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/object.js
var require_object = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/object.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseObjectDef = void 0;
	const zod_1$1 = __require("zod");
	const parseDef_js_1$7 = require_parseDef();
	function parseObjectDef(def, refs) {
		const forceOptionalIntoNullable = refs.target === "openAi";
		const result = {
			type: "object",
			properties: {}
		};
		const required = [];
		const shape = def.shape();
		for (const propName in shape) {
			let propDef = shape[propName];
			if (propDef === void 0 || propDef._def === void 0) continue;
			let propOptional = safeIsOptional(propDef);
			if (propOptional && forceOptionalIntoNullable) {
				if (propDef instanceof zod_1$1.ZodOptional) propDef = propDef._def.innerType;
				if (!propDef.isNullable()) propDef = propDef.nullable();
				propOptional = false;
			}
			const parsedDef = (0, parseDef_js_1$7.parseDef)(propDef._def, {
				...refs,
				currentPath: [
					...refs.currentPath,
					"properties",
					propName
				],
				propertyPath: [
					...refs.currentPath,
					"properties",
					propName
				]
			});
			if (parsedDef === void 0) continue;
			result.properties[propName] = parsedDef;
			if (!propOptional) required.push(propName);
		}
		if (required.length) result.required = required;
		const additionalProperties = decideAdditionalProperties(def, refs);
		if (additionalProperties !== void 0) result.additionalProperties = additionalProperties;
		return result;
	}
	exports.parseObjectDef = parseObjectDef;
	function decideAdditionalProperties(def, refs) {
		if (def.catchall._def.typeName !== "ZodNever") return (0, parseDef_js_1$7.parseDef)(def.catchall._def, {
			...refs,
			currentPath: [...refs.currentPath, "additionalProperties"]
		});
		switch (def.unknownKeys) {
			case "passthrough": return refs.allowedAdditionalProperties;
			case "strict": return refs.rejectedAdditionalProperties;
			case "strip": return refs.removeAdditionalStrategy === "strict" ? refs.allowedAdditionalProperties : refs.rejectedAdditionalProperties;
		}
	}
	function safeIsOptional(schema) {
		try {
			return schema.isOptional();
		} catch {
			return true;
		}
	}
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/optional.js
var require_optional = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/optional.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseOptionalDef = void 0;
	const parseDef_js_1$6 = require_parseDef();
	const parseOptionalDef = (def, refs) => {
		if (refs.currentPath.toString() === refs.propertyPath?.toString()) return (0, parseDef_js_1$6.parseDef)(def.innerType._def, refs);
		const innerSchema = (0, parseDef_js_1$6.parseDef)(def.innerType._def, {
			...refs,
			currentPath: [
				...refs.currentPath,
				"anyOf",
				"1"
			]
		});
		return innerSchema ? { anyOf: [{ not: {} }, innerSchema] } : {};
	};
	exports.parseOptionalDef = parseOptionalDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/pipeline.js
var require_pipeline = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/pipeline.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parsePipelineDef = void 0;
	const parseDef_js_1$5 = require_parseDef();
	const parsePipelineDef = (def, refs) => {
		if (refs.pipeStrategy === "input") return (0, parseDef_js_1$5.parseDef)(def.in._def, refs);
		else if (refs.pipeStrategy === "output") return (0, parseDef_js_1$5.parseDef)(def.out._def, refs);
		const a$1 = (0, parseDef_js_1$5.parseDef)(def.in._def, {
			...refs,
			currentPath: [
				...refs.currentPath,
				"allOf",
				"0"
			]
		});
		const b$2 = (0, parseDef_js_1$5.parseDef)(def.out._def, {
			...refs,
			currentPath: [
				...refs.currentPath,
				"allOf",
				a$1 ? "1" : "0"
			]
		});
		return { allOf: [a$1, b$2].filter((x$2) => x$2 !== void 0) };
	};
	exports.parsePipelineDef = parsePipelineDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/promise.js
var require_promise = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/promise.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parsePromiseDef = void 0;
	const parseDef_js_1$4 = require_parseDef();
	function parsePromiseDef(def, refs) {
		return (0, parseDef_js_1$4.parseDef)(def.type._def, refs);
	}
	exports.parsePromiseDef = parsePromiseDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/set.js
var require_set = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/set.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseSetDef = void 0;
	const errorMessages_js_1 = require_errorMessages();
	const parseDef_js_1$3 = require_parseDef();
	function parseSetDef(def, refs) {
		const items = (0, parseDef_js_1$3.parseDef)(def.valueType._def, {
			...refs,
			currentPath: [...refs.currentPath, "items"]
		});
		const schema = {
			type: "array",
			uniqueItems: true,
			items
		};
		if (def.minSize) (0, errorMessages_js_1.setResponseValueAndErrors)(schema, "minItems", def.minSize.value, def.minSize.message, refs);
		if (def.maxSize) (0, errorMessages_js_1.setResponseValueAndErrors)(schema, "maxItems", def.maxSize.value, def.maxSize.message, refs);
		return schema;
	}
	exports.parseSetDef = parseSetDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/tuple.js
var require_tuple = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/tuple.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseTupleDef = void 0;
	const parseDef_js_1$2 = require_parseDef();
	function parseTupleDef(def, refs) {
		if (def.rest) return {
			type: "array",
			minItems: def.items.length,
			items: def.items.map((x$2, i$1) => (0, parseDef_js_1$2.parseDef)(x$2._def, {
				...refs,
				currentPath: [
					...refs.currentPath,
					"items",
					`${i$1}`
				]
			})).reduce((acc, x$2) => x$2 === void 0 ? acc : [...acc, x$2], []),
			additionalItems: (0, parseDef_js_1$2.parseDef)(def.rest._def, {
				...refs,
				currentPath: [...refs.currentPath, "additionalItems"]
			})
		};
		else return {
			type: "array",
			minItems: def.items.length,
			maxItems: def.items.length,
			items: def.items.map((x$2, i$1) => (0, parseDef_js_1$2.parseDef)(x$2._def, {
				...refs,
				currentPath: [
					...refs.currentPath,
					"items",
					`${i$1}`
				]
			})).reduce((acc, x$2) => x$2 === void 0 ? acc : [...acc, x$2], [])
		};
	}
	exports.parseTupleDef = parseTupleDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/undefined.js
var require_undefined = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/undefined.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseUndefinedDef = void 0;
	function parseUndefinedDef() {
		return { not: {} };
	}
	exports.parseUndefinedDef = parseUndefinedDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/unknown.js
var require_unknown = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/unknown.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseUnknownDef = void 0;
	function parseUnknownDef() {
		return {};
	}
	exports.parseUnknownDef = parseUnknownDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parsers/readonly.js
var require_readonly = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parsers/readonly.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseReadonlyDef = void 0;
	const parseDef_js_1$1 = require_parseDef();
	const parseReadonlyDef = (def, refs) => {
		return (0, parseDef_js_1$1.parseDef)(def.innerType._def, refs);
	};
	exports.parseReadonlyDef = parseReadonlyDef;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/selectParser.js
var require_selectParser = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/selectParser.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.selectParser = void 0;
	const zod_1 = __require("zod");
	const any_js_1 = require_any();
	const array_js_1 = require_array$1();
	const bigint_js_1 = require_bigint();
	const boolean_js_1 = require_boolean();
	const branded_js_1 = require_branded();
	const catch_js_1 = require_catch();
	const date_js_1 = require_date();
	const default_js_1 = require_default();
	const effects_js_1 = require_effects();
	const enum_js_1 = require_enum();
	const intersection_js_1 = require_intersection();
	const literal_js_1 = require_literal();
	const map_js_1 = require_map();
	const nativeEnum_js_1 = require_nativeEnum();
	const never_js_1 = require_never();
	const null_js_1 = require_null();
	const nullable_js_1 = require_nullable();
	const number_js_1 = require_number();
	const object_js_1 = require_object();
	const optional_js_1 = require_optional();
	const pipeline_js_1 = require_pipeline();
	const promise_js_1 = require_promise();
	const record_js_1 = require_record();
	const set_js_1 = require_set();
	const string_js_1 = require_string$1();
	const tuple_js_1 = require_tuple();
	const undefined_js_1 = require_undefined();
	const union_js_1 = require_union();
	const unknown_js_1 = require_unknown();
	const readonly_js_1 = require_readonly();
	const selectParser = (def, typeName, refs) => {
		switch (typeName) {
			case zod_1.ZodFirstPartyTypeKind.ZodString: return (0, string_js_1.parseStringDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodNumber: return (0, number_js_1.parseNumberDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodObject: return (0, object_js_1.parseObjectDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodBigInt: return (0, bigint_js_1.parseBigintDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodBoolean: return (0, boolean_js_1.parseBooleanDef)();
			case zod_1.ZodFirstPartyTypeKind.ZodDate: return (0, date_js_1.parseDateDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodUndefined: return (0, undefined_js_1.parseUndefinedDef)();
			case zod_1.ZodFirstPartyTypeKind.ZodNull: return (0, null_js_1.parseNullDef)(refs);
			case zod_1.ZodFirstPartyTypeKind.ZodArray: return (0, array_js_1.parseArrayDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodUnion:
			case zod_1.ZodFirstPartyTypeKind.ZodDiscriminatedUnion: return (0, union_js_1.parseUnionDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodIntersection: return (0, intersection_js_1.parseIntersectionDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodTuple: return (0, tuple_js_1.parseTupleDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodRecord: return (0, record_js_1.parseRecordDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodLiteral: return (0, literal_js_1.parseLiteralDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodEnum: return (0, enum_js_1.parseEnumDef)(def);
			case zod_1.ZodFirstPartyTypeKind.ZodNativeEnum: return (0, nativeEnum_js_1.parseNativeEnumDef)(def);
			case zod_1.ZodFirstPartyTypeKind.ZodNullable: return (0, nullable_js_1.parseNullableDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodOptional: return (0, optional_js_1.parseOptionalDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodMap: return (0, map_js_1.parseMapDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodSet: return (0, set_js_1.parseSetDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodLazy: return () => def.getter()._def;
			case zod_1.ZodFirstPartyTypeKind.ZodPromise: return (0, promise_js_1.parsePromiseDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodNaN:
			case zod_1.ZodFirstPartyTypeKind.ZodNever: return (0, never_js_1.parseNeverDef)();
			case zod_1.ZodFirstPartyTypeKind.ZodEffects: return (0, effects_js_1.parseEffectsDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodAny: return (0, any_js_1.parseAnyDef)();
			case zod_1.ZodFirstPartyTypeKind.ZodUnknown: return (0, unknown_js_1.parseUnknownDef)();
			case zod_1.ZodFirstPartyTypeKind.ZodDefault: return (0, default_js_1.parseDefaultDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodBranded: return (0, branded_js_1.parseBrandedDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodReadonly: return (0, readonly_js_1.parseReadonlyDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodCatch: return (0, catch_js_1.parseCatchDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodPipeline: return (0, pipeline_js_1.parsePipelineDef)(def, refs);
			case zod_1.ZodFirstPartyTypeKind.ZodFunction:
			case zod_1.ZodFirstPartyTypeKind.ZodVoid:
			case zod_1.ZodFirstPartyTypeKind.ZodSymbol: return void 0;
			default:
 /* c8 ignore next */
			return ((_$2) => void 0)(typeName);
		}
	};
	exports.selectParser = selectParser;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parseDef.js
var require_parseDef = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parseDef.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseDef = void 0;
	const Options_js_1 = require_Options();
	const selectParser_js_1 = require_selectParser();
	function parseDef(def, refs, forceResolution = false) {
		const seenItem = refs.seen.get(def);
		if (refs.override) {
			const overrideResult = refs.override?.(def, refs, seenItem, forceResolution);
			if (overrideResult !== Options_js_1.ignoreOverride) return overrideResult;
		}
		if (seenItem && !forceResolution) {
			const seenSchema = get$ref(seenItem, refs);
			if (seenSchema !== void 0) return seenSchema;
		}
		const newItem = {
			def,
			path: refs.currentPath,
			jsonSchema: void 0
		};
		refs.seen.set(def, newItem);
		const jsonSchemaOrGetter = (0, selectParser_js_1.selectParser)(def, def.typeName, refs);
		const jsonSchema = typeof jsonSchemaOrGetter === "function" ? parseDef(jsonSchemaOrGetter(), refs) : jsonSchemaOrGetter;
		if (jsonSchema) addMeta(def, refs, jsonSchema);
		if (refs.postProcess) {
			const postProcessResult = refs.postProcess(jsonSchema, def, refs);
			newItem.jsonSchema = jsonSchema;
			return postProcessResult;
		}
		newItem.jsonSchema = jsonSchema;
		return jsonSchema;
	}
	exports.parseDef = parseDef;
	const get$ref = (item, refs) => {
		switch (refs.$refStrategy) {
			case "root": return { $ref: item.path.join("/") };
			case "relative": return { $ref: getRelativePath(refs.currentPath, item.path) };
			case "none":
			case "seen": {
				if (item.path.length < refs.currentPath.length && item.path.every((value, index) => refs.currentPath[index] === value)) {
					console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
					return {};
				}
				return refs.$refStrategy === "seen" ? {} : void 0;
			}
		}
	};
	const getRelativePath = (pathA, pathB) => {
		let i$1 = 0;
		for (; i$1 < pathA.length && i$1 < pathB.length; i$1++) if (pathA[i$1] !== pathB[i$1]) break;
		return [(pathA.length - i$1).toString(), ...pathB.slice(i$1)].join("/");
	};
	const addMeta = (def, refs, jsonSchema) => {
		if (def.description) {
			jsonSchema.description = def.description;
			if (refs.markdownDescription) jsonSchema.markdownDescription = def.description;
		}
		return jsonSchema;
	};
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/parseTypes.js
var require_parseTypes = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/parseTypes.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/zodToJsonSchema.js
var require_zodToJsonSchema = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/zodToJsonSchema.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.zodToJsonSchema = void 0;
	const parseDef_js_1 = require_parseDef();
	const Refs_js_1 = require_Refs();
	const zodToJsonSchema = (schema, options) => {
		const refs = (0, Refs_js_1.getRefs)(options);
		const definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce((acc, [name$1, schema$1]) => ({
			...acc,
			[name$1]: (0, parseDef_js_1.parseDef)(schema$1._def, {
				...refs,
				currentPath: [
					...refs.basePath,
					refs.definitionPath,
					name$1
				]
			}, true) ?? {}
		}), {}) : void 0;
		const name = typeof options === "string" ? options : options?.nameStrategy === "title" ? void 0 : options?.name;
		const main = (0, parseDef_js_1.parseDef)(schema._def, name === void 0 ? refs : {
			...refs,
			currentPath: [
				...refs.basePath,
				refs.definitionPath,
				name
			]
		}, false) ?? {};
		const title = typeof options === "object" && options.name !== void 0 && options.nameStrategy === "title" ? options.name : void 0;
		if (title !== void 0) main.title = title;
		const combined = name === void 0 ? definitions ? {
			...main,
			[refs.definitionPath]: definitions
		} : main : {
			$ref: [
				...refs.$refStrategy === "relative" ? [] : refs.basePath,
				refs.definitionPath,
				name
			].join("/"),
			[refs.definitionPath]: {
				...definitions,
				[name]: main
			}
		};
		if (refs.target === "jsonSchema7") combined.$schema = "http://json-schema.org/draft-07/schema#";
		else if (refs.target === "jsonSchema2019-09" || refs.target === "openAi") combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
		if (refs.target === "openAi" && ("anyOf" in combined || "oneOf" in combined || "allOf" in combined || "type" in combined && Array.isArray(combined.type))) console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.");
		return combined;
	};
	exports.zodToJsonSchema = zodToJsonSchema;
} });

//#endregion
//#region ../node_modules/zod-to-json-schema/dist/cjs/index.js
var require_cjs = __commonJS$1({ "../node_modules/zod-to-json-schema/dist/cjs/index.js"(exports) {
	var __createBinding$2 = void 0 && (void 0).__createBinding || (Object.create ? function(o$2, m$1, k$2, k2) {
		if (k2 === void 0) k2 = k$2;
		var desc = Object.getOwnPropertyDescriptor(m$1, k$2);
		if (!desc || ("get" in desc ? !m$1.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m$1[k$2];
			}
		};
		Object.defineProperty(o$2, k2, desc);
	} : function(o$2, m$1, k$2, k2) {
		if (k2 === void 0) k2 = k$2;
		o$2[k2] = m$1[k$2];
	});
	var __exportStar$1 = void 0 && (void 0).__exportStar || function(m$1, exports$1) {
		for (var p$2 in m$1) if (p$2 !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p$2)) __createBinding$2(exports$1, m$1, p$2);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar$1(require_Options(), exports);
	__exportStar$1(require_Refs(), exports);
	__exportStar$1(require_errorMessages(), exports);
	__exportStar$1(require_parseDef(), exports);
	__exportStar$1(require_parseTypes(), exports);
	__exportStar$1(require_any(), exports);
	__exportStar$1(require_array$1(), exports);
	__exportStar$1(require_bigint(), exports);
	__exportStar$1(require_boolean(), exports);
	__exportStar$1(require_branded(), exports);
	__exportStar$1(require_catch(), exports);
	__exportStar$1(require_date(), exports);
	__exportStar$1(require_default(), exports);
	__exportStar$1(require_effects(), exports);
	__exportStar$1(require_enum(), exports);
	__exportStar$1(require_intersection(), exports);
	__exportStar$1(require_literal(), exports);
	__exportStar$1(require_map(), exports);
	__exportStar$1(require_nativeEnum(), exports);
	__exportStar$1(require_never(), exports);
	__exportStar$1(require_null(), exports);
	__exportStar$1(require_nullable(), exports);
	__exportStar$1(require_number(), exports);
	__exportStar$1(require_object(), exports);
	__exportStar$1(require_optional(), exports);
	__exportStar$1(require_pipeline(), exports);
	__exportStar$1(require_promise(), exports);
	__exportStar$1(require_readonly(), exports);
	__exportStar$1(require_record(), exports);
	__exportStar$1(require_set(), exports);
	__exportStar$1(require_string$1(), exports);
	__exportStar$1(require_tuple(), exports);
	__exportStar$1(require_undefined(), exports);
	__exportStar$1(require_union(), exports);
	__exportStar$1(require_unknown(), exports);
	__exportStar$1(require_selectParser(), exports);
	__exportStar$1(require_zodToJsonSchema(), exports);
	const zodToJsonSchema_js_1 = require_zodToJsonSchema();
	exports.default = zodToJsonSchema_js_1.zodToJsonSchema;
} });

//#endregion
//#region ../node_modules/trpc-cli/dist/parse-procedure.js
var require_parse_procedure = __commonJS$1({ "../node_modules/trpc-cli/dist/parse-procedure.js"(exports) {
	var __createBinding$1 = void 0 && (void 0).__createBinding || (Object.create ? function(o$2, m$1, k$2, k2) {
		if (k2 === void 0) k2 = k$2;
		var desc = Object.getOwnPropertyDescriptor(m$1, k$2);
		if (!desc || ("get" in desc ? !m$1.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m$1[k$2];
			}
		};
		Object.defineProperty(o$2, k2, desc);
	} : function(o$2, m$1, k$2, k2) {
		if (k2 === void 0) k2 = k$2;
		o$2[k2] = m$1[k$2];
	});
	var __setModuleDefault$1 = void 0 && (void 0).__setModuleDefault || (Object.create ? function(o$2, v$1) {
		Object.defineProperty(o$2, "default", {
			enumerable: true,
			value: v$1
		});
	} : function(o$2, v$1) {
		o$2["default"] = v$1;
	});
	var __importStar$1 = void 0 && (void 0).__importStar || function() {
		var ownKeys = function(o$2) {
			ownKeys = Object.getOwnPropertyNames || function(o$3) {
				var ar = [];
				for (var k$2 in o$3) if (Object.prototype.hasOwnProperty.call(o$3, k$2)) ar[ar.length] = k$2;
				return ar;
			};
			return ownKeys(o$2);
		};
		return function(mod) {
			if (mod && mod.__esModule) return mod;
			var result = {};
			if (mod != null) {
				for (var k$2 = ownKeys(mod), i$1 = 0; i$1 < k$2.length; i$1++) if (k$2[i$1] !== "default") __createBinding$1(result, mod, k$2[i$1]);
			}
			__setModuleDefault$1(result, mod);
			return result;
		};
	}();
	var __importDefault = void 0 && (void 0).__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseProcedureInputs = parseProcedureInputs;
	const util_1$1 = __require("util");
	const zod4 = __importStar$1(__require("zod/v4/core"));
	const zod_to_json_schema_1 = __importDefault(require_cjs());
	const errors_1$1 = require_errors$1();
	const json_schema_1$1 = require_json_schema();
	/**
	* Attempts to convert a trpc procedure input to JSON schema.
	* Uses @see jsonSchemaConverters to convert the input to JSON schema.
	*/
	function toJsonSchema(input, dependencies) {
		try {
			const jsonSchemaConverters = getJsonSchemaConverters(dependencies);
			const vendor = getVendor(input);
			if (vendor && vendor in jsonSchemaConverters) {
				const converter = jsonSchemaConverters[vendor];
				const converted = converter(input);
				return {
					success: true,
					value: converted
				};
			}
			return {
				success: false,
				error: `Schema not convertible to JSON schema`
			};
		} catch (e$1) {
			const message = e$1 instanceof Error ? e$1.message : String(e$1);
			return {
				success: false,
				error: `Failed to convert input to JSON Schema: ${message}`
			};
		}
	}
	function looksLikeJsonSchema(value) {
		return typeof value === "object" && value !== null && ("type" in value && (typeof value.type === "string" || Array.isArray(value.type)) || "const" in value || "oneOf" in value || "anyOf" in value);
	}
	function parseProcedureInputs(inputs, dependencies) {
		if (inputs.length === 0) return {
			success: true,
			value: {
				positionalParameters: [],
				optionsJsonSchema: {},
				getPojoInput: () => ({})
			}
		};
		const allJsonSchemaable = inputs.every((input) => looksJsonSchemaable(input));
		if (!allJsonSchemaable) return {
			success: false,
			error: `Invalid input type ${inputs.map((s) => s?.constructor.name).join(", ")}, only inputs that can be converted to JSON Schema are supported`
		};
		if (inputs.length > 1) return parseMultiInputs(inputs, dependencies);
		const mergedSchemaResult = toJsonSchema(inputs[0], dependencies);
		if (!mergedSchemaResult.success) return {
			success: false,
			error: mergedSchemaResult.error
		};
		const mergedSchema = mergedSchemaResult.value;
		return handleMergedSchema(mergedSchema);
	}
	function handleMergedSchema(mergedSchema) {
		if (mergedSchema.additionalProperties) return {
			success: false,
			error: `Inputs with additional properties are not currently supported`
		};
		if (mergedSchema.type === "string") return {
			success: true,
			value: {
				positionalParameters: [{
					type: "string",
					array: false,
					description: mergedSchema.description || "",
					name: mergedSchema.title || "string",
					required: !isOptional(mergedSchema)
				}],
				optionsJsonSchema: {},
				getPojoInput: (argv$1) => argv$1.positionalValues[0]
			}
		};
		if (acceptedPrimitiveTypes(mergedSchema).length > 0) return parsePrimitiveInput(mergedSchema);
		if (isTuple(mergedSchema)) return parseTupleInput(mergedSchema);
		if (mergedSchema.type === "array") return parseArrayInput(mergedSchema);
		if (mergedSchema.anyOf) {
			const allObjects = mergedSchema.anyOf.every((sub) => acceptsObject(toRoughJsonSchema7(sub)));
			if (allObjects) return {
				success: true,
				value: {
					positionalParameters: [],
					optionsJsonSchema: mergedSchema,
					getPojoInput: (argv$1) => argv$1.options
				}
			};
			if (mergedSchema.anyOf.length === 2 && JSON.stringify(mergedSchema.anyOf[0]) === "{\"not\":{}}") return handleMergedSchema(mergedSchema.anyOf[1]);
		}
		if (mergedSchema.type !== "object") return {
			success: false,
			error: `Invalid input type ${(0, util_1$1.inspect)(mergedSchema, {
				depth: 2,
				breakLength: Infinity
			})}, expected object or tuple.`
		};
		return {
			success: true,
			value: {
				positionalParameters: [],
				optionsJsonSchema: mergedSchema,
				getPojoInput: (argv$1) => argv$1.options
			}
		};
	}
	function isOptional(schema) {
		if (schema && typeof schema === "object" && "optional" in schema) return schema.optional === true;
		const anyOf = schemaDefPropValue(schema, "anyOf");
		if (anyOf?.length === 2 && JSON.stringify(anyOf[0]) === "{\"not\":{}}") return true;
		if (anyOf?.some((sub) => isOptional(sub))) return true;
		return false;
	}
	function parsePrimitiveInput(schema) {
		const typeName = acceptedPrimitiveTypes(schema).join(" | ");
		const name = (schema.title || schema.description || /\W/.test(typeName) ? "value" : typeName).replaceAll(/\s+/g, "_");
		return {
			success: true,
			value: {
				positionalParameters: [{
					name,
					array: false,
					description: schema.description || "",
					required: !isOptional(schema),
					type: typeName
				}],
				optionsJsonSchema: {},
				getPojoInput: (argv$1) => convertPositional(schema, argv$1.positionalValues[0])
			}
		};
	}
	const schemaDefPropValue = (schema, prop) => {
		if (schema && typeof schema === "object" && prop in schema) return schema[prop];
		return void 0;
	};
	const primitiveCandidateTypes = [
		"string",
		"number",
		"boolean",
		"integer"
	];
	function acceptedPrimitiveTypes(schema) {
		let constVals = [toRoughJsonSchema7(schema).const, toRoughJsonSchema7(schema).enum].flat().filter(Boolean).map((s) => typeof s);
		if (constVals.length === 0) constVals = void 0;
		const typeList = constVals || schemaDefPropValue(schema, "type") || schemaDefPropValue(schema, "oneOf")?.flatMap((s) => acceptedPrimitiveTypes(s)) || schemaDefPropValue(schema, "anyOf")?.flatMap((s) => acceptedPrimitiveTypes(s));
		const acceptedJsonSchemaTypes = new Set([typeList].flat().filter(Boolean));
		return primitiveCandidateTypes.filter((c$1) => acceptedJsonSchemaTypes.has(c$1));
	}
	function parseMultiInputs(inputs, dependencies) {
		const parsedIndividually = inputs.map((input) => parseProcedureInputs([input], dependencies));
		const failures = parsedIndividually.flatMap((p$2) => p$2.success ? [] : [p$2.error]);
		if (failures.length > 0) return {
			success: false,
			error: failures.join("\n")
		};
		const allObjects = parsedIndividually.every((p$2) => p$2.success && p$2.value.positionalParameters.length === 0);
		if (!allObjects) return {
			success: false,
			error: `Can't use positional parameters with multi-input type.`
		};
		return {
			success: true,
			value: {
				positionalParameters: [],
				optionsJsonSchema: { allOf: parsedIndividually.map((p$2) => {
					const successful = p$2;
					const optionsSchema = successful.value.optionsJsonSchema;
					if ("additionalProperties" in optionsSchema && optionsSchema.additionalProperties === false) {
						const { additionalProperties,...rest } = optionsSchema;
						return rest;
					}
					return optionsSchema;
				}) },
				getPojoInput: (argv$1) => argv$1.options
			}
		};
	}
	function isNullable(schema) {
		if (Array.isArray(schema.type) && schema.type.includes("null")) return true;
		if (schema.type === "null") return true;
		if ((schema.anyOf || schema.oneOf)?.some((sub) => isNullable(toRoughJsonSchema7(sub)))) return true;
		if (schema.const === null) return true;
		return false;
	}
	const tupleItemsSchemas = (schema) => {
		if (!schema || typeof schema !== "object") return void 0;
		if (Array.isArray(schema.items)) return schema.items;
		if ("prefixItems" in schema && Array.isArray(schema.prefixItems)) return schema.prefixItems;
		return void 0;
	};
	function isTuple(schema) {
		return Array.isArray(tupleItemsSchemas(schema));
	}
	function parseArrayInput(array$1) {
		if (looksLikeJsonSchema(array$1.items) && isNullable(array$1.items)) return {
			success: false,
			error: `Invalid input type Array<${(0, json_schema_1$1.getSchemaTypes)(array$1.items).join(" | ")}>. Nullable arrays are not supported.`
		};
		return {
			success: true,
			value: {
				positionalParameters: [{
					name: parameterName(array$1, 1),
					array: true,
					description: array$1.description || "",
					required: !isOptional(array$1),
					type: "string"
				}],
				optionsJsonSchema: {},
				getPojoInput: (argv$1) => argv$1.positionalValues.at(-1).map((s) => convertPositional(array$1.items, s))
			}
		};
	}
	function parseTupleInput(tuple) {
		const items = tupleItemsSchemas(tuple);
		if (!Array.isArray(items)) throw new Error(".items is not an array, is this really a tuple?");
		const flagsSchemaIndex = items.findIndex((item) => {
			if (acceptedPrimitiveTypes(item).length > 0) return false;
			if (looksLikeArray(item) && acceptedPrimitiveTypes(item.items).length > 0) return false;
			return true;
		});
		const types = `[${items.map((s) => schemaDefPropValue(s, "type")).join(", ")}]`;
		if (flagsSchemaIndex > -1 && flagsSchemaIndex !== items.length - 1) return {
			success: false,
			error: `Invalid input type ${types}. Positional parameters must be strings, numbers or booleans.`
		};
		const flagsSchema = flagsSchemaIndex === -1 ? null : items[flagsSchemaIndex];
		if (flagsSchema && !acceptsObject(flagsSchema)) return {
			success: false,
			error: `Invalid input type ${types}. The last type must accept object inputs.`
		};
		const positionalSchemas = flagsSchemaIndex === -1 ? items : items.slice(0, flagsSchemaIndex);
		return {
			success: true,
			value: {
				positionalParameters: positionalSchemas.map((schema, i$1) => ({
					name: parameterName(schema, i$1 + 1),
					array: looksLikeArray(schema),
					description: schemaDefPropValue(schema, "description") || "",
					required: !isOptional(schema),
					type: (0, json_schema_1$1.getSchemaTypes)(toRoughJsonSchema7(schema)).join(" | ")
				})),
				optionsJsonSchema: flagsSchema && typeof flagsSchema === "object" ? flagsSchema : {},
				getPojoInput: (commandArgs) => {
					const inputs = commandArgs.positionalValues.map((v$1, i$1) => {
						const correspondingSchema = positionalSchemas[i$1];
						if (looksLikeArray(correspondingSchema)) {
							if (!Array.isArray(v$1)) throw new errors_1$1.CliValidationError(`Expected array at position ${i$1}, got ${typeof v$1}`);
							return v$1.map((s) => {
								if (!correspondingSchema.items || Array.isArray(correspondingSchema.items)) return s;
								return convertPositional(correspondingSchema.items, s);
							});
						}
						if (typeof v$1 !== "string" && v$1 !== void 0) throw new errors_1$1.CliValidationError(`Expected string at position ${i$1}, got ${typeof v$1}`);
						return convertPositional(correspondingSchema, v$1);
					});
					if (flagsSchema) inputs.push(commandArgs.options);
					return inputs;
				}
			}
		};
	}
	/**
	* Converts a positional string to parameter into a number if the target schema accepts numbers, and the input can be parsed as a number.
	* If the target schema accepts numbers but it's *not* a valid number, just return a string.
	* trpc will use zod to handle the validation before invoking the procedure.
	*/
	const convertPositional = (schema, value) => {
		let preprocessed = void 0;
		const acceptedTypes = new Set(acceptedPrimitiveTypes(schema));
		if (acceptedTypes.has("string")) preprocessed = value;
		if (acceptedTypes.has("boolean")) {
			if (value === "true") preprocessed = true;
			else if (value === "false") preprocessed = false;
		}
		if (acceptedTypes.has("number")) {
			const number = Number(value);
			if (!Number.isNaN(number)) preprocessed = number;
		}
		if (acceptedTypes.has("integer")) {
			const num = Number(value);
			if (Number.isInteger(num)) preprocessed = num;
			else if (!Number.isNaN(num) && acceptedTypes === void 0) preprocessed = value;
		}
		if (preprocessed === void 0) return value;
		return preprocessed;
	};
	const looksLikeArray = (schema) => {
		return schemaDefPropValue(schema, "type") === "array";
	};
	const toRoughJsonSchema7 = (schema) => {
		if (!schema || typeof schema !== "object") return {};
		return schema;
	};
	const parameterName = (s, position) => {
		if (looksLikeArray(s)) {
			const items = toRoughJsonSchema7(s).items;
			const elementName = parameterName(!items || Array.isArray(items) ? {} : items, position);
			return `[${elementName.slice(1, -1)}...]`;
		}
		let name = schemaDefPropValue(s, "title") || schemaDefPropValue(s, "description") || `parameter_${position}`;
		name = name.replaceAll(/\W+/g, " ").trim();
		return isOptional(s) ? `[${name}]` : `<${name}>`;
	};
	const acceptsObject = (schema) => {
		return (schema.type === "object" || schema.anyOf?.some((sub) => acceptsObject(toRoughJsonSchema7(sub)))) ?? false;
	};
	/** `Record<standard-schema vendor id, function that converts the input to JSON schema>` */
	const getJsonSchemaConverters = (dependencies) => {
		return {
			zod: (input) => {
				if (input._zod?.version?.major == 4) return zod4.toJSONSchema(input, {
					io: "input",
					unrepresentable: "any",
					override: (ctx) => {
						if (ctx.zodSchema?.constructor?.name === "ZodOptional") ctx.jsonSchema.optional = true;
					}
				});
				return (0, zod_to_json_schema_1.default)(input);
			},
			arktype: (input) => {
				const type = prepareArktypeType(input);
				return type.toJsonSchema({ fallback: (ctx) => {
					if (ctx.code === "unit" && ctx.unit === void 0) return {
						...ctx.base,
						optional: true
					};
					return ctx.base;
				} });
			},
			valibot: (input) => {
				let valibotToJsonSchemaLib = dependencies["@valibot/to-json-schema"];
				if (!valibotToJsonSchemaLib) try {
					valibotToJsonSchemaLib = eval(`require('@valibot/to-json-schema')`);
				} catch (e$1) {
					throw new Error(`@valibot/to-json-schema could not be found - try installing it and re-running`, { cause: e$1 });
				}
				const valibotToJsonSchema = valibotToJsonSchemaLib?.toJsonSchema;
				if (!valibotToJsonSchema) throw new Error(`no 'toJsonSchema' function found in @valibot/to-json-schema - check you are using a supported version`);
				let v$1;
				try {
					v$1 = eval(`require('valibot')`);
				} catch {
					return valibotToJsonSchema(input);
				}
				const parent = valibotToJsonSchema(v$1.object({ child: input }), { errorMode: "ignore" });
				const child = parent.properties.child;
				return parent.required?.length === 0 ? Object.assign(child, { optional: true }) : child;
			},
			effect: (input) => {
				const effect = dependencies.effect || eval(`require('effect')`);
				if (!effect) throw new Error(`effect dependency could not be found - try installing it and re-running`);
				if (!effect.Schema.isSchema(input)) {
					const message = `input was not an effect schema - please use effect version 3.14.2 or higher. See https://github.com/mmkal/trpc-cli/pull/63`;
					throw new Error(message);
				}
				return effect.JSONSchema.make(input);
			}
		};
	};
	function getVendor(schema) {
		return schema?.["~standard"]?.vendor ?? null;
	}
	const jsonSchemaVendorNames = new Set(Object.keys(getJsonSchemaConverters({})));
	function looksJsonSchemaable(value) {
		const vendor = getVendor(value);
		return !!vendor && jsonSchemaVendorNames.has(vendor);
	}
	function prepareArktypeType(type) {
		let innerType = type;
		while (innerType) if (innerType?.in && innerType.in !== innerType) innerType = innerType.in;
		else break;
		return innerType;
	}
} });

//#endregion
//#region ../node_modules/trpc-cli/dist/prompts.js
var require_prompts = __commonJS$1({ "../node_modules/trpc-cli/dist/prompts.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.promptify = exports.createShadowCommand = void 0;
	const commander_1$1 = require_commander();
	const parseUpstreamOptionInfo = (value) => {
		if (typeof value !== "string" || !value.startsWith("{")) return null;
		try {
			const info = JSON.parse(value);
			if (info.typeName !== "UpstreamOptionInfo") return null;
			return info;
		} catch {
			return null;
		}
	};
	const parseUpstreamArgumentInfo = (value) => {
		if (typeof value !== "string" || !value.startsWith("{")) return null;
		try {
			const info = JSON.parse(value);
			if (info.typeName !== "UpstreamArgumentInfo") return null;
			return info;
		} catch {
			return null;
		}
	};
	const getDefaultSubcommand = (command) => {
		const defaultChild = command.description().match(/Available subcommands:.* (\S+) \(default\)/)?.[1];
		return defaultChild ? command.commands.find((c$1) => c$1.name() === defaultChild) : void 0;
	};
	const createShadowCommand = (command, onAnalyze) => {
		const shadow = new commander_1$1.Command(command.name());
		shadow.exitOverride();
		shadow.configureOutput({
			writeOut: () => {},
			writeErr: () => {}
		});
		const argumentsMap = new Map();
		const optionsMap = new Map();
		command.options.forEach((original) => {
			const id = Date.now().toString() + Math.random().toString().slice(1);
			const shadowOption = new commander_1$1.Option(original.flags.replace("<", "[").replace(">", "]"), JSON.stringify([`id=${id}`, original.description]));
			const upstreamOptionInfo = {
				typeName: "UpstreamOptionInfo",
				id,
				specified: false
			};
			shadowOption.default(JSON.stringify(upstreamOptionInfo));
			shadowOption.argParser((value) => JSON.stringify({
				...upstreamOptionInfo,
				specified: true,
				value
			}));
			shadow.addOption(shadowOption);
			optionsMap.set(id, {
				shadow: shadowOption,
				original
			});
		});
		command.registeredArguments.forEach((original) => {
			const shadowArgument = new commander_1$1.Argument(original.name(), original.description);
			const id = Date.now().toString() + Math.random().toString().slice(1);
			shadowArgument.argOptional();
			const upstreamArgumentInfo = {
				typeName: "UpstreamArgumentInfo",
				id,
				specified: false
			};
			shadowArgument.default(JSON.stringify(upstreamArgumentInfo));
			shadowArgument.argParser((value) => JSON.stringify({
				...upstreamArgumentInfo,
				specified: true,
				value
			}));
			shadow.addArgument(shadowArgument);
			argumentsMap.set(id, {
				shadow: shadowArgument,
				original
			});
		});
		const analysis = {
			command: {
				shadow,
				original: command
			},
			arguments: [],
			options: []
		};
		shadow.action(async (...args) => {
			const positionalValues = args.slice(0, -2);
			const options = shadow.opts();
			if (args.at(-2) !== options) throw new Error(`Unexpected args format, second last arg is not the options object`, { cause: args });
			if (args.at(-1) !== shadow) throw new Error(`Unexpected args format, last arg is not the Command instance`, { cause: args });
			positionalValues.forEach((value) => {
				const argumentInfo = parseUpstreamArgumentInfo(value);
				if (argumentInfo) analysis.arguments.push({
					...argumentsMap.get(argumentInfo.id),
					value: argumentInfo.value,
					specified: argumentInfo.specified
				});
			});
			Object.values(options).forEach((value) => {
				const upstreamOptionInfo = parseUpstreamOptionInfo(value);
				if (upstreamOptionInfo) analysis.options.push({
					...optionsMap.get(upstreamOptionInfo.id),
					value: upstreamOptionInfo.value,
					specified: upstreamOptionInfo.specified
				});
			});
			await onAnalyze(analysis);
		});
		command.commands.forEach((subcommand) => {
			const shadowSubcommand = (0, exports.createShadowCommand)(subcommand, onAnalyze);
			shadow.addCommand(shadowSubcommand);
		});
		return shadow;
	};
	exports.createShadowCommand = createShadowCommand;
	const inquirerPrompter = (prompts) => {
		return prompts;
	};
	const clackPrompter = (prompts) => {
		const clack = prompts;
		class ExitPromptError extends Error {}
		const throwOnCancel$1 = (value) => {
			if (clack.isCancel(value)) throw new ExitPromptError();
			return value;
		};
		return {
			input: async (params) => {
				return clack.text({
					message: params.message,
					initialValue: params.default,
					defaultValue: params.default,
					placeholder: params.default,
					validate: params.validate ? (input) => {
						const result = params.validate(input);
						if (result === true) return void 0;
						if (result === false) return `Invalid input`;
						return result;
					} : void 0
				}).then(throwOnCancel$1);
			},
			checkbox: async (params) => {
				return clack.multiselect({
					message: params.message,
					options: params.choices.map((c$1) => ({
						label: c$1.name,
						value: c$1.value
					})),
					initialValues: params.choices.flatMap((c$1) => c$1.checked ? [c$1.value] : [])
				}).then(throwOnCancel$1);
			},
			confirm: async (params) => {
				return clack.confirm({
					message: params.message,
					initialValue: params.default
				}).then(throwOnCancel$1);
			},
			select: async (params) => {
				return clack.select({
					message: params.message,
					options: params.choices.map((sorc) => {
						const c$1 = typeof sorc === "string" ? {
							name: sorc,
							value: sorc
						} : sorc;
						return {
							label: c$1.name,
							value: c$1.value,
							hint: c$1.description
						};
					}),
					initialValue: params.default
				}).then(throwOnCancel$1);
			}
		};
	};
	const promptsPrompter = (prompts) => {
		const p$2 = prompts;
		function x$2() {
			return (value) => value.x;
		}
		return {
			input: async (params) => {
				return p$2({
					name: "x",
					type: "text",
					message: params.message,
					validate: params.validate,
					initial: params.default
				}).then(x$2());
			},
			confirm: async (params) => {
				return p$2({
					name: "x",
					type: "confirm",
					message: params.message,
					active: params.default ? "yes" : "no"
				}).then(x$2());
			},
			select: async (params) => {
				const choicesObjects = params.choices.map((c$1) => typeof c$1 === "string" ? {
					name: c$1,
					value: c$1
				} : c$1);
				return p$2({
					name: "x",
					type: "select",
					message: params.message,
					active: params.default,
					choices: choicesObjects.map((c$1) => ({
						title: c$1.name || c$1.value,
						value: c$1.value
					})),
					initial: params.default ? choicesObjects.findIndex((c$1) => c$1.value === params.default) : void 0
				}).then(x$2());
			},
			checkbox: async (params) => {
				const choicesObjects = params.choices.map((c$1) => typeof c$1 === "string" ? {
					name: c$1,
					value: c$1
				} : c$1);
				return p$2({
					name: "x",
					type: "multiselect",
					message: params.message,
					choices: choicesObjects.map((c$1) => ({
						title: c$1.name || c$1.value,
						value: c$1.value,
						selected: c$1.checked
					}))
				}).then(x$2());
			}
		};
	};
	const enquirerPrompter = (prompts) => {
		const enquirer = prompts;
		function x$2() {
			return (value) => value.x;
		}
		return {
			input: async (params) => {
				return enquirer.prompt({
					type: "input",
					name: "x",
					message: params.message,
					validate: params.validate,
					initial: params.default
				}).then(x$2());
			},
			confirm: async (params) => {
				return enquirer.prompt({
					type: "confirm",
					name: "x",
					message: params.message,
					validate: params.validate,
					initial: params.default
				}).then(x$2());
			},
			select: async (params) => {
				return enquirer.prompt({
					type: "select",
					name: "x",
					message: params.message,
					choices: params.choices.slice(),
					validate: params.validate,
					initial: params.default
				}).then(x$2());
			},
			checkbox: async (params) => {
				return enquirer.prompt({
					type: "multiselect",
					name: "x",
					message: params.message,
					choices: params.choices.slice().map((c$1) => ({
						name: c$1.name,
						value: c$1.value
					})),
					initial: params.choices.flatMap((c$1, i$1) => c$1.checked ? [i$1] : [])
				}).then(x$2());
			}
		};
	};
	const promptify = (program, prompts) => {
		let promptsInput = prompts;
		if (promptsInput?.default) promptsInput = promptsInput.default;
		let prompter;
		if (typeof promptsInput === "function" && typeof promptsInput.inject === "function") prompter = promptsPrompter(promptsInput);
		else if (promptsInput?.name === "Enquirer") prompter = enquirerPrompter(promptsInput);
		else if (typeof promptsInput?.rawlist === "function") prompter = inquirerPrompter(promptsInput);
		else if (typeof promptsInput?.intro === "function") prompter = clackPrompter(promptsInput);
		else if (typeof promptsInput === "function") prompter = promptsInput(program);
		else prompter = promptsInput;
		const command = program;
		const analyseThenParse = async (argv$1, parseOptions) => {
			if (parseOptions?.from === "electron") console.warn(`Warning: using prompts in electron mode is untested. The first two args of $0 are not available in electron mode. Assuming that the first two args of ${JSON.stringify(argv$1)} are electron-related and not intended for the CLI.`);
			if (parseOptions?.from !== "user") {
				argv$1 = argv$1.slice(2);
				parseOptions = { from: "user" };
			}
			const f = {
				command,
				args: [...argv$1]
			};
			const nextArgv = [...f.args];
			let analysis = void 0;
			const maxAttempts = 100;
			for (let i$1 = maxAttempts; i$1 >= 0 && !analysis; i$1--) analysis = await new Promise((resolve$1, reject) => {
				const shadow = (0, exports.createShadowCommand)(f.command, async (an) => {
					if (an.command.original.commands.length === 0) {
						resolve$1(an);
						return;
					}
					const defaultSubcommand = getDefaultSubcommand(an.command.original);
					if (defaultSubcommand) {
						resolve$1(an);
						return;
					}
					const name = await prompter.select({
						message: `Select a ${an.command.original.name() || ""} subcommand`.replace("  ", " "),
						choices: an.command.original.commands.map((c$1) => ({
							name: c$1.name(),
							value: c$1.name(),
							description: c$1.description()
						}))
					}, {});
					nextArgv.push(name);
					resolve$1(void 0);
				});
				shadow.parseAsync(nextArgv, parseOptions).catch((e$1) => {
					if (e$1?.constructor?.name === "CommanderError") resolve$1({
						command: {
							shadow: f.command,
							original: f.command
						},
						arguments: [],
						options: []
					});
					else reject(e$1);
				});
			});
			if (!analysis) {
				const message = `Failed to find a subcommand after ${maxAttempts} attempts - failing to avoid an infinite loop. This is probably a bug in trpc-cli.`;
				throw new Error(message);
			}
			const getMessage$1 = (argOrOpt) => {
				const name = "long" in argOrOpt ? argOrOpt.flags : `[${argOrOpt.name()}]`;
				const parts = [
					name,
					argOrOpt.description,
					argOrOpt.defaultValue && `(default: ${argOrOpt.defaultValue})`,
					!argOrOpt.defaultValue && !argOrOpt.required && "(optional)"
				];
				return parts.filter(Boolean).join(" ").trim() + ":";
			};
			const baseContext = {
				command: analysis.command.original,
				inputs: {
					argv: argv$1,
					arguments: analysis.arguments.map((a$1) => ({
						name: a$1.original.name(),
						specified: a$1.specified,
						value: a$1.value
					})),
					options: analysis.options.map((o$2) => ({
						name: o$2.original.name(),
						specified: o$2.specified,
						value: o$2.value
					}))
				}
			};
			await prompter.setup?.(baseContext);
			const promptConfig = "necessary";
			let shouldPrompt;
			if (promptConfig === "always") shouldPrompt = true;
			else if (promptConfig === "never") shouldPrompt = false;
			else {
				const someRequiredArgsUnspecified = analysis.arguments.some((a$1) => a$1.original.required && !a$1.specified);
				const someRequiredOptionsUnspecified = analysis.options.some((o$2) => o$2.original.required && !o$2.specified);
				shouldPrompt = someRequiredArgsUnspecified || someRequiredOptionsUnspecified;
			}
			if (shouldPrompt) {
				for (const arg of analysis.arguments) {
					const ctx = {
						...baseContext,
						argument: arg.original
					};
					if (!arg.specified) {
						const parseArg = "parseArg" in arg.original && typeof arg.original.parseArg === "function" ? arg.original.parseArg : void 0;
						const promptedValue = await prompter.input({
							message: getMessage$1(arg.original),
							required: arg.original.required,
							default: arg.value,
							validate: (input) => {
								try {
									parseArg?.(input);
									return true;
								} catch (e$1) {
									return `${e$1?.message || e$1}`;
								}
							}
						}, ctx);
						nextArgv.push(promptedValue);
					}
				}
				for (const option of analysis.options) {
					const ctx = {
						...baseContext,
						option: option.original
					};
					if (!option.specified) {
						const fullFlag = option.original.long || `--${option.original.name()}`;
						const isBoolean = option.original.isBoolean() || option.original.flags.includes("[boolean]");
						if (isBoolean) {
							const promptedValue = await prompter.confirm({
								message: getMessage$1(option.original),
								default: option.original.defaultValue ?? false
							}, ctx);
							if (promptedValue) nextArgv.push(fullFlag);
						} else if (option.original.variadic && option.original.argChoices) {
							const choices = option.original.argChoices.slice();
							const results = await prompter.checkbox({
								message: getMessage$1(option.original),
								choices: choices.map((choice) => ({
									value: choice,
									name: choice,
									checked: true
								}))
							}, ctx);
							results.forEach((result) => {
								if (typeof result === "string") nextArgv.push(fullFlag, result);
							});
						} else if (option.original.argChoices) {
							const choices = option.original.argChoices.slice();
							const set = new Set(choices);
							const promptedValue = await prompter.select({
								message: getMessage$1(option.original),
								choices,
								default: option.original.defaultValue
							}, ctx);
							if (set.has(promptedValue)) nextArgv.push(fullFlag, promptedValue);
						} else if (option.original.variadic) {
							const values = [];
							do {
								const promptedValue = await prompter.input({
									message: getMessage$1(option.original),
									default: option.original.defaultValue?.[values.length]
								}, ctx);
								if (!promptedValue) break;
								values.push(fullFlag, promptedValue);
							} while (values);
							nextArgv.push(...values);
						} else {
							const getParsedValue = (input) => {
								return option.original.parseArg ? option.original.parseArg(input, void 0) : input;
							};
							const promptedValue = await prompter.input({
								message: getMessage$1(option.original),
								default: option.value,
								required: option.original.required,
								validate: (input) => {
									const parsed = getParsedValue(input);
									if (parsed == null && input != null) return "Invalid value";
									return true;
								}
							}, ctx);
							if (promptedValue) nextArgv.push(fullFlag, getParsedValue(promptedValue) ?? promptedValue);
						}
					}
				}
			}
			await prompter.teardown?.(baseContext);
			return f.command.parseAsync(nextArgv, parseOptions);
		};
		const parseAsync = (args, parseOptions) => analyseThenParse(args, parseOptions).catch((e$1) => {
			if (e$1?.constructor?.name === "ExitPromptError") return;
			throw e$1;
		});
		return new Proxy(program, { get(target, prop, receiver) {
			if (prop === "parseAsync") return parseAsync;
			return Reflect.get(target, prop, receiver);
		} });
	};
	exports.promptify = promptify;
} });

//#endregion
//#region ../node_modules/trpc-cli/dist/standard-schema/utils.js
var require_utils$6 = __commonJS$1({ "../node_modules/trpc-cli/dist/standard-schema/utils.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.looksLikeStandardSchema = exports.looksLikeStandardSchemaFailure = void 0;
	const looksLikeStandardSchemaFailure = (error) => {
		return !!error && typeof error === "object" && "issues" in error && Array.isArray(error.issues);
	};
	exports.looksLikeStandardSchemaFailure = looksLikeStandardSchemaFailure;
	const looksLikeStandardSchema = (thing) => {
		return !!thing && typeof thing === "object" && "~standard" in thing && typeof thing["~standard"] === "object";
	};
	exports.looksLikeStandardSchema = looksLikeStandardSchema;
} });

//#endregion
//#region ../node_modules/trpc-cli/dist/standard-schema/errors.js
var require_errors = __commonJS$1({ "../node_modules/trpc-cli/dist/standard-schema/errors.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.StandardSchemaV1Error = exports.prettifyStandardSchemaError = void 0;
	exports.toDotPath = toDotPath;
	const utils_1$1 = require_utils$6();
	const prettifyStandardSchemaError = (error) => {
		if (!(0, utils_1$1.looksLikeStandardSchemaFailure)(error)) return null;
		const issues = [...error.issues].map((issue) => {
			const path$28 = issue.path || [];
			const primitivePathSegments = path$28.map((segment) => {
				if (typeof segment === "string" || typeof segment === "number" || typeof segment === "symbol") return segment;
				return segment.key;
			});
			const dotPath = toDotPath(primitivePathSegments);
			return {
				issue,
				path: path$28,
				primitivePathSegments,
				dotPath
			};
		}).sort((a$1, b$2) => a$1.path.length - b$2.path.length);
		const lines = [];
		for (const { issue, dotPath } of issues) {
			let message = `✖ ${issue.message}`;
			if (dotPath) message += ` → at ${dotPath}`;
			lines.push(message);
		}
		return lines.join("\n");
	};
	exports.prettifyStandardSchemaError = prettifyStandardSchemaError;
	function toDotPath(path$28) {
		const segs = [];
		for (const seg of path$28) if (typeof seg === "number") segs.push(`[${seg}]`);
		else if (typeof seg === "symbol") segs.push(`[${JSON.stringify(String(seg))}]`);
		else if (/[^\w$]/.test(seg)) segs.push(`[${JSON.stringify(seg)}]`);
		else {
			if (segs.length) segs.push(".");
			segs.push(seg);
		}
		return segs.join("");
	}
	var StandardSchemaV1Error = class extends Error {
		issues;
		constructor(failure, options) {
			super("Standard Schema error - details in `issues`.", options);
			this.issues = failure.issues;
		}
	};
	exports.StandardSchemaV1Error = StandardSchemaV1Error;
} });

//#endregion
//#region ../node_modules/trpc-cli/dist/trpc-compat.js
var require_trpc_compat = __commonJS$1({ "../node_modules/trpc-cli/dist/trpc-compat.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isOrpcRouter = exports.isTrpc11Router = exports.isTrpc11Procedure = void 0;
	const isTrpc11Procedure = (procedure) => {
		return "type" in procedure._def && typeof procedure._def.type === "string";
	};
	exports.isTrpc11Procedure = isTrpc11Procedure;
	const isTrpc11Router = (router$1) => {
		if ((0, exports.isOrpcRouter)(router$1)) return false;
		const procedure = Object.values(router$1._def.procedures)[0];
		return Boolean(procedure && (0, exports.isTrpc11Procedure)(procedure));
	};
	exports.isTrpc11Router = isTrpc11Router;
	const isOrpcRouter = (router$1) => {
		return !("_def" in router$1) || router$1._def && "~orpc" in router$1._def;
	};
	exports.isOrpcRouter = isOrpcRouter;
} });

//#endregion
//#region ../node_modules/trpc-cli/dist/util.js
var require_util = __commonJS$1({ "../node_modules/trpc-cli/dist/util.js"(exports) {
	/**
	* Pretty much like the `instanceof` operator, but should work across different realms. Necessary for zod because some installations
	* might result in this library using the commonjs zod export, while the user's code uses the esm export.
	* https://github.com/mmkal/trpc-cli/issues/7
	*
	* Tradeoff: It's possible that this function will return false positives if the target class has the same name as an unrelated class in the current realm.
	* So, only use it for classes that are unlikely to have name conflicts like `ZodAbc` or `TRPCDef`.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.looksLikeInstanceof = void 0;
	const looksLikeInstanceof = (value, target) => {
		let current = value?.constructor;
		while (current?.name) {
			if (current?.name === (typeof target === "string" ? target : target.name)) return true;
			current = Object.getPrototypeOf(current);
		}
		return false;
	};
	exports.looksLikeInstanceof = looksLikeInstanceof;
} });

//#endregion
//#region ../node_modules/trpc-cli/dist/types.js
var require_types = __commonJS$1({ "../node_modules/trpc-cli/dist/types.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
} });

//#endregion
//#region ../node_modules/trpc-cli/dist/index.js
var require_dist = __commonJS$1({ "../node_modules/trpc-cli/dist/index.js"(exports) {
	var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function(o$2, m$1, k$2, k2) {
		if (k2 === void 0) k2 = k$2;
		var desc = Object.getOwnPropertyDescriptor(m$1, k$2);
		if (!desc || ("get" in desc ? !m$1.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m$1[k$2];
			}
		};
		Object.defineProperty(o$2, k2, desc);
	} : function(o$2, m$1, k$2, k2) {
		if (k2 === void 0) k2 = k$2;
		o$2[k2] = m$1[k$2];
	});
	var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function(o$2, v$1) {
		Object.defineProperty(o$2, "default", {
			enumerable: true,
			value: v$1
		});
	} : function(o$2, v$1) {
		o$2["default"] = v$1;
	});
	var __importStar = void 0 && (void 0).__importStar || function() {
		var ownKeys = function(o$2) {
			ownKeys = Object.getOwnPropertyNames || function(o$3) {
				var ar = [];
				for (var k$2 in o$3) if (Object.prototype.hasOwnProperty.call(o$3, k$2)) ar[ar.length] = k$2;
				return ar;
			};
			return ownKeys(o$2);
		};
		return function(mod) {
			if (mod && mod.__esModule) return mod;
			var result = {};
			if (mod != null) {
				for (var k$2 = ownKeys(mod), i$1 = 0; i$1 < k$2.length; i$1++) if (k$2[i$1] !== "default") __createBinding(result, mod, k$2[i$1]);
			}
			__setModuleDefault(result, mod);
			return result;
		};
	}();
	var __exportStar = void 0 && (void 0).__exportStar || function(m$1, exports$1) {
		for (var p$2 in m$1) if (p$2 !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p$2)) __createBinding(exports$1, m$1, p$2);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CliValidationError = exports.FailedToExitError = exports.trpcCli = exports.parseRouter = exports.Command = exports.trpcServer = exports.zod = exports.z = void 0;
	exports.createCli = createCli$1;
	const trpcServer11 = __importStar(require_dist$1());
	const commander_1 = require_commander();
	const util_1 = __require("util");
	const completions_1 = require_completions();
	const errors_1 = require_errors$1();
	const json_1 = require_json$1();
	const json_schema_1 = require_json_schema();
	const logging_1 = require_logging();
	const parse_procedure_1 = require_parse_procedure();
	const prompts_1 = require_prompts();
	const errors_2 = require_errors();
	const utils_1 = require_utils$6();
	const trpc_compat_1 = require_trpc_compat();
	const util_2 = require_util();
	__exportStar(require_types(), exports);
	var v4_1 = __require("zod/v4");
	Object.defineProperty(exports, "z", {
		enumerable: true,
		get: function() {
			return v4_1.z;
		}
	});
	exports.zod = __importStar(__require("zod"));
	exports.trpcServer = __importStar(require_dist$1());
	var Command = class extends commander_1.Command {
		/** @internal track the commands that have been run, so that we can find the `__result` of the last command */
		__ran = [];
		__input;
		/** @internal stash the return value of the underlying procedure on the command so to pass to `FailedToExitError` for use in a pinch */
		__result;
	};
	exports.Command = Command;
	/**
	* @internal takes a trpc router and returns an object that you **could** use to build a CLI, or UI, or a bunch of other things with.
	* Officially, just internal for building a CLI. GLHF.
	*/
	const parseRouter = ({ router: router$1,...params }) => {
		if ((0, trpc_compat_1.isOrpcRouter)(router$1)) return parseOrpcRouter({
			router: router$1,
			...params
		});
		return parseTrpcRouter({
			router: router$1,
			...params
		});
	};
	exports.parseRouter = parseRouter;
	const parseTrpcRouter = ({ router: router$1,...params }) => {
		const defEntries = Object.entries(router$1._def.procedures);
		return defEntries.map(([procedurePath, procedure]) => {
			const meta = getMeta(procedure);
			if (meta.jsonInput) return [procedurePath, {
				meta,
				parsedProcedure: jsonProcedureInputs(),
				incompatiblePairs: [],
				procedure
			}];
			const procedureInputsResult = (0, parse_procedure_1.parseProcedureInputs)(procedure._def.inputs, params);
			if (!procedureInputsResult.success) {
				const procedureInputs$1 = jsonProcedureInputs(`procedure's schema couldn't be converted to CLI arguments: ${procedureInputsResult.error}`);
				return [procedurePath, {
					meta,
					parsedProcedure: procedureInputs$1,
					incompatiblePairs: [],
					procedure
				}];
			}
			const procedureInputs = procedureInputsResult.value;
			const incompatiblePairs = (0, json_schema_1.incompatiblePropertyPairs)(procedureInputs.optionsJsonSchema);
			return [procedurePath, {
				meta: getMeta(procedure),
				parsedProcedure: procedureInputs,
				incompatiblePairs,
				procedure
			}];
		});
	};
	const parseOrpcRouter = (params) => {
		const entries = [];
		const { traverseContractProcedures, isProcedure: isProcedure$1 } = eval(`require('@orpc/server')`);
		const router$1 = params.router;
		const lazyRoutes = traverseContractProcedures({
			path: [],
			router: router$1
		}, ({ contract, path: path$28 }) => {
			let procedure = params.router;
			for (const p$2 of path$28) procedure = procedure[p$2];
			if (!isProcedure$1(procedure)) return;
			const procedureInputsResult = (0, parse_procedure_1.parseProcedureInputs)([contract["~orpc"].inputSchema], {
				"@valibot/to-json-schema": params["@valibot/to-json-schema"],
				effect: params.effect
			});
			const procedurePath = path$28.join(".");
			const procedureish = { _def: { meta: contract["~orpc"].meta } };
			const meta = getMeta(procedureish);
			if (meta.jsonInput) {
				entries.push([procedurePath, {
					meta,
					parsedProcedure: jsonProcedureInputs(),
					incompatiblePairs: [],
					procedure
				}]);
				return;
			}
			if (!procedureInputsResult.success) {
				const parsedProcedure$1 = jsonProcedureInputs(`procedure's schema couldn't be converted to CLI arguments: ${procedureInputsResult.error}`);
				entries.push([procedurePath, {
					meta,
					parsedProcedure: parsedProcedure$1,
					incompatiblePairs: [],
					procedure
				}]);
				return;
			}
			const parsedProcedure = procedureInputsResult.value;
			const incompatiblePairs = (0, json_schema_1.incompatiblePropertyPairs)(parsedProcedure.optionsJsonSchema);
			entries.push([procedurePath, {
				procedure,
				meta,
				incompatiblePairs,
				parsedProcedure
			}]);
		});
		if (lazyRoutes.length) {
			const suggestion = `Please use \`import {unlazyRouter} from '@orpc/server'\` to unlazy the router before passing it to trpc-cli`;
			const routes = lazyRoutes.map(({ path: path$28 }) => path$28.join(".")).join(", ");
			throw new Error(`Lazy routers are not supported. ${suggestion}. Lazy routes detected: ${routes}`);
		}
		return entries;
	};
	/** helper to create a "ParsedProcedure" that just accepts a JSON string - for when we failed to parse the input schema or the use set jsonInput: true */
	const jsonProcedureInputs = (reason) => {
		let description = `Input formatted as JSON`;
		if (reason) description += ` (${reason})`;
		return {
			positionalParameters: [],
			optionsJsonSchema: {
				type: "object",
				properties: { input: {
					type: "json",
					description
				} }
			},
			getPojoInput: (parsedCliParams) => {
				if (parsedCliParams.options.input == null) return parsedCliParams.options.input;
				return JSON.parse(parsedCliParams.options.input);
			}
		};
	};
	/**
	* Run a trpc router as a CLI.
	*
	* @param router A trpc router
	* @param context The context to use when calling the procedures - needed if your router requires a context
	* @param trpcServer The trpc server module to use. Only needed if using trpc v10.
	* @returns A CLI object with a `run` method that can be called to run the CLI. The `run` method will parse the command line arguments, call the appropriate trpc procedure, log the result and exit the process. On error, it will log the error and exit with a non-zero exit code.
	*/
	function createCli$1({ router: router$1,...params }) {
		const procedureEntries = (0, exports.parseRouter)({
			router: router$1,
			...params
		});
		function buildProgram(runParams) {
			const logger = {
				...logging_1.lineByLineConsoleLogger,
				...runParams?.logger
			};
			const program = new Command(params.name);
			if (params.version) program.version(params.version);
			if (params.description) program.description(params.description);
			if (params.usage) [params.usage].flat().forEach((usage) => program.usage(usage));
			program.showHelpAfterError();
			program.showSuggestionAfterError();
			const commandTree = { "": program };
			const defaultCommands = {};
			const _process = runParams?.process || process;
			const configureCommand = (command, procedurePath, { meta, parsedProcedure, incompatiblePairs, procedure }) => {
				const optionJsonSchemaProperties = (0, json_schema_1.flattenedProperties)(parsedProcedure.optionsJsonSchema);
				command.exitOverride((ec) => {
					_process.exit(ec.exitCode);
					throw new errors_1.FailedToExitError(`Command ${command.name()} exitOverride`, {
						exitCode: ec.exitCode,
						cause: ec
					});
				});
				command.configureOutput({
					writeOut: (str) => {
						logger.info?.(str);
					},
					writeErr: (str) => {
						logger.error?.(str);
					}
				});
				command.showHelpAfterError();
				if (meta.usage) command.usage([meta.usage].flat().join("\n"));
				if (meta.examples) command.addHelpText("after", `\nExamples:\n${[meta.examples].flat().join("\n")}`);
				meta?.aliases?.command?.forEach((alias) => {
					command.alias(alias);
				});
				command.description(meta?.description || "");
				parsedProcedure.positionalParameters.forEach((param) => {
					const descriptionParts = [
						param.type === "string" ? "" : param.type,
						param.description,
						param.required ? "(required)" : ""
					];
					const argument = new commander_1.Argument(param.name, descriptionParts.filter(Boolean).join(" "));
					if (param.type === "number") argument.argParser((value) => {
						const number = numberParser(value, { fallback: null });
						if (number == null) throw new commander_1.InvalidArgumentError(`Invalid number: ${value}`);
						return value;
					});
					argument.required = param.required;
					argument.variadic = param.array;
					command.addArgument(argument);
				});
				const unusedOptionAliases = { ...meta.aliases?.options };
				const addOptionForProperty = ([propertyKey, propertyValue]) => {
					const description = (0, json_schema_1.getDescription)(propertyValue);
					const longOption = `--${kebabCase(propertyKey)}`;
					let flags = longOption;
					const alias = meta.aliases?.options?.[propertyKey];
					if (alias) {
						let prefix = "-";
						if (alias.startsWith("-")) prefix = "";
						else if (alias.length > 1) prefix = "--";
						flags = `${prefix}${alias}, ${flags}`;
						delete unusedOptionAliases[propertyKey];
					}
					const defaultValue = "default" in propertyValue ? {
						exists: true,
						value: propertyValue.default
					} : { exists: false };
					const rootTypes = (0, json_schema_1.getSchemaTypes)(propertyValue).sort();
					/** try to get a parser that can confidently parse a string into the correct type. Returns null if it can't confidently parse */
					const getValueParser = (types) => {
						types = types.map((t$1) => t$1 === "integer" ? "number" : t$1);
						if (types.length === 2 && types[0] === "boolean" && types[1] === "number") return {
							type: "boolean|number",
							parser: (value) => booleanParser(value, { fallback: null }) ?? numberParser(value)
						};
						if (types.length === 1 && types[0] === "boolean") return {
							type: "boolean",
							parser: (value) => booleanParser(value)
						};
						if (types.length === 1 && types[0] === "number") return {
							type: "number",
							parser: (value) => numberParser(value)
						};
						if (types.length === 1 && types[0] === "string") return {
							type: "string",
							parser: null
						};
						return {
							type: "json",
							parser: (value) => {
								let parsed;
								try {
									parsed = JSON.parse(value);
								} catch {
									throw new commander_1.InvalidArgumentError(`Malformed JSON.`);
								}
								const jsonSchemaType = Array.isArray(parsed) ? "array" : parsed === null ? "null" : typeof parsed;
								if (!types.includes(jsonSchemaType)) throw new commander_1.InvalidArgumentError(`Got ${jsonSchemaType} but expected ${types.join(" or ")}`);
								return parsed;
							}
						};
					};
					const propertyType = rootTypes[0];
					const isValueRequired = "required" in parsedProcedure.optionsJsonSchema && parsedProcedure.optionsJsonSchema.required?.includes(propertyKey);
					const isCliOptionRequired = isValueRequired && propertyType !== "boolean" && !defaultValue.exists;
					function negate() {
						const negation = new commander_1.Option(longOption.replace("--", "--no-"), `Negate \`${longOption}\` option.`.trim());
						command.addOption(negation);
					}
					const bracketise = (name) => isCliOptionRequired ? `<${name}>` : `[${name}]`;
					if (rootTypes.length === 2 && rootTypes[0] === "boolean" && rootTypes[1] === "string") {
						const option$1 = new commander_1.Option(`${flags} [value]`, description);
						option$1.default(defaultValue.exists ? defaultValue.value : false);
						command.addOption(option$1);
						negate();
						return;
					}
					if (rootTypes.length === 2 && rootTypes[0] === "boolean" && rootTypes[1] === "number") {
						const option$1 = new commander_1.Option(`${flags} [value]`, description);
						option$1.argParser(getValueParser(rootTypes).parser);
						option$1.default(defaultValue.exists ? defaultValue.value : false);
						command.addOption(option$1);
						negate();
						return;
					}
					if (rootTypes.length === 2 && rootTypes[0] === "number" && rootTypes[1] === "string") {
						const option$1 = new commander_1.Option(`${flags} ${bracketise("value")}`, description);
						option$1.argParser((value) => {
							const number = numberParser(value, { fallback: null });
							return number ?? value;
						});
						if (defaultValue.exists) option$1.default(defaultValue.value);
						command.addOption(option$1);
						return;
					}
					if (rootTypes.length !== 1) {
						const option$1 = new commander_1.Option(`${flags} ${bracketise("json")}`, `${description} (value will be parsed as JSON)`);
						option$1.argParser(getValueParser(rootTypes).parser);
						command.addOption(option$1);
						return;
					}
					if (propertyType === "boolean" && isValueRequired) {
						const option$1 = new commander_1.Option(flags, description);
						option$1.default(defaultValue.exists ? defaultValue.value : false);
						command.addOption(option$1);
						negate();
						return;
					} else if (propertyType === "boolean") {
						const option$1 = new commander_1.Option(`${flags} [boolean]`, description);
						option$1.argParser((value) => booleanParser(value));
						if (defaultValue.exists) option$1.default(defaultValue.value);
						command.addOption(option$1);
						negate();
						return;
					}
					let option;
					if (propertyType === "string") option = new commander_1.Option(`${flags} ${bracketise("string")}`, description);
					else if (propertyType === "boolean") option = new commander_1.Option(flags, description);
					else if (propertyType === "number" || propertyType === "integer") {
						option = new commander_1.Option(`${flags} ${bracketise("number")}`, description);
						option.argParser((value) => numberParser(value, { fallback: null }));
					} else if (propertyType === "array") {
						option = new commander_1.Option(`${flags} [values...]`, description);
						if (defaultValue.exists) option.default(defaultValue.value);
						else if (isValueRequired) option.default([]);
						const itemsProp = "items" in propertyValue ? propertyValue.items : null;
						const itemTypes = itemsProp ? (0, json_schema_1.getSchemaTypes)(itemsProp) : [];
						const itemEnumTypes = itemsProp && (0, json_schema_1.getEnumChoices)(itemsProp);
						if (itemEnumTypes?.type === "string_enum") option.choices(itemEnumTypes.choices);
						const itemParser = getValueParser(itemTypes);
						if (itemParser.parser) option.argParser((value, previous) => {
							const parsed = itemParser.parser(value);
							if (Array.isArray(previous)) return [...previous, parsed];
							return [parsed];
						});
					}
					option ||= new commander_1.Option(`${flags} [json]`, description);
					if (defaultValue.exists && option.defaultValue !== defaultValue.value) option.default(defaultValue.value);
					if (option.flags.includes("<")) option.makeOptionMandatory();
					const enumChoices = (0, json_schema_1.getEnumChoices)(propertyValue);
					if (enumChoices?.type === "string_enum") option.choices(enumChoices.choices);
					option.conflicts(incompatiblePairs.flatMap((pair) => {
						const filtered = pair.filter((p$2) => p$2 !== propertyKey);
						if (filtered.length === pair.length) return [];
						return filtered;
					}));
					command.addOption(option);
					if (propertyType === "boolean") negate();
				};
				Object.entries(optionJsonSchemaProperties).forEach(addOptionForProperty);
				const invalidOptionAliases = Object.entries(unusedOptionAliases).map(([option, alias]) => `${option}: ${alias}`);
				if (invalidOptionAliases.length) throw new Error(`Invalid option aliases: ${invalidOptionAliases.join(", ")}`);
				command.action(async (...args) => {
					program.__ran ||= [];
					program.__ran.push(command);
					const options = command.opts();
					if (args.at(-2) !== options) throw new Error(`Unexpected args format, second last arg is not the options object`, { cause: args });
					if (args.at(-1) !== command) throw new Error(`Unexpected args format, last arg is not the Command instance`, { cause: args });
					const positionalValues = args.slice(0, -2);
					const input = parsedProcedure.getPojoInput({
						positionalValues,
						options
					});
					const resolvedTrpcServer = await (params.trpcServer || trpcServer11);
					let caller;
					const deprecatedCreateCaller = Reflect.get(params, "createCallerFactory");
					if (deprecatedCreateCaller) {
						const message = `Using deprecated \`createCallerFactory\` option. Use \`trpcServer\` instead. e.g. \`createCli({router: myRouter, trpcServer: import('@trpc/server')})\``;
						logger.error?.(message);
						caller = deprecatedCreateCaller(router$1)(params.context);
					} else if ((0, trpc_compat_1.isOrpcRouter)(router$1)) {
						const { call } = eval(`require('@orpc/server')`);
						caller = { [procedurePath]: (_input) => call(procedure, _input, { context: params.context }) };
					} else {
						const createCallerFactor = resolvedTrpcServer.initTRPC.create().createCallerFactory;
						caller = createCallerFactor(router$1)(params.context);
					}
					const result = await caller[procedurePath](input).catch((err) => {
						throw transformError(err, command);
					});
					command.__result = result;
					if (result != null) logger.info?.(result);
				});
			};
			procedureEntries.forEach(([procedurePath, commandConfig]) => {
				const segments = procedurePath.split(".");
				let currentPath = "";
				for (let i$1 = 0; i$1 < segments.length - 1; i$1++) {
					const segment = segments[i$1];
					const parentPath$1 = currentPath;
					currentPath = currentPath ? `${currentPath}.${segment}` : segment;
					if (!commandTree[currentPath]) {
						const parentCommand$1 = commandTree[parentPath$1];
						const newCommand = new Command(kebabCase(segment));
						newCommand.showHelpAfterError();
						parentCommand$1.addCommand(newCommand);
						commandTree[currentPath] = newCommand;
					}
				}
				const leafName = segments.at(-1);
				const parentPath = segments.length > 1 ? segments.slice(0, -1).join(".") : "";
				const parentCommand = commandTree[parentPath];
				const leafCommand = new Command(leafName && kebabCase(leafName));
				configureCommand(leafCommand, procedurePath, commandConfig);
				parentCommand.addCommand(leafCommand);
				const meta = commandConfig.meta;
				if (meta.default === true) {
					parentCommand.allowExcessArguments();
					parentCommand.allowUnknownOption();
					parentCommand.addHelpText("after", leafCommand.helpInformation());
					parentCommand.action(async () => {
						await leafCommand.parseAsync([...parentCommand.args], { from: "user" });
					});
					defaultCommands[parentPath] = {
						procedurePath,
						config: commandConfig,
						command: leafCommand
					};
				}
			});
			Object.entries(commandTree).forEach(([path$28, command]) => {
				if (command.commands.length === 0) return;
				const subcommandNames = command.commands.map((cmd) => cmd.name());
				const defaultCommand = defaultCommands[path$28]?.command.name();
				const formattedSubcommands = subcommandNames.map((name) => name === defaultCommand ? `${name} (default)` : name).join(", ");
				const existingDescription = command.description() || "";
				const descriptionParts = [existingDescription, `Available subcommands: ${formattedSubcommands}`];
				command.description(descriptionParts.filter(Boolean).join("\n"));
			});
			return program;
		}
		const run$1 = async (runParams, program = buildProgram(runParams)) => {
			if (!(0, util_2.looksLikeInstanceof)(program, "Command")) throw new Error(`program is not a Command instance`);
			const opts = runParams?.argv ? { from: "user" } : void 0;
			const argv$1 = [...runParams?.argv || process.argv];
			const _process = runParams?.process || process;
			const logger = {
				...logging_1.lineByLineConsoleLogger,
				...runParams?.logger
			};
			program.exitOverride((exit) => {
				_process.exit(exit.exitCode);
				throw new errors_1.FailedToExitError("Root command exitOverride", {
					exitCode: exit.exitCode,
					cause: exit
				});
			});
			program.configureOutput({
				writeOut: (str) => logger.info?.(str),
				writeErr: (str) => logger.error?.(str)
			});
			if (runParams?.completion) {
				const completion = typeof runParams.completion === "function" ? await runParams.completion() : runParams.completion;
				(0, completions_1.addCompletions)(program, completion);
			}
			const formatError = runParams?.formatError || ((err) => {
				if (err instanceof errors_1.CliValidationError) return err.message;
				return (0, util_1.inspect)(err);
			});
			if (runParams?.prompts) program = (0, prompts_1.promptify)(program, runParams.prompts);
			await program.parseAsync(argv$1, opts).catch((err) => {
				if (err instanceof errors_1.FailedToExitError) throw err;
				const logMessage = (0, util_2.looksLikeInstanceof)(err, Error) ? formatError(err) || err.message : `Non-error of type ${typeof err} thrown: ${err}`;
				logger.error?.(logMessage);
				_process.exit(1);
				throw new errors_1.FailedToExitError(`Program exit after failure`, {
					exitCode: 1,
					cause: err
				});
			});
			_process.exit(0);
			throw new errors_1.FailedToExitError("Program exit after success", {
				exitCode: 0,
				cause: program.__ran.at(-1)?.__result
			});
		};
		return {
			run: run$1,
			buildProgram,
			toJSON: (program = buildProgram()) => (0, json_1.commandToJSON)(program)
		};
	}
	function getMeta(procedure) {
		const meta = procedure._def.meta;
		return meta?.cliMeta || meta || {};
	}
	function kebabCase(propName) {
		return propName.replaceAll(/([A-Z])/g, "-$1").toLowerCase();
	}
	/** @deprecated renamed to `createCli` */
	exports.trpcCli = createCli$1;
	function transformError(err, command) {
		if ((0, util_2.looksLikeInstanceof)(err, Error) && err.message.includes("This is a client-only function")) return new Error("Failed to create trpc caller. If using trpc v10, either upgrade to v11 or pass in the `@trpc/server` module to `createCli` explicitly");
		if ((0, util_2.looksLikeInstanceof)(err, "TRPCError")) {
			const cause = err.cause;
			if ((0, utils_1.looksLikeStandardSchemaFailure)(cause)) {
				const prettyMessage = (0, errors_2.prettifyStandardSchemaError)(cause);
				return new errors_1.CliValidationError(prettyMessage + "\n\n" + command.helpInformation());
			}
			if (err.code === "BAD_REQUEST" && (err.cause?.constructor?.name === "TraversalError" || err.cause?.constructor?.name === "StandardSchemaV1Error")) return new errors_1.CliValidationError(err.cause.message + "\n\n" + command.helpInformation());
			if (err.code === "INTERNAL_SERVER_ERROR") return cause;
		}
		return err;
	}
	var errors_3 = require_errors$1();
	Object.defineProperty(exports, "FailedToExitError", {
		enumerable: true,
		get: function() {
			return errors_3.FailedToExitError;
		}
	});
	Object.defineProperty(exports, "CliValidationError", {
		enumerable: true,
		get: function() {
			return errors_3.CliValidationError;
		}
	});
	const numberParser = (val, { fallback = val } = {}) => {
		const number = Number(val);
		return Number.isNaN(number) ? fallback : number;
	};
	const booleanParser = (val, { fallback = val } = {}) => {
		if (val === "true") return true;
		if (val === "false") return false;
		return fallback;
	};
} });

//#endregion
//#region ../node_modules/sisteransi/src/index.js
var require_src = __commonJS$1({ "../node_modules/sisteransi/src/index.js"(exports, module) {
	const ESC = "\x1B";
	const CSI = `${ESC}[`;
	const beep = "\x07";
	const cursor = {
		to(x$2, y$2) {
			if (!y$2) return `${CSI}${x$2 + 1}G`;
			return `${CSI}${y$2 + 1};${x$2 + 1}H`;
		},
		move(x$2, y$2) {
			let ret = "";
			if (x$2 < 0) ret += `${CSI}${-x$2}D`;
			else if (x$2 > 0) ret += `${CSI}${x$2}C`;
			if (y$2 < 0) ret += `${CSI}${-y$2}A`;
			else if (y$2 > 0) ret += `${CSI}${y$2}B`;
			return ret;
		},
		up: (count$1 = 1) => `${CSI}${count$1}A`,
		down: (count$1 = 1) => `${CSI}${count$1}B`,
		forward: (count$1 = 1) => `${CSI}${count$1}C`,
		backward: (count$1 = 1) => `${CSI}${count$1}D`,
		nextLine: (count$1 = 1) => `${CSI}E`.repeat(count$1),
		prevLine: (count$1 = 1) => `${CSI}F`.repeat(count$1),
		left: `${CSI}G`,
		hide: `${CSI}?25l`,
		show: `${CSI}?25h`,
		save: `${ESC}7`,
		restore: `${ESC}8`
	};
	const scroll = {
		up: (count$1 = 1) => `${CSI}S`.repeat(count$1),
		down: (count$1 = 1) => `${CSI}T`.repeat(count$1)
	};
	const erase = {
		screen: `${CSI}2J`,
		up: (count$1 = 1) => `${CSI}1J`.repeat(count$1),
		down: (count$1 = 1) => `${CSI}J`.repeat(count$1),
		line: `${CSI}2K`,
		lineEnd: `${CSI}K`,
		lineStart: `${CSI}1K`,
		lines(count$1) {
			let clear = "";
			for (let i$1 = 0; i$1 < count$1; i$1++) clear += this.line + (i$1 < count$1 - 1 ? cursor.up() : "");
			if (count$1) clear += cursor.left;
			return clear;
		}
	};
	module.exports = {
		cursor,
		scroll,
		erase,
		beep
	};
} });

//#endregion
//#region ../node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS$1({ "../node_modules/picocolors/picocolors.js"(exports, module) {
	let p$1 = process || {}, argv = p$1.argv || [], env = p$1.env || {};
	let isColorSupported = !(!!env.NO_COLOR || argv.includes("--no-color")) && (!!env.FORCE_COLOR || argv.includes("--color") || p$1.platform === "win32" || (p$1.stdout || {}).isTTY && env.TERM !== "dumb" || !!env.CI);
	let formatter = (open, close, replace = open) => (input) => {
		let string$1 = "" + input, index = string$1.indexOf(close, open.length);
		return ~index ? open + replaceClose(string$1, close, replace, index) + close : open + string$1 + close;
	};
	let replaceClose = (string$1, close, replace, index) => {
		let result = "", cursor$1 = 0;
		do {
			result += string$1.substring(cursor$1, index) + replace;
			cursor$1 = index + close.length;
			index = string$1.indexOf(close, cursor$1);
		} while (~index);
		return result + string$1.substring(cursor$1);
	};
	let createColors = (enabled = isColorSupported) => {
		let f = enabled ? formatter : () => String;
		return {
			isColorSupported: enabled,
			reset: f("\x1B[0m", "\x1B[0m"),
			bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
			dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
			italic: f("\x1B[3m", "\x1B[23m"),
			underline: f("\x1B[4m", "\x1B[24m"),
			inverse: f("\x1B[7m", "\x1B[27m"),
			hidden: f("\x1B[8m", "\x1B[28m"),
			strikethrough: f("\x1B[9m", "\x1B[29m"),
			black: f("\x1B[30m", "\x1B[39m"),
			red: f("\x1B[31m", "\x1B[39m"),
			green: f("\x1B[32m", "\x1B[39m"),
			yellow: f("\x1B[33m", "\x1B[39m"),
			blue: f("\x1B[34m", "\x1B[39m"),
			magenta: f("\x1B[35m", "\x1B[39m"),
			cyan: f("\x1B[36m", "\x1B[39m"),
			white: f("\x1B[37m", "\x1B[39m"),
			gray: f("\x1B[90m", "\x1B[39m"),
			bgBlack: f("\x1B[40m", "\x1B[49m"),
			bgRed: f("\x1B[41m", "\x1B[49m"),
			bgGreen: f("\x1B[42m", "\x1B[49m"),
			bgYellow: f("\x1B[43m", "\x1B[49m"),
			bgBlue: f("\x1B[44m", "\x1B[49m"),
			bgMagenta: f("\x1B[45m", "\x1B[49m"),
			bgCyan: f("\x1B[46m", "\x1B[49m"),
			bgWhite: f("\x1B[47m", "\x1B[49m"),
			blackBright: f("\x1B[90m", "\x1B[39m"),
			redBright: f("\x1B[91m", "\x1B[39m"),
			greenBright: f("\x1B[92m", "\x1B[39m"),
			yellowBright: f("\x1B[93m", "\x1B[39m"),
			blueBright: f("\x1B[94m", "\x1B[39m"),
			magentaBright: f("\x1B[95m", "\x1B[39m"),
			cyanBright: f("\x1B[96m", "\x1B[39m"),
			whiteBright: f("\x1B[97m", "\x1B[39m"),
			bgBlackBright: f("\x1B[100m", "\x1B[49m"),
			bgRedBright: f("\x1B[101m", "\x1B[49m"),
			bgGreenBright: f("\x1B[102m", "\x1B[49m"),
			bgYellowBright: f("\x1B[103m", "\x1B[49m"),
			bgBlueBright: f("\x1B[104m", "\x1B[49m"),
			bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
			bgCyanBright: f("\x1B[106m", "\x1B[49m"),
			bgWhiteBright: f("\x1B[107m", "\x1B[49m")
		};
	};
	module.exports = createColors();
	module.exports.createColors = createColors;
} });

//#endregion
//#region ../node_modules/@clack/core/dist/index.mjs
var import_src$1 = __toESM$1(require_src(), 1);
var import_picocolors$3 = __toESM$1(require_picocolors(), 1);
function DD({ onlyFirst: e$1 = !1 } = {}) {
	const t$1 = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
	return new RegExp(t$1, e$1 ? void 0 : "g");
}
const uD = DD();
function P$1(e$1) {
	if (typeof e$1 != "string") throw new TypeError(`Expected a \`string\`, got \`${typeof e$1}\``);
	return e$1.replace(uD, "");
}
function L$1(e$1) {
	return e$1 && e$1.__esModule && Object.prototype.hasOwnProperty.call(e$1, "default") ? e$1.default : e$1;
}
var W$1 = { exports: {} };
(function(e$1) {
	var u$18 = {};
	e$1.exports = u$18, u$18.eastAsianWidth = function(F$1) {
		var s = F$1.charCodeAt(0), i$1 = F$1.length == 2 ? F$1.charCodeAt(1) : 0, D$1 = s;
		return 55296 <= s && s <= 56319 && 56320 <= i$1 && i$1 <= 57343 && (s &= 1023, i$1 &= 1023, D$1 = s << 10 | i$1, D$1 += 65536), D$1 == 12288 || 65281 <= D$1 && D$1 <= 65376 || 65504 <= D$1 && D$1 <= 65510 ? "F" : D$1 == 8361 || 65377 <= D$1 && D$1 <= 65470 || 65474 <= D$1 && D$1 <= 65479 || 65482 <= D$1 && D$1 <= 65487 || 65490 <= D$1 && D$1 <= 65495 || 65498 <= D$1 && D$1 <= 65500 || 65512 <= D$1 && D$1 <= 65518 ? "H" : 4352 <= D$1 && D$1 <= 4447 || 4515 <= D$1 && D$1 <= 4519 || 4602 <= D$1 && D$1 <= 4607 || 9001 <= D$1 && D$1 <= 9002 || 11904 <= D$1 && D$1 <= 11929 || 11931 <= D$1 && D$1 <= 12019 || 12032 <= D$1 && D$1 <= 12245 || 12272 <= D$1 && D$1 <= 12283 || 12289 <= D$1 && D$1 <= 12350 || 12353 <= D$1 && D$1 <= 12438 || 12441 <= D$1 && D$1 <= 12543 || 12549 <= D$1 && D$1 <= 12589 || 12593 <= D$1 && D$1 <= 12686 || 12688 <= D$1 && D$1 <= 12730 || 12736 <= D$1 && D$1 <= 12771 || 12784 <= D$1 && D$1 <= 12830 || 12832 <= D$1 && D$1 <= 12871 || 12880 <= D$1 && D$1 <= 13054 || 13056 <= D$1 && D$1 <= 19903 || 19968 <= D$1 && D$1 <= 42124 || 42128 <= D$1 && D$1 <= 42182 || 43360 <= D$1 && D$1 <= 43388 || 44032 <= D$1 && D$1 <= 55203 || 55216 <= D$1 && D$1 <= 55238 || 55243 <= D$1 && D$1 <= 55291 || 63744 <= D$1 && D$1 <= 64255 || 65040 <= D$1 && D$1 <= 65049 || 65072 <= D$1 && D$1 <= 65106 || 65108 <= D$1 && D$1 <= 65126 || 65128 <= D$1 && D$1 <= 65131 || 110592 <= D$1 && D$1 <= 110593 || 127488 <= D$1 && D$1 <= 127490 || 127504 <= D$1 && D$1 <= 127546 || 127552 <= D$1 && D$1 <= 127560 || 127568 <= D$1 && D$1 <= 127569 || 131072 <= D$1 && D$1 <= 194367 || 177984 <= D$1 && D$1 <= 196605 || 196608 <= D$1 && D$1 <= 262141 ? "W" : 32 <= D$1 && D$1 <= 126 || 162 <= D$1 && D$1 <= 163 || 165 <= D$1 && D$1 <= 166 || D$1 == 172 || D$1 == 175 || 10214 <= D$1 && D$1 <= 10221 || 10629 <= D$1 && D$1 <= 10630 ? "Na" : D$1 == 161 || D$1 == 164 || 167 <= D$1 && D$1 <= 168 || D$1 == 170 || 173 <= D$1 && D$1 <= 174 || 176 <= D$1 && D$1 <= 180 || 182 <= D$1 && D$1 <= 186 || 188 <= D$1 && D$1 <= 191 || D$1 == 198 || D$1 == 208 || 215 <= D$1 && D$1 <= 216 || 222 <= D$1 && D$1 <= 225 || D$1 == 230 || 232 <= D$1 && D$1 <= 234 || 236 <= D$1 && D$1 <= 237 || D$1 == 240 || 242 <= D$1 && D$1 <= 243 || 247 <= D$1 && D$1 <= 250 || D$1 == 252 || D$1 == 254 || D$1 == 257 || D$1 == 273 || D$1 == 275 || D$1 == 283 || 294 <= D$1 && D$1 <= 295 || D$1 == 299 || 305 <= D$1 && D$1 <= 307 || D$1 == 312 || 319 <= D$1 && D$1 <= 322 || D$1 == 324 || 328 <= D$1 && D$1 <= 331 || D$1 == 333 || 338 <= D$1 && D$1 <= 339 || 358 <= D$1 && D$1 <= 359 || D$1 == 363 || D$1 == 462 || D$1 == 464 || D$1 == 466 || D$1 == 468 || D$1 == 470 || D$1 == 472 || D$1 == 474 || D$1 == 476 || D$1 == 593 || D$1 == 609 || D$1 == 708 || D$1 == 711 || 713 <= D$1 && D$1 <= 715 || D$1 == 717 || D$1 == 720 || 728 <= D$1 && D$1 <= 731 || D$1 == 733 || D$1 == 735 || 768 <= D$1 && D$1 <= 879 || 913 <= D$1 && D$1 <= 929 || 931 <= D$1 && D$1 <= 937 || 945 <= D$1 && D$1 <= 961 || 963 <= D$1 && D$1 <= 969 || D$1 == 1025 || 1040 <= D$1 && D$1 <= 1103 || D$1 == 1105 || D$1 == 8208 || 8211 <= D$1 && D$1 <= 8214 || 8216 <= D$1 && D$1 <= 8217 || 8220 <= D$1 && D$1 <= 8221 || 8224 <= D$1 && D$1 <= 8226 || 8228 <= D$1 && D$1 <= 8231 || D$1 == 8240 || 8242 <= D$1 && D$1 <= 8243 || D$1 == 8245 || D$1 == 8251 || D$1 == 8254 || D$1 == 8308 || D$1 == 8319 || 8321 <= D$1 && D$1 <= 8324 || D$1 == 8364 || D$1 == 8451 || D$1 == 8453 || D$1 == 8457 || D$1 == 8467 || D$1 == 8470 || 8481 <= D$1 && D$1 <= 8482 || D$1 == 8486 || D$1 == 8491 || 8531 <= D$1 && D$1 <= 8532 || 8539 <= D$1 && D$1 <= 8542 || 8544 <= D$1 && D$1 <= 8555 || 8560 <= D$1 && D$1 <= 8569 || D$1 == 8585 || 8592 <= D$1 && D$1 <= 8601 || 8632 <= D$1 && D$1 <= 8633 || D$1 == 8658 || D$1 == 8660 || D$1 == 8679 || D$1 == 8704 || 8706 <= D$1 && D$1 <= 8707 || 8711 <= D$1 && D$1 <= 8712 || D$1 == 8715 || D$1 == 8719 || D$1 == 8721 || D$1 == 8725 || D$1 == 8730 || 8733 <= D$1 && D$1 <= 8736 || D$1 == 8739 || D$1 == 8741 || 8743 <= D$1 && D$1 <= 8748 || D$1 == 8750 || 8756 <= D$1 && D$1 <= 8759 || 8764 <= D$1 && D$1 <= 8765 || D$1 == 8776 || D$1 == 8780 || D$1 == 8786 || 8800 <= D$1 && D$1 <= 8801 || 8804 <= D$1 && D$1 <= 8807 || 8810 <= D$1 && D$1 <= 8811 || 8814 <= D$1 && D$1 <= 8815 || 8834 <= D$1 && D$1 <= 8835 || 8838 <= D$1 && D$1 <= 8839 || D$1 == 8853 || D$1 == 8857 || D$1 == 8869 || D$1 == 8895 || D$1 == 8978 || 9312 <= D$1 && D$1 <= 9449 || 9451 <= D$1 && D$1 <= 9547 || 9552 <= D$1 && D$1 <= 9587 || 9600 <= D$1 && D$1 <= 9615 || 9618 <= D$1 && D$1 <= 9621 || 9632 <= D$1 && D$1 <= 9633 || 9635 <= D$1 && D$1 <= 9641 || 9650 <= D$1 && D$1 <= 9651 || 9654 <= D$1 && D$1 <= 9655 || 9660 <= D$1 && D$1 <= 9661 || 9664 <= D$1 && D$1 <= 9665 || 9670 <= D$1 && D$1 <= 9672 || D$1 == 9675 || 9678 <= D$1 && D$1 <= 9681 || 9698 <= D$1 && D$1 <= 9701 || D$1 == 9711 || 9733 <= D$1 && D$1 <= 9734 || D$1 == 9737 || 9742 <= D$1 && D$1 <= 9743 || 9748 <= D$1 && D$1 <= 9749 || D$1 == 9756 || D$1 == 9758 || D$1 == 9792 || D$1 == 9794 || 9824 <= D$1 && D$1 <= 9825 || 9827 <= D$1 && D$1 <= 9829 || 9831 <= D$1 && D$1 <= 9834 || 9836 <= D$1 && D$1 <= 9837 || D$1 == 9839 || 9886 <= D$1 && D$1 <= 9887 || 9918 <= D$1 && D$1 <= 9919 || 9924 <= D$1 && D$1 <= 9933 || 9935 <= D$1 && D$1 <= 9953 || D$1 == 9955 || 9960 <= D$1 && D$1 <= 9983 || D$1 == 10045 || D$1 == 10071 || 10102 <= D$1 && D$1 <= 10111 || 11093 <= D$1 && D$1 <= 11097 || 12872 <= D$1 && D$1 <= 12879 || 57344 <= D$1 && D$1 <= 63743 || 65024 <= D$1 && D$1 <= 65039 || D$1 == 65533 || 127232 <= D$1 && D$1 <= 127242 || 127248 <= D$1 && D$1 <= 127277 || 127280 <= D$1 && D$1 <= 127337 || 127344 <= D$1 && D$1 <= 127386 || 917760 <= D$1 && D$1 <= 917999 || 983040 <= D$1 && D$1 <= 1048573 || 1048576 <= D$1 && D$1 <= 1114109 ? "A" : "N";
	}, u$18.characterLength = function(F$1) {
		var s = this.eastAsianWidth(F$1);
		return s == "F" || s == "W" || s == "A" ? 2 : 1;
	};
	function t$1(F$1) {
		return F$1.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
	}
	u$18.length = function(F$1) {
		for (var s = t$1(F$1), i$1 = 0, D$1 = 0; D$1 < s.length; D$1++) i$1 = i$1 + this.characterLength(s[D$1]);
		return i$1;
	}, u$18.slice = function(F$1, s, i$1) {
		textLen = u$18.length(F$1), s = s || 0, i$1 = i$1 || 1, s < 0 && (s = textLen + s), i$1 < 0 && (i$1 = textLen + i$1);
		for (var D$1 = "", C$1 = 0, n$1 = t$1(F$1), E = 0; E < n$1.length; E++) {
			var a$1 = n$1[E], o$2 = u$18.length(a$1);
			if (C$1 >= s - (o$2 == 2 ? 1 : 0)) if (C$1 + o$2 <= i$1) D$1 += a$1;
			else break;
			C$1 += o$2;
		}
		return D$1;
	};
})(W$1);
var tD = W$1.exports;
const eD = L$1(tD);
var FD = function() {
	return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
const sD = L$1(FD);
function p(e$1, u$18 = {}) {
	if (typeof e$1 != "string" || e$1.length === 0 || (u$18 = {
		ambiguousIsNarrow: !0,
		...u$18
	}, e$1 = P$1(e$1), e$1.length === 0)) return 0;
	e$1 = e$1.replace(sD(), "  ");
	const t$1 = u$18.ambiguousIsNarrow ? 1 : 2;
	let F$1 = 0;
	for (const s of e$1) {
		const i$1 = s.codePointAt(0);
		if (i$1 <= 31 || i$1 >= 127 && i$1 <= 159 || i$1 >= 768 && i$1 <= 879) continue;
		switch (eD.eastAsianWidth(s)) {
			case "F":
			case "W":
				F$1 += 2;
				break;
			case "A":
				F$1 += t$1;
				break;
			default: F$1 += 1;
		}
	}
	return F$1;
}
const w = 10, N = (e$1 = 0) => (u$18) => `\x1B[${u$18 + e$1}m`, I = (e$1 = 0) => (u$18) => `\x1B[${38 + e$1};5;${u$18}m`, R = (e$1 = 0) => (u$18, t$1, F$1) => `\x1B[${38 + e$1};2;${u$18};${t$1};${F$1}m`, r = {
	modifier: {
		reset: [0, 0],
		bold: [1, 22],
		dim: [2, 22],
		italic: [3, 23],
		underline: [4, 24],
		overline: [53, 55],
		inverse: [7, 27],
		hidden: [8, 28],
		strikethrough: [9, 29]
	},
	color: {
		black: [30, 39],
		red: [31, 39],
		green: [32, 39],
		yellow: [33, 39],
		blue: [34, 39],
		magenta: [35, 39],
		cyan: [36, 39],
		white: [37, 39],
		blackBright: [90, 39],
		gray: [90, 39],
		grey: [90, 39],
		redBright: [91, 39],
		greenBright: [92, 39],
		yellowBright: [93, 39],
		blueBright: [94, 39],
		magentaBright: [95, 39],
		cyanBright: [96, 39],
		whiteBright: [97, 39]
	},
	bgColor: {
		bgBlack: [40, 49],
		bgRed: [41, 49],
		bgGreen: [42, 49],
		bgYellow: [43, 49],
		bgBlue: [44, 49],
		bgMagenta: [45, 49],
		bgCyan: [46, 49],
		bgWhite: [47, 49],
		bgBlackBright: [100, 49],
		bgGray: [100, 49],
		bgGrey: [100, 49],
		bgRedBright: [101, 49],
		bgGreenBright: [102, 49],
		bgYellowBright: [103, 49],
		bgBlueBright: [104, 49],
		bgMagentaBright: [105, 49],
		bgCyanBright: [106, 49],
		bgWhiteBright: [107, 49]
	}
};
Object.keys(r.modifier);
const iD = Object.keys(r.color), CD = Object.keys(r.bgColor);
[...iD, ...CD];
function rD() {
	const e$1 = new Map();
	for (const [u$18, t$1] of Object.entries(r)) {
		for (const [F$1, s] of Object.entries(t$1)) r[F$1] = {
			open: `\x1B[${s[0]}m`,
			close: `\x1B[${s[1]}m`
		}, t$1[F$1] = r[F$1], e$1.set(s[0], s[1]);
		Object.defineProperty(r, u$18, {
			value: t$1,
			enumerable: !1
		});
	}
	return Object.defineProperty(r, "codes", {
		value: e$1,
		enumerable: !1
	}), r.color.close = "\x1B[39m", r.bgColor.close = "\x1B[49m", r.color.ansi = N(), r.color.ansi256 = I(), r.color.ansi16m = R(), r.bgColor.ansi = N(w), r.bgColor.ansi256 = I(w), r.bgColor.ansi16m = R(w), Object.defineProperties(r, {
		rgbToAnsi256: {
			value: (u$18, t$1, F$1) => u$18 === t$1 && t$1 === F$1 ? u$18 < 8 ? 16 : u$18 > 248 ? 231 : Math.round((u$18 - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(u$18 / 255 * 5) + 6 * Math.round(t$1 / 255 * 5) + Math.round(F$1 / 255 * 5),
			enumerable: !1
		},
		hexToRgb: {
			value: (u$18) => {
				const t$1 = /[a-f\d]{6}|[a-f\d]{3}/i.exec(u$18.toString(16));
				if (!t$1) return [
					0,
					0,
					0
				];
				let [F$1] = t$1;
				F$1.length === 3 && (F$1 = [...F$1].map((i$1) => i$1 + i$1).join(""));
				const s = Number.parseInt(F$1, 16);
				return [
					s >> 16 & 255,
					s >> 8 & 255,
					s & 255
				];
			},
			enumerable: !1
		},
		hexToAnsi256: {
			value: (u$18) => r.rgbToAnsi256(...r.hexToRgb(u$18)),
			enumerable: !1
		},
		ansi256ToAnsi: {
			value: (u$18) => {
				if (u$18 < 8) return 30 + u$18;
				if (u$18 < 16) return 90 + (u$18 - 8);
				let t$1, F$1, s;
				if (u$18 >= 232) t$1 = ((u$18 - 232) * 10 + 8) / 255, F$1 = t$1, s = t$1;
				else {
					u$18 -= 16;
					const C$1 = u$18 % 36;
					t$1 = Math.floor(u$18 / 36) / 5, F$1 = Math.floor(C$1 / 6) / 5, s = C$1 % 6 / 5;
				}
				const i$1 = Math.max(t$1, F$1, s) * 2;
				if (i$1 === 0) return 30;
				let D$1 = 30 + (Math.round(s) << 2 | Math.round(F$1) << 1 | Math.round(t$1));
				return i$1 === 2 && (D$1 += 60), D$1;
			},
			enumerable: !1
		},
		rgbToAnsi: {
			value: (u$18, t$1, F$1) => r.ansi256ToAnsi(r.rgbToAnsi256(u$18, t$1, F$1)),
			enumerable: !1
		},
		hexToAnsi: {
			value: (u$18) => r.ansi256ToAnsi(r.hexToAnsi256(u$18)),
			enumerable: !1
		}
	}), r;
}
const ED = rD(), d$1 = new Set(["\x1B", ""]), oD = 39, y$1 = "\x07", V$1 = "[", nD = "]", G$1 = "m", _$1 = `${nD}8;;`, z$2 = (e$1) => `${d$1.values().next().value}${V$1}${e$1}${G$1}`, K$1 = (e$1) => `${d$1.values().next().value}${_$1}${e$1}${y$1}`, aD = (e$1) => e$1.split(" ").map((u$18) => p(u$18)), k$1 = (e$1, u$18, t$1) => {
	const F$1 = [...u$18];
	let s = !1, i$1 = !1, D$1 = p(P$1(e$1[e$1.length - 1]));
	for (const [C$1, n$1] of F$1.entries()) {
		const E = p(n$1);
		if (D$1 + E <= t$1 ? e$1[e$1.length - 1] += n$1 : (e$1.push(n$1), D$1 = 0), d$1.has(n$1) && (s = !0, i$1 = F$1.slice(C$1 + 1).join("").startsWith(_$1)), s) {
			i$1 ? n$1 === y$1 && (s = !1, i$1 = !1) : n$1 === G$1 && (s = !1);
			continue;
		}
		D$1 += E, D$1 === t$1 && C$1 < F$1.length - 1 && (e$1.push(""), D$1 = 0);
	}
	!D$1 && e$1[e$1.length - 1].length > 0 && e$1.length > 1 && (e$1[e$1.length - 2] += e$1.pop());
}, hD = (e$1) => {
	const u$18 = e$1.split(" ");
	let t$1 = u$18.length;
	for (; t$1 > 0 && !(p(u$18[t$1 - 1]) > 0);) t$1--;
	return t$1 === u$18.length ? e$1 : u$18.slice(0, t$1).join(" ") + u$18.slice(t$1).join("");
}, lD = (e$1, u$18, t$1 = {}) => {
	if (t$1.trim !== !1 && e$1.trim() === "") return "";
	let F$1 = "", s, i$1;
	const D$1 = aD(e$1);
	let C$1 = [""];
	for (const [E, a$1] of e$1.split(" ").entries()) {
		t$1.trim !== !1 && (C$1[C$1.length - 1] = C$1[C$1.length - 1].trimStart());
		let o$2 = p(C$1[C$1.length - 1]);
		if (E !== 0 && (o$2 >= u$18 && (t$1.wordWrap === !1 || t$1.trim === !1) && (C$1.push(""), o$2 = 0), (o$2 > 0 || t$1.trim === !1) && (C$1[C$1.length - 1] += " ", o$2++)), t$1.hard && D$1[E] > u$18) {
			const c$1 = u$18 - o$2, f = 1 + Math.floor((D$1[E] - c$1 - 1) / u$18);
			Math.floor((D$1[E] - 1) / u$18) < f && C$1.push(""), k$1(C$1, a$1, u$18);
			continue;
		}
		if (o$2 + D$1[E] > u$18 && o$2 > 0 && D$1[E] > 0) {
			if (t$1.wordWrap === !1 && o$2 < u$18) {
				k$1(C$1, a$1, u$18);
				continue;
			}
			C$1.push("");
		}
		if (o$2 + D$1[E] > u$18 && t$1.wordWrap === !1) {
			k$1(C$1, a$1, u$18);
			continue;
		}
		C$1[C$1.length - 1] += a$1;
	}
	t$1.trim !== !1 && (C$1 = C$1.map((E) => hD(E)));
	const n$1 = [...C$1.join(`
`)];
	for (const [E, a$1] of n$1.entries()) {
		if (F$1 += a$1, d$1.has(a$1)) {
			const { groups: c$1 } = new RegExp(`(?:\\${V$1}(?<code>\\d+)m|\\${_$1}(?<uri>.*)${y$1})`).exec(n$1.slice(E).join("")) || { groups: {} };
			if (c$1.code !== void 0) {
				const f = Number.parseFloat(c$1.code);
				s = f === oD ? void 0 : f;
			} else c$1.uri !== void 0 && (i$1 = c$1.uri.length === 0 ? void 0 : c$1.uri);
		}
		const o$2 = ED.codes.get(Number(s));
		n$1[E + 1] === `
` ? (i$1 && (F$1 += K$1("")), s && o$2 && (F$1 += z$2(o$2))) : a$1 === `
` && (s && o$2 && (F$1 += z$2(s)), i$1 && (F$1 += K$1(i$1)));
	}
	return F$1;
};
function Y$1(e$1, u$18, t$1) {
	return String(e$1).normalize().replace(/\r\n/g, `
`).split(`
`).map((F$1) => lD(F$1, u$18, t$1)).join(`
`);
}
const xD = [
	"up",
	"down",
	"left",
	"right",
	"space",
	"enter",
	"cancel"
], B = {
	actions: new Set(xD),
	aliases: new Map([
		["k", "up"],
		["j", "down"],
		["h", "left"],
		["l", "right"],
		["", "cancel"],
		["escape", "cancel"]
	])
};
function $$1(e$1, u$18) {
	if (typeof e$1 == "string") return B.aliases.get(e$1) === u$18;
	for (const t$1 of e$1) if (t$1 !== void 0 && $$1(t$1, u$18)) return !0;
	return !1;
}
function BD(e$1, u$18) {
	if (e$1 === u$18) return;
	const t$1 = e$1.split(`
`), F$1 = u$18.split(`
`), s = [];
	for (let i$1 = 0; i$1 < Math.max(t$1.length, F$1.length); i$1++) t$1[i$1] !== F$1[i$1] && s.push(i$1);
	return s;
}
const AD = globalThis.process.platform.startsWith("win"), S = Symbol("clack:cancel");
function pD(e$1) {
	return e$1 === S;
}
function m(e$1, u$18) {
	const t$1 = e$1;
	t$1.isTTY && t$1.setRawMode(u$18);
}
function fD({ input: e$1 = stdin, output: u$18 = stdout, overwrite: t$1 = !0, hideCursor: F$1 = !0 } = {}) {
	const s = g.createInterface({
		input: e$1,
		output: u$18,
		prompt: "",
		tabSize: 1
	});
	g.emitKeypressEvents(e$1, s), e$1.isTTY && e$1.setRawMode(!0);
	const i$1 = (D$1, { name: C$1, sequence: n$1 }) => {
		const E = String(D$1);
		if ($$1([
			E,
			C$1,
			n$1
		], "cancel")) {
			F$1 && u$18.write(import_src$1.cursor.show), process.exit(0);
			return;
		}
		if (!t$1) return;
		const a$1 = C$1 === "return" ? 0 : -1, o$2 = C$1 === "return" ? -1 : 0;
		g.moveCursor(u$18, a$1, o$2, () => {
			g.clearLine(u$18, 1, () => {
				e$1.once("keypress", i$1);
			});
		});
	};
	return F$1 && u$18.write(import_src$1.cursor.hide), e$1.once("keypress", i$1), () => {
		e$1.off("keypress", i$1), F$1 && u$18.write(import_src$1.cursor.show), e$1.isTTY && !AD && e$1.setRawMode(!1), s.terminal = !1, s.close();
	};
}
var gD = Object.defineProperty, vD = (e$1, u$18, t$1) => u$18 in e$1 ? gD(e$1, u$18, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: t$1
}) : e$1[u$18] = t$1, h$1 = (e$1, u$18, t$1) => (vD(e$1, typeof u$18 != "symbol" ? u$18 + "" : u$18, t$1), t$1);
var x$1 = class {
	constructor(u$18, t$1 = !0) {
		h$1(this, "input"), h$1(this, "output"), h$1(this, "_abortSignal"), h$1(this, "rl"), h$1(this, "opts"), h$1(this, "_render"), h$1(this, "_track", !1), h$1(this, "_prevFrame", ""), h$1(this, "_subscribers", new Map()), h$1(this, "_cursor", 0), h$1(this, "state", "initial"), h$1(this, "error", ""), h$1(this, "value");
		const { input: F$1 = stdin, output: s = stdout, render: i$1, signal: D$1,...C$1 } = u$18;
		this.opts = C$1, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = i$1.bind(this), this._track = t$1, this._abortSignal = D$1, this.input = F$1, this.output = s;
	}
	unsubscribe() {
		this._subscribers.clear();
	}
	setSubscriber(u$18, t$1) {
		const F$1 = this._subscribers.get(u$18) ?? [];
		F$1.push(t$1), this._subscribers.set(u$18, F$1);
	}
	on(u$18, t$1) {
		this.setSubscriber(u$18, { cb: t$1 });
	}
	once(u$18, t$1) {
		this.setSubscriber(u$18, {
			cb: t$1,
			once: !0
		});
	}
	emit(u$18, ...t$1) {
		const F$1 = this._subscribers.get(u$18) ?? [], s = [];
		for (const i$1 of F$1) i$1.cb(...t$1), i$1.once && s.push(() => F$1.splice(F$1.indexOf(i$1), 1));
		for (const i$1 of s) i$1();
	}
	prompt() {
		return new Promise((u$18, t$1) => {
			if (this._abortSignal) {
				if (this._abortSignal.aborted) return this.state = "cancel", this.close(), u$18(S);
				this._abortSignal.addEventListener("abort", () => {
					this.state = "cancel", this.close();
				}, { once: !0 });
			}
			const F$1 = new Writable();
			F$1._write = (s, i$1, D$1) => {
				this._track && (this.value = this.rl?.line.replace(/\t/g, ""), this._cursor = this.rl?.cursor ?? 0, this.emit("value", this.value)), D$1();
			}, this.input.pipe(F$1), this.rl = O.createInterface({
				input: this.input,
				output: F$1,
				tabSize: 2,
				prompt: "",
				escapeCodeTimeout: 50,
				terminal: !0
			}), O.emitKeypressEvents(this.input, this.rl), this.rl.prompt(), this.opts.initialValue !== void 0 && this._track && this.rl.write(this.opts.initialValue), this.input.on("keypress", this.onKeypress), m(this.input, !0), this.output.on("resize", this.render), this.render(), this.once("submit", () => {
				this.output.write(import_src$1.cursor.show), this.output.off("resize", this.render), m(this.input, !1), u$18(this.value);
			}), this.once("cancel", () => {
				this.output.write(import_src$1.cursor.show), this.output.off("resize", this.render), m(this.input, !1), u$18(S);
			});
		});
	}
	onKeypress(u$18, t$1) {
		if (this.state === "error" && (this.state = "active"), t$1?.name && (!this._track && B.aliases.has(t$1.name) && this.emit("cursor", B.aliases.get(t$1.name)), B.actions.has(t$1.name) && this.emit("cursor", t$1.name)), u$18 && (u$18.toLowerCase() === "y" || u$18.toLowerCase() === "n") && this.emit("confirm", u$18.toLowerCase() === "y"), u$18 === "	" && this.opts.placeholder && (this.value || (this.rl?.write(this.opts.placeholder), this.emit("value", this.opts.placeholder))), u$18 && this.emit("key", u$18.toLowerCase()), t$1?.name === "return") {
			if (this.opts.validate) {
				const F$1 = this.opts.validate(this.value);
				F$1 && (this.error = F$1 instanceof Error ? F$1.message : F$1, this.state = "error", this.rl?.write(this.value));
			}
			this.state !== "error" && (this.state = "submit");
		}
		$$1([
			u$18,
			t$1?.name,
			t$1?.sequence
		], "cancel") && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
	}
	close() {
		this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), m(this.input, !1), this.rl?.close(), this.rl = void 0, this.emit(`${this.state}`, this.value), this.unsubscribe();
	}
	restoreCursor() {
		const u$18 = Y$1(this._prevFrame, process.stdout.columns, { hard: !0 }).split(`
`).length - 1;
		this.output.write(import_src$1.cursor.move(-999, u$18 * -1));
	}
	render() {
		const u$18 = Y$1(this._render(this) ?? "", process.stdout.columns, { hard: !0 });
		if (u$18 !== this._prevFrame) {
			if (this.state === "initial") this.output.write(import_src$1.cursor.hide);
			else {
				const t$1 = BD(this._prevFrame, u$18);
				if (this.restoreCursor(), t$1 && t$1?.length === 1) {
					const F$1 = t$1[0];
					this.output.write(import_src$1.cursor.move(0, F$1)), this.output.write(import_src$1.erase.lines(1));
					const s = u$18.split(`
`);
					this.output.write(s[F$1]), this._prevFrame = u$18, this.output.write(import_src$1.cursor.move(0, s.length - F$1 - 1));
					return;
				}
				if (t$1 && t$1?.length > 1) {
					const F$1 = t$1[0];
					this.output.write(import_src$1.cursor.move(0, F$1)), this.output.write(import_src$1.erase.down());
					const s = u$18.split(`
`).slice(F$1);
					this.output.write(s.join(`
`)), this._prevFrame = u$18;
					return;
				}
				this.output.write(import_src$1.erase.down());
			}
			this.output.write(u$18), this.state === "initial" && (this.state = "active"), this._prevFrame = u$18;
		}
	}
};
var dD = class extends x$1 {
	get cursor() {
		return this.value ? 0 : 1;
	}
	get _value() {
		return this.cursor === 0;
	}
	constructor(u$18) {
		super(u$18, !1), this.value = !!u$18.initialValue, this.on("value", () => {
			this.value = this._value;
		}), this.on("confirm", (t$1) => {
			this.output.write(import_src$1.cursor.move(0, -1)), this.value = t$1, this.state = "submit", this.close();
		}), this.on("cursor", () => {
			this.value = !this.value;
		});
	}
};
var mD = Object.defineProperty, bD = (e$1, u$18, t$1) => u$18 in e$1 ? mD(e$1, u$18, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: t$1
}) : e$1[u$18] = t$1, Z = (e$1, u$18, t$1) => (bD(e$1, typeof u$18 != "symbol" ? u$18 + "" : u$18, t$1), t$1), q$1 = (e$1, u$18, t$1) => {
	if (!u$18.has(e$1)) throw TypeError("Cannot " + t$1);
}, T$1 = (e$1, u$18, t$1) => (q$1(e$1, u$18, "read from private field"), t$1 ? t$1.call(e$1) : u$18.get(e$1)), wD = (e$1, u$18, t$1) => {
	if (u$18.has(e$1)) throw TypeError("Cannot add the same private member more than once");
	u$18 instanceof WeakSet ? u$18.add(e$1) : u$18.set(e$1, t$1);
}, yD = (e$1, u$18, t$1, F$1) => (q$1(e$1, u$18, "write to private field"), F$1 ? F$1.call(e$1, t$1) : u$18.set(e$1, t$1), t$1), A$1;
let _D = class extends x$1 {
	constructor(u$18) {
		super(u$18, !1), Z(this, "options"), Z(this, "cursor", 0), wD(this, A$1, void 0);
		const { options: t$1 } = u$18;
		yD(this, A$1, u$18.selectableGroups !== !1), this.options = Object.entries(t$1).flatMap(([F$1, s]) => [{
			value: F$1,
			group: !0,
			label: F$1
		}, ...s.map((i$1) => ({
			...i$1,
			group: F$1
		}))]), this.value = [...u$18.initialValues ?? []], this.cursor = Math.max(this.options.findIndex(({ value: F$1 }) => F$1 === u$18.cursorAt), T$1(this, A$1) ? 0 : 1), this.on("cursor", (F$1) => {
			switch (F$1) {
				case "left":
				case "up": {
					this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
					const s = this.options[this.cursor]?.group === !0;
					!T$1(this, A$1) && s && (this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1);
					break;
				}
				case "down":
				case "right": {
					this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
					const s = this.options[this.cursor]?.group === !0;
					!T$1(this, A$1) && s && (this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1);
					break;
				}
				case "space":
					this.toggleValue();
					break;
			}
		});
	}
	getGroupItems(u$18) {
		return this.options.filter((t$1) => t$1.group === u$18);
	}
	isGroupSelected(u$18) {
		return this.getGroupItems(u$18).every((t$1) => this.value.includes(t$1.value));
	}
	toggleValue() {
		const u$18 = this.options[this.cursor];
		if (u$18.group === !0) {
			const t$1 = u$18.value, F$1 = this.getGroupItems(t$1);
			this.isGroupSelected(t$1) ? this.value = this.value.filter((s) => F$1.findIndex((i$1) => i$1.value === s) === -1) : this.value = [...this.value, ...F$1.map((s) => s.value)], this.value = Array.from(new Set(this.value));
		} else {
			const t$1 = this.value.includes(u$18.value);
			this.value = t$1 ? this.value.filter((F$1) => F$1 !== u$18.value) : [...this.value, u$18.value];
		}
	}
};
A$1 = new WeakMap();
var kD = Object.defineProperty, $D = (e$1, u$18, t$1) => u$18 in e$1 ? kD(e$1, u$18, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: t$1
}) : e$1[u$18] = t$1, H = (e$1, u$18, t$1) => ($D(e$1, typeof u$18 != "symbol" ? u$18 + "" : u$18, t$1), t$1);
let SD = class extends x$1 {
	constructor(u$18) {
		super(u$18, !1), H(this, "options"), H(this, "cursor", 0), this.options = u$18.options, this.value = [...u$18.initialValues ?? []], this.cursor = Math.max(this.options.findIndex(({ value: t$1 }) => t$1 === u$18.cursorAt), 0), this.on("key", (t$1) => {
			t$1 === "a" && this.toggleAll();
		}), this.on("cursor", (t$1) => {
			switch (t$1) {
				case "left":
				case "up":
					this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
					break;
				case "down":
				case "right":
					this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
					break;
				case "space":
					this.toggleValue();
					break;
			}
		});
	}
	get _value() {
		return this.options[this.cursor].value;
	}
	toggleAll() {
		const u$18 = this.value.length === this.options.length;
		this.value = u$18 ? [] : this.options.map((t$1) => t$1.value);
	}
	toggleValue() {
		const u$18 = this.value.includes(this._value);
		this.value = u$18 ? this.value.filter((t$1) => t$1 !== this._value) : [...this.value, this._value];
	}
};
var TD = Object.defineProperty, jD = (e$1, u$18, t$1) => u$18 in e$1 ? TD(e$1, u$18, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: t$1
}) : e$1[u$18] = t$1, U$1 = (e$1, u$18, t$1) => (jD(e$1, typeof u$18 != "symbol" ? u$18 + "" : u$18, t$1), t$1);
var MD = class extends x$1 {
	constructor({ mask: u$18,...t$1 }) {
		super(t$1), U$1(this, "valueWithCursor", ""), U$1(this, "_mask", "•"), this._mask = u$18 ?? "•", this.on("finalize", () => {
			this.valueWithCursor = this.masked;
		}), this.on("value", () => {
			if (this.cursor >= this.value.length) this.valueWithCursor = `${this.masked}${import_picocolors$3.default.inverse(import_picocolors$3.default.hidden("_"))}`;
			else {
				const F$1 = this.masked.slice(0, this.cursor), s = this.masked.slice(this.cursor);
				this.valueWithCursor = `${F$1}${import_picocolors$3.default.inverse(s[0])}${s.slice(1)}`;
			}
		});
	}
	get cursor() {
		return this._cursor;
	}
	get masked() {
		return this.value.replaceAll(/./g, this._mask);
	}
};
var OD = Object.defineProperty, PD = (e$1, u$18, t$1) => u$18 in e$1 ? OD(e$1, u$18, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: t$1
}) : e$1[u$18] = t$1, J$1 = (e$1, u$18, t$1) => (PD(e$1, typeof u$18 != "symbol" ? u$18 + "" : u$18, t$1), t$1);
var LD = class extends x$1 {
	constructor(u$18) {
		super(u$18, !1), J$1(this, "options"), J$1(this, "cursor", 0), this.options = u$18.options, this.cursor = this.options.findIndex(({ value: t$1 }) => t$1 === u$18.initialValue), this.cursor === -1 && (this.cursor = 0), this.changeValue(), this.on("cursor", (t$1) => {
			switch (t$1) {
				case "left":
				case "up":
					this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
					break;
				case "down":
				case "right":
					this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
					break;
			}
			this.changeValue();
		});
	}
	get _value() {
		return this.options[this.cursor];
	}
	changeValue() {
		this.value = this._value.value;
	}
};
var WD = Object.defineProperty, ND = (e$1, u$18, t$1) => u$18 in e$1 ? WD(e$1, u$18, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: t$1
}) : e$1[u$18] = t$1, Q = (e$1, u$18, t$1) => (ND(e$1, typeof u$18 != "symbol" ? u$18 + "" : u$18, t$1), t$1);
var ID = class extends x$1 {
	constructor(u$18) {
		super(u$18, !1), Q(this, "options"), Q(this, "cursor", 0), this.options = u$18.options;
		const t$1 = this.options.map(({ value: [F$1] }) => F$1?.toLowerCase());
		this.cursor = Math.max(t$1.indexOf(u$18.initialValue), 0), this.on("key", (F$1) => {
			if (!t$1.includes(F$1)) return;
			const s = this.options.find(({ value: [i$1] }) => i$1?.toLowerCase() === F$1);
			s && (this.value = s.value, this.state = "submit", this.emit("submit"));
		});
	}
};
var RD = class extends x$1 {
	get valueWithCursor() {
		if (this.state === "submit") return this.value;
		if (this.cursor >= this.value.length) return `${this.value}\u2588`;
		const u$18 = this.value.slice(0, this.cursor), [t$1, ...F$1] = this.value.slice(this.cursor);
		return `${u$18}${import_picocolors$3.default.inverse(t$1)}${F$1.join("")}`;
	}
	get cursor() {
		return this._cursor;
	}
	constructor(u$18) {
		super(u$18), this.on("finalize", () => {
			this.value || (this.value = u$18.defaultValue);
		});
	}
};

//#endregion
//#region ../node_modules/@clack/prompts/dist/index.mjs
var import_picocolors$2 = __toESM$1(require_picocolors(), 1);
var import_src = __toESM$1(require_src(), 1);
function ce() {
	return y.platform !== "win32" ? y.env.TERM !== "linux" : !!y.env.CI || !!y.env.WT_SESSION || !!y.env.TERMINUS_SUBLIME || y.env.ConEmuTask === "{cmd::Cmder}" || y.env.TERM_PROGRAM === "Terminus-Sublime" || y.env.TERM_PROGRAM === "vscode" || y.env.TERM === "xterm-256color" || y.env.TERM === "alacritty" || y.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
const V = ce(), u$17 = (t$1, n$1) => V ? t$1 : n$1, le = u$17("◆", "*"), L = u$17("■", "x"), W = u$17("▲", "x"), C = u$17("◇", "o"), ue = u$17("┌", "T"), o$1 = u$17("│", "|"), d = u$17("└", "—"), k = u$17("●", ">"), P = u$17("○", " "), A = u$17("◻", "[•]"), T = u$17("◼", "[+]"), F = u$17("◻", "[ ]"), $e = u$17("▪", "•"), _ = u$17("─", "-"), me = u$17("╮", "+"), de = u$17("├", "+"), pe = u$17("╯", "+"), q = u$17("●", "•"), D = u$17("◆", "*"), U = u$17("▲", "!"), K = u$17("■", "x"), b = (t$1) => {
	switch (t$1) {
		case "initial":
		case "active": return import_picocolors$2.default.cyan(le);
		case "cancel": return import_picocolors$2.default.red(L);
		case "error": return import_picocolors$2.default.yellow(W);
		case "submit": return import_picocolors$2.default.green(C);
	}
}, G = (t$1) => {
	const { cursor: n$1, options: r$1, style: i$1 } = t$1, s = t$1.maxItems ?? Number.POSITIVE_INFINITY, c$1 = Math.max(process.stdout.rows - 4, 0), a$1 = Math.min(c$1, Math.max(s, 5));
	let l$1 = 0;
	n$1 >= l$1 + a$1 - 3 ? l$1 = Math.max(Math.min(n$1 - a$1 + 3, r$1.length - a$1), 0) : n$1 < l$1 + 2 && (l$1 = Math.max(n$1 - 2, 0));
	const $$2 = a$1 < r$1.length && l$1 > 0, g$1 = a$1 < r$1.length && l$1 + a$1 < r$1.length;
	return r$1.slice(l$1, l$1 + a$1).map((p$2, v$1, f) => {
		const j = v$1 === 0 && $$2, E = v$1 === f.length - 1 && g$1;
		return j || E ? import_picocolors$2.default.dim("...") : i$1(p$2, v$1 + l$1 === n$1);
	});
}, he = (t$1) => new RD({
	validate: t$1.validate,
	placeholder: t$1.placeholder,
	defaultValue: t$1.defaultValue,
	initialValue: t$1.initialValue,
	render() {
		const n$1 = `${import_picocolors$2.default.gray(o$1)}
${b(this.state)}  ${t$1.message}
`, r$1 = t$1.placeholder ? import_picocolors$2.default.inverse(t$1.placeholder[0]) + import_picocolors$2.default.dim(t$1.placeholder.slice(1)) : import_picocolors$2.default.inverse(import_picocolors$2.default.hidden("_")), i$1 = this.value ? this.valueWithCursor : r$1;
		switch (this.state) {
			case "error": return `${n$1.trim()}
${import_picocolors$2.default.yellow(o$1)}  ${i$1}
${import_picocolors$2.default.yellow(d)}  ${import_picocolors$2.default.yellow(this.error)}
`;
			case "submit": return `${n$1}${import_picocolors$2.default.gray(o$1)}  ${import_picocolors$2.default.dim(this.value || t$1.placeholder)}`;
			case "cancel": return `${n$1}${import_picocolors$2.default.gray(o$1)}  ${import_picocolors$2.default.strikethrough(import_picocolors$2.default.dim(this.value ?? ""))}${this.value?.trim() ? `
${import_picocolors$2.default.gray(o$1)}` : ""}`;
			default: return `${n$1}${import_picocolors$2.default.cyan(o$1)}  ${i$1}
${import_picocolors$2.default.cyan(d)}
`;
		}
	}
}).prompt(), ge = (t$1) => new MD({
	validate: t$1.validate,
	mask: t$1.mask ?? $e,
	render() {
		const n$1 = `${import_picocolors$2.default.gray(o$1)}
${b(this.state)}  ${t$1.message}
`, r$1 = this.valueWithCursor, i$1 = this.masked;
		switch (this.state) {
			case "error": return `${n$1.trim()}
${import_picocolors$2.default.yellow(o$1)}  ${i$1}
${import_picocolors$2.default.yellow(d)}  ${import_picocolors$2.default.yellow(this.error)}
`;
			case "submit": return `${n$1}${import_picocolors$2.default.gray(o$1)}  ${import_picocolors$2.default.dim(i$1)}`;
			case "cancel": return `${n$1}${import_picocolors$2.default.gray(o$1)}  ${import_picocolors$2.default.strikethrough(import_picocolors$2.default.dim(i$1 ?? ""))}${i$1 ? `
${import_picocolors$2.default.gray(o$1)}` : ""}`;
			default: return `${n$1}${import_picocolors$2.default.cyan(o$1)}  ${r$1}
${import_picocolors$2.default.cyan(d)}
`;
		}
	}
}).prompt(), ye = (t$1) => {
	const n$1 = t$1.active ?? "Yes", r$1 = t$1.inactive ?? "No";
	return new dD({
		active: n$1,
		inactive: r$1,
		initialValue: t$1.initialValue ?? !0,
		render() {
			const i$1 = `${import_picocolors$2.default.gray(o$1)}
${b(this.state)}  ${t$1.message}
`, s = this.value ? n$1 : r$1;
			switch (this.state) {
				case "submit": return `${i$1}${import_picocolors$2.default.gray(o$1)}  ${import_picocolors$2.default.dim(s)}`;
				case "cancel": return `${i$1}${import_picocolors$2.default.gray(o$1)}  ${import_picocolors$2.default.strikethrough(import_picocolors$2.default.dim(s))}
${import_picocolors$2.default.gray(o$1)}`;
				default: return `${i$1}${import_picocolors$2.default.cyan(o$1)}  ${this.value ? `${import_picocolors$2.default.green(k)} ${n$1}` : `${import_picocolors$2.default.dim(P)} ${import_picocolors$2.default.dim(n$1)}`} ${import_picocolors$2.default.dim("/")} ${this.value ? `${import_picocolors$2.default.dim(P)} ${import_picocolors$2.default.dim(r$1)}` : `${import_picocolors$2.default.green(k)} ${r$1}`}
${import_picocolors$2.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, ve = (t$1) => {
	const n$1 = (r$1, i$1) => {
		const s = r$1.label ?? String(r$1.value);
		switch (i$1) {
			case "selected": return `${import_picocolors$2.default.dim(s)}`;
			case "active": return `${import_picocolors$2.default.green(k)} ${s} ${r$1.hint ? import_picocolors$2.default.dim(`(${r$1.hint})`) : ""}`;
			case "cancelled": return `${import_picocolors$2.default.strikethrough(import_picocolors$2.default.dim(s))}`;
			default: return `${import_picocolors$2.default.dim(P)} ${import_picocolors$2.default.dim(s)}`;
		}
	};
	return new LD({
		options: t$1.options,
		initialValue: t$1.initialValue,
		render() {
			const r$1 = `${import_picocolors$2.default.gray(o$1)}
${b(this.state)}  ${t$1.message}
`;
			switch (this.state) {
				case "submit": return `${r$1}${import_picocolors$2.default.gray(o$1)}  ${n$1(this.options[this.cursor], "selected")}`;
				case "cancel": return `${r$1}${import_picocolors$2.default.gray(o$1)}  ${n$1(this.options[this.cursor], "cancelled")}
${import_picocolors$2.default.gray(o$1)}`;
				default: return `${r$1}${import_picocolors$2.default.cyan(o$1)}  ${G({
					cursor: this.cursor,
					options: this.options,
					maxItems: t$1.maxItems,
					style: (i$1, s) => n$1(i$1, s ? "active" : "inactive")
				}).join(`
${import_picocolors$2.default.cyan(o$1)}  `)}
${import_picocolors$2.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, we = (t$1) => {
	const n$1 = (r$1, i$1 = "inactive") => {
		const s = r$1.label ?? String(r$1.value);
		return i$1 === "selected" ? `${import_picocolors$2.default.dim(s)}` : i$1 === "cancelled" ? `${import_picocolors$2.default.strikethrough(import_picocolors$2.default.dim(s))}` : i$1 === "active" ? `${import_picocolors$2.default.bgCyan(import_picocolors$2.default.gray(` ${r$1.value} `))} ${s} ${r$1.hint ? import_picocolors$2.default.dim(`(${r$1.hint})`) : ""}` : `${import_picocolors$2.default.gray(import_picocolors$2.default.bgWhite(import_picocolors$2.default.inverse(` ${r$1.value} `)))} ${s} ${r$1.hint ? import_picocolors$2.default.dim(`(${r$1.hint})`) : ""}`;
	};
	return new ID({
		options: t$1.options,
		initialValue: t$1.initialValue,
		render() {
			const r$1 = `${import_picocolors$2.default.gray(o$1)}
${b(this.state)}  ${t$1.message}
`;
			switch (this.state) {
				case "submit": return `${r$1}${import_picocolors$2.default.gray(o$1)}  ${n$1(this.options.find((i$1) => i$1.value === this.value) ?? t$1.options[0], "selected")}`;
				case "cancel": return `${r$1}${import_picocolors$2.default.gray(o$1)}  ${n$1(this.options[0], "cancelled")}
${import_picocolors$2.default.gray(o$1)}`;
				default: return `${r$1}${import_picocolors$2.default.cyan(o$1)}  ${this.options.map((i$1, s) => n$1(i$1, s === this.cursor ? "active" : "inactive")).join(`
${import_picocolors$2.default.cyan(o$1)}  `)}
${import_picocolors$2.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, fe = (t$1) => {
	const n$1 = (r$1, i$1) => {
		const s = r$1.label ?? String(r$1.value);
		return i$1 === "active" ? `${import_picocolors$2.default.cyan(A)} ${s} ${r$1.hint ? import_picocolors$2.default.dim(`(${r$1.hint})`) : ""}` : i$1 === "selected" ? `${import_picocolors$2.default.green(T)} ${import_picocolors$2.default.dim(s)} ${r$1.hint ? import_picocolors$2.default.dim(`(${r$1.hint})`) : ""}` : i$1 === "cancelled" ? `${import_picocolors$2.default.strikethrough(import_picocolors$2.default.dim(s))}` : i$1 === "active-selected" ? `${import_picocolors$2.default.green(T)} ${s} ${r$1.hint ? import_picocolors$2.default.dim(`(${r$1.hint})`) : ""}` : i$1 === "submitted" ? `${import_picocolors$2.default.dim(s)}` : `${import_picocolors$2.default.dim(F)} ${import_picocolors$2.default.dim(s)}`;
	};
	return new SD({
		options: t$1.options,
		initialValues: t$1.initialValues,
		required: t$1.required ?? !0,
		cursorAt: t$1.cursorAt,
		validate(r$1) {
			if (this.required && r$1.length === 0) return `Please select at least one option.
${import_picocolors$2.default.reset(import_picocolors$2.default.dim(`Press ${import_picocolors$2.default.gray(import_picocolors$2.default.bgWhite(import_picocolors$2.default.inverse(" space ")))} to select, ${import_picocolors$2.default.gray(import_picocolors$2.default.bgWhite(import_picocolors$2.default.inverse(" enter ")))} to submit`))}`;
		},
		render() {
			const r$1 = `${import_picocolors$2.default.gray(o$1)}
${b(this.state)}  ${t$1.message}
`, i$1 = (s, c$1) => {
				const a$1 = this.value.includes(s.value);
				return c$1 && a$1 ? n$1(s, "active-selected") : a$1 ? n$1(s, "selected") : n$1(s, c$1 ? "active" : "inactive");
			};
			switch (this.state) {
				case "submit": return `${r$1}${import_picocolors$2.default.gray(o$1)}  ${this.options.filter(({ value: s }) => this.value.includes(s)).map((s) => n$1(s, "submitted")).join(import_picocolors$2.default.dim(", ")) || import_picocolors$2.default.dim("none")}`;
				case "cancel": {
					const s = this.options.filter(({ value: c$1 }) => this.value.includes(c$1)).map((c$1) => n$1(c$1, "cancelled")).join(import_picocolors$2.default.dim(", "));
					return `${r$1}${import_picocolors$2.default.gray(o$1)}  ${s.trim() ? `${s}
${import_picocolors$2.default.gray(o$1)}` : ""}`;
				}
				case "error": {
					const s = this.error.split(`
`).map((c$1, a$1) => a$1 === 0 ? `${import_picocolors$2.default.yellow(d)}  ${import_picocolors$2.default.yellow(c$1)}` : `   ${c$1}`).join(`
`);
					return `${r$1 + import_picocolors$2.default.yellow(o$1)}  ${G({
						options: this.options,
						cursor: this.cursor,
						maxItems: t$1.maxItems,
						style: i$1
					}).join(`
${import_picocolors$2.default.yellow(o$1)}  `)}
${s}
`;
				}
				default: return `${r$1}${import_picocolors$2.default.cyan(o$1)}  ${G({
					options: this.options,
					cursor: this.cursor,
					maxItems: t$1.maxItems,
					style: i$1
				}).join(`
${import_picocolors$2.default.cyan(o$1)}  `)}
${import_picocolors$2.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, be = (t$1) => {
	const { selectableGroups: n$1 = !0 } = t$1, r$1 = (i$1, s, c$1 = []) => {
		const a$1 = i$1.label ?? String(i$1.value), l$1 = typeof i$1.group == "string", $$2 = l$1 && (c$1[c$1.indexOf(i$1) + 1] ?? { group: !0 }), g$1 = l$1 && $$2.group === !0, p$2 = l$1 ? n$1 ? `${g$1 ? d : o$1} ` : "  " : "";
		if (s === "active") return `${import_picocolors$2.default.dim(p$2)}${import_picocolors$2.default.cyan(A)} ${a$1} ${i$1.hint ? import_picocolors$2.default.dim(`(${i$1.hint})`) : ""}`;
		if (s === "group-active") return `${p$2}${import_picocolors$2.default.cyan(A)} ${import_picocolors$2.default.dim(a$1)}`;
		if (s === "group-active-selected") return `${p$2}${import_picocolors$2.default.green(T)} ${import_picocolors$2.default.dim(a$1)}`;
		if (s === "selected") {
			const f = l$1 || n$1 ? import_picocolors$2.default.green(T) : "";
			return `${import_picocolors$2.default.dim(p$2)}${f} ${import_picocolors$2.default.dim(a$1)} ${i$1.hint ? import_picocolors$2.default.dim(`(${i$1.hint})`) : ""}`;
		}
		if (s === "cancelled") return `${import_picocolors$2.default.strikethrough(import_picocolors$2.default.dim(a$1))}`;
		if (s === "active-selected") return `${import_picocolors$2.default.dim(p$2)}${import_picocolors$2.default.green(T)} ${a$1} ${i$1.hint ? import_picocolors$2.default.dim(`(${i$1.hint})`) : ""}`;
		if (s === "submitted") return `${import_picocolors$2.default.dim(a$1)}`;
		const v$1 = l$1 || n$1 ? import_picocolors$2.default.dim(F) : "";
		return `${import_picocolors$2.default.dim(p$2)}${v$1} ${import_picocolors$2.default.dim(a$1)}`;
	};
	return new _D({
		options: t$1.options,
		initialValues: t$1.initialValues,
		required: t$1.required ?? !0,
		cursorAt: t$1.cursorAt,
		selectableGroups: n$1,
		validate(i$1) {
			if (this.required && i$1.length === 0) return `Please select at least one option.
${import_picocolors$2.default.reset(import_picocolors$2.default.dim(`Press ${import_picocolors$2.default.gray(import_picocolors$2.default.bgWhite(import_picocolors$2.default.inverse(" space ")))} to select, ${import_picocolors$2.default.gray(import_picocolors$2.default.bgWhite(import_picocolors$2.default.inverse(" enter ")))} to submit`))}`;
		},
		render() {
			const i$1 = `${import_picocolors$2.default.gray(o$1)}
${b(this.state)}  ${t$1.message}
`;
			switch (this.state) {
				case "submit": return `${i$1}${import_picocolors$2.default.gray(o$1)}  ${this.options.filter(({ value: s }) => this.value.includes(s)).map((s) => r$1(s, "submitted")).join(import_picocolors$2.default.dim(", "))}`;
				case "cancel": {
					const s = this.options.filter(({ value: c$1 }) => this.value.includes(c$1)).map((c$1) => r$1(c$1, "cancelled")).join(import_picocolors$2.default.dim(", "));
					return `${i$1}${import_picocolors$2.default.gray(o$1)}  ${s.trim() ? `${s}
${import_picocolors$2.default.gray(o$1)}` : ""}`;
				}
				case "error": {
					const s = this.error.split(`
`).map((c$1, a$1) => a$1 === 0 ? `${import_picocolors$2.default.yellow(d)}  ${import_picocolors$2.default.yellow(c$1)}` : `   ${c$1}`).join(`
`);
					return `${i$1}${import_picocolors$2.default.yellow(o$1)}  ${this.options.map((c$1, a$1, l$1) => {
						const $$2 = this.value.includes(c$1.value) || c$1.group === !0 && this.isGroupSelected(`${c$1.value}`), g$1 = a$1 === this.cursor;
						return !g$1 && typeof c$1.group == "string" && this.options[this.cursor].value === c$1.group ? r$1(c$1, $$2 ? "group-active-selected" : "group-active", l$1) : g$1 && $$2 ? r$1(c$1, "active-selected", l$1) : $$2 ? r$1(c$1, "selected", l$1) : r$1(c$1, g$1 ? "active" : "inactive", l$1);
					}).join(`
${import_picocolors$2.default.yellow(o$1)}  `)}
${s}
`;
				}
				default: return `${i$1}${import_picocolors$2.default.cyan(o$1)}  ${this.options.map((s, c$1, a$1) => {
					const l$1 = this.value.includes(s.value) || s.group === !0 && this.isGroupSelected(`${s.value}`), $$2 = c$1 === this.cursor;
					return !$$2 && typeof s.group == "string" && this.options[this.cursor].value === s.group ? r$1(s, l$1 ? "group-active-selected" : "group-active", a$1) : $$2 && l$1 ? r$1(s, "active-selected", a$1) : l$1 ? r$1(s, "selected", a$1) : r$1(s, $$2 ? "active" : "inactive", a$1);
				}).join(`
${import_picocolors$2.default.cyan(o$1)}  `)}
${import_picocolors$2.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, Me = (t$1 = "", n$1 = "") => {
	const r$1 = `
${t$1}
`.split(`
`), i$1 = stripVTControlCharacters(n$1).length, s = Math.max(r$1.reduce((a$1, l$1) => {
		const $$2 = stripVTControlCharacters(l$1);
		return $$2.length > a$1 ? $$2.length : a$1;
	}, 0), i$1) + 2, c$1 = r$1.map((a$1) => `${import_picocolors$2.default.gray(o$1)}  ${import_picocolors$2.default.dim(a$1)}${" ".repeat(s - stripVTControlCharacters(a$1).length)}${import_picocolors$2.default.gray(o$1)}`).join(`
`);
	process.stdout.write(`${import_picocolors$2.default.gray(o$1)}
${import_picocolors$2.default.green(C)}  ${import_picocolors$2.default.reset(n$1)} ${import_picocolors$2.default.gray(_.repeat(Math.max(s - i$1 - 1, 1)) + me)}
${c$1}
${import_picocolors$2.default.gray(de + _.repeat(s + 2) + pe)}
`);
}, xe = (t$1 = "") => {
	process.stdout.write(`${import_picocolors$2.default.gray(d)}  ${import_picocolors$2.default.red(t$1)}

`);
}, Ie = (t$1 = "") => {
	process.stdout.write(`${import_picocolors$2.default.gray(ue)}  ${t$1}
`);
}, Se = (t$1 = "") => {
	process.stdout.write(`${import_picocolors$2.default.gray(o$1)}
${import_picocolors$2.default.gray(d)}  ${t$1}

`);
}, M = {
	message: (t$1 = "", { symbol: n$1 = import_picocolors$2.default.gray(o$1) } = {}) => {
		const r$1 = [`${import_picocolors$2.default.gray(o$1)}`];
		if (t$1) {
			const [i$1, ...s] = t$1.split(`
`);
			r$1.push(`${n$1}  ${i$1}`, ...s.map((c$1) => `${import_picocolors$2.default.gray(o$1)}  ${c$1}`));
		}
		process.stdout.write(`${r$1.join(`
`)}
`);
	},
	info: (t$1) => {
		M.message(t$1, { symbol: import_picocolors$2.default.blue(q) });
	},
	success: (t$1) => {
		M.message(t$1, { symbol: import_picocolors$2.default.green(D) });
	},
	step: (t$1) => {
		M.message(t$1, { symbol: import_picocolors$2.default.green(C) });
	},
	warn: (t$1) => {
		M.message(t$1, { symbol: import_picocolors$2.default.yellow(U) });
	},
	warning: (t$1) => {
		M.warn(t$1);
	},
	error: (t$1) => {
		M.message(t$1, { symbol: import_picocolors$2.default.red(K) });
	}
}, J = `${import_picocolors$2.default.gray(o$1)}  `, x = {
	message: async (t$1, { symbol: n$1 = import_picocolors$2.default.gray(o$1) } = {}) => {
		process.stdout.write(`${import_picocolors$2.default.gray(o$1)}
${n$1}  `);
		let r$1 = 3;
		for await (let i$1 of t$1) {
			i$1 = i$1.replace(/\n/g, `
${J}`), i$1.includes(`
`) && (r$1 = 3 + stripVTControlCharacters(i$1.slice(i$1.lastIndexOf(`
`))).length);
			const s = stripVTControlCharacters(i$1).length;
			r$1 + s < process.stdout.columns ? (r$1 += s, process.stdout.write(i$1)) : (process.stdout.write(`
${J}${i$1.trimStart()}`), r$1 = 3 + stripVTControlCharacters(i$1.trimStart()).length);
		}
		process.stdout.write(`
`);
	},
	info: (t$1) => x.message(t$1, { symbol: import_picocolors$2.default.blue(q) }),
	success: (t$1) => x.message(t$1, { symbol: import_picocolors$2.default.green(D) }),
	step: (t$1) => x.message(t$1, { symbol: import_picocolors$2.default.green(C) }),
	warn: (t$1) => x.message(t$1, { symbol: import_picocolors$2.default.yellow(U) }),
	warning: (t$1) => x.warn(t$1),
	error: (t$1) => x.message(t$1, { symbol: import_picocolors$2.default.red(K) })
}, Y = ({ indicator: t$1 = "dots" } = {}) => {
	const n$1 = V ? [
		"◒",
		"◐",
		"◓",
		"◑"
	] : [
		"•",
		"o",
		"O",
		"0"
	], r$1 = V ? 80 : 120, i$1 = process.env.CI === "true";
	let s, c$1, a$1 = !1, l$1 = "", $$2, g$1 = performance.now();
	const p$2 = (m$1) => {
		const h$2 = m$1 > 1 ? "Something went wrong" : "Canceled";
		a$1 && N$1(h$2, m$1);
	}, v$1 = () => p$2(2), f = () => p$2(1), j = () => {
		process.on("uncaughtExceptionMonitor", v$1), process.on("unhandledRejection", v$1), process.on("SIGINT", f), process.on("SIGTERM", f), process.on("exit", p$2);
	}, E = () => {
		process.removeListener("uncaughtExceptionMonitor", v$1), process.removeListener("unhandledRejection", v$1), process.removeListener("SIGINT", f), process.removeListener("SIGTERM", f), process.removeListener("exit", p$2);
	}, B$1 = () => {
		if ($$2 === void 0) return;
		i$1 && process.stdout.write(`
`);
		const m$1 = $$2.split(`
`);
		process.stdout.write(import_src.cursor.move(-999, m$1.length - 1)), process.stdout.write(import_src.erase.down(m$1.length));
	}, R$1 = (m$1) => m$1.replace(/\.+$/, ""), O$1 = (m$1) => {
		const h$2 = (performance.now() - m$1) / 1e3, w$1 = Math.floor(h$2 / 60), I$1 = Math.floor(h$2 % 60);
		return w$1 > 0 ? `[${w$1}m ${I$1}s]` : `[${I$1}s]`;
	}, H$1 = (m$1 = "") => {
		a$1 = !0, s = fD(), l$1 = R$1(m$1), g$1 = performance.now(), process.stdout.write(`${import_picocolors$2.default.gray(o$1)}
`);
		let h$2 = 0, w$1 = 0;
		j(), c$1 = setInterval(() => {
			if (i$1 && l$1 === $$2) return;
			B$1(), $$2 = l$1;
			const I$1 = import_picocolors$2.default.magenta(n$1[h$2]);
			if (i$1) process.stdout.write(`${I$1}  ${l$1}...`);
			else if (t$1 === "timer") process.stdout.write(`${I$1}  ${l$1} ${O$1(g$1)}`);
			else {
				const z$3 = ".".repeat(Math.floor(w$1)).slice(0, 3);
				process.stdout.write(`${I$1}  ${l$1}${z$3}`);
			}
			h$2 = h$2 + 1 < n$1.length ? h$2 + 1 : 0, w$1 = w$1 < n$1.length ? w$1 + .125 : 0;
		}, r$1);
	}, N$1 = (m$1 = "", h$2 = 0) => {
		a$1 = !1, clearInterval(c$1), B$1();
		const w$1 = h$2 === 0 ? import_picocolors$2.default.green(C) : h$2 === 1 ? import_picocolors$2.default.red(L) : import_picocolors$2.default.red(W);
		l$1 = R$1(m$1 ?? l$1), t$1 === "timer" ? process.stdout.write(`${w$1}  ${l$1} ${O$1(g$1)}
`) : process.stdout.write(`${w$1}  ${l$1}
`), E(), s();
	};
	return {
		start: H$1,
		stop: N$1,
		message: (m$1 = "") => {
			l$1 = R$1(m$1 ?? l$1);
		}
	};
}, Ce = async (t$1, n$1) => {
	const r$1 = {}, i$1 = Object.keys(t$1);
	for (const s of i$1) {
		const c$1 = t$1[s], a$1 = await c$1({ results: r$1 })?.catch((l$1) => {
			throw l$1;
		});
		if (typeof n$1?.onCancel == "function" && pD(a$1)) {
			r$1[s] = "canceled", n$1.onCancel({ results: r$1 });
			continue;
		}
		r$1[s] = a$1;
	}
	return r$1;
}, Te = async (t$1) => {
	for (const n$1 of t$1) {
		if (n$1.enabled === !1) continue;
		const r$1 = Y();
		r$1.start(n$1.title);
		const i$1 = await n$1.task(r$1.message);
		r$1.stop(i$1 || n$1.title);
	}
};

//#endregion
//#region ../node_modules/universalify/index.js
var require_universalify = __commonJS$1({ "../node_modules/universalify/index.js"(exports) {
	exports.fromCallback = function(fn) {
		return Object.defineProperty(function(...args) {
			if (typeof args[args.length - 1] === "function") fn.apply(this, args);
			else return new Promise((resolve$1, reject) => {
				args.push((err, res) => err != null ? reject(err) : resolve$1(res));
				fn.apply(this, args);
			});
		}, "name", { value: fn.name });
	};
	exports.fromPromise = function(fn) {
		return Object.defineProperty(function(...args) {
			const cb = args[args.length - 1];
			if (typeof cb !== "function") return fn.apply(this, args);
			else {
				args.pop();
				fn.apply(this, args).then((r$1) => cb(null, r$1), cb);
			}
		}, "name", { value: fn.name });
	};
} });

//#endregion
//#region ../node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS$1({ "../node_modules/graceful-fs/polyfills.js"(exports, module) {
	var constants$3 = __require("constants");
	var origCwd = process.cwd;
	var cwd = null;
	var platform$1 = process.env.GRACEFUL_FS_PLATFORM || process.platform;
	process.cwd = function() {
		if (!cwd) cwd = origCwd.call(process);
		return cwd;
	};
	try {
		process.cwd();
	} catch (er) {}
	if (typeof process.chdir === "function") {
		var chdir = process.chdir;
		process.chdir = function(d$2) {
			cwd = null;
			chdir.call(process, d$2);
		};
		if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
	}
	module.exports = patch$1;
	function patch$1(fs$33) {
		if (constants$3.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) patchLchmod(fs$33);
		if (!fs$33.lutimes) patchLutimes(fs$33);
		fs$33.chown = chownFix(fs$33.chown);
		fs$33.fchown = chownFix(fs$33.fchown);
		fs$33.lchown = chownFix(fs$33.lchown);
		fs$33.chmod = chmodFix(fs$33.chmod);
		fs$33.fchmod = chmodFix(fs$33.fchmod);
		fs$33.lchmod = chmodFix(fs$33.lchmod);
		fs$33.chownSync = chownFixSync(fs$33.chownSync);
		fs$33.fchownSync = chownFixSync(fs$33.fchownSync);
		fs$33.lchownSync = chownFixSync(fs$33.lchownSync);
		fs$33.chmodSync = chmodFixSync(fs$33.chmodSync);
		fs$33.fchmodSync = chmodFixSync(fs$33.fchmodSync);
		fs$33.lchmodSync = chmodFixSync(fs$33.lchmodSync);
		fs$33.stat = statFix(fs$33.stat);
		fs$33.fstat = statFix(fs$33.fstat);
		fs$33.lstat = statFix(fs$33.lstat);
		fs$33.statSync = statFixSync(fs$33.statSync);
		fs$33.fstatSync = statFixSync(fs$33.fstatSync);
		fs$33.lstatSync = statFixSync(fs$33.lstatSync);
		if (fs$33.chmod && !fs$33.lchmod) {
			fs$33.lchmod = function(path$28, mode, cb) {
				if (cb) process.nextTick(cb);
			};
			fs$33.lchmodSync = function() {};
		}
		if (fs$33.chown && !fs$33.lchown) {
			fs$33.lchown = function(path$28, uid, gid, cb) {
				if (cb) process.nextTick(cb);
			};
			fs$33.lchownSync = function() {};
		}
		if (platform$1 === "win32") fs$33.rename = typeof fs$33.rename !== "function" ? fs$33.rename : function(fs$rename) {
			function rename$1(from, to, cb) {
				var start = Date.now();
				var backoff = 0;
				fs$rename(from, to, function CB(er) {
					if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
						setTimeout(function() {
							fs$33.stat(to, function(stater, st) {
								if (stater && stater.code === "ENOENT") fs$rename(from, to, CB);
								else cb(er);
							});
						}, backoff);
						if (backoff < 100) backoff += 10;
						return;
					}
					if (cb) cb(er);
				});
			}
			if (Object.setPrototypeOf) Object.setPrototypeOf(rename$1, fs$rename);
			return rename$1;
		}(fs$33.rename);
		fs$33.read = typeof fs$33.read !== "function" ? fs$33.read : function(fs$read) {
			function read$4(fd, buffer, offset, length, position, callback_) {
				var callback;
				if (callback_ && typeof callback_ === "function") {
					var eagCounter = 0;
					callback = function(er, _$2, __) {
						if (er && er.code === "EAGAIN" && eagCounter < 10) {
							eagCounter++;
							return fs$read.call(fs$33, fd, buffer, offset, length, position, callback);
						}
						callback_.apply(this, arguments);
					};
				}
				return fs$read.call(fs$33, fd, buffer, offset, length, position, callback);
			}
			if (Object.setPrototypeOf) Object.setPrototypeOf(read$4, fs$read);
			return read$4;
		}(fs$33.read);
		fs$33.readSync = typeof fs$33.readSync !== "function" ? fs$33.readSync : function(fs$readSync) {
			return function(fd, buffer, offset, length, position) {
				var eagCounter = 0;
				while (true) try {
					return fs$readSync.call(fs$33, fd, buffer, offset, length, position);
				} catch (er) {
					if (er.code === "EAGAIN" && eagCounter < 10) {
						eagCounter++;
						continue;
					}
					throw er;
				}
			};
		}(fs$33.readSync);
		function patchLchmod(fs$34) {
			fs$34.lchmod = function(path$28, mode, callback) {
				fs$34.open(path$28, constants$3.O_WRONLY | constants$3.O_SYMLINK, mode, function(err, fd) {
					if (err) {
						if (callback) callback(err);
						return;
					}
					fs$34.fchmod(fd, mode, function(err$1) {
						fs$34.close(fd, function(err2) {
							if (callback) callback(err$1 || err2);
						});
					});
				});
			};
			fs$34.lchmodSync = function(path$28, mode) {
				var fd = fs$34.openSync(path$28, constants$3.O_WRONLY | constants$3.O_SYMLINK, mode);
				var threw = true;
				var ret;
				try {
					ret = fs$34.fchmodSync(fd, mode);
					threw = false;
				} finally {
					if (threw) try {
						fs$34.closeSync(fd);
					} catch (er) {}
					else fs$34.closeSync(fd);
				}
				return ret;
			};
		}
		function patchLutimes(fs$34) {
			if (constants$3.hasOwnProperty("O_SYMLINK") && fs$34.futimes) {
				fs$34.lutimes = function(path$28, at, mt, cb) {
					fs$34.open(path$28, constants$3.O_SYMLINK, function(er, fd) {
						if (er) {
							if (cb) cb(er);
							return;
						}
						fs$34.futimes(fd, at, mt, function(er$1) {
							fs$34.close(fd, function(er2) {
								if (cb) cb(er$1 || er2);
							});
						});
					});
				};
				fs$34.lutimesSync = function(path$28, at, mt) {
					var fd = fs$34.openSync(path$28, constants$3.O_SYMLINK);
					var ret;
					var threw = true;
					try {
						ret = fs$34.futimesSync(fd, at, mt);
						threw = false;
					} finally {
						if (threw) try {
							fs$34.closeSync(fd);
						} catch (er) {}
						else fs$34.closeSync(fd);
					}
					return ret;
				};
			} else if (fs$34.futimes) {
				fs$34.lutimes = function(_a, _b, _c, cb) {
					if (cb) process.nextTick(cb);
				};
				fs$34.lutimesSync = function() {};
			}
		}
		function chmodFix(orig) {
			if (!orig) return orig;
			return function(target, mode, cb) {
				return orig.call(fs$33, target, mode, function(er) {
					if (chownErOk(er)) er = null;
					if (cb) cb.apply(this, arguments);
				});
			};
		}
		function chmodFixSync(orig) {
			if (!orig) return orig;
			return function(target, mode) {
				try {
					return orig.call(fs$33, target, mode);
				} catch (er) {
					if (!chownErOk(er)) throw er;
				}
			};
		}
		function chownFix(orig) {
			if (!orig) return orig;
			return function(target, uid, gid, cb) {
				return orig.call(fs$33, target, uid, gid, function(er) {
					if (chownErOk(er)) er = null;
					if (cb) cb.apply(this, arguments);
				});
			};
		}
		function chownFixSync(orig) {
			if (!orig) return orig;
			return function(target, uid, gid) {
				try {
					return orig.call(fs$33, target, uid, gid);
				} catch (er) {
					if (!chownErOk(er)) throw er;
				}
			};
		}
		function statFix(orig) {
			if (!orig) return orig;
			return function(target, options, cb) {
				if (typeof options === "function") {
					cb = options;
					options = null;
				}
				function callback(er, stats) {
					if (stats) {
						if (stats.uid < 0) stats.uid += 4294967296;
						if (stats.gid < 0) stats.gid += 4294967296;
					}
					if (cb) cb.apply(this, arguments);
				}
				return options ? orig.call(fs$33, target, options, callback) : orig.call(fs$33, target, callback);
			};
		}
		function statFixSync(orig) {
			if (!orig) return orig;
			return function(target, options) {
				var stats = options ? orig.call(fs$33, target, options) : orig.call(fs$33, target);
				if (stats) {
					if (stats.uid < 0) stats.uid += 4294967296;
					if (stats.gid < 0) stats.gid += 4294967296;
				}
				return stats;
			};
		}
		function chownErOk(er) {
			if (!er) return true;
			if (er.code === "ENOSYS") return true;
			var nonroot = !process.getuid || process.getuid() !== 0;
			if (nonroot) {
				if (er.code === "EINVAL" || er.code === "EPERM") return true;
			}
			return false;
		}
	}
} });

//#endregion
//#region ../node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS$1({ "../node_modules/graceful-fs/legacy-streams.js"(exports, module) {
	var Stream$1 = __require("stream").Stream;
	module.exports = legacy$1;
	function legacy$1(fs$33) {
		return {
			ReadStream,
			WriteStream
		};
		function ReadStream(path$28, options) {
			if (!(this instanceof ReadStream)) return new ReadStream(path$28, options);
			Stream$1.call(this);
			var self = this;
			this.path = path$28;
			this.fd = null;
			this.readable = true;
			this.paused = false;
			this.flags = "r";
			this.mode = 438;
			this.bufferSize = 64 * 1024;
			options = options || {};
			var keys = Object.keys(options);
			for (var index = 0, length = keys.length; index < length; index++) {
				var key = keys[index];
				this[key] = options[key];
			}
			if (this.encoding) this.setEncoding(this.encoding);
			if (this.start !== void 0) {
				if ("number" !== typeof this.start) throw TypeError("start must be a Number");
				if (this.end === void 0) this.end = Infinity;
				else if ("number" !== typeof this.end) throw TypeError("end must be a Number");
				if (this.start > this.end) throw new Error("start must be <= end");
				this.pos = this.start;
			}
			if (this.fd !== null) {
				process.nextTick(function() {
					self._read();
				});
				return;
			}
			fs$33.open(this.path, this.flags, this.mode, function(err, fd) {
				if (err) {
					self.emit("error", err);
					self.readable = false;
					return;
				}
				self.fd = fd;
				self.emit("open", fd);
				self._read();
			});
		}
		function WriteStream(path$28, options) {
			if (!(this instanceof WriteStream)) return new WriteStream(path$28, options);
			Stream$1.call(this);
			this.path = path$28;
			this.fd = null;
			this.writable = true;
			this.flags = "w";
			this.encoding = "binary";
			this.mode = 438;
			this.bytesWritten = 0;
			options = options || {};
			var keys = Object.keys(options);
			for (var index = 0, length = keys.length; index < length; index++) {
				var key = keys[index];
				this[key] = options[key];
			}
			if (this.start !== void 0) {
				if ("number" !== typeof this.start) throw TypeError("start must be a Number");
				if (this.start < 0) throw new Error("start must be >= zero");
				this.pos = this.start;
			}
			this.busy = false;
			this._queue = [];
			if (this.fd === null) {
				this._open = fs$33.open;
				this._queue.push([
					this._open,
					this.path,
					this.flags,
					this.mode,
					void 0
				]);
				this.flush();
			}
		}
	}
} });

//#endregion
//#region ../node_modules/graceful-fs/clone.js
var require_clone = __commonJS$1({ "../node_modules/graceful-fs/clone.js"(exports, module) {
	module.exports = clone$1;
	var getPrototypeOf = Object.getPrototypeOf || function(obj) {
		return obj.__proto__;
	};
	function clone$1(obj) {
		if (obj === null || typeof obj !== "object") return obj;
		if (obj instanceof Object) var copy$2 = { __proto__: getPrototypeOf(obj) };
		else var copy$2 = Object.create(null);
		Object.getOwnPropertyNames(obj).forEach(function(key) {
			Object.defineProperty(copy$2, key, Object.getOwnPropertyDescriptor(obj, key));
		});
		return copy$2;
	}
} });

//#endregion
//#region ../node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS$1({ "../node_modules/graceful-fs/graceful-fs.js"(exports, module) {
	var fs$31 = __require("fs");
	var polyfills = require_polyfills();
	var legacy = require_legacy_streams();
	var clone = require_clone();
	var util$2 = __require("util");
	/* istanbul ignore next - node 0.x polyfill */
	var gracefulQueue;
	var previousSymbol;
	/* istanbul ignore else - node 0.x polyfill */
	if (typeof Symbol === "function" && typeof Symbol.for === "function") {
		gracefulQueue = Symbol.for("graceful-fs.queue");
		previousSymbol = Symbol.for("graceful-fs.previous");
	} else {
		gracefulQueue = "___graceful-fs.queue";
		previousSymbol = "___graceful-fs.previous";
	}
	function noop$4() {}
	function publishQueue(context, queue$1) {
		Object.defineProperty(context, gracefulQueue, { get: function() {
			return queue$1;
		} });
	}
	var debug = noop$4;
	if (util$2.debuglog) debug = util$2.debuglog("gfs4");
	else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) debug = function() {
		var m$1 = util$2.format.apply(util$2, arguments);
		m$1 = "GFS4: " + m$1.split(/\n/).join("\nGFS4: ");
		console.error(m$1);
	};
	if (!fs$31[gracefulQueue]) {
		var queue = global[gracefulQueue] || [];
		publishQueue(fs$31, queue);
		fs$31.close = function(fs$close) {
			function close(fd, cb) {
				return fs$close.call(fs$31, fd, function(err) {
					if (!err) resetQueue();
					if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
			Object.defineProperty(close, previousSymbol, { value: fs$close });
			return close;
		}(fs$31.close);
		fs$31.closeSync = function(fs$closeSync) {
			function closeSync(fd) {
				fs$closeSync.apply(fs$31, arguments);
				resetQueue();
			}
			Object.defineProperty(closeSync, previousSymbol, { value: fs$closeSync });
			return closeSync;
		}(fs$31.closeSync);
		if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) process.on("exit", function() {
			debug(fs$31[gracefulQueue]);
			__require("assert").equal(fs$31[gracefulQueue].length, 0);
		});
	}
	if (!global[gracefulQueue]) publishQueue(global, fs$31[gracefulQueue]);
	module.exports = patch(clone(fs$31));
	if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs$31.__patched) {
		module.exports = patch(fs$31);
		fs$31.__patched = true;
	}
	function patch(fs$33) {
		polyfills(fs$33);
		fs$33.gracefulify = patch;
		fs$33.createReadStream = createReadStream$1;
		fs$33.createWriteStream = createWriteStream$1;
		var fs$readFile = fs$33.readFile;
		fs$33.readFile = readFile$1;
		function readFile$1(path$28, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$readFile(path$28, options, cb);
			function go$readFile(path$29, options$1, cb$1, startTime) {
				return fs$readFile(path$29, options$1, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$readFile,
						[
							path$29,
							options$1,
							cb$1
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb$1 === "function") cb$1.apply(this, arguments);
				});
			}
		}
		var fs$writeFile = fs$33.writeFile;
		fs$33.writeFile = writeFile$1;
		function writeFile$1(path$28, data, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$writeFile(path$28, data, options, cb);
			function go$writeFile(path$29, data$1, options$1, cb$1, startTime) {
				return fs$writeFile(path$29, data$1, options$1, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$writeFile,
						[
							path$29,
							data$1,
							options$1,
							cb$1
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb$1 === "function") cb$1.apply(this, arguments);
				});
			}
		}
		var fs$appendFile = fs$33.appendFile;
		if (fs$appendFile) fs$33.appendFile = appendFile;
		function appendFile(path$28, data, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$appendFile(path$28, data, options, cb);
			function go$appendFile(path$29, data$1, options$1, cb$1, startTime) {
				return fs$appendFile(path$29, data$1, options$1, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$appendFile,
						[
							path$29,
							data$1,
							options$1,
							cb$1
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb$1 === "function") cb$1.apply(this, arguments);
				});
			}
		}
		var fs$copyFile = fs$33.copyFile;
		if (fs$copyFile) fs$33.copyFile = copyFile$2;
		function copyFile$2(src, dest, flags, cb) {
			if (typeof flags === "function") {
				cb = flags;
				flags = 0;
			}
			return go$copyFile(src, dest, flags, cb);
			function go$copyFile(src$1, dest$1, flags$1, cb$1, startTime) {
				return fs$copyFile(src$1, dest$1, flags$1, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$copyFile,
						[
							src$1,
							dest$1,
							flags$1,
							cb$1
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb$1 === "function") cb$1.apply(this, arguments);
				});
			}
		}
		var fs$readdir = fs$33.readdir;
		fs$33.readdir = readdir$2;
		var noReaddirOptionVersions = /^v[0-5]\./;
		function readdir$2(path$28, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir$1(path$29, options$1, cb$1, startTime) {
				return fs$readdir(path$29, fs$readdirCallback(path$29, options$1, cb$1, startTime));
			} : function go$readdir$1(path$29, options$1, cb$1, startTime) {
				return fs$readdir(path$29, options$1, fs$readdirCallback(path$29, options$1, cb$1, startTime));
			};
			return go$readdir(path$28, options, cb);
			function fs$readdirCallback(path$29, options$1, cb$1, startTime) {
				return function(err, files) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$readdir,
						[
							path$29,
							options$1,
							cb$1
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else {
						if (files && files.sort) files.sort();
						if (typeof cb$1 === "function") cb$1.call(this, err, files);
					}
				};
			}
		}
		if (process.version.substr(0, 4) === "v0.8") {
			var legStreams = legacy(fs$33);
			ReadStream = legStreams.ReadStream;
			WriteStream = legStreams.WriteStream;
		}
		var fs$ReadStream = fs$33.ReadStream;
		if (fs$ReadStream) {
			ReadStream.prototype = Object.create(fs$ReadStream.prototype);
			ReadStream.prototype.open = ReadStream$open;
		}
		var fs$WriteStream = fs$33.WriteStream;
		if (fs$WriteStream) {
			WriteStream.prototype = Object.create(fs$WriteStream.prototype);
			WriteStream.prototype.open = WriteStream$open;
		}
		Object.defineProperty(fs$33, "ReadStream", {
			get: function() {
				return ReadStream;
			},
			set: function(val) {
				ReadStream = val;
			},
			enumerable: true,
			configurable: true
		});
		Object.defineProperty(fs$33, "WriteStream", {
			get: function() {
				return WriteStream;
			},
			set: function(val) {
				WriteStream = val;
			},
			enumerable: true,
			configurable: true
		});
		var FileReadStream = ReadStream;
		Object.defineProperty(fs$33, "FileReadStream", {
			get: function() {
				return FileReadStream;
			},
			set: function(val) {
				FileReadStream = val;
			},
			enumerable: true,
			configurable: true
		});
		var FileWriteStream = WriteStream;
		Object.defineProperty(fs$33, "FileWriteStream", {
			get: function() {
				return FileWriteStream;
			},
			set: function(val) {
				FileWriteStream = val;
			},
			enumerable: true,
			configurable: true
		});
		function ReadStream(path$28, options) {
			if (this instanceof ReadStream) return fs$ReadStream.apply(this, arguments), this;
			else return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
		}
		function ReadStream$open() {
			var that = this;
			open(that.path, that.flags, that.mode, function(err, fd) {
				if (err) {
					if (that.autoClose) that.destroy();
					that.emit("error", err);
				} else {
					that.fd = fd;
					that.emit("open", fd);
					that.read();
				}
			});
		}
		function WriteStream(path$28, options) {
			if (this instanceof WriteStream) return fs$WriteStream.apply(this, arguments), this;
			else return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
		}
		function WriteStream$open() {
			var that = this;
			open(that.path, that.flags, that.mode, function(err, fd) {
				if (err) {
					that.destroy();
					that.emit("error", err);
				} else {
					that.fd = fd;
					that.emit("open", fd);
				}
			});
		}
		function createReadStream$1(path$28, options) {
			return new fs$33.ReadStream(path$28, options);
		}
		function createWriteStream$1(path$28, options) {
			return new fs$33.WriteStream(path$28, options);
		}
		var fs$open = fs$33.open;
		fs$33.open = open;
		function open(path$28, flags, mode, cb) {
			if (typeof mode === "function") cb = mode, mode = null;
			return go$open(path$28, flags, mode, cb);
			function go$open(path$29, flags$1, mode$1, cb$1, startTime) {
				return fs$open(path$29, flags$1, mode$1, function(err, fd) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$open,
						[
							path$29,
							flags$1,
							mode$1,
							cb$1
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb$1 === "function") cb$1.apply(this, arguments);
				});
			}
		}
		return fs$33;
	}
	function enqueue(elem) {
		debug("ENQUEUE", elem[0].name, elem[1]);
		fs$31[gracefulQueue].push(elem);
		retry();
	}
	var retryTimer;
	function resetQueue() {
		var now = Date.now();
		for (var i$1 = 0; i$1 < fs$31[gracefulQueue].length; ++i$1) if (fs$31[gracefulQueue][i$1].length > 2) {
			fs$31[gracefulQueue][i$1][3] = now;
			fs$31[gracefulQueue][i$1][4] = now;
		}
		retry();
	}
	function retry() {
		clearTimeout(retryTimer);
		retryTimer = void 0;
		if (fs$31[gracefulQueue].length === 0) return;
		var elem = fs$31[gracefulQueue].shift();
		var fn = elem[0];
		var args = elem[1];
		var err = elem[2];
		var startTime = elem[3];
		var lastTime = elem[4];
		if (startTime === void 0) {
			debug("RETRY", fn.name, args);
			fn.apply(null, args);
		} else if (Date.now() - startTime >= 6e4) {
			debug("TIMEOUT", fn.name, args);
			var cb = args.pop();
			if (typeof cb === "function") cb.call(null, err);
		} else {
			var sinceAttempt = Date.now() - lastTime;
			var sinceStart = Math.max(lastTime - startTime, 1);
			var desiredDelay = Math.min(sinceStart * 1.2, 100);
			if (sinceAttempt >= desiredDelay) {
				debug("RETRY", fn.name, args);
				fn.apply(null, args.concat([startTime]));
			} else fs$31[gracefulQueue].push(elem);
		}
		if (retryTimer === void 0) retryTimer = setTimeout(retry, 0);
	}
} });

//#endregion
//#region ../node_modules/fs-extra/lib/fs/index.js
var require_fs$4 = __commonJS$1({ "../node_modules/fs-extra/lib/fs/index.js"(exports) {
	const u$16 = require_universalify().fromCallback;
	const fs$30 = require_graceful_fs();
	const api = [
		"access",
		"appendFile",
		"chmod",
		"chown",
		"close",
		"copyFile",
		"cp",
		"fchmod",
		"fchown",
		"fdatasync",
		"fstat",
		"fsync",
		"ftruncate",
		"futimes",
		"glob",
		"lchmod",
		"lchown",
		"lutimes",
		"link",
		"lstat",
		"mkdir",
		"mkdtemp",
		"open",
		"opendir",
		"readdir",
		"readFile",
		"readlink",
		"realpath",
		"rename",
		"rm",
		"rmdir",
		"stat",
		"statfs",
		"symlink",
		"truncate",
		"unlink",
		"utimes",
		"writeFile"
	].filter((key) => {
		return typeof fs$30[key] === "function";
	});
	Object.assign(exports, fs$30);
	api.forEach((method) => {
		exports[method] = u$16(fs$30[method]);
	});
	exports.exists = function(filename, callback) {
		if (typeof callback === "function") return fs$30.exists(filename, callback);
		return new Promise((resolve$1) => {
			return fs$30.exists(filename, resolve$1);
		});
	};
	exports.read = function(fd, buffer, offset, length, position, callback) {
		if (typeof callback === "function") return fs$30.read(fd, buffer, offset, length, position, callback);
		return new Promise((resolve$1, reject) => {
			fs$30.read(fd, buffer, offset, length, position, (err, bytesRead, buffer$1) => {
				if (err) return reject(err);
				resolve$1({
					bytesRead,
					buffer: buffer$1
				});
			});
		});
	};
	exports.write = function(fd, buffer, ...args) {
		if (typeof args[args.length - 1] === "function") return fs$30.write(fd, buffer, ...args);
		return new Promise((resolve$1, reject) => {
			fs$30.write(fd, buffer, ...args, (err, bytesWritten, buffer$1) => {
				if (err) return reject(err);
				resolve$1({
					bytesWritten,
					buffer: buffer$1
				});
			});
		});
	};
	exports.readv = function(fd, buffers, ...args) {
		if (typeof args[args.length - 1] === "function") return fs$30.readv(fd, buffers, ...args);
		return new Promise((resolve$1, reject) => {
			fs$30.readv(fd, buffers, ...args, (err, bytesRead, buffers$1) => {
				if (err) return reject(err);
				resolve$1({
					bytesRead,
					buffers: buffers$1
				});
			});
		});
	};
	exports.writev = function(fd, buffers, ...args) {
		if (typeof args[args.length - 1] === "function") return fs$30.writev(fd, buffers, ...args);
		return new Promise((resolve$1, reject) => {
			fs$30.writev(fd, buffers, ...args, (err, bytesWritten, buffers$1) => {
				if (err) return reject(err);
				resolve$1({
					bytesWritten,
					buffers: buffers$1
				});
			});
		});
	};
	if (typeof fs$30.realpath.native === "function") exports.realpath.native = u$16(fs$30.realpath.native);
	else process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?", "Warning", "fs-extra-WARN0003");
} });

//#endregion
//#region ../node_modules/fs-extra/lib/mkdirs/utils.js
var require_utils$5 = __commonJS$1({ "../node_modules/fs-extra/lib/mkdirs/utils.js"(exports, module) {
	const path$26 = __require("path");
	module.exports.checkPath = function checkPath$2(pth) {
		if (process.platform === "win32") {
			const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path$26.parse(pth).root, ""));
			if (pathHasInvalidWinCharacters) {
				const error = new Error(`Path contains invalid characters: ${pth}`);
				error.code = "EINVAL";
				throw error;
			}
		}
	};
} });

//#endregion
//#region ../node_modules/fs-extra/lib/mkdirs/make-dir.js
var require_make_dir = __commonJS$1({ "../node_modules/fs-extra/lib/mkdirs/make-dir.js"(exports, module) {
	const fs$29 = require_fs$4();
	const { checkPath: checkPath$1 } = require_utils$5();
	const getMode = (options) => {
		const defaults = { mode: 511 };
		if (typeof options === "number") return options;
		return {
			...defaults,
			...options
		}.mode;
	};
	module.exports.makeDir = async (dir, options) => {
		checkPath$1(dir);
		return fs$29.mkdir(dir, {
			mode: getMode(options),
			recursive: true
		});
	};
	module.exports.makeDirSync = (dir, options) => {
		checkPath$1(dir);
		return fs$29.mkdirSync(dir, {
			mode: getMode(options),
			recursive: true
		});
	};
} });

//#endregion
//#region ../node_modules/fs-extra/lib/mkdirs/index.js
var require_mkdirs = __commonJS$1({ "../node_modules/fs-extra/lib/mkdirs/index.js"(exports, module) {
	const u$15 = require_universalify().fromPromise;
	const { makeDir: _makeDir, makeDirSync } = require_make_dir();
	const makeDir = u$15(_makeDir);
	module.exports = {
		mkdirs: makeDir,
		mkdirsSync: makeDirSync,
		mkdirp: makeDir,
		mkdirpSync: makeDirSync,
		ensureDir: makeDir,
		ensureDirSync: makeDirSync
	};
} });

//#endregion
//#region ../node_modules/fs-extra/lib/path-exists/index.js
var require_path_exists = __commonJS$1({ "../node_modules/fs-extra/lib/path-exists/index.js"(exports, module) {
	const u$14 = require_universalify().fromPromise;
	const fs$28 = require_fs$4();
	function pathExists$6(path$28) {
		return fs$28.access(path$28).then(() => true).catch(() => false);
	}
	module.exports = {
		pathExists: u$14(pathExists$6),
		pathExistsSync: fs$28.existsSync
	};
} });

//#endregion
//#region ../node_modules/fs-extra/lib/util/utimes.js
var require_utimes = __commonJS$1({ "../node_modules/fs-extra/lib/util/utimes.js"(exports, module) {
	const fs$27 = require_fs$4();
	const u$13 = require_universalify().fromPromise;
	async function utimesMillis$1(path$28, atime, mtime) {
		const fd = await fs$27.open(path$28, "r+");
		let closeErr = null;
		try {
			await fs$27.futimes(fd, atime, mtime);
		} finally {
			try {
				await fs$27.close(fd);
			} catch (e$1) {
				closeErr = e$1;
			}
		}
		if (closeErr) throw closeErr;
	}
	function utimesMillisSync$1(path$28, atime, mtime) {
		const fd = fs$27.openSync(path$28, "r+");
		fs$27.futimesSync(fd, atime, mtime);
		return fs$27.closeSync(fd);
	}
	module.exports = {
		utimesMillis: u$13(utimesMillis$1),
		utimesMillisSync: utimesMillisSync$1
	};
} });

//#endregion
//#region ../node_modules/fs-extra/lib/util/stat.js
var require_stat = __commonJS$1({ "../node_modules/fs-extra/lib/util/stat.js"(exports, module) {
	const fs$26 = require_fs$4();
	const path$25 = __require("path");
	const u$12 = require_universalify().fromPromise;
	function getStats$1(src, dest, opts) {
		const statFunc = opts.dereference ? (file) => fs$26.stat(file, { bigint: true }) : (file) => fs$26.lstat(file, { bigint: true });
		return Promise.all([statFunc(src), statFunc(dest).catch((err) => {
			if (err.code === "ENOENT") return null;
			throw err;
		})]).then(([srcStat, destStat]) => ({
			srcStat,
			destStat
		}));
	}
	function getStatsSync(src, dest, opts) {
		let destStat;
		const statFunc = opts.dereference ? (file) => fs$26.statSync(file, { bigint: true }) : (file) => fs$26.lstatSync(file, { bigint: true });
		const srcStat = statFunc(src);
		try {
			destStat = statFunc(dest);
		} catch (err) {
			if (err.code === "ENOENT") return {
				srcStat,
				destStat: null
			};
			throw err;
		}
		return {
			srcStat,
			destStat
		};
	}
	async function checkPaths(src, dest, funcName, opts) {
		const { srcStat, destStat } = await getStats$1(src, dest, opts);
		if (destStat) {
			if (areIdentical$2(srcStat, destStat)) {
				const srcBaseName = path$25.basename(src);
				const destBaseName = path$25.basename(dest);
				if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) return {
					srcStat,
					destStat,
					isChangingCase: true
				};
				throw new Error("Source and destination must not be the same.");
			}
			if (srcStat.isDirectory() && !destStat.isDirectory()) throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
			if (!srcStat.isDirectory() && destStat.isDirectory()) throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
		}
		if (srcStat.isDirectory() && isSrcSubdir(src, dest)) throw new Error(errMsg(src, dest, funcName));
		return {
			srcStat,
			destStat
		};
	}
	function checkPathsSync(src, dest, funcName, opts) {
		const { srcStat, destStat } = getStatsSync(src, dest, opts);
		if (destStat) {
			if (areIdentical$2(srcStat, destStat)) {
				const srcBaseName = path$25.basename(src);
				const destBaseName = path$25.basename(dest);
				if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) return {
					srcStat,
					destStat,
					isChangingCase: true
				};
				throw new Error("Source and destination must not be the same.");
			}
			if (srcStat.isDirectory() && !destStat.isDirectory()) throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
			if (!srcStat.isDirectory() && destStat.isDirectory()) throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
		}
		if (srcStat.isDirectory() && isSrcSubdir(src, dest)) throw new Error(errMsg(src, dest, funcName));
		return {
			srcStat,
			destStat
		};
	}
	async function checkParentPaths(src, srcStat, dest, funcName) {
		const srcParent = path$25.resolve(path$25.dirname(src));
		const destParent = path$25.resolve(path$25.dirname(dest));
		if (destParent === srcParent || destParent === path$25.parse(destParent).root) return;
		let destStat;
		try {
			destStat = await fs$26.stat(destParent, { bigint: true });
		} catch (err) {
			if (err.code === "ENOENT") return;
			throw err;
		}
		if (areIdentical$2(srcStat, destStat)) throw new Error(errMsg(src, dest, funcName));
		return checkParentPaths(src, srcStat, destParent, funcName);
	}
	function checkParentPathsSync(src, srcStat, dest, funcName) {
		const srcParent = path$25.resolve(path$25.dirname(src));
		const destParent = path$25.resolve(path$25.dirname(dest));
		if (destParent === srcParent || destParent === path$25.parse(destParent).root) return;
		let destStat;
		try {
			destStat = fs$26.statSync(destParent, { bigint: true });
		} catch (err) {
			if (err.code === "ENOENT") return;
			throw err;
		}
		if (areIdentical$2(srcStat, destStat)) throw new Error(errMsg(src, dest, funcName));
		return checkParentPathsSync(src, srcStat, destParent, funcName);
	}
	function areIdentical$2(srcStat, destStat) {
		return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
	}
	function isSrcSubdir(src, dest) {
		const srcArr = path$25.resolve(src).split(path$25.sep).filter((i$1) => i$1);
		const destArr = path$25.resolve(dest).split(path$25.sep).filter((i$1) => i$1);
		return srcArr.every((cur, i$1) => destArr[i$1] === cur);
	}
	function errMsg(src, dest, funcName) {
		return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
	}
	module.exports = {
		checkPaths: u$12(checkPaths),
		checkPathsSync,
		checkParentPaths: u$12(checkParentPaths),
		checkParentPathsSync,
		isSrcSubdir,
		areIdentical: areIdentical$2
	};
} });

//#endregion
//#region ../node_modules/fs-extra/lib/copy/copy.js
var require_copy$1 = __commonJS$1({ "../node_modules/fs-extra/lib/copy/copy.js"(exports, module) {
	const fs$25 = require_fs$4();
	const path$24 = __require("path");
	const { mkdirs: mkdirs$1 } = require_mkdirs();
	const { pathExists: pathExists$5 } = require_path_exists();
	const { utimesMillis } = require_utimes();
	const stat$4 = require_stat();
	async function copy$1(src, dest, opts = {}) {
		if (typeof opts === "function") opts = { filter: opts };
		opts.clobber = "clobber" in opts ? !!opts.clobber : true;
		opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
		if (opts.preserveTimestamps && process.arch === "ia32") process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0001");
		const { srcStat, destStat } = await stat$4.checkPaths(src, dest, "copy", opts);
		await stat$4.checkParentPaths(src, srcStat, dest, "copy");
		const include = await runFilter(src, dest, opts);
		if (!include) return;
		const destParent = path$24.dirname(dest);
		const dirExists = await pathExists$5(destParent);
		if (!dirExists) await mkdirs$1(destParent);
		await getStatsAndPerformCopy(destStat, src, dest, opts);
	}
	async function runFilter(src, dest, opts) {
		if (!opts.filter) return true;
		return opts.filter(src, dest);
	}
	async function getStatsAndPerformCopy(destStat, src, dest, opts) {
		const statFn = opts.dereference ? fs$25.stat : fs$25.lstat;
		const srcStat = await statFn(src);
		if (srcStat.isDirectory()) return onDir$1(srcStat, destStat, src, dest, opts);
		if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile$1(srcStat, destStat, src, dest, opts);
		if (srcStat.isSymbolicLink()) return onLink$1(destStat, src, dest, opts);
		if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`);
		if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`);
		throw new Error(`Unknown file: ${src}`);
	}
	async function onFile$1(srcStat, destStat, src, dest, opts) {
		if (!destStat) return copyFile$1(srcStat, src, dest, opts);
		if (opts.overwrite) {
			await fs$25.unlink(dest);
			return copyFile$1(srcStat, src, dest, opts);
		}
		if (opts.errorOnExist) throw new Error(`'${dest}' already exists`);
	}
	async function copyFile$1(srcStat, src, dest, opts) {
		await fs$25.copyFile(src, dest);
		if (opts.preserveTimestamps) {
			if (fileIsNotWritable$1(srcStat.mode)) await makeFileWritable$1(dest, srcStat.mode);
			const updatedSrcStat = await fs$25.stat(src);
			await utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
		}
		return fs$25.chmod(dest, srcStat.mode);
	}
	function fileIsNotWritable$1(srcMode) {
		return (srcMode & 128) === 0;
	}
	function makeFileWritable$1(dest, srcMode) {
		return fs$25.chmod(dest, srcMode | 128);
	}
	async function onDir$1(srcStat, destStat, src, dest, opts) {
		if (!destStat) await fs$25.mkdir(dest);
		const promises = [];
		for await (const item of await fs$25.opendir(src)) {
			const srcItem = path$24.join(src, item.name);
			const destItem = path$24.join(dest, item.name);
			promises.push(runFilter(srcItem, destItem, opts).then((include) => {
				if (include) return stat$4.checkPaths(srcItem, destItem, "copy", opts).then(({ destStat: destStat$1 }) => {
					return getStatsAndPerformCopy(destStat$1, srcItem, destItem, opts);
				});
			}));
		}
		await Promise.all(promises);
		if (!destStat) await fs$25.chmod(dest, srcStat.mode);
	}
	async function onLink$1(destStat, src, dest, opts) {
		let resolvedSrc = await fs$25.readlink(src);
		if (opts.dereference) resolvedSrc = path$24.resolve(process.cwd(), resolvedSrc);
		if (!destStat) return fs$25.symlink(resolvedSrc, dest);
		let resolvedDest = null;
		try {
			resolvedDest = await fs$25.readlink(dest);
		} catch (e$1) {
			if (e$1.code === "EINVAL" || e$1.code === "UNKNOWN") return fs$25.symlink(resolvedSrc, dest);
			throw e$1;
		}
		if (opts.dereference) resolvedDest = path$24.resolve(process.cwd(), resolvedDest);
		if (stat$4.isSrcSubdir(resolvedSrc, resolvedDest)) throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
		if (stat$4.isSrcSubdir(resolvedDest, resolvedSrc)) throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
		await fs$25.unlink(dest);
		return fs$25.symlink(resolvedSrc, dest);
	}
	module.exports = copy$1;
} });

//#endregion
//#region ../node_modules/fs-extra/lib/copy/copy-sync.js
var require_copy_sync = __commonJS$1({ "../node_modules/fs-extra/lib/copy/copy-sync.js"(exports, module) {
	const fs$24 = require_graceful_fs();
	const path$23 = __require("path");
	const mkdirsSync$1 = require_mkdirs().mkdirsSync;
	const utimesMillisSync = require_utimes().utimesMillisSync;
	const stat$3 = require_stat();
	function copySync$1(src, dest, opts) {
		if (typeof opts === "function") opts = { filter: opts };
		opts = opts || {};
		opts.clobber = "clobber" in opts ? !!opts.clobber : true;
		opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
		if (opts.preserveTimestamps && process.arch === "ia32") process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0002");
		const { srcStat, destStat } = stat$3.checkPathsSync(src, dest, "copy", opts);
		stat$3.checkParentPathsSync(src, srcStat, dest, "copy");
		if (opts.filter && !opts.filter(src, dest)) return;
		const destParent = path$23.dirname(dest);
		if (!fs$24.existsSync(destParent)) mkdirsSync$1(destParent);
		return getStats(destStat, src, dest, opts);
	}
	function getStats(destStat, src, dest, opts) {
		const statSync$2 = opts.dereference ? fs$24.statSync : fs$24.lstatSync;
		const srcStat = statSync$2(src);
		if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts);
		else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts);
		else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts);
		else if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`);
		else if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`);
		throw new Error(`Unknown file: ${src}`);
	}
	function onFile(srcStat, destStat, src, dest, opts) {
		if (!destStat) return copyFile(srcStat, src, dest, opts);
		return mayCopyFile(srcStat, src, dest, opts);
	}
	function mayCopyFile(srcStat, src, dest, opts) {
		if (opts.overwrite) {
			fs$24.unlinkSync(dest);
			return copyFile(srcStat, src, dest, opts);
		} else if (opts.errorOnExist) throw new Error(`'${dest}' already exists`);
	}
	function copyFile(srcStat, src, dest, opts) {
		fs$24.copyFileSync(src, dest);
		if (opts.preserveTimestamps) handleTimestamps(srcStat.mode, src, dest);
		return setDestMode(dest, srcStat.mode);
	}
	function handleTimestamps(srcMode, src, dest) {
		if (fileIsNotWritable(srcMode)) makeFileWritable(dest, srcMode);
		return setDestTimestamps(src, dest);
	}
	function fileIsNotWritable(srcMode) {
		return (srcMode & 128) === 0;
	}
	function makeFileWritable(dest, srcMode) {
		return setDestMode(dest, srcMode | 128);
	}
	function setDestMode(dest, srcMode) {
		return fs$24.chmodSync(dest, srcMode);
	}
	function setDestTimestamps(src, dest) {
		const updatedSrcStat = fs$24.statSync(src);
		return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
	}
	function onDir(srcStat, destStat, src, dest, opts) {
		if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts);
		return copyDir(src, dest, opts);
	}
	function mkDirAndCopy(srcMode, src, dest, opts) {
		fs$24.mkdirSync(dest);
		copyDir(src, dest, opts);
		return setDestMode(dest, srcMode);
	}
	function copyDir(src, dest, opts) {
		const dir = fs$24.opendirSync(src);
		try {
			let dirent;
			while ((dirent = dir.readSync()) !== null) copyDirItem(dirent.name, src, dest, opts);
		} finally {
			dir.closeSync();
		}
	}
	function copyDirItem(item, src, dest, opts) {
		const srcItem = path$23.join(src, item);
		const destItem = path$23.join(dest, item);
		if (opts.filter && !opts.filter(srcItem, destItem)) return;
		const { destStat } = stat$3.checkPathsSync(srcItem, destItem, "copy", opts);
		return getStats(destStat, srcItem, destItem, opts);
	}
	function onLink(destStat, src, dest, opts) {
		let resolvedSrc = fs$24.readlinkSync(src);
		if (opts.dereference) resolvedSrc = path$23.resolve(process.cwd(), resolvedSrc);
		if (!destStat) return fs$24.symlinkSync(resolvedSrc, dest);
		else {
			let resolvedDest;
			try {
				resolvedDest = fs$24.readlinkSync(dest);
			} catch (err) {
				if (err.code === "EINVAL" || err.code === "UNKNOWN") return fs$24.symlinkSync(resolvedSrc, dest);
				throw err;
			}
			if (opts.dereference) resolvedDest = path$23.resolve(process.cwd(), resolvedDest);
			if (stat$3.isSrcSubdir(resolvedSrc, resolvedDest)) throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
			if (stat$3.isSrcSubdir(resolvedDest, resolvedSrc)) throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
			return copyLink(resolvedSrc, dest);
		}
	}
	function copyLink(resolvedSrc, dest) {
		fs$24.unlinkSync(dest);
		return fs$24.symlinkSync(resolvedSrc, dest);
	}
	module.exports = copySync$1;
} });

//#endregion
//#region ../node_modules/fs-extra/lib/copy/index.js
var require_copy = __commonJS$1({ "../node_modules/fs-extra/lib/copy/index.js"(exports, module) {
	const u$11 = require_universalify().fromPromise;
	module.exports = {
		copy: u$11(require_copy$1()),
		copySync: require_copy_sync()
	};
} });

//#endregion
//#region ../node_modules/fs-extra/lib/remove/index.js
var require_remove = __commonJS$1({ "../node_modules/fs-extra/lib/remove/index.js"(exports, module) {
	const fs$23 = require_graceful_fs();
	const u$10 = require_universalify().fromCallback;
	function remove$2(path$28, callback) {
		fs$23.rm(path$28, {
			recursive: true,
			force: true
		}, callback);
	}
	function removeSync$1(path$28) {
		fs$23.rmSync(path$28, {
			recursive: true,
			force: true
		});
	}
	module.exports = {
		remove: u$10(remove$2),
		removeSync: removeSync$1
	};
} });

//#endregion
//#region ../node_modules/fs-extra/lib/empty/index.js
var require_empty = __commonJS$1({ "../node_modules/fs-extra/lib/empty/index.js"(exports, module) {
	const u$9 = require_universalify().fromPromise;
	const fs$22 = require_fs$4();
	const path$22 = __require("path");
	const mkdir$3 = require_mkdirs();
	const remove$1 = require_remove();
	const emptyDir = u$9(async function emptyDir$1(dir) {
		let items;
		try {
			items = await fs$22.readdir(dir);
		} catch {
			return mkdir$3.mkdirs(dir);
		}
		return Promise.all(items.map((item) => remove$1.remove(path$22.join(dir, item))));
	});
	function emptyDirSync(dir) {
		let items;
		try {
			items = fs$22.readdirSync(dir);
		} catch {
			return mkdir$3.mkdirsSync(dir);
		}
		items.forEach((item) => {
			item = path$22.join(dir, item);
			remove$1.removeSync(item);
		});
	}
	module.exports = {
		emptyDirSync,
		emptydirSync: emptyDirSync,
		emptyDir,
		emptydir: emptyDir
	};
} });

//#endregion
//#region ../node_modules/fs-extra/lib/ensure/file.js
var require_file = __commonJS$1({ "../node_modules/fs-extra/lib/ensure/file.js"(exports, module) {
	const u$8 = require_universalify().fromPromise;
	const path$21 = __require("path");
	const fs$21 = require_fs$4();
	const mkdir$2 = require_mkdirs();
	async function createFile$1(file) {
		let stats;
		try {
			stats = await fs$21.stat(file);
		} catch {}
		if (stats && stats.isFile()) return;
		const dir = path$21.dirname(file);
		let dirStats = null;
		try {
			dirStats = await fs$21.stat(dir);
		} catch (err) {
			if (err.code === "ENOENT") {
				await mkdir$2.mkdirs(dir);
				await fs$21.writeFile(file, "");
				return;
			} else throw err;
		}
		if (dirStats.isDirectory()) await fs$21.writeFile(file, "");
		else await fs$21.readdir(dir);
	}
	function createFileSync$1(file) {
		let stats;
		try {
			stats = fs$21.statSync(file);
		} catch {}
		if (stats && stats.isFile()) return;
		const dir = path$21.dirname(file);
		try {
			if (!fs$21.statSync(dir).isDirectory()) fs$21.readdirSync(dir);
		} catch (err) {
			if (err && err.code === "ENOENT") mkdir$2.mkdirsSync(dir);
			else throw err;
		}
		fs$21.writeFileSync(file, "");
	}
	module.exports = {
		createFile: u$8(createFile$1),
		createFileSync: createFileSync$1
	};
} });

//#endregion
//#region ../node_modules/fs-extra/lib/ensure/link.js
var require_link = __commonJS$1({ "../node_modules/fs-extra/lib/ensure/link.js"(exports, module) {
	const u$7 = require_universalify().fromPromise;
	const path$20 = __require("path");
	const fs$20 = require_fs$4();
	const mkdir$1 = require_mkdirs();
	const { pathExists: pathExists$4 } = require_path_exists();
	const { areIdentical: areIdentical$1 } = require_stat();
	async function createLink$1(srcpath, dstpath) {
		let dstStat;
		try {
			dstStat = await fs$20.lstat(dstpath);
		} catch {}
		let srcStat;
		try {
			srcStat = await fs$20.lstat(srcpath);
		} catch (err) {
			err.message = err.message.replace("lstat", "ensureLink");
			throw err;
		}
		if (dstStat && areIdentical$1(srcStat, dstStat)) return;
		const dir = path$20.dirname(dstpath);
		const dirExists = await pathExists$4(dir);
		if (!dirExists) await mkdir$1.mkdirs(dir);
		await fs$20.link(srcpath, dstpath);
	}
	function createLinkSync$1(srcpath, dstpath) {
		let dstStat;
		try {
			dstStat = fs$20.lstatSync(dstpath);
		} catch {}
		try {
			const srcStat = fs$20.lstatSync(srcpath);
			if (dstStat && areIdentical$1(srcStat, dstStat)) return;
		} catch (err) {
			err.message = err.message.replace("lstat", "ensureLink");
			throw err;
		}
		const dir = path$20.dirname(dstpath);
		const dirExists = fs$20.existsSync(dir);
		if (dirExists) return fs$20.linkSync(srcpath, dstpath);
		mkdir$1.mkdirsSync(dir);
		return fs$20.linkSync(srcpath, dstpath);
	}
	module.exports = {
		createLink: u$7(createLink$1),
		createLinkSync: createLinkSync$1
	};
} });

//#endregion
//#region ../node_modules/fs-extra/lib/ensure/symlink-paths.js
var require_symlink_paths = __commonJS$1({ "../node_modules/fs-extra/lib/ensure/symlink-paths.js"(exports, module) {
	const path$19 = __require("path");
	const fs$19 = require_fs$4();
	const { pathExists: pathExists$3 } = require_path_exists();
	const u$6 = require_universalify().fromPromise;
	/**
	* Function that returns two types of paths, one relative to symlink, and one
	* relative to the current working directory. Checks if path is absolute or
	* relative. If the path is relative, this function checks if the path is
	* relative to symlink or relative to current working directory. This is an
	* initiative to find a smarter `srcpath` to supply when building symlinks.
	* This allows you to determine which path to use out of one of three possible
	* types of source paths. The first is an absolute path. This is detected by
	* `path.isAbsolute()`. When an absolute path is provided, it is checked to
	* see if it exists. If it does it's used, if not an error is returned
	* (callback)/ thrown (sync). The other two options for `srcpath` are a
	* relative url. By default Node's `fs.symlink` works by creating a symlink
	* using `dstpath` and expects the `srcpath` to be relative to the newly
	* created symlink. If you provide a `srcpath` that does not exist on the file
	* system it results in a broken symlink. To minimize this, the function
	* checks to see if the 'relative to symlink' source file exists, and if it
	* does it will use it. If it does not, it checks if there's a file that
	* exists that is relative to the current working directory, if does its used.
	* This preserves the expectations of the original fs.symlink spec and adds
	* the ability to pass in `relative to current working direcotry` paths.
	*/
	async function symlinkPaths$1(srcpath, dstpath) {
		if (path$19.isAbsolute(srcpath)) {
			try {
				await fs$19.lstat(srcpath);
			} catch (err) {
				err.message = err.message.replace("lstat", "ensureSymlink");
				throw err;
			}
			return {
				toCwd: srcpath,
				toDst: srcpath
			};
		}
		const dstdir = path$19.dirname(dstpath);
		const relativeToDst = path$19.join(dstdir, srcpath);
		const exists = await pathExists$3(relativeToDst);
		if (exists) return {
			toCwd: relativeToDst,
			toDst: srcpath
		};
		try {
			await fs$19.lstat(srcpath);
		} catch (err) {
			err.message = err.message.replace("lstat", "ensureSymlink");
			throw err;
		}
		return {
			toCwd: srcpath,
			toDst: path$19.relative(dstdir, srcpath)
		};
	}
	function symlinkPathsSync$1(srcpath, dstpath) {
		if (path$19.isAbsolute(srcpath)) {
			const exists$1 = fs$19.existsSync(srcpath);
			if (!exists$1) throw new Error("absolute srcpath does not exist");
			return {
				toCwd: srcpath,
				toDst: srcpath
			};
		}
		const dstdir = path$19.dirname(dstpath);
		const relativeToDst = path$19.join(dstdir, srcpath);
		const exists = fs$19.existsSync(relativeToDst);
		if (exists) return {
			toCwd: relativeToDst,
			toDst: srcpath
		};
		const srcExists = fs$19.existsSync(srcpath);
		if (!srcExists) throw new Error("relative srcpath does not exist");
		return {
			toCwd: srcpath,
			toDst: path$19.relative(dstdir, srcpath)
		};
	}
	module.exports = {
		symlinkPaths: u$6(symlinkPaths$1),
		symlinkPathsSync: symlinkPathsSync$1
	};
} });

//#endregion
//#region ../node_modules/fs-extra/lib/ensure/symlink-type.js
var require_symlink_type = __commonJS$1({ "../node_modules/fs-extra/lib/ensure/symlink-type.js"(exports, module) {
	const fs$18 = require_fs$4();
	const u$5 = require_universalify().fromPromise;
	async function symlinkType$1(srcpath, type) {
		if (type) return type;
		let stats;
		try {
			stats = await fs$18.lstat(srcpath);
		} catch {
			return "file";
		}
		return stats && stats.isDirectory() ? "dir" : "file";
	}
	function symlinkTypeSync$1(srcpath, type) {
		if (type) return type;
		let stats;
		try {
			stats = fs$18.lstatSync(srcpath);
		} catch {
			return "file";
		}
		return stats && stats.isDirectory() ? "dir" : "file";
	}
	module.exports = {
		symlinkType: u$5(symlinkType$1),
		symlinkTypeSync: symlinkTypeSync$1
	};
} });

//#endregion
//#region ../node_modules/fs-extra/lib/ensure/symlink.js
var require_symlink = __commonJS$1({ "../node_modules/fs-extra/lib/ensure/symlink.js"(exports, module) {
	const u$4 = require_universalify().fromPromise;
	const path$18 = __require("path");
	const fs$17 = require_fs$4();
	const { mkdirs, mkdirsSync } = require_mkdirs();
	const { symlinkPaths, symlinkPathsSync } = require_symlink_paths();
	const { symlinkType, symlinkTypeSync } = require_symlink_type();
	const { pathExists: pathExists$2 } = require_path_exists();
	const { areIdentical } = require_stat();
	async function createSymlink$1(srcpath, dstpath, type) {
		let stats;
		try {
			stats = await fs$17.lstat(dstpath);
		} catch {}
		if (stats && stats.isSymbolicLink()) {
			const [srcStat, dstStat] = await Promise.all([fs$17.stat(srcpath), fs$17.stat(dstpath)]);
			if (areIdentical(srcStat, dstStat)) return;
		}
		const relative = await symlinkPaths(srcpath, dstpath);
		srcpath = relative.toDst;
		const toType = await symlinkType(relative.toCwd, type);
		const dir = path$18.dirname(dstpath);
		if (!await pathExists$2(dir)) await mkdirs(dir);
		return fs$17.symlink(srcpath, dstpath, toType);
	}
	function createSymlinkSync$1(srcpath, dstpath, type) {
		let stats;
		try {
			stats = fs$17.lstatSync(dstpath);
		} catch {}
		if (stats && stats.isSymbolicLink()) {
			const srcStat = fs$17.statSync(srcpath);
			const dstStat = fs$17.statSync(dstpath);
			if (areIdentical(srcStat, dstStat)) return;
		}
		const relative = symlinkPathsSync(srcpath, dstpath);
		srcpath = relative.toDst;
		type = symlinkTypeSync(relative.toCwd, type);
		const dir = path$18.dirname(dstpath);
		const exists = fs$17.existsSync(dir);
		if (exists) return fs$17.symlinkSync(srcpath, dstpath, type);
		mkdirsSync(dir);
		return fs$17.symlinkSync(srcpath, dstpath, type);
	}
	module.exports = {
		createSymlink: u$4(createSymlink$1),
		createSymlinkSync: createSymlinkSync$1
	};
} });

//#endregion
//#region ../node_modules/fs-extra/lib/ensure/index.js
var require_ensure = __commonJS$1({ "../node_modules/fs-extra/lib/ensure/index.js"(exports, module) {
	const { createFile, createFileSync } = require_file();
	const { createLink, createLinkSync } = require_link();
	const { createSymlink, createSymlinkSync } = require_symlink();
	module.exports = {
		createFile,
		createFileSync,
		ensureFile: createFile,
		ensureFileSync: createFileSync,
		createLink,
		createLinkSync,
		ensureLink: createLink,
		ensureLinkSync: createLinkSync,
		createSymlink,
		createSymlinkSync,
		ensureSymlink: createSymlink,
		ensureSymlinkSync: createSymlinkSync
	};
} });

//#endregion
//#region ../node_modules/jsonfile/utils.js
var require_utils$4 = __commonJS$1({ "../node_modules/jsonfile/utils.js"(exports, module) {
	function stringify$7(obj, { EOL = "\n", finalEOL = true, replacer = null, spaces } = {}) {
		const EOF = finalEOL ? EOL : "";
		const str = JSON.stringify(obj, replacer, spaces);
		return str.replace(/\n/g, EOL) + EOF;
	}
	function stripBom$1(content) {
		if (Buffer.isBuffer(content)) content = content.toString("utf8");
		return content.replace(/^\uFEFF/, "");
	}
	module.exports = {
		stringify: stringify$7,
		stripBom: stripBom$1
	};
} });

//#endregion
//#region ../node_modules/jsonfile/index.js
var require_jsonfile$1 = __commonJS$1({ "../node_modules/jsonfile/index.js"(exports, module) {
	let _fs;
	try {
		_fs = require_graceful_fs();
	} catch (_$2) {
		_fs = __require("fs");
	}
	const universalify = require_universalify();
	const { stringify: stringify$6, stripBom } = require_utils$4();
	async function _readFile(file, options = {}) {
		if (typeof options === "string") options = { encoding: options };
		const fs$33 = options.fs || _fs;
		const shouldThrow = "throws" in options ? options.throws : true;
		let data = await universalify.fromCallback(fs$33.readFile)(file, options);
		data = stripBom(data);
		let obj;
		try {
			obj = JSON.parse(data, options ? options.reviver : null);
		} catch (err) {
			if (shouldThrow) {
				err.message = `${file}: ${err.message}`;
				throw err;
			} else return null;
		}
		return obj;
	}
	const readFile = universalify.fromPromise(_readFile);
	function readFileSync$1(file, options = {}) {
		if (typeof options === "string") options = { encoding: options };
		const fs$33 = options.fs || _fs;
		const shouldThrow = "throws" in options ? options.throws : true;
		try {
			let content = fs$33.readFileSync(file, options);
			content = stripBom(content);
			return JSON.parse(content, options.reviver);
		} catch (err) {
			if (shouldThrow) {
				err.message = `${file}: ${err.message}`;
				throw err;
			} else return null;
		}
	}
	async function _writeFile(file, obj, options = {}) {
		const fs$33 = options.fs || _fs;
		const str = stringify$6(obj, options);
		await universalify.fromCallback(fs$33.writeFile)(file, str, options);
	}
	const writeFile = universalify.fromPromise(_writeFile);
	function writeFileSync$1(file, obj, options = {}) {
		const fs$33 = options.fs || _fs;
		const str = stringify$6(obj, options);
		return fs$33.writeFileSync(file, str, options);
	}
	const jsonfile = {
		readFile,
		readFileSync: readFileSync$1,
		writeFile,
		writeFileSync: writeFileSync$1
	};
	module.exports = jsonfile;
} });

//#endregion
//#region ../node_modules/fs-extra/lib/json/jsonfile.js
var require_jsonfile = __commonJS$1({ "../node_modules/fs-extra/lib/json/jsonfile.js"(exports, module) {
	const jsonFile$1 = require_jsonfile$1();
	module.exports = {
		readJson: jsonFile$1.readFile,
		readJsonSync: jsonFile$1.readFileSync,
		writeJson: jsonFile$1.writeFile,
		writeJsonSync: jsonFile$1.writeFileSync
	};
} });

//#endregion
//#region ../node_modules/fs-extra/lib/output-file/index.js
var require_output_file = __commonJS$1({ "../node_modules/fs-extra/lib/output-file/index.js"(exports, module) {
	const u$3 = require_universalify().fromPromise;
	const fs$16 = require_fs$4();
	const path$17 = __require("path");
	const mkdir = require_mkdirs();
	const pathExists$1 = require_path_exists().pathExists;
	async function outputFile$1(file, data, encoding = "utf-8") {
		const dir = path$17.dirname(file);
		if (!await pathExists$1(dir)) await mkdir.mkdirs(dir);
		return fs$16.writeFile(file, data, encoding);
	}
	function outputFileSync$1(file, ...args) {
		const dir = path$17.dirname(file);
		if (!fs$16.existsSync(dir)) mkdir.mkdirsSync(dir);
		fs$16.writeFileSync(file, ...args);
	}
	module.exports = {
		outputFile: u$3(outputFile$1),
		outputFileSync: outputFileSync$1
	};
} });

//#endregion
//#region ../node_modules/fs-extra/lib/json/output-json.js
var require_output_json = __commonJS$1({ "../node_modules/fs-extra/lib/json/output-json.js"(exports, module) {
	const { stringify: stringify$5 } = require_utils$4();
	const { outputFile } = require_output_file();
	async function outputJson(file, data, options = {}) {
		const str = stringify$5(data, options);
		await outputFile(file, str, options);
	}
	module.exports = outputJson;
} });

//#endregion
//#region ../node_modules/fs-extra/lib/json/output-json-sync.js
var require_output_json_sync = __commonJS$1({ "../node_modules/fs-extra/lib/json/output-json-sync.js"(exports, module) {
	const { stringify: stringify$4 } = require_utils$4();
	const { outputFileSync } = require_output_file();
	function outputJsonSync(file, data, options) {
		const str = stringify$4(data, options);
		outputFileSync(file, str, options);
	}
	module.exports = outputJsonSync;
} });

//#endregion
//#region ../node_modules/fs-extra/lib/json/index.js
var require_json = __commonJS$1({ "../node_modules/fs-extra/lib/json/index.js"(exports, module) {
	const u$2 = require_universalify().fromPromise;
	const jsonFile = require_jsonfile();
	jsonFile.outputJson = u$2(require_output_json());
	jsonFile.outputJsonSync = require_output_json_sync();
	jsonFile.outputJSON = jsonFile.outputJson;
	jsonFile.outputJSONSync = jsonFile.outputJsonSync;
	jsonFile.writeJSON = jsonFile.writeJson;
	jsonFile.writeJSONSync = jsonFile.writeJsonSync;
	jsonFile.readJSON = jsonFile.readJson;
	jsonFile.readJSONSync = jsonFile.readJsonSync;
	module.exports = jsonFile;
} });

//#endregion
//#region ../node_modules/fs-extra/lib/move/move.js
var require_move$1 = __commonJS$1({ "../node_modules/fs-extra/lib/move/move.js"(exports, module) {
	const fs$15 = require_fs$4();
	const path$16 = __require("path");
	const { copy } = require_copy();
	const { remove } = require_remove();
	const { mkdirp } = require_mkdirs();
	const { pathExists } = require_path_exists();
	const stat$2 = require_stat();
	async function move(src, dest, opts = {}) {
		const overwrite = opts.overwrite || opts.clobber || false;
		const { srcStat, isChangingCase = false } = await stat$2.checkPaths(src, dest, "move", opts);
		await stat$2.checkParentPaths(src, srcStat, dest, "move");
		const destParent = path$16.dirname(dest);
		const parsedParentPath = path$16.parse(destParent);
		if (parsedParentPath.root !== destParent) await mkdirp(destParent);
		return doRename$1(src, dest, overwrite, isChangingCase);
	}
	async function doRename$1(src, dest, overwrite, isChangingCase) {
		if (!isChangingCase) {
			if (overwrite) await remove(dest);
			else if (await pathExists(dest)) throw new Error("dest already exists.");
		}
		try {
			await fs$15.rename(src, dest);
		} catch (err) {
			if (err.code !== "EXDEV") throw err;
			await moveAcrossDevice$1(src, dest, overwrite);
		}
	}
	async function moveAcrossDevice$1(src, dest, overwrite) {
		const opts = {
			overwrite,
			errorOnExist: true,
			preserveTimestamps: true
		};
		await copy(src, dest, opts);
		return remove(src);
	}
	module.exports = move;
} });

//#endregion
//#region ../node_modules/fs-extra/lib/move/move-sync.js
var require_move_sync = __commonJS$1({ "../node_modules/fs-extra/lib/move/move-sync.js"(exports, module) {
	const fs$14 = require_graceful_fs();
	const path$15 = __require("path");
	const copySync = require_copy().copySync;
	const removeSync = require_remove().removeSync;
	const mkdirpSync = require_mkdirs().mkdirpSync;
	const stat$1 = require_stat();
	function moveSync(src, dest, opts) {
		opts = opts || {};
		const overwrite = opts.overwrite || opts.clobber || false;
		const { srcStat, isChangingCase = false } = stat$1.checkPathsSync(src, dest, "move", opts);
		stat$1.checkParentPathsSync(src, srcStat, dest, "move");
		if (!isParentRoot(dest)) mkdirpSync(path$15.dirname(dest));
		return doRename(src, dest, overwrite, isChangingCase);
	}
	function isParentRoot(dest) {
		const parent = path$15.dirname(dest);
		const parsedPath = path$15.parse(parent);
		return parsedPath.root === parent;
	}
	function doRename(src, dest, overwrite, isChangingCase) {
		if (isChangingCase) return rename(src, dest, overwrite);
		if (overwrite) {
			removeSync(dest);
			return rename(src, dest, overwrite);
		}
		if (fs$14.existsSync(dest)) throw new Error("dest already exists.");
		return rename(src, dest, overwrite);
	}
	function rename(src, dest, overwrite) {
		try {
			fs$14.renameSync(src, dest);
		} catch (err) {
			if (err.code !== "EXDEV") throw err;
			return moveAcrossDevice(src, dest, overwrite);
		}
	}
	function moveAcrossDevice(src, dest, overwrite) {
		const opts = {
			overwrite,
			errorOnExist: true,
			preserveTimestamps: true
		};
		copySync(src, dest, opts);
		return removeSync(src);
	}
	module.exports = moveSync;
} });

//#endregion
//#region ../node_modules/fs-extra/lib/move/index.js
var require_move = __commonJS$1({ "../node_modules/fs-extra/lib/move/index.js"(exports, module) {
	const u$1 = require_universalify().fromPromise;
	module.exports = {
		move: u$1(require_move$1()),
		moveSync: require_move_sync()
	};
} });

//#endregion
//#region ../node_modules/fs-extra/lib/index.js
var require_lib = __commonJS$1({ "../node_modules/fs-extra/lib/index.js"(exports, module) {
	module.exports = {
		...require_fs$4(),
		...require_copy(),
		...require_empty(),
		...require_ensure(),
		...require_json(),
		...require_mkdirs(),
		...require_move(),
		...require_output_file(),
		...require_path_exists(),
		...require_remove()
	};
} });

//#endregion
//#region bin/errors.ts
var import_picocolors$1 = __toESM$1(require_picocolors(), 1);
function throwWithContext(error, context) {
	const errorMsg = error instanceof Error ? error.message : String(error);
	M.error(import_picocolors$1.default.red(`❌ ${context}`));
	M.error(import_picocolors$1.default.gray(`   ${errorMsg}`));
	throw new Error(`${context}: ${errorMsg}`, { cause: error instanceof Error ? error : new Error(String(error)) });
}

//#endregion
//#region ../node_modules/is-plain-obj/index.js
function isPlainObject(value) {
	if (typeof value !== "object" || value === null) return false;
	const prototype = Object.getPrototypeOf(value);
	return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}

//#endregion
//#region ../node_modules/execa/lib/arguments/file-url.js
const safeNormalizeFileUrl = (file, name) => {
	const fileString = normalizeFileUrl(normalizeDenoExecPath(file));
	if (typeof fileString !== "string") throw new TypeError(`${name} must be a string or a file URL: ${fileString}.`);
	return fileString;
};
const normalizeDenoExecPath = (file) => isDenoExecPath(file) ? file.toString() : file;
const isDenoExecPath = (file) => typeof file !== "string" && file && Object.getPrototypeOf(file) === String.prototype;
const normalizeFileUrl = (file) => file instanceof URL ? fileURLToPath(file) : file;

//#endregion
//#region ../node_modules/execa/lib/methods/parameters.js
const normalizeParameters = (rawFile, rawArguments = [], rawOptions = {}) => {
	const filePath = safeNormalizeFileUrl(rawFile, "First argument");
	const [commandArguments, options] = isPlainObject(rawArguments) ? [[], rawArguments] : [rawArguments, rawOptions];
	if (!Array.isArray(commandArguments)) throw new TypeError(`Second argument must be either an array of arguments or an options object: ${commandArguments}`);
	if (commandArguments.some((commandArgument) => typeof commandArgument === "object" && commandArgument !== null)) throw new TypeError(`Second argument must be an array of strings: ${commandArguments}`);
	const normalizedArguments = commandArguments.map(String);
	const nullByteArgument = normalizedArguments.find((normalizedArgument) => normalizedArgument.includes("\0"));
	if (nullByteArgument !== void 0) throw new TypeError(`Arguments cannot contain null bytes ("\\0"): ${nullByteArgument}`);
	if (!isPlainObject(options)) throw new TypeError(`Last argument must be an options object: ${options}`);
	return [
		filePath,
		normalizedArguments,
		options
	];
};

//#endregion
//#region ../node_modules/execa/lib/utils/uint-array.js
const { toString: objectToString$1 } = Object.prototype;
const isArrayBuffer = (value) => objectToString$1.call(value) === "[object ArrayBuffer]";
const isUint8Array = (value) => objectToString$1.call(value) === "[object Uint8Array]";
const bufferToUint8Array = (buffer) => new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
const textEncoder$1 = new TextEncoder();
const stringToUint8Array = (string$1) => textEncoder$1.encode(string$1);
const textDecoder = new TextDecoder();
const uint8ArrayToString = (uint8Array) => textDecoder.decode(uint8Array);
const joinToString = (uint8ArraysOrStrings, encoding) => {
	const strings = uint8ArraysToStrings(uint8ArraysOrStrings, encoding);
	return strings.join("");
};
const uint8ArraysToStrings = (uint8ArraysOrStrings, encoding) => {
	if (encoding === "utf8" && uint8ArraysOrStrings.every((uint8ArrayOrString) => typeof uint8ArrayOrString === "string")) return uint8ArraysOrStrings;
	const decoder = new StringDecoder(encoding);
	const strings = uint8ArraysOrStrings.map((uint8ArrayOrString) => typeof uint8ArrayOrString === "string" ? stringToUint8Array(uint8ArrayOrString) : uint8ArrayOrString).map((uint8Array) => decoder.write(uint8Array));
	const finalString = decoder.end();
	return finalString === "" ? strings : [...strings, finalString];
};
const joinToUint8Array = (uint8ArraysOrStrings) => {
	if (uint8ArraysOrStrings.length === 1 && isUint8Array(uint8ArraysOrStrings[0])) return uint8ArraysOrStrings[0];
	return concatUint8Arrays(stringsToUint8Arrays(uint8ArraysOrStrings));
};
const stringsToUint8Arrays = (uint8ArraysOrStrings) => uint8ArraysOrStrings.map((uint8ArrayOrString) => typeof uint8ArrayOrString === "string" ? stringToUint8Array(uint8ArrayOrString) : uint8ArrayOrString);
const concatUint8Arrays = (uint8Arrays) => {
	const result = new Uint8Array(getJoinLength(uint8Arrays));
	let index = 0;
	for (const uint8Array of uint8Arrays) {
		result.set(uint8Array, index);
		index += uint8Array.length;
	}
	return result;
};
const getJoinLength = (uint8Arrays) => {
	let joinLength = 0;
	for (const uint8Array of uint8Arrays) joinLength += uint8Array.length;
	return joinLength;
};

//#endregion
//#region ../node_modules/execa/lib/methods/template.js
const isTemplateString = (templates) => Array.isArray(templates) && Array.isArray(templates.raw);
const parseTemplates = (templates, expressions) => {
	let tokens = [];
	for (const [index, template] of templates.entries()) tokens = parseTemplate({
		templates,
		expressions,
		tokens,
		index,
		template
	});
	if (tokens.length === 0) throw new TypeError("Template script must not be empty");
	const [file, ...commandArguments] = tokens;
	return [
		file,
		commandArguments,
		{}
	];
};
const parseTemplate = ({ templates, expressions, tokens, index, template }) => {
	if (template === void 0) throw new TypeError(`Invalid backslash sequence: ${templates.raw[index]}`);
	const { nextTokens, leadingWhitespaces, trailingWhitespaces } = splitByWhitespaces(template, templates.raw[index]);
	const newTokens = concatTokens(tokens, nextTokens, leadingWhitespaces);
	if (index === expressions.length) return newTokens;
	const expression = expressions[index];
	const expressionTokens = Array.isArray(expression) ? expression.map((expression$1) => parseExpression(expression$1)) : [parseExpression(expression)];
	return concatTokens(newTokens, expressionTokens, trailingWhitespaces);
};
const splitByWhitespaces = (template, rawTemplate) => {
	if (rawTemplate.length === 0) return {
		nextTokens: [],
		leadingWhitespaces: false,
		trailingWhitespaces: false
	};
	const nextTokens = [];
	let templateStart = 0;
	const leadingWhitespaces = DELIMITERS.has(rawTemplate[0]);
	for (let templateIndex = 0, rawIndex = 0; templateIndex < template.length; templateIndex += 1, rawIndex += 1) {
		const rawCharacter = rawTemplate[rawIndex];
		if (DELIMITERS.has(rawCharacter)) {
			if (templateStart !== templateIndex) nextTokens.push(template.slice(templateStart, templateIndex));
			templateStart = templateIndex + 1;
		} else if (rawCharacter === "\\") {
			const nextRawCharacter = rawTemplate[rawIndex + 1];
			if (nextRawCharacter === "\n") {
				templateIndex -= 1;
				rawIndex += 1;
			} else if (nextRawCharacter === "u" && rawTemplate[rawIndex + 2] === "{") rawIndex = rawTemplate.indexOf("}", rawIndex + 3);
			else rawIndex += ESCAPE_LENGTH[nextRawCharacter] ?? 1;
		}
	}
	const trailingWhitespaces = templateStart === template.length;
	if (!trailingWhitespaces) nextTokens.push(template.slice(templateStart));
	return {
		nextTokens,
		leadingWhitespaces,
		trailingWhitespaces
	};
};
const DELIMITERS = new Set([
	" ",
	"	",
	"\r",
	"\n"
]);
const ESCAPE_LENGTH = {
	x: 3,
	u: 5
};
const concatTokens = (tokens, nextTokens, isSeparated) => isSeparated || tokens.length === 0 || nextTokens.length === 0 ? [...tokens, ...nextTokens] : [
	...tokens.slice(0, -1),
	`${tokens.at(-1)}${nextTokens[0]}`,
	...nextTokens.slice(1)
];
const parseExpression = (expression) => {
	const typeOfExpression = typeof expression;
	if (typeOfExpression === "string") return expression;
	if (typeOfExpression === "number") return String(expression);
	if (isPlainObject(expression) && ("stdout" in expression || "isMaxBuffer" in expression)) return getSubprocessResult(expression);
	if (expression instanceof ChildProcess || Object.prototype.toString.call(expression) === "[object Promise]") throw new TypeError("Unexpected subprocess in template expression. Please use ${await subprocess} instead of ${subprocess}.");
	throw new TypeError(`Unexpected "${typeOfExpression}" in template expression`);
};
const getSubprocessResult = ({ stdout: stdout$1 }) => {
	if (typeof stdout$1 === "string") return stdout$1;
	if (isUint8Array(stdout$1)) return uint8ArrayToString(stdout$1);
	if (stdout$1 === void 0) throw new TypeError("Missing result.stdout in template expression. This is probably due to the previous subprocess' \"stdout\" option.");
	throw new TypeError(`Unexpected "${typeof stdout$1}" stdout in template expression`);
};

//#endregion
//#region ../node_modules/execa/lib/utils/standard-stream.js
const isStandardStream = (stream$1) => STANDARD_STREAMS.includes(stream$1);
const STANDARD_STREAMS = [
	y.stdin,
	y.stdout,
	y.stderr
];
const STANDARD_STREAMS_ALIASES = [
	"stdin",
	"stdout",
	"stderr"
];
const getStreamName = (fdNumber) => STANDARD_STREAMS_ALIASES[fdNumber] ?? `stdio[${fdNumber}]`;

//#endregion
//#region ../node_modules/execa/lib/arguments/specific.js
const normalizeFdSpecificOptions = (options) => {
	const optionsCopy = { ...options };
	for (const optionName of FD_SPECIFIC_OPTIONS) optionsCopy[optionName] = normalizeFdSpecificOption(options, optionName);
	return optionsCopy;
};
const normalizeFdSpecificOption = (options, optionName) => {
	const optionBaseArray = Array.from({ length: getStdioLength(options) + 1 });
	const optionArray = normalizeFdSpecificValue(options[optionName], optionBaseArray, optionName);
	return addDefaultValue$1(optionArray, optionName);
};
const getStdioLength = ({ stdio }) => Array.isArray(stdio) ? Math.max(stdio.length, STANDARD_STREAMS_ALIASES.length) : STANDARD_STREAMS_ALIASES.length;
const normalizeFdSpecificValue = (optionValue, optionArray, optionName) => isPlainObject(optionValue) ? normalizeOptionObject(optionValue, optionArray, optionName) : optionArray.fill(optionValue);
const normalizeOptionObject = (optionValue, optionArray, optionName) => {
	for (const fdName of Object.keys(optionValue).sort(compareFdName)) for (const fdNumber of parseFdName(fdName, optionName, optionArray)) optionArray[fdNumber] = optionValue[fdName];
	return optionArray;
};
const compareFdName = (fdNameA, fdNameB) => getFdNameOrder(fdNameA) < getFdNameOrder(fdNameB) ? 1 : -1;
const getFdNameOrder = (fdName) => {
	if (fdName === "stdout" || fdName === "stderr") return 0;
	return fdName === "all" ? 2 : 1;
};
const parseFdName = (fdName, optionName, optionArray) => {
	if (fdName === "ipc") return [optionArray.length - 1];
	const fdNumber = parseFd(fdName);
	if (fdNumber === void 0 || fdNumber === 0) throw new TypeError(`"${optionName}.${fdName}" is invalid.
It must be "${optionName}.stdout", "${optionName}.stderr", "${optionName}.all", "${optionName}.ipc", or "${optionName}.fd3", "${optionName}.fd4" (and so on).`);
	if (fdNumber >= optionArray.length) throw new TypeError(`"${optionName}.${fdName}" is invalid: that file descriptor does not exist.
Please set the "stdio" option to ensure that file descriptor exists.`);
	return fdNumber === "all" ? [1, 2] : [fdNumber];
};
const parseFd = (fdName) => {
	if (fdName === "all") return fdName;
	if (STANDARD_STREAMS_ALIASES.includes(fdName)) return STANDARD_STREAMS_ALIASES.indexOf(fdName);
	const regexpResult = FD_REGEXP.exec(fdName);
	if (regexpResult !== null) return Number(regexpResult[1]);
};
const FD_REGEXP = /^fd(\d+)$/;
const addDefaultValue$1 = (optionArray, optionName) => optionArray.map((optionValue) => optionValue === void 0 ? DEFAULT_OPTIONS[optionName] : optionValue);
const verboseDefault = debuglog("execa").enabled ? "full" : "none";
const DEFAULT_OPTIONS = {
	lines: false,
	buffer: true,
	maxBuffer: 1e3 * 1e3 * 100,
	verbose: verboseDefault,
	stripFinalNewline: true
};
const FD_SPECIFIC_OPTIONS = [
	"lines",
	"buffer",
	"maxBuffer",
	"verbose",
	"stripFinalNewline"
];
const getFdSpecificValue = (optionArray, fdNumber) => fdNumber === "ipc" ? optionArray.at(-1) : optionArray[fdNumber];

//#endregion
//#region ../node_modules/execa/lib/verbose/values.js
const isVerbose = ({ verbose }, fdNumber) => getFdVerbose(verbose, fdNumber) !== "none";
const isFullVerbose = ({ verbose }, fdNumber) => !["none", "short"].includes(getFdVerbose(verbose, fdNumber));
const getVerboseFunction = ({ verbose }, fdNumber) => {
	const fdVerbose = getFdVerbose(verbose, fdNumber);
	return isVerboseFunction(fdVerbose) ? fdVerbose : void 0;
};
const getFdVerbose = (verbose, fdNumber) => fdNumber === void 0 ? getFdGenericVerbose(verbose) : getFdSpecificValue(verbose, fdNumber);
const getFdGenericVerbose = (verbose) => verbose.find((fdVerbose) => isVerboseFunction(fdVerbose)) ?? VERBOSE_VALUES.findLast((fdVerbose) => verbose.includes(fdVerbose));
const isVerboseFunction = (fdVerbose) => typeof fdVerbose === "function";
const VERBOSE_VALUES = [
	"none",
	"short",
	"full"
];

//#endregion
//#region ../node_modules/execa/lib/arguments/escape.js
const joinCommand = (filePath, rawArguments) => {
	const fileAndArguments = [filePath, ...rawArguments];
	const command = fileAndArguments.join(" ");
	const escapedCommand = fileAndArguments.map((fileAndArgument) => quoteString(escapeControlCharacters(fileAndArgument))).join(" ");
	return {
		command,
		escapedCommand
	};
};
const escapeLines = (lines) => stripVTControlCharacters(lines).split("\n").map((line) => escapeControlCharacters(line)).join("\n");
const escapeControlCharacters = (line) => line.replaceAll(SPECIAL_CHAR_REGEXP, (character) => escapeControlCharacter(character));
const escapeControlCharacter = (character) => {
	const commonEscape = COMMON_ESCAPES[character];
	if (commonEscape !== void 0) return commonEscape;
	const codepoint = character.codePointAt(0);
	const codepointHex = codepoint.toString(16);
	return codepoint <= ASTRAL_START ? `\\u${codepointHex.padStart(4, "0")}` : `\\U${codepointHex}`;
};
const getSpecialCharRegExp = () => {
	try {
		return new RegExp("\\p{Separator}|\\p{Other}", "gu");
	} catch {
		return /[\s\u0000-\u001F\u007F-\u009F\u00AD]/g;
	}
};
const SPECIAL_CHAR_REGEXP = getSpecialCharRegExp();
const COMMON_ESCAPES = {
	" ": " ",
	"\b": "\\b",
	"\f": "\\f",
	"\n": "\\n",
	"\r": "\\r",
	"	": "\\t"
};
const ASTRAL_START = 65535;
const quoteString = (escapedArgument) => {
	if (NO_ESCAPE_REGEXP.test(escapedArgument)) return escapedArgument;
	return platform === "win32" ? `"${escapedArgument.replaceAll("\"", "\"\"")}"` : `'${escapedArgument.replaceAll("'", "'\\''")}'`;
};
const NO_ESCAPE_REGEXP = /^[\w./-]+$/;

//#endregion
//#region ../node_modules/is-unicode-supported/index.js
function isUnicodeSupported() {
	const { env: env$1 } = y;
	const { TERM, TERM_PROGRAM } = env$1;
	if (y.platform !== "win32") return TERM !== "linux";
	return Boolean(env$1.WT_SESSION) || Boolean(env$1.TERMINUS_SUBLIME) || env$1.ConEmuTask === "{cmd::Cmder}" || TERM_PROGRAM === "Terminus-Sublime" || TERM_PROGRAM === "vscode" || TERM === "xterm-256color" || TERM === "alacritty" || TERM === "rxvt-unicode" || TERM === "rxvt-unicode-256color" || env$1.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}

//#endregion
//#region ../node_modules/figures/index.js
const common$5 = {
	circleQuestionMark: "(?)",
	questionMarkPrefix: "(?)",
	square: "█",
	squareDarkShade: "▓",
	squareMediumShade: "▒",
	squareLightShade: "░",
	squareTop: "▀",
	squareBottom: "▄",
	squareLeft: "▌",
	squareRight: "▐",
	squareCenter: "■",
	bullet: "●",
	dot: "․",
	ellipsis: "…",
	pointerSmall: "›",
	triangleUp: "▲",
	triangleUpSmall: "▴",
	triangleDown: "▼",
	triangleDownSmall: "▾",
	triangleLeftSmall: "◂",
	triangleRightSmall: "▸",
	home: "⌂",
	heart: "♥",
	musicNote: "♪",
	musicNoteBeamed: "♫",
	arrowUp: "↑",
	arrowDown: "↓",
	arrowLeft: "←",
	arrowRight: "→",
	arrowLeftRight: "↔",
	arrowUpDown: "↕",
	almostEqual: "≈",
	notEqual: "≠",
	lessOrEqual: "≤",
	greaterOrEqual: "≥",
	identical: "≡",
	infinity: "∞",
	subscriptZero: "₀",
	subscriptOne: "₁",
	subscriptTwo: "₂",
	subscriptThree: "₃",
	subscriptFour: "₄",
	subscriptFive: "₅",
	subscriptSix: "₆",
	subscriptSeven: "₇",
	subscriptEight: "₈",
	subscriptNine: "₉",
	oneHalf: "½",
	oneThird: "⅓",
	oneQuarter: "¼",
	oneFifth: "⅕",
	oneSixth: "⅙",
	oneEighth: "⅛",
	twoThirds: "⅔",
	twoFifths: "⅖",
	threeQuarters: "¾",
	threeFifths: "⅗",
	threeEighths: "⅜",
	fourFifths: "⅘",
	fiveSixths: "⅚",
	fiveEighths: "⅝",
	sevenEighths: "⅞",
	line: "─",
	lineBold: "━",
	lineDouble: "═",
	lineDashed0: "┄",
	lineDashed1: "┅",
	lineDashed2: "┈",
	lineDashed3: "┉",
	lineDashed4: "╌",
	lineDashed5: "╍",
	lineDashed6: "╴",
	lineDashed7: "╶",
	lineDashed8: "╸",
	lineDashed9: "╺",
	lineDashed10: "╼",
	lineDashed11: "╾",
	lineDashed12: "−",
	lineDashed13: "–",
	lineDashed14: "‐",
	lineDashed15: "⁃",
	lineVertical: "│",
	lineVerticalBold: "┃",
	lineVerticalDouble: "║",
	lineVerticalDashed0: "┆",
	lineVerticalDashed1: "┇",
	lineVerticalDashed2: "┊",
	lineVerticalDashed3: "┋",
	lineVerticalDashed4: "╎",
	lineVerticalDashed5: "╏",
	lineVerticalDashed6: "╵",
	lineVerticalDashed7: "╷",
	lineVerticalDashed8: "╹",
	lineVerticalDashed9: "╻",
	lineVerticalDashed10: "╽",
	lineVerticalDashed11: "╿",
	lineDownLeft: "┐",
	lineDownLeftArc: "╮",
	lineDownBoldLeftBold: "┓",
	lineDownBoldLeft: "┒",
	lineDownLeftBold: "┑",
	lineDownDoubleLeftDouble: "╗",
	lineDownDoubleLeft: "╖",
	lineDownLeftDouble: "╕",
	lineDownRight: "┌",
	lineDownRightArc: "╭",
	lineDownBoldRightBold: "┏",
	lineDownBoldRight: "┎",
	lineDownRightBold: "┍",
	lineDownDoubleRightDouble: "╔",
	lineDownDoubleRight: "╓",
	lineDownRightDouble: "╒",
	lineUpLeft: "┘",
	lineUpLeftArc: "╯",
	lineUpBoldLeftBold: "┛",
	lineUpBoldLeft: "┚",
	lineUpLeftBold: "┙",
	lineUpDoubleLeftDouble: "╝",
	lineUpDoubleLeft: "╜",
	lineUpLeftDouble: "╛",
	lineUpRight: "└",
	lineUpRightArc: "╰",
	lineUpBoldRightBold: "┗",
	lineUpBoldRight: "┖",
	lineUpRightBold: "┕",
	lineUpDoubleRightDouble: "╚",
	lineUpDoubleRight: "╙",
	lineUpRightDouble: "╘",
	lineUpDownLeft: "┤",
	lineUpBoldDownBoldLeftBold: "┫",
	lineUpBoldDownBoldLeft: "┨",
	lineUpDownLeftBold: "┥",
	lineUpBoldDownLeftBold: "┩",
	lineUpDownBoldLeftBold: "┪",
	lineUpDownBoldLeft: "┧",
	lineUpBoldDownLeft: "┦",
	lineUpDoubleDownDoubleLeftDouble: "╣",
	lineUpDoubleDownDoubleLeft: "╢",
	lineUpDownLeftDouble: "╡",
	lineUpDownRight: "├",
	lineUpBoldDownBoldRightBold: "┣",
	lineUpBoldDownBoldRight: "┠",
	lineUpDownRightBold: "┝",
	lineUpBoldDownRightBold: "┡",
	lineUpDownBoldRightBold: "┢",
	lineUpDownBoldRight: "┟",
	lineUpBoldDownRight: "┞",
	lineUpDoubleDownDoubleRightDouble: "╠",
	lineUpDoubleDownDoubleRight: "╟",
	lineUpDownRightDouble: "╞",
	lineDownLeftRight: "┬",
	lineDownBoldLeftBoldRightBold: "┳",
	lineDownLeftBoldRightBold: "┯",
	lineDownBoldLeftRight: "┰",
	lineDownBoldLeftBoldRight: "┱",
	lineDownBoldLeftRightBold: "┲",
	lineDownLeftRightBold: "┮",
	lineDownLeftBoldRight: "┭",
	lineDownDoubleLeftDoubleRightDouble: "╦",
	lineDownDoubleLeftRight: "╥",
	lineDownLeftDoubleRightDouble: "╤",
	lineUpLeftRight: "┴",
	lineUpBoldLeftBoldRightBold: "┻",
	lineUpLeftBoldRightBold: "┷",
	lineUpBoldLeftRight: "┸",
	lineUpBoldLeftBoldRight: "┹",
	lineUpBoldLeftRightBold: "┺",
	lineUpLeftRightBold: "┶",
	lineUpLeftBoldRight: "┵",
	lineUpDoubleLeftDoubleRightDouble: "╩",
	lineUpDoubleLeftRight: "╨",
	lineUpLeftDoubleRightDouble: "╧",
	lineUpDownLeftRight: "┼",
	lineUpBoldDownBoldLeftBoldRightBold: "╋",
	lineUpDownBoldLeftBoldRightBold: "╈",
	lineUpBoldDownLeftBoldRightBold: "╇",
	lineUpBoldDownBoldLeftRightBold: "╊",
	lineUpBoldDownBoldLeftBoldRight: "╉",
	lineUpBoldDownLeftRight: "╀",
	lineUpDownBoldLeftRight: "╁",
	lineUpDownLeftBoldRight: "┽",
	lineUpDownLeftRightBold: "┾",
	lineUpBoldDownBoldLeftRight: "╂",
	lineUpDownLeftBoldRightBold: "┿",
	lineUpBoldDownLeftBoldRight: "╃",
	lineUpBoldDownLeftRightBold: "╄",
	lineUpDownBoldLeftBoldRight: "╅",
	lineUpDownBoldLeftRightBold: "╆",
	lineUpDoubleDownDoubleLeftDoubleRightDouble: "╬",
	lineUpDoubleDownDoubleLeftRight: "╫",
	lineUpDownLeftDoubleRightDouble: "╪",
	lineCross: "╳",
	lineBackslash: "╲",
	lineSlash: "╱"
};
const specialMainSymbols = {
	tick: "✔",
	info: "ℹ",
	warning: "⚠",
	cross: "✘",
	squareSmall: "◻",
	squareSmallFilled: "◼",
	circle: "◯",
	circleFilled: "◉",
	circleDotted: "◌",
	circleDouble: "◎",
	circleCircle: "ⓞ",
	circleCross: "ⓧ",
	circlePipe: "Ⓘ",
	radioOn: "◉",
	radioOff: "◯",
	checkboxOn: "☒",
	checkboxOff: "☐",
	checkboxCircleOn: "ⓧ",
	checkboxCircleOff: "Ⓘ",
	pointer: "❯",
	triangleUpOutline: "△",
	triangleLeft: "◀",
	triangleRight: "▶",
	lozenge: "◆",
	lozengeOutline: "◇",
	hamburger: "☰",
	smiley: "㋡",
	mustache: "෴",
	star: "★",
	play: "▶",
	nodejs: "⬢",
	oneSeventh: "⅐",
	oneNinth: "⅑",
	oneTenth: "⅒"
};
const specialFallbackSymbols = {
	tick: "√",
	info: "i",
	warning: "‼",
	cross: "×",
	squareSmall: "□",
	squareSmallFilled: "■",
	circle: "( )",
	circleFilled: "(*)",
	circleDotted: "( )",
	circleDouble: "( )",
	circleCircle: "(○)",
	circleCross: "(×)",
	circlePipe: "(│)",
	radioOn: "(*)",
	radioOff: "( )",
	checkboxOn: "[×]",
	checkboxOff: "[ ]",
	checkboxCircleOn: "(×)",
	checkboxCircleOff: "( )",
	pointer: ">",
	triangleUpOutline: "∆",
	triangleLeft: "◄",
	triangleRight: "►",
	lozenge: "♦",
	lozengeOutline: "◊",
	hamburger: "≡",
	smiley: "☺",
	mustache: "┌─┐",
	star: "✶",
	play: "►",
	nodejs: "♦",
	oneSeventh: "1/7",
	oneNinth: "1/9",
	oneTenth: "1/10"
};
const mainSymbols = {
	...common$5,
	...specialMainSymbols
};
const fallbackSymbols = {
	...common$5,
	...specialFallbackSymbols
};
const shouldUseMain = isUnicodeSupported();
const figures = shouldUseMain ? mainSymbols : fallbackSymbols;
var figures_default = figures;
const replacements = Object.entries(specialMainSymbols);

//#endregion
//#region ../node_modules/yoctocolors/base.js
const hasColors = tty?.WriteStream?.prototype?.hasColors?.() ?? false;
const format = (open, close) => {
	if (!hasColors) return (input) => input;
	const openCode = `\u001B[${open}m`;
	const closeCode = `\u001B[${close}m`;
	return (input) => {
		const string$1 = input + "";
		let index = string$1.indexOf(closeCode);
		if (index === -1) return openCode + string$1 + closeCode;
		let result = openCode;
		let lastIndex = 0;
		while (index !== -1) {
			result += string$1.slice(lastIndex, index) + openCode;
			lastIndex = index + closeCode.length;
			index = string$1.indexOf(closeCode, lastIndex);
		}
		result += string$1.slice(lastIndex) + closeCode;
		return result;
	};
};
const reset = format(0, 0);
const bold = format(1, 22);
const dim = format(2, 22);
const italic = format(3, 23);
const underline = format(4, 24);
const overline = format(53, 55);
const inverse = format(7, 27);
const hidden = format(8, 28);
const strikethrough = format(9, 29);
const black = format(30, 39);
const red = format(31, 39);
const green = format(32, 39);
const yellow = format(33, 39);
const blue = format(34, 39);
const magenta = format(35, 39);
const cyan = format(36, 39);
const white = format(37, 39);
const gray = format(90, 39);
const bgBlack = format(40, 49);
const bgRed = format(41, 49);
const bgGreen = format(42, 49);
const bgYellow = format(43, 49);
const bgBlue = format(44, 49);
const bgMagenta = format(45, 49);
const bgCyan = format(46, 49);
const bgWhite = format(47, 49);
const bgGray = format(100, 49);
const redBright = format(91, 39);
const greenBright = format(92, 39);
const yellowBright = format(93, 39);
const blueBright = format(94, 39);
const magentaBright = format(95, 39);
const cyanBright = format(96, 39);
const whiteBright = format(97, 39);
const bgRedBright = format(101, 49);
const bgGreenBright = format(102, 49);
const bgYellowBright = format(103, 49);
const bgBlueBright = format(104, 49);
const bgMagentaBright = format(105, 49);
const bgCyanBright = format(106, 49);
const bgWhiteBright = format(107, 49);

//#endregion
//#region ../node_modules/execa/lib/verbose/default.js
const defaultVerboseFunction = ({ type, message, timestamp, piped, commandId, result: { failed = false } = {}, options: { reject = true } }) => {
	const timestampString = serializeTimestamp(timestamp);
	const icon = ICONS[type]({
		failed,
		reject,
		piped
	});
	const color = COLORS[type]({ reject });
	return `${gray(`[${timestampString}]`)} ${gray(`[${commandId}]`)} ${color(icon)} ${color(message)}`;
};
const serializeTimestamp = (timestamp) => `${padField(timestamp.getHours(), 2)}:${padField(timestamp.getMinutes(), 2)}:${padField(timestamp.getSeconds(), 2)}.${padField(timestamp.getMilliseconds(), 3)}`;
const padField = (field, padding) => String(field).padStart(padding, "0");
const getFinalIcon = ({ failed, reject }) => {
	if (!failed) return figures_default.tick;
	return reject ? figures_default.cross : figures_default.warning;
};
const ICONS = {
	command: ({ piped }) => piped ? "|" : "$",
	output: () => " ",
	ipc: () => "*",
	error: getFinalIcon,
	duration: getFinalIcon
};
const identity$1 = (string$1) => string$1;
const COLORS = {
	command: () => bold,
	output: () => identity$1,
	ipc: () => identity$1,
	error: ({ reject }) => reject ? redBright : yellowBright,
	duration: () => gray
};

//#endregion
//#region ../node_modules/execa/lib/verbose/custom.js
const applyVerboseOnLines = (printedLines, verboseInfo, fdNumber) => {
	const verboseFunction = getVerboseFunction(verboseInfo, fdNumber);
	return printedLines.map(({ verboseLine, verboseObject }) => applyVerboseFunction(verboseLine, verboseObject, verboseFunction)).filter((printedLine) => printedLine !== void 0).map((printedLine) => appendNewline(printedLine)).join("");
};
const applyVerboseFunction = (verboseLine, verboseObject, verboseFunction) => {
	if (verboseFunction === void 0) return verboseLine;
	const printedLine = verboseFunction(verboseLine, verboseObject);
	if (typeof printedLine === "string") return printedLine;
};
const appendNewline = (printedLine) => printedLine.endsWith("\n") ? printedLine : `${printedLine}\n`;

//#endregion
//#region ../node_modules/execa/lib/verbose/log.js
const verboseLog = ({ type, verboseMessage, fdNumber, verboseInfo, result }) => {
	const verboseObject = getVerboseObject({
		type,
		result,
		verboseInfo
	});
	const printedLines = getPrintedLines(verboseMessage, verboseObject);
	const finalLines = applyVerboseOnLines(printedLines, verboseInfo, fdNumber);
	if (finalLines !== "") console.warn(finalLines.slice(0, -1));
};
const getVerboseObject = ({ type, result, verboseInfo: { escapedCommand, commandId, rawOptions: { piped = false,...options } } }) => ({
	type,
	escapedCommand,
	commandId: `${commandId}`,
	timestamp: new Date(),
	piped,
	result,
	options
});
const getPrintedLines = (verboseMessage, verboseObject) => verboseMessage.split("\n").map((message) => getPrintedLine({
	...verboseObject,
	message
}));
const getPrintedLine = (verboseObject) => {
	const verboseLine = defaultVerboseFunction(verboseObject);
	return {
		verboseLine,
		verboseObject
	};
};
const serializeVerboseMessage = (message) => {
	const messageString = typeof message === "string" ? message : inspect(message);
	const escapedMessage = escapeLines(messageString);
	return escapedMessage.replaceAll("	", " ".repeat(TAB_SIZE));
};
const TAB_SIZE = 2;

//#endregion
//#region ../node_modules/execa/lib/verbose/start.js
const logCommand = (escapedCommand, verboseInfo) => {
	if (!isVerbose(verboseInfo)) return;
	verboseLog({
		type: "command",
		verboseMessage: escapedCommand,
		verboseInfo
	});
};

//#endregion
//#region ../node_modules/execa/lib/verbose/info.js
const getVerboseInfo = (verbose, escapedCommand, rawOptions) => {
	validateVerbose(verbose);
	const commandId = getCommandId(verbose);
	return {
		verbose,
		escapedCommand,
		commandId,
		rawOptions
	};
};
const getCommandId = (verbose) => isVerbose({ verbose }) ? COMMAND_ID++ : void 0;
let COMMAND_ID = 0n;
const validateVerbose = (verbose) => {
	for (const fdVerbose of verbose) {
		if (fdVerbose === false) throw new TypeError("The \"verbose: false\" option was renamed to \"verbose: 'none'\".");
		if (fdVerbose === true) throw new TypeError("The \"verbose: true\" option was renamed to \"verbose: 'short'\".");
		if (!VERBOSE_VALUES.includes(fdVerbose) && !isVerboseFunction(fdVerbose)) {
			const allowedValues = VERBOSE_VALUES.map((allowedValue) => `'${allowedValue}'`).join(", ");
			throw new TypeError(`The "verbose" option must not be ${fdVerbose}. Allowed values are: ${allowedValues} or a function.`);
		}
	}
};

//#endregion
//#region ../node_modules/execa/lib/return/duration.js
const getStartTime = () => hrtime.bigint();
const getDurationMs = (startTime) => Number(hrtime.bigint() - startTime) / 1e6;

//#endregion
//#region ../node_modules/execa/lib/arguments/command.js
const handleCommand = (filePath, rawArguments, rawOptions) => {
	const startTime = getStartTime();
	const { command, escapedCommand } = joinCommand(filePath, rawArguments);
	const verbose = normalizeFdSpecificOption(rawOptions, "verbose");
	const verboseInfo = getVerboseInfo(verbose, escapedCommand, { ...rawOptions });
	logCommand(escapedCommand, verboseInfo);
	return {
		command,
		escapedCommand,
		startTime,
		verboseInfo
	};
};

//#endregion
//#region ../node_modules/cross-spawn/node_modules/which/node_modules/isexe/windows.js
var require_windows = __commonJS$1({ "../node_modules/cross-spawn/node_modules/which/node_modules/isexe/windows.js"(exports, module) {
	module.exports = isexe$3;
	isexe$3.sync = sync$4;
	var fs$13 = __require("fs");
	function checkPathExt(path$28, options) {
		var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
		if (!pathext) return true;
		pathext = pathext.split(";");
		if (pathext.indexOf("") !== -1) return true;
		for (var i$1 = 0; i$1 < pathext.length; i$1++) {
			var p$2 = pathext[i$1].toLowerCase();
			if (p$2 && path$28.substr(-p$2.length).toLowerCase() === p$2) return true;
		}
		return false;
	}
	function checkStat$1(stat$5, path$28, options) {
		if (!stat$5.isSymbolicLink() && !stat$5.isFile()) return false;
		return checkPathExt(path$28, options);
	}
	function isexe$3(path$28, options, cb) {
		fs$13.stat(path$28, function(er, stat$5) {
			cb(er, er ? false : checkStat$1(stat$5, path$28, options));
		});
	}
	function sync$4(path$28, options) {
		return checkStat$1(fs$13.statSync(path$28), path$28, options);
	}
} });

//#endregion
//#region ../node_modules/cross-spawn/node_modules/which/node_modules/isexe/mode.js
var require_mode = __commonJS$1({ "../node_modules/cross-spawn/node_modules/which/node_modules/isexe/mode.js"(exports, module) {
	module.exports = isexe$2;
	isexe$2.sync = sync$3;
	var fs$12 = __require("fs");
	function isexe$2(path$28, options, cb) {
		fs$12.stat(path$28, function(er, stat$5) {
			cb(er, er ? false : checkStat(stat$5, options));
		});
	}
	function sync$3(path$28, options) {
		return checkStat(fs$12.statSync(path$28), options);
	}
	function checkStat(stat$5, options) {
		return stat$5.isFile() && checkMode(stat$5, options);
	}
	function checkMode(stat$5, options) {
		var mod = stat$5.mode;
		var uid = stat$5.uid;
		var gid = stat$5.gid;
		var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
		var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
		var u$18 = parseInt("100", 8);
		var g$1 = parseInt("010", 8);
		var o$2 = parseInt("001", 8);
		var ug = u$18 | g$1;
		var ret = mod & o$2 || mod & g$1 && gid === myGid || mod & u$18 && uid === myUid || mod & ug && myUid === 0;
		return ret;
	}
} });

//#endregion
//#region ../node_modules/cross-spawn/node_modules/which/node_modules/isexe/index.js
var require_isexe = __commonJS$1({ "../node_modules/cross-spawn/node_modules/which/node_modules/isexe/index.js"(exports, module) {
	var fs$11 = __require("fs");
	var core;
	if (process.platform === "win32" || global.TESTING_WINDOWS) core = require_windows();
	else core = require_mode();
	module.exports = isexe$1;
	isexe$1.sync = sync$2;
	function isexe$1(path$28, options, cb) {
		if (typeof options === "function") {
			cb = options;
			options = {};
		}
		if (!cb) {
			if (typeof Promise !== "function") throw new TypeError("callback not provided");
			return new Promise(function(resolve$1, reject) {
				isexe$1(path$28, options || {}, function(er, is) {
					if (er) reject(er);
					else resolve$1(is);
				});
			});
		}
		core(path$28, options || {}, function(er, is) {
			if (er) {
				if (er.code === "EACCES" || options && options.ignoreErrors) {
					er = null;
					is = false;
				}
			}
			cb(er, is);
		});
	}
	function sync$2(path$28, options) {
		try {
			return core.sync(path$28, options || {});
		} catch (er) {
			if (options && options.ignoreErrors || er.code === "EACCES") return false;
			else throw er;
		}
	}
} });

//#endregion
//#region ../node_modules/cross-spawn/node_modules/which/which.js
var require_which = __commonJS$1({ "../node_modules/cross-spawn/node_modules/which/which.js"(exports, module) {
	const isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
	const path$14 = __require("path");
	const COLON = isWindows ? ";" : ":";
	const isexe = require_isexe();
	const getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
	const getPathInfo = (cmd, opt) => {
		const colon = opt.colon || COLON;
		const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [""] : [...isWindows ? [process.cwd()] : [], ...(opt.path || process.env.PATH || "").split(colon)];
		const pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
		const pathExt = isWindows ? pathExtExe.split(colon) : [""];
		if (isWindows) {
			if (cmd.indexOf(".") !== -1 && pathExt[0] !== "") pathExt.unshift("");
		}
		return {
			pathEnv,
			pathExt,
			pathExtExe
		};
	};
	const which$1 = (cmd, opt, cb) => {
		if (typeof opt === "function") {
			cb = opt;
			opt = {};
		}
		if (!opt) opt = {};
		const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
		const found = [];
		const step = (i$1) => new Promise((resolve$1, reject) => {
			if (i$1 === pathEnv.length) return opt.all && found.length ? resolve$1(found) : reject(getNotFoundError(cmd));
			const ppRaw = pathEnv[i$1];
			const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
			const pCmd = path$14.join(pathPart, cmd);
			const p$2 = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
			resolve$1(subStep(p$2, i$1, 0));
		});
		const subStep = (p$2, i$1, ii) => new Promise((resolve$1, reject) => {
			if (ii === pathExt.length) return resolve$1(step(i$1 + 1));
			const ext = pathExt[ii];
			isexe(p$2 + ext, { pathExt: pathExtExe }, (er, is) => {
				if (!er && is) if (opt.all) found.push(p$2 + ext);
				else return resolve$1(p$2 + ext);
				return resolve$1(subStep(p$2, i$1, ii + 1));
			});
		});
		return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
	};
	const whichSync = (cmd, opt) => {
		opt = opt || {};
		const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
		const found = [];
		for (let i$1 = 0; i$1 < pathEnv.length; i$1++) {
			const ppRaw = pathEnv[i$1];
			const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
			const pCmd = path$14.join(pathPart, cmd);
			const p$2 = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
			for (let j = 0; j < pathExt.length; j++) {
				const cur = p$2 + pathExt[j];
				try {
					const is = isexe.sync(cur, { pathExt: pathExtExe });
					if (is) if (opt.all) found.push(cur);
					else return cur;
				} catch (ex) {}
			}
		}
		if (opt.all && found.length) return found;
		if (opt.nothrow) return null;
		throw getNotFoundError(cmd);
	};
	module.exports = which$1;
	which$1.sync = whichSync;
} });

//#endregion
//#region ../node_modules/path-key/index.js
var require_path_key = __commonJS$1({ "../node_modules/path-key/index.js"(exports, module) {
	const pathKey$1 = (options = {}) => {
		const environment = options.env || process.env;
		const platform$2 = options.platform || process.platform;
		if (platform$2 !== "win32") return "PATH";
		return Object.keys(environment).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
	};
	module.exports = pathKey$1;
	module.exports.default = pathKey$1;
} });

//#endregion
//#region ../node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = __commonJS$1({ "../node_modules/cross-spawn/lib/util/resolveCommand.js"(exports, module) {
	const path$13 = __require("path");
	const which = require_which();
	const getPathKey = require_path_key();
	function resolveCommandAttempt(parsed, withoutPathExt) {
		const env$1 = parsed.options.env || process.env;
		const cwd$1 = process.cwd();
		const hasCustomCwd = parsed.options.cwd != null;
		const shouldSwitchCwd = hasCustomCwd && process.chdir !== void 0 && !process.chdir.disabled;
		if (shouldSwitchCwd) try {
			process.chdir(parsed.options.cwd);
		} catch (err) {}
		let resolved;
		try {
			resolved = which.sync(parsed.command, {
				path: env$1[getPathKey({ env: env$1 })],
				pathExt: withoutPathExt ? path$13.delimiter : void 0
			});
		} catch (e$1) {} finally {
			if (shouldSwitchCwd) process.chdir(cwd$1);
		}
		if (resolved) resolved = path$13.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
		return resolved;
	}
	function resolveCommand$1(parsed) {
		return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
	}
	module.exports = resolveCommand$1;
} });

//#endregion
//#region ../node_modules/cross-spawn/lib/util/escape.js
var require_escape = __commonJS$1({ "../node_modules/cross-spawn/lib/util/escape.js"(exports, module) {
	const metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
	function escapeCommand(arg) {
		arg = arg.replace(metaCharsRegExp, "^$1");
		return arg;
	}
	function escapeArgument(arg, doubleEscapeMetaChars) {
		arg = `${arg}`;
		arg = arg.replace(/(?=(\\+?)?)\1"/g, "$1$1\\\"");
		arg = arg.replace(/(?=(\\+?)?)\1$/, "$1$1");
		arg = `"${arg}"`;
		arg = arg.replace(metaCharsRegExp, "^$1");
		if (doubleEscapeMetaChars) arg = arg.replace(metaCharsRegExp, "^$1");
		return arg;
	}
	module.exports.command = escapeCommand;
	module.exports.argument = escapeArgument;
} });

//#endregion
//#region ../node_modules/shebang-regex/index.js
var require_shebang_regex = __commonJS$1({ "../node_modules/shebang-regex/index.js"(exports, module) {
	module.exports = /^#!(.*)/;
} });

//#endregion
//#region ../node_modules/shebang-command/index.js
var require_shebang_command = __commonJS$1({ "../node_modules/shebang-command/index.js"(exports, module) {
	const shebangRegex = require_shebang_regex();
	module.exports = (string$1 = "") => {
		const match = string$1.match(shebangRegex);
		if (!match) return null;
		const [path$28, argument] = match[0].replace(/#! ?/, "").split(" ");
		const binary = path$28.split("/").pop();
		if (binary === "env") return argument;
		return argument ? `${binary} ${argument}` : binary;
	};
} });

//#endregion
//#region ../node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = __commonJS$1({ "../node_modules/cross-spawn/lib/util/readShebang.js"(exports, module) {
	const fs$10 = __require("fs");
	const shebangCommand = require_shebang_command();
	function readShebang$1(command) {
		const size = 150;
		const buffer = Buffer.alloc(size);
		let fd;
		try {
			fd = fs$10.openSync(command, "r");
			fs$10.readSync(fd, buffer, 0, size, 0);
			fs$10.closeSync(fd);
		} catch (e$1) {}
		return shebangCommand(buffer.toString());
	}
	module.exports = readShebang$1;
} });

//#endregion
//#region ../node_modules/cross-spawn/lib/parse.js
var require_parse$2 = __commonJS$1({ "../node_modules/cross-spawn/lib/parse.js"(exports, module) {
	const path$12 = __require("path");
	const resolveCommand = require_resolveCommand();
	const escape = require_escape();
	const readShebang = require_readShebang();
	const isWin$1 = process.platform === "win32";
	const isExecutableRegExp = /\.(?:com|exe)$/i;
	const isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
	function detectShebang(parsed) {
		parsed.file = resolveCommand(parsed);
		const shebang = parsed.file && readShebang(parsed.file);
		if (shebang) {
			parsed.args.unshift(parsed.file);
			parsed.command = shebang;
			return resolveCommand(parsed);
		}
		return parsed.file;
	}
	function parseNonShell(parsed) {
		if (!isWin$1) return parsed;
		const commandFile = detectShebang(parsed);
		const needsShell = !isExecutableRegExp.test(commandFile);
		if (parsed.options.forceShell || needsShell) {
			const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
			parsed.command = path$12.normalize(parsed.command);
			parsed.command = escape.command(parsed.command);
			parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
			const shellCommand = [parsed.command].concat(parsed.args).join(" ");
			parsed.args = [
				"/d",
				"/s",
				"/c",
				`"${shellCommand}"`
			];
			parsed.command = process.env.comspec || "cmd.exe";
			parsed.options.windowsVerbatimArguments = true;
		}
		return parsed;
	}
	function parse$5(command, args, options) {
		if (args && !Array.isArray(args)) {
			options = args;
			args = null;
		}
		args = args ? args.slice(0) : [];
		options = Object.assign({}, options);
		const parsed = {
			command,
			args,
			options,
			file: void 0,
			original: {
				command,
				args
			}
		};
		return options.shell ? parsed : parseNonShell(parsed);
	}
	module.exports = parse$5;
} });

//#endregion
//#region ../node_modules/cross-spawn/lib/enoent.js
var require_enoent = __commonJS$1({ "../node_modules/cross-spawn/lib/enoent.js"(exports, module) {
	const isWin = process.platform === "win32";
	function notFoundError(original, syscall) {
		return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
			code: "ENOENT",
			errno: "ENOENT",
			syscall: `${syscall} ${original.command}`,
			path: original.command,
			spawnargs: original.args
		});
	}
	function hookChildProcess(cp$1, parsed) {
		if (!isWin) return;
		const originalEmit = cp$1.emit;
		cp$1.emit = function(name, arg1) {
			if (name === "exit") {
				const err = verifyENOENT(arg1, parsed);
				if (err) return originalEmit.call(cp$1, "error", err);
			}
			return originalEmit.apply(cp$1, arguments);
		};
	}
	function verifyENOENT(status, parsed) {
		if (isWin && status === 1 && !parsed.file) return notFoundError(parsed.original, "spawn");
		return null;
	}
	function verifyENOENTSync(status, parsed) {
		if (isWin && status === 1 && !parsed.file) return notFoundError(parsed.original, "spawnSync");
		return null;
	}
	module.exports = {
		hookChildProcess,
		verifyENOENT,
		verifyENOENTSync,
		notFoundError
	};
} });

//#endregion
//#region ../node_modules/cross-spawn/index.js
var require_cross_spawn = __commonJS$1({ "../node_modules/cross-spawn/index.js"(exports, module) {
	const cp = __require("child_process");
	const parse$4 = require_parse$2();
	const enoent = require_enoent();
	function spawn$1(command, args, options) {
		const parsed = parse$4(command, args, options);
		const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
		enoent.hookChildProcess(spawned, parsed);
		return spawned;
	}
	function spawnSync$1(command, args, options) {
		const parsed = parse$4(command, args, options);
		const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
		result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
		return result;
	}
	module.exports = spawn$1;
	module.exports.spawn = spawn$1;
	module.exports.sync = spawnSync$1;
	module.exports._parse = parse$4;
	module.exports._enoent = enoent;
} });

//#endregion
//#region ../node_modules/npm-run-path/node_modules/path-key/index.js
function pathKey(options = {}) {
	const { env: env$1 = process.env, platform: platform$2 = process.platform } = options;
	if (platform$2 !== "win32") return "PATH";
	return Object.keys(env$1).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
}

//#endregion
//#region ../node_modules/unicorn-magic/node.js
const execFileOriginal = promisify(execFile);
function toPath(urlOrPath) {
	return urlOrPath instanceof URL ? fileURLToPath(urlOrPath) : urlOrPath;
}
function traversePathUp(startPath) {
	return { *[Symbol.iterator]() {
		let currentPath = path.resolve(toPath(startPath));
		let previousPath;
		while (previousPath !== currentPath) {
			yield currentPath;
			previousPath = currentPath;
			currentPath = path.resolve(currentPath, "..");
		}
	} };
}
const TEN_MEGABYTES_IN_BYTES = 10 * 1024 * 1024;

//#endregion
//#region ../node_modules/npm-run-path/index.js
const npmRunPath = ({ cwd: cwd$1 = y.cwd(), path: pathOption = y.env[pathKey()], preferLocal = true, execPath: execPath$1 = y.execPath, addExecPath = true } = {}) => {
	const cwdPath = path.resolve(toPath(cwd$1));
	const result = [];
	const pathParts = pathOption.split(path.delimiter);
	if (preferLocal) applyPreferLocal(result, pathParts, cwdPath);
	if (addExecPath) applyExecPath(result, pathParts, execPath$1, cwdPath);
	return pathOption === "" || pathOption === path.delimiter ? `${result.join(path.delimiter)}${pathOption}` : [...result, pathOption].join(path.delimiter);
};
const applyPreferLocal = (result, pathParts, cwdPath) => {
	for (const directory of traversePathUp(cwdPath)) {
		const pathPart = path.join(directory, "node_modules/.bin");
		if (!pathParts.includes(pathPart)) result.push(pathPart);
	}
};
const applyExecPath = (result, pathParts, execPath$1, cwdPath) => {
	const pathPart = path.resolve(cwdPath, toPath(execPath$1), "..");
	if (!pathParts.includes(pathPart)) result.push(pathPart);
};
const npmRunPathEnv = ({ env: env$1 = y.env,...options } = {}) => {
	env$1 = { ...env$1 };
	const pathName = pathKey({ env: env$1 });
	options.path = env$1[pathName];
	env$1[pathName] = npmRunPath(options);
	return env$1;
};

//#endregion
//#region ../node_modules/execa/lib/return/final-error.js
const getFinalError = (originalError, message, isSync) => {
	const ErrorClass = isSync ? ExecaSyncError : ExecaError;
	const options = originalError instanceof DiscardedError ? {} : { cause: originalError };
	return new ErrorClass(message, options);
};
var DiscardedError = class extends Error {};
const setErrorName = (ErrorClass, value) => {
	Object.defineProperty(ErrorClass.prototype, "name", {
		value,
		writable: true,
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(ErrorClass.prototype, execaErrorSymbol, {
		value: true,
		writable: false,
		enumerable: false,
		configurable: false
	});
};
const isExecaError = (error) => isErrorInstance(error) && execaErrorSymbol in error;
const execaErrorSymbol = Symbol("isExecaError");
const isErrorInstance = (value) => Object.prototype.toString.call(value) === "[object Error]";
var ExecaError = class extends Error {};
setErrorName(ExecaError, ExecaError.name);
var ExecaSyncError = class extends Error {};
setErrorName(ExecaSyncError, ExecaSyncError.name);

//#endregion
//#region ../node_modules/human-signals/build/src/realtime.js
const getRealtimeSignals = () => {
	const length = SIGRTMAX - SIGRTMIN + 1;
	return Array.from({ length }, getRealtimeSignal);
};
const getRealtimeSignal = (value, index) => ({
	name: `SIGRT${index + 1}`,
	number: SIGRTMIN + index,
	action: "terminate",
	description: "Application-specific signal (realtime)",
	standard: "posix"
});
const SIGRTMIN = 34;
const SIGRTMAX = 64;

//#endregion
//#region ../node_modules/human-signals/build/src/core.js
const SIGNALS = [
	{
		name: "SIGHUP",
		number: 1,
		action: "terminate",
		description: "Terminal closed",
		standard: "posix"
	},
	{
		name: "SIGINT",
		number: 2,
		action: "terminate",
		description: "User interruption with CTRL-C",
		standard: "ansi"
	},
	{
		name: "SIGQUIT",
		number: 3,
		action: "core",
		description: "User interruption with CTRL-\\",
		standard: "posix"
	},
	{
		name: "SIGILL",
		number: 4,
		action: "core",
		description: "Invalid machine instruction",
		standard: "ansi"
	},
	{
		name: "SIGTRAP",
		number: 5,
		action: "core",
		description: "Debugger breakpoint",
		standard: "posix"
	},
	{
		name: "SIGABRT",
		number: 6,
		action: "core",
		description: "Aborted",
		standard: "ansi"
	},
	{
		name: "SIGIOT",
		number: 6,
		action: "core",
		description: "Aborted",
		standard: "bsd"
	},
	{
		name: "SIGBUS",
		number: 7,
		action: "core",
		description: "Bus error due to misaligned, non-existing address or paging error",
		standard: "bsd"
	},
	{
		name: "SIGEMT",
		number: 7,
		action: "terminate",
		description: "Command should be emulated but is not implemented",
		standard: "other"
	},
	{
		name: "SIGFPE",
		number: 8,
		action: "core",
		description: "Floating point arithmetic error",
		standard: "ansi"
	},
	{
		name: "SIGKILL",
		number: 9,
		action: "terminate",
		description: "Forced termination",
		standard: "posix",
		forced: true
	},
	{
		name: "SIGUSR1",
		number: 10,
		action: "terminate",
		description: "Application-specific signal",
		standard: "posix"
	},
	{
		name: "SIGSEGV",
		number: 11,
		action: "core",
		description: "Segmentation fault",
		standard: "ansi"
	},
	{
		name: "SIGUSR2",
		number: 12,
		action: "terminate",
		description: "Application-specific signal",
		standard: "posix"
	},
	{
		name: "SIGPIPE",
		number: 13,
		action: "terminate",
		description: "Broken pipe or socket",
		standard: "posix"
	},
	{
		name: "SIGALRM",
		number: 14,
		action: "terminate",
		description: "Timeout or timer",
		standard: "posix"
	},
	{
		name: "SIGTERM",
		number: 15,
		action: "terminate",
		description: "Termination",
		standard: "ansi"
	},
	{
		name: "SIGSTKFLT",
		number: 16,
		action: "terminate",
		description: "Stack is empty or overflowed",
		standard: "other"
	},
	{
		name: "SIGCHLD",
		number: 17,
		action: "ignore",
		description: "Child process terminated, paused or unpaused",
		standard: "posix"
	},
	{
		name: "SIGCLD",
		number: 17,
		action: "ignore",
		description: "Child process terminated, paused or unpaused",
		standard: "other"
	},
	{
		name: "SIGCONT",
		number: 18,
		action: "unpause",
		description: "Unpaused",
		standard: "posix",
		forced: true
	},
	{
		name: "SIGSTOP",
		number: 19,
		action: "pause",
		description: "Paused",
		standard: "posix",
		forced: true
	},
	{
		name: "SIGTSTP",
		number: 20,
		action: "pause",
		description: "Paused using CTRL-Z or \"suspend\"",
		standard: "posix"
	},
	{
		name: "SIGTTIN",
		number: 21,
		action: "pause",
		description: "Background process cannot read terminal input",
		standard: "posix"
	},
	{
		name: "SIGBREAK",
		number: 21,
		action: "terminate",
		description: "User interruption with CTRL-BREAK",
		standard: "other"
	},
	{
		name: "SIGTTOU",
		number: 22,
		action: "pause",
		description: "Background process cannot write to terminal output",
		standard: "posix"
	},
	{
		name: "SIGURG",
		number: 23,
		action: "ignore",
		description: "Socket received out-of-band data",
		standard: "bsd"
	},
	{
		name: "SIGXCPU",
		number: 24,
		action: "core",
		description: "Process timed out",
		standard: "bsd"
	},
	{
		name: "SIGXFSZ",
		number: 25,
		action: "core",
		description: "File too big",
		standard: "bsd"
	},
	{
		name: "SIGVTALRM",
		number: 26,
		action: "terminate",
		description: "Timeout or timer",
		standard: "bsd"
	},
	{
		name: "SIGPROF",
		number: 27,
		action: "terminate",
		description: "Timeout or timer",
		standard: "bsd"
	},
	{
		name: "SIGWINCH",
		number: 28,
		action: "ignore",
		description: "Terminal window size changed",
		standard: "bsd"
	},
	{
		name: "SIGIO",
		number: 29,
		action: "terminate",
		description: "I/O is available",
		standard: "other"
	},
	{
		name: "SIGPOLL",
		number: 29,
		action: "terminate",
		description: "Watched event",
		standard: "other"
	},
	{
		name: "SIGINFO",
		number: 29,
		action: "ignore",
		description: "Request for process information",
		standard: "other"
	},
	{
		name: "SIGPWR",
		number: 30,
		action: "terminate",
		description: "Device running out of power",
		standard: "systemv"
	},
	{
		name: "SIGSYS",
		number: 31,
		action: "core",
		description: "Invalid system call",
		standard: "other"
	},
	{
		name: "SIGUNUSED",
		number: 31,
		action: "terminate",
		description: "Invalid system call",
		standard: "other"
	}
];

//#endregion
//#region ../node_modules/human-signals/build/src/signals.js
const getSignals = () => {
	const realtimeSignals = getRealtimeSignals();
	const signals$1 = [...SIGNALS, ...realtimeSignals].map(normalizeSignal$1);
	return signals$1;
};
const normalizeSignal$1 = ({ name, number: defaultNumber, description, action, forced = false, standard }) => {
	const { signals: { [name]: constantSignal } } = constants;
	const supported = constantSignal !== void 0;
	const number = supported ? constantSignal : defaultNumber;
	return {
		name,
		number,
		description,
		supported,
		action,
		forced,
		standard
	};
};

//#endregion
//#region ../node_modules/human-signals/build/src/main.js
const getSignalsByName = () => {
	const signals$1 = getSignals();
	return Object.fromEntries(signals$1.map(getSignalByName));
};
const getSignalByName = ({ name, number, description, supported, action, forced, standard }) => [name, {
	name,
	number,
	description,
	supported,
	action,
	forced,
	standard
}];
const signalsByName = getSignalsByName();
const getSignalsByNumber = () => {
	const signals$1 = getSignals();
	const length = SIGRTMAX + 1;
	const signalsA = Array.from({ length }, (value, number) => getSignalByNumber(number, signals$1));
	return Object.assign({}, ...signalsA);
};
const getSignalByNumber = (number, signals$1) => {
	const signal = findSignalByNumber(number, signals$1);
	if (signal === void 0) return {};
	const { name, description, supported, action, forced, standard } = signal;
	return { [number]: {
		name,
		number,
		description,
		supported,
		action,
		forced,
		standard
	} };
};
const findSignalByNumber = (number, signals$1) => {
	const signal = signals$1.find(({ name }) => constants.signals[name] === number);
	if (signal !== void 0) return signal;
	return signals$1.find((signalA) => signalA.number === number);
};
const signalsByNumber = getSignalsByNumber();

//#endregion
//#region ../node_modules/execa/lib/terminate/signal.js
const normalizeKillSignal = (killSignal) => {
	const optionName = "option `killSignal`";
	if (killSignal === 0) throw new TypeError(`Invalid ${optionName}: 0 cannot be used.`);
	return normalizeSignal(killSignal, optionName);
};
const normalizeSignalArgument = (signal) => signal === 0 ? signal : normalizeSignal(signal, "`subprocess.kill()`'s argument");
const normalizeSignal = (signalNameOrInteger, optionName) => {
	if (Number.isInteger(signalNameOrInteger)) return normalizeSignalInteger(signalNameOrInteger, optionName);
	if (typeof signalNameOrInteger === "string") return normalizeSignalName(signalNameOrInteger, optionName);
	throw new TypeError(`Invalid ${optionName} ${String(signalNameOrInteger)}: it must be a string or an integer.\n${getAvailableSignals()}`);
};
const normalizeSignalInteger = (signalInteger, optionName) => {
	if (signalsIntegerToName.has(signalInteger)) return signalsIntegerToName.get(signalInteger);
	throw new TypeError(`Invalid ${optionName} ${signalInteger}: this signal integer does not exist.\n${getAvailableSignals()}`);
};
const getSignalsIntegerToName = () => new Map(Object.entries(constants.signals).reverse().map(([signalName, signalInteger]) => [signalInteger, signalName]));
const signalsIntegerToName = getSignalsIntegerToName();
const normalizeSignalName = (signalName, optionName) => {
	if (signalName in constants.signals) return signalName;
	if (signalName.toUpperCase() in constants.signals) throw new TypeError(`Invalid ${optionName} '${signalName}': please rename it to '${signalName.toUpperCase()}'.`);
	throw new TypeError(`Invalid ${optionName} '${signalName}': this signal name does not exist.\n${getAvailableSignals()}`);
};
const getAvailableSignals = () => `Available signal names: ${getAvailableSignalNames()}.
Available signal numbers: ${getAvailableSignalIntegers()}.`;
const getAvailableSignalNames = () => Object.keys(constants.signals).sort().map((signalName) => `'${signalName}'`).join(", ");
const getAvailableSignalIntegers = () => [...new Set(Object.values(constants.signals).sort((signalInteger, signalIntegerTwo) => signalInteger - signalIntegerTwo))].join(", ");
const getSignalDescription = (signal) => signalsByName[signal].description;

//#endregion
//#region ../node_modules/execa/lib/terminate/kill.js
const normalizeForceKillAfterDelay = (forceKillAfterDelay) => {
	if (forceKillAfterDelay === false) return forceKillAfterDelay;
	if (forceKillAfterDelay === true) return DEFAULT_FORCE_KILL_TIMEOUT;
	if (!Number.isFinite(forceKillAfterDelay) || forceKillAfterDelay < 0) throw new TypeError(`Expected the \`forceKillAfterDelay\` option to be a non-negative integer, got \`${forceKillAfterDelay}\` (${typeof forceKillAfterDelay})`);
	return forceKillAfterDelay;
};
const DEFAULT_FORCE_KILL_TIMEOUT = 1e3 * 5;
const subprocessKill = ({ kill, options: { forceKillAfterDelay, killSignal }, onInternalError, context, controller }, signalOrError, errorArgument) => {
	const { signal, error } = parseKillArguments(signalOrError, errorArgument, killSignal);
	emitKillError(error, onInternalError);
	const killResult = kill(signal);
	setKillTimeout({
		kill,
		signal,
		forceKillAfterDelay,
		killSignal,
		killResult,
		context,
		controller
	});
	return killResult;
};
const parseKillArguments = (signalOrError, errorArgument, killSignal) => {
	const [signal = killSignal, error] = isErrorInstance(signalOrError) ? [void 0, signalOrError] : [signalOrError, errorArgument];
	if (typeof signal !== "string" && !Number.isInteger(signal)) throw new TypeError(`The first argument must be an error instance or a signal name string/integer: ${String(signal)}`);
	if (error !== void 0 && !isErrorInstance(error)) throw new TypeError(`The second argument is optional. If specified, it must be an error instance: ${error}`);
	return {
		signal: normalizeSignalArgument(signal),
		error
	};
};
const emitKillError = (error, onInternalError) => {
	if (error !== void 0) onInternalError.reject(error);
};
const setKillTimeout = async ({ kill, signal, forceKillAfterDelay, killSignal, killResult, context, controller }) => {
	if (signal === killSignal && killResult) killOnTimeout({
		kill,
		forceKillAfterDelay,
		context,
		controllerSignal: controller.signal
	});
};
const killOnTimeout = async ({ kill, forceKillAfterDelay, context, controllerSignal }) => {
	if (forceKillAfterDelay === false) return;
	try {
		await setTimeout$1(forceKillAfterDelay, void 0, { signal: controllerSignal });
		if (kill("SIGKILL")) context.isForcefullyTerminated ??= true;
	} catch {}
};

//#endregion
//#region ../node_modules/execa/lib/utils/abort-signal.js
const onAbortedSignal = async (mainSignal, stopSignal) => {
	if (!mainSignal.aborted) await once(mainSignal, "abort", { signal: stopSignal });
};

//#endregion
//#region ../node_modules/execa/lib/terminate/cancel.js
const validateCancelSignal = ({ cancelSignal }) => {
	if (cancelSignal !== void 0 && Object.prototype.toString.call(cancelSignal) !== "[object AbortSignal]") throw new Error(`The \`cancelSignal\` option must be an AbortSignal: ${String(cancelSignal)}`);
};
const throwOnCancel = ({ subprocess, cancelSignal, gracefulCancel, context, controller }) => cancelSignal === void 0 || gracefulCancel ? [] : [terminateOnCancel(subprocess, cancelSignal, context, controller)];
const terminateOnCancel = async (subprocess, cancelSignal, context, { signal }) => {
	await onAbortedSignal(cancelSignal, signal);
	context.terminationReason ??= "cancel";
	subprocess.kill();
	throw cancelSignal.reason;
};

//#endregion
//#region ../node_modules/execa/lib/ipc/validation.js
const validateIpcMethod = ({ methodName, isSubprocess, ipc, isConnected: isConnected$1 }) => {
	validateIpcOption(methodName, isSubprocess, ipc);
	validateConnection(methodName, isSubprocess, isConnected$1);
};
const validateIpcOption = (methodName, isSubprocess, ipc) => {
	if (!ipc) throw new Error(`${getMethodName(methodName, isSubprocess)} can only be used if the \`ipc\` option is \`true\`.`);
};
const validateConnection = (methodName, isSubprocess, isConnected$1) => {
	if (!isConnected$1) throw new Error(`${getMethodName(methodName, isSubprocess)} cannot be used: the ${getOtherProcessName(isSubprocess)} has already exited or disconnected.`);
};
const throwOnEarlyDisconnect = (isSubprocess) => {
	throw new Error(`${getMethodName("getOneMessage", isSubprocess)} could not complete: the ${getOtherProcessName(isSubprocess)} exited or disconnected.`);
};
const throwOnStrictDeadlockError = (isSubprocess) => {
	throw new Error(`${getMethodName("sendMessage", isSubprocess)} failed: the ${getOtherProcessName(isSubprocess)} is sending a message too, instead of listening to incoming messages.
This can be fixed by both sending a message and listening to incoming messages at the same time:

const [receivedMessage] = await Promise.all([
	${getMethodName("getOneMessage", isSubprocess)},
	${getMethodName("sendMessage", isSubprocess, "message, {strict: true}")},
]);`);
};
const getStrictResponseError = (error, isSubprocess) => new Error(`${getMethodName("sendMessage", isSubprocess)} failed when sending an acknowledgment response to the ${getOtherProcessName(isSubprocess)}.`, { cause: error });
const throwOnMissingStrict = (isSubprocess) => {
	throw new Error(`${getMethodName("sendMessage", isSubprocess)} failed: the ${getOtherProcessName(isSubprocess)} is not listening to incoming messages.`);
};
const throwOnStrictDisconnect = (isSubprocess) => {
	throw new Error(`${getMethodName("sendMessage", isSubprocess)} failed: the ${getOtherProcessName(isSubprocess)} exited without listening to incoming messages.`);
};
const getAbortDisconnectError = () => new Error(`\`cancelSignal\` aborted: the ${getOtherProcessName(true)} disconnected.`);
const throwOnMissingParent = () => {
	throw new Error("`getCancelSignal()` cannot be used without setting the `cancelSignal` subprocess option.");
};
const handleEpipeError = ({ error, methodName, isSubprocess }) => {
	if (error.code === "EPIPE") throw new Error(`${getMethodName(methodName, isSubprocess)} cannot be used: the ${getOtherProcessName(isSubprocess)} is disconnecting.`, { cause: error });
};
const handleSerializationError = ({ error, methodName, isSubprocess, message }) => {
	if (isSerializationError(error)) throw new Error(`${getMethodName(methodName, isSubprocess)}'s argument type is invalid: the message cannot be serialized: ${String(message)}.`, { cause: error });
};
const isSerializationError = ({ code, message }) => SERIALIZATION_ERROR_CODES.has(code) || SERIALIZATION_ERROR_MESSAGES.some((serializationErrorMessage) => message.includes(serializationErrorMessage));
const SERIALIZATION_ERROR_CODES = new Set(["ERR_MISSING_ARGS", "ERR_INVALID_ARG_TYPE"]);
const SERIALIZATION_ERROR_MESSAGES = [
	"could not be cloned",
	"circular structure",
	"call stack size exceeded"
];
const getMethodName = (methodName, isSubprocess, parameters = "") => methodName === "cancelSignal" ? "`cancelSignal`'s `controller.abort()`" : `${getNamespaceName(isSubprocess)}${methodName}(${parameters})`;
const getNamespaceName = (isSubprocess) => isSubprocess ? "" : "subprocess.";
const getOtherProcessName = (isSubprocess) => isSubprocess ? "parent process" : "subprocess";
const disconnect = (anyProcess) => {
	if (anyProcess.connected) anyProcess.disconnect();
};

//#endregion
//#region ../node_modules/execa/lib/utils/deferred.js
const createDeferred = () => {
	const methods = {};
	const promise$1 = new Promise((resolve$1, reject) => {
		Object.assign(methods, {
			resolve: resolve$1,
			reject
		});
	});
	return Object.assign(promise$1, methods);
};

//#endregion
//#region ../node_modules/execa/lib/arguments/fd-options.js
const getToStream = (destination, to = "stdin") => {
	const isWritable = true;
	const { options, fileDescriptors } = SUBPROCESS_OPTIONS.get(destination);
	const fdNumber = getFdNumber(fileDescriptors, to, isWritable);
	const destinationStream = destination.stdio[fdNumber];
	if (destinationStream === null) throw new TypeError(getInvalidStdioOptionMessage(fdNumber, to, options, isWritable));
	return destinationStream;
};
const getFromStream = (source, from = "stdout") => {
	const isWritable = false;
	const { options, fileDescriptors } = SUBPROCESS_OPTIONS.get(source);
	const fdNumber = getFdNumber(fileDescriptors, from, isWritable);
	const sourceStream = fdNumber === "all" ? source.all : source.stdio[fdNumber];
	if (sourceStream === null || sourceStream === void 0) throw new TypeError(getInvalidStdioOptionMessage(fdNumber, from, options, isWritable));
	return sourceStream;
};
const SUBPROCESS_OPTIONS = new WeakMap();
const getFdNumber = (fileDescriptors, fdName, isWritable) => {
	const fdNumber = parseFdNumber(fdName, isWritable);
	validateFdNumber(fdNumber, fdName, isWritable, fileDescriptors);
	return fdNumber;
};
const parseFdNumber = (fdName, isWritable) => {
	const fdNumber = parseFd(fdName);
	if (fdNumber !== void 0) return fdNumber;
	const { validOptions, defaultValue } = isWritable ? {
		validOptions: "\"stdin\"",
		defaultValue: "stdin"
	} : {
		validOptions: "\"stdout\", \"stderr\", \"all\"",
		defaultValue: "stdout"
	};
	throw new TypeError(`"${getOptionName(isWritable)}" must not be "${fdName}".
It must be ${validOptions} or "fd3", "fd4" (and so on).
It is optional and defaults to "${defaultValue}".`);
};
const validateFdNumber = (fdNumber, fdName, isWritable, fileDescriptors) => {
	const fileDescriptor = fileDescriptors[getUsedDescriptor(fdNumber)];
	if (fileDescriptor === void 0) throw new TypeError(`"${getOptionName(isWritable)}" must not be ${fdName}. That file descriptor does not exist.
Please set the "stdio" option to ensure that file descriptor exists.`);
	if (fileDescriptor.direction === "input" && !isWritable) throw new TypeError(`"${getOptionName(isWritable)}" must not be ${fdName}. It must be a readable stream, not writable.`);
	if (fileDescriptor.direction !== "input" && isWritable) throw new TypeError(`"${getOptionName(isWritable)}" must not be ${fdName}. It must be a writable stream, not readable.`);
};
const getInvalidStdioOptionMessage = (fdNumber, fdName, options, isWritable) => {
	if (fdNumber === "all" && !options.all) return "The \"all\" option must be true to use \"from: 'all'\".";
	const { optionName, optionValue } = getInvalidStdioOption(fdNumber, options);
	return `The "${optionName}: ${serializeOptionValue(optionValue)}" option is incompatible with using "${getOptionName(isWritable)}: ${serializeOptionValue(fdName)}".
Please set this option with "pipe" instead.`;
};
const getInvalidStdioOption = (fdNumber, { stdin: stdin$1, stdout: stdout$1, stderr, stdio }) => {
	const usedDescriptor = getUsedDescriptor(fdNumber);
	if (usedDescriptor === 0 && stdin$1 !== void 0) return {
		optionName: "stdin",
		optionValue: stdin$1
	};
	if (usedDescriptor === 1 && stdout$1 !== void 0) return {
		optionName: "stdout",
		optionValue: stdout$1
	};
	if (usedDescriptor === 2 && stderr !== void 0) return {
		optionName: "stderr",
		optionValue: stderr
	};
	return {
		optionName: `stdio[${usedDescriptor}]`,
		optionValue: stdio[usedDescriptor]
	};
};
const getUsedDescriptor = (fdNumber) => fdNumber === "all" ? 1 : fdNumber;
const getOptionName = (isWritable) => isWritable ? "to" : "from";
const serializeOptionValue = (value) => {
	if (typeof value === "string") return `'${value}'`;
	return typeof value === "number" ? `${value}` : "Stream";
};

//#endregion
//#region ../node_modules/execa/lib/utils/max-listeners.js
const incrementMaxListeners = (eventEmitter, maxListenersIncrement, signal) => {
	const maxListeners = eventEmitter.getMaxListeners();
	if (maxListeners === 0 || maxListeners === Number.POSITIVE_INFINITY) return;
	eventEmitter.setMaxListeners(maxListeners + maxListenersIncrement);
	addAbortListener(signal, () => {
		eventEmitter.setMaxListeners(eventEmitter.getMaxListeners() - maxListenersIncrement);
	});
};

//#endregion
//#region ../node_modules/execa/lib/ipc/reference.js
const addReference = (channel, reference) => {
	if (reference) addReferenceCount(channel);
};
const addReferenceCount = (channel) => {
	channel.refCounted();
};
const removeReference = (channel, reference) => {
	if (reference) removeReferenceCount(channel);
};
const removeReferenceCount = (channel) => {
	channel.unrefCounted();
};
const undoAddedReferences = (channel, isSubprocess) => {
	if (isSubprocess) {
		removeReferenceCount(channel);
		removeReferenceCount(channel);
	}
};
const redoAddedReferences = (channel, isSubprocess) => {
	if (isSubprocess) {
		addReferenceCount(channel);
		addReferenceCount(channel);
	}
};

//#endregion
//#region ../node_modules/execa/lib/ipc/incoming.js
const onMessage = async ({ anyProcess, channel, isSubprocess, ipcEmitter }, wrappedMessage) => {
	if (handleStrictResponse(wrappedMessage) || handleAbort(wrappedMessage)) return;
	if (!INCOMING_MESSAGES.has(anyProcess)) INCOMING_MESSAGES.set(anyProcess, []);
	const incomingMessages = INCOMING_MESSAGES.get(anyProcess);
	incomingMessages.push(wrappedMessage);
	if (incomingMessages.length > 1) return;
	while (incomingMessages.length > 0) {
		await waitForOutgoingMessages(anyProcess, ipcEmitter, wrappedMessage);
		await scheduler.yield();
		const message = await handleStrictRequest({
			wrappedMessage: incomingMessages[0],
			anyProcess,
			channel,
			isSubprocess,
			ipcEmitter
		});
		incomingMessages.shift();
		ipcEmitter.emit("message", message);
		ipcEmitter.emit("message:done");
	}
};
const onDisconnect = async ({ anyProcess, channel, isSubprocess, ipcEmitter, boundOnMessage }) => {
	abortOnDisconnect();
	const incomingMessages = INCOMING_MESSAGES.get(anyProcess);
	while (incomingMessages?.length > 0) await once(ipcEmitter, "message:done");
	anyProcess.removeListener("message", boundOnMessage);
	redoAddedReferences(channel, isSubprocess);
	ipcEmitter.connected = false;
	ipcEmitter.emit("disconnect");
};
const INCOMING_MESSAGES = new WeakMap();

//#endregion
//#region ../node_modules/execa/lib/ipc/forward.js
const getIpcEmitter = (anyProcess, channel, isSubprocess) => {
	if (IPC_EMITTERS.has(anyProcess)) return IPC_EMITTERS.get(anyProcess);
	const ipcEmitter = new EventEmitter();
	ipcEmitter.connected = true;
	IPC_EMITTERS.set(anyProcess, ipcEmitter);
	forwardEvents({
		ipcEmitter,
		anyProcess,
		channel,
		isSubprocess
	});
	return ipcEmitter;
};
const IPC_EMITTERS = new WeakMap();
const forwardEvents = ({ ipcEmitter, anyProcess, channel, isSubprocess }) => {
	const boundOnMessage = onMessage.bind(void 0, {
		anyProcess,
		channel,
		isSubprocess,
		ipcEmitter
	});
	anyProcess.on("message", boundOnMessage);
	anyProcess.once("disconnect", onDisconnect.bind(void 0, {
		anyProcess,
		channel,
		isSubprocess,
		ipcEmitter,
		boundOnMessage
	}));
	undoAddedReferences(channel, isSubprocess);
};
const isConnected = (anyProcess) => {
	const ipcEmitter = IPC_EMITTERS.get(anyProcess);
	return ipcEmitter === void 0 ? anyProcess.channel !== null : ipcEmitter.connected;
};

//#endregion
//#region ../node_modules/execa/lib/ipc/strict.js
const handleSendStrict = ({ anyProcess, channel, isSubprocess, message, strict }) => {
	if (!strict) return message;
	const ipcEmitter = getIpcEmitter(anyProcess, channel, isSubprocess);
	const hasListeners = hasMessageListeners(anyProcess, ipcEmitter);
	return {
		id: count++,
		type: REQUEST_TYPE,
		message,
		hasListeners
	};
};
let count = 0n;
const validateStrictDeadlock = (outgoingMessages, wrappedMessage) => {
	if (wrappedMessage?.type !== REQUEST_TYPE || wrappedMessage.hasListeners) return;
	for (const { id } of outgoingMessages) if (id !== void 0) STRICT_RESPONSES[id].resolve({
		isDeadlock: true,
		hasListeners: false
	});
};
const handleStrictRequest = async ({ wrappedMessage, anyProcess, channel, isSubprocess, ipcEmitter }) => {
	if (wrappedMessage?.type !== REQUEST_TYPE || !anyProcess.connected) return wrappedMessage;
	const { id, message } = wrappedMessage;
	const response = {
		id,
		type: RESPONSE_TYPE,
		message: hasMessageListeners(anyProcess, ipcEmitter)
	};
	try {
		await sendMessage$1({
			anyProcess,
			channel,
			isSubprocess,
			ipc: true
		}, response);
	} catch (error) {
		ipcEmitter.emit("strict:error", error);
	}
	return message;
};
const handleStrictResponse = (wrappedMessage) => {
	if (wrappedMessage?.type !== RESPONSE_TYPE) return false;
	const { id, message: hasListeners } = wrappedMessage;
	STRICT_RESPONSES[id]?.resolve({
		isDeadlock: false,
		hasListeners
	});
	return true;
};
const waitForStrictResponse = async (wrappedMessage, anyProcess, isSubprocess) => {
	if (wrappedMessage?.type !== REQUEST_TYPE) return;
	const deferred = createDeferred();
	STRICT_RESPONSES[wrappedMessage.id] = deferred;
	const controller = new AbortController();
	try {
		const { isDeadlock, hasListeners } = await Promise.race([deferred, throwOnDisconnect$1(anyProcess, isSubprocess, controller)]);
		if (isDeadlock) throwOnStrictDeadlockError(isSubprocess);
		if (!hasListeners) throwOnMissingStrict(isSubprocess);
	} finally {
		controller.abort();
		delete STRICT_RESPONSES[wrappedMessage.id];
	}
};
const STRICT_RESPONSES = {};
const throwOnDisconnect$1 = async (anyProcess, isSubprocess, { signal }) => {
	incrementMaxListeners(anyProcess, 1, signal);
	await once(anyProcess, "disconnect", { signal });
	throwOnStrictDisconnect(isSubprocess);
};
const REQUEST_TYPE = "execa:ipc:request";
const RESPONSE_TYPE = "execa:ipc:response";

//#endregion
//#region ../node_modules/execa/lib/ipc/outgoing.js
const startSendMessage = (anyProcess, wrappedMessage, strict) => {
	if (!OUTGOING_MESSAGES.has(anyProcess)) OUTGOING_MESSAGES.set(anyProcess, new Set());
	const outgoingMessages = OUTGOING_MESSAGES.get(anyProcess);
	const onMessageSent = createDeferred();
	const id = strict ? wrappedMessage.id : void 0;
	const outgoingMessage = {
		onMessageSent,
		id
	};
	outgoingMessages.add(outgoingMessage);
	return {
		outgoingMessages,
		outgoingMessage
	};
};
const endSendMessage = ({ outgoingMessages, outgoingMessage }) => {
	outgoingMessages.delete(outgoingMessage);
	outgoingMessage.onMessageSent.resolve();
};
const waitForOutgoingMessages = async (anyProcess, ipcEmitter, wrappedMessage) => {
	while (!hasMessageListeners(anyProcess, ipcEmitter) && OUTGOING_MESSAGES.get(anyProcess)?.size > 0) {
		const outgoingMessages = [...OUTGOING_MESSAGES.get(anyProcess)];
		validateStrictDeadlock(outgoingMessages, wrappedMessage);
		await Promise.all(outgoingMessages.map(({ onMessageSent }) => onMessageSent));
	}
};
const OUTGOING_MESSAGES = new WeakMap();
const hasMessageListeners = (anyProcess, ipcEmitter) => ipcEmitter.listenerCount("message") > getMinListenerCount(anyProcess);
const getMinListenerCount = (anyProcess) => SUBPROCESS_OPTIONS.has(anyProcess) && !getFdSpecificValue(SUBPROCESS_OPTIONS.get(anyProcess).options.buffer, "ipc") ? 1 : 0;

//#endregion
//#region ../node_modules/execa/lib/ipc/send.js
const sendMessage$1 = ({ anyProcess, channel, isSubprocess, ipc }, message, { strict = false } = {}) => {
	const methodName = "sendMessage";
	validateIpcMethod({
		methodName,
		isSubprocess,
		ipc,
		isConnected: anyProcess.connected
	});
	return sendMessageAsync({
		anyProcess,
		channel,
		methodName,
		isSubprocess,
		message,
		strict
	});
};
const sendMessageAsync = async ({ anyProcess, channel, methodName, isSubprocess, message, strict }) => {
	const wrappedMessage = handleSendStrict({
		anyProcess,
		channel,
		isSubprocess,
		message,
		strict
	});
	const outgoingMessagesState = startSendMessage(anyProcess, wrappedMessage, strict);
	try {
		await sendOneMessage({
			anyProcess,
			methodName,
			isSubprocess,
			wrappedMessage,
			message
		});
	} catch (error) {
		disconnect(anyProcess);
		throw error;
	} finally {
		endSendMessage(outgoingMessagesState);
	}
};
const sendOneMessage = async ({ anyProcess, methodName, isSubprocess, wrappedMessage, message }) => {
	const sendMethod = getSendMethod(anyProcess);
	try {
		await Promise.all([waitForStrictResponse(wrappedMessage, anyProcess, isSubprocess), sendMethod(wrappedMessage)]);
	} catch (error) {
		handleEpipeError({
			error,
			methodName,
			isSubprocess
		});
		handleSerializationError({
			error,
			methodName,
			isSubprocess,
			message
		});
		throw error;
	}
};
const getSendMethod = (anyProcess) => {
	if (PROCESS_SEND_METHODS.has(anyProcess)) return PROCESS_SEND_METHODS.get(anyProcess);
	const sendMethod = promisify(anyProcess.send.bind(anyProcess));
	PROCESS_SEND_METHODS.set(anyProcess, sendMethod);
	return sendMethod;
};
const PROCESS_SEND_METHODS = new WeakMap();

//#endregion
//#region ../node_modules/execa/lib/ipc/graceful.js
const sendAbort = (subprocess, message) => {
	const methodName = "cancelSignal";
	validateConnection(methodName, false, subprocess.connected);
	return sendOneMessage({
		anyProcess: subprocess,
		methodName,
		isSubprocess: false,
		wrappedMessage: {
			type: GRACEFUL_CANCEL_TYPE,
			message
		},
		message
	});
};
const getCancelSignal$1 = async ({ anyProcess, channel, isSubprocess, ipc }) => {
	await startIpc({
		anyProcess,
		channel,
		isSubprocess,
		ipc
	});
	return cancelController.signal;
};
const startIpc = async ({ anyProcess, channel, isSubprocess, ipc }) => {
	if (cancelListening) return;
	cancelListening = true;
	if (!ipc) {
		throwOnMissingParent();
		return;
	}
	if (channel === null) {
		abortOnDisconnect();
		return;
	}
	getIpcEmitter(anyProcess, channel, isSubprocess);
	await scheduler.yield();
};
let cancelListening = false;
const handleAbort = (wrappedMessage) => {
	if (wrappedMessage?.type !== GRACEFUL_CANCEL_TYPE) return false;
	cancelController.abort(wrappedMessage.message);
	return true;
};
const GRACEFUL_CANCEL_TYPE = "execa:ipc:cancel";
const abortOnDisconnect = () => {
	cancelController.abort(getAbortDisconnectError());
};
const cancelController = new AbortController();

//#endregion
//#region ../node_modules/execa/lib/terminate/graceful.js
const validateGracefulCancel = ({ gracefulCancel, cancelSignal, ipc, serialization }) => {
	if (!gracefulCancel) return;
	if (cancelSignal === void 0) throw new Error("The `cancelSignal` option must be defined when setting the `gracefulCancel` option.");
	if (!ipc) throw new Error("The `ipc` option cannot be false when setting the `gracefulCancel` option.");
	if (serialization === "json") throw new Error("The `serialization` option cannot be 'json' when setting the `gracefulCancel` option.");
};
const throwOnGracefulCancel = ({ subprocess, cancelSignal, gracefulCancel, forceKillAfterDelay, context, controller }) => gracefulCancel ? [sendOnAbort({
	subprocess,
	cancelSignal,
	forceKillAfterDelay,
	context,
	controller
})] : [];
const sendOnAbort = async ({ subprocess, cancelSignal, forceKillAfterDelay, context, controller: { signal } }) => {
	await onAbortedSignal(cancelSignal, signal);
	const reason = getReason(cancelSignal);
	await sendAbort(subprocess, reason);
	killOnTimeout({
		kill: subprocess.kill,
		forceKillAfterDelay,
		context,
		controllerSignal: signal
	});
	context.terminationReason ??= "gracefulCancel";
	throw cancelSignal.reason;
};
const getReason = ({ reason }) => {
	if (!(reason instanceof DOMException)) return reason;
	const error = new Error(reason.message);
	Object.defineProperty(error, "stack", {
		value: reason.stack,
		enumerable: false,
		configurable: true,
		writable: true
	});
	return error;
};

//#endregion
//#region ../node_modules/execa/lib/terminate/timeout.js
const validateTimeout = ({ timeout }) => {
	if (timeout !== void 0 && (!Number.isFinite(timeout) || timeout < 0)) throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
};
const throwOnTimeout = (subprocess, timeout, context, controller) => timeout === 0 || timeout === void 0 ? [] : [killAfterTimeout(subprocess, timeout, context, controller)];
const killAfterTimeout = async (subprocess, timeout, context, { signal }) => {
	await setTimeout$1(timeout, void 0, { signal });
	context.terminationReason ??= "timeout";
	subprocess.kill();
	throw new DiscardedError();
};

//#endregion
//#region ../node_modules/execa/lib/methods/node.js
const mapNode = ({ options }) => {
	if (options.node === false) throw new TypeError("The \"node\" option cannot be false with `execaNode()`.");
	return { options: {
		...options,
		node: true
	} };
};
const handleNodeOption = (file, commandArguments, { node: shouldHandleNode = false, nodePath = execPath, nodeOptions = execArgv.filter((nodeOption) => !nodeOption.startsWith("--inspect")), cwd: cwd$1, execPath: formerNodePath,...options }) => {
	if (formerNodePath !== void 0) throw new TypeError("The \"execPath\" option has been removed. Please use the \"nodePath\" option instead.");
	const normalizedNodePath = safeNormalizeFileUrl(nodePath, "The \"nodePath\" option");
	const resolvedNodePath = path.resolve(cwd$1, normalizedNodePath);
	const newOptions = {
		...options,
		nodePath: resolvedNodePath,
		node: shouldHandleNode,
		cwd: cwd$1
	};
	if (!shouldHandleNode) return [
		file,
		commandArguments,
		newOptions
	];
	if (path.basename(file, ".exe") === "node") throw new TypeError("When the \"node\" option is true, the first argument does not need to be \"node\".");
	return [
		resolvedNodePath,
		[
			...nodeOptions,
			file,
			...commandArguments
		],
		{
			ipc: true,
			...newOptions,
			shell: false
		}
	];
};

//#endregion
//#region ../node_modules/execa/lib/ipc/ipc-input.js
const validateIpcInputOption = ({ ipcInput, ipc, serialization }) => {
	if (ipcInput === void 0) return;
	if (!ipc) throw new Error("The `ipcInput` option cannot be set unless the `ipc` option is `true`.");
	validateIpcInput[serialization](ipcInput);
};
const validateAdvancedInput = (ipcInput) => {
	try {
		serialize(ipcInput);
	} catch (error) {
		throw new Error("The `ipcInput` option is not serializable with a structured clone.", { cause: error });
	}
};
const validateJsonInput = (ipcInput) => {
	try {
		JSON.stringify(ipcInput);
	} catch (error) {
		throw new Error("The `ipcInput` option is not serializable with JSON.", { cause: error });
	}
};
const validateIpcInput = {
	advanced: validateAdvancedInput,
	json: validateJsonInput
};
const sendIpcInput = async (subprocess, ipcInput) => {
	if (ipcInput === void 0) return;
	await subprocess.sendMessage(ipcInput);
};

//#endregion
//#region ../node_modules/execa/lib/arguments/encoding-option.js
const validateEncoding = ({ encoding }) => {
	if (ENCODINGS.has(encoding)) return;
	const correctEncoding = getCorrectEncoding(encoding);
	if (correctEncoding !== void 0) throw new TypeError(`Invalid option \`encoding: ${serializeEncoding(encoding)}\`.
Please rename it to ${serializeEncoding(correctEncoding)}.`);
	const correctEncodings = [...ENCODINGS].map((correctEncoding$1) => serializeEncoding(correctEncoding$1)).join(", ");
	throw new TypeError(`Invalid option \`encoding: ${serializeEncoding(encoding)}\`.
Please rename it to one of: ${correctEncodings}.`);
};
const TEXT_ENCODINGS = new Set(["utf8", "utf16le"]);
const BINARY_ENCODINGS = new Set([
	"buffer",
	"hex",
	"base64",
	"base64url",
	"latin1",
	"ascii"
]);
const ENCODINGS = new Set([...TEXT_ENCODINGS, ...BINARY_ENCODINGS]);
const getCorrectEncoding = (encoding) => {
	if (encoding === null) return "buffer";
	if (typeof encoding !== "string") return;
	const lowerEncoding = encoding.toLowerCase();
	if (lowerEncoding in ENCODING_ALIASES) return ENCODING_ALIASES[lowerEncoding];
	if (ENCODINGS.has(lowerEncoding)) return lowerEncoding;
};
const ENCODING_ALIASES = {
	"utf-8": "utf8",
	"utf-16le": "utf16le",
	"ucs-2": "utf16le",
	ucs2: "utf16le",
	binary: "latin1"
};
const serializeEncoding = (encoding) => typeof encoding === "string" ? `"${encoding}"` : String(encoding);

//#endregion
//#region ../node_modules/execa/lib/arguments/cwd.js
const normalizeCwd = (cwd$1 = getDefaultCwd()) => {
	const cwdString = safeNormalizeFileUrl(cwd$1, "The \"cwd\" option");
	return path.resolve(cwdString);
};
const getDefaultCwd = () => {
	try {
		return y.cwd();
	} catch (error) {
		error.message = `The current directory does not exist.\n${error.message}`;
		throw error;
	}
};
const fixCwdError = (originalMessage, cwd$1) => {
	if (cwd$1 === getDefaultCwd()) return originalMessage;
	let cwdStat;
	try {
		cwdStat = statSync(cwd$1);
	} catch (error) {
		return `The "cwd" option is invalid: ${cwd$1}.\n${error.message}\n${originalMessage}`;
	}
	if (!cwdStat.isDirectory()) return `The "cwd" option is not a directory: ${cwd$1}.\n${originalMessage}`;
	return originalMessage;
};

//#endregion
//#region ../node_modules/execa/lib/arguments/options.js
var import_cross_spawn = __toESM$1(require_cross_spawn(), 1);
const normalizeOptions$2 = (filePath, rawArguments, rawOptions) => {
	rawOptions.cwd = normalizeCwd(rawOptions.cwd);
	const [processedFile, processedArguments, processedOptions] = handleNodeOption(filePath, rawArguments, rawOptions);
	const { command: file, args: commandArguments, options: initialOptions } = import_cross_spawn.default._parse(processedFile, processedArguments, processedOptions);
	const fdOptions = normalizeFdSpecificOptions(initialOptions);
	const options = addDefaultOptions(fdOptions);
	validateTimeout(options);
	validateEncoding(options);
	validateIpcInputOption(options);
	validateCancelSignal(options);
	validateGracefulCancel(options);
	options.shell = normalizeFileUrl(options.shell);
	options.env = getEnv(options);
	options.killSignal = normalizeKillSignal(options.killSignal);
	options.forceKillAfterDelay = normalizeForceKillAfterDelay(options.forceKillAfterDelay);
	options.lines = options.lines.map((lines, fdNumber) => lines && !BINARY_ENCODINGS.has(options.encoding) && options.buffer[fdNumber]);
	if (y.platform === "win32" && path.basename(file, ".exe") === "cmd") commandArguments.unshift("/q");
	return {
		file,
		commandArguments,
		options
	};
};
const addDefaultOptions = ({ extendEnv = true, preferLocal = false, cwd: cwd$1, localDir: localDirectory = cwd$1, encoding = "utf8", reject = true, cleanup = true, all = false, windowsHide = true, killSignal = "SIGTERM", forceKillAfterDelay = true, gracefulCancel = false, ipcInput, ipc = ipcInput !== void 0 || gracefulCancel, serialization = "advanced",...options }) => ({
	...options,
	extendEnv,
	preferLocal,
	cwd: cwd$1,
	localDirectory,
	encoding,
	reject,
	cleanup,
	all,
	windowsHide,
	killSignal,
	forceKillAfterDelay,
	gracefulCancel,
	ipcInput,
	ipc,
	serialization
});
const getEnv = ({ env: envOption, extendEnv, preferLocal, node, localDirectory, nodePath }) => {
	const env$1 = extendEnv ? {
		...y.env,
		...envOption
	} : envOption;
	if (preferLocal || node) return npmRunPathEnv({
		env: env$1,
		cwd: localDirectory,
		execPath: nodePath,
		preferLocal,
		addExecPath: node
	});
	return env$1;
};

//#endregion
//#region ../node_modules/execa/lib/arguments/shell.js
const concatenateShell = (file, commandArguments, options) => options.shell && commandArguments.length > 0 ? [
	[file, ...commandArguments].join(" "),
	[],
	options
] : [
	file,
	commandArguments,
	options
];

//#endregion
//#region ../node_modules/strip-final-newline/index.js
function stripFinalNewline(input) {
	if (typeof input === "string") return stripFinalNewlineString(input);
	if (!(ArrayBuffer.isView(input) && input.BYTES_PER_ELEMENT === 1)) throw new Error("Input must be a string or a Uint8Array");
	return stripFinalNewlineBinary(input);
}
const stripFinalNewlineString = (input) => input.at(-1) === LF ? input.slice(0, input.at(-2) === CR ? -2 : -1) : input;
const stripFinalNewlineBinary = (input) => input.at(-1) === LF_BINARY ? input.subarray(0, input.at(-2) === CR_BINARY ? -2 : -1) : input;
const LF = "\n";
const LF_BINARY = LF.codePointAt(0);
const CR = "\r";
const CR_BINARY = CR.codePointAt(0);

//#endregion
//#region ../node_modules/is-stream/index.js
function isStream(stream$1, { checkOpen = true } = {}) {
	return stream$1 !== null && typeof stream$1 === "object" && (stream$1.writable || stream$1.readable || !checkOpen || stream$1.writable === void 0 && stream$1.readable === void 0) && typeof stream$1.pipe === "function";
}
function isWritableStream$1(stream$1, { checkOpen = true } = {}) {
	return isStream(stream$1, { checkOpen }) && (stream$1.writable || !checkOpen) && typeof stream$1.write === "function" && typeof stream$1.end === "function" && typeof stream$1.writable === "boolean" && typeof stream$1.writableObjectMode === "boolean" && typeof stream$1.destroy === "function" && typeof stream$1.destroyed === "boolean";
}
function isReadableStream$1(stream$1, { checkOpen = true } = {}) {
	return isStream(stream$1, { checkOpen }) && (stream$1.readable || !checkOpen) && typeof stream$1.read === "function" && typeof stream$1.readable === "boolean" && typeof stream$1.readableObjectMode === "boolean" && typeof stream$1.destroy === "function" && typeof stream$1.destroyed === "boolean";
}
function isDuplexStream(stream$1, options) {
	return isWritableStream$1(stream$1, options) && isReadableStream$1(stream$1, options);
}

//#endregion
//#region ../node_modules/@sec-ant/readable-stream/dist/ponyfill/asyncIterator.js
const a = Object.getPrototypeOf(Object.getPrototypeOf(
	/* istanbul ignore next */
	async function* () {}
).prototype);
var c = class {
	#t;
	#n;
	#r = !1;
	#e = void 0;
	constructor(e$1, t$1) {
		this.#t = e$1, this.#n = t$1;
	}
	next() {
		const e$1 = () => this.#s();
		return this.#e = this.#e ? this.#e.then(e$1, e$1) : e$1(), this.#e;
	}
	return(e$1) {
		const t$1 = () => this.#i(e$1);
		return this.#e ? this.#e.then(t$1, t$1) : t$1();
	}
	async #s() {
		if (this.#r) return {
			done: !0,
			value: void 0
		};
		let e$1;
		try {
			e$1 = await this.#t.read();
		} catch (t$1) {
			throw this.#e = void 0, this.#r = !0, this.#t.releaseLock(), t$1;
		}
		return e$1.done && (this.#e = void 0, this.#r = !0, this.#t.releaseLock()), e$1;
	}
	async #i(e$1) {
		if (this.#r) return {
			done: !0,
			value: e$1
		};
		if (this.#r = !0, !this.#n) {
			const t$1 = this.#t.cancel(e$1);
			return this.#t.releaseLock(), await t$1, {
				done: !0,
				value: e$1
			};
		}
		return this.#t.releaseLock(), {
			done: !0,
			value: e$1
		};
	}
};
const n = Symbol();
function i() {
	return this[n].next();
}
Object.defineProperty(i, "name", { value: "next" });
function o(r$1) {
	return this[n].return(r$1);
}
Object.defineProperty(o, "name", { value: "return" });
const u = Object.create(a, {
	next: {
		enumerable: !0,
		configurable: !0,
		writable: !0,
		value: i
	},
	return: {
		enumerable: !0,
		configurable: !0,
		writable: !0,
		value: o
	}
});
function h({ preventCancel: r$1 = !1 } = {}) {
	const e$1 = this.getReader(), t$1 = new c(e$1, r$1), s = Object.create(u);
	return s[n] = t$1, s;
}

//#endregion
//#region ../node_modules/get-stream/source/stream.js
const getAsyncIterable = (stream$1) => {
	if (isReadableStream$1(stream$1, { checkOpen: false }) && nodeImports.on !== void 0) return getStreamIterable(stream$1);
	if (typeof stream$1?.[Symbol.asyncIterator] === "function") return stream$1;
	if (toString.call(stream$1) === "[object ReadableStream]") return h.call(stream$1);
	throw new TypeError("The first argument must be a Readable, a ReadableStream, or an async iterable.");
};
const { toString } = Object.prototype;
const getStreamIterable = async function* (stream$1) {
	const controller = new AbortController();
	const state = {};
	handleStreamEnd(stream$1, controller, state);
	try {
		for await (const [chunk] of nodeImports.on(stream$1, "data", { signal: controller.signal })) yield chunk;
	} catch (error) {
		if (state.error !== void 0) throw state.error;
		else if (!controller.signal.aborted) throw error;
	} finally {
		stream$1.destroy();
	}
};
const handleStreamEnd = async (stream$1, controller, state) => {
	try {
		await nodeImports.finished(stream$1, {
			cleanup: true,
			readable: true,
			writable: false,
			error: false
		});
	} catch (error) {
		state.error = error;
	} finally {
		controller.abort();
	}
};
const nodeImports = {};

//#endregion
//#region ../node_modules/get-stream/source/contents.js
const getStreamContents$1 = async (stream$1, { init, convertChunk, getSize, truncateChunk, addChunk, getFinalChunk, finalize }, { maxBuffer = Number.POSITIVE_INFINITY } = {}) => {
	const asyncIterable = getAsyncIterable(stream$1);
	const state = init();
	state.length = 0;
	try {
		for await (const chunk of asyncIterable) {
			const chunkType = getChunkType(chunk);
			const convertedChunk = convertChunk[chunkType](chunk, state);
			appendChunk({
				convertedChunk,
				state,
				getSize,
				truncateChunk,
				addChunk,
				maxBuffer
			});
		}
		appendFinalChunk({
			state,
			convertChunk,
			getSize,
			truncateChunk,
			addChunk,
			getFinalChunk,
			maxBuffer
		});
		return finalize(state);
	} catch (error) {
		const normalizedError = typeof error === "object" && error !== null ? error : new Error(error);
		normalizedError.bufferedData = finalize(state);
		throw normalizedError;
	}
};
const appendFinalChunk = ({ state, getSize, truncateChunk, addChunk, getFinalChunk, maxBuffer }) => {
	const convertedChunk = getFinalChunk(state);
	if (convertedChunk !== void 0) appendChunk({
		convertedChunk,
		state,
		getSize,
		truncateChunk,
		addChunk,
		maxBuffer
	});
};
const appendChunk = ({ convertedChunk, state, getSize, truncateChunk, addChunk, maxBuffer }) => {
	const chunkSize = getSize(convertedChunk);
	const newLength = state.length + chunkSize;
	if (newLength <= maxBuffer) {
		addNewChunk(convertedChunk, state, addChunk, newLength);
		return;
	}
	const truncatedChunk = truncateChunk(convertedChunk, maxBuffer - state.length);
	if (truncatedChunk !== void 0) addNewChunk(truncatedChunk, state, addChunk, maxBuffer);
	throw new MaxBufferError();
};
const addNewChunk = (convertedChunk, state, addChunk, newLength) => {
	state.contents = addChunk(convertedChunk, state, newLength);
	state.length = newLength;
};
const getChunkType = (chunk) => {
	const typeOfChunk = typeof chunk;
	if (typeOfChunk === "string") return "string";
	if (typeOfChunk !== "object" || chunk === null) return "others";
	if (globalThis.Buffer?.isBuffer(chunk)) return "buffer";
	const prototypeName = objectToString.call(chunk);
	if (prototypeName === "[object ArrayBuffer]") return "arrayBuffer";
	if (prototypeName === "[object DataView]") return "dataView";
	if (Number.isInteger(chunk.byteLength) && Number.isInteger(chunk.byteOffset) && objectToString.call(chunk.buffer) === "[object ArrayBuffer]") return "typedArray";
	return "others";
};
const { toString: objectToString } = Object.prototype;
var MaxBufferError = class extends Error {
	name = "MaxBufferError";
	constructor() {
		super("maxBuffer exceeded");
	}
};

//#endregion
//#region ../node_modules/get-stream/source/utils.js
const identity = (value) => value;
const noop$3 = () => void 0;
const getContentsProperty = ({ contents }) => contents;
const throwObjectStream = (chunk) => {
	throw new Error(`Streams in object mode are not supported: ${String(chunk)}`);
};
const getLengthProperty = (convertedChunk) => convertedChunk.length;

//#endregion
//#region ../node_modules/get-stream/source/array.js
async function getStreamAsArray(stream$1, options) {
	return getStreamContents$1(stream$1, arrayMethods, options);
}
const initArray = () => ({ contents: [] });
const increment = () => 1;
const addArrayChunk = (convertedChunk, { contents }) => {
	contents.push(convertedChunk);
	return contents;
};
const arrayMethods = {
	init: initArray,
	convertChunk: {
		string: identity,
		buffer: identity,
		arrayBuffer: identity,
		dataView: identity,
		typedArray: identity,
		others: identity
	},
	getSize: increment,
	truncateChunk: noop$3,
	addChunk: addArrayChunk,
	getFinalChunk: noop$3,
	finalize: getContentsProperty
};

//#endregion
//#region ../node_modules/get-stream/source/array-buffer.js
async function getStreamAsArrayBuffer(stream$1, options) {
	return getStreamContents$1(stream$1, arrayBufferMethods, options);
}
const initArrayBuffer = () => ({ contents: new ArrayBuffer(0) });
const useTextEncoder = (chunk) => textEncoder.encode(chunk);
const textEncoder = new TextEncoder();
const useUint8Array = (chunk) => new Uint8Array(chunk);
const useUint8ArrayWithOffset = (chunk) => new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
const truncateArrayBufferChunk = (convertedChunk, chunkSize) => convertedChunk.slice(0, chunkSize);
const addArrayBufferChunk = (convertedChunk, { contents, length: previousLength }, length) => {
	const newContents = hasArrayBufferResize() ? resizeArrayBuffer(contents, length) : resizeArrayBufferSlow(contents, length);
	new Uint8Array(newContents).set(convertedChunk, previousLength);
	return newContents;
};
const resizeArrayBufferSlow = (contents, length) => {
	if (length <= contents.byteLength) return contents;
	const arrayBuffer = new ArrayBuffer(getNewContentsLength(length));
	new Uint8Array(arrayBuffer).set(new Uint8Array(contents), 0);
	return arrayBuffer;
};
const resizeArrayBuffer = (contents, length) => {
	if (length <= contents.maxByteLength) {
		contents.resize(length);
		return contents;
	}
	const arrayBuffer = new ArrayBuffer(length, { maxByteLength: getNewContentsLength(length) });
	new Uint8Array(arrayBuffer).set(new Uint8Array(contents), 0);
	return arrayBuffer;
};
const getNewContentsLength = (length) => SCALE_FACTOR ** Math.ceil(Math.log(length) / Math.log(SCALE_FACTOR));
const SCALE_FACTOR = 2;
const finalizeArrayBuffer = ({ contents, length }) => hasArrayBufferResize() ? contents : contents.slice(0, length);
const hasArrayBufferResize = () => "resize" in ArrayBuffer.prototype;
const arrayBufferMethods = {
	init: initArrayBuffer,
	convertChunk: {
		string: useTextEncoder,
		buffer: useUint8Array,
		arrayBuffer: useUint8Array,
		dataView: useUint8ArrayWithOffset,
		typedArray: useUint8ArrayWithOffset,
		others: throwObjectStream
	},
	getSize: getLengthProperty,
	truncateChunk: truncateArrayBufferChunk,
	addChunk: addArrayBufferChunk,
	getFinalChunk: noop$3,
	finalize: finalizeArrayBuffer
};

//#endregion
//#region ../node_modules/get-stream/source/string.js
async function getStreamAsString(stream$1, options) {
	return getStreamContents$1(stream$1, stringMethods, options);
}
const initString = () => ({
	contents: "",
	textDecoder: new TextDecoder()
});
const useTextDecoder = (chunk, { textDecoder: textDecoder$1 }) => textDecoder$1.decode(chunk, { stream: true });
const addStringChunk = (convertedChunk, { contents }) => contents + convertedChunk;
const truncateStringChunk = (convertedChunk, chunkSize) => convertedChunk.slice(0, chunkSize);
const getFinalStringChunk = ({ textDecoder: textDecoder$1 }) => {
	const finalChunk = textDecoder$1.decode();
	return finalChunk === "" ? void 0 : finalChunk;
};
const stringMethods = {
	init: initString,
	convertChunk: {
		string: identity,
		buffer: useTextDecoder,
		arrayBuffer: useTextDecoder,
		dataView: useTextDecoder,
		typedArray: useTextDecoder,
		others: throwObjectStream
	},
	getSize: getLengthProperty,
	truncateChunk: truncateStringChunk,
	addChunk: addStringChunk,
	getFinalChunk: getFinalStringChunk,
	finalize: getContentsProperty
};

//#endregion
//#region ../node_modules/execa/lib/io/max-buffer.js
const handleMaxBuffer = ({ error, stream: stream$1, readableObjectMode, lines, encoding, fdNumber }) => {
	if (!(error instanceof MaxBufferError)) throw error;
	if (fdNumber === "all") return error;
	const unit = getMaxBufferUnit(readableObjectMode, lines, encoding);
	error.maxBufferInfo = {
		fdNumber,
		unit
	};
	stream$1.destroy();
	throw error;
};
const getMaxBufferUnit = (readableObjectMode, lines, encoding) => {
	if (readableObjectMode) return "objects";
	if (lines) return "lines";
	if (encoding === "buffer") return "bytes";
	return "characters";
};
const checkIpcMaxBuffer = (subprocess, ipcOutput, maxBuffer) => {
	if (ipcOutput.length !== maxBuffer) return;
	const error = new MaxBufferError();
	error.maxBufferInfo = { fdNumber: "ipc" };
	throw error;
};
const getMaxBufferMessage = (error, maxBuffer) => {
	const { streamName, threshold, unit } = getMaxBufferInfo(error, maxBuffer);
	return `Command's ${streamName} was larger than ${threshold} ${unit}`;
};
const getMaxBufferInfo = (error, maxBuffer) => {
	if (error?.maxBufferInfo === void 0) return {
		streamName: "output",
		threshold: maxBuffer[1],
		unit: "bytes"
	};
	const { maxBufferInfo: { fdNumber, unit } } = error;
	delete error.maxBufferInfo;
	const threshold = getFdSpecificValue(maxBuffer, fdNumber);
	if (fdNumber === "ipc") return {
		streamName: "IPC output",
		threshold,
		unit: "messages"
	};
	return {
		streamName: getStreamName(fdNumber),
		threshold,
		unit
	};
};
const isMaxBufferSync = (resultError, output, maxBuffer) => resultError?.code === "ENOBUFS" && output !== null && output.some((result) => result !== null && result.length > getMaxBufferSync(maxBuffer));
const truncateMaxBufferSync = (result, isMaxBuffer, maxBuffer) => {
	if (!isMaxBuffer) return result;
	const maxBufferValue = getMaxBufferSync(maxBuffer);
	return result.length > maxBufferValue ? result.slice(0, maxBufferValue) : result;
};
const getMaxBufferSync = ([, stdoutMaxBuffer]) => stdoutMaxBuffer;

//#endregion
//#region ../node_modules/execa/lib/return/message.js
const createMessages = ({ stdio, all, ipcOutput, originalError, signal, signalDescription, exitCode, escapedCommand, timedOut, isCanceled, isGracefullyCanceled, isMaxBuffer, isForcefullyTerminated, forceKillAfterDelay, killSignal, maxBuffer, timeout, cwd: cwd$1 }) => {
	const errorCode = originalError?.code;
	const prefix = getErrorPrefix({
		originalError,
		timedOut,
		timeout,
		isMaxBuffer,
		maxBuffer,
		errorCode,
		signal,
		signalDescription,
		exitCode,
		isCanceled,
		isGracefullyCanceled,
		isForcefullyTerminated,
		forceKillAfterDelay,
		killSignal
	});
	const originalMessage = getOriginalMessage(originalError, cwd$1);
	const suffix = originalMessage === void 0 ? "" : `\n${originalMessage}`;
	const shortMessage = `${prefix}: ${escapedCommand}${suffix}`;
	const messageStdio = all === void 0 ? [stdio[2], stdio[1]] : [all];
	const message = [
		shortMessage,
		...messageStdio,
		...stdio.slice(3),
		ipcOutput.map((ipcMessage) => serializeIpcMessage(ipcMessage)).join("\n")
	].map((messagePart) => escapeLines(stripFinalNewline(serializeMessagePart(messagePart)))).filter(Boolean).join("\n\n");
	return {
		originalMessage,
		shortMessage,
		message
	};
};
const getErrorPrefix = ({ originalError, timedOut, timeout, isMaxBuffer, maxBuffer, errorCode, signal, signalDescription, exitCode, isCanceled, isGracefullyCanceled, isForcefullyTerminated, forceKillAfterDelay, killSignal }) => {
	const forcefulSuffix = getForcefulSuffix(isForcefullyTerminated, forceKillAfterDelay);
	if (timedOut) return `Command timed out after ${timeout} milliseconds${forcefulSuffix}`;
	if (isGracefullyCanceled) {
		if (signal === void 0) return `Command was gracefully canceled with exit code ${exitCode}`;
		return isForcefullyTerminated ? `Command was gracefully canceled${forcefulSuffix}` : `Command was gracefully canceled with ${signal} (${signalDescription})`;
	}
	if (isCanceled) return `Command was canceled${forcefulSuffix}`;
	if (isMaxBuffer) return `${getMaxBufferMessage(originalError, maxBuffer)}${forcefulSuffix}`;
	if (errorCode !== void 0) return `Command failed with ${errorCode}${forcefulSuffix}`;
	if (isForcefullyTerminated) return `Command was killed with ${killSignal} (${getSignalDescription(killSignal)})${forcefulSuffix}`;
	if (signal !== void 0) return `Command was killed with ${signal} (${signalDescription})`;
	if (exitCode !== void 0) return `Command failed with exit code ${exitCode}`;
	return "Command failed";
};
const getForcefulSuffix = (isForcefullyTerminated, forceKillAfterDelay) => isForcefullyTerminated ? ` and was forcefully terminated after ${forceKillAfterDelay} milliseconds` : "";
const getOriginalMessage = (originalError, cwd$1) => {
	if (originalError instanceof DiscardedError) return;
	const originalMessage = isExecaError(originalError) ? originalError.originalMessage : String(originalError?.message ?? originalError);
	const escapedOriginalMessage = escapeLines(fixCwdError(originalMessage, cwd$1));
	return escapedOriginalMessage === "" ? void 0 : escapedOriginalMessage;
};
const serializeIpcMessage = (ipcMessage) => typeof ipcMessage === "string" ? ipcMessage : inspect(ipcMessage);
const serializeMessagePart = (messagePart) => Array.isArray(messagePart) ? messagePart.map((messageItem) => stripFinalNewline(serializeMessageItem(messageItem))).filter(Boolean).join("\n") : serializeMessageItem(messagePart);
const serializeMessageItem = (messageItem) => {
	if (typeof messageItem === "string") return messageItem;
	if (isUint8Array(messageItem)) return uint8ArrayToString(messageItem);
	return "";
};

//#endregion
//#region ../node_modules/execa/lib/return/result.js
const makeSuccessResult = ({ command, escapedCommand, stdio, all, ipcOutput, options: { cwd: cwd$1 }, startTime }) => omitUndefinedProperties({
	command,
	escapedCommand,
	cwd: cwd$1,
	durationMs: getDurationMs(startTime),
	failed: false,
	timedOut: false,
	isCanceled: false,
	isGracefullyCanceled: false,
	isTerminated: false,
	isMaxBuffer: false,
	isForcefullyTerminated: false,
	exitCode: 0,
	stdout: stdio[1],
	stderr: stdio[2],
	all,
	stdio,
	ipcOutput,
	pipedFrom: []
});
const makeEarlyError = ({ error, command, escapedCommand, fileDescriptors, options, startTime, isSync }) => makeError({
	error,
	command,
	escapedCommand,
	startTime,
	timedOut: false,
	isCanceled: false,
	isGracefullyCanceled: false,
	isMaxBuffer: false,
	isForcefullyTerminated: false,
	stdio: Array.from({ length: fileDescriptors.length }),
	ipcOutput: [],
	options,
	isSync
});
const makeError = ({ error: originalError, command, escapedCommand, startTime, timedOut, isCanceled, isGracefullyCanceled, isMaxBuffer, isForcefullyTerminated, exitCode: rawExitCode, signal: rawSignal, stdio, all, ipcOutput, options: { timeoutDuration, timeout = timeoutDuration, forceKillAfterDelay, killSignal, cwd: cwd$1, maxBuffer }, isSync }) => {
	const { exitCode, signal, signalDescription } = normalizeExitPayload(rawExitCode, rawSignal);
	const { originalMessage, shortMessage, message } = createMessages({
		stdio,
		all,
		ipcOutput,
		originalError,
		signal,
		signalDescription,
		exitCode,
		escapedCommand,
		timedOut,
		isCanceled,
		isGracefullyCanceled,
		isMaxBuffer,
		isForcefullyTerminated,
		forceKillAfterDelay,
		killSignal,
		maxBuffer,
		timeout,
		cwd: cwd$1
	});
	const error = getFinalError(originalError, message, isSync);
	Object.assign(error, getErrorProperties({
		error,
		command,
		escapedCommand,
		startTime,
		timedOut,
		isCanceled,
		isGracefullyCanceled,
		isMaxBuffer,
		isForcefullyTerminated,
		exitCode,
		signal,
		signalDescription,
		stdio,
		all,
		ipcOutput,
		cwd: cwd$1,
		originalMessage,
		shortMessage
	}));
	return error;
};
const getErrorProperties = ({ error, command, escapedCommand, startTime, timedOut, isCanceled, isGracefullyCanceled, isMaxBuffer, isForcefullyTerminated, exitCode, signal, signalDescription, stdio, all, ipcOutput, cwd: cwd$1, originalMessage, shortMessage }) => omitUndefinedProperties({
	shortMessage,
	originalMessage,
	command,
	escapedCommand,
	cwd: cwd$1,
	durationMs: getDurationMs(startTime),
	failed: true,
	timedOut,
	isCanceled,
	isGracefullyCanceled,
	isTerminated: signal !== void 0,
	isMaxBuffer,
	isForcefullyTerminated,
	exitCode,
	signal,
	signalDescription,
	code: error.cause?.code,
	stdout: stdio[1],
	stderr: stdio[2],
	all,
	stdio,
	ipcOutput,
	pipedFrom: []
});
const omitUndefinedProperties = (result) => Object.fromEntries(Object.entries(result).filter(([, value]) => value !== void 0));
const normalizeExitPayload = (rawExitCode, rawSignal) => {
	const exitCode = rawExitCode === null ? void 0 : rawExitCode;
	const signal = rawSignal === null ? void 0 : rawSignal;
	const signalDescription = signal === void 0 ? void 0 : getSignalDescription(rawSignal);
	return {
		exitCode,
		signal,
		signalDescription
	};
};

//#endregion
//#region ../node_modules/parse-ms/index.js
const toZeroIfInfinity = (value) => Number.isFinite(value) ? value : 0;
function parseNumber(milliseconds) {
	return {
		days: Math.trunc(milliseconds / 864e5),
		hours: Math.trunc(milliseconds / 36e5 % 24),
		minutes: Math.trunc(milliseconds / 6e4 % 60),
		seconds: Math.trunc(milliseconds / 1e3 % 60),
		milliseconds: Math.trunc(milliseconds % 1e3),
		microseconds: Math.trunc(toZeroIfInfinity(milliseconds * 1e3) % 1e3),
		nanoseconds: Math.trunc(toZeroIfInfinity(milliseconds * 1e6) % 1e3)
	};
}
function parseBigint(milliseconds) {
	return {
		days: milliseconds / 86400000n,
		hours: milliseconds / 3600000n % 24n,
		minutes: milliseconds / 60000n % 60n,
		seconds: milliseconds / 1000n % 60n,
		milliseconds: milliseconds % 1000n,
		microseconds: 0n,
		nanoseconds: 0n
	};
}
function parseMilliseconds(milliseconds) {
	switch (typeof milliseconds) {
		case "number": {
			if (Number.isFinite(milliseconds)) return parseNumber(milliseconds);
			break;
		}
		case "bigint": return parseBigint(milliseconds);
	}
	throw new TypeError("Expected a finite number or bigint");
}

//#endregion
//#region ../node_modules/pretty-ms/index.js
const isZero = (value) => value === 0 || value === 0n;
const pluralize = (word, count$1) => count$1 === 1 || count$1 === 1n ? word : `${word}s`;
const SECOND_ROUNDING_EPSILON = 1e-7;
const ONE_DAY_IN_MILLISECONDS = 24n * 60n * 60n * 1000n;
function prettyMilliseconds(milliseconds, options) {
	const isBigInt = typeof milliseconds === "bigint";
	if (!isBigInt && !Number.isFinite(milliseconds)) throw new TypeError("Expected a finite number or bigint");
	options = { ...options };
	const sign = milliseconds < 0 ? "-" : "";
	milliseconds = milliseconds < 0 ? -milliseconds : milliseconds;
	if (options.colonNotation) {
		options.compact = false;
		options.formatSubMilliseconds = false;
		options.separateMilliseconds = false;
		options.verbose = false;
	}
	if (options.compact) {
		options.unitCount = 1;
		options.secondsDecimalDigits = 0;
		options.millisecondsDecimalDigits = 0;
	}
	let result = [];
	const floorDecimals = (value, decimalDigits) => {
		const flooredInterimValue = Math.floor(value * 10 ** decimalDigits + SECOND_ROUNDING_EPSILON);
		const flooredValue = Math.round(flooredInterimValue) / 10 ** decimalDigits;
		return flooredValue.toFixed(decimalDigits);
	};
	const add = (value, long, short, valueString) => {
		if ((result.length === 0 || !options.colonNotation) && isZero(value) && !(options.colonNotation && short === "m")) return;
		valueString ??= String(value);
		if (options.colonNotation) {
			const wholeDigits = valueString.includes(".") ? valueString.split(".")[0].length : valueString.length;
			const minLength = result.length > 0 ? 2 : 1;
			valueString = "0".repeat(Math.max(0, minLength - wholeDigits)) + valueString;
		} else valueString += options.verbose ? " " + pluralize(long, value) : short;
		result.push(valueString);
	};
	const parsed = parseMilliseconds(milliseconds);
	const days = BigInt(parsed.days);
	if (options.hideYearAndDays) add(BigInt(days) * 24n + BigInt(parsed.hours), "hour", "h");
	else {
		if (options.hideYear) add(days, "day", "d");
		else {
			add(days / 365n, "year", "y");
			add(days % 365n, "day", "d");
		}
		add(Number(parsed.hours), "hour", "h");
	}
	add(Number(parsed.minutes), "minute", "m");
	if (!options.hideSeconds) if (options.separateMilliseconds || options.formatSubMilliseconds || !options.colonNotation && milliseconds < 1e3) {
		const seconds = Number(parsed.seconds);
		const milliseconds$1 = Number(parsed.milliseconds);
		const microseconds = Number(parsed.microseconds);
		const nanoseconds = Number(parsed.nanoseconds);
		add(seconds, "second", "s");
		if (options.formatSubMilliseconds) {
			add(milliseconds$1, "millisecond", "ms");
			add(microseconds, "microsecond", "µs");
			add(nanoseconds, "nanosecond", "ns");
		} else {
			const millisecondsAndBelow = milliseconds$1 + microseconds / 1e3 + nanoseconds / 1e6;
			const millisecondsDecimalDigits = typeof options.millisecondsDecimalDigits === "number" ? options.millisecondsDecimalDigits : 0;
			const roundedMilliseconds = millisecondsAndBelow >= 1 ? Math.round(millisecondsAndBelow) : Math.ceil(millisecondsAndBelow);
			const millisecondsString = millisecondsDecimalDigits ? millisecondsAndBelow.toFixed(millisecondsDecimalDigits) : roundedMilliseconds;
			add(Number.parseFloat(millisecondsString), "millisecond", "ms", millisecondsString);
		}
	} else {
		const seconds = (isBigInt ? Number(milliseconds % ONE_DAY_IN_MILLISECONDS) : milliseconds) / 1e3 % 60;
		const secondsDecimalDigits = typeof options.secondsDecimalDigits === "number" ? options.secondsDecimalDigits : 1;
		const secondsFixed = floorDecimals(seconds, secondsDecimalDigits);
		const secondsString = options.keepDecimalsOnWholeSeconds ? secondsFixed : secondsFixed.replace(/\.0+$/, "");
		add(Number.parseFloat(secondsString), "second", "s", secondsString);
	}
	if (result.length === 0) return sign + "0" + (options.verbose ? " milliseconds" : "ms");
	const separator = options.colonNotation ? ":" : " ";
	if (typeof options.unitCount === "number") result = result.slice(0, Math.max(options.unitCount, 1));
	return sign + result.join(separator);
}

//#endregion
//#region ../node_modules/execa/lib/verbose/error.js
const logError = (result, verboseInfo) => {
	if (result.failed) verboseLog({
		type: "error",
		verboseMessage: result.shortMessage,
		verboseInfo,
		result
	});
};

//#endregion
//#region ../node_modules/execa/lib/verbose/complete.js
const logResult = (result, verboseInfo) => {
	if (!isVerbose(verboseInfo)) return;
	logError(result, verboseInfo);
	logDuration(result, verboseInfo);
};
const logDuration = (result, verboseInfo) => {
	const verboseMessage = `(done in ${prettyMilliseconds(result.durationMs)})`;
	verboseLog({
		type: "duration",
		verboseMessage,
		verboseInfo,
		result
	});
};

//#endregion
//#region ../node_modules/execa/lib/return/reject.js
const handleResult = (result, verboseInfo, { reject }) => {
	logResult(result, verboseInfo);
	if (result.failed && reject) throw result;
	return result;
};

//#endregion
//#region ../node_modules/execa/lib/stdio/type.js
const getStdioItemType = (value, optionName) => {
	if (isAsyncGenerator(value)) return "asyncGenerator";
	if (isSyncGenerator(value)) return "generator";
	if (isUrl(value)) return "fileUrl";
	if (isFilePathObject(value)) return "filePath";
	if (isWebStream(value)) return "webStream";
	if (isStream(value, { checkOpen: false })) return "native";
	if (isUint8Array(value)) return "uint8Array";
	if (isAsyncIterableObject(value)) return "asyncIterable";
	if (isIterableObject(value)) return "iterable";
	if (isTransformStream(value)) return getTransformStreamType({ transform: value }, optionName);
	if (isTransformOptions(value)) return getTransformObjectType(value, optionName);
	return "native";
};
const getTransformObjectType = (value, optionName) => {
	if (isDuplexStream(value.transform, { checkOpen: false })) return getDuplexType(value, optionName);
	if (isTransformStream(value.transform)) return getTransformStreamType(value, optionName);
	return getGeneratorObjectType(value, optionName);
};
const getDuplexType = (value, optionName) => {
	validateNonGeneratorType(value, optionName, "Duplex stream");
	return "duplex";
};
const getTransformStreamType = (value, optionName) => {
	validateNonGeneratorType(value, optionName, "web TransformStream");
	return "webTransform";
};
const validateNonGeneratorType = ({ final, binary, objectMode }, optionName, typeName) => {
	checkUndefinedOption(final, `${optionName}.final`, typeName);
	checkUndefinedOption(binary, `${optionName}.binary`, typeName);
	checkBooleanOption(objectMode, `${optionName}.objectMode`);
};
const checkUndefinedOption = (value, optionName, typeName) => {
	if (value !== void 0) throw new TypeError(`The \`${optionName}\` option can only be defined when using a generator, not a ${typeName}.`);
};
const getGeneratorObjectType = ({ transform: transform$1, final, binary, objectMode }, optionName) => {
	if (transform$1 !== void 0 && !isGenerator(transform$1)) throw new TypeError(`The \`${optionName}.transform\` option must be a generator, a Duplex stream or a web TransformStream.`);
	if (isDuplexStream(final, { checkOpen: false })) throw new TypeError(`The \`${optionName}.final\` option must not be a Duplex stream.`);
	if (isTransformStream(final)) throw new TypeError(`The \`${optionName}.final\` option must not be a web TransformStream.`);
	if (final !== void 0 && !isGenerator(final)) throw new TypeError(`The \`${optionName}.final\` option must be a generator.`);
	checkBooleanOption(binary, `${optionName}.binary`);
	checkBooleanOption(objectMode, `${optionName}.objectMode`);
	return isAsyncGenerator(transform$1) || isAsyncGenerator(final) ? "asyncGenerator" : "generator";
};
const checkBooleanOption = (value, optionName) => {
	if (value !== void 0 && typeof value !== "boolean") throw new TypeError(`The \`${optionName}\` option must use a boolean.`);
};
const isGenerator = (value) => isAsyncGenerator(value) || isSyncGenerator(value);
const isAsyncGenerator = (value) => Object.prototype.toString.call(value) === "[object AsyncGeneratorFunction]";
const isSyncGenerator = (value) => Object.prototype.toString.call(value) === "[object GeneratorFunction]";
const isTransformOptions = (value) => isPlainObject(value) && (value.transform !== void 0 || value.final !== void 0);
const isUrl = (value) => Object.prototype.toString.call(value) === "[object URL]";
const isRegularUrl = (value) => isUrl(value) && value.protocol !== "file:";
const isFilePathObject = (value) => isPlainObject(value) && Object.keys(value).length > 0 && Object.keys(value).every((key) => FILE_PATH_KEYS.has(key)) && isFilePathString(value.file);
const FILE_PATH_KEYS = new Set(["file", "append"]);
const isFilePathString = (file) => typeof file === "string";
const isUnknownStdioString = (type, value) => type === "native" && typeof value === "string" && !KNOWN_STDIO_STRINGS.has(value);
const KNOWN_STDIO_STRINGS = new Set([
	"ipc",
	"ignore",
	"inherit",
	"overlapped",
	"pipe"
]);
const isReadableStream = (value) => Object.prototype.toString.call(value) === "[object ReadableStream]";
const isWritableStream = (value) => Object.prototype.toString.call(value) === "[object WritableStream]";
const isWebStream = (value) => isReadableStream(value) || isWritableStream(value);
const isTransformStream = (value) => isReadableStream(value?.readable) && isWritableStream(value?.writable);
const isAsyncIterableObject = (value) => isObject$2(value) && typeof value[Symbol.asyncIterator] === "function";
const isIterableObject = (value) => isObject$2(value) && typeof value[Symbol.iterator] === "function";
const isObject$2 = (value) => typeof value === "object" && value !== null;
const TRANSFORM_TYPES = new Set([
	"generator",
	"asyncGenerator",
	"duplex",
	"webTransform"
]);
const FILE_TYPES = new Set([
	"fileUrl",
	"filePath",
	"fileNumber"
]);
const SPECIAL_DUPLICATE_TYPES_SYNC = new Set(["fileUrl", "filePath"]);
const SPECIAL_DUPLICATE_TYPES = new Set([
	...SPECIAL_DUPLICATE_TYPES_SYNC,
	"webStream",
	"nodeStream"
]);
const FORBID_DUPLICATE_TYPES = new Set(["webTransform", "duplex"]);
const TYPE_TO_MESSAGE = {
	generator: "a generator",
	asyncGenerator: "an async generator",
	fileUrl: "a file URL",
	filePath: "a file path string",
	fileNumber: "a file descriptor number",
	webStream: "a web stream",
	nodeStream: "a Node.js stream",
	webTransform: "a web TransformStream",
	duplex: "a Duplex stream",
	native: "any value",
	iterable: "an iterable",
	asyncIterable: "an async iterable",
	string: "a string",
	uint8Array: "a Uint8Array"
};

//#endregion
//#region ../node_modules/execa/lib/transform/object-mode.js
const getTransformObjectModes = (objectMode, index, newTransforms, direction) => direction === "output" ? getOutputObjectModes(objectMode, index, newTransforms) : getInputObjectModes(objectMode, index, newTransforms);
const getOutputObjectModes = (objectMode, index, newTransforms) => {
	const writableObjectMode = index !== 0 && newTransforms[index - 1].value.readableObjectMode;
	const readableObjectMode = objectMode ?? writableObjectMode;
	return {
		writableObjectMode,
		readableObjectMode
	};
};
const getInputObjectModes = (objectMode, index, newTransforms) => {
	const writableObjectMode = index === 0 ? objectMode === true : newTransforms[index - 1].value.readableObjectMode;
	const readableObjectMode = index !== newTransforms.length - 1 && (objectMode ?? writableObjectMode);
	return {
		writableObjectMode,
		readableObjectMode
	};
};
const getFdObjectMode = (stdioItems, direction) => {
	const lastTransform = stdioItems.findLast(({ type }) => TRANSFORM_TYPES.has(type));
	if (lastTransform === void 0) return false;
	return direction === "input" ? lastTransform.value.writableObjectMode : lastTransform.value.readableObjectMode;
};

//#endregion
//#region ../node_modules/execa/lib/transform/normalize.js
const normalizeTransforms = (stdioItems, optionName, direction, options) => [...stdioItems.filter(({ type }) => !TRANSFORM_TYPES.has(type)), ...getTransforms(stdioItems, optionName, direction, options)];
const getTransforms = (stdioItems, optionName, direction, { encoding }) => {
	const transforms = stdioItems.filter(({ type }) => TRANSFORM_TYPES.has(type));
	const newTransforms = Array.from({ length: transforms.length });
	for (const [index, stdioItem] of Object.entries(transforms)) newTransforms[index] = normalizeTransform({
		stdioItem,
		index: Number(index),
		newTransforms,
		optionName,
		direction,
		encoding
	});
	return sortTransforms(newTransforms, direction);
};
const normalizeTransform = ({ stdioItem, stdioItem: { type }, index, newTransforms, optionName, direction, encoding }) => {
	if (type === "duplex") return normalizeDuplex({
		stdioItem,
		optionName
	});
	if (type === "webTransform") return normalizeTransformStream({
		stdioItem,
		index,
		newTransforms,
		direction
	});
	return normalizeGenerator({
		stdioItem,
		index,
		newTransforms,
		direction,
		encoding
	});
};
const normalizeDuplex = ({ stdioItem, stdioItem: { value: { transform: transform$1, transform: { writableObjectMode, readableObjectMode }, objectMode = readableObjectMode } }, optionName }) => {
	if (objectMode && !readableObjectMode) throw new TypeError(`The \`${optionName}.objectMode\` option can only be \`true\` if \`new Duplex({objectMode: true})\` is used.`);
	if (!objectMode && readableObjectMode) throw new TypeError(`The \`${optionName}.objectMode\` option cannot be \`false\` if \`new Duplex({objectMode: true})\` is used.`);
	return {
		...stdioItem,
		value: {
			transform: transform$1,
			writableObjectMode,
			readableObjectMode
		}
	};
};
const normalizeTransformStream = ({ stdioItem, stdioItem: { value }, index, newTransforms, direction }) => {
	const { transform: transform$1, objectMode } = isPlainObject(value) ? value : { transform: value };
	const { writableObjectMode, readableObjectMode } = getTransformObjectModes(objectMode, index, newTransforms, direction);
	return {
		...stdioItem,
		value: {
			transform: transform$1,
			writableObjectMode,
			readableObjectMode
		}
	};
};
const normalizeGenerator = ({ stdioItem, stdioItem: { value }, index, newTransforms, direction, encoding }) => {
	const { transform: transform$1, final, binary: binaryOption = false, preserveNewlines = false, objectMode } = isPlainObject(value) ? value : { transform: value };
	const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
	const { writableObjectMode, readableObjectMode } = getTransformObjectModes(objectMode, index, newTransforms, direction);
	return {
		...stdioItem,
		value: {
			transform: transform$1,
			final,
			binary,
			preserveNewlines,
			writableObjectMode,
			readableObjectMode
		}
	};
};
const sortTransforms = (newTransforms, direction) => direction === "input" ? newTransforms.reverse() : newTransforms;

//#endregion
//#region ../node_modules/execa/lib/stdio/direction.js
const getStreamDirection = (stdioItems, fdNumber, optionName) => {
	const directions = stdioItems.map((stdioItem) => getStdioItemDirection(stdioItem, fdNumber));
	if (directions.includes("input") && directions.includes("output")) throw new TypeError(`The \`${optionName}\` option must not be an array of both readable and writable values.`);
	return directions.find(Boolean) ?? DEFAULT_DIRECTION;
};
const getStdioItemDirection = ({ type, value }, fdNumber) => KNOWN_DIRECTIONS[fdNumber] ?? guessStreamDirection[type](value);
const KNOWN_DIRECTIONS = [
	"input",
	"output",
	"output"
];
const anyDirection = () => void 0;
const alwaysInput = () => "input";
const guessStreamDirection = {
	generator: anyDirection,
	asyncGenerator: anyDirection,
	fileUrl: anyDirection,
	filePath: anyDirection,
	iterable: alwaysInput,
	asyncIterable: alwaysInput,
	uint8Array: alwaysInput,
	webStream: (value) => isWritableStream(value) ? "output" : "input",
	nodeStream(value) {
		if (!isReadableStream$1(value, { checkOpen: false })) return "output";
		return isWritableStream$1(value, { checkOpen: false }) ? void 0 : "input";
	},
	webTransform: anyDirection,
	duplex: anyDirection,
	native(value) {
		const standardStreamDirection = getStandardStreamDirection(value);
		if (standardStreamDirection !== void 0) return standardStreamDirection;
		if (isStream(value, { checkOpen: false })) return guessStreamDirection.nodeStream(value);
	}
};
const getStandardStreamDirection = (value) => {
	if ([0, y.stdin].includes(value)) return "input";
	if ([
		1,
		2,
		y.stdout,
		y.stderr
	].includes(value)) return "output";
};
const DEFAULT_DIRECTION = "output";

//#endregion
//#region ../node_modules/execa/lib/ipc/array.js
const normalizeIpcStdioArray = (stdioArray, ipc) => ipc && !stdioArray.includes("ipc") ? [...stdioArray, "ipc"] : stdioArray;

//#endregion
//#region ../node_modules/execa/lib/stdio/stdio-option.js
const normalizeStdioOption = ({ stdio, ipc, buffer,...options }, verboseInfo, isSync) => {
	const stdioArray = getStdioArray(stdio, options).map((stdioOption, fdNumber) => addDefaultValue(stdioOption, fdNumber));
	return isSync ? normalizeStdioSync(stdioArray, buffer, verboseInfo) : normalizeIpcStdioArray(stdioArray, ipc);
};
const getStdioArray = (stdio, options) => {
	if (stdio === void 0) return STANDARD_STREAMS_ALIASES.map((alias) => options[alias]);
	if (hasAlias(options)) throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${STANDARD_STREAMS_ALIASES.map((alias) => `\`${alias}\``).join(", ")}`);
	if (typeof stdio === "string") return [
		stdio,
		stdio,
		stdio
	];
	if (!Array.isArray(stdio)) throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
	const length = Math.max(stdio.length, STANDARD_STREAMS_ALIASES.length);
	return Array.from({ length }, (_$2, fdNumber) => stdio[fdNumber]);
};
const hasAlias = (options) => STANDARD_STREAMS_ALIASES.some((alias) => options[alias] !== void 0);
const addDefaultValue = (stdioOption, fdNumber) => {
	if (Array.isArray(stdioOption)) return stdioOption.map((item) => addDefaultValue(item, fdNumber));
	if (stdioOption === null || stdioOption === void 0) return fdNumber >= STANDARD_STREAMS_ALIASES.length ? "ignore" : "pipe";
	return stdioOption;
};
const normalizeStdioSync = (stdioArray, buffer, verboseInfo) => stdioArray.map((stdioOption, fdNumber) => !buffer[fdNumber] && fdNumber !== 0 && !isFullVerbose(verboseInfo, fdNumber) && isOutputPipeOnly(stdioOption) ? "ignore" : stdioOption);
const isOutputPipeOnly = (stdioOption) => stdioOption === "pipe" || Array.isArray(stdioOption) && stdioOption.every((item) => item === "pipe");

//#endregion
//#region ../node_modules/execa/lib/stdio/native.js
const handleNativeStream = ({ stdioItem, stdioItem: { type }, isStdioArray, fdNumber, direction, isSync }) => {
	if (!isStdioArray || type !== "native") return stdioItem;
	return isSync ? handleNativeStreamSync({
		stdioItem,
		fdNumber,
		direction
	}) : handleNativeStreamAsync({
		stdioItem,
		fdNumber
	});
};
const handleNativeStreamSync = ({ stdioItem, stdioItem: { value, optionName }, fdNumber, direction }) => {
	const targetFd = getTargetFd({
		value,
		optionName,
		fdNumber,
		direction
	});
	if (targetFd !== void 0) return targetFd;
	if (isStream(value, { checkOpen: false })) throw new TypeError(`The \`${optionName}: Stream\` option cannot both be an array and include a stream with synchronous methods.`);
	return stdioItem;
};
const getTargetFd = ({ value, optionName, fdNumber, direction }) => {
	const targetFdNumber = getTargetFdNumber(value, fdNumber);
	if (targetFdNumber === void 0) return;
	if (direction === "output") return {
		type: "fileNumber",
		value: targetFdNumber,
		optionName
	};
	if (tty.isatty(targetFdNumber)) throw new TypeError(`The \`${optionName}: ${serializeOptionValue(value)}\` option is invalid: it cannot be a TTY with synchronous methods.`);
	return {
		type: "uint8Array",
		value: bufferToUint8Array(readFileSync(targetFdNumber)),
		optionName
	};
};
const getTargetFdNumber = (value, fdNumber) => {
	if (value === "inherit") return fdNumber;
	if (typeof value === "number") return value;
	const standardStreamIndex = STANDARD_STREAMS.indexOf(value);
	if (standardStreamIndex !== -1) return standardStreamIndex;
};
const handleNativeStreamAsync = ({ stdioItem, stdioItem: { value, optionName }, fdNumber }) => {
	if (value === "inherit") return {
		type: "nodeStream",
		value: getStandardStream(fdNumber, value, optionName),
		optionName
	};
	if (typeof value === "number") return {
		type: "nodeStream",
		value: getStandardStream(value, value, optionName),
		optionName
	};
	if (isStream(value, { checkOpen: false })) return {
		type: "nodeStream",
		value,
		optionName
	};
	return stdioItem;
};
const getStandardStream = (fdNumber, value, optionName) => {
	const standardStream = STANDARD_STREAMS[fdNumber];
	if (standardStream === void 0) throw new TypeError(`The \`${optionName}: ${value}\` option is invalid: no such standard stream.`);
	return standardStream;
};

//#endregion
//#region ../node_modules/execa/lib/stdio/input-option.js
const handleInputOptions = ({ input, inputFile }, fdNumber) => fdNumber === 0 ? [...handleInputOption(input), ...handleInputFileOption(inputFile)] : [];
const handleInputOption = (input) => input === void 0 ? [] : [{
	type: getInputType(input),
	value: input,
	optionName: "input"
}];
const getInputType = (input) => {
	if (isReadableStream$1(input, { checkOpen: false })) return "nodeStream";
	if (typeof input === "string") return "string";
	if (isUint8Array(input)) return "uint8Array";
	throw new Error("The `input` option must be a string, a Uint8Array or a Node.js Readable stream.");
};
const handleInputFileOption = (inputFile) => inputFile === void 0 ? [] : [{
	...getInputFileType(inputFile),
	optionName: "inputFile"
}];
const getInputFileType = (inputFile) => {
	if (isUrl(inputFile)) return {
		type: "fileUrl",
		value: inputFile
	};
	if (isFilePathString(inputFile)) return {
		type: "filePath",
		value: { file: inputFile }
	};
	throw new Error("The `inputFile` option must be a file path string or a file URL.");
};

//#endregion
//#region ../node_modules/execa/lib/stdio/duplicate.js
const filterDuplicates = (stdioItems) => stdioItems.filter((stdioItemOne, indexOne) => stdioItems.every((stdioItemTwo, indexTwo) => stdioItemOne.value !== stdioItemTwo.value || indexOne >= indexTwo || stdioItemOne.type === "generator" || stdioItemOne.type === "asyncGenerator"));
const getDuplicateStream = ({ stdioItem: { type, value, optionName }, direction, fileDescriptors, isSync }) => {
	const otherStdioItems = getOtherStdioItems(fileDescriptors, type);
	if (otherStdioItems.length === 0) return;
	if (isSync) {
		validateDuplicateStreamSync({
			otherStdioItems,
			type,
			value,
			optionName,
			direction
		});
		return;
	}
	if (SPECIAL_DUPLICATE_TYPES.has(type)) return getDuplicateStreamInstance({
		otherStdioItems,
		type,
		value,
		optionName,
		direction
	});
	if (FORBID_DUPLICATE_TYPES.has(type)) validateDuplicateTransform({
		otherStdioItems,
		type,
		value,
		optionName
	});
};
const getOtherStdioItems = (fileDescriptors, type) => fileDescriptors.flatMap(({ direction, stdioItems }) => stdioItems.filter((stdioItem) => stdioItem.type === type).map((stdioItem) => ({
	...stdioItem,
	direction
})));
const validateDuplicateStreamSync = ({ otherStdioItems, type, value, optionName, direction }) => {
	if (SPECIAL_DUPLICATE_TYPES_SYNC.has(type)) getDuplicateStreamInstance({
		otherStdioItems,
		type,
		value,
		optionName,
		direction
	});
};
const getDuplicateStreamInstance = ({ otherStdioItems, type, value, optionName, direction }) => {
	const duplicateStdioItems = otherStdioItems.filter((stdioItem) => hasSameValue(stdioItem, value));
	if (duplicateStdioItems.length === 0) return;
	const differentStdioItem = duplicateStdioItems.find((stdioItem) => stdioItem.direction !== direction);
	throwOnDuplicateStream(differentStdioItem, optionName, type);
	return direction === "output" ? duplicateStdioItems[0].stream : void 0;
};
const hasSameValue = ({ type, value }, secondValue) => {
	if (type === "filePath") return value.file === secondValue.file;
	if (type === "fileUrl") return value.href === secondValue.href;
	return value === secondValue;
};
const validateDuplicateTransform = ({ otherStdioItems, type, value, optionName }) => {
	const duplicateStdioItem = otherStdioItems.find(({ value: { transform: transform$1 } }) => transform$1 === value.transform);
	throwOnDuplicateStream(duplicateStdioItem, optionName, type);
};
const throwOnDuplicateStream = (stdioItem, optionName, type) => {
	if (stdioItem !== void 0) throw new TypeError(`The \`${stdioItem.optionName}\` and \`${optionName}\` options must not target ${TYPE_TO_MESSAGE[type]} that is the same.`);
};

//#endregion
//#region ../node_modules/execa/lib/stdio/handle.js
const handleStdio = (addProperties$2, options, verboseInfo, isSync) => {
	const stdio = normalizeStdioOption(options, verboseInfo, isSync);
	const initialFileDescriptors = stdio.map((stdioOption, fdNumber) => getFileDescriptor({
		stdioOption,
		fdNumber,
		options,
		isSync
	}));
	const fileDescriptors = getFinalFileDescriptors({
		initialFileDescriptors,
		addProperties: addProperties$2,
		options,
		isSync
	});
	options.stdio = fileDescriptors.map(({ stdioItems }) => forwardStdio(stdioItems));
	return fileDescriptors;
};
const getFileDescriptor = ({ stdioOption, fdNumber, options, isSync }) => {
	const optionName = getStreamName(fdNumber);
	const { stdioItems: initialStdioItems, isStdioArray } = initializeStdioItems({
		stdioOption,
		fdNumber,
		options,
		optionName
	});
	const direction = getStreamDirection(initialStdioItems, fdNumber, optionName);
	const stdioItems = initialStdioItems.map((stdioItem) => handleNativeStream({
		stdioItem,
		isStdioArray,
		fdNumber,
		direction,
		isSync
	}));
	const normalizedStdioItems = normalizeTransforms(stdioItems, optionName, direction, options);
	const objectMode = getFdObjectMode(normalizedStdioItems, direction);
	validateFileObjectMode(normalizedStdioItems, objectMode);
	return {
		direction,
		objectMode,
		stdioItems: normalizedStdioItems
	};
};
const initializeStdioItems = ({ stdioOption, fdNumber, options, optionName }) => {
	const values = Array.isArray(stdioOption) ? stdioOption : [stdioOption];
	const initialStdioItems = [...values.map((value) => initializeStdioItem(value, optionName)), ...handleInputOptions(options, fdNumber)];
	const stdioItems = filterDuplicates(initialStdioItems);
	const isStdioArray = stdioItems.length > 1;
	validateStdioArray(stdioItems, isStdioArray, optionName);
	validateStreams(stdioItems);
	return {
		stdioItems,
		isStdioArray
	};
};
const initializeStdioItem = (value, optionName) => ({
	type: getStdioItemType(value, optionName),
	value,
	optionName
});
const validateStdioArray = (stdioItems, isStdioArray, optionName) => {
	if (stdioItems.length === 0) throw new TypeError(`The \`${optionName}\` option must not be an empty array.`);
	if (!isStdioArray) return;
	for (const { value, optionName: optionName$1 } of stdioItems) if (INVALID_STDIO_ARRAY_OPTIONS.has(value)) throw new Error(`The \`${optionName$1}\` option must not include \`${value}\`.`);
};
const INVALID_STDIO_ARRAY_OPTIONS = new Set(["ignore", "ipc"]);
const validateStreams = (stdioItems) => {
	for (const stdioItem of stdioItems) validateFileStdio(stdioItem);
};
const validateFileStdio = ({ type, value, optionName }) => {
	if (isRegularUrl(value)) throw new TypeError(`The \`${optionName}: URL\` option must use the \`file:\` scheme.
For example, you can use the \`pathToFileURL()\` method of the \`url\` core module.`);
	if (isUnknownStdioString(type, value)) throw new TypeError(`The \`${optionName}: { file: '...' }\` option must be used instead of \`${optionName}: '...'\`.`);
};
const validateFileObjectMode = (stdioItems, objectMode) => {
	if (!objectMode) return;
	const fileStdioItem = stdioItems.find(({ type }) => FILE_TYPES.has(type));
	if (fileStdioItem !== void 0) throw new TypeError(`The \`${fileStdioItem.optionName}\` option cannot use both files and transforms in objectMode.`);
};
const getFinalFileDescriptors = ({ initialFileDescriptors, addProperties: addProperties$2, options, isSync }) => {
	const fileDescriptors = [];
	try {
		for (const fileDescriptor of initialFileDescriptors) fileDescriptors.push(getFinalFileDescriptor({
			fileDescriptor,
			fileDescriptors,
			addProperties: addProperties$2,
			options,
			isSync
		}));
		return fileDescriptors;
	} catch (error) {
		cleanupCustomStreams(fileDescriptors);
		throw error;
	}
};
const getFinalFileDescriptor = ({ fileDescriptor: { direction, objectMode, stdioItems }, fileDescriptors, addProperties: addProperties$2, options, isSync }) => {
	const finalStdioItems = stdioItems.map((stdioItem) => addStreamProperties({
		stdioItem,
		addProperties: addProperties$2,
		direction,
		options,
		fileDescriptors,
		isSync
	}));
	return {
		direction,
		objectMode,
		stdioItems: finalStdioItems
	};
};
const addStreamProperties = ({ stdioItem, addProperties: addProperties$2, direction, options, fileDescriptors, isSync }) => {
	const duplicateStream = getDuplicateStream({
		stdioItem,
		direction,
		fileDescriptors,
		isSync
	});
	if (duplicateStream !== void 0) return {
		...stdioItem,
		stream: duplicateStream
	};
	return {
		...stdioItem,
		...addProperties$2[direction][stdioItem.type](stdioItem, options)
	};
};
const cleanupCustomStreams = (fileDescriptors) => {
	for (const { stdioItems } of fileDescriptors) for (const { stream: stream$1 } of stdioItems) if (stream$1 !== void 0 && !isStandardStream(stream$1)) stream$1.destroy();
};
const forwardStdio = (stdioItems) => {
	if (stdioItems.length > 1) return stdioItems.some(({ value: value$1 }) => value$1 === "overlapped") ? "overlapped" : "pipe";
	const [{ type, value }] = stdioItems;
	return type === "native" ? value : "pipe";
};

//#endregion
//#region ../node_modules/execa/lib/stdio/handle-sync.js
const handleStdioSync = (options, verboseInfo) => handleStdio(addPropertiesSync, options, verboseInfo, true);
const forbiddenIfSync = ({ type, optionName }) => {
	throwInvalidSyncValue(optionName, TYPE_TO_MESSAGE[type]);
};
const forbiddenNativeIfSync = ({ optionName, value }) => {
	if (value === "ipc" || value === "overlapped") throwInvalidSyncValue(optionName, `"${value}"`);
	return {};
};
const throwInvalidSyncValue = (optionName, value) => {
	throw new TypeError(`The \`${optionName}\` option cannot be ${value} with synchronous methods.`);
};
const addProperties$1 = {
	generator() {},
	asyncGenerator: forbiddenIfSync,
	webStream: forbiddenIfSync,
	nodeStream: forbiddenIfSync,
	webTransform: forbiddenIfSync,
	duplex: forbiddenIfSync,
	asyncIterable: forbiddenIfSync,
	native: forbiddenNativeIfSync
};
const addPropertiesSync = {
	input: {
		...addProperties$1,
		fileUrl: ({ value }) => ({ contents: [bufferToUint8Array(readFileSync(value))] }),
		filePath: ({ value: { file } }) => ({ contents: [bufferToUint8Array(readFileSync(file))] }),
		fileNumber: forbiddenIfSync,
		iterable: ({ value }) => ({ contents: [...value] }),
		string: ({ value }) => ({ contents: [value] }),
		uint8Array: ({ value }) => ({ contents: [value] })
	},
	output: {
		...addProperties$1,
		fileUrl: ({ value }) => ({ path: value }),
		filePath: ({ value: { file, append: append$1 } }) => ({
			path: file,
			append: append$1
		}),
		fileNumber: ({ value }) => ({ path: value }),
		iterable: forbiddenIfSync,
		string: forbiddenIfSync,
		uint8Array: forbiddenIfSync
	}
};

//#endregion
//#region ../node_modules/execa/lib/io/strip-newline.js
const stripNewline = (value, { stripFinalNewline: stripFinalNewline$1 }, fdNumber) => getStripFinalNewline(stripFinalNewline$1, fdNumber) && value !== void 0 && !Array.isArray(value) ? stripFinalNewline(value) : value;
const getStripFinalNewline = (stripFinalNewline$1, fdNumber) => fdNumber === "all" ? stripFinalNewline$1[1] || stripFinalNewline$1[2] : stripFinalNewline$1[fdNumber];

//#endregion
//#region ../node_modules/execa/lib/transform/split.js
const getSplitLinesGenerator = (binary, preserveNewlines, skipped, state) => binary || skipped ? void 0 : initializeSplitLines(preserveNewlines, state);
const splitLinesSync = (chunk, preserveNewlines, objectMode) => objectMode ? chunk.flatMap((item) => splitLinesItemSync(item, preserveNewlines)) : splitLinesItemSync(chunk, preserveNewlines);
const splitLinesItemSync = (chunk, preserveNewlines) => {
	const { transform: transform$1, final } = initializeSplitLines(preserveNewlines, {});
	return [...transform$1(chunk), ...final()];
};
const initializeSplitLines = (preserveNewlines, state) => {
	state.previousChunks = "";
	return {
		transform: splitGenerator.bind(void 0, state, preserveNewlines),
		final: linesFinal.bind(void 0, state)
	};
};
const splitGenerator = function* (state, preserveNewlines, chunk) {
	if (typeof chunk !== "string") {
		yield chunk;
		return;
	}
	let { previousChunks } = state;
	let start = -1;
	for (let end = 0; end < chunk.length; end += 1) if (chunk[end] === "\n") {
		const newlineLength = getNewlineLength(chunk, end, preserveNewlines, state);
		let line = chunk.slice(start + 1, end + 1 - newlineLength);
		if (previousChunks.length > 0) {
			line = concatString(previousChunks, line);
			previousChunks = "";
		}
		yield line;
		start = end;
	}
	if (start !== chunk.length - 1) previousChunks = concatString(previousChunks, chunk.slice(start + 1));
	state.previousChunks = previousChunks;
};
const getNewlineLength = (chunk, end, preserveNewlines, state) => {
	if (preserveNewlines) return 0;
	state.isWindowsNewline = end !== 0 && chunk[end - 1] === "\r";
	return state.isWindowsNewline ? 2 : 1;
};
const linesFinal = function* ({ previousChunks }) {
	if (previousChunks.length > 0) yield previousChunks;
};
const getAppendNewlineGenerator = ({ binary, preserveNewlines, readableObjectMode, state }) => binary || preserveNewlines || readableObjectMode ? void 0 : { transform: appendNewlineGenerator.bind(void 0, state) };
const appendNewlineGenerator = function* ({ isWindowsNewline = false }, chunk) {
	const { unixNewline, windowsNewline, LF: LF$1, concatBytes } = typeof chunk === "string" ? linesStringInfo : linesUint8ArrayInfo;
	if (chunk.at(-1) === LF$1) {
		yield chunk;
		return;
	}
	const newline = isWindowsNewline ? windowsNewline : unixNewline;
	yield concatBytes(chunk, newline);
};
const concatString = (firstChunk, secondChunk) => `${firstChunk}${secondChunk}`;
const linesStringInfo = {
	windowsNewline: "\r\n",
	unixNewline: "\n",
	LF: "\n",
	concatBytes: concatString
};
const concatUint8Array = (firstChunk, secondChunk) => {
	const chunk = new Uint8Array(firstChunk.length + secondChunk.length);
	chunk.set(firstChunk, 0);
	chunk.set(secondChunk, firstChunk.length);
	return chunk;
};
const linesUint8ArrayInfo = {
	windowsNewline: new Uint8Array([13, 10]),
	unixNewline: new Uint8Array([10]),
	LF: 10,
	concatBytes: concatUint8Array
};

//#endregion
//#region ../node_modules/execa/lib/transform/validate.js
const getValidateTransformInput = (writableObjectMode, optionName) => writableObjectMode ? void 0 : validateStringTransformInput.bind(void 0, optionName);
const validateStringTransformInput = function* (optionName, chunk) {
	if (typeof chunk !== "string" && !isUint8Array(chunk) && !Buffer$1.isBuffer(chunk)) throw new TypeError(`The \`${optionName}\` option's transform must use "objectMode: true" to receive as input: ${typeof chunk}.`);
	yield chunk;
};
const getValidateTransformReturn = (readableObjectMode, optionName) => readableObjectMode ? validateObjectTransformReturn.bind(void 0, optionName) : validateStringTransformReturn.bind(void 0, optionName);
const validateObjectTransformReturn = function* (optionName, chunk) {
	validateEmptyReturn(optionName, chunk);
	yield chunk;
};
const validateStringTransformReturn = function* (optionName, chunk) {
	validateEmptyReturn(optionName, chunk);
	if (typeof chunk !== "string" && !isUint8Array(chunk)) throw new TypeError(`The \`${optionName}\` option's function must yield a string or an Uint8Array, not ${typeof chunk}.`);
	yield chunk;
};
const validateEmptyReturn = (optionName, chunk) => {
	if (chunk === null || chunk === void 0) throw new TypeError(`The \`${optionName}\` option's function must not call \`yield ${chunk}\`.
Instead, \`yield\` should either be called with a value, or not be called at all. For example:
  if (condition) { yield value; }`);
};

//#endregion
//#region ../node_modules/execa/lib/transform/encoding-transform.js
const getEncodingTransformGenerator = (binary, encoding, skipped) => {
	if (skipped) return;
	if (binary) return { transform: encodingUint8ArrayGenerator.bind(void 0, new TextEncoder()) };
	const stringDecoder = new StringDecoder(encoding);
	return {
		transform: encodingStringGenerator.bind(void 0, stringDecoder),
		final: encodingStringFinal.bind(void 0, stringDecoder)
	};
};
const encodingUint8ArrayGenerator = function* (textEncoder$2, chunk) {
	if (Buffer$1.isBuffer(chunk)) yield bufferToUint8Array(chunk);
	else if (typeof chunk === "string") yield textEncoder$2.encode(chunk);
	else yield chunk;
};
const encodingStringGenerator = function* (stringDecoder, chunk) {
	yield isUint8Array(chunk) ? stringDecoder.write(chunk) : chunk;
};
const encodingStringFinal = function* (stringDecoder) {
	const lastChunk = stringDecoder.end();
	if (lastChunk !== "") yield lastChunk;
};

//#endregion
//#region ../node_modules/execa/lib/transform/run-async.js
const pushChunks = callbackify(async (getChunks, state, getChunksArguments, transformStream) => {
	state.currentIterable = getChunks(...getChunksArguments);
	try {
		for await (const chunk of state.currentIterable) transformStream.push(chunk);
	} finally {
		delete state.currentIterable;
	}
});
const transformChunk = async function* (chunk, generators, index) {
	if (index === generators.length) {
		yield chunk;
		return;
	}
	const { transform: transform$1 = identityGenerator$1 } = generators[index];
	for await (const transformedChunk of transform$1(chunk)) yield* transformChunk(transformedChunk, generators, index + 1);
};
const finalChunks = async function* (generators) {
	for (const [index, { final }] of Object.entries(generators)) yield* generatorFinalChunks(final, Number(index), generators);
};
const generatorFinalChunks = async function* (final, index, generators) {
	if (final === void 0) return;
	for await (const finalChunk of final()) yield* transformChunk(finalChunk, generators, index + 1);
};
const destroyTransform = callbackify(async ({ currentIterable }, error) => {
	if (currentIterable !== void 0) {
		await (error ? currentIterable.throw(error) : currentIterable.return());
		return;
	}
	if (error) throw error;
});
const identityGenerator$1 = function* (chunk) {
	yield chunk;
};

//#endregion
//#region ../node_modules/execa/lib/transform/run-sync.js
const pushChunksSync = (getChunksSync, getChunksArguments, transformStream, done) => {
	try {
		for (const chunk of getChunksSync(...getChunksArguments)) transformStream.push(chunk);
		done();
	} catch (error) {
		done(error);
	}
};
const runTransformSync = (generators, chunks) => [...chunks.flatMap((chunk) => [...transformChunkSync(chunk, generators, 0)]), ...finalChunksSync(generators)];
const transformChunkSync = function* (chunk, generators, index) {
	if (index === generators.length) {
		yield chunk;
		return;
	}
	const { transform: transform$1 = identityGenerator } = generators[index];
	for (const transformedChunk of transform$1(chunk)) yield* transformChunkSync(transformedChunk, generators, index + 1);
};
const finalChunksSync = function* (generators) {
	for (const [index, { final }] of Object.entries(generators)) yield* generatorFinalChunksSync(final, Number(index), generators);
};
const generatorFinalChunksSync = function* (final, index, generators) {
	if (final === void 0) return;
	for (const finalChunk of final()) yield* transformChunkSync(finalChunk, generators, index + 1);
};
const identityGenerator = function* (chunk) {
	yield chunk;
};

//#endregion
//#region ../node_modules/execa/lib/transform/generator.js
const generatorToStream = ({ value, value: { transform: transform$1, final, writableObjectMode, readableObjectMode }, optionName }, { encoding }) => {
	const state = {};
	const generators = addInternalGenerators(value, encoding, optionName);
	const transformAsync = isAsyncGenerator(transform$1);
	const finalAsync = isAsyncGenerator(final);
	const transformMethod = transformAsync ? pushChunks.bind(void 0, transformChunk, state) : pushChunksSync.bind(void 0, transformChunkSync);
	const finalMethod = transformAsync || finalAsync ? pushChunks.bind(void 0, finalChunks, state) : pushChunksSync.bind(void 0, finalChunksSync);
	const destroyMethod = transformAsync || finalAsync ? destroyTransform.bind(void 0, state) : void 0;
	const stream$1 = new Transform({
		writableObjectMode,
		writableHighWaterMark: getDefaultHighWaterMark(writableObjectMode),
		readableObjectMode,
		readableHighWaterMark: getDefaultHighWaterMark(readableObjectMode),
		transform(chunk, encoding$1, done) {
			transformMethod([
				chunk,
				generators,
				0
			], this, done);
		},
		flush(done) {
			finalMethod([generators], this, done);
		},
		destroy: destroyMethod
	});
	return { stream: stream$1 };
};
const runGeneratorsSync = (chunks, stdioItems, encoding, isInput) => {
	const generators = stdioItems.filter(({ type }) => type === "generator");
	const reversedGenerators = isInput ? generators.reverse() : generators;
	for (const { value, optionName } of reversedGenerators) {
		const generators$1 = addInternalGenerators(value, encoding, optionName);
		chunks = runTransformSync(generators$1, chunks);
	}
	return chunks;
};
const addInternalGenerators = ({ transform: transform$1, final, binary, writableObjectMode, readableObjectMode, preserveNewlines }, encoding, optionName) => {
	const state = {};
	return [
		{ transform: getValidateTransformInput(writableObjectMode, optionName) },
		getEncodingTransformGenerator(binary, encoding, writableObjectMode),
		getSplitLinesGenerator(binary, preserveNewlines, writableObjectMode, state),
		{
			transform: transform$1,
			final
		},
		{ transform: getValidateTransformReturn(readableObjectMode, optionName) },
		getAppendNewlineGenerator({
			binary,
			preserveNewlines,
			readableObjectMode,
			state
		})
	].filter(Boolean);
};

//#endregion
//#region ../node_modules/execa/lib/io/input-sync.js
const addInputOptionsSync = (fileDescriptors, options) => {
	for (const fdNumber of getInputFdNumbers(fileDescriptors)) addInputOptionSync(fileDescriptors, fdNumber, options);
};
const getInputFdNumbers = (fileDescriptors) => new Set(Object.entries(fileDescriptors).filter(([, { direction }]) => direction === "input").map(([fdNumber]) => Number(fdNumber)));
const addInputOptionSync = (fileDescriptors, fdNumber, options) => {
	const { stdioItems } = fileDescriptors[fdNumber];
	const allStdioItems = stdioItems.filter(({ contents }) => contents !== void 0);
	if (allStdioItems.length === 0) return;
	if (fdNumber !== 0) {
		const [{ type, optionName }] = allStdioItems;
		throw new TypeError(`Only the \`stdin\` option, not \`${optionName}\`, can be ${TYPE_TO_MESSAGE[type]} with synchronous methods.`);
	}
	const allContents = allStdioItems.map(({ contents }) => contents);
	const transformedContents = allContents.map((contents) => applySingleInputGeneratorsSync(contents, stdioItems));
	options.input = joinToUint8Array(transformedContents);
};
const applySingleInputGeneratorsSync = (contents, stdioItems) => {
	const newContents = runGeneratorsSync(contents, stdioItems, "utf8", true);
	validateSerializable(newContents);
	return joinToUint8Array(newContents);
};
const validateSerializable = (newContents) => {
	const invalidItem = newContents.find((item) => typeof item !== "string" && !isUint8Array(item));
	if (invalidItem !== void 0) throw new TypeError(`The \`stdin\` option is invalid: when passing objects as input, a transform must be used to serialize them to strings or Uint8Arrays: ${invalidItem}.`);
};

//#endregion
//#region ../node_modules/execa/lib/verbose/output.js
const shouldLogOutput = ({ stdioItems, encoding, verboseInfo, fdNumber }) => fdNumber !== "all" && isFullVerbose(verboseInfo, fdNumber) && !BINARY_ENCODINGS.has(encoding) && fdUsesVerbose(fdNumber) && (stdioItems.some(({ type, value }) => type === "native" && PIPED_STDIO_VALUES.has(value)) || stdioItems.every(({ type }) => TRANSFORM_TYPES.has(type)));
const fdUsesVerbose = (fdNumber) => fdNumber === 1 || fdNumber === 2;
const PIPED_STDIO_VALUES = new Set(["pipe", "overlapped"]);
const logLines = async (linesIterable, stream$1, fdNumber, verboseInfo) => {
	for await (const line of linesIterable) if (!isPipingStream(stream$1)) logLine(line, fdNumber, verboseInfo);
};
const logLinesSync = (linesArray, fdNumber, verboseInfo) => {
	for (const line of linesArray) logLine(line, fdNumber, verboseInfo);
};
const isPipingStream = (stream$1) => stream$1._readableState.pipes.length > 0;
const logLine = (line, fdNumber, verboseInfo) => {
	const verboseMessage = serializeVerboseMessage(line);
	verboseLog({
		type: "output",
		verboseMessage,
		fdNumber,
		verboseInfo
	});
};

//#endregion
//#region ../node_modules/execa/lib/io/output-sync.js
const transformOutputSync = ({ fileDescriptors, syncResult: { output }, options, isMaxBuffer, verboseInfo }) => {
	if (output === null) return { output: Array.from({ length: 3 }) };
	const state = {};
	const outputFiles = new Set([]);
	const transformedOutput = output.map((result, fdNumber) => transformOutputResultSync({
		result,
		fileDescriptors,
		fdNumber,
		state,
		outputFiles,
		isMaxBuffer,
		verboseInfo
	}, options));
	return {
		output: transformedOutput,
		...state
	};
};
const transformOutputResultSync = ({ result, fileDescriptors, fdNumber, state, outputFiles, isMaxBuffer, verboseInfo }, { buffer, encoding, lines, stripFinalNewline: stripFinalNewline$1, maxBuffer }) => {
	if (result === null) return;
	const truncatedResult = truncateMaxBufferSync(result, isMaxBuffer, maxBuffer);
	const uint8ArrayResult = bufferToUint8Array(truncatedResult);
	const { stdioItems, objectMode } = fileDescriptors[fdNumber];
	const chunks = runOutputGeneratorsSync([uint8ArrayResult], stdioItems, encoding, state);
	const { serializedResult, finalResult = serializedResult } = serializeChunks({
		chunks,
		objectMode,
		encoding,
		lines,
		stripFinalNewline: stripFinalNewline$1,
		fdNumber
	});
	logOutputSync({
		serializedResult,
		fdNumber,
		state,
		verboseInfo,
		encoding,
		stdioItems,
		objectMode
	});
	const returnedResult = buffer[fdNumber] ? finalResult : void 0;
	try {
		if (state.error === void 0) writeToFiles(serializedResult, stdioItems, outputFiles);
		return returnedResult;
	} catch (error) {
		state.error = error;
		return returnedResult;
	}
};
const runOutputGeneratorsSync = (chunks, stdioItems, encoding, state) => {
	try {
		return runGeneratorsSync(chunks, stdioItems, encoding, false);
	} catch (error) {
		state.error = error;
		return chunks;
	}
};
const serializeChunks = ({ chunks, objectMode, encoding, lines, stripFinalNewline: stripFinalNewline$1, fdNumber }) => {
	if (objectMode) return { serializedResult: chunks };
	if (encoding === "buffer") return { serializedResult: joinToUint8Array(chunks) };
	const serializedResult = joinToString(chunks, encoding);
	if (lines[fdNumber]) return {
		serializedResult,
		finalResult: splitLinesSync(serializedResult, !stripFinalNewline$1[fdNumber], objectMode)
	};
	return { serializedResult };
};
const logOutputSync = ({ serializedResult, fdNumber, state, verboseInfo, encoding, stdioItems, objectMode }) => {
	if (!shouldLogOutput({
		stdioItems,
		encoding,
		verboseInfo,
		fdNumber
	})) return;
	const linesArray = splitLinesSync(serializedResult, false, objectMode);
	try {
		logLinesSync(linesArray, fdNumber, verboseInfo);
	} catch (error) {
		state.error ??= error;
	}
};
const writeToFiles = (serializedResult, stdioItems, outputFiles) => {
	for (const { path: path$28, append: append$1 } of stdioItems.filter(({ type }) => FILE_TYPES.has(type))) {
		const pathString = typeof path$28 === "string" ? path$28 : path$28.toString();
		if (append$1 || outputFiles.has(pathString)) appendFileSync(path$28, serializedResult);
		else {
			outputFiles.add(pathString);
			writeFileSync(path$28, serializedResult);
		}
	}
};

//#endregion
//#region ../node_modules/execa/lib/resolve/all-sync.js
const getAllSync = ([, stdout$1, stderr], options) => {
	if (!options.all) return;
	if (stdout$1 === void 0) return stderr;
	if (stderr === void 0) return stdout$1;
	if (Array.isArray(stdout$1)) return Array.isArray(stderr) ? [...stdout$1, ...stderr] : [...stdout$1, stripNewline(stderr, options, "all")];
	if (Array.isArray(stderr)) return [stripNewline(stdout$1, options, "all"), ...stderr];
	if (isUint8Array(stdout$1) && isUint8Array(stderr)) return concatUint8Arrays([stdout$1, stderr]);
	return `${stdout$1}${stderr}`;
};

//#endregion
//#region ../node_modules/execa/lib/resolve/exit-async.js
const waitForExit = async (subprocess, context) => {
	const [exitCode, signal] = await waitForExitOrError(subprocess);
	context.isForcefullyTerminated ??= false;
	return [exitCode, signal];
};
const waitForExitOrError = async (subprocess) => {
	const [spawnPayload, exitPayload] = await Promise.allSettled([once(subprocess, "spawn"), once(subprocess, "exit")]);
	if (spawnPayload.status === "rejected") return [];
	return exitPayload.status === "rejected" ? waitForSubprocessExit(subprocess) : exitPayload.value;
};
const waitForSubprocessExit = async (subprocess) => {
	try {
		return await once(subprocess, "exit");
	} catch {
		return waitForSubprocessExit(subprocess);
	}
};
const waitForSuccessfulExit = async (exitPromise) => {
	const [exitCode, signal] = await exitPromise;
	if (!isSubprocessErrorExit(exitCode, signal) && isFailedExit(exitCode, signal)) throw new DiscardedError();
	return [exitCode, signal];
};
const isSubprocessErrorExit = (exitCode, signal) => exitCode === void 0 && signal === void 0;
const isFailedExit = (exitCode, signal) => exitCode !== 0 || signal !== null;

//#endregion
//#region ../node_modules/execa/lib/resolve/exit-sync.js
const getExitResultSync = ({ error, status: exitCode, signal, output }, { maxBuffer }) => {
	const resultError = getResultError(error, exitCode, signal);
	const timedOut = resultError?.code === "ETIMEDOUT";
	const isMaxBuffer = isMaxBufferSync(resultError, output, maxBuffer);
	return {
		resultError,
		exitCode,
		signal,
		timedOut,
		isMaxBuffer
	};
};
const getResultError = (error, exitCode, signal) => {
	if (error !== void 0) return error;
	return isFailedExit(exitCode, signal) ? new DiscardedError() : void 0;
};

//#endregion
//#region ../node_modules/execa/lib/methods/main-sync.js
const execaCoreSync = (rawFile, rawArguments, rawOptions) => {
	const { file, commandArguments, command, escapedCommand, startTime, verboseInfo, options, fileDescriptors } = handleSyncArguments(rawFile, rawArguments, rawOptions);
	const result = spawnSubprocessSync({
		file,
		commandArguments,
		options,
		command,
		escapedCommand,
		verboseInfo,
		fileDescriptors,
		startTime
	});
	return handleResult(result, verboseInfo, options);
};
const handleSyncArguments = (rawFile, rawArguments, rawOptions) => {
	const { command, escapedCommand, startTime, verboseInfo } = handleCommand(rawFile, rawArguments, rawOptions);
	const syncOptions = normalizeSyncOptions(rawOptions);
	const { file, commandArguments, options } = normalizeOptions$2(rawFile, rawArguments, syncOptions);
	validateSyncOptions(options);
	const fileDescriptors = handleStdioSync(options, verboseInfo);
	return {
		file,
		commandArguments,
		command,
		escapedCommand,
		startTime,
		verboseInfo,
		options,
		fileDescriptors
	};
};
const normalizeSyncOptions = (options) => options.node && !options.ipc ? {
	...options,
	ipc: false
} : options;
const validateSyncOptions = ({ ipc, ipcInput, detached, cancelSignal }) => {
	if (ipcInput) throwInvalidSyncOption("ipcInput");
	if (ipc) throwInvalidSyncOption("ipc: true");
	if (detached) throwInvalidSyncOption("detached: true");
	if (cancelSignal) throwInvalidSyncOption("cancelSignal");
};
const throwInvalidSyncOption = (value) => {
	throw new TypeError(`The "${value}" option cannot be used with synchronous methods.`);
};
const spawnSubprocessSync = ({ file, commandArguments, options, command, escapedCommand, verboseInfo, fileDescriptors, startTime }) => {
	const syncResult = runSubprocessSync({
		file,
		commandArguments,
		options,
		command,
		escapedCommand,
		fileDescriptors,
		startTime
	});
	if (syncResult.failed) return syncResult;
	const { resultError, exitCode, signal, timedOut, isMaxBuffer } = getExitResultSync(syncResult, options);
	const { output, error = resultError } = transformOutputSync({
		fileDescriptors,
		syncResult,
		options,
		isMaxBuffer,
		verboseInfo
	});
	const stdio = output.map((stdioOutput, fdNumber) => stripNewline(stdioOutput, options, fdNumber));
	const all = stripNewline(getAllSync(output, options), options, "all");
	return getSyncResult({
		error,
		exitCode,
		signal,
		timedOut,
		isMaxBuffer,
		stdio,
		all,
		options,
		command,
		escapedCommand,
		startTime
	});
};
const runSubprocessSync = ({ file, commandArguments, options, command, escapedCommand, fileDescriptors, startTime }) => {
	try {
		addInputOptionsSync(fileDescriptors, options);
		const normalizedOptions = normalizeSpawnSyncOptions(options);
		return spawnSync(...concatenateShell(file, commandArguments, normalizedOptions));
	} catch (error) {
		return makeEarlyError({
			error,
			command,
			escapedCommand,
			fileDescriptors,
			options,
			startTime,
			isSync: true
		});
	}
};
const normalizeSpawnSyncOptions = ({ encoding, maxBuffer,...options }) => ({
	...options,
	encoding: "buffer",
	maxBuffer: getMaxBufferSync(maxBuffer)
});
const getSyncResult = ({ error, exitCode, signal, timedOut, isMaxBuffer, stdio, all, options, command, escapedCommand, startTime }) => error === void 0 ? makeSuccessResult({
	command,
	escapedCommand,
	stdio,
	all,
	ipcOutput: [],
	options,
	startTime
}) : makeError({
	error,
	command,
	escapedCommand,
	timedOut,
	isCanceled: false,
	isGracefullyCanceled: false,
	isMaxBuffer,
	isForcefullyTerminated: false,
	exitCode,
	signal,
	stdio,
	all,
	ipcOutput: [],
	options,
	startTime,
	isSync: true
});

//#endregion
//#region ../node_modules/execa/lib/ipc/get-one.js
const getOneMessage$1 = ({ anyProcess, channel, isSubprocess, ipc }, { reference = true, filter } = {}) => {
	validateIpcMethod({
		methodName: "getOneMessage",
		isSubprocess,
		ipc,
		isConnected: isConnected(anyProcess)
	});
	return getOneMessageAsync({
		anyProcess,
		channel,
		isSubprocess,
		filter,
		reference
	});
};
const getOneMessageAsync = async ({ anyProcess, channel, isSubprocess, filter, reference }) => {
	addReference(channel, reference);
	const ipcEmitter = getIpcEmitter(anyProcess, channel, isSubprocess);
	const controller = new AbortController();
	try {
		return await Promise.race([
			getMessage(ipcEmitter, filter, controller),
			throwOnDisconnect(ipcEmitter, isSubprocess, controller),
			throwOnStrictError(ipcEmitter, isSubprocess, controller)
		]);
	} catch (error) {
		disconnect(anyProcess);
		throw error;
	} finally {
		controller.abort();
		removeReference(channel, reference);
	}
};
const getMessage = async (ipcEmitter, filter, { signal }) => {
	if (filter === void 0) {
		const [message] = await once(ipcEmitter, "message", { signal });
		return message;
	}
	for await (const [message] of on(ipcEmitter, "message", { signal })) if (filter(message)) return message;
};
const throwOnDisconnect = async (ipcEmitter, isSubprocess, { signal }) => {
	await once(ipcEmitter, "disconnect", { signal });
	throwOnEarlyDisconnect(isSubprocess);
};
const throwOnStrictError = async (ipcEmitter, isSubprocess, { signal }) => {
	const [error] = await once(ipcEmitter, "strict:error", { signal });
	throw getStrictResponseError(error, isSubprocess);
};

//#endregion
//#region ../node_modules/execa/lib/ipc/get-each.js
const getEachMessage$1 = ({ anyProcess, channel, isSubprocess, ipc }, { reference = true } = {}) => loopOnMessages({
	anyProcess,
	channel,
	isSubprocess,
	ipc,
	shouldAwait: !isSubprocess,
	reference
});
const loopOnMessages = ({ anyProcess, channel, isSubprocess, ipc, shouldAwait, reference }) => {
	validateIpcMethod({
		methodName: "getEachMessage",
		isSubprocess,
		ipc,
		isConnected: isConnected(anyProcess)
	});
	addReference(channel, reference);
	const ipcEmitter = getIpcEmitter(anyProcess, channel, isSubprocess);
	const controller = new AbortController();
	const state = {};
	stopOnDisconnect(anyProcess, ipcEmitter, controller);
	abortOnStrictError({
		ipcEmitter,
		isSubprocess,
		controller,
		state
	});
	return iterateOnMessages({
		anyProcess,
		channel,
		ipcEmitter,
		isSubprocess,
		shouldAwait,
		controller,
		state,
		reference
	});
};
const stopOnDisconnect = async (anyProcess, ipcEmitter, controller) => {
	try {
		await once(ipcEmitter, "disconnect", { signal: controller.signal });
		controller.abort();
	} catch {}
};
const abortOnStrictError = async ({ ipcEmitter, isSubprocess, controller, state }) => {
	try {
		const [error] = await once(ipcEmitter, "strict:error", { signal: controller.signal });
		state.error = getStrictResponseError(error, isSubprocess);
		controller.abort();
	} catch {}
};
const iterateOnMessages = async function* ({ anyProcess, channel, ipcEmitter, isSubprocess, shouldAwait, controller, state, reference }) {
	try {
		for await (const [message] of on(ipcEmitter, "message", { signal: controller.signal })) {
			throwIfStrictError(state);
			yield message;
		}
	} catch {
		throwIfStrictError(state);
	} finally {
		controller.abort();
		removeReference(channel, reference);
		if (!isSubprocess) disconnect(anyProcess);
		if (shouldAwait) await anyProcess;
	}
};
const throwIfStrictError = ({ error }) => {
	if (error) throw error;
};

//#endregion
//#region ../node_modules/execa/lib/ipc/methods.js
const addIpcMethods = (subprocess, { ipc }) => {
	Object.assign(subprocess, getIpcMethods(subprocess, false, ipc));
};
const getIpcExport = () => {
	const anyProcess = y;
	const isSubprocess = true;
	const ipc = y.channel !== void 0;
	return {
		...getIpcMethods(anyProcess, isSubprocess, ipc),
		getCancelSignal: getCancelSignal$1.bind(void 0, {
			anyProcess,
			channel: anyProcess.channel,
			isSubprocess,
			ipc
		})
	};
};
const getIpcMethods = (anyProcess, isSubprocess, ipc) => ({
	sendMessage: sendMessage$1.bind(void 0, {
		anyProcess,
		channel: anyProcess.channel,
		isSubprocess,
		ipc
	}),
	getOneMessage: getOneMessage$1.bind(void 0, {
		anyProcess,
		channel: anyProcess.channel,
		isSubprocess,
		ipc
	}),
	getEachMessage: getEachMessage$1.bind(void 0, {
		anyProcess,
		channel: anyProcess.channel,
		isSubprocess,
		ipc
	})
});

//#endregion
//#region ../node_modules/execa/lib/return/early-error.js
const handleEarlyError = ({ error, command, escapedCommand, fileDescriptors, options, startTime, verboseInfo }) => {
	cleanupCustomStreams(fileDescriptors);
	const subprocess = new ChildProcess();
	createDummyStreams(subprocess, fileDescriptors);
	Object.assign(subprocess, {
		readable,
		writable,
		duplex
	});
	const earlyError = makeEarlyError({
		error,
		command,
		escapedCommand,
		fileDescriptors,
		options,
		startTime,
		isSync: false
	});
	const promise$1 = handleDummyPromise(earlyError, verboseInfo, options);
	return {
		subprocess,
		promise: promise$1
	};
};
const createDummyStreams = (subprocess, fileDescriptors) => {
	const stdin$1 = createDummyStream();
	const stdout$1 = createDummyStream();
	const stderr = createDummyStream();
	const extraStdio = Array.from({ length: fileDescriptors.length - 3 }, createDummyStream);
	const all = createDummyStream();
	const stdio = [
		stdin$1,
		stdout$1,
		stderr,
		...extraStdio
	];
	Object.assign(subprocess, {
		stdin: stdin$1,
		stdout: stdout$1,
		stderr,
		all,
		stdio
	});
};
const createDummyStream = () => {
	const stream$1 = new PassThrough();
	stream$1.end();
	return stream$1;
};
const readable = () => new Readable({ read() {} });
const writable = () => new Writable({ write() {} });
const duplex = () => new Duplex({
	read() {},
	write() {}
});
const handleDummyPromise = async (error, verboseInfo, options) => handleResult(error, verboseInfo, options);

//#endregion
//#region ../node_modules/execa/lib/stdio/handle-async.js
const handleStdioAsync = (options, verboseInfo) => handleStdio(addPropertiesAsync, options, verboseInfo, false);
const forbiddenIfAsync = ({ type, optionName }) => {
	throw new TypeError(`The \`${optionName}\` option cannot be ${TYPE_TO_MESSAGE[type]}.`);
};
const addProperties = {
	fileNumber: forbiddenIfAsync,
	generator: generatorToStream,
	asyncGenerator: generatorToStream,
	nodeStream: ({ value }) => ({ stream: value }),
	webTransform({ value: { transform: transform$1, writableObjectMode, readableObjectMode } }) {
		const objectMode = writableObjectMode || readableObjectMode;
		const stream$1 = Duplex.fromWeb(transform$1, { objectMode });
		return { stream: stream$1 };
	},
	duplex: ({ value: { transform: transform$1 } }) => ({ stream: transform$1 }),
	native() {}
};
const addPropertiesAsync = {
	input: {
		...addProperties,
		fileUrl: ({ value }) => ({ stream: createReadStream(value) }),
		filePath: ({ value: { file } }) => ({ stream: createReadStream(file) }),
		webStream: ({ value }) => ({ stream: Readable.fromWeb(value) }),
		iterable: ({ value }) => ({ stream: Readable.from(value) }),
		asyncIterable: ({ value }) => ({ stream: Readable.from(value) }),
		string: ({ value }) => ({ stream: Readable.from(value) }),
		uint8Array: ({ value }) => ({ stream: Readable.from(Buffer$1.from(value)) })
	},
	output: {
		...addProperties,
		fileUrl: ({ value }) => ({ stream: createWriteStream(value) }),
		filePath: ({ value: { file, append: append$1 } }) => ({ stream: createWriteStream(file, append$1 ? { flags: "a" } : {}) }),
		webStream: ({ value }) => ({ stream: Writable.fromWeb(value) }),
		iterable: forbiddenIfAsync,
		asyncIterable: forbiddenIfAsync,
		string: forbiddenIfAsync,
		uint8Array: forbiddenIfAsync
	}
};

//#endregion
//#region ../node_modules/@sindresorhus/merge-streams/index.js
function mergeStreams$1(streams) {
	if (!Array.isArray(streams)) throw new TypeError(`Expected an array, got \`${typeof streams}\`.`);
	for (const stream$1 of streams) validateStream$1(stream$1);
	const objectMode = streams.some(({ readableObjectMode }) => readableObjectMode);
	const highWaterMark = getHighWaterMark$1(streams, objectMode);
	const passThroughStream = new MergedStream$1({
		objectMode,
		writableHighWaterMark: highWaterMark,
		readableHighWaterMark: highWaterMark
	});
	for (const stream$1 of streams) passThroughStream.add(stream$1);
	return passThroughStream;
}
const getHighWaterMark$1 = (streams, objectMode) => {
	if (streams.length === 0) return getDefaultHighWaterMark(objectMode);
	const highWaterMarks = streams.filter(({ readableObjectMode }) => readableObjectMode === objectMode).map(({ readableHighWaterMark }) => readableHighWaterMark);
	return Math.max(...highWaterMarks);
};
var MergedStream$1 = class extends PassThrough {
	#streams = new Set([]);
	#ended = new Set([]);
	#aborted = new Set([]);
	#onFinished;
	#unpipeEvent = Symbol("unpipe");
	#streamPromises = new WeakMap();
	add(stream$1) {
		validateStream$1(stream$1);
		if (this.#streams.has(stream$1)) return;
		this.#streams.add(stream$1);
		this.#onFinished ??= onMergedStreamFinished$1(this, this.#streams, this.#unpipeEvent);
		const streamPromise = endWhenStreamsDone$1({
			passThroughStream: this,
			stream: stream$1,
			streams: this.#streams,
			ended: this.#ended,
			aborted: this.#aborted,
			onFinished: this.#onFinished,
			unpipeEvent: this.#unpipeEvent
		});
		this.#streamPromises.set(stream$1, streamPromise);
		stream$1.pipe(this, { end: false });
	}
	async remove(stream$1) {
		validateStream$1(stream$1);
		if (!this.#streams.has(stream$1)) return false;
		const streamPromise = this.#streamPromises.get(stream$1);
		if (streamPromise === void 0) return false;
		this.#streamPromises.delete(stream$1);
		stream$1.unpipe(this);
		await streamPromise;
		return true;
	}
};
const onMergedStreamFinished$1 = async (passThroughStream, streams, unpipeEvent$1) => {
	updateMaxListeners$1(passThroughStream, PASSTHROUGH_LISTENERS_COUNT$1);
	const controller = new AbortController();
	try {
		await Promise.race([onMergedStreamEnd$1(passThroughStream, controller), onInputStreamsUnpipe$1(passThroughStream, streams, unpipeEvent$1, controller)]);
	} finally {
		controller.abort();
		updateMaxListeners$1(passThroughStream, -PASSTHROUGH_LISTENERS_COUNT$1);
	}
};
const onMergedStreamEnd$1 = async (passThroughStream, { signal }) => {
	try {
		await finished(passThroughStream, {
			signal,
			cleanup: true
		});
	} catch (error) {
		errorOrAbortStream(passThroughStream, error);
		throw error;
	}
};
const onInputStreamsUnpipe$1 = async (passThroughStream, streams, unpipeEvent$1, { signal }) => {
	for await (const [unpipedStream] of on(passThroughStream, "unpipe", { signal })) if (streams.has(unpipedStream)) unpipedStream.emit(unpipeEvent$1);
};
const validateStream$1 = (stream$1) => {
	if (typeof stream$1?.pipe !== "function") throw new TypeError(`Expected a readable stream, got: \`${typeof stream$1}\`.`);
};
const endWhenStreamsDone$1 = async ({ passThroughStream, stream: stream$1, streams, ended, aborted: aborted$1, onFinished, unpipeEvent: unpipeEvent$1 }) => {
	updateMaxListeners$1(passThroughStream, PASSTHROUGH_LISTENERS_PER_STREAM$1);
	const controller = new AbortController();
	try {
		await Promise.race([
			afterMergedStreamFinished$1(onFinished, stream$1, controller),
			onInputStreamEnd$1({
				passThroughStream,
				stream: stream$1,
				streams,
				ended,
				aborted: aborted$1,
				controller
			}),
			onInputStreamUnpipe$1({
				stream: stream$1,
				streams,
				ended,
				aborted: aborted$1,
				unpipeEvent: unpipeEvent$1,
				controller
			})
		]);
	} finally {
		controller.abort();
		updateMaxListeners$1(passThroughStream, -PASSTHROUGH_LISTENERS_PER_STREAM$1);
	}
	if (streams.size > 0 && streams.size === ended.size + aborted$1.size) if (ended.size === 0 && aborted$1.size > 0) abortStream$1(passThroughStream);
	else endStream$1(passThroughStream);
};
const afterMergedStreamFinished$1 = async (onFinished, stream$1, { signal }) => {
	try {
		await onFinished;
		if (!signal.aborted) abortStream$1(stream$1);
	} catch (error) {
		if (!signal.aborted) errorOrAbortStream(stream$1, error);
	}
};
const onInputStreamEnd$1 = async ({ passThroughStream, stream: stream$1, streams, ended, aborted: aborted$1, controller: { signal } }) => {
	try {
		await finished(stream$1, {
			signal,
			cleanup: true,
			readable: true,
			writable: false
		});
		if (streams.has(stream$1)) ended.add(stream$1);
	} catch (error) {
		if (signal.aborted || !streams.has(stream$1)) return;
		if (isAbortError$1(error)) aborted$1.add(stream$1);
		else errorStream$1(passThroughStream, error);
	}
};
const onInputStreamUnpipe$1 = async ({ stream: stream$1, streams, ended, aborted: aborted$1, unpipeEvent: unpipeEvent$1, controller: { signal } }) => {
	await once(stream$1, unpipeEvent$1, { signal });
	if (!stream$1.readable) return once(signal, "abort", { signal });
	streams.delete(stream$1);
	ended.delete(stream$1);
	aborted$1.delete(stream$1);
};
const endStream$1 = (stream$1) => {
	if (stream$1.writable) stream$1.end();
};
const errorOrAbortStream = (stream$1, error) => {
	if (isAbortError$1(error)) abortStream$1(stream$1);
	else errorStream$1(stream$1, error);
};
const isAbortError$1 = (error) => error?.code === "ERR_STREAM_PREMATURE_CLOSE";
const abortStream$1 = (stream$1) => {
	if (stream$1.readable || stream$1.writable) stream$1.destroy();
};
const errorStream$1 = (stream$1, error) => {
	if (!stream$1.destroyed) {
		stream$1.once("error", noop$2);
		stream$1.destroy(error);
	}
};
const noop$2 = () => {};
const updateMaxListeners$1 = (passThroughStream, increment$1) => {
	const maxListeners = passThroughStream.getMaxListeners();
	if (maxListeners !== 0 && maxListeners !== Number.POSITIVE_INFINITY) passThroughStream.setMaxListeners(maxListeners + increment$1);
};
const PASSTHROUGH_LISTENERS_COUNT$1 = 2;
const PASSTHROUGH_LISTENERS_PER_STREAM$1 = 1;

//#endregion
//#region ../node_modules/execa/lib/io/pipeline.js
const pipeStreams = (source, destination) => {
	source.pipe(destination);
	onSourceFinish(source, destination);
	onDestinationFinish(source, destination);
};
const onSourceFinish = async (source, destination) => {
	if (isStandardStream(source) || isStandardStream(destination)) return;
	try {
		await finished(source, {
			cleanup: true,
			readable: true,
			writable: false
		});
	} catch {}
	endDestinationStream(destination);
};
const endDestinationStream = (destination) => {
	if (destination.writable) destination.end();
};
const onDestinationFinish = async (source, destination) => {
	if (isStandardStream(source) || isStandardStream(destination)) return;
	try {
		await finished(destination, {
			cleanup: true,
			readable: false,
			writable: true
		});
	} catch {}
	abortSourceStream(source);
};
const abortSourceStream = (source) => {
	if (source.readable) source.destroy();
};

//#endregion
//#region ../node_modules/execa/lib/io/output-async.js
const pipeOutputAsync = (subprocess, fileDescriptors, controller) => {
	const pipeGroups = new Map();
	for (const [fdNumber, { stdioItems, direction }] of Object.entries(fileDescriptors)) {
		for (const { stream: stream$1 } of stdioItems.filter(({ type }) => TRANSFORM_TYPES.has(type))) pipeTransform(subprocess, stream$1, direction, fdNumber);
		for (const { stream: stream$1 } of stdioItems.filter(({ type }) => !TRANSFORM_TYPES.has(type))) pipeStdioItem({
			subprocess,
			stream: stream$1,
			direction,
			fdNumber,
			pipeGroups,
			controller
		});
	}
	for (const [outputStream, inputStreams] of pipeGroups.entries()) {
		const inputStream = inputStreams.length === 1 ? inputStreams[0] : mergeStreams$1(inputStreams);
		pipeStreams(inputStream, outputStream);
	}
};
const pipeTransform = (subprocess, stream$1, direction, fdNumber) => {
	if (direction === "output") pipeStreams(subprocess.stdio[fdNumber], stream$1);
	else pipeStreams(stream$1, subprocess.stdio[fdNumber]);
	const streamProperty = SUBPROCESS_STREAM_PROPERTIES[fdNumber];
	if (streamProperty !== void 0) subprocess[streamProperty] = stream$1;
	subprocess.stdio[fdNumber] = stream$1;
};
const SUBPROCESS_STREAM_PROPERTIES = [
	"stdin",
	"stdout",
	"stderr"
];
const pipeStdioItem = ({ subprocess, stream: stream$1, direction, fdNumber, pipeGroups, controller }) => {
	if (stream$1 === void 0) return;
	setStandardStreamMaxListeners(stream$1, controller);
	const [inputStream, outputStream] = direction === "output" ? [stream$1, subprocess.stdio[fdNumber]] : [subprocess.stdio[fdNumber], stream$1];
	const outputStreams = pipeGroups.get(inputStream) ?? [];
	pipeGroups.set(inputStream, [...outputStreams, outputStream]);
};
const setStandardStreamMaxListeners = (stream$1, { signal }) => {
	if (isStandardStream(stream$1)) incrementMaxListeners(stream$1, MAX_LISTENERS_INCREMENT, signal);
};
const MAX_LISTENERS_INCREMENT = 2;

//#endregion
//#region ../node_modules/signal-exit/dist/mjs/signals.js
/**
* This is not the set of all possible signals.
*
* It IS, however, the set of all signals that trigger
* an exit on either Linux or BSD systems.  Linux is a
* superset of the signal names supported on BSD, and
* the unknown signals just fail to register, so we can
* catch that easily enough.
*
* Windows signals are a different set, since there are
* signals that terminate Windows processes, but don't
* terminate (or don't even exist) on Posix systems.
*
* Don't bother with SIGKILL.  It's uncatchable, which
* means that we can't fire any callbacks anyway.
*
* If a user does happen to register a handler on a non-
* fatal signal like SIGWINCH or something, and then
* exit, it'll end up firing `process.emit('exit')`, so
* the handler will be fired anyway.
*
* SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised
* artificially, inherently leave the process in a
* state from which it is not safe to try and enter JS
* listeners.
*/
const signals = [];
signals.push("SIGHUP", "SIGINT", "SIGTERM");
if (process.platform !== "win32") signals.push("SIGALRM", "SIGABRT", "SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
if (process.platform === "linux") signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");

//#endregion
//#region ../node_modules/signal-exit/dist/mjs/index.js
const processOk = (process$3) => !!process$3 && typeof process$3 === "object" && typeof process$3.removeListener === "function" && typeof process$3.emit === "function" && typeof process$3.reallyExit === "function" && typeof process$3.listeners === "function" && typeof process$3.kill === "function" && typeof process$3.pid === "number" && typeof process$3.on === "function";
const kExitEmitter = Symbol.for("signal-exit emitter");
const global$1 = globalThis;
const ObjectDefineProperty = Object.defineProperty.bind(Object);
var Emitter = class {
	emitted = {
		afterExit: false,
		exit: false
	};
	listeners = {
		afterExit: [],
		exit: []
	};
	count = 0;
	id = Math.random();
	constructor() {
		if (global$1[kExitEmitter]) return global$1[kExitEmitter];
		ObjectDefineProperty(global$1, kExitEmitter, {
			value: this,
			writable: false,
			enumerable: false,
			configurable: false
		});
	}
	on(ev, fn) {
		this.listeners[ev].push(fn);
	}
	removeListener(ev, fn) {
		const list = this.listeners[ev];
		const i$1 = list.indexOf(fn);
		/* c8 ignore start */
		if (i$1 === -1) return;
		/* c8 ignore stop */
		if (i$1 === 0 && list.length === 1) list.length = 0;
		else list.splice(i$1, 1);
	}
	emit(ev, code, signal) {
		if (this.emitted[ev]) return false;
		this.emitted[ev] = true;
		let ret = false;
		for (const fn of this.listeners[ev]) ret = fn(code, signal) === true || ret;
		if (ev === "exit") ret = this.emit("afterExit", code, signal) || ret;
		return ret;
	}
};
var SignalExitBase = class {};
const signalExitWrap = (handler) => {
	return {
		onExit(cb, opts) {
			return handler.onExit(cb, opts);
		},
		load() {
			return handler.load();
		},
		unload() {
			return handler.unload();
		}
	};
};
var SignalExitFallback = class extends SignalExitBase {
	onExit() {
		return () => {};
	}
	load() {}
	unload() {}
};
var SignalExit = class extends SignalExitBase {
	/* c8 ignore start */
	#hupSig = process$1.platform === "win32" ? "SIGINT" : "SIGHUP";
	/* c8 ignore stop */
	#emitter = new Emitter();
	#process;
	#originalProcessEmit;
	#originalProcessReallyExit;
	#sigListeners = {};
	#loaded = false;
	constructor(process$3) {
		super();
		this.#process = process$3;
		this.#sigListeners = {};
		for (const sig of signals) this.#sigListeners[sig] = () => {
			const listeners = this.#process.listeners(sig);
			let { count: count$1 } = this.#emitter;
			/* c8 ignore start */
			const p$2 = process$3;
			if (typeof p$2.__signal_exit_emitter__ === "object" && typeof p$2.__signal_exit_emitter__.count === "number") count$1 += p$2.__signal_exit_emitter__.count;
			/* c8 ignore stop */
			if (listeners.length === count$1) {
				this.unload();
				const ret = this.#emitter.emit("exit", null, sig);
				/* c8 ignore start */
				const s = sig === "SIGHUP" ? this.#hupSig : sig;
				if (!ret) process$3.kill(process$3.pid, s);
			}
		};
		this.#originalProcessReallyExit = process$3.reallyExit;
		this.#originalProcessEmit = process$3.emit;
	}
	onExit(cb, opts) {
		/* c8 ignore start */
		if (!processOk(this.#process)) return () => {};
		/* c8 ignore stop */
		if (this.#loaded === false) this.load();
		const ev = opts?.alwaysLast ? "afterExit" : "exit";
		this.#emitter.on(ev, cb);
		return () => {
			this.#emitter.removeListener(ev, cb);
			if (this.#emitter.listeners["exit"].length === 0 && this.#emitter.listeners["afterExit"].length === 0) this.unload();
		};
	}
	load() {
		if (this.#loaded) return;
		this.#loaded = true;
		this.#emitter.count += 1;
		for (const sig of signals) try {
			const fn = this.#sigListeners[sig];
			if (fn) this.#process.on(sig, fn);
		} catch (_$2) {}
		this.#process.emit = (ev, ...a$1) => {
			return this.#processEmit(ev, ...a$1);
		};
		this.#process.reallyExit = (code) => {
			return this.#processReallyExit(code);
		};
	}
	unload() {
		if (!this.#loaded) return;
		this.#loaded = false;
		signals.forEach((sig) => {
			const listener = this.#sigListeners[sig];
			/* c8 ignore start */
			if (!listener) throw new Error("Listener not defined for signal: " + sig);
			/* c8 ignore stop */
			try {
				this.#process.removeListener(sig, listener);
			} catch (_$2) {}
			/* c8 ignore stop */
		});
		this.#process.emit = this.#originalProcessEmit;
		this.#process.reallyExit = this.#originalProcessReallyExit;
		this.#emitter.count -= 1;
	}
	#processReallyExit(code) {
		/* c8 ignore start */
		if (!processOk(this.#process)) return 0;
		this.#process.exitCode = code || 0;
		/* c8 ignore stop */
		this.#emitter.emit("exit", this.#process.exitCode, null);
		return this.#originalProcessReallyExit.call(this.#process, this.#process.exitCode);
	}
	#processEmit(ev, ...args) {
		const og = this.#originalProcessEmit;
		if (ev === "exit" && processOk(this.#process)) {
			if (typeof args[0] === "number") this.#process.exitCode = args[0];
			/* c8 ignore start */
			const ret = og.call(this.#process, ev, ...args);
			/* c8 ignore start */
			this.#emitter.emit("exit", this.#process.exitCode, null);
			/* c8 ignore stop */
			return ret;
		} else return og.call(this.#process, ev, ...args);
	}
};
const process$1 = globalThis.process;
const { onExit, load, unload } = signalExitWrap(processOk(process$1) ? new SignalExit(process$1) : new SignalExitFallback());

//#endregion
//#region ../node_modules/execa/lib/terminate/cleanup.js
const cleanupOnExit = (subprocess, { cleanup, detached }, { signal }) => {
	if (!cleanup || detached) return;
	const removeExitHandler = onExit(() => {
		subprocess.kill();
	});
	addAbortListener(signal, () => {
		removeExitHandler();
	});
};

//#endregion
//#region ../node_modules/execa/lib/pipe/pipe-arguments.js
const normalizePipeArguments = ({ source, sourcePromise, boundOptions, createNested }, ...pipeArguments) => {
	const startTime = getStartTime();
	const { destination, destinationStream, destinationError, from, unpipeSignal } = getDestinationStream(boundOptions, createNested, pipeArguments);
	const { sourceStream, sourceError } = getSourceStream(source, from);
	const { options: sourceOptions, fileDescriptors } = SUBPROCESS_OPTIONS.get(source);
	return {
		sourcePromise,
		sourceStream,
		sourceOptions,
		sourceError,
		destination,
		destinationStream,
		destinationError,
		unpipeSignal,
		fileDescriptors,
		startTime
	};
};
const getDestinationStream = (boundOptions, createNested, pipeArguments) => {
	try {
		const { destination, pipeOptions: { from, to, unpipeSignal } = {} } = getDestination(boundOptions, createNested, ...pipeArguments);
		const destinationStream = getToStream(destination, to);
		return {
			destination,
			destinationStream,
			from,
			unpipeSignal
		};
	} catch (error) {
		return { destinationError: error };
	}
};
const getDestination = (boundOptions, createNested, firstArgument, ...pipeArguments) => {
	if (Array.isArray(firstArgument)) {
		const destination = createNested(mapDestinationArguments, boundOptions)(firstArgument, ...pipeArguments);
		return {
			destination,
			pipeOptions: boundOptions
		};
	}
	if (typeof firstArgument === "string" || firstArgument instanceof URL || isDenoExecPath(firstArgument)) {
		if (Object.keys(boundOptions).length > 0) throw new TypeError("Please use .pipe(\"file\", ..., options) or .pipe(execa(\"file\", ..., options)) instead of .pipe(options)(\"file\", ...).");
		const [rawFile, rawArguments, rawOptions] = normalizeParameters(firstArgument, ...pipeArguments);
		const destination = createNested(mapDestinationArguments)(rawFile, rawArguments, rawOptions);
		return {
			destination,
			pipeOptions: rawOptions
		};
	}
	if (SUBPROCESS_OPTIONS.has(firstArgument)) {
		if (Object.keys(boundOptions).length > 0) throw new TypeError("Please use .pipe(options)`command` or .pipe($(options)`command`) instead of .pipe(options)($`command`).");
		return {
			destination: firstArgument,
			pipeOptions: pipeArguments[0]
		};
	}
	throw new TypeError(`The first argument must be a template string, an options object, or an Execa subprocess: ${firstArgument}`);
};
const mapDestinationArguments = ({ options }) => ({ options: {
	...options,
	stdin: "pipe",
	piped: true
} });
const getSourceStream = (source, from) => {
	try {
		const sourceStream = getFromStream(source, from);
		return { sourceStream };
	} catch (error) {
		return { sourceError: error };
	}
};

//#endregion
//#region ../node_modules/execa/lib/pipe/throw.js
const handlePipeArgumentsError = ({ sourceStream, sourceError, destinationStream, destinationError, fileDescriptors, sourceOptions, startTime }) => {
	const error = getPipeArgumentsError({
		sourceStream,
		sourceError,
		destinationStream,
		destinationError
	});
	if (error !== void 0) throw createNonCommandError({
		error,
		fileDescriptors,
		sourceOptions,
		startTime
	});
};
const getPipeArgumentsError = ({ sourceStream, sourceError, destinationStream, destinationError }) => {
	if (sourceError !== void 0 && destinationError !== void 0) return destinationError;
	if (destinationError !== void 0) {
		abortSourceStream(sourceStream);
		return destinationError;
	}
	if (sourceError !== void 0) {
		endDestinationStream(destinationStream);
		return sourceError;
	}
};
const createNonCommandError = ({ error, fileDescriptors, sourceOptions, startTime }) => makeEarlyError({
	error,
	command: PIPE_COMMAND_MESSAGE,
	escapedCommand: PIPE_COMMAND_MESSAGE,
	fileDescriptors,
	options: sourceOptions,
	startTime,
	isSync: false
});
const PIPE_COMMAND_MESSAGE = "source.pipe(destination)";

//#endregion
//#region ../node_modules/execa/lib/pipe/sequence.js
const waitForBothSubprocesses = async (subprocessPromises) => {
	const [{ status: sourceStatus, reason: sourceReason, value: sourceResult = sourceReason }, { status: destinationStatus, reason: destinationReason, value: destinationResult = destinationReason }] = await subprocessPromises;
	if (!destinationResult.pipedFrom.includes(sourceResult)) destinationResult.pipedFrom.push(sourceResult);
	if (destinationStatus === "rejected") throw destinationResult;
	if (sourceStatus === "rejected") throw sourceResult;
	return destinationResult;
};

//#endregion
//#region ../node_modules/execa/lib/pipe/streaming.js
const pipeSubprocessStream = (sourceStream, destinationStream, maxListenersController) => {
	const mergedStream = MERGED_STREAMS.has(destinationStream) ? pipeMoreSubprocessStream(sourceStream, destinationStream) : pipeFirstSubprocessStream(sourceStream, destinationStream);
	incrementMaxListeners(sourceStream, SOURCE_LISTENERS_PER_PIPE, maxListenersController.signal);
	incrementMaxListeners(destinationStream, DESTINATION_LISTENERS_PER_PIPE, maxListenersController.signal);
	cleanupMergedStreamsMap(destinationStream);
	return mergedStream;
};
const pipeFirstSubprocessStream = (sourceStream, destinationStream) => {
	const mergedStream = mergeStreams$1([sourceStream]);
	pipeStreams(mergedStream, destinationStream);
	MERGED_STREAMS.set(destinationStream, mergedStream);
	return mergedStream;
};
const pipeMoreSubprocessStream = (sourceStream, destinationStream) => {
	const mergedStream = MERGED_STREAMS.get(destinationStream);
	mergedStream.add(sourceStream);
	return mergedStream;
};
const cleanupMergedStreamsMap = async (destinationStream) => {
	try {
		await finished(destinationStream, {
			cleanup: true,
			readable: false,
			writable: true
		});
	} catch {}
	MERGED_STREAMS.delete(destinationStream);
};
const MERGED_STREAMS = new WeakMap();
const SOURCE_LISTENERS_PER_PIPE = 2;
const DESTINATION_LISTENERS_PER_PIPE = 1;

//#endregion
//#region ../node_modules/execa/lib/pipe/abort.js
const unpipeOnAbort = (unpipeSignal, unpipeContext) => unpipeSignal === void 0 ? [] : [unpipeOnSignalAbort(unpipeSignal, unpipeContext)];
const unpipeOnSignalAbort = async (unpipeSignal, { sourceStream, mergedStream, fileDescriptors, sourceOptions, startTime }) => {
	await aborted(unpipeSignal, sourceStream);
	await mergedStream.remove(sourceStream);
	const error = new Error("Pipe canceled by `unpipeSignal` option.");
	throw createNonCommandError({
		error,
		fileDescriptors,
		sourceOptions,
		startTime
	});
};

//#endregion
//#region ../node_modules/execa/lib/pipe/setup.js
const pipeToSubprocess = (sourceInfo, ...pipeArguments) => {
	if (isPlainObject(pipeArguments[0])) return pipeToSubprocess.bind(void 0, {
		...sourceInfo,
		boundOptions: {
			...sourceInfo.boundOptions,
			...pipeArguments[0]
		}
	});
	const { destination,...normalizedInfo } = normalizePipeArguments(sourceInfo, ...pipeArguments);
	const promise$1 = handlePipePromise({
		...normalizedInfo,
		destination
	});
	promise$1.pipe = pipeToSubprocess.bind(void 0, {
		...sourceInfo,
		source: destination,
		sourcePromise: promise$1,
		boundOptions: {}
	});
	return promise$1;
};
const handlePipePromise = async ({ sourcePromise, sourceStream, sourceOptions, sourceError, destination, destinationStream, destinationError, unpipeSignal, fileDescriptors, startTime }) => {
	const subprocessPromises = getSubprocessPromises(sourcePromise, destination);
	handlePipeArgumentsError({
		sourceStream,
		sourceError,
		destinationStream,
		destinationError,
		fileDescriptors,
		sourceOptions,
		startTime
	});
	const maxListenersController = new AbortController();
	try {
		const mergedStream = pipeSubprocessStream(sourceStream, destinationStream, maxListenersController);
		return await Promise.race([waitForBothSubprocesses(subprocessPromises), ...unpipeOnAbort(unpipeSignal, {
			sourceStream,
			mergedStream,
			sourceOptions,
			fileDescriptors,
			startTime
		})]);
	} finally {
		maxListenersController.abort();
	}
};
const getSubprocessPromises = (sourcePromise, destination) => Promise.allSettled([sourcePromise, destination]);

//#endregion
//#region ../node_modules/execa/lib/io/iterate.js
const iterateOnSubprocessStream = ({ subprocessStdout, subprocess, binary, shouldEncode, encoding, preserveNewlines }) => {
	const controller = new AbortController();
	stopReadingOnExit(subprocess, controller);
	return iterateOnStream({
		stream: subprocessStdout,
		controller,
		binary,
		shouldEncode: !subprocessStdout.readableObjectMode && shouldEncode,
		encoding,
		shouldSplit: !subprocessStdout.readableObjectMode,
		preserveNewlines
	});
};
const stopReadingOnExit = async (subprocess, controller) => {
	try {
		await subprocess;
	} catch {} finally {
		controller.abort();
	}
};
const iterateForResult = ({ stream: stream$1, onStreamEnd, lines, encoding, stripFinalNewline: stripFinalNewline$1, allMixed }) => {
	const controller = new AbortController();
	stopReadingOnStreamEnd(onStreamEnd, controller, stream$1);
	const objectMode = stream$1.readableObjectMode && !allMixed;
	return iterateOnStream({
		stream: stream$1,
		controller,
		binary: encoding === "buffer",
		shouldEncode: !objectMode,
		encoding,
		shouldSplit: !objectMode && lines,
		preserveNewlines: !stripFinalNewline$1
	});
};
const stopReadingOnStreamEnd = async (onStreamEnd, controller, stream$1) => {
	try {
		await onStreamEnd;
	} catch {
		stream$1.destroy();
	} finally {
		controller.abort();
	}
};
const iterateOnStream = ({ stream: stream$1, controller, binary, shouldEncode, encoding, shouldSplit, preserveNewlines }) => {
	const onStdoutChunk = on(stream$1, "data", {
		signal: controller.signal,
		highWaterMark: HIGH_WATER_MARK,
		highWatermark: HIGH_WATER_MARK
	});
	return iterateOnData({
		onStdoutChunk,
		controller,
		binary,
		shouldEncode,
		encoding,
		shouldSplit,
		preserveNewlines
	});
};
const DEFAULT_OBJECT_HIGH_WATER_MARK = getDefaultHighWaterMark(true);
const HIGH_WATER_MARK = DEFAULT_OBJECT_HIGH_WATER_MARK;
const iterateOnData = async function* ({ onStdoutChunk, controller, binary, shouldEncode, encoding, shouldSplit, preserveNewlines }) {
	const generators = getGenerators({
		binary,
		shouldEncode,
		encoding,
		shouldSplit,
		preserveNewlines
	});
	try {
		for await (const [chunk] of onStdoutChunk) yield* transformChunkSync(chunk, generators, 0);
	} catch (error) {
		if (!controller.signal.aborted) throw error;
	} finally {
		yield* finalChunksSync(generators);
	}
};
const getGenerators = ({ binary, shouldEncode, encoding, shouldSplit, preserveNewlines }) => [getEncodingTransformGenerator(binary, encoding, !shouldEncode), getSplitLinesGenerator(binary, preserveNewlines, !shouldSplit, {})].filter(Boolean);

//#endregion
//#region ../node_modules/execa/lib/io/contents.js
const getStreamOutput = async ({ stream: stream$1, onStreamEnd, fdNumber, encoding, buffer, maxBuffer, lines, allMixed, stripFinalNewline: stripFinalNewline$1, verboseInfo, streamInfo }) => {
	const logPromise = logOutputAsync({
		stream: stream$1,
		onStreamEnd,
		fdNumber,
		encoding,
		allMixed,
		verboseInfo,
		streamInfo
	});
	if (!buffer) {
		await Promise.all([resumeStream(stream$1), logPromise]);
		return;
	}
	const stripFinalNewlineValue = getStripFinalNewline(stripFinalNewline$1, fdNumber);
	const iterable = iterateForResult({
		stream: stream$1,
		onStreamEnd,
		lines,
		encoding,
		stripFinalNewline: stripFinalNewlineValue,
		allMixed
	});
	const [output] = await Promise.all([getStreamContents({
		stream: stream$1,
		iterable,
		fdNumber,
		encoding,
		maxBuffer,
		lines
	}), logPromise]);
	return output;
};
const logOutputAsync = async ({ stream: stream$1, onStreamEnd, fdNumber, encoding, allMixed, verboseInfo, streamInfo: { fileDescriptors } }) => {
	if (!shouldLogOutput({
		stdioItems: fileDescriptors[fdNumber]?.stdioItems,
		encoding,
		verboseInfo,
		fdNumber
	})) return;
	const linesIterable = iterateForResult({
		stream: stream$1,
		onStreamEnd,
		lines: true,
		encoding,
		stripFinalNewline: true,
		allMixed
	});
	await logLines(linesIterable, stream$1, fdNumber, verboseInfo);
};
const resumeStream = async (stream$1) => {
	await setImmediate$1();
	if (stream$1.readableFlowing === null) stream$1.resume();
};
const getStreamContents = async ({ stream: stream$1, stream: { readableObjectMode }, iterable, fdNumber, encoding, maxBuffer, lines }) => {
	try {
		if (readableObjectMode || lines) return await getStreamAsArray(iterable, { maxBuffer });
		if (encoding === "buffer") return new Uint8Array(await getStreamAsArrayBuffer(iterable, { maxBuffer }));
		return await getStreamAsString(iterable, { maxBuffer });
	} catch (error) {
		return handleBufferedData(handleMaxBuffer({
			error,
			stream: stream$1,
			readableObjectMode,
			lines,
			encoding,
			fdNumber
		}));
	}
};
const getBufferedData = async (streamPromise) => {
	try {
		return await streamPromise;
	} catch (error) {
		return handleBufferedData(error);
	}
};
const handleBufferedData = ({ bufferedData }) => isArrayBuffer(bufferedData) ? new Uint8Array(bufferedData) : bufferedData;

//#endregion
//#region ../node_modules/execa/lib/resolve/wait-stream.js
const waitForStream = async (stream$1, fdNumber, streamInfo, { isSameDirection, stopOnExit = false } = {}) => {
	const state = handleStdinDestroy(stream$1, streamInfo);
	const abortController = new AbortController();
	try {
		await Promise.race([...stopOnExit ? [streamInfo.exitPromise] : [], finished(stream$1, {
			cleanup: true,
			signal: abortController.signal
		})]);
	} catch (error) {
		if (!state.stdinCleanedUp) handleStreamError(error, fdNumber, streamInfo, isSameDirection);
	} finally {
		abortController.abort();
	}
};
const handleStdinDestroy = (stream$1, { originalStreams: [originalStdin], subprocess }) => {
	const state = { stdinCleanedUp: false };
	if (stream$1 === originalStdin) spyOnStdinDestroy(stream$1, subprocess, state);
	return state;
};
const spyOnStdinDestroy = (subprocessStdin, subprocess, state) => {
	const { _destroy } = subprocessStdin;
	subprocessStdin._destroy = (...destroyArguments) => {
		setStdinCleanedUp(subprocess, state);
		_destroy.call(subprocessStdin, ...destroyArguments);
	};
};
const setStdinCleanedUp = ({ exitCode, signalCode }, state) => {
	if (exitCode !== null || signalCode !== null) state.stdinCleanedUp = true;
};
const handleStreamError = (error, fdNumber, streamInfo, isSameDirection) => {
	if (!shouldIgnoreStreamError(error, fdNumber, streamInfo, isSameDirection)) throw error;
};
const shouldIgnoreStreamError = (error, fdNumber, streamInfo, isSameDirection = true) => {
	if (streamInfo.propagating) return isStreamEpipe(error) || isStreamAbort(error);
	streamInfo.propagating = true;
	return isInputFileDescriptor(streamInfo, fdNumber) === isSameDirection ? isStreamEpipe(error) : isStreamAbort(error);
};
const isInputFileDescriptor = ({ fileDescriptors }, fdNumber) => fdNumber !== "all" && fileDescriptors[fdNumber].direction === "input";
const isStreamAbort = (error) => error?.code === "ERR_STREAM_PREMATURE_CLOSE";
const isStreamEpipe = (error) => error?.code === "EPIPE";

//#endregion
//#region ../node_modules/execa/lib/resolve/stdio.js
const waitForStdioStreams = ({ subprocess, encoding, buffer, maxBuffer, lines, stripFinalNewline: stripFinalNewline$1, verboseInfo, streamInfo }) => subprocess.stdio.map((stream$1, fdNumber) => waitForSubprocessStream({
	stream: stream$1,
	fdNumber,
	encoding,
	buffer: buffer[fdNumber],
	maxBuffer: maxBuffer[fdNumber],
	lines: lines[fdNumber],
	allMixed: false,
	stripFinalNewline: stripFinalNewline$1,
	verboseInfo,
	streamInfo
}));
const waitForSubprocessStream = async ({ stream: stream$1, fdNumber, encoding, buffer, maxBuffer, lines, allMixed, stripFinalNewline: stripFinalNewline$1, verboseInfo, streamInfo }) => {
	if (!stream$1) return;
	const onStreamEnd = waitForStream(stream$1, fdNumber, streamInfo);
	if (isInputFileDescriptor(streamInfo, fdNumber)) {
		await onStreamEnd;
		return;
	}
	const [output] = await Promise.all([getStreamOutput({
		stream: stream$1,
		onStreamEnd,
		fdNumber,
		encoding,
		buffer,
		maxBuffer,
		lines,
		allMixed,
		stripFinalNewline: stripFinalNewline$1,
		verboseInfo,
		streamInfo
	}), onStreamEnd]);
	return output;
};

//#endregion
//#region ../node_modules/execa/lib/resolve/all-async.js
const makeAllStream = ({ stdout: stdout$1, stderr }, { all }) => all && (stdout$1 || stderr) ? mergeStreams$1([stdout$1, stderr].filter(Boolean)) : void 0;
const waitForAllStream = ({ subprocess, encoding, buffer, maxBuffer, lines, stripFinalNewline: stripFinalNewline$1, verboseInfo, streamInfo }) => waitForSubprocessStream({
	...getAllStream(subprocess, buffer),
	fdNumber: "all",
	encoding,
	maxBuffer: maxBuffer[1] + maxBuffer[2],
	lines: lines[1] || lines[2],
	allMixed: getAllMixed(subprocess),
	stripFinalNewline: stripFinalNewline$1,
	verboseInfo,
	streamInfo
});
const getAllStream = ({ stdout: stdout$1, stderr, all }, [, bufferStdout, bufferStderr]) => {
	const buffer = bufferStdout || bufferStderr;
	if (!buffer) return {
		stream: all,
		buffer
	};
	if (!bufferStdout) return {
		stream: stderr,
		buffer
	};
	if (!bufferStderr) return {
		stream: stdout$1,
		buffer
	};
	return {
		stream: all,
		buffer
	};
};
const getAllMixed = ({ all, stdout: stdout$1, stderr }) => all && stdout$1 && stderr && stdout$1.readableObjectMode !== stderr.readableObjectMode;

//#endregion
//#region ../node_modules/execa/lib/verbose/ipc.js
const shouldLogIpc = (verboseInfo) => isFullVerbose(verboseInfo, "ipc");
const logIpcOutput = (message, verboseInfo) => {
	const verboseMessage = serializeVerboseMessage(message);
	verboseLog({
		type: "ipc",
		verboseMessage,
		fdNumber: "ipc",
		verboseInfo
	});
};

//#endregion
//#region ../node_modules/execa/lib/ipc/buffer-messages.js
const waitForIpcOutput = async ({ subprocess, buffer: bufferArray, maxBuffer: maxBufferArray, ipc, ipcOutput, verboseInfo }) => {
	if (!ipc) return ipcOutput;
	const isVerbose$1 = shouldLogIpc(verboseInfo);
	const buffer = getFdSpecificValue(bufferArray, "ipc");
	const maxBuffer = getFdSpecificValue(maxBufferArray, "ipc");
	for await (const message of loopOnMessages({
		anyProcess: subprocess,
		channel: subprocess.channel,
		isSubprocess: false,
		ipc,
		shouldAwait: false,
		reference: true
	})) {
		if (buffer) {
			checkIpcMaxBuffer(subprocess, ipcOutput, maxBuffer);
			ipcOutput.push(message);
		}
		if (isVerbose$1) logIpcOutput(message, verboseInfo);
	}
	return ipcOutput;
};
const getBufferedIpcOutput = async (ipcOutputPromise, ipcOutput) => {
	await Promise.allSettled([ipcOutputPromise]);
	return ipcOutput;
};

//#endregion
//#region ../node_modules/execa/lib/resolve/wait-subprocess.js
const waitForSubprocessResult = async ({ subprocess, options: { encoding, buffer, maxBuffer, lines, timeoutDuration: timeout, cancelSignal, gracefulCancel, forceKillAfterDelay, stripFinalNewline: stripFinalNewline$1, ipc, ipcInput }, context, verboseInfo, fileDescriptors, originalStreams, onInternalError, controller }) => {
	const exitPromise = waitForExit(subprocess, context);
	const streamInfo = {
		originalStreams,
		fileDescriptors,
		subprocess,
		exitPromise,
		propagating: false
	};
	const stdioPromises = waitForStdioStreams({
		subprocess,
		encoding,
		buffer,
		maxBuffer,
		lines,
		stripFinalNewline: stripFinalNewline$1,
		verboseInfo,
		streamInfo
	});
	const allPromise = waitForAllStream({
		subprocess,
		encoding,
		buffer,
		maxBuffer,
		lines,
		stripFinalNewline: stripFinalNewline$1,
		verboseInfo,
		streamInfo
	});
	const ipcOutput = [];
	const ipcOutputPromise = waitForIpcOutput({
		subprocess,
		buffer,
		maxBuffer,
		ipc,
		ipcOutput,
		verboseInfo
	});
	const originalPromises = waitForOriginalStreams(originalStreams, subprocess, streamInfo);
	const customStreamsEndPromises = waitForCustomStreamsEnd(fileDescriptors, streamInfo);
	try {
		return await Promise.race([
			Promise.all([
				{},
				waitForSuccessfulExit(exitPromise),
				Promise.all(stdioPromises),
				allPromise,
				ipcOutputPromise,
				sendIpcInput(subprocess, ipcInput),
				...originalPromises,
				...customStreamsEndPromises
			]),
			onInternalError,
			throwOnSubprocessError(subprocess, controller),
			...throwOnTimeout(subprocess, timeout, context, controller),
			...throwOnCancel({
				subprocess,
				cancelSignal,
				gracefulCancel,
				context,
				controller
			}),
			...throwOnGracefulCancel({
				subprocess,
				cancelSignal,
				gracefulCancel,
				forceKillAfterDelay,
				context,
				controller
			})
		]);
	} catch (error) {
		context.terminationReason ??= "other";
		return Promise.all([
			{ error },
			exitPromise,
			Promise.all(stdioPromises.map((stdioPromise) => getBufferedData(stdioPromise))),
			getBufferedData(allPromise),
			getBufferedIpcOutput(ipcOutputPromise, ipcOutput),
			Promise.allSettled(originalPromises),
			Promise.allSettled(customStreamsEndPromises)
		]);
	}
};
const waitForOriginalStreams = (originalStreams, subprocess, streamInfo) => originalStreams.map((stream$1, fdNumber) => stream$1 === subprocess.stdio[fdNumber] ? void 0 : waitForStream(stream$1, fdNumber, streamInfo));
const waitForCustomStreamsEnd = (fileDescriptors, streamInfo) => fileDescriptors.flatMap(({ stdioItems }, fdNumber) => stdioItems.filter(({ value, stream: stream$1 = value }) => isStream(stream$1, { checkOpen: false }) && !isStandardStream(stream$1)).map(({ type, value, stream: stream$1 = value }) => waitForStream(stream$1, fdNumber, streamInfo, {
	isSameDirection: TRANSFORM_TYPES.has(type),
	stopOnExit: type === "native"
})));
const throwOnSubprocessError = async (subprocess, { signal }) => {
	const [error] = await once(subprocess, "error", { signal });
	throw error;
};

//#endregion
//#region ../node_modules/execa/lib/convert/concurrent.js
const initializeConcurrentStreams = () => ({
	readableDestroy: new WeakMap(),
	writableFinal: new WeakMap(),
	writableDestroy: new WeakMap()
});
const addConcurrentStream = (concurrentStreams, stream$1, waitName) => {
	const weakMap = concurrentStreams[waitName];
	if (!weakMap.has(stream$1)) weakMap.set(stream$1, []);
	const promises = weakMap.get(stream$1);
	const promise$1 = createDeferred();
	promises.push(promise$1);
	const resolve$1 = promise$1.resolve.bind(promise$1);
	return {
		resolve: resolve$1,
		promises
	};
};
const waitForConcurrentStreams = async ({ resolve: resolve$1, promises }, subprocess) => {
	resolve$1();
	const [isSubprocessExit] = await Promise.race([Promise.allSettled([true, subprocess]), Promise.all([false, ...promises])]);
	return !isSubprocessExit;
};

//#endregion
//#region ../node_modules/execa/lib/convert/shared.js
const safeWaitForSubprocessStdin = async (subprocessStdin) => {
	if (subprocessStdin === void 0) return;
	try {
		await waitForSubprocessStdin(subprocessStdin);
	} catch {}
};
const safeWaitForSubprocessStdout = async (subprocessStdout) => {
	if (subprocessStdout === void 0) return;
	try {
		await waitForSubprocessStdout(subprocessStdout);
	} catch {}
};
const waitForSubprocessStdin = async (subprocessStdin) => {
	await finished(subprocessStdin, {
		cleanup: true,
		readable: false,
		writable: true
	});
};
const waitForSubprocessStdout = async (subprocessStdout) => {
	await finished(subprocessStdout, {
		cleanup: true,
		readable: true,
		writable: false
	});
};
const waitForSubprocess = async (subprocess, error) => {
	await subprocess;
	if (error) throw error;
};
const destroyOtherStream = (stream$1, isOpen, error) => {
	if (error && !isStreamAbort(error)) stream$1.destroy(error);
	else if (isOpen) stream$1.destroy();
};

//#endregion
//#region ../node_modules/execa/lib/convert/readable.js
const createReadable = ({ subprocess, concurrentStreams, encoding }, { from, binary: binaryOption = true, preserveNewlines = true } = {}) => {
	const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
	const { subprocessStdout, waitReadableDestroy } = getSubprocessStdout(subprocess, from, concurrentStreams);
	const { readableEncoding, readableObjectMode, readableHighWaterMark } = getReadableOptions(subprocessStdout, binary);
	const { read: read$4, onStdoutDataDone } = getReadableMethods({
		subprocessStdout,
		subprocess,
		binary,
		encoding,
		preserveNewlines
	});
	const readable$1 = new Readable({
		read: read$4,
		destroy: callbackify(onReadableDestroy.bind(void 0, {
			subprocessStdout,
			subprocess,
			waitReadableDestroy
		})),
		highWaterMark: readableHighWaterMark,
		objectMode: readableObjectMode,
		encoding: readableEncoding
	});
	onStdoutFinished({
		subprocessStdout,
		onStdoutDataDone,
		readable: readable$1,
		subprocess
	});
	return readable$1;
};
const getSubprocessStdout = (subprocess, from, concurrentStreams) => {
	const subprocessStdout = getFromStream(subprocess, from);
	const waitReadableDestroy = addConcurrentStream(concurrentStreams, subprocessStdout, "readableDestroy");
	return {
		subprocessStdout,
		waitReadableDestroy
	};
};
const getReadableOptions = ({ readableEncoding, readableObjectMode, readableHighWaterMark }, binary) => binary ? {
	readableEncoding,
	readableObjectMode,
	readableHighWaterMark
} : {
	readableEncoding,
	readableObjectMode: true,
	readableHighWaterMark: DEFAULT_OBJECT_HIGH_WATER_MARK
};
const getReadableMethods = ({ subprocessStdout, subprocess, binary, encoding, preserveNewlines }) => {
	const onStdoutDataDone = createDeferred();
	const onStdoutData = iterateOnSubprocessStream({
		subprocessStdout,
		subprocess,
		binary,
		shouldEncode: !binary,
		encoding,
		preserveNewlines
	});
	return {
		read() {
			onRead(this, onStdoutData, onStdoutDataDone);
		},
		onStdoutDataDone
	};
};
const onRead = async (readable$1, onStdoutData, onStdoutDataDone) => {
	try {
		const { value, done } = await onStdoutData.next();
		if (done) onStdoutDataDone.resolve();
		else readable$1.push(value);
	} catch {}
};
const onStdoutFinished = async ({ subprocessStdout, onStdoutDataDone, readable: readable$1, subprocess, subprocessStdin }) => {
	try {
		await waitForSubprocessStdout(subprocessStdout);
		await subprocess;
		await safeWaitForSubprocessStdin(subprocessStdin);
		await onStdoutDataDone;
		if (readable$1.readable) readable$1.push(null);
	} catch (error) {
		await safeWaitForSubprocessStdin(subprocessStdin);
		destroyOtherReadable(readable$1, error);
	}
};
const onReadableDestroy = async ({ subprocessStdout, subprocess, waitReadableDestroy }, error) => {
	if (await waitForConcurrentStreams(waitReadableDestroy, subprocess)) {
		destroyOtherReadable(subprocessStdout, error);
		await waitForSubprocess(subprocess, error);
	}
};
const destroyOtherReadable = (stream$1, error) => {
	destroyOtherStream(stream$1, stream$1.readable, error);
};

//#endregion
//#region ../node_modules/execa/lib/convert/writable.js
const createWritable = ({ subprocess, concurrentStreams }, { to } = {}) => {
	const { subprocessStdin, waitWritableFinal, waitWritableDestroy } = getSubprocessStdin(subprocess, to, concurrentStreams);
	const writable$1 = new Writable({
		...getWritableMethods(subprocessStdin, subprocess, waitWritableFinal),
		destroy: callbackify(onWritableDestroy.bind(void 0, {
			subprocessStdin,
			subprocess,
			waitWritableFinal,
			waitWritableDestroy
		})),
		highWaterMark: subprocessStdin.writableHighWaterMark,
		objectMode: subprocessStdin.writableObjectMode
	});
	onStdinFinished(subprocessStdin, writable$1);
	return writable$1;
};
const getSubprocessStdin = (subprocess, to, concurrentStreams) => {
	const subprocessStdin = getToStream(subprocess, to);
	const waitWritableFinal = addConcurrentStream(concurrentStreams, subprocessStdin, "writableFinal");
	const waitWritableDestroy = addConcurrentStream(concurrentStreams, subprocessStdin, "writableDestroy");
	return {
		subprocessStdin,
		waitWritableFinal,
		waitWritableDestroy
	};
};
const getWritableMethods = (subprocessStdin, subprocess, waitWritableFinal) => ({
	write: onWrite.bind(void 0, subprocessStdin),
	final: callbackify(onWritableFinal.bind(void 0, subprocessStdin, subprocess, waitWritableFinal))
});
const onWrite = (subprocessStdin, chunk, encoding, done) => {
	if (subprocessStdin.write(chunk, encoding)) done();
	else subprocessStdin.once("drain", done);
};
const onWritableFinal = async (subprocessStdin, subprocess, waitWritableFinal) => {
	if (await waitForConcurrentStreams(waitWritableFinal, subprocess)) {
		if (subprocessStdin.writable) subprocessStdin.end();
		await subprocess;
	}
};
const onStdinFinished = async (subprocessStdin, writable$1, subprocessStdout) => {
	try {
		await waitForSubprocessStdin(subprocessStdin);
		if (writable$1.writable) writable$1.end();
	} catch (error) {
		await safeWaitForSubprocessStdout(subprocessStdout);
		destroyOtherWritable(writable$1, error);
	}
};
const onWritableDestroy = async ({ subprocessStdin, subprocess, waitWritableFinal, waitWritableDestroy }, error) => {
	await waitForConcurrentStreams(waitWritableFinal, subprocess);
	if (await waitForConcurrentStreams(waitWritableDestroy, subprocess)) {
		destroyOtherWritable(subprocessStdin, error);
		await waitForSubprocess(subprocess, error);
	}
};
const destroyOtherWritable = (stream$1, error) => {
	destroyOtherStream(stream$1, stream$1.writable, error);
};

//#endregion
//#region ../node_modules/execa/lib/convert/duplex.js
const createDuplex = ({ subprocess, concurrentStreams, encoding }, { from, to, binary: binaryOption = true, preserveNewlines = true } = {}) => {
	const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
	const { subprocessStdout, waitReadableDestroy } = getSubprocessStdout(subprocess, from, concurrentStreams);
	const { subprocessStdin, waitWritableFinal, waitWritableDestroy } = getSubprocessStdin(subprocess, to, concurrentStreams);
	const { readableEncoding, readableObjectMode, readableHighWaterMark } = getReadableOptions(subprocessStdout, binary);
	const { read: read$4, onStdoutDataDone } = getReadableMethods({
		subprocessStdout,
		subprocess,
		binary,
		encoding,
		preserveNewlines
	});
	const duplex$1 = new Duplex({
		read: read$4,
		...getWritableMethods(subprocessStdin, subprocess, waitWritableFinal),
		destroy: callbackify(onDuplexDestroy.bind(void 0, {
			subprocessStdout,
			subprocessStdin,
			subprocess,
			waitReadableDestroy,
			waitWritableFinal,
			waitWritableDestroy
		})),
		readableHighWaterMark,
		writableHighWaterMark: subprocessStdin.writableHighWaterMark,
		readableObjectMode,
		writableObjectMode: subprocessStdin.writableObjectMode,
		encoding: readableEncoding
	});
	onStdoutFinished({
		subprocessStdout,
		onStdoutDataDone,
		readable: duplex$1,
		subprocess,
		subprocessStdin
	});
	onStdinFinished(subprocessStdin, duplex$1, subprocessStdout);
	return duplex$1;
};
const onDuplexDestroy = async ({ subprocessStdout, subprocessStdin, subprocess, waitReadableDestroy, waitWritableFinal, waitWritableDestroy }, error) => {
	await Promise.all([onReadableDestroy({
		subprocessStdout,
		subprocess,
		waitReadableDestroy
	}, error), onWritableDestroy({
		subprocessStdin,
		subprocess,
		waitWritableFinal,
		waitWritableDestroy
	}, error)]);
};

//#endregion
//#region ../node_modules/execa/lib/convert/iterable.js
const createIterable = (subprocess, encoding, { from, binary: binaryOption = false, preserveNewlines = false } = {}) => {
	const binary = binaryOption || BINARY_ENCODINGS.has(encoding);
	const subprocessStdout = getFromStream(subprocess, from);
	const onStdoutData = iterateOnSubprocessStream({
		subprocessStdout,
		subprocess,
		binary,
		shouldEncode: true,
		encoding,
		preserveNewlines
	});
	return iterateOnStdoutData(onStdoutData, subprocessStdout, subprocess);
};
const iterateOnStdoutData = async function* (onStdoutData, subprocessStdout, subprocess) {
	try {
		yield* onStdoutData;
	} finally {
		if (subprocessStdout.readable) subprocessStdout.destroy();
		await subprocess;
	}
};

//#endregion
//#region ../node_modules/execa/lib/convert/add.js
const addConvertedStreams = (subprocess, { encoding }) => {
	const concurrentStreams = initializeConcurrentStreams();
	subprocess.readable = createReadable.bind(void 0, {
		subprocess,
		concurrentStreams,
		encoding
	});
	subprocess.writable = createWritable.bind(void 0, {
		subprocess,
		concurrentStreams
	});
	subprocess.duplex = createDuplex.bind(void 0, {
		subprocess,
		concurrentStreams,
		encoding
	});
	subprocess.iterable = createIterable.bind(void 0, subprocess, encoding);
	subprocess[Symbol.asyncIterator] = createIterable.bind(void 0, subprocess, encoding, {});
};

//#endregion
//#region ../node_modules/execa/lib/methods/promise.js
const mergePromise = (subprocess, promise$1) => {
	for (const [property, descriptor] of descriptors) {
		const value = descriptor.value.bind(promise$1);
		Reflect.defineProperty(subprocess, property, {
			...descriptor,
			value
		});
	}
};
const nativePromisePrototype = (async () => {})().constructor.prototype;
const descriptors = [
	"then",
	"catch",
	"finally"
].map((property) => [property, Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property)]);

//#endregion
//#region ../node_modules/execa/lib/methods/main-async.js
const execaCoreAsync = (rawFile, rawArguments, rawOptions, createNested) => {
	const { file, commandArguments, command, escapedCommand, startTime, verboseInfo, options, fileDescriptors } = handleAsyncArguments(rawFile, rawArguments, rawOptions);
	const { subprocess, promise: promise$1 } = spawnSubprocessAsync({
		file,
		commandArguments,
		options,
		startTime,
		verboseInfo,
		command,
		escapedCommand,
		fileDescriptors
	});
	subprocess.pipe = pipeToSubprocess.bind(void 0, {
		source: subprocess,
		sourcePromise: promise$1,
		boundOptions: {},
		createNested
	});
	mergePromise(subprocess, promise$1);
	SUBPROCESS_OPTIONS.set(subprocess, {
		options,
		fileDescriptors
	});
	return subprocess;
};
const handleAsyncArguments = (rawFile, rawArguments, rawOptions) => {
	const { command, escapedCommand, startTime, verboseInfo } = handleCommand(rawFile, rawArguments, rawOptions);
	const { file, commandArguments, options: normalizedOptions } = normalizeOptions$2(rawFile, rawArguments, rawOptions);
	const options = handleAsyncOptions(normalizedOptions);
	const fileDescriptors = handleStdioAsync(options, verboseInfo);
	return {
		file,
		commandArguments,
		command,
		escapedCommand,
		startTime,
		verboseInfo,
		options,
		fileDescriptors
	};
};
const handleAsyncOptions = ({ timeout, signal,...options }) => {
	if (signal !== void 0) throw new TypeError("The \"signal\" option has been renamed to \"cancelSignal\" instead.");
	return {
		...options,
		timeoutDuration: timeout
	};
};
const spawnSubprocessAsync = ({ file, commandArguments, options, startTime, verboseInfo, command, escapedCommand, fileDescriptors }) => {
	let subprocess;
	try {
		subprocess = spawn(...concatenateShell(file, commandArguments, options));
	} catch (error) {
		return handleEarlyError({
			error,
			command,
			escapedCommand,
			fileDescriptors,
			options,
			startTime,
			verboseInfo
		});
	}
	const controller = new AbortController();
	setMaxListeners(Number.POSITIVE_INFINITY, controller.signal);
	const originalStreams = [...subprocess.stdio];
	pipeOutputAsync(subprocess, fileDescriptors, controller);
	cleanupOnExit(subprocess, options, controller);
	const context = {};
	const onInternalError = createDeferred();
	subprocess.kill = subprocessKill.bind(void 0, {
		kill: subprocess.kill.bind(subprocess),
		options,
		onInternalError,
		context,
		controller
	});
	subprocess.all = makeAllStream(subprocess, options);
	addConvertedStreams(subprocess, options);
	addIpcMethods(subprocess, options);
	const promise$1 = handlePromise({
		subprocess,
		options,
		startTime,
		verboseInfo,
		fileDescriptors,
		originalStreams,
		command,
		escapedCommand,
		context,
		onInternalError,
		controller
	});
	return {
		subprocess,
		promise: promise$1
	};
};
const handlePromise = async ({ subprocess, options, startTime, verboseInfo, fileDescriptors, originalStreams, command, escapedCommand, context, onInternalError, controller }) => {
	const [errorInfo, [exitCode, signal], stdioResults, allResult, ipcOutput] = await waitForSubprocessResult({
		subprocess,
		options,
		context,
		verboseInfo,
		fileDescriptors,
		originalStreams,
		onInternalError,
		controller
	});
	controller.abort();
	onInternalError.resolve();
	const stdio = stdioResults.map((stdioResult, fdNumber) => stripNewline(stdioResult, options, fdNumber));
	const all = stripNewline(allResult, options, "all");
	const result = getAsyncResult({
		errorInfo,
		exitCode,
		signal,
		stdio,
		all,
		ipcOutput,
		context,
		options,
		command,
		escapedCommand,
		startTime
	});
	return handleResult(result, verboseInfo, options);
};
const getAsyncResult = ({ errorInfo, exitCode, signal, stdio, all, ipcOutput, context, options, command, escapedCommand, startTime }) => "error" in errorInfo ? makeError({
	error: errorInfo.error,
	command,
	escapedCommand,
	timedOut: context.terminationReason === "timeout",
	isCanceled: context.terminationReason === "cancel" || context.terminationReason === "gracefulCancel",
	isGracefullyCanceled: context.terminationReason === "gracefulCancel",
	isMaxBuffer: errorInfo.error instanceof MaxBufferError,
	isForcefullyTerminated: context.isForcefullyTerminated,
	exitCode,
	signal,
	stdio,
	all,
	ipcOutput,
	options,
	startTime,
	isSync: false
}) : makeSuccessResult({
	command,
	escapedCommand,
	stdio,
	all,
	ipcOutput,
	options,
	startTime
});

//#endregion
//#region ../node_modules/execa/lib/methods/bind.js
const mergeOptions = (boundOptions, options) => {
	const newOptions = Object.fromEntries(Object.entries(options).map(([optionName, optionValue]) => [optionName, mergeOption(optionName, boundOptions[optionName], optionValue)]));
	return {
		...boundOptions,
		...newOptions
	};
};
const mergeOption = (optionName, boundOptionValue, optionValue) => {
	if (DEEP_OPTIONS.has(optionName) && isPlainObject(boundOptionValue) && isPlainObject(optionValue)) return {
		...boundOptionValue,
		...optionValue
	};
	return optionValue;
};
const DEEP_OPTIONS = new Set(["env", ...FD_SPECIFIC_OPTIONS]);

//#endregion
//#region ../node_modules/execa/lib/methods/create.js
const createExeca = (mapArguments, boundOptions, deepOptions, setBoundExeca) => {
	const createNested = (mapArguments$1, boundOptions$1, setBoundExeca$1) => createExeca(mapArguments$1, boundOptions$1, deepOptions, setBoundExeca$1);
	const boundExeca = (...execaArguments) => callBoundExeca({
		mapArguments,
		deepOptions,
		boundOptions,
		setBoundExeca,
		createNested
	}, ...execaArguments);
	if (setBoundExeca !== void 0) setBoundExeca(boundExeca, createNested, boundOptions);
	return boundExeca;
};
const callBoundExeca = ({ mapArguments, deepOptions = {}, boundOptions = {}, setBoundExeca, createNested }, firstArgument, ...nextArguments) => {
	if (isPlainObject(firstArgument)) return createNested(mapArguments, mergeOptions(boundOptions, firstArgument), setBoundExeca);
	const { file, commandArguments, options, isSync } = parseArguments({
		mapArguments,
		firstArgument,
		nextArguments,
		deepOptions,
		boundOptions
	});
	return isSync ? execaCoreSync(file, commandArguments, options) : execaCoreAsync(file, commandArguments, options, createNested);
};
const parseArguments = ({ mapArguments, firstArgument, nextArguments, deepOptions, boundOptions }) => {
	const callArguments = isTemplateString(firstArgument) ? parseTemplates(firstArgument, nextArguments) : [firstArgument, ...nextArguments];
	const [initialFile, initialArguments, initialOptions] = normalizeParameters(...callArguments);
	const mergedOptions = mergeOptions(mergeOptions(deepOptions, boundOptions), initialOptions);
	const { file = initialFile, commandArguments = initialArguments, options = mergedOptions, isSync = false } = mapArguments({
		file: initialFile,
		commandArguments: initialArguments,
		options: mergedOptions
	});
	return {
		file,
		commandArguments,
		options,
		isSync
	};
};

//#endregion
//#region ../node_modules/execa/lib/methods/command.js
const mapCommandAsync = ({ file, commandArguments }) => parseCommand(file, commandArguments);
const mapCommandSync = ({ file, commandArguments }) => ({
	...parseCommand(file, commandArguments),
	isSync: true
});
const parseCommand = (command, unusedArguments) => {
	if (unusedArguments.length > 0) throw new TypeError(`The command and its arguments must be passed as a single string: ${command} ${unusedArguments}.`);
	const [file, ...commandArguments] = parseCommandString(command);
	return {
		file,
		commandArguments
	};
};
const parseCommandString = (command) => {
	if (typeof command !== "string") throw new TypeError(`The command must be a string: ${String(command)}.`);
	const trimmedCommand = command.trim();
	if (trimmedCommand === "") return [];
	const tokens = [];
	for (const token of trimmedCommand.split(SPACES_REGEXP)) {
		const previousToken = tokens.at(-1);
		if (previousToken && previousToken.endsWith("\\")) tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}`;
		else tokens.push(token);
	}
	return tokens;
};
const SPACES_REGEXP = / +/g;

//#endregion
//#region ../node_modules/execa/lib/methods/script.js
const setScriptSync = (boundExeca, createNested, boundOptions) => {
	boundExeca.sync = createNested(mapScriptSync, boundOptions);
	boundExeca.s = boundExeca.sync;
};
const mapScriptAsync = ({ options }) => getScriptOptions(options);
const mapScriptSync = ({ options }) => ({
	...getScriptOptions(options),
	isSync: true
});
const getScriptOptions = (options) => ({ options: {
	...getScriptStdinOption(options),
	...options
} });
const getScriptStdinOption = ({ input, inputFile, stdio }) => input === void 0 && inputFile === void 0 && stdio === void 0 ? { stdin: "inherit" } : {};
const deepScriptOptions = { preferLocal: true };

//#endregion
//#region ../node_modules/execa/index.js
const execa = createExeca(() => ({}));
const execaSync = createExeca(() => ({ isSync: true }));
const execaCommand = createExeca(mapCommandAsync);
const execaCommandSync = createExeca(mapCommandSync);
const execaNode = createExeca(mapNode);
const $ = createExeca(mapScriptAsync, {}, deepScriptOptions, setScriptSync);
const { sendMessage, getOneMessage, getEachMessage, getCancelSignal } = getIpcExport();

//#endregion
//#region bin/services/package-manager.ts
var import_lib$4 = __toESM$1(require_lib(), 1);
function detectPackageManager() {
	if (import_lib$4.pathExistsSync("bun.lockb")) return "bun";
	if (import_lib$4.pathExistsSync("pnpm-lock.yaml")) return "pnpm";
	if (import_lib$4.pathExistsSync("yarn.lock")) return "yarn";
	if (process.env.npm_execpath?.includes("bun")) return "bun";
	const userAgent = process.env.npm_config_user_agent;
	if (userAgent) {
		if (userAgent.startsWith("bun")) return "bun";
		if (userAgent.startsWith("pnpm")) return "pnpm";
		if (userAgent.startsWith("yarn")) return "yarn";
		if (userAgent.startsWith("npm")) return "npm";
	}
	return "npm";
}
function getPackageManagerCommands(pm) {
	const commands = {
		bun: {
			init: "bun init -y",
			install: "bun install",
			add: "bun add",
			addDev: "bun add -D",
			run: "bun run",
			create: "bun create",
			x: "bunx"
		},
		npm: {
			init: "npm init -y",
			install: "npm install",
			add: "npm install",
			addDev: "npm install --save-dev",
			run: "npm run",
			create: "npm create",
			x: "npx"
		},
		pnpm: {
			init: "pnpm init",
			install: "pnpm install",
			add: "pnpm add",
			addDev: "pnpm add -D",
			run: "pnpm run",
			create: "pnpm create",
			x: "pnpm dlx"
		},
		yarn: {
			init: "yarn init -y",
			install: "yarn install",
			add: "yarn add",
			addDev: "yarn add -D",
			run: "yarn",
			create: "yarn create",
			x: "yarn dlx"
		}
	};
	return commands[pm];
}
async function installDependencies(context, { dependencies, devDependencies, cwd: cwd$1 } = {}) {
	const targetCwd = cwd$1 || context.path;
	const pm = context.packageManager;
	const commands = getPackageManagerCommands(pm);
	try {
		if (!dependencies && !devDependencies) await execa(commands.install, {
			cwd: targetCwd,
			shell: true,
			stdio: "pipe"
		});
		if (dependencies) await execa(`${commands.add} ${dependencies.join(" ")}`, {
			cwd: targetCwd,
			shell: true,
			stdio: "pipe"
		});
		if (devDependencies) await execa(`${commands.addDev} ${devDependencies.join(" ")}`, {
			cwd: targetCwd,
			shell: true,
			stdio: "pipe"
		});
	} catch (error) {
		M.error("Failed to install dependencies");
		throw error;
	}
}

//#endregion
//#region ../node_modules/globby/node_modules/@sindresorhus/merge-streams/index.js
function mergeStreams(streams) {
	if (!Array.isArray(streams)) throw new TypeError(`Expected an array, got \`${typeof streams}\`.`);
	for (const stream$1 of streams) validateStream(stream$1);
	const objectMode = streams.some(({ readableObjectMode }) => readableObjectMode);
	const highWaterMark = getHighWaterMark(streams, objectMode);
	const passThroughStream = new MergedStream({
		objectMode,
		writableHighWaterMark: highWaterMark,
		readableHighWaterMark: highWaterMark
	});
	for (const stream$1 of streams) passThroughStream.add(stream$1);
	if (streams.length === 0) endStream(passThroughStream);
	return passThroughStream;
}
const getHighWaterMark = (streams, objectMode) => {
	if (streams.length === 0) return 16384;
	const highWaterMarks = streams.filter(({ readableObjectMode }) => readableObjectMode === objectMode).map(({ readableHighWaterMark }) => readableHighWaterMark);
	return Math.max(...highWaterMarks);
};
var MergedStream = class extends PassThrough {
	#streams = new Set([]);
	#ended = new Set([]);
	#aborted = new Set([]);
	#onFinished;
	add(stream$1) {
		validateStream(stream$1);
		if (this.#streams.has(stream$1)) return;
		this.#streams.add(stream$1);
		this.#onFinished ??= onMergedStreamFinished(this, this.#streams);
		endWhenStreamsDone({
			passThroughStream: this,
			stream: stream$1,
			streams: this.#streams,
			ended: this.#ended,
			aborted: this.#aborted,
			onFinished: this.#onFinished
		});
		stream$1.pipe(this, { end: false });
	}
	remove(stream$1) {
		validateStream(stream$1);
		if (!this.#streams.has(stream$1)) return false;
		stream$1.unpipe(this);
		return true;
	}
};
const onMergedStreamFinished = async (passThroughStream, streams) => {
	updateMaxListeners(passThroughStream, PASSTHROUGH_LISTENERS_COUNT);
	const controller = new AbortController();
	try {
		await Promise.race([onMergedStreamEnd(passThroughStream, controller), onInputStreamsUnpipe(passThroughStream, streams, controller)]);
	} finally {
		controller.abort();
		updateMaxListeners(passThroughStream, -PASSTHROUGH_LISTENERS_COUNT);
	}
};
const onMergedStreamEnd = async (passThroughStream, { signal }) => {
	await finished(passThroughStream, {
		signal,
		cleanup: true
	});
};
const onInputStreamsUnpipe = async (passThroughStream, streams, { signal }) => {
	for await (const [unpipedStream] of on(passThroughStream, "unpipe", { signal })) if (streams.has(unpipedStream)) unpipedStream.emit(unpipeEvent);
};
const validateStream = (stream$1) => {
	if (typeof stream$1?.pipe !== "function") throw new TypeError(`Expected a readable stream, got: \`${typeof stream$1}\`.`);
};
const endWhenStreamsDone = async ({ passThroughStream, stream: stream$1, streams, ended, aborted: aborted$1, onFinished }) => {
	updateMaxListeners(passThroughStream, PASSTHROUGH_LISTENERS_PER_STREAM);
	const controller = new AbortController();
	try {
		await Promise.race([
			afterMergedStreamFinished(onFinished, stream$1),
			onInputStreamEnd({
				passThroughStream,
				stream: stream$1,
				streams,
				ended,
				aborted: aborted$1,
				controller
			}),
			onInputStreamUnpipe({
				stream: stream$1,
				streams,
				ended,
				aborted: aborted$1,
				controller
			})
		]);
	} finally {
		controller.abort();
		updateMaxListeners(passThroughStream, -PASSTHROUGH_LISTENERS_PER_STREAM);
	}
	if (streams.size === ended.size + aborted$1.size) if (ended.size === 0 && aborted$1.size > 0) abortStream(passThroughStream);
	else endStream(passThroughStream);
};
const isAbortError = (error) => error?.code === "ERR_STREAM_PREMATURE_CLOSE";
const afterMergedStreamFinished = async (onFinished, stream$1) => {
	try {
		await onFinished;
		abortStream(stream$1);
	} catch (error) {
		if (isAbortError(error)) abortStream(stream$1);
		else errorStream(stream$1, error);
	}
};
const onInputStreamEnd = async ({ passThroughStream, stream: stream$1, streams, ended, aborted: aborted$1, controller: { signal } }) => {
	try {
		await finished(stream$1, {
			signal,
			cleanup: true,
			readable: true,
			writable: false
		});
		if (streams.has(stream$1)) ended.add(stream$1);
	} catch (error) {
		if (signal.aborted || !streams.has(stream$1)) return;
		if (isAbortError(error)) aborted$1.add(stream$1);
		else errorStream(passThroughStream, error);
	}
};
const onInputStreamUnpipe = async ({ stream: stream$1, streams, ended, aborted: aborted$1, controller: { signal } }) => {
	await once(stream$1, unpipeEvent, { signal });
	streams.delete(stream$1);
	ended.delete(stream$1);
	aborted$1.delete(stream$1);
};
const unpipeEvent = Symbol("unpipe");
const endStream = (stream$1) => {
	if (stream$1.writable) stream$1.end();
};
const abortStream = (stream$1) => {
	if (stream$1.readable || stream$1.writable) stream$1.destroy();
};
const errorStream = (stream$1, error) => {
	if (!stream$1.destroyed) {
		stream$1.once("error", noop$1);
		stream$1.destroy(error);
	}
};
const noop$1 = () => {};
const updateMaxListeners = (passThroughStream, increment$1) => {
	const maxListeners = passThroughStream.getMaxListeners();
	if (maxListeners !== 0 && maxListeners !== Number.POSITIVE_INFINITY) passThroughStream.setMaxListeners(maxListeners + increment$1);
};
const PASSTHROUGH_LISTENERS_COUNT = 2;
const PASSTHROUGH_LISTENERS_PER_STREAM = 1;

//#endregion
//#region ../node_modules/fast-glob/out/utils/array.js
var require_array = __commonJS$1({ "../node_modules/fast-glob/out/utils/array.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.splitWhen = exports.flatten = void 0;
	function flatten(items) {
		return items.reduce((collection, item) => [].concat(collection, item), []);
	}
	exports.flatten = flatten;
	function splitWhen(items, predicate) {
		const result = [[]];
		let groupIndex = 0;
		for (const item of items) if (predicate(item)) {
			groupIndex++;
			result[groupIndex] = [];
		} else result[groupIndex].push(item);
		return result;
	}
	exports.splitWhen = splitWhen;
} });

//#endregion
//#region ../node_modules/fast-glob/out/utils/errno.js
var require_errno = __commonJS$1({ "../node_modules/fast-glob/out/utils/errno.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isEnoentCodeError = void 0;
	function isEnoentCodeError(error) {
		return error.code === "ENOENT";
	}
	exports.isEnoentCodeError = isEnoentCodeError;
} });

//#endregion
//#region ../node_modules/fast-glob/out/utils/fs.js
var require_fs$3 = __commonJS$1({ "../node_modules/fast-glob/out/utils/fs.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createDirentFromStats = void 0;
	var DirentFromStats$1 = class {
		constructor(name, stats) {
			this.name = name;
			this.isBlockDevice = stats.isBlockDevice.bind(stats);
			this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
			this.isDirectory = stats.isDirectory.bind(stats);
			this.isFIFO = stats.isFIFO.bind(stats);
			this.isFile = stats.isFile.bind(stats);
			this.isSocket = stats.isSocket.bind(stats);
			this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
		}
	};
	function createDirentFromStats$1(name, stats) {
		return new DirentFromStats$1(name, stats);
	}
	exports.createDirentFromStats = createDirentFromStats$1;
} });

//#endregion
//#region ../node_modules/fast-glob/out/utils/path.js
var require_path = __commonJS$1({ "../node_modules/fast-glob/out/utils/path.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.convertPosixPathToPattern = exports.convertWindowsPathToPattern = exports.convertPathToPattern = exports.escapePosixPath = exports.escapeWindowsPath = exports.escape = exports.removeLeadingDotSegment = exports.makeAbsolute = exports.unixify = void 0;
	const os$1 = __require("os");
	const path$11 = __require("path");
	const IS_WINDOWS_PLATFORM = os$1.platform() === "win32";
	const LEADING_DOT_SEGMENT_CHARACTERS_COUNT = 2;
	/**
	* All non-escaped special characters.
	* Posix: ()*?[]{|}, !+@ before (, ! at the beginning, \\ before non-special characters.
	* Windows: (){}[], !+@ before (, ! at the beginning.
	*/
	const POSIX_UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\()|\\(?![!()*+?@[\]{|}]))/g;
	const WINDOWS_UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()[\]{}]|^!|[!+@](?=\())/g;
	/**
	* The device path (\\.\ or \\?\).
	* https://learn.microsoft.com/en-us/dotnet/standard/io/file-path-formats#dos-device-paths
	*/
	const DOS_DEVICE_PATH_RE = /^\\\\([.?])/;
	/**
	* All backslashes except those escaping special characters.
	* Windows: !()+@{}
	* https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file#naming-conventions
	*/
	const WINDOWS_BACKSLASHES_RE = /\\(?![!()+@[\]{}])/g;
	/**
	* Designed to work only with simple paths: `dir\\file`.
	*/
	function unixify(filepath) {
		return filepath.replace(/\\/g, "/");
	}
	exports.unixify = unixify;
	function makeAbsolute(cwd$1, filepath) {
		return path$11.resolve(cwd$1, filepath);
	}
	exports.makeAbsolute = makeAbsolute;
	function removeLeadingDotSegment(entry) {
		if (entry.charAt(0) === ".") {
			const secondCharactery = entry.charAt(1);
			if (secondCharactery === "/" || secondCharactery === "\\") return entry.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT);
		}
		return entry;
	}
	exports.removeLeadingDotSegment = removeLeadingDotSegment;
	exports.escape = IS_WINDOWS_PLATFORM ? escapeWindowsPath : escapePosixPath;
	function escapeWindowsPath(pattern$1) {
		return pattern$1.replace(WINDOWS_UNESCAPED_GLOB_SYMBOLS_RE, "\\$2");
	}
	exports.escapeWindowsPath = escapeWindowsPath;
	function escapePosixPath(pattern$1) {
		return pattern$1.replace(POSIX_UNESCAPED_GLOB_SYMBOLS_RE, "\\$2");
	}
	exports.escapePosixPath = escapePosixPath;
	exports.convertPathToPattern = IS_WINDOWS_PLATFORM ? convertWindowsPathToPattern : convertPosixPathToPattern;
	function convertWindowsPathToPattern(filepath) {
		return escapeWindowsPath(filepath).replace(DOS_DEVICE_PATH_RE, "//$1").replace(WINDOWS_BACKSLASHES_RE, "/");
	}
	exports.convertWindowsPathToPattern = convertWindowsPathToPattern;
	function convertPosixPathToPattern(filepath) {
		return escapePosixPath(filepath);
	}
	exports.convertPosixPathToPattern = convertPosixPathToPattern;
} });

//#endregion
//#region ../node_modules/is-extglob/index.js
var require_is_extglob = __commonJS$1({ "../node_modules/is-extglob/index.js"(exports, module) {
	/*!
	* is-extglob <https://github.com/jonschlinkert/is-extglob>
	*
	* Copyright (c) 2014-2016, Jon Schlinkert.
	* Licensed under the MIT License.
	*/
	module.exports = function isExtglob$1(str) {
		if (typeof str !== "string" || str === "") return false;
		var match;
		while (match = /(\\).|([@?!+*]\(.*\))/g.exec(str)) {
			if (match[2]) return true;
			str = str.slice(match.index + match[0].length);
		}
		return false;
	};
} });

//#endregion
//#region ../node_modules/is-glob/index.js
var require_is_glob = __commonJS$1({ "../node_modules/is-glob/index.js"(exports, module) {
	/*!
	* is-glob <https://github.com/jonschlinkert/is-glob>
	*
	* Copyright (c) 2014-2017, Jon Schlinkert.
	* Released under the MIT License.
	*/
	var isExtglob = require_is_extglob();
	var chars = {
		"{": "}",
		"(": ")",
		"[": "]"
	};
	var strictCheck = function(str) {
		if (str[0] === "!") return true;
		var index = 0;
		var pipeIndex = -2;
		var closeSquareIndex = -2;
		var closeCurlyIndex = -2;
		var closeParenIndex = -2;
		var backSlashIndex = -2;
		while (index < str.length) {
			if (str[index] === "*") return true;
			if (str[index + 1] === "?" && /[\].+)]/.test(str[index])) return true;
			if (closeSquareIndex !== -1 && str[index] === "[" && str[index + 1] !== "]") {
				if (closeSquareIndex < index) closeSquareIndex = str.indexOf("]", index);
				if (closeSquareIndex > index) {
					if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) return true;
					backSlashIndex = str.indexOf("\\", index);
					if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) return true;
				}
			}
			if (closeCurlyIndex !== -1 && str[index] === "{" && str[index + 1] !== "}") {
				closeCurlyIndex = str.indexOf("}", index);
				if (closeCurlyIndex > index) {
					backSlashIndex = str.indexOf("\\", index);
					if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) return true;
				}
			}
			if (closeParenIndex !== -1 && str[index] === "(" && str[index + 1] === "?" && /[:!=]/.test(str[index + 2]) && str[index + 3] !== ")") {
				closeParenIndex = str.indexOf(")", index);
				if (closeParenIndex > index) {
					backSlashIndex = str.indexOf("\\", index);
					if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) return true;
				}
			}
			if (pipeIndex !== -1 && str[index] === "(" && str[index + 1] !== "|") {
				if (pipeIndex < index) pipeIndex = str.indexOf("|", index);
				if (pipeIndex !== -1 && str[pipeIndex + 1] !== ")") {
					closeParenIndex = str.indexOf(")", pipeIndex);
					if (closeParenIndex > pipeIndex) {
						backSlashIndex = str.indexOf("\\", pipeIndex);
						if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) return true;
					}
				}
			}
			if (str[index] === "\\") {
				var open = str[index + 1];
				index += 2;
				var close = chars[open];
				if (close) {
					var n$1 = str.indexOf(close, index);
					if (n$1 !== -1) index = n$1 + 1;
				}
				if (str[index] === "!") return true;
			} else index++;
		}
		return false;
	};
	var relaxedCheck = function(str) {
		if (str[0] === "!") return true;
		var index = 0;
		while (index < str.length) {
			if (/[*?{}()[\]]/.test(str[index])) return true;
			if (str[index] === "\\") {
				var open = str[index + 1];
				index += 2;
				var close = chars[open];
				if (close) {
					var n$1 = str.indexOf(close, index);
					if (n$1 !== -1) index = n$1 + 1;
				}
				if (str[index] === "!") return true;
			} else index++;
		}
		return false;
	};
	module.exports = function isGlob$1(str, options) {
		if (typeof str !== "string" || str === "") return false;
		if (isExtglob(str)) return true;
		var check = strictCheck;
		if (options && options.strict === false) check = relaxedCheck;
		return check(str);
	};
} });

//#endregion
//#region ../node_modules/fast-glob/node_modules/glob-parent/index.js
var require_glob_parent = __commonJS$1({ "../node_modules/fast-glob/node_modules/glob-parent/index.js"(exports, module) {
	var isGlob = require_is_glob();
	var pathPosixDirname = __require("path").posix.dirname;
	var isWin32 = __require("os").platform() === "win32";
	var slash$1 = "/";
	var backslash = /\\/g;
	var enclosure = /[\{\[].*[\}\]]$/;
	var globby$1 = /(^|[^\\])([\{\[]|\([^\)]+$)/;
	var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;
	/**
	* @param {string} str
	* @param {Object} opts
	* @param {boolean} [opts.flipBackslashes=true]
	* @returns {string}
	*/
	module.exports = function globParent$1(str, opts) {
		var options = Object.assign({ flipBackslashes: true }, opts);
		if (options.flipBackslashes && isWin32 && str.indexOf(slash$1) < 0) str = str.replace(backslash, slash$1);
		if (enclosure.test(str)) str += slash$1;
		str += "a";
		do
			str = pathPosixDirname(str);
		while (isGlob(str) || globby$1.test(str));
		return str.replace(escaped, "$1");
	};
} });

//#endregion
//#region ../node_modules/braces/lib/utils.js
var require_utils$3 = __commonJS$1({ "../node_modules/braces/lib/utils.js"(exports) {
	exports.isInteger = (num) => {
		if (typeof num === "number") return Number.isInteger(num);
		if (typeof num === "string" && num.trim() !== "") return Number.isInteger(Number(num));
		return false;
	};
	/**
	* Find a node of the given type
	*/
	exports.find = (node, type) => node.nodes.find((node$1) => node$1.type === type);
	/**
	* Find a node of the given type
	*/
	exports.exceedsLimit = (min, max, step = 1, limit) => {
		if (limit === false) return false;
		if (!exports.isInteger(min) || !exports.isInteger(max)) return false;
		return (Number(max) - Number(min)) / Number(step) >= limit;
	};
	/**
	* Escape the given node with '\\' before node.value
	*/
	exports.escapeNode = (block, n$1 = 0, type) => {
		const node = block.nodes[n$1];
		if (!node) return;
		if (type && node.type === type || node.type === "open" || node.type === "close") {
			if (node.escaped !== true) {
				node.value = "\\" + node.value;
				node.escaped = true;
			}
		}
	};
	/**
	* Returns true if the given brace node should be enclosed in literal braces
	*/
	exports.encloseBrace = (node) => {
		if (node.type !== "brace") return false;
		if (node.commas >> 0 + node.ranges >> 0 === 0) {
			node.invalid = true;
			return true;
		}
		return false;
	};
	/**
	* Returns true if a brace node is invalid.
	*/
	exports.isInvalidBrace = (block) => {
		if (block.type !== "brace") return false;
		if (block.invalid === true || block.dollar) return true;
		if (block.commas >> 0 + block.ranges >> 0 === 0) {
			block.invalid = true;
			return true;
		}
		if (block.open !== true || block.close !== true) {
			block.invalid = true;
			return true;
		}
		return false;
	};
	/**
	* Returns true if a node is an open or close node
	*/
	exports.isOpenOrClose = (node) => {
		if (node.type === "open" || node.type === "close") return true;
		return node.open === true || node.close === true;
	};
	/**
	* Reduce an array of text nodes.
	*/
	exports.reduce = (nodes) => nodes.reduce((acc, node) => {
		if (node.type === "text") acc.push(node.value);
		if (node.type === "range") node.type = "text";
		return acc;
	}, []);
	/**
	* Flatten an array
	*/
	exports.flatten = (...args) => {
		const result = [];
		const flat = (arr) => {
			for (let i$1 = 0; i$1 < arr.length; i$1++) {
				const ele = arr[i$1];
				if (Array.isArray(ele)) {
					flat(ele);
					continue;
				}
				if (ele !== void 0) result.push(ele);
			}
			return result;
		};
		flat(args);
		return result;
	};
} });

//#endregion
//#region ../node_modules/braces/lib/stringify.js
var require_stringify = __commonJS$1({ "../node_modules/braces/lib/stringify.js"(exports, module) {
	const utils$16 = require_utils$3();
	module.exports = (ast, options = {}) => {
		const stringify$8 = (node, parent = {}) => {
			const invalidBlock = options.escapeInvalid && utils$16.isInvalidBrace(parent);
			const invalidNode = node.invalid === true && options.escapeInvalid === true;
			let output = "";
			if (node.value) {
				if ((invalidBlock || invalidNode) && utils$16.isOpenOrClose(node)) return "\\" + node.value;
				return node.value;
			}
			if (node.value) return node.value;
			if (node.nodes) for (const child of node.nodes) output += stringify$8(child);
			return output;
		};
		return stringify$8(ast);
	};
} });

//#endregion
//#region ../node_modules/is-number/index.js
var require_is_number = __commonJS$1({ "../node_modules/is-number/index.js"(exports, module) {
	module.exports = function(num) {
		if (typeof num === "number") return num - num === 0;
		if (typeof num === "string" && num.trim() !== "") return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
		return false;
	};
} });

//#endregion
//#region ../node_modules/to-regex-range/index.js
var require_to_regex_range = __commonJS$1({ "../node_modules/to-regex-range/index.js"(exports, module) {
	const isNumber$1 = require_is_number();
	const toRegexRange$1 = (min, max, options) => {
		if (isNumber$1(min) === false) throw new TypeError("toRegexRange: expected the first argument to be a number");
		if (max === void 0 || min === max) return String(min);
		if (isNumber$1(max) === false) throw new TypeError("toRegexRange: expected the second argument to be a number.");
		let opts = {
			relaxZeros: true,
			...options
		};
		if (typeof opts.strictZeros === "boolean") opts.relaxZeros = opts.strictZeros === false;
		let relax = String(opts.relaxZeros);
		let shorthand = String(opts.shorthand);
		let capture = String(opts.capture);
		let wrap = String(opts.wrap);
		let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
		if (toRegexRange$1.cache.hasOwnProperty(cacheKey)) return toRegexRange$1.cache[cacheKey].result;
		let a$1 = Math.min(min, max);
		let b$2 = Math.max(min, max);
		if (Math.abs(a$1 - b$2) === 1) {
			let result = min + "|" + max;
			if (opts.capture) return `(${result})`;
			if (opts.wrap === false) return result;
			return `(?:${result})`;
		}
		let isPadded = hasPadding(min) || hasPadding(max);
		let state = {
			min,
			max,
			a: a$1,
			b: b$2
		};
		let positives = [];
		let negatives = [];
		if (isPadded) {
			state.isPadded = isPadded;
			state.maxLen = String(state.max).length;
		}
		if (a$1 < 0) {
			let newMin = b$2 < 0 ? Math.abs(b$2) : 1;
			negatives = splitToPatterns(newMin, Math.abs(a$1), state, opts);
			a$1 = state.a = 0;
		}
		if (b$2 >= 0) positives = splitToPatterns(a$1, b$2, state, opts);
		state.negatives = negatives;
		state.positives = positives;
		state.result = collatePatterns(negatives, positives, opts);
		if (opts.capture === true) state.result = `(${state.result})`;
		else if (opts.wrap !== false && positives.length + negatives.length > 1) state.result = `(?:${state.result})`;
		toRegexRange$1.cache[cacheKey] = state;
		return state.result;
	};
	function collatePatterns(neg, pos, options) {
		let onlyNegative = filterPatterns(neg, pos, "-", false, options) || [];
		let onlyPositive = filterPatterns(pos, neg, "", false, options) || [];
		let intersected = filterPatterns(neg, pos, "-?", true, options) || [];
		let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
		return subpatterns.join("|");
	}
	function splitToRanges(min, max) {
		let nines = 1;
		let zeros$1 = 1;
		let stop = countNines(min, nines);
		let stops = new Set([max]);
		while (min <= stop && stop <= max) {
			stops.add(stop);
			nines += 1;
			stop = countNines(min, nines);
		}
		stop = countZeros(max + 1, zeros$1) - 1;
		while (min < stop && stop <= max) {
			stops.add(stop);
			zeros$1 += 1;
			stop = countZeros(max + 1, zeros$1) - 1;
		}
		stops = [...stops];
		stops.sort(compare);
		return stops;
	}
	/**
	* Convert a range to a regex pattern
	* @param {Number} `start`
	* @param {Number} `stop`
	* @return {String}
	*/
	function rangeToPattern(start, stop, options) {
		if (start === stop) return {
			pattern: start,
			count: [],
			digits: 0
		};
		let zipped = zip(start, stop);
		let digits = zipped.length;
		let pattern$1 = "";
		let count$1 = 0;
		for (let i$1 = 0; i$1 < digits; i$1++) {
			let [startDigit, stopDigit] = zipped[i$1];
			if (startDigit === stopDigit) pattern$1 += startDigit;
			else if (startDigit !== "0" || stopDigit !== "9") pattern$1 += toCharacterClass(startDigit, stopDigit, options);
			else count$1++;
		}
		if (count$1) pattern$1 += options.shorthand === true ? "\\d" : "[0-9]";
		return {
			pattern: pattern$1,
			count: [count$1],
			digits
		};
	}
	function splitToPatterns(min, max, tok, options) {
		let ranges = splitToRanges(min, max);
		let tokens = [];
		let start = min;
		let prev;
		for (let i$1 = 0; i$1 < ranges.length; i$1++) {
			let max$1 = ranges[i$1];
			let obj = rangeToPattern(String(start), String(max$1), options);
			let zeros$1 = "";
			if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
				if (prev.count.length > 1) prev.count.pop();
				prev.count.push(obj.count[0]);
				prev.string = prev.pattern + toQuantifier(prev.count);
				start = max$1 + 1;
				continue;
			}
			if (tok.isPadded) zeros$1 = padZeros(max$1, tok, options);
			obj.string = zeros$1 + obj.pattern + toQuantifier(obj.count);
			tokens.push(obj);
			start = max$1 + 1;
			prev = obj;
		}
		return tokens;
	}
	function filterPatterns(arr, comparison, prefix, intersection, options) {
		let result = [];
		for (let ele of arr) {
			let { string: string$1 } = ele;
			if (!intersection && !contains(comparison, "string", string$1)) result.push(prefix + string$1);
			if (intersection && contains(comparison, "string", string$1)) result.push(prefix + string$1);
		}
		return result;
	}
	/**
	* Zip strings
	*/
	function zip(a$1, b$2) {
		let arr = [];
		for (let i$1 = 0; i$1 < a$1.length; i$1++) arr.push([a$1[i$1], b$2[i$1]]);
		return arr;
	}
	function compare(a$1, b$2) {
		return a$1 > b$2 ? 1 : b$2 > a$1 ? -1 : 0;
	}
	function contains(arr, key, val) {
		return arr.some((ele) => ele[key] === val);
	}
	function countNines(min, len) {
		return Number(String(min).slice(0, -len) + "9".repeat(len));
	}
	function countZeros(integer, zeros$1) {
		return integer - integer % Math.pow(10, zeros$1);
	}
	function toQuantifier(digits) {
		let [start = 0, stop = ""] = digits;
		if (stop || start > 1) return `{${start + (stop ? "," + stop : "")}}`;
		return "";
	}
	function toCharacterClass(a$1, b$2, options) {
		return `[${a$1}${b$2 - a$1 === 1 ? "" : "-"}${b$2}]`;
	}
	function hasPadding(str) {
		return /^-?(0+)\d/.test(str);
	}
	function padZeros(value, tok, options) {
		if (!tok.isPadded) return value;
		let diff = Math.abs(tok.maxLen - String(value).length);
		let relax = options.relaxZeros !== false;
		switch (diff) {
			case 0: return "";
			case 1: return relax ? "0?" : "0";
			case 2: return relax ? "0{0,2}" : "00";
			default: return relax ? `0{0,${diff}}` : `0{${diff}}`;
		}
	}
	/**
	* Cache
	*/
	toRegexRange$1.cache = {};
	toRegexRange$1.clearCache = () => toRegexRange$1.cache = {};
	/**
	* Expose `toRegexRange`
	*/
	module.exports = toRegexRange$1;
} });

//#endregion
//#region ../node_modules/fill-range/index.js
var require_fill_range = __commonJS$1({ "../node_modules/fill-range/index.js"(exports, module) {
	const util$1 = __require("util");
	const toRegexRange = require_to_regex_range();
	const isObject$1 = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
	const transform = (toNumber) => {
		return (value) => toNumber === true ? Number(value) : String(value);
	};
	const isValidValue = (value) => {
		return typeof value === "number" || typeof value === "string" && value !== "";
	};
	const isNumber = (num) => Number.isInteger(+num);
	const zeros = (input) => {
		let value = `${input}`;
		let index = -1;
		if (value[0] === "-") value = value.slice(1);
		if (value === "0") return false;
		while (value[++index] === "0");
		return index > 0;
	};
	const stringify$3 = (start, end, options) => {
		if (typeof start === "string" || typeof end === "string") return true;
		return options.stringify === true;
	};
	const pad = (input, maxLength, toNumber) => {
		if (maxLength > 0) {
			let dash = input[0] === "-" ? "-" : "";
			if (dash) input = input.slice(1);
			input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
		}
		if (toNumber === false) return String(input);
		return input;
	};
	const toMaxLen = (input, maxLength) => {
		let negative = input[0] === "-" ? "-" : "";
		if (negative) {
			input = input.slice(1);
			maxLength--;
		}
		while (input.length < maxLength) input = "0" + input;
		return negative ? "-" + input : input;
	};
	const toSequence = (parts, options, maxLen) => {
		parts.negatives.sort((a$1, b$2) => a$1 < b$2 ? -1 : a$1 > b$2 ? 1 : 0);
		parts.positives.sort((a$1, b$2) => a$1 < b$2 ? -1 : a$1 > b$2 ? 1 : 0);
		let prefix = options.capture ? "" : "?:";
		let positives = "";
		let negatives = "";
		let result;
		if (parts.positives.length) positives = parts.positives.map((v$1) => toMaxLen(String(v$1), maxLen)).join("|");
		if (parts.negatives.length) negatives = `-(${prefix}${parts.negatives.map((v$1) => toMaxLen(String(v$1), maxLen)).join("|")})`;
		if (positives && negatives) result = `${positives}|${negatives}`;
		else result = positives || negatives;
		if (options.wrap) return `(${prefix}${result})`;
		return result;
	};
	const toRange = (a$1, b$2, isNumbers, options) => {
		if (isNumbers) return toRegexRange(a$1, b$2, {
			wrap: false,
			...options
		});
		let start = String.fromCharCode(a$1);
		if (a$1 === b$2) return start;
		let stop = String.fromCharCode(b$2);
		return `[${start}-${stop}]`;
	};
	const toRegex = (start, end, options) => {
		if (Array.isArray(start)) {
			let wrap = options.wrap === true;
			let prefix = options.capture ? "" : "?:";
			return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
		}
		return toRegexRange(start, end, options);
	};
	const rangeError = (...args) => {
		return new RangeError("Invalid range arguments: " + util$1.inspect(...args));
	};
	const invalidRange = (start, end, options) => {
		if (options.strictRanges === true) throw rangeError([start, end]);
		return [];
	};
	const invalidStep = (step, options) => {
		if (options.strictRanges === true) throw new TypeError(`Expected step "${step}" to be a number`);
		return [];
	};
	const fillNumbers = (start, end, step = 1, options = {}) => {
		let a$1 = Number(start);
		let b$2 = Number(end);
		if (!Number.isInteger(a$1) || !Number.isInteger(b$2)) {
			if (options.strictRanges === true) throw rangeError([start, end]);
			return [];
		}
		if (a$1 === 0) a$1 = 0;
		if (b$2 === 0) b$2 = 0;
		let descending = a$1 > b$2;
		let startString = String(start);
		let endString = String(end);
		let stepString = String(step);
		step = Math.max(Math.abs(step), 1);
		let padded = zeros(startString) || zeros(endString) || zeros(stepString);
		let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
		let toNumber = padded === false && stringify$3(start, end, options) === false;
		let format$1 = options.transform || transform(toNumber);
		if (options.toRegex && step === 1) return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
		let parts = {
			negatives: [],
			positives: []
		};
		let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
		let range = [];
		let index = 0;
		while (descending ? a$1 >= b$2 : a$1 <= b$2) {
			if (options.toRegex === true && step > 1) push(a$1);
			else range.push(pad(format$1(a$1, index), maxLen, toNumber));
			a$1 = descending ? a$1 - step : a$1 + step;
			index++;
		}
		if (options.toRegex === true) return step > 1 ? toSequence(parts, options, maxLen) : toRegex(range, null, {
			wrap: false,
			...options
		});
		return range;
	};
	const fillLetters = (start, end, step = 1, options = {}) => {
		if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1) return invalidRange(start, end, options);
		let format$1 = options.transform || ((val) => String.fromCharCode(val));
		let a$1 = `${start}`.charCodeAt(0);
		let b$2 = `${end}`.charCodeAt(0);
		let descending = a$1 > b$2;
		let min = Math.min(a$1, b$2);
		let max = Math.max(a$1, b$2);
		if (options.toRegex && step === 1) return toRange(min, max, false, options);
		let range = [];
		let index = 0;
		while (descending ? a$1 >= b$2 : a$1 <= b$2) {
			range.push(format$1(a$1, index));
			a$1 = descending ? a$1 - step : a$1 + step;
			index++;
		}
		if (options.toRegex === true) return toRegex(range, null, {
			wrap: false,
			options
		});
		return range;
	};
	const fill$2 = (start, end, step, options = {}) => {
		if (end == null && isValidValue(start)) return [start];
		if (!isValidValue(start) || !isValidValue(end)) return invalidRange(start, end, options);
		if (typeof step === "function") return fill$2(start, end, 1, { transform: step });
		if (isObject$1(step)) return fill$2(start, end, 0, step);
		let opts = { ...options };
		if (opts.capture === true) opts.wrap = true;
		step = step || opts.step || 1;
		if (!isNumber(step)) {
			if (step != null && !isObject$1(step)) return invalidStep(step, opts);
			return fill$2(start, end, 1, step);
		}
		if (isNumber(start) && isNumber(end)) return fillNumbers(start, end, step, opts);
		return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
	};
	module.exports = fill$2;
} });

//#endregion
//#region ../node_modules/braces/lib/compile.js
var require_compile = __commonJS$1({ "../node_modules/braces/lib/compile.js"(exports, module) {
	const fill$1 = require_fill_range();
	const utils$15 = require_utils$3();
	const compile$1 = (ast, options = {}) => {
		const walk$1 = (node, parent = {}) => {
			const invalidBlock = utils$15.isInvalidBrace(parent);
			const invalidNode = node.invalid === true && options.escapeInvalid === true;
			const invalid = invalidBlock === true || invalidNode === true;
			const prefix = options.escapeInvalid === true ? "\\" : "";
			let output = "";
			if (node.isOpen === true) return prefix + node.value;
			if (node.isClose === true) {
				console.log("node.isClose", prefix, node.value);
				return prefix + node.value;
			}
			if (node.type === "open") return invalid ? prefix + node.value : "(";
			if (node.type === "close") return invalid ? prefix + node.value : ")";
			if (node.type === "comma") return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
			if (node.value) return node.value;
			if (node.nodes && node.ranges > 0) {
				const args = utils$15.reduce(node.nodes);
				const range = fill$1(...args, {
					...options,
					wrap: false,
					toRegex: true,
					strictZeros: true
				});
				if (range.length !== 0) return args.length > 1 && range.length > 1 ? `(${range})` : range;
			}
			if (node.nodes) for (const child of node.nodes) output += walk$1(child, node);
			return output;
		};
		return walk$1(ast);
	};
	module.exports = compile$1;
} });

//#endregion
//#region ../node_modules/braces/lib/expand.js
var require_expand = __commonJS$1({ "../node_modules/braces/lib/expand.js"(exports, module) {
	const fill = require_fill_range();
	const stringify$2 = require_stringify();
	const utils$14 = require_utils$3();
	const append = (queue$1 = "", stash = "", enclose = false) => {
		const result = [];
		queue$1 = [].concat(queue$1);
		stash = [].concat(stash);
		if (!stash.length) return queue$1;
		if (!queue$1.length) return enclose ? utils$14.flatten(stash).map((ele) => `{${ele}}`) : stash;
		for (const item of queue$1) if (Array.isArray(item)) for (const value of item) result.push(append(value, stash, enclose));
		else for (let ele of stash) {
			if (enclose === true && typeof ele === "string") ele = `{${ele}}`;
			result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
		}
		return utils$14.flatten(result);
	};
	const expand$1 = (ast, options = {}) => {
		const rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
		const walk$1 = (node, parent = {}) => {
			node.queue = [];
			let p$2 = parent;
			let q$2 = parent.queue;
			while (p$2.type !== "brace" && p$2.type !== "root" && p$2.parent) {
				p$2 = p$2.parent;
				q$2 = p$2.queue;
			}
			if (node.invalid || node.dollar) {
				q$2.push(append(q$2.pop(), stringify$2(node, options)));
				return;
			}
			if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
				q$2.push(append(q$2.pop(), ["{}"]));
				return;
			}
			if (node.nodes && node.ranges > 0) {
				const args = utils$14.reduce(node.nodes);
				if (utils$14.exceedsLimit(...args, options.step, rangeLimit)) throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
				let range = fill(...args, options);
				if (range.length === 0) range = stringify$2(node, options);
				q$2.push(append(q$2.pop(), range));
				node.nodes = [];
				return;
			}
			const enclose = utils$14.encloseBrace(node);
			let queue$1 = node.queue;
			let block = node;
			while (block.type !== "brace" && block.type !== "root" && block.parent) {
				block = block.parent;
				queue$1 = block.queue;
			}
			for (let i$1 = 0; i$1 < node.nodes.length; i$1++) {
				const child = node.nodes[i$1];
				if (child.type === "comma" && node.type === "brace") {
					if (i$1 === 1) queue$1.push("");
					queue$1.push("");
					continue;
				}
				if (child.type === "close") {
					q$2.push(append(q$2.pop(), queue$1, enclose));
					continue;
				}
				if (child.value && child.type !== "open") {
					queue$1.push(append(queue$1.pop(), child.value));
					continue;
				}
				if (child.nodes) walk$1(child, node);
			}
			return queue$1;
		};
		return utils$14.flatten(walk$1(ast));
	};
	module.exports = expand$1;
} });

//#endregion
//#region ../node_modules/braces/lib/constants.js
var require_constants$2 = __commonJS$1({ "../node_modules/braces/lib/constants.js"(exports, module) {
	module.exports = {
		MAX_LENGTH: 1e4,
		CHAR_0: "0",
		CHAR_9: "9",
		CHAR_UPPERCASE_A: "A",
		CHAR_LOWERCASE_A: "a",
		CHAR_UPPERCASE_Z: "Z",
		CHAR_LOWERCASE_Z: "z",
		CHAR_LEFT_PARENTHESES: "(",
		CHAR_RIGHT_PARENTHESES: ")",
		CHAR_ASTERISK: "*",
		CHAR_AMPERSAND: "&",
		CHAR_AT: "@",
		CHAR_BACKSLASH: "\\",
		CHAR_BACKTICK: "`",
		CHAR_CARRIAGE_RETURN: "\r",
		CHAR_CIRCUMFLEX_ACCENT: "^",
		CHAR_COLON: ":",
		CHAR_COMMA: ",",
		CHAR_DOLLAR: "$",
		CHAR_DOT: ".",
		CHAR_DOUBLE_QUOTE: "\"",
		CHAR_EQUAL: "=",
		CHAR_EXCLAMATION_MARK: "!",
		CHAR_FORM_FEED: "\f",
		CHAR_FORWARD_SLASH: "/",
		CHAR_HASH: "#",
		CHAR_HYPHEN_MINUS: "-",
		CHAR_LEFT_ANGLE_BRACKET: "<",
		CHAR_LEFT_CURLY_BRACE: "{",
		CHAR_LEFT_SQUARE_BRACKET: "[",
		CHAR_LINE_FEED: "\n",
		CHAR_NO_BREAK_SPACE: "\xA0",
		CHAR_PERCENT: "%",
		CHAR_PLUS: "+",
		CHAR_QUESTION_MARK: "?",
		CHAR_RIGHT_ANGLE_BRACKET: ">",
		CHAR_RIGHT_CURLY_BRACE: "}",
		CHAR_RIGHT_SQUARE_BRACKET: "]",
		CHAR_SEMICOLON: ";",
		CHAR_SINGLE_QUOTE: "'",
		CHAR_SPACE: " ",
		CHAR_TAB: "	",
		CHAR_UNDERSCORE: "_",
		CHAR_VERTICAL_LINE: "|",
		CHAR_ZERO_WIDTH_NOBREAK_SPACE: "﻿"
	};
} });

//#endregion
//#region ../node_modules/braces/lib/parse.js
var require_parse$1 = __commonJS$1({ "../node_modules/braces/lib/parse.js"(exports, module) {
	const stringify$1 = require_stringify();
	/**
	* Constants
	*/
	const { MAX_LENGTH: MAX_LENGTH$1, CHAR_BACKSLASH, CHAR_BACKTICK, CHAR_COMMA: CHAR_COMMA$1, CHAR_DOT: CHAR_DOT$1, CHAR_LEFT_PARENTHESES: CHAR_LEFT_PARENTHESES$1, CHAR_RIGHT_PARENTHESES: CHAR_RIGHT_PARENTHESES$1, CHAR_LEFT_CURLY_BRACE: CHAR_LEFT_CURLY_BRACE$1, CHAR_RIGHT_CURLY_BRACE: CHAR_RIGHT_CURLY_BRACE$1, CHAR_LEFT_SQUARE_BRACKET: CHAR_LEFT_SQUARE_BRACKET$1, CHAR_RIGHT_SQUARE_BRACKET: CHAR_RIGHT_SQUARE_BRACKET$1, CHAR_DOUBLE_QUOTE, CHAR_SINGLE_QUOTE, CHAR_NO_BREAK_SPACE, CHAR_ZERO_WIDTH_NOBREAK_SPACE } = require_constants$2();
	/**
	* parse
	*/
	const parse$3 = (input, options = {}) => {
		if (typeof input !== "string") throw new TypeError("Expected a string");
		const opts = options || {};
		const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH$1, opts.maxLength) : MAX_LENGTH$1;
		if (input.length > max) throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
		const ast = {
			type: "root",
			input,
			nodes: []
		};
		const stack = [ast];
		let block = ast;
		let prev = ast;
		let brackets = 0;
		const length = input.length;
		let index = 0;
		let depth$1 = 0;
		let value;
		/**
		* Helpers
		*/
		const advance = () => input[index++];
		const push = (node) => {
			if (node.type === "text" && prev.type === "dot") prev.type = "text";
			if (prev && prev.type === "text" && node.type === "text") {
				prev.value += node.value;
				return;
			}
			block.nodes.push(node);
			node.parent = block;
			node.prev = prev;
			prev = node;
			return node;
		};
		push({ type: "bos" });
		while (index < length) {
			block = stack[stack.length - 1];
			value = advance();
			/**
			* Invalid chars
			*/
			if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) continue;
			/**
			* Escaped chars
			*/
			if (value === CHAR_BACKSLASH) {
				push({
					type: "text",
					value: (options.keepEscaping ? value : "") + advance()
				});
				continue;
			}
			/**
			* Right square bracket (literal): ']'
			*/
			if (value === CHAR_RIGHT_SQUARE_BRACKET$1) {
				push({
					type: "text",
					value: "\\" + value
				});
				continue;
			}
			/**
			* Left square bracket: '['
			*/
			if (value === CHAR_LEFT_SQUARE_BRACKET$1) {
				brackets++;
				let next;
				while (index < length && (next = advance())) {
					value += next;
					if (next === CHAR_LEFT_SQUARE_BRACKET$1) {
						brackets++;
						continue;
					}
					if (next === CHAR_BACKSLASH) {
						value += advance();
						continue;
					}
					if (next === CHAR_RIGHT_SQUARE_BRACKET$1) {
						brackets--;
						if (brackets === 0) break;
					}
				}
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Parentheses
			*/
			if (value === CHAR_LEFT_PARENTHESES$1) {
				block = push({
					type: "paren",
					nodes: []
				});
				stack.push(block);
				push({
					type: "text",
					value
				});
				continue;
			}
			if (value === CHAR_RIGHT_PARENTHESES$1) {
				if (block.type !== "paren") {
					push({
						type: "text",
						value
					});
					continue;
				}
				block = stack.pop();
				push({
					type: "text",
					value
				});
				block = stack[stack.length - 1];
				continue;
			}
			/**
			* Quotes: '|"|`
			*/
			if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
				const open = value;
				let next;
				if (options.keepQuotes !== true) value = "";
				while (index < length && (next = advance())) {
					if (next === CHAR_BACKSLASH) {
						value += next + advance();
						continue;
					}
					if (next === open) {
						if (options.keepQuotes === true) value += next;
						break;
					}
					value += next;
				}
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Left curly brace: '{'
			*/
			if (value === CHAR_LEFT_CURLY_BRACE$1) {
				depth$1++;
				const dollar = prev.value && prev.value.slice(-1) === "$" || block.dollar === true;
				const brace = {
					type: "brace",
					open: true,
					close: false,
					dollar,
					depth: depth$1,
					commas: 0,
					ranges: 0,
					nodes: []
				};
				block = push(brace);
				stack.push(block);
				push({
					type: "open",
					value
				});
				continue;
			}
			/**
			* Right curly brace: '}'
			*/
			if (value === CHAR_RIGHT_CURLY_BRACE$1) {
				if (block.type !== "brace") {
					push({
						type: "text",
						value
					});
					continue;
				}
				const type = "close";
				block = stack.pop();
				block.close = true;
				push({
					type,
					value
				});
				depth$1--;
				block = stack[stack.length - 1];
				continue;
			}
			/**
			* Comma: ','
			*/
			if (value === CHAR_COMMA$1 && depth$1 > 0) {
				if (block.ranges > 0) {
					block.ranges = 0;
					const open = block.nodes.shift();
					block.nodes = [open, {
						type: "text",
						value: stringify$1(block)
					}];
				}
				push({
					type: "comma",
					value
				});
				block.commas++;
				continue;
			}
			/**
			* Dot: '.'
			*/
			if (value === CHAR_DOT$1 && depth$1 > 0 && block.commas === 0) {
				const siblings = block.nodes;
				if (depth$1 === 0 || siblings.length === 0) {
					push({
						type: "text",
						value
					});
					continue;
				}
				if (prev.type === "dot") {
					block.range = [];
					prev.value += value;
					prev.type = "range";
					if (block.nodes.length !== 3 && block.nodes.length !== 5) {
						block.invalid = true;
						block.ranges = 0;
						prev.type = "text";
						continue;
					}
					block.ranges++;
					block.args = [];
					continue;
				}
				if (prev.type === "range") {
					siblings.pop();
					const before = siblings[siblings.length - 1];
					before.value += prev.value + value;
					prev = before;
					block.ranges--;
					continue;
				}
				push({
					type: "dot",
					value
				});
				continue;
			}
			/**
			* Text
			*/
			push({
				type: "text",
				value
			});
		}
		do {
			block = stack.pop();
			if (block.type !== "root") {
				block.nodes.forEach((node) => {
					if (!node.nodes) {
						if (node.type === "open") node.isOpen = true;
						if (node.type === "close") node.isClose = true;
						if (!node.nodes) node.type = "text";
						node.invalid = true;
					}
				});
				const parent = stack[stack.length - 1];
				const index$1 = parent.nodes.indexOf(block);
				parent.nodes.splice(index$1, 1, ...block.nodes);
			}
		} while (stack.length > 0);
		push({ type: "eos" });
		return ast;
	};
	module.exports = parse$3;
} });

//#endregion
//#region ../node_modules/braces/index.js
var require_braces = __commonJS$1({ "../node_modules/braces/index.js"(exports, module) {
	const stringify = require_stringify();
	const compile = require_compile();
	const expand = require_expand();
	const parse$2 = require_parse$1();
	/**
	* Expand the given pattern or create a regex-compatible string.
	*
	* ```js
	* const braces = require('braces');
	* console.log(braces('{a,b,c}', { compile: true })); //=> ['(a|b|c)']
	* console.log(braces('{a,b,c}')); //=> ['a', 'b', 'c']
	* ```
	* @param {String} `str`
	* @param {Object} `options`
	* @return {String}
	* @api public
	*/
	const braces$1 = (input, options = {}) => {
		let output = [];
		if (Array.isArray(input)) for (const pattern$1 of input) {
			const result = braces$1.create(pattern$1, options);
			if (Array.isArray(result)) output.push(...result);
			else output.push(result);
		}
		else output = [].concat(braces$1.create(input, options));
		if (options && options.expand === true && options.nodupes === true) output = [...new Set(output)];
		return output;
	};
	/**
	* Parse the given `str` with the given `options`.
	*
	* ```js
	* // braces.parse(pattern, [, options]);
	* const ast = braces.parse('a/{b,c}/d');
	* console.log(ast);
	* ```
	* @param {String} pattern Brace pattern to parse
	* @param {Object} options
	* @return {Object} Returns an AST
	* @api public
	*/
	braces$1.parse = (input, options = {}) => parse$2(input, options);
	/**
	* Creates a braces string from an AST, or an AST node.
	*
	* ```js
	* const braces = require('braces');
	* let ast = braces.parse('foo/{a,b}/bar');
	* console.log(stringify(ast.nodes[2])); //=> '{a,b}'
	* ```
	* @param {String} `input` Brace pattern or AST.
	* @param {Object} `options`
	* @return {Array} Returns an array of expanded values.
	* @api public
	*/
	braces$1.stringify = (input, options = {}) => {
		if (typeof input === "string") return stringify(braces$1.parse(input, options), options);
		return stringify(input, options);
	};
	/**
	* Compiles a brace pattern into a regex-compatible, optimized string.
	* This method is called by the main [braces](#braces) function by default.
	*
	* ```js
	* const braces = require('braces');
	* console.log(braces.compile('a/{b,c}/d'));
	* //=> ['a/(b|c)/d']
	* ```
	* @param {String} `input` Brace pattern or AST.
	* @param {Object} `options`
	* @return {Array} Returns an array of expanded values.
	* @api public
	*/
	braces$1.compile = (input, options = {}) => {
		if (typeof input === "string") input = braces$1.parse(input, options);
		return compile(input, options);
	};
	/**
	* Expands a brace pattern into an array. This method is called by the
	* main [braces](#braces) function when `options.expand` is true. Before
	* using this method it's recommended that you read the [performance notes](#performance))
	* and advantages of using [.compile](#compile) instead.
	*
	* ```js
	* const braces = require('braces');
	* console.log(braces.expand('a/{b,c}/d'));
	* //=> ['a/b/d', 'a/c/d'];
	* ```
	* @param {String} `pattern` Brace pattern
	* @param {Object} `options`
	* @return {Array} Returns an array of expanded values.
	* @api public
	*/
	braces$1.expand = (input, options = {}) => {
		if (typeof input === "string") input = braces$1.parse(input, options);
		let result = expand(input, options);
		if (options.noempty === true) result = result.filter(Boolean);
		if (options.nodupes === true) result = [...new Set(result)];
		return result;
	};
	/**
	* Processes a brace pattern and returns either an expanded array
	* (if `options.expand` is true), a highly optimized regex-compatible string.
	* This method is called by the main [braces](#braces) function.
	*
	* ```js
	* const braces = require('braces');
	* console.log(braces.create('user-{200..300}/project-{a,b,c}-{1..10}'))
	* //=> 'user-(20[0-9]|2[1-9][0-9]|300)/project-(a|b|c)-([1-9]|10)'
	* ```
	* @param {String} `pattern` Brace pattern
	* @param {Object} `options`
	* @return {Array} Returns an array of expanded values.
	* @api public
	*/
	braces$1.create = (input, options = {}) => {
		if (input === "" || input.length < 3) return [input];
		return options.expand !== true ? braces$1.compile(input, options) : braces$1.expand(input, options);
	};
	/**
	* Expose "braces"
	*/
	module.exports = braces$1;
} });

//#endregion
//#region ../node_modules/micromatch/node_modules/picomatch/lib/constants.js
var require_constants$1 = __commonJS$1({ "../node_modules/micromatch/node_modules/picomatch/lib/constants.js"(exports, module) {
	const path$10 = __require("path");
	const WIN_SLASH = "\\\\/";
	const WIN_NO_SLASH = `[^${WIN_SLASH}]`;
	/**
	* Posix glob regex
	*/
	const DOT_LITERAL = "\\.";
	const PLUS_LITERAL = "\\+";
	const QMARK_LITERAL = "\\?";
	const SLASH_LITERAL = "\\/";
	const ONE_CHAR = "(?=.)";
	const QMARK = "[^/]";
	const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
	const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
	const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
	const NO_DOT = `(?!${DOT_LITERAL})`;
	const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
	const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
	const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
	const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
	const STAR = `${QMARK}*?`;
	const POSIX_CHARS = {
		DOT_LITERAL,
		PLUS_LITERAL,
		QMARK_LITERAL,
		SLASH_LITERAL,
		ONE_CHAR,
		QMARK,
		END_ANCHOR,
		DOTS_SLASH,
		NO_DOT,
		NO_DOTS,
		NO_DOT_SLASH,
		NO_DOTS_SLASH,
		QMARK_NO_DOT,
		STAR,
		START_ANCHOR
	};
	/**
	* Windows glob regex
	*/
	const WINDOWS_CHARS = {
		...POSIX_CHARS,
		SLASH_LITERAL: `[${WIN_SLASH}]`,
		QMARK: WIN_NO_SLASH,
		STAR: `${WIN_NO_SLASH}*?`,
		DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
		NO_DOT: `(?!${DOT_LITERAL})`,
		NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
		NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
		NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
		QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
		START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
		END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
	};
	/**
	* POSIX Bracket Regex
	*/
	const POSIX_REGEX_SOURCE$1 = {
		alnum: "a-zA-Z0-9",
		alpha: "a-zA-Z",
		ascii: "\\x00-\\x7F",
		blank: " \\t",
		cntrl: "\\x00-\\x1F\\x7F",
		digit: "0-9",
		graph: "\\x21-\\x7E",
		lower: "a-z",
		print: "\\x20-\\x7E ",
		punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
		space: " \\t\\r\\n\\v\\f",
		upper: "A-Z",
		word: "A-Za-z0-9_",
		xdigit: "A-Fa-f0-9"
	};
	module.exports = {
		MAX_LENGTH: 1024 * 64,
		POSIX_REGEX_SOURCE: POSIX_REGEX_SOURCE$1,
		REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
		REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
		REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
		REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
		REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
		REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
		REPLACEMENTS: {
			"***": "*",
			"**/**": "**",
			"**/**/**": "**"
		},
		CHAR_0: 48,
		CHAR_9: 57,
		CHAR_UPPERCASE_A: 65,
		CHAR_LOWERCASE_A: 97,
		CHAR_UPPERCASE_Z: 90,
		CHAR_LOWERCASE_Z: 122,
		CHAR_LEFT_PARENTHESES: 40,
		CHAR_RIGHT_PARENTHESES: 41,
		CHAR_ASTERISK: 42,
		CHAR_AMPERSAND: 38,
		CHAR_AT: 64,
		CHAR_BACKWARD_SLASH: 92,
		CHAR_CARRIAGE_RETURN: 13,
		CHAR_CIRCUMFLEX_ACCENT: 94,
		CHAR_COLON: 58,
		CHAR_COMMA: 44,
		CHAR_DOT: 46,
		CHAR_DOUBLE_QUOTE: 34,
		CHAR_EQUAL: 61,
		CHAR_EXCLAMATION_MARK: 33,
		CHAR_FORM_FEED: 12,
		CHAR_FORWARD_SLASH: 47,
		CHAR_GRAVE_ACCENT: 96,
		CHAR_HASH: 35,
		CHAR_HYPHEN_MINUS: 45,
		CHAR_LEFT_ANGLE_BRACKET: 60,
		CHAR_LEFT_CURLY_BRACE: 123,
		CHAR_LEFT_SQUARE_BRACKET: 91,
		CHAR_LINE_FEED: 10,
		CHAR_NO_BREAK_SPACE: 160,
		CHAR_PERCENT: 37,
		CHAR_PLUS: 43,
		CHAR_QUESTION_MARK: 63,
		CHAR_RIGHT_ANGLE_BRACKET: 62,
		CHAR_RIGHT_CURLY_BRACE: 125,
		CHAR_RIGHT_SQUARE_BRACKET: 93,
		CHAR_SEMICOLON: 59,
		CHAR_SINGLE_QUOTE: 39,
		CHAR_SPACE: 32,
		CHAR_TAB: 9,
		CHAR_UNDERSCORE: 95,
		CHAR_VERTICAL_LINE: 124,
		CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
		SEP: path$10.sep,
		extglobChars(chars$1) {
			return {
				"!": {
					type: "negate",
					open: "(?:(?!(?:",
					close: `))${chars$1.STAR})`
				},
				"?": {
					type: "qmark",
					open: "(?:",
					close: ")?"
				},
				"+": {
					type: "plus",
					open: "(?:",
					close: ")+"
				},
				"*": {
					type: "star",
					open: "(?:",
					close: ")*"
				},
				"@": {
					type: "at",
					open: "(?:",
					close: ")"
				}
			};
		},
		globChars(win32$1) {
			return win32$1 === true ? WINDOWS_CHARS : POSIX_CHARS;
		}
	};
} });

//#endregion
//#region ../node_modules/micromatch/node_modules/picomatch/lib/utils.js
var require_utils$2 = __commonJS$1({ "../node_modules/micromatch/node_modules/picomatch/lib/utils.js"(exports) {
	const path$9 = __require("path");
	const win32 = process.platform === "win32";
	const { REGEX_BACKSLASH, REGEX_REMOVE_BACKSLASH, REGEX_SPECIAL_CHARS, REGEX_SPECIAL_CHARS_GLOBAL } = require_constants$1();
	exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
	exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
	exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
	exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
	exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
	exports.removeBackslashes = (str) => {
		return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
			return match === "\\" ? "" : match;
		});
	};
	exports.supportsLookbehinds = () => {
		const segs = process.version.slice(1).split(".").map(Number);
		if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) return true;
		return false;
	};
	exports.isWindows = (options) => {
		if (options && typeof options.windows === "boolean") return options.windows;
		return win32 === true || path$9.sep === "\\";
	};
	exports.escapeLast = (input, char, lastIdx) => {
		const idx = input.lastIndexOf(char, lastIdx);
		if (idx === -1) return input;
		if (input[idx - 1] === "\\") return exports.escapeLast(input, char, idx - 1);
		return `${input.slice(0, idx)}\\${input.slice(idx)}`;
	};
	exports.removePrefix = (input, state = {}) => {
		let output = input;
		if (output.startsWith("./")) {
			output = output.slice(2);
			state.prefix = "./";
		}
		return output;
	};
	exports.wrapOutput = (input, state = {}, options = {}) => {
		const prepend = options.contains ? "" : "^";
		const append$1 = options.contains ? "" : "$";
		let output = `${prepend}(?:${input})${append$1}`;
		if (state.negated === true) output = `(?:^(?!${output}).*$)`;
		return output;
	};
} });

//#endregion
//#region ../node_modules/micromatch/node_modules/picomatch/lib/scan.js
var require_scan = __commonJS$1({ "../node_modules/micromatch/node_modules/picomatch/lib/scan.js"(exports, module) {
	const utils$13 = require_utils$2();
	const { CHAR_ASTERISK, CHAR_AT, CHAR_BACKWARD_SLASH, CHAR_COMMA, CHAR_DOT, CHAR_EXCLAMATION_MARK, CHAR_FORWARD_SLASH, CHAR_LEFT_CURLY_BRACE, CHAR_LEFT_PARENTHESES, CHAR_LEFT_SQUARE_BRACKET, CHAR_PLUS, CHAR_QUESTION_MARK, CHAR_RIGHT_CURLY_BRACE, CHAR_RIGHT_PARENTHESES, CHAR_RIGHT_SQUARE_BRACKET } = require_constants$1();
	const isPathSeparator = (code) => {
		return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
	};
	const depth = (token) => {
		if (token.isPrefix !== true) token.depth = token.isGlobstar ? Infinity : 1;
	};
	/**
	* Quickly scans a glob pattern and returns an object with a handful of
	* useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
	* `glob` (the actual pattern), `negated` (true if the path starts with `!` but not
	* with `!(`) and `negatedExtglob` (true if the path starts with `!(`).
	*
	* ```js
	* const pm = require('picomatch');
	* console.log(pm.scan('foo/bar/*.js'));
	* { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
	* ```
	* @param {String} `str`
	* @param {Object} `options`
	* @return {Object} Returns an object with tokens and regex source string.
	* @api public
	*/
	const scan$1 = (input, options) => {
		const opts = options || {};
		const length = input.length - 1;
		const scanToEnd = opts.parts === true || opts.scanToEnd === true;
		const slashes = [];
		const tokens = [];
		const parts = [];
		let str = input;
		let index = -1;
		let start = 0;
		let lastIndex = 0;
		let isBrace = false;
		let isBracket = false;
		let isGlob$1 = false;
		let isExtglob$1 = false;
		let isGlobstar = false;
		let braceEscaped = false;
		let backslashes = false;
		let negated = false;
		let negatedExtglob = false;
		let finished$1 = false;
		let braces$2 = 0;
		let prev;
		let code;
		let token = {
			value: "",
			depth: 0,
			isGlob: false
		};
		const eos = () => index >= length;
		const peek = () => str.charCodeAt(index + 1);
		const advance = () => {
			prev = code;
			return str.charCodeAt(++index);
		};
		while (index < length) {
			code = advance();
			let next;
			if (code === CHAR_BACKWARD_SLASH) {
				backslashes = token.backslashes = true;
				code = advance();
				if (code === CHAR_LEFT_CURLY_BRACE) braceEscaped = true;
				continue;
			}
			if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
				braces$2++;
				while (eos() !== true && (code = advance())) {
					if (code === CHAR_BACKWARD_SLASH) {
						backslashes = token.backslashes = true;
						advance();
						continue;
					}
					if (code === CHAR_LEFT_CURLY_BRACE) {
						braces$2++;
						continue;
					}
					if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
						isBrace = token.isBrace = true;
						isGlob$1 = token.isGlob = true;
						finished$1 = true;
						if (scanToEnd === true) continue;
						break;
					}
					if (braceEscaped !== true && code === CHAR_COMMA) {
						isBrace = token.isBrace = true;
						isGlob$1 = token.isGlob = true;
						finished$1 = true;
						if (scanToEnd === true) continue;
						break;
					}
					if (code === CHAR_RIGHT_CURLY_BRACE) {
						braces$2--;
						if (braces$2 === 0) {
							braceEscaped = false;
							isBrace = token.isBrace = true;
							finished$1 = true;
							break;
						}
					}
				}
				if (scanToEnd === true) continue;
				break;
			}
			if (code === CHAR_FORWARD_SLASH) {
				slashes.push(index);
				tokens.push(token);
				token = {
					value: "",
					depth: 0,
					isGlob: false
				};
				if (finished$1 === true) continue;
				if (prev === CHAR_DOT && index === start + 1) {
					start += 2;
					continue;
				}
				lastIndex = index + 1;
				continue;
			}
			if (opts.noext !== true) {
				const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
				if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
					isGlob$1 = token.isGlob = true;
					isExtglob$1 = token.isExtglob = true;
					finished$1 = true;
					if (code === CHAR_EXCLAMATION_MARK && index === start) negatedExtglob = true;
					if (scanToEnd === true) {
						while (eos() !== true && (code = advance())) {
							if (code === CHAR_BACKWARD_SLASH) {
								backslashes = token.backslashes = true;
								code = advance();
								continue;
							}
							if (code === CHAR_RIGHT_PARENTHESES) {
								isGlob$1 = token.isGlob = true;
								finished$1 = true;
								break;
							}
						}
						continue;
					}
					break;
				}
			}
			if (code === CHAR_ASTERISK) {
				if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
				isGlob$1 = token.isGlob = true;
				finished$1 = true;
				if (scanToEnd === true) continue;
				break;
			}
			if (code === CHAR_QUESTION_MARK) {
				isGlob$1 = token.isGlob = true;
				finished$1 = true;
				if (scanToEnd === true) continue;
				break;
			}
			if (code === CHAR_LEFT_SQUARE_BRACKET) {
				while (eos() !== true && (next = advance())) {
					if (next === CHAR_BACKWARD_SLASH) {
						backslashes = token.backslashes = true;
						advance();
						continue;
					}
					if (next === CHAR_RIGHT_SQUARE_BRACKET) {
						isBracket = token.isBracket = true;
						isGlob$1 = token.isGlob = true;
						finished$1 = true;
						break;
					}
				}
				if (scanToEnd === true) continue;
				break;
			}
			if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
				negated = token.negated = true;
				start++;
				continue;
			}
			if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
				isGlob$1 = token.isGlob = true;
				if (scanToEnd === true) {
					while (eos() !== true && (code = advance())) {
						if (code === CHAR_LEFT_PARENTHESES) {
							backslashes = token.backslashes = true;
							code = advance();
							continue;
						}
						if (code === CHAR_RIGHT_PARENTHESES) {
							finished$1 = true;
							break;
						}
					}
					continue;
				}
				break;
			}
			if (isGlob$1 === true) {
				finished$1 = true;
				if (scanToEnd === true) continue;
				break;
			}
		}
		if (opts.noext === true) {
			isExtglob$1 = false;
			isGlob$1 = false;
		}
		let base = str;
		let prefix = "";
		let glob = "";
		if (start > 0) {
			prefix = str.slice(0, start);
			str = str.slice(start);
			lastIndex -= start;
		}
		if (base && isGlob$1 === true && lastIndex > 0) {
			base = str.slice(0, lastIndex);
			glob = str.slice(lastIndex);
		} else if (isGlob$1 === true) {
			base = "";
			glob = str;
		} else base = str;
		if (base && base !== "" && base !== "/" && base !== str) {
			if (isPathSeparator(base.charCodeAt(base.length - 1))) base = base.slice(0, -1);
		}
		if (opts.unescape === true) {
			if (glob) glob = utils$13.removeBackslashes(glob);
			if (base && backslashes === true) base = utils$13.removeBackslashes(base);
		}
		const state = {
			prefix,
			input,
			start,
			base,
			glob,
			isBrace,
			isBracket,
			isGlob: isGlob$1,
			isExtglob: isExtglob$1,
			isGlobstar,
			negated,
			negatedExtglob
		};
		if (opts.tokens === true) {
			state.maxDepth = 0;
			if (!isPathSeparator(code)) tokens.push(token);
			state.tokens = tokens;
		}
		if (opts.parts === true || opts.tokens === true) {
			let prevIndex;
			for (let idx = 0; idx < slashes.length; idx++) {
				const n$1 = prevIndex ? prevIndex + 1 : start;
				const i$1 = slashes[idx];
				const value = input.slice(n$1, i$1);
				if (opts.tokens) {
					if (idx === 0 && start !== 0) {
						tokens[idx].isPrefix = true;
						tokens[idx].value = prefix;
					} else tokens[idx].value = value;
					depth(tokens[idx]);
					state.maxDepth += tokens[idx].depth;
				}
				if (idx !== 0 || value !== "") parts.push(value);
				prevIndex = i$1;
			}
			if (prevIndex && prevIndex + 1 < input.length) {
				const value = input.slice(prevIndex + 1);
				parts.push(value);
				if (opts.tokens) {
					tokens[tokens.length - 1].value = value;
					depth(tokens[tokens.length - 1]);
					state.maxDepth += tokens[tokens.length - 1].depth;
				}
			}
			state.slashes = slashes;
			state.parts = parts;
		}
		return state;
	};
	module.exports = scan$1;
} });

//#endregion
//#region ../node_modules/micromatch/node_modules/picomatch/lib/parse.js
var require_parse = __commonJS$1({ "../node_modules/micromatch/node_modules/picomatch/lib/parse.js"(exports, module) {
	const constants$2 = require_constants$1();
	const utils$12 = require_utils$2();
	/**
	* Constants
	*/
	const { MAX_LENGTH, POSIX_REGEX_SOURCE, REGEX_NON_SPECIAL_CHARS, REGEX_SPECIAL_CHARS_BACKREF, REPLACEMENTS } = constants$2;
	/**
	* Helpers
	*/
	const expandRange = (args, options) => {
		if (typeof options.expandRange === "function") return options.expandRange(...args, options);
		args.sort();
		const value = `[${args.join("-")}]`;
		try {
			new RegExp(value);
		} catch (ex) {
			return args.map((v$1) => utils$12.escapeRegex(v$1)).join("..");
		}
		return value;
	};
	/**
	* Create the message for a syntax error
	*/
	const syntaxError = (type, char) => {
		return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
	};
	/**
	* Parse the given input string.
	* @param {String} input
	* @param {Object} options
	* @return {Object}
	*/
	const parse$1 = (input, options) => {
		if (typeof input !== "string") throw new TypeError("Expected a string");
		input = REPLACEMENTS[input] || input;
		const opts = { ...options };
		const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
		let len = input.length;
		if (len > max) throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
		const bos = {
			type: "bos",
			value: "",
			output: opts.prepend || ""
		};
		const tokens = [bos];
		const capture = opts.capture ? "" : "?:";
		const win32$1 = utils$12.isWindows(options);
		const PLATFORM_CHARS = constants$2.globChars(win32$1);
		const EXTGLOB_CHARS = constants$2.extglobChars(PLATFORM_CHARS);
		const { DOT_LITERAL: DOT_LITERAL$1, PLUS_LITERAL: PLUS_LITERAL$1, SLASH_LITERAL: SLASH_LITERAL$1, ONE_CHAR: ONE_CHAR$1, DOTS_SLASH: DOTS_SLASH$1, NO_DOT: NO_DOT$1, NO_DOT_SLASH: NO_DOT_SLASH$1, NO_DOTS_SLASH: NO_DOTS_SLASH$1, QMARK: QMARK$1, QMARK_NO_DOT: QMARK_NO_DOT$1, STAR: STAR$1, START_ANCHOR: START_ANCHOR$1 } = PLATFORM_CHARS;
		const globstar = (opts$1) => {
			return `(${capture}(?:(?!${START_ANCHOR$1}${opts$1.dot ? DOTS_SLASH$1 : DOT_LITERAL$1}).)*?)`;
		};
		const nodot = opts.dot ? "" : NO_DOT$1;
		const qmarkNoDot = opts.dot ? QMARK$1 : QMARK_NO_DOT$1;
		let star = opts.bash === true ? globstar(opts) : STAR$1;
		if (opts.capture) star = `(${star})`;
		if (typeof opts.noext === "boolean") opts.noextglob = opts.noext;
		const state = {
			input,
			index: -1,
			start: 0,
			dot: opts.dot === true,
			consumed: "",
			output: "",
			prefix: "",
			backtrack: false,
			negated: false,
			brackets: 0,
			braces: 0,
			parens: 0,
			quotes: 0,
			globstar: false,
			tokens
		};
		input = utils$12.removePrefix(input, state);
		len = input.length;
		const extglobs = [];
		const braces$2 = [];
		const stack = [];
		let prev = bos;
		let value;
		/**
		* Tokenizing helpers
		*/
		const eos = () => state.index === len - 1;
		const peek = state.peek = (n$1 = 1) => input[state.index + n$1];
		const advance = state.advance = () => input[++state.index] || "";
		const remaining = () => input.slice(state.index + 1);
		const consume = (value$1 = "", num = 0) => {
			state.consumed += value$1;
			state.index += num;
		};
		const append$1 = (token) => {
			state.output += token.output != null ? token.output : token.value;
			consume(token.value);
		};
		const negate = () => {
			let count$1 = 1;
			while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
				advance();
				state.start++;
				count$1++;
			}
			if (count$1 % 2 === 0) return false;
			state.negated = true;
			state.start++;
			return true;
		};
		const increment$1 = (type) => {
			state[type]++;
			stack.push(type);
		};
		const decrement = (type) => {
			state[type]--;
			stack.pop();
		};
		/**
		* Push tokens onto the tokens array. This helper speeds up
		* tokenizing by 1) helping us avoid backtracking as much as possible,
		* and 2) helping us avoid creating extra tokens when consecutive
		* characters are plain text. This improves performance and simplifies
		* lookbehinds.
		*/
		const push = (tok) => {
			if (prev.type === "globstar") {
				const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
				const isExtglob$1 = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
				if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob$1) {
					state.output = state.output.slice(0, -prev.output.length);
					prev.type = "star";
					prev.value = "*";
					prev.output = star;
					state.output += prev.output;
				}
			}
			if (extglobs.length && tok.type !== "paren") extglobs[extglobs.length - 1].inner += tok.value;
			if (tok.value || tok.output) append$1(tok);
			if (prev && prev.type === "text" && tok.type === "text") {
				prev.value += tok.value;
				prev.output = (prev.output || "") + tok.value;
				return;
			}
			tok.prev = prev;
			tokens.push(tok);
			prev = tok;
		};
		const extglobOpen = (type, value$1) => {
			const token = {
				...EXTGLOB_CHARS[value$1],
				conditions: 1,
				inner: ""
			};
			token.prev = prev;
			token.parens = state.parens;
			token.output = state.output;
			const output = (opts.capture ? "(" : "") + token.open;
			increment$1("parens");
			push({
				type,
				value: value$1,
				output: state.output ? "" : ONE_CHAR$1
			});
			push({
				type: "paren",
				extglob: true,
				value: advance(),
				output
			});
			extglobs.push(token);
		};
		const extglobClose = (token) => {
			let output = token.close + (opts.capture ? ")" : "");
			let rest;
			if (token.type === "negate") {
				let extglobStar = star;
				if (token.inner && token.inner.length > 1 && token.inner.includes("/")) extglobStar = globstar(opts);
				if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) output = token.close = `)$))${extglobStar}`;
				if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
					const expression = parse$1(rest, {
						...options,
						fastpaths: false
					}).output;
					output = token.close = `)${expression})${extglobStar})`;
				}
				if (token.prev.type === "bos") state.negatedExtglob = true;
			}
			push({
				type: "paren",
				extglob: true,
				value,
				output
			});
			decrement("parens");
		};
		/**
		* Fast paths
		*/
		if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
			let backslashes = false;
			let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m$1, esc, chars$1, first, rest, index) => {
				if (first === "\\") {
					backslashes = true;
					return m$1;
				}
				if (first === "?") {
					if (esc) return esc + first + (rest ? QMARK$1.repeat(rest.length) : "");
					if (index === 0) return qmarkNoDot + (rest ? QMARK$1.repeat(rest.length) : "");
					return QMARK$1.repeat(chars$1.length);
				}
				if (first === ".") return DOT_LITERAL$1.repeat(chars$1.length);
				if (first === "*") {
					if (esc) return esc + first + (rest ? star : "");
					return star;
				}
				return esc ? m$1 : `\\${m$1}`;
			});
			if (backslashes === true) if (opts.unescape === true) output = output.replace(/\\/g, "");
			else output = output.replace(/\\+/g, (m$1) => {
				return m$1.length % 2 === 0 ? "\\\\" : m$1 ? "\\" : "";
			});
			if (output === input && opts.contains === true) {
				state.output = input;
				return state;
			}
			state.output = utils$12.wrapOutput(output, state, options);
			return state;
		}
		/**
		* Tokenize input until we reach end-of-string
		*/
		while (!eos()) {
			value = advance();
			if (value === "\0") continue;
			/**
			* Escaped characters
			*/
			if (value === "\\") {
				const next = peek();
				if (next === "/" && opts.bash !== true) continue;
				if (next === "." || next === ";") continue;
				if (!next) {
					value += "\\";
					push({
						type: "text",
						value
					});
					continue;
				}
				const match = /^\\+/.exec(remaining());
				let slashes = 0;
				if (match && match[0].length > 2) {
					slashes = match[0].length;
					state.index += slashes;
					if (slashes % 2 !== 0) value += "\\";
				}
				if (opts.unescape === true) value = advance();
				else value += advance();
				if (state.brackets === 0) {
					push({
						type: "text",
						value
					});
					continue;
				}
			}
			/**
			* If we're inside a regex character class, continue
			* until we reach the closing bracket.
			*/
			if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
				if (opts.posix !== false && value === ":") {
					const inner = prev.value.slice(1);
					if (inner.includes("[")) {
						prev.posix = true;
						if (inner.includes(":")) {
							const idx = prev.value.lastIndexOf("[");
							const pre = prev.value.slice(0, idx);
							const rest$1 = prev.value.slice(idx + 2);
							const posix = POSIX_REGEX_SOURCE[rest$1];
							if (posix) {
								prev.value = pre + posix;
								state.backtrack = true;
								advance();
								if (!bos.output && tokens.indexOf(prev) === 1) bos.output = ONE_CHAR$1;
								continue;
							}
						}
					}
				}
				if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") value = `\\${value}`;
				if (value === "]" && (prev.value === "[" || prev.value === "[^")) value = `\\${value}`;
				if (opts.posix === true && value === "!" && prev.value === "[") value = "^";
				prev.value += value;
				append$1({ value });
				continue;
			}
			/**
			* If we're inside a quoted string, continue
			* until we reach the closing double quote.
			*/
			if (state.quotes === 1 && value !== "\"") {
				value = utils$12.escapeRegex(value);
				prev.value += value;
				append$1({ value });
				continue;
			}
			/**
			* Double quotes
			*/
			if (value === "\"") {
				state.quotes = state.quotes === 1 ? 0 : 1;
				if (opts.keepQuotes === true) push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Parentheses
			*/
			if (value === "(") {
				increment$1("parens");
				push({
					type: "paren",
					value
				});
				continue;
			}
			if (value === ")") {
				if (state.parens === 0 && opts.strictBrackets === true) throw new SyntaxError(syntaxError("opening", "("));
				const extglob = extglobs[extglobs.length - 1];
				if (extglob && state.parens === extglob.parens + 1) {
					extglobClose(extglobs.pop());
					continue;
				}
				push({
					type: "paren",
					value,
					output: state.parens ? ")" : "\\)"
				});
				decrement("parens");
				continue;
			}
			/**
			* Square brackets
			*/
			if (value === "[") {
				if (opts.nobracket === true || !remaining().includes("]")) {
					if (opts.nobracket !== true && opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
					value = `\\${value}`;
				} else increment$1("brackets");
				push({
					type: "bracket",
					value
				});
				continue;
			}
			if (value === "]") {
				if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
					push({
						type: "text",
						value,
						output: `\\${value}`
					});
					continue;
				}
				if (state.brackets === 0) {
					if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("opening", "["));
					push({
						type: "text",
						value,
						output: `\\${value}`
					});
					continue;
				}
				decrement("brackets");
				const prevValue = prev.value.slice(1);
				if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) value = `/${value}`;
				prev.value += value;
				append$1({ value });
				if (opts.literalBrackets === false || utils$12.hasRegexChars(prevValue)) continue;
				const escaped$1 = utils$12.escapeRegex(prev.value);
				state.output = state.output.slice(0, -prev.value.length);
				if (opts.literalBrackets === true) {
					state.output += escaped$1;
					prev.value = escaped$1;
					continue;
				}
				prev.value = `(${capture}${escaped$1}|${prev.value})`;
				state.output += prev.value;
				continue;
			}
			/**
			* Braces
			*/
			if (value === "{" && opts.nobrace !== true) {
				increment$1("braces");
				const open = {
					type: "brace",
					value,
					output: "(",
					outputIndex: state.output.length,
					tokensIndex: state.tokens.length
				};
				braces$2.push(open);
				push(open);
				continue;
			}
			if (value === "}") {
				const brace = braces$2[braces$2.length - 1];
				if (opts.nobrace === true || !brace) {
					push({
						type: "text",
						value,
						output: value
					});
					continue;
				}
				let output = ")";
				if (brace.dots === true) {
					const arr = tokens.slice();
					const range = [];
					for (let i$1 = arr.length - 1; i$1 >= 0; i$1--) {
						tokens.pop();
						if (arr[i$1].type === "brace") break;
						if (arr[i$1].type !== "dots") range.unshift(arr[i$1].value);
					}
					output = expandRange(range, opts);
					state.backtrack = true;
				}
				if (brace.comma !== true && brace.dots !== true) {
					const out = state.output.slice(0, brace.outputIndex);
					const toks = state.tokens.slice(brace.tokensIndex);
					brace.value = brace.output = "\\{";
					value = output = "\\}";
					state.output = out;
					for (const t$1 of toks) state.output += t$1.output || t$1.value;
				}
				push({
					type: "brace",
					value,
					output
				});
				decrement("braces");
				braces$2.pop();
				continue;
			}
			/**
			* Pipes
			*/
			if (value === "|") {
				if (extglobs.length > 0) extglobs[extglobs.length - 1].conditions++;
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Commas
			*/
			if (value === ",") {
				let output = value;
				const brace = braces$2[braces$2.length - 1];
				if (brace && stack[stack.length - 1] === "braces") {
					brace.comma = true;
					output = "|";
				}
				push({
					type: "comma",
					value,
					output
				});
				continue;
			}
			/**
			* Slashes
			*/
			if (value === "/") {
				if (prev.type === "dot" && state.index === state.start + 1) {
					state.start = state.index + 1;
					state.consumed = "";
					state.output = "";
					tokens.pop();
					prev = bos;
					continue;
				}
				push({
					type: "slash",
					value,
					output: SLASH_LITERAL$1
				});
				continue;
			}
			/**
			* Dots
			*/
			if (value === ".") {
				if (state.braces > 0 && prev.type === "dot") {
					if (prev.value === ".") prev.output = DOT_LITERAL$1;
					const brace = braces$2[braces$2.length - 1];
					prev.type = "dots";
					prev.output += value;
					prev.value += value;
					brace.dots = true;
					continue;
				}
				if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
					push({
						type: "text",
						value,
						output: DOT_LITERAL$1
					});
					continue;
				}
				push({
					type: "dot",
					value,
					output: DOT_LITERAL$1
				});
				continue;
			}
			/**
			* Question marks
			*/
			if (value === "?") {
				const isGroup = prev && prev.value === "(";
				if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
					extglobOpen("qmark", value);
					continue;
				}
				if (prev && prev.type === "paren") {
					const next = peek();
					let output = value;
					if (next === "<" && !utils$12.supportsLookbehinds()) throw new Error("Node.js v10 or higher is required for regex lookbehinds");
					if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) output = `\\${value}`;
					push({
						type: "text",
						value,
						output
					});
					continue;
				}
				if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
					push({
						type: "qmark",
						value,
						output: QMARK_NO_DOT$1
					});
					continue;
				}
				push({
					type: "qmark",
					value,
					output: QMARK$1
				});
				continue;
			}
			/**
			* Exclamation
			*/
			if (value === "!") {
				if (opts.noextglob !== true && peek() === "(") {
					if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
						extglobOpen("negate", value);
						continue;
					}
				}
				if (opts.nonegate !== true && state.index === 0) {
					negate();
					continue;
				}
			}
			/**
			* Plus
			*/
			if (value === "+") {
				if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
					extglobOpen("plus", value);
					continue;
				}
				if (prev && prev.value === "(" || opts.regex === false) {
					push({
						type: "plus",
						value,
						output: PLUS_LITERAL$1
					});
					continue;
				}
				if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
					push({
						type: "plus",
						value
					});
					continue;
				}
				push({
					type: "plus",
					value: PLUS_LITERAL$1
				});
				continue;
			}
			/**
			* Plain text
			*/
			if (value === "@") {
				if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
					push({
						type: "at",
						extglob: true,
						value,
						output: ""
					});
					continue;
				}
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Plain text
			*/
			if (value !== "*") {
				if (value === "$" || value === "^") value = `\\${value}`;
				const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
				if (match) {
					value += match[0];
					state.index += match[0].length;
				}
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Stars
			*/
			if (prev && (prev.type === "globstar" || prev.star === true)) {
				prev.type = "star";
				prev.star = true;
				prev.value += value;
				prev.output = star;
				state.backtrack = true;
				state.globstar = true;
				consume(value);
				continue;
			}
			let rest = remaining();
			if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
				extglobOpen("star", value);
				continue;
			}
			if (prev.type === "star") {
				if (opts.noglobstar === true) {
					consume(value);
					continue;
				}
				const prior = prev.prev;
				const before = prior.prev;
				const isStart = prior.type === "slash" || prior.type === "bos";
				const afterStar = before && (before.type === "star" || before.type === "globstar");
				if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
					push({
						type: "star",
						value,
						output: ""
					});
					continue;
				}
				const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
				const isExtglob$1 = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
				if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob$1) {
					push({
						type: "star",
						value,
						output: ""
					});
					continue;
				}
				while (rest.slice(0, 3) === "/**") {
					const after = input[state.index + 4];
					if (after && after !== "/") break;
					rest = rest.slice(3);
					consume("/**", 3);
				}
				if (prior.type === "bos" && eos()) {
					prev.type = "globstar";
					prev.value += value;
					prev.output = globstar(opts);
					state.output = prev.output;
					state.globstar = true;
					consume(value);
					continue;
				}
				if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
					state.output = state.output.slice(0, -(prior.output + prev.output).length);
					prior.output = `(?:${prior.output}`;
					prev.type = "globstar";
					prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
					prev.value += value;
					state.globstar = true;
					state.output += prior.output + prev.output;
					consume(value);
					continue;
				}
				if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
					const end = rest[1] !== void 0 ? "|$" : "";
					state.output = state.output.slice(0, -(prior.output + prev.output).length);
					prior.output = `(?:${prior.output}`;
					prev.type = "globstar";
					prev.output = `${globstar(opts)}${SLASH_LITERAL$1}|${SLASH_LITERAL$1}${end})`;
					prev.value += value;
					state.output += prior.output + prev.output;
					state.globstar = true;
					consume(value + advance());
					push({
						type: "slash",
						value: "/",
						output: ""
					});
					continue;
				}
				if (prior.type === "bos" && rest[0] === "/") {
					prev.type = "globstar";
					prev.value += value;
					prev.output = `(?:^|${SLASH_LITERAL$1}|${globstar(opts)}${SLASH_LITERAL$1})`;
					state.output = prev.output;
					state.globstar = true;
					consume(value + advance());
					push({
						type: "slash",
						value: "/",
						output: ""
					});
					continue;
				}
				state.output = state.output.slice(0, -prev.output.length);
				prev.type = "globstar";
				prev.output = globstar(opts);
				prev.value += value;
				state.output += prev.output;
				state.globstar = true;
				consume(value);
				continue;
			}
			const token = {
				type: "star",
				value,
				output: star
			};
			if (opts.bash === true) {
				token.output = ".*?";
				if (prev.type === "bos" || prev.type === "slash") token.output = nodot + token.output;
				push(token);
				continue;
			}
			if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
				token.output = value;
				push(token);
				continue;
			}
			if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
				if (prev.type === "dot") {
					state.output += NO_DOT_SLASH$1;
					prev.output += NO_DOT_SLASH$1;
				} else if (opts.dot === true) {
					state.output += NO_DOTS_SLASH$1;
					prev.output += NO_DOTS_SLASH$1;
				} else {
					state.output += nodot;
					prev.output += nodot;
				}
				if (peek() !== "*") {
					state.output += ONE_CHAR$1;
					prev.output += ONE_CHAR$1;
				}
			}
			push(token);
		}
		while (state.brackets > 0) {
			if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
			state.output = utils$12.escapeLast(state.output, "[");
			decrement("brackets");
		}
		while (state.parens > 0) {
			if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
			state.output = utils$12.escapeLast(state.output, "(");
			decrement("parens");
		}
		while (state.braces > 0) {
			if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
			state.output = utils$12.escapeLast(state.output, "{");
			decrement("braces");
		}
		if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) push({
			type: "maybe_slash",
			value: "",
			output: `${SLASH_LITERAL$1}?`
		});
		if (state.backtrack === true) {
			state.output = "";
			for (const token of state.tokens) {
				state.output += token.output != null ? token.output : token.value;
				if (token.suffix) state.output += token.suffix;
			}
		}
		return state;
	};
	/**
	* Fast paths for creating regular expressions for common glob patterns.
	* This can significantly speed up processing and has very little downside
	* impact when none of the fast paths match.
	*/
	parse$1.fastpaths = (input, options) => {
		const opts = { ...options };
		const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
		const len = input.length;
		if (len > max) throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
		input = REPLACEMENTS[input] || input;
		const win32$1 = utils$12.isWindows(options);
		const { DOT_LITERAL: DOT_LITERAL$1, SLASH_LITERAL: SLASH_LITERAL$1, ONE_CHAR: ONE_CHAR$1, DOTS_SLASH: DOTS_SLASH$1, NO_DOT: NO_DOT$1, NO_DOTS: NO_DOTS$1, NO_DOTS_SLASH: NO_DOTS_SLASH$1, STAR: STAR$1, START_ANCHOR: START_ANCHOR$1 } = constants$2.globChars(win32$1);
		const nodot = opts.dot ? NO_DOTS$1 : NO_DOT$1;
		const slashDot = opts.dot ? NO_DOTS_SLASH$1 : NO_DOT$1;
		const capture = opts.capture ? "" : "?:";
		const state = {
			negated: false,
			prefix: ""
		};
		let star = opts.bash === true ? ".*?" : STAR$1;
		if (opts.capture) star = `(${star})`;
		const globstar = (opts$1) => {
			if (opts$1.noglobstar === true) return star;
			return `(${capture}(?:(?!${START_ANCHOR$1}${opts$1.dot ? DOTS_SLASH$1 : DOT_LITERAL$1}).)*?)`;
		};
		const create = (str) => {
			switch (str) {
				case "*": return `${nodot}${ONE_CHAR$1}${star}`;
				case ".*": return `${DOT_LITERAL$1}${ONE_CHAR$1}${star}`;
				case "*.*": return `${nodot}${star}${DOT_LITERAL$1}${ONE_CHAR$1}${star}`;
				case "*/*": return `${nodot}${star}${SLASH_LITERAL$1}${ONE_CHAR$1}${slashDot}${star}`;
				case "**": return nodot + globstar(opts);
				case "**/*": return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL$1})?${slashDot}${ONE_CHAR$1}${star}`;
				case "**/*.*": return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL$1})?${slashDot}${star}${DOT_LITERAL$1}${ONE_CHAR$1}${star}`;
				case "**/.*": return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL$1})?${DOT_LITERAL$1}${ONE_CHAR$1}${star}`;
				default: {
					const match = /^(.*?)\.(\w+)$/.exec(str);
					if (!match) return;
					const source$1 = create(match[1]);
					if (!source$1) return;
					return source$1 + DOT_LITERAL$1 + match[2];
				}
			}
		};
		const output = utils$12.removePrefix(input, state);
		let source = create(output);
		if (source && opts.strictSlashes !== true) source += `${SLASH_LITERAL$1}?`;
		return source;
	};
	module.exports = parse$1;
} });

//#endregion
//#region ../node_modules/micromatch/node_modules/picomatch/lib/picomatch.js
var require_picomatch$1 = __commonJS$1({ "../node_modules/micromatch/node_modules/picomatch/lib/picomatch.js"(exports, module) {
	const path$8 = __require("path");
	const scan = require_scan();
	const parse = require_parse();
	const utils$11 = require_utils$2();
	const constants$1 = require_constants$1();
	const isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
	/**
	* Creates a matcher function from one or more glob patterns. The
	* returned function takes a string to match as its first argument,
	* and returns true if the string is a match. The returned matcher
	* function also takes a boolean as the second argument that, when true,
	* returns an object with additional information.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch(glob[, options]);
	*
	* const isMatch = picomatch('*.!(*a)');
	* console.log(isMatch('a.a')); //=> false
	* console.log(isMatch('a.b')); //=> true
	* ```
	* @name picomatch
	* @param {String|Array} `globs` One or more glob patterns.
	* @param {Object=} `options`
	* @return {Function=} Returns a matcher function.
	* @api public
	*/
	const picomatch$1 = (glob, options, returnState = false) => {
		if (Array.isArray(glob)) {
			const fns = glob.map((input) => picomatch$1(input, options, returnState));
			const arrayMatcher = (str) => {
				for (const isMatch of fns) {
					const state$1 = isMatch(str);
					if (state$1) return state$1;
				}
				return false;
			};
			return arrayMatcher;
		}
		const isState = isObject(glob) && glob.tokens && glob.input;
		if (glob === "" || typeof glob !== "string" && !isState) throw new TypeError("Expected pattern to be a non-empty string");
		const opts = options || {};
		const posix = utils$11.isWindows(options);
		const regex = isState ? picomatch$1.compileRe(glob, options) : picomatch$1.makeRe(glob, options, false, true);
		const state = regex.state;
		delete regex.state;
		let isIgnored = () => false;
		if (opts.ignore) {
			const ignoreOpts = {
				...options,
				ignore: null,
				onMatch: null,
				onResult: null
			};
			isIgnored = picomatch$1(opts.ignore, ignoreOpts, returnState);
		}
		const matcher = (input, returnObject = false) => {
			const { isMatch, match, output } = picomatch$1.test(input, regex, options, {
				glob,
				posix
			});
			const result = {
				glob,
				state,
				regex,
				posix,
				input,
				output,
				match,
				isMatch
			};
			if (typeof opts.onResult === "function") opts.onResult(result);
			if (isMatch === false) {
				result.isMatch = false;
				return returnObject ? result : false;
			}
			if (isIgnored(input)) {
				if (typeof opts.onIgnore === "function") opts.onIgnore(result);
				result.isMatch = false;
				return returnObject ? result : false;
			}
			if (typeof opts.onMatch === "function") opts.onMatch(result);
			return returnObject ? result : true;
		};
		if (returnState) matcher.state = state;
		return matcher;
	};
	/**
	* Test `input` with the given `regex`. This is used by the main
	* `picomatch()` function to test the input string.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.test(input, regex[, options]);
	*
	* console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
	* // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
	* ```
	* @param {String} `input` String to test.
	* @param {RegExp} `regex`
	* @return {Object} Returns an object with matching info.
	* @api public
	*/
	picomatch$1.test = (input, regex, options, { glob, posix } = {}) => {
		if (typeof input !== "string") throw new TypeError("Expected input to be a string");
		if (input === "") return {
			isMatch: false,
			output: ""
		};
		const opts = options || {};
		const format$1 = opts.format || (posix ? utils$11.toPosixSlashes : null);
		let match = input === glob;
		let output = match && format$1 ? format$1(input) : input;
		if (match === false) {
			output = format$1 ? format$1(input) : input;
			match = output === glob;
		}
		if (match === false || opts.capture === true) if (opts.matchBase === true || opts.basename === true) match = picomatch$1.matchBase(input, regex, options, posix);
		else match = regex.exec(output);
		return {
			isMatch: Boolean(match),
			match,
			output
		};
	};
	/**
	* Match the basename of a filepath.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.matchBase(input, glob[, options]);
	* console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
	* ```
	* @param {String} `input` String to test.
	* @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
	* @return {Boolean}
	* @api public
	*/
	picomatch$1.matchBase = (input, glob, options, posix = utils$11.isWindows(options)) => {
		const regex = glob instanceof RegExp ? glob : picomatch$1.makeRe(glob, options);
		return regex.test(path$8.basename(input));
	};
	/**
	* Returns true if **any** of the given glob `patterns` match the specified `string`.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.isMatch(string, patterns[, options]);
	*
	* console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
	* console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
	* ```
	* @param {String|Array} str The string to test.
	* @param {String|Array} patterns One or more glob patterns to use for matching.
	* @param {Object} [options] See available [options](#options).
	* @return {Boolean} Returns true if any patterns match `str`
	* @api public
	*/
	picomatch$1.isMatch = (str, patterns, options) => picomatch$1(patterns, options)(str);
	/**
	* Parse a glob pattern to create the source string for a regular
	* expression.
	*
	* ```js
	* const picomatch = require('picomatch');
	* const result = picomatch.parse(pattern[, options]);
	* ```
	* @param {String} `pattern`
	* @param {Object} `options`
	* @return {Object} Returns an object with useful properties and output to be used as a regex source string.
	* @api public
	*/
	picomatch$1.parse = (pattern$1, options) => {
		if (Array.isArray(pattern$1)) return pattern$1.map((p$2) => picomatch$1.parse(p$2, options));
		return parse(pattern$1, {
			...options,
			fastpaths: false
		});
	};
	/**
	* Scan a glob pattern to separate the pattern into segments.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.scan(input[, options]);
	*
	* const result = picomatch.scan('!./foo/*.js');
	* console.log(result);
	* { prefix: '!./',
	*   input: '!./foo/*.js',
	*   start: 3,
	*   base: 'foo',
	*   glob: '*.js',
	*   isBrace: false,
	*   isBracket: false,
	*   isGlob: true,
	*   isExtglob: false,
	*   isGlobstar: false,
	*   negated: true }
	* ```
	* @param {String} `input` Glob pattern to scan.
	* @param {Object} `options`
	* @return {Object} Returns an object with
	* @api public
	*/
	picomatch$1.scan = (input, options) => scan(input, options);
	/**
	* Compile a regular expression from the `state` object returned by the
	* [parse()](#parse) method.
	*
	* @param {Object} `state`
	* @param {Object} `options`
	* @param {Boolean} `returnOutput` Intended for implementors, this argument allows you to return the raw output from the parser.
	* @param {Boolean} `returnState` Adds the state to a `state` property on the returned regex. Useful for implementors and debugging.
	* @return {RegExp}
	* @api public
	*/
	picomatch$1.compileRe = (state, options, returnOutput = false, returnState = false) => {
		if (returnOutput === true) return state.output;
		const opts = options || {};
		const prepend = opts.contains ? "" : "^";
		const append$1 = opts.contains ? "" : "$";
		let source = `${prepend}(?:${state.output})${append$1}`;
		if (state && state.negated === true) source = `^(?!${source}).*$`;
		const regex = picomatch$1.toRegex(source, options);
		if (returnState === true) regex.state = state;
		return regex;
	};
	/**
	* Create a regular expression from a parsed glob pattern.
	*
	* ```js
	* const picomatch = require('picomatch');
	* const state = picomatch.parse('*.js');
	* // picomatch.compileRe(state[, options]);
	*
	* console.log(picomatch.compileRe(state));
	* //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
	* ```
	* @param {String} `state` The object returned from the `.parse` method.
	* @param {Object} `options`
	* @param {Boolean} `returnOutput` Implementors may use this argument to return the compiled output, instead of a regular expression. This is not exposed on the options to prevent end-users from mutating the result.
	* @param {Boolean} `returnState` Implementors may use this argument to return the state from the parsed glob with the returned regular expression.
	* @return {RegExp} Returns a regex created from the given pattern.
	* @api public
	*/
	picomatch$1.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
		if (!input || typeof input !== "string") throw new TypeError("Expected a non-empty string");
		let parsed = {
			negated: false,
			fastpaths: true
		};
		if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) parsed.output = parse.fastpaths(input, options);
		if (!parsed.output) parsed = parse(input, options);
		return picomatch$1.compileRe(parsed, options, returnOutput, returnState);
	};
	/**
	* Create a regular expression from the given regex source string.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.toRegex(source[, options]);
	*
	* const { output } = picomatch.parse('*.js');
	* console.log(picomatch.toRegex(output));
	* //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
	* ```
	* @param {String} `source` Regular expression source string.
	* @param {Object} `options`
	* @return {RegExp}
	* @api public
	*/
	picomatch$1.toRegex = (source, options) => {
		try {
			const opts = options || {};
			return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
		} catch (err) {
			if (options && options.debug === true) throw err;
			return /$^/;
		}
	};
	/**
	* Picomatch constants.
	* @return {Object}
	*/
	picomatch$1.constants = constants$1;
	/**
	* Expose "picomatch"
	*/
	module.exports = picomatch$1;
} });

//#endregion
//#region ../node_modules/micromatch/node_modules/picomatch/index.js
var require_picomatch = __commonJS$1({ "../node_modules/micromatch/node_modules/picomatch/index.js"(exports, module) {
	module.exports = require_picomatch$1();
} });

//#endregion
//#region ../node_modules/micromatch/index.js
var require_micromatch = __commonJS$1({ "../node_modules/micromatch/index.js"(exports, module) {
	const util = __require("util");
	const braces = require_braces();
	const picomatch = require_picomatch();
	const utils$10 = require_utils$2();
	const isEmptyString = (v$1) => v$1 === "" || v$1 === "./";
	const hasBraces = (v$1) => {
		const index = v$1.indexOf("{");
		return index > -1 && v$1.indexOf("}", index) > -1;
	};
	/**
	* Returns an array of strings that match one or more glob patterns.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm(list, patterns[, options]);
	*
	* console.log(mm(['a.js', 'a.txt'], ['*.js']));
	* //=> [ 'a.js' ]
	* ```
	* @param {String|Array<string>} `list` List of strings to match.
	* @param {String|Array<string>} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `options` See available [options](#options)
	* @return {Array} Returns an array of matches
	* @summary false
	* @api public
	*/
	const micromatch$1 = (list, patterns, options) => {
		patterns = [].concat(patterns);
		list = [].concat(list);
		let omit = new Set();
		let keep = new Set();
		let items = new Set();
		let negatives = 0;
		let onResult = (state) => {
			items.add(state.output);
			if (options && options.onResult) options.onResult(state);
		};
		for (let i$1 = 0; i$1 < patterns.length; i$1++) {
			let isMatch = picomatch(String(patterns[i$1]), {
				...options,
				onResult
			}, true);
			let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
			if (negated) negatives++;
			for (let item of list) {
				let matched = isMatch(item, true);
				let match = negated ? !matched.isMatch : matched.isMatch;
				if (!match) continue;
				if (negated) omit.add(matched.output);
				else {
					omit.delete(matched.output);
					keep.add(matched.output);
				}
			}
		}
		let result = negatives === patterns.length ? [...items] : [...keep];
		let matches = result.filter((item) => !omit.has(item));
		if (options && matches.length === 0) {
			if (options.failglob === true) throw new Error(`No matches found for "${patterns.join(", ")}"`);
			if (options.nonull === true || options.nullglob === true) return options.unescape ? patterns.map((p$2) => p$2.replace(/\\/g, "")) : patterns;
		}
		return matches;
	};
	/**
	* Backwards compatibility
	*/
	micromatch$1.match = micromatch$1;
	/**
	* Returns a matcher function from the given glob `pattern` and `options`.
	* The returned function takes a string to match as its only argument and returns
	* true if the string is a match.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.matcher(pattern[, options]);
	*
	* const isMatch = mm.matcher('*.!(*a)');
	* console.log(isMatch('a.a')); //=> false
	* console.log(isMatch('a.b')); //=> true
	* ```
	* @param {String} `pattern` Glob pattern
	* @param {Object} `options`
	* @return {Function} Returns a matcher function.
	* @api public
	*/
	micromatch$1.matcher = (pattern$1, options) => picomatch(pattern$1, options);
	/**
	* Returns true if **any** of the given glob `patterns` match the specified `string`.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.isMatch(string, patterns[, options]);
	*
	* console.log(mm.isMatch('a.a', ['b.*', '*.a'])); //=> true
	* console.log(mm.isMatch('a.a', 'b.*')); //=> false
	* ```
	* @param {String} `str` The string to test.
	* @param {String|Array} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `[options]` See available [options](#options).
	* @return {Boolean} Returns true if any patterns match `str`
	* @api public
	*/
	micromatch$1.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
	/**
	* Backwards compatibility
	*/
	micromatch$1.any = micromatch$1.isMatch;
	/**
	* Returns a list of strings that _**do not match any**_ of the given `patterns`.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.not(list, patterns[, options]);
	*
	* console.log(mm.not(['a.a', 'b.b', 'c.c'], '*.a'));
	* //=> ['b.b', 'c.c']
	* ```
	* @param {Array} `list` Array of strings to match.
	* @param {String|Array} `patterns` One or more glob pattern to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Array} Returns an array of strings that **do not match** the given patterns.
	* @api public
	*/
	micromatch$1.not = (list, patterns, options = {}) => {
		patterns = [].concat(patterns).map(String);
		let result = new Set();
		let items = [];
		let onResult = (state) => {
			if (options.onResult) options.onResult(state);
			items.push(state.output);
		};
		let matches = new Set(micromatch$1(list, patterns, {
			...options,
			onResult
		}));
		for (let item of items) if (!matches.has(item)) result.add(item);
		return [...result];
	};
	/**
	* Returns true if the given `string` contains the given pattern. Similar
	* to [.isMatch](#isMatch) but the pattern can match any part of the string.
	*
	* ```js
	* var mm = require('micromatch');
	* // mm.contains(string, pattern[, options]);
	*
	* console.log(mm.contains('aa/bb/cc', '*b'));
	* //=> true
	* console.log(mm.contains('aa/bb/cc', '*d'));
	* //=> false
	* ```
	* @param {String} `str` The string to match.
	* @param {String|Array} `patterns` Glob pattern to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Boolean} Returns true if any of the patterns matches any part of `str`.
	* @api public
	*/
	micromatch$1.contains = (str, pattern$1, options) => {
		if (typeof str !== "string") throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
		if (Array.isArray(pattern$1)) return pattern$1.some((p$2) => micromatch$1.contains(str, p$2, options));
		if (typeof pattern$1 === "string") {
			if (isEmptyString(str) || isEmptyString(pattern$1)) return false;
			if (str.includes(pattern$1) || str.startsWith("./") && str.slice(2).includes(pattern$1)) return true;
		}
		return micromatch$1.isMatch(str, pattern$1, {
			...options,
			contains: true
		});
	};
	/**
	* Filter the keys of the given object with the given `glob` pattern
	* and `options`. Does not attempt to match nested keys. If you need this feature,
	* use [glob-object][] instead.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.matchKeys(object, patterns[, options]);
	*
	* const obj = { aa: 'a', ab: 'b', ac: 'c' };
	* console.log(mm.matchKeys(obj, '*b'));
	* //=> { ab: 'b' }
	* ```
	* @param {Object} `object` The object with keys to filter.
	* @param {String|Array} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Object} Returns an object with only keys that match the given patterns.
	* @api public
	*/
	micromatch$1.matchKeys = (obj, patterns, options) => {
		if (!utils$10.isObject(obj)) throw new TypeError("Expected the first argument to be an object");
		let keys = micromatch$1(Object.keys(obj), patterns, options);
		let res = {};
		for (let key of keys) res[key] = obj[key];
		return res;
	};
	/**
	* Returns true if some of the strings in the given `list` match any of the given glob `patterns`.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.some(list, patterns[, options]);
	*
	* console.log(mm.some(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
	* // true
	* console.log(mm.some(['foo.js'], ['*.js', '!foo.js']));
	* // false
	* ```
	* @param {String|Array} `list` The string or array of strings to test. Returns as soon as the first match is found.
	* @param {String|Array} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Boolean} Returns true if any `patterns` matches any of the strings in `list`
	* @api public
	*/
	micromatch$1.some = (list, patterns, options) => {
		let items = [].concat(list);
		for (let pattern$1 of [].concat(patterns)) {
			let isMatch = picomatch(String(pattern$1), options);
			if (items.some((item) => isMatch(item))) return true;
		}
		return false;
	};
	/**
	* Returns true if every string in the given `list` matches
	* any of the given glob `patterns`.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.every(list, patterns[, options]);
	*
	* console.log(mm.every('foo.js', ['foo.js']));
	* // true
	* console.log(mm.every(['foo.js', 'bar.js'], ['*.js']));
	* // true
	* console.log(mm.every(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
	* // false
	* console.log(mm.every(['foo.js'], ['*.js', '!foo.js']));
	* // false
	* ```
	* @param {String|Array} `list` The string or array of strings to test.
	* @param {String|Array} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Boolean} Returns true if all `patterns` matches all of the strings in `list`
	* @api public
	*/
	micromatch$1.every = (list, patterns, options) => {
		let items = [].concat(list);
		for (let pattern$1 of [].concat(patterns)) {
			let isMatch = picomatch(String(pattern$1), options);
			if (!items.every((item) => isMatch(item))) return false;
		}
		return true;
	};
	/**
	* Returns true if **all** of the given `patterns` match
	* the specified string.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.all(string, patterns[, options]);
	*
	* console.log(mm.all('foo.js', ['foo.js']));
	* // true
	*
	* console.log(mm.all('foo.js', ['*.js', '!foo.js']));
	* // false
	*
	* console.log(mm.all('foo.js', ['*.js', 'foo.js']));
	* // true
	*
	* console.log(mm.all('foo.js', ['*.js', 'f*', '*o*', '*o.js']));
	* // true
	* ```
	* @param {String|Array} `str` The string to test.
	* @param {String|Array} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Boolean} Returns true if any patterns match `str`
	* @api public
	*/
	micromatch$1.all = (str, patterns, options) => {
		if (typeof str !== "string") throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
		return [].concat(patterns).every((p$2) => picomatch(p$2, options)(str));
	};
	/**
	* Returns an array of matches captured by `pattern` in `string, or `null` if the pattern did not match.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.capture(pattern, string[, options]);
	*
	* console.log(mm.capture('test/*.js', 'test/foo.js'));
	* //=> ['foo']
	* console.log(mm.capture('test/*.js', 'foo/bar.css'));
	* //=> null
	* ```
	* @param {String} `glob` Glob pattern to use for matching.
	* @param {String} `input` String to match
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Array|null} Returns an array of captures if the input matches the glob pattern, otherwise `null`.
	* @api public
	*/
	micromatch$1.capture = (glob, input, options) => {
		let posix = utils$10.isWindows(options);
		let regex = picomatch.makeRe(String(glob), {
			...options,
			capture: true
		});
		let match = regex.exec(posix ? utils$10.toPosixSlashes(input) : input);
		if (match) return match.slice(1).map((v$1) => v$1 === void 0 ? "" : v$1);
	};
	/**
	* Create a regular expression from the given glob `pattern`.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.makeRe(pattern[, options]);
	*
	* console.log(mm.makeRe('*.js'));
	* //=> /^(?:(\.[\\\/])?(?!\.)(?=.)[^\/]*?\.js)$/
	* ```
	* @param {String} `pattern` A glob pattern to convert to regex.
	* @param {Object} `options`
	* @return {RegExp} Returns a regex created from the given pattern.
	* @api public
	*/
	micromatch$1.makeRe = (...args) => picomatch.makeRe(...args);
	/**
	* Scan a glob pattern to separate the pattern into segments. Used
	* by the [split](#split) method.
	*
	* ```js
	* const mm = require('micromatch');
	* const state = mm.scan(pattern[, options]);
	* ```
	* @param {String} `pattern`
	* @param {Object} `options`
	* @return {Object} Returns an object with
	* @api public
	*/
	micromatch$1.scan = (...args) => picomatch.scan(...args);
	/**
	* Parse a glob pattern to create the source string for a regular
	* expression.
	*
	* ```js
	* const mm = require('micromatch');
	* const state = mm.parse(pattern[, options]);
	* ```
	* @param {String} `glob`
	* @param {Object} `options`
	* @return {Object} Returns an object with useful properties and output to be used as regex source string.
	* @api public
	*/
	micromatch$1.parse = (patterns, options) => {
		let res = [];
		for (let pattern$1 of [].concat(patterns || [])) for (let str of braces(String(pattern$1), options)) res.push(picomatch.parse(str, options));
		return res;
	};
	/**
	* Process the given brace `pattern`.
	*
	* ```js
	* const { braces } = require('micromatch');
	* console.log(braces('foo/{a,b,c}/bar'));
	* //=> [ 'foo/(a|b|c)/bar' ]
	*
	* console.log(braces('foo/{a,b,c}/bar', { expand: true }));
	* //=> [ 'foo/a/bar', 'foo/b/bar', 'foo/c/bar' ]
	* ```
	* @param {String} `pattern` String with brace pattern to process.
	* @param {Object} `options` Any [options](#options) to change how expansion is performed. See the [braces][] library for all available options.
	* @return {Array}
	* @api public
	*/
	micromatch$1.braces = (pattern$1, options) => {
		if (typeof pattern$1 !== "string") throw new TypeError("Expected a string");
		if (options && options.nobrace === true || !hasBraces(pattern$1)) return [pattern$1];
		return braces(pattern$1, options);
	};
	/**
	* Expand braces
	*/
	micromatch$1.braceExpand = (pattern$1, options) => {
		if (typeof pattern$1 !== "string") throw new TypeError("Expected a string");
		return micromatch$1.braces(pattern$1, {
			...options,
			expand: true
		});
	};
	/**
	* Expose micromatch
	*/
	micromatch$1.hasBraces = hasBraces;
	module.exports = micromatch$1;
} });

//#endregion
//#region ../node_modules/fast-glob/out/utils/pattern.js
var require_pattern = __commonJS$1({ "../node_modules/fast-glob/out/utils/pattern.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isAbsolute = exports.partitionAbsoluteAndRelative = exports.removeDuplicateSlashes = exports.matchAny = exports.convertPatternsToRe = exports.makeRe = exports.getPatternParts = exports.expandBraceExpansion = exports.expandPatternsWithBraceExpansion = exports.isAffectDepthOfReadingPattern = exports.endsWithSlashGlobStar = exports.hasGlobStar = exports.getBaseDirectory = exports.isPatternRelatedToParentDirectory = exports.getPatternsOutsideCurrentDirectory = exports.getPatternsInsideCurrentDirectory = exports.getPositivePatterns = exports.getNegativePatterns = exports.isPositivePattern = exports.isNegativePattern = exports.convertToNegativePattern = exports.convertToPositivePattern = exports.isDynamicPattern = exports.isStaticPattern = void 0;
	const path$7 = __require("path");
	const globParent = require_glob_parent();
	const micromatch = require_micromatch();
	const GLOBSTAR = "**";
	const ESCAPE_SYMBOL = "\\";
	const COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/;
	const REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[[^[]*]/;
	const REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\([^(]*\|[^|]*\)/;
	const GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\([^(]*\)/;
	const BRACE_EXPANSION_SEPARATORS_RE = /,|\.\./;
	/**
	* Matches a sequence of two or more consecutive slashes, excluding the first two slashes at the beginning of the string.
	* The latter is due to the presence of the device path at the beginning of the UNC path.
	*/
	const DOUBLE_SLASH_RE = /(?!^)\/{2,}/g;
	function isStaticPattern(pattern$1, options = {}) {
		return !isDynamicPattern$1(pattern$1, options);
	}
	exports.isStaticPattern = isStaticPattern;
	function isDynamicPattern$1(pattern$1, options = {}) {
		/**
		* A special case with an empty string is necessary for matching patterns that start with a forward slash.
		* An empty string cannot be a dynamic pattern.
		* For example, the pattern `/lib/*` will be spread into parts: '', 'lib', '*'.
		*/
		if (pattern$1 === "") return false;
		/**
		* When the `caseSensitiveMatch` option is disabled, all patterns must be marked as dynamic, because we cannot check
		* filepath directly (without read directory).
		*/
		if (options.caseSensitiveMatch === false || pattern$1.includes(ESCAPE_SYMBOL)) return true;
		if (COMMON_GLOB_SYMBOLS_RE.test(pattern$1) || REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern$1) || REGEX_GROUP_SYMBOLS_RE.test(pattern$1)) return true;
		if (options.extglob !== false && GLOB_EXTENSION_SYMBOLS_RE.test(pattern$1)) return true;
		if (options.braceExpansion !== false && hasBraceExpansion(pattern$1)) return true;
		return false;
	}
	exports.isDynamicPattern = isDynamicPattern$1;
	function hasBraceExpansion(pattern$1) {
		const openingBraceIndex = pattern$1.indexOf("{");
		if (openingBraceIndex === -1) return false;
		const closingBraceIndex = pattern$1.indexOf("}", openingBraceIndex + 1);
		if (closingBraceIndex === -1) return false;
		const braceContent = pattern$1.slice(openingBraceIndex, closingBraceIndex);
		return BRACE_EXPANSION_SEPARATORS_RE.test(braceContent);
	}
	function convertToPositivePattern(pattern$1) {
		return isNegativePattern$1(pattern$1) ? pattern$1.slice(1) : pattern$1;
	}
	exports.convertToPositivePattern = convertToPositivePattern;
	function convertToNegativePattern(pattern$1) {
		return "!" + pattern$1;
	}
	exports.convertToNegativePattern = convertToNegativePattern;
	function isNegativePattern$1(pattern$1) {
		return pattern$1.startsWith("!") && pattern$1[1] !== "(";
	}
	exports.isNegativePattern = isNegativePattern$1;
	function isPositivePattern(pattern$1) {
		return !isNegativePattern$1(pattern$1);
	}
	exports.isPositivePattern = isPositivePattern;
	function getNegativePatterns(patterns) {
		return patterns.filter(isNegativePattern$1);
	}
	exports.getNegativePatterns = getNegativePatterns;
	function getPositivePatterns$1(patterns) {
		return patterns.filter(isPositivePattern);
	}
	exports.getPositivePatterns = getPositivePatterns$1;
	/**
	* Returns patterns that can be applied inside the current directory.
	*
	* @example
	* // ['./*', '*', 'a/*']
	* getPatternsInsideCurrentDirectory(['./*', '*', 'a/*', '../*', './../*'])
	*/
	function getPatternsInsideCurrentDirectory(patterns) {
		return patterns.filter((pattern$1) => !isPatternRelatedToParentDirectory(pattern$1));
	}
	exports.getPatternsInsideCurrentDirectory = getPatternsInsideCurrentDirectory;
	/**
	* Returns patterns to be expanded relative to (outside) the current directory.
	*
	* @example
	* // ['../*', './../*']
	* getPatternsInsideCurrentDirectory(['./*', '*', 'a/*', '../*', './../*'])
	*/
	function getPatternsOutsideCurrentDirectory(patterns) {
		return patterns.filter(isPatternRelatedToParentDirectory);
	}
	exports.getPatternsOutsideCurrentDirectory = getPatternsOutsideCurrentDirectory;
	function isPatternRelatedToParentDirectory(pattern$1) {
		return pattern$1.startsWith("..") || pattern$1.startsWith("./..");
	}
	exports.isPatternRelatedToParentDirectory = isPatternRelatedToParentDirectory;
	function getBaseDirectory(pattern$1) {
		return globParent(pattern$1, { flipBackslashes: false });
	}
	exports.getBaseDirectory = getBaseDirectory;
	function hasGlobStar(pattern$1) {
		return pattern$1.includes(GLOBSTAR);
	}
	exports.hasGlobStar = hasGlobStar;
	function endsWithSlashGlobStar(pattern$1) {
		return pattern$1.endsWith("/" + GLOBSTAR);
	}
	exports.endsWithSlashGlobStar = endsWithSlashGlobStar;
	function isAffectDepthOfReadingPattern(pattern$1) {
		const basename = path$7.basename(pattern$1);
		return endsWithSlashGlobStar(pattern$1) || isStaticPattern(basename);
	}
	exports.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern;
	function expandPatternsWithBraceExpansion(patterns) {
		return patterns.reduce((collection, pattern$1) => {
			return collection.concat(expandBraceExpansion(pattern$1));
		}, []);
	}
	exports.expandPatternsWithBraceExpansion = expandPatternsWithBraceExpansion;
	function expandBraceExpansion(pattern$1) {
		const patterns = micromatch.braces(pattern$1, {
			expand: true,
			nodupes: true,
			keepEscaping: true
		});
		/**
		* Sort the patterns by length so that the same depth patterns are processed side by side.
		* `a/{b,}/{c,}/*` – `['a///*', 'a/b//*', 'a//c/*', 'a/b/c/*']`
		*/
		patterns.sort((a$1, b$2) => a$1.length - b$2.length);
		/**
		* Micromatch can return an empty string in the case of patterns like `{a,}`.
		*/
		return patterns.filter((pattern$2) => pattern$2 !== "");
	}
	exports.expandBraceExpansion = expandBraceExpansion;
	function getPatternParts(pattern$1, options) {
		let { parts } = micromatch.scan(pattern$1, Object.assign(Object.assign({}, options), { parts: true }));
		/**
		* The scan method returns an empty array in some cases.
		* See micromatch/picomatch#58 for more details.
		*/
		if (parts.length === 0) parts = [pattern$1];
		/**
		* The scan method does not return an empty part for the pattern with a forward slash.
		* This is another part of micromatch/picomatch#58.
		*/
		if (parts[0].startsWith("/")) {
			parts[0] = parts[0].slice(1);
			parts.unshift("");
		}
		return parts;
	}
	exports.getPatternParts = getPatternParts;
	function makeRe(pattern$1, options) {
		return micromatch.makeRe(pattern$1, options);
	}
	exports.makeRe = makeRe;
	function convertPatternsToRe(patterns, options) {
		return patterns.map((pattern$1) => makeRe(pattern$1, options));
	}
	exports.convertPatternsToRe = convertPatternsToRe;
	function matchAny(entry, patternsRe) {
		return patternsRe.some((patternRe) => patternRe.test(entry));
	}
	exports.matchAny = matchAny;
	/**
	* This package only works with forward slashes as a path separator.
	* Because of this, we cannot use the standard `path.normalize` method, because on Windows platform it will use of backslashes.
	*/
	function removeDuplicateSlashes(pattern$1) {
		return pattern$1.replace(DOUBLE_SLASH_RE, "/");
	}
	exports.removeDuplicateSlashes = removeDuplicateSlashes;
	function partitionAbsoluteAndRelative(patterns) {
		const absolute = [];
		const relative = [];
		for (const pattern$1 of patterns) if (isAbsolute(pattern$1)) absolute.push(pattern$1);
		else relative.push(pattern$1);
		return [absolute, relative];
	}
	exports.partitionAbsoluteAndRelative = partitionAbsoluteAndRelative;
	function isAbsolute(pattern$1) {
		return path$7.isAbsolute(pattern$1);
	}
	exports.isAbsolute = isAbsolute;
} });

//#endregion
//#region ../node_modules/merge2/index.js
var require_merge2 = __commonJS$1({ "../node_modules/merge2/index.js"(exports, module) {
	const Stream = __require("stream");
	const PassThrough$1 = Stream.PassThrough;
	const slice = Array.prototype.slice;
	module.exports = merge2$1;
	function merge2$1() {
		const streamsQueue = [];
		const args = slice.call(arguments);
		let merging = false;
		let options = args[args.length - 1];
		if (options && !Array.isArray(options) && options.pipe == null) args.pop();
		else options = {};
		const doEnd = options.end !== false;
		const doPipeError = options.pipeError === true;
		if (options.objectMode == null) options.objectMode = true;
		if (options.highWaterMark == null) options.highWaterMark = 64 * 1024;
		const mergedStream = PassThrough$1(options);
		function addStream() {
			for (let i$1 = 0, len = arguments.length; i$1 < len; i$1++) streamsQueue.push(pauseStreams(arguments[i$1], options));
			mergeStream();
			return this;
		}
		function mergeStream() {
			if (merging) return;
			merging = true;
			let streams = streamsQueue.shift();
			if (!streams) {
				process.nextTick(endStream$2);
				return;
			}
			if (!Array.isArray(streams)) streams = [streams];
			let pipesCount = streams.length + 1;
			function next() {
				if (--pipesCount > 0) return;
				merging = false;
				mergeStream();
			}
			function pipe(stream$1) {
				function onend() {
					stream$1.removeListener("merge2UnpipeEnd", onend);
					stream$1.removeListener("end", onend);
					if (doPipeError) stream$1.removeListener("error", onerror);
					next();
				}
				function onerror(err) {
					mergedStream.emit("error", err);
				}
				if (stream$1._readableState.endEmitted) return next();
				stream$1.on("merge2UnpipeEnd", onend);
				stream$1.on("end", onend);
				if (doPipeError) stream$1.on("error", onerror);
				stream$1.pipe(mergedStream, { end: false });
				stream$1.resume();
			}
			for (let i$1 = 0; i$1 < streams.length; i$1++) pipe(streams[i$1]);
			next();
		}
		function endStream$2() {
			merging = false;
			mergedStream.emit("queueDrain");
			if (doEnd) mergedStream.end();
		}
		mergedStream.setMaxListeners(0);
		mergedStream.add = addStream;
		mergedStream.on("unpipe", function(stream$1) {
			stream$1.emit("merge2UnpipeEnd");
		});
		if (args.length) addStream.apply(null, args);
		return mergedStream;
	}
	function pauseStreams(streams, options) {
		if (!Array.isArray(streams)) {
			if (!streams._readableState && streams.pipe) streams = streams.pipe(PassThrough$1(options));
			if (!streams._readableState || !streams.pause || !streams.pipe) throw new Error("Only readable stream can be merged.");
			streams.pause();
		} else for (let i$1 = 0, len = streams.length; i$1 < len; i$1++) streams[i$1] = pauseStreams(streams[i$1], options);
		return streams;
	}
} });

//#endregion
//#region ../node_modules/fast-glob/out/utils/stream.js
var require_stream$3 = __commonJS$1({ "../node_modules/fast-glob/out/utils/stream.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.merge = void 0;
	const merge2 = require_merge2();
	function merge(streams) {
		const mergedStream = merge2(streams);
		streams.forEach((stream$1) => {
			stream$1.once("error", (error) => mergedStream.emit("error", error));
		});
		mergedStream.once("close", () => propagateCloseEventToSources(streams));
		mergedStream.once("end", () => propagateCloseEventToSources(streams));
		return mergedStream;
	}
	exports.merge = merge;
	function propagateCloseEventToSources(streams) {
		streams.forEach((stream$1) => stream$1.emit("close"));
	}
} });

//#endregion
//#region ../node_modules/fast-glob/out/utils/string.js
var require_string = __commonJS$1({ "../node_modules/fast-glob/out/utils/string.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isEmpty = exports.isString = void 0;
	function isString$1(input) {
		return typeof input === "string";
	}
	exports.isString = isString$1;
	function isEmpty(input) {
		return input === "";
	}
	exports.isEmpty = isEmpty;
} });

//#endregion
//#region ../node_modules/fast-glob/out/utils/index.js
var require_utils$1 = __commonJS$1({ "../node_modules/fast-glob/out/utils/index.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.string = exports.stream = exports.pattern = exports.path = exports.fs = exports.errno = exports.array = void 0;
	const array = require_array();
	exports.array = array;
	const errno = require_errno();
	exports.errno = errno;
	const fs$9 = require_fs$3();
	exports.fs = fs$9;
	const path$6 = require_path();
	exports.path = path$6;
	const pattern = require_pattern();
	exports.pattern = pattern;
	const stream = require_stream$3();
	exports.stream = stream;
	const string = require_string();
	exports.string = string;
} });

//#endregion
//#region ../node_modules/fast-glob/out/managers/tasks.js
var require_tasks = __commonJS$1({ "../node_modules/fast-glob/out/managers/tasks.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.convertPatternGroupToTask = exports.convertPatternGroupsToTasks = exports.groupPatternsByBaseDirectory = exports.getNegativePatternsAsPositive = exports.getPositivePatterns = exports.convertPatternsToTasks = exports.generate = void 0;
	const utils$9 = require_utils$1();
	function generate(input, settings) {
		const patterns = processPatterns(input, settings);
		const ignore = processPatterns(settings.ignore, settings);
		const positivePatterns = getPositivePatterns(patterns);
		const negativePatterns = getNegativePatternsAsPositive(patterns, ignore);
		const staticPatterns = positivePatterns.filter((pattern$1) => utils$9.pattern.isStaticPattern(pattern$1, settings));
		const dynamicPatterns = positivePatterns.filter((pattern$1) => utils$9.pattern.isDynamicPattern(pattern$1, settings));
		const staticTasks = convertPatternsToTasks(staticPatterns, negativePatterns, false);
		const dynamicTasks = convertPatternsToTasks(dynamicPatterns, negativePatterns, true);
		return staticTasks.concat(dynamicTasks);
	}
	exports.generate = generate;
	function processPatterns(input, settings) {
		let patterns = input;
		/**
		* The original pattern like `{,*,**,a/*}` can lead to problems checking the depth when matching entry
		* and some problems with the micromatch package (see fast-glob issues: #365, #394).
		*
		* To solve this problem, we expand all patterns containing brace expansion. This can lead to a slight slowdown
		* in matching in the case of a large set of patterns after expansion.
		*/
		if (settings.braceExpansion) patterns = utils$9.pattern.expandPatternsWithBraceExpansion(patterns);
		/**
		* If the `baseNameMatch` option is enabled, we must add globstar to patterns, so that they can be used
		* at any nesting level.
		*
		* We do this here, because otherwise we have to complicate the filtering logic. For example, we need to change
		* the pattern in the filter before creating a regular expression. There is no need to change the patterns
		* in the application. Only on the input.
		*/
		if (settings.baseNameMatch) patterns = patterns.map((pattern$1) => pattern$1.includes("/") ? pattern$1 : `**/${pattern$1}`);
		/**
		* This method also removes duplicate slashes that may have been in the pattern or formed as a result of expansion.
		*/
		return patterns.map((pattern$1) => utils$9.pattern.removeDuplicateSlashes(pattern$1));
	}
	/**
	* Returns tasks grouped by basic pattern directories.
	*
	* Patterns that can be found inside (`./`) and outside (`../`) the current directory are handled separately.
	* This is necessary because directory traversal starts at the base directory and goes deeper.
	*/
	function convertPatternsToTasks(positive, negative, dynamic) {
		const tasks = [];
		const patternsOutsideCurrentDirectory = utils$9.pattern.getPatternsOutsideCurrentDirectory(positive);
		const patternsInsideCurrentDirectory = utils$9.pattern.getPatternsInsideCurrentDirectory(positive);
		const outsideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsOutsideCurrentDirectory);
		const insideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsInsideCurrentDirectory);
		tasks.push(...convertPatternGroupsToTasks(outsideCurrentDirectoryGroup, negative, dynamic));
		if ("." in insideCurrentDirectoryGroup) tasks.push(convertPatternGroupToTask(".", patternsInsideCurrentDirectory, negative, dynamic));
		else tasks.push(...convertPatternGroupsToTasks(insideCurrentDirectoryGroup, negative, dynamic));
		return tasks;
	}
	exports.convertPatternsToTasks = convertPatternsToTasks;
	function getPositivePatterns(patterns) {
		return utils$9.pattern.getPositivePatterns(patterns);
	}
	exports.getPositivePatterns = getPositivePatterns;
	function getNegativePatternsAsPositive(patterns, ignore) {
		const negative = utils$9.pattern.getNegativePatterns(patterns).concat(ignore);
		const positive = negative.map(utils$9.pattern.convertToPositivePattern);
		return positive;
	}
	exports.getNegativePatternsAsPositive = getNegativePatternsAsPositive;
	function groupPatternsByBaseDirectory(patterns) {
		const group = {};
		return patterns.reduce((collection, pattern$1) => {
			const base = utils$9.pattern.getBaseDirectory(pattern$1);
			if (base in collection) collection[base].push(pattern$1);
			else collection[base] = [pattern$1];
			return collection;
		}, group);
	}
	exports.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory;
	function convertPatternGroupsToTasks(positive, negative, dynamic) {
		return Object.keys(positive).map((base) => {
			return convertPatternGroupToTask(base, positive[base], negative, dynamic);
		});
	}
	exports.convertPatternGroupsToTasks = convertPatternGroupsToTasks;
	function convertPatternGroupToTask(base, positive, negative, dynamic) {
		return {
			dynamic,
			positive,
			negative,
			base,
			patterns: [].concat(positive, negative.map(utils$9.pattern.convertToNegativePattern))
		};
	}
	exports.convertPatternGroupToTask = convertPatternGroupToTask;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.stat/out/providers/async.js
var require_async$5 = __commonJS$1({ "../node_modules/@nodelib/fs.stat/out/providers/async.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.read = void 0;
	function read$3(path$28, settings, callback) {
		settings.fs.lstat(path$28, (lstatError, lstat) => {
			if (lstatError !== null) {
				callFailureCallback$2(callback, lstatError);
				return;
			}
			if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
				callSuccessCallback$2(callback, lstat);
				return;
			}
			settings.fs.stat(path$28, (statError, stat$5) => {
				if (statError !== null) {
					if (settings.throwErrorOnBrokenSymbolicLink) {
						callFailureCallback$2(callback, statError);
						return;
					}
					callSuccessCallback$2(callback, lstat);
					return;
				}
				if (settings.markSymbolicLink) stat$5.isSymbolicLink = () => true;
				callSuccessCallback$2(callback, stat$5);
			});
		});
	}
	exports.read = read$3;
	function callFailureCallback$2(callback, error) {
		callback(error);
	}
	function callSuccessCallback$2(callback, result) {
		callback(null, result);
	}
} });

//#endregion
//#region ../node_modules/@nodelib/fs.stat/out/providers/sync.js
var require_sync$5 = __commonJS$1({ "../node_modules/@nodelib/fs.stat/out/providers/sync.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.read = void 0;
	function read$2(path$28, settings) {
		const lstat = settings.fs.lstatSync(path$28);
		if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) return lstat;
		try {
			const stat$5 = settings.fs.statSync(path$28);
			if (settings.markSymbolicLink) stat$5.isSymbolicLink = () => true;
			return stat$5;
		} catch (error) {
			if (!settings.throwErrorOnBrokenSymbolicLink) return lstat;
			throw error;
		}
	}
	exports.read = read$2;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.stat/out/adapters/fs.js
var require_fs$2 = __commonJS$1({ "../node_modules/@nodelib/fs.stat/out/adapters/fs.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
	const fs$8 = __require("fs");
	exports.FILE_SYSTEM_ADAPTER = {
		lstat: fs$8.lstat,
		stat: fs$8.stat,
		lstatSync: fs$8.lstatSync,
		statSync: fs$8.statSync
	};
	function createFileSystemAdapter$1(fsMethods) {
		if (fsMethods === void 0) return exports.FILE_SYSTEM_ADAPTER;
		return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
	}
	exports.createFileSystemAdapter = createFileSystemAdapter$1;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.stat/out/settings.js
var require_settings$3 = __commonJS$1({ "../node_modules/@nodelib/fs.stat/out/settings.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const fs$7 = require_fs$2();
	var Settings$3 = class {
		constructor(_options = {}) {
			this._options = _options;
			this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, true);
			this.fs = fs$7.createFileSystemAdapter(this._options.fs);
			this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, false);
			this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
		}
		_getValue(option, value) {
			return option !== null && option !== void 0 ? option : value;
		}
	};
	exports.default = Settings$3;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.stat/out/index.js
var require_out$3 = __commonJS$1({ "../node_modules/@nodelib/fs.stat/out/index.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.statSync = exports.stat = exports.Settings = void 0;
	const async$1 = require_async$5();
	const sync$1 = require_sync$5();
	const settings_1$3 = require_settings$3();
	exports.Settings = settings_1$3.default;
	function stat(path$28, optionsOrSettingsOrCallback, callback) {
		if (typeof optionsOrSettingsOrCallback === "function") {
			async$1.read(path$28, getSettings$2(), optionsOrSettingsOrCallback);
			return;
		}
		async$1.read(path$28, getSettings$2(optionsOrSettingsOrCallback), callback);
	}
	exports.stat = stat;
	function statSync$1(path$28, optionsOrSettings) {
		const settings = getSettings$2(optionsOrSettings);
		return sync$1.read(path$28, settings);
	}
	exports.statSync = statSync$1;
	function getSettings$2(settingsOrOptions = {}) {
		if (settingsOrOptions instanceof settings_1$3.default) return settingsOrOptions;
		return new settings_1$3.default(settingsOrOptions);
	}
} });

//#endregion
//#region ../node_modules/queue-microtask/index.js
var require_queue_microtask = __commonJS$1({ "../node_modules/queue-microtask/index.js"(exports, module) {
	/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
	let promise;
	module.exports = typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : global) : (cb) => (promise || (promise = Promise.resolve())).then(cb).catch((err) => setTimeout(() => {
		throw err;
	}, 0));
} });

//#endregion
//#region ../node_modules/run-parallel/index.js
var require_run_parallel = __commonJS$1({ "../node_modules/run-parallel/index.js"(exports, module) {
	/*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
	module.exports = runParallel;
	const queueMicrotask$1 = require_queue_microtask();
	function runParallel(tasks, cb) {
		let results, pending, keys;
		let isSync = true;
		if (Array.isArray(tasks)) {
			results = [];
			pending = tasks.length;
		} else {
			keys = Object.keys(tasks);
			results = {};
			pending = keys.length;
		}
		function done(err) {
			function end() {
				if (cb) cb(err, results);
				cb = null;
			}
			if (isSync) queueMicrotask$1(end);
			else end();
		}
		function each(i$1, err, result) {
			results[i$1] = result;
			if (--pending === 0 || err) done(err);
		}
		if (!pending) done(null);
		else if (keys) keys.forEach(function(key) {
			tasks[key](function(err, result) {
				each(key, err, result);
			});
		});
		else tasks.forEach(function(task, i$1) {
			task(function(err, result) {
				each(i$1, err, result);
			});
		});
		isSync = false;
	}
} });

//#endregion
//#region ../node_modules/@nodelib/fs.scandir/out/constants.js
var require_constants = __commonJS$1({ "../node_modules/@nodelib/fs.scandir/out/constants.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0;
	const NODE_PROCESS_VERSION_PARTS = process.versions.node.split(".");
	if (NODE_PROCESS_VERSION_PARTS[0] === void 0 || NODE_PROCESS_VERSION_PARTS[1] === void 0) throw new Error(`Unexpected behavior. The 'process.versions.node' variable has invalid value: ${process.versions.node}`);
	const MAJOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[0], 10);
	const MINOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[1], 10);
	const SUPPORTED_MAJOR_VERSION = 10;
	const SUPPORTED_MINOR_VERSION = 10;
	const IS_MATCHED_BY_MAJOR = MAJOR_VERSION > SUPPORTED_MAJOR_VERSION;
	const IS_MATCHED_BY_MAJOR_AND_MINOR = MAJOR_VERSION === SUPPORTED_MAJOR_VERSION && MINOR_VERSION >= SUPPORTED_MINOR_VERSION;
	/**
	* IS `true` for Node.js 10.10 and greater.
	*/
	exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES = IS_MATCHED_BY_MAJOR || IS_MATCHED_BY_MAJOR_AND_MINOR;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.scandir/out/utils/fs.js
var require_fs$1 = __commonJS$1({ "../node_modules/@nodelib/fs.scandir/out/utils/fs.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createDirentFromStats = void 0;
	var DirentFromStats = class {
		constructor(name, stats) {
			this.name = name;
			this.isBlockDevice = stats.isBlockDevice.bind(stats);
			this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
			this.isDirectory = stats.isDirectory.bind(stats);
			this.isFIFO = stats.isFIFO.bind(stats);
			this.isFile = stats.isFile.bind(stats);
			this.isSocket = stats.isSocket.bind(stats);
			this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
		}
	};
	function createDirentFromStats(name, stats) {
		return new DirentFromStats(name, stats);
	}
	exports.createDirentFromStats = createDirentFromStats;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.scandir/out/utils/index.js
var require_utils = __commonJS$1({ "../node_modules/@nodelib/fs.scandir/out/utils/index.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.fs = void 0;
	const fs$6 = require_fs$1();
	exports.fs = fs$6;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.scandir/out/providers/common.js
var require_common$1 = __commonJS$1({ "../node_modules/@nodelib/fs.scandir/out/providers/common.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.joinPathSegments = void 0;
	function joinPathSegments$1(a$1, b$2, separator) {
		/**
		* The correct handling of cases when the first segment is a root (`/`, `C:/`) or UNC path (`//?/C:/`).
		*/
		if (a$1.endsWith(separator)) return a$1 + b$2;
		return a$1 + separator + b$2;
	}
	exports.joinPathSegments = joinPathSegments$1;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.scandir/out/providers/async.js
var require_async$4 = __commonJS$1({ "../node_modules/@nodelib/fs.scandir/out/providers/async.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.readdir = exports.readdirWithFileTypes = exports.read = void 0;
	const fsStat$5 = require_out$3();
	const rpl = require_run_parallel();
	const constants_1$1 = require_constants();
	const utils$8 = require_utils();
	const common$4 = require_common$1();
	function read$1(directory, settings, callback) {
		if (!settings.stats && constants_1$1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
			readdirWithFileTypes$1(directory, settings, callback);
			return;
		}
		readdir$1(directory, settings, callback);
	}
	exports.read = read$1;
	function readdirWithFileTypes$1(directory, settings, callback) {
		settings.fs.readdir(directory, { withFileTypes: true }, (readdirError, dirents) => {
			if (readdirError !== null) {
				callFailureCallback$1(callback, readdirError);
				return;
			}
			const entries = dirents.map((dirent) => ({
				dirent,
				name: dirent.name,
				path: common$4.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
			}));
			if (!settings.followSymbolicLinks) {
				callSuccessCallback$1(callback, entries);
				return;
			}
			const tasks = entries.map((entry) => makeRplTaskEntry(entry, settings));
			rpl(tasks, (rplError, rplEntries) => {
				if (rplError !== null) {
					callFailureCallback$1(callback, rplError);
					return;
				}
				callSuccessCallback$1(callback, rplEntries);
			});
		});
	}
	exports.readdirWithFileTypes = readdirWithFileTypes$1;
	function makeRplTaskEntry(entry, settings) {
		return (done) => {
			if (!entry.dirent.isSymbolicLink()) {
				done(null, entry);
				return;
			}
			settings.fs.stat(entry.path, (statError, stats) => {
				if (statError !== null) {
					if (settings.throwErrorOnBrokenSymbolicLink) {
						done(statError);
						return;
					}
					done(null, entry);
					return;
				}
				entry.dirent = utils$8.fs.createDirentFromStats(entry.name, stats);
				done(null, entry);
			});
		};
	}
	function readdir$1(directory, settings, callback) {
		settings.fs.readdir(directory, (readdirError, names) => {
			if (readdirError !== null) {
				callFailureCallback$1(callback, readdirError);
				return;
			}
			const tasks = names.map((name) => {
				const path$28 = common$4.joinPathSegments(directory, name, settings.pathSegmentSeparator);
				return (done) => {
					fsStat$5.stat(path$28, settings.fsStatSettings, (error, stats) => {
						if (error !== null) {
							done(error);
							return;
						}
						const entry = {
							name,
							path: path$28,
							dirent: utils$8.fs.createDirentFromStats(name, stats)
						};
						if (settings.stats) entry.stats = stats;
						done(null, entry);
					});
				};
			});
			rpl(tasks, (rplError, entries) => {
				if (rplError !== null) {
					callFailureCallback$1(callback, rplError);
					return;
				}
				callSuccessCallback$1(callback, entries);
			});
		});
	}
	exports.readdir = readdir$1;
	function callFailureCallback$1(callback, error) {
		callback(error);
	}
	function callSuccessCallback$1(callback, result) {
		callback(null, result);
	}
} });

//#endregion
//#region ../node_modules/@nodelib/fs.scandir/out/providers/sync.js
var require_sync$4 = __commonJS$1({ "../node_modules/@nodelib/fs.scandir/out/providers/sync.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.readdir = exports.readdirWithFileTypes = exports.read = void 0;
	const fsStat$4 = require_out$3();
	const constants_1 = require_constants();
	const utils$7 = require_utils();
	const common$3 = require_common$1();
	function read(directory, settings) {
		if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) return readdirWithFileTypes(directory, settings);
		return readdir(directory, settings);
	}
	exports.read = read;
	function readdirWithFileTypes(directory, settings) {
		const dirents = settings.fs.readdirSync(directory, { withFileTypes: true });
		return dirents.map((dirent) => {
			const entry = {
				dirent,
				name: dirent.name,
				path: common$3.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
			};
			if (entry.dirent.isSymbolicLink() && settings.followSymbolicLinks) try {
				const stats = settings.fs.statSync(entry.path);
				entry.dirent = utils$7.fs.createDirentFromStats(entry.name, stats);
			} catch (error) {
				if (settings.throwErrorOnBrokenSymbolicLink) throw error;
			}
			return entry;
		});
	}
	exports.readdirWithFileTypes = readdirWithFileTypes;
	function readdir(directory, settings) {
		const names = settings.fs.readdirSync(directory);
		return names.map((name) => {
			const entryPath = common$3.joinPathSegments(directory, name, settings.pathSegmentSeparator);
			const stats = fsStat$4.statSync(entryPath, settings.fsStatSettings);
			const entry = {
				name,
				path: entryPath,
				dirent: utils$7.fs.createDirentFromStats(name, stats)
			};
			if (settings.stats) entry.stats = stats;
			return entry;
		});
	}
	exports.readdir = readdir;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.scandir/out/adapters/fs.js
var require_fs = __commonJS$1({ "../node_modules/@nodelib/fs.scandir/out/adapters/fs.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
	const fs$5 = __require("fs");
	exports.FILE_SYSTEM_ADAPTER = {
		lstat: fs$5.lstat,
		stat: fs$5.stat,
		lstatSync: fs$5.lstatSync,
		statSync: fs$5.statSync,
		readdir: fs$5.readdir,
		readdirSync: fs$5.readdirSync
	};
	function createFileSystemAdapter(fsMethods) {
		if (fsMethods === void 0) return exports.FILE_SYSTEM_ADAPTER;
		return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
	}
	exports.createFileSystemAdapter = createFileSystemAdapter;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.scandir/out/settings.js
var require_settings$2 = __commonJS$1({ "../node_modules/@nodelib/fs.scandir/out/settings.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const path$5 = __require("path");
	const fsStat$3 = require_out$3();
	const fs$4 = require_fs();
	var Settings$2 = class {
		constructor(_options = {}) {
			this._options = _options;
			this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, false);
			this.fs = fs$4.createFileSystemAdapter(this._options.fs);
			this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path$5.sep);
			this.stats = this._getValue(this._options.stats, false);
			this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
			this.fsStatSettings = new fsStat$3.Settings({
				followSymbolicLink: this.followSymbolicLinks,
				fs: this.fs,
				throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink
			});
		}
		_getValue(option, value) {
			return option !== null && option !== void 0 ? option : value;
		}
	};
	exports.default = Settings$2;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.scandir/out/index.js
var require_out$2 = __commonJS$1({ "../node_modules/@nodelib/fs.scandir/out/index.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Settings = exports.scandirSync = exports.scandir = void 0;
	const async = require_async$4();
	const sync = require_sync$4();
	const settings_1$2 = require_settings$2();
	exports.Settings = settings_1$2.default;
	function scandir(path$28, optionsOrSettingsOrCallback, callback) {
		if (typeof optionsOrSettingsOrCallback === "function") {
			async.read(path$28, getSettings$1(), optionsOrSettingsOrCallback);
			return;
		}
		async.read(path$28, getSettings$1(optionsOrSettingsOrCallback), callback);
	}
	exports.scandir = scandir;
	function scandirSync(path$28, optionsOrSettings) {
		const settings = getSettings$1(optionsOrSettings);
		return sync.read(path$28, settings);
	}
	exports.scandirSync = scandirSync;
	function getSettings$1(settingsOrOptions = {}) {
		if (settingsOrOptions instanceof settings_1$2.default) return settingsOrOptions;
		return new settings_1$2.default(settingsOrOptions);
	}
} });

//#endregion
//#region ../node_modules/reusify/reusify.js
var require_reusify = __commonJS$1({ "../node_modules/reusify/reusify.js"(exports, module) {
	function reusify$1(Constructor) {
		var head = new Constructor();
		var tail = head;
		function get() {
			var current = head;
			if (current.next) head = current.next;
			else {
				head = new Constructor();
				tail = head;
			}
			current.next = null;
			return current;
		}
		function release(obj) {
			tail.next = obj;
			tail = obj;
		}
		return {
			get,
			release
		};
	}
	module.exports = reusify$1;
} });

//#endregion
//#region ../node_modules/fastq/queue.js
var require_queue = __commonJS$1({ "../node_modules/fastq/queue.js"(exports, module) {
	var reusify = require_reusify();
	function fastqueue(context, worker, _concurrency) {
		if (typeof context === "function") {
			_concurrency = worker;
			worker = context;
			context = null;
		}
		if (!(_concurrency >= 1)) throw new Error("fastqueue concurrency must be equal to or greater than 1");
		var cache = reusify(Task);
		var queueHead = null;
		var queueTail = null;
		var _running = 0;
		var errorHandler = null;
		var self = {
			push,
			drain: noop,
			saturated: noop,
			pause,
			paused: false,
			get concurrency() {
				return _concurrency;
			},
			set concurrency(value) {
				if (!(value >= 1)) throw new Error("fastqueue concurrency must be equal to or greater than 1");
				_concurrency = value;
				if (self.paused) return;
				for (; queueHead && _running < _concurrency;) {
					_running++;
					release();
				}
			},
			running,
			resume,
			idle,
			length,
			getQueue,
			unshift,
			empty: noop,
			kill,
			killAndDrain,
			error
		};
		return self;
		function running() {
			return _running;
		}
		function pause() {
			self.paused = true;
		}
		function length() {
			var current = queueHead;
			var counter = 0;
			while (current) {
				current = current.next;
				counter++;
			}
			return counter;
		}
		function getQueue() {
			var current = queueHead;
			var tasks = [];
			while (current) {
				tasks.push(current.value);
				current = current.next;
			}
			return tasks;
		}
		function resume() {
			if (!self.paused) return;
			self.paused = false;
			if (queueHead === null) {
				_running++;
				release();
				return;
			}
			for (; queueHead && _running < _concurrency;) {
				_running++;
				release();
			}
		}
		function idle() {
			return _running === 0 && self.length() === 0;
		}
		function push(value, done) {
			var current = cache.get();
			current.context = context;
			current.release = release;
			current.value = value;
			current.callback = done || noop;
			current.errorHandler = errorHandler;
			if (_running >= _concurrency || self.paused) if (queueTail) {
				queueTail.next = current;
				queueTail = current;
			} else {
				queueHead = current;
				queueTail = current;
				self.saturated();
			}
			else {
				_running++;
				worker.call(context, current.value, current.worked);
			}
		}
		function unshift(value, done) {
			var current = cache.get();
			current.context = context;
			current.release = release;
			current.value = value;
			current.callback = done || noop;
			current.errorHandler = errorHandler;
			if (_running >= _concurrency || self.paused) if (queueHead) {
				current.next = queueHead;
				queueHead = current;
			} else {
				queueHead = current;
				queueTail = current;
				self.saturated();
			}
			else {
				_running++;
				worker.call(context, current.value, current.worked);
			}
		}
		function release(holder) {
			if (holder) cache.release(holder);
			var next = queueHead;
			if (next && _running <= _concurrency) if (!self.paused) {
				if (queueTail === queueHead) queueTail = null;
				queueHead = next.next;
				next.next = null;
				worker.call(context, next.value, next.worked);
				if (queueTail === null) self.empty();
			} else _running--;
			else if (--_running === 0) self.drain();
		}
		function kill() {
			queueHead = null;
			queueTail = null;
			self.drain = noop;
		}
		function killAndDrain() {
			queueHead = null;
			queueTail = null;
			self.drain();
			self.drain = noop;
		}
		function error(handler) {
			errorHandler = handler;
		}
	}
	function noop() {}
	function Task() {
		this.value = null;
		this.callback = noop;
		this.next = null;
		this.release = noop;
		this.context = null;
		this.errorHandler = null;
		var self = this;
		this.worked = function worked(err, result) {
			var callback = self.callback;
			var errorHandler = self.errorHandler;
			var val = self.value;
			self.value = null;
			self.callback = noop;
			if (self.errorHandler) errorHandler(err, val);
			callback.call(self.context, err, result);
			self.release(self);
		};
	}
	function queueAsPromised(context, worker, _concurrency) {
		if (typeof context === "function") {
			_concurrency = worker;
			worker = context;
			context = null;
		}
		function asyncWrapper(arg, cb) {
			worker.call(this, arg).then(function(res) {
				cb(null, res);
			}, cb);
		}
		var queue$1 = fastqueue(context, asyncWrapper, _concurrency);
		var pushCb = queue$1.push;
		var unshiftCb = queue$1.unshift;
		queue$1.push = push;
		queue$1.unshift = unshift;
		queue$1.drained = drained;
		return queue$1;
		function push(value) {
			var p$2 = new Promise(function(resolve$1, reject) {
				pushCb(value, function(err, result) {
					if (err) {
						reject(err);
						return;
					}
					resolve$1(result);
				});
			});
			p$2.catch(noop);
			return p$2;
		}
		function unshift(value) {
			var p$2 = new Promise(function(resolve$1, reject) {
				unshiftCb(value, function(err, result) {
					if (err) {
						reject(err);
						return;
					}
					resolve$1(result);
				});
			});
			p$2.catch(noop);
			return p$2;
		}
		function drained() {
			var p$2 = new Promise(function(resolve$1) {
				process.nextTick(function() {
					if (queue$1.idle()) resolve$1();
					else {
						var previousDrain = queue$1.drain;
						queue$1.drain = function() {
							if (typeof previousDrain === "function") previousDrain();
							resolve$1();
							queue$1.drain = previousDrain;
						};
					}
				});
			});
			return p$2;
		}
	}
	module.exports = fastqueue;
	module.exports.promise = queueAsPromised;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.walk/out/readers/common.js
var require_common = __commonJS$1({ "../node_modules/@nodelib/fs.walk/out/readers/common.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.joinPathSegments = exports.replacePathSegmentSeparator = exports.isAppliedFilter = exports.isFatalError = void 0;
	function isFatalError(settings, error) {
		if (settings.errorFilter === null) return true;
		return !settings.errorFilter(error);
	}
	exports.isFatalError = isFatalError;
	function isAppliedFilter(filter, value) {
		return filter === null || filter(value);
	}
	exports.isAppliedFilter = isAppliedFilter;
	function replacePathSegmentSeparator(filepath, separator) {
		return filepath.split(/[/\\]/).join(separator);
	}
	exports.replacePathSegmentSeparator = replacePathSegmentSeparator;
	function joinPathSegments(a$1, b$2, separator) {
		if (a$1 === "") return b$2;
		/**
		* The correct handling of cases when the first segment is a root (`/`, `C:/`) or UNC path (`//?/C:/`).
		*/
		if (a$1.endsWith(separator)) return a$1 + b$2;
		return a$1 + separator + b$2;
	}
	exports.joinPathSegments = joinPathSegments;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.walk/out/readers/reader.js
var require_reader$1 = __commonJS$1({ "../node_modules/@nodelib/fs.walk/out/readers/reader.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const common$2 = require_common();
	var Reader$1 = class {
		constructor(_root, _settings) {
			this._root = _root;
			this._settings = _settings;
			this._root = common$2.replacePathSegmentSeparator(_root, _settings.pathSegmentSeparator);
		}
	};
	exports.default = Reader$1;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.walk/out/readers/async.js
var require_async$3 = __commonJS$1({ "../node_modules/@nodelib/fs.walk/out/readers/async.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const events_1 = __require("events");
	const fsScandir$2 = require_out$2();
	const fastq = require_queue();
	const common$1 = require_common();
	const reader_1$4 = require_reader$1();
	var AsyncReader = class extends reader_1$4.default {
		constructor(_root, _settings) {
			super(_root, _settings);
			this._settings = _settings;
			this._scandir = fsScandir$2.scandir;
			this._emitter = new events_1.EventEmitter();
			this._queue = fastq(this._worker.bind(this), this._settings.concurrency);
			this._isFatalError = false;
			this._isDestroyed = false;
			this._queue.drain = () => {
				if (!this._isFatalError) this._emitter.emit("end");
			};
		}
		read() {
			this._isFatalError = false;
			this._isDestroyed = false;
			setImmediate(() => {
				this._pushToQueue(this._root, this._settings.basePath);
			});
			return this._emitter;
		}
		get isDestroyed() {
			return this._isDestroyed;
		}
		destroy() {
			if (this._isDestroyed) throw new Error("The reader is already destroyed");
			this._isDestroyed = true;
			this._queue.killAndDrain();
		}
		onEntry(callback) {
			this._emitter.on("entry", callback);
		}
		onError(callback) {
			this._emitter.once("error", callback);
		}
		onEnd(callback) {
			this._emitter.once("end", callback);
		}
		_pushToQueue(directory, base) {
			const queueItem = {
				directory,
				base
			};
			this._queue.push(queueItem, (error) => {
				if (error !== null) this._handleError(error);
			});
		}
		_worker(item, done) {
			this._scandir(item.directory, this._settings.fsScandirSettings, (error, entries) => {
				if (error !== null) {
					done(error, void 0);
					return;
				}
				for (const entry of entries) this._handleEntry(entry, item.base);
				done(null, void 0);
			});
		}
		_handleError(error) {
			if (this._isDestroyed || !common$1.isFatalError(this._settings, error)) return;
			this._isFatalError = true;
			this._isDestroyed = true;
			this._emitter.emit("error", error);
		}
		_handleEntry(entry, base) {
			if (this._isDestroyed || this._isFatalError) return;
			const fullpath = entry.path;
			if (base !== void 0) entry.path = common$1.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
			if (common$1.isAppliedFilter(this._settings.entryFilter, entry)) this._emitEntry(entry);
			if (entry.dirent.isDirectory() && common$1.isAppliedFilter(this._settings.deepFilter, entry)) this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path);
		}
		_emitEntry(entry) {
			this._emitter.emit("entry", entry);
		}
	};
	exports.default = AsyncReader;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.walk/out/providers/async.js
var require_async$2 = __commonJS$1({ "../node_modules/@nodelib/fs.walk/out/providers/async.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const async_1$4 = require_async$3();
	var AsyncProvider = class {
		constructor(_root, _settings) {
			this._root = _root;
			this._settings = _settings;
			this._reader = new async_1$4.default(this._root, this._settings);
			this._storage = [];
		}
		read(callback) {
			this._reader.onError((error) => {
				callFailureCallback(callback, error);
			});
			this._reader.onEntry((entry) => {
				this._storage.push(entry);
			});
			this._reader.onEnd(() => {
				callSuccessCallback(callback, this._storage);
			});
			this._reader.read();
		}
	};
	exports.default = AsyncProvider;
	function callFailureCallback(callback, error) {
		callback(error);
	}
	function callSuccessCallback(callback, entries) {
		callback(null, entries);
	}
} });

//#endregion
//#region ../node_modules/@nodelib/fs.walk/out/providers/stream.js
var require_stream$2 = __commonJS$1({ "../node_modules/@nodelib/fs.walk/out/providers/stream.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const stream_1$5 = __require("stream");
	const async_1$3 = require_async$3();
	var StreamProvider = class {
		constructor(_root, _settings) {
			this._root = _root;
			this._settings = _settings;
			this._reader = new async_1$3.default(this._root, this._settings);
			this._stream = new stream_1$5.Readable({
				objectMode: true,
				read: () => {},
				destroy: () => {
					if (!this._reader.isDestroyed) this._reader.destroy();
				}
			});
		}
		read() {
			this._reader.onError((error) => {
				this._stream.emit("error", error);
			});
			this._reader.onEntry((entry) => {
				this._stream.push(entry);
			});
			this._reader.onEnd(() => {
				this._stream.push(null);
			});
			this._reader.read();
			return this._stream;
		}
	};
	exports.default = StreamProvider;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.walk/out/readers/sync.js
var require_sync$3 = __commonJS$1({ "../node_modules/@nodelib/fs.walk/out/readers/sync.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const fsScandir$1 = require_out$2();
	const common = require_common();
	const reader_1$3 = require_reader$1();
	var SyncReader = class extends reader_1$3.default {
		constructor() {
			super(...arguments);
			this._scandir = fsScandir$1.scandirSync;
			this._storage = [];
			this._queue = new Set();
		}
		read() {
			this._pushToQueue(this._root, this._settings.basePath);
			this._handleQueue();
			return this._storage;
		}
		_pushToQueue(directory, base) {
			this._queue.add({
				directory,
				base
			});
		}
		_handleQueue() {
			for (const item of this._queue.values()) this._handleDirectory(item.directory, item.base);
		}
		_handleDirectory(directory, base) {
			try {
				const entries = this._scandir(directory, this._settings.fsScandirSettings);
				for (const entry of entries) this._handleEntry(entry, base);
			} catch (error) {
				this._handleError(error);
			}
		}
		_handleError(error) {
			if (!common.isFatalError(this._settings, error)) return;
			throw error;
		}
		_handleEntry(entry, base) {
			const fullpath = entry.path;
			if (base !== void 0) entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
			if (common.isAppliedFilter(this._settings.entryFilter, entry)) this._pushToStorage(entry);
			if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path);
		}
		_pushToStorage(entry) {
			this._storage.push(entry);
		}
	};
	exports.default = SyncReader;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.walk/out/providers/sync.js
var require_sync$2 = __commonJS$1({ "../node_modules/@nodelib/fs.walk/out/providers/sync.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const sync_1$3 = require_sync$3();
	var SyncProvider = class {
		constructor(_root, _settings) {
			this._root = _root;
			this._settings = _settings;
			this._reader = new sync_1$3.default(this._root, this._settings);
		}
		read() {
			return this._reader.read();
		}
	};
	exports.default = SyncProvider;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.walk/out/settings.js
var require_settings$1 = __commonJS$1({ "../node_modules/@nodelib/fs.walk/out/settings.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const path$4 = __require("path");
	const fsScandir = require_out$2();
	var Settings$1 = class {
		constructor(_options = {}) {
			this._options = _options;
			this.basePath = this._getValue(this._options.basePath, void 0);
			this.concurrency = this._getValue(this._options.concurrency, Number.POSITIVE_INFINITY);
			this.deepFilter = this._getValue(this._options.deepFilter, null);
			this.entryFilter = this._getValue(this._options.entryFilter, null);
			this.errorFilter = this._getValue(this._options.errorFilter, null);
			this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path$4.sep);
			this.fsScandirSettings = new fsScandir.Settings({
				followSymbolicLinks: this._options.followSymbolicLinks,
				fs: this._options.fs,
				pathSegmentSeparator: this._options.pathSegmentSeparator,
				stats: this._options.stats,
				throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink
			});
		}
		_getValue(option, value) {
			return option !== null && option !== void 0 ? option : value;
		}
	};
	exports.default = Settings$1;
} });

//#endregion
//#region ../node_modules/@nodelib/fs.walk/out/index.js
var require_out$1 = __commonJS$1({ "../node_modules/@nodelib/fs.walk/out/index.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Settings = exports.walkStream = exports.walkSync = exports.walk = void 0;
	const async_1$2 = require_async$2();
	const stream_1$4 = require_stream$2();
	const sync_1$2 = require_sync$2();
	const settings_1$1 = require_settings$1();
	exports.Settings = settings_1$1.default;
	function walk(directory, optionsOrSettingsOrCallback, callback) {
		if (typeof optionsOrSettingsOrCallback === "function") {
			new async_1$2.default(directory, getSettings()).read(optionsOrSettingsOrCallback);
			return;
		}
		new async_1$2.default(directory, getSettings(optionsOrSettingsOrCallback)).read(callback);
	}
	exports.walk = walk;
	function walkSync(directory, optionsOrSettings) {
		const settings = getSettings(optionsOrSettings);
		const provider = new sync_1$2.default(directory, settings);
		return provider.read();
	}
	exports.walkSync = walkSync;
	function walkStream(directory, optionsOrSettings) {
		const settings = getSettings(optionsOrSettings);
		const provider = new stream_1$4.default(directory, settings);
		return provider.read();
	}
	exports.walkStream = walkStream;
	function getSettings(settingsOrOptions = {}) {
		if (settingsOrOptions instanceof settings_1$1.default) return settingsOrOptions;
		return new settings_1$1.default(settingsOrOptions);
	}
} });

//#endregion
//#region ../node_modules/fast-glob/out/readers/reader.js
var require_reader = __commonJS$1({ "../node_modules/fast-glob/out/readers/reader.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const path$3 = __require("path");
	const fsStat$2 = require_out$3();
	const utils$6 = require_utils$1();
	var Reader = class {
		constructor(_settings) {
			this._settings = _settings;
			this._fsStatSettings = new fsStat$2.Settings({
				followSymbolicLink: this._settings.followSymbolicLinks,
				fs: this._settings.fs,
				throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks
			});
		}
		_getFullEntryPath(filepath) {
			return path$3.resolve(this._settings.cwd, filepath);
		}
		_makeEntry(stats, pattern$1) {
			const entry = {
				name: pattern$1,
				path: pattern$1,
				dirent: utils$6.fs.createDirentFromStats(pattern$1, stats)
			};
			if (this._settings.stats) entry.stats = stats;
			return entry;
		}
		_isFatalError(error) {
			return !utils$6.errno.isEnoentCodeError(error) && !this._settings.suppressErrors;
		}
	};
	exports.default = Reader;
} });

//#endregion
//#region ../node_modules/fast-glob/out/readers/stream.js
var require_stream$1 = __commonJS$1({ "../node_modules/fast-glob/out/readers/stream.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const stream_1$3 = __require("stream");
	const fsStat$1 = require_out$3();
	const fsWalk$2 = require_out$1();
	const reader_1$2 = require_reader();
	var ReaderStream = class extends reader_1$2.default {
		constructor() {
			super(...arguments);
			this._walkStream = fsWalk$2.walkStream;
			this._stat = fsStat$1.stat;
		}
		dynamic(root, options) {
			return this._walkStream(root, options);
		}
		static(patterns, options) {
			const filepaths = patterns.map(this._getFullEntryPath, this);
			const stream$1 = new stream_1$3.PassThrough({ objectMode: true });
			stream$1._write = (index, _enc, done) => {
				return this._getEntry(filepaths[index], patterns[index], options).then((entry) => {
					if (entry !== null && options.entryFilter(entry)) stream$1.push(entry);
					if (index === filepaths.length - 1) stream$1.end();
					done();
				}).catch(done);
			};
			for (let i$1 = 0; i$1 < filepaths.length; i$1++) stream$1.write(i$1);
			return stream$1;
		}
		_getEntry(filepath, pattern$1, options) {
			return this._getStat(filepath).then((stats) => this._makeEntry(stats, pattern$1)).catch((error) => {
				if (options.errorFilter(error)) return null;
				throw error;
			});
		}
		_getStat(filepath) {
			return new Promise((resolve$1, reject) => {
				this._stat(filepath, this._fsStatSettings, (error, stats) => {
					return error === null ? resolve$1(stats) : reject(error);
				});
			});
		}
	};
	exports.default = ReaderStream;
} });

//#endregion
//#region ../node_modules/fast-glob/out/readers/async.js
var require_async$1 = __commonJS$1({ "../node_modules/fast-glob/out/readers/async.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const fsWalk$1 = require_out$1();
	const reader_1$1 = require_reader();
	const stream_1$2 = require_stream$1();
	var ReaderAsync = class extends reader_1$1.default {
		constructor() {
			super(...arguments);
			this._walkAsync = fsWalk$1.walk;
			this._readerStream = new stream_1$2.default(this._settings);
		}
		dynamic(root, options) {
			return new Promise((resolve$1, reject) => {
				this._walkAsync(root, options, (error, entries) => {
					if (error === null) resolve$1(entries);
					else reject(error);
				});
			});
		}
		async static(patterns, options) {
			const entries = [];
			const stream$1 = this._readerStream.static(patterns, options);
			return new Promise((resolve$1, reject) => {
				stream$1.once("error", reject);
				stream$1.on("data", (entry) => entries.push(entry));
				stream$1.once("end", () => resolve$1(entries));
			});
		}
	};
	exports.default = ReaderAsync;
} });

//#endregion
//#region ../node_modules/fast-glob/out/providers/matchers/matcher.js
var require_matcher = __commonJS$1({ "../node_modules/fast-glob/out/providers/matchers/matcher.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const utils$5 = require_utils$1();
	var Matcher = class {
		constructor(_patterns, _settings, _micromatchOptions) {
			this._patterns = _patterns;
			this._settings = _settings;
			this._micromatchOptions = _micromatchOptions;
			this._storage = [];
			this._fillStorage();
		}
		_fillStorage() {
			for (const pattern$1 of this._patterns) {
				const segments = this._getPatternSegments(pattern$1);
				const sections = this._splitSegmentsIntoSections(segments);
				this._storage.push({
					complete: sections.length <= 1,
					pattern: pattern$1,
					segments,
					sections
				});
			}
		}
		_getPatternSegments(pattern$1) {
			const parts = utils$5.pattern.getPatternParts(pattern$1, this._micromatchOptions);
			return parts.map((part) => {
				const dynamic = utils$5.pattern.isDynamicPattern(part, this._settings);
				if (!dynamic) return {
					dynamic: false,
					pattern: part
				};
				return {
					dynamic: true,
					pattern: part,
					patternRe: utils$5.pattern.makeRe(part, this._micromatchOptions)
				};
			});
		}
		_splitSegmentsIntoSections(segments) {
			return utils$5.array.splitWhen(segments, (segment) => segment.dynamic && utils$5.pattern.hasGlobStar(segment.pattern));
		}
	};
	exports.default = Matcher;
} });

//#endregion
//#region ../node_modules/fast-glob/out/providers/matchers/partial.js
var require_partial = __commonJS$1({ "../node_modules/fast-glob/out/providers/matchers/partial.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const matcher_1 = require_matcher();
	var PartialMatcher = class extends matcher_1.default {
		match(filepath) {
			const parts = filepath.split("/");
			const levels = parts.length;
			const patterns = this._storage.filter((info) => !info.complete || info.segments.length > levels);
			for (const pattern$1 of patterns) {
				const section = pattern$1.sections[0];
				/**
				* In this case, the pattern has a globstar and we must read all directories unconditionally,
				* but only if the level has reached the end of the first group.
				*
				* fixtures/{a,b}/**
				*  ^ true/false  ^ always true
				*/
				if (!pattern$1.complete && levels > section.length) return true;
				const match = parts.every((part, index) => {
					const segment = pattern$1.segments[index];
					if (segment.dynamic && segment.patternRe.test(part)) return true;
					if (!segment.dynamic && segment.pattern === part) return true;
					return false;
				});
				if (match) return true;
			}
			return false;
		}
	};
	exports.default = PartialMatcher;
} });

//#endregion
//#region ../node_modules/fast-glob/out/providers/filters/deep.js
var require_deep = __commonJS$1({ "../node_modules/fast-glob/out/providers/filters/deep.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const utils$4 = require_utils$1();
	const partial_1 = require_partial();
	var DeepFilter = class {
		constructor(_settings, _micromatchOptions) {
			this._settings = _settings;
			this._micromatchOptions = _micromatchOptions;
		}
		getFilter(basePath, positive, negative) {
			const matcher = this._getMatcher(positive);
			const negativeRe = this._getNegativePatternsRe(negative);
			return (entry) => this._filter(basePath, entry, matcher, negativeRe);
		}
		_getMatcher(patterns) {
			return new partial_1.default(patterns, this._settings, this._micromatchOptions);
		}
		_getNegativePatternsRe(patterns) {
			const affectDepthOfReadingPatterns = patterns.filter(utils$4.pattern.isAffectDepthOfReadingPattern);
			return utils$4.pattern.convertPatternsToRe(affectDepthOfReadingPatterns, this._micromatchOptions);
		}
		_filter(basePath, entry, matcher, negativeRe) {
			if (this._isSkippedByDeep(basePath, entry.path)) return false;
			if (this._isSkippedSymbolicLink(entry)) return false;
			const filepath = utils$4.path.removeLeadingDotSegment(entry.path);
			if (this._isSkippedByPositivePatterns(filepath, matcher)) return false;
			return this._isSkippedByNegativePatterns(filepath, negativeRe);
		}
		_isSkippedByDeep(basePath, entryPath) {
			/**
			* Avoid unnecessary depth calculations when it doesn't matter.
			*/
			if (this._settings.deep === Infinity) return false;
			return this._getEntryLevel(basePath, entryPath) >= this._settings.deep;
		}
		_getEntryLevel(basePath, entryPath) {
			const entryPathDepth = entryPath.split("/").length;
			if (basePath === "") return entryPathDepth;
			const basePathDepth = basePath.split("/").length;
			return entryPathDepth - basePathDepth;
		}
		_isSkippedSymbolicLink(entry) {
			return !this._settings.followSymbolicLinks && entry.dirent.isSymbolicLink();
		}
		_isSkippedByPositivePatterns(entryPath, matcher) {
			return !this._settings.baseNameMatch && !matcher.match(entryPath);
		}
		_isSkippedByNegativePatterns(entryPath, patternsRe) {
			return !utils$4.pattern.matchAny(entryPath, patternsRe);
		}
	};
	exports.default = DeepFilter;
} });

//#endregion
//#region ../node_modules/fast-glob/out/providers/filters/entry.js
var require_entry$1 = __commonJS$1({ "../node_modules/fast-glob/out/providers/filters/entry.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const utils$3 = require_utils$1();
	var EntryFilter = class {
		constructor(_settings, _micromatchOptions) {
			this._settings = _settings;
			this._micromatchOptions = _micromatchOptions;
			this.index = new Map();
		}
		getFilter(positive, negative) {
			const [absoluteNegative, relativeNegative] = utils$3.pattern.partitionAbsoluteAndRelative(negative);
			const patterns = {
				positive: { all: utils$3.pattern.convertPatternsToRe(positive, this._micromatchOptions) },
				negative: {
					absolute: utils$3.pattern.convertPatternsToRe(absoluteNegative, Object.assign(Object.assign({}, this._micromatchOptions), { dot: true })),
					relative: utils$3.pattern.convertPatternsToRe(relativeNegative, Object.assign(Object.assign({}, this._micromatchOptions), { dot: true }))
				}
			};
			return (entry) => this._filter(entry, patterns);
		}
		_filter(entry, patterns) {
			const filepath = utils$3.path.removeLeadingDotSegment(entry.path);
			if (this._settings.unique && this._isDuplicateEntry(filepath)) return false;
			if (this._onlyFileFilter(entry) || this._onlyDirectoryFilter(entry)) return false;
			const isMatched = this._isMatchToPatternsSet(filepath, patterns, entry.dirent.isDirectory());
			if (this._settings.unique && isMatched) this._createIndexRecord(filepath);
			return isMatched;
		}
		_isDuplicateEntry(filepath) {
			return this.index.has(filepath);
		}
		_createIndexRecord(filepath) {
			this.index.set(filepath, void 0);
		}
		_onlyFileFilter(entry) {
			return this._settings.onlyFiles && !entry.dirent.isFile();
		}
		_onlyDirectoryFilter(entry) {
			return this._settings.onlyDirectories && !entry.dirent.isDirectory();
		}
		_isMatchToPatternsSet(filepath, patterns, isDirectory$1) {
			const isMatched = this._isMatchToPatterns(filepath, patterns.positive.all, isDirectory$1);
			if (!isMatched) return false;
			const isMatchedByRelativeNegative = this._isMatchToPatterns(filepath, patterns.negative.relative, isDirectory$1);
			if (isMatchedByRelativeNegative) return false;
			const isMatchedByAbsoluteNegative = this._isMatchToAbsoluteNegative(filepath, patterns.negative.absolute, isDirectory$1);
			if (isMatchedByAbsoluteNegative) return false;
			return true;
		}
		_isMatchToAbsoluteNegative(filepath, patternsRe, isDirectory$1) {
			if (patternsRe.length === 0) return false;
			const fullpath = utils$3.path.makeAbsolute(this._settings.cwd, filepath);
			return this._isMatchToPatterns(fullpath, patternsRe, isDirectory$1);
		}
		_isMatchToPatterns(filepath, patternsRe, isDirectory$1) {
			if (patternsRe.length === 0) return false;
			const isMatched = utils$3.pattern.matchAny(filepath, patternsRe);
			if (!isMatched && isDirectory$1) return utils$3.pattern.matchAny(filepath + "/", patternsRe);
			return isMatched;
		}
	};
	exports.default = EntryFilter;
} });

//#endregion
//#region ../node_modules/fast-glob/out/providers/filters/error.js
var require_error = __commonJS$1({ "../node_modules/fast-glob/out/providers/filters/error.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const utils$2 = require_utils$1();
	var ErrorFilter = class {
		constructor(_settings) {
			this._settings = _settings;
		}
		getFilter() {
			return (error) => this._isNonFatalError(error);
		}
		_isNonFatalError(error) {
			return utils$2.errno.isEnoentCodeError(error) || this._settings.suppressErrors;
		}
	};
	exports.default = ErrorFilter;
} });

//#endregion
//#region ../node_modules/fast-glob/out/providers/transformers/entry.js
var require_entry = __commonJS$1({ "../node_modules/fast-glob/out/providers/transformers/entry.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const utils$1 = require_utils$1();
	var EntryTransformer = class {
		constructor(_settings) {
			this._settings = _settings;
		}
		getTransformer() {
			return (entry) => this._transform(entry);
		}
		_transform(entry) {
			let filepath = entry.path;
			if (this._settings.absolute) {
				filepath = utils$1.path.makeAbsolute(this._settings.cwd, filepath);
				filepath = utils$1.path.unixify(filepath);
			}
			if (this._settings.markDirectories && entry.dirent.isDirectory()) filepath += "/";
			if (!this._settings.objectMode) return filepath;
			return Object.assign(Object.assign({}, entry), { path: filepath });
		}
	};
	exports.default = EntryTransformer;
} });

//#endregion
//#region ../node_modules/fast-glob/out/providers/provider.js
var require_provider = __commonJS$1({ "../node_modules/fast-glob/out/providers/provider.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const path$2 = __require("path");
	const deep_1 = require_deep();
	const entry_1 = require_entry$1();
	const error_1 = require_error();
	const entry_2 = require_entry();
	var Provider = class {
		constructor(_settings) {
			this._settings = _settings;
			this.errorFilter = new error_1.default(this._settings);
			this.entryFilter = new entry_1.default(this._settings, this._getMicromatchOptions());
			this.deepFilter = new deep_1.default(this._settings, this._getMicromatchOptions());
			this.entryTransformer = new entry_2.default(this._settings);
		}
		_getRootDirectory(task) {
			return path$2.resolve(this._settings.cwd, task.base);
		}
		_getReaderOptions(task) {
			const basePath = task.base === "." ? "" : task.base;
			return {
				basePath,
				pathSegmentSeparator: "/",
				concurrency: this._settings.concurrency,
				deepFilter: this.deepFilter.getFilter(basePath, task.positive, task.negative),
				entryFilter: this.entryFilter.getFilter(task.positive, task.negative),
				errorFilter: this.errorFilter.getFilter(),
				followSymbolicLinks: this._settings.followSymbolicLinks,
				fs: this._settings.fs,
				stats: this._settings.stats,
				throwErrorOnBrokenSymbolicLink: this._settings.throwErrorOnBrokenSymbolicLink,
				transform: this.entryTransformer.getTransformer()
			};
		}
		_getMicromatchOptions() {
			return {
				dot: this._settings.dot,
				matchBase: this._settings.baseNameMatch,
				nobrace: !this._settings.braceExpansion,
				nocase: !this._settings.caseSensitiveMatch,
				noext: !this._settings.extglob,
				noglobstar: !this._settings.globstar,
				posix: true,
				strictSlashes: false
			};
		}
	};
	exports.default = Provider;
} });

//#endregion
//#region ../node_modules/fast-glob/out/providers/async.js
var require_async = __commonJS$1({ "../node_modules/fast-glob/out/providers/async.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const async_1$1 = require_async$1();
	const provider_1$2 = require_provider();
	var ProviderAsync = class extends provider_1$2.default {
		constructor() {
			super(...arguments);
			this._reader = new async_1$1.default(this._settings);
		}
		async read(task) {
			const root = this._getRootDirectory(task);
			const options = this._getReaderOptions(task);
			const entries = await this.api(root, task, options);
			return entries.map((entry) => options.transform(entry));
		}
		api(root, task, options) {
			if (task.dynamic) return this._reader.dynamic(root, options);
			return this._reader.static(task.patterns, options);
		}
	};
	exports.default = ProviderAsync;
} });

//#endregion
//#region ../node_modules/fast-glob/out/providers/stream.js
var require_stream = __commonJS$1({ "../node_modules/fast-glob/out/providers/stream.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const stream_1$1 = __require("stream");
	const stream_2 = require_stream$1();
	const provider_1$1 = require_provider();
	var ProviderStream = class extends provider_1$1.default {
		constructor() {
			super(...arguments);
			this._reader = new stream_2.default(this._settings);
		}
		read(task) {
			const root = this._getRootDirectory(task);
			const options = this._getReaderOptions(task);
			const source = this.api(root, task, options);
			const destination = new stream_1$1.Readable({
				objectMode: true,
				read: () => {}
			});
			source.once("error", (error) => destination.emit("error", error)).on("data", (entry) => destination.emit("data", options.transform(entry))).once("end", () => destination.emit("end"));
			destination.once("close", () => source.destroy());
			return destination;
		}
		api(root, task, options) {
			if (task.dynamic) return this._reader.dynamic(root, options);
			return this._reader.static(task.patterns, options);
		}
	};
	exports.default = ProviderStream;
} });

//#endregion
//#region ../node_modules/fast-glob/out/readers/sync.js
var require_sync$1 = __commonJS$1({ "../node_modules/fast-glob/out/readers/sync.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const fsStat = require_out$3();
	const fsWalk = require_out$1();
	const reader_1 = require_reader();
	var ReaderSync = class extends reader_1.default {
		constructor() {
			super(...arguments);
			this._walkSync = fsWalk.walkSync;
			this._statSync = fsStat.statSync;
		}
		dynamic(root, options) {
			return this._walkSync(root, options);
		}
		static(patterns, options) {
			const entries = [];
			for (const pattern$1 of patterns) {
				const filepath = this._getFullEntryPath(pattern$1);
				const entry = this._getEntry(filepath, pattern$1, options);
				if (entry === null || !options.entryFilter(entry)) continue;
				entries.push(entry);
			}
			return entries;
		}
		_getEntry(filepath, pattern$1, options) {
			try {
				const stats = this._getStat(filepath);
				return this._makeEntry(stats, pattern$1);
			} catch (error) {
				if (options.errorFilter(error)) return null;
				throw error;
			}
		}
		_getStat(filepath) {
			return this._statSync(filepath, this._fsStatSettings);
		}
	};
	exports.default = ReaderSync;
} });

//#endregion
//#region ../node_modules/fast-glob/out/providers/sync.js
var require_sync = __commonJS$1({ "../node_modules/fast-glob/out/providers/sync.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const sync_1$1 = require_sync$1();
	const provider_1 = require_provider();
	var ProviderSync = class extends provider_1.default {
		constructor() {
			super(...arguments);
			this._reader = new sync_1$1.default(this._settings);
		}
		read(task) {
			const root = this._getRootDirectory(task);
			const options = this._getReaderOptions(task);
			const entries = this.api(root, task, options);
			return entries.map(options.transform);
		}
		api(root, task, options) {
			if (task.dynamic) return this._reader.dynamic(root, options);
			return this._reader.static(task.patterns, options);
		}
	};
	exports.default = ProviderSync;
} });

//#endregion
//#region ../node_modules/fast-glob/out/settings.js
var require_settings = __commonJS$1({ "../node_modules/fast-glob/out/settings.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DEFAULT_FILE_SYSTEM_ADAPTER = void 0;
	const fs$3 = __require("fs");
	const os = __require("os");
	/**
	* The `os.cpus` method can return zero. We expect the number of cores to be greater than zero.
	* https://github.com/nodejs/node/blob/7faeddf23a98c53896f8b574a6e66589e8fb1eb8/lib/os.js#L106-L107
	*/
	const CPU_COUNT = Math.max(os.cpus().length, 1);
	exports.DEFAULT_FILE_SYSTEM_ADAPTER = {
		lstat: fs$3.lstat,
		lstatSync: fs$3.lstatSync,
		stat: fs$3.stat,
		statSync: fs$3.statSync,
		readdir: fs$3.readdir,
		readdirSync: fs$3.readdirSync
	};
	var Settings = class {
		constructor(_options = {}) {
			this._options = _options;
			this.absolute = this._getValue(this._options.absolute, false);
			this.baseNameMatch = this._getValue(this._options.baseNameMatch, false);
			this.braceExpansion = this._getValue(this._options.braceExpansion, true);
			this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, true);
			this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT);
			this.cwd = this._getValue(this._options.cwd, process.cwd());
			this.deep = this._getValue(this._options.deep, Infinity);
			this.dot = this._getValue(this._options.dot, false);
			this.extglob = this._getValue(this._options.extglob, true);
			this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, true);
			this.fs = this._getFileSystemMethods(this._options.fs);
			this.globstar = this._getValue(this._options.globstar, true);
			this.ignore = this._getValue(this._options.ignore, []);
			this.markDirectories = this._getValue(this._options.markDirectories, false);
			this.objectMode = this._getValue(this._options.objectMode, false);
			this.onlyDirectories = this._getValue(this._options.onlyDirectories, false);
			this.onlyFiles = this._getValue(this._options.onlyFiles, true);
			this.stats = this._getValue(this._options.stats, false);
			this.suppressErrors = this._getValue(this._options.suppressErrors, false);
			this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, false);
			this.unique = this._getValue(this._options.unique, true);
			if (this.onlyDirectories) this.onlyFiles = false;
			if (this.stats) this.objectMode = true;
			this.ignore = [].concat(this.ignore);
		}
		_getValue(option, value) {
			return option === void 0 ? value : option;
		}
		_getFileSystemMethods(methods = {}) {
			return Object.assign(Object.assign({}, exports.DEFAULT_FILE_SYSTEM_ADAPTER), methods);
		}
	};
	exports.default = Settings;
} });

//#endregion
//#region ../node_modules/fast-glob/out/index.js
var require_out = __commonJS$1({ "../node_modules/fast-glob/out/index.js"(exports, module) {
	const taskManager = require_tasks();
	const async_1 = require_async();
	const stream_1 = require_stream();
	const sync_1 = require_sync();
	const settings_1 = require_settings();
	const utils = require_utils$1();
	async function FastGlob(source, options) {
		assertPatternsInput$1(source);
		const works = getWorks(source, async_1.default, options);
		const result = await Promise.all(works);
		return utils.array.flatten(result);
	}
	(function(FastGlob$1) {
		FastGlob$1.glob = FastGlob$1;
		FastGlob$1.globSync = sync$5;
		FastGlob$1.globStream = stream$1;
		FastGlob$1.async = FastGlob$1;
		function sync$5(source, options) {
			assertPatternsInput$1(source);
			const works = getWorks(source, sync_1.default, options);
			return utils.array.flatten(works);
		}
		FastGlob$1.sync = sync$5;
		function stream$1(source, options) {
			assertPatternsInput$1(source);
			const works = getWorks(source, stream_1.default, options);
			/**
			* The stream returned by the provider cannot work with an asynchronous iterator.
			* To support asynchronous iterators, regardless of the number of tasks, we always multiplex streams.
			* This affects performance (+25%). I don't see best solution right now.
			*/
			return utils.stream.merge(works);
		}
		FastGlob$1.stream = stream$1;
		function generateTasks$1(source, options) {
			assertPatternsInput$1(source);
			const patterns = [].concat(source);
			const settings = new settings_1.default(options);
			return taskManager.generate(patterns, settings);
		}
		FastGlob$1.generateTasks = generateTasks$1;
		function isDynamicPattern$2(source, options) {
			assertPatternsInput$1(source);
			const settings = new settings_1.default(options);
			return utils.pattern.isDynamicPattern(source, settings);
		}
		FastGlob$1.isDynamicPattern = isDynamicPattern$2;
		function escapePath(source) {
			assertPatternsInput$1(source);
			return utils.path.escape(source);
		}
		FastGlob$1.escapePath = escapePath;
		function convertPathToPattern$1(source) {
			assertPatternsInput$1(source);
			return utils.path.convertPathToPattern(source);
		}
		FastGlob$1.convertPathToPattern = convertPathToPattern$1;
		let posix;
		(function(posix$1) {
			function escapePath$1(source) {
				assertPatternsInput$1(source);
				return utils.path.escapePosixPath(source);
			}
			posix$1.escapePath = escapePath$1;
			function convertPathToPattern$2(source) {
				assertPatternsInput$1(source);
				return utils.path.convertPosixPathToPattern(source);
			}
			posix$1.convertPathToPattern = convertPathToPattern$2;
		})(posix = FastGlob$1.posix || (FastGlob$1.posix = {}));
		let win32$1;
		(function(win32$2) {
			function escapePath$1(source) {
				assertPatternsInput$1(source);
				return utils.path.escapeWindowsPath(source);
			}
			win32$2.escapePath = escapePath$1;
			function convertPathToPattern$2(source) {
				assertPatternsInput$1(source);
				return utils.path.convertWindowsPathToPattern(source);
			}
			win32$2.convertPathToPattern = convertPathToPattern$2;
		})(win32$1 = FastGlob$1.win32 || (FastGlob$1.win32 = {}));
	})(FastGlob || (FastGlob = {}));
	function getWorks(source, _Provider, options) {
		const patterns = [].concat(source);
		const settings = new settings_1.default(options);
		const tasks = taskManager.generate(patterns, settings);
		const provider = new _Provider(settings);
		return tasks.map(provider.read, provider);
	}
	function assertPatternsInput$1(input) {
		const source = [].concat(input);
		const isValidSource = source.every((item) => utils.string.isString(item) && !utils.string.isEmpty(item));
		if (!isValidSource) throw new TypeError("Patterns must be a string (non empty) or an array of strings");
	}
	module.exports = FastGlob;
} });

//#endregion
//#region ../node_modules/path-type/index.js
async function isType(fsStatType, statsMethodName, filePath) {
	if (typeof filePath !== "string") throw new TypeError(`Expected a string, got ${typeof filePath}`);
	try {
		const stats = await fsPromises[fsStatType](filePath);
		return stats[statsMethodName]();
	} catch (error) {
		if (error.code === "ENOENT") return false;
		throw error;
	}
}
function isTypeSync(fsStatType, statsMethodName, filePath) {
	if (typeof filePath !== "string") throw new TypeError(`Expected a string, got ${typeof filePath}`);
	try {
		return fs[fsStatType](filePath)[statsMethodName]();
	} catch (error) {
		if (error.code === "ENOENT") return false;
		throw error;
	}
}
const isFile = isType.bind(void 0, "stat", "isFile");
const isDirectory = isType.bind(void 0, "stat", "isDirectory");
const isSymlink = isType.bind(void 0, "lstat", "isSymbolicLink");
const isFileSync = isTypeSync.bind(void 0, "statSync", "isFile");
const isDirectorySync = isTypeSync.bind(void 0, "statSync", "isDirectory");
const isSymlinkSync = isTypeSync.bind(void 0, "lstatSync", "isSymbolicLink");

//#endregion
//#region ../node_modules/ignore/index.js
var require_ignore = __commonJS$1({ "../node_modules/ignore/index.js"(exports, module) {
	function makeArray(subject) {
		return Array.isArray(subject) ? subject : [subject];
	}
	const UNDEFINED = void 0;
	const EMPTY = "";
	const SPACE = " ";
	const ESCAPE = "\\";
	const REGEX_TEST_BLANK_LINE = /^\s+$/;
	const REGEX_INVALID_TRAILING_BACKSLASH = /(?:[^\\]|^)\\$/;
	const REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/;
	const REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/;
	const REGEX_SPLITALL_CRLF = /\r?\n/g;
	const REGEX_TEST_INVALID_PATH = /^\.{0,2}\/|^\.{1,2}$/;
	const REGEX_TEST_TRAILING_SLASH = /\/$/;
	const SLASH = "/";
	let TMP_KEY_IGNORE = "node-ignore";
	/* istanbul ignore else */
	if (typeof Symbol !== "undefined") TMP_KEY_IGNORE = Symbol.for("node-ignore");
	const KEY_IGNORE = TMP_KEY_IGNORE;
	const define = (object, key, value) => {
		Object.defineProperty(object, key, { value });
		return value;
	};
	const REGEX_REGEXP_RANGE = /([0-z])-([0-z])/g;
	const RETURN_FALSE = () => false;
	const sanitizeRange = (range) => range.replace(REGEX_REGEXP_RANGE, (match, from, to) => from.charCodeAt(0) <= to.charCodeAt(0) ? match : EMPTY);
	const cleanRangeBackSlash = (slashes) => {
		const { length } = slashes;
		return slashes.slice(0, length - length % 2);
	};
	const REPLACERS = [
		[/^\uFEFF/, () => EMPTY],
		[/((?:\\\\)*?)(\\?\s+)$/, (_$2, m1, m2) => m1 + (m2.indexOf("\\") === 0 ? SPACE : EMPTY)],
		[/(\\+?)\s/g, (_$2, m1) => {
			const { length } = m1;
			return m1.slice(0, length - length % 2) + SPACE;
		}],
		[/[\\$.|*+(){^]/g, (match) => `\\${match}`],
		[/(?!\\)\?/g, () => "[^/]"],
		[/^\//, () => "^"],
		[/\//g, () => "\\/"],
		[/^\^*\\\*\\\*\\\//, () => "^(?:.*\\/)?"],
		[/^(?=[^^])/, function startingReplacer() {
			return !/\/(?!$)/.test(this) ? "(?:^|\\/)" : "^";
		}],
		[/\\\/\\\*\\\*(?=\\\/|$)/g, (_$2, index, str) => index + 6 < str.length ? "(?:\\/[^\\/]+)*" : "\\/.+"],
		[/(^|[^\\]+)(\\\*)+(?=.+)/g, (_$2, p1, p2) => {
			const unescaped = p2.replace(/\\\*/g, "[^\\/]*");
			return p1 + unescaped;
		}],
		[/\\\\\\(?=[$.|*+(){^])/g, () => ESCAPE],
		[/\\\\/g, () => ESCAPE],
		[/(\\)?\[([^\]/]*?)(\\*)($|\])/g, (match, leadEscape, range, endEscape, close) => leadEscape === ESCAPE ? `\\[${range}${cleanRangeBackSlash(endEscape)}${close}` : close === "]" ? endEscape.length % 2 === 0 ? `[${sanitizeRange(range)}${endEscape}]` : "[]" : "[]"],
		[/(?:[^*])$/, (match) => /\/$/.test(match) ? `${match}$` : `${match}(?=$|\\/$)`]
	];
	const REGEX_REPLACE_TRAILING_WILDCARD = /(^|\\\/)?\\\*$/;
	const MODE_IGNORE = "regex";
	const MODE_CHECK_IGNORE = "checkRegex";
	const UNDERSCORE = "_";
	const TRAILING_WILD_CARD_REPLACERS = {
		[MODE_IGNORE](_$2, p1) {
			const prefix = p1 ? `${p1}[^/]+` : "[^/]*";
			return `${prefix}(?=$|\\/$)`;
		},
		[MODE_CHECK_IGNORE](_$2, p1) {
			const prefix = p1 ? `${p1}[^/]*` : "[^/]*";
			return `${prefix}(?=$|\\/$)`;
		}
	};
	const makeRegexPrefix = (pattern$1) => REPLACERS.reduce((prev, [matcher, replacer]) => prev.replace(matcher, replacer.bind(pattern$1)), pattern$1);
	const isString = (subject) => typeof subject === "string";
	const checkPattern = (pattern$1) => pattern$1 && isString(pattern$1) && !REGEX_TEST_BLANK_LINE.test(pattern$1) && !REGEX_INVALID_TRAILING_BACKSLASH.test(pattern$1) && pattern$1.indexOf("#") !== 0;
	const splitPattern = (pattern$1) => pattern$1.split(REGEX_SPLITALL_CRLF).filter(Boolean);
	var IgnoreRule = class {
		constructor(pattern$1, mark, body, ignoreCase, negative, prefix) {
			this.pattern = pattern$1;
			this.mark = mark;
			this.negative = negative;
			define(this, "body", body);
			define(this, "ignoreCase", ignoreCase);
			define(this, "regexPrefix", prefix);
		}
		get regex() {
			const key = UNDERSCORE + MODE_IGNORE;
			if (this[key]) return this[key];
			return this._make(MODE_IGNORE, key);
		}
		get checkRegex() {
			const key = UNDERSCORE + MODE_CHECK_IGNORE;
			if (this[key]) return this[key];
			return this._make(MODE_CHECK_IGNORE, key);
		}
		_make(mode, key) {
			const str = this.regexPrefix.replace(REGEX_REPLACE_TRAILING_WILDCARD, TRAILING_WILD_CARD_REPLACERS[mode]);
			const regex = this.ignoreCase ? new RegExp(str, "i") : new RegExp(str);
			return define(this, key, regex);
		}
	};
	const createRule = ({ pattern: pattern$1, mark }, ignoreCase) => {
		let negative = false;
		let body = pattern$1;
		if (body.indexOf("!") === 0) {
			negative = true;
			body = body.substr(1);
		}
		body = body.replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, "!").replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, "#");
		const regexPrefix = makeRegexPrefix(body);
		return new IgnoreRule(pattern$1, mark, body, ignoreCase, negative, regexPrefix);
	};
	var RuleManager = class {
		constructor(ignoreCase) {
			this._ignoreCase = ignoreCase;
			this._rules = [];
		}
		_add(pattern$1) {
			if (pattern$1 && pattern$1[KEY_IGNORE]) {
				this._rules = this._rules.concat(pattern$1._rules._rules);
				this._added = true;
				return;
			}
			if (isString(pattern$1)) pattern$1 = { pattern: pattern$1 };
			if (checkPattern(pattern$1.pattern)) {
				const rule = createRule(pattern$1, this._ignoreCase);
				this._added = true;
				this._rules.push(rule);
			}
		}
		add(pattern$1) {
			this._added = false;
			makeArray(isString(pattern$1) ? splitPattern(pattern$1) : pattern$1).forEach(this._add, this);
			return this._added;
		}
		test(path$28, checkUnignored, mode) {
			let ignored = false;
			let unignored = false;
			let matchedRule;
			this._rules.forEach((rule) => {
				const { negative } = rule;
				if (unignored === negative && ignored !== unignored || negative && !ignored && !unignored && !checkUnignored) return;
				const matched = rule[mode].test(path$28);
				if (!matched) return;
				ignored = !negative;
				unignored = negative;
				matchedRule = negative ? UNDEFINED : rule;
			});
			const ret = {
				ignored,
				unignored
			};
			if (matchedRule) ret.rule = matchedRule;
			return ret;
		}
	};
	const throwError = (message, Ctor) => {
		throw new Ctor(message);
	};
	const checkPath = (path$28, originalPath, doThrow) => {
		if (!isString(path$28)) return doThrow(`path must be a string, but got \`${originalPath}\``, TypeError);
		if (!path$28) return doThrow(`path must not be empty`, TypeError);
		if (checkPath.isNotRelative(path$28)) {
			const r$1 = "`path.relative()`d";
			return doThrow(`path should be a ${r$1} string, but got "${originalPath}"`, RangeError);
		}
		return true;
	};
	const isNotRelative = (path$28) => REGEX_TEST_INVALID_PATH.test(path$28);
	checkPath.isNotRelative = isNotRelative;
	/* istanbul ignore next */
	checkPath.convert = (p$2) => p$2;
	var Ignore = class {
		constructor({ ignorecase = true, ignoreCase = ignorecase, allowRelativePaths = false } = {}) {
			define(this, KEY_IGNORE, true);
			this._rules = new RuleManager(ignoreCase);
			this._strictPathCheck = !allowRelativePaths;
			this._initCache();
		}
		_initCache() {
			this._ignoreCache = Object.create(null);
			this._testCache = Object.create(null);
		}
		add(pattern$1) {
			if (this._rules.add(pattern$1)) this._initCache();
			return this;
		}
		addPattern(pattern$1) {
			return this.add(pattern$1);
		}
		_test(originalPath, cache, checkUnignored, slices) {
			const path$28 = originalPath && checkPath.convert(originalPath);
			checkPath(path$28, originalPath, this._strictPathCheck ? throwError : RETURN_FALSE);
			return this._t(path$28, cache, checkUnignored, slices);
		}
		checkIgnore(path$28) {
			if (!REGEX_TEST_TRAILING_SLASH.test(path$28)) return this.test(path$28);
			const slices = path$28.split(SLASH).filter(Boolean);
			slices.pop();
			if (slices.length) {
				const parent = this._t(slices.join(SLASH) + SLASH, this._testCache, true, slices);
				if (parent.ignored) return parent;
			}
			return this._rules.test(path$28, false, MODE_CHECK_IGNORE);
		}
		_t(path$28, cache, checkUnignored, slices) {
			if (path$28 in cache) return cache[path$28];
			if (!slices) slices = path$28.split(SLASH).filter(Boolean);
			slices.pop();
			if (!slices.length) return cache[path$28] = this._rules.test(path$28, checkUnignored, MODE_IGNORE);
			const parent = this._t(slices.join(SLASH) + SLASH, cache, checkUnignored, slices);
			return cache[path$28] = parent.ignored ? parent : this._rules.test(path$28, checkUnignored, MODE_IGNORE);
		}
		ignores(path$28) {
			return this._test(path$28, this._ignoreCache, false).ignored;
		}
		createFilter() {
			return (path$28) => !this.ignores(path$28);
		}
		filter(paths) {
			return makeArray(paths).filter(this.createFilter());
		}
		test(path$28) {
			return this._test(path$28, this._testCache, true);
		}
	};
	const factory = (options) => new Ignore(options);
	const isPathValid = (path$28) => checkPath(path$28 && checkPath.convert(path$28), path$28, RETURN_FALSE);
	/* istanbul ignore next */
	const setupWindows = () => {
		const makePosix = (str) => /^\\\\\?\\/.test(str) || /["<>|\u0000-\u001F]+/u.test(str) ? str : str.replace(/\\/g, "/");
		checkPath.convert = makePosix;
		const REGEX_TEST_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;
		checkPath.isNotRelative = (path$28) => REGEX_TEST_WINDOWS_PATH_ABSOLUTE.test(path$28) || isNotRelative(path$28);
	};
	/* istanbul ignore next */
	if (typeof process !== "undefined" && process.platform === "win32") setupWindows();
	module.exports = factory;
	factory.default = factory;
	module.exports.isPathValid = isPathValid;
	define(module.exports, Symbol.for("setupWindows"), setupWindows);
} });

//#endregion
//#region ../node_modules/slash/index.js
function slash(path$28) {
	const isExtendedLengthPath = path$28.startsWith("\\\\?\\");
	if (isExtendedLengthPath) return path$28;
	return path$28.replace(/\\/g, "/");
}

//#endregion
//#region ../node_modules/globby/utilities.js
const isNegativePattern = (pattern$1) => pattern$1[0] === "!";

//#endregion
//#region ../node_modules/globby/ignore.js
var import_out$1 = __toESM$1(require_out(), 1);
var import_ignore = __toESM$1(require_ignore(), 1);
const defaultIgnoredDirectories = [
	"**/node_modules",
	"**/flow-typed",
	"**/coverage",
	"**/.git"
];
const ignoreFilesGlobOptions = {
	absolute: true,
	dot: true
};
const GITIGNORE_FILES_PATTERN = "**/.gitignore";
const applyBaseToPattern = (pattern$1, base) => isNegativePattern(pattern$1) ? "!" + path.posix.join(base, pattern$1.slice(1)) : path.posix.join(base, pattern$1);
const parseIgnoreFile = (file, cwd$1) => {
	const base = slash(path.relative(cwd$1, path.dirname(file.filePath)));
	return file.content.split(/\r?\n/).filter((line) => line && !line.startsWith("#")).map((pattern$1) => applyBaseToPattern(pattern$1, base));
};
const toRelativePath = (fileOrDirectory, cwd$1) => {
	cwd$1 = slash(cwd$1);
	if (path.isAbsolute(fileOrDirectory)) {
		if (slash(fileOrDirectory).startsWith(cwd$1)) return path.relative(cwd$1, fileOrDirectory);
		throw new Error(`Path ${fileOrDirectory} is not in cwd ${cwd$1}`);
	}
	return fileOrDirectory;
};
const getIsIgnoredPredicate = (files, cwd$1) => {
	const patterns = files.flatMap((file) => parseIgnoreFile(file, cwd$1));
	const ignores = (0, import_ignore.default)().add(patterns);
	return (fileOrDirectory) => {
		fileOrDirectory = toPath(fileOrDirectory);
		fileOrDirectory = toRelativePath(fileOrDirectory, cwd$1);
		return fileOrDirectory ? ignores.ignores(slash(fileOrDirectory)) : false;
	};
};
const normalizeOptions$1 = (options = {}) => ({
	cwd: toPath(options.cwd) ?? y.cwd(),
	suppressErrors: Boolean(options.suppressErrors),
	deep: typeof options.deep === "number" ? options.deep : Number.POSITIVE_INFINITY,
	ignore: [...options.ignore ?? [], ...defaultIgnoredDirectories]
});
const isIgnoredByIgnoreFiles = async (patterns, options) => {
	const { cwd: cwd$1, suppressErrors, deep, ignore } = normalizeOptions$1(options);
	const paths = await (0, import_out$1.default)(patterns, {
		cwd: cwd$1,
		suppressErrors,
		deep,
		ignore,
		...ignoreFilesGlobOptions
	});
	const files = await Promise.all(paths.map(async (filePath) => ({
		filePath,
		content: await fsPromises.readFile(filePath, "utf8")
	})));
	return getIsIgnoredPredicate(files, cwd$1);
};
const isIgnoredByIgnoreFilesSync = (patterns, options) => {
	const { cwd: cwd$1, suppressErrors, deep, ignore } = normalizeOptions$1(options);
	const paths = import_out$1.default.sync(patterns, {
		cwd: cwd$1,
		suppressErrors,
		deep,
		ignore,
		...ignoreFilesGlobOptions
	});
	const files = paths.map((filePath) => ({
		filePath,
		content: fs.readFileSync(filePath, "utf8")
	}));
	return getIsIgnoredPredicate(files, cwd$1);
};

//#endregion
//#region ../node_modules/globby/index.js
var import_out = __toESM$1(require_out(), 1);
const assertPatternsInput = (patterns) => {
	if (patterns.some((pattern$1) => typeof pattern$1 !== "string")) throw new TypeError("Patterns must be a string or an array of strings");
};
const normalizePathForDirectoryGlob = (filePath, cwd$1) => {
	const path$28 = isNegativePattern(filePath) ? filePath.slice(1) : filePath;
	return path.isAbsolute(path$28) ? path$28 : path.join(cwd$1, path$28);
};
const getDirectoryGlob = ({ directoryPath, files, extensions }) => {
	const extensionGlob = extensions?.length > 0 ? `.${extensions.length > 1 ? `{${extensions.join(",")}}` : extensions[0]}` : "";
	return files ? files.map((file) => path.posix.join(directoryPath, `**/${path.extname(file) ? file : `${file}${extensionGlob}`}`)) : [path.posix.join(directoryPath, `**${extensionGlob ? `/*${extensionGlob}` : ""}`)];
};
const directoryToGlob = async (directoryPaths, { cwd: cwd$1 = y.cwd(), files, extensions } = {}) => {
	const globs = await Promise.all(directoryPaths.map(async (directoryPath) => await isDirectory(normalizePathForDirectoryGlob(directoryPath, cwd$1)) ? getDirectoryGlob({
		directoryPath,
		files,
		extensions
	}) : directoryPath));
	return globs.flat();
};
const directoryToGlobSync = (directoryPaths, { cwd: cwd$1 = y.cwd(), files, extensions } = {}) => directoryPaths.flatMap((directoryPath) => isDirectorySync(normalizePathForDirectoryGlob(directoryPath, cwd$1)) ? getDirectoryGlob({
	directoryPath,
	files,
	extensions
}) : directoryPath);
const toPatternsArray = (patterns) => {
	patterns = [...new Set([patterns].flat())];
	assertPatternsInput(patterns);
	return patterns;
};
const checkCwdOption = (cwd$1) => {
	if (!cwd$1) return;
	let stat$5;
	try {
		stat$5 = fs.statSync(cwd$1);
	} catch {
		return;
	}
	if (!stat$5.isDirectory()) throw new Error("The `cwd` option must be a path to a directory");
};
const normalizeOptions = (options = {}) => {
	options = {
		...options,
		ignore: options.ignore ?? [],
		expandDirectories: options.expandDirectories ?? true,
		cwd: toPath(options.cwd)
	};
	checkCwdOption(options.cwd);
	return options;
};
const normalizeArguments = (function_) => async (patterns, options) => function_(toPatternsArray(patterns), normalizeOptions(options));
const normalizeArgumentsSync = (function_) => (patterns, options) => function_(toPatternsArray(patterns), normalizeOptions(options));
const getIgnoreFilesPatterns = (options) => {
	const { ignoreFiles, gitignore } = options;
	const patterns = ignoreFiles ? toPatternsArray(ignoreFiles) : [];
	if (gitignore) patterns.push(GITIGNORE_FILES_PATTERN);
	return patterns;
};
const getFilter = async (options) => {
	const ignoreFilesPatterns = getIgnoreFilesPatterns(options);
	return createFilterFunction(ignoreFilesPatterns.length > 0 && await isIgnoredByIgnoreFiles(ignoreFilesPatterns, options));
};
const getFilterSync = (options) => {
	const ignoreFilesPatterns = getIgnoreFilesPatterns(options);
	return createFilterFunction(ignoreFilesPatterns.length > 0 && isIgnoredByIgnoreFilesSync(ignoreFilesPatterns, options));
};
const createFilterFunction = (isIgnored) => {
	const seen = new Set();
	return (fastGlobResult) => {
		const pathKey$2 = path.normalize(fastGlobResult.path ?? fastGlobResult);
		if (seen.has(pathKey$2) || isIgnored && isIgnored(pathKey$2)) return false;
		seen.add(pathKey$2);
		return true;
	};
};
const unionFastGlobResults = (results, filter) => results.flat().filter((fastGlobResult) => filter(fastGlobResult));
const convertNegativePatterns = (patterns, options) => {
	const tasks = [];
	while (patterns.length > 0) {
		const index = patterns.findIndex((pattern$1) => isNegativePattern(pattern$1));
		if (index === -1) {
			tasks.push({
				patterns,
				options
			});
			break;
		}
		const ignorePattern = patterns[index].slice(1);
		for (const task of tasks) task.options.ignore.push(ignorePattern);
		if (index !== 0) tasks.push({
			patterns: patterns.slice(0, index),
			options: {
				...options,
				ignore: [...options.ignore, ignorePattern]
			}
		});
		patterns = patterns.slice(index + 1);
	}
	return tasks;
};
const normalizeExpandDirectoriesOption = (options, cwd$1) => ({
	...cwd$1 ? { cwd: cwd$1 } : {},
	...Array.isArray(options) ? { files: options } : options
});
const generateTasks = async (patterns, options) => {
	const globTasks = convertNegativePatterns(patterns, options);
	const { cwd: cwd$1, expandDirectories } = options;
	if (!expandDirectories) return globTasks;
	const directoryToGlobOptions = normalizeExpandDirectoriesOption(expandDirectories, cwd$1);
	return Promise.all(globTasks.map(async (task) => {
		let { patterns: patterns$1, options: options$1 } = task;
		[patterns$1, options$1.ignore] = await Promise.all([directoryToGlob(patterns$1, directoryToGlobOptions), directoryToGlob(options$1.ignore, { cwd: cwd$1 })]);
		return {
			patterns: patterns$1,
			options: options$1
		};
	}));
};
const generateTasksSync = (patterns, options) => {
	const globTasks = convertNegativePatterns(patterns, options);
	const { cwd: cwd$1, expandDirectories } = options;
	if (!expandDirectories) return globTasks;
	const directoryToGlobSyncOptions = normalizeExpandDirectoriesOption(expandDirectories, cwd$1);
	return globTasks.map((task) => {
		let { patterns: patterns$1, options: options$1 } = task;
		patterns$1 = directoryToGlobSync(patterns$1, directoryToGlobSyncOptions);
		options$1.ignore = directoryToGlobSync(options$1.ignore, { cwd: cwd$1 });
		return {
			patterns: patterns$1,
			options: options$1
		};
	});
};
const globby = normalizeArguments(async (patterns, options) => {
	const [tasks, filter] = await Promise.all([generateTasks(patterns, options), getFilter(options)]);
	const results = await Promise.all(tasks.map((task) => (0, import_out.default)(task.patterns, task.options)));
	return unionFastGlobResults(results, filter);
});
const globbySync = normalizeArgumentsSync((patterns, options) => {
	const tasks = generateTasksSync(patterns, options);
	const filter = getFilterSync(options);
	const results = tasks.map((task) => import_out.default.sync(task.patterns, task.options));
	return unionFastGlobResults(results, filter);
});
const globbyStream = normalizeArgumentsSync((patterns, options) => {
	const tasks = generateTasksSync(patterns, options);
	const filter = getFilterSync(options);
	const streams = tasks.map((task) => import_out.default.stream(task.patterns, task.options));
	const stream$1 = mergeStreams(streams).filter((fastGlobResult) => filter(fastGlobResult));
	return stream$1;
});
const isDynamicPattern = normalizeArgumentsSync((patterns, options) => patterns.some((pattern$1) => import_out.default.isDynamicPattern(pattern$1, options)));
const generateGlobTasks = normalizeArguments(generateTasks);
const generateGlobTasksSync = normalizeArgumentsSync(generateTasksSync);
const { convertPathToPattern } = import_out.default;

//#endregion
//#region bin/services/get-package-version.ts
var import_lib$3 = __toESM$1(require_lib(), 1);
const getPackageVersion = () => {
	const packageJsonPath = path.join(PKG_ROOT, "package.json");
	const packageJsonContent = import_lib$3.default.readJSONSync(packageJsonPath);
	return packageJsonContent.version ?? "1.0.0";
};

//#endregion
//#region bin/constants.ts
const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
const PKG_ROOT = path.join(distPath, "../");
const dependencyVersionMap = { alchemy: getPackageVersion() };

//#endregion
//#region bin/services/dependencies.ts
var import_lib$2 = __toESM$1(require_lib(), 1);
const addPackageDependencies = async (opts) => {
	const { dependencies = [], devDependencies = [], projectDir } = opts;
	const pkgJsonPath = path.join(projectDir, "package.json");
	const pkgJson = await import_lib$2.default.readJson(pkgJsonPath);
	if (!pkgJson.dependencies) pkgJson.dependencies = {};
	if (!pkgJson.devDependencies) pkgJson.devDependencies = {};
	for (const pkgName of dependencies) {
		const version = dependencyVersionMap[pkgName];
		if (version) pkgJson.dependencies[pkgName] = version;
		else M.warn(`Warning: Dependency ${pkgName} not found in version map.`);
	}
	for (const pkgName of devDependencies) {
		const version = dependencyVersionMap[pkgName];
		if (version) pkgJson.devDependencies[pkgName] = version;
		else M.warn(`Warning: Dev dependency ${pkgName} not found in version map.`);
	}
	await import_lib$2.default.writeJson(pkgJsonPath, pkgJson, { spaces: 2 });
};

//#endregion
//#region bin/services/template-manager.ts
var import_lib$1 = __toESM$1(require_lib(), 1);
async function copyTemplate(templateName, context) {
	const templatePath = path$1.join(PKG_ROOT, "templates", templateName);
	if (!existsSync(templatePath)) throw new Error(`Template '${templateName}' not found at ${templatePath}`);
	const filesToRename = [
		"_gitignore",
		"_npmrc",
		"_env",
		"_env.example"
	];
	try {
		const copySpinner = Y();
		copySpinner.start("Copying template files...");
		const files = await globby("**/*", {
			cwd: templatePath,
			dot: true
		});
		for (const file of files) {
			const srcPath = join(templatePath, file);
			let destFile = file;
			const basename = path$1.basename(file);
			if (filesToRename.includes(basename)) {
				const newBasename = `.${basename.slice(1)}`;
				destFile = path$1.join(path$1.dirname(file), newBasename);
			}
			const destPath = join(context.path, destFile);
			await import_lib$1.ensureDir(path$1.dirname(destPath));
			await import_lib$1.copy(srcPath, destPath);
		}
		copySpinner.stop("Template files copied successfully");
		await updateTemplatePackageJson(context);
		await addPackageDependencies({
			devDependencies: ["alchemy"],
			projectDir: context.path
		});
		if (context.options.install !== false) {
			const installSpinner = Y();
			installSpinner.start("Installing dependencies...");
			try {
				await installDependencies(context);
				installSpinner.stop("Dependencies installed successfully");
			} catch (error) {
				installSpinner.stop("Failed to install dependencies");
				throw error;
			}
		} else M.info("Skipping dependency installation");
		if (templateName === "rwsdk") await handleRwsdkPostInstall(context);
		M.success("Project setup complete!");
	} catch (error) {
		throwWithContext(error, `Failed to copy template '${templateName}'`);
	}
}
async function updateTemplatePackageJson(context) {
	const packageJsonPath = join(context.path, "package.json");
	if (!existsSync(packageJsonPath)) return;
	const packageJson = await import_lib$1.readJson(packageJsonPath);
	packageJson.name = context.name;
	const deployCommand = context.packageManager === "bun" ? "bun --env-file=./.env ./alchemy.run.ts" : "tsx --env-file=./.env ./alchemy.run.ts";
	if (packageJson.scripts) {
		packageJson.scripts.deploy = deployCommand;
		packageJson.scripts.destroy = `${deployCommand} --destroy`;
	}
	await import_lib$1.writeJson(packageJsonPath, packageJson, { spaces: 2 });
}
async function handleRwsdkPostInstall(context) {
	try {
		const migrationsDir = join(context.path, "migrations");
		await import_lib$1.ensureDir(migrationsDir);
		const commands = getPackageManagerCommands(context.packageManager);
		const devInitCommand = `${commands.run} dev:init`;
		if (context.options.install !== false) await execa(devInitCommand, {
			cwd: context.path,
			shell: true
		});
		else M.info(`To complete rwsdk setup, run: cd ${context.name} && ${devInitCommand}`);
	} catch (_error) {
		M.warn("Failed to complete rwsdk setup. You may need to run 'dev:init' manually.");
	}
}

//#endregion
//#region bin/types.ts
const TEMPLATE_DEFINITIONS = [
	{
		name: "typescript",
		description: "TypeScript Worker"
	},
	{
		name: "vite",
		description: "React Vite"
	},
	{
		name: "astro",
		description: "Astro SSR"
	},
	{
		name: "react-router",
		description: "React Router"
	},
	{
		name: "sveltekit",
		description: "SvelteKit"
	},
	{
		name: "tanstack-start",
		description: "TanStack Start"
	},
	{
		name: "rwsdk",
		description: "Redwood SDK"
	},
	{
		name: "nuxt",
		description: "Nuxt.js"
	}
];
const templateNames = TEMPLATE_DEFINITIONS.map((t$1) => t$1.name);
const TemplateSchema = z.enum(templateNames).describe("Project template type");
const PackageManagerSchema = z.enum([
	"bun",
	"npm",
	"pnpm",
	"yarn"
]).describe("Package manager");
const ProjectNameSchema = z.string().min(1, "Project name cannot be empty").max(255, "Project name must be less than 255 characters").refine((name) => name === "." || !name.startsWith("."), "Project name cannot start with a dot (except for '.')").refine((name) => name === "." || !name.startsWith("-"), "Project name cannot start with a dash").refine((name) => {
	const invalidChars = [
		"<",
		">",
		":",
		"\"",
		"|",
		"?",
		"*"
	];
	return !invalidChars.some((char) => name.includes(char));
}, "Project name contains invalid characters").refine((name) => name.toLowerCase() !== "node_modules", "Project name is reserved").describe("Project name or path");

//#endregion
//#region bin/commands/create.ts
var import_lib = __toESM$1(require_lib(), 1);
var import_picocolors = __toESM$1(require_picocolors(), 1);
const isTest = process.env.NODE_ENV === "test";
async function createProjectContext(cliOptions) {
	const detectedPm = detectPackageManager();
	const options = {
		yes: isTest,
		...cliOptions
	};
	let name;
	if (options.name) {
		const result = ProjectNameSchema.safeParse(options.name);
		if (!result.success) throw new Error(`Invalid project name: ${result.error.errors[0]?.message}`);
		name = options.name;
		M.info(`Using project name: ${import_picocolors.default.yellow(name)}`);
	} else {
		const nameResult = await he({
			message: "What is your project name?",
			placeholder: "my-alchemy-app",
			validate: (value) => {
				const result = ProjectNameSchema.safeParse(value);
				return result.success ? void 0 : result.error.errors[0]?.message;
			}
		});
		if (pD(nameResult)) {
			xe(import_picocolors.default.red("Operation cancelled."));
			process.exit(0);
		}
		name = nameResult;
	}
	let selectedTemplate;
	if (options.template) {
		selectedTemplate = options.template;
		M.info(`Using template: ${import_picocolors.default.yellow(selectedTemplate)}`);
	} else {
		const templateResult = await ve({
			message: "Which template would you like to use?",
			options: TEMPLATE_DEFINITIONS.map((t$1) => ({
				label: t$1.description,
				value: t$1.name
			}))
		});
		if (pD(templateResult)) {
			xe(import_picocolors.default.red("Operation cancelled."));
			process.exit(0);
		}
		selectedTemplate = templateResult;
	}
	const templateDefinition = TEMPLATE_DEFINITIONS.find((t$1) => t$1.name === selectedTemplate);
	if (!templateDefinition) throw new Error(`Template '${import_picocolors.default.yellow(selectedTemplate)}' not found. Available templates: ${TEMPLATE_DEFINITIONS.map((t$1) => import_picocolors.default.cyan(t$1.name)).join(", ")}`);
	const path$28 = resolve(process.cwd(), name);
	let packageManager = options.packageManager || detectedPm;
	if (options.bun) packageManager = "bun";
	else if (options.npm) packageManager = "npm";
	else if (options.pnpm) packageManager = "pnpm";
	else if (options.yarn) packageManager = "yarn";
	let shouldInstall = true;
	if (options.install !== void 0) {
		shouldInstall = options.install;
		M.info(`Dependencies installation: ${import_picocolors.default.yellow(shouldInstall ? "enabled" : "disabled")}`);
	} else if (!options.yes) {
		const installResult = await ye({
			message: "Install dependencies?",
			initialValue: true
		});
		if (pD(installResult)) {
			xe(import_picocolors.default.red("Operation cancelled."));
			process.exit(0);
		}
		shouldInstall = installResult;
	}
	return {
		name,
		path: path$28,
		template: selectedTemplate,
		packageManager,
		isTest,
		options: {
			...options,
			install: shouldInstall
		}
	};
}
async function handleDirectoryOverwrite(context) {
	if (!existsSync(context.path)) return;
	let shouldOverwrite = false;
	if (context.options.overwrite) {
		shouldOverwrite = true;
		M.warn(`Directory ${import_picocolors.default.yellow(context.name)} already exists. Overwriting due to ${import_picocolors.default.cyan("--overwrite")} flag.`);
	} else {
		const overwriteResult = await ye({
			message: `Directory ${import_picocolors.default.yellow(context.name)} already exists. Overwrite?`,
			initialValue: false
		});
		if (pD(overwriteResult)) {
			xe(import_picocolors.default.red("Operation cancelled."));
			process.exit(0);
		}
		shouldOverwrite = overwriteResult;
	}
	if (!shouldOverwrite) {
		xe(import_picocolors.default.red("Operation cancelled."));
		process.exit(0);
	}
	const s = Y();
	s.start(`Removing existing directory: ${import_picocolors.default.yellow(context.path)}`);
	try {
		await import_lib.rm(context.path, {
			recursive: true,
			force: true
		});
		s.stop(`Directory ${import_picocolors.default.yellow(context.path)} removed.`);
	} catch (error) {
		s.stop(import_picocolors.default.red(`Failed to remove directory ${import_picocolors.default.yellow(context.path)}.`));
		throwWithContext(error, "Directory removal failed");
	}
}
async function initializeTemplate(context) {
	const templateDefinition = TEMPLATE_DEFINITIONS.find((t$1) => t$1.name === context.template);
	if (!templateDefinition) throw new Error(`Template definition not found for: ${context.template}`);
	try {
		await copyTemplate(context.template, context);
	} catch (error) {
		throwWithContext(error, `Template initialization failed for '${context.template}'`);
	}
	const gitignorePath = join(context.path, ".gitignore");
	if (!existsSync(gitignorePath)) try {
		await import_lib.writeFile(gitignorePath, "node_modules/\n.env\n.env.local\ndist/\nlib/\n.wrangler/\nwrangler.jsonc\n*.tsbuildinfo\n");
	} catch (error) {
		const errorMsg = error instanceof Error ? error.message : String(error);
		M.warn(`Failed to create .gitignore: ${errorMsg}`);
	}
}
async function createAlchemy(cliOptions) {
	try {
		Ie(import_picocolors.default.cyan("🧪 Welcome to Alchemy!"));
		M.info("Creating a new Alchemy project...");
		const context = await createProjectContext(cliOptions);
		M.info(`Detected package manager: ${import_picocolors.default.green(context.packageManager)}`);
		await handleDirectoryOverwrite(context);
		await initializeTemplate(context);
		const installInstructions = context.options.install === false ? `
${import_picocolors.default.cyan("📦 Install dependencies:")}
   cd ${context.name}
   ${context.packageManager} install

` : "";
		Me(`
${import_picocolors.default.cyan("📁 Navigate to your project:")}
   cd ${context.name}

${installInstructions}${import_picocolors.default.cyan("🚀 Deploy your project:")}
   ${context.packageManager} run deploy

${import_picocolors.default.cyan("🧹 Destroy your project:")}
   ${context.packageManager} run destroy

${import_picocolors.default.cyan("📚 Learn more:")}
   https://alchemy.run
`, "Next Steps:");
		Se(import_picocolors.default.green(`✅ Project ${import_picocolors.default.yellow(context.name)} created successfully!`));
	} catch (error) {
		M.error("An unexpected error occurred:");
		if (error instanceof Error) {
			M.error(`${import_picocolors.default.red("Error:")} ${error.message}`);
			if (error.stack && process.env.DEBUG) M.error(`${import_picocolors.default.gray("Stack trace:")}\n${error.stack}`);
		} else M.error(import_picocolors.default.red(String(error)));
		process.exit(1);
	}
}

//#endregion
//#region bin/alchemy.ts
var import_dist = __toESM$1(require_dist(), 1);
const t = import_dist.trpcServer.initTRPC.create();
const router = t.router({ create: t.procedure.meta({ description: "Create a new Alchemy project" }).input(import_dist.zod.tuple([ProjectNameSchema.optional(), import_dist.zod.object({
	template: TemplateSchema.optional(),
	packageManager: PackageManagerSchema.optional(),
	yes: import_dist.zod.boolean().optional().default(false).describe("Skip prompts and use defaults"),
	overwrite: import_dist.zod.boolean().optional().default(false).describe("Overwrite existing directory"),
	bun: import_dist.zod.boolean().optional().default(false).describe("Use Bun as the package manager"),
	npm: import_dist.zod.boolean().optional().default(false).describe("Use npm as the package manager"),
	pnpm: import_dist.zod.boolean().optional().default(false).describe("Use pnpm as the package manager"),
	yarn: import_dist.zod.boolean().optional().default(false).describe("Use Yarn as the package manager"),
	install: import_dist.zod.boolean().optional().describe("Install dependencies after scaffolding")
}).optional().default({})])).mutation(async ({ input }) => {
	const [name, options] = input;
	const isTest$1 = process.env.NODE_ENV === "test";
	const combinedInput = {
		name,
		...options,
		yes: isTest$1 || options.yes
	};
	await createAlchemy(combinedInput);
}) });
const cli = (0, import_dist.createCli)({
	router,
	name: "alchemy",
	version: getPackageVersion(),
	description: "🧪 Welcome to Alchemy! Creating infrastructure as code with JavaScript and TypeScript."
});
cli.run();

//#endregion