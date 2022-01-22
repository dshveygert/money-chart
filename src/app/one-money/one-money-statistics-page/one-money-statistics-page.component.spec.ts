import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneMoneyStatisticsPageComponent } from './one-money-statistics-page.component';

describe('OneMoneyStatisticsPageComponent', () => {
  let component: OneMoneyStatisticsPageComponent;
  let fixture: ComponentFixture<OneMoneyStatisticsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneMoneyStatisticsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneMoneyStatisticsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
