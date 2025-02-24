import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  MatInputModule
} from '@angular/material/input';
import {
  MatButton
} from '@angular/material/button';
import {
  CommonModule
} from '@angular/common';
import {
  MatSelectModule
} from '@angular/material/select';
import {
  Brand
} from '../../../../types/brand';
import {
  Category
} from '../../../../types/category';
import {
  CategoryService
} from '../../../services/category.service';
import {
  BrandService
} from '../../../services/brand.service';
import {
  APIResponse
} from '../../../../types/api_response';
import {
  ProductService
} from '../../../services/product.service';
import {
  Product
} from '../../../../types/product';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  MatCheckboxModule
} from '@angular/material/checkbox';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButton, CommonModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {




  formBuilder = inject(FormBuilder)
  productForm = this.formBuilder.group({
    name: [null as string | null, [Validators.required, Validators.minLength(5)]],
    price: [null as number | null, [Validators.required]],
    description: [null as string | null, [Validators.required, Validators.minLength(5)]],
    discount: [null as number | null],
    images: this.formBuilder.array([]),
    categoryId: [
      [],
      [Validators.required], null as string[] | null
    ],
    brandId: [
      [],
      [Validators.required], null as string[] | null
    ],
    isFeatured: [false],
    isNewProduct: [false]
  })

  brands: Brand[] = []
  categories: Category[] = []
  categoryService = inject(CategoryService)
  brandService = inject(BrandService)
  productService = inject(ProductService)
  router = inject(Router)
  id!: string
  route = inject(ActivatedRoute)

  ngOnInit() {
    this.addImage()
    this.categoryService.getAllCategories().subscribe((result: APIResponse < Category[] > ) => {
      console.log(result)
      this.categories = result.data
    })
    this.brandService.getAllBrands().subscribe((result: APIResponse < Brand[] > ) => {
      console.log(result)
      this.brands = result.data
    })
    this.id = this.route.snapshot.params['id']
    console.log(this.id)
    if (this.id) {
      this.productService.getProductById(this.id).subscribe((result: APIResponse < Product > ) => {
        console.log(result);

        if (result.data) {
          const product = result.data;

          for (let i = 0; i < (product.images?.length ?? 0); i++) {
            this.addImage();
          }

          this.productForm.patchValue({
            name: product.name,
            price: product.price,
            description: product.description,
            discount: product.discount,
            isFeatured: !!product.isFeatured,
            isNewProduct: !!product.isNewProduct,
            categoryId: Array.isArray(product.categoryId) ?
              product.categoryId.map(cat => cat._id) :
              product.categoryId ? [product.categoryId] : [],
            brandId: Array.isArray(product.brandId) ?
              product.brandId.map(brand => brand._id) :
              product.brandId ? [product.brandId] : [],
          });

          this.images.clear();
          if (product.images && product.images.length > 0) {
            product.images.forEach(image => {
              this.images.push(this.formBuilder.control(image));
            });
          }
        }
      });
    } else {
      this.addImage()
    }
  }

  addImage() {
    this.images.push(this.formBuilder.control(null))
  }

  get images() {
    return this.productForm.get('images') as FormArray
  }

  removeImage() {
    this.images.removeAt(this.images.controls.length - 1)
  }

  addProduct() {
    let val = this.productForm.value
    console.log(val)
    this.productService.addProduct(val as any).subscribe((result: APIResponse < Product > ) => {
      console.log(result)
      this.router.navigate(['/admin/products'])
    })
  }

  updateProduct() {
    let val = this.productForm.value
    console.log(val)
    this.productService.updateProduct(this.id, val as any).subscribe((result: APIResponse < Product > ) => {
      console.log(result)
      alert('Updated product : ' + result.data.name)
      this.router.navigate(['/admin/products'])
    })
  }


}
