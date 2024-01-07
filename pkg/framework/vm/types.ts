import {EVENT_KEY_BRAND, VCtx} from "../types";

export interface IBridge {
    id(): number
    initialed(): boolean
    send(cmd: string, ...data: any): void
    on(cmd: string, handler: (ctx: VCtx, ... data: any) => void ): void
}

export function GetBridge(w?: any):IBridge {
    // @ts-ignore
    return (w || window)[EVENT_KEY_BRAND]
}