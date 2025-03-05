import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenHttpInterceptor } from './components/core/tokenHttpInterceptor';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { authReducer, AuthState } from './store/reducers/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenHttpInterceptor])),
    provideStore({auth:authReducer}),
    provideEffects([AuthEffects]),
    provideStoreDevtools({
      maxAge: 25,
      // logOnly:environment.production
    }),
  ]
};
