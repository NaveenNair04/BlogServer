package com.example.backend.controller;

import com.example.backend.model.Blog;
import com.example.backend.service.BlogService;
import com.example.backend.exception.BlogNotFoundException;
import com.example.backend.exception.InvalidBlogDataException;
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

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable Long id) {
        try {
            logger.info("Attempting to delete blog with ID: {}", id);
            blogService.deleteBlog(id);
            logger.info("Successfully deleted blog with ID: {}", id);
            return ResponseEntity.ok().build();
        } catch (BlogNotFoundException e) {
            logger.error("Blog not found for deletion: {}", id, e);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Error deleting blog with ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.badRequest().body("Error deleting blog: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBlog(@PathVariable Long id, @RequestBody Blog blog) {
        try {
            Blog updatedBlog = blogService.updateBlog(id, blog);
            return ResponseEntity.ok(updatedBlog);
        } catch (BlogNotFoundException e) {
            logger.error("Blog not found: ", e);
            return ResponseEntity.notFound().build();
        } catch (InvalidBlogDataException e) {
            logger.error("Invalid blog data: ", e);
            return ResponseEntity.badRequest().body("Invalid blog data: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error updating blog: ", e);
            return ResponseEntity.badRequest().body("Failed to update blog: " + e.getMessage());
        }
    }
}
