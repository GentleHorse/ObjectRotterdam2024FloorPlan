'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const unplugin$1 = require('unplugin');
const core = require('@babel/core');
const pluginSyntaxJsx = require('@babel/plugin-syntax-jsx');
const pluginSyntaxTypescript = require('@babel/plugin-syntax-typescript');
const colors = require('kleur/colors');
const require$$0 = require('assert');
const t = require('@babel/types');
const constants = require('../shared/million.71606d8d.cjs');
const vm = require('vm');
const generate = require('@babel/generator');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

function _interopNamespaceCompat(e) {
  if (e && typeof e === 'object' && 'default' in e) return e;
  const n = Object.create(null);
  if (e) {
    for (const k in e) {
      n[k] = e[k];
    }
  }
  n.default = e;
  return n;
}

const pluginSyntaxJsx__default = /*#__PURE__*/_interopDefaultCompat(pluginSyntaxJsx);
const pluginSyntaxTypescript__default = /*#__PURE__*/_interopDefaultCompat(pluginSyntaxTypescript);
const require$$0__default = /*#__PURE__*/_interopDefaultCompat(require$$0);
const t__default = /*#__PURE__*/_interopDefaultCompat(t);
const t__namespace = /*#__PURE__*/_interopNamespaceCompat(t);
const vm__default = /*#__PURE__*/_interopDefaultCompat(vm);
const generate__default = /*#__PURE__*/_interopDefaultCompat(generate);

var lib$1 = {};

Object.defineProperty(lib$1, "__esModule", {
  value: true
});
var declare_1 = lib$1.declare = declare;
lib$1.declarePreset = void 0;
const apiPolyfills = {
  assertVersion: api => range => {
    throwVersionError(range, api.version);
  },
  targets: () => () => {
    return {};
  },
  assumption: () => () => {
    return undefined;
  }
};
function declare(builder) {
  return (api, options, dirname) => {
    var _clonedApi2;
    let clonedApi;
    for (const name of Object.keys(apiPolyfills)) {
      var _clonedApi;
      if (api[name]) continue;

      clonedApi = (_clonedApi = clonedApi) != null ? _clonedApi : copyApiObject(api);
      clonedApi[name] = apiPolyfills[name](clonedApi);
    }

    return builder((_clonedApi2 = clonedApi) != null ? _clonedApi2 : api, options || {}, dirname);
  };
}
const declarePreset = declare;
lib$1.declarePreset = declarePreset;
function copyApiObject(api) {
  let proto = null;
  if (typeof api.version === "string" && /^7\./.test(api.version)) {
    proto = Object.getPrototypeOf(api);
    if (proto && (!has(proto, "version") || !has(proto, "transform") || !has(proto, "template") || !has(proto, "types"))) {
      proto = null;
    }
  }
  return Object.assign({}, proto, api);
}
function has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function throwVersionError(range, version) {
  if (typeof range === "number") {
    if (!Number.isInteger(range)) {
      throw new Error("Expected string or integer value.");
    }
    range = `^${range}.0.0-0`;
  }
  if (typeof range !== "string") {
    throw new Error("Expected string or integer value.");
  }
  const limit = Error.stackTraceLimit;
  if (typeof limit === "number" && limit < 25) {
    Error.stackTraceLimit = 25;
  }
  let err;
  if (version.slice(0, 2) === "7.") {
    err = new Error(`Requires Babel "^7.0.0-beta.41", but was loaded with "${version}". ` + `You'll need to update your @babel/core version.`);
  } else {
    err = new Error(`Requires Babel "${range}", but was loaded with "${version}". ` + `If you are sure you have a compatible version of @babel/core, ` + `it is likely that something in your build process is loading the ` + `wrong version. Inspect the stack trace of this error to look for ` + `the first entry that doesn't mention "@babel/core" or "babel-core" ` + `to see what is calling Babel.`);
  }
  if (typeof limit === "number") {
    Error.stackTraceLimit = limit;
  }
  throw Object.assign(err, {
    code: "BABEL_VERSION_UNSUPPORTED",
    version,
    range
  });
}

var lib = {};

var importInjector = {};

var importBuilder = {};

Object.defineProperty(importBuilder, "__esModule", {
  value: true
});
importBuilder.default = void 0;

var _assert$1 = require$$0__default;

var _t$1 = t__default;

const {
  callExpression,
  cloneNode,
  expressionStatement,
  identifier,
  importDeclaration,
  importDefaultSpecifier,
  importNamespaceSpecifier,
  importSpecifier,
  memberExpression,
  stringLiteral,
  variableDeclaration,
  variableDeclarator
} = _t$1;

class ImportBuilder {
  constructor(importedSource, scope, hub) {
    this._statements = [];
    this._resultName = null;
    this._importedSource = void 0;
    this._scope = scope;
    this._hub = hub;
    this._importedSource = importedSource;
  }

  done() {
    return {
      statements: this._statements,
      resultName: this._resultName
    };
  }

  import() {
    this._statements.push(importDeclaration([], stringLiteral(this._importedSource)));

    return this;
  }

  require() {
    this._statements.push(expressionStatement(callExpression(identifier("require"), [stringLiteral(this._importedSource)])));

    return this;
  }

  namespace(name = "namespace") {
    const local = this._scope.generateUidIdentifier(name);

    const statement = this._statements[this._statements.length - 1];

    _assert$1(statement.type === "ImportDeclaration");

    _assert$1(statement.specifiers.length === 0);

    statement.specifiers = [importNamespaceSpecifier(local)];
    this._resultName = cloneNode(local);
    return this;
  }

  default(name) {
    const id = this._scope.generateUidIdentifier(name);

    const statement = this._statements[this._statements.length - 1];

    _assert$1(statement.type === "ImportDeclaration");

    _assert$1(statement.specifiers.length === 0);

    statement.specifiers = [importDefaultSpecifier(id)];
    this._resultName = cloneNode(id);
    return this;
  }

  named(name, importName) {
    if (importName === "default") return this.default(name);

    const id = this._scope.generateUidIdentifier(name);

    const statement = this._statements[this._statements.length - 1];

    _assert$1(statement.type === "ImportDeclaration");

    _assert$1(statement.specifiers.length === 0);

    statement.specifiers = [importSpecifier(id, identifier(importName))];
    this._resultName = cloneNode(id);
    return this;
  }

  var(name) {
    const id = this._scope.generateUidIdentifier(name);

    let statement = this._statements[this._statements.length - 1];

    if (statement.type !== "ExpressionStatement") {
      _assert$1(this._resultName);

      statement = expressionStatement(this._resultName);

      this._statements.push(statement);
    }

    this._statements[this._statements.length - 1] = variableDeclaration("var", [variableDeclarator(id, statement.expression)]);
    this._resultName = cloneNode(id);
    return this;
  }

  defaultInterop() {
    return this._interop(this._hub.addHelper("interopRequireDefault"));
  }

  wildcardInterop() {
    return this._interop(this._hub.addHelper("interopRequireWildcard"));
  }

  _interop(callee) {
    const statement = this._statements[this._statements.length - 1];

    if (statement.type === "ExpressionStatement") {
      statement.expression = callExpression(callee, [statement.expression]);
    } else if (statement.type === "VariableDeclaration") {
      _assert$1(statement.declarations.length === 1);

      statement.declarations[0].init = callExpression(callee, [statement.declarations[0].init]);
    } else {
      _assert$1.fail("Unexpected type.");
    }

    return this;
  }

  prop(name) {
    const statement = this._statements[this._statements.length - 1];

    if (statement.type === "ExpressionStatement") {
      statement.expression = memberExpression(statement.expression, identifier(name));
    } else if (statement.type === "VariableDeclaration") {
      _assert$1(statement.declarations.length === 1);

      statement.declarations[0].init = memberExpression(statement.declarations[0].init, identifier(name));
    } else {
      _assert$1.fail("Unexpected type:" + statement.type);
    }

    return this;
  }

  read(name) {
    this._resultName = memberExpression(this._resultName, identifier(name));
  }

}

importBuilder.default = ImportBuilder;

var isModule$1 = {};

Object.defineProperty(isModule$1, "__esModule", {
  value: true
});
isModule$1.default = isModule;

function isModule(path) {
  const {
    sourceType
  } = path.node;

  if (sourceType !== "module" && sourceType !== "script") {
    throw path.buildCodeFrameError(`Unknown sourceType "${sourceType}", cannot transform.`);
  }

  return path.node.sourceType === "module";
}

Object.defineProperty(importInjector, "__esModule", {
  value: true
});
importInjector.default = void 0;

var _assert = require$$0__default;

var _t = t__default;

var _importBuilder = importBuilder;

var _isModule = isModule$1;

const {
  numericLiteral,
  sequenceExpression
} = _t;

class ImportInjector {
  constructor(path, importedSource, opts) {
    this._defaultOpts = {
      importedSource: null,
      importedType: "commonjs",
      importedInterop: "babel",
      importingInterop: "babel",
      ensureLiveReference: false,
      ensureNoContext: false,
      importPosition: "before"
    };
    const programPath = path.find(p => p.isProgram());
    this._programPath = programPath;
    this._programScope = programPath.scope;
    this._hub = programPath.hub;
    this._defaultOpts = this._applyDefaults(importedSource, opts, true);
  }

  addDefault(importedSourceIn, opts) {
    return this.addNamed("default", importedSourceIn, opts);
  }

  addNamed(importName, importedSourceIn, opts) {
    _assert(typeof importName === "string");

    return this._generateImport(this._applyDefaults(importedSourceIn, opts), importName);
  }

  addNamespace(importedSourceIn, opts) {
    return this._generateImport(this._applyDefaults(importedSourceIn, opts), null);
  }

  addSideEffect(importedSourceIn, opts) {
    return this._generateImport(this._applyDefaults(importedSourceIn, opts), void 0);
  }

  _applyDefaults(importedSource, opts, isInit = false) {
    let newOpts;

    if (typeof importedSource === "string") {
      newOpts = Object.assign({}, this._defaultOpts, {
        importedSource
      }, opts);
    } else {
      _assert(!opts, "Unexpected secondary arguments.");

      newOpts = Object.assign({}, this._defaultOpts, importedSource);
    }

    if (!isInit && opts) {
      if (opts.nameHint !== undefined) newOpts.nameHint = opts.nameHint;
      if (opts.blockHoist !== undefined) newOpts.blockHoist = opts.blockHoist;
    }

    return newOpts;
  }

  _generateImport(opts, importName) {
    const isDefault = importName === "default";
    const isNamed = !!importName && !isDefault;
    const isNamespace = importName === null;
    const {
      importedSource,
      importedType,
      importedInterop,
      importingInterop,
      ensureLiveReference,
      ensureNoContext,
      nameHint,
      importPosition,
      blockHoist
    } = opts;
    let name = nameHint || importName;
    const isMod = (0, _isModule.default)(this._programPath);
    const isModuleForNode = isMod && importingInterop === "node";
    const isModuleForBabel = isMod && importingInterop === "babel";

    if (importPosition === "after" && !isMod) {
      throw new Error(`"importPosition": "after" is only supported in modules`);
    }

    const builder = new _importBuilder.default(importedSource, this._programScope, this._hub);

    if (importedType === "es6") {
      if (!isModuleForNode && !isModuleForBabel) {
        throw new Error("Cannot import an ES6 module from CommonJS");
      }

      builder.import();

      if (isNamespace) {
        builder.namespace(nameHint || importedSource);
      } else if (isDefault || isNamed) {
        builder.named(name, importName);
      }
    } else if (importedType !== "commonjs") {
      throw new Error(`Unexpected interopType "${importedType}"`);
    } else if (importedInterop === "babel") {
      if (isModuleForNode) {
        name = name !== "default" ? name : importedSource;
        const es6Default = `${importedSource}$es6Default`;
        builder.import();

        if (isNamespace) {
          builder.default(es6Default).var(name || importedSource).wildcardInterop();
        } else if (isDefault) {
          if (ensureLiveReference) {
            builder.default(es6Default).var(name || importedSource).defaultInterop().read("default");
          } else {
            builder.default(es6Default).var(name).defaultInterop().prop(importName);
          }
        } else if (isNamed) {
          builder.default(es6Default).read(importName);
        }
      } else if (isModuleForBabel) {
        builder.import();

        if (isNamespace) {
          builder.namespace(name || importedSource);
        } else if (isDefault || isNamed) {
          builder.named(name, importName);
        }
      } else {
        builder.require();

        if (isNamespace) {
          builder.var(name || importedSource).wildcardInterop();
        } else if ((isDefault || isNamed) && ensureLiveReference) {
          if (isDefault) {
            name = name !== "default" ? name : importedSource;
            builder.var(name).read(importName);
            builder.defaultInterop();
          } else {
            builder.var(importedSource).read(importName);
          }
        } else if (isDefault) {
          builder.var(name).defaultInterop().prop(importName);
        } else if (isNamed) {
          builder.var(name).prop(importName);
        }
      }
    } else if (importedInterop === "compiled") {
      if (isModuleForNode) {
        builder.import();

        if (isNamespace) {
          builder.default(name || importedSource);
        } else if (isDefault || isNamed) {
          builder.default(importedSource).read(name);
        }
      } else if (isModuleForBabel) {
        builder.import();

        if (isNamespace) {
          builder.namespace(name || importedSource);
        } else if (isDefault || isNamed) {
          builder.named(name, importName);
        }
      } else {
        builder.require();

        if (isNamespace) {
          builder.var(name || importedSource);
        } else if (isDefault || isNamed) {
          if (ensureLiveReference) {
            builder.var(importedSource).read(name);
          } else {
            builder.prop(importName).var(name);
          }
        }
      }
    } else if (importedInterop === "uncompiled") {
      if (isDefault && ensureLiveReference) {
        throw new Error("No live reference for commonjs default");
      }

      if (isModuleForNode) {
        builder.import();

        if (isNamespace) {
          builder.default(name || importedSource);
        } else if (isDefault) {
          builder.default(name);
        } else if (isNamed) {
          builder.default(importedSource).read(name);
        }
      } else if (isModuleForBabel) {
        builder.import();

        if (isNamespace) {
          builder.default(name || importedSource);
        } else if (isDefault) {
          builder.default(name);
        } else if (isNamed) {
          builder.named(name, importName);
        }
      } else {
        builder.require();

        if (isNamespace) {
          builder.var(name || importedSource);
        } else if (isDefault) {
          builder.var(name);
        } else if (isNamed) {
          if (ensureLiveReference) {
            builder.var(importedSource).read(name);
          } else {
            builder.var(name).prop(importName);
          }
        }
      }
    } else {
      throw new Error(`Unknown importedInterop "${importedInterop}".`);
    }

    const {
      statements,
      resultName
    } = builder.done();

    this._insertStatements(statements, importPosition, blockHoist);

    if ((isDefault || isNamed) && ensureNoContext && resultName.type !== "Identifier") {
      return sequenceExpression([numericLiteral(0), resultName]);
    }

    return resultName;
  }

