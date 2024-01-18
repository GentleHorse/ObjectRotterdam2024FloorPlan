'use client';
import * as react from 'react';
import { ComponentType } from 'react';
import { M as MillionProps, O as Options, c as MillionArrayProps } from '../shared/million.485bbee4.mjs';
export { r as renderReactScope } from '../shared/million.06785e99.mjs';

declare const block: <P extends MillionProps>(Component: ComponentType<P>, options?: Options) => (props?: P | undefined) => react.ReactElement<P, string | react.JSXElementConstructor<any>> | react.FunctionComponentElement<P> | null;
declare function For<T>({ each, children, ssr, svg }: MillionArrayProps<T>): react.ReactElement<{
    suppressHydrationWarning: boolean;
}, string | react.JSXElementConstructor<any>> | react.CElement<{
    each: T[];
    children: (value: T, i: number) => JSX.Element;
    ssr: boolean | undefined;
    svg: boolean | undefined;
}, react.Component<{
    each: T[];
    children: (value: T, i: number) => JSX.Element;
    ssr: boolean | undefined;
    svg: boolean | undefined;
}, any, any>> | null;

export { For, block };
