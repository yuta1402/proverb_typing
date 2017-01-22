type Grid = Array<Array<number>>;

const backTrace = (gd: Grid, path: Grid, jframe: number, iframe: number) => {
    let j = jframe;
    let i = iframe;
    let back = path[jframe][iframe];

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
            const prevDistance = gd[j][i];
            --j;
            --i;
            if(prevDistance > gd[j][i]) {
                ++replacementError;
            }
        }

        back = path[j][i];
    }

    return {
        insertionError,
        deletionError,
        replacementError
    };
}

export default class TypeMissDetector {
    private _insertionError: number = 0;
    private _deletionError: number = 0;
    private _replacementError: number = 0;

    constructor(private regist: string, private input: string) {
        const jframe: number = regist.length;
        const iframe: number = input.length;

        let ld: Grid = new Array(jframe+1);
        let gd: Grid = new Array(jframe+1);
        let path: Grid = new Array(jframe+1);

        for(let j = 0; j < jframe+1; ++j) {
            ld[j] = new Array(iframe+1);
            gd[j] = new Array(iframe+1);
            path[j] = new Array(iframe+1);

            ld[j].fill(0);
            gd[j].fill(0);
            path[j].fill(0);
        }

        // initialize global distance
        for(let j = 0; j < jframe+1; ++j) {
            gd[j][0] = j;
        }

        // initialize global distance
        for(let i = 0; i < iframe+1; ++i) {
            gd[0][i] = i;
        }

        // calculate local distance
        for(let j = 1; j < jframe+1; ++j) {
            for(let i = 1; i < iframe+1; ++i) {
                ld[j][i] = 0;

                if(regist[j-1] !== input[i-1]) {
                    ld[j][i] = 1
                }
            }
        }

        // calculate global distance
        for(let j = 1; j < jframe+1; ++j) {
            for(let i = 1; i < iframe+1; ++i) {
                const d1 = gd[j][i-1] + ld[j][i];
                const d2 = gd[j-1][i-1] + 2*ld[j][i];
                const d3 = gd[j-1][i] + ld[j][i];

                gd[j][i] = Math.min(d1, d2, d3);

                // コストが同じ場合は経路2を優先
                if(gd[j][i] == d2) {
                    path[j][i] = 2;
                } else {
                    const distances = new Array(d1, d2, d3);
                    path[j][i] = distances.indexOf(gd[j][i])+1;
                }
            }
        }

        // backtrace
        const { insertionError, deletionError, replacementError } = backTrace(gd, path, jframe, iframe);

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
