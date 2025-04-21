package com.example.backend.repository;

import com.example.backend.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByAuthorOrderByCreatedAtDesc(String author);
    List<Blog> findAllByOrderByCreatedAtDesc();
}
