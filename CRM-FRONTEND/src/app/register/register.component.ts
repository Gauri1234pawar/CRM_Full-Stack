import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 user = {
    fullName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: ''
  };

  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister(): void {
    this.http.post('https://localhost:7280/api/Registration/register', this.user).subscribe({
      next: (res) => {
        alert('Registration successful!');
        this.router.navigate(['/login']); // Redirect to login after success
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }
}
