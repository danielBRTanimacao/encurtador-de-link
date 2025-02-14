package com.linkshortener.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.linkshortener.demo.entity.ShortUrl;
import com.linkshortener.demo.service.UrlShortenerService;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api")
public class UrlShortenerController {

    private final UrlShortenerService service;

    public UrlShortenerController(UrlShortenerService service) {
        this.service = service;
    }

    @GetMapping()
    public List<ShortUrl> getAllUrls() {
        return service.listAll();
    }

    @PostMapping("/shorten")
    public ResponseEntity<String> shortenUrl(@RequestParam String url) {
        String shortUrl = service.shortenUrl(url);
        return ResponseEntity.ok(shortUrl);
    }

    @GetMapping("/s/{shortCode}")
    public ResponseEntity<Object> redirectToOriginal(@PathVariable String shortCode) {
        Optional<String> originalUrl = service.getOriginalUrl(shortCode);
    
        if (originalUrl.isPresent()) {
            String url = originalUrl.get();
            
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                url = "http://" + url;
            }
            return ResponseEntity.status(302).location(URI.create(url)).build();
        }
    
        return ResponseEntity.notFound().build();
    }
}
    
