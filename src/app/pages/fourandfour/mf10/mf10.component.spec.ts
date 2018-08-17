import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mf10Component } from './mf10.component';

describe('Mf10Component', () => {
  let component: Mf10Component;
  let fixture: ComponentFixture<Mf10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mf10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mf10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
