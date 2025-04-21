package com.example.backend.controller;

import com.example.backend.model.Blog;
import com.example.backend.model.Comment;
import com.example.backend.service.BlogService;
import com.example.backend.service.BlogLikeService;
import com.example.backend.service.CommentService;
import com.example.backend.exception.BlogNotFoundException;
import com.example.backend.exception.InvalidBlogDataException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "http://localhost:4200")
public class BlogController {
    
    private static final Logger logger = LoggerFactory.getLogger(BlogController.class);
    
    @Autowired
    private BlogService blogService;

    @Autowired
    private BlogLikeService blogLikeService;

    @Autowired
    private CommentService commentService;

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

    @PostMapping("/{id}/like")
    public ResponseEntity<?> toggleLike(@PathVariable Long id, @RequestParam String username) {
        try {
            blogLikeService.toggleLike(id, username);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Error toggling like: ", e);
            return ResponseEntity.badRequest().body("Error toggling like: " + e.getMessage());
        }
    }

    @GetMapping("/{id}/likes")
    public ResponseEntity<?> getLikeCount(@PathVariable Long id) {
        try {
            long count = blogLikeService.getLikeCount(id);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            logger.error("Error getting like count: ", e);
            return ResponseEntity.badRequest().body("Error getting like count: " + e.getMessage());
        }
    }

    @GetMapping("/{id}/has-liked")
    public ResponseEntity<?> hasUserLiked(@PathVariable Long id, @RequestParam String username) {
        try {
            boolean hasLiked = blogLikeService.hasUserLiked(id, username);
            return ResponseEntity.ok(hasLiked);
        } catch (Exception e) {
            logger.error("Error checking if user has liked: ", e);
            return ResponseEntity.badRequest().body("Error checking if user has liked: " + e.getMessage());
        }
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<?> addComment(
        @PathVariable Long id,
        @RequestParam String author,
        @RequestBody String content
    ) {
        try {
            Comment comment = commentService.createComment(id, author, content);
            return ResponseEntity.ok(comment);
        } catch (Exception e) {
            logger.error("Error adding comment: ", e);
            return ResponseEntity.badRequest().body("Error adding comment: " + e.getMessage());
        }
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<?> getComments(@PathVariable Long id) {
        try {
            List<Comment> comments = commentService.getCommentsByBlog(id);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            logger.error("Error getting comments: ", e);
            return ResponseEntity.badRequest().body("Error getting comments: " + e.getMessage());
        }
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<?> deleteComment(
        @PathVariable Long commentId,
        @RequestParam String username
    ) {
        try {
            commentService.deleteComment(commentId, username);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Error deleting comment: ", e);
            return ResponseEntity.badRequest().body("Error deleting comment: " + e.getMessage());
        }
    }

    @GetMapping("/{id}/comments/count")
    public ResponseEntity<?> getCommentCount(@PathVariable Long id) {
        try {
            long count = commentService.getCommentCount(id);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            logger.error("Error getting comment count: ", e);
            return ResponseEntity.badRequest().body("Error getting comment count: " + e.getMessage());
        }
    }
}
