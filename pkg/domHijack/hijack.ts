export function updateTextAreaInput(element:HTMLTextAreaElement, content: string) {
    if (!element) {
        console.error("error, the text-area cannot be null");
        return;
    }
    // focus on the element first
    element.focus();
    // update value
    element.value = content;
    element.defaultValue = content;
    // let's simulate an input event
    let event = new Event("input", { bubbles: true });
    // Hijack: React 15
    (event as any).simulated = true;
    // Hijack: React 16
    (element as any)._valueTracker?.setValue('');
    // dispatch event
    element.dispatchEvent(event);
    // blur the chat inbox after input
    element.blur();
}

export function simulateClick(element: HTMLElement) {
    if (!element) {
        console.error("Error: The element cannot be null");
        return;
    }

    // 创建一个点击事件
    let clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
    });

    // 在元素上触发点击事件
    element.dispatchEvent(clickEvent);
}