import path from "path";

import { BrowserWindow, BrowserView } from 'electron';
import {
    EVENT_KEY_DOWNSTREAM,
    IViewContainer,
    ViewOptions,
    FnHandleCMD,
    VCtx, UPCMD_SYSTEM_INITIALED
} from "../types";
import {CtxCmdHandler} from "%/framework/ctxCmdHandler";
import fs from "fs";

export function srcPath(fileName: string): string {
    return path.join(__dirname, '../build/', fileName)
}

export function srcPathVSystemPreload(): string {
    const vSystemPath = srcPath('v_system_preload.js')
    try {
        fs.readFileSync(vSystemPath, 'utf-8');
    } catch (err) {
        console.error(`test fileContent failed: ${vSystemPath}`, err);
        throw err;
    }
    return vSystemPath
}

export async function loadRuntimeSrc(view: BrowserView, fileName: string) {
    try {
        const filePath = srcPath(fileName)
        // 读取文件
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        // 在 BrowserView 中执行文件中的脚本
        await view.webContents.executeJavaScript(fileContent);
    } catch (err) {
        view.webContents.openDevTools({mode:'undocked'})
        console.error(`Error reading and executing runtime: ${fileName}`, err);
        throw err;
    }
}

export abstract class VContBase implements IViewContainer {
    // static
    private static _idCount = 1001;
    public static get idCount() {
        return ++ this._idCount;
    }

    // private
    private readonly _id: number;
    private _cmd: CtxCmdHandler<VCtx>;
    private _preloadInitialed: boolean = false;

    protected constructor(protected _win: BrowserWindow, protected _options: ViewOptions) {
        this._id = VContBase.idCount;
        this._cmd = new CtxCmdHandler((
                (ctx: VCtx) => ctx.viewId === this._id ? ctx.cmd : ""
            ).bind(this)
        )
        this.listenUpstreamCMD(UPCMD_SYSTEM_INITIALED, () => this._preloadInitialed = true)
    }

    public get id(): number {
        return this._id;
    }

    public get preloadInitialed(): boolean {
        return this._preloadInitialed;
    }

    // standard handler
    public listenUpstreamCMD(cmd: string, cb: FnHandleCMD<VCtx>) {
        return this._cmd.on(cmd, cb)
    }

    public sendDownstreamCMD(cmd: string, ...data: any) {
        const ctx = {
            viewId: this.id,
            cmd: cmd
        }
        console.log(`⬇] ${ctx.viewId}/${ctx.cmd}: ${data}`)
        return this.view.webContents.send(EVENT_KEY_DOWNSTREAM, ctx, ...data)
    }

    // onUpCMD, called by factory
    public onUpCMD(ctx: VCtx, ...data: any): boolean{
        return this._cmd.dispatch(ctx, data)
    }

    // expose
    public abstract get view(): BrowserView
    public abstract init(): Promise<void>
}

