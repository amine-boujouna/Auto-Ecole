package com.example.autoecole.service;

import com.example.autoecole.Entites.Client;
import com.example.autoecole.Entites.User;
import com.example.autoecole.repository.ClientReposiotry;
import com.example.autoecole.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService implements ClientServiceI{
    @Autowired
    private ClientReposiotry clientReposiotry;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;



    @Override
    public Client ajouterClient(Long id,Client client) {
        User user=userRepository.findById(id).get();
        client.setUser(user);
        return clientReposiotry.save(client);
    }

    public Client modfierClient(int id,Client client){
        Optional<Client> optianlclient=clientReposiotry.findById(id);
        if(optianlclient.isPresent()){
            Client existclient = optianlclient.get();
            existclient.setNom(client.getNom());
            existclient.setPrenom(client.getPrenom());
            existclient.setCin(client.getCin());
            existclient.setTelephone(client.getTelephone());
            return clientReposiotry.save(client);
        }else{
            throw new RuntimeException("Client non trouveé avec l'id"+id);
        }
    }
    public Page<Client> listDesClients(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return clientReposiotry.findAll(pageable);
    }
    public List<Client> searchClients(String value) {
        List<Client> client= clientReposiotry.findByAnyParameter(value);
        System.out.println("clientserach"+client.toString());
        return client;
    }
    public Page<Client> findByUserId(Long userId, Pageable pageable) {
        return clientReposiotry.findByUserId(userId, pageable);
    }
    public Client getClientbyID(int id){
        return clientReposiotry.findById(id).get();
    }

}
