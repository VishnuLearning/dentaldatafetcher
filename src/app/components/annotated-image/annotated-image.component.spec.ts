import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotatedImageComponent } from './annotated-image.component';

describe('AnnotatedImageComponent', () => {
  let component: AnnotatedImageComponent;
  let fixture: ComponentFixture<AnnotatedImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotatedImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotatedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
