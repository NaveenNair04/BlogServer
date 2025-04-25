package com.example.backend.dao;

import com.example.backend.model.Blog;
import com.example.backend.model.BlogLike;
import com.example.backend.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public class BlogLikeDaoImpl implements BlogLikeDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public boolean existsByBlogAndUser(Blog blog, User user) {
        return entityManager.createQuery(
                "SELECT COUNT(bl) FROM BlogLike bl WHERE bl.blog = :blog AND bl.user = :user", Long.class)
                .setParameter("blog", blog)
                .setParameter("user", user)
                .getSingleResult() > 0;
    }

    @Override
    public void deleteByBlogAndUser(Blog blog, User user) {
        BlogLike blogLike = entityManager.createQuery(
                "SELECT bl FROM BlogLike bl WHERE bl.blog = :blog AND bl.user = :user", BlogLike.class)
                .setParameter("blog", blog)
                .setParameter("user", user)
                .getResultStream()
                .findFirst()
                .orElse(null);

        if (blogLike != null) {
            entityManager.remove(blogLike);
        }
    }

    @Override
    public long countByBlog(Blog blog) {
        return entityManager.createQuery(
                "SELECT COUNT(bl) FROM BlogLike bl WHERE bl.blog = :blog", Long.class)
                .setParameter("blog", blog)
                .getSingleResult();
    }

    @Override
    public BlogLike save(BlogLike blogLike) {
        if (blogLike.getId() == null) {
            entityManager.persist(blogLike);
            return blogLike;
        } else {
            return entityManager.merge(blogLike);
        }
    }
}

