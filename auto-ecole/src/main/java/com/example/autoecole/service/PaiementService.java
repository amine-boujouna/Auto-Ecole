package com.example.autoecole.service;

import com.example.autoecole.Entites.Client;
import com.example.autoecole.Entites.Paiement;
import com.example.autoecole.Entites.Seance;
import com.example.autoecole.repository.ClientReposiotry;
import com.example.autoecole.repository.PaiementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PaiementService {
    @Autowired
    private PaiementRepository paiementRepository;
    @Autowired
    private ClientReposiotry clientReposiotry;

    public Paiement ajouterPaiement(Paiement paiement, int clientId) {
        Client client = clientReposiotry.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client introuvable avec l'ID " + clientId));
        paiement.setClient(client);
        return paiementRepository.save(paiement);
    }
    public Double getSumMontantsByClientId(int clientId) {
        return paiementRepository.sumMontantsByClientId(clientId);
    }
    public Page<Paiement> findByClient(int page, int size, int clientId){
        Client client = clientReposiotry.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client introuvable avec l'ID " + clientId));
        Pageable pageable = PageRequest.of(page, size);
        Page<Paiement> paiements=paiementRepository.findPaimenetByClient(clientId,pageable);
        return paiements;
    }
}
