import { Injectable } from '@angular/core';
import { Examen } from '../model/Examen';
import { Observable } from 'rxjs';
import { Page } from '../model/Page';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

   private baseUrl = 'http://localhost:8089/api/exmane'
    constructor(private http: HttpClient) { }
  
    ajouterExamen(examen: Examen, clientId: number): Observable<Examen> {
      return this.http.post<Examen>(`${this.baseUrl}/${clientId}`, examen);
    }
    getExamenByClient(clientId: number, page: number, size: number): Observable<Page<Examen>> {
      const url = `${this.baseUrl}/client/${clientId}?page=${page}&size=${size}`;
      return this.http.get<Page<Examen>>(url);
    }
}
