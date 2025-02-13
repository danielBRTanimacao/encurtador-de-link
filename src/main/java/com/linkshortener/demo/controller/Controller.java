package com.linkshortener.demo.controller;

import java.net.URI;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.linkshortener.demo.service.ServiceUrl;


@RestController
@RequestMapping("/api")
public class Controller {
    private final ServiceUrl service;

    public Controller(ServiceUrl service) {
        this.service = service;
    }

    @PostMapping("/shorten")
    public ResponseEntity<String> shortenUrl(@RequestParam String url) {
        String shortUrl = service.shortenLink(url);

        return ResponseEntity.ok(shortUrl);
    }

    // @GetMapping("/s/{shortCode}")
    // public ResponseEntity<Void> redirectToOriginal(@PathVariable String shortCode) {
    //     Optional<String> originUrl = service.getOriginUrl(shortCode);
        
    //     return originUrl
    //         .map(url -> ResponseEntity.status(302) 
    //                 .location(URI.create(url))
    //                 .build()) 
    //         .orElseGet(() -> ResponseEntity.notFound().build());
    // }
    
    
}
