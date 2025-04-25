
package com.example.backend.dao;

import com.example.backend.model.Blog;
import com.example.backend.model.Comment;
import java.util.Optional;
import java.util.List;

public interface CommentDao {
    List<Comment> findByBlogOrderByCreatedAtDesc(Blog blog);
    List<Comment> findByAuthorOrderByCreatedAtDesc(String author);
    long countByBlog(Blog blog);
    Comment save(Comment comment);
    void delete(Comment comment);
    Optional<Comment> findById(Long id);  // Method to find a comment by ID
}
