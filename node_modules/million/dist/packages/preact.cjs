'use client';
'use strict';

const preact = require('preact');
const hooks = require('preact/hooks');
const packages_million = require('../shared/million.f5f8635c.cjs');
const constants = require('../shared/million.71606d8d.cjs');
const utils = require('../shared/million.f841e618.cjs');

const REGISTRY = new constants.Map$();
const block = (fn, options = {}) => {
  const block2 = constants.MapHas$.call(REGISTRY, fn) ? constants.MapGet$.call(REGISTRY, fn) : fn ? packages_million.block(fn, utils.unwrap, options.shouldUpdate) : options.block;
  function MillionBlock(props) {
    const ref = hooks.useRef(null);
    const patch = hooks.useRef(null);
    utils.processProps(props);
    patch.current?.(props);
    const effect = hooks.useCallback(() => {
      const currentBlock = block2(props, props.key, options.shouldUpdate);
      if (ref.current && patch.current === null) {
        packages_million.queueMicrotask$(() => {
          packages_million.mount$.call(currentBlock, ref.current, null);
        });
        patch.current = (props2) => {
          packages_million.queueMicrotask$(() => {
            packages_million.patch(currentBlock, block2(props2));
          });
        };
      }
    }, []);
    const marker = hooks.useMemo(() => {
      return preact.h(utils.RENDER_SCOPE, { ref });
    }, []);
    const vnode = preact.h(preact.Fragment, null, marker, preact.h(utils.Effect, { effect }));
    return vnode;
  }
  if (!constants.MapHas$.call(REGISTRY, MillionBlock)) {
    constants.MapSet$.call(REGISTRY, MillionBlock, block2);
  }
  return MillionBlock;
};

const For = ({ each, children }) => {
  const ref = hooks.useRef(null);
  const fragmentRef = hooks.useRef(null);
  const cache = hooks.useRef({
    each: null,
    children: null,
    mounted: false
  });
  if (fragmentRef.current && each !== cache.current.each) {
    packages_million.queueMicrotask$(() => {
      const newChildren = createChildren(each, children, cache);
      packages_million.arrayPatch$.call(fragmentRef.current, packages_million.mapArray(newChildren));
    });
  }
  hooks.useEffect(() => {
    if (fragmentRef.current)
      return;
    packages_million.queueMicrotask$(() => {
      const newChildren = createChildren(each, children, cache);
      fragmentRef.current = packages_million.mapArray(newChildren);
      packages_million.arrayMount$.call(fragmentRef.current, ref.current);
    });
  }, []);
  return preact.h(utils.RENDER_SCOPE, { ref });
};
const createChildren = (each, getComponent, cache) => {
  const children = Array(each.length);
  const currentCache = cache.current;
  for (let i = 0, l = each.length; i < l; ++i) {
    if (currentCache.each && currentCache.each[i] === each[i]) {
      children[i] = currentCache.children?.[i];
      continue;
    }
    const vnode = getComponent(each[i], i);
    if (constants.MapHas$.call(REGISTRY, vnode.type)) {
      if (!currentCache.block) {
        currentCache.block = constants.MapGet$.call(REGISTRY, vnode.type);
      }
      if (cache.current.block) {
        children[i] = cache.current.block(vnode.props);
      }
    } else {
      const block = packages_million.block((props) => {
        return {
          type: utils.RENDER_SCOPE,
          props: { children: [props?.__scope] }
        };
      });
      const currentBlock = (props) => {
        return block({
          props,
          __scope: utils.renderPreactScope(preact.h(vnode.type, props))
        });
      };
      constants.MapSet$.call(REGISTRY, vnode.type, currentBlock);
      currentCache.block = currentBlock;
      children[i] = currentBlock(vnode.props);
    }
  }
  currentCache.each = each;
  currentCache.children = children;
  return children;
};

exports.renderReactScope = utils.renderPreactScope;
exports.unwrap = utils.unwrap;
exports.For = For;
exports.REGISTRY = REGISTRY;
exports.block = block;
