package com.example.autoecole.repository;

import com.example.autoecole.Entites.Examen;
import com.example.autoecole.Entites.Seance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamenRepository extends JpaRepository<Examen,Integer> {

    @Query("SELECT s FROM Examen s WHERE s.client.id = :clientId")
    Page<Examen> findExamenByClient(@Param("clientId")  int clientId, Pageable pageable);
}
