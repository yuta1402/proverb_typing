import { app, BrowserWindow } from 'electron';
import path = require('path');
import url = require('url');

let win: Electron.BrowserWindow;

app.disableHardwareAcceleration()

const createWindow = () => {
    win = new BrowserWindow({
        width: 960,
        height: 540,
        resizable: false,
        fullscreenable: false,
    });

    win.setMenu(null);

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'title.html'),
        protocol: 'file:',
        slashes: true,
    }))

    // win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(win === null) {
        createWindow();
    }
});

// declare global {
//     namespace NodeJS {
//         interface Global {
//             sharedObject: any;
//             test: string;
//         }
//     }
// }
