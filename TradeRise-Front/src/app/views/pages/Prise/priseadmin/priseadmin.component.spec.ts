import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriseadminComponent } from './priseadmin.component';

describe('PriseadminComponent', () => {
  let component: PriseadminComponent;
  let fixture: ComponentFixture<PriseadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriseadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriseadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
