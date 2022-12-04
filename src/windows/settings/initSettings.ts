import {BrowserWindow} from "electron";
import path from "path";

export function createSettingsWindow(): void {
    const settingsWindow = new BrowserWindow({
        height: 850,
        width: 600,
        webPreferences: {
            preload: path.join(__dirname, "preloadSettings.js"),
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    settingsWindow.loadFile(path.join(__dirname, "settings.html").replace(/[/\\]dist[/\\]/, '/src/'));
}