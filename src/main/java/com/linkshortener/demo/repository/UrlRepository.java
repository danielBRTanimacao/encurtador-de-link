package com.linkshortener.demo.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.linkshortener.demo.entity.LinkEntity;

@Repository
public interface UrlRepository extends JpaRepository<LinkEntity, Long> {
    Optional<LinkEntity> findByShortCode(String shortCode);
}
