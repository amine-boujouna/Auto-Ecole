package com.example.autoecole.service;

import com.example.autoecole.Entites.Client;
import com.example.autoecole.Entites.Examen;
import com.example.autoecole.Entites.Paiement;
import com.example.autoecole.repository.ClientReposiotry;
import com.example.autoecole.repository.ExamenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ExamenService {
    @Autowired
    private ExamenRepository examenRepository;
    @Autowired
    private ClientReposiotry clientReposiotry;

    public Examen ajouterExamen(Examen examen, int clientId) {
        Client client = clientReposiotry.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client introuvable avec l'ID " + clientId));
        examen.setClient(client);
        return examenRepository.save(examen);
    }
    public Page<Examen> findByClient(int page, int size, int clientId){
        Client client = clientReposiotry.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client introuvable avec l'ID " + clientId));
        Pageable pageable = PageRequest.of(page, size);
        Page<Examen> examen=examenRepository.findExamenByClient(clientId,pageable);
        return examen;
    }


}
