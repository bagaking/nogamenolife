function scrollOnePage() {
    // 获取当前视窗的高度
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // 使用scrollBy方法垂直滚动一页
    window.scrollBy({
        top: height, // 垂直滚动量设置为视窗的高度
        behavior: 'smooth' // （可选）平滑滚动
    });
}

// Function to trigger a download of the canvas image
function downloadCanvasImage(canvas: any, filename: string) {
    // Use the canvas toDataURL() method to get the image data as a base64-encoded string
    let image = canvas.toDataURL('image/png');

    // Create a temporary link element
    let a = document.createElement('a');

    // Set the download name for the image
    a.download = filename || 'canvas_image.png';

    // Attach the image data to the link
    a.href = image;

    // Trigger the download by simulating a click on the link
    document.body.appendChild(a);
    a.click();

    // Clean up by removing the temporary element
    document.body.removeChild(a);
}

// Function to find all canvas elements and download them as images
function downloadAllCanvasImages() {
    // Get all canvas elements on the page
    let canvases = document.querySelectorAll('canvas');

    // Iterate through each canvas
    canvases.forEach((canvas, index) => {
        // Use a timeout to stagger the downloads (optional)
        setTimeout(() => {
            // Construct a filename for each image download
            let filename = 'canvas_image_' + (index + 1) + '.png';

            // Call the function to download the image
            downloadCanvasImage(canvas, filename);
        }, index * 100); // 100ms timeout for each canvas
    });
}

// 由于安全策略存在，实际不会生效，除非使用 electron 模拟
// -- 发送模拟的鼠标滚动事件
// contents.sendInputEvent({
//   type: 'mouseWheel',
//   x: 0,  // 模拟滚动事件发生的横坐标
//   y: 0,  // 模拟滚动事件发生的纵坐标
//   deltaX: 0,      // 横向滚动的距离，这里设置为0
//   deltaY: 100,    // 纵向滚动的距离，正数向下滚动，负数向上滚动
//   canScroll: true // 设置为true以允许内容滚动
// });
function scrollOnePageInElement(className: string) {
    // 获取所有具有指定类名的元素
    let elements = document.querySelectorAll('.' + className);

    // 遍历这些元素，并对每个元素进行一屏的滚动
    elements.forEach(function(element) {
        // 获取元素的可视高度
        let height = element.clientHeight;

        // 更新元素的scrollTop值，使其向下滚动一屏
        // 对于平滑滚动，您需要另外的解决方案，因为scrollTop不支持smooth behavior
        // element.scrollTop += height;

        // 创建一个新的 WheelEvent
        let event = new WheelEvent('wheel', {
            deltaY: height, // 正值向下滚，负值向上滚
            // 其他参数可根据需要设置
        });

        // 触发该元素的 wheel 事件
        element.dispatchEvent(event);
    });
}