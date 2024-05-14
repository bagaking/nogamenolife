import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import {EVENT_KEY_UPSTREAM, IViewContainer, ViewOptions, VCtx} from "./types"

export class VFactory {
    //
    private _instances: Map<number, IViewContainer> = new Map();
    private static _instance: VFactory;

    public static get Inst() {
        if (!this._instance) {
            this._instance = new VFactory();
        }
        return this._instance;
    }

    public constructor() {
        ipcMain.on(EVENT_KEY_UPSTREAM, async (event: IpcMainEvent, ctx: VCtx, ...data: any) => {
            const view = this._instances.get(ctx.viewId)
            if(!view) {
                return
            }
            view.onUpCMD(ctx, ...data)
        });
    }

    public async CreateBrowserView<T extends IViewContainer>(
        viewClass: new (win: BrowserWindow, options: ViewOptions) => T,
        win: BrowserWindow, options: ViewOptions
    ): Promise<T>  {
        const view = new viewClass(win, options);
        // reg
        VFactory.Inst._instances.set(view.id, view);
        await view.init();
        return view;
    }

    public view(id: number): IViewContainer {
        return this._instances.get(id)
    }
}

