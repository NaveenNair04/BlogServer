
package com.example.backend.dao;

import com.example.backend.model.Blog;
import com.example.backend.model.BlogLike;
import com.example.backend.model.User;

public interface BlogLikeDao {
    boolean existsByBlogAndUser(Blog blog, User user);
    void deleteByBlogAndUser(Blog blog, User user);
    long countByBlog(Blog blog);
    BlogLike save(BlogLike blogLike);
}
