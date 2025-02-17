package com.example.autoecole.controller;

import com.example.autoecole.Entites.Seance;
import com.example.autoecole.service.SeanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seance")
@CrossOrigin("*")
public class SeanceController {
    @Autowired
    private SeanceService seanceService;

    @PostMapping("/{clientId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Seance> ajouterSeance(@RequestBody Seance seance, @PathVariable("clientId") int clientId) {
        try {
            Seance savedSeance = seanceService.ajouterSeance(seance, clientId);
            return new ResponseEntity<>(savedSeance, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Seance> modifierSeance(@PathVariable int id, @RequestBody Seance seance) {
        try {
            Seance updatedSeance = seanceService.modfierSeance(id, seance);
            return new ResponseEntity<>(updatedSeance, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/client/{clientId}")
    @PreAuthorize("hasRole('USER')")

    public ResponseEntity<Page<Seance>> getSeancesByClient(
            @PathVariable int clientId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<Seance> seances = seanceService.findByClient(page, size, clientId);
            return new ResponseEntity<>(seances, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> supprimerSeance(@PathVariable int id) {
        try {
            seanceService.supprimerSeance(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/count/{clientId}")
    @PreAuthorize("hasRole('USER')")


    public ResponseEntity<Long> getSeancesCountByClientId(@PathVariable int clientId) {
        try {
            long count = seanceService.getSeancesCountByClientId(clientId);
            return new ResponseEntity<>(count, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/count/nbheure/{clientId}")
    @PreAuthorize("hasRole('USER')")


    public ResponseEntity<Long> getNbHeureCountByClientId(@PathVariable int clientId) {
        try {
            long count = seanceService.getNbHeureCountByClientId(clientId);
            return new ResponseEntity<>(count, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/sum/{clientId}")
    @PreAuthorize("hasRole('USER')")

    public ResponseEntity<Double> getSumMontantsByClientId(@PathVariable int clientId) {
        try {
            Double sum = seanceService.getSumMontantsByClientId(clientId);
            return new ResponseEntity<>(sum, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
