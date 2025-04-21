package com.example.backend.service;

import com.example.backend.exception.BlogNotFoundException;
import com.example.backend.exception.InvalidBlogDataException;
import com.example.backend.model.Blog;
import com.example.backend.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;

    public Blog createBlog(Blog blog) {
        validateBlog(blog);
        return blogRepository.save(blog);
    }

    public List<Blog> getAllBlogs() {
        return blogRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Blog> getBlogsByAuthor(String author) {
        return blogRepository.findByAuthorOrderByCreatedAtDesc(author);
    }

    public Blog getBlogById(Long id) {
        return blogRepository.findById(id)
            .orElseThrow(() -> new BlogNotFoundException("Blog not found with id: " + id));
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
