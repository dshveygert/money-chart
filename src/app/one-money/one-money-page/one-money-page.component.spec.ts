import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneMoneyPageComponent } from './one-money-page.component';

describe('OneMoneyPageComponent', () => {
  let component: OneMoneyPageComponent;
  let fixture: ComponentFixture<OneMoneyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneMoneyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneMoneyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
