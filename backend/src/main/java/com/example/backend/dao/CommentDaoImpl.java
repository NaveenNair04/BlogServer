
package com.example.backend.dao;

import com.example.backend.model.Blog;
import com.example.backend.model.Comment;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import java.util.List;

@Repository
@Transactional
public class CommentDaoImpl implements CommentDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Comment> findByBlogOrderByCreatedAtDesc(Blog blog) {
        return entityManager.createQuery(
                "SELECT c FROM Comment c WHERE c.blog = :blog ORDER BY c.createdAt DESC", Comment.class)
                .setParameter("blog", blog)
                .getResultList();
    }

    @Override
    public List<Comment> findByAuthorOrderByCreatedAtDesc(String author) {
        return entityManager.createQuery(
                "SELECT c FROM Comment c WHERE c.author = :author ORDER BY c.createdAt DESC", Comment.class)
                .setParameter("author", author)
                .getResultList();
    }

    @Override
    public long countByBlog(Blog blog) {
        return entityManager.createQuery(
                "SELECT COUNT(c) FROM Comment c WHERE c.blog = :blog", Long.class)
                .setParameter("blog", blog)
                .getSingleResult();
    }

    @Override
    public Comment save(Comment comment) {
        if (comment.getId() == null) {
            entityManager.persist(comment);
            return comment;
        } else {
            return entityManager.merge(comment);
        }
    }

    @Override
    public void delete(Comment comment) {
        if (entityManager.contains(comment)) {
            entityManager.remove(comment);
        } else {
            entityManager.remove(entityManager.merge(comment));
        }
    }

    @Override
    public Optional<Comment> findById(Long id) {
        Comment comment = entityManager.find(Comment.class, id);
        return Optional.ofNullable(comment);
    }
}
