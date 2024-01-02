import {mapValue} from "date-fns/parse/_lib/utils";

const { contextBridge, ipcRenderer } = require('electron');
import {
    EVENT_KEY_UPSTREAM, EVENT_KEY_DOWNSTREAM, EVENT_KEY_SET_ID, EVENT_KEY_BRAND,
    VVMEventCtx, VVMCmdHandler,
} from "./types"

// # Methods
let vvmID: number = -1;
function getId(): number {
    return vvmID
}

// # Sender
function send(cmd: string, ...data: any) {
    const ctx: VVMEventCtx = { viewId: vvmID, cmd, source: {viewId: vvmID, cmd} }
    ipcRenderer.send(EVENT_KEY_UPSTREAM, ctx, ...data);
}

// # Handlers
// ## set_id
function setId(event: any, id: number) {
    vvmID = id
    console.log(EVENT_KEY_SET_ID + " :setId success", vvmID);
}

// ## downstream
let callbackRegister: Map<string, VVMCmdHandler> = new Map();
function registerCMDHandler(cmd: string, handler: (ctx: VVMEventCtx, ... data: any) => void ){
    if(callbackRegister.has(cmd)) {
        console.log(EVENT_KEY_DOWNSTREAM + " :on failed", "cmd already exist")
        return
    }
    callbackRegister.set(cmd, handler)
    console.log(EVENT_KEY_DOWNSTREAM + " :on registered", cmd)
}

function dispatchDownstreamCMD(event: any, ctx: VVMEventCtx, ...data: any) {
    console.log(EVENT_KEY_DOWNSTREAM + " :dispatch received", ctx, ...data, event)
    if (ctx.viewId !== vvmID) {
        console.log(EVENT_KEY_DOWNSTREAM + " :dispatch failed", "vvmID not match", ctx)
        return;
    }

    const handler = callbackRegister.get(ctx.cmd)
    if (!handler) {
        console.log(EVENT_KEY_DOWNSTREAM + " :dispatch failed", "try get cmd failed", ctx)
        return
    }
    return handler(ctx, ...data)
}

// register
ipcRenderer.on(EVENT_KEY_SET_ID, setId);
ipcRenderer.on(EVENT_KEY_DOWNSTREAM, dispatchDownstreamCMD);

// expose
contextBridge.exposeInMainWorld(
    EVENT_KEY_BRAND, {
        send: send,
        on: registerCMDHandler,
        id: getId,
    }
);

console.log(`[${EVENT_KEY_BRAND}] == VVM PRELOAD ==`)