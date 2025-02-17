package com.example.autoecole.service;

import com.example.autoecole.Entites.Client;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ClientServiceI {

    Client ajouterClient(Long id,Client client);
    Client modfierClient(int id,Client client);
    List<Client> searchClients(String param);
    Page<Client> listDesClients(int page, int size);
}
