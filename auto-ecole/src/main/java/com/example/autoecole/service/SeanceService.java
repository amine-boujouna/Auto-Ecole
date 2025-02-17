package com.example.autoecole.service;

import com.example.autoecole.Entites.Client;
import com.example.autoecole.Entites.Seance;
import com.example.autoecole.repository.ClientReposiotry;
import com.example.autoecole.repository.SeanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeanceService implements SeanceServiceI{
    @Autowired
    private SeanceRepository seanceRepository;
    @Autowired
    private ClientReposiotry clientRepository;

    @Override
    public Seance ajouterSeance(Seance seance,int clientId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client introuvable avec l'ID " + clientId));
        seance.setClient(client);
        return seanceRepository.save(seance);
    }

    @Override
    public Seance modfierSeance(int id, Seance seance) {
        Optional<Seance> optianlseance=seanceRepository.findById(id);
        if(optianlseance.isPresent()){
            Seance existseance = optianlseance.get();
            existseance.setDate(seance.getDate());
            return seanceRepository.save(seance);
        }else{
            throw new RuntimeException("Client non trouveé avec l'id"+id);
        }
    }

    @Override
    public  Page<Seance> findByClient(int page, int size,int clientId){
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client introuvable avec l'ID " + clientId));
        Pageable pageable = PageRequest.of(page, size);
        Page<Seance> seances=seanceRepository.findSeanceByClient(clientId,pageable);
        return seances;
    }
    @Override
    public void supprimerSeance(int id) {
        seanceRepository.deleteById(id);
    }
    @Override
    public long getSeancesCountByClientId(int clientId) {
        return seanceRepository.countSeancesByClientId(clientId);
    }
    public long getNbHeureCountByClientId(int clientId) {
        return seanceRepository.countSeanceByNombreHeure(clientId);
    }
    @Override
    public Double getSumMontantsByClientId(int clientId) {
        return null;
    }

/*
    public Double getSumMontantsByClientId(int clientId) {
        return seanceRepository.sumMontantsByClientId(clientId);
    }
*/

}
