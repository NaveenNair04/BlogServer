package com.example.backend.service;

import com.example.backend.model.Comment;
import com.example.backend.model.Blog;
import com.example.backend.dao.CommentDao;
import com.example.backend.dao.BlogDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentDao commentDao;

    @Autowired
    private BlogDao blogDao;

    public Comment createComment(Long blogId, String author, String content) {
        Blog blog = blogDao.findById(blogId)
            .orElseThrow(() -> new RuntimeException("Blog not found"));

        Comment comment = new Comment(author, content, blog);
        return commentDao.save(comment);
    }

    public List<Comment> getCommentsByBlog(Long blogId) {
        Blog blog = blogDao.findById(blogId)
            .orElseThrow(() -> new RuntimeException("Blog not found"));
        return commentDao.findByBlogOrderByCreatedAtDesc(blog);
    }

    public void deleteComment(Long commentId, String username) {
    // Find the comment by ID
      Comment comment = commentDao.findById(commentId)
          .orElseThrow(() -> new RuntimeException("Comment not found"));

      // Check if the user is the comment author or the blog author
      if (!comment.getAuthor().equals(username) && !comment.getBlog().getAuthor().equals(username)) {
          throw new RuntimeException("Not authorized to delete this comment");
      }

      // Proceed to delete the comment
      commentDao.delete(comment);
    } 

    public long getCommentCount(Long blogId) {
        Blog blog = blogDao.findById(blogId)
            .orElseThrow(() -> new RuntimeException("Blog not found"));
        return commentDao.countByBlog(blog);
    }
} 
