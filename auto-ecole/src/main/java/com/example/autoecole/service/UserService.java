package com.example.autoecole.service;

import com.example.autoecole.Entites.User;
import com.example.autoecole.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User ajouterUser(User user){
        return userRepository.save(user);
    }


    public User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }
}

