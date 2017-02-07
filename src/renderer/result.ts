import * as url from 'url'
import * as path from 'path'
import { remote } from 'electron'

const win = remote.getCurrentWindow();

document.addEventListener('keydown', (e) => {
    if(e.key == ' ') {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'title.html'),
            protocol: 'file:',
            slashes: true,
        }));
    }
});

console.log(remote.getGlobal('sharedObject').playerRecord);

console.log(JSON.parse(localStorage.getItem('test')));
