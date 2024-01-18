'use client';
import { useRef, useCallback, useMemo, createElement, Fragment, useState, useEffect, memo } from 'react';
import { b as block$1, q as queueMicrotask$, m as mount$, p as patch, a as arrayPatch$, c as mapArray, d as arrayMount$ } from '../shared/million.52d69b41.mjs';
import { a as MapHas$, c as MapSet$, b as MapGet$ } from '../shared/million.8ff20917.mjs';
import { u as unwrap, a as REGISTRY, p as processProps, E as Effect, S as SVG_RENDER_SCOPE, R as RENDER_SCOPE, r as renderReactScope } from '../shared/million.4d88fdd9.mjs';
import 'react-dom';

const block = (fn, { block: compiledBlock, shouldUpdate, svg, as } = {}) => {
  const block2 = fn ? block$1(fn, unwrap, shouldUpdate, svg) : compiledBlock;
  const defaultType = svg ? SVG_RENDER_SCOPE : RENDER_SCOPE;
  const MillionBlock = (props, forwardedRef) => {
    const hmrTimestamp = props._hmr;
    const ref = useRef(null);
    const patch$1 = useRef(null);
    const portalRef = useRef([]);
    props = processProps(props, forwardedRef, portalRef.current);
    patch$1.current?.(props);
    const effect = useCallback(() => {
      if (!ref.current)
        return;
      const currentBlock = block2(props, props.key);
      if (hmrTimestamp)
        ref.current.textContent = "";
      if (patch$1.current === null || hmrTimestamp) {
        queueMicrotask$(() => {
          mount$.call(currentBlock, ref.current, null);
        });
        patch$1.current = (props2) => {
          queueMicrotask$(() => {
            patch(currentBlock, block2(props2, props2.key, shouldUpdate));
          });
        };
      }
    }, []);
    const marker = useMemo(() => {
      return createElement(as ?? defaultType, { ref });
    }, []);
    const vnode = createElement(
      Fragment,
      null,
      marker,
      createElement(Effect, {
        effect,
        deps: hmrTimestamp ? [hmrTimestamp] : []
      }),
      ...portalRef.current.map((p) => p.portal)
    );
    return vnode;
  };
  if (!MapHas$.call(REGISTRY, MillionBlock)) {
    MapSet$.call(REGISTRY, MillionBlock, block2);
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
  const ref = useRef(null);
  const [portals] = useState(() => ({
    current: Array(each.length)
  }));
  const fragmentRef = useRef(null);
  const cache = useRef({
    each: null,
    children: null,
    mounted: false
  });
  const [, setMountPortals] = useState(false);
  if (fragmentRef.current && (each !== cache.current.each || !memo2)) {
    queueMicrotask$(() => {
      const newChildren = createChildren(
        each,
        children,
        cache,
        portals,
        memo2
      );
      arrayPatch$.call(fragmentRef.current, mapArray(newChildren));
    });
  }
  const defaultType = svg ? SVG_RENDER_SCOPE : RENDER_SCOPE;
  const MillionFor = createElement(
    Fragment,
    null,
    createElement(as ?? defaultType, { ...rest, ref }),
    ...portals.current.map((p) => p.portal)
  );
  useEffect(() => {
    if (!ref.current || fragmentRef.current)
      return;
    queueMicrotask$(() => {
      if (cache.current.mounted)
        return;
      const newChildren = createChildren(
        each,
        children,
        cache,
        portals,
        memo2
      );
      fragmentRef.current = mapArray(newChildren);
      if (!MapHas$.call(REGISTRY, MillionFor)) {
        MapSet$.call(REGISTRY, MillionFor, fragmentRef.current);
      }
      arrayMount$.call(fragmentRef.current, ref.current);
      cache.current.mounted = true;
      setMountPortals(true);
    });
  }, [ref.current]);
  return MillionFor;
};
const typedMemo = memo;
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
    if (MapHas$.call(REGISTRY, vnode.type)) {
      if (!currentCache.block) {
        currentCache.block = MapGet$.call(REGISTRY, vnode.type);
      }
      children[i] = currentCache.block(vnode.props, i);
      continue;
    }
    if (typeof vnode.type === "function" && "__block_callable__" in vnode.type) {
      const puppetComponent = vnode.type(vnode.props);
      if (MapHas$.call(REGISTRY, puppetComponent.type)) {
        const puppetBlock = MapGet$.call(REGISTRY, puppetComponent.type);
        if (typeof puppetBlock === "function") {
          children[i] = puppetBlock(puppetComponent.props);
          continue;
        }
      }
    }
    const block = block$1((props) => props?.scope);
    const currentBlock = (props, index) => {
      return block(
        {
          scope: renderReactScope(
            createElement(vnode.type, props),
            false,
            portals.current,
            index,
            false
          )
        },
        vnode.key ? String(vnode.key) : void 0
      );
    };
    MapSet$.call(REGISTRY, vnode.type, currentBlock);
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

export { For, REGISTRY, block, macro, renderReactScope, shutUpReact, unwrap };
