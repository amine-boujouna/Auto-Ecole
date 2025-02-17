package com.example.autoecole.repository;

import com.example.autoecole.Entites.Client;
import com.example.autoecole.Entites.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientReposiotry extends JpaRepository<Client,Integer> {
    @Query("SELECT c FROM Client c WHERE " +
            "(LOWER(c.nom) LIKE LOWER(CONCAT('%', :param, '%'))) OR " +
            "(LOWER(c.prenom) LIKE LOWER(CONCAT('%', :param, '%'))) OR " +
            "(LOWER(c.cin) LIKE LOWER(CONCAT('%', :param, '%')))  " )
    List<Client> findByAnyParameter(@Param("param") String param);
    @Query("SELECT c FROM Client c WHERE c.user.id = :userId")
    Page<Client> findByUserId(@Param("userId") Long userId, Pageable pageable);

}
