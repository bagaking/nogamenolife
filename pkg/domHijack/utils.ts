/**
 * debounce 去抖动函数，该函数会在延迟等待时间后才会执行，
 * 如果在等待时间内再次调用该函数，等待时间会重新计算。
 * @param callback 需要去抖动的函数
 * @param wait 延迟时间，单位是毫秒
 * @return 一个新的 debounced 版本的函数
 */
export function debounce<T extends (...args: any[]) => any>(callback: T, wait: number): T {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    return ((...args: any[]): void => {
        // 如果已经存在一个定时器，先清除它
        if (timerId !== null) {
            clearTimeout(timerId);
        }

        // 设置一个新的定时器，在等待时间后执行 callback 函数
        timerId = setTimeout(() => {
            timerId = null; // 清除定时器
            callback(...args); // 执行 callback 函数
        }, wait);
    }) as T; // 断言返回的函数与原函数类型一致
}

/**
 * debounceBy去抖动函数，该函数会在延迟等待时间后才会执行，该时间可以每次设置
 * 如果在等待时间内再次调用该函数，等待时间会重新计算。
 * @param callback 需要去抖动的函数
 * @param wait 延迟时间，单位是毫秒
 * @return 一个新的 debounced 版本的函数
 */
export function debounceBy<T extends (...args: any[]) => any>(callback: T): (wait: number, ...args: any[]) => void {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    return ((wait: number, ...args: any[]): void => {
        // 如果已经存在一个定时器，先清除它
        if (timerId !== null) {
            clearTimeout(timerId);
        }

        // 设置一个新的定时器，在等待时间后执行 callback 函数
        timerId = setTimeout(() => {
            timerId = null; // 清除定时器
            callback(...args); // 执行 callback 函数
        }, wait);
    }) as T; // 断言返回的函数与原函数类型一致
}