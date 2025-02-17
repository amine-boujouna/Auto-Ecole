import { Injectable } from '@angular/core';
import { Paiement } from '../model/Paiement';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page } from '../model/Page';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

   private baseUrl = 'http://localhost:8089/api/paiement'
    constructor(private http: HttpClient) { }
  
    ajouterPaiement(paiement: Paiement, clientId: number): Observable<Paiement> {
      return this.http.post<Paiement>(`${this.baseUrl}/${clientId}`, paiement);
    }

    getPaimentByClient(clientId: number, page: number, size: number): Observable<Page<Paiement>> {
        const url = `${this.baseUrl}/client/${clientId}?page=${page}&size=${size}`;
        return this.http.get<Page<Paiement>>(url);
      }

      getSumMontantsByClientId(clientId: number): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/sum/${clientId}`);
      }
}