  _insertStatements(statements, importPosition = "before", blockHoist = 3) {
    const body = this._programPath.get("body");

    if (importPosition === "after") {
      for (let i = body.length - 1; i >= 0; i--) {
        if (body[i].isImportDeclaration()) {
          body[i].insertAfter(statements);
          return;
        }
      }
    } else {
      statements.forEach(node => {
        node._blockHoist = blockHoist;
      });
      const targetPath = body.find(p => {
        const val = p.node._blockHoist;
        return Number.isFinite(val) && val < 4;
      });

      if (targetPath) {
        targetPath.insertBefore(statements);
        return;
      }
    }

    this._programPath.unshiftContainer("body", statements);
  }

}

importInjector.default = ImportInjector;

(function (exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	Object.defineProperty(exports, "ImportInjector", {
	  enumerable: true,
	  get: function () {
	    return _importInjector.default;
	  }
	});
	exports.addDefault = addDefault;
	exports.addNamed = addNamed;
	exports.addNamespace = addNamespace;
	exports.addSideEffect = addSideEffect;
	Object.defineProperty(exports, "isModule", {
	  enumerable: true,
	  get: function () {
	    return _isModule.default;
	  }
	});

	var _importInjector = importInjector;

	var _isModule = isModule$1;

	function addDefault(path, importedSource, opts) {
	  return new _importInjector.default(path).addDefault(importedSource, opts);
	}

	function addNamed(path, name, importedSource, opts) {
	  return new _importInjector.default(path).addNamed(name, importedSource, opts);
	}

	function addNamespace(path, importedSource, opts) {
	  return new _importInjector.default(path).addNamespace(importedSource, opts);
	}

	function addSideEffect(path, importedSource, opts) {
	  return new _importInjector.default(path).addSideEffect(importedSource, opts);
	} 
} (lib));

const renderToString = (node) => {
  const type = node.openingElement.name;
  const attributes = node.openingElement.attributes;
  let html = `<${type.name}`;
  for (let i = 0, j = attributes.length; i < j; i++) {
    const attribute = attributes[i];
    if (!t__namespace.isJSXSpreadAttribute(attribute) && attribute?.value && t__namespace.isJSXIdentifier(attribute.name) && "value" in attribute.value) {
      const { name } = attribute.name;
      const { value } = attribute.value;
      html += ` ${name}${value ? `="${value}"` : ""}`;
    }
  }
  if (node.selfClosing) {
    html += ` />`;
    return html;
  }
  html += ">";
  if (node.children.length) {
    for (let i = 0, j = node.children.length; i < j; i++) {
      const child = node.children[i];
      if (t__namespace.isJSXText(child)) {
        html += child.value.trim();
      } else if (t__namespace.isJSXElement(child)) {
        html += renderToString(child);
      } else if (t__namespace.isJSXExpressionContainer(child)) {
        if (t__namespace.isStringLiteral(child.expression)) {
          html += child.expression.value;
        } else if (t__namespace.isNumericLiteral(child.expression)) {
          html += child.expression.value;
        } else if (t__namespace.isJSXElement(child.expression)) {
          html += renderToString(child.expression);
        }
      }
    }
  }
  html += `</${type.name}>`;
  return html;
};
const renderToTemplate = (node, edits, path = [], holes = []) => {
  const attributesLength = node.openingElement.attributes.length;
  const current = {
    path,
    // The location of the edit in in the virtual node tree
    edits: [],
    // Occur on mount + patch
    inits: []
    // Occur before mount
  };
  if (attributesLength) {
    const newAttributes = [];
    for (let i = 0; i < attributesLength; ++i) {
      const attribute = node.openingElement.attributes[i];
      if (t__namespace.isJSXAttribute(attribute) && t__namespace.isJSXIdentifier(attribute.name) && attribute.value) {
        const name = attribute.name.name;
        if (name === "key" || name === "ref" || name === "children") {
          continue;
        }
        if (name === "className")
          attribute.name.name = "class";
        if (name === "htmlFor")
          attribute.name.name = "for";
        if (name.startsWith("on")) {
          if (!t__namespace.isJSXExpressionContainer(attribute.value))
            continue;
          const { expression } = attribute.value;
          if (!t__namespace.isIdentifier(expression) && !t__namespace.isArrowFunctionExpression(expression)) {
            continue;
          }
          const isDynamicListener = t__namespace.isIdentifier(expression) && holes.includes(expression.name);
          const event = name.toLowerCase().slice(2);
          if (isDynamicListener) {
            current.edits.push({
              type: t__namespace.numericLiteral(constants.EventFlag),
              name: t__namespace.stringLiteral(event),
              hole: t__namespace.stringLiteral(expression.name)
            });
          } else {
            current.inits.push({
              type: t__namespace.numericLiteral(constants.EventFlag),
              listener: expression,
              name: t__namespace.stringLiteral(event)
            });
          }
          continue;
        }
        if (name === "style") {
          if (!t__namespace.isJSXExpressionContainer(attribute.value))
            continue;
          const { expression } = attribute.value;
          if (!t__namespace.isObjectExpression(expression))
            continue;
          let style = "";
          for (let i2 = 0, j = expression.properties.length; i2 < j; ++i2) {
            const property = expression.properties[i2];
            if (!t__namespace.isObjectProperty(property) || !t__namespace.isIdentifier(property.key) || !t__namespace.isStringLiteral(property.value) && !t__namespace.isNumericLiteral(property.value))
              continue;
            if (!t__namespace.isIdentifier(property.key))
              continue;
            const value = property.value.extra?.raw || "";
            style += `${property.key.name}:${String(value)};`;
          }
          attribute.value = t__namespace.stringLiteral(style);
          continue;
        }
        if (t__namespace.isJSXExpressionContainer(attribute.value)) {
          if (t__namespace.isStringLiteral(attribute.value.expression) || t__namespace.isNumericLiteral(attribute.value.expression)) {
            newAttributes.push(
              t__namespace.jsxAttribute(
                attribute.name,
                t__namespace.stringLiteral(String(attribute.value.expression.value))
              )
            );
            continue;
          }
          const { expression } = attribute.value;
          current.edits.push({
            type: t__namespace.numericLiteral(
              name === "style" ? constants.StyleAttributeFlag : name.charCodeAt(0) === constants.X_CHAR ? constants.SvgAttributeFlag : constants.AttributeFlag
            ),
            hole: t__namespace.stringLiteral(expression.name),
            name: t__namespace.stringLiteral(name)
          });
          continue;
        }
      }
      if (attribute && "value" in attribute && attribute.value && t__namespace.isJSXAttribute(attribute)) {
        newAttributes.push(attribute);
      }
    }
    node.openingElement.attributes = newAttributes;
  }
  const newChildren = [];
  let canMergeString = false;
  for (let i = 0, j = node.children.length || 0, k = 0; i < j; ++i) {
    const child = node.children[i];
    if (t__namespace.isJSXExpressionContainer(child) && t__namespace.isIdentifier(child.expression) && holes.includes(child.expression.name)) {
      current.edits.push({
        type: t__namespace.numericLiteral(constants.ChildFlag),
        hole: t__namespace.stringLiteral(child.expression.name),
        index: t__namespace.numericLiteral(i),
        name: void 0,
        listener: void 0,
        value: void 0
      });
      continue;
    }
    if (t__namespace.isJSXText(child) && (typeof child.value === "string" || typeof child.value === "number" || typeof child.value === "bigint")) {
      const value = String(child.value);
      if (value.trim() === "")
        continue;
      if (canMergeString) {
        current.inits.push({
          type: t__namespace.numericLiteral(constants.ChildFlag),
          value: t__namespace.stringLiteral(value),
          index: t__namespace.numericLiteral(i)
        });
        continue;
      }
      canMergeString = true;
      newChildren.push(t__namespace.jsxText(value));
      k++;
      continue;
    }
    canMergeString = false;
    if (t__namespace.isJSXElement(child)) {
      newChildren.push(renderToTemplate(child, edits, path.concat(k++), holes));
    }
  }
  node.children = newChildren;
  if (current.inits.length || current.edits.length) {
    edits.push(current);
  }
  return node;
};
const hoistElements = (paths, path, sourceName) => {
  var _a;
  const createTreeNode = () => ({
    children: [],
    path: void 0
  });
  const createPrunedNode = (index, parent) => ({
    index,
    parent,
    path: void 0,
    child: void 0,
    next: void 0,
    prev: void 0
  });
  const tree = createTreeNode();
  for (let i = 0, j = paths.length; i < j; i++) {
    const path2 = paths[i];
    let prev = tree;
    for (let k = 0, l = path2.length; k < l; k++) {
      const index = path2[k];
      (_a = prev.children)[index] || (_a[index] = createTreeNode());
      prev = prev.children[index];
      if (k === l - 1) {
        prev.path || (prev.path = []);
        prev.path.push(i);
      }
    }
  }
  const prune = (node, parent) => {
    let prev = parent;
    for (let i = 0, j = node.children.length; i < j; i++) {
      const treeNode = node.children[i];
      const current = createPrunedNode(i, parent);
      if (prev === parent) {
        prev.child = current;
      } else {
        current.prev = prev;
        prev.next = current;
      }
      prev = current;
      if (treeNode) {
        prev.path = treeNode.path;
        prune(treeNode, current);
      }
    }
  };
  const root = createPrunedNode(0);
  prune(tree, root);
  const getId = () => path.scope.generateUidIdentifier("el$");
  const firstChild = lib.addNamed(path, "firstChild$", sourceName);
  const nextSibling = lib.addNamed(path, "nextSibling$", sourceName);
  const declarators = [];
  const accessedIds = Array(paths.length).fill(
    t__namespace.identifier("root")
  );
  const traverse = (node, prev, isParent) => {
    if (isParent) {
      prev = t__namespace.callExpression(
        t__namespace.memberExpression(firstChild, t__namespace.identifier("call")),
        [prev]
      );
      for (let i = 0, j = node.index; i < j; i++) {
        prev = t__namespace.callExpression(
          t__namespace.memberExpression(nextSibling, t__namespace.identifier("call")),
          [prev]
        );
      }
    } else {
      for (let i = 0, j = node.index - (node.prev?.index ?? 0); i < j; i++) {
        prev = t__namespace.callExpression(
          t__namespace.memberExpression(nextSibling, t__namespace.identifier("call")),
          [prev]
        );
      }
    }
    if (node.child && node.next) {
      const id = getId();
      declarators.push(t__namespace.variableDeclarator(id, prev));
      prev = id;
      if (node.path !== void 0) {
        for (let i = 0, j = node.path.length; i < j; ++i) {
          accessedIds[node.path[i]] = id;
        }
      }
    } else if (node.path !== void 0) {
      const id = getId();
      declarators.push(t__namespace.variableDeclarator(id, prev));
      for (let i = 0, j = node.path.length; i < j; ++i) {
        accessedIds[node.path[i]] = id;
      }
      prev = id;
    }
    if (node.next) {
      traverse(node.next, prev, false);
    }
    if (node.child) {
      traverse(node.child, prev, true);
    }
  };
  if (root.child) {
    traverse(root.child, t__namespace.identifier("root"), true);
  }
  return {
    declarators,
    accessedIds
  };
};

