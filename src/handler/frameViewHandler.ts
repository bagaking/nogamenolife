
export async function OnFrameContentMutation(mutations: MutationRecord[], observer: MutationObserver) {
    let timerId: NodeJS.Timeout | null = null;
    console.log("OnFrameContentMutation", mutations)
    for (let i = 0 ; i < (mutations || []).length; i ++) {
        const mutation = mutations[i]
        console.log("mutation",  mutation.type, mutation.target)
        if (mutation.type !== 'childList' || !(mutation.target instanceof Element)) {
            return
        }
        const messageContents = mutation.target.querySelectorAll('.message-content');
        console.log("messageContents", messageContents)
        const lastMessageContent = messageContents[messageContents.length - 1];
        if (lastMessageContent) {
            // 在文本变化后，重置定时器
            clearTimeout(timerId!);
            timerId = setTimeout(() => {
                console.log("lastMessageContent.textContent", lastMessageContent.textContent);
            }, 1000); // 1秒后打印日志
        }
    }
}