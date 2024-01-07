export function findRecentlyMsgCardDOM() {
    let domNodes = document.querySelectorAll('div[class^="message-box-content-"]')
    let convertedNodes = [...domNodes].filter(dom =>
        !dom.querySelector('div[class^="self-content-pre"]') && !dom.querySelector('pre[class^="self-content-pre"]')
    );
    let dom = null
    if (!!convertedNodes && !!convertedNodes.length) {
        dom = convertedNodes[convertedNodes.length - 1]
    }
    return dom
}

export function findChatInboxDOM (): HTMLTextAreaElement {
    const dom = document.querySelector('div[class^="chat-input-"] textarea');
    if (!dom) {
        return null
    }
    return dom as HTMLTextAreaElement;
}

export function findSendButtonDOM(): HTMLButtonElement {
    const button = document.querySelector('button[id^="flow-end-msg-send"]');
    if (!button) {
        return null;
    }
    return button as HTMLButtonElement;
}