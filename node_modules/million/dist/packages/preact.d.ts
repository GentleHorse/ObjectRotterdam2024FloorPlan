'use client';
import { M as MillionProps, B as Block, O as Options, c as MillionArrayProps } from '../shared/million.485bbee4.js';
import * as preact from 'preact';
import { VNode } from 'preact';
export { r as renderReactScope, u as unwrap } from '../shared/million.bb5f74dc.js';
import 'react';

declare const REGISTRY: Map<(props: MillionProps) => VNode, <T extends MillionProps>(props?: T | null | undefined, key?: string | undefined, shouldUpdateCurrentBlock?: ((oldProps: MillionProps, newProps: MillionProps) => boolean) | undefined) => Block>;
declare const block: <P extends MillionProps>(fn: ((p?: P | undefined) => JSX.Element) | null, options?: Options) => (props: P) => VNode<any>;

declare const For: <T>({ each, children }: MillionArrayProps<T>) => preact.VNode<any>;

export { For, REGISTRY, block };
