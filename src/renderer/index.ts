import * as fs from 'fs'
import * as path from 'path'
import QuestionGenerator from './questionGenerator'
import TypeMissDetector from './typeMissDetector'

const randomInt = (low: number, high: number) => {
    return Math.floor(Math.random() * (high - low + 1) + low);
};

const validKeyListFilePath: string = path.join(__dirname, 'data/validKeyList.json');
const validKeys: Array<string> = JSON.parse(fs.readFileSync(validKeyListFilePath, 'utf-8'));

let keyQueue = '';
const japaneseWordElement = document.getElementById('japaneseWord');
const originalWordElement = document.getElementById('originalWord');
const typedWordElement = document.getElementById('typedWord');

const questionGenerator = new QuestionGenerator();

japaneseWordElement.textContent = questionGenerator.currentJapanese();
originalWordElement.textContent = questionGenerator.currentEnglish();

const statementFilePath: string = path.join(__dirname, 'data/statement.json');

// const globalDistance = new Array<Array<number>>();

document.addEventListener('keydown', (e) => {
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
        const q = questionGenerator.next();

        if(q === null) {
            return;
        }

        japaneseWordElement.textContent = q.japanese;
        originalWordElement.textContent = q.english;
        keyQueue = '';
        typedWordElement.textContent = '';

        return;
    }

    keyQueue += e.key;
    typedWordElement.textContent = keyQueue;
});
