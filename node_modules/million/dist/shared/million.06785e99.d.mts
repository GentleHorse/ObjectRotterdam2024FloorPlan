'use client';
import { ReactNode } from 'react';
import { d as MillionPortal, V as VNode } from './million.485bbee4.mjs';

declare const renderReactScope: (vnode: ReactNode, unstable: boolean, portals: MillionPortal[] | undefined, currentIndex: number, server: boolean) => any;
declare const unwrap: (vnode: JSX.Element | null) => VNode;

export { renderReactScope as r, unwrap as u };
