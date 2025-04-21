package com.example.backend.service;

import com.example.backend.model.Comment;
import com.example.backend.model.Blog;
import com.example.backend.repository.CommentRepository;
import com.example.backend.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private BlogRepository blogRepository;

    public Comment createComment(Long blogId, String author, String content) {
        Blog blog = blogRepository.findById(blogId)
            .orElseThrow(() -> new RuntimeException("Blog not found"));

        Comment comment = new Comment(author, content, blog);
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByBlog(Long blogId) {
        Blog blog = blogRepository.findById(blogId)
            .orElseThrow(() -> new RuntimeException("Blog not found"));
        return commentRepository.findByBlogOrderByCreatedAtDesc(blog);
    }

    public void deleteComment(Long commentId, String username) {
        Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new RuntimeException("Comment not found"));
        
        // Only allow comment author or blog author to delete the comment
        if (!comment.getAuthor().equals(username) && !comment.getBlog().getAuthor().equals(username)) {
            throw new RuntimeException("Not authorized to delete this comment");
        }
        
        commentRepository.delete(comment);
    }

    public long getCommentCount(Long blogId) {
        Blog blog = blogRepository.findById(blogId)
            .orElseThrow(() -> new RuntimeException("Blog not found"));
        return commentRepository.countByBlog(blog);
    }
} 