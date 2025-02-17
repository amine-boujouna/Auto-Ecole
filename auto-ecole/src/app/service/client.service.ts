import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import {Page} from '../model/Page'

interface Client {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  cin: string;
}
@Injectable({
  providedIn: 'root'
})
export class ClientService {



  private baseUrl = 'http://localhost:8089/api/client'

  constructor(private http: HttpClient) {}
  private clientAddedSource = new Subject<void>();
  clientAdded$ = this.clientAddedSource.asObservable();

  notifyClientAdded() {
    this.clientAddedSource.next();
  }

  getClientsByUserId(page: number = 0, size: number = 10): Observable<Page<Client>> {
    const userId = localStorage.getItem('userId'); 
    const token = localStorage.getItem('token');
  
    if (!userId || !token) {
      throw new Error('Utilisateur non connecté !');
    }
  
    const url = `${this.baseUrl}/user/${userId}?page=${page}&size=${size}`;
    return this.http.get<Page<Client>>(url); // Le token est injecté par l'intercepteur
  }
  
  searchClients(value: string): Observable<Client[]> {
    const params = new HttpParams().set('value', value);
    return this.http.get<Client[]>(`${this.baseUrl}/search`, { params });
  }

  addClientToUser(client: Client): Observable<Client> {
    const userId = localStorage.getItem('userId'); 
    const token = localStorage.getItem('token');
  
    if (!userId || !token) {
      throw new Error('Utilisateur non connecté !');
    }
    const url = `${this.baseUrl}/${userId}`;  
    return this.http.post<Client>(url, client);  
  }
  getClientById(clientId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${clientId}`);
  }  
  

 
  
  
  
}
