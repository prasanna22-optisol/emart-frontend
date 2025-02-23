import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButton],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  formBuilder=inject(FormBuilder)
  productForm=this.formBuilder.group({
    name: [null,[Validators.required,Validators.minLength(5)]],
    price: [null,[Validators.required]],
    description:[null,[Validators.required,Validators.minLength(5)]],
    discount: [],
    images:this.formBuilder.array([]),
    categoryId:[null,[Validators.required]],
  })

  get images(){
    return this.productForm.get('images') as FormArray
  }

  addProduct() {

  }
}
