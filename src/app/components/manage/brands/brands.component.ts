import {Component, inject, ViewChild} from '@angular/core';
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
import {Brand} from '../../../../types/brand';
import {BrandService} from '../../../services/brand.service';
import {MatButton} from '@angular/material/button';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-brands',
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
    MatButton,
    TitleCasePipe,
    MatHeaderCellDef,
    MatNoDataRow
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  debugClick() {
    console.log("CLicked")
  }
  displayedColumns: string[] = ['_id', 'name','action'];
  dataSource: MatTableDataSource<Brand>;

  router=inject(Router)
  route=inject(ActivatedRoute)

  isReady:boolean=false



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  brandService=inject(BrandService)
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
    this.brandService.getAllBrands().subscribe((result: APIResponse<Brand[]>) => {
      console.log(result);
      this.dataSource.data = result.data;
      console.log(this.dataSource.data);
    });
  }

  deleteBrand(id:string){
    this.brandService.deleteBrand(id).subscribe((result:APIResponse<Brand>)=>{
      alert("Brand deleted!")
      console.log(result)
      setTimeout(()=>{
        location.reload()
        this.router.navigate(['/admin/brands'])
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
