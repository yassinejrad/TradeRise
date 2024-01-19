import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockscomponnentComponent } from './stockscomponnent.component';

describe('StockscomponnentComponent', () => {
  let component: StockscomponnentComponent;
  let fixture: ComponentFixture<StockscomponnentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockscomponnentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockscomponnentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
