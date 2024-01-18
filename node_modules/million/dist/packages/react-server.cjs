'use client';
'use strict';

const react = require('react');
const utils = require('../shared/million.2e616cd4.cjs');
require('react-dom');

let millionModule;
const block = (Component, options = {}) => {
  let blockFactory = millionModule ? millionModule.block(Component, options) : null;
  function MillionBlockLoader(props) {
    const [ready, setReady] = react.useState(Boolean(blockFactory));
    react.useEffect(() => {
      if (!blockFactory) {
        const importSource = async () => {
          if (!props)
            return;
          if (!millionModule)
            millionModule = await import('./react.cjs');
          blockFactory = millionModule.block(Component, options);
          setReady(true);
        };
        try {
          void importSource();
        } catch (e) {
          throw new Error("Failed to load Million.js");
        }
      }
      return () => {
        blockFactory = null;
      };
    }, []);
    if (!ready || !blockFactory) {
      if (options.ssr === false)
        return null;
      return react.createElement(
        utils.RENDER_SCOPE,
        null,
        react.createElement(Component, props)
      );
    }
    return react.createElement(blockFactory, props);
  }
  return MillionBlockLoader;
};
function For({ each, children, ssr, svg }) {
  const [ready, setReady] = react.useState(false);
  react.useEffect(() => {
    if (millionModule)
      return;
    const importSource = async () => {
      millionModule = await import('./react.cjs');
      setReady(true);
    };
    try {
      void importSource();
    } catch (e) {
      throw new Error("Failed to load Million.js");
    }
  }, []);
  if (!ready || !millionModule) {
    if (ssr === false)
      return null;
    return react.createElement(
      svg ? utils.SVG_RENDER_SCOPE : utils.RENDER_SCOPE,
      { suppressHydrationWarning: true },
      ...each.map(children)
    );
  }
  return react.createElement(millionModule.For, {
    each,
    children,
    ssr,
    svg
  });
}

exports.renderReactScope = utils.renderReactScope;
exports.For = For;
exports.block = block;