const createEdit = ({
  type,
  name,
  value,
  hole,
  index,
  listener,
  patch,
  block
}) => {
  return t__namespace.objectExpression([
    t__namespace.objectProperty(t__namespace.identifier("t"), type),
    t__namespace.objectProperty(t__namespace.identifier("n"), name ?? t__namespace.nullLiteral()),
    t__namespace.objectProperty(t__namespace.identifier("v"), value ?? t__namespace.nullLiteral()),
    t__namespace.objectProperty(t__namespace.identifier("h"), hole ?? t__namespace.nullLiteral()),
    t__namespace.objectProperty(t__namespace.identifier("i"), index ?? t__namespace.nullLiteral()),
    t__namespace.objectProperty(t__namespace.identifier("l"), listener ?? t__namespace.nullLiteral()),
    t__namespace.objectProperty(t__namespace.identifier("p"), patch ?? t__namespace.nullLiteral()),
    t__namespace.objectProperty(t__namespace.identifier("b"), block ?? t__namespace.nullLiteral())
  ]);
};
const chainOrLogic = (...binaryExpressions) => {
  if (binaryExpressions.length === 0)
    return t__namespace.booleanLiteral(true);
  if (binaryExpressions.length === 1)
    return binaryExpressions[0];
  const [first, ...rest] = binaryExpressions;
  return t__namespace.logicalExpression("||", first, chainOrLogic(...rest));
};
const createDirtyChecker = (holes) => {
  const oldProps = t__namespace.identifier("a");
  const newProps = t__namespace.identifier("b");
  return t__namespace.arrowFunctionExpression(
    [oldProps, newProps],
    chainOrLogic(
      ...holes.map((hole) => {
        const id = t__namespace.identifier(hole);
        return t__namespace.binaryExpression(
          "!==",
          t__namespace.optionalMemberExpression(oldProps, id, false, true),
          t__namespace.optionalMemberExpression(newProps, id, false, true)
        );
      })
    )
  );
};

const visitor = (options = {}) => (path) => {
  if (!options.optimize)
    return;
  if (t__namespace.isIdentifier(path.node.callee, { name: "block" })) {
    const blockFunction = path.scope.getBinding(path.node.callee.name);
    if (!blockFunction)
      return;
    const importSource = blockFunction.path.parent;
    if (!t__namespace.isVariableDeclarator(path.parentPath.node) || !t__namespace.isImportDeclaration(importSource) || !importSource.source.value.includes("million")) {
      return;
    }
    let [fn, _unwrap, shouldUpdate] = path.node.arguments;
    if (!fn)
      return;
    const [props] = fn.params;
    if (t__namespace.isArrowFunctionExpression(fn) && t__namespace.isJSXElement(fn.body)) {
      const edits = [];
      const holes = t__namespace.isObjectPattern(props) ? Object.keys(props.properties).map((key) => {
        return props.properties[key].key.name;
      }) : [];
      const template = renderToTemplate(fn.body, edits, [], holes);
      const paths = [];
      let maxPathLength = 0;
      for (let i = 0, j = edits.length; i < j; ++i) {
        const path2 = edits[i]?.path || [];
        if (path2.length > maxPathLength)
          maxPathLength = path2.length;
        paths.push(path2);
      }
      const { declarators, accessedIds } = hoistElements(
        paths,
        path,
        importSource.source.value
      );
      const editsArray = t__namespace.arrayExpression(
        edits.map((edit) => {
          const editsProperties = [];
          const initsProperties = [];
          for (let i = 0, j = edit.edits.length; i < j; ++i) {
            const { type, name, hole, listener, value, index } = edit.edits[i];
            editsProperties.push(
              t__namespace.objectExpression([
                t__namespace.objectProperty(t__namespace.identifier("t"), type),
                t__namespace.objectProperty(t__namespace.identifier("n"), name ?? t__namespace.nullLiteral()),
                t__namespace.objectProperty(t__namespace.identifier("v"), value ?? t__namespace.nullLiteral()),
                t__namespace.objectProperty(t__namespace.identifier("h"), hole ?? t__namespace.nullLiteral()),
                t__namespace.objectProperty(t__namespace.identifier("i"), index ?? t__namespace.nullLiteral()),
                t__namespace.objectProperty(
                  t__namespace.identifier("l"),
                  listener ?? t__namespace.nullLiteral()
                ),
                t__namespace.objectProperty(t__namespace.identifier("p"), value ?? t__namespace.nullLiteral()),
                t__namespace.objectProperty(t__namespace.identifier("b"), value ?? t__namespace.nullLiteral())
              ])
            );
          }
          for (let i = 0, j = edit.inits.length; i < j; ++i) {
            const { type, name, hole, listener, value, index } = edit.inits[i];
            initsProperties.push(
              t__namespace.objectExpression([
                t__namespace.objectProperty(t__namespace.identifier("t"), type),
                t__namespace.objectProperty(t__namespace.identifier("n"), name ?? t__namespace.nullLiteral()),
                t__namespace.objectProperty(t__namespace.identifier("v"), value ?? t__namespace.nullLiteral()),
                t__namespace.objectProperty(t__namespace.identifier("h"), hole ?? t__namespace.nullLiteral()),
                t__namespace.objectProperty(t__namespace.identifier("i"), index ?? t__namespace.nullLiteral()),
                t__namespace.objectProperty(
                  t__namespace.identifier("l"),
                  listener ?? t__namespace.nullLiteral()
                ),
                t__namespace.objectProperty(t__namespace.identifier("p"), value ?? t__namespace.nullLiteral()),
                t__namespace.objectProperty(t__namespace.identifier("b"), value ?? t__namespace.nullLiteral())
              ])
            );
          }
          return t__namespace.objectExpression([
            t__namespace.objectProperty(t__namespace.identifier("p"), t__namespace.nullLiteral()),
            t__namespace.objectProperty(
              t__namespace.identifier("e"),
              t__namespace.arrayExpression(editsProperties)
            ),
            t__namespace.objectProperty(
              t__namespace.identifier("i"),
              initsProperties.length ? t__namespace.arrayExpression(initsProperties) : t__namespace.nullLiteral()
            )
          ]);
        })
      );
      const stringToDOM = lib.addNamed(
        path,
        "stringToDOM",
        importSource.source.value,
        {
          nameHint: "stringToDOM$"
        }
      );
      const shouldUpdateExists = t__namespace.isIdentifier(shouldUpdate) && shouldUpdate.name !== "undefined" || t__namespace.isArrowFunctionExpression(shouldUpdate);
      if (!shouldUpdateExists && props && !t__namespace.isIdentifier(props)) {
        const { properties } = props;
        shouldUpdate = t__namespace.arrowFunctionExpression(
          [t__namespace.identifier("oldProps"), t__namespace.identifier("newProps")],
          chainOrLogic(
            ...properties.filter((property) => t__namespace.isObjectProperty(property)).map((property) => {
              const key = property.key;
              return t__namespace.binaryExpression(
                "!==",
                t__namespace.optionalMemberExpression(
                  t__namespace.identifier("oldProps"),
                  key,
                  false,
                  true
                ),
                t__namespace.optionalMemberExpression(
                  t__namespace.identifier("newProps"),
                  key,
                  false,
                  true
                )
              );
            })
          )
        );
      }
      const domVariable = path.scope.generateUidIdentifier("dom$");
      const editsVariable = path.scope.generateUidIdentifier("edits$");
      const shouldUpdateVariable = path.scope.generateUidIdentifier("shouldUpdate$");
      const getElementsVariable = path.scope.generateUidIdentifier("getElements$");
      const variables = t__namespace.variableDeclaration("const", [
        t__namespace.variableDeclarator(
          domVariable,
          t__namespace.callExpression(stringToDOM, [
            t__namespace.templateLiteral(
              [
                t__namespace.templateElement({
                  raw: renderToString(template)
                })
              ],
              []
            )
          ])
        ),
        t__namespace.variableDeclarator(editsVariable, editsArray),
        t__namespace.variableDeclarator(
          shouldUpdateVariable,
          shouldUpdateExists ? t__namespace.nullLiteral() : shouldUpdate
        ),
        t__namespace.variableDeclarator(
          getElementsVariable,
          declarators.length ? t__namespace.arrowFunctionExpression(
            [t__namespace.identifier("root")],
            t__namespace.blockStatement([
              t__namespace.variableDeclaration("const", declarators),
              t__namespace.returnStatement(t__namespace.arrayExpression(accessedIds))
            ])
          ) : t__namespace.nullLiteral()
        )
      ]);
      const BlockClass = lib.addNamed(path, "Block", importSource.source.value, {
        nameHint: "Block$"
      });
      const blockFactory = t__namespace.arrowFunctionExpression(
        [
          t__namespace.identifier("props"),
          t__namespace.identifier("key"),
          t__namespace.identifier("shouldUpdate")
        ],
        t__namespace.blockStatement([
          t__namespace.returnStatement(
            t__namespace.newExpression(BlockClass, [
              domVariable,
              editsVariable,
              t__namespace.identifier("props"),
              t__namespace.logicalExpression(
                "??",
                t__namespace.identifier("key"),
                t__namespace.memberExpression(
                  t__namespace.identifier("props"),
                  t__namespace.identifier("key")
                )
              ),
              t__namespace.logicalExpression(
                "??",
                t__namespace.identifier("shouldUpdate"),
                shouldUpdateVariable
              ),
              getElementsVariable
            ])
          )
        ])
      );
      path.parentPath.parentPath?.insertBefore(variables);
      path.replaceWith(t__namespace.returnStatement(blockFactory));
    }
  }
};

function collectImportedBindings(path) {
  const bindings = {};
  const aliases = {};
  const importDeclarations = path.get("body").filter((node) => t__namespace.isImportDeclaration(node.node));
  for (const importDeclaration of importDeclarations) {
    if (t__namespace.isImportDeclaration(importDeclaration.node) && importDeclaration.node.source.value.includes("million")) {
      for (const specifier of importDeclaration.node.specifiers) {
        if (t__namespace.isImportSpecifier(specifier) && t__namespace.isIdentifier(specifier.imported)) {
          bindings[specifier.imported.name] = specifier.local.name;
          aliases[specifier.local.name] = specifier.imported.name;
        }
      }
    }
  }
  return { bindings, aliases };
}

