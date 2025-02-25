import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";

export const adminGuard:CanActivateFn=(route,state)=>{
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  if (authService.isLoggedIn) {
    if (authService.isAdmin) {
      return true;
    } else {
      router.navigateByUrl('/');
      return false;
    }
  } else {
    router.navigateByUrl('/login');
    return false;
  }
}
