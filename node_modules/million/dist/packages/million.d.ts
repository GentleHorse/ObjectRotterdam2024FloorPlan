'use client';
import { A as AbstractBlock, V as VNode, E as Edit } from '../shared/million.485bbee4.js';
export { B as Block, a as VElement, b as block, m as mount, p as patch, w as withKey } from '../shared/million.485bbee4.js';
import 'react';

declare const mapArray: (children: AbstractBlock[]) => ArrayBlock;
declare class ArrayBlock extends AbstractBlock {
    b: AbstractBlock[];
    constructor(children: AbstractBlock[]);
    v(): void;
    p(fragment: ArrayBlock): HTMLElement;
    m(parent: HTMLElement, refNode?: Node | null): HTMLElement;
    x(): void;
    u(): boolean;
    s(): string;
    t(): HTMLElement | null | undefined;
}

declare const renderToTemplate: (vnode: VNode, edits?: Edit[], path?: number[]) => string;

declare const firstChild$: () => any;
declare const nextSibling$: () => any;
declare const stringToDOM: (content: string, svg?: boolean) => HTMLElement;

export { AbstractBlock, ArrayBlock, VNode, firstChild$, mapArray, nextSibling$, renderToTemplate, stringToDOM };
