'use client';
import * as react from 'react';
import { ComponentType, Ref } from 'react';
import { M as MillionProps, O as Options, c as MillionArrayProps } from '../shared/million.485bbee4.cjs';
export { r as renderReactScope, u as unwrap } from '../shared/million.307f5c20.cjs';

declare const block: <P extends MillionProps>(fn: ComponentType<P> | null, { block: compiledBlock, shouldUpdate, svg, as }?: Options) => (props: P, forwardedRef: Ref<any>) => react.FunctionComponentElement<{
    children?: react.ReactNode;
}>;

declare const For: <T>({ each, children, memo, svg, as, ...rest }: MillionArrayProps<T>) => react.FunctionComponentElement<{
    children?: react.ReactNode;
}>;

declare const REGISTRY: Map<ComponentType, any>;

declare const shutUpReact: () => void;

declare const macro: (expression: any) => any;

export { For, REGISTRY, block, macro, shutUpReact };
