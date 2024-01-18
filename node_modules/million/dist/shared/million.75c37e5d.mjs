'use client';
import { render, Fragment, isValidElement } from 'preact';
import { useEffect } from 'preact/hooks';

const RENDER_SCOPE = "slot";
const Effect = ({ effect }) => {
  useEffect(effect, []);
  return null;
};

const processProps = (props) => {
  const processedProps = {};
  for (const key in props) {
    const value = props[key];
    if (isValidElement(value)) {
      processedProps[key] = renderPreactScope(value);
      continue;
    }
    processedProps[key] = props[key];
  }
  return processedProps;
};
const renderPreactScope = (vnode) => {
  return (el) => {
    const parent = el ?? document.createElement(RENDER_SCOPE);
    render(vnode, parent);
    return parent;
  };
};
const unwrap = (vnode) => {
  if (typeof vnode !== "object" || vnode === null || !("type" in vnode)) {
    if (typeof vnode === "number") {
      return String(vnode);
    }
    return vnode;
  }
  const type = vnode.type;
  if (typeof type === "function") {
    return unwrap(type(vnode.props ?? {}));
  }
  if (typeof type === "object" && "$" in type)
    return type;
  const props = { ...vnode.props };
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

export { Effect as E, RENDER_SCOPE as R, processProps as p, renderPreactScope as r, unwrap as u };
