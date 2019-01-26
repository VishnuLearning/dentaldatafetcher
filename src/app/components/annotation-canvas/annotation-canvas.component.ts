import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-annotation-canvas',
  templateUrl: './annotation-canvas.component.html',
  styleUrls: ['./annotation-canvas.component.css']
})
export class AnnotationCanvasComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  private _thumbnail: ElementRef;
  private ctx: CanvasRenderingContext2D;
  private mouseDown: boolean = false;
  private startx:number;
  private starty:number;

  constructor() { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  setup(t: ElementRef) {
    this._thumbnail = t;
    let h = this._thumbnail.nativeElement.height;
    let w = this._thumbnail.nativeElement.width;
    this.canvas.nativeElement.height = 500 * h / w;
    this.ctx.drawImage(this._thumbnail.nativeElement, 10, 10, 480, 480 * h / w);
  }

  getX(x) {
    return x - this.canvas.nativeElement.offsetLeft;
  }

  getY(y) {
    return y - this.canvas.nativeElement.offsetTop;
  }

  @HostListener('mouseup', ['$event'])
  onMouseup(event: MouseEvent) {
    this.mouseDown = false;
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if (this.mouseDown) {
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      let x = this.getX(event.clientX);
      let y = this.getY(event.clientY);
      let w = Math.abs(x - this.startx);
      let h = Math.abs(y - this.starty);
      let sx = Math.min(x, this.startx);
      let sy = Math.min(y, this.starty);
      this.ctx.rect(sx, sy, w, h);
      this.ctx.strokeRect(sx, sy, w, h);
      this.ctx.strokeStyle = "#FF0000";
      console.log(sx, sy, w, h);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    this.mouseDown = true;
    this.startx = this.getX(event.clientX);
    this.starty = this.getY(event.clientY);
  }

}

