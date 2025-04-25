package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserDao userDao;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public boolean authenticate(String username, String password) {
        return userDao.findByUsername(username)
            .map(user -> passwordEncoder.matches(password, user.getPassword()))
            .orElse(false);
    }
    
    public User register(String username, String password, String email) {
        if (userDao.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }
        if (userDao.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        
        return userDao.save(user);
    }
} 
