import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnotatedImageComponent } from './components/annotated-image/annotated-image.component';
import { AnnotationCanvasComponent } from './components/annotation-canvas/annotation-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    AnnotatedImageComponent,
    AnnotationCanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
