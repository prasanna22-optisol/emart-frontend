import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Category} from '../../../../types/category';
import {CategoryService} from '../../../services/category.service';
import {APIResponse} from '../../../../types/api_response';
import {ProductService} from '../../../services/product.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatInput,
    MatLabel,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    RouterLinkActive,
    RouterLink,
    MatHeaderCellDef,
    MatNoDataRow,
    TitleCasePipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements AfterViewInit,OnInit {
  debugClick() {
    console.log("CLicked")
  }
  displayedColumns: string[] = ['_id', 'name','description','price','discount','action'];
  dataSource: MatTableDataSource<Category>;

  router=inject(Router)
  route=inject(ActivatedRoute)


  isReady:boolean=false



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productService=inject(ProductService)
  constructor() {
    setTimeout(()=>{
      this.isReady=true
    },400)
    this.dataSource = new MatTableDataSource([] as any);
  }
  ngOnInit(){
    this.getServerData();
  }
  private getServerData() {
    this.productService.getAllProducts().subscribe((result: APIResponse<Category[]>) => {
      console.log(result);
      this.dataSource.data = result.data;
      console.log(this.dataSource.data);
    });
  }

  deleteProduct(id:string){
    this.productService.deleteProduct(id).subscribe((result:APIResponse<Category>)=>{
      alert("Category deleted!")
      console.log(result)
      setTimeout(()=>{
        location.reload()
        this.router.navigate(['/admin/products'])
      },500)
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
