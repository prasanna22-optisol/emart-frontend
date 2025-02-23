import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {CategoryService} from '../../../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {APIResponse} from '../../../../types/api_response';
import {Category} from '../../../../types/category';
import {BrandService} from '../../../services/brand.service';
import {Brand} from '../../../../types/brand';

@Component({
  selector: 'app-brand-form',
  imports: [FormsModule, MatInputModule, MatButtonModule,MatSelectModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent implements OnInit{


  name!:string

  brandService=inject(BrandService)
  router=inject(Router)
  route=inject(ActivatedRoute)
  isEdit=false
  id!:string

  addBrand(){
    console.log(this.name)
    this.brandService.addBrand(this.name).subscribe((result:APIResponse<Brand>)=>{
      console.log(result)
      this.router.navigate(['/admin/brands'])
    })
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"]
    console.log(this.id)
    if(this.id){
      this.isEdit=true
      this.brandService.getBrandById(this.id).subscribe((result:APIResponse<Brand>)=>{
        console.log(result)
        this.name=result.data.name
      })
    }
    console.log(this.isEdit)
  }

  updateBrand() {
    console.log(this.name)
    this.brandService.updateBrand(this.id,this.name).subscribe((result:APIResponse<Brand>)=>{
      alert("Brand updated!")
      console.log(result)
      this.router.navigate(['/admin/brands'])
      this.isEdit=false
    })
  }


}
