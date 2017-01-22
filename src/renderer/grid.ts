export default class Grid<T> {
    private _data: Array<Array<T>>;
    private _width: number;
    private _height: number;

    constructor(width: number, height: number, value?: T) {
        this._data = new Array(height);
        this._width = width;
        this._height = height;

        for(let j = 0; j < height; ++j) {
            this._data[j] = new Array(width);

            if(value !== undefined) {
                this._data[j].fill(value);
            }
        }
    }

    public inBounds(i: number, j: number): boolean {
        return ((0 <= i) && (i < this._width) && (0 <= j) && (j < this._height));
    }

    public get(i: number, j: number): T {
        if(!this.inBounds(i, j)) {
            return null;
        }

        return this._data[j][i];
    }

    public set(i: number, j: number, value: T): void {
        if(!this.inBounds(i, j)) {
            return;
        }

        this._data[j][i] = value;
    }

    public fill(value: T): void {
        for(let j = 0; j < this._height; ++j) {
            this._data[j].fill(value);
        }
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }
}
