package com.example.backend.repository;

import com.example.backend.model.Comment;
import com.example.backend.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBlogOrderByCreatedAtDesc(Blog blog);
    List<Comment> findByAuthorOrderByCreatedAtDesc(String author);
    long countByBlog(Blog blog);
} 