const RENDER_SCOPE = "slot";
const TRANSFORM_ANNOTATION = "million:transform";
const getUniqueId = (path, name) => {
  const processedName = t__namespace.toIdentifier(name).replace(/^_+/, "").replace(/[0-9]+$/g, "");
  let uid;
  let i = 0;
  do {
    uid = processedName;
    if (i > 1)
      uid += i;
    i++;
  } while (path.scope.hasLabel(uid) || path.scope.hasBinding(uid) || path.scope.hasGlobal(uid) || path.scope.hasReference(uid));
  path.scope.references[uid] = true;
  path.scope.uids[uid] = true;
  return t__namespace.identifier(uid);
};
const getValidSpecifiers = (importDeclarationPath, aliases, file) => {
  const importDeclaration = importDeclarationPath.node;
  const validSpecifiers = [];
  if (!t__namespace.isImportDeclaration(importDeclaration) || !importDeclaration.source.value.includes("million") || !importDeclaration.specifiers.every((specifier) => {
    if (!t__namespace.isImportSpecifier(specifier))
      return false;
    const importedSpecifier = specifier.imported;
    if (!t__namespace.isIdentifier(importedSpecifier))
      return false;
    const checkValid = (validName) => {
      return importedSpecifier.name === validName && aliases[specifier.local.name];
    };
    const isSpecifierValid = checkValid("block") || checkValid("For") || checkValid("macro") || checkValid("renderReactScope") || checkValid("renderPreactScope");
    if (isSpecifierValid) {
      validSpecifiers.push(importedSpecifier.name);
    }
    return isSpecifierValid;
  })) {
    throw createDeopt(
      "Found unsupported import for block. Make sure blocks are imported from correctly.",
      file,
      importDeclarationPath
    );
  }
  return validSpecifiers;
};
const isSensitiveElement = (jsx) => {
  const sensitiveElements = ["select"];
  return t__namespace.isJSXIdentifier(jsx.openingElement.name) && sensitiveElements.includes(jsx.openingElement.name.name);
};
const hasStyledAttributes = (attribute) => {
  return attribute.name.name === "tw" || attribute.name.name === "css";
};
const resolveCorrectImportSource = (options, source) => {
  if (!source.startsWith("million"))
    return source;
  const mode = options.mode || "react";
  if (options.server) {
    return `million/${mode}-server`;
  }
  return `million/${mode}`;
};
const createError = (message, path, file) => {
  return path.buildCodeFrameError(
    `
${styleSecondaryMessage(message, "\u26A0")} ${styleCommentMessage(
      String(file)
    )}`
  );
};
const styleSecondaryMessage = (message, emoticon) => {
  return `${colors.magenta(emoticon)}${message}`;
};
const styleLinks = (message) => {
  const parsedMessage = message.replaceAll(/https?:\/\/[^\s]+/g, (match) => {
    return colors.cyan(match);
  });
  return parsedMessage;
};
const styleCommentMessage = (message) => {
  return colors.dim(styleLinks(message));
};
const warn = (message, file, path, mute) => {
  if (mute)
    return;
  const err = createError(message, path, file);
  console.warn(
    err.message,
    "\n",
    styleCommentMessage(
      `Check out the Rules of Blocks: https://million.dev/docs/rules. Enable the "mute" option to disable this message.`
    ),
    "\n"
  );
};
const createDeopt = (message, file, callSitePath, path) => {
  const { parent, node } = callSitePath;
  if (t__namespace.isVariableDeclarator(parent) && "arguments" in node && t__namespace.isIdentifier(node.arguments[0])) {
    parent.init = node.arguments[0];
  }
  if (message === null)
    return new Error("");
  return createError(message, path ?? callSitePath, file);
};
const isStatic = (node) => {
  if (t__namespace.isTaggedTemplateExpression(node) && t__namespace.isIdentifier(node.tag) && node.quasi.expressions.length === 0 && node.tag.name === "css") {
    return true;
  }
  return t__namespace.isLiteral(node) && !t__namespace.isTemplateLiteral(node);
};
const resolvePath = (path) => {
  return Array.isArray(path) ? path[0] : path;
};
const isComponent = (name) => {
  return name.startsWith(name[0].toUpperCase()) && !name.startsWith("_") && !name.startsWith("M$") && !name.startsWith("use");
};
const handleVisitorError = (ctx, mute) => {
  try {
    ctx();
  } catch (err) {
    if (err instanceof Error && err.message && !mute) {
      console.warn(err.message, "\n");
    }
  }
};
const removeDuplicateJSXAttributes = (attributes) => {
  const seen = /* @__PURE__ */ new Set();
  for (let i = attributes.length - 1; i >= 0; i--) {
    const attr = attributes[i];
    if (t__namespace.isJSXAttribute(attr) && t__namespace.isJSXIdentifier(attr.name) && seen.has(attr.name.name)) {
      attributes.splice(i, 1);
    }
    if (t__namespace.isJSXAttribute(attr) && t__namespace.isJSXIdentifier(attr.name)) {
      seen.add(attr.name.name);
    }
  }
  return attributes;
};
const trimJsxChildren = (jsx) => {
  for (let i = jsx.children.length - 1; i >= 0; i--) {
    const child = jsx.children[i];
    const isEmptyText = t__namespace.isJSXText(child) && child.value.trim() === "";
    const isEmptyExpression = t__namespace.isJSXExpressionContainer(child) && t__namespace.isJSXEmptyExpression(child.expression);
    if (isEmptyText || isEmptyExpression) {
      jsx.children.splice(i, 1);
    }
  }
};
const normalizeProperties = (properties) => {
  const seen = /* @__PURE__ */ new Set();
  for (let i = properties.length - 1; i >= 0; i--) {
    if (!properties[i]) {
      properties.splice(i, 1);
      continue;
    }
    const prop = properties[i];
    if (t__namespace.isObjectProperty(prop) && t__namespace.isIdentifier(prop.key) && seen.has(prop.key.name)) {
      properties.splice(i, 1);
    }
    if (t__namespace.isObjectProperty(prop) && t__namespace.isIdentifier(prop.key)) {
      seen.add(prop.key.name);
    }
  }
  return properties;
};
const isJSXFragment = (node) => {
  if (t__namespace.isJSXElement(node)) {
    const type = node.openingElement.name;
    if (t__namespace.isJSXMemberExpression(type) && type.property.name === "Fragment")
      return true;
    if (t__namespace.isJSXIdentifier(type) && type.name === "Fragment")
      return true;
  }
  return t__namespace.isJSXFragment(node);
};
const addNamedCache = (name, source, path, programPath) => {
  const { bindings } = collectImportedBindings(programPath);
  if (bindings[name]) {
    return t__namespace.identifier(bindings[name]);
  }
  const id = lib.addNamed(path, name, source, {
    nameHint: `${name}$`
  });
  return id;
};
const SVG_ELEMENTS = [
  "circle",
  "ellipse",
  "foreignObject",
  "image",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
  "text",
  "textPath",
  "tspan",
  "svg",
  "g"
];
const NO_PX_PROPERTIES = [
  "animationIterationCount",
  "boxFlex",
  "boxFlexGroup",
  "boxOrdinalGroup",
  "columnCount",
  "fillOpacity",
  "flex",
  "flexGrow",
  "flexPositive",
  "flexShrink",
  "flexNegative",
  "flexOrder",
  "fontWeight",
  "lineClamp",
  "lineHeight",
  "opacity",
  "order",
  "orphans",
  "stopOpacity",
  "strokeDashoffset",
  "strokeOpacity",
  "strokeWidth",
  "tabSize",
  "widows",
  "zIndex",
  "zoom",
  // SVG-related properties
  "fillOpacity",
  "floodOpacity",
  "stopOpacity",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth"
];

const optimize = (_options, {
  holes,
  jsx
}, SHARED) => {
  const { callSitePath, imports } = SHARED;
  const edits = [];
  const template = renderToTemplate(jsx, edits, [], holes);
  const paths = [];
  let maxPathLength = 0;
  for (let i = 0, j = edits.length; i < j; ++i) {
    const path = edits[i]?.path || [];
    if (path.length > maxPathLength)
      maxPathLength = path.length;
    paths.push(path);
  }
  const { declarators, accessedIds } = hoistElements(
    paths,
    callSitePath,
    "million"
  );
  const editsArray = t__namespace.arrayExpression(
    edits.map((edit) => {
      const editsProperties = [];
      const initsProperties = [];
      for (let i = 0, j = edit.edits.length; i < j; ++i) {
        const { type, name, hole, listener, value, index } = edit.edits[i];
        editsProperties.push(
          createEdit({
            type,
            name,
            hole,
            index,
            listener,
            value,
            patch: value,
            block: value
          })
        );
      }
      for (let i = 0, j = edit.inits.length; i < j; ++i) {
        const { type, name, hole, listener, value, index } = edit.inits[i];
        if (type.value === constants.EventFlag) {
          initsProperties.push(
            createEdit({
              type,
              name,
              hole,
              index,
              listener,
              value,
              patch: value,
              block: value
            })
          );
        } else {
          initsProperties.push(
            createEdit({
              type,
              hole: t__namespace.nullLiteral(),
              index,
              listener: t__namespace.nullLiteral(),
              value,
              patch: t__namespace.nullLiteral(),
              block: t__namespace.nullLiteral()
            })
          );
        }
      }
      return t__namespace.objectExpression([
        t__namespace.objectProperty(t__namespace.identifier("p"), t__namespace.arrayExpression()),
        t__namespace.objectProperty(t__namespace.identifier("e"), t__namespace.arrayExpression(editsProperties)),
        t__namespace.objectProperty(
          t__namespace.identifier("i"),
          initsProperties.length ? t__namespace.arrayExpression(initsProperties) : t__namespace.arrayExpression()
        )
      ]);
    })
  );
  const stringToDOM = imports.addNamed("stringToDOM", "million");
  const domVariable = callSitePath.scope.generateUidIdentifier("dom$");
  const editsVariable = callSitePath.scope.generateUidIdentifier("edits$");
  const shouldUpdateVariable = callSitePath.scope.generateUidIdentifier("shouldUpdate$");
  const getElementsVariable = callSitePath.scope.generateUidIdentifier("getElements$");
  const variables = t__namespace.variableDeclaration("const", [
    t__namespace.variableDeclarator(
      domVariable,
      t__namespace.callExpression(stringToDOM, [
        t__namespace.templateLiteral(
          [
            t__namespace.templateElement({
              raw: renderToString(template)
            })
          ],
          []
        )
      ])
    ),
    t__namespace.variableDeclarator(editsVariable, editsArray),
    t__namespace.variableDeclarator(shouldUpdateVariable, createDirtyChecker(holes)),
    t__namespace.variableDeclarator(
      getElementsVariable,
      declarators.length ? t__namespace.arrowFunctionExpression(
        [t__namespace.identifier("root")],
        t__namespace.blockStatement([
          t__namespace.variableDeclaration("const", declarators),
          t__namespace.returnStatement(t__namespace.arrayExpression(accessedIds))
        ])
      ) : t__namespace.nullLiteral()
    )
  ]);
  const BlockClass = lib.addNamed(callSitePath, "Block", "million", {
    nameHint: "Block$"
  });
  const blockFactory = t__namespace.arrowFunctionExpression(
    [t__namespace.identifier("props"), t__namespace.identifier("key"), t__namespace.identifier("shouldUpdate")],
    t__namespace.blockStatement([
      t__namespace.returnStatement(
        t__namespace.newExpression(BlockClass, [
          domVariable,
          editsVariable,
          t__namespace.identifier("props"),
          t__namespace.logicalExpression(
            "??",
            t__namespace.identifier("key"),
            t__namespace.memberExpression(t__namespace.identifier("props"), t__namespace.identifier("key"))
          ),
          t__namespace.logicalExpression(
            "??",
            t__namespace.identifier("shouldUpdate"),
            shouldUpdateVariable
          ),
          getElementsVariable
        ])
      )
    ])
  );
  return {
    blockFactory,
    variables
  };
};

const evaluate = (ast, scope, excludeIds) => {
  try {
    return {
      ast: valueToAst(evaluateUnsafe(ast, scope, excludeIds)),
      err: false
    };
  } catch (_err) {
    return { ast, err: true };
  }
};
const evaluateUnsafe = (ast, scope, excludeIds = []) => {
  const bindings = scope.getAllBindings();
  const staticContext = {};
  for (const key in bindings) {
    try {
      if (excludeIds.includes(key))
        continue;
      const { path, kind } = bindings[key];
      if ((kind === "const" || kind === "let") && t__namespace.isVariableDeclarator(path.node)) {
        staticContext[key] = evaluateAstNode(path.node.init, staticContext);
      }
      if (t__namespace.isFunctionDeclaration(path.node) || t__namespace.isClassDeclaration(path.node)) {
        staticContext[key] = evaluateAstNode(path.node.body, staticContext);
      }
    } catch (_err) {
    }
  }
  return runAstInContext(ast, staticContext);
};
const runAstInContext = (ast, staticContext) => {
  const code = generate__default(ast).code;
  const script = new vm__default.Script(code);
  const context = vm__default.createContext(staticContext);
  const result = script.runInContext(context);
  return result;
};
const evaluateAstNode = (ast, staticContext = {}) => {
  if (!ast)
    return void 0;
  if (t__namespace.isJSXExpressionContainer(ast)) {
    return evaluateAstNode(ast.expression, staticContext);
  }
  if (t__namespace.isObjectExpression(ast)) {
    const ret = {};
    for (let i = -1, len = ast.properties.length; ++i < len; ) {
      const value = ast.properties[i];
      if (!t__namespace.isObjectProperty(value)) {
        throw new Error("evaluateAstNode can only evaluate object properties");
      }
      let key;
      if (value.computed) {
        key = evaluateAstNode(value.key, staticContext);
      } else if (t__namespace.isIdentifier(value.key)) {
        key = value.key.name;
      } else if (t__namespace.isStringLiteral(value.key) || t__namespace.isNumericLiteral(value.key)) {
        key = value.key.value;
      }
      if (!key || key === true)
        continue;
      ret[key] = evaluateAstNode(value.value, staticContext);
    }
    return ret;
  }
  if (t__namespace.isArrayExpression(ast)) {
    return ast.elements.map((x) => {
      return evaluateAstNode(x, staticContext);
    });
  }
  if (t__namespace.isUnaryExpression(ast) && ast.operator === "-") {
    const ret = evaluateAstNode(ast.argument, staticContext);
    if (ret === null || ret === void 0) {
      return null;
    }
    return -ret;
  }
  if (t__namespace.isTemplateLiteral(ast)) {
    let ret = "";
    for (let idx = -1, len = ast.quasis.length; ++idx < len; ) {
      const quasi = ast.quasis[idx];
      const expr = ast.expressions[idx];
      ret += quasi.value.raw;
      if (expr) {
        ret += evaluateAstNode(expr, staticContext);
      }
    }
    return ret;
  }
  if (t__namespace.isNullLiteral(ast))
    return null;
  if (t__namespace.isNumericLiteral(ast) || t__namespace.isStringLiteral(ast) || t__namespace.isBooleanLiteral(ast)) {
    return ast.value;
  }
  if (t__namespace.isBinaryExpression(ast)) {
    const left = evaluateAstNode(ast.left, staticContext);
    const right = evaluateAstNode(ast.right, staticContext);
    if (typeof left === "number" && typeof right === "number") {
      return evaluateBinaryExpression(left, right, ast.operator);
    }
  }
  return runAstInContext(ast, staticContext);
};
const valueToAst = (value) => {
  switch (typeof value) {
    case "number":
      return t__namespace.numericLiteral(value);
    case "string":
      return t__namespace.stringLiteral(value);
    case "boolean":
      return t__namespace.booleanLiteral(value);
    case "undefined":
      return t__namespace.unaryExpression("void", t__namespace.numericLiteral(0), true);
    case "object":
      if (value === null) {
        return t__namespace.nullLiteral();
      } else if (Array.isArray(value)) {
        return t__namespace.arrayExpression(value.map(valueToAst));
      }
      return t__namespace.objectExpression(
        Object.entries(value).map(
          ([key, value2]) => t__namespace.objectProperty(t__namespace.identifier(key), valueToAst(value2))
        )
      );
    default:
      throw new Error(`Cannot convert value to AST: ${String(value)}`);
  }
};
function evaluateBinaryExpression(left, right, operator) {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
    case "<":
      return left < right;
    case ">":
      return left > right;
    case "<=":
      return left <= right;
    case ">=":
      return left >= right;
    case "==":
      return left == right;
    case "!=":
      return left != right;
    case "===":
      return left === right;
    case "!==":
      return left !== right;
    default:
      return void 0;
  }
}

