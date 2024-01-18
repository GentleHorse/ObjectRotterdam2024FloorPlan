'use client';
import { M as MillionProps } from '../shared/million.485bbee4.cjs';
import { ComponentType, VNode } from 'preact';
export { r as renderPreactScope } from '../shared/million.3cf6b21c.cjs';
import 'react';

declare const block: <P extends MillionProps>(Component: ComponentType<P>) => (props: P) => VNode<any>;
declare function For(props: {
    each: any[];
    children: (item: any, index: number) => any;
}): VNode<any>;

export { For, block };
