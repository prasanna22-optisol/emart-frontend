import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WishList } from '../types/wishlist';
import { WishlistService } from './services/wishlist.service';
import { AuthenticationService } from './services/authentication.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatButtonModule,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'frontend';
  isReady:boolean=false


  wishListService=inject(WishlistService)
  authService=inject(AuthenticationService)
  cartService=inject(CartService)

  constructor(){
    setTimeout(()=>{
      this.isReady=true
    },500)
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn ){
      this.wishListService.init()
      this.cartService.init()
    }
  }




}
