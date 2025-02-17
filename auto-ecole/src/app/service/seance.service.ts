import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../model/Page';
import { Seance } from '../model/Seance';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {
 private baseUrl = 'http://localhost:8089/api/seance'
  constructor(private http: HttpClient) { }

  ajouterSeance(seance: Seance, clientId: number): Observable<Seance> {
    return this.http.post<Seance>(`${this.baseUrl}/${clientId}`, seance);
  }
  getSeancesByClient(clientId: number, page: number, size: number): Observable<Page<Seance>> {
    const url = `${this.baseUrl}/client/${clientId}?page=${page}&size=${size}`;
    return this.http.get<Page<Seance>>(url);
  }
  getSeancesCountByClientId(clientId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/${clientId}`);
  }
  getNbHeureCountByClientId(clientId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/nbheure/${clientId}`);
  }
  getSumMontantsByClientId(clientId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/sum/${clientId}`);
  }
  
}
