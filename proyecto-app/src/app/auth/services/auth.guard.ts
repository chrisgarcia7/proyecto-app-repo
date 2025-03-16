import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})

export class AuthGuard{
    private readonly _authService: AuthService = inject(AuthService);
    private readonly _router: Router = inject(Router);

    async canActivate(): Promise <boolean>{
        const isLogged: boolean = await this._authService.isUserLoggued();
        if (!isLogged){
            this._router.navigate(['/login'])

        }

        return isLogged;
    }


}