import {Component, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { APIResponse } from '../../../../types/api_response';
import { Category } from '../../../../types/category';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-category-form',
  imports: [FormsModule, MatInputModule, MatButtonModule,MatSelectModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit{

  name!:string

  categoryService=inject(CategoryService)
  router=inject(Router)
  route=inject(ActivatedRoute)
  isEdit=false
  id!:string

  addCategory(){
    console.log(this.name)
    this.categoryService.addCategory(this.name).subscribe((result:APIResponse<Category>)=>{
      console.log(result)
      this.router.navigate(['/admin/categories'])
    })
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"]
    console.log(this.id)
    if(this.id){
      this.isEdit=true
      this.categoryService.getCategoryById(this.id).subscribe((result:APIResponse<Category>)=>{
        console.log(result)
        this.name=result.data.name
      })
    }
  }

  updateCategory() {
    console.log(this.name)
    this.categoryService.updateCategory(this.id,this.name).subscribe((result:APIResponse<Category>)=>{
      alert("Category updated!")
      console.log(result)
      this.router.navigate(['/admin/categories'])
    })
  }


}
