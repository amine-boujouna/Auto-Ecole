package com.example.autoecole.Entites;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Seance {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int nombreHeure;
    private Date date;
    @ManyToOne
    @JoinColumn(name = "client")
    Client client;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNombreHeure() {
        return nombreHeure;
    }

    public void setNombreHeure(int nombreHeure) {
        this.nombreHeure = nombreHeure;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }


    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }



}