const transformComponent = (options, {
  componentBody,
  componentBodyPath
}, SHARED) => {
  const {
    isReact,
    file,
    callSite,
    callSitePath,
    Component,
    RawComponent,
    blockCache,
    originalComponent,
    globalPath,
    imports
  } = SHARED;
  if (!t__namespace.isBlockStatement(componentBody)) {
    throw createDeopt(
      "Expected a block statement for the component function body. Make sure you are using a function declaration or arrow function.",
      file,
      callSitePath
    );
  }
  const statementsInBody = componentBody.body.length;
  for (let i = 0; i < statementsInBody; ++i) {
    const node = componentBody.body[i];
    if (!t__namespace.isIfStatement(node))
      continue;
    if (t__namespace.isReturnStatement(node.consequent) || t__namespace.isBlockStatement(node.consequent) && // Look for an early return in the consequent block
    node.consequent.body.some((n) => t__namespace.isReturnStatement(n))) {
      const ifStatementPath = componentBodyPath.get(`body.${i}.consequent`);
      throw createDeopt(
        "You cannot use multiple returns in blocks. There can only be one return statement at the end of the block.",
        file,
        callSitePath,
        resolvePath(ifStatementPath)
      );
    }
    if (statementsInBody === i - 1 && !t__namespace.isReturnStatement(node)) {
      throw createDeopt(
        "There must be a return statement at the end of the block.",
        file,
        callSitePath,
        resolvePath(componentBodyPath.get(`body.${i}`))
      );
    }
  }
  const jsxPath = componentBodyPath.get("body").find((path) => path.isReturnStatement());
  const returnStatement = jsxPath.node;
  const handleTopLevelFragment = (jsx) => {
    trimJsxChildren(jsx);
    if (jsx.children.length === 1) {
      const child = jsx.children[0];
      if (t__namespace.isJSXElement(child)) {
        returnStatement.argument = child;
      } else if (t__namespace.isJSXExpressionContainer(child)) {
        if (t__namespace.isJSXEmptyExpression(child.expression)) {
          returnStatement.argument = t__namespace.nullLiteral();
        } else {
          returnStatement.argument = child.expression;
        }
      } else if (isJSXFragment(child)) {
        handleTopLevelFragment(child);
      }
    } else {
      const renderScopeId = t__namespace.jsxIdentifier(RENDER_SCOPE);
      returnStatement.argument = t__namespace.jsxElement(
        t__namespace.jsxOpeningElement(renderScopeId, []),
        t__namespace.jsxClosingElement(renderScopeId),
        jsx.children
      );
    }
  };
  if (isJSXFragment(returnStatement.argument)) {
    handleTopLevelFragment(returnStatement.argument);
  }
  const dynamics = {
    data: [],
    // expression value and id
    cache: /* @__PURE__ */ new Set(),
    // cache to check if id already exists to prevent dupes
    deferred: [],
    // callback (() => void) functions that run mutations on the JSX
    portalInfo: {
      index: -1,
      id: componentBodyPath.scope.generateUidIdentifier("portal")
    }
  };
  if (!t__namespace.isJSXElement(returnStatement.argument)) {
    throw createDeopt(null, file, callSitePath);
  }
  let masterComponentId = t__namespace.isIdentifier(originalComponent.id) ? originalComponent.id : getUniqueId(callSitePath, "M$");
  const puppetComponentId = getUniqueId(callSitePath, "P$");
  const block = imports.addNamed("block");
  const layers = extractLayers(
    options,
    {
      returnStatement,
      originalComponent,
      jsx: returnStatement.argument,
      jsxPath: jsxPath.get("argument"),
      layers: []
    });
  transformJSX(
    options,
    {
      jsx: returnStatement.argument,
      jsxPath: jsxPath.get("argument"),
      componentBody,
      componentBodyPath,
      dynamics,
      isRoot: true
    },
    SHARED
  );
  if (!dynamics.data.length && options.server) {
    throw createDeopt(null, file, callSitePath);
  }
  const isCallable = statementsInBody === 1 && layers.length === 0 && dynamics.portalInfo.index === -1;
  const holes = dynamics.data.map(({ id }) => id.name);
  const originalObjectExpression = callSite.arguments[1];
  const originalOptions = {};
  if (originalObjectExpression) {
    for (const prop of originalObjectExpression.properties) {
      if (t__namespace.isObjectProperty(prop) && t__namespace.isIdentifier(prop.key)) {
        originalOptions[prop.key.name] = prop.value;
      }
    }
  }
  const compiledOptions = [
    t__namespace.objectProperty(
      t__namespace.identifier("svg"),
      // we try to automatically detect if the component is an SVG
      t__namespace.booleanLiteral(
        originalOptions.svg ?? (t__namespace.isJSXElement(returnStatement.argument) && t__namespace.isJSXIdentifier(returnStatement.argument.openingElement.name) && SVG_ELEMENTS.includes(
          returnStatement.argument.openingElement.name.name
        ))
      )
    ),
    t__namespace.objectProperty(t__namespace.identifier("shouldUpdate"), createDirtyChecker(holes))
  ];
  const puppetFn = t__namespace.arrowFunctionExpression(
    [
      t__namespace.objectPattern(
        dynamics.data.map(({ id }) => t__namespace.objectProperty(id, id, false, true))
      )
    ],
    t__namespace.blockStatement([returnStatement])
  );
  const puppetBlock = t__namespace.callExpression(block, [
    puppetFn,
    t__namespace.objectExpression(normalizeProperties(compiledOptions))
  ]);
  t__namespace.addComment(puppetBlock, "leading", TRANSFORM_ANNOTATION);
  const data = [];
  if (dynamics.portalInfo.index !== -1) {
    const useState = imports.addNamed(
      "useState",
      isReact ? "react" : "preact/hooks"
    );
    data.push({
      id: dynamics.portalInfo.id,
      value: t__namespace.memberExpression(
        t__namespace.callExpression(useState, [
          t__namespace.arrowFunctionExpression(
            [],
            t__namespace.objectExpression([
              t__namespace.objectProperty(
                t__namespace.identifier("$"),
                t__namespace.newExpression(t__namespace.identifier("Array"), [
                  t__namespace.numericLiteral(dynamics.portalInfo.index + 1)
                ])
              )
            ])
          )
        ]),
        t__namespace.numericLiteral(0),
        true
      )
    });
  }
  for (const { id, value } of dynamics.data) {
    if (!value)
      continue;
    data.push({ id, value });
  }
  if (data.length) {
    jsxPath.insertBefore(
      t__namespace.variableDeclaration(
        "const",
        data.map(({ id, value }) => {
          return t__namespace.variableDeclarator(id, value);
        })
      )
    );
  }
  const puppetJsxAttributes = dynamics.data.map(
    ({ id }) => t__namespace.jsxAttribute(t__namespace.jsxIdentifier(id.name), t__namespace.jsxExpressionContainer(id))
  );
  if (options.hmr) {
    puppetJsxAttributes.push(
      t__namespace.jsxAttribute(
        t__namespace.jsxIdentifier("_hmr"),
        t__namespace.stringLiteral(String(Date.now()))
      )
    );
  }
  let puppetCall = t__namespace.jsxElement(
    t__namespace.jsxOpeningElement(
      t__namespace.jsxIdentifier(puppetComponentId.name),
      puppetJsxAttributes,
      true
    ),
    null,
    []
  );
  if (dynamics.portalInfo.index !== -1) {
    puppetCall = t__namespace.jsxFragment(t__namespace.jsxOpeningFragment(), t__namespace.jsxClosingFragment(), [
      puppetCall,
      t__namespace.jsxExpressionContainer(
        t__namespace.callExpression(
          t__namespace.memberExpression(
            t__namespace.memberExpression(dynamics.portalInfo.id, t__namespace.identifier("$")),
            t__namespace.identifier("map")
          ),
          [
            t__namespace.arrowFunctionExpression(
              [t__namespace.identifier("p")],
              t__namespace.memberExpression(t__namespace.identifier("p"), t__namespace.identifier("portal"))
            )
          ]
        )
      )
    ]);
  }
  if (layers.length) {
    let parent;
    let current;
    for (let i = 0; i < layers.length; ++i) {
      const layer = layers[i];
      if (!current) {
        current = layer;
        parent = current;
        continue;
      }
      current.children = [layer];
      current = layer;
    }
    current.children = [puppetCall];
    puppetCall = parent;
  }
  componentBody.body[data.length ? statementsInBody : statementsInBody - 1] = t__namespace.returnStatement(puppetCall);
  for (let i = 0; i < dynamics.deferred.length; ++i) {
    dynamics.deferred[i]?.();
  }
  if (t__namespace.isIdentifier(Component.id) && Component.id.name === masterComponentId.name) {
    masterComponentId = getUniqueId(globalPath, masterComponentId.name);
  }
  Component.id = masterComponentId;
  callSitePath.replaceWith(masterComponentId);
  globalPath.insertBefore(
    t__namespace.variableDeclaration("const", [
      t__namespace.variableDeclarator(puppetComponentId, puppetBlock)
    ])
  );
  if (isCallable) {
    globalPath.insertBefore(
      t__namespace.expressionStatement(
        t__namespace.assignmentExpression(
          "=",
          t__namespace.memberExpression(
            masterComponentId,
            t__namespace.identifier("__block_callable__")
          ),
          t__namespace.booleanLiteral(true)
        )
      )
    );
  }
  if (t__namespace.isIdentifier(RawComponent)) {
    blockCache.set(RawComponent.name, masterComponentId);
  }
  if (options.optimize) {
    const { variables, blockFactory } = optimize(
      options,
      {
        holes,
        jsx: returnStatement.argument
      },
      SHARED
    );
    globalPath.insertBefore(variables);
    const puppetBlockArguments = puppetBlock.arguments;
    puppetBlockArguments[0] = t__namespace.nullLiteral();
    puppetBlockArguments[1] = t__namespace.objectExpression([
      t__namespace.objectProperty(t__namespace.identifier("block"), blockFactory)
    ]);
  }
};
const extractLayers = (options, {
  returnStatement,
  originalComponent,
  jsx,
  jsxPath,
  layers
}, SHARED) => {
  const type = jsx.openingElement.name;
  if (t__namespace.isJSXIdentifier(type) && isComponent(type.name) || t__namespace.isJSXMemberExpression(type)) {
    trimJsxChildren(jsx);
    const firstChild = jsx.children[0];
    if (jsx.children.length === 1 && t__namespace.isJSXElement(firstChild)) {
      jsxPath.replaceWith(firstChild);
      returnStatement.argument = firstChild;
      jsx.children = [];
      layers.push(jsx);
      return extractLayers(
        options,
        {
          returnStatement,
          originalComponent,
          jsx: firstChild,
          jsxPath,
          layers
        });
    }
  }
  return layers;
};
const transformJSX = (options, {
  jsx,
  jsxPath,
  componentBody,
  componentBodyPath,
  dynamics,
  isRoot
}, SHARED) => {
  const { file, imports, unstable } = SHARED;
  const createDynamic = (identifier, expression, path, callback) => {
    if (expression && path) {
      let hasValidId = false;
      path.traverse({
        Identifier(path2) {
          if (path2.scope.hasBinding(path2.node.name)) {
            hasValidId = true;
            path2.stop();
          }
        }
      });
      if (!hasValidId)
        return;
    }
    const id = identifier || componentBodyPath.scope.generateUidIdentifier("");
    if (!dynamics.cache.has(id.name)) {
      dynamics.data.push({ value: expression, id });
      dynamics.cache.add(id.name);
    }
    dynamics.deferred.push(callback);
    return id;
  };
  let renderReactScope = null;
  const createPortal = (callback, _arguments) => {
    renderReactScope ?? (renderReactScope = imports.addNamed("renderReactScope"));
    const index = ++dynamics.portalInfo.index;
    const refCurrent = t__namespace.memberExpression(
      dynamics.portalInfo.id,
      t__namespace.identifier("$")
    );
    const nestedRender = t__namespace.callExpression(renderReactScope, [
      ..._arguments,
      refCurrent,
      t__namespace.numericLiteral(index),
      t__namespace.booleanLiteral(Boolean(options.server))
    ]);
    const id = createDynamic(null, nestedRender, null, callback);
    return id;
  };
  const type = jsx.openingElement.name;
  if (t__namespace.isJSXIdentifier(type) && isComponent(type.name)) {
    const id = createPortal(() => {
      jsxPath.replaceWith(
        isRoot ? t__namespace.expressionStatement(id) : t__namespace.jsxExpressionContainer(id)
      );
    }, [
      jsx,
      type.name === "For" ? t__namespace.booleanLiteral(false) : t__namespace.booleanLiteral(unstable)
    ]);
    return dynamics;
  }
  if (t__namespace.isJSXMemberExpression(type)) {
    const id = createPortal(() => {
      jsxPath.replaceWith(
        isRoot ? t__namespace.expressionStatement(id) : t__namespace.jsxExpressionContainer(id)
      );
    }, [jsx, t__namespace.booleanLiteral(unstable)]);
    return dynamics;
  }
  const { attributes } = jsx.openingElement;
  for (let i = 0, j = attributes.length; i < j; i++) {
    const attribute = attributes[i];
    if (t__namespace.isJSXSpreadAttribute(attribute)) {
      const spreadPath = jsxPath.get(`openingElement.attributes.${i}.argument`);
      warn(
        "Spread attributes are not fully supported.",
        file,
        resolvePath(spreadPath)
      );
      const id = createPortal(() => {
        jsxPath.replaceWith(
          isRoot ? t__namespace.expressionStatement(id) : t__namespace.jsxExpressionContainer(id)
        );
      }, [jsx, t__namespace.booleanLiteral(unstable)]);
      return dynamics;
    }
    if (t__namespace.isJSXIdentifier(attribute.name) && attribute.name.name === "style" && t__namespace.isJSXExpressionContainer(attribute.value) && t__namespace.isObjectExpression(attribute.value.expression)) {
      const styleObject = attribute.value.expression;
      const properties = styleObject.properties;
      let hasDynamic = false;
      for (let l = 0, k = properties.length; l < k; l++) {
        const property = properties[l];
        if (t__namespace.isObjectProperty(property)) {
          if (property.computed) {
            throw createDeopt(
              "Computed properties are not supported in style objects.",
              file,
              jsxPath
            );
          }
          const value = property.value;
          if (t__namespace.isBooleanLiteral(value) || t__namespace.isNullLiteral(value)) {
            if (t__namespace.isNullLiteral(value) || !value.value) {
              properties.splice(l, 1);
              l -= 2;
            } else if (t__namespace.isIdentifier(property.key)) {
              property.value = t__namespace.stringLiteral(property.key.name);
            }
          }
          if (t__namespace.isNumericLiteral(value) && t__namespace.isIdentifier(property.key) && !NO_PX_PROPERTIES.includes(property.key.name)) {
            property.value = t__namespace.stringLiteral(`${value.value}px`);
          }
          if (t__namespace.isIdentifier(value)) {
            createDynamic(value, null, null, null);
            hasDynamic = true;
          } else if (t__namespace.isLiteral(value) && !t__namespace.isTemplateLiteral(value)) {
            if (t__namespace.isStringLiteral(value)) {
              property.value = value;
            }
          } else {
            const expressionPath = jsxPath.get(
              `openingElement.attributes.${i}.value.expression.properties.${l}.value`
            );
            const id = createDynamic(
              null,
              value,
              resolvePath(expressionPath),
              () => {
                if (id)
                  property.value = id;
              }
            );
            hasDynamic = true;
          }
        } else {
          hasDynamic = true;
        }
      }
      if (!hasDynamic) {
        dynamics.deferred.push(() => {
          if (dynamics.portalInfo.index !== -1)
            return;
          attribute.value = t__namespace.stringLiteral(
            styleObject.properties.map((property) => {
              if (t__namespace.isObjectProperty(property)) {
                const value = property.value;
                const key = property.key;
                if (t__namespace.isIdentifier(key) && t__namespace.isLiteral(value)) {
                  let kebabKey = "";
                  for (let i2 = 0, j2 = key.name.length; i2 < j2; ++i2) {
                    const char = key.name.charCodeAt(i2);
                    if (char < 97) {
                      kebabKey += `-${String.fromCharCode(char + 32)}`;
                    } else {
                      kebabKey += key.name[i2];
                    }
                  }
                  if (t__namespace.isNullLiteral(value) || t__namespace.isRegExpLiteral(value) || t__namespace.isTemplateLiteral(value))
                    return "";
                  return `${kebabKey}:${String(value.value)}`;
                }
              }
              return null;
            }).filter((property) => property).join(";")
          );
        });
      }
      continue;
    }
    if (t__namespace.isJSXExpressionContainer(attribute.value)) {
      const attributeValue = attribute.value;
      const expressionPath = jsxPath.get(
        `openingElement.attributes.${i}.value.expression`
      );
      const { ast: expression, err } = evaluate(
        attributeValue.expression,
        resolvePath(expressionPath).scope
      );
      if (t__namespace.isJSXIdentifier(attribute.name) && hasStyledAttributes(attribute)) {
        const id = createPortal(() => {
          jsxPath.replaceWith(
            isRoot ? t__namespace.expressionStatement(id) : t__namespace.jsxExpressionContainer(id)
          );
        }, [jsx, t__namespace.booleanLiteral(unstable)]);
        return dynamics;
      }
      if (!err)
        attributeValue.expression = expression;
      if (t__namespace.isIdentifier(expression)) {
        if (attribute.name.name === "ref") {
          const id = createPortal(() => {
            jsxPath.replaceWith(
              isRoot ? t__namespace.expressionStatement(id) : t__namespace.jsxExpressionContainer(id)
            );
          }, [jsx, t__namespace.booleanLiteral(unstable)]);
          return dynamics;
        }
        createDynamic(expression, null, null, null);
      } else if (isStatic(expression)) {
        if (t__namespace.isStringLiteral(expression)) {
          attribute.value = expression;
        }
      } else {
        const id = createDynamic(
          null,
          expression,
          resolvePath(expressionPath),
          () => {
            if (id)
              attributeValue.expression = id;
          }
        );
      }
    }
  }
  for (let i = 0; i < jsx.children.length; i++) {
    const child = jsx.children[i];
    if (t__namespace.isJSXText(child))
      continue;
    if (t__namespace.isJSXSpreadChild(child)) {
      const spreadPath = jsxPath.get(`children.${i}`);
      warn(
        "Spread children are not fully supported.",
        file,
        resolvePath(spreadPath)
      );
      const id = createPortal(() => {
        jsxPath.replaceWith(t__namespace.jsxExpressionContainer(id));
      }, [jsx, t__namespace.booleanLiteral(unstable)]);
      continue;
    }
    if (isJSXFragment(child)) {
      jsx.children.splice(i, 1);
      jsx.children.splice(i, 0, ...child.children);
      i--;
      continue;
    }
    if (t__namespace.isJSXExpressionContainer(child)) {
      const expressionPath = jsxPath.get(`children.${i}.expression`);
      const { ast: expression, err } = evaluate(
        child.expression,
        resolvePath(expressionPath).scope
      );
      if (!err)
        child.expression = expression;
      if (t__namespace.isLiteral(expression) && !t__namespace.isTemplateLiteral(expression)) {
        if (t__namespace.isStringLiteral(expression)) {
          child.expression = expression;
        }
        continue;
      }
      if (t__namespace.isIdentifier(expression)) {
        createDynamic(expression, null, null, null);
        continue;
      }
      if (t__namespace.isJSXElement(expression)) {
        const type2 = expression.openingElement.name;
        if (t__namespace.isJSXIdentifier(type2) && !isComponent(type2.name)) {
          transformJSX(
            options,
            {
              jsx: expression,
              jsxPath: jsxPath.get(`children.${i}`),
              componentBody,
              componentBodyPath,
              dynamics,
              isRoot: false
            },
            SHARED
          );
          jsx.children[i] = expression;
          continue;
        }
        if (t__namespace.isJSXMemberExpression(type2)) {
          const id = createPortal(() => {
            jsx.children[i] = t__namespace.jsxExpressionContainer(id);
          }, [expression, t__namespace.booleanLiteral(unstable)]);
          continue;
        }
      }
      if (t__namespace.isExpression(expression)) {
        if (!err)
          child.expression = expression;
        const expressionPath2 = resolvePath(
          jsxPath.get(`children.${i}.expression`)
        );
        const hasSensitive = expressionPath2.parentPath?.isJSXExpressionContainer() && t__namespace.isJSXElement(expressionPath2.parentPath.parent) && isSensitiveElement(expressionPath2.parentPath.parent);
        if (t__namespace.isCallExpression(expression) && t__namespace.isMemberExpression(expression.callee) && t__namespace.isIdentifier(expression.callee.property, { name: "map" }) && !hasSensitive) {
          const For = imports.addNamed("For");
          const jsxFor = t__namespace.jsxIdentifier(For.name);
          const newJsxArrayIterator = t__namespace.jsxElement(
            t__namespace.jsxOpeningElement(jsxFor, [
              t__namespace.jsxAttribute(
                t__namespace.jsxIdentifier("each"),
                t__namespace.jsxExpressionContainer(expression.callee.object)
              )
            ]),
            t__namespace.jsxClosingElement(jsxFor),
            [t__namespace.jsxExpressionContainer(expression.arguments[0])]
          );
          const id2 = createPortal(() => {
            jsx.children[i] = t__namespace.jsxExpressionContainer(id2);
          }, [newJsxArrayIterator, t__namespace.booleanLiteral(unstable)]);
          continue;
        }
        if (t__namespace.isConditionalExpression(expression) || t__namespace.isLogicalExpression(expression)) {
          warn(
            "Conditional expressions will degrade performance. We recommend using deterministic returns instead.",
            file,
            resolvePath(expressionPath2),
            options.mute
          );
          const id2 = createPortal(() => {
            jsx.children[i] = t__namespace.jsxExpressionContainer(id2);
          }, [expression, t__namespace.booleanLiteral(unstable)]);
          continue;
        }
        let foundJsxInExpression = false;
        expressionPath2.traverse({
          JSXElement(path) {
            foundJsxInExpression = true;
            path.stop();
          },
          JSXFragment(path) {
            foundJsxInExpression = true;
            path.stop();
          }
        });
        if (foundJsxInExpression) {
          const id2 = createPortal(() => {
            if (hasSensitive) {
              return jsxPath.replaceWith(
                isRoot ? t__namespace.expressionStatement(id2) : t__namespace.jsxExpressionContainer(id2)
              );
            }
            jsx.children[i] = t__namespace.jsxExpressionContainer(id2);
          }, [hasSensitive ? jsx : expression, t__namespace.booleanLiteral(unstable)]);
          continue;
        }
        const id = createDynamic(
          null,
          expression,
          resolvePath(expressionPath2),
          () => {
            if (id)
              child.expression = id;
          }
        );
      }
      continue;
    }
    const jsxChildPath = resolvePath(jsxPath.get(`children.${i}`));
    transformJSX(
      options,
      {
        jsx: child,
        jsxPath: jsxChildPath,
        componentBody,
        componentBodyPath,
        dynamics,
        isRoot: false
      },
      SHARED
    );
  }
  return dynamics;
};

