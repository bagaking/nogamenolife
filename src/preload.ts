// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'api_bridge', {
        send: (cmd: string, ...data: any) => {
            const ctx = {
                // @ts-ignore
                viewId: window.__NGNL_VIEW_ID,
                cmd
            }
            ipcRenderer.send("__NGNL_VIEW_UPSTREAM", ctx, ...data);
            console.log("__NGNL_VIEW_UPSTREAM", ctx, ...data)
        },
        on: (channel: string, func: (ctx: {viewId: number, cmd: string}, ... data: any) => void) => {
            ipcRenderer.on("__NGNL_VIEW_DOWNSTREAM", (event, ctx, data) => {
                // @ts-ignore
                if (ctx.viewId !== window.__NGNL_VIEW_ID) return;
                if (ctx.cmd !== channel) return;
                func(ctx, data)
            });
        },
    }
);


ipcRenderer.on('set-view-id',(event, id) => {
    // @ts-ignore
    window.__NGNL_VIEW_ID = id
    // @ts-ignore
    console.log("window.__NGNL_VIEW_ID set", window.__NGNL_VIEW_ID);
});

console.log("[NGNL] == PRELOAD ==")