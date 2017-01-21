type Grid = Array<Array<number>>;

export default class TypeMissDetector {
    private globalDistance: Grid;
    private localDistance: Grid;

    constructor(private regist: string, private input: string) {
        const J: number = regist.length;
        const I: number = input.length;

        this.localDistance = new Array(J);
        this.globalDistance = new Array(J);

        for(let i = 0; i < I; ++i) {
            this.localDistance[i] = new Array(I);
            this.globalDistance[i] = new Array(I);
        }

        for(let j = 0; j < J; ++j) {
            for(let i = 0; i < I; ++i) {
                this.localDistance[j][i] = 1;

                if(regist[j] === input[i]) {
                    this.localDistance[j][i] = 0
                }
            }
        }

        for(let j = 0; j < J; ++j) {
            for(let i = 0; i < I; ++i) {
                console.log(JSON.stringify(this.localDistance[J-1-j]));
            }
        }
    }
}
