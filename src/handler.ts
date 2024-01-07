import {IViewContainer} from "%/framework/types";
import {CPController} from "@/vvms/controller/controlPanel/controller";
import {CICIController, CMDHandler as CMDHandlerBot} from "@/vvms/controller/cici/controller";

export function HandleBotsChat(vmEditor: IViewContainer, ...vmBots: IViewContainer[]) {

    const [v1, v2] = vmBots
    let cp: CPController
    let ctrCC01: CICIController
    let ctrCC02: CICIController
    let history: string = ""
    function AppendHistory(text: string) {
        history += text + "\n";
        cp.updateHistory(history)
    }

    let triggered = false
    function req() {
        if(triggered) return
        const handlerBot1: CMDHandlerBot = {
            OnLatestTextUpdated: text => {
                AppendHistory("\nplayer1 > " + text)
                ctrCC02.sendChat(text)
            }
        }
        const handlerBot2: CMDHandlerBot = {
            OnLatestTextUpdated: text => {
                AppendHistory("\nplayer2 > " + text)
                ctrCC01.sendChat(text)
            }
        }

        ctrCC01 = new CICIController(v1, handlerBot1)
        ctrCC02 = new CICIController(v2, handlerBot2)
        triggered = true
    }

    cp = new CPController(vmEditor, {
        OnCodeExecute: (str:string) => {
            console.log("sendChat")
            req()
            ctrCC01.sendChat(str)
        }
    })
    // ctrCC01.sendChat("try this")
}

