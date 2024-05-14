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


export function HandleScroll(vmEditor: IViewContainer, vmScroll: IViewContainer) {

    let cp: CPController

    let history: string = ""

    cp = new CPController(vmEditor, {
        OnCodeExecute: (str:string) => {
            let cmd = str
            let v = Number(cmd)
            if (!v && cmd !== "bottom" && cmd != "top") {
                return
            }

            console.log("OnCodeExecute", cmd, typeof v)

            history += "\n" + cmd
            cp.updateHistory(history)

            vmScroll.view.webContents.focus()
            if(cmd == "bottom") {
                vmScroll.view.webContents.scrollToBottom()
                return
            }

            if (cmd == "top"){
                vmScroll.view.webContents.scrollToTop()
                return
            }

            vmScroll.view.webContents.sendInputEvent({
                type: 'mouseWheel',
                x: 300,  // 模拟滚动事件发生的横坐标
                y: 300,  // 模拟滚动事件发生的纵坐标
                deltaX: 0,      // 横向滚动的距离，这里设置为0
                deltaY: v,    // 纵向滚动的距离，正数向下滚动，负数向上滚动
                canScroll: true // 设置为true以允许内容滚动
            });

        }
    })
    // ctrCC01.sendChat("try this")
}

