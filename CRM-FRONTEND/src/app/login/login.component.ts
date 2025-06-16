import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   Username = '';
  Password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  loginUser() {
    const loginData = { username: this.Username, password: this.Password };
    this.http.post('https://localhost:7280/api/User/login', loginData).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = res.message;
        }
      },
      error: () => {
        this.errorMessage = 'Login failed. Please try again.';
      }
    });
  }
goToRegister() {
  this.router.navigate(['/register']);
}

}