const callExpressionVisitor = (options = {}, isReact = true, unstable = false, valid = false) => {
  return (callSitePath, blockCache, file) => {
    const callSite = callSitePath.node;
    if (callSite.leadingComments?.some(
      (comment) => comment.value.startsWith(TRANSFORM_ANNOTATION)
    ))
      return;
    const globalPath = callSitePath.findParent(
      (path) => path.parentPath?.isProgram() || path.isProgram()
    );
    const programPath = callSitePath.findParent(
      (path) => path.isProgram()
    );
    const { bindings, aliases } = collectImportedBindings(programPath);
    if (!t__namespace.isIdentifier(callSite.callee) || !aliases[callSite.callee.name])
      return;
    if (callSite.leadingComments?.some(
      (comment) => comment.value.trim() === "@optimize"
    )) {
      options.optimize = true;
    }
    const blockCallBinding = callSitePath.scope.getBinding(
      callSite.callee.name
    );
    if (!blockCallBinding)
      return;
    const importDeclarationPath = blockCallBinding.path.parentPath;
    const importDeclaration = importDeclarationPath.node;
    const validSpecifiers = getValidSpecifiers(
      importDeclarationPath,
      aliases,
      file
    );
    const importSource = importDeclaration.source;
    importSource.value = resolveCorrectImportSource(
      options,
      importSource.value
    );
    if (validSpecifiers.includes("macro") && callSite.callee.name === "macro") {
      const declarator = callSitePath.parentPath.node;
      const id = declarator.id;
      const { ast, err } = evaluate(
        callSitePath.node.arguments[0],
        callSitePath.scope,
        ["React", id.name]
      );
      if (!err)
        callSitePath.replaceWith(ast);
      globalPath.scope.crawl();
      return;
    }
    if (!validSpecifiers.includes("block") && !valid)
      return;
    let RawComponent = callSite.arguments[0];
    if (t__namespace.isIdentifier(RawComponent) && blockCache.has(RawComponent.name)) {
      throw createDeopt(
        "Found duplicate block call. Make sure you are not calling block() more than once with the same component.",
        file,
        callSitePath
      );
    }
    const exportPath = callSitePath.parentPath;
    if (exportPath.isExportDefaultDeclaration()) {
      const exportName = getUniqueId(callSitePath, "M$");
      exportPath.insertBefore(
        t__namespace.variableDeclaration("const", [
          t__namespace.variableDeclarator(exportName, callSite)
        ])
      );
      exportPath.replaceWith(
        t__namespace.exportDefaultDeclaration(t__namespace.identifier(exportName.name))
      );
      return;
    }
    const isComponentAnonymous = t__namespace.isFunctionExpression(RawComponent) || t__namespace.isArrowFunctionExpression(RawComponent);
    if (isComponentAnonymous) {
      const isComponentNamed = t__namespace.isFunctionExpression(RawComponent) && t__namespace.isIdentifier(RawComponent.id);
      const anonymousComponentId = isComponentNamed ? t__namespace.identifier(`M$${RawComponent.id.name}`) : getUniqueId(globalPath, "M$");
      globalPath.insertBefore(
        t__namespace.variableDeclaration("const", [
          t__namespace.variableDeclarator(anonymousComponentId, RawComponent)
        ])
      );
      callSite.arguments[0] = anonymousComponentId;
    }
    if (!t__namespace.isIdentifier(RawComponent) && !t__namespace.isFunctionDeclaration(RawComponent) && !t__namespace.isFunctionExpression(RawComponent) && !t__namespace.isArrowFunctionExpression(RawComponent)) {
      if (t__namespace.isJSXElement(RawComponent) && t__namespace.isJSXIdentifier(RawComponent.openingElement.name)) {
        RawComponent = t__namespace.identifier(RawComponent.openingElement.name.name);
        callSite.arguments[0] = RawComponent;
        callSitePath.scope.crawl();
      } else {
        throw createDeopt(
          "Found unsupported argument for block. Make sure blocks consume a reference to a component function or the direct declaration.",
          file,
          callSitePath
        );
      }
    }
    callSitePath.scope.crawl();
    const componentDeclarationPath = callSitePath.scope.getBinding(
      isComponentAnonymous ? (
        // We know that the component is a identifier, so we can safely cast it.
        callSite.arguments[0].name
      ) : RawComponent.name
    ).path;
    if (componentDeclarationPath.isVariableDeclarator()) {
      const init = componentDeclarationPath.node.init;
      if (t__namespace.isCallExpression(init) && (t__namespace.isIdentifier(init.callee) && init.callee.name === "forwardRef" || t__namespace.isMemberExpression(init.callee) && t__namespace.isIdentifier(init.callee.property) && init.callee.property.name === "forwardRef")) {
        const forwardRefComponent = init.arguments[0];
        if (t__namespace.isIdentifier(forwardRefComponent) || t__namespace.isFunctionExpression(forwardRefComponent) || t__namespace.isArrowFunctionExpression(forwardRefComponent)) {
          const anonymousComponentId = getUniqueId(globalPath, "M$");
          componentDeclarationPath.parentPath.insertBefore(
            t__namespace.variableDeclaration("const", [
              t__namespace.variableDeclarator(
                anonymousComponentId,
                t__namespace.callExpression(t__namespace.identifier(bindings.block), [
                  forwardRefComponent
                ])
              )
            ])
          );
          init.arguments[0] = anonymousComponentId;
          const { parent, node } = callSitePath;
          if (t__namespace.isVariableDeclarator(parent) && "arguments" in node && t__namespace.isIdentifier(node.arguments[0])) {
            parent.init = node.arguments[0];
          }
          callSitePath.scope.crawl();
          return;
        }
      }
    }
    const Component = componentDeclarationPath.node;
    const originalComponent = t__namespace.cloneNode(Component);
    const SHARED = {
      file,
      callSitePath,
      callSite,
      Component,
      RawComponent,
      blockCache,
      originalComponent,
      importSource,
      globalPath,
      isReact,
      unstable,
      imports: {
        addNamed(name, source = importSource.value) {
          if (bindings[name]) {
            return t__namespace.identifier(bindings[name]);
          }
          return addNamedCache(name, source, callSitePath, programPath);
        }
      }
    };
    if (t__namespace.isVariableDeclarator(Component) && t__namespace.isArrowFunctionExpression(Component.init)) {
      if (!t__namespace.isBlockStatement(Component.init.body) && t__namespace.isJSXElement(Component.init.body)) {
        Component.init.body = t__namespace.blockStatement([
          t__namespace.returnStatement(Component.init.body)
        ]);
      }
      transformComponent(
        options,
        {
          componentBody: Component.init.body,
          componentBodyPath: resolvePath(
            componentDeclarationPath.get("init.body")
          )
        },
        SHARED
      );
    } else if (t__namespace.isFunctionDeclaration(Component)) {
      transformComponent(
        options,
        {
          componentBody: Component.body,
          componentBodyPath: resolvePath(
            componentDeclarationPath.get("body")
          )
        },
        SHARED
      );
    } else if (t__namespace.isImportSpecifier(Component)) {
      throw createDeopt(
        "You are using a component imported from another file. The component must be declared in the same file as the block.",
        file,
        componentDeclarationPath
      );
    } else {
      throw createDeopt(
        "You can only use block() with a function declaration or arrow function.",
        file,
        callSitePath
      );
    }
  };
};

