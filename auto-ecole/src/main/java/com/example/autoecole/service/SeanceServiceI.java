package com.example.autoecole.service;

import com.example.autoecole.Entites.Client;
import com.example.autoecole.Entites.Seance;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SeanceServiceI {
    Seance ajouterSeance(Seance seance,int clientId);
    Seance modfierSeance(int id,Seance seance);
    Page<Seance> findByClient(int page, int size,int clientId);
    void supprimerSeance(int id);
    long getSeancesCountByClientId(int clientId);
    Double getSumMontantsByClientId(int clientId);
}
