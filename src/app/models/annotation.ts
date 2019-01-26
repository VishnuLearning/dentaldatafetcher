export class Annotation {
    private _title: string = "";
    private _description: string = "";
    left: number;
    right: number;
    top: number;
    bottom: number;
    fillStyle: string;
    strokeStyle: string;

    constructor(l:number=0, b:number=0, r:number=0, t:number=0, f:string='rgba(255,0,0,0.1)') {
        this.setExtents(l, r, t, b);
        this.strokeStyle = "#FF0000";
        this.fillStyle = f;
    }

    // Draws this shape to a given context
    draw(ctx:CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.rect(this.left, this.top, this.width(), this.height());
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.fill();
        ctx.stroke();
        //ctx.strokeRect(this.left, this.top, this.width(), this.height());
    }

    // Determine if a point is inside the shape's bounds
    contains(x:number, y:number):boolean {
        return this.left<=x && this.right>=x && this.top>=y && this.bottom<=y;
    }
    
    set title(t: string) {
        this._title = t;
    }

    get title():string {
        return this._title;
    }

    set description(t: string) {
        this._description = t;
    }

    get description():string {
        return this._description;
    }

    width():number {
        return this.right - this.left;
    }

    height():number {
        return this.bottom - this.top;
    }

    setExtents(x1:number, x2:number, y1:number, y2:number) {
        this.left = Math.min(x1, x2);
        this.top = Math.max(y1, y2);
        this.right = Math.max(x1, x2);
        this.bottom = Math.min(y1, y2);
    }
}