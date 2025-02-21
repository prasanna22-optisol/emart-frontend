import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { APIResponse } from '../../../../types/api_response';
import { Category } from '../../../../types/category';

@Component({
  selector: 'app-category-form',
  imports: [FormsModule, MatInputModule, MatButtonModule,MatSelectModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {

  name!:string

  categoryService=inject(CategoryService)

  addCategory(){
    console.log(this.name)
    this.categoryService.addCategory(this.name).subscribe((result:APIResponse<Category>)=>{
      console.log(result)
    })
  }

}
