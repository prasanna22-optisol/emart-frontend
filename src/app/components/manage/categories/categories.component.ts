import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CdkTableDataSourceInput} from '@angular/cdk/table';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../../types/category';
import { APIResponse } from '../../../../types/api_response';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {MatButton} from '@angular/material/button';


@Component({
  selector: 'app-categories',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, RouterModule, MatButton],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements AfterViewInit,OnInit {
debugClick() {
  console.log("CLicked")
}
  displayedColumns: string[] = ['_id', 'name','action'];
  dataSource: MatTableDataSource<Category>;

  router=inject(Router)
  route=inject(ActivatedRoute)

  isReady:boolean=false



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  categoryService=inject(CategoryService);
  constructor() {
    setTimeout(()=>{
      this.isReady=true
    },3000)
    this.dataSource = new MatTableDataSource([] as any);
  }
  ngOnInit(){
    this.getServerData();
  }
  private getServerData() {
    this.categoryService.getAllCategories().subscribe((result: APIResponse<Category[]>) => {
      console.log(result);
      this.dataSource.data = result.data;
      console.log(this.dataSource.data);
    });
  }

  deleteCategory(id:string){
    this.categoryService.deleteCategory(id).subscribe((result:APIResponse<Category>)=>{
      alert("Category deleted!")
      console.log(result)
      setTimeout(()=>{
        location.reload()
        this.router.navigate(['/admin/categories'])
      },3000)
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
