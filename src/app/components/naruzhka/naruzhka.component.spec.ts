import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaruzhkaComponent } from './naruzhka.component';

describe('NaruzhkaComponent', () => {
  let component: NaruzhkaComponent;
  let fixture: ComponentFixture<NaruzhkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaruzhkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaruzhkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
