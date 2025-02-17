package com.example.autoecole.controller;

import com.example.autoecole.Entites.Paiement;
import com.example.autoecole.Entites.Seance;
import com.example.autoecole.service.PaiementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paiement")
@CrossOrigin("*")
public class PaimenetController {

    @Autowired
    private PaiementService paiementService;

    @PostMapping("/{clientId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Paiement> ajouterPaiement(@RequestBody Paiement paiement, @PathVariable int clientId) {
        try {
            Paiement savedPaiement = paiementService.ajouterPaiement(paiement, clientId);
            return new ResponseEntity<>(savedPaiement, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/sum/{clientId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Double> getSumMontantsByClientId(@PathVariable int clientId) {
        try {
            Double sum = paiementService.getSumMontantsByClientId(clientId);
            return new ResponseEntity<>(sum, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/client/{clientId}")
    @PreAuthorize("hasRole('USER')")

    public ResponseEntity<Page<Paiement>> getSeancesByClient(
            @PathVariable int clientId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<Paiement> paiements = paiementService.findByClient(page, size, clientId);
            return new ResponseEntity<>(paiements, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
