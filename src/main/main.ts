import { app, BrowserWindow } from 'electron';
import path = require('path');
import url = require('url');

let win: Electron.BrowserWindow;

app.disableHardwareAcceleration()

const createWindow = () => {
    win = new BrowserWindow({
        width: 960,
        height: 540,
        resizable: true,
        fullscreenable: true,
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'title.html'),
        protocol: 'file:',
        slashes: true,
    }))

    win.webContents.openDevTools();

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

interface PlayerRecord {
    N: number;
    M: number;
    D: number;
    I: number;
    S: number;
    T: number;
}

declare global {
    namespace NodeJS {
        interface Global {
            sharedObject: any;
            test: string;
        }
    }
}

global.sharedObject = new Object();
