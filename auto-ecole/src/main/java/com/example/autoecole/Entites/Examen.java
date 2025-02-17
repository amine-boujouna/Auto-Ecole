package com.example.autoecole.Entites;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Date;
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Examen {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date dateExamen;
    private Long numList;
    private Long convation;
    @ManyToOne
    @JoinColumn(name = "client")
    Client client;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDateExamen() {
        return dateExamen;
    }

    public void setDateExamen(Date dateExamen) {
        this.dateExamen = dateExamen;
    }

    public Long getNumList() {
        return numList;
    }

    public void setNumList(Long numList) {
        this.numList = numList;
    }

    public Long getConvation() {
        return convation;
    }

    public void setConvation(Long convation) {
        this.convation = convation;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
