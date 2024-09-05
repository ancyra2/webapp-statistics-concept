import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptiveTableComponent } from './descriptive-table.component';

describe('DescriptiveTableComponent', () => {
  let component: DescriptiveTableComponent;
  let fixture: ComponentFixture<DescriptiveTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptiveTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptiveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
