// Electron 主进程

import {HandleBotsChat} from "@/handler";

const { app, BrowserWindow } = require('electron')
import path from 'path';
import {initBrowserViews} from "%/framework/layout";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: false,
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

  const usingURL = MAIN_WINDOW_VITE_DEV_SERVER_URL ? MAIN_WINDOW_VITE_DEV_SERVER_URL + "/editor" : undefined
  console.log("usingURL ==", MAIN_WINDOW_VITE_DEV_SERVER_URL, MAIN_WINDOW_VITE_NAME, usingURL)

  const [vmBot1, vmEditor, vmBot2] = await initBrowserViews(mainWindow, [
    {
      url: 'https://www.ciciai.com',
      runtimeScriptFile: "cici_runtime.js",
      ratio: 0.3,
      zoomFactor: 0.8,
    },
    {
      url: usingURL,
      file: MAIN_WINDOW_VITE_DEV_SERVER_URL ? undefined : path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      runtimeScriptFile: "test_runtime.js",
      ratio: 0.4,
      zoomFactor: 1,
    },
    {
      url: 'https://www.ciciai.com',
      runtimeScriptFile: "cici_runtime.js",
      ratio: 0.3,
      zoomFactor: 0.8,
    },
  ])

  vmEditor.view.webContents.openDevTools({mode: 'undocked'});

  HandleBotsChat(vmEditor, vmBot1, vmBot2)
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
