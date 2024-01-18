'use client';
import { useEffect, createElement, isValidElement, Fragment } from 'react';
import { createPortal } from 'react-dom';

const RENDER_SCOPE = "slot";
const SVG_RENDER_SCOPE = "g";
const Effect = ({
  effect,
  deps
}) => {
  useEffect(effect, deps || []);
  return null;
};
const REGISTRY = /* @__PURE__ */ new Map();

const processProps = (props, ref, portals) => {
  const processedProps = { ref };
  let currentIndex = 0;
  for (const key in props) {
    const value = props[key];
    if (isValidElement(value)) {
      processedProps[key] = renderReactScope(
        value,
        false,
        portals,
        currentIndex++,
        false
      );
      continue;
    }
    processedProps[key] = props[key];
  }
  return processedProps;
};
const renderReactScope = (vnode, unstable, portals, currentIndex, server) => {
  const el = portals?.[currentIndex]?.current;
  if (typeof window === "undefined" || server && !el) {
    return createElement(
      RENDER_SCOPE,
      { suppressHydrationWarning: true },
      vnode
    );
  }
  if (isValidElement(vnode) && typeof vnode.type === "function" && "__block_callable__" in vnode.type) {
    const puppetComponent = vnode.type(vnode.props);
    if (REGISTRY.has(puppetComponent.type)) {
      const puppetBlock = REGISTRY.get(puppetComponent.type);
      if (typeof puppetBlock === "function") {
        return puppetBlock(puppetComponent.props);
      }
    }
  }
  const current = el ?? document.createElement(RENDER_SCOPE);
  const reactPortal = createPortal(vnode, current);
  const millionPortal = {
    foreign: true,
    current,
    portal: reactPortal,
    unstable
  };
  if (portals)
    portals[currentIndex] = millionPortal;
  return millionPortal;
};
const unwrap = (vnode) => {
  if (typeof vnode !== "object" || vnode === null || !("type" in vnode)) {
    if (typeof vnode === "number") {
      return String(vnode);
    }
    return vnode;
  }
  let type = vnode.type;
  if (typeof type === "function") {
    return unwrap(type(vnode.props ?? {}));
  }
  if (typeof type === "object" && "$" in type)
    return type;
  const props = { ...vnode.props };
  if ("css" in props && "__EMOTION_TYPE_PLEASE_DO_NOT_USE__" in props) {
    props.style = props.css.styles;
    type = props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__;
    delete props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__;
    delete props.css;
  }
  const children = vnode.props?.children;
  if (children !== void 0 && children !== null) {
    props.children = flatten(vnode.props.children).map(
      (child) => unwrap(child)
    );
  }
  return {
    type,
    // lets pretend no function go through
    props
  };
};
const flatten = (rawChildren) => {
  if (rawChildren === void 0 || rawChildren === null)
    return [];
  if (typeof rawChildren === "object" && "type" in rawChildren && rawChildren.type === Fragment) {
    return flatten(rawChildren.props.children);
  }
  if (!Array.isArray(rawChildren) || typeof rawChildren === "object" && "$" in rawChildren) {
    return [rawChildren];
  }
  const flattenedChildren = rawChildren.flat(Infinity);
  const children = [];
  for (let i = 0, l = flattenedChildren.length; i < l; ++i) {
    children.push(...flatten(flattenedChildren[i]));
  }
  return children;
};

export { Effect as E, RENDER_SCOPE as R, SVG_RENDER_SCOPE as S, REGISTRY as a, processProps as p, renderReactScope as r, unwrap as u };
