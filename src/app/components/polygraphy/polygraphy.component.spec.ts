import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolygraphyComponent } from './polygraphy.component';

describe('PolygraphyComponent', () => {
  let component: PolygraphyComponent;
  let fixture: ComponentFixture<PolygraphyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolygraphyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolygraphyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
