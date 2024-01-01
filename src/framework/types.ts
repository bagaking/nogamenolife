
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

export type ViewEventCtx = {
    viewId: number,
    cmd: string,
}