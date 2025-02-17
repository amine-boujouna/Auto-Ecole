package com.example.autoecole.controller;

import com.example.autoecole.Entites.Examen;
import com.example.autoecole.Entites.Paiement;
import com.example.autoecole.service.ExamenService;
import com.example.autoecole.service.PaiementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exmane")
@CrossOrigin("*")
public class ExamenController {

    @Autowired
    private ExamenService examenService;

    @PostMapping("/{clientId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Examen> ajouterExamen(@RequestBody Examen examen, @PathVariable int clientId) {
        try {
            Examen savedExamen = examenService.ajouterExamen(examen, clientId);
            return new ResponseEntity<>(savedExamen, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/client/{clientId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<Examen>> getSeancesByClient(
            @PathVariable int clientId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<Examen> examen = examenService.findByClient(page, size, clientId);
            return new ResponseEntity<>(examen, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
