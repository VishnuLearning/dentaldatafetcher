import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Annotation } from 'src/app/models/annotation';
import { CanvasImage } from 'src/app/models/canvasimage';

@Component({
  selector: 'app-annotation-canvas',
  templateUrl: './annotation-canvas.component.html',
  styleUrls: ['./annotation-canvas.component.css']
})
export class AnnotationCanvasComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  
  private ctx: CanvasRenderingContext2D;
  private mouseDown: boolean = false;
  private startx:number;
  private starty:number;
  private annotations:Annotation[];
  private currentAnnotation: Annotation;
  private annotationImage: CanvasImage;
  constructor() {
    this.annotations = new Array<Annotation>();
  }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.font = "12px Arial";
    this.annotationImage = new CanvasImage(this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  setup(t: ElementRef) {
    this.annotationImage.image = t;
    this.annotationImage.draw(this.ctx);
  }

  refresh() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.annotationImage.draw(this.ctx);
    this.annotations.forEach(element => {
      element.draw(this.ctx);
    });
  }

  getX(x) {
    return x - this.canvas.nativeElement.offsetLeft;
  }

  getY(y) {
    return y - this.canvas.nativeElement.offsetTop;
  }

  @HostListener('mouseup', ['$event'])
  onMouseup(event: MouseEvent) {
    if(this.mouseDown) {
      this.mouseDown = false;
    }
    else {
      for (let i = 0; i < this.annotations.length; i++) {
        if (this.annotations[i].contains(this.getX(event.clientX), this.getY(event.clientY))) {
          // set boundary to green. Not great code, will refactor later
          // this will suggest user of the shape he selected.
          // important for overlapping boundaries
          this.annotations[i].strokeStyle = "orange";
          this.refresh();
          //TODO: display form to get details.
          //form will have option to delete, edit title, description, 
          //possibly pick stroke and fill color as well but that is for later
          this.annotations[i].title = window.prompt("enter title");
          this.annotations[i].strokeStyle = "red";
          this.refresh();
          break;
        }
      }
    }
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if (this.mouseDown) {
      let x = this.getX(event.clientX);
      let y = this.getY(event.clientY);
      this.currentAnnotation.setExtents(this.startx, x, this.starty, y);
      this.refresh();
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    if (event.altKey || event.ctrlKey) {
      this.mouseDown = true;
      this.startx = this.getX(event.clientX);
      this.starty = this.getY(event.clientY);
      this.currentAnnotation = new Annotation();
      this.annotations.push(this.currentAnnotation);
    } 
  }

}

