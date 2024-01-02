import {BrowserView} from "electron";

export type ViewOptions = {
    url?: string;
    file?: string;
    injectJS?: string;
    zoomFactor?: number;
    bound?: {
        x?: number,
        y?: number,
        width: number,
        height: number,
    }
    upstreamHandler?: (cmd: string, ...data: any) => any
};

export type LayoutItem = {
    ratio: number;
};

export type VVMEventCtx = {
    viewId: number,
    cmd: string,
    source?: VVMEventCtx,
}

export interface IView {
    get id(): number
    get view(): BrowserView
    sendDownstreamEvent(cmd: string, ...data: any): void
}

export type VVMCmdHandler = (ctx: VVMEventCtx, ... data: any) => void

export const EVENT_KEY_BRAND = "__BKFW"
export const EVENT_KEY_UPSTREAM = "__BKFW_VIEW_UPSTREAM" // view => vvm
export const EVENT_KEY_DOWNSTREAM = "__BKFW_VIEW_DOWNSTREAM" // vvm => view
export const EVENT_KEY_SET_ID = "__BKFW_VIEW_SET_ID"
