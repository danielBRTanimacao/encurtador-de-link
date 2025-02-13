package com.linkshortener.demo.service;

import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.linkshortener.demo.entity.LinkEntity;
import com.linkshortener.demo.repository.UrlRepository;

@Service
public class ServiceUrl {
    @Autowired
    private UrlRepository repository;
    private static final String BASE_URL = "http://127.0.0.1:8000/s/";

    public String shortenLink(String digitedUrl) {
        String shortCode = generateShortCode();
        LinkEntity entityLink = new LinkEntity(null, digitedUrl, shortCode);
        repository.save(entityLink);
        return BASE_URL + shortCode;
    }

    public Optional<String> getOriginUrl(String shortCode) {
        return repository.findByShortCode(shortCode).map(LinkEntity::getOriginalUrl);
    }

    private String generateShortCode() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder shortCode = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 6; i++) {
            shortCode.append(characters.charAt(random.nextInt(characters.length())));
        }

        return shortCode.toString();
    }
}
