package com.example.backend.controller;

import com.example.backend.model.Blog;
import com.example.backend.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "http://localhost:4200")
public class BlogController {
    
    private static final Logger logger = LoggerFactory.getLogger(BlogController.class);
    
    @Autowired
    private BlogService blogService;

    @PostMapping
    public ResponseEntity<Blog> createBlog(@RequestBody Blog blog) {
        Blog createdBlog = blogService.createBlog(blog);
        return ResponseEntity.ok(createdBlog);
    }

    @GetMapping
    public ResponseEntity<?> getAllBlogs() {
        try {
            return ResponseEntity.ok(blogService.getAllBlogs());
        } catch (Exception e) {
            logger.error("Error fetching blogs: ", e);
            return ResponseEntity.badRequest().body("Error fetching blogs: " + e.getMessage());
        }
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<?> getUserBlogs(@PathVariable String username) {
        try {
            return ResponseEntity.ok(blogService.getBlogsByAuthor(username));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching user blogs: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Long id) {
        Blog blog = blogService.getBlogById(id);
        return ResponseEntity.ok(blog);
    }
}
