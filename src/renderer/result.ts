import * as url from 'url'
import * as path from 'path'
import { remote } from 'electron'
import PlayerRecorder from './playerRecorder'

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

const playerRecord = JSON.parse(localStorage.getItem('PlayerRecord'))
const ElemNames = ['N', 'M', 'D', 'I', 'S', 'T', 'inputTimeAverage', 'score'];

// 結果を反映させる
for(let n of ElemNames) {
    const e = document.getElementById(n);
    e.textContent = String(playerRecord[n]);
}

console.log(playerRecord);
