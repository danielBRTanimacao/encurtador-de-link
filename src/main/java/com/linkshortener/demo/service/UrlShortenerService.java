package com.linkshortener.demo.service;

import org.springframework.stereotype.Service;

import com.linkshortener.demo.entity.ShortUrl;
import com.linkshortener.demo.repository.ShortUrlRepository;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UrlShortenerService {
    
    private final ShortUrlRepository repository;
    private static final String BASE_URL = "http://localhost:8080/s/";

    public List<ShortUrl> listAll() {
        return repository.findAll();
    }
    
    public UrlShortenerService(ShortUrlRepository repository) {
        this.repository = repository;
    }

    public String shortenUrl(String originalUrl) {
        String shortCode = generateShortCode();
        ShortUrl shortUrl = new ShortUrl(null, originalUrl, shortCode);
        repository.save(shortUrl);
        return BASE_URL + shortCode;
    }

    public Optional<String> getOriginalUrl(String shortCode) {
        return repository.findByShortCode(shortCode).map(ShortUrl::getOriginalUrl);
    }

    private String generateShortCode() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder shortCode = new StringBuilder();
        Random random = new Random();
        
        for (int i = 0; i < 6; i++) { // Gera um código de 6 caracteres
            shortCode.append(characters.charAt(random.nextInt(characters.length())));
        }
        
        return shortCode.toString();
    }
}
