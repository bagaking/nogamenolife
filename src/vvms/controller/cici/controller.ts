import {GenericController} from "%/framework/vContainer";

export type CMDHandler = {
    OnLatestTextUpdated?: (... data: any) => void
}

export class CICIController extends GenericController<CMDHandler> {
    public sendChat(text: string) {
        this.vContainer.sendDownstreamCMD("sendChat", text)
    }
}

