import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string ="";

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: any) {
    const { username, password } = form.value;
    this.authService.login(username, password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        const tokenPayload = this.decodeToken(response.token);
        localStorage.setItem('role', tokenPayload.role);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Login failed. Please check your username and password.';
        console.error('Login failed', error);
      }
    );
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
}
