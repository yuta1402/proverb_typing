import Stopwatch from './stopwatch'
import TypeMissDetector from './typeMissDetector'

interface PlayerRecord {
    N: number;
    M: number;
    D: number;
    I: number;
    S: number;
    T: number;
}

export default class PlayerRecorder {
    private _N: number = 0;
    private _M: number = 0;
    private _D: number = 0;
    private _I: number = 0;
    private _S: number = 0;
    private _T: number = 0;

    static StorageItemName: string = 'PlayerRecord';

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

    public save() {
        const r = {
            N: this.N,
            M: this.M,
            D: this.D,
            I: this.I,
            S: this.S,
            T: this.T,
        };

        localStorage.setItem(PlayerRecorder.StorageItemName, JSON.stringify(r));
    }
}
