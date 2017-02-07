import * as fs from 'fs'
import * as path from 'path'

const FileName: string = 'data/statement.json';
const StatementFilePath: string = path.join(__dirname, FileName);

const randomInt = (low: number, high: number) => {
    return Math.floor(Math.random() * (high - low + 1) + low);
};

// Fisher-Yaste Algorithm
const randomShuffle = <T>(array: Array<T>) => {
    let m = array.length;

    while(m) {
        const i = Math.floor(Math.random() * m--);
        const t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
};

interface Question {
    english: string;
    japanese: string;
}

export default class QuestionGenerator {
    private _index: number;
    private questions: Array<Question>;
    private allQuestions: Array<Question>;

    constructor(private numQuestion: number = 10) {
        this.allQuestions = JSON.parse(fs.readFileSync(StatementFilePath, 'utf-8'));
        this.init();
    }

    public init(): void {
        this._index = 0;
        this.questions = new Array<Question>();

        // for (let i = 0; i < this.numQuestion; ++i) {
        //     const r = randomInt(0, this.allQuestions.length - 1);
        //     const it = this.allQuestions[r];
        //     this.questions.push(it);
        // }

        randomShuffle(this.allQuestions);

        for(let i = 0; i < this.numQuestion; ++i) {
            const it = this.allQuestions[i];
            this.questions.push(it);
        }
    }

    public next(): Question {
        this._index++;

        if(this.isEnd()) {
            return null;
        }

        return this.questions[this._index];
    }

    public current(): Question {
        if(this.isEnd()) {
            return null;
        }

        return this.questions[this._index];
    }

    public currentEnglish(): string {
        if(this.isEnd()) {
            return null;
        }

        return this.current().english;
    }

    public currentJapanese(): string {
        if(this.isEnd()) {
            return null;
        }

        return this.current().japanese;
    }

    public isEnd(): boolean {
        return this._index >= this.numQuestion;
    }

    get index(): number {
        return this._index;
    }
}
