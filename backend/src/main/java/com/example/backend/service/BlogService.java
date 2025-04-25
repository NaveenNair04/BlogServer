package com.example.backend.service;

import com.example.backend.exception.BlogNotFoundException;
import com.example.backend.exception.InvalidBlogDataException;
import com.example.backend.model.Blog;
import com.example.backend.dao.BlogDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BlogService {
    @Autowired
    private BlogDao blogDao;

    public Blog createBlog(Blog blog) {
        validateBlog(blog);
        blog.setLikesCount(0); // Initialize likes count
        return blogDao.save(blog);
    }

    public List<Blog> getAllBlogs() {
        return blogDao.findAllByOrderByCreatedAtDesc();
    }

    public List<Blog> getBlogsByAuthor(String author) {
        return blogDao.findByAuthorOrderByCreatedAtDesc(author);
    }

    public Blog getBlogById(Long id) {
        return blogDao.findById(id)
            .orElseThrow(() -> new BlogNotFoundException("Blog not found with id: " + id));
    }

    public Blog updateBlog(Long id, Blog updatedBlog) {
        Blog existingBlog = getBlogById(id); // This will throw BlogNotFoundException if blog doesn't exist
        
        // Update the fields
        existingBlog.setTitle(updatedBlog.getTitle());
        existingBlog.setContent(updatedBlog.getContent());
        // Don't update author as it should remain the same
        
        validateBlog(existingBlog);
        return blogDao.save(existingBlog);
    }

     public void deleteBlog(Long id) {
        Blog blog = blogDao.findById(id).orElseThrow(() -> new RuntimeException("Blog not found"));
        blogDao.delete(blog);
     }

    private void validateBlog(Blog blog) {
        if (blog.getTitle() == null || blog.getTitle().trim().isEmpty()) {
            throw new InvalidBlogDataException("Blog title cannot be empty");
        }
        if (blog.getContent() == null || blog.getContent().trim().isEmpty()) {
            throw new InvalidBlogDataException("Blog content cannot be empty");
        }
        if (blog.getAuthor() == null || blog.getAuthor().trim().isEmpty()) {
            throw new InvalidBlogDataException("Blog author cannot be empty");
        }
    }
}
