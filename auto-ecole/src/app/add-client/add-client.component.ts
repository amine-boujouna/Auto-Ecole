import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../service/client.service';
import { Client } from '../model/client';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  clientForm: FormGroup;
  userId: number = 2;  

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddClientComponent>,  
    private clientService: ClientService,private authservice:AuthServiceService
  ) {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],  
      cin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      return;  
    }

    const clientData: Client = this.clientForm.value;

    this.clientService.addClientToUser(clientData).subscribe({
      next: (savedClient) => {
        console.log('Client added successfully', savedClient);
        this.clientService.notifyClientAdded();
        this.dialogRef.close(savedClient);  
      },
      error: (err) => {
        console.error('Error adding client', err);
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
 

}
