import path from "path";
import fs from "fs";

import { BrowserWindow, BrowserView } from 'electron';
import {
    EVENT_KEY_SET_ID,
    IViewContainer,
    ViewOptions,
    FnHandleCMD,
    VCtx
} from "../types";

import {VContBase, srcPathVSystemPreload, loadRuntimeSrc } from "./base"

export class VContainerStandard extends VContBase implements IViewContainer {
    private readonly _view: BrowserView;

    private _fallbackHandler?: FnHandleCMD<VCtx>;

    constructor(_win: BrowserWindow, _options: ViewOptions) {
        super(_win, _options)
        this._view = new BrowserView({
            webPreferences: {
                preload: srcPathVSystemPreload(),
                // webSecurity: false,
            }, // 指定 preload 脚本
        });
        // set
        this._win.addBrowserView(this._view);
    }

    public setFallback(ch: FnHandleCMD<VCtx>) {
        console.log("setUpstreamHandler of", this.id)
        this._fallbackHandler = ch
    }

    // implement
    public override get view(): BrowserView {
        return this._view;
    }

    public async init(): Promise<void> {
        const {url, file, bound, zoomFactor, injectJS, runtimeScriptFile} = this._options
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

        if (!!runtimeScriptFile) {
            await loadRuntimeSrc(this.view, runtimeScriptFile);
        }
        // await this._view.webContents.executeJavaScript(`console.log("NGNL ID SET", __NGNL_VIEW_ID)`);

        // 注入 Custom JS 脚本
        if (!!injectJS) {
            await this._view.webContents.executeJavaScript(injectJS);
        }
    }


// override
    public override onUpCMD(ctx: VCtx, ...data: any): boolean{
        if(super.onUpCMD(ctx, ...data)){
            return true
        }
        if(!!this._fallbackHandler) {
            this._fallbackHandler(ctx, ...data)
            return true
        }
        return false
    }

}