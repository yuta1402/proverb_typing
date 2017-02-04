interface Time {
    ms: number;
    sec: number;
    clock: string;
}

const toDoubleDigits = (num: number) => {
    let str = num.toString();

    if(str.length === 1) {
        str = ('0' + str).slice(-2);
    }

    return str;
};

export default class Stopwatch {
    private startTime_: Date;
    private intervalID_: NodeJS.Timer;
    private elapsedMillisec_: number;

    constructor() {
    }

    public start(step?: (t: Time) => void): void {
        this.startTime_ = new Date();

        this.intervalID_ = setInterval(() => {
            const currentTime = new Date();
            this.elapsedMillisec_ = currentTime.getTime() - this.startTime_.getTime();

            if(step !== undefined) {
                step(this);
            }
        }, 1);
    }

    public stop(): void {
        clearInterval(this.intervalID_);
    }

    get sec(): number {
        return Math.floor(this.elapsedMillisec_ / 1000);
    }

    get ms(): number {
        return this.elapsedMillisec_;
    }

    get clock(): string {
        const s = this.sec % 60;
        const m = Math.floor(this.sec / 60) % 60;

        const t = toDoubleDigits(m) + ':' + toDoubleDigits(s);

        return t;
    }
}
