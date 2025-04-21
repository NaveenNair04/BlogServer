package com.example.backend.exception;

public class InvalidBlogDataException extends RuntimeException {
    public InvalidBlogDataException(String message) {
        super(message);
    }
} 