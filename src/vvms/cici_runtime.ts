// noinspection JSCheckFunctionSignatures
import {GetBridge} from "%/framework/vm/types"
import {debounceBy} from "%/domHijack/utils"

import {acquireUpdatedText} from "./cici/acquire"
import {setChat} from "./cici/operations"

// debounced 5s
let debouncedSendText = debounceBy((text) => {
    GetBridge().send('OnLatestTextUpdated', text);
});

async function scanForText() {
    let text = acquireUpdatedText()
    if (!!text) {
        const dura = text.length < 15 ? 10000 : 5000
        debouncedSendText(dura, text);
    }
}
setInterval(scanForText, 913)

// let observer = new MutationObserver((mutations, observer) => {
//     let text = acquireUpdatedText()
//     if (!!text) {
//         const dura = text.length < 15 ? 10000 : 5000
//         debouncedSendText(dura, text);
//     }
// });
// observer.observe(document, { childList: true, subtree: true });

GetBridge().on("sendChat", (ctx, data: string) => {
    setChat(data)
})