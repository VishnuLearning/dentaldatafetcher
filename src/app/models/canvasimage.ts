import { ElementRef } from '@angular/core';

export class CanvasImage {
    private _image: ElementRef;
    private aspect: number;
    private width: number;
    private height: number;

    set image(i: ElementRef) {
        this._image = i;
        let h = i.nativeElement.height;
        let w = i.nativeElement.width;
        this.aspect = h / w;
    }

    constructor(w: number, h: number) {
        this.width = w;
        this.height = h;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this._image) {
            ctx.drawImage(this._image.nativeElement, 0, 0, this.width, this.width * this.aspect);
        }
    }


}