
package com.example.backend.dao;

import com.example.backend.model.Blog;

import java.util.List;
import java.util.Optional;

public interface BlogDao {
    List<Blog> findAll();
    Optional<Blog> findById(Long id);
    Blog save(Blog blog);
    void deleteById(Long id);
    List<Blog> findByAuthorOrderByCreatedAtDesc(String author);
    List<Blog> findAllByOrderByCreatedAtDesc();
    void delete(Blog blog);
}
