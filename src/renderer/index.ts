import * as fs from 'fs'
import * as path from 'path'

interface Question {
    english: string;
    japanese: string;
}

const randomInt = (low: number, high: number) => {
    return Math.floor(Math.random() * (high - low + 1) + low);
};

const validKeyListFilePath: string = path.join(__dirname, 'data/validKeyList.json');
const validKeys: Array<string> = JSON.parse(fs.readFileSync(validKeyListFilePath, 'utf-8'));

let questionIndex = 0;
let keyQueue = '';
const originalWordElement = document.getElementById('originalWord');
const typedWordElement = document.getElementById('typedWord');

const statementFilePath: string = path.join(__dirname, 'data/statement.json');
const questions: Array<Question> = JSON.parse(fs.readFileSync(statementFilePath, 'utf-8'));

if(questions.length > 0) {
    originalWordElement.textContent = questions[0].english;
}

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
        questionIndex++;
        originalWordElement.textContent = questions[questionIndex].english;
        keyQueue = '';
        typedWordElement.textContent = '';
        return;
    }

    keyQueue += e.key;
    typedWordElement.textContent = keyQueue;
});
