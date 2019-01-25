import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AnnotationCanvasComponent } from '../annotation-canvas/annotation-canvas.component';

@Component({
  selector: 'app-annotated-image',
  templateUrl: './annotated-image.component.html',
  styleUrls: ['./annotated-image.component.css']
})
export class AnnotatedImageComponent implements OnInit {
  @ViewChild('image') image: ElementRef;
  @ViewChild('canvas') canvas: AnnotationCanvasComponent;

  private source:string;
  

  constructor() { }

  ngOnInit() {

  }

  setupCanvas() {
    this.canvas.setup(this.image);
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
