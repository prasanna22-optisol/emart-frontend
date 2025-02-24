import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../types/category';
import { APIResponse } from '../../../types/api_response';

@Component({
  styleUrls: ['./header.component.scss'],
  imports: [FormsModule,MatIconModule],
  templateUrl: './header.component.html',
  selector: 'app-header'
})
export class HeaderComponent  implements OnInit {


    ngOnInit(): void {
      this.categoryService.getAllCategories().subscribe((res: APIResponse<Category[]>) => {
        this.categoryList = res.data;
      });
    }

    categoryService=inject(CategoryService)
    categoryList: Category[]=[]

    // authService: any;
    onSearch($event: Event) {
    }
    searchTerm: any;

    searchCategory(arg0: any) {
    }

    logout() {
    }

}
