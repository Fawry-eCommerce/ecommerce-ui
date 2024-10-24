import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDetailsPageComponent } from './store-details-page.component';

describe('StoreDetailsPageComponent', () => {
  let component: StoreDetailsPageComponent;
  let fixture: ComponentFixture<StoreDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
