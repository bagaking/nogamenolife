import {GenericController} from "%/framework/vContainer";

type CMDHandler = {
    OnCodeExecute?: (text: string) => void
}

export class CPController extends GenericController<CMDHandler> {

    public updateDialog(text: string) {
        this.vContainer.sendDownstreamCMD("updateDialog", text)
    }

    public updateHistory(text: string) {
        this.vContainer.sendDownstreamCMD("updateHistory", text)
    }
}

