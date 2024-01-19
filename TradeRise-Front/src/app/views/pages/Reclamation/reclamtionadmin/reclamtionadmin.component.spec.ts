import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamtionadminComponent } from './reclamtionadmin.component';

describe('ReclamtionadminComponent', () => {
  let component: ReclamtionadminComponent;
  let fixture: ComponentFixture<ReclamtionadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamtionadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamtionadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
