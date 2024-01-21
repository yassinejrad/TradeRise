import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantNavBarComponent } from './consultant-nav-bar.component';

describe('ConsultantNavBarComponent', () => {
  let component: ConsultantNavBarComponent;
  let fixture: ComponentFixture<ConsultantNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultantNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
