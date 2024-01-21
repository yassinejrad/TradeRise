import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantSideBarComponent } from './consultant-side-bar.component';

describe('ConsultantSideBarComponent', () => {
  let component: ConsultantSideBarComponent;
  let fixture: ComponentFixture<ConsultantSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultantSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