const jsxElementVisitor = (options = {}, isReact = true) => {
  return (jsxElementPath, file) => {
    if (!isReact)
      return;
    const jsxElement = jsxElementPath.node;
    const programPath = jsxElementPath.findParent(
      (path) => path.isProgram()
    );
    const { bindings, aliases } = collectImportedBindings(programPath);
    const jsxId = jsxElement.openingElement.name;
    if (!t__namespace.isJSXIdentifier(jsxId) || !aliases[jsxId.name]) {
      return;
    }
    programPath.scope.crawl();
    const forComponentBinding = programPath.scope.getBinding(jsxId.name);
    if (!forComponentBinding) {
      throw createDeopt(
        "Unable to find AST binding for For. Check that the For component is imported correctly.",
        file,
        programPath
      );
    }
    const importDeclarationPath = forComponentBinding.path.parentPath;
    const importDeclaration = importDeclarationPath.node;
    const validSpecifiers = getValidSpecifiers(
      importDeclarationPath,
      aliases,
      file
    );
    const importSource = importDeclaration.source;
    importSource.value = resolveCorrectImportSource(
      options,
      importSource.value
    );
    const block = t__namespace.identifier(bindings.block ?? "block");
    if (!bindings.block) {
      importDeclaration.specifiers.push(t__namespace.importSpecifier(block, block));
    }
    if (!validSpecifiers.includes("For"))
      return;
    trimJsxChildren(jsxElement);
    if (jsxElement.children.length !== 1) {
      throw createDeopt(
        "For component must have exactly one child",
        file,
        jsxElementPath
      );
    }
    const child = jsxElement.children[0];
    if (!t__namespace.isJSXExpressionContainer(child)) {
      throw createDeopt(
        "For component must have exactly one child",
        file,
        jsxElementPath
      );
    }
    const expression = child.expression;
    if (!t__namespace.isArrowFunctionExpression(expression)) {
      throw createDeopt(
        "For component must consume a reference to an arrow function",
        file,
        jsxElementPath
      );
    }
    if (t__namespace.isBlockStatement(expression.body)) {
      const expressionPath = resolvePath(jsxElementPath.get("children"));
      const returnStatementPath = resolvePath(
        expressionPath.find((path) => path.isReturnStatement())
      );
      const argument = returnStatementPath.node.argument;
      if (!t__namespace.isJSXElement(argument) && !t__namespace.isJSXFragment(argument)) {
        return;
      }
    } else if (!t__namespace.isJSXElement(expression.body) && !t__namespace.isJSXFragment(expression.body)) {
      return;
    }
    const jsxElementParent = jsxElementPath.parent;
    if (t__namespace.isJSXElement(jsxElementParent)) {
      const type = jsxElementParent.openingElement.name;
      trimJsxChildren(jsxElementParent);
      if (t__namespace.isJSXIdentifier(type) && type.name.toLowerCase() === type.name && jsxElementParent.children.length === 1) {
        if (!jsxElement.openingElement.attributes.some((attr) => {
          if (t__namespace.isJSXAttribute(attr) && attr.name.name === "as") {
            return true;
          }
          return false;
        })) {
          const jsxElementClone = t__namespace.cloneNode(jsxElement);
          jsxElementClone.openingElement.attributes = removeDuplicateJSXAttributes([
            ...jsxElementClone.openingElement.attributes,
            ...jsxElementParent.openingElement.attributes,
            t__namespace.jsxAttribute(t__namespace.jsxIdentifier("as"), t__namespace.stringLiteral(type.name))
          ]);
          jsxElementPath.parent = jsxElementClone;
          return;
        }
      }
    }
    const callbackComponentId = programPath.scope.generateUidIdentifier("callback$");
    const blockComponentId = programPath.scope.generateUidIdentifier();
    const idNames = /* @__PURE__ */ new Set();
    for (const id of expression.params) {
      if (t__namespace.isIdentifier(id)) {
        idNames.add(id.name);
        continue;
      }
      if (t__namespace.isObjectPattern(id)) {
        for (const prop of id.properties) {
          if (t__namespace.isObjectProperty(prop)) {
            if (t__namespace.isIdentifier(prop.key)) {
              idNames.add(prop.key.name);
            } else if (t__namespace.isStringLiteral(prop.key)) {
              idNames.add(prop.key.value);
            }
          }
        }
      }
    }
    let bailout = false;
    jsxElementPath.traverse({
      JSXElement(path) {
        const jsxId2 = path.node.openingElement.name;
        if (t__namespace.isJSXIdentifier(jsxId2) && isComponent(jsxId2.name)) {
          path.stop();
          bailout = true;
        }
      },
      JSXAttribute(path) {
        const jsxId2 = path.node.name;
        if (!t__namespace.isJSXIdentifier(jsxId2))
          return;
        if (jsxId2.name === "ref" || hasStyledAttributes(path.node)) {
          path.stop();
          bailout = true;
        }
      },
      JSXSpreadAttribute(path) {
        path.stop();
        bailout = true;
      },
      JSXSpreadChild(path) {
        path.stop();
        bailout = true;
      },
      Identifier(path) {
        if (programPath.scope.hasBinding(path.node.name))
          return;
        const targetPath = path.parentPath;
        if (targetPath.isMemberExpression()) {
          if (!targetPath.node.computed && targetPath.node.object !== path.node)
            return;
          if (targetPath.parentPath.isCallExpression()) {
            if (targetPath.parentPath.node.callee !== targetPath.node)
              return;
          }
        }
        if (targetPath.isObjectProperty() && !targetPath.node.computed) {
          if (targetPath.node.key !== path.node)
            return;
        }
        if (targetPath.isObjectMethod() || targetPath.isJSXAttribute() || targetPath.isJSXOpeningElement() || targetPath.isJSXClosingElement()) {
          return;
        }
        if (targetPath.isFunctionExpression() || targetPath.isArrowFunctionExpression()) {
          const functionPath = resolvePath(targetPath);
          if (functionPath.node.params.some((param) => param === path.node)) {
            return;
          }
        }
        if (!jsxElementPath.scope.hasBinding(path.node.name))
          return;
        idNames.add(path.node.name);
      }
    });
    if (bailout)
      return jsxElementPath.stop();
    const ids = [...idNames].map((id) => t__namespace.identifier(id));
    const body = t__namespace.cloneNode(expression.body);
    const originalComponent = t__namespace.variableDeclaration("const", [
      t__namespace.variableDeclarator(
        callbackComponentId,
        t__namespace.arrowFunctionExpression(
          [
            t__namespace.objectPattern(
              ids.map((id) => t__namespace.objectProperty(id, id, false, true))
            )
          ],
          t__namespace.isBlockStatement(body) ? body : t__namespace.blockStatement([t__namespace.returnStatement(body)])
        )
      )
    ]);
    const blockComponent = t__namespace.variableDeclaration("const", [
      t__namespace.variableDeclarator(
        blockComponentId,
        t__namespace.callExpression(block, [callbackComponentId])
      )
    ]);
    programPath.node.body.push(originalComponent, blockComponent);
    expression.body = t__namespace.callExpression(blockComponentId, [
      t__namespace.objectExpression(ids.map((id) => t__namespace.objectProperty(id, id)))
    ]);
    const programBodyPath = programPath.get("body");
    const originalComponentPath = programBodyPath[programBodyPath.length - 1];
    if (!originalComponentPath || !resolvePath(originalComponentPath).isVariableDeclaration())
      return;
    const visitor = callExpressionVisitor(options, isReact, true, true);
    const callSitePath = originalComponentPath.get("declarations")[0].get("init");
    if (callSitePath.isCallExpression()) {
      callSitePath.scope.crawl();
      handleVisitorError(
        () => visitor(callSitePath, /* @__PURE__ */ new Map(), file),
        options.mute
      );
    }
  };
};

