'use client';
'use strict';

const react = require('react');
const packages_million = require('../shared/million.f5f8635c.cjs');
const constants = require('../shared/million.71606d8d.cjs');
const utils = require('../shared/million.2e616cd4.cjs');
require('react-dom');

const block = (fn, { block: compiledBlock, shouldUpdate, svg, as } = {}) => {
  const block2 = fn ? packages_million.block(fn, utils.unwrap, shouldUpdate, svg) : compiledBlock;
  const defaultType = svg ? utils.SVG_RENDER_SCOPE : utils.RENDER_SCOPE;
  const MillionBlock = (props, forwardedRef) => {
    const hmrTimestamp = props._hmr;
    const ref = react.useRef(null);
    const patch = react.useRef(null);
    const portalRef = react.useRef([]);
    props = utils.processProps(props, forwardedRef, portalRef.current);
    patch.current?.(props);
    const effect = react.useCallback(() => {
      if (!ref.current)
        return;
      const currentBlock = block2(props, props.key);
      if (hmrTimestamp)
        ref.current.textContent = "";
      if (patch.current === null || hmrTimestamp) {
        packages_million.queueMicrotask$(() => {
          packages_million.mount$.call(currentBlock, ref.current, null);
        });
        patch.current = (props2) => {
          packages_million.queueMicrotask$(() => {
            packages_million.patch(currentBlock, block2(props2, props2.key, shouldUpdate));
          });
        };
      }
    }, []);
    const marker = react.useMemo(() => {
      return react.createElement(as ?? defaultType, { ref });
    }, []);
    const vnode = react.createElement(
      react.Fragment,
      null,
      marker,
      react.createElement(utils.Effect, {
        effect,
        deps: hmrTimestamp ? [hmrTimestamp] : []
      }),
      ...portalRef.current.map((p) => p.portal)
    );
    return vnode;
  };
  if (!constants.MapHas$.call(utils.REGISTRY, MillionBlock)) {
    constants.MapSet$.call(utils.REGISTRY, MillionBlock, block2);
  }
  return MillionBlock;
};

const MillionArray = ({
  each,
  children,
  memo: memo2,
  svg,
  as,
  ...rest
}) => {
  const ref = react.useRef(null);
  const [portals] = react.useState(() => ({
    current: Array(each.length)
  }));
  const fragmentRef = react.useRef(null);
  const cache = react.useRef({
    each: null,
    children: null,
    mounted: false
  });
  const [, setMountPortals] = react.useState(false);
  if (fragmentRef.current && (each !== cache.current.each || !memo2)) {
    packages_million.queueMicrotask$(() => {
      const newChildren = createChildren(
        each,
        children,
        cache,
        portals,
        memo2
      );
      packages_million.arrayPatch$.call(fragmentRef.current, packages_million.mapArray(newChildren));
    });
  }
  const defaultType = svg ? utils.SVG_RENDER_SCOPE : utils.RENDER_SCOPE;
  const MillionFor = react.createElement(
    react.Fragment,
    null,
    react.createElement(as ?? defaultType, { ...rest, ref }),
    ...portals.current.map((p) => p.portal)
  );
  react.useEffect(() => {
    if (!ref.current || fragmentRef.current)
      return;
    packages_million.queueMicrotask$(() => {
      if (cache.current.mounted)
        return;
      const newChildren = createChildren(
        each,
        children,
        cache,
        portals,
        memo2
      );
      fragmentRef.current = packages_million.mapArray(newChildren);
      if (!constants.MapHas$.call(utils.REGISTRY, MillionFor)) {
        constants.MapSet$.call(utils.REGISTRY, MillionFor, fragmentRef.current);
      }
      packages_million.arrayMount$.call(fragmentRef.current, ref.current);
      cache.current.mounted = true;
      setMountPortals(true);
    });
  }, [ref.current]);
  return MillionFor;
};
const typedMemo = react.memo;
const For = typedMemo(MillionArray);
const createChildren = (each, getComponent, cache, portals, memo2) => {
  const children = Array(each.length);
  const currentCache = cache.current;
  for (let i = 0, l = each.length; i < l; ++i) {
    if (memo2 && currentCache.each && currentCache.each[i] === each[i]) {
      children[i] = currentCache.children?.[i];
      continue;
    }
    const vnode = getComponent(each[i], i);
    if (constants.MapHas$.call(utils.REGISTRY, vnode.type)) {
      if (!currentCache.block) {
        currentCache.block = constants.MapGet$.call(utils.REGISTRY, vnode.type);
      }
      children[i] = currentCache.block(vnode.props, i);
      continue;
    }
    if (typeof vnode.type === "function" && "__block_callable__" in vnode.type) {
      const puppetComponent = vnode.type(vnode.props);
      if (constants.MapHas$.call(utils.REGISTRY, puppetComponent.type)) {
        const puppetBlock = constants.MapGet$.call(utils.REGISTRY, puppetComponent.type);
        if (typeof puppetBlock === "function") {
          children[i] = puppetBlock(puppetComponent.props);
          continue;
        }
      }
    }
    const block = packages_million.block((props) => props?.scope);
    const currentBlock = (props, index) => {
      return block(
        {
          scope: utils.renderReactScope(
            react.createElement(vnode.type, props),
            false,
            portals.current,
            index,
            false
          )
        },
        vnode.key ? String(vnode.key) : void 0
      );
    };
    constants.MapSet$.call(utils.REGISTRY, vnode.type, currentBlock);
    currentCache.block = currentBlock;
    children[i] = currentBlock(vnode.props, i);
  }
  currentCache.each = each;
  currentCache.children = children;
  return children;
};

const shutUpReact = () => {
  const consoleOverride = (callback) => (message, ...rest) => {
    if (message.startsWith("Warning:") || message.startsWith("Invalid hook call."))
      return;
    callback(message, rest);
  };
  console.warn = consoleOverride(console.warn);
  console.error = consoleOverride(console.error);
};

const macro = (expression) => expression;

exports.REGISTRY = utils.REGISTRY;
exports.renderReactScope = utils.renderReactScope;
exports.unwrap = utils.unwrap;
exports.For = For;
exports.block = block;
exports.macro = macro;
exports.shutUpReact = shutUpReact;
