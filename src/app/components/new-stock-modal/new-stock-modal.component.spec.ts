import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStockModalComponent } from './new-stock-modal.component';

describe('NewStockModalComponent', () => {
  let component: NewStockModalComponent;
  let fixture: ComponentFixture<NewStockModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewStockModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewStockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
