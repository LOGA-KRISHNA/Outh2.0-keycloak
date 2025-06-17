import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // ✅ Fixed
})
export class App {
  protected title = 'Oauth-app';
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly http = inject(HttpClient);

  isAuthenticated = signal(false);
  username=signal("");

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      this.isAuthenticated.set(isAuthenticated);

      console.log('isAuthenticated:', isAuthenticated);
      
      if (this.isAuthenticated()) {
        this.oidcSecurityService.userData$
          .pipe(take(1))
          .subscribe((userData: any) => {
            if (userData?.preferred_username) {
              this.username.set(userData.preferred_username);
            }
          });
      }
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((res) => {
      if (res && typeof res === 'object' && 'redirectUrl' in res) {
        (res as { redirectUrl: string }).redirectUrl = '/';
      }
    });
  }

  publicResponse =signal('Not called yet');
  userResponse = signal('Not called yet');
  adminResponse = signal('Not called yet');
  async callPublic() {
    try {
      const response = await firstValueFrom(this.http.get('http://localhost:8080/api/v1/public', { responseType: 'text' }));
      this.publicResponse.set(response);
    } catch (error) {
      this.publicResponse.set('Error calling public endpoint');
      console.error(error);
    }
  }

  async callUser() {
    try {
      const response = await firstValueFrom(this.http.get('http://localhost:8080/api/v1/user', { responseType: 'text' }));
      this.userResponse.set(response);
    } catch (error) {
      this.userResponse.set('Error calling user endpoint');
      console.error(error);
    }
  }

  async callAdmin() {
    try {
      const response = await firstValueFrom(this.http.get('http://localhost:8080/api/v1/admin', { responseType: 'text' }));
      this.adminResponse.set(response);
    } catch (error) {
      this.adminResponse.set('Error calling admin endpoint');
      console.error(error);
    }
  }
}
/* Removed unused Signal function */

