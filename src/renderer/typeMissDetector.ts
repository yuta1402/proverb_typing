import Grid from './grid'

const initializeGlobalDistance = (gd: Grid<number>) => {
    for(let i = 0; i < gd.width; ++i) {
        gd.set(i, 0, i);
    }

    for(let j = 0; j < gd.height; ++j) {
        gd.set(0, j, j);
    }
};

const calculateLocalDistance = (ld: Grid<number>, regist: string, input: string) => {
    for(let i = 1; i < ld.width; ++i) {
        for(let j = 1; j < ld.height; ++j) {
            ld.set(i, j, 0);

            if(regist[j-1] !== input[i-1]) {
                ld.set(i, j, 1);
            }
        }
    }
}

const calculateGlobalDistance = (gd: Grid<number>, ld: Grid<number>, path: Grid<number>) => {
    for(let i = 1; i < gd.width; ++i) {
        for(let j = 1; j < gd.height; ++j) {
            const d1 = gd.get(i-1, j  ) +   ld.get(i, j);
            const d2 = gd.get(i-1, j-1) + 2*ld.get(i, j);
            const d3 = gd.get(i  , j-1) +   ld.get(i, j);

            gd.set(i, j, Math.min(d1, d2, d3));

            // コストが同じ場合は経路2を優先
            if(gd.get(i, j) == d2) {
                path.set(i, j, 2);
            } else {
                const distances = new Array(d1, d2, d3);
                path.set(i, j, distances.indexOf(gd.get(i, j))+1);
            }
        }
    }
}

const backTrace = (gd: Grid<number>, path: Grid<number>) => {
    let i = path.width;
    let j = path.height;
    let back = path.get(i, j);

    let insertionError = 0;
    let deletionError = 0;
    let replacementError = 0;

    while(1) {
        if(j <= 0 && i <= 0) {
            break;
        }

        if(back == 1) {
            ++insertionError;
            --i;
        } else if(back == 3) {
            ++deletionError;
            --j;
        } else {
            const prevDistance = gd.get(i, j);
            --j;
            --i;
            if(prevDistance > gd.get(i, j)) {
                ++replacementError;
            }
        }

        back = path.get(i, j);
    }

    return {
        insertionError,
        deletionError,
        replacementError
    };
};

export default class TypeMissDetector {
    private _insertionError: number = 0;
    private _deletionError: number = 0;
    private _replacementError: number = 0;

    constructor(private regist: string, private input: string) {
        // 入力が空文字列の場合
        if(input.length == 0) {
            this._insertionError = 0;
            this._deletionError = regist.length;
            this._replacementError = 0;
            return;
        }

        const jframe: number = regist.length;
        const iframe: number = input.length;

        let ld = new Grid<number>(iframe+1, jframe+1, 0);
        let gd = new Grid<number>(iframe+1, jframe+1, 0);
        let path = new Grid<number>(iframe+1, jframe+1, 0);

        initializeGlobalDistance(gd);
        calculateLocalDistance(ld, regist, input);
        calculateGlobalDistance(gd, ld, path);

        // backtrace
        const { insertionError, deletionError, replacementError } = backTrace(gd, path);

        this._insertionError = insertionError;
        this._deletionError = deletionError;
        this._replacementError = replacementError;
    }

    get insertionError(): number {
        return this._insertionError;
    }

    get deletionError(): number {
        return this._deletionError;
    }

    get replacementError(): number {
        return this._replacementError;
    }
}
