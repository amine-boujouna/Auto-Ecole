package com.example.autoecole.repository;

import com.example.autoecole.Entites.Paiement;
import com.example.autoecole.Entites.Seance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PaiementRepository extends JpaRepository<Paiement,Integer> {
     @Query("SELECT SUM(s.Montant) FROM Paiement s WHERE s.client.id = :clientId")
    Double sumMontantsByClientId(@Param("clientId") int clientId);
    @Query("SELECT s FROM Paiement s WHERE s.client.id = :clientId")
    Page<Paiement> findPaimenetByClient(@Param("clientId")  int clientId, Pageable pageable);

}
