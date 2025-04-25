
package com.example.backend.dao;

import com.example.backend.model.Blog;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public class BlogDaoImpl implements BlogDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Blog> findAll() {
        return entityManager.createQuery("SELECT b FROM Blog b", Blog.class).getResultList();
    }

    @Override
    public Optional<Blog> findById(Long id) {
        return Optional.ofNullable(entityManager.find(Blog.class, id));
    }

    @Override
    public Blog save(Blog blog) {
        if (blog.getId() == null) {
            entityManager.persist(blog);
            return blog;
        } else {
            return entityManager.merge(blog);
        }
    }

    @Override
    public void deleteById(Long id) {
        Blog blog = entityManager.find(Blog.class, id);
        if (blog != null) {
            entityManager.remove(blog);
        }
    }

    @Override
    public List<Blog> findByAuthorOrderByCreatedAtDesc(String author) {
        return entityManager.createQuery(
                "SELECT b FROM Blog b WHERE b.author = :author ORDER BY b.createdAt DESC", Blog.class)
                .setParameter("author", author)
                .getResultList();
    }

    @Override
    public List<Blog> findAllByOrderByCreatedAtDesc() {
        return entityManager.createQuery(
                "SELECT b FROM Blog b ORDER BY b.createdAt DESC", Blog.class)
                .getResultList();
    }

    @Override
    public void delete(Blog blog) {
        if (entityManager.contains(blog)) {
            entityManager.remove(blog);
        } else {
            entityManager.remove(entityManager.merge(blog));
        }
    }
}
