import {IViewContainer, VCtx, isFnHandleCMD, FnHandleCMD} from "../types";
import {BrowserView} from "electron";

export type Method = (... data: any) => void

export function isMethod(fn: any): fn is Method {
    return typeof fn === "function";
}

export class GenericController<IMethodMap extends { [key:string]: Method }> {

    constructor(private _vc: IViewContainer, private _methods: IMethodMap) {
        const cmds = []
        for (const cmd in this._methods) {
            if (isMethod(this._methods[cmd])) {
                cmds.push(cmd)
                const fn = this._methods[cmd] as (... data: any) => void
                this._vc.listenUpstreamCMD(cmd, (ctx: VCtx, ...data:any) => fn.bind(this)(...data))
            }
        }
        console.log("build generic controller, which has CMDs as ", cmds)
    }

    public get vContainer(): IViewContainer {
        return this._vc
    }

    public get view(): BrowserView {
        return this._vc.view
    }

    public handler(): { [cmd:string]: FnHandleCMD<VCtx> } {
        return this._methods
    }

}