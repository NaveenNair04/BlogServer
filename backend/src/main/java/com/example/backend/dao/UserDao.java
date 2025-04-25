
package com.example.backend.dao;

import com.example.backend.model.User;

import java.util.Optional;

public interface UserDao {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    User save(User user);
}
