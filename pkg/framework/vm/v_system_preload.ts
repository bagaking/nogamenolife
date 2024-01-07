const { contextBridge, ipcRenderer } = require('electron');
import {
    EVENT_KEY_UPSTREAM, EVENT_KEY_DOWNSTREAM, EVENT_KEY_SET_ID, EVENT_KEY_BRAND,
    VCtx, UPCMD_SYSTEM_INITIALED,
} from "../types"
import {GetBridge, IBridge} from "./types";
import {CtxCmdHandler, FnHandleCMD} from "../ctxCmdHandler";

// # Methods
let vcId: number = -1;
let cmdHandler: CtxCmdHandler<VCtx>

function id(): number {
    return vcId
}

function initialed(): boolean {
    return vcId > 0
}

// # Sender
function send(cmd: string, ...data: any) {
    const ctx: VCtx = {
        viewId: vcId,
        cmd: cmd,
        source: {
            viewId: vcId,
            cmd: cmd
        }
    }
    console.log("send", ctx)
    ipcRenderer.send(EVENT_KEY_UPSTREAM, ctx, ...data);
}

// # Handlers
// ## set_id
function setId(event: any, id: number) {
    if(initialed()) {
        console.error("render script of the viewController has already been initialed", vcId, id)
        return
    }
    vcId = id
    cmdHandler = new CtxCmdHandler(ctx => ctx.viewId === vcId ? ctx.cmd : "" )
    console.log(EVENT_KEY_SET_ID + " :setId success", vcId);
    send(UPCMD_SYSTEM_INITIALED, vcId)
}
// ## downstream
function dispatch(event:any, ctx: VCtx, ...data: any) {
    cmdHandler.dispatch(ctx, ...data)
}

// ## native
ipcRenderer.on(EVENT_KEY_SET_ID, setId);
ipcRenderer.on(EVENT_KEY_DOWNSTREAM, dispatch);

// expose
function expose(api: IBridge) {
    contextBridge.exposeInMainWorld(EVENT_KEY_BRAND, api);
}
contextBridge.exposeInMainWorld("GetBridge", GetBridge);

// expose the APIs
// thus you can use the GetBridge() method which imported from vm.types
expose({
    send: send,
    on: (cmd: string, handler: FnHandleCMD<VCtx>) => cmdHandler.on(cmd, handler),
    id: id,
    initialed: initialed,
})

console.log(`[${EVENT_KEY_BRAND}] == VVM PRELOAD ==`)