import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-annotated-image',
  templateUrl: './annotated-image.component.html',
  styleUrls: ['./annotated-image.component.css']
})
export class AnnotatedImageComponent implements OnInit {
  @ViewChild('image') img: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  private source:string;
  private ctx: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
  }

  update() {
    console.log(this.img.nativeElement);
    let w = this.img.nativeElement.width;
    let h = this.img.nativeElement.height;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.height = 500*h/w;
    this.ctx.drawImage(this.img.nativeElement, 10, 10, 480, 480*h/w);
  }

  onSelectFileChange($event) {

		//cancel check
		let files = $event.srcElement.files;
		if (files.length > 0) {
      console.log($event.srcElement.files[0]);
			//base64 encode file (TODO extract to a service)
			let reader = new FileReader();
			reader.onload = (e) => {
        this.source = (<FileReader>e.target).result.toString();
        //canvas context
			};
			reader.readAsDataURL($event.srcElement.files[0]);
			
		}
	}

}
