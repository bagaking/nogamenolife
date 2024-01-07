import {BrowserView} from "electron";

export type ViewOptions = {
    url?: string;
    file?: string;
    zoomFactor?: number;
    bound?: {
        x?: number,
        y?: number,
        width: number,
        height: number,
    }

    injectJS?: string;
    runtimeScriptFile?: string
};

export type LayoutItem = {
    ratio: number;
};

export type VCtx = {
    viewId: number,
    cmd: string,
    source?: VCtx,
}

export interface IViewContainer {
    // getter
    get id(): number
    get view(): BrowserView
    get preloadInitialed(): boolean

    // basic event
    sendDownstreamCMD(cmd: string, ...data: any): void
    listenUpstreamCMD(cmd: string, cb: FnHandleCMD<VCtx>): void

    // handle
    init(): Promise<void>
    onUpCMD(ctx: VCtx, ...data: any): boolean // returns executed
}

export type FnHandleCMD<CtxType> = (ctx: CtxType, ... data: any) => void

export const EVENT_KEY_BRAND = "__BKFW"
export const EVENT_KEY_UPSTREAM = "__BKFW_VIEW_UPSTREAM" // view => vvm

// on preload
export const EVENT_KEY_DOWNSTREAM = "__BKFW_VIEW_DOWNSTREAM" // vvm => view
export const EVENT_KEY_SET_ID = "__BKFW_VIEW_SET_ID";

// up_system_cmd
export const UPCMD_SYSTEM_INITIALED = "system:initialed";

export function isFnHandleCMD<T>(fn: any): fn is FnHandleCMD<T> {
    return typeof fn === "function";
}