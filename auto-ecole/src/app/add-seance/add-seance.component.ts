import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SeanceService } from '../service/seance.service';

@Component({
  selector: 'app-add-seance',
  templateUrl: './add-seance.component.html',
  styleUrls: ['./add-seance.component.css']
})
export class AddSeanceComponent implements OnInit {
  seanceForm: FormGroup;
  clientId: number; 

  constructor(
    private fb: FormBuilder,
    private seanceService: SeanceService,
    private dialogRef: MatDialogRef<AddSeanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.seanceForm = this.fb.group({
      nombreHeure: ['', [Validators.required, Validators.min(1)]],
      date: ['', Validators.required]
    });
    this.clientId = data.clientId;
  }
  ngOnInit(): void {
    console.log("Client ID reçu:", this.clientId);    
  }

  onSubmit() {
    if (this.seanceForm.valid) {
      const seanceData = this.seanceForm.value;
      this.seanceService.ajouterSeance(seanceData,this.clientId
       ).subscribe({
        next: (response) => {
          console.log('Séance ajoutée avec succès', response);
          this.dialogRef.close(response);
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de la séance', err);
        }
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
