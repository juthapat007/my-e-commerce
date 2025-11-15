import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsService } from '../services/products.service'; 

describe('Products', () => {
  let component: ProductsService;
  let fixture: ComponentFixture<ProductsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
