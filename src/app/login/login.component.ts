import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: any): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role); // Assuming the role is included in the response
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
