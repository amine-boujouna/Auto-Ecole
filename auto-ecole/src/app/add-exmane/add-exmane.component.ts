import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamenService } from '../service/examen.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-exmane',
  templateUrl: './add-exmane.component.html',
  styleUrls: ['./add-exmane.component.css']
})
export class AddExmaneComponent implements OnInit {

   examenForm: FormGroup;
    clientId: number; 
    
      constructor(
        private fb: FormBuilder,
        private examenservice: ExamenService,
        private dialogRef: MatDialogRef<AddExmaneComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
      ) {
        this.examenForm = this.fb.group({
          dateExamen: ['', Validators.required],
          convation: ['', [Validators.required]],
          numList: ['', [Validators.required]]

  
  
        });
        this.clientId = data.clientId;
      }
      ngOnInit(): void {
        console.log("Client ID reçu com examen:", this.clientId);    
      }
    
      onSubmit() {
        if (this.examenForm.valid) {
          const examenData = this.examenForm.value;
          this.examenservice.ajouterExamen(examenData,this.clientId
           ).subscribe({
            next: (response) => {
              console.log('examen ajoutée avec succès', response);
              this.dialogRef.close(response);
            },
            error: (err) => {
              console.error('Erreur lors de l\'ajout de la examen', err);
            }
          });
        }
      }
    
      closeDialog() {
        this.dialogRef.close();
      }

}
