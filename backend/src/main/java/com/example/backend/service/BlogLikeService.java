package com.example.backend.service;

import com.example.backend.model.Blog;
import com.example.backend.model.BlogLike;
import com.example.backend.model.User;
import com.example.backend.repository.BlogLikeRepository;
import com.example.backend.repository.BlogRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BlogLikeService {
    @Autowired
    private BlogLikeRepository blogLikeRepository;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void toggleLike(Long blogId, String username) {
        Blog blog = blogRepository.findById(blogId)
            .orElseThrow(() -> new RuntimeException("Blog not found"));
        
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (blogLikeRepository.existsByBlogAndUser(blog, user)) {
            // Unlike
            blogLikeRepository.deleteByBlogAndUser(blog, user);
            blog.setLikesCount(blog.getLikesCount() - 1);
        } else {
            // Like
            BlogLike like = new BlogLike(blog, user);
            blogLikeRepository.save(like);
            blog.setLikesCount(blog.getLikesCount() + 1);
        }
        
        blogRepository.save(blog);
    }

    public boolean hasUserLiked(Long blogId, String username) {
        Blog blog = blogRepository.findById(blogId)
            .orElseThrow(() -> new RuntimeException("Blog not found"));
        
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return blogLikeRepository.existsByBlogAndUser(blog, user);
    }

    public long getLikeCount(Long blogId) {
        Blog blog = blogRepository.findById(blogId)
            .orElseThrow(() -> new RuntimeException("Blog not found"));
        
        return blog.getLikesCount();
    }
} 