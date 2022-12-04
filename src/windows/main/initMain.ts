import {BrowserWindow} from "electron";
import path from "path";
import makeWindowFullyDraggable from "../../makeWindowFullyDraggable";

export function createMainWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 200,
        width: 900,
        webPreferences: {
            preload: path.join(__dirname, "preloadMain.js"),
            nodeIntegration: true
        },
        transparent: true,
        frame: false,
        resizable: true,
        movable: true
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "index.html").replace(/[/\\]dist[/\\]/, '/src/'));

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    makeWindowFullyDraggable(mainWindow);
}