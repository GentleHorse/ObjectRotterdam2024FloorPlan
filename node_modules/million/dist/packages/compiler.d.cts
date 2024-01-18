'use client';
import * as _babel_core from '@babel/core';
import * as _unplugin from 'unplugin';
import * as _esbuild from 'esbuild';
import * as _rollup from 'rollup';
import * as _vite from 'vite';

interface Options {
    optimize?: boolean;
    server?: boolean;
    mode?: 'react' | 'preact' | 'react-server' | 'preact-server' | 'vdom';
    mute?: boolean | 'info';
    hmr?: boolean;
    auto?: boolean | {
        threshold?: number;
        rsc?: boolean;
        skip?: (string | RegExp)[];
    };
    _file?: string;
}

declare const vite: (options: Options) => _vite.Plugin | _vite.Plugin[];
declare const webpack: (options: Options) => WebpackPluginInstance;
declare const rollup: (options: Options) => _rollup.Plugin | _rollup.Plugin[];
declare const rspack: (options: Options) => RspackPluginInstance;
declare const esbuild: (options: Options) => _esbuild.Plugin;
declare const next: (nextConfig?: Record<string, any>, overrideOptions?: Options) => {
    webpack(config: Record<string, any>, webpackOptions: Record<string, any>): any;
};
declare const _default: {
    vite: (options: Options) => _vite.Plugin | _vite.Plugin[];
    webpack: (options: Options) => WebpackPluginInstance;
    rollup: (options: Options) => _rollup.Plugin | _rollup.Plugin[];
    rspack: (options: Options) => RspackPluginInstance;
    esbuild: (options: Options) => _esbuild.Plugin;
    next: (nextConfig?: Record<string, any>, overrideOptions?: Options) => {
        webpack(config: Record<string, any>, webpackOptions: Record<string, any>): any;
    };
    unplugin: _unplugin.UnpluginInstance<Options, boolean>;
    babel: (api: object, options: Options | null | undefined, dirname: string) => _babel_core.PluginObj<_babel_core.PluginPass>;
};

export { _default as default, esbuild, next, rollup, rspack, vite, webpack };
