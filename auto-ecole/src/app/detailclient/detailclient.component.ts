import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeanceService } from '../service/seance.service';
import { Page } from '../model/Page';
import { Seance } from '../model/Seance';
import { ClientService } from '../service/client.service';
import { AddSeanceComponent } from '../add-seance/add-seance.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPaiementComponent } from '../add-paiement/add-paiement.component';
import { PaiementService } from '../service/paiement.service';
import { Paiement } from '../model/Paiement';
import { Examen } from '../model/Examen';
import { ExamenService } from '../service/examen.service';
import { AddExmaneComponent } from '../add-exmane/add-exmane.component';
import { Location } from '@angular/common';  


@Component({
  selector: 'app-detailclient',
  templateUrl: './detailclient.component.html',
  styleUrls: ['./detailclient.component.css']
})
export class DetailclientComponent implements OnInit {
  client: any | null = null;
  clientSeances: any[] = [];
  totalSeances: number = 0;
  totalPaiement: number = 0;
  firstName: string | null = '';
  lastName: string | null = '';  clientId!: number; 
  page: number = 0;
  size: number = 10;
  seances: Page<Seance> = {
      content: [],
      totalPages: 0,
      totalElements: 0,
      size: 0,
      number: 0
    };
    paiements: Page<Paiement> = {
      content: [],
      totalPages: 0,
      totalElements: 0,
      size: 0,
      number: 0
    };
    examens: Page<Examen> = {
      content: [],
      totalPages: 0,
      totalElements: 0,
      size: 0,
      number: 0
    };
  seancesCount: number | null = null;
  nbHeurCount: number | null = null;

  sumMontants: number | null = null;
  currentPage: number = 0;
  pageSize: number = 10;
  currentPagep: number = 0;




  constructor(private route: ActivatedRoute,private seanceService:SeanceService,private clientservice:ClientService,public dialog: MatDialog,private paiementService:PaiementService,private examenservice:ExamenService,private location: Location) { }

  ngOnInit(): void {
    this.clientId = +this.route.snapshot.paramMap.get('id')!;
    this.loadSeances();
    this.loadPaiement();
    this.loadClientDetails();
    this.loadExamen();
    this.loadNbHeureCount();
    this.loadSumMontantsPayé();
    this.firstName = localStorage.getItem('firstName');
  this.lastName = localStorage.getItem('lastName');
  }
  goBack(): void {
    this.location.back();  
  }
  
  openAddSeanceModal(clientId:number) {
  
    const dialogRef = this.dialog.open(AddSeanceComponent, {
      width: '400px',
      data: { clientId }

    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadSeances(); 
        this.loadNbHeureCount();
      }
    });
  }
  openAddPaiementModal(clientId:number) {
  
    const dialogRef = this.dialog.open(AddPaiementComponent, {
      width: '400px',
      data: { clientId }

    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPaiement(); 
        this.loadSumMontantsPayé();
      }
    });
  }
  openAddExamenModal(clientId:number) {
  
    const dialogRef = this.dialog.open(AddExmaneComponent, {
      width: '400px',
      data: { clientId }

    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadExamen(); 
      }
    });
  }
  
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadSeances();
  }
  onPageChangePaiment(page: number): void {
    this.currentPagep = page;
    this.loadPaiement();

  }
  
  getGlobalIndex(index: number): number {
    return this.currentPage * this.pageSize + index + 1;
  }
  
  loadSeances(): void {
    this.seanceService.getSeancesByClient(this.clientId, this.currentPage, this.pageSize).subscribe(
      (data) => {
        if (data && data.content) {
          this.seances = data;
          console.log('Seances loaded:', this.seances.content);
        } else {
          console.error('API Response is invalid:', data);
          this.seances.content = [];
        }
      },
      (error) => {
        console.error('Error loading seances:', error);
      }
    );
  }
  loadPaiement(): void {
    this.paiementService.getPaimentByClient(this.clientId, this.currentPagep, this.pageSize).subscribe(
      (data) => {
        if (data && data.content) {
          this.paiements = data;
          console.log('paimenet loaded:', this.paiements.content);
        } else {
          console.error('API Response is invalid:', data);
          this.paiements.content = [];
        }
      },
      (error) => {
        console.error('Error loading paiement:', error);
      }
    );
  }
  loadExamen(): void {
    this.examenservice.getExamenByClient(this.clientId, this.currentPage, this.pageSize).subscribe(
      (data) => {
        if (data && data.content) {
          this.examens = data;
          console.log('examen loaded:', this.examens.content);
        } else {
          console.error('API Response is invalid:', data);
          this.examens.content = [];
        }
      },
      (error) => {
        console.error('Error loading examen:', error);
      }
    );
  }
  loadSeancesCount(): void {
    this.seanceService.getSeancesCountByClientId(this.clientId).subscribe(
      (count) => {
        this.seancesCount = count;
        console.log('Nombre de séances:', this.seancesCount);
      },
      (error) => {
        console.error('Erreur lors du chargement du nombre de séances:', error);
      }
    );
  }
  loadNbHeureCount(): void {
    this.seanceService.getNbHeureCountByClientId(this.clientId).subscribe(
      (count) => {
        this.nbHeurCount = count;
        console.log('Nombre des Heures:', this.nbHeurCount);
      },
      (error) => {
        console.error('Erreur lors du chargement du nombre des heures:', error);
      }
    );
  }

  loadSumMontantsPayé(): void {
    this.paiementService.getSumMontantsByClientId(this.clientId).subscribe(
      (data) => {
        this.sumMontants = data;
        console.log('Somme des montants:', this.sumMontants);
      },
      (error) => {
        console.error('Erreur lors du chargement de la somme des montants:', error);
        this.sumMontants = null;
      }
    );
  }
  loadClientDetails(): void {
    this.clientservice.getClientById(this.clientId).subscribe(
      (clientData) => {
        this.client = clientData;
        console.log('Client details loaded:', this.client);
      },
      (error) => {
        console.error('Error loading client details:', error);
        this.client = null;
      }
    );
  }
  
  
}
