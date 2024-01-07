import {findRecentlyMsgCardDOM} from "./findDOM";

let oldText = ""
export function acquireUpdatedText(): string {
    const dom = findRecentlyMsgCardDOM()
    const text = getMarkdownText(dom)
    // @ts-ignore
    const newText = (text || "").trim().replace(/\\n{2,}/g, '\\n');
    if(!newText) {
        console.log("acquireUpdatedText: got empty text")
    }

    if (newText === oldText) {
        return
    }
    return oldText = newText
}

export function getMarkdownText(dom: Element): string {
    let result = '';

    function traverse(node: Node) {
        if (node.nodeType === Node.TEXT_NODE) { // 文本节点
            result += node.nodeValue;
        } else if (node.nodeType === Node.ELEMENT_NODE) { // 元素节点
            let element = node as HTMLElement;
            if (element.tagName === 'A') { // 如果是超链接，转换成 Markdown 格式
                let text = element.textContent || '';
                let href = element.getAttribute('href') || '';
                result += `[${text}](${href})`;
            }
        }

        // 递归处理子节点
        for (let i = 0; i < node.childNodes.length; i++) {
            traverse(node.childNodes[i]);
        }
    }

    traverse(dom);

    return result;
}