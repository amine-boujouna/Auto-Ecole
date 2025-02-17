package com.example.autoecole.controller;

import com.example.autoecole.Entites.Client;
import com.example.autoecole.Entites.User;
import com.example.autoecole.service.ClientService;
import com.example.autoecole.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/client")
@CrossOrigin("*")
public class ClientController {
    @Autowired
    private ClientService clientService;
    @Autowired
    private UserService userService;


    @PostMapping("/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Client> addClientToUser(@RequestBody Client client, @PathVariable Long userId) {
        Client savedClient = clientService.ajouterClient(userId,client);
        return ResponseEntity.ok(savedClient);
    }
    @PostMapping("/ajouterUser")
    public ResponseEntity<User> ajouterUser(@RequestBody User user){
        User nouveauUser = userService.ajouterUser(user);
        return new ResponseEntity<>(nouveauUser, HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Client> modifierClient(@RequestBody Client client,@PathVariable("id")int id) {
        try {
            Client client1 = clientService.modfierClient(id, client);
            return ResponseEntity.ok(client1);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/search")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Client>> searchClients(
            @RequestParam(value = "value", required = false) String value) {

        if ((value == null || value.isEmpty())) {
            return ResponseEntity.badRequest().body(null);
        }

        List<Client> clients = clientService.searchClients(value != null ? value : "");

        if (clients.isEmpty()) {
            return ResponseEntity.noContent().build(); //
        }
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
    public ResponseEntity<Page<Client>> getClientsByUserId(
            @PathVariable("userId") Long userId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Client> clients = clientService.findByUserId(userId, pageable);

        if (clients.hasContent()) {
            return ResponseEntity.ok(clients);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public Client getClientbyId(@PathVariable("id") int id){
        return clientService.getClientbyID(id);
    }


}
