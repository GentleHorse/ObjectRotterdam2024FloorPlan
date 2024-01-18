#! /usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b3) => {
  for (var prop in b3 || (b3 = {}))
    if (__hasOwnProp.call(b3, prop))
      __defNormalProp(a2, prop, b3[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b3)) {
      if (__propIsEnum.call(b3, prop))
        __defNormalProp(a2, prop, b3[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b3) => __defProps(a2, __getOwnPropDescs(b3));
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve2, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var step = (x3) => x3.done ? resolve2(x3.value) : Promise.resolve(x3.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// ../../node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js
var require_src = __commonJS({
  "../../node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js"(exports, module2) {
    "use strict";
    var ESC2 = "\x1B";
    var CSI2 = `${ESC2}[`;
    var beep2 = "\x07";
    var cursor2 = {
      to(x3, y3) {
        if (!y3)
          return `${CSI2}${x3 + 1}G`;
        return `${CSI2}${y3 + 1};${x3 + 1}H`;
      },
      move(x3, y3) {
        let ret = "";
        if (x3 < 0)
          ret += `${CSI2}${-x3}D`;
        else if (x3 > 0)
          ret += `${CSI2}${x3}C`;
        if (y3 < 0)
          ret += `${CSI2}${-y3}A`;
        else if (y3 > 0)
          ret += `${CSI2}${y3}B`;
        return ret;
      },
      up: (count = 1) => `${CSI2}${count}A`,
      down: (count = 1) => `${CSI2}${count}B`,
      forward: (count = 1) => `${CSI2}${count}C`,
      backward: (count = 1) => `${CSI2}${count}D`,
      nextLine: (count = 1) => `${CSI2}E`.repeat(count),
      prevLine: (count = 1) => `${CSI2}F`.repeat(count),
      left: `${CSI2}G`,
      hide: `${CSI2}?25l`,
      show: `${CSI2}?25h`,
      save: `${ESC2}7`,
      restore: `${ESC2}8`
    };
    var scroll2 = {
      up: (count = 1) => `${CSI2}S`.repeat(count),
      down: (count = 1) => `${CSI2}T`.repeat(count)
    };
    var erase2 = {
      screen: `${CSI2}2J`,
      up: (count = 1) => `${CSI2}1J`.repeat(count),
      down: (count = 1) => `${CSI2}J`.repeat(count),
      line: `${CSI2}2K`,
      lineEnd: `${CSI2}K`,
      lineStart: `${CSI2}1K`,
      lines(count) {
        let clear2 = "";
        for (let i = 0; i < count; i++)
          clear2 += this.line + (i < count - 1 ? cursor2.up() : "");
        if (count)
          clear2 += cursor2.left;
        return clear2;
      }
    };
    module2.exports = { cursor: cursor2, scroll: scroll2, erase: erase2, beep: beep2 };
  }
});

// ../../node_modules/.pnpm/picocolors@1.0.0/node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "../../node_modules/.pnpm/picocolors@1.0.0/node_modules/picocolors/picocolors.js"(exports, module2) {
    var tty3 = require("tty");
    var isColorSupported = !("NO_COLOR" in process.env || process.argv.includes("--no-color")) && ("FORCE_COLOR" in process.env || process.argv.includes("--color") || process.platform === "win32" || tty3.isatty(1) && process.env.TERM !== "dumb" || "CI" in process.env);
    var formatter = (open, close, replace = open) => (input) => {
      let string = "" + input;
      let index = string.indexOf(close, open.length);
      return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
    var replaceClose = (string, close, replace, index) => {
      let start = string.substring(0, index) + replace;
      let end = string.substring(index + close.length);
      let nextIndex = end.indexOf(close);
      return ~nextIndex ? start + replaceClose(end, close, replace, nextIndex) : start + end;
    };
    var createColors = (enabled = isColorSupported) => ({
      isColorSupported: enabled,
      reset: enabled ? (s) => `\x1B[0m${s}\x1B[0m` : String,
      bold: enabled ? formatter("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m") : String,
      dim: enabled ? formatter("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m") : String,
      italic: enabled ? formatter("\x1B[3m", "\x1B[23m") : String,
      underline: enabled ? formatter("\x1B[4m", "\x1B[24m") : String,
      inverse: enabled ? formatter("\x1B[7m", "\x1B[27m") : String,
      hidden: enabled ? formatter("\x1B[8m", "\x1B[28m") : String,
      strikethrough: enabled ? formatter("\x1B[9m", "\x1B[29m") : String,
      black: enabled ? formatter("\x1B[30m", "\x1B[39m") : String,
      red: enabled ? formatter("\x1B[31m", "\x1B[39m") : String,
      green: enabled ? formatter("\x1B[32m", "\x1B[39m") : String,
      yellow: enabled ? formatter("\x1B[33m", "\x1B[39m") : String,
      blue: enabled ? formatter("\x1B[34m", "\x1B[39m") : String,
      magenta: enabled ? formatter("\x1B[35m", "\x1B[39m") : String,
      cyan: enabled ? formatter("\x1B[36m", "\x1B[39m") : String,
      white: enabled ? formatter("\x1B[37m", "\x1B[39m") : String,
      gray: enabled ? formatter("\x1B[90m", "\x1B[39m") : String,
      bgBlack: enabled ? formatter("\x1B[40m", "\x1B[49m") : String,
      bgRed: enabled ? formatter("\x1B[41m", "\x1B[49m") : String,
      bgGreen: enabled ? formatter("\x1B[42m", "\x1B[49m") : String,
      bgYellow: enabled ? formatter("\x1B[43m", "\x1B[49m") : String,
      bgBlue: enabled ? formatter("\x1B[44m", "\x1B[49m") : String,
      bgMagenta: enabled ? formatter("\x1B[45m", "\x1B[49m") : String,
      bgCyan: enabled ? formatter("\x1B[46m", "\x1B[49m") : String,
      bgWhite: enabled ? formatter("\x1B[47m", "\x1B[49m") : String
    });
    module2.exports = createColors();
    module2.exports.createColors = createColors;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/is.js
var require_is = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/is.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var objectToString = Object.prototype.toString;
    function isError(wat) {
      switch (objectToString.call(wat)) {
        case "[object Error]":
        case "[object Exception]":
        case "[object DOMException]":
          return true;
        default:
          return isInstanceOf(wat, Error);
      }
    }
    function isBuiltin(wat, className) {
      return objectToString.call(wat) === `[object ${className}]`;
    }
    function isErrorEvent(wat) {
      return isBuiltin(wat, "ErrorEvent");
    }
    function isDOMError(wat) {
      return isBuiltin(wat, "DOMError");
    }
    function isDOMException(wat) {
      return isBuiltin(wat, "DOMException");
    }
    function isString(wat) {
      return isBuiltin(wat, "String");
    }
    function isPrimitive(wat) {
      return wat === null || typeof wat !== "object" && typeof wat !== "function";
    }
    function isPlainObject(wat) {
      return isBuiltin(wat, "Object");
    }
    function isEvent(wat) {
      return typeof Event !== "undefined" && isInstanceOf(wat, Event);
    }
    function isElement(wat) {
      return typeof Element !== "undefined" && isInstanceOf(wat, Element);
    }
    function isRegExp(wat) {
      return isBuiltin(wat, "RegExp");
    }
    function isThenable(wat) {
      return Boolean(wat && wat.then && typeof wat.then === "function");
    }
    function isSyntheticEvent(wat) {
      return isPlainObject(wat) && "nativeEvent" in wat && "preventDefault" in wat && "stopPropagation" in wat;
    }
    function isNaN2(wat) {
      return typeof wat === "number" && wat !== wat;
    }
    function isInstanceOf(wat, base) {
      try {
        return wat instanceof base;
      } catch (_e) {
        return false;
      }
    }
    function isVueViewModel(wat) {
      return !!(typeof wat === "object" && wat !== null && (wat.__isVue || wat._isVue));
    }
    exports.isDOMError = isDOMError;
    exports.isDOMException = isDOMException;
    exports.isElement = isElement;
    exports.isError = isError;
    exports.isErrorEvent = isErrorEvent;
    exports.isEvent = isEvent;
    exports.isInstanceOf = isInstanceOf;
    exports.isNaN = isNaN2;
    exports.isPlainObject = isPlainObject;
    exports.isPrimitive = isPrimitive;
    exports.isRegExp = isRegExp;
    exports.isString = isString;
    exports.isSyntheticEvent = isSyntheticEvent;
    exports.isThenable = isThenable;
    exports.isVueViewModel = isVueViewModel;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/string.js
var require_string = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/string.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var is = require_is();
    function truncate(str, max = 0) {
      if (typeof str !== "string" || max === 0) {
        return str;
      }
      return str.length <= max ? str : `${str.slice(0, max)}...`;
    }
    function snipLine(line, colno) {
      let newLine = line;
      const lineLength = newLine.length;
      if (lineLength <= 150) {
        return newLine;
      }
      if (colno > lineLength) {
        colno = lineLength;
      }
      let start = Math.max(colno - 60, 0);
      if (start < 5) {
        start = 0;
      }
      let end = Math.min(start + 140, lineLength);
      if (end > lineLength - 5) {
        end = lineLength;
      }
      if (end === lineLength) {
        start = Math.max(end - 140, 0);
      }
      newLine = newLine.slice(start, end);
      if (start > 0) {
        newLine = `'{snip} ${newLine}`;
      }
      if (end < lineLength) {
        newLine += " {snip}";
      }
      return newLine;
    }
    function safeJoin(input, delimiter2) {
      if (!Array.isArray(input)) {
        return "";
      }
      const output = [];
      for (let i = 0; i < input.length; i++) {
        const value = input[i];
        try {
          if (is.isVueViewModel(value)) {
            output.push("[VueViewModel]");
          } else {
            output.push(String(value));
          }
        } catch (e2) {
          output.push("[value cannot be serialized]");
        }
      }
      return output.join(delimiter2);
    }
    function isMatchingPattern(value, pattern, requireExactStringMatch = false) {
      if (!is.isString(value)) {
        return false;
      }
      if (is.isRegExp(pattern)) {
        return pattern.test(value);
      }
      if (is.isString(pattern)) {
        return requireExactStringMatch ? value === pattern : value.includes(pattern);
      }
      return false;
    }
    function stringMatchesSomePattern(testString, patterns = [], requireExactStringMatch = false) {
      return patterns.some((pattern) => isMatchingPattern(testString, pattern, requireExactStringMatch));
    }
    exports.isMatchingPattern = isMatchingPattern;
    exports.safeJoin = safeJoin;
    exports.snipLine = snipLine;
    exports.stringMatchesSomePattern = stringMatchesSomePattern;
    exports.truncate = truncate;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/aggregate-errors.js
var require_aggregate_errors = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/aggregate-errors.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var is = require_is();
    var string = require_string();
    function applyAggregateErrorsToEvent(exceptionFromErrorImplementation, parser, maxValueLimit = 250, key, limit, event, hint) {
      if (!event.exception || !event.exception.values || !hint || !is.isInstanceOf(hint.originalException, Error)) {
        return;
      }
      const originalException = event.exception.values.length > 0 ? event.exception.values[event.exception.values.length - 1] : void 0;
      if (originalException) {
        event.exception.values = truncateAggregateExceptions(
          aggregateExceptionsFromError(
            exceptionFromErrorImplementation,
            parser,
            limit,
            hint.originalException,
            key,
            event.exception.values,
            originalException,
            0
          ),
          maxValueLimit
        );
      }
    }
    function aggregateExceptionsFromError(exceptionFromErrorImplementation, parser, limit, error, key, prevExceptions, exception, exceptionId) {
      if (prevExceptions.length >= limit + 1) {
        return prevExceptions;
      }
      let newExceptions = [...prevExceptions];
      if (is.isInstanceOf(error[key], Error)) {
        applyExceptionGroupFieldsForParentException(exception, exceptionId);
        const newException = exceptionFromErrorImplementation(parser, error[key]);
        const newExceptionId = newExceptions.length;
        applyExceptionGroupFieldsForChildException(newException, key, newExceptionId, exceptionId);
        newExceptions = aggregateExceptionsFromError(
          exceptionFromErrorImplementation,
          parser,
          limit,
          error[key],
          key,
          [newException, ...newExceptions],
          newException,
          newExceptionId
        );
      }
      if (Array.isArray(error.errors)) {
        error.errors.forEach((childError, i) => {
          if (is.isInstanceOf(childError, Error)) {
            applyExceptionGroupFieldsForParentException(exception, exceptionId);
            const newException = exceptionFromErrorImplementation(parser, childError);
            const newExceptionId = newExceptions.length;
            applyExceptionGroupFieldsForChildException(newException, `errors[${i}]`, newExceptionId, exceptionId);
            newExceptions = aggregateExceptionsFromError(
              exceptionFromErrorImplementation,
              parser,
              limit,
              childError,
              key,
              [newException, ...newExceptions],
              newException,
              newExceptionId
            );
          }
        });
      }
      return newExceptions;
    }
    function applyExceptionGroupFieldsForParentException(exception, exceptionId) {
      exception.mechanism = exception.mechanism || { type: "generic", handled: true };
      exception.mechanism = {
        ...exception.mechanism,
        is_exception_group: true,
        exception_id: exceptionId
      };
    }
    function applyExceptionGroupFieldsForChildException(exception, source, exceptionId, parentId) {
      exception.mechanism = exception.mechanism || { type: "generic", handled: true };
      exception.mechanism = {
        ...exception.mechanism,
        type: "chained",
        source,
        exception_id: exceptionId,
        parent_id: parentId
      };
    }
    function truncateAggregateExceptions(exceptions, maxValueLength) {
      return exceptions.map((exception) => {
        if (exception.value) {
          exception.value = string.truncate(exception.value, maxValueLength);
        }
        return exception;
      });
    }
    exports.applyAggregateErrorsToEvent = applyAggregateErrorsToEvent;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/worldwide.js
var require_worldwide = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/worldwide.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function isGlobalObj(obj) {
      return obj && obj.Math == Math ? obj : void 0;
    }
    var GLOBAL_OBJ = typeof globalThis == "object" && isGlobalObj(globalThis) || typeof window == "object" && isGlobalObj(window) || typeof self == "object" && isGlobalObj(self) || typeof global == "object" && isGlobalObj(global) || function() {
      return this;
    }() || {};
    function getGlobalObject() {
      return GLOBAL_OBJ;
    }
    function getGlobalSingleton(name, creator, obj) {
      const gbl = obj || GLOBAL_OBJ;
      const __SENTRY__ = gbl.__SENTRY__ = gbl.__SENTRY__ || {};
      const singleton = __SENTRY__[name] || (__SENTRY__[name] = creator());
      return singleton;
    }
    exports.GLOBAL_OBJ = GLOBAL_OBJ;
    exports.getGlobalObject = getGlobalObject;
    exports.getGlobalSingleton = getGlobalSingleton;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/browser.js
var require_browser = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/browser.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var is = require_is();
    var worldwide = require_worldwide();
    var WINDOW = worldwide.getGlobalObject();
    var DEFAULT_MAX_STRING_LENGTH = 80;
    function htmlTreeAsString(elem, options = {}) {
      try {
        let currentElem = elem;
        const MAX_TRAVERSE_HEIGHT = 5;
        const out = [];
        let height = 0;
        let len = 0;
        const separator = " > ";
        const sepLength = separator.length;
        let nextStr;
        const keyAttrs = Array.isArray(options) ? options : options.keyAttrs;
        const maxStringLength = !Array.isArray(options) && options.maxStringLength || DEFAULT_MAX_STRING_LENGTH;
        while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
          nextStr = _htmlElementAsString(currentElem, keyAttrs);
          if (nextStr === "html" || height > 1 && len + out.length * sepLength + nextStr.length >= maxStringLength) {
            break;
          }
          out.push(nextStr);
          len += nextStr.length;
          currentElem = currentElem.parentNode;
        }
        return out.reverse().join(separator);
      } catch (_oO) {
        return "<unknown>";
      }
    }
    function _htmlElementAsString(el, keyAttrs) {
      const elem = el;
      const out = [];
      let className;
      let classes;
      let key;
      let attr;
      let i;
      if (!elem || !elem.tagName) {
        return "";
      }
      out.push(elem.tagName.toLowerCase());
      const keyAttrPairs = keyAttrs && keyAttrs.length ? keyAttrs.filter((keyAttr) => elem.getAttribute(keyAttr)).map((keyAttr) => [keyAttr, elem.getAttribute(keyAttr)]) : null;
      if (keyAttrPairs && keyAttrPairs.length) {
        keyAttrPairs.forEach((keyAttrPair) => {
          out.push(`[${keyAttrPair[0]}="${keyAttrPair[1]}"]`);
        });
      } else {
        if (elem.id) {
          out.push(`#${elem.id}`);
        }
        className = elem.className;
        if (className && is.isString(className)) {
          classes = className.split(/\s+/);
          for (i = 0; i < classes.length; i++) {
            out.push(`.${classes[i]}`);
          }
        }
      }
      const allowedAttrs = ["aria-label", "type", "name", "title", "alt"];
      for (i = 0; i < allowedAttrs.length; i++) {
        key = allowedAttrs[i];
        attr = elem.getAttribute(key);
        if (attr) {
          out.push(`[${key}="${attr}"]`);
        }
      }
      return out.join("");
    }
    function getLocationHref() {
      try {
        return WINDOW.document.location.href;
      } catch (oO) {
        return "";
      }
    }
    function getDomElement(selector) {
      if (WINDOW.document && WINDOW.document.querySelector) {
        return WINDOW.document.querySelector(selector);
      }
      return null;
    }
    exports.getDomElement = getDomElement;
    exports.getLocationHref = getLocationHref;
    exports.htmlTreeAsString = htmlTreeAsString;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/logger.js
var require_logger = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/logger.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var worldwide = require_worldwide();
    var PREFIX = "Sentry Logger ";
    var CONSOLE_LEVELS = ["debug", "info", "warn", "error", "log", "assert", "trace"];
    var originalConsoleMethods = {};
    function consoleSandbox(callback) {
      if (!("console" in worldwide.GLOBAL_OBJ)) {
        return callback();
      }
      const console2 = worldwide.GLOBAL_OBJ.console;
      const wrappedFuncs = {};
      const wrappedLevels = Object.keys(originalConsoleMethods);
      wrappedLevels.forEach((level) => {
        const originalConsoleMethod = originalConsoleMethods[level];
        wrappedFuncs[level] = console2[level];
        console2[level] = originalConsoleMethod;
      });
      try {
        return callback();
      } finally {
        wrappedLevels.forEach((level) => {
          console2[level] = wrappedFuncs[level];
        });
      }
    }
    function makeLogger() {
      let enabled = false;
      const logger2 = {
        enable: () => {
          enabled = true;
        },
        disable: () => {
          enabled = false;
        }
      };
      if (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) {
        CONSOLE_LEVELS.forEach((name) => {
          logger2[name] = (...args) => {
            if (enabled) {
              consoleSandbox(() => {
                worldwide.GLOBAL_OBJ.console[name](`${PREFIX}[${name}]:`, ...args);
              });
            }
          };
        });
      } else {
        CONSOLE_LEVELS.forEach((name) => {
          logger2[name] = () => void 0;
        });
      }
      return logger2;
    }
    var logger = makeLogger();
    exports.CONSOLE_LEVELS = CONSOLE_LEVELS;
    exports.consoleSandbox = consoleSandbox;
    exports.logger = logger;
    exports.originalConsoleMethods = originalConsoleMethods;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/dsn.js
var require_dsn = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/dsn.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var logger = require_logger();
    var DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
    function isValidProtocol(protocol) {
      return protocol === "http" || protocol === "https";
    }
    function dsnToString(dsn, withPassword = false) {
      const { host, path: path6, pass, port, projectId, protocol, publicKey } = dsn;
      return `${protocol}://${publicKey}${withPassword && pass ? `:${pass}` : ""}@${host}${port ? `:${port}` : ""}/${path6 ? `${path6}/` : path6}${projectId}`;
    }
    function dsnFromString(str) {
      const match = DSN_REGEX.exec(str);
      if (!match) {
        console.error(`Invalid Sentry Dsn: ${str}`);
        return void 0;
      }
      const [protocol, publicKey, pass = "", host, port = "", lastPath] = match.slice(1);
      let path6 = "";
      let projectId = lastPath;
      const split = projectId.split("/");
      if (split.length > 1) {
        path6 = split.slice(0, -1).join("/");
        projectId = split.pop();
      }
      if (projectId) {
        const projectMatch = projectId.match(/^\d+/);
        if (projectMatch) {
          projectId = projectMatch[0];
        }
      }
      return dsnFromComponents({ host, pass, path: path6, projectId, port, protocol, publicKey });
    }
    function dsnFromComponents(components) {
      return {
        protocol: components.protocol,
        publicKey: components.publicKey || "",
        pass: components.pass || "",
        host: components.host,
        port: components.port || "",
        path: components.path || "",
        projectId: components.projectId
      };
    }
    function validateDsn(dsn) {
      if (!(typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__)) {
        return true;
      }
      const { port, projectId, protocol } = dsn;
      const requiredComponents = ["protocol", "publicKey", "host", "projectId"];
      const hasMissingRequiredComponent = requiredComponents.find((component) => {
        if (!dsn[component]) {
          logger.logger.error(`Invalid Sentry Dsn: ${component} missing`);
          return true;
        }
        return false;
      });
      if (hasMissingRequiredComponent) {
        return false;
      }
      if (!projectId.match(/^\d+$/)) {
        logger.logger.error(`Invalid Sentry Dsn: Invalid projectId ${projectId}`);
        return false;
      }
      if (!isValidProtocol(protocol)) {
        logger.logger.error(`Invalid Sentry Dsn: Invalid protocol ${protocol}`);
        return false;
      }
      if (port && isNaN(parseInt(port, 10))) {
        logger.logger.error(`Invalid Sentry Dsn: Invalid port ${port}`);
        return false;
      }
      return true;
    }
    function makeDsn(from) {
      const components = typeof from === "string" ? dsnFromString(from) : dsnFromComponents(from);
      if (!components || !validateDsn(components)) {
        return void 0;
      }
      return components;
    }
    exports.dsnFromString = dsnFromString;
    exports.dsnToString = dsnToString;
    exports.makeDsn = makeDsn;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/error.js
var require_error = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/error.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var SentryError = class extends Error {
      constructor(message, logLevel = "warn") {
        super(message);
        this.message = message;
        this.name = new.target.prototype.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
        this.logLevel = logLevel;
      }
    };
    exports.SentryError = SentryError;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/object.js
var require_object = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/object.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var browser = require_browser();
    var is = require_is();
    var string = require_string();
    function fill(source, name, replacementFactory) {
      if (!(name in source)) {
        return;
      }
      const original = source[name];
      const wrapped = replacementFactory(original);
      if (typeof wrapped === "function") {
        try {
          markFunctionWrapped(wrapped, original);
        } catch (_Oo) {
        }
      }
      source[name] = wrapped;
    }
    function addNonEnumerableProperty(obj, name, value) {
      Object.defineProperty(obj, name, {
        value,
        writable: true,
        configurable: true
      });
    }
    function markFunctionWrapped(wrapped, original) {
      const proto2 = original.prototype || {};
      wrapped.prototype = original.prototype = proto2;
      addNonEnumerableProperty(wrapped, "__sentry_original__", original);
    }
    function getOriginalFunction(func) {
      return func.__sentry_original__;
    }
    function urlEncode(object) {
      return Object.keys(object).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`).join("&");
    }
    function convertToPlainObject(value) {
      if (is.isError(value)) {
        return {
          message: value.message,
          name: value.name,
          stack: value.stack,
          ...getOwnProperties(value)
        };
      } else if (is.isEvent(value)) {
        const newObj = {
          type: value.type,
          target: serializeEventTarget(value.target),
          currentTarget: serializeEventTarget(value.currentTarget),
          ...getOwnProperties(value)
        };
        if (typeof CustomEvent !== "undefined" && is.isInstanceOf(value, CustomEvent)) {
          newObj.detail = value.detail;
        }
        return newObj;
      } else {
        return value;
      }
    }
    function serializeEventTarget(target) {
      try {
        return is.isElement(target) ? browser.htmlTreeAsString(target) : Object.prototype.toString.call(target);
      } catch (_oO) {
        return "<unknown>";
      }
    }
    function getOwnProperties(obj) {
      if (typeof obj === "object" && obj !== null) {
        const extractedProps = {};
        for (const property in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, property)) {
            extractedProps[property] = obj[property];
          }
        }
        return extractedProps;
      } else {
        return {};
      }
    }
    function extractExceptionKeysForMessage(exception, maxLength = 40) {
      const keys = Object.keys(convertToPlainObject(exception));
      keys.sort();
      if (!keys.length) {
        return "[object has no keys]";
      }
      if (keys[0].length >= maxLength) {
        return string.truncate(keys[0], maxLength);
      }
      for (let includedKeys = keys.length; includedKeys > 0; includedKeys--) {
        const serialized = keys.slice(0, includedKeys).join(", ");
        if (serialized.length > maxLength) {
          continue;
        }
        if (includedKeys === keys.length) {
          return serialized;
        }
        return string.truncate(serialized, maxLength);
      }
      return "";
    }
    function dropUndefinedKeys(inputValue) {
      const memoizationMap = /* @__PURE__ */ new Map();
      return _dropUndefinedKeys(inputValue, memoizationMap);
    }
    function _dropUndefinedKeys(inputValue, memoizationMap) {
      if (is.isPlainObject(inputValue)) {
        const memoVal = memoizationMap.get(inputValue);
        if (memoVal !== void 0) {
          return memoVal;
        }
        const returnValue = {};
        memoizationMap.set(inputValue, returnValue);
        for (const key of Object.keys(inputValue)) {
          if (typeof inputValue[key] !== "undefined") {
            returnValue[key] = _dropUndefinedKeys(inputValue[key], memoizationMap);
          }
        }
        return returnValue;
      }
      if (Array.isArray(inputValue)) {
        const memoVal = memoizationMap.get(inputValue);
        if (memoVal !== void 0) {
          return memoVal;
        }
        const returnValue = [];
        memoizationMap.set(inputValue, returnValue);
        inputValue.forEach((item2) => {
          returnValue.push(_dropUndefinedKeys(item2, memoizationMap));
        });
        return returnValue;
      }
      return inputValue;
    }
    function objectify(wat) {
      let objectified;
      switch (true) {
        case (wat === void 0 || wat === null):
          objectified = new String(wat);
          break;
        case (typeof wat === "symbol" || typeof wat === "bigint"):
          objectified = Object(wat);
          break;
        case is.isPrimitive(wat):
          objectified = new wat.constructor(wat);
          break;
        default:
          objectified = wat;
          break;
      }
      return objectified;
    }
    exports.addNonEnumerableProperty = addNonEnumerableProperty;
    exports.convertToPlainObject = convertToPlainObject;
    exports.dropUndefinedKeys = dropUndefinedKeys;
    exports.extractExceptionKeysForMessage = extractExceptionKeysForMessage;
    exports.fill = fill;
    exports.getOriginalFunction = getOriginalFunction;
    exports.markFunctionWrapped = markFunctionWrapped;
    exports.objectify = objectify;
    exports.urlEncode = urlEncode;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/node-stack-trace.js
var require_node_stack_trace = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/node-stack-trace.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function node(getModule) {
      const FILENAME_MATCH = /^\s*[-]{4,}$/;
      const FULL_MATCH = /at (?:async )?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/;
      return (line) => {
        const lineMatch = line.match(FULL_MATCH);
        if (lineMatch) {
          let object;
          let method;
          let functionName;
          let typeName;
          let methodName;
          if (lineMatch[1]) {
            functionName = lineMatch[1];
            let methodStart = functionName.lastIndexOf(".");
            if (functionName[methodStart - 1] === ".") {
              methodStart--;
            }
            if (methodStart > 0) {
              object = functionName.slice(0, methodStart);
              method = functionName.slice(methodStart + 1);
              const objectEnd = object.indexOf(".Module");
              if (objectEnd > 0) {
                functionName = functionName.slice(objectEnd + 1);
                object = object.slice(0, objectEnd);
              }
            }
            typeName = void 0;
          }
          if (method) {
            typeName = object;
            methodName = method;
          }
          if (method === "<anonymous>") {
            methodName = void 0;
            functionName = void 0;
          }
          if (functionName === void 0) {
            methodName = methodName || "<anonymous>";
            functionName = typeName ? `${typeName}.${methodName}` : methodName;
          }
          let filename = lineMatch[2] && lineMatch[2].startsWith("file://") ? lineMatch[2].slice(7) : lineMatch[2];
          const isNative = lineMatch[5] === "native";
          if (!filename && lineMatch[5] && !isNative) {
            filename = lineMatch[5];
          }
          const isInternal = isNative || filename && !filename.startsWith("/") && !filename.includes(":\\") && !filename.startsWith(".") && !filename.match(/^[a-zA-Z]([a-zA-Z0-9.\-+])*:\/\//);
          const in_app = !isInternal && filename !== void 0 && !filename.includes("node_modules/");
          return {
            filename,
            module: getModule ? getModule(filename) : void 0,
            function: functionName,
            lineno: parseInt(lineMatch[3], 10) || void 0,
            colno: parseInt(lineMatch[4], 10) || void 0,
            in_app
          };
        }
        if (line.match(FILENAME_MATCH)) {
          return {
            filename: line
          };
        }
        return void 0;
      };
    }
    exports.node = node;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/stacktrace.js
var require_stacktrace = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/stacktrace.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var nodeStackTrace = require_node_stack_trace();
    var STACKTRACE_FRAME_LIMIT = 50;
    var WEBPACK_ERROR_REGEXP = /\(error: (.*)\)/;
    var STRIP_FRAME_REGEXP = /captureMessage|captureException/;
    function createStackParser(...parsers) {
      const sortedParsers = parsers.sort((a2, b3) => a2[0] - b3[0]).map((p2) => p2[1]);
      return (stack, skipFirst = 0) => {
        const frames = [];
        const lines2 = stack.split("\n");
        for (let i = skipFirst; i < lines2.length; i++) {
          const line = lines2[i];
          if (line.length > 1024) {
            continue;
          }
          const cleanedLine = WEBPACK_ERROR_REGEXP.test(line) ? line.replace(WEBPACK_ERROR_REGEXP, "$1") : line;
          if (cleanedLine.match(/\S*Error: /)) {
            continue;
          }
          for (const parser of sortedParsers) {
            const frame = parser(cleanedLine);
            if (frame) {
              frames.push(frame);
              break;
            }
          }
          if (frames.length >= STACKTRACE_FRAME_LIMIT) {
            break;
          }
        }
        return stripSentryFramesAndReverse(frames);
      };
    }
    function stackParserFromStackParserOptions(stackParser) {
      if (Array.isArray(stackParser)) {
        return createStackParser(...stackParser);
      }
      return stackParser;
    }
    function stripSentryFramesAndReverse(stack) {
      if (!stack.length) {
        return [];
      }
      const localStack = Array.from(stack);
      if (/sentryWrapped/.test(localStack[localStack.length - 1].function || "")) {
        localStack.pop();
      }
      localStack.reverse();
      if (STRIP_FRAME_REGEXP.test(localStack[localStack.length - 1].function || "")) {
        localStack.pop();
        if (STRIP_FRAME_REGEXP.test(localStack[localStack.length - 1].function || "")) {
          localStack.pop();
        }
      }
      return localStack.slice(0, STACKTRACE_FRAME_LIMIT).map((frame) => ({
        ...frame,
        filename: frame.filename || localStack[localStack.length - 1].filename,
        function: frame.function || "?"
      }));
    }
    var defaultFunctionName = "<anonymous>";
    function getFunctionName(fn) {
      try {
        if (!fn || typeof fn !== "function") {
          return defaultFunctionName;
        }
        return fn.name || defaultFunctionName;
      } catch (e2) {
        return defaultFunctionName;
      }
    }
    function nodeStackLineParser(getModule) {
      return [90, nodeStackTrace.node(getModule)];
    }
    exports.createStackParser = createStackParser;
    exports.getFunctionName = getFunctionName;
    exports.nodeStackLineParser = nodeStackLineParser;
    exports.stackParserFromStackParserOptions = stackParserFromStackParserOptions;
    exports.stripSentryFramesAndReverse = stripSentryFramesAndReverse;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/supports.js
var require_supports = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/supports.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var logger = require_logger();
    var worldwide = require_worldwide();
    var WINDOW = worldwide.getGlobalObject();
    function supportsErrorEvent() {
      try {
        new ErrorEvent("");
        return true;
      } catch (e2) {
        return false;
      }
    }
    function supportsDOMError() {
      try {
        new DOMError("");
        return true;
      } catch (e2) {
        return false;
      }
    }
    function supportsDOMException() {
      try {
        new DOMException("");
        return true;
      } catch (e2) {
        return false;
      }
    }
    function supportsFetch() {
      if (!("fetch" in WINDOW)) {
        return false;
      }
      try {
        new Headers();
        new Request("http://www.example.com");
        new Response();
        return true;
      } catch (e2) {
        return false;
      }
    }
    function isNativeFetch(func) {
      return func && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
    }
    function supportsNativeFetch() {
      if (!supportsFetch()) {
        return false;
      }
      if (isNativeFetch(WINDOW.fetch)) {
        return true;
      }
      let result = false;
      const doc = WINDOW.document;
      if (doc && typeof doc.createElement === "function") {
        try {
          const sandbox = doc.createElement("iframe");
          sandbox.hidden = true;
          doc.head.appendChild(sandbox);
          if (sandbox.contentWindow && sandbox.contentWindow.fetch) {
            result = isNativeFetch(sandbox.contentWindow.fetch);
          }
          doc.head.removeChild(sandbox);
        } catch (err) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.logger.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", err);
        }
      }
      return result;
    }
    function supportsReportingObserver() {
      return "ReportingObserver" in WINDOW;
    }
    function supportsReferrerPolicy() {
      if (!supportsFetch()) {
        return false;
      }
      try {
        new Request("_", {
          referrerPolicy: "origin"
        });
        return true;
      } catch (e2) {
        return false;
      }
    }
    exports.isNativeFetch = isNativeFetch;
    exports.supportsDOMError = supportsDOMError;
    exports.supportsDOMException = supportsDOMException;
    exports.supportsErrorEvent = supportsErrorEvent;
    exports.supportsFetch = supportsFetch;
    exports.supportsNativeFetch = supportsNativeFetch;
    exports.supportsReferrerPolicy = supportsReferrerPolicy;
    exports.supportsReportingObserver = supportsReportingObserver;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/vendor/supportsHistory.js
var require_supportsHistory = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/vendor/supportsHistory.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var worldwide = require_worldwide();
    var WINDOW = worldwide.getGlobalObject();
    function supportsHistory() {
      const chrome = WINDOW.chrome;
      const isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
      const hasHistoryApi = "history" in WINDOW && !!WINDOW.history.pushState && !!WINDOW.history.replaceState;
      return !isChromePackagedApp && hasHistoryApi;
    }
    exports.supportsHistory = supportsHistory;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/instrument.js
var require_instrument = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/instrument.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var is = require_is();
    var logger = require_logger();
    var object = require_object();
    var stacktrace = require_stacktrace();
    var supports = require_supports();
    var worldwide = require_worldwide();
    var supportsHistory = require_supportsHistory();
    var WINDOW = worldwide.getGlobalObject();
    var SENTRY_XHR_DATA_KEY = "__sentry_xhr_v2__";
    var handlers = {};
    var instrumented = {};
    function instrument(type) {
      if (instrumented[type]) {
        return;
      }
      instrumented[type] = true;
      switch (type) {
        case "console":
          instrumentConsole();
          break;
        case "dom":
          instrumentDOM();
          break;
        case "xhr":
          instrumentXHR();
          break;
        case "fetch":
          instrumentFetch();
          break;
        case "history":
          instrumentHistory();
          break;
        case "error":
          instrumentError();
          break;
        case "unhandledrejection":
          instrumentUnhandledRejection();
          break;
        default:
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.logger.warn("unknown instrumentation type:", type);
          return;
      }
    }
    function addInstrumentationHandler(type, callback) {
      handlers[type] = handlers[type] || [];
      handlers[type].push(callback);
      instrument(type);
    }
    function resetInstrumentationHandlers() {
      Object.keys(handlers).forEach((key) => {
        handlers[key] = void 0;
      });
    }
    function triggerHandlers(type, data) {
      if (!type || !handlers[type]) {
        return;
      }
      for (const handler of handlers[type] || []) {
        try {
          handler(data);
        } catch (e2) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.logger.error(
            `Error while triggering instrumentation handler.
Type: ${type}
Name: ${stacktrace.getFunctionName(handler)}
Error:`,
            e2
          );
        }
      }
    }
    function instrumentConsole() {
      if (!("console" in worldwide.GLOBAL_OBJ)) {
        return;
      }
      logger.CONSOLE_LEVELS.forEach(function(level) {
        if (!(level in worldwide.GLOBAL_OBJ.console)) {
          return;
        }
        object.fill(worldwide.GLOBAL_OBJ.console, level, function(originalConsoleMethod) {
          logger.originalConsoleMethods[level] = originalConsoleMethod;
          return function(...args) {
            triggerHandlers("console", { args, level });
            const log = logger.originalConsoleMethods[level];
            log && log.apply(worldwide.GLOBAL_OBJ.console, args);
          };
        });
      });
    }
    function instrumentFetch() {
      if (!supports.supportsNativeFetch()) {
        return;
      }
      object.fill(worldwide.GLOBAL_OBJ, "fetch", function(originalFetch) {
        return function(...args) {
          const { method, url: url2 } = parseFetchArgs(args);
          const handlerData = {
            args,
            fetchData: {
              method,
              url: url2
            },
            startTimestamp: Date.now()
          };
          triggerHandlers("fetch", {
            ...handlerData
          });
          return originalFetch.apply(worldwide.GLOBAL_OBJ, args).then(
            (response) => {
              triggerHandlers("fetch", {
                ...handlerData,
                endTimestamp: Date.now(),
                response
              });
              return response;
            },
            (error) => {
              triggerHandlers("fetch", {
                ...handlerData,
                endTimestamp: Date.now(),
                error
              });
              throw error;
            }
          );
        };
      });
    }
    function hasProp(obj, prop) {
      return !!obj && typeof obj === "object" && !!obj[prop];
    }
    function getUrlFromResource(resource) {
      if (typeof resource === "string") {
        return resource;
      }
      if (!resource) {
        return "";
      }
      if (hasProp(resource, "url")) {
        return resource.url;
      }
      if (resource.toString) {
        return resource.toString();
      }
      return "";
    }
    function parseFetchArgs(fetchArgs) {
      if (fetchArgs.length === 0) {
        return { method: "GET", url: "" };
      }
      if (fetchArgs.length === 2) {
        const [url2, options] = fetchArgs;
        return {
          url: getUrlFromResource(url2),
          method: hasProp(options, "method") ? String(options.method).toUpperCase() : "GET"
        };
      }
      const arg = fetchArgs[0];
      return {
        url: getUrlFromResource(arg),
        method: hasProp(arg, "method") ? String(arg.method).toUpperCase() : "GET"
      };
    }
    function instrumentXHR() {
      if (!WINDOW.XMLHttpRequest) {
        return;
      }
      const xhrproto = XMLHttpRequest.prototype;
      object.fill(xhrproto, "open", function(originalOpen) {
        return function(...args) {
          const url2 = args[1];
          const xhrInfo = this[SENTRY_XHR_DATA_KEY] = {
            method: is.isString(args[0]) ? args[0].toUpperCase() : args[0],
            url: args[1],
            request_headers: {}
          };
          if (is.isString(url2) && xhrInfo.method === "POST" && url2.match(/sentry_key/)) {
            this.__sentry_own_request__ = true;
          }
          const onreadystatechangeHandler = () => {
            const xhrInfo2 = this[SENTRY_XHR_DATA_KEY];
            if (!xhrInfo2) {
              return;
            }
            if (this.readyState === 4) {
              try {
                xhrInfo2.status_code = this.status;
              } catch (e2) {
              }
              triggerHandlers("xhr", {
                args,
                endTimestamp: Date.now(),
                startTimestamp: Date.now(),
                xhr: this
              });
            }
          };
          if ("onreadystatechange" in this && typeof this.onreadystatechange === "function") {
            object.fill(this, "onreadystatechange", function(original) {
              return function(...readyStateArgs) {
                onreadystatechangeHandler();
                return original.apply(this, readyStateArgs);
              };
            });
          } else {
            this.addEventListener("readystatechange", onreadystatechangeHandler);
          }
          object.fill(this, "setRequestHeader", function(original) {
            return function(...setRequestHeaderArgs) {
              const [header, value] = setRequestHeaderArgs;
              const xhrInfo2 = this[SENTRY_XHR_DATA_KEY];
              if (xhrInfo2) {
                xhrInfo2.request_headers[header.toLowerCase()] = value;
              }
              return original.apply(this, setRequestHeaderArgs);
            };
          });
          return originalOpen.apply(this, args);
        };
      });
      object.fill(xhrproto, "send", function(originalSend) {
        return function(...args) {
          const sentryXhrData = this[SENTRY_XHR_DATA_KEY];
          if (sentryXhrData && args[0] !== void 0) {
            sentryXhrData.body = args[0];
          }
          triggerHandlers("xhr", {
            args,
            startTimestamp: Date.now(),
            xhr: this
          });
          return originalSend.apply(this, args);
        };
      });
    }
    var lastHref;
    function instrumentHistory() {
      if (!supportsHistory.supportsHistory()) {
        return;
      }
      const oldOnPopState = WINDOW.onpopstate;
      WINDOW.onpopstate = function(...args) {
        const to = WINDOW.location.href;
        const from = lastHref;
        lastHref = to;
        triggerHandlers("history", {
          from,
          to
        });
        if (oldOnPopState) {
          try {
            return oldOnPopState.apply(this, args);
          } catch (_oO) {
          }
        }
      };
      function historyReplacementFunction(originalHistoryFunction) {
        return function(...args) {
          const url2 = args.length > 2 ? args[2] : void 0;
          if (url2) {
            const from = lastHref;
            const to = String(url2);
            lastHref = to;
            triggerHandlers("history", {
              from,
              to
            });
          }
          return originalHistoryFunction.apply(this, args);
        };
      }
      object.fill(WINDOW.history, "pushState", historyReplacementFunction);
      object.fill(WINDOW.history, "replaceState", historyReplacementFunction);
    }
    var debounceDuration = 1e3;
    var debounceTimerID;
    var lastCapturedEvent;
    function shouldShortcircuitPreviousDebounce(previous, current) {
      if (!previous) {
        return true;
      }
      if (previous.type !== current.type) {
        return true;
      }
      try {
        if (previous.target !== current.target) {
          return true;
        }
      } catch (e2) {
      }
      return false;
    }
    function shouldSkipDOMEvent(event) {
      if (event.type !== "keypress") {
        return false;
      }
      try {
        const target = event.target;
        if (!target || !target.tagName) {
          return true;
        }
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
          return false;
        }
      } catch (e2) {
      }
      return true;
    }
    function makeDOMEventHandler(handler, globalListener = false) {
      return (event) => {
        if (!event || lastCapturedEvent === event) {
          return;
        }
        if (shouldSkipDOMEvent(event)) {
          return;
        }
        const name = event.type === "keypress" ? "input" : event.type;
        if (debounceTimerID === void 0) {
          handler({
            event,
            name,
            global: globalListener
          });
          lastCapturedEvent = event;
        } else if (shouldShortcircuitPreviousDebounce(lastCapturedEvent, event)) {
          handler({
            event,
            name,
            global: globalListener
          });
          lastCapturedEvent = event;
        }
        clearTimeout(debounceTimerID);
        debounceTimerID = WINDOW.setTimeout(() => {
          debounceTimerID = void 0;
        }, debounceDuration);
      };
    }
    function instrumentDOM() {
      if (!WINDOW.document) {
        return;
      }
      const triggerDOMHandler = triggerHandlers.bind(null, "dom");
      const globalDOMEventHandler = makeDOMEventHandler(triggerDOMHandler, true);
      WINDOW.document.addEventListener("click", globalDOMEventHandler, false);
      WINDOW.document.addEventListener("keypress", globalDOMEventHandler, false);
      ["EventTarget", "Node"].forEach((target) => {
        const proto2 = WINDOW[target] && WINDOW[target].prototype;
        if (!proto2 || !proto2.hasOwnProperty || !proto2.hasOwnProperty("addEventListener")) {
          return;
        }
        object.fill(proto2, "addEventListener", function(originalAddEventListener) {
          return function(type, listener, options) {
            if (type === "click" || type == "keypress") {
              try {
                const el = this;
                const handlers2 = el.__sentry_instrumentation_handlers__ = el.__sentry_instrumentation_handlers__ || {};
                const handlerForType = handlers2[type] = handlers2[type] || { refCount: 0 };
                if (!handlerForType.handler) {
                  const handler = makeDOMEventHandler(triggerDOMHandler);
                  handlerForType.handler = handler;
                  originalAddEventListener.call(this, type, handler, options);
                }
                handlerForType.refCount++;
              } catch (e2) {
              }
            }
            return originalAddEventListener.call(this, type, listener, options);
          };
        });
        object.fill(
          proto2,
          "removeEventListener",
          function(originalRemoveEventListener) {
            return function(type, listener, options) {
              if (type === "click" || type == "keypress") {
                try {
                  const el = this;
                  const handlers2 = el.__sentry_instrumentation_handlers__ || {};
                  const handlerForType = handlers2[type];
                  if (handlerForType) {
                    handlerForType.refCount--;
                    if (handlerForType.refCount <= 0) {
                      originalRemoveEventListener.call(this, type, handlerForType.handler, options);
                      handlerForType.handler = void 0;
                      delete handlers2[type];
                    }
                    if (Object.keys(handlers2).length === 0) {
                      delete el.__sentry_instrumentation_handlers__;
                    }
                  }
                } catch (e2) {
                }
              }
              return originalRemoveEventListener.call(this, type, listener, options);
            };
          }
        );
      });
    }
    var _oldOnErrorHandler = null;
    function instrumentError() {
      _oldOnErrorHandler = WINDOW.onerror;
      WINDOW.onerror = function(msg, url2, line, column, error) {
        triggerHandlers("error", {
          column,
          error,
          line,
          msg,
          url: url2
        });
        if (_oldOnErrorHandler && !_oldOnErrorHandler.__SENTRY_LOADER__) {
          return _oldOnErrorHandler.apply(this, arguments);
        }
        return false;
      };
      WINDOW.onerror.__SENTRY_INSTRUMENTED__ = true;
    }
    var _oldOnUnhandledRejectionHandler = null;
    function instrumentUnhandledRejection() {
      _oldOnUnhandledRejectionHandler = WINDOW.onunhandledrejection;
      WINDOW.onunhandledrejection = function(e2) {
        triggerHandlers("unhandledrejection", e2);
        if (_oldOnUnhandledRejectionHandler && !_oldOnUnhandledRejectionHandler.__SENTRY_LOADER__) {
          return _oldOnUnhandledRejectionHandler.apply(this, arguments);
        }
        return true;
      };
      WINDOW.onunhandledrejection.__SENTRY_INSTRUMENTED__ = true;
    }
    exports.SENTRY_XHR_DATA_KEY = SENTRY_XHR_DATA_KEY;
    exports.addInstrumentationHandler = addInstrumentationHandler;
    exports.instrumentDOM = instrumentDOM;
    exports.instrumentXHR = instrumentXHR;
    exports.parseFetchArgs = parseFetchArgs;
    exports.resetInstrumentationHandlers = resetInstrumentationHandlers;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/memo.js
var require_memo = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/memo.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function memoBuilder() {
      const hasWeakSet = typeof WeakSet === "function";
      const inner = hasWeakSet ? /* @__PURE__ */ new WeakSet() : [];
      function memoize(obj) {
        if (hasWeakSet) {
          if (inner.has(obj)) {
            return true;
          }
          inner.add(obj);
          return false;
        }
        for (let i = 0; i < inner.length; i++) {
          const value = inner[i];
          if (value === obj) {
            return true;
          }
        }
        inner.push(obj);
        return false;
      }
      function unmemoize(obj) {
        if (hasWeakSet) {
          inner.delete(obj);
        } else {
          for (let i = 0; i < inner.length; i++) {
            if (inner[i] === obj) {
              inner.splice(i, 1);
              break;
            }
          }
        }
      }
      return [memoize, unmemoize];
    }
    exports.memoBuilder = memoBuilder;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/misc.js
var require_misc = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/misc.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var object = require_object();
    var string = require_string();
    var worldwide = require_worldwide();
    function uuid4() {
      const gbl = worldwide.GLOBAL_OBJ;
      const crypto = gbl.crypto || gbl.msCrypto;
      let getRandomByte = () => Math.random() * 16;
      try {
        if (crypto && crypto.randomUUID) {
          return crypto.randomUUID().replace(/-/g, "");
        }
        if (crypto && crypto.getRandomValues) {
          getRandomByte = () => crypto.getRandomValues(new Uint8Array(1))[0];
        }
      } catch (_3) {
      }
      return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(
        /[018]/g,
        (c3) => (c3 ^ (getRandomByte() & 15) >> c3 / 4).toString(16)
      );
    }
    function getFirstException(event) {
      return event.exception && event.exception.values ? event.exception.values[0] : void 0;
    }
    function getEventDescription(event) {
      const { message, event_id: eventId } = event;
      if (message) {
        return message;
      }
      const firstException = getFirstException(event);
      if (firstException) {
        if (firstException.type && firstException.value) {
          return `${firstException.type}: ${firstException.value}`;
        }
        return firstException.type || firstException.value || eventId || "<unknown>";
      }
      return eventId || "<unknown>";
    }
    function addExceptionTypeValue(event, value, type) {
      const exception = event.exception = event.exception || {};
      const values = exception.values = exception.values || [];
      const firstException = values[0] = values[0] || {};
      if (!firstException.value) {
        firstException.value = value || "";
      }
      if (!firstException.type) {
        firstException.type = type || "Error";
      }
    }
    function addExceptionMechanism(event, newMechanism) {
      const firstException = getFirstException(event);
      if (!firstException) {
        return;
      }
      const defaultMechanism = { type: "generic", handled: true };
      const currentMechanism = firstException.mechanism;
      firstException.mechanism = { ...defaultMechanism, ...currentMechanism, ...newMechanism };
      if (newMechanism && "data" in newMechanism) {
        const mergedData = { ...currentMechanism && currentMechanism.data, ...newMechanism.data };
        firstException.mechanism.data = mergedData;
      }
    }
    var SEMVER_REGEXP = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
    function parseSemver(input) {
      const match = input.match(SEMVER_REGEXP) || [];
      const major = parseInt(match[1], 10);
      const minor = parseInt(match[2], 10);
      const patch = parseInt(match[3], 10);
      return {
        buildmetadata: match[5],
        major: isNaN(major) ? void 0 : major,
        minor: isNaN(minor) ? void 0 : minor,
        patch: isNaN(patch) ? void 0 : patch,
        prerelease: match[4]
      };
    }
    function addContextToFrame(lines2, frame, linesOfContext = 5) {
      if (frame.lineno === void 0) {
        return;
      }
      const maxLines = lines2.length;
      const sourceLine = Math.max(Math.min(maxLines - 1, frame.lineno - 1), 0);
      frame.pre_context = lines2.slice(Math.max(0, sourceLine - linesOfContext), sourceLine).map((line) => string.snipLine(line, 0));
      frame.context_line = string.snipLine(lines2[Math.min(maxLines - 1, sourceLine)], frame.colno || 0);
      frame.post_context = lines2.slice(Math.min(sourceLine + 1, maxLines), sourceLine + 1 + linesOfContext).map((line) => string.snipLine(line, 0));
    }
    function checkOrSetAlreadyCaught(exception) {
      if (exception && exception.__sentry_captured__) {
        return true;
      }
      try {
        object.addNonEnumerableProperty(exception, "__sentry_captured__", true);
      } catch (err) {
      }
      return false;
    }
    function arrayify(maybeArray) {
      return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
    }
    exports.addContextToFrame = addContextToFrame;
    exports.addExceptionMechanism = addExceptionMechanism;
    exports.addExceptionTypeValue = addExceptionTypeValue;
    exports.arrayify = arrayify;
    exports.checkOrSetAlreadyCaught = checkOrSetAlreadyCaught;
    exports.getEventDescription = getEventDescription;
    exports.parseSemver = parseSemver;
    exports.uuid4 = uuid4;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/env.js
var require_env = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/env.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function isBrowserBundle() {
      return typeof __SENTRY_BROWSER_BUNDLE__ !== "undefined" && !!__SENTRY_BROWSER_BUNDLE__;
    }
    function getSDKSource() {
      return "npm";
    }
    exports.getSDKSource = getSDKSource;
    exports.isBrowserBundle = isBrowserBundle;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/node.js
var require_node = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/node.js"(exports, module2) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var env3 = require_env();
    function isNodeEnv() {
      return !env3.isBrowserBundle() && Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
    }
    function dynamicRequire(mod, request) {
      return mod.require(request);
    }
    function loadModule(moduleName) {
      let mod;
      try {
        mod = dynamicRequire(module2, moduleName);
      } catch (e2) {
      }
      try {
        const { cwd } = dynamicRequire(module2, "process");
        mod = dynamicRequire(module2, `${cwd()}/node_modules/${moduleName}`);
      } catch (e2) {
      }
      return mod;
    }
    exports.dynamicRequire = dynamicRequire;
    exports.isNodeEnv = isNodeEnv;
    exports.loadModule = loadModule;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/normalize.js
var require_normalize = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/normalize.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var is = require_is();
    var memo = require_memo();
    var object = require_object();
    var stacktrace = require_stacktrace();
    function normalize(input, depth = 100, maxProperties = Infinity) {
      try {
        return visit("", input, depth, maxProperties);
      } catch (err) {
        return { ERROR: `**non-serializable** (${err})` };
      }
    }
    function normalizeToSize(object2, depth = 3, maxSize = 100 * 1024) {
      const normalized = normalize(object2, depth);
      if (jsonSize(normalized) > maxSize) {
        return normalizeToSize(object2, depth - 1, maxSize);
      }
      return normalized;
    }
    function visit(key, value, depth = Infinity, maxProperties = Infinity, memo$1 = memo.memoBuilder()) {
      const [memoize, unmemoize] = memo$1;
      if (value == null || ["number", "boolean", "string"].includes(typeof value) && !is.isNaN(value)) {
        return value;
      }
      const stringified = stringifyValue(key, value);
      if (!stringified.startsWith("[object ")) {
        return stringified;
      }
      if (value["__sentry_skip_normalization__"]) {
        return value;
      }
      const remainingDepth = typeof value["__sentry_override_normalization_depth__"] === "number" ? value["__sentry_override_normalization_depth__"] : depth;
      if (remainingDepth === 0) {
        return stringified.replace("object ", "");
      }
      if (memoize(value)) {
        return "[Circular ~]";
      }
      const valueWithToJSON = value;
      if (valueWithToJSON && typeof valueWithToJSON.toJSON === "function") {
        try {
          const jsonValue = valueWithToJSON.toJSON();
          return visit("", jsonValue, remainingDepth - 1, maxProperties, memo$1);
        } catch (err) {
        }
      }
      const normalized = Array.isArray(value) ? [] : {};
      let numAdded = 0;
      const visitable = object.convertToPlainObject(value);
      for (const visitKey in visitable) {
        if (!Object.prototype.hasOwnProperty.call(visitable, visitKey)) {
          continue;
        }
        if (numAdded >= maxProperties) {
          normalized[visitKey] = "[MaxProperties ~]";
          break;
        }
        const visitValue = visitable[visitKey];
        normalized[visitKey] = visit(visitKey, visitValue, remainingDepth - 1, maxProperties, memo$1);
        numAdded++;
      }
      unmemoize(value);
      return normalized;
    }
    function stringifyValue(key, value) {
      try {
        if (key === "domain" && value && typeof value === "object" && value._events) {
          return "[Domain]";
        }
        if (key === "domainEmitter") {
          return "[DomainEmitter]";
        }
        if (typeof global !== "undefined" && value === global) {
          return "[Global]";
        }
        if (typeof window !== "undefined" && value === window) {
          return "[Window]";
        }
        if (typeof document !== "undefined" && value === document) {
          return "[Document]";
        }
        if (is.isVueViewModel(value)) {
          return "[VueViewModel]";
        }
        if (is.isSyntheticEvent(value)) {
          return "[SyntheticEvent]";
        }
        if (typeof value === "number" && value !== value) {
          return "[NaN]";
        }
        if (typeof value === "function") {
          return `[Function: ${stacktrace.getFunctionName(value)}]`;
        }
        if (typeof value === "symbol") {
          return `[${String(value)}]`;
        }
        if (typeof value === "bigint") {
          return `[BigInt: ${String(value)}]`;
        }
        const objName = getConstructorName(value);
        if (/^HTML(\w*)Element$/.test(objName)) {
          return `[HTMLElement: ${objName}]`;
        }
        return `[object ${objName}]`;
      } catch (err) {
        return `**non-serializable** (${err})`;
      }
    }
    function getConstructorName(value) {
      const prototype = Object.getPrototypeOf(value);
      return prototype ? prototype.constructor.name : "null prototype";
    }
    function utf8Length(value) {
      return ~-encodeURI(value).split(/%..|./).length;
    }
    function jsonSize(value) {
      return utf8Length(JSON.stringify(value));
    }
    exports.normalize = normalize;
    exports.normalizeToSize = normalizeToSize;
    exports.walk = visit;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/path.js
var require_path = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/path.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function normalizeArray(parts, allowAboveRoot) {
      let up = 0;
      for (let i = parts.length - 1; i >= 0; i--) {
        const last = parts[i];
        if (last === ".") {
          parts.splice(i, 1);
        } else if (last === "..") {
          parts.splice(i, 1);
          up++;
        } else if (up) {
          parts.splice(i, 1);
          up--;
        }
      }
      if (allowAboveRoot) {
        for (; up--; up) {
          parts.unshift("..");
        }
      }
      return parts;
    }
    var splitPathRe = /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;
    function splitPath(filename) {
      const truncated = filename.length > 1024 ? `<truncated>${filename.slice(-1024)}` : filename;
      const parts = splitPathRe.exec(truncated);
      return parts ? parts.slice(1) : [];
    }
    function resolve2(...args) {
      let resolvedPath = "";
      let resolvedAbsolute = false;
      for (let i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        const path6 = i >= 0 ? args[i] : "/";
        if (!path6) {
          continue;
        }
        resolvedPath = `${path6}/${resolvedPath}`;
        resolvedAbsolute = path6.charAt(0) === "/";
      }
      resolvedPath = normalizeArray(
        resolvedPath.split("/").filter((p2) => !!p2),
        !resolvedAbsolute
      ).join("/");
      return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
    }
    function trim(arr) {
      let start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== "") {
          break;
        }
      }
      let end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== "") {
          break;
        }
      }
      if (start > end) {
        return [];
      }
      return arr.slice(start, end - start + 1);
    }
    function relative(from, to) {
      from = resolve2(from).slice(1);
      to = resolve2(to).slice(1);
      const fromParts = trim(from.split("/"));
      const toParts = trim(to.split("/"));
      const length = Math.min(fromParts.length, toParts.length);
      let samePartsLength = length;
      for (let i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
          samePartsLength = i;
          break;
        }
      }
      let outputParts = [];
      for (let i = samePartsLength; i < fromParts.length; i++) {
        outputParts.push("..");
      }
      outputParts = outputParts.concat(toParts.slice(samePartsLength));
      return outputParts.join("/");
    }
    function normalizePath(path6) {
      const isPathAbsolute = isAbsolute(path6);
      const trailingSlash = path6.slice(-1) === "/";
      let normalizedPath = normalizeArray(
        path6.split("/").filter((p2) => !!p2),
        !isPathAbsolute
      ).join("/");
      if (!normalizedPath && !isPathAbsolute) {
        normalizedPath = ".";
      }
      if (normalizedPath && trailingSlash) {
        normalizedPath += "/";
      }
      return (isPathAbsolute ? "/" : "") + normalizedPath;
    }
    function isAbsolute(path6) {
      return path6.charAt(0) === "/";
    }
    function join7(...args) {
      return normalizePath(args.join("/"));
    }
    function dirname2(path6) {
      const result = splitPath(path6);
      const root = result[0];
      let dir = result[1];
      if (!root && !dir) {
        return ".";
      }
      if (dir) {
        dir = dir.slice(0, dir.length - 1);
      }
      return root + dir;
    }
    function basename(path6, ext) {
      let f3 = splitPath(path6)[2];
      if (ext && f3.slice(ext.length * -1) === ext) {
        f3 = f3.slice(0, f3.length - ext.length);
      }
      return f3;
    }
    exports.basename = basename;
    exports.dirname = dirname2;
    exports.isAbsolute = isAbsolute;
    exports.join = join7;
    exports.normalizePath = normalizePath;
    exports.relative = relative;
    exports.resolve = resolve2;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/syncpromise.js
var require_syncpromise = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/syncpromise.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var is = require_is();
    var States;
    (function(States2) {
      const PENDING = 0;
      States2[States2["PENDING"] = PENDING] = "PENDING";
      const RESOLVED = 1;
      States2[States2["RESOLVED"] = RESOLVED] = "RESOLVED";
      const REJECTED = 2;
      States2[States2["REJECTED"] = REJECTED] = "REJECTED";
    })(States || (States = {}));
    function resolvedSyncPromise(value) {
      return new SyncPromise((resolve2) => {
        resolve2(value);
      });
    }
    function rejectedSyncPromise(reason) {
      return new SyncPromise((_3, reject) => {
        reject(reason);
      });
    }
    var SyncPromise = class {
      constructor(executor) {
        SyncPromise.prototype.__init.call(this);
        SyncPromise.prototype.__init2.call(this);
        SyncPromise.prototype.__init3.call(this);
        SyncPromise.prototype.__init4.call(this);
        this._state = States.PENDING;
        this._handlers = [];
        try {
          executor(this._resolve, this._reject);
        } catch (e2) {
          this._reject(e2);
        }
      }
      then(onfulfilled, onrejected) {
        return new SyncPromise((resolve2, reject) => {
          this._handlers.push([
            false,
            (result) => {
              if (!onfulfilled) {
                resolve2(result);
              } else {
                try {
                  resolve2(onfulfilled(result));
                } catch (e2) {
                  reject(e2);
                }
              }
            },
            (reason) => {
              if (!onrejected) {
                reject(reason);
              } else {
                try {
                  resolve2(onrejected(reason));
                } catch (e2) {
                  reject(e2);
                }
              }
            }
          ]);
          this._executeHandlers();
        });
      }
      catch(onrejected) {
        return this.then((val) => val, onrejected);
      }
      finally(onfinally) {
        return new SyncPromise((resolve2, reject) => {
          let val;
          let isRejected;
          return this.then(
            (value) => {
              isRejected = false;
              val = value;
              if (onfinally) {
                onfinally();
              }
            },
            (reason) => {
              isRejected = true;
              val = reason;
              if (onfinally) {
                onfinally();
              }
            }
          ).then(() => {
            if (isRejected) {
              reject(val);
              return;
            }
            resolve2(val);
          });
        });
      }
      __init() {
        this._resolve = (value) => {
          this._setResult(States.RESOLVED, value);
        };
      }
      __init2() {
        this._reject = (reason) => {
          this._setResult(States.REJECTED, reason);
        };
      }
      __init3() {
        this._setResult = (state, value) => {
          if (this._state !== States.PENDING) {
            return;
          }
          if (is.isThenable(value)) {
            void value.then(this._resolve, this._reject);
            return;
          }
          this._state = state;
          this._value = value;
          this._executeHandlers();
        };
      }
      __init4() {
        this._executeHandlers = () => {
          if (this._state === States.PENDING) {
            return;
          }
          const cachedHandlers = this._handlers.slice();
          this._handlers = [];
          cachedHandlers.forEach((handler) => {
            if (handler[0]) {
              return;
            }
            if (this._state === States.RESOLVED) {
              handler[1](this._value);
            }
            if (this._state === States.REJECTED) {
              handler[2](this._value);
            }
            handler[0] = true;
          });
        };
      }
    };
    exports.SyncPromise = SyncPromise;
    exports.rejectedSyncPromise = rejectedSyncPromise;
    exports.resolvedSyncPromise = resolvedSyncPromise;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/promisebuffer.js
var require_promisebuffer = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/promisebuffer.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var error = require_error();
    var syncpromise = require_syncpromise();
    function makePromiseBuffer(limit) {
      const buffer = [];
      function isReady() {
        return limit === void 0 || buffer.length < limit;
      }
      function remove2(task) {
        return buffer.splice(buffer.indexOf(task), 1)[0];
      }
      function add(taskProducer) {
        if (!isReady()) {
          return syncpromise.rejectedSyncPromise(new error.SentryError("Not adding Promise because buffer limit was reached."));
        }
        const task = taskProducer();
        if (buffer.indexOf(task) === -1) {
          buffer.push(task);
        }
        void task.then(() => remove2(task)).then(
          null,
          () => remove2(task).then(null, () => {
          })
        );
        return task;
      }
      function drain(timeout) {
        return new syncpromise.SyncPromise((resolve2, reject) => {
          let counter = buffer.length;
          if (!counter) {
            return resolve2(true);
          }
          const capturedSetTimeout = setTimeout(() => {
            if (timeout && timeout > 0) {
              resolve2(false);
            }
          }, timeout);
          buffer.forEach((item2) => {
            void syncpromise.resolvedSyncPromise(item2).then(() => {
              if (!--counter) {
                clearTimeout(capturedSetTimeout);
                resolve2(true);
              }
            }, reject);
          });
        });
      }
      return {
        $: buffer,
        add,
        drain
      };
    }
    exports.makePromiseBuffer = makePromiseBuffer;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/url.js
var require_url = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/url.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function parseUrl(url2) {
      if (!url2) {
        return {};
      }
      const match = url2.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
      if (!match) {
        return {};
      }
      const query = match[6] || "";
      const fragment = match[8] || "";
      return {
        host: match[4],
        path: match[5],
        protocol: match[2],
        search: query,
        hash: fragment,
        relative: match[5] + query + fragment
      };
    }
    function stripUrlQueryAndFragment(urlPath) {
      return urlPath.split(/[\?#]/, 1)[0];
    }
    function getNumberOfUrlSegments(url2) {
      return url2.split(/\\?\//).filter((s) => s.length > 0 && s !== ",").length;
    }
    function getSanitizedUrlString(url2) {
      const { protocol, host, path: path6 } = url2;
      const filteredHost = host && host.replace(/^.*@/, "[filtered]:[filtered]@").replace(":80", "").replace(":443", "") || "";
      return `${protocol ? `${protocol}://` : ""}${filteredHost}${path6}`;
    }
    exports.getNumberOfUrlSegments = getNumberOfUrlSegments;
    exports.getSanitizedUrlString = getSanitizedUrlString;
    exports.parseUrl = parseUrl;
    exports.stripUrlQueryAndFragment = stripUrlQueryAndFragment;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/requestdata.js
var require_requestdata = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/requestdata.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var is = require_is();
    var normalize = require_normalize();
    var url2 = require_url();
    var DEFAULT_INCLUDES = {
      ip: false,
      request: true,
      transaction: true,
      user: true
    };
    var DEFAULT_REQUEST_INCLUDES = ["cookies", "data", "headers", "method", "query_string", "url"];
    var DEFAULT_USER_INCLUDES = ["id", "username", "email"];
    function addRequestDataToTransaction(transaction, req, deps) {
      if (!transaction)
        return;
      if (!transaction.metadata.source || transaction.metadata.source === "url") {
        transaction.setName(...extractPathForTransaction(req, { path: true, method: true }));
      }
      transaction.setData("url", req.originalUrl || req.url);
      if (req.baseUrl) {
        transaction.setData("baseUrl", req.baseUrl);
      }
      transaction.setData("query", extractQueryParams(req, deps));
    }
    function extractPathForTransaction(req, options = {}) {
      const method = req.method && req.method.toUpperCase();
      let path6 = "";
      let source = "url";
      if (options.customRoute || req.route) {
        path6 = options.customRoute || `${req.baseUrl || ""}${req.route && req.route.path}`;
        source = "route";
      } else if (req.originalUrl || req.url) {
        path6 = url2.stripUrlQueryAndFragment(req.originalUrl || req.url || "");
      }
      let name = "";
      if (options.method && method) {
        name += method;
      }
      if (options.method && options.path) {
        name += " ";
      }
      if (options.path && path6) {
        name += path6;
      }
      return [name, source];
    }
    function extractTransaction(req, type) {
      switch (type) {
        case "path": {
          return extractPathForTransaction(req, { path: true })[0];
        }
        case "handler": {
          return req.route && req.route.stack && req.route.stack[0] && req.route.stack[0].name || "<anonymous>";
        }
        case "methodPath":
        default: {
          return extractPathForTransaction(req, { path: true, method: true })[0];
        }
      }
    }
    function extractUserData(user, keys) {
      const extractedUser = {};
      const attributes = Array.isArray(keys) ? keys : DEFAULT_USER_INCLUDES;
      attributes.forEach((key) => {
        if (user && key in user) {
          extractedUser[key] = user[key];
        }
      });
      return extractedUser;
    }
    function extractRequestData(req, options) {
      const { include = DEFAULT_REQUEST_INCLUDES, deps } = options || {};
      const requestData = {};
      const headers = req.headers || {};
      const method = req.method;
      const host = req.hostname || req.host || headers.host || "<no host>";
      const protocol = req.protocol === "https" || req.socket && req.socket.encrypted ? "https" : "http";
      const originalUrl = req.originalUrl || req.url || "";
      const absoluteUrl = `${protocol}://${host}${originalUrl}`;
      include.forEach((key) => {
        switch (key) {
          case "headers": {
            requestData.headers = headers;
            break;
          }
          case "method": {
            requestData.method = method;
            break;
          }
          case "url": {
            requestData.url = absoluteUrl;
            break;
          }
          case "cookies": {
            requestData.cookies = req.cookies || headers.cookie && deps && deps.cookie && deps.cookie.parse(headers.cookie) || {};
            break;
          }
          case "query_string": {
            requestData.query_string = extractQueryParams(req, deps);
            break;
          }
          case "data": {
            if (method === "GET" || method === "HEAD") {
              break;
            }
            if (req.body !== void 0) {
              requestData.data = is.isString(req.body) ? req.body : JSON.stringify(normalize.normalize(req.body));
            }
            break;
          }
          default: {
            if ({}.hasOwnProperty.call(req, key)) {
              requestData[key] = req[key];
            }
          }
        }
      });
      return requestData;
    }
    function addRequestDataToEvent(event, req, options) {
      const include = {
        ...DEFAULT_INCLUDES,
        ...options && options.include
      };
      if (include.request) {
        const extractedRequestData = Array.isArray(include.request) ? extractRequestData(req, { include: include.request, deps: options && options.deps }) : extractRequestData(req, { deps: options && options.deps });
        event.request = {
          ...event.request,
          ...extractedRequestData
        };
      }
      if (include.user) {
        const extractedUser = req.user && is.isPlainObject(req.user) ? extractUserData(req.user, include.user) : {};
        if (Object.keys(extractedUser).length) {
          event.user = {
            ...event.user,
            ...extractedUser
          };
        }
      }
      if (include.ip) {
        const ip = req.ip || req.socket && req.socket.remoteAddress;
        if (ip) {
          event.user = {
            ...event.user,
            ip_address: ip
          };
        }
      }
      if (include.transaction && !event.transaction) {
        event.transaction = extractTransaction(req, include.transaction);
      }
      return event;
    }
    function extractQueryParams(req, deps) {
      let originalUrl = req.originalUrl || req.url || "";
      if (!originalUrl) {
        return;
      }
      if (originalUrl.startsWith("/")) {
        originalUrl = `http://dogs.are.great${originalUrl}`;
      }
      return req.query || typeof URL !== void 0 && new URL(originalUrl).search.replace("?", "") || deps && deps.url && deps.url.parse(originalUrl).query || void 0;
    }
    exports.addRequestDataToEvent = addRequestDataToEvent;
    exports.addRequestDataToTransaction = addRequestDataToTransaction;
    exports.extractPathForTransaction = extractPathForTransaction;
    exports.extractRequestData = extractRequestData;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/severity.js
var require_severity = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/severity.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var validSeverityLevels = ["fatal", "error", "warning", "log", "info", "debug"];
    function severityFromString(level) {
      return severityLevelFromString(level);
    }
    function severityLevelFromString(level) {
      return level === "warn" ? "warning" : validSeverityLevels.includes(level) ? level : "log";
    }
    exports.severityFromString = severityFromString;
    exports.severityLevelFromString = severityLevelFromString;
    exports.validSeverityLevels = validSeverityLevels;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/time.js
var require_time = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/time.js"(exports, module2) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var node = require_node();
    var worldwide = require_worldwide();
    var WINDOW = worldwide.getGlobalObject();
    var dateTimestampSource = {
      nowSeconds: () => Date.now() / 1e3
    };
    function getBrowserPerformance() {
      const { performance: performance2 } = WINDOW;
      if (!performance2 || !performance2.now) {
        return void 0;
      }
      const timeOrigin = Date.now() - performance2.now();
      return {
        now: () => performance2.now(),
        timeOrigin
      };
    }
    function getNodePerformance() {
      try {
        const perfHooks = node.dynamicRequire(module2, "perf_hooks");
        return perfHooks.performance;
      } catch (_3) {
        return void 0;
      }
    }
    var platformPerformance = node.isNodeEnv() ? getNodePerformance() : getBrowserPerformance();
    var timestampSource = platformPerformance === void 0 ? dateTimestampSource : {
      nowSeconds: () => (platformPerformance.timeOrigin + platformPerformance.now()) / 1e3
    };
    var dateTimestampInSeconds = dateTimestampSource.nowSeconds.bind(dateTimestampSource);
    var timestampInSeconds = timestampSource.nowSeconds.bind(timestampSource);
    var timestampWithMs = timestampInSeconds;
    var usingPerformanceAPI = platformPerformance !== void 0;
    exports._browserPerformanceTimeOriginMode = void 0;
    var browserPerformanceTimeOrigin = (() => {
      const { performance: performance2 } = WINDOW;
      if (!performance2 || !performance2.now) {
        exports._browserPerformanceTimeOriginMode = "none";
        return void 0;
      }
      const threshold = 3600 * 1e3;
      const performanceNow = performance2.now();
      const dateNow = Date.now();
      const timeOriginDelta = performance2.timeOrigin ? Math.abs(performance2.timeOrigin + performanceNow - dateNow) : threshold;
      const timeOriginIsReliable = timeOriginDelta < threshold;
      const navigationStart = performance2.timing && performance2.timing.navigationStart;
      const hasNavigationStart = typeof navigationStart === "number";
      const navigationStartDelta = hasNavigationStart ? Math.abs(navigationStart + performanceNow - dateNow) : threshold;
      const navigationStartIsReliable = navigationStartDelta < threshold;
      if (timeOriginIsReliable || navigationStartIsReliable) {
        if (timeOriginDelta <= navigationStartDelta) {
          exports._browserPerformanceTimeOriginMode = "timeOrigin";
          return performance2.timeOrigin;
        } else {
          exports._browserPerformanceTimeOriginMode = "navigationStart";
          return navigationStart;
        }
      }
      exports._browserPerformanceTimeOriginMode = "dateNow";
      return dateNow;
    })();
    exports.browserPerformanceTimeOrigin = browserPerformanceTimeOrigin;
    exports.dateTimestampInSeconds = dateTimestampInSeconds;
    exports.timestampInSeconds = timestampInSeconds;
    exports.timestampWithMs = timestampWithMs;
    exports.usingPerformanceAPI = usingPerformanceAPI;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/baggage.js
var require_baggage = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/baggage.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var is = require_is();
    var logger = require_logger();
    var BAGGAGE_HEADER_NAME = "baggage";
    var SENTRY_BAGGAGE_KEY_PREFIX = "sentry-";
    var SENTRY_BAGGAGE_KEY_PREFIX_REGEX = /^sentry-/;
    var MAX_BAGGAGE_STRING_LENGTH = 8192;
    function baggageHeaderToDynamicSamplingContext(baggageHeader) {
      if (!is.isString(baggageHeader) && !Array.isArray(baggageHeader)) {
        return void 0;
      }
      let baggageObject = {};
      if (Array.isArray(baggageHeader)) {
        baggageObject = baggageHeader.reduce((acc, curr) => {
          const currBaggageObject = baggageHeaderToObject(curr);
          return {
            ...acc,
            ...currBaggageObject
          };
        }, {});
      } else {
        if (!baggageHeader) {
          return void 0;
        }
        baggageObject = baggageHeaderToObject(baggageHeader);
      }
      const dynamicSamplingContext = Object.entries(baggageObject).reduce((acc, [key, value]) => {
        if (key.match(SENTRY_BAGGAGE_KEY_PREFIX_REGEX)) {
          const nonPrefixedKey = key.slice(SENTRY_BAGGAGE_KEY_PREFIX.length);
          acc[nonPrefixedKey] = value;
        }
        return acc;
      }, {});
      if (Object.keys(dynamicSamplingContext).length > 0) {
        return dynamicSamplingContext;
      } else {
        return void 0;
      }
    }
    function dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext) {
      if (!dynamicSamplingContext) {
        return void 0;
      }
      const sentryPrefixedDSC = Object.entries(dynamicSamplingContext).reduce(
        (acc, [dscKey, dscValue]) => {
          if (dscValue) {
            acc[`${SENTRY_BAGGAGE_KEY_PREFIX}${dscKey}`] = dscValue;
          }
          return acc;
        },
        {}
      );
      return objectToBaggageHeader(sentryPrefixedDSC);
    }
    function baggageHeaderToObject(baggageHeader) {
      return baggageHeader.split(",").map((baggageEntry) => baggageEntry.split("=").map((keyOrValue) => decodeURIComponent(keyOrValue.trim()))).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    }
    function objectToBaggageHeader(object) {
      if (Object.keys(object).length === 0) {
        return void 0;
      }
      return Object.entries(object).reduce((baggageHeader, [objectKey, objectValue], currentIndex) => {
        const baggageEntry = `${encodeURIComponent(objectKey)}=${encodeURIComponent(objectValue)}`;
        const newBaggageHeader = currentIndex === 0 ? baggageEntry : `${baggageHeader},${baggageEntry}`;
        if (newBaggageHeader.length > MAX_BAGGAGE_STRING_LENGTH) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.logger.warn(
            `Not adding key: ${objectKey} with val: ${objectValue} to baggage header due to exceeding baggage size limits.`
          );
          return baggageHeader;
        } else {
          return newBaggageHeader;
        }
      }, "");
    }
    exports.BAGGAGE_HEADER_NAME = BAGGAGE_HEADER_NAME;
    exports.MAX_BAGGAGE_STRING_LENGTH = MAX_BAGGAGE_STRING_LENGTH;
    exports.SENTRY_BAGGAGE_KEY_PREFIX = SENTRY_BAGGAGE_KEY_PREFIX;
    exports.SENTRY_BAGGAGE_KEY_PREFIX_REGEX = SENTRY_BAGGAGE_KEY_PREFIX_REGEX;
    exports.baggageHeaderToDynamicSamplingContext = baggageHeaderToDynamicSamplingContext;
    exports.dynamicSamplingContextToSentryBaggageHeader = dynamicSamplingContextToSentryBaggageHeader;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/tracing.js
var require_tracing = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/tracing.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var baggage = require_baggage();
    var misc = require_misc();
    var TRACEPARENT_REGEXP = new RegExp(
      "^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$"
    );
    function extractTraceparentData(traceparent) {
      if (!traceparent) {
        return void 0;
      }
      const matches = traceparent.match(TRACEPARENT_REGEXP);
      if (!matches) {
        return void 0;
      }
      let parentSampled;
      if (matches[3] === "1") {
        parentSampled = true;
      } else if (matches[3] === "0") {
        parentSampled = false;
      }
      return {
        traceId: matches[1],
        parentSampled,
        parentSpanId: matches[2]
      };
    }
    function tracingContextFromHeaders(sentryTrace, baggage$1) {
      const traceparentData = extractTraceparentData(sentryTrace);
      const dynamicSamplingContext = baggage.baggageHeaderToDynamicSamplingContext(baggage$1);
      const { traceId, parentSpanId, parentSampled } = traceparentData || {};
      const propagationContext = {
        traceId: traceId || misc.uuid4(),
        spanId: misc.uuid4().substring(16),
        sampled: parentSampled
      };
      if (parentSpanId) {
        propagationContext.parentSpanId = parentSpanId;
      }
      if (dynamicSamplingContext) {
        propagationContext.dsc = dynamicSamplingContext;
      }
      return {
        traceparentData,
        dynamicSamplingContext,
        propagationContext
      };
    }
    function generateSentryTraceHeader(traceId = misc.uuid4(), spanId = misc.uuid4().substring(16), sampled) {
      let sampledString = "";
      if (sampled !== void 0) {
        sampledString = sampled ? "-1" : "-0";
      }
      return `${traceId}-${spanId}${sampledString}`;
    }
    exports.TRACEPARENT_REGEXP = TRACEPARENT_REGEXP;
    exports.extractTraceparentData = extractTraceparentData;
    exports.generateSentryTraceHeader = generateSentryTraceHeader;
    exports.tracingContextFromHeaders = tracingContextFromHeaders;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/envelope.js
var require_envelope = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/envelope.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var dsn = require_dsn();
    var normalize = require_normalize();
    var object = require_object();
    function createEnvelope(headers, items = []) {
      return [headers, items];
    }
    function addItemToEnvelope(envelope, newItem) {
      const [headers, items] = envelope;
      return [headers, [...items, newItem]];
    }
    function forEachEnvelopeItem(envelope, callback) {
      const envelopeItems = envelope[1];
      for (const envelopeItem of envelopeItems) {
        const envelopeItemType = envelopeItem[0].type;
        const result = callback(envelopeItem, envelopeItemType);
        if (result) {
          return true;
        }
      }
      return false;
    }
    function envelopeContainsItemType(envelope, types) {
      return forEachEnvelopeItem(envelope, (_3, type) => types.includes(type));
    }
    function encodeUTF8(input, textEncoder) {
      const utf8 = textEncoder || new TextEncoder();
      return utf8.encode(input);
    }
    function serializeEnvelope(envelope, textEncoder) {
      const [envHeaders, items] = envelope;
      let parts = JSON.stringify(envHeaders);
      function append(next2) {
        if (typeof parts === "string") {
          parts = typeof next2 === "string" ? parts + next2 : [encodeUTF8(parts, textEncoder), next2];
        } else {
          parts.push(typeof next2 === "string" ? encodeUTF8(next2, textEncoder) : next2);
        }
      }
      for (const item2 of items) {
        const [itemHeaders, payload] = item2;
        append(`
${JSON.stringify(itemHeaders)}
`);
        if (typeof payload === "string" || payload instanceof Uint8Array) {
          append(payload);
        } else {
          let stringifiedPayload;
          try {
            stringifiedPayload = JSON.stringify(payload);
          } catch (e2) {
            stringifiedPayload = JSON.stringify(normalize.normalize(payload));
          }
          append(stringifiedPayload);
        }
      }
      return typeof parts === "string" ? parts : concatBuffers(parts);
    }
    function concatBuffers(buffers) {
      const totalLength = buffers.reduce((acc, buf) => acc + buf.length, 0);
      const merged = new Uint8Array(totalLength);
      let offset = 0;
      for (const buffer of buffers) {
        merged.set(buffer, offset);
        offset += buffer.length;
      }
      return merged;
    }
    function parseEnvelope(env3, textEncoder, textDecoder) {
      let buffer = typeof env3 === "string" ? textEncoder.encode(env3) : env3;
      function readBinary(length) {
        const bin = buffer.subarray(0, length);
        buffer = buffer.subarray(length + 1);
        return bin;
      }
      function readJson() {
        let i = buffer.indexOf(10);
        if (i < 0) {
          i = buffer.length;
        }
        return JSON.parse(textDecoder.decode(readBinary(i)));
      }
      const envelopeHeader = readJson();
      const items = [];
      while (buffer.length) {
        const itemHeader = readJson();
        const binaryLength = typeof itemHeader.length === "number" ? itemHeader.length : void 0;
        items.push([itemHeader, binaryLength ? readBinary(binaryLength) : readJson()]);
      }
      return [envelopeHeader, items];
    }
    function createAttachmentEnvelopeItem(attachment, textEncoder) {
      const buffer = typeof attachment.data === "string" ? encodeUTF8(attachment.data, textEncoder) : attachment.data;
      return [
        object.dropUndefinedKeys({
          type: "attachment",
          length: buffer.length,
          filename: attachment.filename,
          content_type: attachment.contentType,
          attachment_type: attachment.attachmentType
        }),
        buffer
      ];
    }
    var ITEM_TYPE_TO_DATA_CATEGORY_MAP = {
      session: "session",
      sessions: "session",
      attachment: "attachment",
      transaction: "transaction",
      event: "error",
      client_report: "internal",
      user_report: "default",
      profile: "profile",
      replay_event: "replay",
      replay_recording: "replay",
      check_in: "monitor"
    };
    function envelopeItemTypeToDataCategory(type) {
      return ITEM_TYPE_TO_DATA_CATEGORY_MAP[type];
    }
    function getSdkMetadataForEnvelopeHeader(metadataOrEvent) {
      if (!metadataOrEvent || !metadataOrEvent.sdk) {
        return;
      }
      const { name, version } = metadataOrEvent.sdk;
      return { name, version };
    }
    function createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn$1) {
      const dynamicSamplingContext = event.sdkProcessingMetadata && event.sdkProcessingMetadata.dynamicSamplingContext;
      return {
        event_id: event.event_id,
        sent_at: new Date().toISOString(),
        ...sdkInfo && { sdk: sdkInfo },
        ...!!tunnel && { dsn: dsn.dsnToString(dsn$1) },
        ...dynamicSamplingContext && {
          trace: object.dropUndefinedKeys({ ...dynamicSamplingContext })
        }
      };
    }
    exports.addItemToEnvelope = addItemToEnvelope;
    exports.createAttachmentEnvelopeItem = createAttachmentEnvelopeItem;
    exports.createEnvelope = createEnvelope;
    exports.createEventEnvelopeHeaders = createEventEnvelopeHeaders;
    exports.envelopeContainsItemType = envelopeContainsItemType;
    exports.envelopeItemTypeToDataCategory = envelopeItemTypeToDataCategory;
    exports.forEachEnvelopeItem = forEachEnvelopeItem;
    exports.getSdkMetadataForEnvelopeHeader = getSdkMetadataForEnvelopeHeader;
    exports.parseEnvelope = parseEnvelope;
    exports.serializeEnvelope = serializeEnvelope;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/clientreport.js
var require_clientreport = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/clientreport.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var envelope = require_envelope();
    var time = require_time();
    function createClientReportEnvelope(discarded_events, dsn, timestamp) {
      const clientReportItem = [
        { type: "client_report" },
        {
          timestamp: timestamp || time.dateTimestampInSeconds(),
          discarded_events
        }
      ];
      return envelope.createEnvelope(dsn ? { dsn } : {}, [clientReportItem]);
    }
    exports.createClientReportEnvelope = createClientReportEnvelope;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/ratelimit.js
var require_ratelimit = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/ratelimit.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var DEFAULT_RETRY_AFTER = 60 * 1e3;
    function parseRetryAfterHeader(header, now = Date.now()) {
      const headerDelay = parseInt(`${header}`, 10);
      if (!isNaN(headerDelay)) {
        return headerDelay * 1e3;
      }
      const headerDate = Date.parse(`${header}`);
      if (!isNaN(headerDate)) {
        return headerDate - now;
      }
      return DEFAULT_RETRY_AFTER;
    }
    function disabledUntil(limits, category) {
      return limits[category] || limits.all || 0;
    }
    function isRateLimited(limits, category, now = Date.now()) {
      return disabledUntil(limits, category) > now;
    }
    function updateRateLimits(limits, { statusCode, headers }, now = Date.now()) {
      const updatedRateLimits = {
        ...limits
      };
      const rateLimitHeader = headers && headers["x-sentry-rate-limits"];
      const retryAfterHeader = headers && headers["retry-after"];
      if (rateLimitHeader) {
        for (const limit of rateLimitHeader.trim().split(",")) {
          const [retryAfter, categories] = limit.split(":", 2);
          const headerDelay = parseInt(retryAfter, 10);
          const delay = (!isNaN(headerDelay) ? headerDelay : 60) * 1e3;
          if (!categories) {
            updatedRateLimits.all = now + delay;
          } else {
            for (const category of categories.split(";")) {
              updatedRateLimits[category] = now + delay;
            }
          }
        }
      } else if (retryAfterHeader) {
        updatedRateLimits.all = now + parseRetryAfterHeader(retryAfterHeader, now);
      } else if (statusCode === 429) {
        updatedRateLimits.all = now + 60 * 1e3;
      }
      return updatedRateLimits;
    }
    exports.DEFAULT_RETRY_AFTER = DEFAULT_RETRY_AFTER;
    exports.disabledUntil = disabledUntil;
    exports.isRateLimited = isRateLimited;
    exports.parseRetryAfterHeader = parseRetryAfterHeader;
    exports.updateRateLimits = updateRateLimits;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/userIntegrations.js
var require_userIntegrations = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/userIntegrations.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function setNestedKey(obj, keyPath, value) {
      const match = keyPath.match(/([a-z_]+)\.(.*)/i);
      if (match === null) {
        obj[keyPath] = value;
      } else {
        const innerObj = obj[match[1]];
        setNestedKey(innerObj, match[2], value);
      }
    }
    function addOrUpdateIntegration(defaultIntegrationInstance, userIntegrations, forcedOptions = {}) {
      return Array.isArray(userIntegrations) ? addOrUpdateIntegrationInArray(defaultIntegrationInstance, userIntegrations, forcedOptions) : addOrUpdateIntegrationInFunction(
        defaultIntegrationInstance,
        userIntegrations,
        forcedOptions
      );
    }
    function addOrUpdateIntegrationInArray(defaultIntegrationInstance, userIntegrations, forcedOptions) {
      const userInstance = userIntegrations.find((integration) => integration.name === defaultIntegrationInstance.name);
      if (userInstance) {
        for (const [keyPath, value] of Object.entries(forcedOptions)) {
          setNestedKey(userInstance, keyPath, value);
        }
        return userIntegrations;
      }
      return [...userIntegrations, defaultIntegrationInstance];
    }
    function addOrUpdateIntegrationInFunction(defaultIntegrationInstance, userIntegrationsFunc, forcedOptions) {
      const wrapper = (defaultIntegrations) => {
        const userFinalIntegrations = userIntegrationsFunc(defaultIntegrations);
        if (defaultIntegrationInstance.allowExclusionByUser) {
          const userFinalInstance = userFinalIntegrations.find(
            (integration) => integration.name === defaultIntegrationInstance.name
          );
          if (!userFinalInstance) {
            return userFinalIntegrations;
          }
        }
        return addOrUpdateIntegrationInArray(defaultIntegrationInstance, userFinalIntegrations, forcedOptions);
      };
      return wrapper;
    }
    exports.addOrUpdateIntegration = addOrUpdateIntegration;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/cache.js
var require_cache = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/cache.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function makeFifoCache(size) {
      let evictionOrder = [];
      let cache = {};
      return {
        add(key, value) {
          while (evictionOrder.length >= size) {
            const evictCandidate = evictionOrder.shift();
            if (evictCandidate !== void 0) {
              delete cache[evictCandidate];
            }
          }
          if (cache[key]) {
            this.delete(key);
          }
          evictionOrder.push(key);
          cache[key] = value;
        },
        clear() {
          cache = {};
          evictionOrder = [];
        },
        get(key) {
          return cache[key];
        },
        size() {
          return evictionOrder.length;
        },
        delete(key) {
          if (!cache[key]) {
            return false;
          }
          delete cache[key];
          for (let i = 0; i < evictionOrder.length; i++) {
            if (evictionOrder[i] === key) {
              evictionOrder.splice(i, 1);
              break;
            }
          }
          return true;
        }
      };
    }
    exports.makeFifoCache = makeFifoCache;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/eventbuilder.js
var require_eventbuilder = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/eventbuilder.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var is = require_is();
    var misc = require_misc();
    var normalize = require_normalize();
    var object = require_object();
    function parseStackFrames(stackParser, error) {
      return stackParser(error.stack || "", 1);
    }
    function exceptionFromError(stackParser, error) {
      const exception = {
        type: error.name || error.constructor.name,
        value: error.message
      };
      const frames = parseStackFrames(stackParser, error);
      if (frames.length) {
        exception.stacktrace = { frames };
      }
      return exception;
    }
    function eventFromUnknownInput(getCurrentHub, stackParser, exception, hint) {
      let ex = exception;
      const providedMechanism = hint && hint.data && hint.data.mechanism;
      const mechanism = providedMechanism || {
        handled: true,
        type: "generic"
      };
      if (!is.isError(exception)) {
        if (is.isPlainObject(exception)) {
          const message = `Non-Error exception captured with keys: ${object.extractExceptionKeysForMessage(exception)}`;
          const hub = getCurrentHub();
          const client = hub.getClient();
          const normalizeDepth = client && client.getOptions().normalizeDepth;
          hub.configureScope((scope) => {
            scope.setExtra("__serialized__", normalize.normalizeToSize(exception, normalizeDepth));
          });
          ex = hint && hint.syntheticException || new Error(message);
          ex.message = message;
        } else {
          ex = hint && hint.syntheticException || new Error(exception);
          ex.message = exception;
        }
        mechanism.synthetic = true;
      }
      const event = {
        exception: {
          values: [exceptionFromError(stackParser, ex)]
        }
      };
      misc.addExceptionTypeValue(event, void 0, void 0);
      misc.addExceptionMechanism(event, mechanism);
      return {
        ...event,
        event_id: hint && hint.event_id
      };
    }
    function eventFromMessage(stackParser, message, level = "info", hint, attachStacktrace) {
      const event = {
        event_id: hint && hint.event_id,
        level,
        message
      };
      if (attachStacktrace && hint && hint.syntheticException) {
        const frames = parseStackFrames(stackParser, hint.syntheticException);
        if (frames.length) {
          event.exception = {
            values: [
              {
                value: message,
                stacktrace: { frames }
              }
            ]
          };
        }
      }
      return event;
    }
    exports.eventFromMessage = eventFromMessage;
    exports.eventFromUnknownInput = eventFromUnknownInput;
    exports.exceptionFromError = exceptionFromError;
    exports.parseStackFrames = parseStackFrames;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/vendor/escapeStringForRegex.js
var require_escapeStringForRegex = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/vendor/escapeStringForRegex.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function escapeStringForRegex(regexString) {
      return regexString.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
    }
    exports.escapeStringForRegex = escapeStringForRegex;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/index.js
var require_cjs = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var aggregateErrors = require_aggregate_errors();
    var browser = require_browser();
    var dsn = require_dsn();
    var error = require_error();
    var worldwide = require_worldwide();
    var instrument = require_instrument();
    var is = require_is();
    var logger = require_logger();
    var memo = require_memo();
    var misc = require_misc();
    var node = require_node();
    var normalize = require_normalize();
    var object = require_object();
    var path6 = require_path();
    var promisebuffer = require_promisebuffer();
    var requestdata = require_requestdata();
    var severity = require_severity();
    var stacktrace = require_stacktrace();
    var string = require_string();
    var supports = require_supports();
    var syncpromise = require_syncpromise();
    var time = require_time();
    var tracing = require_tracing();
    var env3 = require_env();
    var envelope = require_envelope();
    var clientreport = require_clientreport();
    var ratelimit = require_ratelimit();
    var baggage = require_baggage();
    var url2 = require_url();
    var userIntegrations = require_userIntegrations();
    var cache = require_cache();
    var eventbuilder = require_eventbuilder();
    var escapeStringForRegex = require_escapeStringForRegex();
    var supportsHistory = require_supportsHistory();
    exports.applyAggregateErrorsToEvent = aggregateErrors.applyAggregateErrorsToEvent;
    exports.getDomElement = browser.getDomElement;
    exports.getLocationHref = browser.getLocationHref;
    exports.htmlTreeAsString = browser.htmlTreeAsString;
    exports.dsnFromString = dsn.dsnFromString;
    exports.dsnToString = dsn.dsnToString;
    exports.makeDsn = dsn.makeDsn;
    exports.SentryError = error.SentryError;
    exports.GLOBAL_OBJ = worldwide.GLOBAL_OBJ;
    exports.getGlobalObject = worldwide.getGlobalObject;
    exports.getGlobalSingleton = worldwide.getGlobalSingleton;
    exports.SENTRY_XHR_DATA_KEY = instrument.SENTRY_XHR_DATA_KEY;
    exports.addInstrumentationHandler = instrument.addInstrumentationHandler;
    exports.instrumentDOM = instrument.instrumentDOM;
    exports.instrumentXHR = instrument.instrumentXHR;
    exports.parseFetchArgs = instrument.parseFetchArgs;
    exports.resetInstrumentationHandlers = instrument.resetInstrumentationHandlers;
    exports.isDOMError = is.isDOMError;
    exports.isDOMException = is.isDOMException;
    exports.isElement = is.isElement;
    exports.isError = is.isError;
    exports.isErrorEvent = is.isErrorEvent;
    exports.isEvent = is.isEvent;
    exports.isInstanceOf = is.isInstanceOf;
    exports.isNaN = is.isNaN;
    exports.isPlainObject = is.isPlainObject;
    exports.isPrimitive = is.isPrimitive;
    exports.isRegExp = is.isRegExp;
    exports.isString = is.isString;
    exports.isSyntheticEvent = is.isSyntheticEvent;
    exports.isThenable = is.isThenable;
    exports.isVueViewModel = is.isVueViewModel;
    exports.CONSOLE_LEVELS = logger.CONSOLE_LEVELS;
    exports.consoleSandbox = logger.consoleSandbox;
    exports.logger = logger.logger;
    exports.originalConsoleMethods = logger.originalConsoleMethods;
    exports.memoBuilder = memo.memoBuilder;
    exports.addContextToFrame = misc.addContextToFrame;
    exports.addExceptionMechanism = misc.addExceptionMechanism;
    exports.addExceptionTypeValue = misc.addExceptionTypeValue;
    exports.arrayify = misc.arrayify;
    exports.checkOrSetAlreadyCaught = misc.checkOrSetAlreadyCaught;
    exports.getEventDescription = misc.getEventDescription;
    exports.parseSemver = misc.parseSemver;
    exports.uuid4 = misc.uuid4;
    exports.dynamicRequire = node.dynamicRequire;
    exports.isNodeEnv = node.isNodeEnv;
    exports.loadModule = node.loadModule;
    exports.normalize = normalize.normalize;
    exports.normalizeToSize = normalize.normalizeToSize;
    exports.walk = normalize.walk;
    exports.addNonEnumerableProperty = object.addNonEnumerableProperty;
    exports.convertToPlainObject = object.convertToPlainObject;
    exports.dropUndefinedKeys = object.dropUndefinedKeys;
    exports.extractExceptionKeysForMessage = object.extractExceptionKeysForMessage;
    exports.fill = object.fill;
    exports.getOriginalFunction = object.getOriginalFunction;
    exports.markFunctionWrapped = object.markFunctionWrapped;
    exports.objectify = object.objectify;
    exports.urlEncode = object.urlEncode;
    exports.basename = path6.basename;
    exports.dirname = path6.dirname;
    exports.isAbsolute = path6.isAbsolute;
    exports.join = path6.join;
    exports.normalizePath = path6.normalizePath;
    exports.relative = path6.relative;
    exports.resolve = path6.resolve;
    exports.makePromiseBuffer = promisebuffer.makePromiseBuffer;
    exports.addRequestDataToEvent = requestdata.addRequestDataToEvent;
    exports.addRequestDataToTransaction = requestdata.addRequestDataToTransaction;
    exports.extractPathForTransaction = requestdata.extractPathForTransaction;
    exports.extractRequestData = requestdata.extractRequestData;
    exports.severityFromString = severity.severityFromString;
    exports.severityLevelFromString = severity.severityLevelFromString;
    exports.validSeverityLevels = severity.validSeverityLevels;
    exports.createStackParser = stacktrace.createStackParser;
    exports.getFunctionName = stacktrace.getFunctionName;
    exports.nodeStackLineParser = stacktrace.nodeStackLineParser;
    exports.stackParserFromStackParserOptions = stacktrace.stackParserFromStackParserOptions;
    exports.stripSentryFramesAndReverse = stacktrace.stripSentryFramesAndReverse;
    exports.isMatchingPattern = string.isMatchingPattern;
    exports.safeJoin = string.safeJoin;
    exports.snipLine = string.snipLine;
    exports.stringMatchesSomePattern = string.stringMatchesSomePattern;
    exports.truncate = string.truncate;
    exports.isNativeFetch = supports.isNativeFetch;
    exports.supportsDOMError = supports.supportsDOMError;
    exports.supportsDOMException = supports.supportsDOMException;
    exports.supportsErrorEvent = supports.supportsErrorEvent;
    exports.supportsFetch = supports.supportsFetch;
    exports.supportsNativeFetch = supports.supportsNativeFetch;
    exports.supportsReferrerPolicy = supports.supportsReferrerPolicy;
    exports.supportsReportingObserver = supports.supportsReportingObserver;
    exports.SyncPromise = syncpromise.SyncPromise;
    exports.rejectedSyncPromise = syncpromise.rejectedSyncPromise;
    exports.resolvedSyncPromise = syncpromise.resolvedSyncPromise;
    Object.defineProperty(exports, "_browserPerformanceTimeOriginMode", {
      enumerable: true,
      get: () => time._browserPerformanceTimeOriginMode
    });
    exports.browserPerformanceTimeOrigin = time.browserPerformanceTimeOrigin;
    exports.dateTimestampInSeconds = time.dateTimestampInSeconds;
    exports.timestampInSeconds = time.timestampInSeconds;
    exports.timestampWithMs = time.timestampWithMs;
    exports.usingPerformanceAPI = time.usingPerformanceAPI;
    exports.TRACEPARENT_REGEXP = tracing.TRACEPARENT_REGEXP;
    exports.extractTraceparentData = tracing.extractTraceparentData;
    exports.generateSentryTraceHeader = tracing.generateSentryTraceHeader;
    exports.tracingContextFromHeaders = tracing.tracingContextFromHeaders;
    exports.getSDKSource = env3.getSDKSource;
    exports.isBrowserBundle = env3.isBrowserBundle;
    exports.addItemToEnvelope = envelope.addItemToEnvelope;
    exports.createAttachmentEnvelopeItem = envelope.createAttachmentEnvelopeItem;
    exports.createEnvelope = envelope.createEnvelope;
    exports.createEventEnvelopeHeaders = envelope.createEventEnvelopeHeaders;
    exports.envelopeContainsItemType = envelope.envelopeContainsItemType;
    exports.envelopeItemTypeToDataCategory = envelope.envelopeItemTypeToDataCategory;
    exports.forEachEnvelopeItem = envelope.forEachEnvelopeItem;
    exports.getSdkMetadataForEnvelopeHeader = envelope.getSdkMetadataForEnvelopeHeader;
    exports.parseEnvelope = envelope.parseEnvelope;
    exports.serializeEnvelope = envelope.serializeEnvelope;
    exports.createClientReportEnvelope = clientreport.createClientReportEnvelope;
    exports.DEFAULT_RETRY_AFTER = ratelimit.DEFAULT_RETRY_AFTER;
    exports.disabledUntil = ratelimit.disabledUntil;
    exports.isRateLimited = ratelimit.isRateLimited;
    exports.parseRetryAfterHeader = ratelimit.parseRetryAfterHeader;
    exports.updateRateLimits = ratelimit.updateRateLimits;
    exports.BAGGAGE_HEADER_NAME = baggage.BAGGAGE_HEADER_NAME;
    exports.MAX_BAGGAGE_STRING_LENGTH = baggage.MAX_BAGGAGE_STRING_LENGTH;
    exports.SENTRY_BAGGAGE_KEY_PREFIX = baggage.SENTRY_BAGGAGE_KEY_PREFIX;
    exports.SENTRY_BAGGAGE_KEY_PREFIX_REGEX = baggage.SENTRY_BAGGAGE_KEY_PREFIX_REGEX;
    exports.baggageHeaderToDynamicSamplingContext = baggage.baggageHeaderToDynamicSamplingContext;
    exports.dynamicSamplingContextToSentryBaggageHeader = baggage.dynamicSamplingContextToSentryBaggageHeader;
    exports.getNumberOfUrlSegments = url2.getNumberOfUrlSegments;
    exports.getSanitizedUrlString = url2.getSanitizedUrlString;
    exports.parseUrl = url2.parseUrl;
    exports.stripUrlQueryAndFragment = url2.stripUrlQueryAndFragment;
    exports.addOrUpdateIntegration = userIntegrations.addOrUpdateIntegration;
    exports.makeFifoCache = cache.makeFifoCache;
    exports.eventFromMessage = eventbuilder.eventFromMessage;
    exports.eventFromUnknownInput = eventbuilder.eventFromUnknownInput;
    exports.exceptionFromError = eventbuilder.exceptionFromError;
    exports.parseStackFrames = eventbuilder.parseStackFrames;
    exports.escapeStringForRegex = escapeStringForRegex.escapeStringForRegex;
    exports.supportsHistory = supportsHistory.supportsHistory;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/constants.js
var require_constants = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/constants.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var DEFAULT_ENVIRONMENT = "production";
    exports.DEFAULT_ENVIRONMENT = DEFAULT_ENVIRONMENT;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/session.js
var require_session = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/session.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    function makeSession(context) {
      const startingTime = utils.timestampInSeconds();
      const session = {
        sid: utils.uuid4(),
        init: true,
        timestamp: startingTime,
        started: startingTime,
        duration: 0,
        status: "ok",
        errors: 0,
        ignoreDuration: false,
        toJSON: () => sessionToJSON(session)
      };
      if (context) {
        updateSession(session, context);
      }
      return session;
    }
    function updateSession(session, context = {}) {
      if (context.user) {
        if (!session.ipAddress && context.user.ip_address) {
          session.ipAddress = context.user.ip_address;
        }
        if (!session.did && !context.did) {
          session.did = context.user.id || context.user.email || context.user.username;
        }
      }
      session.timestamp = context.timestamp || utils.timestampInSeconds();
      if (context.ignoreDuration) {
        session.ignoreDuration = context.ignoreDuration;
      }
      if (context.sid) {
        session.sid = context.sid.length === 32 ? context.sid : utils.uuid4();
      }
      if (context.init !== void 0) {
        session.init = context.init;
      }
      if (!session.did && context.did) {
        session.did = `${context.did}`;
      }
      if (typeof context.started === "number") {
        session.started = context.started;
      }
      if (session.ignoreDuration) {
        session.duration = void 0;
      } else if (typeof context.duration === "number") {
        session.duration = context.duration;
      } else {
        const duration = session.timestamp - session.started;
        session.duration = duration >= 0 ? duration : 0;
      }
      if (context.release) {
        session.release = context.release;
      }
      if (context.environment) {
        session.environment = context.environment;
      }
      if (!session.ipAddress && context.ipAddress) {
        session.ipAddress = context.ipAddress;
      }
      if (!session.userAgent && context.userAgent) {
        session.userAgent = context.userAgent;
      }
      if (typeof context.errors === "number") {
        session.errors = context.errors;
      }
      if (context.status) {
        session.status = context.status;
      }
    }
    function closeSession(session, status) {
      let context = {};
      if (status) {
        context = { status };
      } else if (session.status === "ok") {
        context = { status: "exited" };
      }
      updateSession(session, context);
    }
    function sessionToJSON(session) {
      return utils.dropUndefinedKeys({
        sid: `${session.sid}`,
        init: session.init,
        started: new Date(session.started * 1e3).toISOString(),
        timestamp: new Date(session.timestamp * 1e3).toISOString(),
        status: session.status,
        errors: session.errors,
        did: typeof session.did === "number" || typeof session.did === "string" ? `${session.did}` : void 0,
        duration: session.duration,
        attrs: {
          release: session.release,
          environment: session.environment,
          ip_address: session.ipAddress,
          user_agent: session.userAgent
        }
      });
    }
    exports.closeSession = closeSession;
    exports.makeSession = makeSession;
    exports.updateSession = updateSession;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/scope.js
var require_scope = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/scope.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var session = require_session();
    var DEFAULT_MAX_BREADCRUMBS = 100;
    var Scope = class {
      constructor() {
        this._notifyingListeners = false;
        this._scopeListeners = [];
        this._eventProcessors = [];
        this._breadcrumbs = [];
        this._attachments = [];
        this._user = {};
        this._tags = {};
        this._extra = {};
        this._contexts = {};
        this._sdkProcessingMetadata = {};
        this._propagationContext = generatePropagationContext();
      }
      static clone(scope) {
        const newScope = new Scope();
        if (scope) {
          newScope._breadcrumbs = [...scope._breadcrumbs];
          newScope._tags = { ...scope._tags };
          newScope._extra = { ...scope._extra };
          newScope._contexts = { ...scope._contexts };
          newScope._user = scope._user;
          newScope._level = scope._level;
          newScope._span = scope._span;
          newScope._session = scope._session;
          newScope._transactionName = scope._transactionName;
          newScope._fingerprint = scope._fingerprint;
          newScope._eventProcessors = [...scope._eventProcessors];
          newScope._requestSession = scope._requestSession;
          newScope._attachments = [...scope._attachments];
          newScope._sdkProcessingMetadata = { ...scope._sdkProcessingMetadata };
          newScope._propagationContext = { ...scope._propagationContext };
        }
        return newScope;
      }
      addScopeListener(callback) {
        this._scopeListeners.push(callback);
      }
      addEventProcessor(callback) {
        this._eventProcessors.push(callback);
        return this;
      }
      setUser(user) {
        this._user = user || {};
        if (this._session) {
          session.updateSession(this._session, { user });
        }
        this._notifyScopeListeners();
        return this;
      }
      getUser() {
        return this._user;
      }
      getRequestSession() {
        return this._requestSession;
      }
      setRequestSession(requestSession) {
        this._requestSession = requestSession;
        return this;
      }
      setTags(tags) {
        this._tags = {
          ...this._tags,
          ...tags
        };
        this._notifyScopeListeners();
        return this;
      }
      setTag(key, value) {
        this._tags = { ...this._tags, [key]: value };
        this._notifyScopeListeners();
        return this;
      }
      setExtras(extras) {
        this._extra = {
          ...this._extra,
          ...extras
        };
        this._notifyScopeListeners();
        return this;
      }
      setExtra(key, extra) {
        this._extra = { ...this._extra, [key]: extra };
        this._notifyScopeListeners();
        return this;
      }
      setFingerprint(fingerprint) {
        this._fingerprint = fingerprint;
        this._notifyScopeListeners();
        return this;
      }
      setLevel(level) {
        this._level = level;
        this._notifyScopeListeners();
        return this;
      }
      setTransactionName(name) {
        this._transactionName = name;
        this._notifyScopeListeners();
        return this;
      }
      setContext(key, context) {
        if (context === null) {
          delete this._contexts[key];
        } else {
          this._contexts[key] = context;
        }
        this._notifyScopeListeners();
        return this;
      }
      setSpan(span) {
        this._span = span;
        this._notifyScopeListeners();
        return this;
      }
      getSpan() {
        return this._span;
      }
      getTransaction() {
        const span = this.getSpan();
        return span && span.transaction;
      }
      setSession(session2) {
        if (!session2) {
          delete this._session;
        } else {
          this._session = session2;
        }
        this._notifyScopeListeners();
        return this;
      }
      getSession() {
        return this._session;
      }
      update(captureContext) {
        if (!captureContext) {
          return this;
        }
        if (typeof captureContext === "function") {
          const updatedScope = captureContext(this);
          return updatedScope instanceof Scope ? updatedScope : this;
        }
        if (captureContext instanceof Scope) {
          this._tags = { ...this._tags, ...captureContext._tags };
          this._extra = { ...this._extra, ...captureContext._extra };
          this._contexts = { ...this._contexts, ...captureContext._contexts };
          if (captureContext._user && Object.keys(captureContext._user).length) {
            this._user = captureContext._user;
          }
          if (captureContext._level) {
            this._level = captureContext._level;
          }
          if (captureContext._fingerprint) {
            this._fingerprint = captureContext._fingerprint;
          }
          if (captureContext._requestSession) {
            this._requestSession = captureContext._requestSession;
          }
          if (captureContext._propagationContext) {
            this._propagationContext = captureContext._propagationContext;
          }
        } else if (utils.isPlainObject(captureContext)) {
          captureContext = captureContext;
          this._tags = { ...this._tags, ...captureContext.tags };
          this._extra = { ...this._extra, ...captureContext.extra };
          this._contexts = { ...this._contexts, ...captureContext.contexts };
          if (captureContext.user) {
            this._user = captureContext.user;
          }
          if (captureContext.level) {
            this._level = captureContext.level;
          }
          if (captureContext.fingerprint) {
            this._fingerprint = captureContext.fingerprint;
          }
          if (captureContext.requestSession) {
            this._requestSession = captureContext.requestSession;
          }
          if (captureContext.propagationContext) {
            this._propagationContext = captureContext.propagationContext;
          }
        }
        return this;
      }
      clear() {
        this._breadcrumbs = [];
        this._tags = {};
        this._extra = {};
        this._user = {};
        this._contexts = {};
        this._level = void 0;
        this._transactionName = void 0;
        this._fingerprint = void 0;
        this._requestSession = void 0;
        this._span = void 0;
        this._session = void 0;
        this._notifyScopeListeners();
        this._attachments = [];
        this._propagationContext = generatePropagationContext();
        return this;
      }
      addBreadcrumb(breadcrumb, maxBreadcrumbs) {
        const maxCrumbs = typeof maxBreadcrumbs === "number" ? maxBreadcrumbs : DEFAULT_MAX_BREADCRUMBS;
        if (maxCrumbs <= 0) {
          return this;
        }
        const mergedBreadcrumb = {
          timestamp: utils.dateTimestampInSeconds(),
          ...breadcrumb
        };
        const breadcrumbs = this._breadcrumbs;
        breadcrumbs.push(mergedBreadcrumb);
        this._breadcrumbs = breadcrumbs.length > maxCrumbs ? breadcrumbs.slice(-maxCrumbs) : breadcrumbs;
        this._notifyScopeListeners();
        return this;
      }
      getLastBreadcrumb() {
        return this._breadcrumbs[this._breadcrumbs.length - 1];
      }
      clearBreadcrumbs() {
        this._breadcrumbs = [];
        this._notifyScopeListeners();
        return this;
      }
      addAttachment(attachment) {
        this._attachments.push(attachment);
        return this;
      }
      getAttachments() {
        return this._attachments;
      }
      clearAttachments() {
        this._attachments = [];
        return this;
      }
      applyToEvent(event, hint = {}) {
        if (this._extra && Object.keys(this._extra).length) {
          event.extra = { ...this._extra, ...event.extra };
        }
        if (this._tags && Object.keys(this._tags).length) {
          event.tags = { ...this._tags, ...event.tags };
        }
        if (this._user && Object.keys(this._user).length) {
          event.user = { ...this._user, ...event.user };
        }
        if (this._contexts && Object.keys(this._contexts).length) {
          event.contexts = { ...this._contexts, ...event.contexts };
        }
        if (this._level) {
          event.level = this._level;
        }
        if (this._transactionName) {
          event.transaction = this._transactionName;
        }
        if (this._span) {
          event.contexts = { trace: this._span.getTraceContext(), ...event.contexts };
          const transaction = this._span.transaction;
          if (transaction) {
            event.sdkProcessingMetadata = {
              dynamicSamplingContext: transaction.getDynamicSamplingContext(),
              ...event.sdkProcessingMetadata
            };
            const transactionName = transaction.name;
            if (transactionName) {
              event.tags = { transaction: transactionName, ...event.tags };
            }
          }
        }
        this._applyFingerprint(event);
        const scopeBreadcrumbs = this._getBreadcrumbs();
        const breadcrumbs = [...event.breadcrumbs || [], ...scopeBreadcrumbs];
        event.breadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : void 0;
        event.sdkProcessingMetadata = {
          ...event.sdkProcessingMetadata,
          ...this._sdkProcessingMetadata,
          propagationContext: this._propagationContext
        };
        return this._notifyEventProcessors([...getGlobalEventProcessors(), ...this._eventProcessors], event, hint);
      }
      setSDKProcessingMetadata(newData) {
        this._sdkProcessingMetadata = { ...this._sdkProcessingMetadata, ...newData };
        return this;
      }
      setPropagationContext(context) {
        this._propagationContext = context;
        return this;
      }
      getPropagationContext() {
        return this._propagationContext;
      }
      _getBreadcrumbs() {
        return this._breadcrumbs;
      }
      _notifyEventProcessors(processors, event, hint, index = 0) {
        return new utils.SyncPromise((resolve2, reject) => {
          const processor = processors[index];
          if (event === null || typeof processor !== "function") {
            resolve2(event);
          } else {
            const result = processor({ ...event }, hint);
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && processor.id && result === null && utils.logger.log(`Event processor "${processor.id}" dropped event`);
            if (utils.isThenable(result)) {
              void result.then((final) => this._notifyEventProcessors(processors, final, hint, index + 1).then(resolve2)).then(null, reject);
            } else {
              void this._notifyEventProcessors(processors, result, hint, index + 1).then(resolve2).then(null, reject);
            }
          }
        });
      }
      _notifyScopeListeners() {
        if (!this._notifyingListeners) {
          this._notifyingListeners = true;
          this._scopeListeners.forEach((callback) => {
            callback(this);
          });
          this._notifyingListeners = false;
        }
      }
      _applyFingerprint(event) {
        event.fingerprint = event.fingerprint ? utils.arrayify(event.fingerprint) : [];
        if (this._fingerprint) {
          event.fingerprint = event.fingerprint.concat(this._fingerprint);
        }
        if (event.fingerprint && !event.fingerprint.length) {
          delete event.fingerprint;
        }
      }
    };
    function getGlobalEventProcessors() {
      return utils.getGlobalSingleton("globalEventProcessors", () => []);
    }
    function addGlobalEventProcessor(callback) {
      getGlobalEventProcessors().push(callback);
    }
    function generatePropagationContext() {
      return {
        traceId: utils.uuid4(),
        spanId: utils.uuid4().substring(16)
      };
    }
    exports.Scope = Scope;
    exports.addGlobalEventProcessor = addGlobalEventProcessor;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/hub.js
var require_hub = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/hub.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var constants2 = require_constants();
    var scope = require_scope();
    var session = require_session();
    var API_VERSION = 4;
    var DEFAULT_BREADCRUMBS = 100;
    var Hub2 = class {
      constructor(client, scope$1 = new scope.Scope(), _version = API_VERSION) {
        this._version = _version;
        this._stack = [{ scope: scope$1 }];
        if (client) {
          this.bindClient(client);
        }
      }
      isOlderThan(version) {
        return this._version < version;
      }
      bindClient(client) {
        const top = this.getStackTop();
        top.client = client;
        if (client && client.setupIntegrations) {
          client.setupIntegrations();
        }
      }
      pushScope() {
        const scope$1 = scope.Scope.clone(this.getScope());
        this.getStack().push({
          client: this.getClient(),
          scope: scope$1
        });
        return scope$1;
      }
      popScope() {
        if (this.getStack().length <= 1)
          return false;
        return !!this.getStack().pop();
      }
      withScope(callback) {
        const scope2 = this.pushScope();
        try {
          callback(scope2);
        } finally {
          this.popScope();
        }
      }
      getClient() {
        return this.getStackTop().client;
      }
      getScope() {
        return this.getStackTop().scope;
      }
      getStack() {
        return this._stack;
      }
      getStackTop() {
        return this._stack[this._stack.length - 1];
      }
      captureException(exception, hint) {
        const eventId = this._lastEventId = hint && hint.event_id ? hint.event_id : utils.uuid4();
        const syntheticException = new Error("Sentry syntheticException");
        this._withClient((client, scope2) => {
          client.captureException(
            exception,
            {
              originalException: exception,
              syntheticException,
              ...hint,
              event_id: eventId
            },
            scope2
          );
        });
        return eventId;
      }
      captureMessage(message, level, hint) {
        const eventId = this._lastEventId = hint && hint.event_id ? hint.event_id : utils.uuid4();
        const syntheticException = new Error(message);
        this._withClient((client, scope2) => {
          client.captureMessage(
            message,
            level,
            {
              originalException: message,
              syntheticException,
              ...hint,
              event_id: eventId
            },
            scope2
          );
        });
        return eventId;
      }
      captureEvent(event, hint) {
        const eventId = hint && hint.event_id ? hint.event_id : utils.uuid4();
        if (!event.type) {
          this._lastEventId = eventId;
        }
        this._withClient((client, scope2) => {
          client.captureEvent(event, { ...hint, event_id: eventId }, scope2);
        });
        return eventId;
      }
      lastEventId() {
        return this._lastEventId;
      }
      addBreadcrumb(breadcrumb, hint) {
        const { scope: scope2, client } = this.getStackTop();
        if (!client)
          return;
        const { beforeBreadcrumb = null, maxBreadcrumbs = DEFAULT_BREADCRUMBS } = client.getOptions && client.getOptions() || {};
        if (maxBreadcrumbs <= 0)
          return;
        const timestamp = utils.dateTimestampInSeconds();
        const mergedBreadcrumb = { timestamp, ...breadcrumb };
        const finalBreadcrumb = beforeBreadcrumb ? utils.consoleSandbox(() => beforeBreadcrumb(mergedBreadcrumb, hint)) : mergedBreadcrumb;
        if (finalBreadcrumb === null)
          return;
        if (client.emit) {
          client.emit("beforeAddBreadcrumb", finalBreadcrumb, hint);
        }
        scope2.addBreadcrumb(finalBreadcrumb, maxBreadcrumbs);
      }
      setUser(user) {
        this.getScope().setUser(user);
      }
      setTags(tags) {
        this.getScope().setTags(tags);
      }
      setExtras(extras) {
        this.getScope().setExtras(extras);
      }
      setTag(key, value) {
        this.getScope().setTag(key, value);
      }
      setExtra(key, extra) {
        this.getScope().setExtra(key, extra);
      }
      setContext(name, context) {
        this.getScope().setContext(name, context);
      }
      configureScope(callback) {
        const { scope: scope2, client } = this.getStackTop();
        if (client) {
          callback(scope2);
        }
      }
      run(callback) {
        const oldHub = makeMain2(this);
        try {
          callback(this);
        } finally {
          makeMain2(oldHub);
        }
      }
      getIntegration(integration) {
        const client = this.getClient();
        if (!client)
          return null;
        try {
          return client.getIntegration(integration);
        } catch (_oO) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn(`Cannot retrieve integration ${integration.id} from the current Hub`);
          return null;
        }
      }
      startTransaction(context, customSamplingContext) {
        const result = this._callExtensionMethod("startTransaction", context, customSamplingContext);
        if ((typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && !result) {
          const client = this.getClient();
          if (!client) {
            console.warn(
              "Tracing extension 'startTransaction' is missing. You should 'init' the SDK before calling 'startTransaction'"
            );
          } else {
            console.warn(`Tracing extension 'startTransaction' has not been added. Call 'addTracingExtensions' before calling 'init':
Sentry.addTracingExtensions();
Sentry.init({...});
`);
          }
        }
        return result;
      }
      traceHeaders() {
        return this._callExtensionMethod("traceHeaders");
      }
      captureSession(endSession = false) {
        if (endSession) {
          return this.endSession();
        }
        this._sendSessionUpdate();
      }
      endSession() {
        const layer = this.getStackTop();
        const scope2 = layer.scope;
        const session$1 = scope2.getSession();
        if (session$1) {
          session.closeSession(session$1);
        }
        this._sendSessionUpdate();
        scope2.setSession();
      }
      startSession(context) {
        const { scope: scope2, client } = this.getStackTop();
        const { release, environment = constants2.DEFAULT_ENVIRONMENT } = client && client.getOptions() || {};
        const { userAgent } = utils.GLOBAL_OBJ.navigator || {};
        const session$1 = session.makeSession({
          release,
          environment,
          user: scope2.getUser(),
          ...userAgent && { userAgent },
          ...context
        });
        const currentSession = scope2.getSession && scope2.getSession();
        if (currentSession && currentSession.status === "ok") {
          session.updateSession(currentSession, { status: "exited" });
        }
        this.endSession();
        scope2.setSession(session$1);
        return session$1;
      }
      shouldSendDefaultPii() {
        const client = this.getClient();
        const options = client && client.getOptions();
        return Boolean(options && options.sendDefaultPii);
      }
      _sendSessionUpdate() {
        const { scope: scope2, client } = this.getStackTop();
        const session2 = scope2.getSession();
        if (session2 && client && client.captureSession) {
          client.captureSession(session2);
        }
      }
      _withClient(callback) {
        const { scope: scope2, client } = this.getStackTop();
        if (client) {
          callback(client, scope2);
        }
      }
      _callExtensionMethod(method, ...args) {
        const carrier = getMainCarrier();
        const sentry = carrier.__SENTRY__;
        if (sentry && sentry.extensions && typeof sentry.extensions[method] === "function") {
          return sentry.extensions[method].apply(this, args);
        }
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn(`Extension method ${method} couldn't be found, doing nothing.`);
      }
    };
    function getMainCarrier() {
      utils.GLOBAL_OBJ.__SENTRY__ = utils.GLOBAL_OBJ.__SENTRY__ || {
        extensions: {},
        hub: void 0
      };
      return utils.GLOBAL_OBJ;
    }
    function makeMain2(hub) {
      const registry = getMainCarrier();
      const oldHub = getHubFromCarrier(registry);
      setHubOnCarrier(registry, hub);
      return oldHub;
    }
    function getCurrentHub() {
      const registry = getMainCarrier();
      if (registry.__SENTRY__ && registry.__SENTRY__.acs) {
        const hub = registry.__SENTRY__.acs.getCurrentHub();
        if (hub) {
          return hub;
        }
      }
      return getGlobalHub(registry);
    }
    function getGlobalHub(registry = getMainCarrier()) {
      if (!hasHubOnCarrier(registry) || getHubFromCarrier(registry).isOlderThan(API_VERSION)) {
        setHubOnCarrier(registry, new Hub2());
      }
      return getHubFromCarrier(registry);
    }
    function ensureHubOnCarrier(carrier, parent = getGlobalHub()) {
      if (!hasHubOnCarrier(carrier) || getHubFromCarrier(carrier).isOlderThan(API_VERSION)) {
        const globalHubTopStack = parent.getStackTop();
        setHubOnCarrier(carrier, new Hub2(globalHubTopStack.client, scope.Scope.clone(globalHubTopStack.scope)));
      }
    }
    function setAsyncContextStrategy(strategy) {
      const registry = getMainCarrier();
      registry.__SENTRY__ = registry.__SENTRY__ || {};
      registry.__SENTRY__.acs = strategy;
    }
    function runWithAsyncContext2(callback, options = {}) {
      const registry = getMainCarrier();
      if (registry.__SENTRY__ && registry.__SENTRY__.acs) {
        return registry.__SENTRY__.acs.runWithAsyncContext(callback, options);
      }
      return callback();
    }
    function hasHubOnCarrier(carrier) {
      return !!(carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub);
    }
    function getHubFromCarrier(carrier) {
      return utils.getGlobalSingleton("hub", () => new Hub2(), carrier);
    }
    function setHubOnCarrier(carrier, hub) {
      if (!carrier)
        return false;
      const __SENTRY__ = carrier.__SENTRY__ = carrier.__SENTRY__ || {};
      __SENTRY__.hub = hub;
      return true;
    }
    exports.API_VERSION = API_VERSION;
    exports.Hub = Hub2;
    exports.ensureHubOnCarrier = ensureHubOnCarrier;
    exports.getCurrentHub = getCurrentHub;
    exports.getHubFromCarrier = getHubFromCarrier;
    exports.getMainCarrier = getMainCarrier;
    exports.makeMain = makeMain2;
    exports.runWithAsyncContext = runWithAsyncContext2;
    exports.setAsyncContextStrategy = setAsyncContextStrategy;
    exports.setHubOnCarrier = setHubOnCarrier;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/utils/hasTracingEnabled.js
var require_hasTracingEnabled = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/utils/hasTracingEnabled.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var hub = require_hub();
    function hasTracingEnabled(maybeOptions) {
      if (typeof __SENTRY_TRACING__ === "boolean" && !__SENTRY_TRACING__) {
        return false;
      }
      const client = hub.getCurrentHub().getClient();
      const options = maybeOptions || client && client.getOptions();
      return !!options && (options.enableTracing || "tracesSampleRate" in options || "tracesSampler" in options);
    }
    exports.hasTracingEnabled = hasTracingEnabled;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/utils.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/utils.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var hub = require_hub();
    var utils = require_cjs();
    function getActiveTransaction(maybeHub) {
      const hub$1 = maybeHub || hub.getCurrentHub();
      const scope = hub$1.getScope();
      return scope.getTransaction();
    }
    exports.TRACEPARENT_REGEXP = utils.TRACEPARENT_REGEXP;
    exports.extractTraceparentData = utils.extractTraceparentData;
    exports.stripUrlQueryAndFragment = utils.stripUrlQueryAndFragment;
    exports.getActiveTransaction = getActiveTransaction;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/errors.js
var require_errors = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/errors.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var utils$1 = require_utils();
    var errorsInstrumented = false;
    function registerErrorInstrumentation() {
      if (errorsInstrumented) {
        return;
      }
      errorsInstrumented = true;
      utils.addInstrumentationHandler("error", errorCallback);
      utils.addInstrumentationHandler("unhandledrejection", errorCallback);
    }
    function errorCallback() {
      const activeTransaction = utils$1.getActiveTransaction();
      if (activeTransaction) {
        const status = "internal_error";
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(`[Tracing] Transaction: ${status} -> Global error occured`);
        activeTransaction.setStatus(status);
      }
    }
    errorCallback.tag = "sentry_tracingErrorCallback";
    exports.registerErrorInstrumentation = registerErrorInstrumentation;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/span.js
var require_span = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/span.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var SpanRecorder = class {
      constructor(maxlen = 1e3) {
        this._maxlen = maxlen;
        this.spans = [];
      }
      add(span) {
        if (this.spans.length > this._maxlen) {
          span.spanRecorder = void 0;
        } else {
          this.spans.push(span);
        }
      }
    };
    var Span = class {
      constructor(spanContext = {}) {
        this.traceId = spanContext.traceId || utils.uuid4();
        this.spanId = spanContext.spanId || utils.uuid4().substring(16);
        this.startTimestamp = spanContext.startTimestamp || utils.timestampInSeconds();
        this.tags = spanContext.tags || {};
        this.data = spanContext.data || {};
        this.instrumenter = spanContext.instrumenter || "sentry";
        this.origin = spanContext.origin || "manual";
        if (spanContext.parentSpanId) {
          this.parentSpanId = spanContext.parentSpanId;
        }
        if ("sampled" in spanContext) {
          this.sampled = spanContext.sampled;
        }
        if (spanContext.op) {
          this.op = spanContext.op;
        }
        if (spanContext.description) {
          this.description = spanContext.description;
        }
        if (spanContext.name) {
          this.description = spanContext.name;
        }
        if (spanContext.status) {
          this.status = spanContext.status;
        }
        if (spanContext.endTimestamp) {
          this.endTimestamp = spanContext.endTimestamp;
        }
      }
      get name() {
        return this.description || "";
      }
      set name(name) {
        this.setName(name);
      }
      startChild(spanContext) {
        const childSpan = new Span({
          ...spanContext,
          parentSpanId: this.spanId,
          sampled: this.sampled,
          traceId: this.traceId
        });
        childSpan.spanRecorder = this.spanRecorder;
        if (childSpan.spanRecorder) {
          childSpan.spanRecorder.add(childSpan);
        }
        childSpan.transaction = this.transaction;
        if ((typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && childSpan.transaction) {
          const opStr = spanContext && spanContext.op || "< unknown op >";
          const nameStr = childSpan.transaction.name || "< unknown name >";
          const idStr = childSpan.transaction.spanId;
          const logMessage = `[Tracing] Starting '${opStr}' span on transaction '${nameStr}' (${idStr}).`;
          childSpan.transaction.metadata.spanMetadata[childSpan.spanId] = { logMessage };
          utils.logger.log(logMessage);
        }
        return childSpan;
      }
      setTag(key, value) {
        this.tags = { ...this.tags, [key]: value };
        return this;
      }
      setData(key, value) {
        this.data = { ...this.data, [key]: value };
        return this;
      }
      setStatus(value) {
        this.status = value;
        return this;
      }
      setHttpStatus(httpStatus) {
        this.setTag("http.status_code", String(httpStatus));
        this.setData("http.response.status_code", httpStatus);
        const spanStatus = spanStatusfromHttpCode(httpStatus);
        if (spanStatus !== "unknown_error") {
          this.setStatus(spanStatus);
        }
        return this;
      }
      setName(name) {
        this.description = name;
      }
      isSuccess() {
        return this.status === "ok";
      }
      finish(endTimestamp) {
        if ((typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && this.transaction && this.transaction.spanId !== this.spanId) {
          const { logMessage } = this.transaction.metadata.spanMetadata[this.spanId];
          if (logMessage) {
            utils.logger.log(logMessage.replace("Starting", "Finishing"));
          }
        }
        this.endTimestamp = typeof endTimestamp === "number" ? endTimestamp : utils.timestampInSeconds();
      }
      toTraceparent() {
        return utils.generateSentryTraceHeader(this.traceId, this.spanId, this.sampled);
      }
      toContext() {
        return utils.dropUndefinedKeys({
          data: this.data,
          description: this.description,
          endTimestamp: this.endTimestamp,
          op: this.op,
          parentSpanId: this.parentSpanId,
          sampled: this.sampled,
          spanId: this.spanId,
          startTimestamp: this.startTimestamp,
          status: this.status,
          tags: this.tags,
          traceId: this.traceId
        });
      }
      updateWithContext(spanContext) {
        this.data = spanContext.data || {};
        this.description = spanContext.description;
        this.endTimestamp = spanContext.endTimestamp;
        this.op = spanContext.op;
        this.parentSpanId = spanContext.parentSpanId;
        this.sampled = spanContext.sampled;
        this.spanId = spanContext.spanId || this.spanId;
        this.startTimestamp = spanContext.startTimestamp || this.startTimestamp;
        this.status = spanContext.status;
        this.tags = spanContext.tags || {};
        this.traceId = spanContext.traceId || this.traceId;
        return this;
      }
      getTraceContext() {
        return utils.dropUndefinedKeys({
          data: Object.keys(this.data).length > 0 ? this.data : void 0,
          description: this.description,
          op: this.op,
          parent_span_id: this.parentSpanId,
          span_id: this.spanId,
          status: this.status,
          tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
          trace_id: this.traceId
        });
      }
      toJSON() {
        return utils.dropUndefinedKeys({
          data: Object.keys(this.data).length > 0 ? this.data : void 0,
          description: this.description,
          op: this.op,
          parent_span_id: this.parentSpanId,
          span_id: this.spanId,
          start_timestamp: this.startTimestamp,
          status: this.status,
          tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
          timestamp: this.endTimestamp,
          trace_id: this.traceId,
          origin: this.origin
        });
      }
    };
    function spanStatusfromHttpCode(httpStatus) {
      if (httpStatus < 400 && httpStatus >= 100) {
        return "ok";
      }
      if (httpStatus >= 400 && httpStatus < 500) {
        switch (httpStatus) {
          case 401:
            return "unauthenticated";
          case 403:
            return "permission_denied";
          case 404:
            return "not_found";
          case 409:
            return "already_exists";
          case 413:
            return "failed_precondition";
          case 429:
            return "resource_exhausted";
          default:
            return "invalid_argument";
        }
      }
      if (httpStatus >= 500 && httpStatus < 600) {
        switch (httpStatus) {
          case 501:
            return "unimplemented";
          case 503:
            return "unavailable";
          case 504:
            return "deadline_exceeded";
          default:
            return "internal_error";
        }
      }
      return "unknown_error";
    }
    exports.Span = Span;
    exports.SpanRecorder = SpanRecorder;
    exports.spanStatusfromHttpCode = spanStatusfromHttpCode;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/dynamicSamplingContext.js
var require_dynamicSamplingContext = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/dynamicSamplingContext.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var constants2 = require_constants();
    function getDynamicSamplingContextFromClient(trace_id, client, scope) {
      const options = client.getOptions();
      const { publicKey: public_key } = client.getDsn() || {};
      const { segment: user_segment } = scope && scope.getUser() || {};
      const dsc = utils.dropUndefinedKeys({
        environment: options.environment || constants2.DEFAULT_ENVIRONMENT,
        release: options.release,
        user_segment,
        public_key,
        trace_id
      });
      client.emit && client.emit("createDsc", dsc);
      return dsc;
    }
    exports.getDynamicSamplingContextFromClient = getDynamicSamplingContextFromClient;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/transaction.js
var require_transaction = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/transaction.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var hub = require_hub();
    var dynamicSamplingContext = require_dynamicSamplingContext();
    var span = require_span();
    var Transaction = class extends span.Span {
      constructor(transactionContext, hub$1) {
        super(transactionContext);
        delete this.description;
        this._measurements = {};
        this._contexts = {};
        this._hub = hub$1 || hub.getCurrentHub();
        this._name = transactionContext.name || "";
        this.metadata = {
          source: "custom",
          ...transactionContext.metadata,
          spanMetadata: {}
        };
        this._trimEnd = transactionContext.trimEnd;
        this.transaction = this;
        const incomingDynamicSamplingContext = this.metadata.dynamicSamplingContext;
        if (incomingDynamicSamplingContext) {
          this._frozenDynamicSamplingContext = { ...incomingDynamicSamplingContext };
        }
      }
      get name() {
        return this._name;
      }
      set name(newName) {
        this.setName(newName);
      }
      setName(name, source = "custom") {
        this._name = name;
        this.metadata.source = source;
      }
      initSpanRecorder(maxlen = 1e3) {
        if (!this.spanRecorder) {
          this.spanRecorder = new span.SpanRecorder(maxlen);
        }
        this.spanRecorder.add(this);
      }
      setContext(key, context) {
        if (context === null) {
          delete this._contexts[key];
        } else {
          this._contexts[key] = context;
        }
      }
      setMeasurement(name, value, unit = "") {
        this._measurements[name] = { value, unit };
      }
      setMetadata(newMetadata) {
        this.metadata = { ...this.metadata, ...newMetadata };
      }
      finish(endTimestamp) {
        if (this.endTimestamp !== void 0) {
          return void 0;
        }
        if (!this.name) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("Transaction has no name, falling back to `<unlabeled transaction>`.");
          this.name = "<unlabeled transaction>";
        }
        super.finish(endTimestamp);
        const client = this._hub.getClient();
        if (client && client.emit) {
          client.emit("finishTransaction", this);
        }
        if (this.sampled !== true) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled.");
          if (client) {
            client.recordDroppedEvent("sample_rate", "transaction");
          }
          return void 0;
        }
        const finishedSpans = this.spanRecorder ? this.spanRecorder.spans.filter((s) => s !== this && s.endTimestamp) : [];
        if (this._trimEnd && finishedSpans.length > 0) {
          this.endTimestamp = finishedSpans.reduce((prev, current) => {
            if (prev.endTimestamp && current.endTimestamp) {
              return prev.endTimestamp > current.endTimestamp ? prev : current;
            }
            return prev;
          }).endTimestamp;
        }
        const metadata = this.metadata;
        const transaction = {
          contexts: {
            ...this._contexts,
            trace: this.getTraceContext()
          },
          spans: finishedSpans,
          start_timestamp: this.startTimestamp,
          tags: this.tags,
          timestamp: this.endTimestamp,
          transaction: this.name,
          type: "transaction",
          sdkProcessingMetadata: {
            ...metadata,
            dynamicSamplingContext: this.getDynamicSamplingContext()
          },
          ...metadata.source && {
            transaction_info: {
              source: metadata.source
            }
          }
        };
        const hasMeasurements = Object.keys(this._measurements).length > 0;
        if (hasMeasurements) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(
            "[Measurements] Adding measurements to transaction",
            JSON.stringify(this._measurements, void 0, 2)
          );
          transaction.measurements = this._measurements;
        }
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(`[Tracing] Finishing ${this.op} transaction: ${this.name}.`);
        return this._hub.captureEvent(transaction);
      }
      toContext() {
        const spanContext = super.toContext();
        return utils.dropUndefinedKeys({
          ...spanContext,
          name: this.name,
          trimEnd: this._trimEnd
        });
      }
      updateWithContext(transactionContext) {
        super.updateWithContext(transactionContext);
        this.name = transactionContext.name || "";
        this._trimEnd = transactionContext.trimEnd;
        return this;
      }
      getDynamicSamplingContext() {
        if (this._frozenDynamicSamplingContext) {
          return this._frozenDynamicSamplingContext;
        }
        const hub$1 = this._hub || hub.getCurrentHub();
        const client = hub$1.getClient();
        if (!client)
          return {};
        const scope = hub$1.getScope();
        const dsc = dynamicSamplingContext.getDynamicSamplingContextFromClient(this.traceId, client, scope);
        const maybeSampleRate = this.metadata.sampleRate;
        if (maybeSampleRate !== void 0) {
          dsc.sample_rate = `${maybeSampleRate}`;
        }
        const source = this.metadata.source;
        if (source && source !== "url") {
          dsc.transaction = this.name;
        }
        if (this.sampled !== void 0) {
          dsc.sampled = String(this.sampled);
        }
        return dsc;
      }
      setHub(hub2) {
        this._hub = hub2;
      }
    };
    exports.Transaction = Transaction;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/idletransaction.js
var require_idletransaction = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/idletransaction.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var span = require_span();
    var transaction = require_transaction();
    var TRACING_DEFAULTS = {
      idleTimeout: 1e3,
      finalTimeout: 3e4,
      heartbeatInterval: 5e3
    };
    var FINISH_REASON_TAG = "finishReason";
    var IDLE_TRANSACTION_FINISH_REASONS = [
      "heartbeatFailed",
      "idleTimeout",
      "documentHidden",
      "finalTimeout",
      "externalFinish",
      "cancelled"
    ];
    var IdleTransactionSpanRecorder = class extends span.SpanRecorder {
      constructor(_pushActivity, _popActivity, transactionSpanId, maxlen) {
        super(maxlen);
        this._pushActivity = _pushActivity;
        this._popActivity = _popActivity;
        this.transactionSpanId = transactionSpanId;
      }
      add(span2) {
        if (span2.spanId !== this.transactionSpanId) {
          span2.finish = (endTimestamp) => {
            span2.endTimestamp = typeof endTimestamp === "number" ? endTimestamp : utils.timestampInSeconds();
            this._popActivity(span2.spanId);
          };
          if (span2.endTimestamp === void 0) {
            this._pushActivity(span2.spanId);
          }
        }
        super.add(span2);
      }
    };
    var IdleTransaction = class extends transaction.Transaction {
      constructor(transactionContext, _idleHub, _idleTimeout = TRACING_DEFAULTS.idleTimeout, _finalTimeout = TRACING_DEFAULTS.finalTimeout, _heartbeatInterval = TRACING_DEFAULTS.heartbeatInterval, _onScope = false) {
        super(transactionContext, _idleHub);
        this._idleHub = _idleHub;
        this._idleTimeout = _idleTimeout;
        this._finalTimeout = _finalTimeout;
        this._heartbeatInterval = _heartbeatInterval;
        this._onScope = _onScope;
        this.activities = {};
        this._heartbeatCounter = 0;
        this._finished = false;
        this._idleTimeoutCanceledPermanently = false;
        this._beforeFinishCallbacks = [];
        this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[4];
        if (_onScope) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(`Setting idle transaction on scope. Span ID: ${this.spanId}`);
          _idleHub.configureScope((scope) => scope.setSpan(this));
        }
        this._restartIdleTimeout();
        setTimeout(() => {
          if (!this._finished) {
            this.setStatus("deadline_exceeded");
            this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[3];
            this.finish();
          }
        }, this._finalTimeout);
      }
      finish(endTimestamp = utils.timestampInSeconds()) {
        this._finished = true;
        this.activities = {};
        if (this.op === "ui.action.click") {
          this.setTag(FINISH_REASON_TAG, this._finishReason);
        }
        if (this.spanRecorder) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("[Tracing] finishing IdleTransaction", new Date(endTimestamp * 1e3).toISOString(), this.op);
          for (const callback of this._beforeFinishCallbacks) {
            callback(this, endTimestamp);
          }
          this.spanRecorder.spans = this.spanRecorder.spans.filter((span2) => {
            if (span2.spanId === this.spanId) {
              return true;
            }
            if (!span2.endTimestamp) {
              span2.endTimestamp = endTimestamp;
              span2.setStatus("cancelled");
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("[Tracing] cancelling span since transaction ended early", JSON.stringify(span2, void 0, 2));
            }
            const spanStartedBeforeTransactionFinish = span2.startTimestamp < endTimestamp;
            const timeoutWithMarginOfError = (this._finalTimeout + this._idleTimeout) / 1e3;
            const spanEndedBeforeFinalTimeout = span2.endTimestamp - this.startTimestamp < timeoutWithMarginOfError;
            if (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) {
              const stringifiedSpan = JSON.stringify(span2, void 0, 2);
              if (!spanStartedBeforeTransactionFinish) {
                utils.logger.log("[Tracing] discarding Span since it happened after Transaction was finished", stringifiedSpan);
              } else if (!spanEndedBeforeFinalTimeout) {
                utils.logger.log("[Tracing] discarding Span since it finished after Transaction final timeout", stringifiedSpan);
              }
            }
            return spanStartedBeforeTransactionFinish && spanEndedBeforeFinalTimeout;
          });
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("[Tracing] flushing IdleTransaction");
        } else {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("[Tracing] No active IdleTransaction");
        }
        if (this._onScope) {
          const scope = this._idleHub.getScope();
          if (scope.getTransaction() === this) {
            scope.setSpan(void 0);
          }
        }
        return super.finish(endTimestamp);
      }
      registerBeforeFinishCallback(callback) {
        this._beforeFinishCallbacks.push(callback);
      }
      initSpanRecorder(maxlen) {
        if (!this.spanRecorder) {
          const pushActivity = (id) => {
            if (this._finished) {
              return;
            }
            this._pushActivity(id);
          };
          const popActivity = (id) => {
            if (this._finished) {
              return;
            }
            this._popActivity(id);
          };
          this.spanRecorder = new IdleTransactionSpanRecorder(pushActivity, popActivity, this.spanId, maxlen);
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("Starting heartbeat");
          this._pingHeartbeat();
        }
        this.spanRecorder.add(this);
      }
      cancelIdleTimeout(endTimestamp, {
        restartOnChildSpanChange
      } = {
        restartOnChildSpanChange: true
      }) {
        this._idleTimeoutCanceledPermanently = restartOnChildSpanChange === false;
        if (this._idleTimeoutID) {
          clearTimeout(this._idleTimeoutID);
          this._idleTimeoutID = void 0;
          if (Object.keys(this.activities).length === 0 && this._idleTimeoutCanceledPermanently) {
            this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[5];
            this.finish(endTimestamp);
          }
        }
      }
      setFinishReason(reason) {
        this._finishReason = reason;
      }
      _restartIdleTimeout(endTimestamp) {
        this.cancelIdleTimeout();
        this._idleTimeoutID = setTimeout(() => {
          if (!this._finished && Object.keys(this.activities).length === 0) {
            this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[1];
            this.finish(endTimestamp);
          }
        }, this._idleTimeout);
      }
      _pushActivity(spanId) {
        this.cancelIdleTimeout(void 0, { restartOnChildSpanChange: !this._idleTimeoutCanceledPermanently });
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(`[Tracing] pushActivity: ${spanId}`);
        this.activities[spanId] = true;
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("[Tracing] new activities count", Object.keys(this.activities).length);
      }
      _popActivity(spanId) {
        if (this.activities[spanId]) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(`[Tracing] popActivity ${spanId}`);
          delete this.activities[spanId];
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("[Tracing] new activities count", Object.keys(this.activities).length);
        }
        if (Object.keys(this.activities).length === 0) {
          const endTimestamp = utils.timestampInSeconds();
          if (this._idleTimeoutCanceledPermanently) {
            this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[5];
            this.finish(endTimestamp);
          } else {
            this._restartIdleTimeout(endTimestamp + this._idleTimeout / 1e3);
          }
        }
      }
      _beat() {
        if (this._finished) {
          return;
        }
        const heartbeatString = Object.keys(this.activities).join("");
        if (heartbeatString === this._prevHeartbeatString) {
          this._heartbeatCounter++;
        } else {
          this._heartbeatCounter = 1;
        }
        this._prevHeartbeatString = heartbeatString;
        if (this._heartbeatCounter >= 3) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("[Tracing] Transaction finished because of no change for 3 heart beats");
          this.setStatus("deadline_exceeded");
          this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[0];
          this.finish();
        } else {
          this._pingHeartbeat();
        }
      }
      _pingHeartbeat() {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(`pinging Heartbeat -> current counter: ${this._heartbeatCounter}`);
        setTimeout(() => {
          this._beat();
        }, this._heartbeatInterval);
      }
    };
    exports.IdleTransaction = IdleTransaction;
    exports.IdleTransactionSpanRecorder = IdleTransactionSpanRecorder;
    exports.TRACING_DEFAULTS = TRACING_DEFAULTS;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/hubextensions.js
var require_hubextensions = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/hubextensions.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var hub = require_hub();
    var hasTracingEnabled = require_hasTracingEnabled();
    var errors = require_errors();
    var idletransaction = require_idletransaction();
    var transaction = require_transaction();
    function traceHeaders() {
      const scope = this.getScope();
      const span = scope.getSpan();
      return span ? {
        "sentry-trace": span.toTraceparent()
      } : {};
    }
    function sample(transaction2, options, samplingContext) {
      if (!hasTracingEnabled.hasTracingEnabled(options)) {
        transaction2.sampled = false;
        return transaction2;
      }
      if (transaction2.sampled !== void 0) {
        transaction2.setMetadata({
          sampleRate: Number(transaction2.sampled)
        });
        return transaction2;
      }
      let sampleRate;
      if (typeof options.tracesSampler === "function") {
        sampleRate = options.tracesSampler(samplingContext);
        transaction2.setMetadata({
          sampleRate: Number(sampleRate)
        });
      } else if (samplingContext.parentSampled !== void 0) {
        sampleRate = samplingContext.parentSampled;
      } else if (typeof options.tracesSampleRate !== "undefined") {
        sampleRate = options.tracesSampleRate;
        transaction2.setMetadata({
          sampleRate: Number(sampleRate)
        });
      } else {
        sampleRate = 1;
        transaction2.setMetadata({
          sampleRate
        });
      }
      if (!isValidSampleRate(sampleRate)) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("[Tracing] Discarding transaction because of invalid sample rate.");
        transaction2.sampled = false;
        return transaction2;
      }
      if (!sampleRate) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(
          `[Tracing] Discarding transaction because ${typeof options.tracesSampler === "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`
        );
        transaction2.sampled = false;
        return transaction2;
      }
      transaction2.sampled = Math.random() < sampleRate;
      if (!transaction2.sampled) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(
          `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
            sampleRate
          )})`
        );
        return transaction2;
      }
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(`[Tracing] starting ${transaction2.op} transaction - ${transaction2.name}`);
      return transaction2;
    }
    function isValidSampleRate(rate) {
      if (utils.isNaN(rate) || !(typeof rate === "number" || typeof rate === "boolean")) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn(
          `[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(
            rate
          )} of type ${JSON.stringify(typeof rate)}.`
        );
        return false;
      }
      if (rate < 0 || rate > 1) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn(`[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got ${rate}.`);
        return false;
      }
      return true;
    }
    function _startTransaction(transactionContext, customSamplingContext) {
      const client = this.getClient();
      const options = client && client.getOptions() || {};
      const configInstrumenter = options.instrumenter || "sentry";
      const transactionInstrumenter = transactionContext.instrumenter || "sentry";
      if (configInstrumenter !== transactionInstrumenter) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.error(
          `A transaction was started with instrumenter=\`${transactionInstrumenter}\`, but the SDK is configured with the \`${configInstrumenter}\` instrumenter.
The transaction will not be sampled. Please use the ${configInstrumenter} instrumentation to start transactions.`
        );
        transactionContext.sampled = false;
      }
      let transaction$1 = new transaction.Transaction(transactionContext, this);
      transaction$1 = sample(transaction$1, options, {
        parentSampled: transactionContext.parentSampled,
        transactionContext,
        ...customSamplingContext
      });
      if (transaction$1.sampled) {
        transaction$1.initSpanRecorder(options._experiments && options._experiments.maxSpans);
      }
      if (client && client.emit) {
        client.emit("startTransaction", transaction$1);
      }
      return transaction$1;
    }
    function startIdleTransaction(hub2, transactionContext, idleTimeout, finalTimeout, onScope, customSamplingContext, heartbeatInterval) {
      const client = hub2.getClient();
      const options = client && client.getOptions() || {};
      let transaction2 = new idletransaction.IdleTransaction(transactionContext, hub2, idleTimeout, finalTimeout, heartbeatInterval, onScope);
      transaction2 = sample(transaction2, options, {
        parentSampled: transactionContext.parentSampled,
        transactionContext,
        ...customSamplingContext
      });
      if (transaction2.sampled) {
        transaction2.initSpanRecorder(options._experiments && options._experiments.maxSpans);
      }
      if (client && client.emit) {
        client.emit("startTransaction", transaction2);
      }
      return transaction2;
    }
    function addTracingExtensions() {
      const carrier = hub.getMainCarrier();
      if (!carrier.__SENTRY__) {
        return;
      }
      carrier.__SENTRY__.extensions = carrier.__SENTRY__.extensions || {};
      if (!carrier.__SENTRY__.extensions.startTransaction) {
        carrier.__SENTRY__.extensions.startTransaction = _startTransaction;
      }
      if (!carrier.__SENTRY__.extensions.traceHeaders) {
        carrier.__SENTRY__.extensions.traceHeaders = traceHeaders;
      }
      errors.registerErrorInstrumentation();
    }
    exports.addTracingExtensions = addTracingExtensions;
    exports.startIdleTransaction = startIdleTransaction;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/spanstatus.js
var require_spanstatus = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/spanstatus.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpanStatus = void 0;
    (function(SpanStatus) {
      const Ok = "ok";
      SpanStatus["Ok"] = Ok;
      const DeadlineExceeded = "deadline_exceeded";
      SpanStatus["DeadlineExceeded"] = DeadlineExceeded;
      const Unauthenticated = "unauthenticated";
      SpanStatus["Unauthenticated"] = Unauthenticated;
      const PermissionDenied = "permission_denied";
      SpanStatus["PermissionDenied"] = PermissionDenied;
      const NotFound = "not_found";
      SpanStatus["NotFound"] = NotFound;
      const ResourceExhausted = "resource_exhausted";
      SpanStatus["ResourceExhausted"] = ResourceExhausted;
      const InvalidArgument = "invalid_argument";
      SpanStatus["InvalidArgument"] = InvalidArgument;
      const Unimplemented = "unimplemented";
      SpanStatus["Unimplemented"] = Unimplemented;
      const Unavailable = "unavailable";
      SpanStatus["Unavailable"] = Unavailable;
      const InternalError = "internal_error";
      SpanStatus["InternalError"] = InternalError;
      const UnknownError = "unknown_error";
      SpanStatus["UnknownError"] = UnknownError;
      const Cancelled = "cancelled";
      SpanStatus["Cancelled"] = Cancelled;
      const AlreadyExists = "already_exists";
      SpanStatus["AlreadyExists"] = AlreadyExists;
      const FailedPrecondition = "failed_precondition";
      SpanStatus["FailedPrecondition"] = FailedPrecondition;
      const Aborted = "aborted";
      SpanStatus["Aborted"] = Aborted;
      const OutOfRange = "out_of_range";
      SpanStatus["OutOfRange"] = OutOfRange;
      const DataLoss = "data_loss";
      SpanStatus["DataLoss"] = DataLoss;
    })(exports.SpanStatus || (exports.SpanStatus = {}));
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/trace.js
var require_trace = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/trace.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var hub = require_hub();
    var hasTracingEnabled = require_hasTracingEnabled();
    function trace(context, callback, onError = () => {
    }) {
      const ctx = normalizeContext(context);
      const hub$1 = hub.getCurrentHub();
      const scope = hub$1.getScope();
      const parentSpan = scope.getSpan();
      const activeSpan = createChildSpanOrTransaction(hub$1, parentSpan, ctx);
      scope.setSpan(activeSpan);
      function finishAndSetSpan() {
        activeSpan && activeSpan.finish();
        hub$1.getScope().setSpan(parentSpan);
      }
      let maybePromiseResult;
      try {
        maybePromiseResult = callback(activeSpan);
      } catch (e2) {
        activeSpan && activeSpan.setStatus("internal_error");
        onError(e2);
        finishAndSetSpan();
        throw e2;
      }
      if (utils.isThenable(maybePromiseResult)) {
        Promise.resolve(maybePromiseResult).then(
          () => {
            finishAndSetSpan();
          },
          (e2) => {
            activeSpan && activeSpan.setStatus("internal_error");
            onError(e2);
            finishAndSetSpan();
          }
        );
      } else {
        finishAndSetSpan();
      }
      return maybePromiseResult;
    }
    function startSpan2(context, callback) {
      const ctx = normalizeContext(context);
      const hub$1 = hub.getCurrentHub();
      const scope = hub$1.getScope();
      const parentSpan = scope.getSpan();
      const activeSpan = createChildSpanOrTransaction(hub$1, parentSpan, ctx);
      scope.setSpan(activeSpan);
      function finishAndSetSpan() {
        activeSpan && activeSpan.finish();
        hub$1.getScope().setSpan(parentSpan);
      }
      let maybePromiseResult;
      try {
        maybePromiseResult = callback(activeSpan);
      } catch (e2) {
        activeSpan && activeSpan.setStatus("internal_error");
        finishAndSetSpan();
        throw e2;
      }
      if (utils.isThenable(maybePromiseResult)) {
        Promise.resolve(maybePromiseResult).then(
          () => {
            finishAndSetSpan();
          },
          () => {
            activeSpan && activeSpan.setStatus("internal_error");
            finishAndSetSpan();
          }
        );
      } else {
        finishAndSetSpan();
      }
      return maybePromiseResult;
    }
    var startActiveSpan = startSpan2;
    function startSpanManual(context, callback) {
      const ctx = normalizeContext(context);
      const hub$1 = hub.getCurrentHub();
      const scope = hub$1.getScope();
      const parentSpan = scope.getSpan();
      const activeSpan = createChildSpanOrTransaction(hub$1, parentSpan, ctx);
      scope.setSpan(activeSpan);
      function finishAndSetSpan() {
        activeSpan && activeSpan.finish();
        hub$1.getScope().setSpan(parentSpan);
      }
      let maybePromiseResult;
      try {
        maybePromiseResult = callback(activeSpan, finishAndSetSpan);
      } catch (e2) {
        activeSpan && activeSpan.setStatus("internal_error");
        throw e2;
      }
      if (utils.isThenable(maybePromiseResult)) {
        Promise.resolve(maybePromiseResult).then(void 0, () => {
          activeSpan && activeSpan.setStatus("internal_error");
        });
      }
      return maybePromiseResult;
    }
    function startInactiveSpan(context) {
      if (!hasTracingEnabled.hasTracingEnabled()) {
        return void 0;
      }
      const ctx = { ...context };
      if (ctx.name !== void 0 && ctx.description === void 0) {
        ctx.description = ctx.name;
      }
      const hub$1 = hub.getCurrentHub();
      const parentSpan = getActiveSpan();
      return parentSpan ? parentSpan.startChild(ctx) : hub$1.startTransaction(ctx);
    }
    function getActiveSpan() {
      return hub.getCurrentHub().getScope().getSpan();
    }
    function createChildSpanOrTransaction(hub2, parentSpan, ctx) {
      if (!hasTracingEnabled.hasTracingEnabled()) {
        return void 0;
      }
      return parentSpan ? parentSpan.startChild(ctx) : hub2.startTransaction(ctx);
    }
    function normalizeContext(context) {
      const ctx = { ...context };
      if (ctx.name !== void 0 && ctx.description === void 0) {
        ctx.description = ctx.name;
      }
      return ctx;
    }
    exports.getActiveSpan = getActiveSpan;
    exports.startActiveSpan = startActiveSpan;
    exports.startInactiveSpan = startInactiveSpan;
    exports.startSpan = startSpan2;
    exports.startSpanManual = startSpanManual;
    exports.trace = trace;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/measurement.js
var require_measurement = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/tracing/measurement.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_utils();
    function setMeasurement(name, value, unit) {
      const transaction = utils.getActiveTransaction();
      if (transaction) {
        transaction.setMeasurement(name, value, unit);
      }
    }
    exports.setMeasurement = setMeasurement;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/exports.js
var require_exports = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/exports.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var hub = require_hub();
    function captureException(exception, captureContext) {
      return hub.getCurrentHub().captureException(exception, { captureContext });
    }
    function captureMessage(message, captureContext) {
      const level = typeof captureContext === "string" ? captureContext : void 0;
      const context = typeof captureContext !== "string" ? { captureContext } : void 0;
      return hub.getCurrentHub().captureMessage(message, level, context);
    }
    function captureEvent(event, hint) {
      return hub.getCurrentHub().captureEvent(event, hint);
    }
    function configureScope(callback) {
      hub.getCurrentHub().configureScope(callback);
    }
    function addBreadcrumb(breadcrumb) {
      hub.getCurrentHub().addBreadcrumb(breadcrumb);
    }
    function setContext(name, context) {
      hub.getCurrentHub().setContext(name, context);
    }
    function setExtras(extras) {
      hub.getCurrentHub().setExtras(extras);
    }
    function setExtra(key, extra) {
      hub.getCurrentHub().setExtra(key, extra);
    }
    function setTags(tags) {
      hub.getCurrentHub().setTags(tags);
    }
    function setTag(key, value) {
      hub.getCurrentHub().setTag(key, value);
    }
    function setUser(user) {
      hub.getCurrentHub().setUser(user);
    }
    function withScope(callback) {
      hub.getCurrentHub().withScope(callback);
    }
    function startTransaction(context, customSamplingContext) {
      return hub.getCurrentHub().startTransaction({ ...context }, customSamplingContext);
    }
    function captureCheckIn(checkIn, upsertMonitorConfig) {
      const hub$1 = hub.getCurrentHub();
      const scope = hub$1.getScope();
      const client = hub$1.getClient();
      if (!client) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("Cannot capture check-in. No client defined.");
      } else if (!client.captureCheckIn) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("Cannot capture check-in. Client does not support sending check-ins.");
      } else {
        return client.captureCheckIn(checkIn, upsertMonitorConfig, scope);
      }
      return utils.uuid4();
    }
    async function flush(timeout) {
      const client = hub.getCurrentHub().getClient();
      if (client) {
        return client.flush(timeout);
      }
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("Cannot flush events. No client defined.");
      return Promise.resolve(false);
    }
    async function close(timeout) {
      const client = hub.getCurrentHub().getClient();
      if (client) {
        return client.close(timeout);
      }
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("Cannot flush events and disable SDK. No client defined.");
      return Promise.resolve(false);
    }
    function lastEventId() {
      return hub.getCurrentHub().lastEventId();
    }
    exports.addBreadcrumb = addBreadcrumb;
    exports.captureCheckIn = captureCheckIn;
    exports.captureEvent = captureEvent;
    exports.captureException = captureException;
    exports.captureMessage = captureMessage;
    exports.close = close;
    exports.configureScope = configureScope;
    exports.flush = flush;
    exports.lastEventId = lastEventId;
    exports.setContext = setContext;
    exports.setExtra = setExtra;
    exports.setExtras = setExtras;
    exports.setTag = setTag;
    exports.setTags = setTags;
    exports.setUser = setUser;
    exports.startTransaction = startTransaction;
    exports.withScope = withScope;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/sessionflusher.js
var require_sessionflusher = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/sessionflusher.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var hub = require_hub();
    var SessionFlusher = class {
      constructor(client, attrs) {
        this._client = client;
        this.flushTimeout = 60;
        this._pendingAggregates = {};
        this._isEnabled = true;
        this._intervalId = setInterval(() => this.flush(), this.flushTimeout * 1e3);
        this._sessionAttrs = attrs;
      }
      flush() {
        const sessionAggregates = this.getSessionAggregates();
        if (sessionAggregates.aggregates.length === 0) {
          return;
        }
        this._pendingAggregates = {};
        this._client.sendSession(sessionAggregates);
      }
      getSessionAggregates() {
        const aggregates = Object.keys(this._pendingAggregates).map((key) => {
          return this._pendingAggregates[parseInt(key)];
        });
        const sessionAggregates = {
          attrs: this._sessionAttrs,
          aggregates
        };
        return utils.dropUndefinedKeys(sessionAggregates);
      }
      close() {
        clearInterval(this._intervalId);
        this._isEnabled = false;
        this.flush();
      }
      incrementSessionStatusCount() {
        if (!this._isEnabled) {
          return;
        }
        const scope = hub.getCurrentHub().getScope();
        const requestSession = scope.getRequestSession();
        if (requestSession && requestSession.status) {
          this._incrementSessionStatusCount(requestSession.status, new Date());
          scope.setRequestSession(void 0);
        }
      }
      _incrementSessionStatusCount(status, date2) {
        const sessionStartedTrunc = new Date(date2).setSeconds(0, 0);
        this._pendingAggregates[sessionStartedTrunc] = this._pendingAggregates[sessionStartedTrunc] || {};
        const aggregationCounts = this._pendingAggregates[sessionStartedTrunc];
        if (!aggregationCounts.started) {
          aggregationCounts.started = new Date(sessionStartedTrunc).toISOString();
        }
        switch (status) {
          case "errored":
            aggregationCounts.errored = (aggregationCounts.errored || 0) + 1;
            return aggregationCounts.errored;
          case "ok":
            aggregationCounts.exited = (aggregationCounts.exited || 0) + 1;
            return aggregationCounts.exited;
          default:
            aggregationCounts.crashed = (aggregationCounts.crashed || 0) + 1;
            return aggregationCounts.crashed;
        }
      }
    };
    exports.SessionFlusher = SessionFlusher;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/api.js
var require_api = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/api.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var SENTRY_API_VERSION = "7";
    function getBaseApiEndpoint(dsn) {
      const protocol = dsn.protocol ? `${dsn.protocol}:` : "";
      const port = dsn.port ? `:${dsn.port}` : "";
      return `${protocol}//${dsn.host}${port}${dsn.path ? `/${dsn.path}` : ""}/api/`;
    }
    function _getIngestEndpoint(dsn) {
      return `${getBaseApiEndpoint(dsn)}${dsn.projectId}/envelope/`;
    }
    function _encodedAuth(dsn, sdkInfo) {
      return utils.urlEncode({
        sentry_key: dsn.publicKey,
        sentry_version: SENTRY_API_VERSION,
        ...sdkInfo && { sentry_client: `${sdkInfo.name}/${sdkInfo.version}` }
      });
    }
    function getEnvelopeEndpointWithUrlEncodedAuth(dsn, tunnelOrOptions = {}) {
      const tunnel = typeof tunnelOrOptions === "string" ? tunnelOrOptions : tunnelOrOptions.tunnel;
      const sdkInfo = typeof tunnelOrOptions === "string" || !tunnelOrOptions._metadata ? void 0 : tunnelOrOptions._metadata.sdk;
      return tunnel ? tunnel : `${_getIngestEndpoint(dsn)}?${_encodedAuth(dsn, sdkInfo)}`;
    }
    function getReportDialogEndpoint(dsnLike, dialogOptions) {
      const dsn = utils.makeDsn(dsnLike);
      if (!dsn) {
        return "";
      }
      const endpoint = `${getBaseApiEndpoint(dsn)}embed/error-page/`;
      let encodedOptions = `dsn=${utils.dsnToString(dsn)}`;
      for (const key in dialogOptions) {
        if (key === "dsn") {
          continue;
        }
        if (key === "user") {
          const user = dialogOptions.user;
          if (!user) {
            continue;
          }
          if (user.name) {
            encodedOptions += `&name=${encodeURIComponent(user.name)}`;
          }
          if (user.email) {
            encodedOptions += `&email=${encodeURIComponent(user.email)}`;
          }
        } else {
          encodedOptions += `&${encodeURIComponent(key)}=${encodeURIComponent(dialogOptions[key])}`;
        }
      }
      return `${endpoint}?${encodedOptions}`;
    }
    exports.getEnvelopeEndpointWithUrlEncodedAuth = getEnvelopeEndpointWithUrlEncodedAuth;
    exports.getReportDialogEndpoint = getReportDialogEndpoint;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/envelope.js
var require_envelope2 = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/envelope.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    function enhanceEventWithSdkInfo(event, sdkInfo) {
      if (!sdkInfo) {
        return event;
      }
      event.sdk = event.sdk || {};
      event.sdk.name = event.sdk.name || sdkInfo.name;
      event.sdk.version = event.sdk.version || sdkInfo.version;
      event.sdk.integrations = [...event.sdk.integrations || [], ...sdkInfo.integrations || []];
      event.sdk.packages = [...event.sdk.packages || [], ...sdkInfo.packages || []];
      return event;
    }
    function createSessionEnvelope(session, dsn, metadata, tunnel) {
      const sdkInfo = utils.getSdkMetadataForEnvelopeHeader(metadata);
      const envelopeHeaders = {
        sent_at: new Date().toISOString(),
        ...sdkInfo && { sdk: sdkInfo },
        ...!!tunnel && { dsn: utils.dsnToString(dsn) }
      };
      const envelopeItem = "aggregates" in session ? [{ type: "sessions" }, session] : [{ type: "session" }, session.toJSON()];
      return utils.createEnvelope(envelopeHeaders, [envelopeItem]);
    }
    function createEventEnvelope(event, dsn, metadata, tunnel) {
      const sdkInfo = utils.getSdkMetadataForEnvelopeHeader(metadata);
      const eventType = event.type && event.type !== "replay_event" ? event.type : "event";
      enhanceEventWithSdkInfo(event, metadata && metadata.sdk);
      const envelopeHeaders = utils.createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn);
      delete event.sdkProcessingMetadata;
      const eventItem = [{ type: eventType }, event];
      return utils.createEnvelope(envelopeHeaders, [eventItem]);
    }
    exports.createEventEnvelope = createEventEnvelope;
    exports.createSessionEnvelope = createSessionEnvelope;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/integration.js
var require_integration = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/integration.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var hub = require_hub();
    var scope = require_scope();
    var installedIntegrations = [];
    function filterDuplicates(integrations) {
      const integrationsByName = {};
      integrations.forEach((currentInstance) => {
        const { name } = currentInstance;
        const existingInstance = integrationsByName[name];
        if (existingInstance && !existingInstance.isDefaultInstance && currentInstance.isDefaultInstance) {
          return;
        }
        integrationsByName[name] = currentInstance;
      });
      return Object.keys(integrationsByName).map((k2) => integrationsByName[k2]);
    }
    function getIntegrationsToSetup(options) {
      const defaultIntegrations = options.defaultIntegrations || [];
      const userIntegrations = options.integrations;
      defaultIntegrations.forEach((integration) => {
        integration.isDefaultInstance = true;
      });
      let integrations;
      if (Array.isArray(userIntegrations)) {
        integrations = [...defaultIntegrations, ...userIntegrations];
      } else if (typeof userIntegrations === "function") {
        integrations = utils.arrayify(userIntegrations(defaultIntegrations));
      } else {
        integrations = defaultIntegrations;
      }
      const finalIntegrations = filterDuplicates(integrations);
      const debugIndex = findIndex(finalIntegrations, (integration) => integration.name === "Debug");
      if (debugIndex !== -1) {
        const [debugInstance] = finalIntegrations.splice(debugIndex, 1);
        finalIntegrations.push(debugInstance);
      }
      return finalIntegrations;
    }
    function setupIntegrations(client, integrations) {
      const integrationIndex = {};
      integrations.forEach((integration) => {
        if (integration) {
          setupIntegration(client, integration, integrationIndex);
        }
      });
      return integrationIndex;
    }
    function setupIntegration(client, integration, integrationIndex) {
      integrationIndex[integration.name] = integration;
      if (installedIntegrations.indexOf(integration.name) === -1) {
        integration.setupOnce(scope.addGlobalEventProcessor, hub.getCurrentHub);
        installedIntegrations.push(integration.name);
      }
      if (client.on && typeof integration.preprocessEvent === "function") {
        const callback = integration.preprocessEvent.bind(integration);
        client.on("preprocessEvent", (event, hint) => callback(event, hint, client));
      }
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(`Integration installed: ${integration.name}`);
    }
    function findIndex(arr, callback) {
      for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i]) === true) {
          return i;
        }
      }
      return -1;
    }
    exports.getIntegrationsToSetup = getIntegrationsToSetup;
    exports.installedIntegrations = installedIntegrations;
    exports.setupIntegration = setupIntegration;
    exports.setupIntegrations = setupIntegrations;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/utils/prepareEvent.js
var require_prepareEvent = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/utils/prepareEvent.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var constants2 = require_constants();
    var scope = require_scope();
    function prepareEvent(options, event, hint, scope$1) {
      const { normalizeDepth = 3, normalizeMaxBreadth = 1e3 } = options;
      const prepared = {
        ...event,
        event_id: event.event_id || hint.event_id || utils.uuid4(),
        timestamp: event.timestamp || utils.dateTimestampInSeconds()
      };
      const integrations = hint.integrations || options.integrations.map((i) => i.name);
      applyClientOptions(prepared, options);
      applyIntegrationsMetadata(prepared, integrations);
      if (event.type === void 0) {
        applyDebugIds(prepared, options.stackParser);
      }
      let finalScope = scope$1;
      if (hint.captureContext) {
        finalScope = scope.Scope.clone(finalScope).update(hint.captureContext);
      }
      let result = utils.resolvedSyncPromise(prepared);
      if (finalScope) {
        if (finalScope.getAttachments) {
          const attachments = [...hint.attachments || [], ...finalScope.getAttachments()];
          if (attachments.length) {
            hint.attachments = attachments;
          }
        }
        result = finalScope.applyToEvent(prepared, hint);
      }
      return result.then((evt) => {
        if (evt) {
          applyDebugMeta(evt);
        }
        if (typeof normalizeDepth === "number" && normalizeDepth > 0) {
          return normalizeEvent(evt, normalizeDepth, normalizeMaxBreadth);
        }
        return evt;
      });
    }
    function applyClientOptions(event, options) {
      const { environment, release, dist, maxValueLength = 250 } = options;
      if (!("environment" in event)) {
        event.environment = "environment" in options ? environment : constants2.DEFAULT_ENVIRONMENT;
      }
      if (event.release === void 0 && release !== void 0) {
        event.release = release;
      }
      if (event.dist === void 0 && dist !== void 0) {
        event.dist = dist;
      }
      if (event.message) {
        event.message = utils.truncate(event.message, maxValueLength);
      }
      const exception = event.exception && event.exception.values && event.exception.values[0];
      if (exception && exception.value) {
        exception.value = utils.truncate(exception.value, maxValueLength);
      }
      const request = event.request;
      if (request && request.url) {
        request.url = utils.truncate(request.url, maxValueLength);
      }
    }
    var debugIdStackParserCache = /* @__PURE__ */ new WeakMap();
    function applyDebugIds(event, stackParser) {
      const debugIdMap = utils.GLOBAL_OBJ._sentryDebugIds;
      if (!debugIdMap) {
        return;
      }
      let debugIdStackFramesCache;
      const cachedDebugIdStackFrameCache = debugIdStackParserCache.get(stackParser);
      if (cachedDebugIdStackFrameCache) {
        debugIdStackFramesCache = cachedDebugIdStackFrameCache;
      } else {
        debugIdStackFramesCache = /* @__PURE__ */ new Map();
        debugIdStackParserCache.set(stackParser, debugIdStackFramesCache);
      }
      const filenameDebugIdMap = Object.keys(debugIdMap).reduce((acc, debugIdStackTrace) => {
        let parsedStack;
        const cachedParsedStack = debugIdStackFramesCache.get(debugIdStackTrace);
        if (cachedParsedStack) {
          parsedStack = cachedParsedStack;
        } else {
          parsedStack = stackParser(debugIdStackTrace);
          debugIdStackFramesCache.set(debugIdStackTrace, parsedStack);
        }
        for (let i = parsedStack.length - 1; i >= 0; i--) {
          const stackFrame = parsedStack[i];
          if (stackFrame.filename) {
            acc[stackFrame.filename] = debugIdMap[debugIdStackTrace];
            break;
          }
        }
        return acc;
      }, {});
      try {
        event.exception.values.forEach((exception) => {
          exception.stacktrace.frames.forEach((frame) => {
            if (frame.filename) {
              frame.debug_id = filenameDebugIdMap[frame.filename];
            }
          });
        });
      } catch (e2) {
      }
    }
    function applyDebugMeta(event) {
      const filenameDebugIdMap = {};
      try {
        event.exception.values.forEach((exception) => {
          exception.stacktrace.frames.forEach((frame) => {
            if (frame.debug_id) {
              if (frame.abs_path) {
                filenameDebugIdMap[frame.abs_path] = frame.debug_id;
              } else if (frame.filename) {
                filenameDebugIdMap[frame.filename] = frame.debug_id;
              }
              delete frame.debug_id;
            }
          });
        });
      } catch (e2) {
      }
      if (Object.keys(filenameDebugIdMap).length === 0) {
        return;
      }
      event.debug_meta = event.debug_meta || {};
      event.debug_meta.images = event.debug_meta.images || [];
      const images = event.debug_meta.images;
      Object.keys(filenameDebugIdMap).forEach((filename) => {
        images.push({
          type: "sourcemap",
          code_file: filename,
          debug_id: filenameDebugIdMap[filename]
        });
      });
    }
    function applyIntegrationsMetadata(event, integrationNames) {
      if (integrationNames.length > 0) {
        event.sdk = event.sdk || {};
        event.sdk.integrations = [...event.sdk.integrations || [], ...integrationNames];
      }
    }
    function normalizeEvent(event, depth, maxBreadth) {
      if (!event) {
        return null;
      }
      const normalized = {
        ...event,
        ...event.breadcrumbs && {
          breadcrumbs: event.breadcrumbs.map((b3) => ({
            ...b3,
            ...b3.data && {
              data: utils.normalize(b3.data, depth, maxBreadth)
            }
          }))
        },
        ...event.user && {
          user: utils.normalize(event.user, depth, maxBreadth)
        },
        ...event.contexts && {
          contexts: utils.normalize(event.contexts, depth, maxBreadth)
        },
        ...event.extra && {
          extra: utils.normalize(event.extra, depth, maxBreadth)
        }
      };
      if (event.contexts && event.contexts.trace && normalized.contexts) {
        normalized.contexts.trace = event.contexts.trace;
        if (event.contexts.trace.data) {
          normalized.contexts.trace.data = utils.normalize(event.contexts.trace.data, depth, maxBreadth);
        }
      }
      if (event.spans) {
        normalized.spans = event.spans.map((span) => {
          if (span.data) {
            span.data = utils.normalize(span.data, depth, maxBreadth);
          }
          return span;
        });
      }
      return normalized;
    }
    exports.applyDebugIds = applyDebugIds;
    exports.applyDebugMeta = applyDebugMeta;
    exports.prepareEvent = prepareEvent;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/baseclient.js
var require_baseclient = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/baseclient.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var api = require_api();
    var envelope = require_envelope2();
    var integration = require_integration();
    var session = require_session();
    var dynamicSamplingContext = require_dynamicSamplingContext();
    var prepareEvent = require_prepareEvent();
    var ALREADY_SEEN_ERROR = "Not capturing exception because it's already been captured.";
    var BaseClient = class {
      constructor(options) {
        this._options = options;
        this._integrations = {};
        this._integrationsInitialized = false;
        this._numProcessing = 0;
        this._outcomes = {};
        this._hooks = {};
        if (options.dsn) {
          this._dsn = utils.makeDsn(options.dsn);
        } else {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("No DSN provided, client will not do anything.");
        }
        if (this._dsn) {
          const url2 = api.getEnvelopeEndpointWithUrlEncodedAuth(this._dsn, options);
          this._transport = options.transport({
            recordDroppedEvent: this.recordDroppedEvent.bind(this),
            ...options.transportOptions,
            url: url2
          });
        }
      }
      captureException(exception, hint, scope) {
        if (utils.checkOrSetAlreadyCaught(exception)) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(ALREADY_SEEN_ERROR);
          return;
        }
        let eventId = hint && hint.event_id;
        this._process(
          this.eventFromException(exception, hint).then((event) => this._captureEvent(event, hint, scope)).then((result) => {
            eventId = result;
          })
        );
        return eventId;
      }
      captureMessage(message, level, hint, scope) {
        let eventId = hint && hint.event_id;
        const promisedEvent = utils.isPrimitive(message) ? this.eventFromMessage(String(message), level, hint) : this.eventFromException(message, hint);
        this._process(
          promisedEvent.then((event) => this._captureEvent(event, hint, scope)).then((result) => {
            eventId = result;
          })
        );
        return eventId;
      }
      captureEvent(event, hint, scope) {
        if (hint && hint.originalException && utils.checkOrSetAlreadyCaught(hint.originalException)) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(ALREADY_SEEN_ERROR);
          return;
        }
        let eventId = hint && hint.event_id;
        this._process(
          this._captureEvent(event, hint, scope).then((result) => {
            eventId = result;
          })
        );
        return eventId;
      }
      captureSession(session$1) {
        if (!this._isEnabled()) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("SDK not enabled, will not capture session.");
          return;
        }
        if (!(typeof session$1.release === "string")) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("Discarded session because of missing or non-string release");
        } else {
          this.sendSession(session$1);
          session.updateSession(session$1, { init: false });
        }
      }
      getDsn() {
        return this._dsn;
      }
      getOptions() {
        return this._options;
      }
      getSdkMetadata() {
        return this._options._metadata;
      }
      getTransport() {
        return this._transport;
      }
      flush(timeout) {
        const transport = this._transport;
        if (transport) {
          return this._isClientDoneProcessing(timeout).then((clientFinished) => {
            return transport.flush(timeout).then((transportFlushed) => clientFinished && transportFlushed);
          });
        } else {
          return utils.resolvedSyncPromise(true);
        }
      }
      close(timeout) {
        return this.flush(timeout).then((result) => {
          this.getOptions().enabled = false;
          return result;
        });
      }
      setupIntegrations() {
        if (this._isEnabled() && !this._integrationsInitialized) {
          this._integrations = integration.setupIntegrations(this, this._options.integrations);
          this._integrationsInitialized = true;
        }
      }
      getIntegrationById(integrationId) {
        return this._integrations[integrationId];
      }
      getIntegration(integration2) {
        try {
          return this._integrations[integration2.id] || null;
        } catch (_oO) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn(`Cannot retrieve integration ${integration2.id} from the current Client`);
          return null;
        }
      }
      addIntegration(integration$1) {
        integration.setupIntegration(this, integration$1, this._integrations);
      }
      sendEvent(event, hint = {}) {
        this.emit("beforeSendEvent", event, hint);
        if (this._dsn) {
          let env3 = envelope.createEventEnvelope(event, this._dsn, this._options._metadata, this._options.tunnel);
          for (const attachment of hint.attachments || []) {
            env3 = utils.addItemToEnvelope(
              env3,
              utils.createAttachmentEnvelopeItem(
                attachment,
                this._options.transportOptions && this._options.transportOptions.textEncoder
              )
            );
          }
          const promise = this._sendEnvelope(env3);
          if (promise) {
            promise.then((sendResponse) => this.emit("afterSendEvent", event, sendResponse), null);
          }
        }
      }
      sendSession(session2) {
        if (this._dsn) {
          const env3 = envelope.createSessionEnvelope(session2, this._dsn, this._options._metadata, this._options.tunnel);
          void this._sendEnvelope(env3);
        }
      }
      recordDroppedEvent(reason, category, _event) {
        if (this._options.sendClientReports) {
          const key = `${reason}:${category}`;
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(`Adding outcome: "${key}"`);
          this._outcomes[key] = this._outcomes[key] + 1 || 1;
        }
      }
      on(hook, callback) {
        if (!this._hooks[hook]) {
          this._hooks[hook] = [];
        }
        this._hooks[hook].push(callback);
      }
      emit(hook, ...rest) {
        if (this._hooks[hook]) {
          this._hooks[hook].forEach((callback) => callback(...rest));
        }
      }
      _updateSessionFromEvent(session$1, event) {
        let crashed = false;
        let errored = false;
        const exceptions = event.exception && event.exception.values;
        if (exceptions) {
          errored = true;
          for (const ex of exceptions) {
            const mechanism = ex.mechanism;
            if (mechanism && mechanism.handled === false) {
              crashed = true;
              break;
            }
          }
        }
        const sessionNonTerminal = session$1.status === "ok";
        const shouldUpdateAndSend = sessionNonTerminal && session$1.errors === 0 || sessionNonTerminal && crashed;
        if (shouldUpdateAndSend) {
          session.updateSession(session$1, {
            ...crashed && { status: "crashed" },
            errors: session$1.errors || Number(errored || crashed)
          });
          this.captureSession(session$1);
        }
      }
      _isClientDoneProcessing(timeout) {
        return new utils.SyncPromise((resolve2) => {
          let ticked = 0;
          const tick = 1;
          const interval = setInterval(() => {
            if (this._numProcessing == 0) {
              clearInterval(interval);
              resolve2(true);
            } else {
              ticked += tick;
              if (timeout && ticked >= timeout) {
                clearInterval(interval);
                resolve2(false);
              }
            }
          }, tick);
        });
      }
      _isEnabled() {
        return this.getOptions().enabled !== false && this._dsn !== void 0;
      }
      _prepareEvent(event, hint, scope) {
        const options = this.getOptions();
        const integrations = Object.keys(this._integrations);
        if (!hint.integrations && integrations.length > 0) {
          hint.integrations = integrations;
        }
        this.emit("preprocessEvent", event, hint);
        return prepareEvent.prepareEvent(options, event, hint, scope).then((evt) => {
          if (evt === null) {
            return evt;
          }
          const { propagationContext } = evt.sdkProcessingMetadata || {};
          const trace = evt.contexts && evt.contexts.trace;
          if (!trace && propagationContext) {
            const { traceId: trace_id, spanId, parentSpanId, dsc } = propagationContext;
            evt.contexts = {
              trace: {
                trace_id,
                span_id: spanId,
                parent_span_id: parentSpanId
              },
              ...evt.contexts
            };
            const dynamicSamplingContext$1 = dsc ? dsc : dynamicSamplingContext.getDynamicSamplingContextFromClient(trace_id, this, scope);
            evt.sdkProcessingMetadata = {
              dynamicSamplingContext: dynamicSamplingContext$1,
              ...evt.sdkProcessingMetadata
            };
          }
          return evt;
        });
      }
      _captureEvent(event, hint = {}, scope) {
        return this._processEvent(event, hint, scope).then(
          (finalEvent) => {
            return finalEvent.event_id;
          },
          (reason) => {
            if (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) {
              const sentryError = reason;
              if (sentryError.logLevel === "log") {
                utils.logger.log(sentryError.message);
              } else {
                utils.logger.warn(sentryError);
              }
            }
            return void 0;
          }
        );
      }
      _processEvent(event, hint, scope) {
        const options = this.getOptions();
        const { sampleRate } = options;
        if (!this._isEnabled()) {
          return utils.rejectedSyncPromise(new utils.SentryError("SDK not enabled, will not capture event.", "log"));
        }
        const isTransaction = isTransactionEvent(event);
        const isError = isErrorEvent(event);
        const eventType = event.type || "error";
        const beforeSendLabel = `before send for type \`${eventType}\``;
        if (isError && typeof sampleRate === "number" && Math.random() > sampleRate) {
          this.recordDroppedEvent("sample_rate", "error", event);
          return utils.rejectedSyncPromise(
            new utils.SentryError(
              `Discarding event because it's not included in the random sample (sampling rate = ${sampleRate})`,
              "log"
            )
          );
        }
        const dataCategory = eventType === "replay_event" ? "replay" : eventType;
        return this._prepareEvent(event, hint, scope).then((prepared) => {
          if (prepared === null) {
            this.recordDroppedEvent("event_processor", dataCategory, event);
            throw new utils.SentryError("An event processor returned `null`, will not send event.", "log");
          }
          const isInternalException = hint.data && hint.data.__sentry__ === true;
          if (isInternalException) {
            return prepared;
          }
          const result = processBeforeSend(options, prepared, hint);
          return _validateBeforeSendResult(result, beforeSendLabel);
        }).then((processedEvent) => {
          if (processedEvent === null) {
            this.recordDroppedEvent("before_send", dataCategory, event);
            throw new utils.SentryError(`${beforeSendLabel} returned \`null\`, will not send event.`, "log");
          }
          const session2 = scope && scope.getSession();
          if (!isTransaction && session2) {
            this._updateSessionFromEvent(session2, processedEvent);
          }
          const transactionInfo = processedEvent.transaction_info;
          if (isTransaction && transactionInfo && processedEvent.transaction !== event.transaction) {
            const source = "custom";
            processedEvent.transaction_info = {
              ...transactionInfo,
              source
            };
          }
          this.sendEvent(processedEvent, hint);
          return processedEvent;
        }).then(null, (reason) => {
          if (reason instanceof utils.SentryError) {
            throw reason;
          }
          this.captureException(reason, {
            data: {
              __sentry__: true
            },
            originalException: reason
          });
          throw new utils.SentryError(
            `Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${reason}`
          );
        });
      }
      _process(promise) {
        this._numProcessing++;
        void promise.then(
          (value) => {
            this._numProcessing--;
            return value;
          },
          (reason) => {
            this._numProcessing--;
            return reason;
          }
        );
      }
      _sendEnvelope(envelope2) {
        if (this._transport && this._dsn) {
          this.emit("beforeEnvelope", envelope2);
          return this._transport.send(envelope2).then(null, (reason) => {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.error("Error while sending event:", reason);
          });
        } else {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.error("Transport disabled");
        }
      }
      _clearOutcomes() {
        const outcomes = this._outcomes;
        this._outcomes = {};
        return Object.keys(outcomes).map((key) => {
          const [reason, category] = key.split(":");
          return {
            reason,
            category,
            quantity: outcomes[key]
          };
        });
      }
    };
    function _validateBeforeSendResult(beforeSendResult, beforeSendLabel) {
      const invalidValueError = `${beforeSendLabel} must return \`null\` or a valid event.`;
      if (utils.isThenable(beforeSendResult)) {
        return beforeSendResult.then(
          (event) => {
            if (!utils.isPlainObject(event) && event !== null) {
              throw new utils.SentryError(invalidValueError);
            }
            return event;
          },
          (e2) => {
            throw new utils.SentryError(`${beforeSendLabel} rejected with ${e2}`);
          }
        );
      } else if (!utils.isPlainObject(beforeSendResult) && beforeSendResult !== null) {
        throw new utils.SentryError(invalidValueError);
      }
      return beforeSendResult;
    }
    function processBeforeSend(options, event, hint) {
      const { beforeSend, beforeSendTransaction } = options;
      if (isErrorEvent(event) && beforeSend) {
        return beforeSend(event, hint);
      }
      if (isTransactionEvent(event) && beforeSendTransaction) {
        return beforeSendTransaction(event, hint);
      }
      return event;
    }
    function isErrorEvent(event) {
      return event.type === void 0;
    }
    function isTransactionEvent(event) {
      return event.type === "transaction";
    }
    exports.BaseClient = BaseClient;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/checkin.js
var require_checkin = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/checkin.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    function createCheckInEnvelope(checkIn, dynamicSamplingContext, metadata, tunnel, dsn) {
      const headers = {
        sent_at: new Date().toISOString()
      };
      if (metadata && metadata.sdk) {
        headers.sdk = {
          name: metadata.sdk.name,
          version: metadata.sdk.version
        };
      }
      if (!!tunnel && !!dsn) {
        headers.dsn = utils.dsnToString(dsn);
      }
      if (dynamicSamplingContext) {
        headers.trace = utils.dropUndefinedKeys(dynamicSamplingContext);
      }
      const item2 = createCheckInEnvelopeItem(checkIn);
      return utils.createEnvelope(headers, [item2]);
    }
    function createCheckInEnvelopeItem(checkIn) {
      const checkInHeaders = {
        type: "check_in"
      };
      return [checkInHeaders, checkIn];
    }
    exports.createCheckInEnvelope = createCheckInEnvelope;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/server-runtime-client.js
var require_server_runtime_client = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/server-runtime-client.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var baseclient = require_baseclient();
    var checkin = require_checkin();
    var hub = require_hub();
    var hubextensions = require_hubextensions();
    var dynamicSamplingContext = require_dynamicSamplingContext();
    require_spanstatus();
    var ServerRuntimeClient = class extends baseclient.BaseClient {
      constructor(options) {
        hubextensions.addTracingExtensions();
        super(options);
      }
      eventFromException(exception, hint) {
        return Promise.resolve(utils.eventFromUnknownInput(hub.getCurrentHub, this._options.stackParser, exception, hint));
      }
      eventFromMessage(message, level = "info", hint) {
        return Promise.resolve(
          utils.eventFromMessage(this._options.stackParser, message, level, hint, this._options.attachStacktrace)
        );
      }
      captureCheckIn(checkIn, monitorConfig, scope) {
        const id = checkIn.status !== "in_progress" && checkIn.checkInId ? checkIn.checkInId : utils.uuid4();
        if (!this._isEnabled()) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("SDK not enabled, will not capture checkin.");
          return id;
        }
        const options = this.getOptions();
        const { release, environment, tunnel } = options;
        const serializedCheckIn = {
          check_in_id: id,
          monitor_slug: checkIn.monitorSlug,
          status: checkIn.status,
          release,
          environment
        };
        if (checkIn.status !== "in_progress") {
          serializedCheckIn.duration = checkIn.duration;
        }
        if (monitorConfig) {
          serializedCheckIn.monitor_config = {
            schedule: monitorConfig.schedule,
            checkin_margin: monitorConfig.checkinMargin,
            max_runtime: monitorConfig.maxRuntime,
            timezone: monitorConfig.timezone
          };
        }
        const [dynamicSamplingContext2, traceContext] = this._getTraceInfoFromScope(scope);
        if (traceContext) {
          serializedCheckIn.contexts = {
            trace: traceContext
          };
        }
        const envelope = checkin.createCheckInEnvelope(
          serializedCheckIn,
          dynamicSamplingContext2,
          this.getSdkMetadata(),
          tunnel,
          this.getDsn()
        );
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.info("Sending checkin:", checkIn.monitorSlug, checkIn.status);
        void this._sendEnvelope(envelope);
        return id;
      }
      _prepareEvent(event, hint, scope) {
        if (this._options.platform) {
          event.platform = event.platform || this._options.platform;
        }
        if (this._options.runtime) {
          event.contexts = {
            ...event.contexts,
            runtime: (event.contexts || {}).runtime || this._options.runtime
          };
        }
        if (this._options.serverName) {
          event.server_name = event.server_name || this._options.serverName;
        }
        return super._prepareEvent(event, hint, scope);
      }
      _getTraceInfoFromScope(scope) {
        if (!scope) {
          return [void 0, void 0];
        }
        const span = scope.getSpan();
        if (span) {
          const samplingContext = span.transaction ? span.transaction.getDynamicSamplingContext() : void 0;
          return [samplingContext, span.getTraceContext()];
        }
        const { traceId, spanId, parentSpanId, dsc } = scope.getPropagationContext();
        const traceContext = {
          trace_id: traceId,
          span_id: spanId,
          parent_span_id: parentSpanId
        };
        if (dsc) {
          return [dsc, traceContext];
        }
        return [dynamicSamplingContext.getDynamicSamplingContextFromClient(traceId, this, scope), traceContext];
      }
    };
    exports.ServerRuntimeClient = ServerRuntimeClient;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/sdk.js
var require_sdk = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/sdk.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var hub = require_hub();
    function initAndBind(clientClass, options) {
      if (options.debug === true) {
        if (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) {
          utils.logger.enable();
        } else {
          console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
        }
      }
      const hub$1 = hub.getCurrentHub();
      const scope = hub$1.getScope();
      scope.update(options.initialScope);
      const client = new clientClass(options);
      hub$1.bindClient(client);
    }
    exports.initAndBind = initAndBind;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/transports/base.js
var require_base = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/transports/base.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var DEFAULT_TRANSPORT_BUFFER_SIZE = 30;
    function createTransport(options, makeRequest, buffer = utils.makePromiseBuffer(
      options.bufferSize || DEFAULT_TRANSPORT_BUFFER_SIZE
    )) {
      let rateLimits = {};
      const flush = (timeout) => buffer.drain(timeout);
      function send(envelope) {
        const filteredEnvelopeItems = [];
        utils.forEachEnvelopeItem(envelope, (item2, type) => {
          const envelopeItemDataCategory = utils.envelopeItemTypeToDataCategory(type);
          if (utils.isRateLimited(rateLimits, envelopeItemDataCategory)) {
            const event = getEventForEnvelopeItem(item2, type);
            options.recordDroppedEvent("ratelimit_backoff", envelopeItemDataCategory, event);
          } else {
            filteredEnvelopeItems.push(item2);
          }
        });
        if (filteredEnvelopeItems.length === 0) {
          return utils.resolvedSyncPromise();
        }
        const filteredEnvelope = utils.createEnvelope(envelope[0], filteredEnvelopeItems);
        const recordEnvelopeLoss = (reason) => {
          utils.forEachEnvelopeItem(filteredEnvelope, (item2, type) => {
            const event = getEventForEnvelopeItem(item2, type);
            options.recordDroppedEvent(reason, utils.envelopeItemTypeToDataCategory(type), event);
          });
        };
        const requestTask = () => makeRequest({ body: utils.serializeEnvelope(filteredEnvelope, options.textEncoder) }).then(
          (response) => {
            if (response.statusCode !== void 0 && (response.statusCode < 200 || response.statusCode >= 300)) {
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn(`Sentry responded with status code ${response.statusCode} to sent event.`);
            }
            rateLimits = utils.updateRateLimits(rateLimits, response);
            return response;
          },
          (error) => {
            recordEnvelopeLoss("network_error");
            throw error;
          }
        );
        return buffer.add(requestTask).then(
          (result) => result,
          (error) => {
            if (error instanceof utils.SentryError) {
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.error("Skipped sending event because buffer is full.");
              recordEnvelopeLoss("queue_overflow");
              return utils.resolvedSyncPromise();
            } else {
              throw error;
            }
          }
        );
      }
      send.__sentry__baseTransport__ = true;
      return {
        send,
        flush
      };
    }
    function getEventForEnvelopeItem(item2, type) {
      if (type !== "event" && type !== "transaction") {
        return void 0;
      }
      return Array.isArray(item2) ? item2[1] : void 0;
    }
    exports.DEFAULT_TRANSPORT_BUFFER_SIZE = DEFAULT_TRANSPORT_BUFFER_SIZE;
    exports.createTransport = createTransport;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/transports/offline.js
var require_offline = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/transports/offline.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var MIN_DELAY = 100;
    var START_DELAY = 5e3;
    var MAX_DELAY = 36e5;
    function log(msg, error) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.info(`[Offline]: ${msg}`, error);
    }
    function makeOfflineTransport(createTransport) {
      return (options) => {
        const transport = createTransport(options);
        const store = options.createStore ? options.createStore(options) : void 0;
        let retryDelay = START_DELAY;
        let flushTimer;
        function shouldQueue(env3, error, retryDelay2) {
          if (utils.envelopeContainsItemType(env3, ["replay_event", "replay_recording", "client_report"])) {
            return false;
          }
          if (options.shouldStore) {
            return options.shouldStore(env3, error, retryDelay2);
          }
          return true;
        }
        function flushIn(delay) {
          if (!store) {
            return;
          }
          if (flushTimer) {
            clearTimeout(flushTimer);
          }
          flushTimer = setTimeout(async () => {
            flushTimer = void 0;
            const found = await store.pop();
            if (found) {
              log("Attempting to send previously queued event");
              void send(found).catch((e2) => {
                log("Failed to retry sending", e2);
              });
            }
          }, delay);
          if (typeof flushTimer !== "number" && flushTimer.unref) {
            flushTimer.unref();
          }
        }
        function flushWithBackOff() {
          if (flushTimer) {
            return;
          }
          flushIn(retryDelay);
          retryDelay = Math.min(retryDelay * 2, MAX_DELAY);
        }
        async function send(envelope) {
          try {
            const result = await transport.send(envelope);
            let delay = MIN_DELAY;
            if (result) {
              if (result.headers && result.headers["retry-after"]) {
                delay = utils.parseRetryAfterHeader(result.headers["retry-after"]);
              } else if ((result.statusCode || 0) >= 400) {
                return result;
              }
            }
            flushIn(delay);
            retryDelay = START_DELAY;
            return result;
          } catch (e2) {
            if (store && await shouldQueue(envelope, e2, retryDelay)) {
              await store.insert(envelope);
              flushWithBackOff();
              log("Error sending. Event queued", e2);
              return {};
            } else {
              throw e2;
            }
          }
        }
        if (options.flushAtStartup) {
          flushWithBackOff();
        }
        return {
          send,
          flush: (t) => transport.flush(t)
        };
      };
    }
    exports.MIN_DELAY = MIN_DELAY;
    exports.START_DELAY = START_DELAY;
    exports.makeOfflineTransport = makeOfflineTransport;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/transports/multiplexed.js
var require_multiplexed = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/transports/multiplexed.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var api = require_api();
    function eventFromEnvelope(env3, types) {
      let event;
      utils.forEachEnvelopeItem(env3, (item2, type) => {
        if (types.includes(type)) {
          event = Array.isArray(item2) ? item2[1] : void 0;
        }
        return !!event;
      });
      return event;
    }
    function makeOverrideReleaseTransport(createTransport, release) {
      return (options) => {
        const transport = createTransport(options);
        return {
          send: async (envelope) => {
            const event = eventFromEnvelope(envelope, ["event", "transaction", "profile", "replay_event"]);
            if (event) {
              event.release = release;
            }
            return transport.send(envelope);
          },
          flush: (timeout) => transport.flush(timeout)
        };
      };
    }
    function makeMultiplexedTransport(createTransport, matcher) {
      return (options) => {
        const fallbackTransport = createTransport(options);
        const otherTransports = {};
        function getTransport(dsn, release) {
          const key = release ? `${dsn}:${release}` : dsn;
          if (!otherTransports[key]) {
            const validatedDsn = utils.dsnFromString(dsn);
            if (!validatedDsn) {
              return void 0;
            }
            const url2 = api.getEnvelopeEndpointWithUrlEncodedAuth(validatedDsn);
            otherTransports[key] = release ? makeOverrideReleaseTransport(createTransport, release)({ ...options, url: url2 }) : createTransport({ ...options, url: url2 });
          }
          return otherTransports[key];
        }
        async function send(envelope) {
          function getEvent(types) {
            const eventTypes = types && types.length ? types : ["event"];
            return eventFromEnvelope(envelope, eventTypes);
          }
          const transports = matcher({ envelope, getEvent }).map((result) => {
            if (typeof result === "string") {
              return getTransport(result, void 0);
            } else {
              return getTransport(result.dsn, result.release);
            }
          }).filter((t) => !!t);
          if (transports.length === 0) {
            transports.push(fallbackTransport);
          }
          const results = await Promise.all(transports.map((transport) => transport.send(envelope)));
          return results[0];
        }
        async function flush(timeout) {
          const allTransports = [...Object.keys(otherTransports).map((dsn) => otherTransports[dsn]), fallbackTransport];
          const results = await Promise.all(allTransports.map((transport) => transport.flush(timeout)));
          return results.every((r2) => r2);
        }
        return {
          send,
          flush
        };
      };
    }
    exports.eventFromEnvelope = eventFromEnvelope;
    exports.makeMultiplexedTransport = makeMultiplexedTransport;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/version.js
var require_version = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/version.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var SDK_VERSION = "7.69.0";
    exports.SDK_VERSION = SDK_VERSION;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/integrations/functiontostring.js
var require_functiontostring = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/integrations/functiontostring.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var originalFunctionToString;
    var FunctionToString = class {
      static __initStatic() {
        this.id = "FunctionToString";
      }
      constructor() {
        this.name = FunctionToString.id;
      }
      setupOnce() {
        originalFunctionToString = Function.prototype.toString;
        try {
          Function.prototype.toString = function(...args) {
            const context = utils.getOriginalFunction(this) || this;
            return originalFunctionToString.apply(context, args);
          };
        } catch (e2) {
        }
      }
    };
    FunctionToString.__initStatic();
    exports.FunctionToString = FunctionToString;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/integrations/inboundfilters.js
var require_inboundfilters = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/integrations/inboundfilters.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var DEFAULT_IGNORE_ERRORS = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/];
    var DEFAULT_IGNORE_TRANSACTIONS = [
      /^.*healthcheck.*$/,
      /^.*healthy.*$/,
      /^.*live.*$/,
      /^.*ready.*$/,
      /^.*heartbeat.*$/,
      /^.*\/health$/,
      /^.*\/healthz$/
    ];
    var InboundFilters = class {
      static __initStatic() {
        this.id = "InboundFilters";
      }
      constructor(options = {}) {
        this.name = InboundFilters.id;
        this._options = options;
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        const eventProcess = (event) => {
          const hub = getCurrentHub();
          if (hub) {
            const self2 = hub.getIntegration(InboundFilters);
            if (self2) {
              const client = hub.getClient();
              const clientOptions = client ? client.getOptions() : {};
              const options = _mergeOptions(self2._options, clientOptions);
              return _shouldDropEvent(event, options) ? null : event;
            }
          }
          return event;
        };
        eventProcess.id = this.name;
        addGlobalEventProcessor(eventProcess);
      }
    };
    InboundFilters.__initStatic();
    function _mergeOptions(internalOptions = {}, clientOptions = {}) {
      return {
        allowUrls: [...internalOptions.allowUrls || [], ...clientOptions.allowUrls || []],
        denyUrls: [...internalOptions.denyUrls || [], ...clientOptions.denyUrls || []],
        ignoreErrors: [
          ...internalOptions.ignoreErrors || [],
          ...clientOptions.ignoreErrors || [],
          ...internalOptions.disableErrorDefaults ? [] : DEFAULT_IGNORE_ERRORS
        ],
        ignoreTransactions: [
          ...internalOptions.ignoreTransactions || [],
          ...clientOptions.ignoreTransactions || [],
          ...internalOptions.disableTransactionDefaults ? [] : DEFAULT_IGNORE_TRANSACTIONS
        ],
        ignoreInternal: internalOptions.ignoreInternal !== void 0 ? internalOptions.ignoreInternal : true
      };
    }
    function _shouldDropEvent(event, options) {
      if (options.ignoreInternal && _isSentryError(event)) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn(`Event dropped due to being internal Sentry Error.
Event: ${utils.getEventDescription(event)}`);
        return true;
      }
      if (_isIgnoredError(event, options.ignoreErrors)) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn(
          `Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${utils.getEventDescription(event)}`
        );
        return true;
      }
      if (_isIgnoredTransaction(event, options.ignoreTransactions)) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn(
          `Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${utils.getEventDescription(event)}`
        );
        return true;
      }
      if (_isDeniedUrl(event, options.denyUrls)) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn(
          `Event dropped due to being matched by \`denyUrls\` option.
Event: ${utils.getEventDescription(
            event
          )}.
Url: ${_getEventFilterUrl(event)}`
        );
        return true;
      }
      if (!_isAllowedUrl(event, options.allowUrls)) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn(
          `Event dropped due to not being matched by \`allowUrls\` option.
Event: ${utils.getEventDescription(
            event
          )}.
Url: ${_getEventFilterUrl(event)}`
        );
        return true;
      }
      return false;
    }
    function _isIgnoredError(event, ignoreErrors) {
      if (event.type || !ignoreErrors || !ignoreErrors.length) {
        return false;
      }
      return _getPossibleEventMessages(event).some((message) => utils.stringMatchesSomePattern(message, ignoreErrors));
    }
    function _isIgnoredTransaction(event, ignoreTransactions) {
      if (event.type !== "transaction" || !ignoreTransactions || !ignoreTransactions.length) {
        return false;
      }
      const name = event.transaction;
      return name ? utils.stringMatchesSomePattern(name, ignoreTransactions) : false;
    }
    function _isDeniedUrl(event, denyUrls) {
      if (!denyUrls || !denyUrls.length) {
        return false;
      }
      const url2 = _getEventFilterUrl(event);
      return !url2 ? false : utils.stringMatchesSomePattern(url2, denyUrls);
    }
    function _isAllowedUrl(event, allowUrls) {
      if (!allowUrls || !allowUrls.length) {
        return true;
      }
      const url2 = _getEventFilterUrl(event);
      return !url2 ? true : utils.stringMatchesSomePattern(url2, allowUrls);
    }
    function _getPossibleEventMessages(event) {
      const possibleMessages = [];
      if (event.message) {
        possibleMessages.push(event.message);
      }
      let lastException;
      try {
        lastException = event.exception.values[event.exception.values.length - 1];
      } catch (e2) {
      }
      if (lastException) {
        if (lastException.value) {
          possibleMessages.push(lastException.value);
          if (lastException.type) {
            possibleMessages.push(`${lastException.type}: ${lastException.value}`);
          }
        }
      }
      if ((typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && possibleMessages.length === 0) {
        utils.logger.error(`Could not extract message for event ${utils.getEventDescription(event)}`);
      }
      return possibleMessages;
    }
    function _isSentryError(event) {
      try {
        return event.exception.values[0].type === "SentryError";
      } catch (e2) {
      }
      return false;
    }
    function _getLastValidUrl(frames = []) {
      for (let i = frames.length - 1; i >= 0; i--) {
        const frame = frames[i];
        if (frame && frame.filename !== "<anonymous>" && frame.filename !== "[native code]") {
          return frame.filename || null;
        }
      }
      return null;
    }
    function _getEventFilterUrl(event) {
      try {
        let frames;
        try {
          frames = event.exception.values[0].stacktrace.frames;
        } catch (e2) {
        }
        return frames ? _getLastValidUrl(frames) : null;
      } catch (oO) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.error(`Cannot extract url for event ${utils.getEventDescription(event)}`);
        return null;
      }
    }
    exports.InboundFilters = InboundFilters;
    exports._mergeOptions = _mergeOptions;
    exports._shouldDropEvent = _shouldDropEvent;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/integrations/index.js
var require_integrations = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/integrations/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var functiontostring = require_functiontostring();
    var inboundfilters = require_inboundfilters();
    exports.FunctionToString = functiontostring.FunctionToString;
    exports.InboundFilters = inboundfilters.InboundFilters;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/metadata.js
var require_metadata = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/metadata.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var filenameMetadataMap = /* @__PURE__ */ new Map();
    var parsedStacks = /* @__PURE__ */ new Set();
    function ensureMetadataStacksAreParsed(parser) {
      if (!utils.GLOBAL_OBJ._sentryModuleMetadata) {
        return;
      }
      for (const stack of Object.keys(utils.GLOBAL_OBJ._sentryModuleMetadata)) {
        const metadata = utils.GLOBAL_OBJ._sentryModuleMetadata[stack];
        if (parsedStacks.has(stack)) {
          continue;
        }
        parsedStacks.add(stack);
        const frames = parser(stack);
        for (const frame of frames.reverse()) {
          if (frame.filename) {
            filenameMetadataMap.set(frame.filename, metadata);
            break;
          }
        }
      }
    }
    function getMetadataForUrl(parser, filename) {
      ensureMetadataStacksAreParsed(parser);
      return filenameMetadataMap.get(filename);
    }
    function addMetadataToStackFrames(parser, event) {
      try {
        event.exception.values.forEach((exception) => {
          if (!exception.stacktrace) {
            return;
          }
          for (const frame of exception.stacktrace.frames || []) {
            if (!frame.filename) {
              continue;
            }
            const metadata = getMetadataForUrl(parser, frame.filename);
            if (metadata) {
              frame.module_metadata = metadata;
            }
          }
        });
      } catch (_3) {
      }
    }
    function stripMetadataFromStackFrames(event) {
      try {
        event.exception.values.forEach((exception) => {
          if (!exception.stacktrace) {
            return;
          }
          for (const frame of exception.stacktrace.frames || []) {
            delete frame.module_metadata;
          }
        });
      } catch (_3) {
      }
    }
    exports.addMetadataToStackFrames = addMetadataToStackFrames;
    exports.getMetadataForUrl = getMetadataForUrl;
    exports.stripMetadataFromStackFrames = stripMetadataFromStackFrames;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/integrations/metadata.js
var require_metadata2 = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/integrations/metadata.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var metadata = require_metadata();
    var ModuleMetadata = class {
      static __initStatic() {
        this.id = "ModuleMetadata";
      }
      constructor() {
        this.name = ModuleMetadata.id;
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        const client = getCurrentHub().getClient();
        if (!client || typeof client.on !== "function") {
          return;
        }
        client.on("beforeEnvelope", (envelope) => {
          utils.forEachEnvelopeItem(envelope, (item2, type) => {
            if (type === "event") {
              const event = Array.isArray(item2) ? item2[1] : void 0;
              if (event) {
                metadata.stripMetadataFromStackFrames(event);
                item2[1] = event;
              }
            }
          });
        });
        const stackParser = client.getOptions().stackParser;
        addGlobalEventProcessor((event) => {
          metadata.addMetadataToStackFrames(stackParser, event);
          return event;
        });
      }
    };
    ModuleMetadata.__initStatic();
    exports.ModuleMetadata = ModuleMetadata;
  }
});

// ../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/index.js
var require_cjs2 = __commonJS({
  "../../node_modules/.pnpm/@sentry+core@7.69.0/node_modules/@sentry/core/cjs/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var hubextensions = require_hubextensions();
    var idletransaction = require_idletransaction();
    var span = require_span();
    var transaction = require_transaction();
    var utils$1 = require_utils();
    var spanstatus = require_spanstatus();
    var trace = require_trace();
    var dynamicSamplingContext = require_dynamicSamplingContext();
    var measurement = require_measurement();
    var exports$1 = require_exports();
    var hub = require_hub();
    var session = require_session();
    var sessionflusher = require_sessionflusher();
    var scope = require_scope();
    var api = require_api();
    var baseclient = require_baseclient();
    var serverRuntimeClient = require_server_runtime_client();
    var sdk = require_sdk();
    var base = require_base();
    var offline = require_offline();
    var multiplexed = require_multiplexed();
    var version = require_version();
    var integration = require_integration();
    var index = require_integrations();
    var prepareEvent = require_prepareEvent();
    var checkin = require_checkin();
    var hasTracingEnabled = require_hasTracingEnabled();
    var constants2 = require_constants();
    var metadata = require_metadata2();
    var functiontostring = require_functiontostring();
    var inboundfilters = require_inboundfilters();
    var utils = require_cjs();
    exports.addTracingExtensions = hubextensions.addTracingExtensions;
    exports.startIdleTransaction = hubextensions.startIdleTransaction;
    exports.IdleTransaction = idletransaction.IdleTransaction;
    exports.TRACING_DEFAULTS = idletransaction.TRACING_DEFAULTS;
    exports.Span = span.Span;
    exports.spanStatusfromHttpCode = span.spanStatusfromHttpCode;
    exports.Transaction = transaction.Transaction;
    exports.getActiveTransaction = utils$1.getActiveTransaction;
    Object.defineProperty(exports, "SpanStatus", {
      enumerable: true,
      get: () => spanstatus.SpanStatus
    });
    exports.getActiveSpan = trace.getActiveSpan;
    exports.startActiveSpan = trace.startActiveSpan;
    exports.startInactiveSpan = trace.startInactiveSpan;
    exports.startSpan = trace.startSpan;
    exports.startSpanManual = trace.startSpanManual;
    exports.trace = trace.trace;
    exports.getDynamicSamplingContextFromClient = dynamicSamplingContext.getDynamicSamplingContextFromClient;
    exports.setMeasurement = measurement.setMeasurement;
    exports.addBreadcrumb = exports$1.addBreadcrumb;
    exports.captureCheckIn = exports$1.captureCheckIn;
    exports.captureEvent = exports$1.captureEvent;
    exports.captureException = exports$1.captureException;
    exports.captureMessage = exports$1.captureMessage;
    exports.close = exports$1.close;
    exports.configureScope = exports$1.configureScope;
    exports.flush = exports$1.flush;
    exports.lastEventId = exports$1.lastEventId;
    exports.setContext = exports$1.setContext;
    exports.setExtra = exports$1.setExtra;
    exports.setExtras = exports$1.setExtras;
    exports.setTag = exports$1.setTag;
    exports.setTags = exports$1.setTags;
    exports.setUser = exports$1.setUser;
    exports.startTransaction = exports$1.startTransaction;
    exports.withScope = exports$1.withScope;
    exports.Hub = hub.Hub;
    exports.ensureHubOnCarrier = hub.ensureHubOnCarrier;
    exports.getCurrentHub = hub.getCurrentHub;
    exports.getHubFromCarrier = hub.getHubFromCarrier;
    exports.getMainCarrier = hub.getMainCarrier;
    exports.makeMain = hub.makeMain;
    exports.runWithAsyncContext = hub.runWithAsyncContext;
    exports.setAsyncContextStrategy = hub.setAsyncContextStrategy;
    exports.setHubOnCarrier = hub.setHubOnCarrier;
    exports.closeSession = session.closeSession;
    exports.makeSession = session.makeSession;
    exports.updateSession = session.updateSession;
    exports.SessionFlusher = sessionflusher.SessionFlusher;
    exports.Scope = scope.Scope;
    exports.addGlobalEventProcessor = scope.addGlobalEventProcessor;
    exports.getEnvelopeEndpointWithUrlEncodedAuth = api.getEnvelopeEndpointWithUrlEncodedAuth;
    exports.getReportDialogEndpoint = api.getReportDialogEndpoint;
    exports.BaseClient = baseclient.BaseClient;
    exports.ServerRuntimeClient = serverRuntimeClient.ServerRuntimeClient;
    exports.initAndBind = sdk.initAndBind;
    exports.createTransport = base.createTransport;
    exports.makeOfflineTransport = offline.makeOfflineTransport;
    exports.makeMultiplexedTransport = multiplexed.makeMultiplexedTransport;
    exports.SDK_VERSION = version.SDK_VERSION;
    exports.getIntegrationsToSetup = integration.getIntegrationsToSetup;
    exports.Integrations = index;
    exports.prepareEvent = prepareEvent.prepareEvent;
    exports.createCheckInEnvelope = checkin.createCheckInEnvelope;
    exports.hasTracingEnabled = hasTracingEnabled.hasTracingEnabled;
    exports.DEFAULT_ENVIRONMENT = constants2.DEFAULT_ENVIRONMENT;
    exports.ModuleMetadata = metadata.ModuleMetadata;
    exports.FunctionToString = functiontostring.FunctionToString;
    exports.InboundFilters = inboundfilters.InboundFilters;
    exports.extractTraceparentData = utils.extractTraceparentData;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/buildPolyfills/_nullishCoalesce.js
var require_nullishCoalesce = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/buildPolyfills/_nullishCoalesce.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function _nullishCoalesce(lhs, rhsFn) {
      return lhs != null ? lhs : rhsFn();
    }
    exports._nullishCoalesce = _nullishCoalesce;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/buildPolyfills/_asyncNullishCoalesce.js
var require_asyncNullishCoalesce = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/buildPolyfills/_asyncNullishCoalesce.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var _nullishCoalesce = require_nullishCoalesce();
    async function _asyncNullishCoalesce(lhs, rhsFn) {
      return _nullishCoalesce._nullishCoalesce(lhs, rhsFn);
    }
    exports._asyncNullishCoalesce = _asyncNullishCoalesce;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/buildPolyfills/_asyncOptionalChain.js
var require_asyncOptionalChain = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/buildPolyfills/_asyncOptionalChain.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    async function _asyncOptionalChain(ops) {
      let lastAccessLHS = void 0;
      let value = ops[0];
      let i = 1;
      while (i < ops.length) {
        const op = ops[i];
        const fn = ops[i + 1];
        i += 2;
        if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
          return;
        }
        if (op === "access" || op === "optionalAccess") {
          lastAccessLHS = value;
          value = await fn(value);
        } else if (op === "call" || op === "optionalCall") {
          value = await fn((...args) => value.call(lastAccessLHS, ...args));
          lastAccessLHS = void 0;
        }
      }
      return value;
    }
    exports._asyncOptionalChain = _asyncOptionalChain;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/buildPolyfills/_asyncOptionalChainDelete.js
var require_asyncOptionalChainDelete = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/buildPolyfills/_asyncOptionalChainDelete.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var _asyncOptionalChain = require_asyncOptionalChain();
    async function _asyncOptionalChainDelete(ops) {
      const result = await _asyncOptionalChain._asyncOptionalChain(ops);
      return result == null ? true : result;
    }
    exports._asyncOptionalChainDelete = _asyncOptionalChainDelete;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/buildPolyfills/_optionalChain.js
var require_optionalChain = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/buildPolyfills/_optionalChain.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function _optionalChain(ops) {
      let lastAccessLHS = void 0;
      let value = ops[0];
      let i = 1;
      while (i < ops.length) {
        const op = ops[i];
        const fn = ops[i + 1];
        i += 2;
        if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
          return;
        }
        if (op === "access" || op === "optionalAccess") {
          lastAccessLHS = value;
          value = fn(value);
        } else if (op === "call" || op === "optionalCall") {
          value = fn((...args) => value.call(lastAccessLHS, ...args));
          lastAccessLHS = void 0;
        }
      }
      return value;
    }
    exports._optionalChain = _optionalChain;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/buildPolyfills/_optionalChainDelete.js
var require_optionalChainDelete = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/buildPolyfills/_optionalChainDelete.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var _optionalChain = require_optionalChain();
    function _optionalChainDelete(ops) {
      const result = _optionalChain._optionalChain(ops);
      return result == null ? true : result;
    }
    exports._optionalChainDelete = _optionalChainDelete;
  }
});

// ../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/buildPolyfills/index.js
var require_buildPolyfills = __commonJS({
  "../../node_modules/.pnpm/@sentry+utils@7.69.0/node_modules/@sentry/utils/cjs/buildPolyfills/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var _asyncNullishCoalesce = require_asyncNullishCoalesce();
    var _asyncOptionalChain = require_asyncOptionalChain();
    var _asyncOptionalChainDelete = require_asyncOptionalChainDelete();
    var _nullishCoalesce = require_nullishCoalesce();
    var _optionalChain = require_optionalChain();
    var _optionalChainDelete = require_optionalChainDelete();
    exports._asyncNullishCoalesce = _asyncNullishCoalesce._asyncNullishCoalesce;
    exports._asyncOptionalChain = _asyncOptionalChain._asyncOptionalChain;
    exports._asyncOptionalChainDelete = _asyncOptionalChainDelete._asyncOptionalChainDelete;
    exports._nullishCoalesce = _nullishCoalesce._nullishCoalesce;
    exports._optionalChain = _optionalChain._optionalChain;
    exports._optionalChainDelete = _optionalChainDelete._optionalChainDelete;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/utils/node-utils.js
var require_node_utils = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/utils/node-utils.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    function shouldDisableAutoInstrumentation(getCurrentHub) {
      const clientOptions = _optionalChain([getCurrentHub, "call", (_3) => _3(), "access", (_22) => _22.getClient, "call", (_3) => _3(), "optionalAccess", (_4) => _4.getOptions, "call", (_5) => _5()]);
      const instrumenter = _optionalChain([clientOptions, "optionalAccess", (_6) => _6.instrumenter]) || "sentry";
      return instrumenter !== "sentry";
    }
    exports.shouldDisableAutoInstrumentation = shouldDisableAutoInstrumentation;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/express.js
var require_express = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/express.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var nodeUtils = require_node_utils();
    var Express = class {
      static __initStatic() {
        this.id = "Express";
      }
      constructor(options = {}) {
        this.name = Express.id;
        this._router = options.router || options.app;
        this._methods = (Array.isArray(options.methods) ? options.methods : []).concat("use");
      }
      setupOnce(_3, getCurrentHub) {
        if (!this._router) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.error("ExpressIntegration is missing an Express instance");
          return;
        }
        if (nodeUtils.shouldDisableAutoInstrumentation(getCurrentHub)) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("Express Integration is skipped because of instrumenter configuration.");
          return;
        }
        instrumentMiddlewares(this._router, this._methods);
        instrumentRouter(this._router);
      }
    };
    Express.__initStatic();
    function wrap2(fn, method) {
      const arity = fn.length;
      switch (arity) {
        case 2: {
          return function(req, res) {
            const transaction = res.__sentry_transaction;
            if (transaction) {
              const span = transaction.startChild({
                description: fn.name,
                op: `middleware.express.${method}`,
                origin: "auto.middleware.express"
              });
              res.once("finish", () => {
                span.finish();
              });
            }
            return fn.call(this, req, res);
          };
        }
        case 3: {
          return function(req, res, next2) {
            const transaction = res.__sentry_transaction;
            const span = _optionalChain([transaction, "optionalAccess", (_22) => _22.startChild, "call", (_3) => _3({
              description: fn.name,
              op: `middleware.express.${method}`,
              origin: "auto.middleware.express"
            })]);
            fn.call(this, req, res, function(...args) {
              _optionalChain([span, "optionalAccess", (_4) => _4.finish, "call", (_5) => _5()]);
              next2.call(this, ...args);
            });
          };
        }
        case 4: {
          return function(err, req, res, next2) {
            const transaction = res.__sentry_transaction;
            const span = _optionalChain([transaction, "optionalAccess", (_6) => _6.startChild, "call", (_7) => _7({
              description: fn.name,
              op: `middleware.express.${method}`,
              origin: "auto.middleware.express"
            })]);
            fn.call(this, err, req, res, function(...args) {
              _optionalChain([span, "optionalAccess", (_8) => _8.finish, "call", (_9) => _9()]);
              next2.call(this, ...args);
            });
          };
        }
        default: {
          throw new Error(`Express middleware takes 2-4 arguments. Got: ${arity}`);
        }
      }
    }
    function wrapMiddlewareArgs(args, method) {
      return args.map((arg) => {
        if (typeof arg === "function") {
          return wrap2(arg, method);
        }
        if (Array.isArray(arg)) {
          return arg.map((a2) => {
            if (typeof a2 === "function") {
              return wrap2(a2, method);
            }
            return a2;
          });
        }
        return arg;
      });
    }
    function patchMiddleware(router, method) {
      const originalCallback = router[method];
      router[method] = function(...args) {
        return originalCallback.call(this, ...wrapMiddlewareArgs(args, method));
      };
      return router;
    }
    function instrumentMiddlewares(router, methods = []) {
      methods.forEach((method) => patchMiddleware(router, method));
    }
    function instrumentRouter(appOrRouter) {
      const isApp = "settings" in appOrRouter;
      if (isApp && appOrRouter._router === void 0 && appOrRouter.lazyrouter) {
        appOrRouter.lazyrouter();
      }
      const router = isApp ? appOrRouter._router : appOrRouter;
      if (!router) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.debug("Cannot instrument router for URL Parameterization (did not find a valid router).");
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.debug("Routing instrumentation is currently only supported in Express 4.");
        return;
      }
      const routerProto = Object.getPrototypeOf(router);
      const originalProcessParams = routerProto.process_params;
      routerProto.process_params = function process_params(layer, called, req, res, done) {
        if (!req._reconstructedRoute) {
          req._reconstructedRoute = "";
        }
        const { layerRoutePath, isRegex, isArray, numExtraSegments } = getLayerRoutePathInfo(layer);
        if (layerRoutePath || isRegex || isArray) {
          req._hasParameters = true;
        }
        const partialRoute = layerRoutePath || layer.path || "";
        const finalPartialRoute = partialRoute.split("/").filter((segment) => segment.length > 0 && (isRegex || isArray || !segment.includes("*"))).join("/");
        if (finalPartialRoute && finalPartialRoute.length > 0) {
          req._reconstructedRoute += `/${finalPartialRoute}${isRegex ? "/" : ""}`;
        }
        const urlLength = utils.getNumberOfUrlSegments(req.originalUrl || "") + numExtraSegments;
        const routeLength = utils.getNumberOfUrlSegments(req._reconstructedRoute);
        if (urlLength === routeLength) {
          if (!req._hasParameters) {
            if (req._reconstructedRoute !== req.originalUrl) {
              req._reconstructedRoute = req.originalUrl ? utils.stripUrlQueryAndFragment(req.originalUrl) : req.originalUrl;
            }
          }
          const transaction = res.__sentry_transaction;
          if (transaction && transaction.metadata.source !== "custom") {
            const finalRoute = req._reconstructedRoute || "/";
            transaction.setName(...utils.extractPathForTransaction(req, { path: true, method: true, customRoute: finalRoute }));
          }
        }
        return originalProcessParams.call(this, layer, called, req, res, done);
      };
    }
    function getLayerRoutePathInfo(layer) {
      const lrp = _optionalChain([layer, "access", (_10) => _10.route, "optionalAccess", (_11) => _11.path]);
      const isRegex = utils.isRegExp(lrp);
      const isArray = Array.isArray(lrp);
      if (!lrp) {
        return { isRegex, isArray, numExtraSegments: 0 };
      }
      const numExtraSegments = isArray ? Math.max(getNumberOfArrayUrlSegments(lrp) - utils.getNumberOfUrlSegments(layer.path || ""), 0) : 0;
      const layerRoutePath = getLayerRoutePathString(isArray, lrp);
      return { layerRoutePath, isRegex, isArray, numExtraSegments };
    }
    function getNumberOfArrayUrlSegments(routesArray) {
      return routesArray.reduce((accNumSegments, currentRoute) => {
        return accNumSegments + utils.getNumberOfUrlSegments(currentRoute.toString());
      }, 0);
    }
    function getLayerRoutePathString(isArray, lrp) {
      if (isArray) {
        return lrp.map((r2) => r2.toString()).join(",");
      }
      return lrp && lrp.toString();
    }
    exports.Express = Express;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/postgres.js
var require_postgres = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/postgres.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var nodeUtils = require_node_utils();
    var Postgres = class {
      static __initStatic() {
        this.id = "Postgres";
      }
      constructor(options = {}) {
        this.name = Postgres.id;
        this._usePgNative = !!options.usePgNative;
      }
      loadDependency() {
        return this._module = this._module || utils.loadModule("pg");
      }
      setupOnce(_3, getCurrentHub) {
        if (nodeUtils.shouldDisableAutoInstrumentation(getCurrentHub)) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("Postgres Integration is skipped because of instrumenter configuration.");
          return;
        }
        const pkg = this.loadDependency();
        if (!pkg) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.error("Postgres Integration was unable to require `pg` package.");
          return;
        }
        if (this._usePgNative && !_optionalChain([pkg, "access", (_22) => _22.native, "optionalAccess", (_32) => _32.Client])) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.error("Postgres Integration was unable to access 'pg-native' bindings.");
          return;
        }
        const { Client } = this._usePgNative ? pkg.native : pkg;
        utils.fill(Client.prototype, "query", function(orig) {
          return function(config, values, callback) {
            const scope = getCurrentHub().getScope();
            const parentSpan = scope.getSpan();
            const data = {
              "db.system": "postgresql"
            };
            try {
              if (this.database) {
                data["db.name"] = this.database;
              }
              if (this.host) {
                data["server.address"] = this.host;
              }
              if (this.port) {
                data["server.port"] = this.port;
              }
              if (this.user) {
                data["db.user"] = this.user;
              }
            } catch (e2) {
            }
            const span = _optionalChain([parentSpan, "optionalAccess", (_4) => _4.startChild, "call", (_5) => _5({
              description: typeof config === "string" ? config : config.text,
              op: "db",
              origin: "auto.db.postgres",
              data
            })]);
            if (typeof callback === "function") {
              return orig.call(this, config, values, function(err, result) {
                _optionalChain([span, "optionalAccess", (_6) => _6.finish, "call", (_7) => _7()]);
                callback(err, result);
              });
            }
            if (typeof values === "function") {
              return orig.call(this, config, function(err, result) {
                _optionalChain([span, "optionalAccess", (_8) => _8.finish, "call", (_9) => _9()]);
                values(err, result);
              });
            }
            const rv = typeof values !== "undefined" ? orig.call(this, config, values) : orig.call(this, config);
            if (utils.isThenable(rv)) {
              return rv.then((res) => {
                _optionalChain([span, "optionalAccess", (_10) => _10.finish, "call", (_11) => _11()]);
                return res;
              });
            }
            _optionalChain([span, "optionalAccess", (_12) => _12.finish, "call", (_13) => _13()]);
            return rv;
          };
        });
      }
    };
    Postgres.__initStatic();
    exports.Postgres = Postgres;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/mysql.js
var require_mysql = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/mysql.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var nodeUtils = require_node_utils();
    var Mysql = class {
      static __initStatic() {
        this.id = "Mysql";
      }
      constructor() {
        this.name = Mysql.id;
      }
      loadDependency() {
        return this._module = this._module || utils.loadModule("mysql/lib/Connection.js");
      }
      setupOnce(_3, getCurrentHub) {
        if (nodeUtils.shouldDisableAutoInstrumentation(getCurrentHub)) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("Mysql Integration is skipped because of instrumenter configuration.");
          return;
        }
        const pkg = this.loadDependency();
        if (!pkg) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.error("Mysql Integration was unable to require `mysql` package.");
          return;
        }
        let mySqlConfig = void 0;
        try {
          pkg.prototype.connect = new Proxy(pkg.prototype.connect, {
            apply(wrappingTarget, thisArg, args) {
              if (!mySqlConfig) {
                mySqlConfig = thisArg.config;
              }
              return wrappingTarget.apply(thisArg, args);
            }
          });
        } catch (e2) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.error("Mysql Integration was unable to instrument `mysql` config.");
        }
        function spanDataFromConfig() {
          if (!mySqlConfig) {
            return {};
          }
          return {
            "server.address": mySqlConfig.host,
            "server.port": mySqlConfig.port,
            "db.user": mySqlConfig.user
          };
        }
        function finishSpan(span) {
          if (!span) {
            return;
          }
          const data = spanDataFromConfig();
          Object.keys(data).forEach((key) => {
            span.setData(key, data[key]);
          });
          span.finish();
        }
        utils.fill(pkg, "createQuery", function(orig) {
          return function(options, values, callback) {
            const scope = getCurrentHub().getScope();
            const parentSpan = scope.getSpan();
            const span = _optionalChain([parentSpan, "optionalAccess", (_22) => _22.startChild, "call", (_32) => _32({
              description: typeof options === "string" ? options : options.sql,
              op: "db",
              origin: "auto.db.mysql",
              data: {
                "db.system": "mysql"
              }
            })]);
            if (typeof callback === "function") {
              return orig.call(this, options, values, function(err, result, fields) {
                finishSpan(span);
                callback(err, result, fields);
              });
            }
            if (typeof values === "function") {
              return orig.call(this, options, function(err, result, fields) {
                finishSpan(span);
                values(err, result, fields);
              });
            }
            return orig.call(this, options, values, function() {
              finishSpan(span);
            });
          };
        });
      }
    };
    Mysql.__initStatic();
    exports.Mysql = Mysql;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/mongo.js
var require_mongo = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/mongo.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var nodeUtils = require_node_utils();
    var OPERATIONS = [
      "aggregate",
      "bulkWrite",
      "countDocuments",
      "createIndex",
      "createIndexes",
      "deleteMany",
      "deleteOne",
      "distinct",
      "drop",
      "dropIndex",
      "dropIndexes",
      "estimatedDocumentCount",
      "find",
      "findOne",
      "findOneAndDelete",
      "findOneAndReplace",
      "findOneAndUpdate",
      "indexes",
      "indexExists",
      "indexInformation",
      "initializeOrderedBulkOp",
      "insertMany",
      "insertOne",
      "isCapped",
      "mapReduce",
      "options",
      "parallelCollectionScan",
      "rename",
      "replaceOne",
      "stats",
      "updateMany",
      "updateOne"
    ];
    var OPERATION_SIGNATURES = {
      bulkWrite: ["operations"],
      countDocuments: ["query"],
      createIndex: ["fieldOrSpec"],
      createIndexes: ["indexSpecs"],
      deleteMany: ["filter"],
      deleteOne: ["filter"],
      distinct: ["key", "query"],
      dropIndex: ["indexName"],
      find: ["query"],
      findOne: ["query"],
      findOneAndDelete: ["filter"],
      findOneAndReplace: ["filter", "replacement"],
      findOneAndUpdate: ["filter", "update"],
      indexExists: ["indexes"],
      insertMany: ["docs"],
      insertOne: ["doc"],
      mapReduce: ["map", "reduce"],
      rename: ["newName"],
      replaceOne: ["filter", "doc"],
      updateMany: ["filter", "update"],
      updateOne: ["filter", "update"]
    };
    function isCursor(maybeCursor) {
      return maybeCursor && typeof maybeCursor === "object" && maybeCursor.once && typeof maybeCursor.once === "function";
    }
    var Mongo = class {
      static __initStatic() {
        this.id = "Mongo";
      }
      constructor(options = {}) {
        this.name = Mongo.id;
        this._operations = Array.isArray(options.operations) ? options.operations : OPERATIONS;
        this._describeOperations = "describeOperations" in options ? options.describeOperations : true;
        this._useMongoose = !!options.useMongoose;
      }
      loadDependency() {
        const moduleName = this._useMongoose ? "mongoose" : "mongodb";
        return this._module = this._module || utils.loadModule(moduleName);
      }
      setupOnce(_3, getCurrentHub) {
        if (nodeUtils.shouldDisableAutoInstrumentation(getCurrentHub)) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("Mongo Integration is skipped because of instrumenter configuration.");
          return;
        }
        const pkg = this.loadDependency();
        if (!pkg) {
          const moduleName = this._useMongoose ? "mongoose" : "mongodb";
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.error(`Mongo Integration was unable to require \`${moduleName}\` package.`);
          return;
        }
        this._instrumentOperations(pkg.Collection, this._operations, getCurrentHub);
      }
      _instrumentOperations(collection, operations, getCurrentHub) {
        operations.forEach((operation) => this._patchOperation(collection, operation, getCurrentHub));
      }
      _patchOperation(collection, operation, getCurrentHub) {
        if (!(operation in collection.prototype))
          return;
        const getSpanContext = this._getSpanContextFromOperationArguments.bind(this);
        utils.fill(collection.prototype, operation, function(orig) {
          return function(...args) {
            const lastArg = args[args.length - 1];
            const scope = getCurrentHub().getScope();
            const parentSpan = scope.getSpan();
            if (typeof lastArg !== "function" || operation === "mapReduce" && args.length === 2) {
              const span2 = _optionalChain([parentSpan, "optionalAccess", (_22) => _22.startChild, "call", (_3) => _3(getSpanContext(this, operation, args))]);
              const maybePromiseOrCursor = orig.call(this, ...args);
              if (utils.isThenable(maybePromiseOrCursor)) {
                return maybePromiseOrCursor.then((res) => {
                  _optionalChain([span2, "optionalAccess", (_4) => _4.finish, "call", (_5) => _5()]);
                  return res;
                });
              } else if (isCursor(maybePromiseOrCursor)) {
                const cursor2 = maybePromiseOrCursor;
                try {
                  cursor2.once("close", () => {
                    _optionalChain([span2, "optionalAccess", (_6) => _6.finish, "call", (_7) => _7()]);
                  });
                } catch (e2) {
                  _optionalChain([span2, "optionalAccess", (_8) => _8.finish, "call", (_9) => _9()]);
                }
                return cursor2;
              } else {
                _optionalChain([span2, "optionalAccess", (_10) => _10.finish, "call", (_11) => _11()]);
                return maybePromiseOrCursor;
              }
            }
            const span = _optionalChain([parentSpan, "optionalAccess", (_12) => _12.startChild, "call", (_13) => _13(getSpanContext(this, operation, args.slice(0, -1)))]);
            return orig.call(this, ...args.slice(0, -1), function(err, result) {
              _optionalChain([span, "optionalAccess", (_14) => _14.finish, "call", (_15) => _15()]);
              lastArg(err, result);
            });
          };
        });
      }
      _getSpanContextFromOperationArguments(collection, operation, args) {
        const data = {
          "db.system": "mongodb",
          "db.name": collection.dbName,
          "db.operation": operation,
          "db.mongodb.collection": collection.collectionName
        };
        const spanContext = {
          op: "db",
          origin: "auto.db.mongo",
          description: operation,
          data
        };
        const signature = OPERATION_SIGNATURES[operation];
        const shouldDescribe = Array.isArray(this._describeOperations) ? this._describeOperations.includes(operation) : this._describeOperations;
        if (!signature || !shouldDescribe) {
          return spanContext;
        }
        try {
          if (operation === "mapReduce") {
            const [map, reduce] = args;
            data[signature[0]] = typeof map === "string" ? map : map.name || "<anonymous>";
            data[signature[1]] = typeof reduce === "string" ? reduce : reduce.name || "<anonymous>";
          } else {
            for (let i = 0; i < signature.length; i++) {
              data[`db.mongodb.${signature[i]}`] = JSON.stringify(args[i]);
            }
          }
        } catch (_oO) {
        }
        return spanContext;
      }
    };
    Mongo.__initStatic();
    exports.Mongo = Mongo;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/prisma.js
var require_prisma = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/prisma.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var utils = require_cjs();
    var nodeUtils = require_node_utils();
    function isValidPrismaClient(possibleClient) {
      return !!possibleClient && !!possibleClient["$use"];
    }
    var Prisma = class {
      static __initStatic() {
        this.id = "Prisma";
      }
      constructor(options = {}) {
        this.name = Prisma.id;
        if (isValidPrismaClient(options.client) && !options.client._sentryInstrumented) {
          utils.addNonEnumerableProperty(options.client, "_sentryInstrumented", true);
          const clientData = {};
          try {
            const engineConfig = options.client._engineConfig;
            if (engineConfig) {
              const { activeProvider, clientVersion } = engineConfig;
              if (activeProvider) {
                clientData["db.system"] = activeProvider;
              }
              if (clientVersion) {
                clientData["db.prisma.version"] = clientVersion;
              }
            }
          } catch (e2) {
          }
          options.client.$use((params, next2) => {
            if (nodeUtils.shouldDisableAutoInstrumentation(core2.getCurrentHub)) {
              return next2(params);
            }
            const action2 = params.action;
            const model = params.model;
            return core2.trace(
              {
                name: model ? `${model} ${action2}` : action2,
                op: "db.sql.prisma",
                origin: "auto.db.prisma",
                data: { ...clientData, "db.operation": action2 }
              },
              () => next2(params)
            );
          });
        } else {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("Unsupported Prisma client provided to PrismaIntegration. Provided client:", options.client);
        }
      }
      setupOnce() {
      }
    };
    Prisma.__initStatic();
    exports.Prisma = Prisma;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/graphql.js
var require_graphql = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/graphql.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var nodeUtils = require_node_utils();
    var GraphQL = class {
      static __initStatic() {
        this.id = "GraphQL";
      }
      constructor() {
        this.name = GraphQL.id;
      }
      loadDependency() {
        return this._module = this._module || utils.loadModule("graphql/execution/execute.js");
      }
      setupOnce(_3, getCurrentHub) {
        if (nodeUtils.shouldDisableAutoInstrumentation(getCurrentHub)) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("GraphQL Integration is skipped because of instrumenter configuration.");
          return;
        }
        const pkg = this.loadDependency();
        if (!pkg) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.error("GraphQL Integration was unable to require graphql/execution package.");
          return;
        }
        utils.fill(pkg, "execute", function(orig) {
          return function(...args) {
            const scope = getCurrentHub().getScope();
            const parentSpan = scope.getSpan();
            const span = _optionalChain([parentSpan, "optionalAccess", (_22) => _22.startChild, "call", (_32) => _32({
              description: "execute",
              op: "graphql.execute",
              origin: "auto.graphql.graphql"
            })]);
            _optionalChain([scope, "optionalAccess", (_4) => _4.setSpan, "call", (_5) => _5(span)]);
            const rv = orig.call(this, ...args);
            if (utils.isThenable(rv)) {
              return rv.then((res) => {
                _optionalChain([span, "optionalAccess", (_6) => _6.finish, "call", (_7) => _7()]);
                _optionalChain([scope, "optionalAccess", (_8) => _8.setSpan, "call", (_9) => _9(parentSpan)]);
                return res;
              });
            }
            _optionalChain([span, "optionalAccess", (_10) => _10.finish, "call", (_11) => _11()]);
            _optionalChain([scope, "optionalAccess", (_12) => _12.setSpan, "call", (_13) => _13(parentSpan)]);
            return rv;
          };
        });
      }
    };
    GraphQL.__initStatic();
    exports.GraphQL = GraphQL;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/apollo.js
var require_apollo = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/apollo.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var nodeUtils = require_node_utils();
    var Apollo = class {
      static __initStatic() {
        this.id = "Apollo";
      }
      constructor(options = {
        useNestjs: false
      }) {
        this.name = Apollo.id;
        this._useNest = !!options.useNestjs;
      }
      loadDependency() {
        if (this._useNest) {
          this._module = this._module || utils.loadModule("@nestjs/graphql");
        } else {
          this._module = this._module || utils.loadModule("apollo-server-core");
        }
        return this._module;
      }
      setupOnce(_3, getCurrentHub) {
        if (nodeUtils.shouldDisableAutoInstrumentation(getCurrentHub)) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("Apollo Integration is skipped because of instrumenter configuration.");
          return;
        }
        if (this._useNest) {
          const pkg = this.loadDependency();
          if (!pkg) {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.error("Apollo-NestJS Integration was unable to require @nestjs/graphql package.");
            return;
          }
          utils.fill(
            pkg.GraphQLFactory.prototype,
            "mergeWithSchema",
            function(orig) {
              return function(...args) {
                utils.fill(this.resolversExplorerService, "explore", function(orig2) {
                  return function() {
                    const resolvers = utils.arrayify(orig2.call(this));
                    const instrumentedResolvers = instrumentResolvers(resolvers, getCurrentHub);
                    return instrumentedResolvers;
                  };
                });
                return orig.call(this, ...args);
              };
            }
          );
        } else {
          const pkg = this.loadDependency();
          if (!pkg) {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.error("Apollo Integration was unable to require apollo-server-core package.");
            return;
          }
          utils.fill(pkg.ApolloServerBase.prototype, "constructSchema", function(orig) {
            return function() {
              if (!this.config.resolvers) {
                if (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) {
                  if (this.config.schema) {
                    utils.logger.warn(
                      "Apollo integration is not able to trace `ApolloServer` instances constructed via `schema` property.If you are using NestJS with Apollo, please use `Sentry.Integrations.Apollo({ useNestjs: true })` instead."
                    );
                    utils.logger.warn();
                  } else if (this.config.modules) {
                    utils.logger.warn(
                      "Apollo integration is not able to trace `ApolloServer` instances constructed via `modules` property."
                    );
                  }
                  utils.logger.error("Skipping tracing as no resolvers found on the `ApolloServer` instance.");
                }
                return orig.call(this);
              }
              const resolvers = utils.arrayify(this.config.resolvers);
              this.config.resolvers = instrumentResolvers(resolvers, getCurrentHub);
              return orig.call(this);
            };
          });
        }
      }
    };
    Apollo.__initStatic();
    function instrumentResolvers(resolvers, getCurrentHub) {
      return resolvers.map((model) => {
        Object.keys(model).forEach((resolverGroupName) => {
          Object.keys(model[resolverGroupName]).forEach((resolverName) => {
            if (typeof model[resolverGroupName][resolverName] !== "function") {
              return;
            }
            wrapResolver(model, resolverGroupName, resolverName, getCurrentHub);
          });
        });
        return model;
      });
    }
    function wrapResolver(model, resolverGroupName, resolverName, getCurrentHub) {
      utils.fill(model[resolverGroupName], resolverName, function(orig) {
        return function(...args) {
          const scope = getCurrentHub().getScope();
          const parentSpan = scope.getSpan();
          const span = _optionalChain([parentSpan, "optionalAccess", (_22) => _22.startChild, "call", (_3) => _3({
            description: `${resolverGroupName}.${resolverName}`,
            op: "graphql.resolve",
            origin: "auto.graphql.apollo"
          })]);
          const rv = orig.call(this, ...args);
          if (utils.isThenable(rv)) {
            return rv.then((res) => {
              _optionalChain([span, "optionalAccess", (_4) => _4.finish, "call", (_5) => _5()]);
              return res;
            });
          }
          _optionalChain([span, "optionalAccess", (_6) => _6.finish, "call", (_7) => _7()]);
          return rv;
        };
      });
    }
    exports.Apollo = Apollo;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/lazy.js
var require_lazy = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/node/integrations/lazy.js"(exports, module2) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var lazyLoadedNodePerformanceMonitoringIntegrations = [
      () => {
        const integration = utils.dynamicRequire(module2, "./apollo");
        return new integration.Apollo();
      },
      () => {
        const integration = utils.dynamicRequire(module2, "./apollo");
        return new integration.Apollo({ useNestjs: true });
      },
      () => {
        const integration = utils.dynamicRequire(module2, "./graphql");
        return new integration.GraphQL();
      },
      () => {
        const integration = utils.dynamicRequire(module2, "./mongo");
        return new integration.Mongo();
      },
      () => {
        const integration = utils.dynamicRequire(module2, "./mongo");
        return new integration.Mongo({ mongoose: true });
      },
      () => {
        const integration = utils.dynamicRequire(module2, "./mysql");
        return new integration.Mysql();
      },
      () => {
        const integration = utils.dynamicRequire(module2, "./postgres");
        return new integration.Postgres();
      }
    ];
    exports.lazyLoadedNodePerformanceMonitoringIntegrations = lazyLoadedNodePerformanceMonitoringIntegrations;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/types.js
var require_types = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/types.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var WINDOW = utils.GLOBAL_OBJ;
    exports.WINDOW = WINDOW;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/backgroundtab.js
var require_backgroundtab = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/backgroundtab.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var utils = require_cjs();
    var types = require_types();
    function registerBackgroundTabDetection() {
      if (types.WINDOW && types.WINDOW.document) {
        types.WINDOW.document.addEventListener("visibilitychange", () => {
          const activeTransaction = core2.getActiveTransaction();
          if (types.WINDOW.document.hidden && activeTransaction) {
            const statusType = "cancelled";
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(
              `[Tracing] Transaction: ${statusType} -> since tab moved to the background, op: ${activeTransaction.op}`
            );
            if (!activeTransaction.status) {
              activeTransaction.setStatus(statusType);
            }
            activeTransaction.setTag("visibilitychange", "document.hidden");
            activeTransaction.finish();
          }
        });
      } else {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("[Tracing] Could not set up background tab detection due to lack of global document");
      }
    }
    exports.registerBackgroundTabDetection = registerBackgroundTabDetection;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/bindReporter.js
var require_bindReporter = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/bindReporter.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var bindReporter = (callback, metric, reportAllChanges) => {
      let prevValue;
      let delta;
      return (forceReport) => {
        if (metric.value >= 0) {
          if (forceReport || reportAllChanges) {
            delta = metric.value - (prevValue || 0);
            if (delta || prevValue === void 0) {
              prevValue = metric.value;
              metric.delta = delta;
              callback(metric);
            }
          }
        }
      };
    };
    exports.bindReporter = bindReporter;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/generateUniqueID.js
var require_generateUniqueID = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/generateUniqueID.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var generateUniqueID = () => {
      return `v3-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
    };
    exports.generateUniqueID = generateUniqueID;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/getNavigationEntry.js
var require_getNavigationEntry = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/getNavigationEntry.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var types = require_types();
    var getNavigationEntryFromPerformanceTiming = () => {
      const timing = types.WINDOW.performance.timing;
      const type = types.WINDOW.performance.navigation.type;
      const navigationEntry = {
        entryType: "navigation",
        startTime: 0,
        type: type == 2 ? "back_forward" : type === 1 ? "reload" : "navigate"
      };
      for (const key in timing) {
        if (key !== "navigationStart" && key !== "toJSON") {
          navigationEntry[key] = Math.max(timing[key] - timing.navigationStart, 0);
        }
      }
      return navigationEntry;
    };
    var getNavigationEntry = () => {
      if (types.WINDOW.__WEB_VITALS_POLYFILL__) {
        return types.WINDOW.performance && (performance.getEntriesByType && performance.getEntriesByType("navigation")[0] || getNavigationEntryFromPerformanceTiming());
      } else {
        return types.WINDOW.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
      }
    };
    exports.getNavigationEntry = getNavigationEntry;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/getActivationStart.js
var require_getActivationStart = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/getActivationStart.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var getNavigationEntry = require_getNavigationEntry();
    var getActivationStart = () => {
      const navEntry = getNavigationEntry.getNavigationEntry();
      return navEntry && navEntry.activationStart || 0;
    };
    exports.getActivationStart = getActivationStart;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/initMetric.js
var require_initMetric = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/initMetric.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var types = require_types();
    var generateUniqueID = require_generateUniqueID();
    var getActivationStart = require_getActivationStart();
    var getNavigationEntry = require_getNavigationEntry();
    var initMetric = (name, value) => {
      const navEntry = getNavigationEntry.getNavigationEntry();
      let navigationType = "navigate";
      if (navEntry) {
        if (types.WINDOW.document.prerendering || getActivationStart.getActivationStart() > 0) {
          navigationType = "prerender";
        } else {
          navigationType = navEntry.type.replace(/_/g, "-");
        }
      }
      return {
        name,
        value: typeof value === "undefined" ? -1 : value,
        rating: "good",
        delta: 0,
        entries: [],
        id: generateUniqueID.generateUniqueID(),
        navigationType
      };
    };
    exports.initMetric = initMetric;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/observe.js
var require_observe = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/observe.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var observe = (type, callback, opts) => {
      try {
        if (PerformanceObserver.supportedEntryTypes.includes(type)) {
          const po = new PerformanceObserver((list) => {
            callback(list.getEntries());
          });
          po.observe(
            Object.assign(
              {
                type,
                buffered: true
              },
              opts || {}
            )
          );
          return po;
        }
      } catch (e2) {
      }
      return;
    };
    exports.observe = observe;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/onHidden.js
var require_onHidden = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/onHidden.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var types = require_types();
    var onHidden = (cb, once) => {
      const onHiddenOrPageHide = (event) => {
        if (event.type === "pagehide" || types.WINDOW.document.visibilityState === "hidden") {
          cb(event);
          if (once) {
            removeEventListener("visibilitychange", onHiddenOrPageHide, true);
            removeEventListener("pagehide", onHiddenOrPageHide, true);
          }
        }
      };
      addEventListener("visibilitychange", onHiddenOrPageHide, true);
      addEventListener("pagehide", onHiddenOrPageHide, true);
    };
    exports.onHidden = onHidden;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/getCLS.js
var require_getCLS = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/getCLS.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var bindReporter = require_bindReporter();
    var initMetric = require_initMetric();
    var observe = require_observe();
    var onHidden = require_onHidden();
    var onCLS = (onReport) => {
      const metric = initMetric.initMetric("CLS", 0);
      let report;
      let sessionValue = 0;
      let sessionEntries = [];
      const handleEntries = (entries) => {
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
            if (sessionValue && sessionEntries.length !== 0 && entry.startTime - lastSessionEntry.startTime < 1e3 && entry.startTime - firstSessionEntry.startTime < 5e3) {
              sessionValue += entry.value;
              sessionEntries.push(entry);
            } else {
              sessionValue = entry.value;
              sessionEntries = [entry];
            }
            if (sessionValue > metric.value) {
              metric.value = sessionValue;
              metric.entries = sessionEntries;
              if (report) {
                report();
              }
            }
          }
        });
      };
      const po = observe.observe("layout-shift", handleEntries);
      if (po) {
        report = bindReporter.bindReporter(onReport, metric);
        const stopListening = () => {
          handleEntries(po.takeRecords());
          report(true);
        };
        onHidden.onHidden(stopListening);
        return stopListening;
      }
      return;
    };
    exports.onCLS = onCLS;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/getVisibilityWatcher.js
var require_getVisibilityWatcher = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/lib/getVisibilityWatcher.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var types = require_types();
    var onHidden = require_onHidden();
    var firstHiddenTime = -1;
    var initHiddenTime = () => {
      return types.WINDOW.document.visibilityState === "hidden" && !types.WINDOW.document.prerendering ? 0 : Infinity;
    };
    var trackChanges = () => {
      onHidden.onHidden(({ timeStamp }) => {
        firstHiddenTime = timeStamp;
      }, true);
    };
    var getVisibilityWatcher = () => {
      if (firstHiddenTime < 0) {
        firstHiddenTime = initHiddenTime();
        trackChanges();
      }
      return {
        get firstHiddenTime() {
          return firstHiddenTime;
        }
      };
    };
    exports.getVisibilityWatcher = getVisibilityWatcher;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/getFID.js
var require_getFID = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/getFID.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var bindReporter = require_bindReporter();
    var getVisibilityWatcher = require_getVisibilityWatcher();
    var initMetric = require_initMetric();
    var observe = require_observe();
    var onHidden = require_onHidden();
    var onFID = (onReport) => {
      const visibilityWatcher = getVisibilityWatcher.getVisibilityWatcher();
      const metric = initMetric.initMetric("FID");
      let report;
      const handleEntry = (entry) => {
        if (entry.startTime < visibilityWatcher.firstHiddenTime) {
          metric.value = entry.processingStart - entry.startTime;
          metric.entries.push(entry);
          report(true);
        }
      };
      const handleEntries = (entries) => {
        entries.forEach(handleEntry);
      };
      const po = observe.observe("first-input", handleEntries);
      report = bindReporter.bindReporter(onReport, metric);
      if (po) {
        onHidden.onHidden(() => {
          handleEntries(po.takeRecords());
          po.disconnect();
        }, true);
      }
    };
    exports.onFID = onFID;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/getLCP.js
var require_getLCP = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/web-vitals/getLCP.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var bindReporter = require_bindReporter();
    var getActivationStart = require_getActivationStart();
    var getVisibilityWatcher = require_getVisibilityWatcher();
    var initMetric = require_initMetric();
    var observe = require_observe();
    var onHidden = require_onHidden();
    var reportedMetricIDs = {};
    var onLCP = (onReport) => {
      const visibilityWatcher = getVisibilityWatcher.getVisibilityWatcher();
      const metric = initMetric.initMetric("LCP");
      let report;
      const handleEntries = (entries) => {
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const value = Math.max(lastEntry.startTime - getActivationStart.getActivationStart(), 0);
          if (value < visibilityWatcher.firstHiddenTime) {
            metric.value = value;
            metric.entries = [lastEntry];
            report();
          }
        }
      };
      const po = observe.observe("largest-contentful-paint", handleEntries);
      if (po) {
        report = bindReporter.bindReporter(onReport, metric);
        const stopListening = () => {
          if (!reportedMetricIDs[metric.id]) {
            handleEntries(po.takeRecords());
            po.disconnect();
            reportedMetricIDs[metric.id] = true;
            report(true);
          }
        };
        ["keydown", "click"].forEach((type) => {
          addEventListener(type, stopListening, { once: true, capture: true });
        });
        onHidden.onHidden(stopListening, true);
        return stopListening;
      }
      return;
    };
    exports.onLCP = onLCP;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/metrics/utils.js
var require_utils2 = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/metrics/utils.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function isMeasurementValue(value) {
      return typeof value === "number" && isFinite(value);
    }
    function _startChild(transaction, { startTimestamp, ...ctx }) {
      if (startTimestamp && transaction.startTimestamp > startTimestamp) {
        transaction.startTimestamp = startTimestamp;
      }
      return transaction.startChild({
        startTimestamp,
        ...ctx
      });
    }
    exports._startChild = _startChild;
    exports.isMeasurementValue = isMeasurementValue;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/metrics/index.js
var require_metrics = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/metrics/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var utils = require_cjs();
    var types = require_types();
    var getCLS = require_getCLS();
    var getFID = require_getFID();
    var getLCP = require_getLCP();
    var getVisibilityWatcher = require_getVisibilityWatcher();
    var observe = require_observe();
    var utils$1 = require_utils2();
    function msToSec(time) {
      return time / 1e3;
    }
    function getBrowserPerformanceAPI() {
      return types.WINDOW && types.WINDOW.addEventListener && types.WINDOW.performance;
    }
    var _performanceCursor = 0;
    var _measurements = {};
    var _lcpEntry;
    var _clsEntry;
    function startTrackingWebVitals() {
      const performance2 = getBrowserPerformanceAPI();
      if (performance2 && utils.browserPerformanceTimeOrigin) {
        if (performance2.mark) {
          types.WINDOW.performance.mark("sentry-tracing-init");
        }
        _trackFID();
        const clsCallback = _trackCLS();
        const lcpCallback = _trackLCP();
        return () => {
          if (clsCallback) {
            clsCallback();
          }
          if (lcpCallback) {
            lcpCallback();
          }
        };
      }
      return () => void 0;
    }
    function startTrackingLongTasks() {
      const entryHandler = (entries) => {
        for (const entry of entries) {
          const transaction = core2.getActiveTransaction();
          if (!transaction) {
            return;
          }
          const startTime = msToSec(utils.browserPerformanceTimeOrigin + entry.startTime);
          const duration = msToSec(entry.duration);
          transaction.startChild({
            description: "Main UI thread blocked",
            op: "ui.long-task",
            origin: "auto.ui.browser.metrics",
            startTimestamp: startTime,
            endTimestamp: startTime + duration
          });
        }
      };
      observe.observe("longtask", entryHandler);
    }
    function startTrackingInteractions() {
      const entryHandler = (entries) => {
        for (const entry of entries) {
          const transaction = core2.getActiveTransaction();
          if (!transaction) {
            return;
          }
          if (entry.name === "click") {
            const startTime = msToSec(utils.browserPerformanceTimeOrigin + entry.startTime);
            const duration = msToSec(entry.duration);
            transaction.startChild({
              description: utils.htmlTreeAsString(entry.target),
              op: `ui.interaction.${entry.name}`,
              origin: "auto.ui.browser.metrics",
              startTimestamp: startTime,
              endTimestamp: startTime + duration
            });
          }
        }
      };
      observe.observe("event", entryHandler, { durationThreshold: 0 });
    }
    function _trackCLS() {
      return getCLS.onCLS((metric) => {
        const entry = metric.entries.pop();
        if (!entry) {
          return;
        }
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("[Measurements] Adding CLS");
        _measurements["cls"] = { value: metric.value, unit: "" };
        _clsEntry = entry;
      });
    }
    function _trackLCP() {
      return getLCP.onLCP((metric) => {
        const entry = metric.entries.pop();
        if (!entry) {
          return;
        }
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("[Measurements] Adding LCP");
        _measurements["lcp"] = { value: metric.value, unit: "millisecond" };
        _lcpEntry = entry;
      });
    }
    function _trackFID() {
      getFID.onFID((metric) => {
        const entry = metric.entries.pop();
        if (!entry) {
          return;
        }
        const timeOrigin = msToSec(utils.browserPerformanceTimeOrigin);
        const startTime = msToSec(entry.startTime);
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("[Measurements] Adding FID");
        _measurements["fid"] = { value: metric.value, unit: "millisecond" };
        _measurements["mark.fid"] = { value: timeOrigin + startTime, unit: "second" };
      });
    }
    function addPerformanceEntries(transaction) {
      const performance2 = getBrowserPerformanceAPI();
      if (!performance2 || !types.WINDOW.performance.getEntries || !utils.browserPerformanceTimeOrigin) {
        return;
      }
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("[Tracing] Adding & adjusting spans using Performance API");
      const timeOrigin = msToSec(utils.browserPerformanceTimeOrigin);
      const performanceEntries = performance2.getEntries();
      let responseStartTimestamp;
      let requestStartTimestamp;
      performanceEntries.slice(_performanceCursor).forEach((entry) => {
        const startTime = msToSec(entry.startTime);
        const duration = msToSec(entry.duration);
        if (transaction.op === "navigation" && timeOrigin + startTime < transaction.startTimestamp) {
          return;
        }
        switch (entry.entryType) {
          case "navigation": {
            _addNavigationSpans(transaction, entry, timeOrigin);
            responseStartTimestamp = timeOrigin + msToSec(entry.responseStart);
            requestStartTimestamp = timeOrigin + msToSec(entry.requestStart);
            break;
          }
          case "mark":
          case "paint":
          case "measure": {
            _addMeasureSpans(transaction, entry, startTime, duration, timeOrigin);
            const firstHidden = getVisibilityWatcher.getVisibilityWatcher();
            const shouldRecord = entry.startTime < firstHidden.firstHiddenTime;
            if (entry.name === "first-paint" && shouldRecord) {
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("[Measurements] Adding FP");
              _measurements["fp"] = { value: entry.startTime, unit: "millisecond" };
            }
            if (entry.name === "first-contentful-paint" && shouldRecord) {
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("[Measurements] Adding FCP");
              _measurements["fcp"] = { value: entry.startTime, unit: "millisecond" };
            }
            break;
          }
          case "resource": {
            const resourceName = entry.name.replace(types.WINDOW.location.origin, "");
            _addResourceSpans(transaction, entry, resourceName, startTime, duration, timeOrigin);
            break;
          }
        }
      });
      _performanceCursor = Math.max(performanceEntries.length - 1, 0);
      _trackNavigator(transaction);
      if (transaction.op === "pageload") {
        if (typeof responseStartTimestamp === "number") {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("[Measurements] Adding TTFB");
          _measurements["ttfb"] = {
            value: (responseStartTimestamp - transaction.startTimestamp) * 1e3,
            unit: "millisecond"
          };
          if (typeof requestStartTimestamp === "number" && requestStartTimestamp <= responseStartTimestamp) {
            _measurements["ttfb.requestTime"] = {
              value: (responseStartTimestamp - requestStartTimestamp) * 1e3,
              unit: "millisecond"
            };
          }
        }
        ["fcp", "fp", "lcp"].forEach((name) => {
          if (!_measurements[name] || timeOrigin >= transaction.startTimestamp) {
            return;
          }
          const oldValue = _measurements[name].value;
          const measurementTimestamp = timeOrigin + msToSec(oldValue);
          const normalizedValue = Math.abs((measurementTimestamp - transaction.startTimestamp) * 1e3);
          const delta = normalizedValue - oldValue;
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(`[Measurements] Normalized ${name} from ${oldValue} to ${normalizedValue} (${delta})`);
          _measurements[name].value = normalizedValue;
        });
        const fidMark = _measurements["mark.fid"];
        if (fidMark && _measurements["fid"]) {
          utils$1._startChild(transaction, {
            description: "first input delay",
            endTimestamp: fidMark.value + msToSec(_measurements["fid"].value),
            op: "ui.action",
            origin: "auto.ui.browser.metrics",
            startTimestamp: fidMark.value
          });
          delete _measurements["mark.fid"];
        }
        if (!("fcp" in _measurements)) {
          delete _measurements.cls;
        }
        Object.keys(_measurements).forEach((measurementName) => {
          transaction.setMeasurement(
            measurementName,
            _measurements[measurementName].value,
            _measurements[measurementName].unit
          );
        });
        _tagMetricInfo(transaction);
      }
      _lcpEntry = void 0;
      _clsEntry = void 0;
      _measurements = {};
    }
    function _addMeasureSpans(transaction, entry, startTime, duration, timeOrigin) {
      const measureStartTimestamp = timeOrigin + startTime;
      const measureEndTimestamp = measureStartTimestamp + duration;
      utils$1._startChild(transaction, {
        description: entry.name,
        endTimestamp: measureEndTimestamp,
        op: entry.entryType,
        origin: "auto.resource.browser.metrics",
        startTimestamp: measureStartTimestamp
      });
      return measureStartTimestamp;
    }
    function _addNavigationSpans(transaction, entry, timeOrigin) {
      ["unloadEvent", "redirect", "domContentLoadedEvent", "loadEvent", "connect"].forEach((event) => {
        _addPerformanceNavigationTiming(transaction, entry, event, timeOrigin);
      });
      _addPerformanceNavigationTiming(transaction, entry, "secureConnection", timeOrigin, "TLS/SSL", "connectEnd");
      _addPerformanceNavigationTiming(transaction, entry, "fetch", timeOrigin, "cache", "domainLookupStart");
      _addPerformanceNavigationTiming(transaction, entry, "domainLookup", timeOrigin, "DNS");
      _addRequest(transaction, entry, timeOrigin);
    }
    function _addPerformanceNavigationTiming(transaction, entry, event, timeOrigin, description, eventEnd) {
      const end = eventEnd ? entry[eventEnd] : entry[`${event}End`];
      const start = entry[`${event}Start`];
      if (!start || !end) {
        return;
      }
      utils$1._startChild(transaction, {
        op: "browser",
        origin: "auto.browser.browser.metrics",
        description: description || event,
        startTimestamp: timeOrigin + msToSec(start),
        endTimestamp: timeOrigin + msToSec(end)
      });
    }
    function _addRequest(transaction, entry, timeOrigin) {
      utils$1._startChild(transaction, {
        op: "browser",
        origin: "auto.browser.browser.metrics",
        description: "request",
        startTimestamp: timeOrigin + msToSec(entry.requestStart),
        endTimestamp: timeOrigin + msToSec(entry.responseEnd)
      });
      utils$1._startChild(transaction, {
        op: "browser",
        origin: "auto.browser.browser.metrics",
        description: "response",
        startTimestamp: timeOrigin + msToSec(entry.responseStart),
        endTimestamp: timeOrigin + msToSec(entry.responseEnd)
      });
    }
    function _addResourceSpans(transaction, entry, resourceName, startTime, duration, timeOrigin) {
      if (entry.initiatorType === "xmlhttprequest" || entry.initiatorType === "fetch") {
        return;
      }
      const data = {};
      if ("transferSize" in entry) {
        data["http.response_transfer_size"] = entry.transferSize;
      }
      if ("encodedBodySize" in entry) {
        data["http.response_content_length"] = entry.encodedBodySize;
      }
      if ("decodedBodySize" in entry) {
        data["http.decoded_response_content_length"] = entry.decodedBodySize;
      }
      if ("renderBlockingStatus" in entry) {
        data["resource.render_blocking_status"] = entry.renderBlockingStatus;
      }
      const startTimestamp = timeOrigin + startTime;
      const endTimestamp = startTimestamp + duration;
      utils$1._startChild(transaction, {
        description: resourceName,
        endTimestamp,
        op: entry.initiatorType ? `resource.${entry.initiatorType}` : "resource.other",
        origin: "auto.resource.browser.metrics",
        startTimestamp,
        data
      });
    }
    function _trackNavigator(transaction) {
      const navigator2 = types.WINDOW.navigator;
      if (!navigator2) {
        return;
      }
      const connection = navigator2.connection;
      if (connection) {
        if (connection.effectiveType) {
          transaction.setTag("effectiveConnectionType", connection.effectiveType);
        }
        if (connection.type) {
          transaction.setTag("connectionType", connection.type);
        }
        if (utils$1.isMeasurementValue(connection.rtt)) {
          _measurements["connection.rtt"] = { value: connection.rtt, unit: "millisecond" };
        }
      }
      if (utils$1.isMeasurementValue(navigator2.deviceMemory)) {
        transaction.setTag("deviceMemory", `${navigator2.deviceMemory} GB`);
      }
      if (utils$1.isMeasurementValue(navigator2.hardwareConcurrency)) {
        transaction.setTag("hardwareConcurrency", String(navigator2.hardwareConcurrency));
      }
    }
    function _tagMetricInfo(transaction) {
      if (_lcpEntry) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("[Measurements] Adding LCP Data");
        if (_lcpEntry.element) {
          transaction.setTag("lcp.element", utils.htmlTreeAsString(_lcpEntry.element));
        }
        if (_lcpEntry.id) {
          transaction.setTag("lcp.id", _lcpEntry.id);
        }
        if (_lcpEntry.url) {
          transaction.setTag("lcp.url", _lcpEntry.url.trim().slice(0, 200));
        }
        transaction.setTag("lcp.size", _lcpEntry.size);
      }
      if (_clsEntry && _clsEntry.sources) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("[Measurements] Adding CLS Data");
        _clsEntry.sources.forEach(
          (source, index) => transaction.setTag(`cls.source.${index + 1}`, utils.htmlTreeAsString(source.node))
        );
      }
    }
    exports._addMeasureSpans = _addMeasureSpans;
    exports._addResourceSpans = _addResourceSpans;
    exports.addPerformanceEntries = addPerformanceEntries;
    exports.startTrackingInteractions = startTrackingInteractions;
    exports.startTrackingLongTasks = startTrackingLongTasks;
    exports.startTrackingWebVitals = startTrackingWebVitals;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/request.js
var require_request = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/request.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var utils = require_cjs();
    var DEFAULT_TRACE_PROPAGATION_TARGETS = ["localhost", /^\/(?!\/)/];
    var defaultRequestInstrumentationOptions = {
      traceFetch: true,
      traceXHR: true,
      enableHTTPTimings: true,
      tracingOrigins: DEFAULT_TRACE_PROPAGATION_TARGETS,
      tracePropagationTargets: DEFAULT_TRACE_PROPAGATION_TARGETS
    };
    function instrumentOutgoingRequests(_options) {
      const {
        traceFetch,
        traceXHR,
        tracePropagationTargets,
        tracingOrigins,
        shouldCreateSpanForRequest,
        enableHTTPTimings
      } = {
        traceFetch: defaultRequestInstrumentationOptions.traceFetch,
        traceXHR: defaultRequestInstrumentationOptions.traceXHR,
        ..._options
      };
      const shouldCreateSpan = typeof shouldCreateSpanForRequest === "function" ? shouldCreateSpanForRequest : (_3) => true;
      const shouldAttachHeadersWithTargets = (url2) => shouldAttachHeaders(url2, tracePropagationTargets || tracingOrigins);
      const spans = {};
      if (traceFetch) {
        utils.addInstrumentationHandler("fetch", (handlerData) => {
          const createdSpan = fetchCallback(handlerData, shouldCreateSpan, shouldAttachHeadersWithTargets, spans);
          if (enableHTTPTimings && createdSpan) {
            addHTTPTimings(createdSpan);
          }
        });
      }
      if (traceXHR) {
        utils.addInstrumentationHandler("xhr", (handlerData) => {
          const createdSpan = xhrCallback(handlerData, shouldCreateSpan, shouldAttachHeadersWithTargets, spans);
          if (enableHTTPTimings && createdSpan) {
            addHTTPTimings(createdSpan);
          }
        });
      }
    }
    function isPerformanceResourceTiming(entry) {
      return entry.entryType === "resource" && "initiatorType" in entry && typeof entry.nextHopProtocol === "string" && (entry.initiatorType === "fetch" || entry.initiatorType === "xmlhttprequest");
    }
    function addHTTPTimings(span) {
      const url2 = span.data.url;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (isPerformanceResourceTiming(entry) && entry.name.endsWith(url2)) {
            const spanData = resourceTimingEntryToSpanData(entry);
            spanData.forEach((data) => span.setData(...data));
            observer.disconnect();
          }
        });
      });
      observer.observe({
        entryTypes: ["resource"]
      });
    }
    function extractNetworkProtocol(nextHopProtocol) {
      let name = "unknown";
      let version = "unknown";
      let _name = "";
      for (const char of nextHopProtocol) {
        if (char === "/") {
          [name, version] = nextHopProtocol.split("/");
          break;
        }
        if (!isNaN(Number(char))) {
          name = _name === "h" ? "http" : _name;
          version = nextHopProtocol.split(_name)[1];
          break;
        }
        _name += char;
      }
      if (_name === nextHopProtocol) {
        name = _name;
      }
      return { name, version };
    }
    function getAbsoluteTime(time = 0) {
      return ((utils.browserPerformanceTimeOrigin || performance.timeOrigin) + time) / 1e3;
    }
    function resourceTimingEntryToSpanData(resourceTiming) {
      const { name, version } = extractNetworkProtocol(resourceTiming.nextHopProtocol);
      const timingSpanData = [];
      timingSpanData.push(["network.protocol.version", version], ["network.protocol.name", name]);
      if (!utils.browserPerformanceTimeOrigin) {
        return timingSpanData;
      }
      return [
        ...timingSpanData,
        ["http.request.redirect_start", getAbsoluteTime(resourceTiming.redirectStart)],
        ["http.request.fetch_start", getAbsoluteTime(resourceTiming.fetchStart)],
        ["http.request.domain_lookup_start", getAbsoluteTime(resourceTiming.domainLookupStart)],
        ["http.request.domain_lookup_end", getAbsoluteTime(resourceTiming.domainLookupEnd)],
        ["http.request.connect_start", getAbsoluteTime(resourceTiming.connectStart)],
        ["http.request.secure_connection_start", getAbsoluteTime(resourceTiming.secureConnectionStart)],
        ["http.request.connection_end", getAbsoluteTime(resourceTiming.connectEnd)],
        ["http.request.request_start", getAbsoluteTime(resourceTiming.requestStart)],
        ["http.request.response_start", getAbsoluteTime(resourceTiming.responseStart)],
        ["http.request.response_end", getAbsoluteTime(resourceTiming.responseEnd)]
      ];
    }
    function shouldAttachHeaders(url2, tracePropagationTargets) {
      return utils.stringMatchesSomePattern(url2, tracePropagationTargets || DEFAULT_TRACE_PROPAGATION_TARGETS);
    }
    function fetchCallback(handlerData, shouldCreateSpan, shouldAttachHeaders2, spans) {
      if (!core2.hasTracingEnabled() || !handlerData.fetchData) {
        return void 0;
      }
      const shouldCreateSpanResult = shouldCreateSpan(handlerData.fetchData.url);
      if (handlerData.endTimestamp && shouldCreateSpanResult) {
        const spanId = handlerData.fetchData.__span;
        if (!spanId)
          return;
        const span2 = spans[spanId];
        if (span2) {
          if (handlerData.response) {
            span2.setHttpStatus(handlerData.response.status);
            const contentLength = handlerData.response && handlerData.response.headers && handlerData.response.headers.get("content-length");
            const contentLengthNum = parseInt(contentLength);
            if (contentLengthNum > 0) {
              span2.setData("http.response_content_length", contentLengthNum);
            }
          } else if (handlerData.error) {
            span2.setStatus("internal_error");
          }
          span2.finish();
          delete spans[spanId];
        }
        return void 0;
      }
      const hub = core2.getCurrentHub();
      const scope = hub.getScope();
      const client = hub.getClient();
      const parentSpan = scope.getSpan();
      const { method, url: url2 } = handlerData.fetchData;
      const span = shouldCreateSpanResult && parentSpan ? parentSpan.startChild({
        data: {
          url: url2,
          type: "fetch",
          "http.method": method
        },
        description: `${method} ${url2}`,
        op: "http.client",
        origin: "auto.http.browser"
      }) : void 0;
      if (span) {
        handlerData.fetchData.__span = span.spanId;
        spans[span.spanId] = span;
      }
      if (shouldAttachHeaders2(handlerData.fetchData.url) && client) {
        const request = handlerData.args[0];
        handlerData.args[1] = handlerData.args[1] || {};
        const options = handlerData.args[1];
        options.headers = addTracingHeadersToFetchRequest(request, client, scope, options, span);
      }
      return span;
    }
    function addTracingHeadersToFetchRequest(request, client, scope, options, requestSpan) {
      const span = requestSpan || scope.getSpan();
      const transaction = span && span.transaction;
      const { traceId, sampled, dsc } = scope.getPropagationContext();
      const sentryTraceHeader = span ? span.toTraceparent() : utils.generateSentryTraceHeader(traceId, void 0, sampled);
      const dynamicSamplingContext = transaction ? transaction.getDynamicSamplingContext() : dsc ? dsc : core2.getDynamicSamplingContextFromClient(traceId, client, scope);
      const sentryBaggageHeader = utils.dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext);
      const headers = typeof Request !== "undefined" && utils.isInstanceOf(request, Request) ? request.headers : options.headers;
      if (!headers) {
        return { "sentry-trace": sentryTraceHeader, baggage: sentryBaggageHeader };
      } else if (typeof Headers !== "undefined" && utils.isInstanceOf(headers, Headers)) {
        const newHeaders = new Headers(headers);
        newHeaders.append("sentry-trace", sentryTraceHeader);
        if (sentryBaggageHeader) {
          newHeaders.append(utils.BAGGAGE_HEADER_NAME, sentryBaggageHeader);
        }
        return newHeaders;
      } else if (Array.isArray(headers)) {
        const newHeaders = [...headers, ["sentry-trace", sentryTraceHeader]];
        if (sentryBaggageHeader) {
          newHeaders.push([utils.BAGGAGE_HEADER_NAME, sentryBaggageHeader]);
        }
        return newHeaders;
      } else {
        const existingBaggageHeader = "baggage" in headers ? headers.baggage : void 0;
        const newBaggageHeaders = [];
        if (Array.isArray(existingBaggageHeader)) {
          newBaggageHeaders.push(...existingBaggageHeader);
        } else if (existingBaggageHeader) {
          newBaggageHeaders.push(existingBaggageHeader);
        }
        if (sentryBaggageHeader) {
          newBaggageHeaders.push(sentryBaggageHeader);
        }
        return {
          ...headers,
          "sentry-trace": sentryTraceHeader,
          baggage: newBaggageHeaders.length > 0 ? newBaggageHeaders.join(",") : void 0
        };
      }
    }
    function xhrCallback(handlerData, shouldCreateSpan, shouldAttachHeaders2, spans) {
      const xhr = handlerData.xhr;
      const sentryXhrData = xhr && xhr[utils.SENTRY_XHR_DATA_KEY];
      if (!core2.hasTracingEnabled() || xhr && xhr.__sentry_own_request__ || !xhr || !sentryXhrData) {
        return void 0;
      }
      const shouldCreateSpanResult = shouldCreateSpan(sentryXhrData.url);
      if (handlerData.endTimestamp && shouldCreateSpanResult) {
        const spanId = xhr.__sentry_xhr_span_id__;
        if (!spanId)
          return;
        const span2 = spans[spanId];
        if (span2) {
          span2.setHttpStatus(sentryXhrData.status_code);
          span2.finish();
          delete spans[spanId];
        }
        return void 0;
      }
      const hub = core2.getCurrentHub();
      const scope = hub.getScope();
      const parentSpan = scope.getSpan();
      const span = shouldCreateSpanResult && parentSpan ? parentSpan.startChild({
        data: {
          ...sentryXhrData.data,
          type: "xhr",
          "http.method": sentryXhrData.method,
          url: sentryXhrData.url
        },
        description: `${sentryXhrData.method} ${sentryXhrData.url}`,
        op: "http.client",
        origin: "auto.http.browser"
      }) : void 0;
      if (span) {
        xhr.__sentry_xhr_span_id__ = span.spanId;
        spans[xhr.__sentry_xhr_span_id__] = span;
      }
      if (xhr.setRequestHeader && shouldAttachHeaders2(sentryXhrData.url)) {
        if (span) {
          const transaction = span && span.transaction;
          const dynamicSamplingContext = transaction && transaction.getDynamicSamplingContext();
          const sentryBaggageHeader = utils.dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext);
          setHeaderOnXhr(xhr, span.toTraceparent(), sentryBaggageHeader);
        } else {
          const client = hub.getClient();
          const { traceId, sampled, dsc } = scope.getPropagationContext();
          const sentryTraceHeader = utils.generateSentryTraceHeader(traceId, void 0, sampled);
          const dynamicSamplingContext = dsc || (client ? core2.getDynamicSamplingContextFromClient(traceId, client, scope) : void 0);
          const sentryBaggageHeader = utils.dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext);
          setHeaderOnXhr(xhr, sentryTraceHeader, sentryBaggageHeader);
        }
      }
      return span;
    }
    function setHeaderOnXhr(xhr, sentryTraceHeader, sentryBaggageHeader) {
      try {
        xhr.setRequestHeader("sentry-trace", sentryTraceHeader);
        if (sentryBaggageHeader) {
          xhr.setRequestHeader(utils.BAGGAGE_HEADER_NAME, sentryBaggageHeader);
        }
      } catch (_3) {
      }
    }
    exports.DEFAULT_TRACE_PROPAGATION_TARGETS = DEFAULT_TRACE_PROPAGATION_TARGETS;
    exports.addTracingHeadersToFetchRequest = addTracingHeadersToFetchRequest;
    exports.defaultRequestInstrumentationOptions = defaultRequestInstrumentationOptions;
    exports.extractNetworkProtocol = extractNetworkProtocol;
    exports.fetchCallback = fetchCallback;
    exports.instrumentOutgoingRequests = instrumentOutgoingRequests;
    exports.shouldAttachHeaders = shouldAttachHeaders;
    exports.xhrCallback = xhrCallback;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/router.js
var require_router = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/router.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var types = require_types();
    function instrumentRoutingWithDefaults(customStartTransaction, startTransactionOnPageLoad = true, startTransactionOnLocationChange = true) {
      if (!types.WINDOW || !types.WINDOW.location) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("Could not initialize routing instrumentation due to invalid location");
        return;
      }
      let startingUrl = types.WINDOW.location.href;
      let activeTransaction;
      if (startTransactionOnPageLoad) {
        activeTransaction = customStartTransaction({
          name: types.WINDOW.location.pathname,
          startTimestamp: utils.browserPerformanceTimeOrigin ? utils.browserPerformanceTimeOrigin / 1e3 : void 0,
          op: "pageload",
          origin: "auto.pageload.browser",
          metadata: { source: "url" }
        });
      }
      if (startTransactionOnLocationChange) {
        utils.addInstrumentationHandler("history", ({ to, from }) => {
          if (from === void 0 && startingUrl && startingUrl.indexOf(to) !== -1) {
            startingUrl = void 0;
            return;
          }
          if (from !== to) {
            startingUrl = void 0;
            if (activeTransaction) {
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(`[Tracing] Finishing current transaction with op: ${activeTransaction.op}`);
              activeTransaction.finish();
            }
            activeTransaction = customStartTransaction({
              name: types.WINDOW.location.pathname,
              op: "navigation",
              origin: "auto.navigation.browser",
              metadata: { source: "url" }
            });
          }
        });
      }
    }
    exports.instrumentRoutingWithDefaults = instrumentRoutingWithDefaults;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/browsertracing.js
var require_browsertracing = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/browser/browsertracing.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var utils = require_cjs();
    var backgroundtab = require_backgroundtab();
    var index = require_metrics();
    var request = require_request();
    var router = require_router();
    var types = require_types();
    var BROWSER_TRACING_INTEGRATION_ID = "BrowserTracing";
    var DEFAULT_BROWSER_TRACING_OPTIONS = {
      ...core2.TRACING_DEFAULTS,
      markBackgroundTransactions: true,
      routingInstrumentation: router.instrumentRoutingWithDefaults,
      startTransactionOnLocationChange: true,
      startTransactionOnPageLoad: true,
      enableLongTask: true,
      _experiments: {},
      ...request.defaultRequestInstrumentationOptions
    };
    var BrowserTracing = class {
      constructor(_options) {
        this.name = BROWSER_TRACING_INTEGRATION_ID;
        this._hasSetTracePropagationTargets = false;
        core2.addTracingExtensions();
        if (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) {
          this._hasSetTracePropagationTargets = !!(_options && (_options.tracePropagationTargets || _options.tracingOrigins));
        }
        this.options = {
          ...DEFAULT_BROWSER_TRACING_OPTIONS,
          ..._options
        };
        if (this.options._experiments.enableLongTask !== void 0) {
          this.options.enableLongTask = this.options._experiments.enableLongTask;
        }
        if (_options && !_options.tracePropagationTargets && _options.tracingOrigins) {
          this.options.tracePropagationTargets = _options.tracingOrigins;
        }
        this._collectWebVitals = index.startTrackingWebVitals();
        if (this.options.enableLongTask) {
          index.startTrackingLongTasks();
        }
        if (this.options._experiments.enableInteractions) {
          index.startTrackingInteractions();
        }
      }
      setupOnce(_3, getCurrentHub) {
        this._getCurrentHub = getCurrentHub;
        const hub = getCurrentHub();
        const client = hub.getClient();
        const clientOptions = client && client.getOptions();
        const {
          routingInstrumentation: instrumentRouting,
          startTransactionOnLocationChange,
          startTransactionOnPageLoad,
          markBackgroundTransactions,
          traceFetch,
          traceXHR,
          shouldCreateSpanForRequest,
          enableHTTPTimings,
          _experiments
        } = this.options;
        const clientOptionsTracePropagationTargets = clientOptions && clientOptions.tracePropagationTargets;
        const tracePropagationTargets = clientOptionsTracePropagationTargets || this.options.tracePropagationTargets;
        if ((typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && this._hasSetTracePropagationTargets && clientOptionsTracePropagationTargets) {
          utils.logger.warn(
            "[Tracing] The `tracePropagationTargets` option was set in the BrowserTracing integration and top level `Sentry.init`. The top level `Sentry.init` value is being used."
          );
        }
        instrumentRouting(
          (context) => {
            const transaction = this._createRouteTransaction(context);
            this.options._experiments.onStartRouteTransaction && this.options._experiments.onStartRouteTransaction(transaction, context, getCurrentHub);
            return transaction;
          },
          startTransactionOnPageLoad,
          startTransactionOnLocationChange
        );
        if (markBackgroundTransactions) {
          backgroundtab.registerBackgroundTabDetection();
        }
        if (_experiments.enableInteractions) {
          this._registerInteractionListener();
        }
        request.instrumentOutgoingRequests({
          traceFetch,
          traceXHR,
          tracePropagationTargets,
          shouldCreateSpanForRequest,
          enableHTTPTimings
        });
      }
      _createRouteTransaction(context) {
        if (!this._getCurrentHub) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn(`[Tracing] Did not create ${context.op} transaction because _getCurrentHub is invalid.`);
          return void 0;
        }
        const hub = this._getCurrentHub();
        const { beforeNavigate, idleTimeout, finalTimeout, heartbeatInterval } = this.options;
        const isPageloadTransaction = context.op === "pageload";
        const sentryTrace = isPageloadTransaction ? getMetaContent("sentry-trace") : "";
        const baggage = isPageloadTransaction ? getMetaContent("baggage") : "";
        const { traceparentData, dynamicSamplingContext, propagationContext } = utils.tracingContextFromHeaders(
          sentryTrace,
          baggage
        );
        const expandedContext = {
          ...context,
          ...traceparentData,
          metadata: {
            ...context.metadata,
            dynamicSamplingContext: traceparentData && !dynamicSamplingContext ? {} : dynamicSamplingContext
          },
          trimEnd: true
        };
        const modifiedContext = typeof beforeNavigate === "function" ? beforeNavigate(expandedContext) : expandedContext;
        const finalContext = modifiedContext === void 0 ? { ...expandedContext, sampled: false } : modifiedContext;
        finalContext.metadata = finalContext.name !== expandedContext.name ? { ...finalContext.metadata, source: "custom" } : finalContext.metadata;
        this._latestRouteName = finalContext.name;
        this._latestRouteSource = finalContext.metadata && finalContext.metadata.source;
        if (finalContext.sampled === false) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(`[Tracing] Will not send ${finalContext.op} transaction because of beforeNavigate.`);
        }
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(`[Tracing] Starting ${finalContext.op} transaction on scope`);
        const { location } = types.WINDOW;
        const idleTransaction = core2.startIdleTransaction(
          hub,
          finalContext,
          idleTimeout,
          finalTimeout,
          true,
          { location },
          heartbeatInterval
        );
        const scope = hub.getScope();
        if (isPageloadTransaction && traceparentData) {
          scope.setPropagationContext(propagationContext);
        } else {
          scope.setPropagationContext({
            traceId: idleTransaction.traceId,
            spanId: idleTransaction.spanId,
            parentSpanId: idleTransaction.parentSpanId,
            sampled: idleTransaction.sampled
          });
        }
        idleTransaction.registerBeforeFinishCallback((transaction) => {
          this._collectWebVitals();
          index.addPerformanceEntries(transaction);
        });
        return idleTransaction;
      }
      _registerInteractionListener() {
        let inflightInteractionTransaction;
        const registerInteractionTransaction = () => {
          const { idleTimeout, finalTimeout, heartbeatInterval } = this.options;
          const op = "ui.action.click";
          const currentTransaction = core2.getActiveTransaction();
          if (currentTransaction && currentTransaction.op && ["navigation", "pageload"].includes(currentTransaction.op)) {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn(
              `[Tracing] Did not create ${op} transaction because a pageload or navigation transaction is in progress.`
            );
            return void 0;
          }
          if (inflightInteractionTransaction) {
            inflightInteractionTransaction.setFinishReason("interactionInterrupted");
            inflightInteractionTransaction.finish();
            inflightInteractionTransaction = void 0;
          }
          if (!this._getCurrentHub) {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn(`[Tracing] Did not create ${op} transaction because _getCurrentHub is invalid.`);
            return void 0;
          }
          if (!this._latestRouteName) {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn(`[Tracing] Did not create ${op} transaction because _latestRouteName is missing.`);
            return void 0;
          }
          const hub = this._getCurrentHub();
          const { location } = types.WINDOW;
          const context = {
            name: this._latestRouteName,
            op,
            trimEnd: true,
            metadata: {
              source: this._latestRouteSource || "url"
            }
          };
          inflightInteractionTransaction = core2.startIdleTransaction(
            hub,
            context,
            idleTimeout,
            finalTimeout,
            true,
            { location },
            heartbeatInterval
          );
        };
        ["click"].forEach((type) => {
          addEventListener(type, registerInteractionTransaction, { once: false, capture: true });
        });
      }
    };
    function getMetaContent(metaName) {
      const metaTag = utils.getDomElement(`meta[name=${metaName}]`);
      return metaTag ? metaTag.getAttribute("content") : void 0;
    }
    exports.BROWSER_TRACING_INTEGRATION_ID = BROWSER_TRACING_INTEGRATION_ID;
    exports.BrowserTracing = BrowserTracing;
    exports.getMetaContent = getMetaContent;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/extensions.js
var require_extensions = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/extensions.js"(exports, module2) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var utils = require_cjs();
    function _autoloadDatabaseIntegrations() {
      const carrier = core2.getMainCarrier();
      if (!carrier.__SENTRY__) {
        return;
      }
      const packageToIntegrationMapping = {
        mongodb() {
          const integration = utils.dynamicRequire(module2, "./node/integrations/mongo");
          return new integration.Mongo();
        },
        mongoose() {
          const integration = utils.dynamicRequire(module2, "./node/integrations/mongo");
          return new integration.Mongo();
        },
        mysql() {
          const integration = utils.dynamicRequire(module2, "./node/integrations/mysql");
          return new integration.Mysql();
        },
        pg() {
          const integration = utils.dynamicRequire(module2, "./node/integrations/postgres");
          return new integration.Postgres();
        }
      };
      const mappedPackages = Object.keys(packageToIntegrationMapping).filter((moduleName) => !!utils.loadModule(moduleName)).map((pkg) => {
        try {
          return packageToIntegrationMapping[pkg]();
        } catch (e2) {
          return void 0;
        }
      }).filter((p2) => p2);
      if (mappedPackages.length > 0) {
        carrier.__SENTRY__.integrations = [...carrier.__SENTRY__.integrations || [], ...mappedPackages];
      }
    }
    function addExtensionMethods() {
      core2.addTracingExtensions();
      if (utils.isNodeEnv()) {
        _autoloadDatabaseIntegrations();
      }
    }
    exports.addExtensionMethods = addExtensionMethods;
  }
});

// ../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/index.js
var require_cjs3 = __commonJS({
  "../../node_modules/.pnpm/@sentry-internal+tracing@7.69.0/node_modules/@sentry-internal/tracing/cjs/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var utils = require_cjs();
    var express = require_express();
    var postgres = require_postgres();
    var mysql = require_mysql();
    var mongo = require_mongo();
    var prisma = require_prisma();
    var graphql = require_graphql();
    var apollo = require_apollo();
    var lazy = require_lazy();
    var browsertracing = require_browsertracing();
    var request = require_request();
    var extensions = require_extensions();
    exports.IdleTransaction = core2.IdleTransaction;
    exports.Span = core2.Span;
    exports.SpanStatus = core2.SpanStatus;
    exports.Transaction = core2.Transaction;
    exports.extractTraceparentData = core2.extractTraceparentData;
    exports.getActiveTransaction = core2.getActiveTransaction;
    exports.hasTracingEnabled = core2.hasTracingEnabled;
    exports.spanStatusfromHttpCode = core2.spanStatusfromHttpCode;
    exports.startIdleTransaction = core2.startIdleTransaction;
    exports.TRACEPARENT_REGEXP = utils.TRACEPARENT_REGEXP;
    exports.stripUrlQueryAndFragment = utils.stripUrlQueryAndFragment;
    exports.Express = express.Express;
    exports.Postgres = postgres.Postgres;
    exports.Mysql = mysql.Mysql;
    exports.Mongo = mongo.Mongo;
    exports.Prisma = prisma.Prisma;
    exports.GraphQL = graphql.GraphQL;
    exports.Apollo = apollo.Apollo;
    exports.lazyLoadedNodePerformanceMonitoringIntegrations = lazy.lazyLoadedNodePerformanceMonitoringIntegrations;
    exports.BROWSER_TRACING_INTEGRATION_ID = browsertracing.BROWSER_TRACING_INTEGRATION_ID;
    exports.BrowserTracing = browsertracing.BrowserTracing;
    exports.addTracingHeadersToFetchRequest = request.addTracingHeadersToFetchRequest;
    exports.defaultRequestInstrumentationOptions = request.defaultRequestInstrumentationOptions;
    exports.instrumentOutgoingRequests = request.instrumentOutgoingRequests;
    exports.addExtensionMethods = extensions.addExtensionMethods;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/tracing/index.js
var require_tracing2 = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/tracing/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var tracing = require_cjs3();
    var utils = require_cjs();
    function autoDiscoverNodePerformanceMonitoringIntegrations() {
      const loadedIntegrations = tracing.lazyLoadedNodePerformanceMonitoringIntegrations.map((tryLoad) => {
        try {
          return tryLoad();
        } catch (_3) {
          return void 0;
        }
      }).filter((integration) => !!integration);
      if (loadedIntegrations.length === 0) {
        utils.logger.warn("Performance monitoring integrations could not be automatically loaded.");
      }
      return loadedIntegrations.filter((integration) => !!integration.loadDependency());
    }
    exports.autoDiscoverNodePerformanceMonitoringIntegrations = autoDiscoverNodePerformanceMonitoringIntegrations;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/eventbuilder.js
var require_eventbuilder2 = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/eventbuilder.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var utils = require_cjs();
    function parseStackFrames(stackParser, error) {
      return stackParser(error.stack || "", 1);
    }
    function exceptionFromError(stackParser, error) {
      const exception = {
        type: error.name || error.constructor.name,
        value: error.message
      };
      const frames = parseStackFrames(stackParser, error);
      if (frames.length) {
        exception.stacktrace = { frames };
      }
      return exception;
    }
    function eventFromUnknownInput(stackParser, exception, hint) {
      let ex = exception;
      const providedMechanism = hint && hint.data && hint.data.mechanism;
      const mechanism = providedMechanism || {
        handled: true,
        type: "generic"
      };
      if (!utils.isError(exception)) {
        if (utils.isPlainObject(exception)) {
          const message = `Non-Error exception captured with keys: ${utils.extractExceptionKeysForMessage(exception)}`;
          const hub = core2.getCurrentHub();
          const client = hub.getClient();
          const normalizeDepth = client && client.getOptions().normalizeDepth;
          hub.configureScope((scope) => {
            scope.setExtra("__serialized__", utils.normalizeToSize(exception, normalizeDepth));
          });
          ex = hint && hint.syntheticException || new Error(message);
          ex.message = message;
        } else {
          ex = hint && hint.syntheticException || new Error(exception);
          ex.message = exception;
        }
        mechanism.synthetic = true;
      }
      const event = {
        exception: {
          values: [exceptionFromError(stackParser, ex)]
        }
      };
      utils.addExceptionTypeValue(event, void 0, void 0);
      utils.addExceptionMechanism(event, mechanism);
      return {
        ...event,
        event_id: hint && hint.event_id
      };
    }
    function eventFromMessage(stackParser, message, level = "info", hint, attachStacktrace) {
      const event = {
        event_id: hint && hint.event_id,
        level,
        message
      };
      if (attachStacktrace && hint && hint.syntheticException) {
        const frames = parseStackFrames(stackParser, hint.syntheticException);
        if (frames.length) {
          event.exception = {
            values: [
              {
                value: message,
                stacktrace: { frames }
              }
            ]
          };
        }
      }
      return event;
    }
    exports.eventFromMessage = eventFromMessage;
    exports.eventFromUnknownInput = eventFromUnknownInput;
    exports.exceptionFromError = exceptionFromError;
    exports.parseStackFrames = parseStackFrames;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/client.js
var require_client = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/client.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var utils = require_cjs();
    var os3 = require("os");
    var util2 = require("util");
    var eventbuilder = require_eventbuilder2();
    var NodeClient2 = class extends core2.BaseClient {
      constructor(options) {
        options._metadata = options._metadata || {};
        options._metadata.sdk = options._metadata.sdk || {
          name: "sentry.javascript.node",
          packages: [
            {
              name: "npm:@sentry/node",
              version: core2.SDK_VERSION
            }
          ],
          version: core2.SDK_VERSION
        };
        options.transportOptions = {
          textEncoder: new util2.TextEncoder(),
          ...options.transportOptions
        };
        core2.addTracingExtensions();
        super(options);
      }
      captureException(exception, hint, scope) {
        if (this._options.autoSessionTracking && this._sessionFlusher && scope) {
          const requestSession = scope.getRequestSession();
          if (requestSession && requestSession.status === "ok") {
            requestSession.status = "errored";
          }
        }
        return super.captureException(exception, hint, scope);
      }
      captureEvent(event, hint, scope) {
        if (this._options.autoSessionTracking && this._sessionFlusher && scope) {
          const eventType = event.type || "exception";
          const isException = eventType === "exception" && event.exception && event.exception.values && event.exception.values.length > 0;
          if (isException) {
            const requestSession = scope.getRequestSession();
            if (requestSession && requestSession.status === "ok") {
              requestSession.status = "errored";
            }
          }
        }
        return super.captureEvent(event, hint, scope);
      }
      close(timeout) {
        _optionalChain([this, "access", (_3) => _3._sessionFlusher, "optionalAccess", (_22) => _22.close, "call", (_3) => _3()]);
        return super.close(timeout);
      }
      initSessionFlusher() {
        const { release, environment } = this._options;
        if (!release) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("Cannot initialise an instance of SessionFlusher if no release is provided!");
        } else {
          this._sessionFlusher = new core2.SessionFlusher(this, {
            release,
            environment
          });
        }
      }
      eventFromException(exception, hint) {
        return utils.resolvedSyncPromise(eventbuilder.eventFromUnknownInput(this._options.stackParser, exception, hint));
      }
      eventFromMessage(message, level = "info", hint) {
        return utils.resolvedSyncPromise(
          eventbuilder.eventFromMessage(this._options.stackParser, message, level, hint, this._options.attachStacktrace)
        );
      }
      captureCheckIn(checkIn, monitorConfig, scope) {
        const id = checkIn.status !== "in_progress" && checkIn.checkInId ? checkIn.checkInId : utils.uuid4();
        if (!this._isEnabled()) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("SDK not enabled, will not capture checkin.");
          return id;
        }
        const options = this.getOptions();
        const { release, environment, tunnel } = options;
        const serializedCheckIn = {
          check_in_id: id,
          monitor_slug: checkIn.monitorSlug,
          status: checkIn.status,
          release,
          environment
        };
        if (checkIn.status !== "in_progress") {
          serializedCheckIn.duration = checkIn.duration;
        }
        if (monitorConfig) {
          serializedCheckIn.monitor_config = {
            schedule: monitorConfig.schedule,
            checkin_margin: monitorConfig.checkinMargin,
            max_runtime: monitorConfig.maxRuntime,
            timezone: monitorConfig.timezone
          };
        }
        const [dynamicSamplingContext, traceContext] = this._getTraceInfoFromScope(scope);
        if (traceContext) {
          serializedCheckIn.contexts = {
            trace: traceContext
          };
        }
        const envelope = core2.createCheckInEnvelope(
          serializedCheckIn,
          dynamicSamplingContext,
          this.getSdkMetadata(),
          tunnel,
          this.getDsn()
        );
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.info("Sending checkin:", checkIn.monitorSlug, checkIn.status);
        void this._sendEnvelope(envelope);
        return id;
      }
      _prepareEvent(event, hint, scope) {
        event.platform = event.platform || "node";
        event.contexts = {
          ...event.contexts,
          runtime: _optionalChain([event, "access", (_4) => _4.contexts, "optionalAccess", (_5) => _5.runtime]) || {
            name: "node",
            version: global.process.version
          }
        };
        event.server_name = event.server_name || this.getOptions().serverName || global.process.env.SENTRY_NAME || os3.hostname();
        return super._prepareEvent(event, hint, scope);
      }
      _captureRequestSession() {
        if (!this._sessionFlusher) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("Discarded request mode session because autoSessionTracking option was disabled");
        } else {
          this._sessionFlusher.incrementSessionStatusCount();
        }
      }
      _getTraceInfoFromScope(scope) {
        if (!scope) {
          return [void 0, void 0];
        }
        const span = scope.getSpan();
        if (span) {
          return [_optionalChain([span, "optionalAccess", (_6) => _6.transaction, "optionalAccess", (_7) => _7.getDynamicSamplingContext, "call", (_8) => _8()]), _optionalChain([span, "optionalAccess", (_9) => _9.getTraceContext, "call", (_10) => _10()])];
        }
        const { traceId, spanId, parentSpanId, dsc } = scope.getPropagationContext();
        const traceContext = {
          trace_id: traceId,
          span_id: spanId,
          parent_span_id: parentSpanId
        };
        if (dsc) {
          return [dsc, traceContext];
        }
        return [core2.getDynamicSamplingContextFromClient(traceId, this, scope), traceContext];
      }
    };
    exports.NodeClient = NodeClient2;
  }
});

// ../../node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js
var require_ms = __commonJS({
  "../../node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js"(exports, module2) {
    var s = 1e3;
    var m2 = s * 60;
    var h3 = m2 * 60;
    var d3 = h3 * 24;
    var w3 = d3 * 7;
    var y3 = d3 * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse2(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y3;
        case "weeks":
        case "week":
        case "w":
          return n * w3;
        case "days":
        case "day":
        case "d":
          return n * d3;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h3;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m2;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d3) {
        return Math.round(ms / d3) + "d";
      }
      if (msAbs >= h3) {
        return Math.round(ms / h3) + "h";
      }
      if (msAbs >= m2) {
        return Math.round(ms / m2) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d3) {
        return plural(ms, msAbs, d3, "day");
      }
      if (msAbs >= h3) {
        return plural(ms, msAbs, h3, "hour");
      }
      if (msAbs >= m2) {
        return plural(ms, msAbs, m2, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// ../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/common.js
var require_common = __commonJS({
  "../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/common.js"(exports, module2) {
    function setup(env3) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env3).forEach((key) => {
        createDebug[key] = env3[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v2) => {
            enableOverride = v2;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter2) {
        const newDebug = createDebug(this.namespace + (typeof delimiter2 === "undefined" ? ":" : delimiter2) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// ../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/browser.js
var require_browser2 = __commonJS({
  "../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/browser.js"(exports, module2) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c3 = "color: " + this.color;
      args.splice(1, 0, c3, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c3);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r2;
      try {
        r2 = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r2 && typeof process !== "undefined" && "env" in process) {
        r2 = process.env.DEBUG;
      }
      return r2;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.j = function(v2) {
      try {
        return JSON.stringify(v2);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// ../../node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "../../node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js"(exports, module2) {
    "use strict";
    module2.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// ../../node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "../../node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js"(exports, module2) {
    "use strict";
    var os3 = require("os");
    var tty3 = require("tty");
    var hasFlag3 = require_has_flag();
    var { env: env3 } = process;
    var forceColor2;
    if (hasFlag3("no-color") || hasFlag3("no-colors") || hasFlag3("color=false") || hasFlag3("color=never")) {
      forceColor2 = 0;
    } else if (hasFlag3("color") || hasFlag3("colors") || hasFlag3("color=true") || hasFlag3("color=always")) {
      forceColor2 = 1;
    }
    if ("FORCE_COLOR" in env3) {
      if (env3.FORCE_COLOR === "true") {
        forceColor2 = 1;
      } else if (env3.FORCE_COLOR === "false") {
        forceColor2 = 0;
      } else {
        forceColor2 = env3.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env3.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel3(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor3(haveStream, streamIsTTY) {
      if (forceColor2 === 0) {
        return 0;
      }
      if (hasFlag3("color=16m") || hasFlag3("color=full") || hasFlag3("color=truecolor")) {
        return 3;
      }
      if (hasFlag3("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor2 === void 0) {
        return 0;
      }
      const min = forceColor2 || 0;
      if (env3.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os3.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env3) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env3) || env3.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env3) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env3.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env3.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env3) {
        const version = parseInt((env3.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env3.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env3.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env3.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env3) {
        return 1;
      }
      return min;
    }
    function getSupportLevel2(stream2) {
      const level = supportsColor3(stream2, stream2 && stream2.isTTY);
      return translateLevel3(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel2,
      stdout: translateLevel3(supportsColor3(true, tty3.isatty(1))),
      stderr: translateLevel3(supportsColor3(true, tty3.isatty(2)))
    };
  }
});

// ../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/node.js
var require_node2 = __commonJS({
  "../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/node.js"(exports, module2) {
    var tty3 = require("tty");
    var util2 = require("util");
    exports.init = init2;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util2.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor3 = require_supports_color();
      if (supportsColor3 && (supportsColor3.stderr || supportsColor3).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_3, k2) => {
        return k2.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty3.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c3 = this.color;
        const colorCode = "\x1B[3" + (c3 < 8 ? c3 : "8;5;" + c3);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return new Date().toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util2.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init2(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.o = function(v2) {
      this.inspectOpts.colors = this.useColors;
      return util2.inspect(v2, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v2) {
      this.inspectOpts.colors = this.useColors;
      return util2.inspect(v2, this.inspectOpts);
    };
  }
});

// ../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/index.js
var require_src2 = __commonJS({
  "../../node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/index.js"(exports, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser2();
    } else {
      module2.exports = require_node2();
    }
  }
});

// ../../node_modules/.pnpm/agent-base@6.0.2/node_modules/agent-base/dist/src/promisify.js
var require_promisify = __commonJS({
  "../../node_modules/.pnpm/agent-base@6.0.2/node_modules/agent-base/dist/src/promisify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function promisify2(fn) {
      return function(req, opts) {
        return new Promise((resolve2, reject) => {
          fn.call(this, req, opts, (err, rtn) => {
            if (err) {
              reject(err);
            } else {
              resolve2(rtn);
            }
          });
        });
      };
    }
    exports.default = promisify2;
  }
});

// ../../node_modules/.pnpm/agent-base@6.0.2/node_modules/agent-base/dist/src/index.js
var require_src3 = __commonJS({
  "../../node_modules/.pnpm/agent-base@6.0.2/node_modules/agent-base/dist/src/index.js"(exports, module2) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var events_1 = require("events");
    var debug_1 = __importDefault(require_src2());
    var promisify_1 = __importDefault(require_promisify());
    var debug = debug_1.default("agent-base");
    function isAgent(v2) {
      return Boolean(v2) && typeof v2.addRequest === "function";
    }
    function isSecureEndpoint() {
      const { stack } = new Error();
      if (typeof stack !== "string")
        return false;
      return stack.split("\n").some((l) => l.indexOf("(https.js:") !== -1 || l.indexOf("node:https:") !== -1);
    }
    function createAgent(callback, opts) {
      return new createAgent.Agent(callback, opts);
    }
    (function(createAgent2) {
      class Agent extends events_1.EventEmitter {
        constructor(callback, _opts) {
          super();
          let opts = _opts;
          if (typeof callback === "function") {
            this.callback = callback;
          } else if (callback) {
            opts = callback;
          }
          this.timeout = null;
          if (opts && typeof opts.timeout === "number") {
            this.timeout = opts.timeout;
          }
          this.maxFreeSockets = 1;
          this.maxSockets = 1;
          this.maxTotalSockets = Infinity;
          this.sockets = {};
          this.freeSockets = {};
          this.requests = {};
          this.options = {};
        }
        get defaultPort() {
          if (typeof this.explicitDefaultPort === "number") {
            return this.explicitDefaultPort;
          }
          return isSecureEndpoint() ? 443 : 80;
        }
        set defaultPort(v2) {
          this.explicitDefaultPort = v2;
        }
        get protocol() {
          if (typeof this.explicitProtocol === "string") {
            return this.explicitProtocol;
          }
          return isSecureEndpoint() ? "https:" : "http:";
        }
        set protocol(v2) {
          this.explicitProtocol = v2;
        }
        callback(req, opts, fn) {
          throw new Error('"agent-base" has no default implementation, you must subclass and override `callback()`');
        }
        addRequest(req, _opts) {
          const opts = Object.assign({}, _opts);
          if (typeof opts.secureEndpoint !== "boolean") {
            opts.secureEndpoint = isSecureEndpoint();
          }
          if (opts.host == null) {
            opts.host = "localhost";
          }
          if (opts.port == null) {
            opts.port = opts.secureEndpoint ? 443 : 80;
          }
          if (opts.protocol == null) {
            opts.protocol = opts.secureEndpoint ? "https:" : "http:";
          }
          if (opts.host && opts.path) {
            delete opts.path;
          }
          delete opts.agent;
          delete opts.hostname;
          delete opts._defaultAgent;
          delete opts.defaultPort;
          delete opts.createConnection;
          req._last = true;
          req.shouldKeepAlive = false;
          let timedOut = false;
          let timeoutId = null;
          const timeoutMs = opts.timeout || this.timeout;
          const onerror = (err) => {
            if (req._hadError)
              return;
            req.emit("error", err);
            req._hadError = true;
          };
          const ontimeout = () => {
            timeoutId = null;
            timedOut = true;
            const err = new Error(`A "socket" was not created for HTTP request before ${timeoutMs}ms`);
            err.code = "ETIMEOUT";
            onerror(err);
          };
          const callbackError = (err) => {
            if (timedOut)
              return;
            if (timeoutId !== null) {
              clearTimeout(timeoutId);
              timeoutId = null;
            }
            onerror(err);
          };
          const onsocket = (socket) => {
            if (timedOut)
              return;
            if (timeoutId != null) {
              clearTimeout(timeoutId);
              timeoutId = null;
            }
            if (isAgent(socket)) {
              debug("Callback returned another Agent instance %o", socket.constructor.name);
              socket.addRequest(req, opts);
              return;
            }
            if (socket) {
              socket.once("free", () => {
                this.freeSocket(socket, opts);
              });
              req.onSocket(socket);
              return;
            }
            const err = new Error(`no Duplex stream was returned to agent-base for \`${req.method} ${req.path}\``);
            onerror(err);
          };
          if (typeof this.callback !== "function") {
            onerror(new Error("`callback` is not defined"));
            return;
          }
          if (!this.promisifiedCallback) {
            if (this.callback.length >= 3) {
              debug("Converting legacy callback function to promise");
              this.promisifiedCallback = promisify_1.default(this.callback);
            } else {
              this.promisifiedCallback = this.callback;
            }
          }
          if (typeof timeoutMs === "number" && timeoutMs > 0) {
            timeoutId = setTimeout(ontimeout, timeoutMs);
          }
          if ("port" in opts && typeof opts.port !== "number") {
            opts.port = Number(opts.port);
          }
          try {
            debug("Resolving socket for %o request: %o", opts.protocol, `${req.method} ${req.path}`);
            Promise.resolve(this.promisifiedCallback(req, opts)).then(onsocket, callbackError);
          } catch (err) {
            Promise.reject(err).catch(callbackError);
          }
        }
        freeSocket(socket, opts) {
          debug("Freeing socket %o %o", socket.constructor.name, opts);
          socket.destroy();
        }
        destroy() {
          debug("Destroying agent %o", this.constructor.name);
        }
      }
      createAgent2.Agent = Agent;
      createAgent2.prototype = createAgent2.Agent.prototype;
    })(createAgent || (createAgent = {}));
    module2.exports = createAgent;
  }
});

// ../../node_modules/.pnpm/https-proxy-agent@5.0.1/node_modules/https-proxy-agent/dist/parse-proxy-response.js
var require_parse_proxy_response = __commonJS({
  "../../node_modules/.pnpm/https-proxy-agent@5.0.1/node_modules/https-proxy-agent/dist/parse-proxy-response.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var debug_1 = __importDefault(require_src2());
    var debug = debug_1.default("https-proxy-agent:parse-proxy-response");
    function parseProxyResponse(socket) {
      return new Promise((resolve2, reject) => {
        let buffersLength = 0;
        const buffers = [];
        function read() {
          const b3 = socket.read();
          if (b3)
            ondata(b3);
          else
            socket.once("readable", read);
        }
        function cleanup() {
          socket.removeListener("end", onend);
          socket.removeListener("error", onerror);
          socket.removeListener("close", onclose);
          socket.removeListener("readable", read);
        }
        function onclose(err) {
          debug("onclose had error %o", err);
        }
        function onend() {
          debug("onend");
        }
        function onerror(err) {
          cleanup();
          debug("onerror %o", err);
          reject(err);
        }
        function ondata(b3) {
          buffers.push(b3);
          buffersLength += b3.length;
          const buffered = Buffer.concat(buffers, buffersLength);
          const endOfHeaders = buffered.indexOf("\r\n\r\n");
          if (endOfHeaders === -1) {
            debug("have not received end of HTTP headers yet...");
            read();
            return;
          }
          const firstLine = buffered.toString("ascii", 0, buffered.indexOf("\r\n"));
          const statusCode = +firstLine.split(" ")[1];
          debug("got proxy server response: %o", firstLine);
          resolve2({
            statusCode,
            buffered
          });
        }
        socket.on("error", onerror);
        socket.on("close", onclose);
        socket.on("end", onend);
        read();
      });
    }
    exports.default = parseProxyResponse;
  }
});

// ../../node_modules/.pnpm/https-proxy-agent@5.0.1/node_modules/https-proxy-agent/dist/agent.js
var require_agent = __commonJS({
  "../../node_modules/.pnpm/https-proxy-agent@5.0.1/node_modules/https-proxy-agent/dist/agent.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P2, generator) {
      function adopt(value) {
        return value instanceof P2 ? value : new P2(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var net_1 = __importDefault(require("net"));
    var tls_1 = __importDefault(require("tls"));
    var url_1 = __importDefault(require("url"));
    var assert_1 = __importDefault(require("assert"));
    var debug_1 = __importDefault(require_src2());
    var agent_base_1 = require_src3();
    var parse_proxy_response_1 = __importDefault(require_parse_proxy_response());
    var debug = debug_1.default("https-proxy-agent:agent");
    var HttpsProxyAgent = class extends agent_base_1.Agent {
      constructor(_opts) {
        let opts;
        if (typeof _opts === "string") {
          opts = url_1.default.parse(_opts);
        } else {
          opts = _opts;
        }
        if (!opts) {
          throw new Error("an HTTP(S) proxy server `host` and `port` must be specified!");
        }
        debug("creating new HttpsProxyAgent instance: %o", opts);
        super(opts);
        const proxy = Object.assign({}, opts);
        this.secureProxy = opts.secureProxy || isHTTPS(proxy.protocol);
        proxy.host = proxy.hostname || proxy.host;
        if (typeof proxy.port === "string") {
          proxy.port = parseInt(proxy.port, 10);
        }
        if (!proxy.port && proxy.host) {
          proxy.port = this.secureProxy ? 443 : 80;
        }
        if (this.secureProxy && !("ALPNProtocols" in proxy)) {
          proxy.ALPNProtocols = ["http 1.1"];
        }
        if (proxy.host && proxy.path) {
          delete proxy.path;
          delete proxy.pathname;
        }
        this.proxy = proxy;
      }
      callback(req, opts) {
        return __awaiter(this, void 0, void 0, function* () {
          const { proxy, secureProxy } = this;
          let socket;
          if (secureProxy) {
            debug("Creating `tls.Socket`: %o", proxy);
            socket = tls_1.default.connect(proxy);
          } else {
            debug("Creating `net.Socket`: %o", proxy);
            socket = net_1.default.connect(proxy);
          }
          const headers = Object.assign({}, proxy.headers);
          const hostname = `${opts.host}:${opts.port}`;
          let payload = `CONNECT ${hostname} HTTP/1.1\r
`;
          if (proxy.auth) {
            headers["Proxy-Authorization"] = `Basic ${Buffer.from(proxy.auth).toString("base64")}`;
          }
          let { host, port, secureEndpoint } = opts;
          if (!isDefaultPort(port, secureEndpoint)) {
            host += `:${port}`;
          }
          headers.Host = host;
          headers.Connection = "close";
          for (const name of Object.keys(headers)) {
            payload += `${name}: ${headers[name]}\r
`;
          }
          const proxyResponsePromise = parse_proxy_response_1.default(socket);
          socket.write(`${payload}\r
`);
          const { statusCode, buffered } = yield proxyResponsePromise;
          if (statusCode === 200) {
            req.once("socket", resume);
            if (opts.secureEndpoint) {
              debug("Upgrading socket connection to TLS");
              const servername = opts.servername || opts.host;
              return tls_1.default.connect(Object.assign(Object.assign({}, omit(opts, "host", "hostname", "path", "port")), {
                socket,
                servername
              }));
            }
            return socket;
          }
          socket.destroy();
          const fakeSocket = new net_1.default.Socket({ writable: false });
          fakeSocket.readable = true;
          req.once("socket", (s) => {
            debug("replaying proxy buffer for failed request");
            assert_1.default(s.listenerCount("data") > 0);
            s.push(buffered);
            s.push(null);
          });
          return fakeSocket;
        });
      }
    };
    exports.default = HttpsProxyAgent;
    function resume(socket) {
      socket.resume();
    }
    function isDefaultPort(port, secure) {
      return Boolean(!secure && port === 80 || secure && port === 443);
    }
    function isHTTPS(protocol) {
      return typeof protocol === "string" ? /^https:?$/i.test(protocol) : false;
    }
    function omit(obj, ...keys) {
      const ret = {};
      let key;
      for (key in obj) {
        if (!keys.includes(key)) {
          ret[key] = obj[key];
        }
      }
      return ret;
    }
  }
});

// ../../node_modules/.pnpm/https-proxy-agent@5.0.1/node_modules/https-proxy-agent/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/.pnpm/https-proxy-agent@5.0.1/node_modules/https-proxy-agent/dist/index.js"(exports, module2) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var agent_1 = __importDefault(require_agent());
    function createHttpsProxyAgent(opts) {
      return new agent_1.default(opts);
    }
    (function(createHttpsProxyAgent2) {
      createHttpsProxyAgent2.HttpsProxyAgent = agent_1.default;
      createHttpsProxyAgent2.prototype = agent_1.default.prototype;
    })(createHttpsProxyAgent || (createHttpsProxyAgent = {}));
    module2.exports = createHttpsProxyAgent;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/transports/http.js
var require_http = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/transports/http.js"(exports) {
    var {
      _nullishCoalesce
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var http = require("http");
    var https = require("https");
    var httpsProxyAgent = require_dist();
    var stream2 = require("stream");
    var url2 = require("url");
    var zlib = require("zlib");
    var GZIP_THRESHOLD = 1024 * 32;
    function streamFromBody(body) {
      return new stream2.Readable({
        read() {
          this.push(body);
          this.push(null);
        }
      });
    }
    function makeNodeTransport2(options) {
      let urlSegments;
      try {
        urlSegments = new url2.URL(options.url);
      } catch (e2) {
        console.warn(
          "[@sentry/node]: Invalid dsn or tunnel option, will not send any events. The tunnel option must be a full URL when used."
        );
        return core2.createTransport(options, () => Promise.resolve({}));
      }
      const isHttps = urlSegments.protocol === "https:";
      const proxy = applyNoProxyOption(
        urlSegments,
        options.proxy || (isHttps ? process.env.https_proxy : void 0) || process.env.http_proxy
      );
      const nativeHttpModule = isHttps ? https : http;
      const keepAlive = options.keepAlive === void 0 ? false : options.keepAlive;
      const agent = proxy ? new httpsProxyAgent.HttpsProxyAgent(proxy) : new nativeHttpModule.Agent({ keepAlive, maxSockets: 30, timeout: 2e3 });
      const requestExecutor = createRequestExecutor(options, _nullishCoalesce(options.httpModule, () => nativeHttpModule), agent);
      return core2.createTransport(options, requestExecutor);
    }
    function applyNoProxyOption(transportUrlSegments, proxy) {
      const { no_proxy } = process.env;
      const urlIsExemptFromProxy = no_proxy && no_proxy.split(",").some(
        (exemption) => transportUrlSegments.host.endsWith(exemption) || transportUrlSegments.hostname.endsWith(exemption)
      );
      if (urlIsExemptFromProxy) {
        return void 0;
      } else {
        return proxy;
      }
    }
    function createRequestExecutor(options, httpModule, agent) {
      const { hostname, pathname, port, protocol, search } = new url2.URL(options.url);
      return function makeRequest(request) {
        return new Promise((resolve2, reject) => {
          let body = streamFromBody(request.body);
          const headers = { ...options.headers };
          if (request.body.length > GZIP_THRESHOLD) {
            headers["content-encoding"] = "gzip";
            body = body.pipe(zlib.createGzip());
          }
          const req = httpModule.request(
            {
              method: "POST",
              agent,
              headers,
              hostname,
              path: `${pathname}${search}`,
              port,
              protocol,
              ca: options.caCerts
            },
            (res) => {
              res.on("data", () => {
              });
              res.on("end", () => {
              });
              res.setEncoding("utf8");
              const retryAfterHeader = _nullishCoalesce(res.headers["retry-after"], () => null);
              const rateLimitsHeader = _nullishCoalesce(res.headers["x-sentry-rate-limits"], () => null);
              resolve2({
                statusCode: res.statusCode,
                headers: {
                  "retry-after": retryAfterHeader,
                  "x-sentry-rate-limits": Array.isArray(rateLimitsHeader) ? rateLimitsHeader[0] : rateLimitsHeader
                }
              });
            }
          );
          req.on("error", reject);
          body.pipe(req);
        });
      };
    }
    exports.makeNodeTransport = makeNodeTransport2;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/nodeVersion.js
var require_nodeVersion = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/nodeVersion.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var NODE_VERSION = utils.parseSemver(process.versions.node);
    exports.NODE_VERSION = NODE_VERSION;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/async/domain.js
var require_domain = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/async/domain.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var domain = require("domain");
    function getActiveDomain() {
      return domain.active;
    }
    function getCurrentHub() {
      const activeDomain = getActiveDomain();
      if (!activeDomain) {
        return void 0;
      }
      core2.ensureHubOnCarrier(activeDomain);
      return core2.getHubFromCarrier(activeDomain);
    }
    function createNewHub(parent) {
      const carrier = {};
      core2.ensureHubOnCarrier(carrier, parent);
      return core2.getHubFromCarrier(carrier);
    }
    function runWithAsyncContext2(callback, options) {
      const activeDomain = getActiveDomain();
      if (activeDomain && _optionalChain([options, "optionalAccess", (_3) => _3.reuseExisting])) {
        return callback();
      }
      const local = domain.create();
      const parentHub = activeDomain ? core2.getHubFromCarrier(activeDomain) : void 0;
      const newHub = createNewHub(parentHub);
      core2.setHubOnCarrier(local, newHub);
      return local.bind(() => {
        return callback();
      })();
    }
    function setDomainAsyncContextStrategy() {
      core2.setAsyncContextStrategy({ getCurrentHub, runWithAsyncContext: runWithAsyncContext2 });
    }
    exports.setDomainAsyncContextStrategy = setDomainAsyncContextStrategy;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/async/hooks.js
var require_hooks = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/async/hooks.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var async_hooks = require("async_hooks");
    var asyncStorage;
    function setHooksAsyncContextStrategy() {
      if (!asyncStorage) {
        asyncStorage = new async_hooks.AsyncLocalStorage();
      }
      function getCurrentHub() {
        return asyncStorage.getStore();
      }
      function createNewHub(parent) {
        const carrier = {};
        core2.ensureHubOnCarrier(carrier, parent);
        return core2.getHubFromCarrier(carrier);
      }
      function runWithAsyncContext2(callback, options) {
        const existingHub = getCurrentHub();
        if (existingHub && _optionalChain([options, "optionalAccess", (_3) => _3.reuseExisting])) {
          return callback();
        }
        const newHub = createNewHub(existingHub);
        return asyncStorage.run(newHub, () => {
          return callback();
        });
      }
      core2.setAsyncContextStrategy({ getCurrentHub, runWithAsyncContext: runWithAsyncContext2 });
    }
    exports.setHooksAsyncContextStrategy = setHooksAsyncContextStrategy;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/async/index.js
var require_async = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/async/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var nodeVersion = require_nodeVersion();
    var domain = require_domain();
    var hooks = require_hooks();
    function setNodeAsyncContextStrategy() {
      if (nodeVersion.NODE_VERSION.major && nodeVersion.NODE_VERSION.major >= 14) {
        hooks.setHooksAsyncContextStrategy();
      } else {
        domain.setDomainAsyncContextStrategy();
      }
    }
    exports.setNodeAsyncContextStrategy = setNodeAsyncContextStrategy;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/console.js
var require_console = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/console.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var utils = require_cjs();
    var util2 = require("util");
    var Console = class {
      constructor() {
        Console.prototype.__init.call(this);
      }
      static __initStatic() {
        this.id = "Console";
      }
      __init() {
        this.name = Console.id;
      }
      setupOnce() {
        utils.addInstrumentationHandler("console", ({ args, level }) => {
          const hub = core2.getCurrentHub();
          if (!hub.getIntegration(Console)) {
            return;
          }
          hub.addBreadcrumb(
            {
              category: "console",
              level: utils.severityLevelFromString(level),
              message: util2.format.apply(void 0, args)
            },
            {
              input: [...args],
              level
            }
          );
        });
      }
    };
    Console.__initStatic();
    exports.Console = Console;
  }
});

// ../../node_modules/.pnpm/lru_map@0.3.3/node_modules/lru_map/lru.js
var require_lru = __commonJS({
  "../../node_modules/.pnpm/lru_map@0.3.3/node_modules/lru_map/lru.js"(exports) {
    (function(g2, f3) {
      const e2 = typeof exports == "object" ? exports : typeof g2 == "object" ? g2 : {};
      f3(e2);
      if (typeof define == "function" && define.amd) {
        define("lru", e2);
      }
    })(exports, function(exports2) {
      const NEWER = Symbol("newer");
      const OLDER = Symbol("older");
      function LRUMap(limit, entries) {
        if (typeof limit !== "number") {
          entries = limit;
          limit = 0;
        }
        this.size = 0;
        this.limit = limit;
        this.oldest = this.newest = void 0;
        this._keymap = /* @__PURE__ */ new Map();
        if (entries) {
          this.assign(entries);
          if (limit < 1) {
            this.limit = this.size;
          }
        }
      }
      exports2.LRUMap = LRUMap;
      function Entry(key, value) {
        this.key = key;
        this.value = value;
        this[NEWER] = void 0;
        this[OLDER] = void 0;
      }
      LRUMap.prototype._markEntryAsUsed = function(entry) {
        if (entry === this.newest) {
          return;
        }
        if (entry[NEWER]) {
          if (entry === this.oldest) {
            this.oldest = entry[NEWER];
          }
          entry[NEWER][OLDER] = entry[OLDER];
        }
        if (entry[OLDER]) {
          entry[OLDER][NEWER] = entry[NEWER];
        }
        entry[NEWER] = void 0;
        entry[OLDER] = this.newest;
        if (this.newest) {
          this.newest[NEWER] = entry;
        }
        this.newest = entry;
      };
      LRUMap.prototype.assign = function(entries) {
        let entry, limit = this.limit || Number.MAX_VALUE;
        this._keymap.clear();
        let it = entries[Symbol.iterator]();
        for (let itv = it.next(); !itv.done; itv = it.next()) {
          let e2 = new Entry(itv.value[0], itv.value[1]);
          this._keymap.set(e2.key, e2);
          if (!entry) {
            this.oldest = e2;
          } else {
            entry[NEWER] = e2;
            e2[OLDER] = entry;
          }
          entry = e2;
          if (limit-- == 0) {
            throw new Error("overflow");
          }
        }
        this.newest = entry;
        this.size = this._keymap.size;
      };
      LRUMap.prototype.get = function(key) {
        var entry = this._keymap.get(key);
        if (!entry)
          return;
        this._markEntryAsUsed(entry);
        return entry.value;
      };
      LRUMap.prototype.set = function(key, value) {
        var entry = this._keymap.get(key);
        if (entry) {
          entry.value = value;
          this._markEntryAsUsed(entry);
          return this;
        }
        this._keymap.set(key, entry = new Entry(key, value));
        if (this.newest) {
          this.newest[NEWER] = entry;
          entry[OLDER] = this.newest;
        } else {
          this.oldest = entry;
        }
        this.newest = entry;
        ++this.size;
        if (this.size > this.limit) {
          this.shift();
        }
        return this;
      };
      LRUMap.prototype.shift = function() {
        var entry = this.oldest;
        if (entry) {
          if (this.oldest[NEWER]) {
            this.oldest = this.oldest[NEWER];
            this.oldest[OLDER] = void 0;
          } else {
            this.oldest = void 0;
            this.newest = void 0;
          }
          entry[NEWER] = entry[OLDER] = void 0;
          this._keymap.delete(entry.key);
          --this.size;
          return [entry.key, entry.value];
        }
      };
      LRUMap.prototype.find = function(key) {
        let e2 = this._keymap.get(key);
        return e2 ? e2.value : void 0;
      };
      LRUMap.prototype.has = function(key) {
        return this._keymap.has(key);
      };
      LRUMap.prototype["delete"] = function(key) {
        var entry = this._keymap.get(key);
        if (!entry)
          return;
        this._keymap.delete(entry.key);
        if (entry[NEWER] && entry[OLDER]) {
          entry[OLDER][NEWER] = entry[NEWER];
          entry[NEWER][OLDER] = entry[OLDER];
        } else if (entry[NEWER]) {
          entry[NEWER][OLDER] = void 0;
          this.oldest = entry[NEWER];
        } else if (entry[OLDER]) {
          entry[OLDER][NEWER] = void 0;
          this.newest = entry[OLDER];
        } else {
          this.oldest = this.newest = void 0;
        }
        this.size--;
        return entry.value;
      };
      LRUMap.prototype.clear = function() {
        this.oldest = this.newest = void 0;
        this.size = 0;
        this._keymap.clear();
      };
      function EntryIterator(oldestEntry) {
        this.entry = oldestEntry;
      }
      EntryIterator.prototype[Symbol.iterator] = function() {
        return this;
      };
      EntryIterator.prototype.next = function() {
        let ent = this.entry;
        if (ent) {
          this.entry = ent[NEWER];
          return { done: false, value: [ent.key, ent.value] };
        } else {
          return { done: true, value: void 0 };
        }
      };
      function KeyIterator(oldestEntry) {
        this.entry = oldestEntry;
      }
      KeyIterator.prototype[Symbol.iterator] = function() {
        return this;
      };
      KeyIterator.prototype.next = function() {
        let ent = this.entry;
        if (ent) {
          this.entry = ent[NEWER];
          return { done: false, value: ent.key };
        } else {
          return { done: true, value: void 0 };
        }
      };
      function ValueIterator(oldestEntry) {
        this.entry = oldestEntry;
      }
      ValueIterator.prototype[Symbol.iterator] = function() {
        return this;
      };
      ValueIterator.prototype.next = function() {
        let ent = this.entry;
        if (ent) {
          this.entry = ent[NEWER];
          return { done: false, value: ent.value };
        } else {
          return { done: true, value: void 0 };
        }
      };
      LRUMap.prototype.keys = function() {
        return new KeyIterator(this.oldest);
      };
      LRUMap.prototype.values = function() {
        return new ValueIterator(this.oldest);
      };
      LRUMap.prototype.entries = function() {
        return this;
      };
      LRUMap.prototype[Symbol.iterator] = function() {
        return new EntryIterator(this.oldest);
      };
      LRUMap.prototype.forEach = function(fun, thisObj) {
        if (typeof thisObj !== "object") {
          thisObj = this;
        }
        let entry = this.oldest;
        while (entry) {
          fun.call(thisObj, entry.value, entry.key, this);
          entry = entry[NEWER];
        }
      };
      LRUMap.prototype.toJSON = function() {
        var s = new Array(this.size), i = 0, entry = this.oldest;
        while (entry) {
          s[i++] = { key: entry.key, value: entry.value };
          entry = entry[NEWER];
        }
        return s;
      };
      LRUMap.prototype.toString = function() {
        var s = "", entry = this.oldest;
        while (entry) {
          s += String(entry.key) + ":" + entry.value;
          entry = entry[NEWER];
          if (entry) {
            s += " < ";
          }
        }
        return s;
      };
    });
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/utils/http.js
var require_http2 = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/utils/http.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var url2 = require("url");
    var nodeVersion = require_nodeVersion();
    function isSentryRequest(url3) {
      const dsn = _optionalChain([core2.getCurrentHub, "call", (_3) => _3(), "access", (_22) => _22.getClient, "call", (_3) => _3(), "optionalAccess", (_4) => _4.getDsn, "call", (_5) => _5()]);
      return dsn ? url3.includes(dsn.host) : false;
    }
    function extractRawUrl(requestOptions) {
      const protocol = requestOptions.protocol || "";
      const hostname = requestOptions.hostname || requestOptions.host || "";
      const port = !requestOptions.port || requestOptions.port === 80 || requestOptions.port === 443 ? "" : `:${requestOptions.port}`;
      const path6 = requestOptions.path ? requestOptions.path : "/";
      return `${protocol}//${hostname}${port}${path6}`;
    }
    function extractUrl(requestOptions) {
      const protocol = requestOptions.protocol || "";
      const hostname = requestOptions.hostname || requestOptions.host || "";
      const port = !requestOptions.port || requestOptions.port === 80 || requestOptions.port === 443 ? "" : `:${requestOptions.port}`;
      const path6 = requestOptions.pathname || "/";
      const authority = requestOptions.auth ? redactAuthority(requestOptions.auth) : "";
      return `${protocol}//${authority}${hostname}${port}${path6}`;
    }
    function redactAuthority(auth) {
      const [user, password] = auth.split(":");
      return `${user ? "[Filtered]" : ""}:${password ? "[Filtered]" : ""}@`;
    }
    function cleanSpanDescription(description, requestOptions, request) {
      if (!description) {
        return description;
      }
      let [method, requestUrl] = description.split(" ");
      if (requestOptions.host && !requestOptions.protocol) {
        requestOptions.protocol = _optionalChain([request, "optionalAccess", (_6) => _6.agent, "optionalAccess", (_7) => _7.protocol]);
        requestUrl = extractUrl(requestOptions);
      }
      if (_optionalChain([requestUrl, "optionalAccess", (_8) => _8.startsWith, "call", (_9) => _9("///")])) {
        requestUrl = requestUrl.slice(2);
      }
      return `${method} ${requestUrl}`;
    }
    function urlToOptions(url3) {
      const options = {
        protocol: url3.protocol,
        hostname: typeof url3.hostname === "string" && url3.hostname.startsWith("[") ? url3.hostname.slice(1, -1) : url3.hostname,
        hash: url3.hash,
        search: url3.search,
        pathname: url3.pathname,
        path: `${url3.pathname || ""}${url3.search || ""}`,
        href: url3.href
      };
      if (url3.port !== "") {
        options.port = Number(url3.port);
      }
      if (url3.username || url3.password) {
        options.auth = `${url3.username}:${url3.password}`;
      }
      return options;
    }
    function normalizeRequestArgs(httpModule, requestArgs) {
      let callback, requestOptions;
      if (typeof requestArgs[requestArgs.length - 1] === "function") {
        callback = requestArgs.pop();
      }
      if (typeof requestArgs[0] === "string") {
        requestOptions = urlToOptions(new url2.URL(requestArgs[0]));
      } else if (requestArgs[0] instanceof url2.URL) {
        requestOptions = urlToOptions(requestArgs[0]);
      } else {
        requestOptions = requestArgs[0];
      }
      if (requestArgs.length === 2) {
        requestOptions = { ...requestOptions, ...requestArgs[1] };
      }
      if (requestOptions.protocol === void 0) {
        if (nodeVersion.NODE_VERSION.major && nodeVersion.NODE_VERSION.major > 8) {
          requestOptions.protocol = _optionalChain([_optionalChain([httpModule, "optionalAccess", (_10) => _10.globalAgent]), "optionalAccess", (_11) => _11.protocol]) || _optionalChain([requestOptions.agent, "optionalAccess", (_12) => _12.protocol]) || _optionalChain([requestOptions._defaultAgent, "optionalAccess", (_13) => _13.protocol]);
        } else {
          requestOptions.protocol = _optionalChain([requestOptions.agent, "optionalAccess", (_14) => _14.protocol]) || _optionalChain([requestOptions._defaultAgent, "optionalAccess", (_15) => _15.protocol]) || _optionalChain([_optionalChain([httpModule, "optionalAccess", (_16) => _16.globalAgent]), "optionalAccess", (_17) => _17.protocol]);
        }
      }
      if (callback) {
        return [requestOptions, callback];
      } else {
        return [requestOptions];
      }
    }
    exports.cleanSpanDescription = cleanSpanDescription;
    exports.extractRawUrl = extractRawUrl;
    exports.extractUrl = extractUrl;
    exports.isSentryRequest = isSentryRequest;
    exports.normalizeRequestArgs = normalizeRequestArgs;
    exports.urlToOptions = urlToOptions;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/http.js
var require_http3 = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/http.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var utils = require_cjs();
    var lru_map = require_lru();
    var nodeVersion = require_nodeVersion();
    var http = require_http2();
    var Http = class {
      static __initStatic() {
        this.id = "Http";
      }
      __init() {
        this.name = Http.id;
      }
      constructor(options = {}) {
        Http.prototype.__init.call(this);
        this._breadcrumbs = typeof options.breadcrumbs === "undefined" ? true : options.breadcrumbs;
        this._tracing = !options.tracing ? void 0 : options.tracing === true ? {} : options.tracing;
      }
      setupOnce(_addGlobalEventProcessor, setupOnceGetCurrentHub) {
        if (!this._breadcrumbs && !this._tracing) {
          return;
        }
        const clientOptions = _optionalChain([setupOnceGetCurrentHub, "call", (_3) => _3(), "access", (_22) => _22.getClient, "call", (_3) => _3(), "optionalAccess", (_4) => _4.getOptions, "call", (_5) => _5()]);
        if (clientOptions && clientOptions.instrumenter !== "sentry") {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("HTTP Integration is skipped because of instrumenter configuration.");
          return;
        }
        const shouldCreateSpanForRequest = _optionalChain([this, "access", (_6) => _6._tracing, "optionalAccess", (_7) => _7.shouldCreateSpanForRequest]) || _optionalChain([clientOptions, "optionalAccess", (_8) => _8.shouldCreateSpanForRequest]);
        const tracePropagationTargets = _optionalChain([clientOptions, "optionalAccess", (_9) => _9.tracePropagationTargets]) || _optionalChain([this, "access", (_10) => _10._tracing, "optionalAccess", (_11) => _11.tracePropagationTargets]);
        const httpModule = require("http");
        const wrappedHttpHandlerMaker = _createWrappedRequestMethodFactory(
          httpModule,
          this._breadcrumbs,
          shouldCreateSpanForRequest,
          tracePropagationTargets
        );
        utils.fill(httpModule, "get", wrappedHttpHandlerMaker);
        utils.fill(httpModule, "request", wrappedHttpHandlerMaker);
        if (nodeVersion.NODE_VERSION.major && nodeVersion.NODE_VERSION.major > 8) {
          const httpsModule = require("https");
          const wrappedHttpsHandlerMaker = _createWrappedRequestMethodFactory(
            httpsModule,
            this._breadcrumbs,
            shouldCreateSpanForRequest,
            tracePropagationTargets
          );
          utils.fill(httpsModule, "get", wrappedHttpsHandlerMaker);
          utils.fill(httpsModule, "request", wrappedHttpsHandlerMaker);
        }
      }
    };
    Http.__initStatic();
    function _createWrappedRequestMethodFactory(httpModule, breadcrumbsEnabled, shouldCreateSpanForRequest, tracePropagationTargets) {
      const createSpanUrlMap = new lru_map.LRUMap(100);
      const headersUrlMap = new lru_map.LRUMap(100);
      const shouldCreateSpan = (url2) => {
        if (shouldCreateSpanForRequest === void 0) {
          return true;
        }
        const cachedDecision = createSpanUrlMap.get(url2);
        if (cachedDecision !== void 0) {
          return cachedDecision;
        }
        const decision = shouldCreateSpanForRequest(url2);
        createSpanUrlMap.set(url2, decision);
        return decision;
      };
      const shouldAttachTraceData = (url2) => {
        if (tracePropagationTargets === void 0) {
          return true;
        }
        const cachedDecision = headersUrlMap.get(url2);
        if (cachedDecision !== void 0) {
          return cachedDecision;
        }
        const decision = utils.stringMatchesSomePattern(url2, tracePropagationTargets);
        headersUrlMap.set(url2, decision);
        return decision;
      };
      function addRequestBreadcrumb(event, requestSpanData, req, res) {
        if (!core2.getCurrentHub().getIntegration(Http)) {
          return;
        }
        core2.getCurrentHub().addBreadcrumb(
          {
            category: "http",
            data: {
              status_code: res && res.statusCode,
              ...requestSpanData
            },
            type: "http"
          },
          {
            event,
            request: req,
            response: res
          }
        );
      }
      return function wrappedRequestMethodFactory(originalRequestMethod) {
        return function wrappedMethod(...args) {
          const requestArgs = http.normalizeRequestArgs(httpModule, args);
          const requestOptions = requestArgs[0];
          const rawRequestUrl = http.extractRawUrl(requestOptions);
          const requestUrl = http.extractUrl(requestOptions);
          if (http.isSentryRequest(requestUrl)) {
            return originalRequestMethod.apply(httpModule, requestArgs);
          }
          const hub = core2.getCurrentHub();
          const scope = hub.getScope();
          const parentSpan = scope.getSpan();
          const data = getRequestSpanData(requestUrl, requestOptions);
          const requestSpan = shouldCreateSpan(rawRequestUrl) ? _optionalChain([parentSpan, "optionalAccess", (_12) => _12.startChild, "call", (_13) => _13({
            op: "http.client",
            origin: "auto.http.node.http",
            description: `${data["http.method"]} ${data.url}`,
            data
          })]) : void 0;
          if (shouldAttachTraceData(rawRequestUrl)) {
            if (requestSpan) {
              const sentryTraceHeader = requestSpan.toTraceparent();
              const dynamicSamplingContext = _optionalChain([requestSpan, "optionalAccess", (_14) => _14.transaction, "optionalAccess", (_15) => _15.getDynamicSamplingContext, "call", (_16) => _16()]);
              addHeadersToRequestOptions(requestOptions, requestUrl, sentryTraceHeader, dynamicSamplingContext);
            } else {
              const client = hub.getClient();
              const { traceId, sampled, dsc } = scope.getPropagationContext();
              const sentryTraceHeader = utils.generateSentryTraceHeader(traceId, void 0, sampled);
              const dynamicSamplingContext = dsc || (client ? core2.getDynamicSamplingContextFromClient(traceId, client, scope) : void 0);
              addHeadersToRequestOptions(requestOptions, requestUrl, sentryTraceHeader, dynamicSamplingContext);
            }
          } else {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(
              `[Tracing] Not adding sentry-trace header to outgoing request (${requestUrl}) due to mismatching tracePropagationTargets option.`
            );
          }
          return originalRequestMethod.apply(httpModule, requestArgs).once("response", function(res) {
            const req = this;
            if (breadcrumbsEnabled) {
              addRequestBreadcrumb("response", data, req, res);
            }
            if (requestSpan) {
              if (res.statusCode) {
                requestSpan.setHttpStatus(res.statusCode);
              }
              requestSpan.description = http.cleanSpanDescription(requestSpan.description, requestOptions, req);
              requestSpan.finish();
            }
          }).once("error", function() {
            const req = this;
            if (breadcrumbsEnabled) {
              addRequestBreadcrumb("error", data, req);
            }
            if (requestSpan) {
              requestSpan.setHttpStatus(500);
              requestSpan.description = http.cleanSpanDescription(requestSpan.description, requestOptions, req);
              requestSpan.finish();
            }
          });
        };
      };
    }
    function addHeadersToRequestOptions(requestOptions, requestUrl, sentryTraceHeader, dynamicSamplingContext) {
      const headers = requestOptions.headers || {};
      if (headers["sentry-trace"]) {
        return;
      }
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(`[Tracing] Adding sentry-trace header ${sentryTraceHeader} to outgoing request to "${requestUrl}": `);
      const sentryBaggage = utils.dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext);
      const sentryBaggageHeader = sentryBaggage && sentryBaggage.length > 0 ? normalizeBaggageHeader(requestOptions, sentryBaggage) : void 0;
      requestOptions.headers = {
        ...requestOptions.headers,
        "sentry-trace": sentryTraceHeader,
        ...sentryBaggageHeader && { baggage: sentryBaggageHeader }
      };
    }
    function getRequestSpanData(requestUrl, requestOptions) {
      const method = requestOptions.method || "GET";
      const data = {
        url: requestUrl,
        "http.method": method
      };
      if (requestOptions.hash) {
        data["http.fragment"] = requestOptions.hash.substring(1);
      }
      if (requestOptions.search) {
        data["http.query"] = requestOptions.search.substring(1);
      }
      return data;
    }
    function normalizeBaggageHeader(requestOptions, sentryBaggageHeader) {
      if (!requestOptions.headers || !requestOptions.headers.baggage) {
        return sentryBaggageHeader;
      } else if (!sentryBaggageHeader) {
        return requestOptions.headers.baggage;
      } else if (Array.isArray(requestOptions.headers.baggage)) {
        return [...requestOptions.headers.baggage, sentryBaggageHeader];
      }
      return [requestOptions.headers.baggage, sentryBaggageHeader];
    }
    exports.Http = Http;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/utils/errorhandling.js
var require_errorhandling = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/utils/errorhandling.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var utils = require_cjs();
    var DEFAULT_SHUTDOWN_TIMEOUT = 2e3;
    function logAndExitProcess(error) {
      console.error(error);
      const client = core2.getCurrentHub().getClient();
      if (client === void 0) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("No NodeClient was defined, we are exiting the process now.");
        global.process.exit(1);
      }
      const options = client.getOptions();
      const timeout = options && options.shutdownTimeout && options.shutdownTimeout > 0 && options.shutdownTimeout || DEFAULT_SHUTDOWN_TIMEOUT;
      client.close(timeout).then(
        (result) => {
          if (!result) {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("We reached the timeout for emptying the request buffer, still exiting now!");
          }
          global.process.exit(1);
        },
        (error2) => {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.error(error2);
        }
      );
    }
    exports.logAndExitProcess = logAndExitProcess;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/onuncaughtexception.js
var require_onuncaughtexception = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/onuncaughtexception.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var utils = require_cjs();
    var errorhandling = require_errorhandling();
    var OnUncaughtException = class {
      static __initStatic() {
        this.id = "OnUncaughtException";
      }
      __init() {
        this.name = OnUncaughtException.id;
      }
      __init2() {
        this.handler = this._makeErrorHandler();
      }
      constructor(options = {}) {
        OnUncaughtException.prototype.__init.call(this);
        OnUncaughtException.prototype.__init2.call(this);
        this._options = {
          exitEvenIfOtherHandlersAreRegistered: true,
          ...options
        };
      }
      setupOnce() {
        global.process.on("uncaughtException", this.handler);
      }
      _makeErrorHandler() {
        const timeout = 2e3;
        let caughtFirstError = false;
        let caughtSecondError = false;
        let calledFatalError = false;
        let firstError;
        return (error) => {
          let onFatalError = errorhandling.logAndExitProcess;
          const client = core2.getCurrentHub().getClient();
          if (this._options.onFatalError) {
            onFatalError = this._options.onFatalError;
          } else if (client && client.getOptions().onFatalError) {
            onFatalError = client.getOptions().onFatalError;
          }
          const userProvidedListenersCount = global.process.listeners("uncaughtException").reduce((acc, listener) => {
            if (listener.name === "domainUncaughtExceptionClear" || listener.tag && listener.tag === "sentry_tracingErrorCallback" || listener === this.handler) {
              return acc;
            } else {
              return acc + 1;
            }
          }, 0);
          const processWouldExit = userProvidedListenersCount === 0;
          const shouldApplyFatalHandlingLogic = this._options.exitEvenIfOtherHandlersAreRegistered || processWouldExit;
          if (!caughtFirstError) {
            const hub = core2.getCurrentHub();
            firstError = error;
            caughtFirstError = true;
            if (hub.getIntegration(OnUncaughtException)) {
              hub.withScope((scope) => {
                scope.setLevel("fatal");
                hub.captureException(error, {
                  originalException: error,
                  data: { mechanism: { handled: false, type: "onuncaughtexception" } }
                });
                if (!calledFatalError && shouldApplyFatalHandlingLogic) {
                  calledFatalError = true;
                  onFatalError(error);
                }
              });
            } else {
              if (!calledFatalError && shouldApplyFatalHandlingLogic) {
                calledFatalError = true;
                onFatalError(error);
              }
            }
          } else {
            if (shouldApplyFatalHandlingLogic) {
              if (calledFatalError) {
                (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn(
                  "uncaught exception after calling fatal error shutdown callback - this is bad! forcing shutdown"
                );
                errorhandling.logAndExitProcess(error);
              } else if (!caughtSecondError) {
                caughtSecondError = true;
                setTimeout(() => {
                  if (!calledFatalError) {
                    calledFatalError = true;
                    onFatalError(firstError, error);
                  }
                }, timeout);
              }
            }
          }
        };
      }
    };
    OnUncaughtException.__initStatic();
    exports.OnUncaughtException = OnUncaughtException;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/onunhandledrejection.js
var require_onunhandledrejection = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/onunhandledrejection.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var utils = require_cjs();
    var errorhandling = require_errorhandling();
    var OnUnhandledRejection = class {
      static __initStatic() {
        this.id = "OnUnhandledRejection";
      }
      __init() {
        this.name = OnUnhandledRejection.id;
      }
      constructor(_options = { mode: "warn" }) {
        this._options = _options;
        OnUnhandledRejection.prototype.__init.call(this);
      }
      setupOnce() {
        global.process.on("unhandledRejection", this.sendUnhandledPromise.bind(this));
      }
      sendUnhandledPromise(reason, promise) {
        const hub = core2.getCurrentHub();
        if (hub.getIntegration(OnUnhandledRejection)) {
          hub.withScope((scope) => {
            scope.setExtra("unhandledPromiseRejection", true);
            hub.captureException(reason, {
              originalException: promise,
              data: { mechanism: { handled: false, type: "onunhandledrejection" } }
            });
          });
        }
        this._handleRejection(reason);
      }
      _handleRejection(reason) {
        const rejectionWarning = "This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason:";
        if (this._options.mode === "warn") {
          utils.consoleSandbox(() => {
            console.warn(rejectionWarning);
            console.error(reason && reason.stack ? reason.stack : reason);
          });
        } else if (this._options.mode === "strict") {
          utils.consoleSandbox(() => {
            console.warn(rejectionWarning);
          });
          errorhandling.logAndExitProcess(reason);
        }
      }
    };
    OnUnhandledRejection.__initStatic();
    exports.OnUnhandledRejection = OnUnhandledRejection;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/linkederrors.js
var require_linkederrors = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/linkederrors.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var eventbuilder = require_eventbuilder2();
    var DEFAULT_KEY = "cause";
    var DEFAULT_LIMIT = 5;
    var LinkedErrors = class {
      static __initStatic() {
        this.id = "LinkedErrors";
      }
      __init() {
        this.name = LinkedErrors.id;
      }
      constructor(options = {}) {
        LinkedErrors.prototype.__init.call(this);
        this._key = options.key || DEFAULT_KEY;
        this._limit = options.limit || DEFAULT_LIMIT;
      }
      setupOnce() {
      }
      preprocessEvent(event, hint, client) {
        const options = client.getOptions();
        utils.applyAggregateErrorsToEvent(
          eventbuilder.exceptionFromError,
          options.stackParser,
          options.maxValueLength,
          this._key,
          this._limit,
          event,
          hint
        );
      }
    };
    LinkedErrors.__initStatic();
    exports.LinkedErrors = LinkedErrors;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/modules.js
var require_modules = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/modules.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs6 = require("fs");
    var path6 = require("path");
    var moduleCache;
    function getPaths() {
      try {
        return require.cache ? Object.keys(require.cache) : [];
      } catch (e2) {
        return [];
      }
    }
    function collectModules() {
      const mainPaths = require.main && require.main.paths || [];
      const paths = getPaths();
      const infos = {};
      const seen = {};
      paths.forEach((path$12) => {
        let dir = path$12;
        const updir = () => {
          const orig = dir;
          dir = path6.dirname(orig);
          if (!dir || orig === dir || seen[orig]) {
            return void 0;
          }
          if (mainPaths.indexOf(dir) < 0) {
            return updir();
          }
          const pkgfile = path6.join(orig, "package.json");
          seen[orig] = true;
          if (!fs6.existsSync(pkgfile)) {
            return updir();
          }
          try {
            const info = JSON.parse(fs6.readFileSync(pkgfile, "utf8"));
            infos[info.name] = info.version;
          } catch (_oO) {
          }
        };
        updir();
      });
      return infos;
    }
    var Modules = class {
      constructor() {
        Modules.prototype.__init.call(this);
      }
      static __initStatic() {
        this.id = "Modules";
      }
      __init() {
        this.name = Modules.id;
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        addGlobalEventProcessor((event) => {
          if (!getCurrentHub().getIntegration(Modules)) {
            return event;
          }
          return {
            ...event,
            modules: {
              ...event.modules,
              ...this._getModules()
            }
          };
        });
      }
      _getModules() {
        if (!moduleCache) {
          moduleCache = collectModules();
        }
        return moduleCache;
      }
    };
    Modules.__initStatic();
    exports.Modules = Modules;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/contextlines.js
var require_contextlines = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/contextlines.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var fs6 = require("fs");
    var lru_map = require_lru();
    var FILE_CONTENT_CACHE = new lru_map.LRUMap(100);
    var DEFAULT_LINES_OF_CONTEXT = 7;
    function readTextFileAsync(path6) {
      return new Promise((resolve2, reject) => {
        fs6.readFile(path6, "utf8", (err, data) => {
          if (err)
            reject(err);
          else
            resolve2(data);
        });
      });
    }
    var ContextLines = class {
      static __initStatic() {
        this.id = "ContextLines";
      }
      __init() {
        this.name = ContextLines.id;
      }
      constructor(_options = {}) {
        this._options = _options;
        ContextLines.prototype.__init.call(this);
      }
      get _contextLines() {
        return this._options.frameContextLines !== void 0 ? this._options.frameContextLines : DEFAULT_LINES_OF_CONTEXT;
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        addGlobalEventProcessor((event) => {
          const self2 = getCurrentHub().getIntegration(ContextLines);
          if (!self2) {
            return event;
          }
          return this.addSourceContext(event);
        });
      }
      async addSourceContext(event) {
        const enqueuedReadSourceFileTasks = {};
        const readSourceFileTasks = [];
        if (this._contextLines > 0 && _optionalChain([event, "access", (_22) => _22.exception, "optionalAccess", (_3) => _3.values])) {
          for (const exception of event.exception.values) {
            if (!_optionalChain([exception, "access", (_4) => _4.stacktrace, "optionalAccess", (_5) => _5.frames])) {
              continue;
            }
            for (let i = exception.stacktrace.frames.length - 1; i >= 0; i--) {
              const frame = exception.stacktrace.frames[i];
              if (frame.filename && !enqueuedReadSourceFileTasks[frame.filename] && !FILE_CONTENT_CACHE.get(frame.filename)) {
                readSourceFileTasks.push(_readSourceFile(frame.filename));
                enqueuedReadSourceFileTasks[frame.filename] = 1;
              }
            }
          }
        }
        if (readSourceFileTasks.length > 0) {
          await Promise.all(readSourceFileTasks);
        }
        if (this._contextLines > 0 && _optionalChain([event, "access", (_6) => _6.exception, "optionalAccess", (_7) => _7.values])) {
          for (const exception of event.exception.values) {
            if (exception.stacktrace && exception.stacktrace.frames) {
              await this.addSourceContextToFrames(exception.stacktrace.frames);
            }
          }
        }
        return event;
      }
      addSourceContextToFrames(frames) {
        for (const frame of frames) {
          if (frame.filename && frame.context_line === void 0) {
            const sourceFileLines = FILE_CONTENT_CACHE.get(frame.filename);
            if (sourceFileLines) {
              try {
                utils.addContextToFrame(sourceFileLines, frame, this._contextLines);
              } catch (e2) {
              }
            }
          }
        }
      }
    };
    ContextLines.__initStatic();
    async function _readSourceFile(filename) {
      const cachedFile = FILE_CONTENT_CACHE.get(filename);
      if (cachedFile === null) {
        return null;
      }
      if (cachedFile !== void 0) {
        return cachedFile;
      }
      let content = null;
      try {
        const rawFileContents = await readTextFileAsync(filename);
        content = rawFileContents.split("\n");
      } catch (_3) {
      }
      FILE_CONTENT_CACHE.set(filename, content);
      return content;
    }
    exports.ContextLines = ContextLines;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/context.js
var require_context = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/context.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var child_process = require("child_process");
    var fs6 = require("fs");
    var os3 = require("os");
    var path6 = require("path");
    var util2 = require("util");
    var readFileAsync = util2.promisify(fs6.readFile);
    var readDirAsync = util2.promisify(fs6.readdir);
    var Context = class {
      static __initStatic() {
        this.id = "Context";
      }
      __init() {
        this.name = Context.id;
      }
      constructor(_options = {
        app: true,
        os: true,
        device: true,
        culture: true,
        cloudResource: true
      }) {
        this._options = _options;
        Context.prototype.__init.call(this);
      }
      setupOnce(addGlobalEventProcessor) {
        addGlobalEventProcessor((event) => this.addContext(event));
      }
      async addContext(event) {
        if (this._cachedContext === void 0) {
          this._cachedContext = this._getContexts();
        }
        const updatedContext = this._updateContext(await this._cachedContext);
        event.contexts = {
          ...event.contexts,
          app: { ...updatedContext.app, ..._optionalChain([event, "access", (_3) => _3.contexts, "optionalAccess", (_22) => _22.app]) },
          os: { ...updatedContext.os, ..._optionalChain([event, "access", (_3) => _3.contexts, "optionalAccess", (_4) => _4.os]) },
          device: { ...updatedContext.device, ..._optionalChain([event, "access", (_5) => _5.contexts, "optionalAccess", (_6) => _6.device]) },
          culture: { ...updatedContext.culture, ..._optionalChain([event, "access", (_7) => _7.contexts, "optionalAccess", (_8) => _8.culture]) },
          cloud_resource: { ...updatedContext.cloud_resource, ..._optionalChain([event, "access", (_9) => _9.contexts, "optionalAccess", (_10) => _10.cloud_resource]) }
        };
        return event;
      }
      _updateContext(contexts) {
        if (_optionalChain([contexts, "optionalAccess", (_11) => _11.app, "optionalAccess", (_12) => _12.app_memory])) {
          contexts.app.app_memory = process.memoryUsage().rss;
        }
        if (_optionalChain([contexts, "optionalAccess", (_13) => _13.device, "optionalAccess", (_14) => _14.free_memory])) {
          contexts.device.free_memory = os3.freemem();
        }
        return contexts;
      }
      async _getContexts() {
        const contexts = {};
        if (this._options.os) {
          contexts.os = await getOsContext();
        }
        if (this._options.app) {
          contexts.app = getAppContext();
        }
        if (this._options.device) {
          contexts.device = getDeviceContext(this._options.device);
        }
        if (this._options.culture) {
          const culture = getCultureContext();
          if (culture) {
            contexts.culture = culture;
          }
        }
        if (this._options.cloudResource) {
          contexts.cloud_resource = getCloudResourceContext();
        }
        return contexts;
      }
    };
    Context.__initStatic();
    async function getOsContext() {
      const platformId = os3.platform();
      switch (platformId) {
        case "darwin":
          return getDarwinInfo();
        case "linux":
          return getLinuxInfo();
        default:
          return {
            name: PLATFORM_NAMES[platformId] || platformId,
            version: os3.release()
          };
      }
    }
    function getCultureContext() {
      try {
        if (typeof process.versions.icu !== "string") {
          return;
        }
        const january = new Date(9e8);
        const spanish = new Intl.DateTimeFormat("es", { month: "long" });
        if (spanish.format(january) === "enero") {
          const options = Intl.DateTimeFormat().resolvedOptions();
          return {
            locale: options.locale,
            timezone: options.timeZone
          };
        }
      } catch (err) {
      }
      return;
    }
    function getAppContext() {
      const app_memory = process.memoryUsage().rss;
      const app_start_time = new Date(Date.now() - process.uptime() * 1e3).toISOString();
      return { app_start_time, app_memory };
    }
    function getDeviceContext(deviceOpt) {
      const device = {};
      let uptime;
      try {
        uptime = os3.uptime && os3.uptime();
      } catch (e2) {
      }
      if (typeof uptime === "number") {
        device.boot_time = new Date(Date.now() - uptime * 1e3).toISOString();
      }
      device.arch = os3.arch();
      if (deviceOpt === true || deviceOpt.memory) {
        device.memory_size = os3.totalmem();
        device.free_memory = os3.freemem();
      }
      if (deviceOpt === true || deviceOpt.cpu) {
        const cpuInfo = os3.cpus();
        if (cpuInfo && cpuInfo.length) {
          const firstCpu = cpuInfo[0];
          device.processor_count = cpuInfo.length;
          device.cpu_description = firstCpu.model;
          device.processor_frequency = firstCpu.speed;
        }
      }
      return device;
    }
    var PLATFORM_NAMES = {
      aix: "IBM AIX",
      freebsd: "FreeBSD",
      openbsd: "OpenBSD",
      sunos: "SunOS",
      win32: "Windows"
    };
    var LINUX_DISTROS = [
      { name: "fedora-release", distros: ["Fedora"] },
      { name: "redhat-release", distros: ["Red Hat Linux", "Centos"] },
      { name: "redhat_version", distros: ["Red Hat Linux"] },
      { name: "SuSE-release", distros: ["SUSE Linux"] },
      { name: "lsb-release", distros: ["Ubuntu Linux", "Arch Linux"] },
      { name: "debian_version", distros: ["Debian"] },
      { name: "debian_release", distros: ["Debian"] },
      { name: "arch-release", distros: ["Arch Linux"] },
      { name: "gentoo-release", distros: ["Gentoo Linux"] },
      { name: "novell-release", distros: ["SUSE Linux"] },
      { name: "alpine-release", distros: ["Alpine Linux"] }
    ];
    var LINUX_VERSIONS = {
      alpine: (content) => content,
      arch: (content) => matchFirst(/distrib_release=(.*)/, content),
      centos: (content) => matchFirst(/release ([^ ]+)/, content),
      debian: (content) => content,
      fedora: (content) => matchFirst(/release (..)/, content),
      mint: (content) => matchFirst(/distrib_release=(.*)/, content),
      red: (content) => matchFirst(/release ([^ ]+)/, content),
      suse: (content) => matchFirst(/VERSION = (.*)\n/, content),
      ubuntu: (content) => matchFirst(/distrib_release=(.*)/, content)
    };
    function matchFirst(regex2, text2) {
      const match = regex2.exec(text2);
      return match ? match[1] : void 0;
    }
    async function getDarwinInfo() {
      const darwinInfo = {
        kernel_version: os3.release(),
        name: "Mac OS X",
        version: `10.${Number(os3.release().split(".")[0]) - 4}`
      };
      try {
        const output = await new Promise((resolve2, reject) => {
          child_process.execFile("/usr/bin/sw_vers", (error, stdout) => {
            if (error) {
              reject(error);
              return;
            }
            resolve2(stdout);
          });
        });
        darwinInfo.name = matchFirst(/^ProductName:\s+(.*)$/m, output);
        darwinInfo.version = matchFirst(/^ProductVersion:\s+(.*)$/m, output);
        darwinInfo.build = matchFirst(/^BuildVersion:\s+(.*)$/m, output);
      } catch (e2) {
      }
      return darwinInfo;
    }
    function getLinuxDistroId(name) {
      return name.split(" ")[0].toLowerCase();
    }
    async function getLinuxInfo() {
      const linuxInfo = {
        kernel_version: os3.release(),
        name: "Linux"
      };
      try {
        const etcFiles = await readDirAsync("/etc");
        const distroFile = LINUX_DISTROS.find((file) => etcFiles.includes(file.name));
        if (!distroFile) {
          return linuxInfo;
        }
        const distroPath = path6.join("/etc", distroFile.name);
        const contents = (await readFileAsync(distroPath, { encoding: "utf-8" })).toLowerCase();
        const { distros } = distroFile;
        linuxInfo.name = distros.find((d3) => contents.indexOf(getLinuxDistroId(d3)) >= 0) || distros[0];
        const id = getLinuxDistroId(linuxInfo.name);
        linuxInfo.version = LINUX_VERSIONS[id](contents);
      } catch (e2) {
      }
      return linuxInfo;
    }
    function getCloudResourceContext() {
      if (process.env.VERCEL) {
        return {
          "cloud.provider": "vercel",
          "cloud.region": process.env.VERCEL_REGION
        };
      } else if (process.env.AWS_REGION) {
        return {
          "cloud.provider": "aws",
          "cloud.region": process.env.AWS_REGION,
          "cloud.platform": process.env.AWS_EXECUTION_ENV
        };
      } else if (process.env.GCP_PROJECT) {
        return {
          "cloud.provider": "gcp"
        };
      } else if (process.env.ALIYUN_REGION_ID) {
        return {
          "cloud.provider": "alibaba_cloud",
          "cloud.region": process.env.ALIYUN_REGION_ID
        };
      } else if (process.env.WEBSITE_SITE_NAME && process.env.REGION_NAME) {
        return {
          "cloud.provider": "azure",
          "cloud.region": process.env.REGION_NAME
        };
      } else if (process.env.IBM_CLOUD_REGION) {
        return {
          "cloud.provider": "ibm_cloud",
          "cloud.region": process.env.IBM_CLOUD_REGION
        };
      } else if (process.env.TENCENTCLOUD_REGION) {
        return {
          "cloud.provider": "tencent_cloud",
          "cloud.region": process.env.TENCENTCLOUD_REGION,
          "cloud.account.id": process.env.TENCENTCLOUD_APPID,
          "cloud.availability_zone": process.env.TENCENTCLOUD_ZONE
        };
      } else if (process.env.NETLIFY) {
        return {
          "cloud.provider": "netlify"
        };
      } else if (process.env.FLY_REGION) {
        return {
          "cloud.provider": "fly.io",
          "cloud.region": process.env.FLY_REGION
        };
      } else if (process.env.DYNO) {
        return {
          "cloud.provider": "heroku"
        };
      } else {
        return void 0;
      }
    }
    exports.Context = Context;
    exports.getDeviceContext = getDeviceContext;
    exports.readDirAsync = readDirAsync;
    exports.readFileAsync = readFileAsync;
  }
});

// ../../node_modules/.pnpm/cookie@0.4.2/node_modules/cookie/index.js
var require_cookie = __commonJS({
  "../../node_modules/.pnpm/cookie@0.4.2/node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse2;
    exports.serialize = serialize;
    var decode = decodeURIComponent;
    var encode = encodeURIComponent;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse2(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var pairs = str.split(";");
      var dec = opt.decode || decode;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var index = pair.indexOf("=");
        if (index < 0) {
          continue;
        }
        var key = pair.substring(0, index).trim();
        if (void 0 == obj[key]) {
          var val = pair.substring(index + 1, pair.length).trim();
          if (val[0] === '"') {
            val = val.slice(1, -1);
          }
          obj[key] = tryDecode(val, dec);
        }
      }
      return obj;
    }
    function serialize(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString !== "function") {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e2) {
        return str;
      }
    }
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/requestdata.js
var require_requestdata2 = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/requestdata.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var cookie = require_cookie();
    var url2 = require("url");
    var DEFAULT_INCLUDES = {
      ip: false,
      request: true,
      transaction: true,
      user: true
    };
    var DEFAULT_REQUEST_INCLUDES = ["cookies", "data", "headers", "method", "query_string", "url"];
    var DEFAULT_USER_INCLUDES = ["id", "username", "email"];
    function extractPathForTransaction(req, options = {}) {
      const method = req.method && req.method.toUpperCase();
      let path6 = "";
      let source = "url";
      if (options.customRoute || req.route) {
        path6 = options.customRoute || `${req.baseUrl || ""}${req.route && req.route.path}`;
        source = "route";
      } else if (req.originalUrl || req.url) {
        path6 = utils.stripUrlQueryAndFragment(req.originalUrl || req.url || "");
      }
      let name = "";
      if (options.method && method) {
        name += method;
      }
      if (options.method && options.path) {
        name += " ";
      }
      if (options.path && path6) {
        name += path6;
      }
      return [name, source];
    }
    function extractTransaction(req, type) {
      switch (type) {
        case "path": {
          return extractPathForTransaction(req, { path: true })[0];
        }
        case "handler": {
          return req.route && req.route.stack && req.route.stack[0] && req.route.stack[0].name || "<anonymous>";
        }
        case "methodPath":
        default: {
          return extractPathForTransaction(req, { path: true, method: true })[0];
        }
      }
    }
    function extractUserData(user, keys) {
      const extractedUser = {};
      const attributes = Array.isArray(keys) ? keys : DEFAULT_USER_INCLUDES;
      attributes.forEach((key) => {
        if (user && key in user) {
          extractedUser[key] = user[key];
        }
      });
      return extractedUser;
    }
    function extractRequestData(req, options) {
      const { include = DEFAULT_REQUEST_INCLUDES } = options || {};
      const requestData = {};
      const headers = req.headers || {};
      const method = req.method;
      const host = req.hostname || req.host || headers.host || "<no host>";
      const protocol = req.protocol === "https" || req.socket && req.socket.encrypted ? "https" : "http";
      const originalUrl = req.originalUrl || req.url || "";
      const absoluteUrl = originalUrl.startsWith(protocol) ? originalUrl : `${protocol}://${host}${originalUrl}`;
      include.forEach((key) => {
        switch (key) {
          case "headers": {
            requestData.headers = headers;
            if (!include.includes("cookies")) {
              delete requestData.headers.cookie;
            }
            break;
          }
          case "method": {
            requestData.method = method;
            break;
          }
          case "url": {
            requestData.url = absoluteUrl;
            break;
          }
          case "cookies": {
            requestData.cookies = req.cookies || headers.cookie && cookie.parse(headers.cookie) || {};
            break;
          }
          case "query_string": {
            requestData.query_string = extractQueryParams(req);
            break;
          }
          case "data": {
            if (method === "GET" || method === "HEAD") {
              break;
            }
            if (req.body !== void 0) {
              requestData.data = utils.isString(req.body) ? req.body : JSON.stringify(utils.normalize(req.body));
            }
            break;
          }
          default: {
            if ({}.hasOwnProperty.call(req, key)) {
              requestData[key] = req[key];
            }
          }
        }
      });
      return requestData;
    }
    function addRequestDataToEvent(event, req, options) {
      const include = {
        ...DEFAULT_INCLUDES,
        ..._optionalChain([options, "optionalAccess", (_3) => _3.include])
      };
      if (include.request) {
        const extractedRequestData = Array.isArray(include.request) ? extractRequestData(req, { include: include.request }) : extractRequestData(req);
        event.request = {
          ...event.request,
          ...extractedRequestData
        };
      }
      if (include.user) {
        const extractedUser = req.user && utils.isPlainObject(req.user) ? extractUserData(req.user, include.user) : {};
        if (Object.keys(extractedUser).length) {
          event.user = {
            ...event.user,
            ...extractedUser
          };
        }
      }
      if (include.ip) {
        const ip = req.ip || req.socket && req.socket.remoteAddress;
        if (ip) {
          event.user = {
            ...event.user,
            ip_address: ip
          };
        }
      }
      if (include.transaction && !event.transaction) {
        event.transaction = extractTransaction(req, include.transaction);
      }
      return event;
    }
    function extractQueryParams(req) {
      let originalUrl = req.originalUrl || req.url || "";
      if (!originalUrl) {
        return;
      }
      if (originalUrl.startsWith("/")) {
        originalUrl = `http://dogs.are.great${originalUrl}`;
      }
      return req.query || typeof URL !== void 0 && new URL(originalUrl).search.replace("?", "") || url2.parse(originalUrl).query || void 0;
    }
    exports.DEFAULT_USER_INCLUDES = DEFAULT_USER_INCLUDES;
    exports.addRequestDataToEvent = addRequestDataToEvent;
    exports.extractPathForTransaction = extractPathForTransaction;
    exports.extractRequestData = extractRequestData;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/requestdata.js
var require_requestdata3 = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/requestdata.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var requestdata = require_requestdata2();
    var DEFAULT_OPTIONS = {
      include: {
        cookies: true,
        data: true,
        headers: true,
        ip: false,
        query_string: true,
        url: true,
        user: {
          id: true,
          username: true,
          email: true
        }
      },
      transactionNamingScheme: "methodPath"
    };
    var RequestData = class {
      static __initStatic() {
        this.id = "RequestData";
      }
      __init() {
        this.name = RequestData.id;
      }
      constructor(options = {}) {
        RequestData.prototype.__init.call(this);
        this._addRequestData = requestdata.addRequestDataToEvent;
        this._options = {
          ...DEFAULT_OPTIONS,
          ...options,
          include: {
            method: true,
            ...DEFAULT_OPTIONS.include,
            ...options.include,
            user: options.include && typeof options.include.user === "boolean" ? options.include.user : {
              ...DEFAULT_OPTIONS.include.user,
              ...(options.include || {}).user
            }
          }
        };
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        const { transactionNamingScheme } = this._options;
        addGlobalEventProcessor((event) => {
          const hub = getCurrentHub();
          const self2 = hub.getIntegration(RequestData);
          const { sdkProcessingMetadata = {} } = event;
          const req = sdkProcessingMetadata.request;
          if (!self2 || !req) {
            return event;
          }
          const addRequestDataOptions = sdkProcessingMetadata.requestDataOptionsFromExpressHandler || sdkProcessingMetadata.requestDataOptionsFromGCPWrapper || convertReqDataIntegrationOptsToAddReqDataOpts(this._options);
          const processedEvent = this._addRequestData(event, req, addRequestDataOptions);
          if (event.type === "transaction" || transactionNamingScheme === "handler") {
            return processedEvent;
          }
          const reqWithTransaction = req;
          const transaction = reqWithTransaction._sentryTransaction;
          if (transaction) {
            const shouldIncludeMethodInTransactionName = getSDKName(hub) === "sentry.javascript.nextjs" ? transaction.name.startsWith("/api") : transactionNamingScheme !== "path";
            const [transactionValue] = utils.extractPathForTransaction(req, {
              path: true,
              method: shouldIncludeMethodInTransactionName,
              customRoute: transaction.name
            });
            processedEvent.transaction = transactionValue;
          }
          return processedEvent;
        });
      }
    };
    RequestData.__initStatic();
    function convertReqDataIntegrationOptsToAddReqDataOpts(integrationOptions) {
      const {
        transactionNamingScheme,
        include: { ip, user, ...requestOptions }
      } = integrationOptions;
      const requestIncludeKeys = [];
      for (const [key, value] of Object.entries(requestOptions)) {
        if (value) {
          requestIncludeKeys.push(key);
        }
      }
      let addReqDataUserOpt;
      if (user === void 0) {
        addReqDataUserOpt = true;
      } else if (typeof user === "boolean") {
        addReqDataUserOpt = user;
      } else {
        const userIncludeKeys = [];
        for (const [key, value] of Object.entries(user)) {
          if (value) {
            userIncludeKeys.push(key);
          }
        }
        addReqDataUserOpt = userIncludeKeys;
      }
      return {
        include: {
          ip,
          user: addReqDataUserOpt,
          request: requestIncludeKeys.length !== 0 ? requestIncludeKeys : void 0,
          transaction: transactionNamingScheme
        }
      };
    }
    function getSDKName(hub) {
      try {
        return hub.getClient().getOptions()._metadata.sdk.name;
      } catch (err) {
        return void 0;
      }
    }
    exports.RequestData = RequestData;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/localvariables.js
var require_localvariables = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/localvariables.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var lru_map = require_lru();
    var nodeVersion = require_nodeVersion();
    function createCallbackList(complete) {
      let callbacks = [];
      let completedCalled = false;
      function checkedComplete(result) {
        callbacks = [];
        if (completedCalled) {
          return;
        }
        completedCalled = true;
        complete(result);
      }
      callbacks.push(checkedComplete);
      function add(fn) {
        callbacks.push(fn);
      }
      function next2(result) {
        const popped = callbacks.pop() || checkedComplete;
        try {
          popped(result);
        } catch (_3) {
          checkedComplete(result);
        }
      }
      return { add, next: next2 };
    }
    var AsyncSession = class {
      constructor() {
        const { Session } = require("inspector");
        this._session = new Session();
      }
      configureAndConnect(onPause, captureAll) {
        this._session.connect();
        this._session.on("Debugger.paused", (event) => {
          onPause(event, () => {
            this._session.post("Debugger.resume");
          });
        });
        this._session.post("Debugger.enable");
        this._session.post("Debugger.setPauseOnExceptions", { state: captureAll ? "all" : "uncaught" });
      }
      getLocalVariables(objectId, complete) {
        this._getProperties(objectId, (props) => {
          const { add, next: next2 } = createCallbackList(complete);
          for (const prop of props) {
            if (_optionalChain([prop, "optionalAccess", (_22) => _22.value, "optionalAccess", (_3) => _3.objectId]) && _optionalChain([prop, "optionalAccess", (_4) => _4.value, "access", (_5) => _5.className]) === "Array") {
              const id = prop.value.objectId;
              add((vars) => this._unrollArray(id, prop.name, vars, next2));
            } else if (_optionalChain([prop, "optionalAccess", (_6) => _6.value, "optionalAccess", (_7) => _7.objectId]) && _optionalChain([prop, "optionalAccess", (_8) => _8.value, "optionalAccess", (_9) => _9.className]) === "Object") {
              const id = prop.value.objectId;
              add((vars) => this._unrollObject(id, prop.name, vars, next2));
            } else if (_optionalChain([prop, "optionalAccess", (_10) => _10.value, "optionalAccess", (_11) => _11.value]) || _optionalChain([prop, "optionalAccess", (_12) => _12.value, "optionalAccess", (_13) => _13.description])) {
              add((vars) => this._unrollOther(prop, vars, next2));
            }
          }
          next2({});
        });
      }
      _getProperties(objectId, next2) {
        this._session.post(
          "Runtime.getProperties",
          {
            objectId,
            ownProperties: true
          },
          (err, params) => {
            if (err) {
              next2([]);
            } else {
              next2(params.result);
            }
          }
        );
      }
      _unrollArray(objectId, name, vars, next2) {
        this._getProperties(objectId, (props) => {
          vars[name] = props.filter((v2) => v2.name !== "length" && !isNaN(parseInt(v2.name, 10))).sort((a2, b3) => parseInt(a2.name, 10) - parseInt(b3.name, 10)).map((v2) => _optionalChain([v2, "optionalAccess", (_14) => _14.value, "optionalAccess", (_15) => _15.value]));
          next2(vars);
        });
      }
      _unrollObject(objectId, name, vars, next2) {
        this._getProperties(objectId, (props) => {
          vars[name] = props.map((v2) => [v2.name, _optionalChain([v2, "optionalAccess", (_16) => _16.value, "optionalAccess", (_17) => _17.value])]).reduce((obj, [key, val]) => {
            obj[key] = val;
            return obj;
          }, {});
          next2(vars);
        });
      }
      _unrollOther(prop, vars, next2) {
        if (_optionalChain([prop, "optionalAccess", (_18) => _18.value, "optionalAccess", (_19) => _19.value])) {
          vars[prop.name] = prop.value.value;
        } else if (_optionalChain([prop, "optionalAccess", (_20) => _20.value, "optionalAccess", (_21) => _21.description]) && _optionalChain([prop, "optionalAccess", (_22) => _22.value, "optionalAccess", (_23) => _23.type]) !== "function") {
          vars[prop.name] = `<${prop.value.description}>`;
        }
        next2(vars);
      }
    };
    function tryNewAsyncSession() {
      try {
        return new AsyncSession();
      } catch (e2) {
        return void 0;
      }
    }
    function isAnonymous(name) {
      return name !== void 0 && ["", "?", "<anonymous>"].includes(name);
    }
    function functionNamesMatch(a2, b3) {
      return a2 === b3 || isAnonymous(a2) && isAnonymous(b3);
    }
    function hashFrames(frames) {
      if (frames === void 0) {
        return;
      }
      return frames.slice(-10).reduce((acc, frame) => `${acc},${frame.function},${frame.lineno},${frame.colno}`, "");
    }
    function hashFromStack(stackParser, stack) {
      if (stack === void 0) {
        return void 0;
      }
      return hashFrames(stackParser(stack, 1));
    }
    var LocalVariables = class {
      static __initStatic() {
        this.id = "LocalVariables";
      }
      __init() {
        this.name = LocalVariables.id;
      }
      __init2() {
        this._cachedFrames = new lru_map.LRUMap(20);
      }
      constructor(_options = {}, _session = tryNewAsyncSession()) {
        this._options = _options;
        this._session = _session;
        LocalVariables.prototype.__init.call(this);
        LocalVariables.prototype.__init2.call(this);
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        this._setup(addGlobalEventProcessor, _optionalChain([getCurrentHub, "call", (_24) => _24(), "access", (_25) => _25.getClient, "call", (_26) => _26(), "optionalAccess", (_27) => _27.getOptions, "call", (_28) => _28()]));
      }
      _setup(addGlobalEventProcessor, clientOptions) {
        if (this._session && _optionalChain([clientOptions, "optionalAccess", (_29) => _29.includeLocalVariables])) {
          const unsupportedNodeVersion = (nodeVersion.NODE_VERSION.major || 0) < 18;
          if (unsupportedNodeVersion) {
            utils.logger.log("The `LocalVariables` integration is only supported on Node >= v18.");
            return;
          }
          this._session.configureAndConnect(
            (ev, complete) => this._handlePaused(clientOptions.stackParser, ev, complete),
            !!this._options.captureAllExceptions
          );
          addGlobalEventProcessor(async (event) => this._addLocalVariables(event));
        }
      }
      _handlePaused(stackParser, { params: { reason, data, callFrames } }, complete) {
        if (reason !== "exception" && reason !== "promiseRejection") {
          complete();
          return;
        }
        const exceptionHash = hashFromStack(stackParser, _optionalChain([data, "optionalAccess", (_30) => _30.description]));
        if (exceptionHash == void 0) {
          complete();
          return;
        }
        const { add, next: next2 } = createCallbackList((frames) => {
          this._cachedFrames.set(exceptionHash, frames);
          complete();
        });
        for (let i = 0; i < Math.min(callFrames.length, 5); i++) {
          const { scopeChain, functionName, this: obj } = callFrames[i];
          const localScope = scopeChain.find((scope) => scope.type === "local");
          const fn = obj.className === "global" || !obj.className ? functionName : `${obj.className}.${functionName}`;
          if (_optionalChain([localScope, "optionalAccess", (_31) => _31.object, "access", (_32) => _32.objectId]) === void 0) {
            add((frames) => {
              frames[i] = { function: fn };
              next2(frames);
            });
          } else {
            const id = localScope.object.objectId;
            add(
              (frames) => _optionalChain([this, "access", (_33) => _33._session, "optionalAccess", (_34) => _34.getLocalVariables, "call", (_35) => _35(id, (vars) => {
                frames[i] = { function: fn, vars };
                next2(frames);
              })])
            );
          }
        }
        next2([]);
      }
      _addLocalVariables(event) {
        for (const exception of _optionalChain([event, "optionalAccess", (_36) => _36.exception, "optionalAccess", (_37) => _37.values]) || []) {
          this._addLocalVariablesToException(exception);
        }
        return event;
      }
      _addLocalVariablesToException(exception) {
        const hash = hashFrames(_optionalChain([exception, "optionalAccess", (_38) => _38.stacktrace, "optionalAccess", (_39) => _39.frames]));
        if (hash === void 0) {
          return;
        }
        const cachedFrames = this._cachedFrames.delete(hash);
        if (cachedFrames === void 0) {
          return;
        }
        const frameCount = _optionalChain([exception, "access", (_40) => _40.stacktrace, "optionalAccess", (_41) => _41.frames, "optionalAccess", (_42) => _42.length]) || 0;
        for (let i = 0; i < frameCount; i++) {
          const frameIndex = frameCount - i - 1;
          if (!_optionalChain([exception, "optionalAccess", (_43) => _43.stacktrace, "optionalAccess", (_44) => _44.frames, "optionalAccess", (_45) => _45[frameIndex]]) || !cachedFrames[i]) {
            break;
          }
          if (cachedFrames[i].vars === void 0 || exception.stacktrace.frames[frameIndex].in_app === false || !functionNamesMatch(exception.stacktrace.frames[frameIndex].function, cachedFrames[i].function)) {
            continue;
          }
          exception.stacktrace.frames[frameIndex].vars = cachedFrames[i].vars;
        }
      }
    };
    LocalVariables.__initStatic();
    exports.LocalVariables = LocalVariables;
    exports.createCallbackList = createCallbackList;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/undici/index.js
var require_undici = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/undici/index.js"(exports, module2) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var utils = require_cjs();
    var lru_map = require_lru();
    var nodeVersion = require_nodeVersion();
    var http = require_http2();
    exports.ChannelName = void 0;
    (function(ChannelName) {
      const RequestCreate = "undici:request:create";
      ChannelName["RequestCreate"] = RequestCreate;
      const RequestEnd = "undici:request:headers";
      ChannelName["RequestEnd"] = RequestEnd;
      const RequestError = "undici:request:error";
      ChannelName["RequestError"] = RequestError;
    })(exports.ChannelName || (exports.ChannelName = {}));
    var Undici = class {
      static __initStatic() {
        this.id = "Undici";
      }
      __init() {
        this.name = Undici.id;
      }
      __init2() {
        this._createSpanUrlMap = new lru_map.LRUMap(100);
      }
      __init3() {
        this._headersUrlMap = new lru_map.LRUMap(100);
      }
      constructor(_options = {}) {
        Undici.prototype.__init.call(this);
        Undici.prototype.__init2.call(this);
        Undici.prototype.__init3.call(this);
        Undici.prototype.__init4.call(this);
        Undici.prototype.__init5.call(this);
        Undici.prototype.__init6.call(this);
        this._options = {
          breadcrumbs: _options.breadcrumbs === void 0 ? true : _options.breadcrumbs,
          shouldCreateSpanForRequest: _options.shouldCreateSpanForRequest
        };
      }
      setupOnce(_addGlobalEventProcessor) {
        if (nodeVersion.NODE_VERSION.major && nodeVersion.NODE_VERSION.major < 16) {
          return;
        }
        let ds;
        try {
          ds = utils.dynamicRequire(module2, "diagnostics_channel");
        } catch (e2) {
        }
        if (!ds || !ds.subscribe) {
          return;
        }
        ds.subscribe(exports.ChannelName.RequestCreate, this._onRequestCreate);
        ds.subscribe(exports.ChannelName.RequestEnd, this._onRequestEnd);
        ds.subscribe(exports.ChannelName.RequestError, this._onRequestError);
      }
      _shouldCreateSpan(url2) {
        if (this._options.shouldCreateSpanForRequest === void 0) {
          return true;
        }
        const cachedDecision = this._createSpanUrlMap.get(url2);
        if (cachedDecision !== void 0) {
          return cachedDecision;
        }
        const decision = this._options.shouldCreateSpanForRequest(url2);
        this._createSpanUrlMap.set(url2, decision);
        return decision;
      }
      __init4() {
        this._onRequestCreate = (message) => {
          const hub = core2.getCurrentHub();
          if (!hub.getIntegration(Undici)) {
            return;
          }
          const { request } = message;
          const stringUrl = request.origin ? request.origin.toString() + request.path : request.path;
          if (http.isSentryRequest(stringUrl) || request.__sentry_span__ !== void 0) {
            return;
          }
          const client = hub.getClient();
          if (!client) {
            return;
          }
          const clientOptions = client.getOptions();
          const scope = hub.getScope();
          const parentSpan = scope.getSpan();
          const span = this._shouldCreateSpan(stringUrl) ? createRequestSpan(parentSpan, request, stringUrl) : void 0;
          if (span) {
            request.__sentry_span__ = span;
          }
          const shouldAttachTraceData = (url2) => {
            if (clientOptions.tracePropagationTargets === void 0) {
              return true;
            }
            const cachedDecision = this._headersUrlMap.get(url2);
            if (cachedDecision !== void 0) {
              return cachedDecision;
            }
            const decision = utils.stringMatchesSomePattern(url2, clientOptions.tracePropagationTargets);
            this._headersUrlMap.set(url2, decision);
            return decision;
          };
          if (shouldAttachTraceData(stringUrl)) {
            if (span) {
              const dynamicSamplingContext = _optionalChain([span, "optionalAccess", (_4) => _4.transaction, "optionalAccess", (_5) => _5.getDynamicSamplingContext, "call", (_6) => _6()]);
              const sentryBaggageHeader = utils.dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext);
              setHeadersOnRequest(request, span.toTraceparent(), sentryBaggageHeader);
            } else {
              const { traceId, sampled, dsc } = scope.getPropagationContext();
              const sentryTrace = utils.generateSentryTraceHeader(traceId, void 0, sampled);
              const dynamicSamplingContext = dsc || core2.getDynamicSamplingContextFromClient(traceId, client, scope);
              const sentryBaggageHeader = utils.dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext);
              setHeadersOnRequest(request, sentryTrace, sentryBaggageHeader);
            }
          }
        };
      }
      __init5() {
        this._onRequestEnd = (message) => {
          const hub = core2.getCurrentHub();
          if (!hub.getIntegration(Undici)) {
            return;
          }
          const { request, response } = message;
          const stringUrl = request.origin ? request.origin.toString() + request.path : request.path;
          if (http.isSentryRequest(stringUrl)) {
            return;
          }
          const span = request.__sentry_span__;
          if (span) {
            span.setHttpStatus(response.statusCode);
            span.finish();
          }
          if (this._options.breadcrumbs) {
            hub.addBreadcrumb(
              {
                category: "http",
                data: {
                  method: request.method,
                  status_code: response.statusCode,
                  url: stringUrl
                },
                type: "http"
              },
              {
                event: "response",
                request,
                response
              }
            );
          }
        };
      }
      __init6() {
        this._onRequestError = (message) => {
          const hub = core2.getCurrentHub();
          if (!hub.getIntegration(Undici)) {
            return;
          }
          const { request } = message;
          const stringUrl = request.origin ? request.origin.toString() + request.path : request.path;
          if (http.isSentryRequest(stringUrl)) {
            return;
          }
          const span = request.__sentry_span__;
          if (span) {
            span.setStatus("internal_error");
            span.finish();
          }
          if (this._options.breadcrumbs) {
            hub.addBreadcrumb(
              {
                category: "http",
                data: {
                  method: request.method,
                  url: stringUrl
                },
                level: "error",
                type: "http"
              },
              {
                event: "error",
                request
              }
            );
          }
        };
      }
    };
    Undici.__initStatic();
    function setHeadersOnRequest(request, sentryTrace, sentryBaggageHeader) {
      if (request.__sentry_has_headers__) {
        return;
      }
      request.addHeader("sentry-trace", sentryTrace);
      if (sentryBaggageHeader) {
        request.addHeader("baggage", sentryBaggageHeader);
      }
      request.__sentry_has_headers__ = true;
    }
    function createRequestSpan(activeSpan, request, stringUrl) {
      const url2 = utils.parseUrl(stringUrl);
      const method = request.method || "GET";
      const data = {
        "http.method": method
      };
      if (url2.search) {
        data["http.query"] = url2.search;
      }
      if (url2.hash) {
        data["http.fragment"] = url2.hash;
      }
      return _optionalChain([activeSpan, "optionalAccess", (_7) => _7.startChild, "call", (_8) => _8({
        op: "http.client",
        origin: "auto.http.node.undici",
        description: `${method} ${utils.getSanitizedUrlString(url2)}`,
        data
      })]);
    }
    exports.Undici = Undici;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/module.js
var require_module = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/module.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var path6 = require("path");
    var isWindowsPlatform = path6.sep === "\\";
    function normalizeWindowsPath(path7) {
      return path7.replace(/^[A-Z]:/, "").replace(/\\/g, "/");
    }
    function getModuleFromFilename(filename, normalizeWindowsPathSeparator = isWindowsPlatform) {
      if (!filename) {
        return;
      }
      const normalizedFilename = normalizeWindowsPathSeparator ? normalizeWindowsPath(filename) : filename;
      let { root, dir, base: basename, ext } = path6.posix.parse(normalizedFilename);
      const base = require && require.main && require.main.filename && dir || global.process.cwd();
      const normalizedBase = `${base}/`;
      let file = basename;
      if (ext === ".js") {
        file = file.slice(0, file.length - ".js".length);
      }
      if (!root && !dir) {
        dir = ".";
      }
      let n = dir.lastIndexOf("/node_modules/");
      if (n > -1) {
        return `${dir.slice(n + 14).replace(/\//g, ".")}:${file}`;
      }
      n = `${dir}/`.lastIndexOf(normalizedBase, 0);
      if (n === 0) {
        let moduleName = dir.slice(normalizedBase.length).replace(/\//g, ".");
        if (moduleName) {
          moduleName += ":";
        }
        moduleName += file;
        return moduleName;
      }
      return file;
    }
    exports.getModuleFromFilename = getModuleFromFilename;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/sdk.js
var require_sdk2 = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/sdk.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var utils = require_cjs();
    var index$1 = require_async();
    var client = require_client();
    var console2 = require_console();
    var http = require_http3();
    var onuncaughtexception = require_onuncaughtexception();
    var onunhandledrejection = require_onunhandledrejection();
    var linkederrors = require_linkederrors();
    var modules = require_modules();
    var contextlines = require_contextlines();
    var context = require_context();
    var requestdata = require_requestdata3();
    var localvariables = require_localvariables();
    var index = require_undici();
    var module$1 = require_module();
    var http$1 = require_http();
    var defaultIntegrations = [
      new core2.Integrations.InboundFilters(),
      new core2.Integrations.FunctionToString(),
      new console2.Console(),
      new http.Http(),
      new index.Undici(),
      new onuncaughtexception.OnUncaughtException(),
      new onunhandledrejection.OnUnhandledRejection(),
      new contextlines.ContextLines(),
      new localvariables.LocalVariables(),
      new context.Context(),
      new modules.Modules(),
      new requestdata.RequestData(),
      new linkederrors.LinkedErrors()
    ];
    function init2(options = {}) {
      const carrier = core2.getMainCarrier();
      index$1.setNodeAsyncContextStrategy();
      const autoloadedIntegrations = _optionalChain([carrier, "access", (_3) => _3.__SENTRY__, "optionalAccess", (_22) => _22.integrations]) || [];
      options.defaultIntegrations = options.defaultIntegrations === false ? [] : [
        ...Array.isArray(options.defaultIntegrations) ? options.defaultIntegrations : defaultIntegrations,
        ...autoloadedIntegrations
      ];
      if (options.dsn === void 0 && process.env.SENTRY_DSN) {
        options.dsn = process.env.SENTRY_DSN;
      }
      const sentryTracesSampleRate = process.env.SENTRY_TRACES_SAMPLE_RATE;
      if (options.tracesSampleRate === void 0 && sentryTracesSampleRate) {
        const tracesSampleRate = parseFloat(sentryTracesSampleRate);
        if (isFinite(tracesSampleRate)) {
          options.tracesSampleRate = tracesSampleRate;
        }
      }
      if (options.release === void 0) {
        const detectedRelease = getSentryRelease();
        if (detectedRelease !== void 0) {
          options.release = detectedRelease;
        } else {
          options.autoSessionTracking = false;
        }
      }
      if (options.environment === void 0 && process.env.SENTRY_ENVIRONMENT) {
        options.environment = process.env.SENTRY_ENVIRONMENT;
      }
      if (options.autoSessionTracking === void 0 && options.dsn !== void 0) {
        options.autoSessionTracking = true;
      }
      if (options.instrumenter === void 0) {
        options.instrumenter = "sentry";
      }
      const clientOptions = {
        ...options,
        stackParser: utils.stackParserFromStackParserOptions(options.stackParser || defaultStackParser2),
        integrations: core2.getIntegrationsToSetup(options),
        transport: options.transport || http$1.makeNodeTransport
      };
      core2.initAndBind(options.clientClass || client.NodeClient, clientOptions);
      if (options.autoSessionTracking) {
        startSessionTracking();
      }
      updateScopeFromEnvVariables();
    }
    function isAutoSessionTrackingEnabled(client2) {
      if (client2 === void 0) {
        return false;
      }
      const clientOptions = client2 && client2.getOptions();
      if (clientOptions && clientOptions.autoSessionTracking !== void 0) {
        return clientOptions.autoSessionTracking;
      }
      return false;
    }
    function getSentryRelease(fallback) {
      if (process.env.SENTRY_RELEASE) {
        return process.env.SENTRY_RELEASE;
      }
      if (utils.GLOBAL_OBJ.SENTRY_RELEASE && utils.GLOBAL_OBJ.SENTRY_RELEASE.id) {
        return utils.GLOBAL_OBJ.SENTRY_RELEASE.id;
      }
      return process.env.GITHUB_SHA || process.env.COMMIT_REF || process.env.VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_GITHUB_COMMIT_SHA || process.env.VERCEL_GITLAB_COMMIT_SHA || process.env.VERCEL_BITBUCKET_COMMIT_SHA || process.env.ZEIT_GITHUB_COMMIT_SHA || process.env.ZEIT_GITLAB_COMMIT_SHA || process.env.ZEIT_BITBUCKET_COMMIT_SHA || fallback;
    }
    var defaultStackParser2 = utils.createStackParser(utils.nodeStackLineParser(module$1.getModuleFromFilename));
    function startSessionTracking() {
      const hub = core2.getCurrentHub();
      hub.startSession();
      process.on("beforeExit", () => {
        const session = hub.getScope().getSession();
        const terminalStates = ["exited", "crashed"];
        if (session && !terminalStates.includes(session.status))
          hub.endSession();
      });
    }
    function updateScopeFromEnvVariables() {
      const sentryUseEnvironment = (process.env.SENTRY_USE_ENVIRONMENT || "").toLowerCase();
      if (!["false", "n", "no", "off", "0"].includes(sentryUseEnvironment)) {
        const sentryTraceEnv = process.env.SENTRY_TRACE;
        const baggageEnv = process.env.SENTRY_BAGGAGE;
        const { propagationContext } = utils.tracingContextFromHeaders(sentryTraceEnv, baggageEnv);
        core2.getCurrentHub().getScope().setPropagationContext(propagationContext);
      }
    }
    exports.defaultIntegrations = defaultIntegrations;
    exports.defaultStackParser = defaultStackParser2;
    exports.getSentryRelease = getSentryRelease;
    exports.init = init2;
    exports.isAutoSessionTrackingEnabled = isAutoSessionTrackingEnabled;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/utils.js
var require_utils3 = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/utils.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs6 = require("fs");
    var path6 = require("path");
    function deepReadDirSync(targetDir) {
      const targetDirAbsPath = path6.resolve(targetDir);
      if (!fs6.existsSync(targetDirAbsPath)) {
        throw new Error(`Cannot read contents of ${targetDirAbsPath}. Directory does not exist.`);
      }
      if (!fs6.statSync(targetDirAbsPath).isDirectory()) {
        throw new Error(`Cannot read contents of ${targetDirAbsPath}, because it is not a directory.`);
      }
      const deepReadCurrentDir = (currentDirAbsPath) => {
        return fs6.readdirSync(currentDirAbsPath).reduce((absPaths, itemName) => {
          const itemAbsPath = path6.join(currentDirAbsPath, itemName);
          if (fs6.statSync(itemAbsPath).isDirectory()) {
            return absPaths.concat(deepReadCurrentDir(itemAbsPath));
          }
          absPaths.push(itemAbsPath);
          return absPaths;
        }, []);
      };
      return deepReadCurrentDir(targetDirAbsPath).map((absPath) => path6.relative(targetDirAbsPath, absPath));
    }
    exports.deepReadDirSync = deepReadDirSync;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/requestDataDeprecated.js
var require_requestDataDeprecated = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/requestDataDeprecated.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var requestdata = require_requestdata2();
    function extractRequestData(req, keys) {
      return requestdata.extractRequestData(req, { include: keys });
    }
    function parseRequest(event, req, options = {}) {
      return requestdata.addRequestDataToEvent(event, req, { include: options });
    }
    exports.extractRequestData = extractRequestData;
    exports.parseRequest = parseRequest;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/handlers.js
var require_handlers = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/handlers.js"(exports) {
    var {
      _optionalChain
    } = require_buildPolyfills();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var utils = require_cjs();
    var requestdata = require_requestdata2();
    var sdk = require_sdk2();
    var requestDataDeprecated = require_requestDataDeprecated();
    function tracingHandler() {
      return function sentryTracingMiddleware(req, res, next2) {
        const hub = core2.getCurrentHub();
        const options = _optionalChain([hub, "access", (_3) => _3.getClient, "call", (_22) => _22(), "optionalAccess", (_3) => _3.getOptions, "call", (_4) => _4()]);
        if (!options || options.instrumenter !== "sentry" || _optionalChain([req, "access", (_5) => _5.method, "optionalAccess", (_6) => _6.toUpperCase, "call", (_7) => _7()]) === "OPTIONS" || _optionalChain([req, "access", (_8) => _8.method, "optionalAccess", (_9) => _9.toUpperCase, "call", (_10) => _10()]) === "HEAD") {
          return next2();
        }
        const sentryTrace = req.headers && utils.isString(req.headers["sentry-trace"]) ? req.headers["sentry-trace"] : void 0;
        const baggage = _optionalChain([req, "access", (_11) => _11.headers, "optionalAccess", (_12) => _12.baggage]);
        const { traceparentData, dynamicSamplingContext, propagationContext } = utils.tracingContextFromHeaders(
          sentryTrace,
          baggage
        );
        hub.getScope().setPropagationContext(propagationContext);
        if (!core2.hasTracingEnabled(options)) {
          return next2();
        }
        const [name, source] = utils.extractPathForTransaction(req, { path: true, method: true });
        const transaction = core2.startTransaction(
          {
            name,
            op: "http.server",
            origin: "auto.http.node.tracingHandler",
            ...traceparentData,
            metadata: {
              dynamicSamplingContext: traceparentData && !dynamicSamplingContext ? {} : dynamicSamplingContext,
              request: req,
              source
            }
          },
          { request: requestdata.extractRequestData(req) }
        );
        hub.configureScope((scope) => {
          scope.setSpan(transaction);
        });
        res.__sentry_transaction = transaction;
        res.once("finish", () => {
          setImmediate(() => {
            utils.addRequestDataToTransaction(transaction, req);
            transaction.setHttpStatus(res.statusCode);
            transaction.finish();
          });
        });
        next2();
      };
    }
    function convertReqHandlerOptsToAddReqDataOpts(reqHandlerOptions = {}) {
      let addRequestDataOptions;
      if ("include" in reqHandlerOptions) {
        addRequestDataOptions = { include: reqHandlerOptions.include };
      } else {
        const { ip, request, transaction, user } = reqHandlerOptions;
        if (ip || request || transaction || user) {
          addRequestDataOptions = { include: utils.dropUndefinedKeys({ ip, request, transaction, user }) };
        }
      }
      return addRequestDataOptions;
    }
    function requestHandler(options) {
      const requestDataOptions = convertReqHandlerOptsToAddReqDataOpts(options);
      const currentHub = core2.getCurrentHub();
      const client = currentHub.getClient();
      if (client && sdk.isAutoSessionTrackingEnabled(client)) {
        client.initSessionFlusher();
        const scope = currentHub.getScope();
        if (scope.getSession()) {
          scope.setSession();
        }
      }
      return function sentryRequestMiddleware(req, res, next2) {
        if (options && options.flushTimeout && options.flushTimeout > 0) {
          const _end = res.end;
          res.end = function(chunk, encoding, cb) {
            void core2.flush(options.flushTimeout).then(() => {
              _end.call(this, chunk, encoding, cb);
            }).then(null, (e2) => {
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.error(e2);
              _end.call(this, chunk, encoding, cb);
            });
          };
        }
        core2.runWithAsyncContext(() => {
          const currentHub2 = core2.getCurrentHub();
          currentHub2.configureScope((scope) => {
            scope.setSDKProcessingMetadata({
              request: req,
              requestDataOptionsFromExpressHandler: requestDataOptions
            });
            const client2 = currentHub2.getClient();
            if (sdk.isAutoSessionTrackingEnabled(client2)) {
              const scope2 = currentHub2.getScope();
              scope2.setRequestSession({ status: "ok" });
            }
          });
          res.once("finish", () => {
            const client2 = currentHub2.getClient();
            if (sdk.isAutoSessionTrackingEnabled(client2)) {
              setImmediate(() => {
                if (client2 && client2._captureRequestSession) {
                  client2._captureRequestSession();
                }
              });
            }
          });
          next2();
        });
      };
    }
    function getStatusCodeFromResponse(error) {
      const statusCode = error.status || error.statusCode || error.status_code || error.output && error.output.statusCode;
      return statusCode ? parseInt(statusCode, 10) : 500;
    }
    function defaultShouldHandleError(error) {
      const status = getStatusCodeFromResponse(error);
      return status >= 500;
    }
    function errorHandler(options) {
      return function sentryErrorMiddleware(error, _req, res, next2) {
        const shouldHandleError = options && options.shouldHandleError || defaultShouldHandleError;
        if (shouldHandleError(error)) {
          core2.withScope((_scope) => {
            _scope.setSDKProcessingMetadata({ request: _req });
            const transaction = res.__sentry_transaction;
            if (transaction && _scope.getSpan() === void 0) {
              _scope.setSpan(transaction);
            }
            const client = core2.getCurrentHub().getClient();
            if (client && sdk.isAutoSessionTrackingEnabled(client)) {
              const isSessionAggregatesMode = client._sessionFlusher !== void 0;
              if (isSessionAggregatesMode) {
                const requestSession = _scope.getRequestSession();
                if (requestSession && requestSession.status !== void 0) {
                  requestSession.status = "crashed";
                }
              }
            }
            _scope.addEventProcessor((event) => {
              utils.addExceptionMechanism(event, { type: "middleware", handled: false });
              return event;
            });
            const eventId = core2.captureException(error);
            res.sentry = eventId;
            next2(error);
          });
          return;
        }
        next2(error);
      };
    }
    function trpcMiddleware(options = {}) {
      return function({ path: path6, type, next: next2, rawInput }) {
        const hub = core2.getCurrentHub();
        const clientOptions = _optionalChain([hub, "access", (_13) => _13.getClient, "call", (_14) => _14(), "optionalAccess", (_15) => _15.getOptions, "call", (_16) => _16()]);
        const sentryTransaction = hub.getScope().getTransaction();
        if (sentryTransaction) {
          sentryTransaction.setName(`trpc/${path6}`, "route");
          sentryTransaction.op = "rpc.server";
          const trpcContext = {
            procedure_type: type
          };
          if (options.attachRpcInput !== void 0 ? options.attachRpcInput : _optionalChain([clientOptions, "optionalAccess", (_17) => _17.sendDefaultPii])) {
            trpcContext.input = utils.normalize(rawInput);
          }
          sentryTransaction.setContext("trpc", trpcContext);
        }
        return next2();
      };
    }
    exports.extractRequestData = requestDataDeprecated.extractRequestData;
    exports.parseRequest = requestDataDeprecated.parseRequest;
    exports.errorHandler = errorHandler;
    exports.requestHandler = requestHandler;
    exports.tracingHandler = tracingHandler;
    exports.trpcMiddleware = trpcMiddleware;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/index.js
var require_integrations2 = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/integrations/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var console2 = require_console();
    var http = require_http3();
    var onuncaughtexception = require_onuncaughtexception();
    var onunhandledrejection = require_onunhandledrejection();
    var linkederrors = require_linkederrors();
    var modules = require_modules();
    var contextlines = require_contextlines();
    var context = require_context();
    var requestdata = require_requestdata3();
    var localvariables = require_localvariables();
    var index = require_undici();
    exports.Console = console2.Console;
    exports.Http = http.Http;
    exports.OnUncaughtException = onuncaughtexception.OnUncaughtException;
    exports.OnUnhandledRejection = onunhandledrejection.OnUnhandledRejection;
    exports.LinkedErrors = linkederrors.LinkedErrors;
    exports.Modules = modules.Modules;
    exports.ContextLines = contextlines.ContextLines;
    exports.Context = context.Context;
    exports.RequestData = requestdata.RequestData;
    exports.LocalVariables = localvariables.LocalVariables;
    exports.Undici = index.Undici;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/tracing/integrations.js
var require_integrations3 = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/tracing/integrations.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var tracing = require_cjs3();
    exports.Apollo = tracing.Apollo;
    exports.Express = tracing.Express;
    exports.GraphQL = tracing.GraphQL;
    exports.Mongo = tracing.Mongo;
    exports.Mysql = tracing.Mysql;
    exports.Postgres = tracing.Postgres;
    exports.Prisma = tracing.Prisma;
  }
});

// ../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/index.js
var require_cjs4 = __commonJS({
  "../../node_modules/.pnpm/@sentry+node@7.69.0/node_modules/@sentry/node/cjs/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var core2 = require_cjs2();
    var index = require_tracing2();
    var client = require_client();
    var http = require_http();
    var sdk = require_sdk2();
    var requestdata = require_requestdata2();
    var utils = require_utils3();
    var module$1 = require_module();
    var handlers = require_handlers();
    var index$1 = require_integrations2();
    var integrations = require_integrations3();
    var INTEGRATIONS = {
      ...core2.Integrations,
      ...index$1,
      ...integrations
    };
    exports.Hub = core2.Hub;
    exports.SDK_VERSION = core2.SDK_VERSION;
    exports.Scope = core2.Scope;
    exports.addBreadcrumb = core2.addBreadcrumb;
    exports.addGlobalEventProcessor = core2.addGlobalEventProcessor;
    exports.captureCheckIn = core2.captureCheckIn;
    exports.captureEvent = core2.captureEvent;
    exports.captureException = core2.captureException;
    exports.captureMessage = core2.captureMessage;
    exports.close = core2.close;
    exports.configureScope = core2.configureScope;
    exports.createTransport = core2.createTransport;
    exports.extractTraceparentData = core2.extractTraceparentData;
    exports.flush = core2.flush;
    exports.getActiveSpan = core2.getActiveSpan;
    exports.getActiveTransaction = core2.getActiveTransaction;
    exports.getCurrentHub = core2.getCurrentHub;
    exports.getHubFromCarrier = core2.getHubFromCarrier;
    exports.lastEventId = core2.lastEventId;
    exports.makeMain = core2.makeMain;
    exports.runWithAsyncContext = core2.runWithAsyncContext;
    exports.setContext = core2.setContext;
    exports.setExtra = core2.setExtra;
    exports.setExtras = core2.setExtras;
    exports.setMeasurement = core2.setMeasurement;
    exports.setTag = core2.setTag;
    exports.setTags = core2.setTags;
    exports.setUser = core2.setUser;
    exports.spanStatusfromHttpCode = core2.spanStatusfromHttpCode;
    exports.startActiveSpan = core2.startActiveSpan;
    exports.startInactiveSpan = core2.startInactiveSpan;
    exports.startSpan = core2.startSpan;
    exports.startSpanManual = core2.startSpanManual;
    exports.startTransaction = core2.startTransaction;
    exports.trace = core2.trace;
    exports.withScope = core2.withScope;
    exports.autoDiscoverNodePerformanceMonitoringIntegrations = index.autoDiscoverNodePerformanceMonitoringIntegrations;
    exports.NodeClient = client.NodeClient;
    exports.makeNodeTransport = http.makeNodeTransport;
    exports.defaultIntegrations = sdk.defaultIntegrations;
    exports.defaultStackParser = sdk.defaultStackParser;
    exports.getSentryRelease = sdk.getSentryRelease;
    exports.init = sdk.init;
    exports.DEFAULT_USER_INCLUDES = requestdata.DEFAULT_USER_INCLUDES;
    exports.addRequestDataToEvent = requestdata.addRequestDataToEvent;
    exports.extractRequestData = requestdata.extractRequestData;
    exports.deepReadDirSync = utils.deepReadDirSync;
    exports.getModuleFromFilename = module$1.getModuleFromFilename;
    exports.Handlers = handlers;
    exports.Integrations = INTEGRATIONS;
  }
});

// ../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/captureconsole.js
var require_captureconsole = __commonJS({
  "../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/captureconsole.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var CaptureConsole2 = class {
      static __initStatic() {
        this.id = "CaptureConsole";
      }
      constructor(options = {}) {
        this.name = CaptureConsole2.id;
        this._levels = options.levels || utils.CONSOLE_LEVELS;
      }
      setupOnce(_3, getCurrentHub) {
        if (!("console" in utils.GLOBAL_OBJ)) {
          return;
        }
        const levels = this._levels;
        utils.addInstrumentationHandler("console", ({ args, level }) => {
          if (!levels.includes(level)) {
            return;
          }
          const hub = getCurrentHub();
          if (!hub.getIntegration(CaptureConsole2)) {
            return;
          }
          consoleHandler(hub, args, level);
        });
      }
    };
    CaptureConsole2.__initStatic();
    function consoleHandler(hub, args, level) {
      hub.withScope((scope) => {
        scope.setLevel(utils.severityLevelFromString(level));
        scope.setExtra("arguments", args);
        scope.addEventProcessor((event) => {
          event.logger = "console";
          utils.addExceptionMechanism(event, {
            handled: false,
            type: "console"
          });
          return event;
        });
        let message = utils.safeJoin(args, " ");
        const error = args.find((arg) => arg instanceof Error);
        if (level === "assert") {
          if (args[0] === false) {
            message = `Assertion failed: ${utils.safeJoin(args.slice(1), " ") || "console.assert"}`;
            scope.setExtra("arguments", args.slice(1));
            hub.captureMessage(message);
          }
        } else if (level === "error" && error) {
          hub.captureException(error);
        } else {
          hub.captureMessage(message);
        }
      });
    }
    exports.CaptureConsole = CaptureConsole2;
  }
});

// ../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/debug.js
var require_debug = __commonJS({
  "../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/debug.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var Debug = class {
      static __initStatic() {
        this.id = "Debug";
      }
      constructor(options) {
        this.name = Debug.id;
        this._options = {
          debugger: false,
          stringify: false,
          ...options
        };
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        addGlobalEventProcessor((event, hint) => {
          const self2 = getCurrentHub().getIntegration(Debug);
          if (self2) {
            if (self2._options.debugger) {
              debugger;
            }
            utils.consoleSandbox(() => {
              if (self2._options.stringify) {
                console.log(JSON.stringify(event, null, 2));
                if (Object.keys(hint).length) {
                  console.log(JSON.stringify(hint, null, 2));
                }
              } else {
                console.log(event);
                if (Object.keys(hint).length) {
                  console.log(hint);
                }
              }
            });
          }
          return event;
        });
      }
    };
    Debug.__initStatic();
    exports.Debug = Debug;
  }
});

// ../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/dedupe.js
var require_dedupe = __commonJS({
  "../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/dedupe.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var Dedupe = class {
      static __initStatic() {
        this.id = "Dedupe";
      }
      constructor() {
        this.name = Dedupe.id;
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        const eventProcessor = (currentEvent) => {
          if (currentEvent.type) {
            return currentEvent;
          }
          const self2 = getCurrentHub().getIntegration(Dedupe);
          if (self2) {
            try {
              if (_shouldDropEvent(currentEvent, self2._previousEvent)) {
                (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("Event dropped due to being a duplicate of previously captured event.");
                return null;
              }
            } catch (_oO) {
              return self2._previousEvent = currentEvent;
            }
            return self2._previousEvent = currentEvent;
          }
          return currentEvent;
        };
        eventProcessor.id = this.name;
        addGlobalEventProcessor(eventProcessor);
      }
    };
    Dedupe.__initStatic();
    function _shouldDropEvent(currentEvent, previousEvent) {
      if (!previousEvent) {
        return false;
      }
      if (_isSameMessageEvent(currentEvent, previousEvent)) {
        return true;
      }
      if (_isSameExceptionEvent(currentEvent, previousEvent)) {
        return true;
      }
      return false;
    }
    function _isSameMessageEvent(currentEvent, previousEvent) {
      const currentMessage = currentEvent.message;
      const previousMessage = previousEvent.message;
      if (!currentMessage && !previousMessage) {
        return false;
      }
      if (currentMessage && !previousMessage || !currentMessage && previousMessage) {
        return false;
      }
      if (currentMessage !== previousMessage) {
        return false;
      }
      if (!_isSameFingerprint(currentEvent, previousEvent)) {
        return false;
      }
      if (!_isSameStacktrace(currentEvent, previousEvent)) {
        return false;
      }
      return true;
    }
    function _isSameExceptionEvent(currentEvent, previousEvent) {
      const previousException = _getExceptionFromEvent(previousEvent);
      const currentException = _getExceptionFromEvent(currentEvent);
      if (!previousException || !currentException) {
        return false;
      }
      if (previousException.type !== currentException.type || previousException.value !== currentException.value) {
        return false;
      }
      if (!_isSameFingerprint(currentEvent, previousEvent)) {
        return false;
      }
      if (!_isSameStacktrace(currentEvent, previousEvent)) {
        return false;
      }
      return true;
    }
    function _isSameStacktrace(currentEvent, previousEvent) {
      let currentFrames = _getFramesFromEvent(currentEvent);
      let previousFrames = _getFramesFromEvent(previousEvent);
      if (!currentFrames && !previousFrames) {
        return true;
      }
      if (currentFrames && !previousFrames || !currentFrames && previousFrames) {
        return false;
      }
      currentFrames = currentFrames;
      previousFrames = previousFrames;
      if (previousFrames.length !== currentFrames.length) {
        return false;
      }
      for (let i = 0; i < previousFrames.length; i++) {
        const frameA = previousFrames[i];
        const frameB = currentFrames[i];
        if (frameA.filename !== frameB.filename || frameA.lineno !== frameB.lineno || frameA.colno !== frameB.colno || frameA.function !== frameB.function) {
          return false;
        }
      }
      return true;
    }
    function _isSameFingerprint(currentEvent, previousEvent) {
      let currentFingerprint = currentEvent.fingerprint;
      let previousFingerprint = previousEvent.fingerprint;
      if (!currentFingerprint && !previousFingerprint) {
        return true;
      }
      if (currentFingerprint && !previousFingerprint || !currentFingerprint && previousFingerprint) {
        return false;
      }
      currentFingerprint = currentFingerprint;
      previousFingerprint = previousFingerprint;
      try {
        return !!(currentFingerprint.join("") === previousFingerprint.join(""));
      } catch (_oO) {
        return false;
      }
    }
    function _getExceptionFromEvent(event) {
      return event.exception && event.exception.values && event.exception.values[0];
    }
    function _getFramesFromEvent(event) {
      const exception = event.exception;
      if (exception) {
        try {
          return exception.values[0].stacktrace.frames;
        } catch (_oO) {
          return void 0;
        }
      }
      return void 0;
    }
    exports.Dedupe = Dedupe;
    exports._shouldDropEvent = _shouldDropEvent;
  }
});

// ../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/extraerrordata.js
var require_extraerrordata = __commonJS({
  "../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/extraerrordata.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var ExtraErrorData = class {
      static __initStatic() {
        this.id = "ExtraErrorData";
      }
      constructor(options) {
        this.name = ExtraErrorData.id;
        this._options = {
          depth: 3,
          ...options
        };
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        addGlobalEventProcessor((event, hint) => {
          const self2 = getCurrentHub().getIntegration(ExtraErrorData);
          if (!self2) {
            return event;
          }
          return self2.enhanceEventWithErrorData(event, hint);
        });
      }
      enhanceEventWithErrorData(event, hint = {}) {
        if (!hint.originalException || !utils.isError(hint.originalException)) {
          return event;
        }
        const exceptionName = hint.originalException.name || hint.originalException.constructor.name;
        const errorData = this._extractErrorData(hint.originalException);
        if (errorData) {
          const contexts = {
            ...event.contexts
          };
          const normalizedErrorData = utils.normalize(errorData, this._options.depth);
          if (utils.isPlainObject(normalizedErrorData)) {
            utils.addNonEnumerableProperty(normalizedErrorData, "__sentry_skip_normalization__", true);
            contexts[exceptionName] = normalizedErrorData;
          }
          return {
            ...event,
            contexts
          };
        }
        return event;
      }
      _extractErrorData(error) {
        try {
          const nativeKeys = [
            "name",
            "message",
            "stack",
            "line",
            "column",
            "fileName",
            "lineNumber",
            "columnNumber",
            "toJSON"
          ];
          const extraErrorInfo = {};
          for (const key of Object.keys(error)) {
            if (nativeKeys.indexOf(key) !== -1) {
              continue;
            }
            const value = error[key];
            extraErrorInfo[key] = utils.isError(value) ? value.toString() : value;
          }
          if (typeof error.toJSON === "function") {
            const serializedError = error.toJSON();
            for (const key of Object.keys(serializedError)) {
              const value = serializedError[key];
              extraErrorInfo[key] = utils.isError(value) ? value.toString() : value;
            }
          }
          return extraErrorInfo;
        } catch (oO) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.error("Unable to extract extra data from the Error object:", oO);
        }
        return null;
      }
    };
    ExtraErrorData.__initStatic();
    exports.ExtraErrorData = ExtraErrorData;
  }
});

// ../../node_modules/.pnpm/localforage@1.10.0/node_modules/localforage/dist/localforage.js
var require_localforage = __commonJS({
  "../../node_modules/.pnpm/localforage@1.10.0/node_modules/localforage/dist/localforage.js"(exports, module2) {
    (function(f3) {
      if (typeof exports === "object" && typeof module2 !== "undefined") {
        module2.exports = f3();
      } else if (typeof define === "function" && define.amd) {
        define([], f3);
      } else {
        var g2;
        if (typeof window !== "undefined") {
          g2 = window;
        } else if (typeof global !== "undefined") {
          g2 = global;
        } else if (typeof self !== "undefined") {
          g2 = self;
        } else {
          g2 = this;
        }
        g2.localforage = f3();
      }
    })(function() {
      var define2, module3, exports2;
      return function e2(t, n, r2) {
        function s(o3, u) {
          if (!n[o3]) {
            if (!t[o3]) {
              var a2 = typeof require == "function" && require;
              if (!u && a2)
                return a2(o3, true);
              if (i)
                return i(o3, true);
              var f3 = new Error("Cannot find module '" + o3 + "'");
              throw f3.code = "MODULE_NOT_FOUND", f3;
            }
            var l = n[o3] = { exports: {} };
            t[o3][0].call(l.exports, function(e3) {
              var n2 = t[o3][1][e3];
              return s(n2 ? n2 : e3);
            }, l, l.exports, e2, t, n, r2);
          }
          return n[o3].exports;
        }
        var i = typeof require == "function" && require;
        for (var o2 = 0; o2 < r2.length; o2++)
          s(r2[o2]);
        return s;
      }({ 1: [function(_dereq_, module4, exports3) {
        (function(global2) {
          "use strict";
          var Mutation = global2.MutationObserver || global2.WebKitMutationObserver;
          var scheduleDrain;
          {
            if (Mutation) {
              var called = 0;
              var observer = new Mutation(nextTick);
              var element = global2.document.createTextNode("");
              observer.observe(element, {
                characterData: true
              });
              scheduleDrain = function() {
                element.data = called = ++called % 2;
              };
            } else if (!global2.setImmediate && typeof global2.MessageChannel !== "undefined") {
              var channel = new global2.MessageChannel();
              channel.port1.onmessage = nextTick;
              scheduleDrain = function() {
                channel.port2.postMessage(0);
              };
            } else if ("document" in global2 && "onreadystatechange" in global2.document.createElement("script")) {
              scheduleDrain = function() {
                var scriptEl = global2.document.createElement("script");
                scriptEl.onreadystatechange = function() {
                  nextTick();
                  scriptEl.onreadystatechange = null;
                  scriptEl.parentNode.removeChild(scriptEl);
                  scriptEl = null;
                };
                global2.document.documentElement.appendChild(scriptEl);
              };
            } else {
              scheduleDrain = function() {
                setTimeout(nextTick, 0);
              };
            }
          }
          var draining;
          var queue = [];
          function nextTick() {
            draining = true;
            var i, oldQueue;
            var len = queue.length;
            while (len) {
              oldQueue = queue;
              queue = [];
              i = -1;
              while (++i < len) {
                oldQueue[i]();
              }
              len = queue.length;
            }
            draining = false;
          }
          module4.exports = immediate;
          function immediate(task) {
            if (queue.push(task) === 1 && !draining) {
              scheduleDrain();
            }
          }
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}], 2: [function(_dereq_, module4, exports3) {
        "use strict";
        var immediate = _dereq_(1);
        function INTERNAL() {
        }
        var handlers = {};
        var REJECTED = ["REJECTED"];
        var FULFILLED = ["FULFILLED"];
        var PENDING = ["PENDING"];
        module4.exports = Promise2;
        function Promise2(resolver) {
          if (typeof resolver !== "function") {
            throw new TypeError("resolver must be a function");
          }
          this.state = PENDING;
          this.queue = [];
          this.outcome = void 0;
          if (resolver !== INTERNAL) {
            safelyResolveThenable(this, resolver);
          }
        }
        Promise2.prototype["catch"] = function(onRejected) {
          return this.then(null, onRejected);
        };
        Promise2.prototype.then = function(onFulfilled, onRejected) {
          if (typeof onFulfilled !== "function" && this.state === FULFILLED || typeof onRejected !== "function" && this.state === REJECTED) {
            return this;
          }
          var promise = new this.constructor(INTERNAL);
          if (this.state !== PENDING) {
            var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
            unwrap(promise, resolver, this.outcome);
          } else {
            this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
          }
          return promise;
        };
        function QueueItem(promise, onFulfilled, onRejected) {
          this.promise = promise;
          if (typeof onFulfilled === "function") {
            this.onFulfilled = onFulfilled;
            this.callFulfilled = this.otherCallFulfilled;
          }
          if (typeof onRejected === "function") {
            this.onRejected = onRejected;
            this.callRejected = this.otherCallRejected;
          }
        }
        QueueItem.prototype.callFulfilled = function(value) {
          handlers.resolve(this.promise, value);
        };
        QueueItem.prototype.otherCallFulfilled = function(value) {
          unwrap(this.promise, this.onFulfilled, value);
        };
        QueueItem.prototype.callRejected = function(value) {
          handlers.reject(this.promise, value);
        };
        QueueItem.prototype.otherCallRejected = function(value) {
          unwrap(this.promise, this.onRejected, value);
        };
        function unwrap(promise, func, value) {
          immediate(function() {
            var returnValue;
            try {
              returnValue = func(value);
            } catch (e2) {
              return handlers.reject(promise, e2);
            }
            if (returnValue === promise) {
              handlers.reject(promise, new TypeError("Cannot resolve promise with itself"));
            } else {
              handlers.resolve(promise, returnValue);
            }
          });
        }
        handlers.resolve = function(self2, value) {
          var result = tryCatch(getThen, value);
          if (result.status === "error") {
            return handlers.reject(self2, result.value);
          }
          var thenable = result.value;
          if (thenable) {
            safelyResolveThenable(self2, thenable);
          } else {
            self2.state = FULFILLED;
            self2.outcome = value;
            var i = -1;
            var len = self2.queue.length;
            while (++i < len) {
              self2.queue[i].callFulfilled(value);
            }
          }
          return self2;
        };
        handlers.reject = function(self2, error) {
          self2.state = REJECTED;
          self2.outcome = error;
          var i = -1;
          var len = self2.queue.length;
          while (++i < len) {
            self2.queue[i].callRejected(error);
          }
          return self2;
        };
        function getThen(obj) {
          var then = obj && obj.then;
          if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") {
            return function appyThen() {
              then.apply(obj, arguments);
            };
          }
        }
        function safelyResolveThenable(self2, thenable) {
          var called = false;
          function onError(value) {
            if (called) {
              return;
            }
            called = true;
            handlers.reject(self2, value);
          }
          function onSuccess(value) {
            if (called) {
              return;
            }
            called = true;
            handlers.resolve(self2, value);
          }
          function tryToUnwrap() {
            thenable(onSuccess, onError);
          }
          var result = tryCatch(tryToUnwrap);
          if (result.status === "error") {
            onError(result.value);
          }
        }
        function tryCatch(func, value) {
          var out = {};
          try {
            out.value = func(value);
            out.status = "success";
          } catch (e2) {
            out.status = "error";
            out.value = e2;
          }
          return out;
        }
        Promise2.resolve = resolve2;
        function resolve2(value) {
          if (value instanceof this) {
            return value;
          }
          return handlers.resolve(new this(INTERNAL), value);
        }
        Promise2.reject = reject;
        function reject(reason) {
          var promise = new this(INTERNAL);
          return handlers.reject(promise, reason);
        }
        Promise2.all = all;
        function all(iterable) {
          var self2 = this;
          if (Object.prototype.toString.call(iterable) !== "[object Array]") {
            return this.reject(new TypeError("must be an array"));
          }
          var len = iterable.length;
          var called = false;
          if (!len) {
            return this.resolve([]);
          }
          var values = new Array(len);
          var resolved = 0;
          var i = -1;
          var promise = new this(INTERNAL);
          while (++i < len) {
            allResolver(iterable[i], i);
          }
          return promise;
          function allResolver(value, i2) {
            self2.resolve(value).then(resolveFromAll, function(error) {
              if (!called) {
                called = true;
                handlers.reject(promise, error);
              }
            });
            function resolveFromAll(outValue) {
              values[i2] = outValue;
              if (++resolved === len && !called) {
                called = true;
                handlers.resolve(promise, values);
              }
            }
          }
        }
        Promise2.race = race;
        function race(iterable) {
          var self2 = this;
          if (Object.prototype.toString.call(iterable) !== "[object Array]") {
            return this.reject(new TypeError("must be an array"));
          }
          var len = iterable.length;
          var called = false;
          if (!len) {
            return this.resolve([]);
          }
          var i = -1;
          var promise = new this(INTERNAL);
          while (++i < len) {
            resolver(iterable[i]);
          }
          return promise;
          function resolver(value) {
            self2.resolve(value).then(function(response) {
              if (!called) {
                called = true;
                handlers.resolve(promise, response);
              }
            }, function(error) {
              if (!called) {
                called = true;
                handlers.reject(promise, error);
              }
            });
          }
        }
      }, { "1": 1 }], 3: [function(_dereq_, module4, exports3) {
        (function(global2) {
          "use strict";
          if (typeof global2.Promise !== "function") {
            global2.Promise = _dereq_(2);
          }
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "2": 2 }], 4: [function(_dereq_, module4, exports3) {
        "use strict";
        var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
          return typeof obj;
        } : function(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        function getIDB() {
          try {
            if (typeof indexedDB !== "undefined") {
              return indexedDB;
            }
            if (typeof webkitIndexedDB !== "undefined") {
              return webkitIndexedDB;
            }
            if (typeof mozIndexedDB !== "undefined") {
              return mozIndexedDB;
            }
            if (typeof OIndexedDB !== "undefined") {
              return OIndexedDB;
            }
            if (typeof msIndexedDB !== "undefined") {
              return msIndexedDB;
            }
          } catch (e2) {
            return;
          }
        }
        var idb = getIDB();
        function isIndexedDBValid() {
          try {
            if (!idb || !idb.open) {
              return false;
            }
            var isSafari = typeof openDatabase !== "undefined" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
            var hasFetch = typeof fetch === "function" && fetch.toString().indexOf("[native code") !== -1;
            return (!isSafari || hasFetch) && typeof indexedDB !== "undefined" && typeof IDBKeyRange !== "undefined";
          } catch (e2) {
            return false;
          }
        }
        function createBlob(parts, properties) {
          parts = parts || [];
          properties = properties || {};
          try {
            return new Blob(parts, properties);
          } catch (e2) {
            if (e2.name !== "TypeError") {
              throw e2;
            }
            var Builder = typeof BlobBuilder !== "undefined" ? BlobBuilder : typeof MSBlobBuilder !== "undefined" ? MSBlobBuilder : typeof MozBlobBuilder !== "undefined" ? MozBlobBuilder : WebKitBlobBuilder;
            var builder = new Builder();
            for (var i = 0; i < parts.length; i += 1) {
              builder.append(parts[i]);
            }
            return builder.getBlob(properties.type);
          }
        }
        if (typeof Promise === "undefined") {
          _dereq_(3);
        }
        var Promise$1 = Promise;
        function executeCallback(promise, callback) {
          if (callback) {
            promise.then(function(result) {
              callback(null, result);
            }, function(error) {
              callback(error);
            });
          }
        }
        function executeTwoCallbacks(promise, callback, errorCallback) {
          if (typeof callback === "function") {
            promise.then(callback);
          }
          if (typeof errorCallback === "function") {
            promise["catch"](errorCallback);
          }
        }
        function normalizeKey(key2) {
          if (typeof key2 !== "string") {
            console.warn(key2 + " used as a key, but it is not a string.");
            key2 = String(key2);
          }
          return key2;
        }
        function getCallback() {
          if (arguments.length && typeof arguments[arguments.length - 1] === "function") {
            return arguments[arguments.length - 1];
          }
        }
        var DETECT_BLOB_SUPPORT_STORE = "local-forage-detect-blob-support";
        var supportsBlobs = void 0;
        var dbContexts = {};
        var toString = Object.prototype.toString;
        var READ_ONLY = "readonly";
        var READ_WRITE = "readwrite";
        function _binStringToArrayBuffer(bin) {
          var length2 = bin.length;
          var buf = new ArrayBuffer(length2);
          var arr = new Uint8Array(buf);
          for (var i = 0; i < length2; i++) {
            arr[i] = bin.charCodeAt(i);
          }
          return buf;
        }
        function _checkBlobSupportWithoutCaching(idb2) {
          return new Promise$1(function(resolve2) {
            var txn = idb2.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
            var blob = createBlob([""]);
            txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, "key");
            txn.onabort = function(e2) {
              e2.preventDefault();
              e2.stopPropagation();
              resolve2(false);
            };
            txn.oncomplete = function() {
              var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
              var matchedEdge = navigator.userAgent.match(/Edge\//);
              resolve2(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
            };
          })["catch"](function() {
            return false;
          });
        }
        function _checkBlobSupport(idb2) {
          if (typeof supportsBlobs === "boolean") {
            return Promise$1.resolve(supportsBlobs);
          }
          return _checkBlobSupportWithoutCaching(idb2).then(function(value) {
            supportsBlobs = value;
            return supportsBlobs;
          });
        }
        function _deferReadiness(dbInfo) {
          var dbContext = dbContexts[dbInfo.name];
          var deferredOperation = {};
          deferredOperation.promise = new Promise$1(function(resolve2, reject) {
            deferredOperation.resolve = resolve2;
            deferredOperation.reject = reject;
          });
          dbContext.deferredOperations.push(deferredOperation);
          if (!dbContext.dbReady) {
            dbContext.dbReady = deferredOperation.promise;
          } else {
            dbContext.dbReady = dbContext.dbReady.then(function() {
              return deferredOperation.promise;
            });
          }
        }
        function _advanceReadiness(dbInfo) {
          var dbContext = dbContexts[dbInfo.name];
          var deferredOperation = dbContext.deferredOperations.pop();
          if (deferredOperation) {
            deferredOperation.resolve();
            return deferredOperation.promise;
          }
        }
        function _rejectReadiness(dbInfo, err) {
          var dbContext = dbContexts[dbInfo.name];
          var deferredOperation = dbContext.deferredOperations.pop();
          if (deferredOperation) {
            deferredOperation.reject(err);
            return deferredOperation.promise;
          }
        }
        function _getConnection(dbInfo, upgradeNeeded) {
          return new Promise$1(function(resolve2, reject) {
            dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();
            if (dbInfo.db) {
              if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
              } else {
                return resolve2(dbInfo.db);
              }
            }
            var dbArgs = [dbInfo.name];
            if (upgradeNeeded) {
              dbArgs.push(dbInfo.version);
            }
            var openreq = idb.open.apply(idb, dbArgs);
            if (upgradeNeeded) {
              openreq.onupgradeneeded = function(e2) {
                var db = openreq.result;
                try {
                  db.createObjectStore(dbInfo.storeName);
                  if (e2.oldVersion <= 1) {
                    db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                  }
                } catch (ex) {
                  if (ex.name === "ConstraintError") {
                    console.warn('The database "' + dbInfo.name + '" has been upgraded from version ' + e2.oldVersion + " to version " + e2.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                  } else {
                    throw ex;
                  }
                }
              };
            }
            openreq.onerror = function(e2) {
              e2.preventDefault();
              reject(openreq.error);
            };
            openreq.onsuccess = function() {
              var db = openreq.result;
              db.onversionchange = function(e2) {
                e2.target.close();
              };
              resolve2(db);
              _advanceReadiness(dbInfo);
            };
          });
        }
        function _getOriginalConnection(dbInfo) {
          return _getConnection(dbInfo, false);
        }
        function _getUpgradedConnection(dbInfo) {
          return _getConnection(dbInfo, true);
        }
        function _isUpgradeNeeded(dbInfo, defaultVersion) {
          if (!dbInfo.db) {
            return true;
          }
          var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
          var isDowngrade = dbInfo.version < dbInfo.db.version;
          var isUpgrade = dbInfo.version > dbInfo.db.version;
          if (isDowngrade) {
            if (dbInfo.version !== defaultVersion) {
              console.warn('The database "' + dbInfo.name + `" can't be downgraded from version ` + dbInfo.db.version + " to version " + dbInfo.version + ".");
            }
            dbInfo.version = dbInfo.db.version;
          }
          if (isUpgrade || isNewStore) {
            if (isNewStore) {
              var incVersion = dbInfo.db.version + 1;
              if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
              }
            }
            return true;
          }
          return false;
        }
        function _encodeBlob(blob) {
          return new Promise$1(function(resolve2, reject) {
            var reader = new FileReader();
            reader.onerror = reject;
            reader.onloadend = function(e2) {
              var base64 = btoa(e2.target.result || "");
              resolve2({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
              });
            };
            reader.readAsBinaryString(blob);
          });
        }
        function _decodeBlob(encodedBlob) {
          var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
          return createBlob([arrayBuff], { type: encodedBlob.type });
        }
        function _isEncodedBlob(value) {
          return value && value.__local_forage_encoded_blob;
        }
        function _fullyReady(callback) {
          var self2 = this;
          var promise = self2._initReady().then(function() {
            var dbContext = dbContexts[self2._dbInfo.name];
            if (dbContext && dbContext.dbReady) {
              return dbContext.dbReady;
            }
          });
          executeTwoCallbacks(promise, callback, callback);
          return promise;
        }
        function _tryReconnect(dbInfo) {
          _deferReadiness(dbInfo);
          var dbContext = dbContexts[dbInfo.name];
          var forages = dbContext.forages;
          for (var i = 0; i < forages.length; i++) {
            var forage = forages[i];
            if (forage._dbInfo.db) {
              forage._dbInfo.db.close();
              forage._dbInfo.db = null;
            }
          }
          dbInfo.db = null;
          return _getOriginalConnection(dbInfo).then(function(db) {
            dbInfo.db = db;
            if (_isUpgradeNeeded(dbInfo)) {
              return _getUpgradedConnection(dbInfo);
            }
            return db;
          }).then(function(db) {
            dbInfo.db = dbContext.db = db;
            for (var i2 = 0; i2 < forages.length; i2++) {
              forages[i2]._dbInfo.db = db;
            }
          })["catch"](function(err) {
            _rejectReadiness(dbInfo, err);
            throw err;
          });
        }
        function createTransaction(dbInfo, mode2, callback, retries) {
          if (retries === void 0) {
            retries = 1;
          }
          try {
            var tx = dbInfo.db.transaction(dbInfo.storeName, mode2);
            callback(null, tx);
          } catch (err) {
            if (retries > 0 && (!dbInfo.db || err.name === "InvalidStateError" || err.name === "NotFoundError")) {
              return Promise$1.resolve().then(function() {
                if (!dbInfo.db || err.name === "NotFoundError" && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                  if (dbInfo.db) {
                    dbInfo.version = dbInfo.db.version + 1;
                  }
                  return _getUpgradedConnection(dbInfo);
                }
              }).then(function() {
                return _tryReconnect(dbInfo).then(function() {
                  createTransaction(dbInfo, mode2, callback, retries - 1);
                });
              })["catch"](callback);
            }
            callback(err);
          }
        }
        function createDbContext() {
          return {
            forages: [],
            db: null,
            dbReady: null,
            deferredOperations: []
          };
        }
        function _initStorage(options) {
          var self2 = this;
          var dbInfo = {
            db: null
          };
          if (options) {
            for (var i in options) {
              dbInfo[i] = options[i];
            }
          }
          var dbContext = dbContexts[dbInfo.name];
          if (!dbContext) {
            dbContext = createDbContext();
            dbContexts[dbInfo.name] = dbContext;
          }
          dbContext.forages.push(self2);
          if (!self2._initReady) {
            self2._initReady = self2.ready;
            self2.ready = _fullyReady;
          }
          var initPromises = [];
          function ignoreErrors() {
            return Promise$1.resolve();
          }
          for (var j2 = 0; j2 < dbContext.forages.length; j2++) {
            var forage = dbContext.forages[j2];
            if (forage !== self2) {
              initPromises.push(forage._initReady()["catch"](ignoreErrors));
            }
          }
          var forages = dbContext.forages.slice(0);
          return Promise$1.all(initPromises).then(function() {
            dbInfo.db = dbContext.db;
            return _getOriginalConnection(dbInfo);
          }).then(function(db) {
            dbInfo.db = db;
            if (_isUpgradeNeeded(dbInfo, self2._defaultConfig.version)) {
              return _getUpgradedConnection(dbInfo);
            }
            return db;
          }).then(function(db) {
            dbInfo.db = dbContext.db = db;
            self2._dbInfo = dbInfo;
            for (var k2 = 0; k2 < forages.length; k2++) {
              var forage2 = forages[k2];
              if (forage2 !== self2) {
                forage2._dbInfo.db = dbInfo.db;
                forage2._dbInfo.version = dbInfo.version;
              }
            }
          });
        }
        function getItem(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$1(function(resolve2, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store.get(key2);
                  req.onsuccess = function() {
                    var value = req.result;
                    if (value === void 0) {
                      value = null;
                    }
                    if (_isEncodedBlob(value)) {
                      value = _decodeBlob(value);
                    }
                    resolve2(value);
                  };
                  req.onerror = function() {
                    reject(req.error);
                  };
                } catch (e2) {
                  reject(e2);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function iterate(iterator, callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve2, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store.openCursor();
                  var iterationNumber = 1;
                  req.onsuccess = function() {
                    var cursor2 = req.result;
                    if (cursor2) {
                      var value = cursor2.value;
                      if (_isEncodedBlob(value)) {
                        value = _decodeBlob(value);
                      }
                      var result = iterator(value, cursor2.key, iterationNumber++);
                      if (result !== void 0) {
                        resolve2(result);
                      } else {
                        cursor2["continue"]();
                      }
                    } else {
                      resolve2();
                    }
                  };
                  req.onerror = function() {
                    reject(req.error);
                  };
                } catch (e2) {
                  reject(e2);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function setItem(key2, value, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$1(function(resolve2, reject) {
            var dbInfo;
            self2.ready().then(function() {
              dbInfo = self2._dbInfo;
              if (toString.call(value) === "[object Blob]") {
                return _checkBlobSupport(dbInfo.db).then(function(blobSupport) {
                  if (blobSupport) {
                    return value;
                  }
                  return _encodeBlob(value);
                });
              }
              return value;
            }).then(function(value2) {
              createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  if (value2 === null) {
                    value2 = void 0;
                  }
                  var req = store.put(value2, key2);
                  transaction.oncomplete = function() {
                    if (value2 === void 0) {
                      value2 = null;
                    }
                    resolve2(value2);
                  };
                  transaction.onabort = transaction.onerror = function() {
                    var err2 = req.error ? req.error : req.transaction.error;
                    reject(err2);
                  };
                } catch (e2) {
                  reject(e2);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function removeItem(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$1(function(resolve2, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store["delete"](key2);
                  transaction.oncomplete = function() {
                    resolve2();
                  };
                  transaction.onerror = function() {
                    reject(req.error);
                  };
                  transaction.onabort = function() {
                    var err2 = req.error ? req.error : req.transaction.error;
                    reject(err2);
                  };
                } catch (e2) {
                  reject(e2);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function clear2(callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve2, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store.clear();
                  transaction.oncomplete = function() {
                    resolve2();
                  };
                  transaction.onabort = transaction.onerror = function() {
                    var err2 = req.error ? req.error : req.transaction.error;
                    reject(err2);
                  };
                } catch (e2) {
                  reject(e2);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function length(callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve2, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store.count();
                  req.onsuccess = function() {
                    resolve2(req.result);
                  };
                  req.onerror = function() {
                    reject(req.error);
                  };
                } catch (e2) {
                  reject(e2);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function key(n, callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve2, reject) {
            if (n < 0) {
              resolve2(null);
              return;
            }
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var advanced = false;
                  var req = store.openKeyCursor();
                  req.onsuccess = function() {
                    var cursor2 = req.result;
                    if (!cursor2) {
                      resolve2(null);
                      return;
                    }
                    if (n === 0) {
                      resolve2(cursor2.key);
                    } else {
                      if (!advanced) {
                        advanced = true;
                        cursor2.advance(n);
                      } else {
                        resolve2(cursor2.key);
                      }
                    }
                  };
                  req.onerror = function() {
                    reject(req.error);
                  };
                } catch (e2) {
                  reject(e2);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function keys(callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve2, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store.openKeyCursor();
                  var keys2 = [];
                  req.onsuccess = function() {
                    var cursor2 = req.result;
                    if (!cursor2) {
                      resolve2(keys2);
                      return;
                    }
                    keys2.push(cursor2.key);
                    cursor2["continue"]();
                  };
                  req.onerror = function() {
                    reject(req.error);
                  };
                } catch (e2) {
                  reject(e2);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function dropInstance(options, callback) {
          callback = getCallback.apply(this, arguments);
          var currentConfig = this.config();
          options = typeof options !== "function" && options || {};
          if (!options.name) {
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
          }
          var self2 = this;
          var promise;
          if (!options.name) {
            promise = Promise$1.reject("Invalid arguments");
          } else {
            var isCurrentDb = options.name === currentConfig.name && self2._dbInfo.db;
            var dbPromise = isCurrentDb ? Promise$1.resolve(self2._dbInfo.db) : _getOriginalConnection(options).then(function(db) {
              var dbContext = dbContexts[options.name];
              var forages = dbContext.forages;
              dbContext.db = db;
              for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
              }
              return db;
            });
            if (!options.storeName) {
              promise = dbPromise.then(function(db) {
                _deferReadiness(options);
                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;
                db.close();
                for (var i = 0; i < forages.length; i++) {
                  var forage = forages[i];
                  forage._dbInfo.db = null;
                }
                var dropDBPromise = new Promise$1(function(resolve2, reject) {
                  var req = idb.deleteDatabase(options.name);
                  req.onerror = function() {
                    var db2 = req.result;
                    if (db2) {
                      db2.close();
                    }
                    reject(req.error);
                  };
                  req.onblocked = function() {
                    console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                  };
                  req.onsuccess = function() {
                    var db2 = req.result;
                    if (db2) {
                      db2.close();
                    }
                    resolve2(db2);
                  };
                });
                return dropDBPromise.then(function(db2) {
                  dbContext.db = db2;
                  for (var i2 = 0; i2 < forages.length; i2++) {
                    var _forage = forages[i2];
                    _advanceReadiness(_forage._dbInfo);
                  }
                })["catch"](function(err) {
                  (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {
                  });
                  throw err;
                });
              });
            } else {
              promise = dbPromise.then(function(db) {
                if (!db.objectStoreNames.contains(options.storeName)) {
                  return;
                }
                var newVersion = db.version + 1;
                _deferReadiness(options);
                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;
                db.close();
                for (var i = 0; i < forages.length; i++) {
                  var forage = forages[i];
                  forage._dbInfo.db = null;
                  forage._dbInfo.version = newVersion;
                }
                var dropObjectPromise = new Promise$1(function(resolve2, reject) {
                  var req = idb.open(options.name, newVersion);
                  req.onerror = function(err) {
                    var db2 = req.result;
                    db2.close();
                    reject(err);
                  };
                  req.onupgradeneeded = function() {
                    var db2 = req.result;
                    db2.deleteObjectStore(options.storeName);
                  };
                  req.onsuccess = function() {
                    var db2 = req.result;
                    db2.close();
                    resolve2(db2);
                  };
                });
                return dropObjectPromise.then(function(db2) {
                  dbContext.db = db2;
                  for (var j2 = 0; j2 < forages.length; j2++) {
                    var _forage2 = forages[j2];
                    _forage2._dbInfo.db = db2;
                    _advanceReadiness(_forage2._dbInfo);
                  }
                })["catch"](function(err) {
                  (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {
                  });
                  throw err;
                });
              });
            }
          }
          executeCallback(promise, callback);
          return promise;
        }
        var asyncStorage = {
          _driver: "asyncStorage",
          _initStorage,
          _support: isIndexedDBValid(),
          iterate,
          getItem,
          setItem,
          removeItem,
          clear: clear2,
          length,
          key,
          keys,
          dropInstance
        };
        function isWebSQLValid() {
          return typeof openDatabase === "function";
        }
        var BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var BLOB_TYPE_PREFIX = "~~local_forage_type~";
        var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
        var SERIALIZED_MARKER = "__lfsc__:";
        var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
        var TYPE_ARRAYBUFFER = "arbf";
        var TYPE_BLOB = "blob";
        var TYPE_INT8ARRAY = "si08";
        var TYPE_UINT8ARRAY = "ui08";
        var TYPE_UINT8CLAMPEDARRAY = "uic8";
        var TYPE_INT16ARRAY = "si16";
        var TYPE_INT32ARRAY = "si32";
        var TYPE_UINT16ARRAY = "ur16";
        var TYPE_UINT32ARRAY = "ui32";
        var TYPE_FLOAT32ARRAY = "fl32";
        var TYPE_FLOAT64ARRAY = "fl64";
        var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
        var toString$1 = Object.prototype.toString;
        function stringToBuffer(serializedString) {
          var bufferLength = serializedString.length * 0.75;
          var len = serializedString.length;
          var i;
          var p2 = 0;
          var encoded1, encoded2, encoded3, encoded4;
          if (serializedString[serializedString.length - 1] === "=") {
            bufferLength--;
            if (serializedString[serializedString.length - 2] === "=") {
              bufferLength--;
            }
          }
          var buffer = new ArrayBuffer(bufferLength);
          var bytes = new Uint8Array(buffer);
          for (i = 0; i < len; i += 4) {
            encoded1 = BASE_CHARS.indexOf(serializedString[i]);
            encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
            encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
            encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
            bytes[p2++] = encoded1 << 2 | encoded2 >> 4;
            bytes[p2++] = (encoded2 & 15) << 4 | encoded3 >> 2;
            bytes[p2++] = (encoded3 & 3) << 6 | encoded4 & 63;
          }
          return buffer;
        }
        function bufferToString(buffer) {
          var bytes = new Uint8Array(buffer);
          var base64String = "";
          var i;
          for (i = 0; i < bytes.length; i += 3) {
            base64String += BASE_CHARS[bytes[i] >> 2];
            base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
            base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
            base64String += BASE_CHARS[bytes[i + 2] & 63];
          }
          if (bytes.length % 3 === 2) {
            base64String = base64String.substring(0, base64String.length - 1) + "=";
          } else if (bytes.length % 3 === 1) {
            base64String = base64String.substring(0, base64String.length - 2) + "==";
          }
          return base64String;
        }
        function serialize(value, callback) {
          var valueType = "";
          if (value) {
            valueType = toString$1.call(value);
          }
          if (value && (valueType === "[object ArrayBuffer]" || value.buffer && toString$1.call(value.buffer) === "[object ArrayBuffer]")) {
            var buffer;
            var marker = SERIALIZED_MARKER;
            if (value instanceof ArrayBuffer) {
              buffer = value;
              marker += TYPE_ARRAYBUFFER;
            } else {
              buffer = value.buffer;
              if (valueType === "[object Int8Array]") {
                marker += TYPE_INT8ARRAY;
              } else if (valueType === "[object Uint8Array]") {
                marker += TYPE_UINT8ARRAY;
              } else if (valueType === "[object Uint8ClampedArray]") {
                marker += TYPE_UINT8CLAMPEDARRAY;
              } else if (valueType === "[object Int16Array]") {
                marker += TYPE_INT16ARRAY;
              } else if (valueType === "[object Uint16Array]") {
                marker += TYPE_UINT16ARRAY;
              } else if (valueType === "[object Int32Array]") {
                marker += TYPE_INT32ARRAY;
              } else if (valueType === "[object Uint32Array]") {
                marker += TYPE_UINT32ARRAY;
              } else if (valueType === "[object Float32Array]") {
                marker += TYPE_FLOAT32ARRAY;
              } else if (valueType === "[object Float64Array]") {
                marker += TYPE_FLOAT64ARRAY;
              } else {
                callback(new Error("Failed to get type for BinaryArray"));
              }
            }
            callback(marker + bufferToString(buffer));
          } else if (valueType === "[object Blob]") {
            var fileReader = new FileReader();
            fileReader.onload = function() {
              var str = BLOB_TYPE_PREFIX + value.type + "~" + bufferToString(this.result);
              callback(SERIALIZED_MARKER + TYPE_BLOB + str);
            };
            fileReader.readAsArrayBuffer(value);
          } else {
            try {
              callback(JSON.stringify(value));
            } catch (e2) {
              console.error("Couldn't convert value into a JSON string: ", value);
              callback(null, e2);
            }
          }
        }
        function deserialize(value) {
          if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
            return JSON.parse(value);
          }
          var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
          var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
          var blobType;
          if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
            var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
            blobType = matcher[1];
            serializedString = serializedString.substring(matcher[0].length);
          }
          var buffer = stringToBuffer(serializedString);
          switch (type) {
            case TYPE_ARRAYBUFFER:
              return buffer;
            case TYPE_BLOB:
              return createBlob([buffer], { type: blobType });
            case TYPE_INT8ARRAY:
              return new Int8Array(buffer);
            case TYPE_UINT8ARRAY:
              return new Uint8Array(buffer);
            case TYPE_UINT8CLAMPEDARRAY:
              return new Uint8ClampedArray(buffer);
            case TYPE_INT16ARRAY:
              return new Int16Array(buffer);
            case TYPE_UINT16ARRAY:
              return new Uint16Array(buffer);
            case TYPE_INT32ARRAY:
              return new Int32Array(buffer);
            case TYPE_UINT32ARRAY:
              return new Uint32Array(buffer);
            case TYPE_FLOAT32ARRAY:
              return new Float32Array(buffer);
            case TYPE_FLOAT64ARRAY:
              return new Float64Array(buffer);
            default:
              throw new Error("Unkown type: " + type);
          }
        }
        var localforageSerializer = {
          serialize,
          deserialize,
          stringToBuffer,
          bufferToString
        };
        function createDbTable(t, dbInfo, callback, errorCallback) {
          t.executeSql("CREATE TABLE IF NOT EXISTS " + dbInfo.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], callback, errorCallback);
        }
        function _initStorage$1(options) {
          var self2 = this;
          var dbInfo = {
            db: null
          };
          if (options) {
            for (var i in options) {
              dbInfo[i] = typeof options[i] !== "string" ? options[i].toString() : options[i];
            }
          }
          var dbInfoPromise = new Promise$1(function(resolve2, reject) {
            try {
              dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
            } catch (e2) {
              return reject(e2);
            }
            dbInfo.db.transaction(function(t) {
              createDbTable(t, dbInfo, function() {
                self2._dbInfo = dbInfo;
                resolve2();
              }, function(t2, error) {
                reject(error);
              });
            }, reject);
          });
          dbInfo.serializer = localforageSerializer;
          return dbInfoPromise;
        }
        function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
          t.executeSql(sqlStatement, args, callback, function(t2, error) {
            if (error.code === error.SYNTAX_ERR) {
              t2.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [dbInfo.storeName], function(t3, results) {
                if (!results.rows.length) {
                  createDbTable(t3, dbInfo, function() {
                    t3.executeSql(sqlStatement, args, callback, errorCallback);
                  }, errorCallback);
                } else {
                  errorCallback(t3, error);
                }
              }, errorCallback);
            } else {
              errorCallback(t2, error);
            }
          }, errorCallback);
        }
        function getItem$1(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$1(function(resolve2, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t) {
                tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName + " WHERE key = ? LIMIT 1", [key2], function(t2, results) {
                  var result = results.rows.length ? results.rows.item(0).value : null;
                  if (result) {
                    result = dbInfo.serializer.deserialize(result);
                  }
                  resolve2(result);
                }, function(t2, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function iterate$1(iterator, callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve2, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t) {
                tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName, [], function(t2, results) {
                  var rows = results.rows;
                  var length2 = rows.length;
                  for (var i = 0; i < length2; i++) {
                    var item2 = rows.item(i);
                    var result = item2.value;
                    if (result) {
                      result = dbInfo.serializer.deserialize(result);
                    }
                    result = iterator(result, item2.key, i + 1);
                    if (result !== void 0) {
                      resolve2(result);
                      return;
                    }
                  }
                  resolve2();
                }, function(t2, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function _setItem(key2, value, callback, retriesLeft) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$1(function(resolve2, reject) {
            self2.ready().then(function() {
              if (value === void 0) {
                value = null;
              }
              var originalValue = value;
              var dbInfo = self2._dbInfo;
              dbInfo.serializer.serialize(value, function(value2, error) {
                if (error) {
                  reject(error);
                } else {
                  dbInfo.db.transaction(function(t) {
                    tryExecuteSql(t, dbInfo, "INSERT OR REPLACE INTO " + dbInfo.storeName + " (key, value) VALUES (?, ?)", [key2, value2], function() {
                      resolve2(originalValue);
                    }, function(t2, error2) {
                      reject(error2);
                    });
                  }, function(sqlError) {
                    if (sqlError.code === sqlError.QUOTA_ERR) {
                      if (retriesLeft > 0) {
                        resolve2(_setItem.apply(self2, [key2, originalValue, callback, retriesLeft - 1]));
                        return;
                      }
                      reject(sqlError);
                    }
                  });
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function setItem$1(key2, value, callback) {
          return _setItem.apply(this, [key2, value, callback, 1]);
        }
        function removeItem$1(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$1(function(resolve2, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t) {
                tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName + " WHERE key = ?", [key2], function() {
                  resolve2();
                }, function(t2, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function clear$12(callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve2, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t) {
                tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName, [], function() {
                  resolve2();
                }, function(t2, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function length$1(callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve2, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t) {
                tryExecuteSql(t, dbInfo, "SELECT COUNT(key) as c FROM " + dbInfo.storeName, [], function(t2, results) {
                  var result = results.rows.item(0).c;
                  resolve2(result);
                }, function(t2, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function key$1(n, callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve2, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t) {
                tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName + " WHERE id = ? LIMIT 1", [n + 1], function(t2, results) {
                  var result = results.rows.length ? results.rows.item(0).key : null;
                  resolve2(result);
                }, function(t2, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function keys$1(callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve2, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t) {
                tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName, [], function(t2, results) {
                  var keys2 = [];
                  for (var i = 0; i < results.rows.length; i++) {
                    keys2.push(results.rows.item(i).key);
                  }
                  resolve2(keys2);
                }, function(t2, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function getAllStoreNames(db) {
          return new Promise$1(function(resolve2, reject) {
            db.transaction(function(t) {
              t.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(t2, results) {
                var storeNames = [];
                for (var i = 0; i < results.rows.length; i++) {
                  storeNames.push(results.rows.item(i).name);
                }
                resolve2({
                  db,
                  storeNames
                });
              }, function(t2, error) {
                reject(error);
              });
            }, function(sqlError) {
              reject(sqlError);
            });
          });
        }
        function dropInstance$1(options, callback) {
          callback = getCallback.apply(this, arguments);
          var currentConfig = this.config();
          options = typeof options !== "function" && options || {};
          if (!options.name) {
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
          }
          var self2 = this;
          var promise;
          if (!options.name) {
            promise = Promise$1.reject("Invalid arguments");
          } else {
            promise = new Promise$1(function(resolve2) {
              var db;
              if (options.name === currentConfig.name) {
                db = self2._dbInfo.db;
              } else {
                db = openDatabase(options.name, "", "", 0);
              }
              if (!options.storeName) {
                resolve2(getAllStoreNames(db));
              } else {
                resolve2({
                  db,
                  storeNames: [options.storeName]
                });
              }
            }).then(function(operationInfo) {
              return new Promise$1(function(resolve2, reject) {
                operationInfo.db.transaction(function(t) {
                  function dropTable(storeName) {
                    return new Promise$1(function(resolve3, reject2) {
                      t.executeSql("DROP TABLE IF EXISTS " + storeName, [], function() {
                        resolve3();
                      }, function(t2, error) {
                        reject2(error);
                      });
                    });
                  }
                  var operations = [];
                  for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                    operations.push(dropTable(operationInfo.storeNames[i]));
                  }
                  Promise$1.all(operations).then(function() {
                    resolve2();
                  })["catch"](function(e2) {
                    reject(e2);
                  });
                }, function(sqlError) {
                  reject(sqlError);
                });
              });
            });
          }
          executeCallback(promise, callback);
          return promise;
        }
        var webSQLStorage = {
          _driver: "webSQLStorage",
          _initStorage: _initStorage$1,
          _support: isWebSQLValid(),
          iterate: iterate$1,
          getItem: getItem$1,
          setItem: setItem$1,
          removeItem: removeItem$1,
          clear: clear$12,
          length: length$1,
          key: key$1,
          keys: keys$1,
          dropInstance: dropInstance$1
        };
        function isLocalStorageValid() {
          try {
            return typeof localStorage !== "undefined" && "setItem" in localStorage && !!localStorage.setItem;
          } catch (e2) {
            return false;
          }
        }
        function _getKeyPrefix(options, defaultConfig) {
          var keyPrefix = options.name + "/";
          if (options.storeName !== defaultConfig.storeName) {
            keyPrefix += options.storeName + "/";
          }
          return keyPrefix;
        }
        function checkIfLocalStorageThrows() {
          var localStorageTestKey = "_localforage_support_test";
          try {
            localStorage.setItem(localStorageTestKey, true);
            localStorage.removeItem(localStorageTestKey);
            return false;
          } catch (e2) {
            return true;
          }
        }
        function _isLocalStorageUsable() {
          return !checkIfLocalStorageThrows() || localStorage.length > 0;
        }
        function _initStorage$2(options) {
          var self2 = this;
          var dbInfo = {};
          if (options) {
            for (var i in options) {
              dbInfo[i] = options[i];
            }
          }
          dbInfo.keyPrefix = _getKeyPrefix(options, self2._defaultConfig);
          if (!_isLocalStorageUsable()) {
            return Promise$1.reject();
          }
          self2._dbInfo = dbInfo;
          dbInfo.serializer = localforageSerializer;
          return Promise$1.resolve();
        }
        function clear$22(callback) {
          var self2 = this;
          var promise = self2.ready().then(function() {
            var keyPrefix = self2._dbInfo.keyPrefix;
            for (var i = localStorage.length - 1; i >= 0; i--) {
              var key2 = localStorage.key(i);
              if (key2.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key2);
              }
            }
          });
          executeCallback(promise, callback);
          return promise;
        }
        function getItem$2(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            var result = localStorage.getItem(dbInfo.keyPrefix + key2);
            if (result) {
              result = dbInfo.serializer.deserialize(result);
            }
            return result;
          });
          executeCallback(promise, callback);
          return promise;
        }
        function iterate$2(iterator, callback) {
          var self2 = this;
          var promise = self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            var keyPrefix = dbInfo.keyPrefix;
            var keyPrefixLength = keyPrefix.length;
            var length2 = localStorage.length;
            var iterationNumber = 1;
            for (var i = 0; i < length2; i++) {
              var key2 = localStorage.key(i);
              if (key2.indexOf(keyPrefix) !== 0) {
                continue;
              }
              var value = localStorage.getItem(key2);
              if (value) {
                value = dbInfo.serializer.deserialize(value);
              }
              value = iterator(value, key2.substring(keyPrefixLength), iterationNumber++);
              if (value !== void 0) {
                return value;
              }
            }
          });
          executeCallback(promise, callback);
          return promise;
        }
        function key$2(n, callback) {
          var self2 = this;
          var promise = self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            var result;
            try {
              result = localStorage.key(n);
            } catch (error) {
              result = null;
            }
            if (result) {
              result = result.substring(dbInfo.keyPrefix.length);
            }
            return result;
          });
          executeCallback(promise, callback);
          return promise;
        }
        function keys$2(callback) {
          var self2 = this;
          var promise = self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            var length2 = localStorage.length;
            var keys2 = [];
            for (var i = 0; i < length2; i++) {
              var itemKey = localStorage.key(i);
              if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys2.push(itemKey.substring(dbInfo.keyPrefix.length));
              }
            }
            return keys2;
          });
          executeCallback(promise, callback);
          return promise;
        }
        function length$2(callback) {
          var self2 = this;
          var promise = self2.keys().then(function(keys2) {
            return keys2.length;
          });
          executeCallback(promise, callback);
          return promise;
        }
        function removeItem$2(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            localStorage.removeItem(dbInfo.keyPrefix + key2);
          });
          executeCallback(promise, callback);
          return promise;
        }
        function setItem$2(key2, value, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = self2.ready().then(function() {
            if (value === void 0) {
              value = null;
            }
            var originalValue = value;
            return new Promise$1(function(resolve2, reject) {
              var dbInfo = self2._dbInfo;
              dbInfo.serializer.serialize(value, function(value2, error) {
                if (error) {
                  reject(error);
                } else {
                  try {
                    localStorage.setItem(dbInfo.keyPrefix + key2, value2);
                    resolve2(originalValue);
                  } catch (e2) {
                    if (e2.name === "QuotaExceededError" || e2.name === "NS_ERROR_DOM_QUOTA_REACHED") {
                      reject(e2);
                    }
                    reject(e2);
                  }
                }
              });
            });
          });
          executeCallback(promise, callback);
          return promise;
        }
        function dropInstance$2(options, callback) {
          callback = getCallback.apply(this, arguments);
          options = typeof options !== "function" && options || {};
          if (!options.name) {
            var currentConfig = this.config();
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
          }
          var self2 = this;
          var promise;
          if (!options.name) {
            promise = Promise$1.reject("Invalid arguments");
          } else {
            promise = new Promise$1(function(resolve2) {
              if (!options.storeName) {
                resolve2(options.name + "/");
              } else {
                resolve2(_getKeyPrefix(options, self2._defaultConfig));
              }
            }).then(function(keyPrefix) {
              for (var i = localStorage.length - 1; i >= 0; i--) {
                var key2 = localStorage.key(i);
                if (key2.indexOf(keyPrefix) === 0) {
                  localStorage.removeItem(key2);
                }
              }
            });
          }
          executeCallback(promise, callback);
          return promise;
        }
        var localStorageWrapper = {
          _driver: "localStorageWrapper",
          _initStorage: _initStorage$2,
          _support: isLocalStorageValid(),
          iterate: iterate$2,
          getItem: getItem$2,
          setItem: setItem$2,
          removeItem: removeItem$2,
          clear: clear$22,
          length: length$2,
          key: key$2,
          keys: keys$2,
          dropInstance: dropInstance$2
        };
        var sameValue = function sameValue2(x3, y3) {
          return x3 === y3 || typeof x3 === "number" && typeof y3 === "number" && isNaN(x3) && isNaN(y3);
        };
        var includes = function includes2(array, searchElement) {
          var len = array.length;
          var i = 0;
          while (i < len) {
            if (sameValue(array[i], searchElement)) {
              return true;
            }
            i++;
          }
          return false;
        };
        var isArray = Array.isArray || function(arg) {
          return Object.prototype.toString.call(arg) === "[object Array]";
        };
        var DefinedDrivers = {};
        var DriverSupport = {};
        var DefaultDrivers = {
          INDEXEDDB: asyncStorage,
          WEBSQL: webSQLStorage,
          LOCALSTORAGE: localStorageWrapper
        };
        var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
        var OptionalDriverMethods = ["dropInstance"];
        var LibraryMethods = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(OptionalDriverMethods);
        var DefaultConfig = {
          description: "",
          driver: DefaultDriverOrder.slice(),
          name: "localforage",
          size: 4980736,
          storeName: "keyvaluepairs",
          version: 1
        };
        function callWhenReady(localForageInstance, libraryMethod) {
          localForageInstance[libraryMethod] = function() {
            var _args = arguments;
            return localForageInstance.ready().then(function() {
              return localForageInstance[libraryMethod].apply(localForageInstance, _args);
            });
          };
        }
        function extend() {
          for (var i = 1; i < arguments.length; i++) {
            var arg = arguments[i];
            if (arg) {
              for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                  if (isArray(arg[_key])) {
                    arguments[0][_key] = arg[_key].slice();
                  } else {
                    arguments[0][_key] = arg[_key];
                  }
                }
              }
            }
          }
          return arguments[0];
        }
        var LocalForage = function() {
          function LocalForage2(options) {
            _classCallCheck(this, LocalForage2);
            for (var driverTypeKey in DefaultDrivers) {
              if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;
                if (!DefinedDrivers[driverName]) {
                  this.defineDriver(driver);
                }
              }
            }
            this._defaultConfig = extend({}, DefaultConfig);
            this._config = extend({}, this._defaultConfig, options);
            this._driverSet = null;
            this._initDriver = null;
            this._ready = false;
            this._dbInfo = null;
            this._wrapLibraryMethodsWithReady();
            this.setDriver(this._config.driver)["catch"](function() {
            });
          }
          LocalForage2.prototype.config = function config(options) {
            if ((typeof options === "undefined" ? "undefined" : _typeof2(options)) === "object") {
              if (this._ready) {
                return new Error("Can't call config() after localforage has been used.");
              }
              for (var i in options) {
                if (i === "storeName") {
                  options[i] = options[i].replace(/\W/g, "_");
                }
                if (i === "version" && typeof options[i] !== "number") {
                  return new Error("Database version must be a number.");
                }
                this._config[i] = options[i];
              }
              if ("driver" in options && options.driver) {
                return this.setDriver(this._config.driver);
              }
              return true;
            } else if (typeof options === "string") {
              return this._config[options];
            } else {
              return this._config;
            }
          };
          LocalForage2.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
            var promise = new Promise$1(function(resolve2, reject) {
              try {
                var driverName = driverObject._driver;
                var complianceError = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                if (!driverObject._driver) {
                  reject(complianceError);
                  return;
                }
                var driverMethods = LibraryMethods.concat("_initStorage");
                for (var i = 0, len = driverMethods.length; i < len; i++) {
                  var driverMethodName = driverMethods[i];
                  var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                  if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== "function") {
                    reject(complianceError);
                    return;
                  }
                }
                var configureMissingMethods = function configureMissingMethods2() {
                  var methodNotImplementedFactory = function methodNotImplementedFactory2(methodName) {
                    return function() {
                      var error = new Error("Method " + methodName + " is not implemented by the current driver");
                      var promise2 = Promise$1.reject(error);
                      executeCallback(promise2, arguments[arguments.length - 1]);
                      return promise2;
                    };
                  };
                  for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                    var optionalDriverMethod = OptionalDriverMethods[_i];
                    if (!driverObject[optionalDriverMethod]) {
                      driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                    }
                  }
                };
                configureMissingMethods();
                var setDriverSupport = function setDriverSupport2(support) {
                  if (DefinedDrivers[driverName]) {
                    console.info("Redefining LocalForage driver: " + driverName);
                  }
                  DefinedDrivers[driverName] = driverObject;
                  DriverSupport[driverName] = support;
                  resolve2();
                };
                if ("_support" in driverObject) {
                  if (driverObject._support && typeof driverObject._support === "function") {
                    driverObject._support().then(setDriverSupport, reject);
                  } else {
                    setDriverSupport(!!driverObject._support);
                  }
                } else {
                  setDriverSupport(true);
                }
              } catch (e2) {
                reject(e2);
              }
            });
            executeTwoCallbacks(promise, callback, errorCallback);
            return promise;
          };
          LocalForage2.prototype.driver = function driver() {
            return this._driver || null;
          };
          LocalForage2.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
            var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error("Driver not found."));
            executeTwoCallbacks(getDriverPromise, callback, errorCallback);
            return getDriverPromise;
          };
          LocalForage2.prototype.getSerializer = function getSerializer(callback) {
            var serializerPromise = Promise$1.resolve(localforageSerializer);
            executeTwoCallbacks(serializerPromise, callback);
            return serializerPromise;
          };
          LocalForage2.prototype.ready = function ready(callback) {
            var self2 = this;
            var promise = self2._driverSet.then(function() {
              if (self2._ready === null) {
                self2._ready = self2._initDriver();
              }
              return self2._ready;
            });
            executeTwoCallbacks(promise, callback, callback);
            return promise;
          };
          LocalForage2.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
            var self2 = this;
            if (!isArray(drivers)) {
              drivers = [drivers];
            }
            var supportedDrivers = this._getSupportedDrivers(drivers);
            function setDriverToConfig() {
              self2._config.driver = self2.driver();
            }
            function extendSelfWithDriver(driver) {
              self2._extend(driver);
              setDriverToConfig();
              self2._ready = self2._initStorage(self2._config);
              return self2._ready;
            }
            function initDriver(supportedDrivers2) {
              return function() {
                var currentDriverIndex = 0;
                function driverPromiseLoop() {
                  while (currentDriverIndex < supportedDrivers2.length) {
                    var driverName = supportedDrivers2[currentDriverIndex];
                    currentDriverIndex++;
                    self2._dbInfo = null;
                    self2._ready = null;
                    return self2.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                  }
                  setDriverToConfig();
                  var error = new Error("No available storage method found.");
                  self2._driverSet = Promise$1.reject(error);
                  return self2._driverSet;
                }
                return driverPromiseLoop();
              };
            }
            var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function() {
              return Promise$1.resolve();
            }) : Promise$1.resolve();
            this._driverSet = oldDriverSetDone.then(function() {
              var driverName = supportedDrivers[0];
              self2._dbInfo = null;
              self2._ready = null;
              return self2.getDriver(driverName).then(function(driver) {
                self2._driver = driver._driver;
                setDriverToConfig();
                self2._wrapLibraryMethodsWithReady();
                self2._initDriver = initDriver(supportedDrivers);
              });
            })["catch"](function() {
              setDriverToConfig();
              var error = new Error("No available storage method found.");
              self2._driverSet = Promise$1.reject(error);
              return self2._driverSet;
            });
            executeTwoCallbacks(this._driverSet, callback, errorCallback);
            return this._driverSet;
          };
          LocalForage2.prototype.supports = function supports(driverName) {
            return !!DriverSupport[driverName];
          };
          LocalForage2.prototype._extend = function _extend(libraryMethodsAndProperties) {
            extend(this, libraryMethodsAndProperties);
          };
          LocalForage2.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
            var supportedDrivers = [];
            for (var i = 0, len = drivers.length; i < len; i++) {
              var driverName = drivers[i];
              if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
              }
            }
            return supportedDrivers;
          };
          LocalForage2.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
            for (var i = 0, len = LibraryMethods.length; i < len; i++) {
              callWhenReady(this, LibraryMethods[i]);
            }
          };
          LocalForage2.prototype.createInstance = function createInstance(options) {
            return new LocalForage2(options);
          };
          return LocalForage2;
        }();
        var localforage_js = new LocalForage();
        module4.exports = localforage_js;
      }, { "3": 3 }] }, {}, [4])(4);
    });
  }
});

// ../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/offline.js
var require_offline2 = __commonJS({
  "../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/offline.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var localForage = require_localforage();
    var WINDOW = utils.GLOBAL_OBJ;
    var Offline = class {
      static __initStatic() {
        this.id = "Offline";
      }
      constructor(options = {}) {
        this.name = Offline.id;
        this.maxStoredEvents = options.maxStoredEvents || 30;
        this.offlineEventStore = localForage.default.createInstance({
          name: "sentry/offlineEventStore"
        });
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        this.hub = getCurrentHub();
        if ("addEventListener" in WINDOW) {
          WINDOW.addEventListener("online", () => {
            void this._sendEvents().catch(() => {
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("could not send cached events");
            });
          });
        }
        const eventProcessor = (event) => {
          if (this.hub && this.hub.getIntegration(Offline)) {
            if ("navigator" in WINDOW && "onLine" in WINDOW.navigator && !WINDOW.navigator.onLine) {
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("Event dropped due to being a offline - caching instead");
              void this._cacheEvent(event).then((_event) => this._enforceMaxEvents()).catch((_error) => {
                (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("could not cache event while offline");
              });
              return null;
            }
          }
          return event;
        };
        eventProcessor.id = this.name;
        addGlobalEventProcessor(eventProcessor);
        if ("navigator" in WINDOW && "onLine" in WINDOW.navigator && WINDOW.navigator.onLine) {
          void this._sendEvents().catch(() => {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("could not send cached events");
          });
        }
      }
      async _cacheEvent(event) {
        return this.offlineEventStore.setItem(utils.uuid4(), utils.normalize(event));
      }
      async _enforceMaxEvents() {
        const events = [];
        return this.offlineEventStore.iterate((event, cacheKey, _index) => {
          events.push({ cacheKey, event });
        }).then(
          () => this._purgeEvents(
            events.sort((a2, b3) => (b3.event.timestamp || 0) - (a2.event.timestamp || 0)).slice(this.maxStoredEvents < events.length ? this.maxStoredEvents : events.length).map((event) => event.cacheKey)
          )
        ).catch((_error) => {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("could not enforce max events");
        });
      }
      async _purgeEvent(cacheKey) {
        return this.offlineEventStore.removeItem(cacheKey);
      }
      async _purgeEvents(cacheKeys) {
        return Promise.all(cacheKeys.map((cacheKey) => this._purgeEvent(cacheKey))).then();
      }
      async _sendEvents() {
        return this.offlineEventStore.iterate((event, cacheKey, _index) => {
          if (this.hub) {
            this.hub.captureEvent(event);
            void this._purgeEvent(cacheKey).catch((_error) => {
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("could not purge event from cache");
            });
          } else {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("no hub found - could not send cached event");
          }
        });
      }
    };
    Offline.__initStatic();
    exports.Offline = Offline;
  }
});

// ../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/reportingobserver.js
var require_reportingobserver = __commonJS({
  "../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/reportingobserver.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var WINDOW = utils.GLOBAL_OBJ;
    var ReportingObserver = class {
      static __initStatic() {
        this.id = "ReportingObserver";
      }
      constructor(options = {}) {
        this.name = ReportingObserver.id;
        this._types = options.types || ["crash", "deprecation", "intervention"];
      }
      setupOnce(_3, getCurrentHub) {
        if (!utils.supportsReportingObserver()) {
          return;
        }
        this._getCurrentHub = getCurrentHub;
        const observer = new WINDOW.ReportingObserver(this.handler.bind(this), {
          buffered: true,
          types: this._types
        });
        observer.observe();
      }
      handler(reports) {
        const hub = this._getCurrentHub && this._getCurrentHub();
        if (!hub || !hub.getIntegration(ReportingObserver)) {
          return;
        }
        for (const report of reports) {
          hub.withScope((scope) => {
            scope.setExtra("url", report.url);
            const label = `ReportingObserver [${report.type}]`;
            let details = "No details available";
            if (report.body) {
              const plainBody = {};
              for (const prop in report.body) {
                plainBody[prop] = report.body[prop];
              }
              scope.setExtra("body", plainBody);
              if (report.type === "crash") {
                const body = report.body;
                details = [body.crashId || "", body.reason || ""].join(" ").trim() || details;
              } else {
                const body = report.body;
                details = body.message || details;
              }
            }
            hub.captureMessage(`${label}: ${details}`);
          });
        }
      }
    };
    ReportingObserver.__initStatic();
    exports.ReportingObserver = ReportingObserver;
  }
});

// ../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/rewriteframes.js
var require_rewriteframes = __commonJS({
  "../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/rewriteframes.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var RewriteFrames = class {
      static __initStatic() {
        this.id = "RewriteFrames";
      }
      constructor(options = {}) {
        RewriteFrames.prototype.__init.call(this);
        this.name = RewriteFrames.id;
        if (options.root) {
          this._root = options.root;
        }
        this._prefix = options.prefix || "app:///";
        if (options.iteratee) {
          this._iteratee = options.iteratee;
        }
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        addGlobalEventProcessor((event) => {
          const self2 = getCurrentHub().getIntegration(RewriteFrames);
          if (self2) {
            return self2.process(event);
          }
          return event;
        });
      }
      process(originalEvent) {
        let processedEvent = originalEvent;
        if (originalEvent.exception && Array.isArray(originalEvent.exception.values)) {
          processedEvent = this._processExceptionsEvent(processedEvent);
        }
        return processedEvent;
      }
      __init() {
        this._iteratee = (frame) => {
          if (!frame.filename) {
            return frame;
          }
          const isWindowsFrame = /^[a-zA-Z]:\\/.test(frame.filename) || frame.filename.includes("\\") && !frame.filename.includes("/");
          const startsWithSlash = /^\//.test(frame.filename);
          if (isWindowsFrame || startsWithSlash) {
            const filename = isWindowsFrame ? frame.filename.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/") : frame.filename;
            const base = this._root ? utils.relative(this._root, filename) : utils.basename(filename);
            frame.filename = `${this._prefix}${base}`;
          }
          return frame;
        };
      }
      _processExceptionsEvent(event) {
        try {
          return {
            ...event,
            exception: {
              ...event.exception,
              values: event.exception.values.map((value) => ({
                ...value,
                ...value.stacktrace && { stacktrace: this._processStacktrace(value.stacktrace) }
              }))
            }
          };
        } catch (_oO) {
          return event;
        }
      }
      _processStacktrace(stacktrace) {
        return {
          ...stacktrace,
          frames: stacktrace && stacktrace.frames && stacktrace.frames.map((f3) => this._iteratee(f3))
        };
      }
    };
    RewriteFrames.__initStatic();
    exports.RewriteFrames = RewriteFrames;
  }
});

// ../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/sessiontiming.js
var require_sessiontiming = __commonJS({
  "../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/sessiontiming.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var SessionTiming = class {
      static __initStatic() {
        this.id = "SessionTiming";
      }
      constructor() {
        this.name = SessionTiming.id;
        this._startTime = Date.now();
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        addGlobalEventProcessor((event) => {
          const self2 = getCurrentHub().getIntegration(SessionTiming);
          if (self2) {
            return self2.process(event);
          }
          return event;
        });
      }
      process(event) {
        const now = Date.now();
        return {
          ...event,
          extra: {
            ...event.extra,
            ["session:start"]: this._startTime,
            ["session:duration"]: now - this._startTime,
            ["session:end"]: now
          }
        };
      }
    };
    SessionTiming.__initStatic();
    exports.SessionTiming = SessionTiming;
  }
});

// ../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/transaction.js
var require_transaction2 = __commonJS({
  "../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/transaction.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var Transaction = class {
      static __initStatic() {
        this.id = "Transaction";
      }
      constructor() {
        this.name = Transaction.id;
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        addGlobalEventProcessor((event) => {
          const self2 = getCurrentHub().getIntegration(Transaction);
          if (self2) {
            return self2.process(event);
          }
          return event;
        });
      }
      process(event) {
        const frames = this._getFramesFromEvent(event);
        for (let i = frames.length - 1; i >= 0; i--) {
          const frame = frames[i];
          if (frame.in_app === true) {
            event.transaction = this._getTransaction(frame);
            break;
          }
        }
        return event;
      }
      _getFramesFromEvent(event) {
        const exception = event.exception && event.exception.values && event.exception.values[0];
        return exception && exception.stacktrace && exception.stacktrace.frames || [];
      }
      _getTransaction(frame) {
        return frame.module || frame.function ? `${frame.module || "?"}/${frame.function || "?"}` : "<unknown>";
      }
    };
    Transaction.__initStatic();
    exports.Transaction = Transaction;
  }
});

// ../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/httpclient.js
var require_httpclient = __commonJS({
  "../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/httpclient.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var HttpClient = class {
      static __initStatic() {
        this.id = "HttpClient";
      }
      constructor(options) {
        this.name = HttpClient.id;
        this._options = {
          failedRequestStatusCodes: [[500, 599]],
          failedRequestTargets: [/.*/],
          ...options
        };
      }
      setupOnce(_3, getCurrentHub) {
        this._getCurrentHub = getCurrentHub;
        this._wrapFetch();
        this._wrapXHR();
      }
      _fetchResponseHandler(requestInfo, response, requestInit) {
        if (this._getCurrentHub && this._shouldCaptureResponse(response.status, response.url)) {
          const request = _getRequest(requestInfo, requestInit);
          const hub = this._getCurrentHub();
          let requestHeaders, responseHeaders, requestCookies, responseCookies;
          if (hub.shouldSendDefaultPii()) {
            [{ headers: requestHeaders, cookies: requestCookies }, { headers: responseHeaders, cookies: responseCookies }] = [
              { cookieHeader: "Cookie", obj: request },
              { cookieHeader: "Set-Cookie", obj: response }
            ].map(({ cookieHeader, obj }) => {
              const headers = this._extractFetchHeaders(obj.headers);
              let cookies;
              try {
                const cookieString = headers[cookieHeader] || headers[cookieHeader.toLowerCase()] || void 0;
                if (cookieString) {
                  cookies = this._parseCookieString(cookieString);
                }
              } catch (e2) {
                (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log(`Could not extract cookies from header ${cookieHeader}`);
              }
              return {
                headers,
                cookies
              };
            });
          }
          const event = this._createEvent({
            url: request.url,
            method: request.method,
            status: response.status,
            requestHeaders,
            responseHeaders,
            requestCookies,
            responseCookies
          });
          hub.captureEvent(event);
        }
      }
      _xhrResponseHandler(xhr, method, headers) {
        if (this._getCurrentHub && this._shouldCaptureResponse(xhr.status, xhr.responseURL)) {
          let requestHeaders, responseCookies, responseHeaders;
          const hub = this._getCurrentHub();
          if (hub.shouldSendDefaultPii()) {
            try {
              const cookieString = xhr.getResponseHeader("Set-Cookie") || xhr.getResponseHeader("set-cookie") || void 0;
              if (cookieString) {
                responseCookies = this._parseCookieString(cookieString);
              }
            } catch (e2) {
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("Could not extract cookies from response headers");
            }
            try {
              responseHeaders = this._getXHRResponseHeaders(xhr);
            } catch (e2) {
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.log("Could not extract headers from response");
            }
            requestHeaders = headers;
          }
          const event = this._createEvent({
            url: xhr.responseURL,
            method,
            status: xhr.status,
            requestHeaders,
            responseHeaders,
            responseCookies
          });
          hub.captureEvent(event);
        }
      }
      _getResponseSizeFromHeaders(headers) {
        if (headers) {
          const contentLength = headers["Content-Length"] || headers["content-length"];
          if (contentLength) {
            return parseInt(contentLength, 10);
          }
        }
        return void 0;
      }
      _parseCookieString(cookieString) {
        return cookieString.split("; ").reduce((acc, cookie) => {
          const [key, value] = cookie.split("=");
          acc[key] = value;
          return acc;
        }, {});
      }
      _extractFetchHeaders(headers) {
        const result = {};
        headers.forEach((value, key) => {
          result[key] = value;
        });
        return result;
      }
      _getXHRResponseHeaders(xhr) {
        const headers = xhr.getAllResponseHeaders();
        if (!headers) {
          return {};
        }
        return headers.split("\r\n").reduce((acc, line) => {
          const [key, value] = line.split(": ");
          acc[key] = value;
          return acc;
        }, {});
      }
      _isInGivenRequestTargets(target) {
        if (!this._options.failedRequestTargets) {
          return false;
        }
        return this._options.failedRequestTargets.some((givenRequestTarget) => {
          if (typeof givenRequestTarget === "string") {
            return target.includes(givenRequestTarget);
          }
          return givenRequestTarget.test(target);
        });
      }
      _isInGivenStatusRanges(status) {
        if (!this._options.failedRequestStatusCodes) {
          return false;
        }
        return this._options.failedRequestStatusCodes.some((range) => {
          if (typeof range === "number") {
            return range === status;
          }
          return status >= range[0] && status <= range[1];
        });
      }
      _wrapFetch() {
        if (!utils.supportsNativeFetch()) {
          return;
        }
        utils.addInstrumentationHandler("fetch", (handlerData) => {
          const { response, args } = handlerData;
          const [requestInfo, requestInit] = args;
          if (!response) {
            return;
          }
          this._fetchResponseHandler(requestInfo, response, requestInit);
        });
      }
      _wrapXHR() {
        if (!("XMLHttpRequest" in utils.GLOBAL_OBJ)) {
          return;
        }
        utils.addInstrumentationHandler(
          "xhr",
          (handlerData) => {
            const { xhr } = handlerData;
            const sentryXhrData = xhr[utils.SENTRY_XHR_DATA_KEY];
            if (!sentryXhrData) {
              return;
            }
            const { method, request_headers: headers } = sentryXhrData;
            if (!method) {
              return;
            }
            try {
              this._xhrResponseHandler(xhr, method, headers);
            } catch (e2) {
              (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && utils.logger.warn("Error while extracting response event form XHR response", e2);
            }
          }
        );
      }
      _isSentryRequest(url2) {
        const client = this._getCurrentHub && this._getCurrentHub().getClient();
        if (!client) {
          return false;
        }
        const dsn = client.getDsn();
        return dsn ? url2.includes(dsn.host) : false;
      }
      _shouldCaptureResponse(status, url2) {
        return this._isInGivenStatusRanges(status) && this._isInGivenRequestTargets(url2) && !this._isSentryRequest(url2);
      }
      _createEvent(data) {
        const message = `HTTP Client Error with status code: ${data.status}`;
        const event = {
          message,
          exception: {
            values: [
              {
                type: "Error",
                value: message
              }
            ]
          },
          request: {
            url: data.url,
            method: data.method,
            headers: data.requestHeaders,
            cookies: data.requestCookies
          },
          contexts: {
            response: {
              status_code: data.status,
              headers: data.responseHeaders,
              cookies: data.responseCookies,
              body_size: this._getResponseSizeFromHeaders(data.responseHeaders)
            }
          }
        };
        utils.addExceptionMechanism(event, {
          type: "http.client",
          handled: false
        });
        return event;
      }
    };
    HttpClient.__initStatic();
    function _getRequest(requestInfo, requestInit) {
      if (!requestInit && requestInfo instanceof Request) {
        return requestInfo;
      }
      if (requestInfo instanceof Request && requestInfo.bodyUsed) {
        return requestInfo;
      }
      return new Request(requestInfo, requestInit);
    }
    exports.HttpClient = HttpClient;
  }
});

// ../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/contextlines.js
var require_contextlines2 = __commonJS({
  "../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/contextlines.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_cjs();
    var WINDOW = utils.GLOBAL_OBJ;
    var DEFAULT_LINES_OF_CONTEXT = 7;
    var ContextLines = class {
      static __initStatic() {
        this.id = "ContextLines";
      }
      constructor(_options = {}) {
        this._options = _options;
        this.name = ContextLines.id;
      }
      setupOnce(addGlobalEventProcessor, getCurrentHub) {
        addGlobalEventProcessor((event) => {
          const self2 = getCurrentHub().getIntegration(ContextLines);
          if (!self2) {
            return event;
          }
          return this.addSourceContext(event);
        });
      }
      addSourceContext(event) {
        const doc = WINDOW.document;
        const htmlFilename = WINDOW.location && utils.stripUrlQueryAndFragment(WINDOW.location.href);
        if (!doc || !htmlFilename) {
          return event;
        }
        const exceptions = event.exception && event.exception.values;
        if (!exceptions || !exceptions.length) {
          return event;
        }
        const html = doc.documentElement.innerHTML;
        if (!html) {
          return event;
        }
        const htmlLines = ["<!DOCTYPE html>", "<html>", ...html.split("\n"), "</html>"];
        exceptions.forEach((exception) => {
          const stacktrace = exception.stacktrace;
          if (stacktrace && stacktrace.frames) {
            stacktrace.frames = stacktrace.frames.map(
              (frame) => applySourceContextToFrame(
                frame,
                htmlLines,
                htmlFilename,
                this._options.frameContextLines != null ? this._options.frameContextLines : DEFAULT_LINES_OF_CONTEXT
              )
            );
          }
        });
        return event;
      }
    };
    ContextLines.__initStatic();
    function applySourceContextToFrame(frame, htmlLines, htmlFilename, linesOfContext) {
      if (frame.filename !== htmlFilename || !frame.lineno || !htmlLines.length) {
        return frame;
      }
      utils.addContextToFrame(htmlLines, frame, linesOfContext);
      return frame;
    }
    exports.ContextLines = ContextLines;
    exports.applySourceContextToFrame = applySourceContextToFrame;
  }
});

// ../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/index.js
var require_cjs5 = __commonJS({
  "../../node_modules/.pnpm/@sentry+integrations@7.69.0/node_modules/@sentry/integrations/cjs/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var captureconsole = require_captureconsole();
    var debug = require_debug();
    var dedupe = require_dedupe();
    var extraerrordata = require_extraerrordata();
    var offline = require_offline2();
    var reportingobserver = require_reportingobserver();
    var rewriteframes = require_rewriteframes();
    var sessiontiming = require_sessiontiming();
    var transaction = require_transaction2();
    var httpclient = require_httpclient();
    var contextlines = require_contextlines2();
    exports.CaptureConsole = captureconsole.CaptureConsole;
    exports.Debug = debug.Debug;
    exports.Dedupe = dedupe.Dedupe;
    exports.ExtraErrorData = extraerrordata.ExtraErrorData;
    exports.Offline = offline.Offline;
    exports.ReportingObserver = reportingobserver.ReportingObserver;
    exports.RewriteFrames = rewriteframes.RewriteFrames;
    exports.SessionTiming = sessiontiming.SessionTiming;
    exports.Transaction = transaction.Transaction;
    exports.HttpClient = httpclient.HttpClient;
    exports.ContextLines = contextlines.ContextLines;
  }
});

// ../../node_modules/.pnpm/@clack+core@0.3.3/node_modules/@clack/core/dist/index.mjs
var import_sisteransi = __toESM(require_src(), 1);
var import_node_process = require("node:process");
var f = __toESM(require("node:readline"), 1);
var import_node_readline = __toESM(require("node:readline"), 1);
var import_node_tty = require("node:tty");
function z({ onlyFirst: t = false } = {}) {
  const u = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
  return new RegExp(u, t ? void 0 : "g");
}
function $(t) {
  if (typeof t != "string")
    throw new TypeError(`Expected a \`string\`, got \`${typeof t}\``);
  return t.replace(z(), "");
}
var m = {};
var G = { get exports() {
  return m;
}, set exports(t) {
  m = t;
} };
(function(t) {
  var u = {};
  t.exports = u, u.eastAsianWidth = function(e2) {
    var s = e2.charCodeAt(0), C2 = e2.length == 2 ? e2.charCodeAt(1) : 0, D = s;
    return 55296 <= s && s <= 56319 && 56320 <= C2 && C2 <= 57343 && (s &= 1023, C2 &= 1023, D = s << 10 | C2, D += 65536), D == 12288 || 65281 <= D && D <= 65376 || 65504 <= D && D <= 65510 ? "F" : D == 8361 || 65377 <= D && D <= 65470 || 65474 <= D && D <= 65479 || 65482 <= D && D <= 65487 || 65490 <= D && D <= 65495 || 65498 <= D && D <= 65500 || 65512 <= D && D <= 65518 ? "H" : 4352 <= D && D <= 4447 || 4515 <= D && D <= 4519 || 4602 <= D && D <= 4607 || 9001 <= D && D <= 9002 || 11904 <= D && D <= 11929 || 11931 <= D && D <= 12019 || 12032 <= D && D <= 12245 || 12272 <= D && D <= 12283 || 12289 <= D && D <= 12350 || 12353 <= D && D <= 12438 || 12441 <= D && D <= 12543 || 12549 <= D && D <= 12589 || 12593 <= D && D <= 12686 || 12688 <= D && D <= 12730 || 12736 <= D && D <= 12771 || 12784 <= D && D <= 12830 || 12832 <= D && D <= 12871 || 12880 <= D && D <= 13054 || 13056 <= D && D <= 19903 || 19968 <= D && D <= 42124 || 42128 <= D && D <= 42182 || 43360 <= D && D <= 43388 || 44032 <= D && D <= 55203 || 55216 <= D && D <= 55238 || 55243 <= D && D <= 55291 || 63744 <= D && D <= 64255 || 65040 <= D && D <= 65049 || 65072 <= D && D <= 65106 || 65108 <= D && D <= 65126 || 65128 <= D && D <= 65131 || 110592 <= D && D <= 110593 || 127488 <= D && D <= 127490 || 127504 <= D && D <= 127546 || 127552 <= D && D <= 127560 || 127568 <= D && D <= 127569 || 131072 <= D && D <= 194367 || 177984 <= D && D <= 196605 || 196608 <= D && D <= 262141 ? "W" : 32 <= D && D <= 126 || 162 <= D && D <= 163 || 165 <= D && D <= 166 || D == 172 || D == 175 || 10214 <= D && D <= 10221 || 10629 <= D && D <= 10630 ? "Na" : D == 161 || D == 164 || 167 <= D && D <= 168 || D == 170 || 173 <= D && D <= 174 || 176 <= D && D <= 180 || 182 <= D && D <= 186 || 188 <= D && D <= 191 || D == 198 || D == 208 || 215 <= D && D <= 216 || 222 <= D && D <= 225 || D == 230 || 232 <= D && D <= 234 || 236 <= D && D <= 237 || D == 240 || 242 <= D && D <= 243 || 247 <= D && D <= 250 || D == 252 || D == 254 || D == 257 || D == 273 || D == 275 || D == 283 || 294 <= D && D <= 295 || D == 299 || 305 <= D && D <= 307 || D == 312 || 319 <= D && D <= 322 || D == 324 || 328 <= D && D <= 331 || D == 333 || 338 <= D && D <= 339 || 358 <= D && D <= 359 || D == 363 || D == 462 || D == 464 || D == 466 || D == 468 || D == 470 || D == 472 || D == 474 || D == 476 || D == 593 || D == 609 || D == 708 || D == 711 || 713 <= D && D <= 715 || D == 717 || D == 720 || 728 <= D && D <= 731 || D == 733 || D == 735 || 768 <= D && D <= 879 || 913 <= D && D <= 929 || 931 <= D && D <= 937 || 945 <= D && D <= 961 || 963 <= D && D <= 969 || D == 1025 || 1040 <= D && D <= 1103 || D == 1105 || D == 8208 || 8211 <= D && D <= 8214 || 8216 <= D && D <= 8217 || 8220 <= D && D <= 8221 || 8224 <= D && D <= 8226 || 8228 <= D && D <= 8231 || D == 8240 || 8242 <= D && D <= 8243 || D == 8245 || D == 8251 || D == 8254 || D == 8308 || D == 8319 || 8321 <= D && D <= 8324 || D == 8364 || D == 8451 || D == 8453 || D == 8457 || D == 8467 || D == 8470 || 8481 <= D && D <= 8482 || D == 8486 || D == 8491 || 8531 <= D && D <= 8532 || 8539 <= D && D <= 8542 || 8544 <= D && D <= 8555 || 8560 <= D && D <= 8569 || D == 8585 || 8592 <= D && D <= 8601 || 8632 <= D && D <= 8633 || D == 8658 || D == 8660 || D == 8679 || D == 8704 || 8706 <= D && D <= 8707 || 8711 <= D && D <= 8712 || D == 8715 || D == 8719 || D == 8721 || D == 8725 || D == 8730 || 8733 <= D && D <= 8736 || D == 8739 || D == 8741 || 8743 <= D && D <= 8748 || D == 8750 || 8756 <= D && D <= 8759 || 8764 <= D && D <= 8765 || D == 8776 || D == 8780 || D == 8786 || 8800 <= D && D <= 8801 || 8804 <= D && D <= 8807 || 8810 <= D && D <= 8811 || 8814 <= D && D <= 8815 || 8834 <= D && D <= 8835 || 8838 <= D && D <= 8839 || D == 8853 || D == 8857 || D == 8869 || D == 8895 || D == 8978 || 9312 <= D && D <= 9449 || 9451 <= D && D <= 9547 || 9552 <= D && D <= 9587 || 9600 <= D && D <= 9615 || 9618 <= D && D <= 9621 || 9632 <= D && D <= 9633 || 9635 <= D && D <= 9641 || 9650 <= D && D <= 9651 || 9654 <= D && D <= 9655 || 9660 <= D && D <= 9661 || 9664 <= D && D <= 9665 || 9670 <= D && D <= 9672 || D == 9675 || 9678 <= D && D <= 9681 || 9698 <= D && D <= 9701 || D == 9711 || 9733 <= D && D <= 9734 || D == 9737 || 9742 <= D && D <= 9743 || 9748 <= D && D <= 9749 || D == 9756 || D == 9758 || D == 9792 || D == 9794 || 9824 <= D && D <= 9825 || 9827 <= D && D <= 9829 || 9831 <= D && D <= 9834 || 9836 <= D && D <= 9837 || D == 9839 || 9886 <= D && D <= 9887 || 9918 <= D && D <= 9919 || 9924 <= D && D <= 9933 || 9935 <= D && D <= 9953 || D == 9955 || 9960 <= D && D <= 9983 || D == 10045 || D == 10071 || 10102 <= D && D <= 10111 || 11093 <= D && D <= 11097 || 12872 <= D && D <= 12879 || 57344 <= D && D <= 63743 || 65024 <= D && D <= 65039 || D == 65533 || 127232 <= D && D <= 127242 || 127248 <= D && D <= 127277 || 127280 <= D && D <= 127337 || 127344 <= D && D <= 127386 || 917760 <= D && D <= 917999 || 983040 <= D && D <= 1048573 || 1048576 <= D && D <= 1114109 ? "A" : "N";
  }, u.characterLength = function(e2) {
    var s = this.eastAsianWidth(e2);
    return s == "F" || s == "W" || s == "A" ? 2 : 1;
  };
  function F(e2) {
    return e2.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
  }
  u.length = function(e2) {
    for (var s = F(e2), C2 = 0, D = 0; D < s.length; D++)
      C2 = C2 + this.characterLength(s[D]);
    return C2;
  }, u.slice = function(e2, s, C2) {
    textLen = u.length(e2), s = s || 0, C2 = C2 || 1, s < 0 && (s = textLen + s), C2 < 0 && (C2 = textLen + C2);
    for (var D = "", i = 0, o2 = F(e2), E2 = 0; E2 < o2.length; E2++) {
      var a2 = o2[E2], n = u.length(a2);
      if (i >= s - (n == 2 ? 1 : 0))
        if (i + n <= C2)
          D += a2;
        else
          break;
      i += n;
    }
    return D;
  };
})(G);
var K = m;
var Y = function() {
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
function c(t, u = {}) {
  if (typeof t != "string" || t.length === 0 || (u = { ambiguousIsNarrow: true, ...u }, t = $(t), t.length === 0))
    return 0;
  t = t.replace(Y(), "  ");
  const F = u.ambiguousIsNarrow ? 1 : 2;
  let e2 = 0;
  for (const s of t) {
    const C2 = s.codePointAt(0);
    if (C2 <= 31 || C2 >= 127 && C2 <= 159 || C2 >= 768 && C2 <= 879)
      continue;
    switch (K.eastAsianWidth(s)) {
      case "F":
      case "W":
        e2 += 2;
        break;
      case "A":
        e2 += F;
        break;
      default:
        e2 += 1;
    }
  }
  return e2;
}
var v = 10;
var M = (t = 0) => (u) => `\x1B[${u + t}m`;
var L = (t = 0) => (u) => `\x1B[${38 + t};5;${u}m`;
var T = (t = 0) => (u, F, e2) => `\x1B[${38 + t};2;${u};${F};${e2}m`;
var r = { modifier: { reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], overline: [53, 55], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29] }, color: { black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39], magenta: [35, 39], cyan: [36, 39], white: [37, 39], blackBright: [90, 39], gray: [90, 39], grey: [90, 39], redBright: [91, 39], greenBright: [92, 39], yellowBright: [93, 39], blueBright: [94, 39], magentaBright: [95, 39], cyanBright: [96, 39], whiteBright: [97, 39] }, bgColor: { bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49], bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49], bgBlackBright: [100, 49], bgGray: [100, 49], bgGrey: [100, 49], bgRedBright: [101, 49], bgGreenBright: [102, 49], bgYellowBright: [103, 49], bgBlueBright: [104, 49], bgMagentaBright: [105, 49], bgCyanBright: [106, 49], bgWhiteBright: [107, 49] } };
Object.keys(r.modifier);
var Z = Object.keys(r.color);
var H = Object.keys(r.bgColor);
[...Z, ...H];
function U() {
  const t = /* @__PURE__ */ new Map();
  for (const [u, F] of Object.entries(r)) {
    for (const [e2, s] of Object.entries(F))
      r[e2] = { open: `\x1B[${s[0]}m`, close: `\x1B[${s[1]}m` }, F[e2] = r[e2], t.set(s[0], s[1]);
    Object.defineProperty(r, u, { value: F, enumerable: false });
  }
  return Object.defineProperty(r, "codes", { value: t, enumerable: false }), r.color.close = "\x1B[39m", r.bgColor.close = "\x1B[49m", r.color.ansi = M(), r.color.ansi256 = L(), r.color.ansi16m = T(), r.bgColor.ansi = M(v), r.bgColor.ansi256 = L(v), r.bgColor.ansi16m = T(v), Object.defineProperties(r, { rgbToAnsi256: { value: (u, F, e2) => u === F && F === e2 ? u < 8 ? 16 : u > 248 ? 231 : Math.round((u - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(u / 255 * 5) + 6 * Math.round(F / 255 * 5) + Math.round(e2 / 255 * 5), enumerable: false }, hexToRgb: { value: (u) => {
    const F = /[a-f\d]{6}|[a-f\d]{3}/i.exec(u.toString(16));
    if (!F)
      return [0, 0, 0];
    let [e2] = F;
    e2.length === 3 && (e2 = [...e2].map((C2) => C2 + C2).join(""));
    const s = Number.parseInt(e2, 16);
    return [s >> 16 & 255, s >> 8 & 255, s & 255];
  }, enumerable: false }, hexToAnsi256: { value: (u) => r.rgbToAnsi256(...r.hexToRgb(u)), enumerable: false }, ansi256ToAnsi: { value: (u) => {
    if (u < 8)
      return 30 + u;
    if (u < 16)
      return 90 + (u - 8);
    let F, e2, s;
    if (u >= 232)
      F = ((u - 232) * 10 + 8) / 255, e2 = F, s = F;
    else {
      u -= 16;
      const i = u % 36;
      F = Math.floor(u / 36) / 5, e2 = Math.floor(i / 6) / 5, s = i % 6 / 5;
    }
    const C2 = Math.max(F, e2, s) * 2;
    if (C2 === 0)
      return 30;
    let D = 30 + (Math.round(s) << 2 | Math.round(e2) << 1 | Math.round(F));
    return C2 === 2 && (D += 60), D;
  }, enumerable: false }, rgbToAnsi: { value: (u, F, e2) => r.ansi256ToAnsi(r.rgbToAnsi256(u, F, e2)), enumerable: false }, hexToAnsi: { value: (u) => r.ansi256ToAnsi(r.hexToAnsi256(u)), enumerable: false } }), r;
}
var q = U();
var p = /* @__PURE__ */ new Set(["\x1B", "\x9B"]);
var J = 39;
var b = "\x07";
var W = "[";
var Q = "]";
var I = "m";
var w = `${Q}8;;`;
var N = (t) => `${p.values().next().value}${W}${t}${I}`;
var j = (t) => `${p.values().next().value}${w}${t}${b}`;
var X = (t) => t.split(" ").map((u) => c(u));
var _ = (t, u, F) => {
  const e2 = [...u];
  let s = false, C2 = false, D = c($(t[t.length - 1]));
  for (const [i, o2] of e2.entries()) {
    const E2 = c(o2);
    if (D + E2 <= F ? t[t.length - 1] += o2 : (t.push(o2), D = 0), p.has(o2) && (s = true, C2 = e2.slice(i + 1).join("").startsWith(w)), s) {
      C2 ? o2 === b && (s = false, C2 = false) : o2 === I && (s = false);
      continue;
    }
    D += E2, D === F && i < e2.length - 1 && (t.push(""), D = 0);
  }
  !D && t[t.length - 1].length > 0 && t.length > 1 && (t[t.length - 2] += t.pop());
};
var DD = (t) => {
  const u = t.split(" ");
  let F = u.length;
  for (; F > 0 && !(c(u[F - 1]) > 0); )
    F--;
  return F === u.length ? t : u.slice(0, F).join(" ") + u.slice(F).join("");
};
var uD = (t, u, F = {}) => {
  if (F.trim !== false && t.trim() === "")
    return "";
  let e2 = "", s, C2;
  const D = X(t);
  let i = [""];
  for (const [E2, a2] of t.split(" ").entries()) {
    F.trim !== false && (i[i.length - 1] = i[i.length - 1].trimStart());
    let n = c(i[i.length - 1]);
    if (E2 !== 0 && (n >= u && (F.wordWrap === false || F.trim === false) && (i.push(""), n = 0), (n > 0 || F.trim === false) && (i[i.length - 1] += " ", n++)), F.hard && D[E2] > u) {
      const B2 = u - n, A2 = 1 + Math.floor((D[E2] - B2 - 1) / u);
      Math.floor((D[E2] - 1) / u) < A2 && i.push(""), _(i, a2, u);
      continue;
    }
    if (n + D[E2] > u && n > 0 && D[E2] > 0) {
      if (F.wordWrap === false && n < u) {
        _(i, a2, u);
        continue;
      }
      i.push("");
    }
    if (n + D[E2] > u && F.wordWrap === false) {
      _(i, a2, u);
      continue;
    }
    i[i.length - 1] += a2;
  }
  F.trim !== false && (i = i.map((E2) => DD(E2)));
  const o2 = [...i.join(`
`)];
  for (const [E2, a2] of o2.entries()) {
    if (e2 += a2, p.has(a2)) {
      const { groups: B2 } = new RegExp(`(?:\\${W}(?<code>\\d+)m|\\${w}(?<uri>.*)${b})`).exec(o2.slice(E2).join("")) || { groups: {} };
      if (B2.code !== void 0) {
        const A2 = Number.parseFloat(B2.code);
        s = A2 === J ? void 0 : A2;
      } else
        B2.uri !== void 0 && (C2 = B2.uri.length === 0 ? void 0 : B2.uri);
    }
    const n = q.codes.get(Number(s));
    o2[E2 + 1] === `
` ? (C2 && (e2 += j("")), s && n && (e2 += N(n))) : a2 === `
` && (s && n && (e2 += N(s)), C2 && (e2 += j(C2)));
  }
  return e2;
};
function P(t, u, F) {
  return String(t).normalize().replace(/\r\n/g, `
`).split(`
`).map((e2) => uD(e2, u, F)).join(`
`);
}
function FD(t, u) {
  if (t === u)
    return;
  const F = t.split(`
`), e2 = u.split(`
`), s = [];
  for (let C2 = 0; C2 < Math.max(F.length, e2.length); C2++)
    F[C2] !== e2[C2] && s.push(C2);
  return s;
}
var R = Symbol("clack:cancel");
function eD(t) {
  return t === R;
}
function g(t, u) {
  t.isTTY && t.setRawMode(u);
}
var V = /* @__PURE__ */ new Map([["k", "up"], ["j", "down"], ["h", "left"], ["l", "right"]]);
var tD = /* @__PURE__ */ new Set(["up", "down", "left", "right", "space", "enter"]);
var h = class {
  constructor({ render: u, input: F = import_node_process.stdin, output: e2 = import_node_process.stdout, ...s }, C2 = true) {
    this._track = false, this._cursor = 0, this.state = "initial", this.error = "", this.subscribers = /* @__PURE__ */ new Map(), this._prevFrame = "", this.opts = s, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = u.bind(this), this._track = C2, this.input = F, this.output = e2;
  }
  prompt() {
    const u = new import_node_tty.WriteStream(0);
    return u._write = (F, e2, s) => {
      this._track && (this.value = this.rl.line.replace(/\t/g, ""), this._cursor = this.rl.cursor, this.emit("value", this.value)), s();
    }, this.input.pipe(u), this.rl = import_node_readline.default.createInterface({ input: this.input, output: u, tabSize: 2, prompt: "", escapeCodeTimeout: 50 }), import_node_readline.default.emitKeypressEvents(this.input, this.rl), this.rl.prompt(), this.opts.initialValue !== void 0 && this._track && this.rl.write(this.opts.initialValue), this.input.on("keypress", this.onKeypress), g(this.input, true), this.output.on("resize", this.render), this.render(), new Promise((F, e2) => {
      this.once("submit", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), g(this.input, false), F(this.value);
      }), this.once("cancel", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), g(this.input, false), F(R);
      });
    });
  }
  on(u, F) {
    const e2 = this.subscribers.get(u) ?? [];
    e2.push({ cb: F }), this.subscribers.set(u, e2);
  }
  once(u, F) {
    const e2 = this.subscribers.get(u) ?? [];
    e2.push({ cb: F, once: true }), this.subscribers.set(u, e2);
  }
  emit(u, ...F) {
    const e2 = this.subscribers.get(u) ?? [], s = [];
    for (const C2 of e2)
      C2.cb(...F), C2.once && s.push(() => e2.splice(e2.indexOf(C2), 1));
    for (const C2 of s)
      C2();
  }
  unsubscribe() {
    this.subscribers.clear();
  }
  onKeypress(u, F) {
    if (this.state === "error" && (this.state = "active"), F?.name && !this._track && V.has(F.name) && this.emit("cursor", V.get(F.name)), F?.name && tD.has(F.name) && this.emit("cursor", F.name), u && (u.toLowerCase() === "y" || u.toLowerCase() === "n") && this.emit("confirm", u.toLowerCase() === "y"), u && this.emit("key", u.toLowerCase()), F?.name === "return") {
      if (this.opts.validate) {
        const e2 = this.opts.validate(this.value);
        e2 && (this.error = e2, this.state = "error", this.rl.write(this.value));
      }
      this.state !== "error" && (this.state = "submit");
    }
    u === "" && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
  }
  close() {
    this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), g(this.input, false), this.rl.close(), this.emit(`${this.state}`, this.value), this.unsubscribe();
  }
  restoreCursor() {
    const u = P(this._prevFrame, process.stdout.columns, { hard: true }).split(`
`).length - 1;
    this.output.write(import_sisteransi.cursor.move(-999, u * -1));
  }
  render() {
    const u = P(this._render(this) ?? "", process.stdout.columns, { hard: true });
    if (u !== this._prevFrame) {
      if (this.state === "initial")
        this.output.write(import_sisteransi.cursor.hide);
      else {
        const F = FD(this._prevFrame, u);
        if (this.restoreCursor(), F && F?.length === 1) {
          const e2 = F[0];
          this.output.write(import_sisteransi.cursor.move(0, e2)), this.output.write(import_sisteransi.erase.lines(1));
          const s = u.split(`
`);
          this.output.write(s[e2]), this._prevFrame = u, this.output.write(import_sisteransi.cursor.move(0, s.length - e2 - 1));
          return;
        } else if (F && F?.length > 1) {
          const e2 = F[0];
          this.output.write(import_sisteransi.cursor.move(0, e2)), this.output.write(import_sisteransi.erase.down());
          const C2 = u.split(`
`).slice(e2);
          this.output.write(C2.join(`
`)), this._prevFrame = u;
          return;
        }
        this.output.write(import_sisteransi.erase.down());
      }
      this.output.write(u), this.state === "initial" && (this.state = "active"), this._prevFrame = u;
    }
  }
};
var sD = class extends h {
  get cursor() {
    return this.value ? 0 : 1;
  }
  get _value() {
    return this.cursor === 0;
  }
  constructor(u) {
    super(u, false), this.value = !!u.initialValue, this.on("value", () => {
      this.value = this._value;
    }), this.on("confirm", (F) => {
      this.output.write(import_sisteransi.cursor.move(0, -1)), this.value = F, this.state = "submit", this.close();
    }), this.on("cursor", () => {
      this.value = !this.value;
    });
  }
};
var ED = class extends h {
  constructor(u) {
    super(u, false), this.cursor = 0, this.options = u.options, this.cursor = this.options.findIndex(({ value: F }) => F === u.initialValue), this.cursor === -1 && (this.cursor = 0), this.changeValue(), this.on("cursor", (F) => {
      switch (F) {
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
function aD({ input: t = import_node_process.stdin, output: u = import_node_process.stdout, overwrite: F = true, hideCursor: e2 = true } = {}) {
  const s = f.createInterface({ input: t, output: u, prompt: "", tabSize: 1 });
  f.emitKeypressEvents(t, s), t.isTTY && t.setRawMode(true);
  const C2 = (D, { name: i }) => {
    if (String(D) === "" && process.exit(0), !F)
      return;
    let E2 = i === "return" ? 0 : -1, a2 = i === "return" ? -1 : 0;
    f.moveCursor(u, E2, a2, () => {
      f.clearLine(u, 1, () => {
        t.once("keypress", C2);
      });
    });
  };
  return e2 && process.stdout.write(import_sisteransi.cursor.hide), t.once("keypress", C2), () => {
    t.off("keypress", C2), e2 && process.stdout.write(import_sisteransi.cursor.show), t.isTTY && t.setRawMode(false), s.terminal = false, s.close();
  };
}

// ../../node_modules/.pnpm/@clack+prompts@0.7.0/node_modules/@clack/prompts/dist/index.mjs
var import_node_process2 = __toESM(require("node:process"), 1);
var import_picocolors = __toESM(require_picocolors(), 1);
var import_sisteransi2 = __toESM(require_src(), 1);
function q2() {
  return import_node_process2.default.platform !== "win32" ? import_node_process2.default.env.TERM !== "linux" : Boolean(import_node_process2.default.env.CI) || Boolean(import_node_process2.default.env.WT_SESSION) || Boolean(import_node_process2.default.env.TERMINUS_SUBLIME) || import_node_process2.default.env.ConEmuTask === "{cmd::Cmder}" || import_node_process2.default.env.TERM_PROGRAM === "Terminus-Sublime" || import_node_process2.default.env.TERM_PROGRAM === "vscode" || import_node_process2.default.env.TERM === "xterm-256color" || import_node_process2.default.env.TERM === "alacritty" || import_node_process2.default.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
var _2 = q2();
var o = (r2, n) => _2 ? r2 : n;
var H2 = o("\u25C6", "*");
var I2 = o("\u25A0", "x");
var x2 = o("\u25B2", "x");
var S2 = o("\u25C7", "o");
var K2 = o("\u250C", "T");
var a = o("\u2502", "|");
var d2 = o("\u2514", "\u2014");
var b2 = o("\u25CF", ">");
var E = o("\u25CB", " ");
var C = o("\u25FB", "[\u2022]");
var w2 = o("\u25FC", "[+]");
var M2 = o("\u25FB", "[ ]");
var U2 = o("\u25AA", "\u2022");
var B = o("\u2500", "-");
var Z2 = o("\u256E", "+");
var z2 = o("\u251C", "+");
var X2 = o("\u256F", "+");
var J2 = o("\u25CF", "\u2022");
var Y2 = o("\u25C6", "*");
var Q2 = o("\u25B2", "!");
var ee = o("\u25A0", "x");
var y2 = (r2) => {
  switch (r2) {
    case "initial":
    case "active":
      return import_picocolors.default.cyan(H2);
    case "cancel":
      return import_picocolors.default.red(I2);
    case "error":
      return import_picocolors.default.yellow(x2);
    case "submit":
      return import_picocolors.default.green(S2);
  }
};
var se = (r2) => {
  const n = r2.active ?? "Yes", i = r2.inactive ?? "No";
  return new sD({ active: n, inactive: i, initialValue: r2.initialValue ?? true, render() {
    const t = `${import_picocolors.default.gray(a)}
${y2(this.state)}  ${r2.message}
`, s = this.value ? n : i;
    switch (this.state) {
      case "submit":
        return `${t}${import_picocolors.default.gray(a)}  ${import_picocolors.default.dim(s)}`;
      case "cancel":
        return `${t}${import_picocolors.default.gray(a)}  ${import_picocolors.default.strikethrough(import_picocolors.default.dim(s))}
${import_picocolors.default.gray(a)}`;
      default:
        return `${t}${import_picocolors.default.cyan(a)}  ${this.value ? `${import_picocolors.default.green(b2)} ${n}` : `${import_picocolors.default.dim(E)} ${import_picocolors.default.dim(n)}`} ${import_picocolors.default.dim("/")} ${this.value ? `${import_picocolors.default.dim(E)} ${import_picocolors.default.dim(i)}` : `${import_picocolors.default.green(b2)} ${i}`}
${import_picocolors.default.cyan(d2)}
`;
    }
  } }).prompt();
};
var ie = (r2) => {
  const n = (t, s) => {
    const c3 = t.label ?? String(t.value);
    return s === "active" ? `${import_picocolors.default.green(b2)} ${c3} ${t.hint ? import_picocolors.default.dim(`(${t.hint})`) : ""}` : s === "selected" ? `${import_picocolors.default.dim(c3)}` : s === "cancelled" ? `${import_picocolors.default.strikethrough(import_picocolors.default.dim(c3))}` : `${import_picocolors.default.dim(E)} ${import_picocolors.default.dim(c3)}`;
  };
  let i = 0;
  return new ED({ options: r2.options, initialValue: r2.initialValue, render() {
    const t = `${import_picocolors.default.gray(a)}
${y2(this.state)}  ${r2.message}
`;
    switch (this.state) {
      case "submit":
        return `${t}${import_picocolors.default.gray(a)}  ${n(this.options[this.cursor], "selected")}`;
      case "cancel":
        return `${t}${import_picocolors.default.gray(a)}  ${n(this.options[this.cursor], "cancelled")}
${import_picocolors.default.gray(a)}`;
      default: {
        const s = r2.maxItems === void 0 ? 1 / 0 : Math.max(r2.maxItems, 5);
        this.cursor >= i + s - 3 ? i = Math.max(Math.min(this.cursor - s + 3, this.options.length - s), 0) : this.cursor < i + 2 && (i = Math.max(this.cursor - 2, 0));
        const c3 = s < this.options.length && i > 0, l = s < this.options.length && i + s < this.options.length;
        return `${t}${import_picocolors.default.cyan(a)}  ${this.options.slice(i, i + s).map((u, m2, $3) => m2 === 0 && c3 ? import_picocolors.default.dim("...") : m2 === $3.length - 1 && l ? import_picocolors.default.dim("...") : n(u, m2 + i === this.cursor ? "active" : "inactive")).join(`
${import_picocolors.default.cyan(a)}  `)}
${import_picocolors.default.cyan(d2)}
`;
      }
    }
  } }).prompt();
};
var R2 = (r2) => r2.replace(me(), "");
var le = (r2 = "", n = "") => {
  const i = `
${r2}
`.split(`
`), t = R2(n).length, s = Math.max(i.reduce((l, u) => (u = R2(u), u.length > l ? u.length : l), 0), t) + 2, c3 = i.map((l) => `${import_picocolors.default.gray(a)}  ${import_picocolors.default.dim(l)}${" ".repeat(s - R2(l).length)}${import_picocolors.default.gray(a)}`).join(`
`);
  process.stdout.write(`${import_picocolors.default.gray(a)}
${import_picocolors.default.green(S2)}  ${import_picocolors.default.reset(n)} ${import_picocolors.default.gray(B.repeat(Math.max(s - t - 1, 1)) + Z2)}
${c3}
${import_picocolors.default.gray(z2 + B.repeat(s + 2) + X2)}
`);
};
var ue = (r2 = "") => {
  process.stdout.write(`${import_picocolors.default.gray(d2)}  ${import_picocolors.default.red(r2)}

`);
};
var oe = (r2 = "") => {
  process.stdout.write(`${import_picocolors.default.gray(K2)}  ${r2}
`);
};
var $e = (r2 = "") => {
  process.stdout.write(`${import_picocolors.default.gray(a)}
${import_picocolors.default.gray(d2)}  ${r2}

`);
};
var f2 = { message: (r2 = "", { symbol: n = import_picocolors.default.gray(a) } = {}) => {
  const i = [`${import_picocolors.default.gray(a)}`];
  if (r2) {
    const [t, ...s] = r2.split(`
`);
    i.push(`${n}  ${t}`, ...s.map((c3) => `${import_picocolors.default.gray(a)}  ${c3}`));
  }
  process.stdout.write(`${i.join(`
`)}
`);
}, info: (r2) => {
  f2.message(r2, { symbol: import_picocolors.default.blue(J2) });
}, success: (r2) => {
  f2.message(r2, { symbol: import_picocolors.default.green(Y2) });
}, step: (r2) => {
  f2.message(r2, { symbol: import_picocolors.default.green(S2) });
}, warn: (r2) => {
  f2.message(r2, { symbol: import_picocolors.default.yellow(Q2) });
}, warning: (r2) => {
  f2.warn(r2);
}, error: (r2) => {
  f2.message(r2, { symbol: import_picocolors.default.red(ee) });
} };
var de = () => {
  const r2 = _2 ? ["\u25D2", "\u25D0", "\u25D3", "\u25D1"] : ["\u2022", "o", "O", "0"], n = _2 ? 80 : 120;
  let i, t, s = false, c3 = "";
  const l = (v2 = "") => {
    s = true, i = aD(), c3 = v2.replace(/\.+$/, ""), process.stdout.write(`${import_picocolors.default.gray(a)}
`);
    let g2 = 0, p2 = 0;
    t = setInterval(() => {
      const O2 = import_picocolors.default.magenta(r2[g2]), P2 = ".".repeat(Math.floor(p2)).slice(0, 3);
      process.stdout.write(import_sisteransi2.cursor.move(-999, 0)), process.stdout.write(import_sisteransi2.erase.down(1)), process.stdout.write(`${O2}  ${c3}${P2}`), g2 = g2 + 1 < r2.length ? g2 + 1 : 0, p2 = p2 < r2.length ? p2 + 0.125 : 0;
    }, n);
  }, u = (v2 = "", g2 = 0) => {
    c3 = v2 ?? c3, s = false, clearInterval(t);
    const p2 = g2 === 0 ? import_picocolors.default.green(S2) : g2 === 1 ? import_picocolors.default.red(I2) : import_picocolors.default.red(x2);
    process.stdout.write(import_sisteransi2.cursor.move(-999, 0)), process.stdout.write(import_sisteransi2.erase.down(1)), process.stdout.write(`${p2}  ${c3}
`), i();
  }, m2 = (v2 = "") => {
    c3 = v2 ?? c3;
  }, $3 = (v2) => {
    const g2 = v2 > 1 ? "Something went wrong" : "Canceled";
    s && u(g2, v2);
  };
  return process.on("uncaughtExceptionMonitor", () => $3(2)), process.on("unhandledRejection", () => $3(2)), process.on("SIGINT", () => $3(1)), process.on("SIGTERM", () => $3(1)), process.on("exit", $3), { start: l, stop: u, message: m2 };
};
function me() {
  const r2 = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
  return new RegExp(r2, "g");
}

// ../../node_modules/.pnpm/chalk@5.3.0/node_modules/chalk/source/vendor/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
var styles = {
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
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style2] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style2[0]}m`,
        close: `\x1B[${style2[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style2[0], style2[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// ../../node_modules/.pnpm/chalk@5.3.0/node_modules/chalk/source/vendor/supports-color/index.js
var import_node_process3 = __toESM(require("node:process"), 1);
var import_node_os = __toESM(require("node:os"), 1);
var import_node_tty2 = __toESM(require("node:tty"), 1);
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : import_node_process3.default.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
var { env } = import_node_process3.default;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor2 = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor2 === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor2 === void 0) {
    return 0;
  }
  const min = forceColor2 || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (import_node_process3.default.platform === "win32") {
    const osRelease = import_node_os.default.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if ("GITHUB_ACTIONS" in env || "GITEA_ACTIONS" in env) {
      return 3;
    }
    if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream2, options = {}) {
  const level = _supportsColor(stream2, {
    streamIsTTY: stream2 && stream2.isTTY,
    ...options
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: import_node_tty2.default.isatty(1) }),
  stderr: createSupportsColor({ isTTY: import_node_tty2.default.isatty(2) })
};
var supports_color_default = supportsColor;

// ../../node_modules/.pnpm/chalk@5.3.0/node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}

// ../../node_modules/.pnpm/chalk@5.3.0/node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
var GENERATOR = Symbol("GENERATOR");
var STYLER = Symbol("STYLER");
var IS_EMPTY = Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles2 = /* @__PURE__ */ Object.create(null);
var applyOptions = (object, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === void 0 ? colorLevel : options.level;
};
var chalkFactory = (options) => {
  const chalk2 = (...strings) => strings.join(" ");
  applyOptions(chalk2, options);
  Object.setPrototypeOf(chalk2, createChalk.prototype);
  return chalk2;
};
function createChalk(options) {
  return chalkFactory(options);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style2] of Object.entries(ansi_styles_default)) {
  styles2[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style2.open, style2.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles2.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model, level, type, ...arguments_) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model of usedModels) {
  styles2[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles2[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {
}, {
  ...styles2,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }
  return {
    open,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self2, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self2;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self2, string) => {
  if (self2.level <= 0 || !string) {
    return self2[IS_EMPTY] ? "" : string;
  }
  let styler = self2[STYLER];
  if (styler === void 0) {
    return string;
  }
  const { openAll, closeAll } = styler;
  if (string.includes("\x1B")) {
    while (styler !== void 0) {
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string.indexOf("\n");
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }
  return openAll + string + closeAll;
};
Object.defineProperties(createChalk.prototype, styles2);
var chalk = createChalk();
var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;

// src/utils/package-manager.ts
var import_child_process2 = require("child_process");
var path2 = __toESM(require("path"));
var import_promises = require("node:timers/promises");

// ../../node_modules/.pnpm/@antfu+ni@0.21.8/node_modules/@antfu/ni/dist/shared/ni.82314ed6.mjs
var import_node_fs = __toESM(require("node:fs"), 1);
var import_node_path = __toESM(require("node:path"), 1);
var import_node_process4 = __toESM(require("node:process"), 1);
var import_node_url = __toESM(require("node:url"), 1);
var import_node_buffer = require("node:buffer");
var import_node_child_process = __toESM(require("node:child_process"), 1);
var import_child_process = __toESM(require("child_process"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_node_os2 = __toESM(require("node:os"), 1);
var import_assert = __toESM(require("assert"), 1);
var import_events = __toESM(require("events"), 1);
var import_buffer = __toESM(require("buffer"), 1);
var import_stream = __toESM(require("stream"), 1);
var import_util = __toESM(require("util"), 1);
var import_node_util = require("node:util");
var import_os = __toESM(require("os"), 1);
var import_tty = __toESM(require("tty"), 1);
var import_readline = __toESM(require("readline"), 1);
function npmRun(agent) {
  return (args) => {
    if (args.length > 1)
      return `${agent} run ${args[0]} -- ${args.slice(1).join(" ")}`;
    else
      return `${agent} run ${args[0]}`;
  };
}
var yarn = {
  "agent": "yarn {0}",
  "run": "yarn run {0}",
  "install": "yarn install {0}",
  "frozen": "yarn install --frozen-lockfile",
  "global": "yarn global add {0}",
  "add": "yarn add {0}",
  "upgrade": "yarn upgrade {0}",
  "upgrade-interactive": "yarn upgrade-interactive {0}",
  "execute": "npx {0}",
  "uninstall": "yarn remove {0}",
  "global_uninstall": "yarn global remove {0}"
};
var pnpm = {
  "agent": "pnpm {0}",
  "run": "pnpm run {0}",
  "install": "pnpm i {0}",
  "frozen": "pnpm i --frozen-lockfile",
  "global": "pnpm add -g {0}",
  "add": "pnpm add {0}",
  "upgrade": "pnpm update {0}",
  "upgrade-interactive": "pnpm update -i {0}",
  "execute": "pnpm dlx {0}",
  "uninstall": "pnpm remove {0}",
  "global_uninstall": "pnpm remove --global {0}"
};
var bun = {
  "agent": "bun {0}",
  "run": "bun run {0}",
  "install": "bun install {0}",
  "frozen": "bun install --no-save",
  "global": "bun add -g {0}",
  "add": "bun add {0}",
  "upgrade": "bun update {0}",
  "upgrade-interactive": "bun update {0}",
  "execute": "bunx {0}",
  "uninstall": "bun remove {0}",
  "global_uninstall": "bun remove -g {0}"
};
var AGENTS = {
  "npm": {
    "agent": "npm {0}",
    "run": npmRun("npm"),
    "install": "npm i {0}",
    "frozen": "npm ci",
    "global": "npm i -g {0}",
    "add": "npm i {0}",
    "upgrade": "npm update {0}",
    "upgrade-interactive": null,
    "execute": "npx {0}",
    "uninstall": "npm uninstall {0}",
    "global_uninstall": "npm uninstall -g {0}"
  },
  "yarn": yarn,
  "yarn@berry": {
    ...yarn,
    "frozen": "yarn install --immutable",
    "upgrade": "yarn up {0}",
    "upgrade-interactive": "yarn up -i {0}",
    "execute": "yarn dlx {0}",
    "global": "npm i -g {0}",
    "global_uninstall": "npm uninstall -g {0}"
  },
  "pnpm": pnpm,
  "pnpm@6": {
    ...pnpm,
    run: npmRun("pnpm")
  },
  "bun": bun
};
var agents = Object.keys(AGENTS);
var LOCKS = {
  "bun.lockb": "bun",
  "pnpm-lock.yaml": "pnpm",
  "yarn.lock": "yarn",
  "package-lock.json": "npm",
  "npm-shrinkwrap.json": "npm"
};
var INSTALL_PAGE = {
  "bun": "https://bun.sh",
  "pnpm": "https://pnpm.io/installation",
  "pnpm@6": "https://pnpm.io/6.x/installation",
  "yarn": "https://classic.yarnpkg.com/en/docs/install",
  "yarn@berry": "https://yarnpkg.com/getting-started/install",
  "npm": "https://docs.npmjs.com/cli/v8/configuring-npm/install"
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x3) {
  return x3 && x3.__esModule && Object.prototype.hasOwnProperty.call(x3, "default") ? x3["default"] : x3;
}
var { hasOwnProperty } = Object.prototype;
var Node = class {
  value;
  next;
  constructor(value) {
    this.value = value;
  }
};
var Queue = class {
  #head;
  #tail;
  #size;
  constructor() {
    this.clear();
  }
  enqueue(value) {
    const node = new Node(value);
    if (this.#head) {
      this.#tail.next = node;
      this.#tail = node;
    } else {
      this.#head = node;
      this.#tail = node;
    }
    this.#size++;
  }
  dequeue() {
    const current = this.#head;
    if (!current) {
      return;
    }
    this.#head = this.#head.next;
    this.#size--;
    return current.value;
  }
  clear() {
    this.#head = void 0;
    this.#tail = void 0;
    this.#size = 0;
  }
  get size() {
    return this.#size;
  }
  *[Symbol.iterator]() {
    let current = this.#head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
};
function pLimit(concurrency) {
  if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
    throw new TypeError("Expected `concurrency` to be a number from 1 and up");
  }
  const queue = new Queue();
  let activeCount = 0;
  const next2 = () => {
    activeCount--;
    if (queue.size > 0) {
      queue.dequeue()();
    }
  };
  const run2 = async (fn, resolve2, args) => {
    activeCount++;
    const result = (async () => fn(...args))();
    resolve2(result);
    try {
      await result;
    } catch {
    }
    next2();
  };
  const enqueue = (fn, resolve2, args) => {
    queue.enqueue(run2.bind(void 0, fn, resolve2, args));
    (async () => {
      await Promise.resolve();
      if (activeCount < concurrency && queue.size > 0) {
        queue.dequeue()();
      }
    })();
  };
  const generator = (fn, ...args) => new Promise((resolve2) => {
    enqueue(fn, resolve2, args);
  });
  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount
    },
    pendingCount: {
      get: () => queue.size
    },
    clearQueue: {
      value: () => {
        queue.clear();
      }
    }
  });
  return generator;
}
var EndError = class extends Error {
  constructor(value) {
    super();
    this.value = value;
  }
};
var testElement = async (element, tester) => tester(await element);
var finder = async (element) => {
  const values = await Promise.all(element);
  if (values[1] === true) {
    throw new EndError(values[0]);
  }
  return false;
};
async function pLocate(iterable, tester, {
  concurrency = Number.POSITIVE_INFINITY,
  preserveOrder = true
} = {}) {
  const limit = pLimit(concurrency);
  const items = [...iterable].map((element) => [element, limit(testElement, element, tester)]);
  const checkLimit = pLimit(preserveOrder ? 1 : Number.POSITIVE_INFINITY);
  try {
    await Promise.all(items.map((element) => checkLimit(finder, element)));
  } catch (error) {
    if (error instanceof EndError) {
      return error.value;
    }
    throw error;
  }
}
var typeMappings = {
  directory: "isDirectory",
  file: "isFile"
};
function checkType(type) {
  if (type in typeMappings) {
    return;
  }
  throw new Error(`Invalid type specified: ${type}`);
}
var matchType = (type, stat) => type === void 0 || stat[typeMappings[type]]();
var toPath$1 = (urlOrPath) => urlOrPath instanceof URL ? (0, import_node_url.fileURLToPath)(urlOrPath) : urlOrPath;
async function locatePath(paths, {
  cwd = import_node_process4.default.cwd(),
  type = "file",
  allowSymlinks = true,
  concurrency,
  preserveOrder
} = {}) {
  checkType(type);
  cwd = toPath$1(cwd);
  const statFunction = allowSymlinks ? import_node_fs.promises.stat : import_node_fs.promises.lstat;
  return pLocate(paths, async (path_) => {
    try {
      const stat = await statFunction(import_node_path.default.resolve(cwd, path_));
      return matchType(type, stat);
    } catch {
      return false;
    }
  }, { concurrency, preserveOrder });
}
var toPath = (urlOrPath) => urlOrPath instanceof URL ? (0, import_node_url.fileURLToPath)(urlOrPath) : urlOrPath;
var findUpStop = Symbol("findUpStop");
async function findUpMultiple(name, options = {}) {
  let directory = import_node_path.default.resolve(toPath(options.cwd) || "");
  const { root } = import_node_path.default.parse(directory);
  const stopAt = import_node_path.default.resolve(directory, options.stopAt || root);
  const limit = options.limit || Number.POSITIVE_INFINITY;
  const paths = [name].flat();
  const runMatcher = async (locateOptions) => {
    if (typeof name !== "function") {
      return locatePath(paths, locateOptions);
    }
    const foundPath = await name(locateOptions.cwd);
    if (typeof foundPath === "string") {
      return locatePath([foundPath], locateOptions);
    }
    return foundPath;
  };
  const matches = [];
  while (true) {
    const foundPath = await runMatcher({ ...options, cwd: directory });
    if (foundPath === findUpStop) {
      break;
    }
    if (foundPath) {
      matches.push(import_node_path.default.resolve(directory, foundPath));
    }
    if (directory === stopAt || matches.length >= limit) {
      break;
    }
    directory = import_node_path.default.dirname(directory);
  }
  return matches;
}
async function findUp(name, options = {}) {
  const matches = await findUpMultiple(name, { ...options, limit: 1 });
  return matches[0];
}
var customRcPath = import_node_process4.default.env.NI_CONFIG_FILE;
var home = import_node_process4.default.platform === "win32" ? import_node_process4.default.env.USERPROFILE : import_node_process4.default.env.HOME;
var defaultRcPath = import_node_path.default.join(home || "~/", ".nirc");
var crossSpawn$1 = { exports: {} };
var windows;
var hasRequiredWindows;
function requireWindows() {
  if (hasRequiredWindows)
    return windows;
  hasRequiredWindows = 1;
  windows = isexe2;
  isexe2.sync = sync2;
  var fs6 = import_fs.default;
  function checkPathExt(path6, options) {
    var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
    if (!pathext) {
      return true;
    }
    pathext = pathext.split(";");
    if (pathext.indexOf("") !== -1) {
      return true;
    }
    for (var i = 0; i < pathext.length; i++) {
      var p2 = pathext[i].toLowerCase();
      if (p2 && path6.substr(-p2.length).toLowerCase() === p2) {
        return true;
      }
    }
    return false;
  }
  function checkStat(stat, path6, options) {
    if (!stat.isSymbolicLink() && !stat.isFile()) {
      return false;
    }
    return checkPathExt(path6, options);
  }
  function isexe2(path6, options, cb) {
    fs6.stat(path6, function(er, stat) {
      cb(er, er ? false : checkStat(stat, path6, options));
    });
  }
  function sync2(path6, options) {
    return checkStat(fs6.statSync(path6), path6, options);
  }
  return windows;
}
var mode;
var hasRequiredMode;
function requireMode() {
  if (hasRequiredMode)
    return mode;
  hasRequiredMode = 1;
  mode = isexe2;
  isexe2.sync = sync2;
  var fs6 = import_fs.default;
  function isexe2(path6, options, cb) {
    fs6.stat(path6, function(er, stat) {
      cb(er, er ? false : checkStat(stat, options));
    });
  }
  function sync2(path6, options) {
    return checkStat(fs6.statSync(path6), options);
  }
  function checkStat(stat, options) {
    return stat.isFile() && checkMode(stat, options);
  }
  function checkMode(stat, options) {
    var mod = stat.mode;
    var uid = stat.uid;
    var gid = stat.gid;
    var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
    var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
    var u = parseInt("100", 8);
    var g2 = parseInt("010", 8);
    var o2 = parseInt("001", 8);
    var ug = u | g2;
    var ret = mod & o2 || mod & g2 && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
    return ret;
  }
  return mode;
}
var core;
if (process.platform === "win32" || commonjsGlobal.TESTING_WINDOWS) {
  core = requireWindows();
} else {
  core = requireMode();
}
var isexe_1 = isexe$2;
isexe$2.sync = sync;
function isexe$2(path6, options, cb) {
  if (typeof options === "function") {
    cb = options;
    options = {};
  }
  if (!cb) {
    if (typeof Promise !== "function") {
      throw new TypeError("callback not provided");
    }
    return new Promise(function(resolve2, reject) {
      isexe$2(path6, options || {}, function(er, is) {
        if (er) {
          reject(er);
        } else {
          resolve2(is);
        }
      });
    });
  }
  core(path6, options || {}, function(er, is) {
    if (er) {
      if (er.code === "EACCES" || options && options.ignoreErrors) {
        er = null;
        is = false;
      }
    }
    cb(er, is);
  });
}
function sync(path6, options) {
  try {
    return core.sync(path6, options || {});
  } catch (er) {
    if (options && options.ignoreErrors || er.code === "EACCES") {
      return false;
    } else {
      throw er;
    }
  }
}
var isWindows$1 = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
var path$2 = import_path.default;
var COLON = isWindows$1 ? ";" : ":";
var isexe$1 = isexe_1;
var getNotFoundError$1 = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
var getPathInfo$1 = (cmd, opt) => {
  const colon = opt.colon || COLON;
  const pathEnv = cmd.match(/\//) || isWindows$1 && cmd.match(/\\/) ? [""] : [
    ...isWindows$1 ? [process.cwd()] : [],
    ...(opt.path || process.env.PATH || "").split(colon)
  ];
  const pathExtExe = isWindows$1 ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
  const pathExt = isWindows$1 ? pathExtExe.split(colon) : [""];
  if (isWindows$1) {
    if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
      pathExt.unshift("");
  }
  return {
    pathEnv,
    pathExt,
    pathExtExe
  };
};
var which$3 = (cmd, opt, cb) => {
  if (typeof opt === "function") {
    cb = opt;
    opt = {};
  }
  if (!opt)
    opt = {};
  const { pathEnv, pathExt, pathExtExe } = getPathInfo$1(cmd, opt);
  const found = [];
  const step = (i) => new Promise((resolve2, reject) => {
    if (i === pathEnv.length)
      return opt.all && found.length ? resolve2(found) : reject(getNotFoundError$1(cmd));
    const ppRaw = pathEnv[i];
    const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
    const pCmd = path$2.join(pathPart, cmd);
    const p2 = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
    resolve2(subStep(p2, i, 0));
  });
  const subStep = (p2, i, ii) => new Promise((resolve2, reject) => {
    if (ii === pathExt.length)
      return resolve2(step(i + 1));
    const ext = pathExt[ii];
    isexe$1(p2 + ext, { pathExt: pathExtExe }, (er, is) => {
      if (!er && is) {
        if (opt.all)
          found.push(p2 + ext);
        else
          return resolve2(p2 + ext);
      }
      return resolve2(subStep(p2, i, ii + 1));
    });
  });
  return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
};
var whichSync$1 = (cmd, opt) => {
  opt = opt || {};
  const { pathEnv, pathExt, pathExtExe } = getPathInfo$1(cmd, opt);
  const found = [];
  for (let i = 0; i < pathEnv.length; i++) {
    const ppRaw = pathEnv[i];
    const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
    const pCmd = path$2.join(pathPart, cmd);
    const p2 = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
    for (let j2 = 0; j2 < pathExt.length; j2++) {
      const cur = p2 + pathExt[j2];
      try {
        const is = isexe$1.sync(cur, { pathExt: pathExtExe });
        if (is) {
          if (opt.all)
            found.push(cur);
          else
            return cur;
        }
      } catch (ex) {
      }
    }
  }
  if (opt.all && found.length)
    return found;
  if (opt.nothrow)
    return null;
  throw getNotFoundError$1(cmd);
};
var which_1 = which$3;
which$3.sync = whichSync$1;
var pathKey$2 = { exports: {} };
var pathKey$1 = (options = {}) => {
  const environment = options.env || process.env;
  const platform = options.platform || process.platform;
  if (platform !== "win32") {
    return "PATH";
  }
  return Object.keys(environment).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
};
pathKey$2.exports = pathKey$1;
pathKey$2.exports.default = pathKey$1;
var pathKeyExports = pathKey$2.exports;
var path$1 = import_path.default;
var which$2 = which_1;
var getPathKey = pathKeyExports;
function resolveCommandAttempt(parsed, withoutPathExt) {
  const env3 = parsed.options.env || process.env;
  const cwd = process.cwd();
  const hasCustomCwd = parsed.options.cwd != null;
  const shouldSwitchCwd = hasCustomCwd && process.chdir !== void 0 && !process.chdir.disabled;
  if (shouldSwitchCwd) {
    try {
      process.chdir(parsed.options.cwd);
    } catch (err) {
    }
  }
  let resolved;
  try {
    resolved = which$2.sync(parsed.command, {
      path: env3[getPathKey({ env: env3 })],
      pathExt: withoutPathExt ? path$1.delimiter : void 0
    });
  } catch (e2) {
  } finally {
    if (shouldSwitchCwd) {
      process.chdir(cwd);
    }
  }
  if (resolved) {
    resolved = path$1.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
  }
  return resolved;
}
function resolveCommand$1(parsed) {
  return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
}
var resolveCommand_1 = resolveCommand$1;
var _escape = {};
var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
function escapeCommand(arg) {
  arg = arg.replace(metaCharsRegExp, "^$1");
  return arg;
}
function escapeArgument(arg, doubleEscapeMetaChars) {
  arg = `${arg}`;
  arg = arg.replace(/(\\*)"/g, '$1$1\\"');
  arg = arg.replace(/(\\*)$/, "$1$1");
  arg = `"${arg}"`;
  arg = arg.replace(metaCharsRegExp, "^$1");
  if (doubleEscapeMetaChars) {
    arg = arg.replace(metaCharsRegExp, "^$1");
  }
  return arg;
}
_escape.command = escapeCommand;
_escape.argument = escapeArgument;
var shebangRegex$1 = /^#!(.*)/;
var shebangRegex = shebangRegex$1;
var shebangCommand$1 = (string = "") => {
  const match = string.match(shebangRegex);
  if (!match) {
    return null;
  }
  const [path6, argument] = match[0].replace(/#! ?/, "").split(" ");
  const binary = path6.split("/").pop();
  if (binary === "env") {
    return argument;
  }
  return argument ? `${binary} ${argument}` : binary;
};
var fs = import_fs.default;
var shebangCommand = shebangCommand$1;
function readShebang$1(command) {
  const size = 150;
  const buffer = Buffer.alloc(size);
  let fd;
  try {
    fd = fs.openSync(command, "r");
    fs.readSync(fd, buffer, 0, size, 0);
    fs.closeSync(fd);
  } catch (e2) {
  }
  return shebangCommand(buffer.toString());
}
var readShebang_1 = readShebang$1;
var path = import_path.default;
var resolveCommand = resolveCommand_1;
var escape = _escape;
var readShebang = readShebang_1;
var isWin$2 = process.platform === "win32";
var isExecutableRegExp = /\.(?:com|exe)$/i;
var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
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
  if (!isWin$2) {
    return parsed;
  }
  const commandFile = detectShebang(parsed);
  const needsShell = !isExecutableRegExp.test(commandFile);
  if (parsed.options.forceShell || needsShell) {
    const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
    parsed.command = path.normalize(parsed.command);
    parsed.command = escape.command(parsed.command);
    parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
    const shellCommand = [parsed.command].concat(parsed.args).join(" ");
    parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
    parsed.command = process.env.comspec || "cmd.exe";
    parsed.options.windowsVerbatimArguments = true;
  }
  return parsed;
}
function parse$1(command, args, options) {
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
var parse_1 = parse$1;
var isWin$1 = process.platform === "win32";
function notFoundError(original, syscall) {
  return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
    code: "ENOENT",
    errno: "ENOENT",
    syscall: `${syscall} ${original.command}`,
    path: original.command,
    spawnargs: original.args
  });
}
function hookChildProcess(cp2, parsed) {
  if (!isWin$1) {
    return;
  }
  const originalEmit = cp2.emit;
  cp2.emit = function(name, arg1) {
    if (name === "exit") {
      const err = verifyENOENT(arg1, parsed);
      if (err) {
        return originalEmit.call(cp2, "error", err);
      }
    }
    return originalEmit.apply(cp2, arguments);
  };
}
function verifyENOENT(status, parsed) {
  if (isWin$1 && status === 1 && !parsed.file) {
    return notFoundError(parsed.original, "spawn");
  }
  return null;
}
function verifyENOENTSync(status, parsed) {
  if (isWin$1 && status === 1 && !parsed.file) {
    return notFoundError(parsed.original, "spawnSync");
  }
  return null;
}
var enoent$1 = {
  hookChildProcess,
  verifyENOENT,
  verifyENOENTSync,
  notFoundError
};
var cp = import_child_process.default;
var parse = parse_1;
var enoent = enoent$1;
function spawn(command, args, options) {
  const parsed = parse(command, args, options);
  const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
  enoent.hookChildProcess(spawned, parsed);
  return spawned;
}
function spawnSync(command, args, options) {
  const parsed = parse(command, args, options);
  const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
  result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
  return result;
}
crossSpawn$1.exports = spawn;
crossSpawn$1.exports.spawn = spawn;
crossSpawn$1.exports.sync = spawnSync;
crossSpawn$1.exports._parse = parse;
crossSpawn$1.exports._enoent = enoent;
var crossSpawnExports = crossSpawn$1.exports;
var crossSpawn = /* @__PURE__ */ getDefaultExportFromCjs(crossSpawnExports);
function stripFinalNewline(input) {
  const LF = typeof input === "string" ? "\n" : "\n".charCodeAt();
  const CR = typeof input === "string" ? "\r" : "\r".charCodeAt();
  if (input[input.length - 1] === LF) {
    input = input.slice(0, -1);
  }
  if (input[input.length - 1] === CR) {
    input = input.slice(0, -1);
  }
  return input;
}
function pathKey(options = {}) {
  const {
    env: env3 = process.env,
    platform = process.platform
  } = options;
  if (platform !== "win32") {
    return "PATH";
  }
  return Object.keys(env3).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
}
function npmRunPath(options = {}) {
  const {
    cwd = import_node_process4.default.cwd(),
    path: path_ = import_node_process4.default.env[pathKey()],
    execPath = import_node_process4.default.execPath
  } = options;
  let previous;
  const cwdString = cwd instanceof URL ? import_node_url.default.fileURLToPath(cwd) : cwd;
  let cwdPath = import_node_path.default.resolve(cwdString);
  const result = [];
  while (previous !== cwdPath) {
    result.push(import_node_path.default.join(cwdPath, "node_modules/.bin"));
    previous = cwdPath;
    cwdPath = import_node_path.default.resolve(cwdPath, "..");
  }
  result.push(import_node_path.default.resolve(cwdString, execPath, ".."));
  return [...result, path_].join(import_node_path.default.delimiter);
}
function npmRunPathEnv({ env: env3 = import_node_process4.default.env, ...options } = {}) {
  env3 = { ...env3 };
  const path6 = pathKey({ env: env3 });
  options.path = env3[path6];
  env3[path6] = npmRunPath(options);
  return env3;
}
var copyProperty = (to, from, property, ignoreNonConfigurable) => {
  if (property === "length" || property === "prototype") {
    return;
  }
  if (property === "arguments" || property === "caller") {
    return;
  }
  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }
  Object.defineProperty(to, property, fromDescriptor);
};
var canCopyProperty = function(toDescriptor, fromDescriptor) {
  return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
var changePrototype = (to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }
  Object.setPrototypeOf(to, fromPrototype);
};
var wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
var toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
var toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
var changeToString = (to, from, name) => {
  const withName = name === "" ? "" : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  Object.defineProperty(to, "toString", { ...toStringDescriptor, value: newToString });
};
function mimicFunction(to, from, { ignoreNonConfigurable = false } = {}) {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
}
var calledFunctions = /* @__PURE__ */ new WeakMap();
var onetime = (function_, options = {}) => {
  if (typeof function_ !== "function") {
    throw new TypeError("Expected a function");
  }
  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || "<anonymous>";
  const onetime2 = function(...arguments_) {
    calledFunctions.set(onetime2, ++callCount);
    if (callCount === 1) {
      returnValue = function_.apply(this, arguments_);
      function_ = null;
    } else if (options.throw === true) {
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }
    return returnValue;
  };
  mimicFunction(onetime2, function_);
  calledFunctions.set(onetime2, callCount);
  return onetime2;
};
onetime.callCount = (function_) => {
  if (!calledFunctions.has(function_)) {
    throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
  }
  return calledFunctions.get(function_);
};
var getRealtimeSignals = () => {
  const length = SIGRTMAX - SIGRTMIN + 1;
  return Array.from({ length }, getRealtimeSignal);
};
var getRealtimeSignal = (value, index) => ({
  name: `SIGRT${index + 1}`,
  number: SIGRTMIN + index,
  action: "terminate",
  description: "Application-specific signal (realtime)",
  standard: "posix"
});
var SIGRTMIN = 34;
var SIGRTMAX = 64;
var SIGNALS = [
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
    description: 'Paused using CTRL-Z or "suspend"',
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
var getSignals = () => {
  const realtimeSignals = getRealtimeSignals();
  const signals = [...SIGNALS, ...realtimeSignals].map(normalizeSignal);
  return signals;
};
var normalizeSignal = ({
  name,
  number: defaultNumber,
  description,
  action: action2,
  forced = false,
  standard
}) => {
  const {
    signals: { [name]: constantSignal }
  } = import_node_os2.constants;
  const supported = constantSignal !== void 0;
  const number2 = supported ? constantSignal : defaultNumber;
  return { name, number: number2, description, supported, action: action2, forced, standard };
};
var getSignalsByName = () => {
  const signals = getSignals();
  return Object.fromEntries(signals.map(getSignalByName));
};
var getSignalByName = ({
  name,
  number: number2,
  description,
  supported,
  action: action2,
  forced,
  standard
}) => [name, { name, number: number2, description, supported, action: action2, forced, standard }];
var signalsByName = getSignalsByName();
var getSignalsByNumber = () => {
  const signals = getSignals();
  const length = SIGRTMAX + 1;
  const signalsA = Array.from({ length }, (value, number2) => getSignalByNumber(number2, signals));
  return Object.assign({}, ...signalsA);
};
var getSignalByNumber = (number2, signals) => {
  const signal = findSignalByNumber(number2, signals);
  if (signal === void 0) {
    return {};
  }
  const { name, description, supported, action: action2, forced, standard } = signal;
  return {
    [number2]: {
      name,
      number: number2,
      description,
      supported,
      action: action2,
      forced,
      standard
    }
  };
};
var findSignalByNumber = (number2, signals) => {
  const signal = signals.find(({ name }) => import_node_os2.constants.signals[name] === number2);
  if (signal !== void 0) {
    return signal;
  }
  return signals.find((signalA) => signalA.number === number2);
};
getSignalsByNumber();
var getErrorPrefix = ({ timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled }) => {
  if (timedOut) {
    return `timed out after ${timeout} milliseconds`;
  }
  if (isCanceled) {
    return "was canceled";
  }
  if (errorCode !== void 0) {
    return `failed with ${errorCode}`;
  }
  if (signal !== void 0) {
    return `was killed with ${signal} (${signalDescription})`;
  }
  if (exitCode !== void 0) {
    return `failed with exit code ${exitCode}`;
  }
  return "failed";
};
var makeError = ({
  stdout,
  stderr,
  all,
  error,
  signal,
  exitCode,
  command,
  escapedCommand,
  timedOut,
  isCanceled,
  killed,
  parsed: { options: { timeout } }
}) => {
  exitCode = exitCode === null ? void 0 : exitCode;
  signal = signal === null ? void 0 : signal;
  const signalDescription = signal === void 0 ? void 0 : signalsByName[signal].description;
  const errorCode = error && error.code;
  const prefix = getErrorPrefix({ timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled });
  const execaMessage = `Command ${prefix}: ${command}`;
  const isError = Object.prototype.toString.call(error) === "[object Error]";
  const shortMessage = isError ? `${execaMessage}
${error.message}` : execaMessage;
  const message = [shortMessage, stderr, stdout].filter(Boolean).join("\n");
  if (isError) {
    error.originalMessage = error.message;
    error.message = message;
  } else {
    error = new Error(message);
  }
  error.shortMessage = shortMessage;
  error.command = command;
  error.escapedCommand = escapedCommand;
  error.exitCode = exitCode;
  error.signal = signal;
  error.signalDescription = signalDescription;
  error.stdout = stdout;
  error.stderr = stderr;
  if (all !== void 0) {
    error.all = all;
  }
  if ("bufferedData" in error) {
    delete error.bufferedData;
  }
  error.failed = true;
  error.timedOut = Boolean(timedOut);
  error.isCanceled = isCanceled;
  error.killed = killed && !timedOut;
  return error;
};
var aliases = ["stdin", "stdout", "stderr"];
var hasAlias = (options) => aliases.some((alias) => options[alias] !== void 0);
var normalizeStdio = (options) => {
  if (!options) {
    return;
  }
  const { stdio } = options;
  if (stdio === void 0) {
    return aliases.map((alias) => options[alias]);
  }
  if (hasAlias(options)) {
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${aliases.map((alias) => `\`${alias}\``).join(", ")}`);
  }
  if (typeof stdio === "string") {
    return stdio;
  }
  if (!Array.isArray(stdio)) {
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
  }
  const length = Math.max(stdio.length, aliases.length);
  return Array.from({ length }, (value, index) => stdio[index]);
};
var signalExit = { exports: {} };
var signals$1 = { exports: {} };
var hasRequiredSignals;
function requireSignals() {
  if (hasRequiredSignals)
    return signals$1.exports;
  hasRequiredSignals = 1;
  (function(module2) {
    module2.exports = [
      "SIGABRT",
      "SIGALRM",
      "SIGHUP",
      "SIGINT",
      "SIGTERM"
    ];
    if (process.platform !== "win32") {
      module2.exports.push(
        "SIGVTALRM",
        "SIGXCPU",
        "SIGXFSZ",
        "SIGUSR2",
        "SIGTRAP",
        "SIGSYS",
        "SIGQUIT",
        "SIGIOT"
      );
    }
    if (process.platform === "linux") {
      module2.exports.push(
        "SIGIO",
        "SIGPOLL",
        "SIGPWR",
        "SIGSTKFLT",
        "SIGUNUSED"
      );
    }
  })(signals$1);
  return signals$1.exports;
}
var process$1 = commonjsGlobal.process;
var processOk = function(process3) {
  return process3 && typeof process3 === "object" && typeof process3.removeListener === "function" && typeof process3.emit === "function" && typeof process3.reallyExit === "function" && typeof process3.listeners === "function" && typeof process3.kill === "function" && typeof process3.pid === "number" && typeof process3.on === "function";
};
if (!processOk(process$1)) {
  signalExit.exports = function() {
    return function() {
    };
  };
} else {
  assert = import_assert.default;
  signals = requireSignals();
  isWin = /^win/i.test(process$1.platform);
  EE = import_events.default;
  if (typeof EE !== "function") {
    EE = EE.EventEmitter;
  }
  if (process$1.__signal_exit_emitter__) {
    emitter = process$1.__signal_exit_emitter__;
  } else {
    emitter = process$1.__signal_exit_emitter__ = new EE();
    emitter.count = 0;
    emitter.emitted = {};
  }
  if (!emitter.infinite) {
    emitter.setMaxListeners(Infinity);
    emitter.infinite = true;
  }
  signalExit.exports = function(cb, opts) {
    if (!processOk(commonjsGlobal.process)) {
      return function() {
      };
    }
    assert.equal(typeof cb, "function", "a callback must be provided for exit handler");
    if (loaded === false) {
      load();
    }
    var ev = "exit";
    if (opts && opts.alwaysLast) {
      ev = "afterexit";
    }
    var remove2 = function() {
      emitter.removeListener(ev, cb);
      if (emitter.listeners("exit").length === 0 && emitter.listeners("afterexit").length === 0) {
        unload();
      }
    };
    emitter.on(ev, cb);
    return remove2;
  };
  unload = function unload2() {
    if (!loaded || !processOk(commonjsGlobal.process)) {
      return;
    }
    loaded = false;
    signals.forEach(function(sig) {
      try {
        process$1.removeListener(sig, sigListeners[sig]);
      } catch (er) {
      }
    });
    process$1.emit = originalProcessEmit;
    process$1.reallyExit = originalProcessReallyExit;
    emitter.count -= 1;
  };
  signalExit.exports.unload = unload;
  emit = function emit2(event, code, signal) {
    if (emitter.emitted[event]) {
      return;
    }
    emitter.emitted[event] = true;
    emitter.emit(event, code, signal);
  };
  sigListeners = {};
  signals.forEach(function(sig) {
    sigListeners[sig] = function listener() {
      if (!processOk(commonjsGlobal.process)) {
        return;
      }
      var listeners = process$1.listeners(sig);
      if (listeners.length === emitter.count) {
        unload();
        emit("exit", null, sig);
        emit("afterexit", null, sig);
        if (isWin && sig === "SIGHUP") {
          sig = "SIGINT";
        }
        process$1.kill(process$1.pid, sig);
      }
    };
  });
  signalExit.exports.signals = function() {
    return signals;
  };
  loaded = false;
  load = function load2() {
    if (loaded || !processOk(commonjsGlobal.process)) {
      return;
    }
    loaded = true;
    emitter.count += 1;
    signals = signals.filter(function(sig) {
      try {
        process$1.on(sig, sigListeners[sig]);
        return true;
      } catch (er) {
        return false;
      }
    });
    process$1.emit = processEmit;
    process$1.reallyExit = processReallyExit;
  };
  signalExit.exports.load = load;
  originalProcessReallyExit = process$1.reallyExit;
  processReallyExit = function processReallyExit2(code) {
    if (!processOk(commonjsGlobal.process)) {
      return;
    }
    process$1.exitCode = code || 0;
    emit("exit", process$1.exitCode, null);
    emit("afterexit", process$1.exitCode, null);
    originalProcessReallyExit.call(process$1, process$1.exitCode);
  };
  originalProcessEmit = process$1.emit;
  processEmit = function processEmit2(ev, arg) {
    if (ev === "exit" && processOk(commonjsGlobal.process)) {
      if (arg !== void 0) {
        process$1.exitCode = arg;
      }
      var ret = originalProcessEmit.apply(this, arguments);
      emit("exit", process$1.exitCode, null);
      emit("afterexit", process$1.exitCode, null);
      return ret;
    } else {
      return originalProcessEmit.apply(this, arguments);
    }
  };
}
var assert;
var signals;
var isWin;
var EE;
var emitter;
var unload;
var emit;
var sigListeners;
var loaded;
var load;
var originalProcessReallyExit;
var processReallyExit;
var originalProcessEmit;
var processEmit;
var signalExitExports = signalExit.exports;
var onExit = /* @__PURE__ */ getDefaultExportFromCjs(signalExitExports);
var DEFAULT_FORCE_KILL_TIMEOUT = 1e3 * 5;
var spawnedKill = (kill, signal = "SIGTERM", options = {}) => {
  const killResult = kill(signal);
  setKillTimeout(kill, signal, options, killResult);
  return killResult;
};
var setKillTimeout = (kill, signal, options, killResult) => {
  if (!shouldForceKill(signal, options, killResult)) {
    return;
  }
  const timeout = getForceKillAfterTimeout(options);
  const t = setTimeout(() => {
    kill("SIGKILL");
  }, timeout);
  if (t.unref) {
    t.unref();
  }
};
var shouldForceKill = (signal, { forceKillAfterTimeout }, killResult) => isSigterm(signal) && forceKillAfterTimeout !== false && killResult;
var isSigterm = (signal) => signal === import_node_os2.default.constants.signals.SIGTERM || typeof signal === "string" && signal.toUpperCase() === "SIGTERM";
var getForceKillAfterTimeout = ({ forceKillAfterTimeout = true }) => {
  if (forceKillAfterTimeout === true) {
    return DEFAULT_FORCE_KILL_TIMEOUT;
  }
  if (!Number.isFinite(forceKillAfterTimeout) || forceKillAfterTimeout < 0) {
    throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`);
  }
  return forceKillAfterTimeout;
};
var spawnedCancel = (spawned, context) => {
  const killResult = spawned.kill();
  if (killResult) {
    context.isCanceled = true;
  }
};
var timeoutKill = (spawned, signal, reject) => {
  spawned.kill(signal);
  reject(Object.assign(new Error("Timed out"), { timedOut: true, signal }));
};
var setupTimeout = (spawned, { timeout, killSignal = "SIGTERM" }, spawnedPromise) => {
  if (timeout === 0 || timeout === void 0) {
    return spawnedPromise;
  }
  let timeoutId;
  const timeoutPromise = new Promise((resolve2, reject) => {
    timeoutId = setTimeout(() => {
      timeoutKill(spawned, killSignal, reject);
    }, timeout);
  });
  const safeSpawnedPromise = spawnedPromise.finally(() => {
    clearTimeout(timeoutId);
  });
  return Promise.race([timeoutPromise, safeSpawnedPromise]);
};
var validateTimeout = ({ timeout }) => {
  if (timeout !== void 0 && (!Number.isFinite(timeout) || timeout < 0)) {
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
  }
};
var setExitHandler = async (spawned, { cleanup, detached }, timedPromise) => {
  if (!cleanup || detached) {
    return timedPromise;
  }
  const removeExitHandler = onExit(() => {
    spawned.kill();
  });
  return timedPromise.finally(() => {
    removeExitHandler();
  });
};
function isStream(stream2) {
  return stream2 !== null && typeof stream2 === "object" && typeof stream2.pipe === "function";
}
function isWritableStream(stream2) {
  return isStream(stream2) && stream2.writable !== false && typeof stream2._write === "function" && typeof stream2._writableState === "object";
}
var isExecaChildProcess = (target) => target instanceof import_node_child_process.ChildProcess && typeof target.then === "function";
var pipeToTarget = (spawned, streamName, target) => {
  if (typeof target === "string") {
    spawned[streamName].pipe((0, import_node_fs.createWriteStream)(target));
    return spawned;
  }
  if (isWritableStream(target)) {
    spawned[streamName].pipe(target);
    return spawned;
  }
  if (!isExecaChildProcess(target)) {
    throw new TypeError("The second argument must be a string, a stream or an Execa child process.");
  }
  if (!isWritableStream(target.stdin)) {
    throw new TypeError("The target child process's stdin must be available.");
  }
  spawned[streamName].pipe(target.stdin);
  return target;
};
var addPipeMethods = (spawned) => {
  if (spawned.stdout !== null) {
    spawned.pipeStdout = pipeToTarget.bind(void 0, spawned, "stdout");
  }
  if (spawned.stderr !== null) {
    spawned.pipeStderr = pipeToTarget.bind(void 0, spawned, "stderr");
  }
  if (spawned.all !== void 0) {
    spawned.pipeAll = pipeToTarget.bind(void 0, spawned, "all");
  }
};
var getStream$2 = { exports: {} };
var { PassThrough: PassThroughStream } = import_stream.default;
var bufferStream$1 = (options) => {
  options = { ...options };
  const { array } = options;
  let { encoding } = options;
  const isBuffer = encoding === "buffer";
  let objectMode = false;
  if (array) {
    objectMode = !(encoding || isBuffer);
  } else {
    encoding = encoding || "utf8";
  }
  if (isBuffer) {
    encoding = null;
  }
  const stream2 = new PassThroughStream({ objectMode });
  if (encoding) {
    stream2.setEncoding(encoding);
  }
  let length = 0;
  const chunks = [];
  stream2.on("data", (chunk) => {
    chunks.push(chunk);
    if (objectMode) {
      length = chunks.length;
    } else {
      length += chunk.length;
    }
  });
  stream2.getBufferedValue = () => {
    if (array) {
      return chunks;
    }
    return isBuffer ? Buffer.concat(chunks, length) : chunks.join("");
  };
  stream2.getBufferedLength = () => length;
  return stream2;
};
var { constants: BufferConstants } = import_buffer.default;
var stream = import_stream.default;
var { promisify } = import_util.default;
var bufferStream = bufferStream$1;
var streamPipelinePromisified = promisify(stream.pipeline);
var MaxBufferError = class extends Error {
  constructor() {
    super("maxBuffer exceeded");
    this.name = "MaxBufferError";
  }
};
async function getStream(inputStream, options) {
  if (!inputStream) {
    throw new Error("Expected a stream");
  }
  options = {
    maxBuffer: Infinity,
    ...options
  };
  const { maxBuffer } = options;
  const stream2 = bufferStream(options);
  await new Promise((resolve2, reject) => {
    const rejectPromise = (error) => {
      if (error && stream2.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
        error.bufferedData = stream2.getBufferedValue();
      }
      reject(error);
    };
    (async () => {
      try {
        await streamPipelinePromisified(inputStream, stream2);
        resolve2();
      } catch (error) {
        rejectPromise(error);
      }
    })();
    stream2.on("data", () => {
      if (stream2.getBufferedLength() > maxBuffer) {
        rejectPromise(new MaxBufferError());
      }
    });
  });
  return stream2.getBufferedValue();
}
getStream$2.exports = getStream;
getStream$2.exports.buffer = (stream2, options) => getStream(stream2, { ...options, encoding: "buffer" });
getStream$2.exports.array = (stream2, options) => getStream(stream2, { ...options, array: true });
getStream$2.exports.MaxBufferError = MaxBufferError;
var getStreamExports = getStream$2.exports;
var getStream$1 = /* @__PURE__ */ getDefaultExportFromCjs(getStreamExports);
var { PassThrough } = import_stream.default;
var mergeStream = function() {
  var sources = [];
  var output = new PassThrough({ objectMode: true });
  output.setMaxListeners(0);
  output.add = add;
  output.isEmpty = isEmpty;
  output.on("unpipe", remove2);
  Array.prototype.slice.call(arguments).forEach(add);
  return output;
  function add(source) {
    if (Array.isArray(source)) {
      source.forEach(add);
      return this;
    }
    sources.push(source);
    source.once("end", remove2.bind(null, source));
    source.once("error", output.emit.bind(output, "error"));
    source.pipe(output, { end: false });
    return this;
  }
  function isEmpty() {
    return sources.length == 0;
  }
  function remove2(source) {
    sources = sources.filter(function(it) {
      return it !== source;
    });
    if (!sources.length && output.readable) {
      output.end();
    }
  }
};
var mergeStream$1 = /* @__PURE__ */ getDefaultExportFromCjs(mergeStream);
var validateInputOptions = (input) => {
  if (input !== void 0) {
    throw new TypeError("The `input` and `inputFile` options cannot be both set.");
  }
};
var getInput = ({ input, inputFile }) => {
  if (typeof inputFile !== "string") {
    return input;
  }
  validateInputOptions(input);
  return (0, import_node_fs.createReadStream)(inputFile);
};
var handleInput = (spawned, options) => {
  const input = getInput(options);
  if (input === void 0) {
    return;
  }
  if (isStream(input)) {
    input.pipe(spawned.stdin);
  } else {
    spawned.stdin.end(input);
  }
};
var makeAllStream = (spawned, { all }) => {
  if (!all || !spawned.stdout && !spawned.stderr) {
    return;
  }
  const mixed = mergeStream$1();
  if (spawned.stdout) {
    mixed.add(spawned.stdout);
  }
  if (spawned.stderr) {
    mixed.add(spawned.stderr);
  }
  return mixed;
};
var getBufferedData = async (stream2, streamPromise) => {
  if (!stream2 || streamPromise === void 0) {
    return;
  }
  stream2.destroy();
  try {
    return await streamPromise;
  } catch (error) {
    return error.bufferedData;
  }
};
var getStreamPromise = (stream2, { encoding, buffer, maxBuffer }) => {
  if (!stream2 || !buffer) {
    return;
  }
  if (encoding) {
    return getStream$1(stream2, { encoding, maxBuffer });
  }
  return getStream$1.buffer(stream2, { maxBuffer });
};
var getSpawnedResult = async ({ stdout, stderr, all }, { encoding, buffer, maxBuffer }, processDone) => {
  const stdoutPromise = getStreamPromise(stdout, { encoding, buffer, maxBuffer });
  const stderrPromise = getStreamPromise(stderr, { encoding, buffer, maxBuffer });
  const allPromise = getStreamPromise(all, { encoding, buffer, maxBuffer: maxBuffer * 2 });
  try {
    return await Promise.all([processDone, stdoutPromise, stderrPromise, allPromise]);
  } catch (error) {
    return Promise.all([
      { error, signal: error.signal, timedOut: error.timedOut },
      getBufferedData(stdout, stdoutPromise),
      getBufferedData(stderr, stderrPromise),
      getBufferedData(all, allPromise)
    ]);
  }
};
var nativePromisePrototype = (async () => {
})().constructor.prototype;
var descriptors = ["then", "catch", "finally"].map((property) => [
  property,
  Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property)
]);
var mergePromise = (spawned, promise) => {
  for (const [property, descriptor] of descriptors) {
    const value = typeof promise === "function" ? (...args) => Reflect.apply(descriptor.value, promise(), args) : descriptor.value.bind(promise);
    Reflect.defineProperty(spawned, property, { ...descriptor, value });
  }
};
var getSpawnedPromise = (spawned) => new Promise((resolve2, reject) => {
  spawned.on("exit", (exitCode, signal) => {
    resolve2({ exitCode, signal });
  });
  spawned.on("error", (error) => {
    reject(error);
  });
  if (spawned.stdin) {
    spawned.stdin.on("error", (error) => {
      reject(error);
    });
  }
});
var normalizeArgs = (file, args = []) => {
  if (!Array.isArray(args)) {
    return [file];
  }
  return [file, ...args];
};
var NO_ESCAPE_REGEXP = /^[\w.-]+$/;
var DOUBLE_QUOTES_REGEXP = /"/g;
var escapeArg = (arg) => {
  if (typeof arg !== "string" || NO_ESCAPE_REGEXP.test(arg)) {
    return arg;
  }
  return `"${arg.replace(DOUBLE_QUOTES_REGEXP, '\\"')}"`;
};
var joinCommand = (file, args) => normalizeArgs(file, args).join(" ");
var getEscapedCommand = (file, args) => normalizeArgs(file, args).map((arg) => escapeArg(arg)).join(" ");
var SPACES_REGEXP = / +/g;
var parseCommand = (command) => {
  const tokens = [];
  for (const token of command.trim().split(SPACES_REGEXP)) {
    const previousToken = tokens[tokens.length - 1];
    if (previousToken && previousToken.endsWith("\\")) {
      tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}`;
    } else {
      tokens.push(token);
    }
  }
  return tokens;
};
var verboseDefault = (0, import_node_util.debuglog)("execa").enabled;
var padField = (field, padding) => String(field).padStart(padding, "0");
var getTimestamp = () => {
  const date2 = new Date();
  return `${padField(date2.getHours(), 2)}:${padField(date2.getMinutes(), 2)}:${padField(date2.getSeconds(), 2)}.${padField(date2.getMilliseconds(), 3)}`;
};
var logCommand = (escapedCommand, { verbose }) => {
  if (!verbose) {
    return;
  }
  import_node_process4.default.stderr.write(`[${getTimestamp()}] ${escapedCommand}
`);
};
var DEFAULT_MAX_BUFFER = 1e3 * 1e3 * 100;
var getEnv = ({ env: envOption, extendEnv, preferLocal, localDir, execPath }) => {
  const env3 = extendEnv ? { ...import_node_process4.default.env, ...envOption } : envOption;
  if (preferLocal) {
    return npmRunPathEnv({ env: env3, cwd: localDir, execPath });
  }
  return env3;
};
var handleArguments = (file, args, options = {}) => {
  const parsed = crossSpawn._parse(file, args, options);
  file = parsed.command;
  args = parsed.args;
  options = parsed.options;
  options = {
    maxBuffer: DEFAULT_MAX_BUFFER,
    buffer: true,
    stripFinalNewline: true,
    extendEnv: true,
    preferLocal: false,
    localDir: options.cwd || import_node_process4.default.cwd(),
    execPath: import_node_process4.default.execPath,
    encoding: "utf8",
    reject: true,
    cleanup: true,
    all: false,
    windowsHide: true,
    verbose: verboseDefault,
    ...options
  };
  options.env = getEnv(options);
  options.stdio = normalizeStdio(options);
  if (import_node_process4.default.platform === "win32" && import_node_path.default.basename(file, ".exe") === "cmd") {
    args.unshift("/q");
  }
  return { file, args, options, parsed };
};
var handleOutput = (options, value, error) => {
  if (typeof value !== "string" && !import_node_buffer.Buffer.isBuffer(value)) {
    return error === void 0 ? void 0 : "";
  }
  if (options.stripFinalNewline) {
    return stripFinalNewline(value);
  }
  return value;
};
function execa(file, args, options) {
  const parsed = handleArguments(file, args, options);
  const command = joinCommand(file, args);
  const escapedCommand = getEscapedCommand(file, args);
  logCommand(escapedCommand, parsed.options);
  validateTimeout(parsed.options);
  let spawned;
  try {
    spawned = import_node_child_process.default.spawn(parsed.file, parsed.args, parsed.options);
  } catch (error) {
    const dummySpawned = new import_node_child_process.default.ChildProcess();
    const errorPromise = Promise.reject(makeError({
      error,
      stdout: "",
      stderr: "",
      all: "",
      command,
      escapedCommand,
      parsed,
      timedOut: false,
      isCanceled: false,
      killed: false
    }));
    mergePromise(dummySpawned, errorPromise);
    return dummySpawned;
  }
  const spawnedPromise = getSpawnedPromise(spawned);
  const timedPromise = setupTimeout(spawned, parsed.options, spawnedPromise);
  const processDone = setExitHandler(spawned, parsed.options, timedPromise);
  const context = { isCanceled: false };
  spawned.kill = spawnedKill.bind(null, spawned.kill.bind(spawned));
  spawned.cancel = spawnedCancel.bind(null, spawned, context);
  const handlePromise = async () => {
    const [{ error, exitCode, signal, timedOut }, stdoutResult, stderrResult, allResult] = await getSpawnedResult(spawned, parsed.options, processDone);
    const stdout = handleOutput(parsed.options, stdoutResult);
    const stderr = handleOutput(parsed.options, stderrResult);
    const all = handleOutput(parsed.options, allResult);
    if (error || exitCode !== 0 || signal !== null) {
      const returnedError = makeError({
        error,
        exitCode,
        signal,
        stdout,
        stderr,
        all,
        command,
        escapedCommand,
        parsed,
        timedOut,
        isCanceled: parsed.options.signal ? parsed.options.signal.aborted : false,
        killed: spawned.killed
      });
      if (!parsed.options.reject) {
        return returnedError;
      }
      throw returnedError;
    }
    return {
      command,
      escapedCommand,
      exitCode: 0,
      stdout,
      stderr,
      all,
      failed: false,
      timedOut: false,
      isCanceled: false,
      killed: false
    };
  };
  const handlePromiseOnce = onetime(handlePromise);
  handleInput(spawned, parsed.options);
  spawned.all = makeAllStream(spawned, parsed.options);
  addPipeMethods(spawned);
  mergePromise(spawned, handlePromiseOnce);
  return spawned;
}
function execaCommand(command, options) {
  const [file, ...args] = parseCommand(command);
  return execa(file, args, options);
}
var ESC$1 = "\x1B[";
var OSC = "\x1B]";
var BEL = "\x07";
var SEP = ";";
var isTerminalApp = process.env.TERM_PROGRAM === "Apple_Terminal";
var ansiEscapes = {};
ansiEscapes.cursorTo = (x3, y3) => {
  if (typeof x3 !== "number") {
    throw new TypeError("The `x` argument is required");
  }
  if (typeof y3 !== "number") {
    return ESC$1 + (x3 + 1) + "G";
  }
  return ESC$1 + (y3 + 1) + ";" + (x3 + 1) + "H";
};
ansiEscapes.cursorMove = (x3, y3) => {
  if (typeof x3 !== "number") {
    throw new TypeError("The `x` argument is required");
  }
  let returnValue = "";
  if (x3 < 0) {
    returnValue += ESC$1 + -x3 + "D";
  } else if (x3 > 0) {
    returnValue += ESC$1 + x3 + "C";
  }
  if (y3 < 0) {
    returnValue += ESC$1 + -y3 + "A";
  } else if (y3 > 0) {
    returnValue += ESC$1 + y3 + "B";
  }
  return returnValue;
};
ansiEscapes.cursorUp = (count = 1) => ESC$1 + count + "A";
ansiEscapes.cursorDown = (count = 1) => ESC$1 + count + "B";
ansiEscapes.cursorForward = (count = 1) => ESC$1 + count + "C";
ansiEscapes.cursorBackward = (count = 1) => ESC$1 + count + "D";
ansiEscapes.cursorLeft = ESC$1 + "G";
ansiEscapes.cursorSavePosition = isTerminalApp ? "\x1B7" : ESC$1 + "s";
ansiEscapes.cursorRestorePosition = isTerminalApp ? "\x1B8" : ESC$1 + "u";
ansiEscapes.cursorGetPosition = ESC$1 + "6n";
ansiEscapes.cursorNextLine = ESC$1 + "E";
ansiEscapes.cursorPrevLine = ESC$1 + "F";
ansiEscapes.cursorHide = ESC$1 + "?25l";
ansiEscapes.cursorShow = ESC$1 + "?25h";
ansiEscapes.eraseLines = (count) => {
  let clear2 = "";
  for (let i = 0; i < count; i++) {
    clear2 += ansiEscapes.eraseLine + (i < count - 1 ? ansiEscapes.cursorUp() : "");
  }
  if (count) {
    clear2 += ansiEscapes.cursorLeft;
  }
  return clear2;
};
ansiEscapes.eraseEndLine = ESC$1 + "K";
ansiEscapes.eraseStartLine = ESC$1 + "1K";
ansiEscapes.eraseLine = ESC$1 + "2K";
ansiEscapes.eraseDown = ESC$1 + "J";
ansiEscapes.eraseUp = ESC$1 + "1J";
ansiEscapes.eraseScreen = ESC$1 + "2J";
ansiEscapes.scrollUp = ESC$1 + "S";
ansiEscapes.scrollDown = ESC$1 + "T";
ansiEscapes.clearScreen = "\x1Bc";
ansiEscapes.clearTerminal = process.platform === "win32" ? `${ansiEscapes.eraseScreen}${ESC$1}0f` : `${ansiEscapes.eraseScreen}${ESC$1}3J${ESC$1}H`;
ansiEscapes.beep = BEL;
ansiEscapes.link = (text2, url2) => {
  return [
    OSC,
    "8",
    SEP,
    SEP,
    url2,
    BEL,
    text2,
    OSC,
    "8",
    SEP,
    SEP,
    BEL
  ].join("");
};
ansiEscapes.image = (buffer, options = {}) => {
  let returnValue = `${OSC}1337;File=inline=1`;
  if (options.width) {
    returnValue += `;width=${options.width}`;
  }
  if (options.height) {
    returnValue += `;height=${options.height}`;
  }
  if (options.preserveAspectRatio === false) {
    returnValue += ";preserveAspectRatio=0";
  }
  return returnValue + ":" + buffer.toString("base64") + BEL;
};
ansiEscapes.iTerm = {
  setCwd: (cwd = process.cwd()) => `${OSC}50;CurrentDir=${cwd}${BEL}`,
  annotation: (message, options = {}) => {
    let returnValue = `${OSC}1337;`;
    const hasX = typeof options.x !== "undefined";
    const hasY = typeof options.y !== "undefined";
    if ((hasX || hasY) && !(hasX && hasY && typeof options.length !== "undefined")) {
      throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
    }
    message = message.replace(/\|/g, "");
    returnValue += options.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=";
    if (options.length > 0) {
      returnValue += (hasX ? [message, options.length, options.x, options.y] : [options.length, message]).join("|");
    } else {
      returnValue += message;
    }
    return returnValue + BEL;
  }
};
var hasFlag$2 = (flag, argv = process.argv) => {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};
var os2 = import_os.default;
var tty2 = import_tty.default;
var hasFlag$1 = hasFlag$2;
var { env: env2 } = process;
var forceColor;
if (hasFlag$1("no-color") || hasFlag$1("no-colors") || hasFlag$1("color=false") || hasFlag$1("color=never")) {
  forceColor = 0;
} else if (hasFlag$1("color") || hasFlag$1("colors") || hasFlag$1("color=true") || hasFlag$1("color=always")) {
  forceColor = 1;
}
if ("FORCE_COLOR" in env2) {
  if (env2.FORCE_COLOR === "true") {
    forceColor = 1;
  } else if (env2.FORCE_COLOR === "false") {
    forceColor = 0;
  } else {
    forceColor = env2.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env2.FORCE_COLOR, 10), 3);
  }
}
function translateLevel2(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function supportsColor$1(haveStream, streamIsTTY) {
  if (forceColor === 0) {
    return 0;
  }
  if (hasFlag$1("color=16m") || hasFlag$1("color=full") || hasFlag$1("color=truecolor")) {
    return 3;
  }
  if (hasFlag$1("color=256")) {
    return 2;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env2.TERM === "dumb") {
    return min;
  }
  if (process.platform === "win32") {
    const osRelease = os2.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env2) {
    if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env2) || env2.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env2) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env2.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env2.COLORTERM === "truecolor") {
    return 3;
  }
  if ("TERM_PROGRAM" in env2) {
    const version = parseInt((env2.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env2.TERM_PROGRAM) {
      case "iTerm.app":
        return version >= 3 ? 3 : 2;
      case "Apple_Terminal":
        return 2;
    }
  }
  if (/-256(color)?$/i.test(env2.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env2.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env2) {
    return 1;
  }
  return min;
}
function getSupportLevel(stream2) {
  const level = supportsColor$1(stream2, stream2 && stream2.isTTY);
  return translateLevel2(level);
}
var supportsColor_1 = {
  supportsColor: getSupportLevel,
  stdout: translateLevel2(supportsColor$1(true, tty2.isatty(1))),
  stderr: translateLevel2(supportsColor$1(true, tty2.isatty(2)))
};
var supportsColor2 = supportsColor_1;
var hasFlag2 = hasFlag$2;
function parseVersion(versionString) {
  if (/^\d{3,4}$/.test(versionString)) {
    const m2 = /(\d{1,2})(\d{2})/.exec(versionString);
    return {
      major: 0,
      minor: parseInt(m2[1], 10),
      patch: parseInt(m2[2], 10)
    };
  }
  const versions = (versionString || "").split(".").map((n) => parseInt(n, 10));
  return {
    major: versions[0],
    minor: versions[1],
    patch: versions[2]
  };
}
function supportsHyperlink(stream2) {
  const { env: env3 } = process;
  if ("FORCE_HYPERLINK" in env3) {
    return !(env3.FORCE_HYPERLINK.length > 0 && parseInt(env3.FORCE_HYPERLINK, 10) === 0);
  }
  if (hasFlag2("no-hyperlink") || hasFlag2("no-hyperlinks") || hasFlag2("hyperlink=false") || hasFlag2("hyperlink=never")) {
    return false;
  }
  if (hasFlag2("hyperlink=true") || hasFlag2("hyperlink=always")) {
    return true;
  }
  if (!supportsColor2.supportsColor(stream2)) {
    return false;
  }
  if (stream2 && !stream2.isTTY) {
    return false;
  }
  if (process.platform === "win32") {
    return false;
  }
  if ("NETLIFY" in env3) {
    return true;
  }
  if ("CI" in env3) {
    return false;
  }
  if ("TEAMCITY_VERSION" in env3) {
    return false;
  }
  if ("TERM_PROGRAM" in env3) {
    const version = parseVersion(env3.TERM_PROGRAM_VERSION);
    switch (env3.TERM_PROGRAM) {
      case "iTerm.app":
        if (version.major === 3) {
          return version.minor >= 1;
        }
        return version.major > 3;
    }
  }
  if ("VTE_VERSION" in env3) {
    if (env3.VTE_VERSION === "0.50.0") {
      return false;
    }
    const version = parseVersion(env3.VTE_VERSION);
    return version.major > 0 || version.minor >= 50;
  }
  return false;
}
var supportsHyperlinks = {
  supportsHyperlink,
  stdout: supportsHyperlink(process.stdout),
  stderr: supportsHyperlink(process.stderr)
};
var supportsHyperlinks$1 = /* @__PURE__ */ getDefaultExportFromCjs(supportsHyperlinks);
function terminalLink(text2, url2, { target = "stdout", ...options } = {}) {
  if (!supportsHyperlinks$1[target]) {
    if (options.fallback === false) {
      return text2;
    }
    return typeof options.fallback === "function" ? options.fallback(text2, url2) : `${text2} (\u200B${url2}\u200B)`;
  }
  return ansiEscapes.link(text2, url2);
}
terminalLink.isSupported = supportsHyperlinks$1.stdout;
terminalLink.stderr = (text2, url2, options = {}) => terminalLink(text2, url2, { target: "stderr", ...options });
terminalLink.stderr.isSupported = supportsHyperlinks$1.stderr;
var prompts$3 = {};
var FORCE_COLOR$1;
var NODE_DISABLE_COLORS$1;
var NO_COLOR$1;
var TERM$1;
var isTTY$1 = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR: FORCE_COLOR$1, NODE_DISABLE_COLORS: NODE_DISABLE_COLORS$1, NO_COLOR: NO_COLOR$1, TERM: TERM$1 } = process.env || {});
  isTTY$1 = process.stdout && process.stdout.isTTY;
}
var $$1 = {
  enabled: !NODE_DISABLE_COLORS$1 && NO_COLOR$1 == null && TERM$1 !== "dumb" && (FORCE_COLOR$1 != null && FORCE_COLOR$1 !== "0" || isTTY$1),
  reset: init$1(0, 0),
  bold: init$1(1, 22),
  dim: init$1(2, 22),
  italic: init$1(3, 23),
  underline: init$1(4, 24),
  inverse: init$1(7, 27),
  hidden: init$1(8, 28),
  strikethrough: init$1(9, 29),
  black: init$1(30, 39),
  red: init$1(31, 39),
  green: init$1(32, 39),
  yellow: init$1(33, 39),
  blue: init$1(34, 39),
  magenta: init$1(35, 39),
  cyan: init$1(36, 39),
  white: init$1(37, 39),
  gray: init$1(90, 39),
  grey: init$1(90, 39),
  bgBlack: init$1(40, 49),
  bgRed: init$1(41, 49),
  bgGreen: init$1(42, 49),
  bgYellow: init$1(43, 49),
  bgBlue: init$1(44, 49),
  bgMagenta: init$1(45, 49),
  bgCyan: init$1(46, 49),
  bgWhite: init$1(47, 49)
};
function run$2(arr, str) {
  let i = 0, tmp, beg = "", end = "";
  for (; i < arr.length; i++) {
    tmp = arr[i];
    beg += tmp.open;
    end += tmp.close;
    if (!!~str.indexOf(tmp.close)) {
      str = str.replace(tmp.rgx, tmp.close + tmp.open);
    }
  }
  return beg + str + end;
}
function chain$1(has, keys) {
  let ctx = { has, keys };
  ctx.reset = $$1.reset.bind(ctx);
  ctx.bold = $$1.bold.bind(ctx);
  ctx.dim = $$1.dim.bind(ctx);
  ctx.italic = $$1.italic.bind(ctx);
  ctx.underline = $$1.underline.bind(ctx);
  ctx.inverse = $$1.inverse.bind(ctx);
  ctx.hidden = $$1.hidden.bind(ctx);
  ctx.strikethrough = $$1.strikethrough.bind(ctx);
  ctx.black = $$1.black.bind(ctx);
  ctx.red = $$1.red.bind(ctx);
  ctx.green = $$1.green.bind(ctx);
  ctx.yellow = $$1.yellow.bind(ctx);
  ctx.blue = $$1.blue.bind(ctx);
  ctx.magenta = $$1.magenta.bind(ctx);
  ctx.cyan = $$1.cyan.bind(ctx);
  ctx.white = $$1.white.bind(ctx);
  ctx.gray = $$1.gray.bind(ctx);
  ctx.grey = $$1.grey.bind(ctx);
  ctx.bgBlack = $$1.bgBlack.bind(ctx);
  ctx.bgRed = $$1.bgRed.bind(ctx);
  ctx.bgGreen = $$1.bgGreen.bind(ctx);
  ctx.bgYellow = $$1.bgYellow.bind(ctx);
  ctx.bgBlue = $$1.bgBlue.bind(ctx);
  ctx.bgMagenta = $$1.bgMagenta.bind(ctx);
  ctx.bgCyan = $$1.bgCyan.bind(ctx);
  ctx.bgWhite = $$1.bgWhite.bind(ctx);
  return ctx;
}
function init$1(open, close) {
  let blk = {
    open: `\x1B[${open}m`,
    close: `\x1B[${close}m`,
    rgx: new RegExp(`\\x1b\\[${close}m`, "g")
  };
  return function(txt) {
    if (this !== void 0 && this.has !== void 0) {
      !!~this.has.indexOf(open) || (this.has.push(open), this.keys.push(blk));
      return txt === void 0 ? this : $$1.enabled ? run$2(this.keys, txt + "") : txt + "";
    }
    return txt === void 0 ? chain$1([open], [blk]) : $$1.enabled ? run$2([blk], txt + "") : txt + "";
  };
}
var kleur = $$1;
var action$1 = (key, isSelect) => {
  if (key.meta && key.name !== "escape")
    return;
  if (key.ctrl) {
    if (key.name === "a")
      return "first";
    if (key.name === "c")
      return "abort";
    if (key.name === "d")
      return "abort";
    if (key.name === "e")
      return "last";
    if (key.name === "g")
      return "reset";
    if (key.name === "n")
      return "down";
    if (key.name === "p")
      return "up";
    return;
  }
  if (isSelect) {
    if (key.name === "j")
      return "down";
    if (key.name === "k")
      return "up";
  }
  if (key.name === "return")
    return "submit";
  if (key.name === "enter")
    return "submit";
  if (key.name === "backspace")
    return "delete";
  if (key.name === "delete")
    return "deleteForward";
  if (key.name === "abort")
    return "abort";
  if (key.name === "escape")
    return "exit";
  if (key.name === "tab")
    return "next";
  if (key.name === "pagedown")
    return "nextPage";
  if (key.name === "pageup")
    return "prevPage";
  if (key.name === "home")
    return "home";
  if (key.name === "end")
    return "end";
  if (key.name === "up")
    return "up";
  if (key.name === "down")
    return "down";
  if (key.name === "right")
    return "right";
  if (key.name === "left")
    return "left";
  return false;
};
var strip$2 = (str) => {
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"
  ].join("|");
  const RGX = new RegExp(pattern, "g");
  return typeof str === "string" ? str.replace(RGX, "") : str;
};
var ESC = "\x1B";
var CSI = `${ESC}[`;
var beep$1 = "\x07";
var cursor$b = {
  to(x3, y3) {
    if (!y3)
      return `${CSI}${x3 + 1}G`;
    return `${CSI}${y3 + 1};${x3 + 1}H`;
  },
  move(x3, y3) {
    let ret = "";
    if (x3 < 0)
      ret += `${CSI}${-x3}D`;
    else if (x3 > 0)
      ret += `${CSI}${x3}C`;
    if (y3 < 0)
      ret += `${CSI}${-y3}A`;
    else if (y3 > 0)
      ret += `${CSI}${y3}B`;
    return ret;
  },
  up: (count = 1) => `${CSI}${count}A`,
  down: (count = 1) => `${CSI}${count}B`,
  forward: (count = 1) => `${CSI}${count}C`,
  backward: (count = 1) => `${CSI}${count}D`,
  nextLine: (count = 1) => `${CSI}E`.repeat(count),
  prevLine: (count = 1) => `${CSI}F`.repeat(count),
  left: `${CSI}G`,
  hide: `${CSI}?25l`,
  show: `${CSI}?25h`,
  save: `${ESC}7`,
  restore: `${ESC}8`
};
var scroll = {
  up: (count = 1) => `${CSI}S`.repeat(count),
  down: (count = 1) => `${CSI}T`.repeat(count)
};
var erase$7 = {
  screen: `${CSI}2J`,
  up: (count = 1) => `${CSI}1J`.repeat(count),
  down: (count = 1) => `${CSI}J`.repeat(count),
  line: `${CSI}2K`,
  lineEnd: `${CSI}K`,
  lineStart: `${CSI}1K`,
  lines(count) {
    let clear2 = "";
    for (let i = 0; i < count; i++)
      clear2 += this.line + (i < count - 1 ? cursor$b.up() : "");
    if (count)
      clear2 += cursor$b.left;
    return clear2;
  }
};
var src = { cursor: cursor$b, scroll, erase: erase$7, beep: beep$1 };
var strip$1 = strip$2;
var { erase: erase$6, cursor: cursor$a } = src;
var width = (str) => [...strip$1(str)].length;
var clear$9 = function(prompt2, perLine) {
  if (!perLine)
    return erase$6.line + cursor$a.to(0);
  let rows = 0;
  const lines2 = prompt2.split(/\r?\n/);
  for (let line of lines2) {
    rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
  }
  return erase$6.lines(rows);
};
var main = {
  arrowUp: "\u2191",
  arrowDown: "\u2193",
  arrowLeft: "\u2190",
  arrowRight: "\u2192",
  radioOn: "\u25C9",
  radioOff: "\u25EF",
  tick: "\u2714",
  cross: "\u2716",
  ellipsis: "\u2026",
  pointerSmall: "\u203A",
  line: "\u2500",
  pointer: "\u276F"
};
var win = {
  arrowUp: main.arrowUp,
  arrowDown: main.arrowDown,
  arrowLeft: main.arrowLeft,
  arrowRight: main.arrowRight,
  radioOn: "(*)",
  radioOff: "( )",
  tick: "\u221A",
  cross: "\xD7",
  ellipsis: "...",
  pointerSmall: "\xBB",
  line: "\u2500",
  pointer: ">"
};
var figures$8 = process.platform === "win32" ? win : main;
var figures_1 = figures$8;
var c2 = kleur;
var figures$7 = figures_1;
var styles3 = Object.freeze({
  password: { scale: 1, render: (input) => "*".repeat(input.length) },
  emoji: { scale: 2, render: (input) => "\u{1F603}".repeat(input.length) },
  invisible: { scale: 0, render: (input) => "" },
  default: { scale: 1, render: (input) => `${input}` }
});
var render = (type) => styles3[type] || styles3.default;
var symbols = Object.freeze({
  aborted: c2.red(figures$7.cross),
  done: c2.green(figures$7.tick),
  exited: c2.yellow(figures$7.cross),
  default: c2.cyan("?")
});
var symbol = (done, aborted, exited) => aborted ? symbols.aborted : exited ? symbols.exited : done ? symbols.done : symbols.default;
var delimiter$1 = (completing) => c2.gray(completing ? figures$7.ellipsis : figures$7.pointerSmall);
var item = (expandable, expanded) => c2.gray(expandable ? expanded ? figures$7.pointerSmall : "+" : figures$7.line);
var style$9 = {
  styles: styles3,
  render,
  symbols,
  symbol,
  delimiter: delimiter$1,
  item
};
var strip = strip$2;
var lines$2 = function(msg, perLine) {
  let lines2 = String(strip(msg) || "").split(/\r?\n/);
  if (!perLine)
    return lines2.length;
  return lines2.map((l) => Math.ceil(l.length / perLine)).reduce((a2, b3) => a2 + b3);
};
var wrap$3 = (msg, opts = {}) => {
  const tab = Number.isSafeInteger(parseInt(opts.margin)) ? new Array(parseInt(opts.margin)).fill(" ").join("") : opts.margin || "";
  const width2 = opts.width;
  return (msg || "").split(/\r?\n/g).map((line) => line.split(/\s+/g).reduce((arr, w3) => {
    if (w3.length + tab.length >= width2 || arr[arr.length - 1].length + w3.length + 1 < width2)
      arr[arr.length - 1] += ` ${w3}`;
    else
      arr.push(`${tab}${w3}`);
    return arr;
  }, [tab]).join("\n")).join("\n");
};
var entriesToDisplay$3 = (cursor2, total, maxVisible) => {
  maxVisible = maxVisible || total;
  let startIndex = Math.min(total - maxVisible, cursor2 - Math.floor(maxVisible / 2));
  if (startIndex < 0)
    startIndex = 0;
  let endIndex = Math.min(startIndex + maxVisible, total);
  return { startIndex, endIndex };
};
var util = {
  action: action$1,
  clear: clear$9,
  style: style$9,
  strip: strip$2,
  figures: figures_1,
  lines: lines$2,
  wrap: wrap$3,
  entriesToDisplay: entriesToDisplay$3
};
var readline = import_readline.default;
var { action } = util;
var EventEmitter = import_events.default;
var { beep, cursor: cursor$9 } = src;
var color$9 = kleur;
var Prompt$8 = class Prompt extends EventEmitter {
  constructor(opts = {}) {
    super();
    this.firstRender = true;
    this.in = opts.stdin || process.stdin;
    this.out = opts.stdout || process.stdout;
    this.onRender = (opts.onRender || (() => void 0)).bind(this);
    const rl = readline.createInterface({ input: this.in, escapeCodeTimeout: 50 });
    readline.emitKeypressEvents(this.in, rl);
    if (this.in.isTTY)
      this.in.setRawMode(true);
    const isSelect = ["SelectPrompt", "MultiselectPrompt"].indexOf(this.constructor.name) > -1;
    const keypress = (str, key) => {
      let a2 = action(key, isSelect);
      if (a2 === false) {
        this._ && this._(str, key);
      } else if (typeof this[a2] === "function") {
        this[a2](key);
      } else {
        this.bell();
      }
    };
    this.close = () => {
      this.out.write(cursor$9.show);
      this.in.removeListener("keypress", keypress);
      if (this.in.isTTY)
        this.in.setRawMode(false);
      rl.close();
      this.emit(this.aborted ? "abort" : this.exited ? "exit" : "submit", this.value);
      this.closed = true;
    };
    this.in.on("keypress", keypress);
  }
  fire() {
    this.emit("state", {
      value: this.value,
      aborted: !!this.aborted,
      exited: !!this.exited
    });
  }
  bell() {
    this.out.write(beep);
  }
  render() {
    this.onRender(color$9);
    if (this.firstRender)
      this.firstRender = false;
  }
};
var prompt$1 = Prompt$8;
var color$8 = kleur;
var Prompt$7 = prompt$1;
var { erase: erase$5, cursor: cursor$8 } = src;
var { style: style$8, clear: clear$8, lines: lines$1, figures: figures$6 } = util;
var TextPrompt = class extends Prompt$7 {
  constructor(opts = {}) {
    super(opts);
    this.transform = style$8.render(opts.style);
    this.scale = this.transform.scale;
    this.msg = opts.message;
    this.initial = opts.initial || ``;
    this.validator = opts.validate || (() => true);
    this.value = ``;
    this.errorMsg = opts.error || `Please Enter A Valid Value`;
    this.cursor = Number(!!this.initial);
    this.cursorOffset = 0;
    this.clear = clear$8(``, this.out.columns);
    this.render();
  }
  set value(v2) {
    if (!v2 && this.initial) {
      this.placeholder = true;
      this.rendered = color$8.gray(this.transform.render(this.initial));
    } else {
      this.placeholder = false;
      this.rendered = this.transform.render(v2);
    }
    this._value = v2;
    this.fire();
  }
  get value() {
    return this._value;
  }
  reset() {
    this.value = ``;
    this.cursor = Number(!!this.initial);
    this.cursorOffset = 0;
    this.fire();
    this.render();
  }
  exit() {
    this.abort();
  }
  abort() {
    this.value = this.value || this.initial;
    this.done = this.aborted = true;
    this.error = false;
    this.red = false;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  async validate() {
    let valid = await this.validator(this.value);
    if (typeof valid === `string`) {
      this.errorMsg = valid;
      valid = false;
    }
    this.error = !valid;
  }
  async submit() {
    this.value = this.value || this.initial;
    this.cursorOffset = 0;
    this.cursor = this.rendered.length;
    await this.validate();
    if (this.error) {
      this.red = true;
      this.fire();
      this.render();
      return;
    }
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  next() {
    if (!this.placeholder)
      return this.bell();
    this.value = this.initial;
    this.cursor = this.rendered.length;
    this.fire();
    this.render();
  }
  moveCursor(n) {
    if (this.placeholder)
      return;
    this.cursor = this.cursor + n;
    this.cursorOffset += n;
  }
  _(c3, key) {
    let s1 = this.value.slice(0, this.cursor);
    let s2 = this.value.slice(this.cursor);
    this.value = `${s1}${c3}${s2}`;
    this.red = false;
    this.cursor = this.placeholder ? 0 : s1.length + 1;
    this.render();
  }
  delete() {
    if (this.isCursorAtStart())
      return this.bell();
    let s1 = this.value.slice(0, this.cursor - 1);
    let s2 = this.value.slice(this.cursor);
    this.value = `${s1}${s2}`;
    this.red = false;
    if (this.isCursorAtStart()) {
      this.cursorOffset = 0;
    } else {
      this.cursorOffset++;
      this.moveCursor(-1);
    }
    this.render();
  }
  deleteForward() {
    if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
      return this.bell();
    let s1 = this.value.slice(0, this.cursor);
    let s2 = this.value.slice(this.cursor + 1);
    this.value = `${s1}${s2}`;
    this.red = false;
    if (this.isCursorAtEnd()) {
      this.cursorOffset = 0;
    } else {
      this.cursorOffset++;
    }
    this.render();
  }
  first() {
    this.cursor = 0;
    this.render();
  }
  last() {
    this.cursor = this.value.length;
    this.render();
  }
  left() {
    if (this.cursor <= 0 || this.placeholder)
      return this.bell();
    this.moveCursor(-1);
    this.render();
  }
  right() {
    if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
      return this.bell();
    this.moveCursor(1);
    this.render();
  }
  isCursorAtStart() {
    return this.cursor === 0 || this.placeholder && this.cursor === 1;
  }
  isCursorAtEnd() {
    return this.cursor === this.rendered.length || this.placeholder && this.cursor === this.rendered.length + 1;
  }
  render() {
    if (this.closed)
      return;
    if (!this.firstRender) {
      if (this.outputError)
        this.out.write(cursor$8.down(lines$1(this.outputError, this.out.columns) - 1) + clear$8(this.outputError, this.out.columns));
      this.out.write(clear$8(this.outputText, this.out.columns));
    }
    super.render();
    this.outputError = "";
    this.outputText = [
      style$8.symbol(this.done, this.aborted),
      color$8.bold(this.msg),
      style$8.delimiter(this.done),
      this.red ? color$8.red(this.rendered) : this.rendered
    ].join(` `);
    if (this.error) {
      this.outputError += this.errorMsg.split(`
`).reduce((a2, l, i) => a2 + `
${i ? " " : figures$6.pointerSmall} ${color$8.red().italic(l)}`, ``);
    }
    this.out.write(erase$5.line + cursor$8.to(0) + this.outputText + cursor$8.save + this.outputError + cursor$8.restore + cursor$8.move(this.cursorOffset, 0));
  }
};
var text = TextPrompt;
var color$7 = kleur;
var Prompt$6 = prompt$1;
var { style: style$7, clear: clear$7, figures: figures$5, wrap: wrap$2, entriesToDisplay: entriesToDisplay$2 } = util;
var { cursor: cursor$7 } = src;
var SelectPrompt = class extends Prompt$6 {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.hint = opts.hint || "- Use arrow-keys. Return to submit.";
    this.warn = opts.warn || "- This option is disabled";
    this.cursor = opts.initial || 0;
    this.choices = opts.choices.map((ch, idx) => {
      if (typeof ch === "string")
        ch = { title: ch, value: idx };
      return {
        title: ch && (ch.title || ch.value || ch),
        value: ch && (ch.value === void 0 ? idx : ch.value),
        description: ch && ch.description,
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.optionsPerPage = opts.optionsPerPage || 10;
    this.value = (this.choices[this.cursor] || {}).value;
    this.clear = clear$7("", this.out.columns);
    this.render();
  }
  moveCursor(n) {
    this.cursor = n;
    this.value = this.choices[n].value;
    this.fire();
  }
  reset() {
    this.moveCursor(0);
    this.fire();
    this.render();
  }
  exit() {
    this.abort();
  }
  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  submit() {
    if (!this.selection.disabled) {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write("\n");
      this.close();
    } else
      this.bell();
  }
  first() {
    this.moveCursor(0);
    this.render();
  }
  last() {
    this.moveCursor(this.choices.length - 1);
    this.render();
  }
  up() {
    if (this.cursor === 0) {
      this.moveCursor(this.choices.length - 1);
    } else {
      this.moveCursor(this.cursor - 1);
    }
    this.render();
  }
  down() {
    if (this.cursor === this.choices.length - 1) {
      this.moveCursor(0);
    } else {
      this.moveCursor(this.cursor + 1);
    }
    this.render();
  }
  next() {
    this.moveCursor((this.cursor + 1) % this.choices.length);
    this.render();
  }
  _(c3, key) {
    if (c3 === " ")
      return this.submit();
  }
  get selection() {
    return this.choices[this.cursor];
  }
  render() {
    if (this.closed)
      return;
    if (this.firstRender)
      this.out.write(cursor$7.hide);
    else
      this.out.write(clear$7(this.outputText, this.out.columns));
    super.render();
    let { startIndex, endIndex } = entriesToDisplay$2(this.cursor, this.choices.length, this.optionsPerPage);
    this.outputText = [
      style$7.symbol(this.done, this.aborted),
      color$7.bold(this.msg),
      style$7.delimiter(false),
      this.done ? this.selection.title : this.selection.disabled ? color$7.yellow(this.warn) : color$7.gray(this.hint)
    ].join(" ");
    if (!this.done) {
      this.outputText += "\n";
      for (let i = startIndex; i < endIndex; i++) {
        let title, prefix, desc = "", v2 = this.choices[i];
        if (i === startIndex && startIndex > 0) {
          prefix = figures$5.arrowUp;
        } else if (i === endIndex - 1 && endIndex < this.choices.length) {
          prefix = figures$5.arrowDown;
        } else {
          prefix = " ";
        }
        if (v2.disabled) {
          title = this.cursor === i ? color$7.gray().underline(v2.title) : color$7.strikethrough().gray(v2.title);
          prefix = (this.cursor === i ? color$7.bold().gray(figures$5.pointer) + " " : "  ") + prefix;
        } else {
          title = this.cursor === i ? color$7.cyan().underline(v2.title) : v2.title;
          prefix = (this.cursor === i ? color$7.cyan(figures$5.pointer) + " " : "  ") + prefix;
          if (v2.description && this.cursor === i) {
            desc = ` - ${v2.description}`;
            if (prefix.length + title.length + desc.length >= this.out.columns || v2.description.split(/\r?\n/).length > 1) {
              desc = "\n" + wrap$2(v2.description, { margin: 3, width: this.out.columns });
            }
          }
        }
        this.outputText += `${prefix} ${title}${color$7.gray(desc)}
`;
      }
    }
    this.out.write(this.outputText);
  }
};
var select = SelectPrompt;
var color$6 = kleur;
var Prompt$5 = prompt$1;
var { style: style$6, clear: clear$6 } = util;
var { cursor: cursor$6, erase: erase$4 } = src;
var TogglePrompt = class extends Prompt$5 {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.value = !!opts.initial;
    this.active = opts.active || "on";
    this.inactive = opts.inactive || "off";
    this.initialValue = this.value;
    this.render();
  }
  reset() {
    this.value = this.initialValue;
    this.fire();
    this.render();
  }
  exit() {
    this.abort();
  }
  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  submit() {
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  deactivate() {
    if (this.value === false)
      return this.bell();
    this.value = false;
    this.render();
  }
  activate() {
    if (this.value === true)
      return this.bell();
    this.value = true;
    this.render();
  }
  delete() {
    this.deactivate();
  }
  left() {
    this.deactivate();
  }
  right() {
    this.activate();
  }
  down() {
    this.deactivate();
  }
  up() {
    this.activate();
  }
  next() {
    this.value = !this.value;
    this.fire();
    this.render();
  }
  _(c3, key) {
    if (c3 === " ") {
      this.value = !this.value;
    } else if (c3 === "1") {
      this.value = true;
    } else if (c3 === "0") {
      this.value = false;
    } else
      return this.bell();
    this.render();
  }
  render() {
    if (this.closed)
      return;
    if (this.firstRender)
      this.out.write(cursor$6.hide);
    else
      this.out.write(clear$6(this.outputText, this.out.columns));
    super.render();
    this.outputText = [
      style$6.symbol(this.done, this.aborted),
      color$6.bold(this.msg),
      style$6.delimiter(this.done),
      this.value ? this.inactive : color$6.cyan().underline(this.inactive),
      color$6.gray("/"),
      this.value ? color$6.cyan().underline(this.active) : this.active
    ].join(" ");
    this.out.write(erase$4.line + cursor$6.to(0) + this.outputText);
  }
};
var toggle = TogglePrompt;
var DatePart$9 = class DatePart {
  constructor({ token, date: date2, parts, locales }) {
    this.token = token;
    this.date = date2 || new Date();
    this.parts = parts || [this];
    this.locales = locales || {};
  }
  up() {
  }
  down() {
  }
  next() {
    const currentIdx = this.parts.indexOf(this);
    return this.parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
  }
  setTo(val) {
  }
  prev() {
    let parts = [].concat(this.parts).reverse();
    const currentIdx = parts.indexOf(this);
    return parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
  }
  toString() {
    return String(this.date);
  }
};
var datepart = DatePart$9;
var DatePart$8 = datepart;
var Meridiem$1 = class Meridiem extends DatePart$8 {
  constructor(opts = {}) {
    super(opts);
  }
  up() {
    this.date.setHours((this.date.getHours() + 12) % 24);
  }
  down() {
    this.up();
  }
  toString() {
    let meridiem2 = this.date.getHours() > 12 ? "pm" : "am";
    return /\A/.test(this.token) ? meridiem2.toUpperCase() : meridiem2;
  }
};
var meridiem = Meridiem$1;
var DatePart$7 = datepart;
var pos = (n) => {
  n = n % 10;
  return n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
};
var Day$1 = class Day extends DatePart$7 {
  constructor(opts = {}) {
    super(opts);
  }
  up() {
    this.date.setDate(this.date.getDate() + 1);
  }
  down() {
    this.date.setDate(this.date.getDate() - 1);
  }
  setTo(val) {
    this.date.setDate(parseInt(val.substr(-2)));
  }
  toString() {
    let date2 = this.date.getDate();
    let day2 = this.date.getDay();
    return this.token === "DD" ? String(date2).padStart(2, "0") : this.token === "Do" ? date2 + pos(date2) : this.token === "d" ? day2 + 1 : this.token === "ddd" ? this.locales.weekdaysShort[day2] : this.token === "dddd" ? this.locales.weekdays[day2] : date2;
  }
};
var day = Day$1;
var DatePart$6 = datepart;
var Hours$1 = class Hours extends DatePart$6 {
  constructor(opts = {}) {
    super(opts);
  }
  up() {
    this.date.setHours(this.date.getHours() + 1);
  }
  down() {
    this.date.setHours(this.date.getHours() - 1);
  }
  setTo(val) {
    this.date.setHours(parseInt(val.substr(-2)));
  }
  toString() {
    let hours2 = this.date.getHours();
    if (/h/.test(this.token))
      hours2 = hours2 % 12 || 12;
    return this.token.length > 1 ? String(hours2).padStart(2, "0") : hours2;
  }
};
var hours = Hours$1;
var DatePart$5 = datepart;
var Milliseconds$1 = class Milliseconds extends DatePart$5 {
  constructor(opts = {}) {
    super(opts);
  }
  up() {
    this.date.setMilliseconds(this.date.getMilliseconds() + 1);
  }
  down() {
    this.date.setMilliseconds(this.date.getMilliseconds() - 1);
  }
  setTo(val) {
    this.date.setMilliseconds(parseInt(val.substr(-this.token.length)));
  }
  toString() {
    return String(this.date.getMilliseconds()).padStart(4, "0").substr(0, this.token.length);
  }
};
var milliseconds = Milliseconds$1;
var DatePart$4 = datepart;
var Minutes$1 = class Minutes extends DatePart$4 {
  constructor(opts = {}) {
    super(opts);
  }
  up() {
    this.date.setMinutes(this.date.getMinutes() + 1);
  }
  down() {
    this.date.setMinutes(this.date.getMinutes() - 1);
  }
  setTo(val) {
    this.date.setMinutes(parseInt(val.substr(-2)));
  }
  toString() {
    let m2 = this.date.getMinutes();
    return this.token.length > 1 ? String(m2).padStart(2, "0") : m2;
  }
};
var minutes = Minutes$1;
var DatePart$3 = datepart;
var Month$1 = class Month extends DatePart$3 {
  constructor(opts = {}) {
    super(opts);
  }
  up() {
    this.date.setMonth(this.date.getMonth() + 1);
  }
  down() {
    this.date.setMonth(this.date.getMonth() - 1);
  }
  setTo(val) {
    val = parseInt(val.substr(-2)) - 1;
    this.date.setMonth(val < 0 ? 0 : val);
  }
  toString() {
    let month2 = this.date.getMonth();
    let tl = this.token.length;
    return tl === 2 ? String(month2 + 1).padStart(2, "0") : tl === 3 ? this.locales.monthsShort[month2] : tl === 4 ? this.locales.months[month2] : String(month2 + 1);
  }
};
var month = Month$1;
var DatePart$2 = datepart;
var Seconds$1 = class Seconds extends DatePart$2 {
  constructor(opts = {}) {
    super(opts);
  }
  up() {
    this.date.setSeconds(this.date.getSeconds() + 1);
  }
  down() {
    this.date.setSeconds(this.date.getSeconds() - 1);
  }
  setTo(val) {
    this.date.setSeconds(parseInt(val.substr(-2)));
  }
  toString() {
    let s = this.date.getSeconds();
    return this.token.length > 1 ? String(s).padStart(2, "0") : s;
  }
};
var seconds = Seconds$1;
var DatePart$1 = datepart;
var Year$1 = class Year extends DatePart$1 {
  constructor(opts = {}) {
    super(opts);
  }
  up() {
    this.date.setFullYear(this.date.getFullYear() + 1);
  }
  down() {
    this.date.setFullYear(this.date.getFullYear() - 1);
  }
  setTo(val) {
    this.date.setFullYear(val.substr(-4));
  }
  toString() {
    let year2 = String(this.date.getFullYear()).padStart(4, "0");
    return this.token.length === 2 ? year2.substr(-2) : year2;
  }
};
var year = Year$1;
var dateparts = {
  DatePart: datepart,
  Meridiem: meridiem,
  Day: day,
  Hours: hours,
  Milliseconds: milliseconds,
  Minutes: minutes,
  Month: month,
  Seconds: seconds,
  Year: year
};
var color$5 = kleur;
var Prompt$4 = prompt$1;
var { style: style$5, clear: clear$5, figures: figures$4 } = util;
var { erase: erase$3, cursor: cursor$5 } = src;
var { DatePart: DatePart2, Meridiem: Meridiem2, Day: Day2, Hours: Hours2, Milliseconds: Milliseconds2, Minutes: Minutes2, Month: Month2, Seconds: Seconds2, Year: Year2 } = dateparts;
var regex = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
var regexGroups = {
  1: ({ token }) => token.replace(/\\(.)/g, "$1"),
  2: (opts) => new Day2(opts),
  3: (opts) => new Month2(opts),
  4: (opts) => new Year2(opts),
  5: (opts) => new Meridiem2(opts),
  6: (opts) => new Hours2(opts),
  7: (opts) => new Minutes2(opts),
  8: (opts) => new Seconds2(opts),
  9: (opts) => new Milliseconds2(opts)
};
var dfltLocales = {
  months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
  monthsShort: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
  weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
  weekdaysShort: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",")
};
var DatePrompt = class extends Prompt$4 {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.cursor = 0;
    this.typed = "";
    this.locales = Object.assign(dfltLocales, opts.locales);
    this._date = opts.initial || new Date();
    this.errorMsg = opts.error || "Please Enter A Valid Value";
    this.validator = opts.validate || (() => true);
    this.mask = opts.mask || "YYYY-MM-DD HH:mm:ss";
    this.clear = clear$5("", this.out.columns);
    this.render();
  }
  get value() {
    return this.date;
  }
  get date() {
    return this._date;
  }
  set date(date2) {
    if (date2)
      this._date.setTime(date2.getTime());
  }
  set mask(mask) {
    let result;
    this.parts = [];
    while (result = regex.exec(mask)) {
      let match = result.shift();
      let idx = result.findIndex((gr) => gr != null);
      this.parts.push(idx in regexGroups ? regexGroups[idx]({ token: result[idx] || match, date: this.date, parts: this.parts, locales: this.locales }) : result[idx] || match);
    }
    let parts = this.parts.reduce((arr, i) => {
      if (typeof i === "string" && typeof arr[arr.length - 1] === "string")
        arr[arr.length - 1] += i;
      else
        arr.push(i);
      return arr;
    }, []);
    this.parts.splice(0);
    this.parts.push(...parts);
    this.reset();
  }
  moveCursor(n) {
    this.typed = "";
    this.cursor = n;
    this.fire();
  }
  reset() {
    this.moveCursor(this.parts.findIndex((p2) => p2 instanceof DatePart2));
    this.fire();
    this.render();
  }
  exit() {
    this.abort();
  }
  abort() {
    this.done = this.aborted = true;
    this.error = false;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  async validate() {
    let valid = await this.validator(this.value);
    if (typeof valid === "string") {
      this.errorMsg = valid;
      valid = false;
    }
    this.error = !valid;
  }
  async submit() {
    await this.validate();
    if (this.error) {
      this.color = "red";
      this.fire();
      this.render();
      return;
    }
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  up() {
    this.typed = "";
    this.parts[this.cursor].up();
    this.render();
  }
  down() {
    this.typed = "";
    this.parts[this.cursor].down();
    this.render();
  }
  left() {
    let prev = this.parts[this.cursor].prev();
    if (prev == null)
      return this.bell();
    this.moveCursor(this.parts.indexOf(prev));
    this.render();
  }
  right() {
    let next2 = this.parts[this.cursor].next();
    if (next2 == null)
      return this.bell();
    this.moveCursor(this.parts.indexOf(next2));
    this.render();
  }
  next() {
    let next2 = this.parts[this.cursor].next();
    this.moveCursor(next2 ? this.parts.indexOf(next2) : this.parts.findIndex((part) => part instanceof DatePart2));
    this.render();
  }
  _(c3) {
    if (/\d/.test(c3)) {
      this.typed += c3;
      this.parts[this.cursor].setTo(this.typed);
      this.render();
    }
  }
  render() {
    if (this.closed)
      return;
    if (this.firstRender)
      this.out.write(cursor$5.hide);
    else
      this.out.write(clear$5(this.outputText, this.out.columns));
    super.render();
    this.outputText = [
      style$5.symbol(this.done, this.aborted),
      color$5.bold(this.msg),
      style$5.delimiter(false),
      this.parts.reduce((arr, p2, idx) => arr.concat(idx === this.cursor && !this.done ? color$5.cyan().underline(p2.toString()) : p2), []).join("")
    ].join(" ");
    if (this.error) {
      this.outputText += this.errorMsg.split("\n").reduce(
        (a2, l, i) => a2 + `
${i ? ` ` : figures$4.pointerSmall} ${color$5.red().italic(l)}`,
        ``
      );
    }
    this.out.write(erase$3.line + cursor$5.to(0) + this.outputText);
  }
};
var date = DatePrompt;
var color$4 = kleur;
var Prompt$3 = prompt$1;
var { cursor: cursor$4, erase: erase$2 } = src;
var { style: style$4, figures: figures$3, clear: clear$4, lines } = util;
var isNumber = /[0-9]/;
var isDef = (any) => any !== void 0;
var round = (number2, precision) => {
  let factor = Math.pow(10, precision);
  return Math.round(number2 * factor) / factor;
};
var NumberPrompt = class extends Prompt$3 {
  constructor(opts = {}) {
    super(opts);
    this.transform = style$4.render(opts.style);
    this.msg = opts.message;
    this.initial = isDef(opts.initial) ? opts.initial : "";
    this.float = !!opts.float;
    this.round = opts.round || 2;
    this.inc = opts.increment || 1;
    this.min = isDef(opts.min) ? opts.min : -Infinity;
    this.max = isDef(opts.max) ? opts.max : Infinity;
    this.errorMsg = opts.error || `Please Enter A Valid Value`;
    this.validator = opts.validate || (() => true);
    this.color = `cyan`;
    this.value = ``;
    this.typed = ``;
    this.lastHit = 0;
    this.render();
  }
  set value(v2) {
    if (!v2 && v2 !== 0) {
      this.placeholder = true;
      this.rendered = color$4.gray(this.transform.render(`${this.initial}`));
      this._value = ``;
    } else {
      this.placeholder = false;
      this.rendered = this.transform.render(`${round(v2, this.round)}`);
      this._value = round(v2, this.round);
    }
    this.fire();
  }
  get value() {
    return this._value;
  }
  parse(x3) {
    return this.float ? parseFloat(x3) : parseInt(x3);
  }
  valid(c3) {
    return c3 === `-` || c3 === `.` && this.float || isNumber.test(c3);
  }
  reset() {
    this.typed = ``;
    this.value = ``;
    this.fire();
    this.render();
  }
  exit() {
    this.abort();
  }
  abort() {
    let x3 = this.value;
    this.value = x3 !== `` ? x3 : this.initial;
    this.done = this.aborted = true;
    this.error = false;
    this.fire();
    this.render();
    this.out.write(`
`);
    this.close();
  }
  async validate() {
    let valid = await this.validator(this.value);
    if (typeof valid === `string`) {
      this.errorMsg = valid;
      valid = false;
    }
    this.error = !valid;
  }
  async submit() {
    await this.validate();
    if (this.error) {
      this.color = `red`;
      this.fire();
      this.render();
      return;
    }
    let x3 = this.value;
    this.value = x3 !== `` ? x3 : this.initial;
    this.done = true;
    this.aborted = false;
    this.error = false;
    this.fire();
    this.render();
    this.out.write(`
`);
    this.close();
  }
  up() {
    this.typed = ``;
    if (this.value === "") {
      this.value = this.min - this.inc;
    }
    if (this.value >= this.max)
      return this.bell();
    this.value += this.inc;
    this.color = `cyan`;
    this.fire();
    this.render();
  }
  down() {
    this.typed = ``;
    if (this.value === "") {
      this.value = this.min + this.inc;
    }
    if (this.value <= this.min)
      return this.bell();
    this.value -= this.inc;
    this.color = `cyan`;
    this.fire();
    this.render();
  }
  delete() {
    let val = this.value.toString();
    if (val.length === 0)
      return this.bell();
    this.value = this.parse(val = val.slice(0, -1)) || ``;
    if (this.value !== "" && this.value < this.min) {
      this.value = this.min;
    }
    this.color = `cyan`;
    this.fire();
    this.render();
  }
  next() {
    this.value = this.initial;
    this.fire();
    this.render();
  }
  _(c3, key) {
    if (!this.valid(c3))
      return this.bell();
    const now = Date.now();
    if (now - this.lastHit > 1e3)
      this.typed = ``;
    this.typed += c3;
    this.lastHit = now;
    this.color = `cyan`;
    if (c3 === `.`)
      return this.fire();
    this.value = Math.min(this.parse(this.typed), this.max);
    if (this.value > this.max)
      this.value = this.max;
    if (this.value < this.min)
      this.value = this.min;
    this.fire();
    this.render();
  }
  render() {
    if (this.closed)
      return;
    if (!this.firstRender) {
      if (this.outputError)
        this.out.write(cursor$4.down(lines(this.outputError, this.out.columns) - 1) + clear$4(this.outputError, this.out.columns));
      this.out.write(clear$4(this.outputText, this.out.columns));
    }
    super.render();
    this.outputError = "";
    this.outputText = [
      style$4.symbol(this.done, this.aborted),
      color$4.bold(this.msg),
      style$4.delimiter(this.done),
      !this.done || !this.done && !this.placeholder ? color$4[this.color]().underline(this.rendered) : this.rendered
    ].join(` `);
    if (this.error) {
      this.outputError += this.errorMsg.split(`
`).reduce((a2, l, i) => a2 + `
${i ? ` ` : figures$3.pointerSmall} ${color$4.red().italic(l)}`, ``);
    }
    this.out.write(erase$2.line + cursor$4.to(0) + this.outputText + cursor$4.save + this.outputError + cursor$4.restore);
  }
};
var number = NumberPrompt;
var color$3 = kleur;
var { cursor: cursor$3 } = src;
var Prompt$2 = prompt$1;
var { clear: clear$3, figures: figures$2, style: style$3, wrap: wrap$1, entriesToDisplay: entriesToDisplay$1 } = util;
var MultiselectPrompt$1 = class MultiselectPrompt extends Prompt$2 {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.cursor = opts.cursor || 0;
    this.scrollIndex = opts.cursor || 0;
    this.hint = opts.hint || "";
    this.warn = opts.warn || "- This option is disabled -";
    this.minSelected = opts.min;
    this.showMinError = false;
    this.maxChoices = opts.max;
    this.instructions = opts.instructions;
    this.optionsPerPage = opts.optionsPerPage || 10;
    this.value = opts.choices.map((ch, idx) => {
      if (typeof ch === "string")
        ch = { title: ch, value: idx };
      return {
        title: ch && (ch.title || ch.value || ch),
        description: ch && ch.description,
        value: ch && (ch.value === void 0 ? idx : ch.value),
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.clear = clear$3("", this.out.columns);
    if (!opts.overrideRender) {
      this.render();
    }
  }
  reset() {
    this.value.map((v2) => !v2.selected);
    this.cursor = 0;
    this.fire();
    this.render();
  }
  selected() {
    return this.value.filter((v2) => v2.selected);
  }
  exit() {
    this.abort();
  }
  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  submit() {
    const selected = this.value.filter((e2) => e2.selected);
    if (this.minSelected && selected.length < this.minSelected) {
      this.showMinError = true;
      this.render();
    } else {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write("\n");
      this.close();
    }
  }
  first() {
    this.cursor = 0;
    this.render();
  }
  last() {
    this.cursor = this.value.length - 1;
    this.render();
  }
  next() {
    this.cursor = (this.cursor + 1) % this.value.length;
    this.render();
  }
  up() {
    if (this.cursor === 0) {
      this.cursor = this.value.length - 1;
    } else {
      this.cursor--;
    }
    this.render();
  }
  down() {
    if (this.cursor === this.value.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor++;
    }
    this.render();
  }
  left() {
    this.value[this.cursor].selected = false;
    this.render();
  }
  right() {
    if (this.value.filter((e2) => e2.selected).length >= this.maxChoices)
      return this.bell();
    this.value[this.cursor].selected = true;
    this.render();
  }
  handleSpaceToggle() {
    const v2 = this.value[this.cursor];
    if (v2.selected) {
      v2.selected = false;
      this.render();
    } else if (v2.disabled || this.value.filter((e2) => e2.selected).length >= this.maxChoices) {
      return this.bell();
    } else {
      v2.selected = true;
      this.render();
    }
  }
  toggleAll() {
    if (this.maxChoices !== void 0 || this.value[this.cursor].disabled) {
      return this.bell();
    }
    const newSelected = !this.value[this.cursor].selected;
    this.value.filter((v2) => !v2.disabled).forEach((v2) => v2.selected = newSelected);
    this.render();
  }
  _(c3, key) {
    if (c3 === " ") {
      this.handleSpaceToggle();
    } else if (c3 === "a") {
      this.toggleAll();
    } else {
      return this.bell();
    }
  }
  renderInstructions() {
    if (this.instructions === void 0 || this.instructions) {
      if (typeof this.instructions === "string") {
        return this.instructions;
      }
      return `
Instructions:
    ${figures$2.arrowUp}/${figures$2.arrowDown}: Highlight option
    ${figures$2.arrowLeft}/${figures$2.arrowRight}/[space]: Toggle selection
` + (this.maxChoices === void 0 ? `    a: Toggle all
` : "") + `    enter/return: Complete answer`;
    }
    return "";
  }
  renderOption(cursor2, v2, i, arrowIndicator) {
    const prefix = (v2.selected ? color$3.green(figures$2.radioOn) : figures$2.radioOff) + " " + arrowIndicator + " ";
    let title, desc;
    if (v2.disabled) {
      title = cursor2 === i ? color$3.gray().underline(v2.title) : color$3.strikethrough().gray(v2.title);
    } else {
      title = cursor2 === i ? color$3.cyan().underline(v2.title) : v2.title;
      if (cursor2 === i && v2.description) {
        desc = ` - ${v2.description}`;
        if (prefix.length + title.length + desc.length >= this.out.columns || v2.description.split(/\r?\n/).length > 1) {
          desc = "\n" + wrap$1(v2.description, { margin: prefix.length, width: this.out.columns });
        }
      }
    }
    return prefix + title + color$3.gray(desc || "");
  }
  paginateOptions(options) {
    if (options.length === 0) {
      return color$3.red("No matches for this query.");
    }
    let { startIndex, endIndex } = entriesToDisplay$1(this.cursor, options.length, this.optionsPerPage);
    let prefix, styledOptions = [];
    for (let i = startIndex; i < endIndex; i++) {
      if (i === startIndex && startIndex > 0) {
        prefix = figures$2.arrowUp;
      } else if (i === endIndex - 1 && endIndex < options.length) {
        prefix = figures$2.arrowDown;
      } else {
        prefix = " ";
      }
      styledOptions.push(this.renderOption(this.cursor, options[i], i, prefix));
    }
    return "\n" + styledOptions.join("\n");
  }
  renderOptions(options) {
    if (!this.done) {
      return this.paginateOptions(options);
    }
    return "";
  }
  renderDoneOrInstructions() {
    if (this.done) {
      return this.value.filter((e2) => e2.selected).map((v2) => v2.title).join(", ");
    }
    const output = [color$3.gray(this.hint), this.renderInstructions()];
    if (this.value[this.cursor].disabled) {
      output.push(color$3.yellow(this.warn));
    }
    return output.join(" ");
  }
  render() {
    if (this.closed)
      return;
    if (this.firstRender)
      this.out.write(cursor$3.hide);
    super.render();
    let prompt2 = [
      style$3.symbol(this.done, this.aborted),
      color$3.bold(this.msg),
      style$3.delimiter(false),
      this.renderDoneOrInstructions()
    ].join(" ");
    if (this.showMinError) {
      prompt2 += color$3.red(`You must select a minimum of ${this.minSelected} choices.`);
      this.showMinError = false;
    }
    prompt2 += this.renderOptions(this.value);
    this.out.write(this.clear + prompt2);
    this.clear = clear$3(prompt2, this.out.columns);
  }
};
var multiselect = MultiselectPrompt$1;
var color$2 = kleur;
var Prompt$1 = prompt$1;
var { erase: erase$1, cursor: cursor$2 } = src;
var { style: style$2, clear: clear$2, figures: figures$1, wrap, entriesToDisplay } = util;
var getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);
var getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);
var getIndex = (arr, valOrTitle) => {
  const index = arr.findIndex((el) => el.value === valOrTitle || el.title === valOrTitle);
  return index > -1 ? index : void 0;
};
var AutocompletePrompt = class extends Prompt$1 {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.suggest = opts.suggest;
    this.choices = opts.choices;
    this.initial = typeof opts.initial === "number" ? opts.initial : getIndex(opts.choices, opts.initial);
    this.select = this.initial || opts.cursor || 0;
    this.i18n = { noMatches: opts.noMatches || "no matches found" };
    this.fallback = opts.fallback || this.initial;
    this.clearFirst = opts.clearFirst || false;
    this.suggestions = [];
    this.input = "";
    this.limit = opts.limit || 10;
    this.cursor = 0;
    this.transform = style$2.render(opts.style);
    this.scale = this.transform.scale;
    this.render = this.render.bind(this);
    this.complete = this.complete.bind(this);
    this.clear = clear$2("", this.out.columns);
    this.complete(this.render);
    this.render();
  }
  set fallback(fb) {
    this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
  }
  get fallback() {
    let choice;
    if (typeof this._fb === "number")
      choice = this.choices[this._fb];
    else if (typeof this._fb === "string")
      choice = { title: this._fb };
    return choice || this._fb || { title: this.i18n.noMatches };
  }
  moveSelect(i) {
    this.select = i;
    if (this.suggestions.length > 0)
      this.value = getVal(this.suggestions, i);
    else
      this.value = this.fallback.value;
    this.fire();
  }
  async complete(cb) {
    const p2 = this.completing = this.suggest(this.input, this.choices);
    const suggestions = await p2;
    if (this.completing !== p2)
      return;
    this.suggestions = suggestions.map((s, i, arr) => ({ title: getTitle(arr, i), value: getVal(arr, i), description: s.description }));
    this.completing = false;
    const l = Math.max(suggestions.length - 1, 0);
    this.moveSelect(Math.min(l, this.select));
    cb && cb();
  }
  reset() {
    this.input = "";
    this.complete(() => {
      this.moveSelect(this.initial !== void 0 ? this.initial : 0);
      this.render();
    });
    this.render();
  }
  exit() {
    if (this.clearFirst && this.input.length > 0) {
      this.reset();
    } else {
      this.done = this.exited = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write("\n");
      this.close();
    }
  }
  abort() {
    this.done = this.aborted = true;
    this.exited = false;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  submit() {
    this.done = true;
    this.aborted = this.exited = false;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  _(c3, key) {
    let s1 = this.input.slice(0, this.cursor);
    let s2 = this.input.slice(this.cursor);
    this.input = `${s1}${c3}${s2}`;
    this.cursor = s1.length + 1;
    this.complete(this.render);
    this.render();
  }
  delete() {
    if (this.cursor === 0)
      return this.bell();
    let s1 = this.input.slice(0, this.cursor - 1);
    let s2 = this.input.slice(this.cursor);
    this.input = `${s1}${s2}`;
    this.complete(this.render);
    this.cursor = this.cursor - 1;
    this.render();
  }
  deleteForward() {
    if (this.cursor * this.scale >= this.rendered.length)
      return this.bell();
    let s1 = this.input.slice(0, this.cursor);
    let s2 = this.input.slice(this.cursor + 1);
    this.input = `${s1}${s2}`;
    this.complete(this.render);
    this.render();
  }
  first() {
    this.moveSelect(0);
    this.render();
  }
  last() {
    this.moveSelect(this.suggestions.length - 1);
    this.render();
  }
  up() {
    if (this.select === 0) {
      this.moveSelect(this.suggestions.length - 1);
    } else {
      this.moveSelect(this.select - 1);
    }
    this.render();
  }
  down() {
    if (this.select === this.suggestions.length - 1) {
      this.moveSelect(0);
    } else {
      this.moveSelect(this.select + 1);
    }
    this.render();
  }
  next() {
    if (this.select === this.suggestions.length - 1) {
      this.moveSelect(0);
    } else
      this.moveSelect(this.select + 1);
    this.render();
  }
  nextPage() {
    this.moveSelect(Math.min(this.select + this.limit, this.suggestions.length - 1));
    this.render();
  }
  prevPage() {
    this.moveSelect(Math.max(this.select - this.limit, 0));
    this.render();
  }
  left() {
    if (this.cursor <= 0)
      return this.bell();
    this.cursor = this.cursor - 1;
    this.render();
  }
  right() {
    if (this.cursor * this.scale >= this.rendered.length)
      return this.bell();
    this.cursor = this.cursor + 1;
    this.render();
  }
  renderOption(v2, hovered, isStart, isEnd) {
    let desc;
    let prefix = isStart ? figures$1.arrowUp : isEnd ? figures$1.arrowDown : " ";
    let title = hovered ? color$2.cyan().underline(v2.title) : v2.title;
    prefix = (hovered ? color$2.cyan(figures$1.pointer) + " " : "  ") + prefix;
    if (v2.description) {
      desc = ` - ${v2.description}`;
      if (prefix.length + title.length + desc.length >= this.out.columns || v2.description.split(/\r?\n/).length > 1) {
        desc = "\n" + wrap(v2.description, { margin: 3, width: this.out.columns });
      }
    }
    return prefix + " " + title + color$2.gray(desc || "");
  }
  render() {
    if (this.closed)
      return;
    if (this.firstRender)
      this.out.write(cursor$2.hide);
    else
      this.out.write(clear$2(this.outputText, this.out.columns));
    super.render();
    let { startIndex, endIndex } = entriesToDisplay(this.select, this.choices.length, this.limit);
    this.outputText = [
      style$2.symbol(this.done, this.aborted, this.exited),
      color$2.bold(this.msg),
      style$2.delimiter(this.completing),
      this.done && this.suggestions[this.select] ? this.suggestions[this.select].title : this.rendered = this.transform.render(this.input)
    ].join(" ");
    if (!this.done) {
      const suggestions = this.suggestions.slice(startIndex, endIndex).map((item2, i) => this.renderOption(
        item2,
        this.select === i + startIndex,
        i === 0 && startIndex > 0,
        i + startIndex === endIndex - 1 && endIndex < this.choices.length
      )).join("\n");
      this.outputText += `
` + (suggestions || color$2.gray(this.fallback.title));
    }
    this.out.write(erase$1.line + cursor$2.to(0) + this.outputText);
  }
};
var autocomplete = AutocompletePrompt;
var color$1 = kleur;
var { cursor: cursor$1 } = src;
var MultiselectPrompt2 = multiselect;
var { clear: clear$1, style: style$1, figures } = util;
var AutocompleteMultiselectPrompt = class extends MultiselectPrompt2 {
  constructor(opts = {}) {
    opts.overrideRender = true;
    super(opts);
    this.inputValue = "";
    this.clear = clear$1("", this.out.columns);
    this.filteredOptions = this.value;
    this.render();
  }
  last() {
    this.cursor = this.filteredOptions.length - 1;
    this.render();
  }
  next() {
    this.cursor = (this.cursor + 1) % this.filteredOptions.length;
    this.render();
  }
  up() {
    if (this.cursor === 0) {
      this.cursor = this.filteredOptions.length - 1;
    } else {
      this.cursor--;
    }
    this.render();
  }
  down() {
    if (this.cursor === this.filteredOptions.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor++;
    }
    this.render();
  }
  left() {
    this.filteredOptions[this.cursor].selected = false;
    this.render();
  }
  right() {
    if (this.value.filter((e2) => e2.selected).length >= this.maxChoices)
      return this.bell();
    this.filteredOptions[this.cursor].selected = true;
    this.render();
  }
  delete() {
    if (this.inputValue.length) {
      this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
      this.updateFilteredOptions();
    }
  }
  updateFilteredOptions() {
    const currentHighlight = this.filteredOptions[this.cursor];
    this.filteredOptions = this.value.filter((v2) => {
      if (this.inputValue) {
        if (typeof v2.title === "string") {
          if (v2.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
            return true;
          }
        }
        if (typeof v2.value === "string") {
          if (v2.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
            return true;
          }
        }
        return false;
      }
      return true;
    });
    const newHighlightIndex = this.filteredOptions.findIndex((v2) => v2 === currentHighlight);
    this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
    this.render();
  }
  handleSpaceToggle() {
    const v2 = this.filteredOptions[this.cursor];
    if (v2.selected) {
      v2.selected = false;
      this.render();
    } else if (v2.disabled || this.value.filter((e2) => e2.selected).length >= this.maxChoices) {
      return this.bell();
    } else {
      v2.selected = true;
      this.render();
    }
  }
  handleInputChange(c3) {
    this.inputValue = this.inputValue + c3;
    this.updateFilteredOptions();
  }
  _(c3, key) {
    if (c3 === " ") {
      this.handleSpaceToggle();
    } else {
      this.handleInputChange(c3);
    }
  }
  renderInstructions() {
    if (this.instructions === void 0 || this.instructions) {
      if (typeof this.instructions === "string") {
        return this.instructions;
      }
      return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
`;
    }
    return "";
  }
  renderCurrentInput() {
    return `
Filtered results for: ${this.inputValue ? this.inputValue : color$1.gray("Enter something to filter")}
`;
  }
  renderOption(cursor2, v2, i, arrowIndicator) {
    const prefix = (v2.selected ? color$1.green(figures.radioOn) : figures.radioOff) + " " + arrowIndicator + " ";
    let title;
    if (v2.disabled)
      title = cursor2 === i ? color$1.gray().underline(v2.title) : color$1.strikethrough().gray(v2.title);
    else
      title = cursor2 === i ? color$1.cyan().underline(v2.title) : v2.title;
    return prefix + title;
  }
  renderDoneOrInstructions() {
    if (this.done) {
      return this.value.filter((e2) => e2.selected).map((v2) => v2.title).join(", ");
    }
    const output = [color$1.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];
    if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
      output.push(color$1.yellow(this.warn));
    }
    return output.join(" ");
  }
  render() {
    if (this.closed)
      return;
    if (this.firstRender)
      this.out.write(cursor$1.hide);
    super.render();
    let prompt2 = [
      style$1.symbol(this.done, this.aborted),
      color$1.bold(this.msg),
      style$1.delimiter(false),
      this.renderDoneOrInstructions()
    ].join(" ");
    if (this.showMinError) {
      prompt2 += color$1.red(`You must select a minimum of ${this.minSelected} choices.`);
      this.showMinError = false;
    }
    prompt2 += this.renderOptions(this.filteredOptions);
    this.out.write(this.clear + prompt2);
    this.clear = clear$1(prompt2, this.out.columns);
  }
};
var autocompleteMultiselect = AutocompleteMultiselectPrompt;
var color = kleur;
var Prompt2 = prompt$1;
var { style, clear } = util;
var { erase, cursor } = src;
var ConfirmPrompt = class extends Prompt2 {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.value = opts.initial;
    this.initialValue = !!opts.initial;
    this.yesMsg = opts.yes || "yes";
    this.yesOption = opts.yesOption || "(Y/n)";
    this.noMsg = opts.no || "no";
    this.noOption = opts.noOption || "(y/N)";
    this.render();
  }
  reset() {
    this.value = this.initialValue;
    this.fire();
    this.render();
  }
  exit() {
    this.abort();
  }
  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  submit() {
    this.value = this.value || false;
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  _(c3, key) {
    if (c3.toLowerCase() === "y") {
      this.value = true;
      return this.submit();
    }
    if (c3.toLowerCase() === "n") {
      this.value = false;
      return this.submit();
    }
    return this.bell();
  }
  render() {
    if (this.closed)
      return;
    if (this.firstRender)
      this.out.write(cursor.hide);
    else
      this.out.write(clear(this.outputText, this.out.columns));
    super.render();
    this.outputText = [
      style.symbol(this.done, this.aborted),
      color.bold(this.msg),
      style.delimiter(this.done),
      this.done ? this.value ? this.yesMsg : this.noMsg : color.gray(this.initialValue ? this.yesOption : this.noOption)
    ].join(" ");
    this.out.write(erase.line + cursor.to(0) + this.outputText);
  }
};
var confirm = ConfirmPrompt;
var elements = {
  TextPrompt: text,
  SelectPrompt: select,
  TogglePrompt: toggle,
  DatePrompt: date,
  NumberPrompt: number,
  MultiselectPrompt: multiselect,
  AutocompletePrompt: autocomplete,
  AutocompleteMultiselectPrompt: autocompleteMultiselect,
  ConfirmPrompt: confirm
};
(function(exports) {
  const $3 = exports;
  const el = elements;
  const noop2 = (v2) => v2;
  function toPrompt(type, args, opts = {}) {
    return new Promise((res, rej) => {
      const p2 = new el[type](args);
      const onAbort = opts.onAbort || noop2;
      const onSubmit = opts.onSubmit || noop2;
      const onExit2 = opts.onExit || noop2;
      p2.on("state", args.onState || noop2);
      p2.on("submit", (x3) => res(onSubmit(x3)));
      p2.on("exit", (x3) => res(onExit2(x3)));
      p2.on("abort", (x3) => rej(onAbort(x3)));
    });
  }
  $3.text = (args) => toPrompt("TextPrompt", args);
  $3.password = (args) => {
    args.style = "password";
    return $3.text(args);
  };
  $3.invisible = (args) => {
    args.style = "invisible";
    return $3.text(args);
  };
  $3.number = (args) => toPrompt("NumberPrompt", args);
  $3.date = (args) => toPrompt("DatePrompt", args);
  $3.confirm = (args) => toPrompt("ConfirmPrompt", args);
  $3.list = (args) => {
    const sep2 = args.separator || ",";
    return toPrompt("TextPrompt", args, {
      onSubmit: (str) => str.split(sep2).map((s) => s.trim())
    });
  };
  $3.toggle = (args) => toPrompt("TogglePrompt", args);
  $3.select = (args) => toPrompt("SelectPrompt", args);
  $3.multiselect = (args) => {
    args.choices = [].concat(args.choices || []);
    const toSelected = (items) => items.filter((item2) => item2.selected).map((item2) => item2.value);
    return toPrompt("MultiselectPrompt", args, {
      onAbort: toSelected,
      onSubmit: toSelected
    });
  };
  $3.autocompleteMultiselect = (args) => {
    args.choices = [].concat(args.choices || []);
    const toSelected = (items) => items.filter((item2) => item2.selected).map((item2) => item2.value);
    return toPrompt("AutocompleteMultiselectPrompt", args, {
      onAbort: toSelected,
      onSubmit: toSelected
    });
  };
  const byTitle = (input, choices) => Promise.resolve(
    choices.filter((item2) => item2.title.slice(0, input.length).toLowerCase() === input.toLowerCase())
  );
  $3.autocomplete = (args) => {
    args.suggest = args.suggest || byTitle;
    args.choices = [].concat(args.choices || []);
    return toPrompt("AutocompletePrompt", args);
  };
})(prompts$3);
var prompts$2 = prompts$3;
var passOn = ["suggest", "format", "onState", "validate", "onRender", "type"];
var noop = () => {
};
async function prompt(questions = [], { onSubmit = noop, onCancel = noop } = {}) {
  const answers = {};
  const override2 = prompt._override || {};
  questions = [].concat(questions);
  let answer, question, quit, name, type, lastPrompt;
  const getFormattedAnswer = async (question2, answer2, skipValidation = false) => {
    if (!skipValidation && question2.validate && question2.validate(answer2) !== true) {
      return;
    }
    return question2.format ? await question2.format(answer2, answers) : answer2;
  };
  for (question of questions) {
    ({ name, type } = question);
    if (typeof type === "function") {
      type = await type(answer, { ...answers }, question);
      question["type"] = type;
    }
    if (!type)
      continue;
    for (let key in question) {
      if (passOn.includes(key))
        continue;
      let value = question[key];
      question[key] = typeof value === "function" ? await value(answer, { ...answers }, lastPrompt) : value;
    }
    lastPrompt = question;
    if (typeof question.message !== "string") {
      throw new Error("prompt message is required");
    }
    ({ name, type } = question);
    if (prompts$2[type] === void 0) {
      throw new Error(`prompt type (${type}) is not defined`);
    }
    if (override2[question.name] !== void 0) {
      answer = await getFormattedAnswer(question, override2[question.name]);
      if (answer !== void 0) {
        answers[name] = answer;
        continue;
      }
    }
    try {
      answer = prompt._injected ? getInjectedAnswer(prompt._injected, question.initial) : await prompts$2[type](question);
      answers[name] = answer = await getFormattedAnswer(question, answer, true);
      quit = await onSubmit(question, answer, answers);
    } catch (err) {
      quit = !await onCancel(question, answers);
    }
    if (quit)
      return answers;
  }
  return answers;
}
function getInjectedAnswer(injected, deafultValue) {
  const answer = injected.shift();
  if (answer instanceof Error) {
    throw answer;
  }
  return answer === void 0 ? deafultValue : answer;
}
function inject(answers) {
  prompt._injected = (prompt._injected || []).concat(answers);
}
function override(answers) {
  prompt._override = Object.assign({}, answers);
}
var lib$1 = Object.assign(prompt, { prompt, prompts: prompts$2, inject, override });
var prompts = lib$1;
var prompts$1 = /* @__PURE__ */ getDefaultExportFromCjs(prompts);
var isexe = isexe_1;
var { join, delimiter, sep, posix } = import_path.default;
var isWindows = process.platform === "win32";
var rSlash = new RegExp(`[${posix.sep}${sep === posix.sep ? "" : sep}]`.replace(/(\\)/g, "\\$1"));
var rRel = new RegExp(`^\\.${rSlash.source}`);
var getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
var getPathInfo = (cmd, {
  path: optPath = process.env.PATH,
  pathExt: optPathExt = process.env.PATHEXT,
  delimiter: optDelimiter = delimiter
}) => {
  const pathEnv = cmd.match(rSlash) ? [""] : [
    ...isWindows ? [process.cwd()] : [],
    ...(optPath || "").split(optDelimiter)
  ];
  if (isWindows) {
    const pathExtExe = optPathExt || [".EXE", ".CMD", ".BAT", ".COM"].join(optDelimiter);
    const pathExt = pathExtExe.split(optDelimiter).reduce((acc, item2) => {
      acc.push(item2);
      acc.push(item2.toLowerCase());
      return acc;
    }, []);
    if (cmd.includes(".") && pathExt[0] !== "") {
      pathExt.unshift("");
    }
    return { pathEnv, pathExt, pathExtExe };
  }
  return { pathEnv, pathExt: [""] };
};
var getPathPart = (raw, cmd) => {
  const pathPart = /^".*"$/.test(raw) ? raw.slice(1, -1) : raw;
  const prefix = !pathPart && rRel.test(cmd) ? cmd.slice(0, 2) : "";
  return prefix + join(pathPart, cmd);
};
var which = async (cmd, opt = {}) => {
  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];
  for (const envPart of pathEnv) {
    const p2 = getPathPart(envPart, cmd);
    for (const ext of pathExt) {
      const withExt = p2 + ext;
      const is = await isexe(withExt, { pathExt: pathExtExe, ignoreErrors: true });
      if (is) {
        if (!opt.all) {
          return withExt;
        }
        found.push(withExt);
      }
    }
  }
  if (opt.all && found.length) {
    return found;
  }
  if (opt.nothrow) {
    return null;
  }
  throw getNotFoundError(cmd);
};
var whichSync = (cmd, opt = {}) => {
  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];
  for (const pathEnvPart of pathEnv) {
    const p2 = getPathPart(pathEnvPart, cmd);
    for (const ext of pathExt) {
      const withExt = p2 + ext;
      const is = isexe.sync(withExt, { pathExt: pathExtExe, ignoreErrors: true });
      if (is) {
        if (!opt.all) {
          return withExt;
        }
        found.push(withExt);
      }
    }
  }
  if (opt.all && found.length) {
    return found;
  }
  if (opt.nothrow) {
    return null;
  }
  throw getNotFoundError(cmd);
};
var lib = which;
which.sync = whichSync;
var which$1 = /* @__PURE__ */ getDefaultExportFromCjs(lib);
var CLI_TEMP_DIR = (0, import_node_path.join)(import_node_os2.default.tmpdir(), "antfu-ni");
function cmdExists(cmd) {
  return which$1.sync(cmd, { nothrow: true }) !== null;
}
async function detect({ autoInstall, programmatic, cwd } = {}) {
  let agent = null;
  let version = null;
  const lockPath = await findUp(Object.keys(LOCKS), { cwd });
  let packageJsonPath;
  if (lockPath)
    packageJsonPath = import_node_path.default.resolve(lockPath, "../package.json");
  else
    packageJsonPath = await findUp("package.json", { cwd });
  if (packageJsonPath && import_node_fs.default.existsSync(packageJsonPath)) {
    try {
      const pkg = JSON.parse(import_node_fs.default.readFileSync(packageJsonPath, "utf8"));
      if (typeof pkg.packageManager === "string") {
        const [name, ver] = pkg.packageManager.split("@");
        version = ver;
        if (name === "yarn" && Number.parseInt(ver) > 1)
          agent = "yarn@berry";
        else if (name === "pnpm" && Number.parseInt(ver) < 7)
          agent = "pnpm@6";
        else if (name in AGENTS)
          agent = name;
        else if (!programmatic)
          console.warn("[ni] Unknown packageManager:", pkg.packageManager);
      }
    } catch {
    }
  }
  if (!agent && lockPath)
    agent = LOCKS[import_node_path.default.basename(lockPath)];
  if (agent && !cmdExists(agent.split("@")[0]) && !programmatic) {
    if (!autoInstall) {
      console.warn(`[ni] Detected ${agent} but it doesn't seem to be installed.
`);
      if (import_node_process4.default.env.CI)
        import_node_process4.default.exit(1);
      const link = terminalLink(agent, INSTALL_PAGE[agent]);
      const { tryInstall } = await prompts$1({
        name: "tryInstall",
        type: "confirm",
        message: `Would you like to globally install ${link}?`
      });
      if (!tryInstall)
        import_node_process4.default.exit(1);
    }
    await execaCommand(`npm i -g ${agent}${version ? `@${version}` : ""}`, { stdio: "inherit", cwd });
  }
  return agent;
}
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
  isTTY = process.stdout && process.stdout.isTTY;
}
var $2 = {
  enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY),
  reset: init(0, 0),
  bold: init(1, 22),
  dim: init(2, 22),
  italic: init(3, 23),
  underline: init(4, 24),
  inverse: init(7, 27),
  hidden: init(8, 28),
  strikethrough: init(9, 29),
  black: init(30, 39),
  red: init(31, 39),
  green: init(32, 39),
  yellow: init(33, 39),
  blue: init(34, 39),
  magenta: init(35, 39),
  cyan: init(36, 39),
  white: init(37, 39),
  gray: init(90, 39),
  grey: init(90, 39),
  bgBlack: init(40, 49),
  bgRed: init(41, 49),
  bgGreen: init(42, 49),
  bgYellow: init(43, 49),
  bgBlue: init(44, 49),
  bgMagenta: init(45, 49),
  bgCyan: init(46, 49),
  bgWhite: init(47, 49)
};
function run$1(arr, str) {
  let i = 0, tmp, beg = "", end = "";
  for (; i < arr.length; i++) {
    tmp = arr[i];
    beg += tmp.open;
    end += tmp.close;
    if (!!~str.indexOf(tmp.close)) {
      str = str.replace(tmp.rgx, tmp.close + tmp.open);
    }
  }
  return beg + str + end;
}
function chain(has, keys) {
  let ctx = { has, keys };
  ctx.reset = $2.reset.bind(ctx);
  ctx.bold = $2.bold.bind(ctx);
  ctx.dim = $2.dim.bind(ctx);
  ctx.italic = $2.italic.bind(ctx);
  ctx.underline = $2.underline.bind(ctx);
  ctx.inverse = $2.inverse.bind(ctx);
  ctx.hidden = $2.hidden.bind(ctx);
  ctx.strikethrough = $2.strikethrough.bind(ctx);
  ctx.black = $2.black.bind(ctx);
  ctx.red = $2.red.bind(ctx);
  ctx.green = $2.green.bind(ctx);
  ctx.yellow = $2.yellow.bind(ctx);
  ctx.blue = $2.blue.bind(ctx);
  ctx.magenta = $2.magenta.bind(ctx);
  ctx.cyan = $2.cyan.bind(ctx);
  ctx.white = $2.white.bind(ctx);
  ctx.gray = $2.gray.bind(ctx);
  ctx.grey = $2.grey.bind(ctx);
  ctx.bgBlack = $2.bgBlack.bind(ctx);
  ctx.bgRed = $2.bgRed.bind(ctx);
  ctx.bgGreen = $2.bgGreen.bind(ctx);
  ctx.bgYellow = $2.bgYellow.bind(ctx);
  ctx.bgBlue = $2.bgBlue.bind(ctx);
  ctx.bgMagenta = $2.bgMagenta.bind(ctx);
  ctx.bgCyan = $2.bgCyan.bind(ctx);
  ctx.bgWhite = $2.bgWhite.bind(ctx);
  return ctx;
}
function init(open, close) {
  let blk = {
    open: `\x1B[${open}m`,
    close: `\x1B[${close}m`,
    rgx: new RegExp(`\\x1b\\[${close}m`, "g")
  };
  return function(txt) {
    if (this !== void 0 && this.has !== void 0) {
      !!~this.has.indexOf(open) || (this.has.push(open), this.keys.push(blk));
      return txt === void 0 ? this : $2.enabled ? run$1(this.keys, txt + "") : txt + "";
    }
    return txt === void 0 ? chain([open], [blk]) : $2.enabled ? run$1([blk], txt + "") : txt + "";
  };
}

// src/utils/utils.ts
var fs2 = __toESM(require("fs"));

// ../../node_modules/.pnpm/diff@5.1.0/node_modules/diff/lib/index.mjs
function Diff() {
}
Diff.prototype = {
  diff: function diff(oldString, newString) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var callback = options.callback;
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    this.options = options;
    var self2 = this;
    function done(value) {
      if (callback) {
        setTimeout(function() {
          callback(void 0, value);
        }, 0);
        return true;
      } else {
        return value;
      }
    }
    oldString = this.castInput(oldString);
    newString = this.castInput(newString);
    oldString = this.removeEmpty(this.tokenize(oldString));
    newString = this.removeEmpty(this.tokenize(newString));
    var newLen = newString.length, oldLen = oldString.length;
    var editLength = 1;
    var maxEditLength = newLen + oldLen;
    if (options.maxEditLength) {
      maxEditLength = Math.min(maxEditLength, options.maxEditLength);
    }
    var bestPath = [{
      newPos: -1,
      components: []
    }];
    var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
    if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
      return done([{
        value: this.join(newString),
        count: newString.length
      }]);
    }
    function execEditLength() {
      for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
        var basePath = void 0;
        var addPath = bestPath[diagonalPath - 1], removePath = bestPath[diagonalPath + 1], _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
        if (addPath) {
          bestPath[diagonalPath - 1] = void 0;
        }
        var canAdd = addPath && addPath.newPos + 1 < newLen, canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;
        if (!canAdd && !canRemove) {
          bestPath[diagonalPath] = void 0;
          continue;
        }
        if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
          basePath = clonePath(removePath);
          self2.pushComponent(basePath.components, void 0, true);
        } else {
          basePath = addPath;
          basePath.newPos++;
          self2.pushComponent(basePath.components, true, void 0);
        }
        _oldPos = self2.extractCommon(basePath, newString, oldString, diagonalPath);
        if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
          return done(buildValues(self2, basePath.components, newString, oldString, self2.useLongestToken));
        } else {
          bestPath[diagonalPath] = basePath;
        }
      }
      editLength++;
    }
    if (callback) {
      (function exec2() {
        setTimeout(function() {
          if (editLength > maxEditLength) {
            return callback();
          }
          if (!execEditLength()) {
            exec2();
          }
        }, 0);
      })();
    } else {
      while (editLength <= maxEditLength) {
        var ret = execEditLength();
        if (ret) {
          return ret;
        }
      }
    }
  },
  pushComponent: function pushComponent(components, added, removed) {
    var last = components[components.length - 1];
    if (last && last.added === added && last.removed === removed) {
      components[components.length - 1] = {
        count: last.count + 1,
        added,
        removed
      };
    } else {
      components.push({
        count: 1,
        added,
        removed
      });
    }
  },
  extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
    var newLen = newString.length, oldLen = oldString.length, newPos = basePath.newPos, oldPos = newPos - diagonalPath, commonCount = 0;
    while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
      newPos++;
      oldPos++;
      commonCount++;
    }
    if (commonCount) {
      basePath.components.push({
        count: commonCount
      });
    }
    basePath.newPos = newPos;
    return oldPos;
  },
  equals: function equals(left, right) {
    if (this.options.comparator) {
      return this.options.comparator(left, right);
    } else {
      return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
    }
  },
  removeEmpty: function removeEmpty(array) {
    var ret = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i]) {
        ret.push(array[i]);
      }
    }
    return ret;
  },
  castInput: function castInput(value) {
    return value;
  },
  tokenize: function tokenize(value) {
    return value.split("");
  },
  join: function join2(chars) {
    return chars.join("");
  }
};
function buildValues(diff2, components, newString, oldString, useLongestToken) {
  var componentPos = 0, componentLen = components.length, newPos = 0, oldPos = 0;
  for (; componentPos < componentLen; componentPos++) {
    var component = components[componentPos];
    if (!component.removed) {
      if (!component.added && useLongestToken) {
        var value = newString.slice(newPos, newPos + component.count);
        value = value.map(function(value2, i) {
          var oldValue = oldString[oldPos + i];
          return oldValue.length > value2.length ? oldValue : value2;
        });
        component.value = diff2.join(value);
      } else {
        component.value = diff2.join(newString.slice(newPos, newPos + component.count));
      }
      newPos += component.count;
      if (!component.added) {
        oldPos += component.count;
      }
    } else {
      component.value = diff2.join(oldString.slice(oldPos, oldPos + component.count));
      oldPos += component.count;
      if (componentPos && components[componentPos - 1].added) {
        var tmp = components[componentPos - 1];
        components[componentPos - 1] = components[componentPos];
        components[componentPos] = tmp;
      }
    }
  }
  var lastComponent = components[componentLen - 1];
  if (componentLen > 1 && typeof lastComponent.value === "string" && (lastComponent.added || lastComponent.removed) && diff2.equals("", lastComponent.value)) {
    components[componentLen - 2].value += lastComponent.value;
    components.pop();
  }
  return components;
}
function clonePath(path6) {
  return {
    newPos: path6.newPos,
    components: path6.components.slice(0)
  };
}
var characterDiff = new Diff();
function generateOptions(options, defaults) {
  if (typeof options === "function") {
    defaults.callback = options;
  } else if (options) {
    for (var name in options) {
      if (options.hasOwnProperty(name)) {
        defaults[name] = options[name];
      }
    }
  }
  return defaults;
}
var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
var reWhitespace = /\S/;
var wordDiff = new Diff();
wordDiff.equals = function(left, right) {
  if (this.options.ignoreCase) {
    left = left.toLowerCase();
    right = right.toLowerCase();
  }
  return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
};
wordDiff.tokenize = function(value) {
  var tokens = value.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/);
  for (var i = 0; i < tokens.length - 1; i++) {
    if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
      tokens[i] += tokens[i + 2];
      tokens.splice(i + 1, 2);
      i--;
    }
  }
  return tokens;
};
function diffWords(oldStr, newStr, options) {
  options = generateOptions(options, {
    ignoreWhitespace: true
  });
  return wordDiff.diff(oldStr, newStr, options);
}
var lineDiff = new Diff();
lineDiff.tokenize = function(value) {
  var retLines = [], linesAndNewlines = value.split(/(\n|\r\n)/);
  if (!linesAndNewlines[linesAndNewlines.length - 1]) {
    linesAndNewlines.pop();
  }
  for (var i = 0; i < linesAndNewlines.length; i++) {
    var line = linesAndNewlines[i];
    if (i % 2 && !this.options.newlineIsToken) {
      retLines[retLines.length - 1] += line;
    } else {
      if (this.options.ignoreWhitespace) {
        line = line.trim();
      }
      retLines.push(line);
    }
  }
  return retLines;
};
var sentenceDiff = new Diff();
sentenceDiff.tokenize = function(value) {
  return value.split(/(\S.+?[.!?])(?=\s+|$)/);
};
var cssDiff = new Diff();
cssDiff.tokenize = function(value) {
  return value.split(/([{}:;,]|\s+)/);
};
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
var objectPrototypeToString = Object.prototype.toString;
var jsonDiff = new Diff();
jsonDiff.useLongestToken = true;
jsonDiff.tokenize = lineDiff.tokenize;
jsonDiff.castInput = function(value) {
  var _this$options = this.options, undefinedReplacement = _this$options.undefinedReplacement, _this$options$stringi = _this$options.stringifyReplacer, stringifyReplacer = _this$options$stringi === void 0 ? function(k2, v2) {
    return typeof v2 === "undefined" ? undefinedReplacement : v2;
  } : _this$options$stringi;
  return typeof value === "string" ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, "  ");
};
jsonDiff.equals = function(left, right) {
  return Diff.prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, "$1"), right.replace(/,([\r\n])/g, "$1"));
};
function canonicalize(obj, stack, replacementStack, replacer, key) {
  stack = stack || [];
  replacementStack = replacementStack || [];
  if (replacer) {
    obj = replacer(key, obj);
  }
  var i;
  for (i = 0; i < stack.length; i += 1) {
    if (stack[i] === obj) {
      return replacementStack[i];
    }
  }
  var canonicalizedObj;
  if ("[object Array]" === objectPrototypeToString.call(obj)) {
    stack.push(obj);
    canonicalizedObj = new Array(obj.length);
    replacementStack.push(canonicalizedObj);
    for (i = 0; i < obj.length; i += 1) {
      canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);
    }
    stack.pop();
    replacementStack.pop();
    return canonicalizedObj;
  }
  if (obj && obj.toJSON) {
    obj = obj.toJSON();
  }
  if (_typeof(obj) === "object" && obj !== null) {
    stack.push(obj);
    canonicalizedObj = {};
    replacementStack.push(canonicalizedObj);
    var sortedKeys = [], _key;
    for (_key in obj) {
      if (obj.hasOwnProperty(_key)) {
        sortedKeys.push(_key);
      }
    }
    sortedKeys.sort();
    for (i = 0; i < sortedKeys.length; i += 1) {
      _key = sortedKeys[i];
      canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);
    }
    stack.pop();
    replacementStack.pop();
  } else {
    canonicalizedObj = obj;
  }
  return canonicalizedObj;
}
var arrayDiff = new Diff();
arrayDiff.tokenize = function(value) {
  return value.slice();
};
arrayDiff.join = arrayDiff.removeEmpty = function(value) {
  return value;
};

// src/utils/utils.ts
function abortIfCancelled(input) {
  return __async(this, null, function* () {
    if (eD(yield input)) {
      ue("Million setup cancelled.");
      process.exit(0);
    } else {
      return input;
    }
  });
}
function abort(message, status) {
  $e(
    message != null ? message : `${source_default.red("Setup failed.")}
Report a bug at ${source_default.cyan(
      "https://github.com/aidenybai/million/issues"
    )}`
  );
  return process.exit(status != null ? status : 1);
}
function getNextRouter() {
  return __async(this, null, function* () {
    if (fs2.existsSync("src/app") || fs2.existsSync("app")) {
      return "app";
    } else if (fs2.existsSync("src/pages") || fs2.existsSync("pages")) {
      return "pages";
    }
    const selectedRouter = yield abortIfCancelled(
      ie({
        message: "Will you use app Router or pages Router?",
        options: [
          {
            label: "App Router",
            value: "app"
          },
          {
            label: "Pages Router",
            value: "pages"
          }
        ]
      })
    );
    return selectedRouter;
  });
}
function highlightCodeDifferences(oldCode, newCode, detectedBuildTool, CONTEXT_SIZE = 1) {
  const differences = diffWords(oldCode, newCode);
  let highlightedCode = "";
  differences.forEach((part, index) => {
    var _a, _b, _c, _d;
    const isContextEnd = index > 0 && (((_a = differences[index - 1]) == null ? void 0 : _a.added) || ((_b = differences[index - 1]) == null ? void 0 : _b.removed));
    const isContextStart = index < differences.length - 1 && (((_c = differences[index + 1]) == null ? void 0 : _c.added) || ((_d = differences[index + 1]) == null ? void 0 : _d.removed));
    let res = "";
    if (part.added) {
      res = source_default.bold.green(part.value);
    } else if (part.removed) {
      res = source_default.red(part.value);
    } else if (isContextEnd && isContextStart) {
      const split = part.value.split("\n");
      if (split.length - 1 > 2 * CONTEXT_SIZE) {
        res = [
          split.slice(0, CONTEXT_SIZE).join("\n"),
          "...",
          split.slice(-CONTEXT_SIZE - 1).join("\n")
        ].join("\n");
      } else {
        res = source_default.dim(part.value);
      }
    } else if (isContextEnd) {
      res = part.value.split("\n").slice(0, CONTEXT_SIZE + 1).join("\n");
    } else if (isContextStart) {
      res = part.value.split("\n").slice(-CONTEXT_SIZE - 1).join("\n");
    }
    highlightedCode += res;
  });
  le(
    `${highlightedCode}`,
    `Take a look at changes in ${source_default.cyan(detectedBuildTool.configFilePath)}`
  );
}

// src/utils/constants.ts
var yarn2 = {
  name: "yarn",
  label: "Yarn",
  lockFile: "yarn.lock",
  installCommand: "yarn add"
};
var pnpm2 = {
  name: "pnpm",
  label: "pnpm",
  lockFile: "pnpm-lock.yaml",
  installCommand: "pnpm install"
};
var npm = {
  name: "npm",
  label: "npm",
  lockFile: "package-lock.json",
  installCommand: "npm install"
};
var bun2 = {
  name: "bun",
  label: "bun",
  lockFile: "bun.lockb",
  installCommand: "bun add"
};
var packageManagers = [pnpm2, yarn2, bun2, npm];
var next = {
  name: "next",
  label: "Next.js",
  bundler: "next",
  configFilePath: "next.config.mjs",
  possibleFileNames: ["next.config.js", "next.config.mjs"],
  configFileContent: `import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const millionConfig = {
  auto: true,
};

export default million.next(nextConfig, millionConfig);`,
  configFileContentRSC: `import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const millionConfig = {
  auto: { rsc: true },
};

export default million.next(nextConfig, millionConfig);
`
};
var astro = {
  name: "astro",
  label: "Astro",
  bundler: "vite",
  configFilePath: "astro.config.mjs",
  possibleFileNames: ["astro.config.js", "astro.config.mjs", "astro.config.ts"],
  configFileContent: `import { defineConfig } from 'astro/config';
import million from 'million/compiler';

export default defineConfig({
  vite: {
    plugins: [million.vite({ mode: 'react', server: true, auto: true })]
  }
});`
};
var gatsby = {
  name: "gatsby",
  label: "Gatsby",
  bundler: "webpack",
  configFilePath: "gatsby-node.js",
  possibleFileNames: ["gatsby-node.js"],
  configFileContent: `const million = require('million/compiler');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [million.webpack({ mode: 'react', server: true, auto: true })],
  })
};`
};
var vite = {
  name: "vite",
  label: "Vite",
  bundler: "vite",
  configFilePath: "vite.config.js",
  possibleFileNames: [
    "vite.config.js",
    "vite.config.mjs",
    "vite.config.ts",
    "vite.config.cjs"
  ],
  configFileContent: `import million from 'million/compiler';
import react from "@vitejs/plugin-react";
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [million.vite({ auto: true }), react()],
});`
};
var craco = {
  name: "craco",
  label: "Create React App",
  bundler: "webpack",
  configFilePath: "craco.config.js",
  possibleFileNames: [
    "craco.config.js",
    "craco.config.mjs",
    "craco.config.ts",
    "craco.config.cjs"
  ],
  configFileContent: `const million = require('million/compiler');
module.exports = {
  webpack: {
    plugins: { add: [million.webpack({ auto: true })] }
  }
};`
};
var webpack = {
  name: "webpack",
  label: "Webpack",
  bundler: "webpack",
  configFilePath: "webpack.config.js",
  possibleFileNames: ["webpack.config.js"],
  configFileContent: `const million = require('million/compiler');
module.exports = {
  plugins: [
    million.webpack({ auto: true }),
  ],
};`
};
var rollup = {
  name: "rollup",
  label: "Rollup",
  bundler: "rollup",
  configFilePath: "rollup.config.js",
  possibleFileNames: [
    "rollup.config.js",
    "rollup.config.mjs",
    "rollup.config.ts",
    "rollup.config.cjs"
  ],
  configFileContent: `import million from 'million/compiler';

export default {
  plugins: [million.rollup({ auto: true })],
};`
};
var buildTools = [
  next,
  astro,
  gatsby,
  vite,
  craco,
  webpack,
  rollup
];

// src/utils/package-manager.ts
function detectPackageManger() {
  return __async(this, null, function* () {
    const packageManager = yield detect({
      programmatic: true,
      cwd: path2.join(process.cwd())
    });
    switch (packageManager) {
      case "yarn":
        return yarn2;
      case "pnpm":
        return pnpm2;
      case "npm":
        return npm;
      case "bun":
        return bun2;
      default:
        return null;
    }
  });
}
function installPackageWithPackageManager(packageManager, packageName) {
  (0, import_child_process2.exec)(`${packageManager.installCommand} ${packageName}@latest`);
}
function getPackageManager() {
  return __async(this, null, function* () {
    const s = de();
    s.start("Detecting package manager.");
    const detectedPackageManager = yield detectPackageManger();
    yield (0, import_promises.setTimeout)(1e3);
    s.stop(
      `${source_default.bold(
        (detectedPackageManager == null ? void 0 : detectedPackageManager.label) || "No package manager"
      )} detected.`
    );
    if (detectedPackageManager) {
      return detectedPackageManager;
    }
    const selectedPackageManager = yield abortIfCancelled(
      ie({
        message: "Please select your package manager.",
        options: packageManagers.map((packageManager) => ({
          value: packageManager,
          label: packageManager.label,
          hint: `Be sure you have ${source_default.bold(
            packageManager.label
          )} installed.`
        }))
      })
    );
    return selectedPackageManager;
  });
}
function installPackage(_0) {
  return __async(this, arguments, function* ({
    packageName,
    alreadyInstalled,
    askBeforeUpdating = true
  }) {
    if (alreadyInstalled && askBeforeUpdating) {
      const shouldUpdatePackage = yield abortIfCancelled(
        se({
          message: `The ${source_default.bold.cyan(
            packageName
          )} package is already installed. Do you want to update it to the latest version?`
        })
      );
      if (!shouldUpdatePackage) {
        return;
      }
    }
    const packageManager = yield getPackageManager();
    const s = de();
    s.start(
      `${alreadyInstalled ? "Updating" : "Installing"} ${source_default.bold.cyan(
        packageName
      )} with ${source_default.bold(packageManager.label)}.`
    );
    try {
      installPackageWithPackageManager(packageManager, packageName);
      yield (0, import_promises.setTimeout)(1e3);
      s.stop(
        `${alreadyInstalled ? "Updated" : "Installed"} ${source_default.bold.cyan(
          packageName
        )} with ${source_default.bold(packageManager.label)}.`
      );
    } catch (e2) {
      f2.error(
        `${source_default.red("Error during installation.")}

${source_default.dim(
          "Please try again or refer docs to install manually: https://million.dev/docs/install"
        )}`
      );
      s.stop("Installation failed.");
      return abort();
    }
  });
}

// src/utils/config.ts
var fs4 = __toESM(require("fs"));
var path4 = __toESM(require("path"));

// telemetry.ts
var import_node = __toESM(require_cjs4());
var import_integrations = __toESM(require_cjs5());
function withTelemetry(options, callback) {
  return __async(this, null, function* () {
    const { sentryHub, sentryClient } = createSentryInstance(
      options.enabled,
      options.integration
    );
    (0, import_node.makeMain)(sentryHub);
    const sentrySession = sentryHub.startSession();
    sentryHub.captureSession();
    try {
      return yield (0, import_node.startSpan)(
        {
          name: options.name,
          status: "ok",
          op: `${options.name}.flow`
        },
        () => __async(this, null, function* () {
          return (0, import_node.runWithAsyncContext)(callback);
        })
      );
    } catch (e2) {
      sentryHub.captureException("Error during execution.");
      sentrySession.status = "crashed";
      throw e2;
    } finally {
      sentryHub.endSession();
      yield sentryClient.flush(3e3);
    }
  });
}
function createSentryInstance(enabled, integration) {
  const client = new import_node.NodeClient({
    dsn: "https://de9a702cad37fec31ace27d9f3976818@o4505682763382784.ingest.sentry.io/4505886741954560",
    enabled,
    environment: `production-${integration}`,
    tracesSampleRate: 1,
    sampleRate: 1,
    integrations: [new import_node.Integrations.Http(), new import_integrations.CaptureConsole()],
    stackParser: import_node.defaultStackParser,
    beforeSendTransaction: (event) => {
      delete event.server_name;
      return event;
    },
    beforeSend: (event) => {
      var _a, _b;
      (_b = (_a = event.exception) == null ? void 0 : _a.values) == null ? void 0 : _b.forEach((exception) => {
        delete exception.stacktrace;
      });
      delete event.server_name;
      return event;
    },
    transport: import_node.makeNodeTransport,
    debug: true
  });
  const hub = new import_node.Hub(client);
  hub.setTag("integration", integration);
  hub.setTag("node", process.version);
  hub.setTag("platform", process.platform);
  return { sentryHub: hub, sentryClient: client };
}

// src/utils/modify-config.ts
var fs3 = __toESM(require("fs"));
var path3 = __toESM(require("path"));
function modifyConfigFile(detectedBuildTool) {
  return __async(this, null, function* () {
    try {
      const auto = yield abortIfCancelled(
        se({
          message: "Do you want to enable automatic mode?",
          initialValue: true
        })
      );
      let configFileContent = yield getExistingConfigContent(detectedBuildTool);
      const oldCode = configFileContent;
      const filePath = path3.join(process.cwd(), detectedBuildTool.configFilePath);
      configFileContent.includes("million") || configFileContent.includes("million/compiler") ? abort(
        `${source_default.red(
          `Million.js is already configured in ${detectedBuildTool.configFilePath}.`
        )}
 Please refer docs: https://million.dev/docs/install#use-the-compiler if facing any errors.`
      ) : "";
      const detectedModuleType = detectModuleType(configFileContent);
      if (detectedModuleType === "cjs") {
        const importStatement = `const million = require('million/compiler');
`;
        configFileContent = importStatement + configFileContent;
        const regex2 = new RegExp("module\\.exports\\s*=\\s*(?<exportContent>[^;]+)");
        const match = regex2.exec(configFileContent);
        if (match) {
          const oldExportExpression = match[1];
          const newExportExpression = yield wrapExportCode(
            detectedBuildTool,
            oldExportExpression,
            auto
          );
          const newCode = configFileContent.replace(
            regex2,
            `module.exports = ${newExportExpression}`
          );
          yield fs3.promises.writeFile(filePath, newCode, {
            encoding: "utf-8",
            flag: "w"
          });
          highlightCodeDifferences(oldCode, newCode, detectedBuildTool);
        }
      } else if (detectedModuleType === "esm") {
        const importStatement = `import million from 'million/compiler';
`;
        configFileContent = importStatement + configFileContent;
        const regex2 = new RegExp("export\\s+default\\s+(?<exportContent>[^;]+)");
        const match = regex2.exec(configFileContent);
        if (match) {
          const oldExportExpression = match[1];
          const newExportExpression = yield wrapExportCode(
            detectedBuildTool,
            oldExportExpression
          );
          const newCode = configFileContent.replace(
            regex2,
            `export default ${newExportExpression}`
          );
          yield fs3.promises.writeFile(filePath, newCode, {
            encoding: "utf-8",
            flag: "w"
          });
          highlightCodeDifferences(oldCode, newCode, detectedBuildTool);
        }
      } else {
        return abort(
          `${source_default.yellow(
            `Could not detect module type for ${detectedBuildTool.configFilePath}.`
          )}
Please refer docs to setup manually:${source_default.cyan(
            "https://million.dev/docs/install#use-the-compiler"
          )} `
        );
      }
      const confirmation = yield abortIfCancelled(
        se({
          message: "Does the config file look good?",
          initialValue: true
        })
      );
      if (!confirmation) {
        yield fs3.promises.writeFile(filePath, oldCode, {
          encoding: "utf-8",
          flag: "w"
        });
        return abort(
          `Reverted the changes. 
Please refer docs for manual setup: ${source_default.cyan(
            `https://million.dev/docs/install#use-the-compiler`
          )}`
        );
      }
    } catch (e2) {
      return abort();
    }
  });
}
function getExistingConfigContent(detectedBuildTool) {
  return __async(this, null, function* () {
    const configFilePath = path3.join(
      process.cwd(),
      detectedBuildTool.configFilePath
    );
    const configContent = yield fs3.promises.readFile(configFilePath, {
      encoding: "utf-8"
    });
    return configContent;
  });
}
function detectModuleType(fileContent) {
  if (fileContent.includes("module.exports =")) {
    return "cjs";
  }
  if (fileContent.includes("export default")) {
    return "esm";
  }
  return "unknown";
}
function wrapExportCode(buildtool, oldExportExpression, auto = true) {
  return __async(this, null, function* () {
    let [firstPart, ...rest] = [];
    switch (buildtool.name) {
      case "next":
        return handleNextCase(oldExportExpression, auto);
      case "vite":
        [firstPart, ...rest] = oldExportExpression.split("plugins: [");
        return `${firstPart}plugins: [million.vite({ auto: ${String(
          auto
        )} }), ${rest.join("plugins: [")}`;
      case "astro":
        [firstPart, ...rest] = oldExportExpression.split("plugins: [");
        return `${firstPart}plugins: [million.vite({ mode: 'react', server: true, auto: ${String(
          auto
        )} }), ${rest.join("plugins: [")}`;
      case "gatsby":
        [firstPart, ...rest] = oldExportExpression.split("plugins: [");
        return `${firstPart}[plugins: million.webpack({ mode: 'react', server: true, auto: ${String(
          auto
        )} }), ${rest.join("plugins: [")}`;
      case "craco":
        [firstPart, ...rest] = oldExportExpression.split("plugins: [");
        return `${firstPart}plugins: [million.webpack({ auto: ${String(
          auto
        )} }), ${rest.join("plugins: [")}`;
      case "webpack":
        [firstPart, ...rest] = oldExportExpression.split("plugins: [");
        return `${firstPart}plugins: [million.webpack({ auto: ${String(
          auto
        )} }), ${rest.join("plugins: [")}`;
      case "rollup":
        [firstPart, ...rest] = oldExportExpression.split("plugins: [");
        return `${firstPart}plugins: [million.rollup({ auto: ${String(
          auto
        )} }), ${rest.join("plugins: [")}`;
      default:
        return "";
    }
  });
}
function handleNextCase(oldExportExpression, auto = true) {
  return __async(this, null, function* () {
    const nextRouter = yield getNextRouter();
    return `million.next(
  ${oldExportExpression}, { auto: ${auto ? nextRouter === "app" ? "{ rsc: true }" : "true" : "false"} }
)`;
  });
}

// src/utils/config.ts
function detectBuildTool() {
  for (const buildTool of buildTools) {
    for (const fileName of buildTool.possibleFileNames) {
      if (fs4.existsSync(path4.join(process.cwd(), fileName))) {
        const currentbuildTool = __spreadProps(__spreadValues({}, buildTool), { configFilePath: fileName });
        f2.success(
          `Detected ${source_default.bold(currentbuildTool.name)} project.`
        );
        return currentbuildTool;
      }
    }
  }
  return null;
}
function getBuildTool() {
  return __async(this, null, function* () {
    const selectedBuildTool = yield abortIfCancelled(
      ie({
        message: "Please select your build tool.",
        options: buildTools.map((buildTool) => ({
          value: buildTool,
          label: buildTool.label
        }))
      })
    );
    return selectedBuildTool;
  });
}
function handleConfigFile(_0) {
  return __async(this, arguments, function* ({
    telemetry
  }) {
    const detectedBuildTool = detectBuildTool();
    if (detectedBuildTool) {
      le(
        `found existing ${detectedBuildTool.configFilePath} file.`,
        `Transforming ${source_default.cyan(detectedBuildTool.configFilePath)}`
      );
      yield withTelemetry(
        {
          enabled: telemetry,
          integration: detectBuildTool.name,
          name: "cli"
        },
        () => __async(this, null, function* () {
          yield modifyConfigFile(detectedBuildTool);
        })
      );
      return;
    }
    const buildTool = yield getBuildTool();
    const targetFilePath = path4.join(process.cwd(), buildTool.configFilePath);
    if (buildTool.name === "next") {
      const nextRouter = yield getNextRouter();
      le(
        `at ${source_default.green(targetFilePath)}`,
        `Created ${source_default.green(buildTool.configFilePath)} file`
      );
      nextRouter === "app" ? yield fs4.promises.writeFile(
        targetFilePath,
        buildTool.configFileContentRSC
      ) : yield fs4.promises.writeFile(
        targetFilePath,
        buildTool.configFileContent
      );
    } else {
      le(
        `at ${source_default.green(targetFilePath)}`,
        `Created ${source_default.green(buildTool.configFilePath)} file`
      );
      yield fs4.promises.writeFile(targetFilePath, buildTool.configFileContent);
    }
  });
}

// src/utils/package-json.ts
var fs5 = __toESM(require("fs"));
var path5 = __toESM(require("path"));
function getPackageDotJson() {
  return __async(this, null, function* () {
    const packageJsonFileContents = yield fs5.promises.readFile(path5.join(process.cwd(), "package.json"), "utf8").catch(() => {
      f2.error(
        "Could not find package.json. Make sure to run the wizard in the root of your app!"
      );
      return abort();
    });
    let packageJson;
    try {
      packageJson = JSON.parse(packageJsonFileContents);
    } catch (e2) {
      f2.error(
        "Unable to parse your package.json. Make sure it has a valid format!"
      );
      abort();
    }
    return packageJson || {};
  });
}
function isPackageInstalled() {
  return __async(this, null, function* () {
    var _a;
    const packageJson = yield getPackageDotJson();
    if ((_a = packageJson.dependencies) == null ? void 0 : _a.million) {
      return true;
    }
    return false;
  });
}

// src/index.ts
function runMillionWizard(_0) {
  return __async(this, arguments, function* ({
    telemetry
  }) {
    const isMillionAlreadyInstalled = yield isPackageInstalled();
    yield installPackage({
      packageName: "million",
      alreadyInstalled: isMillionAlreadyInstalled
    });
    yield handleConfigFile({ telemetry });
  });
}
var TELEMETRY_ENABLED = !process.argv.includes("--no-telemetry");
function main2() {
  return __async(this, null, function* () {
    oe(showWelcomeScreen());
    yield runMillionWizard({ telemetry: TELEMETRY_ENABLED });
    $e(`${source_default.bold.green("\u2713 ")} You're all set!`);
  });
}
main2().catch(() => {
  abort(
    "Failed to setup Million.js, refer to the docs for manual setup: https://million.dev/docs/install"
  );
});
function showWelcomeScreen() {
  const text2 = source_default.magentaBright(
    `\u26A1 Million.js ${"2.6.4"}`
  );
  return text2;
}
/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
