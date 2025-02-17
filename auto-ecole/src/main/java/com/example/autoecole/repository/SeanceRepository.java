package com.example.autoecole.repository;

import com.example.autoecole.Entites.Client;
import com.example.autoecole.Entites.Seance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SeanceRepository extends JpaRepository<Seance,Integer> {
    @Query("SELECT s FROM Seance s WHERE s.client.id = :clientId")
    Page<Seance> findSeanceByClient(@Param("clientId")  int clientId, Pageable pageable);
    @Query("SELECT COUNT(s) FROM Seance s WHERE s.client.id = :clientId")
    long countSeancesByClientId(@Param("clientId") int clientId);

    @Query("SELECT sum(s.nombreHeure) FROM Seance s WHERE s.client.id = :clientId")
    long countSeanceByNombreHeure(@Param("clientId") int clientId);


}
