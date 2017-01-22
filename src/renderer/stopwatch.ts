interface Time {
    ms: number;
    sec: number;
}

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
}
