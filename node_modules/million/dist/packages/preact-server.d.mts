'use client';
import { M as MillionProps } from '../shared/million.485bbee4.mjs';
import { ComponentType, VNode } from 'preact';
export { r as renderPreactScope } from '../shared/million.ccb28cef.mjs';
import 'react';

declare const block: <P extends MillionProps>(Component: ComponentType<P>) => (props: P) => VNode<any>;
declare function For(props: {
    each: any[];
    children: (item: any, index: number) => any;
}): VNode<any>;

export { For, block };
