import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl = 'http://localhost:8089/api/auth'; 

  constructor(private http: HttpClient,private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, {
      username: username,
      password: password,
    });
  }
  isAuthenticated(): boolean {
    // Vérifiez si un token existe dans le localStorage
    const token = localStorage.getItem('token');
    return token != null; // Retourne true si un token existe, sinon false
  }
  logout(): void {
    // Supprimer le token et les autres données liées à la session
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    
    // Rediriger l'utilisateur vers la page de connexion
    this.router.navigate(['/login']);
  }
}
