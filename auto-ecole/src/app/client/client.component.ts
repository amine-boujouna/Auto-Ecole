import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../service/client.service';
import { Client } from '../model/client';
import { Page } from '../model/Page';
import { MatDialog } from '@angular/material/dialog';
import { AddClientComponent } from '../add-client/add-client.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  isModalOpen: boolean = false;
  clientForm: FormGroup;
  filteredClients: any[] = [];
  
  firstName: string | null = '';
lastName: string | null = '';
  userId: number = 2;
  clientsPage: Page<Client> = {
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0
  };
  currentPage: number = 0;
  pageSize: number = 10;
  searchValue: string = '';
  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private fb: FormBuilder,private clientService: ClientService,public dialog: MatDialog, private router: Router,private authservice:AuthServiceService) {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('^[0-8]*$')]],  // Exemple de validation pour un numéro de téléphone
      cin: ['', [Validators.required, Validators.pattern('^[0-8]*$')]]  // Validation pour CIN
    });
  }

  ngOnInit(): void {
    this.loadClients();
    this.clientService.clientAdded$.subscribe(() => {
      this.loadClients();
    }); 
    this.searchSubject.pipe(
      debounceTime(500),  
      distinctUntilChanged()  
    ).subscribe((searchValue: string) => {
      this.searchClients(searchValue);
    });
    this.firstName = localStorage.getItem('firstName');
  this.lastName = localStorage.getItem('lastName');

  }
  
  loadClients(): void {
    this.clientService.getClientsByUserId(this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.clientsPage = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des clients', err);
        }
      });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Client ajouté:', result);
      }
    });
  }
  

  closeModal(): void {
    this.isModalOpen = false;  // Fermer le modal
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadClients();
  }
  searchClients(value: string): void {
    this.clientService.searchClients(value).subscribe({
      next: (clients) => {
        this.clientsPage.content = clients; 
      },
      error: (err) => {
        console.error('Error searching clients', err);
      }
    });
  }
  onSearch(): void {
    if (this.searchValue.trim() === '') {
      // Si l'input est vide, charger tous les clients
      this.loadClients();
    } else {
      // Sinon, rechercher les clients avec la valeur saisie
      this.clientService.searchClients(this.searchValue)
        .subscribe((data) => {
          this.clientsPage.content = data;  // Mettre à jour les clients affichés
        });
    }
  }
  onSearchChange(): void {
    this.searchSubject.next(this.searchValue);  // Emit the value to the debounce subject
  }
  goToClientDetail(clientId: number): void {
    this.router.navigate(['/detailclient', clientId]);  // Redirige vers /client/:id
  }
  onLogout(): void {
    this.authservice.logout();  
  }

}
