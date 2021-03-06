import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../../shared/service/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../shared/service/product.service';
import {take} from 'rxjs/operators';
import {Product} from '../../../shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: any = { };
  id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      // @ts-ignore
      this.productService.get(this.id).valueChanges().pipe(take(1)).subscribe(p => this.product = p);
    }
  }
  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['admin/products']);
  }
  delete() {
    if (!confirm('你確定要刪除這項產品嗎?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['admin/products']);
  }

  ngOnInit() {
  }

}
