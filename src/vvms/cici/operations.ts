import {findChatInboxDOM, findSendButtonDOM} from "./findDOM";

import {simulateClick, updateTextAreaInput} from "%/domHijack/hijack";

export function setChat(content: string) {
    let chatInbox = findChatInboxDOM();

    if (!chatInbox) {
        console.error("Error: Cannot find chat inbox");
        return;
    }
    updateTextAreaInput(chatInbox, content)

    const button = findSendButtonDOM()
    simulateClick(button)
}