const componentVisitor = (options = {}, isReact = true) => {
  return (rawComponentPath, file) => {
    const rawComponent = rawComponentPath.node;
    const programPath = rawComponentPath.findParent(
      (path) => path.isProgram()
    );
    const isRawComponentPathInProgramScope = t__namespace.isIdentifier(rawComponent.id) && programPath.scope.hasOwnBinding(rawComponent.id.name);
    if (!isReact || !options.auto || !isRawComponentPathInProgramScope)
      return;
    const rawComponentParentPath = rawComponentPath.parentPath;
    if (rawComponentParentPath.isCallExpression() && t__namespace.isIdentifier(rawComponentParentPath.node.callee, { name: "block" }))
      return;
    let componentPath;
    if (typeof options.auto === "object" && options.auto.rsc) {
      const directives = programPath.node.directives;
      if (!directives.length)
        return;
      const hasUseClientDirective = directives.some((directive) => {
        return directive.value.value === "use client";
      });
      if (!hasUseClientDirective)
        return;
    }
    if (t__namespace.isVariableDeclarator(rawComponent)) {
      if (!t__namespace.isArrowFunctionExpression(rawComponent.init) && !t__namespace.isFunctionExpression(rawComponent.init)) {
        return;
      }
      if (t__namespace.isCallExpression(rawComponent.init) && t__namespace.isIdentifier(rawComponent.init, { name: "block" }))
        return;
      if (rawComponent.init.async)
        return;
      componentPath = rawComponentPath.get("init");
    } else {
      componentPath = rawComponentPath;
    }
    if (!t__namespace.isIdentifier(rawComponent.id))
      return;
    if (!isComponent(rawComponent.id.name))
      return;
    const globalPath = rawComponentPath.findParent(
      (path) => path.parentPath?.isProgram() || path.isProgram()
    );
    const comment = rawComponent.leadingComments?.[0] || rawComponentParentPath.node.leadingComments?.[0] || globalPath.node.leadingComments?.[0];
    if (comment?.value.includes("million-ignore")) {
      console.log(colors.dim(` \u25CB ${colors.yellow(`<${rawComponent.id.name}>`)} was ignored`));
      return;
    }
    const blockStatementPath = resolvePath(componentPath.get("body"));
    const returnStatementPath = blockStatementPath.get("body").find((path) => path.isReturnStatement());
    if (!returnStatementPath?.has("argument"))
      return;
    const argumentPath = resolvePath(returnStatementPath.get("argument"));
    if (!argumentPath.isJSXElement() && !argumentPath.isJSXFragment()) {
      return;
    }
    const info = {
      bailout: false,
      elements: 0,
      attributes: 0,
      components: 0,
      text: 0,
      expressions: 0,
      depth: 0,
      returns: 0
    };
    const skipIds = [];
    if (typeof options.auto === "object" && options.auto.skip) {
      skipIds.push(...options.auto.skip);
    }
    blockStatementPath.traverse({
      Identifier(path) {
        if (skipIds.some(
          (id) => typeof id === "string" ? path.node.name === id : id.test(path.node.name)
        )) {
          info.bailout = true;
          return path.stop();
        }
      },
      JSXElement(path) {
        const type = path.node.openingElement.name;
        if (t__namespace.isJSXMemberExpression(type)) {
          const isContext = t__namespace.isJSXIdentifier(type.object) && isComponent(type.property.name) && type.property.name === "Provider";
          const isSpecialElement = t__namespace.isJSXIdentifier(type.object);
          if (isContext) {
            info.bailout = true;
            return path.stop();
          }
          if (isSpecialElement) {
            info.components++;
            return path.skip();
          }
        }
        if (t__namespace.isJSXIdentifier(type) && isComponent(type.name)) {
          info.components++;
          return path.skip();
        }
        info.elements++;
      },
      JSXSpreadChild(path) {
        info.components++;
        path.skip();
      },
      JSXExpressionContainer(path) {
        if (t__namespace.isJSXEmptyExpression(path.node.expression))
          return;
        if (t__namespace.isCallExpression(path.node.expression) && t__namespace.isMemberExpression(path.node.expression.callee) && t__namespace.isIdentifier(path.node.expression.callee.property, { name: "map" })) {
          return;
        }
        if (t__namespace.isConditionalExpression(path.node.expression)) {
          info.components++;
          return path.skip();
        }
        if (!t__namespace.isLiteral(path.node.expression))
          info.expressions++;
        if (!t__namespace.isJSXAttribute(path.parent))
          path.skip();
      },
      JSXSpreadAttribute(path) {
        info.components++;
        path.skip();
      },
      JSXAttribute(path) {
        const attribute = path.node;
        if (hasStyledAttributes(attribute) || attribute.name.name === "ref") {
          info.components++;
          return path.skip();
        }
        if (!t__namespace.isLiteral(attribute.value))
          info.attributes++;
      },
      JSXText(path) {
        if (path.node.value.trim() !== "")
          info.text++;
      },
      ReturnStatement(path) {
        if (path.scope !== returnStatementPath.scope)
          return;
        info.returns++;
        if (info.returns > 1) {
          info.bailout = true;
          return path.stop();
        }
      }
    });
    const averageDepth = calcAverageTreeDepth(
      resolvePath(argumentPath).node
    );
    const good = info.elements + info.attributes + info.text;
    const bad = info.components + info.expressions;
    const improvement = (good - bad) / (good + bad);
    const threshold = typeof options.auto === "object" && options.auto.threshold ? options.auto.threshold : 0.1 - averageDepth * 0.01;
    if (isNaN(improvement) || improvement <= threshold || info.bailout || good < 5) {
      return;
    }
    const improvementFormatted = isFinite(improvement) ? (improvement * 100).toFixed(0) : "\u221E";
    if (!options.mute || options.mute === "info") {
      console.log(
        styleSecondaryMessage(
          `${colors.yellow(`<${rawComponent.id.name}>`)} now renders ${colors.green(
            colors.underline(`~${improvementFormatted}%`)
          )} faster`,
          " \u26A1 "
        )
      );
    }
    const block = programPath.scope.hasBinding("block") ? t__namespace.identifier("block") : addNamedCache(
      "block",
      options.server ? "million/react-server" : "million/react",
      rawComponentPath,
      programPath
    );
    const rewrittenComponentNode = t__namespace.variableDeclaration("const", [
      t__namespace.variableDeclarator(
        rawComponent.id,
        t__namespace.callExpression(block, [
          t__namespace.isFunctionDeclaration(componentPath.node) ? t__namespace.functionExpression(
            rawComponent.id,
            componentPath.node.params,
            componentPath.node.body
          ) : componentPath.node
        ])
      )
    ]);
    let rewrittenVariableDeclarationPath;
    if (rawComponentParentPath.isExportNamedDeclaration()) {
      rawComponentParentPath.replaceWith(
        t__namespace.exportNamedDeclaration(null, [
          t__namespace.exportSpecifier(rawComponent.id, rawComponent.id)
        ])
      );
      rewrittenVariableDeclarationPath = rawComponentParentPath.insertBefore(
        rewrittenComponentNode
      )[0];
    } else if (rawComponentParentPath.isExportDefaultDeclaration()) {
      rawComponentPath.replaceWith(rawComponent.id);
      rewrittenVariableDeclarationPath = rawComponentParentPath.insertBefore(
        rewrittenComponentNode
      )[0];
    } else if (rawComponentPath.isVariableDeclarator()) {
      rewrittenVariableDeclarationPath = rawComponentParentPath.replaceWith(
        rewrittenComponentNode
      )[0];
    } else {
      rewrittenVariableDeclarationPath = rawComponentPath.replaceWith(
        rewrittenComponentNode
      )[0];
    }
    const rewrittenComponentPath = resolvePath(
      rewrittenVariableDeclarationPath
    ).get("declarations.0.init");
    rewrittenComponentPath.scope.crawl();
    const visitor = callExpressionVisitor(
      { mute: "info", ...options },
      isReact,
      false,
      true
    );
    handleVisitorError(
      () => visitor(rewrittenComponentPath, /* @__PURE__ */ new Map(), file),
      "info"
    );
  };
};
const calcAverageTreeDepth = (jsx, stack = [{ node: jsx, depth: 0 }], depths = []) => {
  if (t__namespace.isJSXText(jsx) || t__namespace.isJSXSpreadChild(jsx))
    return depths.length;
  while (stack.length > 0) {
    const current = stack.pop();
    const node = current.node;
    const depth = current.depth;
    if (t__namespace.isJSXText(node) || t__namespace.isJSXSpreadChild(node))
      continue;
    if (t__namespace.isJSXExpressionContainer(node)) {
      depths.push(depth);
    } else {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        calcAverageTreeDepth(child, stack, depths);
        stack.push({ node: child, depth: depth + 1 });
      }
    }
  }
  if (depths.length === 0)
    return 0;
  if (depths.length === 1)
    return depths[0];
  const sum = depths.reduce((a, b) => a + b, 0);
  return sum / depths.length;
};

let hasIntroRan = false;
const intro = () => {
  if (hasIntroRan)
    return;
  hasIntroRan = true;
  const tips = [
    `use ${colors.dim("// million-ignore")} for errors`,
    `enable { mute: true } to disable info logs`
  ];
  console.log(`
  ${colors.bold(
    colors.magenta(`\u26A1 Million.js ${"2.6.4" }`)
  )}
  - Tip:     ${tips[Math.floor(Math.random() * tips.length)]}
  - Hotline: ${colors.cyan("https://million.dev/hotline")}
`);
};
const unplugin = unplugin$1.createUnplugin((options) => {
  options ?? (options = {});
  return {
    enforce: "pre",
    name: "million",
    transformInclude(id) {
      return /\.[jt]sx$/.test(id);
    },
    async transform(code, id) {
      options._file = id;
      const plugins = [[pluginSyntaxJsx__default]];
      const isTSX = id.endsWith(".tsx");
      if (isTSX) {
        plugins.push([
          pluginSyntaxTypescript__default,
          { allExtensions: true, isTSX: true }
        ]);
      }
      plugins.push([babelPlugin, options]);
      const result = await core.transformAsync(code, { plugins, filename: id });
      return result?.code || null;
    },
    vite: {
      configResolved(config) {
        options.hmr = config.server.hmr && !config.isProduction && config.command !== "build";
      }
    }
  };
});
const babelPlugin = declare_1((api, options) => {
  api.assertVersion(7);
  intro();
  const file = options._file;
  let callExpressionVisitor$1;
  let jsxElementVisitor$1;
  let componentVisitor$1;
  if (options.mode?.endsWith("-server")) {
    options.server = true;
    options.mode = options.mode.replace("-server", "");
  }
  switch (options.mode) {
    case "vdom":
      callExpressionVisitor$1 = visitor(options);
      break;
    case "preact":
      callExpressionVisitor$1 = callExpressionVisitor(options, false);
      jsxElementVisitor$1 = jsxElementVisitor(options, false);
      componentVisitor$1 = componentVisitor(options, false);
      break;
    case "react":
    default:
      callExpressionVisitor$1 = callExpressionVisitor(options, true);
      jsxElementVisitor$1 = jsxElementVisitor(options, true);
      componentVisitor$1 = componentVisitor(options, true);
      break;
  }
  const blockCache = /* @__PURE__ */ new Map();
  const plugin = {
    name: "million",
    visitor: {
      JSXElement(path) {
        handleVisitorError(() => {
          if (!jsxElementVisitor$1)
            return;
          jsxElementVisitor$1(path, file);
        }, options.mute);
      },
      CallExpression(path) {
        handleVisitorError(() => {
          callExpressionVisitor$1(path, blockCache, file);
        }, options.mute);
      },
      FunctionDeclaration(path) {
        handleVisitorError(() => {
          if (!componentVisitor$1)
            return;
          componentVisitor$1(path, file);
        }, options.mute);
      },
      VariableDeclarator(path) {
        handleVisitorError(() => {
          if (!componentVisitor$1)
            return;
          componentVisitor$1(path, file);
        }, options.mute);
      }
    },
    post() {
      blockCache.clear();
    }
  };
  return plugin;
});

const vite = unplugin.vite;
const webpack = unplugin.webpack;
const rollup = unplugin.rollup;
const rspack = unplugin.rspack;
const esbuild = unplugin.esbuild;
const next = (nextConfig = {}, overrideOptions = {}) => {
  const millionOptions = {
    mode: "react",
    server: true,
    ...overrideOptions
  };
  return {
    ...nextConfig,
    webpack(config, webpackOptions) {
      config.plugins.unshift(
        webpack({
          mute: webpackOptions.isServer,
          ...millionOptions
        })
      );
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, webpackOptions);
      }
      return config;
    }
  };
};
const index = {
  vite,
  webpack,
  rollup,
  rspack,
  esbuild,
  next,
  unplugin,
  babel: babelPlugin
};

exports.default = index;
exports.esbuild = esbuild;
exports.next = next;
exports.rollup = rollup;
exports.rspack = rspack;
exports.vite = vite;
exports.webpack = webpack;
