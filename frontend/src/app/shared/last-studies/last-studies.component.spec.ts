import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastStudiesComponent } from './last-studies.component';

describe('LastStudiesComponent', () => {
  let component: LastStudiesComponent;
  let fixture: ComponentFixture<LastStudiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastStudiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
