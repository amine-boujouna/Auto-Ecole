import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthServiceService,private router: Router) {}
  ngOnInit(): void {
      
  }
  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Connexion réussie :', response);
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('userId', response.id);
        localStorage.setItem('firstName', response.firstName); 
        localStorage.setItem('lastName', response.lastName); 
        this.router.navigate(['/client']);

      },
      error: (err) => {
        console.error('Erreur de connexion :', err);
        this.errorMessage = 'Nom d’utilisateur ou mot de passe incorrect.';
      },
    });
  }

}
