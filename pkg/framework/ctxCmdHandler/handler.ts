export type GetCMD<CtxType> = (ctx: CtxType) => string
export type FnHandleCMD<CtxType> = (ctx: CtxType, ... data: any) => void

// CtxCmdHandler is an abstract structure to handle commands
export class CtxCmdHandler<CtxType> {

    private register: Map<string, FnHandleCMD<CtxType>>;

    constructor(private _validate: GetCMD<CtxType>) {
        this.register = new Map();
    }

    public on(cmd: string, handler: FnHandleCMD<CtxType>){
        if(this.register.has(cmd)) {
            console.error("CMDHandler:on failed", "cmd already exist")
            return
        }
        this.register.set(cmd, handler)
    }

    // return executed
    public dispatch(ctx: CtxType, ...data: any): boolean {
        const cmd = this._validate(ctx)
        if (!cmd) {
            console.error("CMDHandler: dispatch failed", "validate failed", ctx)
            return false;
        }

        const handler = this.register.get(cmd)
        if (!handler) {
            return false;
        }
        handler(ctx, ...data)
        return true
    }
}

