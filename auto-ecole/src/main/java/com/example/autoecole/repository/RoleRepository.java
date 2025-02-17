package com.example.autoecole.repository;

import com.example.autoecole.Entites.ERole;
import com.example.autoecole.Entites.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Optional<Role> findByName(ERole name);
}
