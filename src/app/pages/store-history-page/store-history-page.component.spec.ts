import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreHistoryPageComponent } from './store-history-page.component';

describe('StoreHistoryPageComponent', () => {
  let component: StoreHistoryPageComponent;
  let fixture: ComponentFixture<StoreHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreHistoryPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
