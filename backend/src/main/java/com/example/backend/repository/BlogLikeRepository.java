package com.example.backend.repository;

import com.example.backend.model.BlogLike;
import com.example.backend.model.Blog;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogLikeRepository extends JpaRepository<BlogLike, Long> {
    boolean existsByBlogAndUser(Blog blog, User user);
    void deleteByBlogAndUser(Blog blog, User user);
    long countByBlog(Blog blog);
} 