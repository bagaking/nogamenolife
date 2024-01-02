// Electron 主进程
import {EVENT_KEY_BRAND} from "%/framework/types";

const { app, ipcMain, BrowserWindow } = require('electron')
import path from 'path';
import {initBrowserViews} from "%/framework/viewFrameManager";
import {OnFrameContentMutation} from "@/handler/frameViewHandler"

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    // frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // 确保打开 nodeIntegration, 集成 Node.js 以在渲染进程使用
      contextIsolation: false, // 确保关闭 contextIsolation

      webviewTag: true,
      // webSecurity: false // 禁用 webSecurity
    }
  });
  await mainWindow.loadURL(`data:text/html,<body style="background:#333333 !important;margin:0;"></body>`)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  const [v1, v2] = await initBrowserViews(mainWindow, [
    {
      ratio: 0.382,
      url: 'https://www.ciciai.com',
      zoomFactor: 0.8,
      // todo: build this script
      injectJS: `
function findRecentlyMsgCardDOMText() {
  let doms = document.querySelectorAll('div[class^="message-box-content-"]')
  doms = [...doms].filter(dom => !dom.querySelector('div[class^="self-content-pre"]'));
  let dom = null
  if (!!doms && !!doms.length) {
    dom = doms[doms.length - 1]
  }
  const text = (dom?.innerText || "").trim().replace(/\\n{2,}/g, '\\n');
  if(!text) {
    console.log("findRecentlyMsgCardDOMText: got empty text")
    return
  }
  return text
}
let observer = new MutationObserver((mutations, observer) => {
    // @ts-ignore
    window.${EVENT_KEY_BRAND}.send("OnMutation", {mutations, observer, text:findRecentlyMsgCardDOMText()})
});
observer.observe(document, { childList: true, subtree: true });


`,
      upstreamHandler: (cmd: string, data: any )=> {
        if(cmd == "OnMutation") {
          const {mutations, observer, text} = data
          OnFrameContentMutation(text, mutations, observer)
        }
      }
    },
    {
      ratio: 0.618,
      url: MAIN_WINDOW_VITE_DEV_SERVER_URL ?? undefined,
      file: MAIN_WINDOW_VITE_DEV_SERVER_URL ? undefined : path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      zoomFactor: 0.8,
      injectJS: `
console.log('${EVENT_KEY_BRAND} Loaded:', ${EVENT_KEY_BRAND}.id() , ${EVENT_KEY_BRAND}); 
${EVENT_KEY_BRAND}.on('test111', (ctx, ...data) => console.log(ctx, ...data))

`,
    }
  ])

  v2.view.webContents.openDevTools({mode: 'bottom'});

  (async () => {
    while (true) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      v2.sendDownstreamEvent("test111", {"t": 1})
    }
  })().then(console.log);

};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// test
// ipcMain.on('gogogo', (event: IpcMainEvent) => {
//   console.log("gogogogogo", event)
// });
