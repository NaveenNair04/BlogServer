package com.example.backend.service;

import com.example.backend.model.Blog;
import com.example.backend.model.BlogLike;
import com.example.backend.model.User;
import com.example.backend.dao.BlogLikeDao;
import com.example.backend.dao.BlogDao;
import com.example.backend.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BlogLikeService {
    @Autowired
    private BlogLikeDao blogLikeDao;

    @Autowired
    private BlogDao blogDao;

    @Autowired
    private UserDao userDao;

    @Transactional
    public void toggleLike(Long blogId, String username) {
        Blog blog = blogDao.findById(blogId)
            .orElseThrow(() -> new RuntimeException("Blog not found"));
        
        User user = userDao.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (blogLikeDao.existsByBlogAndUser(blog, user)) {
            // Unlike
            blogLikeDao.deleteByBlogAndUser(blog, user);
            blog.setLikesCount(blog.getLikesCount() - 1);
        } else {
            // Like
            BlogLike like = new BlogLike(blog, user);
            blogLikeDao.save(like);
            blog.setLikesCount(blog.getLikesCount() + 1);
        }
        
        blogDao.save(blog);
    }

    public boolean hasUserLiked(Long blogId, String username) {
        Blog blog = blogDao.findById(blogId)
            .orElseThrow(() -> new RuntimeException("Blog not found"));
        
        User user = userDao.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return blogLikeDao.existsByBlogAndUser(blog, user);
    }

    public long getLikeCount(Long blogId) {
        Blog blog = blogDao.findById(blogId)
            .orElseThrow(() -> new RuntimeException("Blog not found"));
        
        return blog.getLikesCount();
    }
} 
