import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mf11Component } from './mf11.component';

describe('Mf11Component', () => {
  let component: Mf11Component;
  let fixture: ComponentFixture<Mf11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mf11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mf11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
