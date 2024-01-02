import { BrowserWindow, BrowserView, ipcMain, IpcMainEvent, contextBridge } from 'electron';
import path from "path";
import {EVENT_KEY_DOWNSTREAM, EVENT_KEY_SET_ID, EVENT_KEY_UPSTREAM, IView, ViewOptions, VVMEventCtx} from "./types"

class View implements IView {
    private static _idCount = 1;
    public static get idCount() {
        return ++ this._idCount;
    }

    private readonly _id: number;
    private readonly _view: BrowserView;

    constructor(private _win: BrowserWindow, private _options: ViewOptions) {
        this._id = View.idCount;
        this._view = new BrowserView({
            webPreferences: { preload: path.join(__dirname, '../build/vvm_preload.js')  }// 指定 preload 脚本
        });
        // set
        this._win.addBrowserView(this._view);
    }

    public get id(): number {
        return this._id;
    }

    public get view(): BrowserView {
        return this._view;
    }

    public async init(): Promise<void> {
        const {url, file, bound, zoomFactor, injectJS} = this._options
        const {x = 0, y = 0, width = 100, height = 100 } = bound
        if (!!url) {
            await this._view.webContents.loadURL(url);
        } else if (!!file){
            await this._view.webContents.loadFile(file);
        }
        this._view.setBounds({x, y, width, height});
        // 设置窗口内容缩放
        if (!!zoomFactor) {
            this._view.webContents.setZoomFactor(zoomFactor);
        }
        this._view.webContents.send(EVENT_KEY_SET_ID, this.id);
        // await this._view.webContents.executeJavaScript(`console.log("NGNL ID SET", __NGNL_VIEW_ID)`);

        // 注入 Custom JS 脚本
        if (!!injectJS) {
            await this._view.webContents.executeJavaScript(injectJS);
        }
    }

    public handleUpstreamEvent(ctx: VVMEventCtx, ...data: any){
        if(!this._options?.upstreamHandler) {
            return
        }
        return this._options.upstreamHandler(ctx.cmd, ...data)
    }

    public sendDownstreamEvent(cmd: string, ...data: any) {
        const ctx = {
            viewId: this.id,
            cmd: cmd
        }
        console.log("sendDownstreamEvent", EVENT_KEY_DOWNSTREAM, ctx)
        return this._view.webContents.send(EVENT_KEY_DOWNSTREAM, ctx, ...data)
    }
}

export class VVMFactory {
    private _instances: Map<number, View> = new Map();
    private static _instance: VVMFactory;

    public static get Inst() {
        if (!this._instance) {
            this._instance = new VVMFactory();
        }
        return this._instance;
    }

    public constructor() {
        ipcMain.on(EVENT_KEY_UPSTREAM, async (event: IpcMainEvent, ctx: VVMEventCtx, ...data: any) => {
            const {viewId, cmd} = ctx
            const view = this._instances.get(viewId)
            if(!view) {
                return
            }
            view.handleUpstreamEvent(ctx, ...data)
            console.log(
                "VIEW_UPSTREAM event handled",
                ctx,
                // ...data,
            )
        });
    }

    public async CreateBrowserView(win: BrowserWindow, options: ViewOptions): Promise<IView> {
        const view = new View(win, options);
        // reg
        VVMFactory.Inst._instances.set(view.id, view);
        await view.init();
        return view;
    }

    public view(id: number): IView {
        return this._instances.get(id)
    }
}

