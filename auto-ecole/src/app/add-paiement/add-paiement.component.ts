import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaiementService } from '../service/paiement.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-paiement',
  templateUrl: './add-paiement.component.html',
  styleUrls: ['./add-paiement.component.css']
})
export class AddPaiementComponent implements OnInit {

  paiementForm: FormGroup;
  clientId: number; 
  
    constructor(
      private fb: FormBuilder,
      private paiementService: PaiementService,
      private dialogRef: MatDialogRef<AddPaiementComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.paiementForm = this.fb.group({
        datePaiement: ['', Validators.required],
        montant: ['', [Validators.required, Validators.min(1)]]


      });
      this.clientId = data.clientId;
    }
    ngOnInit(): void {
      console.log("Client ID reçu com paiement:", this.clientId);    
    }
  
    onSubmit() {
      if (this.paiementForm.valid) {
        const paiementData = this.paiementForm.value;
        this.paiementService.ajouterPaiement(paiementData,this.clientId
         ).subscribe({
          next: (response) => {
            console.log('paiement ajoutée avec succès', response);
            this.dialogRef.close(response);
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout de la paiement', err);
          }
        });
      }
    }
  
    closeDialog() {
      this.dialogRef.close();
    }

}
