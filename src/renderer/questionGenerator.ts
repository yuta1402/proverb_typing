import * as fs from 'fs'
import * as path from 'path'

const FileName: string = 'data/statement.json';
const StatementFilePath: string = path.join(__dirname, FileName);

const randomInt = (low: number, high: number) => {
    return Math.floor(Math.random() * (high - low + 1) + low);
};

interface Question {
    english: string;
    japanese: string;
}

export default class QuestionGenerator {
    private index: number;
    private questions: Array<Question>;
    private allQuestions: Array<Question>;

    constructor(private numQuestion: number = 10) {
        this.allQuestions = JSON.parse(fs.readFileSync(StatementFilePath, 'utf-8'));
        this.init();
    }

    public init(): void {
        this.index = 0;
        this.questions = new Array<Question>();

        for (let i = 0; i < this.numQuestion; ++i) {
            const r = randomInt(0, this.allQuestions.length - 1);
            const it = this.allQuestions[r];
            this.questions.push(it);
        }
    }

    public next(): Question {
        this.index++;

        if(this.isEnd()) {
            return null;
        }

        return this.questions[this.index];
    }

    public current(): Question {
        if(this.isEnd()) {
            return null;
        }

        return this.questions[this.index];
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
        return this.index >= this.numQuestion;
    }
}
