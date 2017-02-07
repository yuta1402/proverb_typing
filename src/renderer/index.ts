import * as fs from 'fs'
import * as url from 'url'
import * as path from 'path'
import QuestionGenerator from './questionGenerator'
import TypeMissDetector from './typeMissDetector'
import Stopwatch from './stopwatch'

import { remote } from 'electron'

const validKeyListFilePath: string = path.join(__dirname, 'data/validKeyList.json');
const validKeys: Array<string> = JSON.parse(fs.readFileSync(validKeyListFilePath, 'utf-8'));

let keyQueue = '';
let isEnd = false;

const questionGenerator = new QuestionGenerator(10);

const japaneseWordElement = document.getElementById('japaneseWord');
const originalWordElement = document.getElementById('originalWord');
const typedWordElement    = document.getElementById('typedWord');

japaneseWordElement.textContent = questionGenerator.currentJapanese();
originalWordElement.textContent = questionGenerator.currentEnglish();

japaneseWordElement.addEventListener('animationend', (e) => {
    japaneseWordElement.classList.remove('text-scale-up');
});

originalWordElement.addEventListener('animationend', (e) => {
    originalWordElement.classList.remove('text-scale-up');
});

interface PlayerRecord {
    N: number;
    M: number;
    D: number;
    I: number;
    S: number;
    T: number;
}

class PlayerRecorder {
    private _N: number = 0;
    private _M: number = 0;
    private _D: number = 0;
    private _I: number = 0;
    private _S: number = 0;
    private _T: number = 0;

    constructor() {
    }

    public update(question: string, typed: string, stopwatch: Stopwatch) {
        this._N += question.length;
        this._M += typed.length;
        this._T = stopwatch.ms;

        const tmd = new TypeMissDetector(question, typed);
        this._D += tmd.deletionError;
        this._I += tmd.insertionError;
        this._S += tmd.replacementError;
    }

    get N() { return this._N; }
    get M() { return this._M; }
    get D() { return this._D; }
    get I() { return this._I; }
    get S() { return this._S; }
    get T() { return this._T; }

    public makePlayerRecord() {
        const r = {
            N: this.N,
            M: this.M,
            D: this.D,
            I: this.I,
            S: this.S,
            T: this.T,
        };

        return r;
    }
}

const playerRecorder = new PlayerRecorder();
remote.getGlobal('sharedObject').playerRecord = playerRecorder;
console.log(remote.getGlobal('sharedObject'));

const currentTimeElement = document.getElementById('currentTime');
const stopwatch = new Stopwatch();

stopwatch.start((t) => {
    currentTimeElement.textContent = t.clock;
});

const win = remote.getCurrentWindow();

document.addEventListener('keydown', (e) => {
    if(isEnd) {
        return;
    }

    if(e.key == 'Escape') {
        keyQueue = '';
        typedWordElement.textContent = '';
        return;
    }

    if(validKeys.indexOf(e.key) < 0) {
        return;
    }

    if(e.key == 'Backspace') {
        keyQueue = keyQueue.substr(0, keyQueue.length - 1);
        typedWordElement.textContent = keyQueue;
        return;
    }

    if(e.key == 'Enter') {
        playerRecorder.update(questionGenerator.currentEnglish(), keyQueue, stopwatch);
        localStorage.setItem('test', JSON.stringify(playerRecorder.makePlayerRecord()));

        const q = questionGenerator.next();

        if(q === null) {
            isEnd = true;

            win.loadURL(url.format({
                pathname: path.join(__dirname, 'result.html'),
                protocol: 'file:',
                slashes: true,
            }));

            return;
        }

        japaneseWordElement.textContent = q.japanese;
        originalWordElement.textContent = q.english;

        japaneseWordElement.classList.add('text-scale-up');
        originalWordElement.classList.add('text-scale-up');

        keyQueue = '';
        typedWordElement.textContent = '';

        return;
    }

    keyQueue += e.key;
    typedWordElement.textContent = keyQueue;
});
