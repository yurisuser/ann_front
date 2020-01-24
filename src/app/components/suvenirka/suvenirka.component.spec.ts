import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuvenirkaComponent } from './suvenirka.component';

describe('SuvenirkaComponent', () => {
  let component: SuvenirkaComponent;
  let fixture: ComponentFixture<SuvenirkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuvenirkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuvenirkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
