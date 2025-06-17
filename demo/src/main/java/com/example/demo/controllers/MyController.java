package com.example.demo.controllers;

import java.security.Principal;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1")
@Slf4j
@CrossOrigin
public class MyController {

    @GetMapping("/public")
    public ResponseEntity<String> publicEndpoint(Principal principal){
        log.info("/public called");
        String msg=getPrincipalName(principal);
        return ResponseEntity.ok("Hello from public endpoint- "+msg);
    }

     @GetMapping("/user")
    public ResponseEntity<String> userEndpoint(Principal principal) {
        log.info("/user called");
        String message = getPrincipalName(principal);
        return ResponseEntity.ok("Hello from User endpoint - " + message);
    }

    @GetMapping("/admin")
    public ResponseEntity<String> adminEndpoint(Principal principal) {
        log.info("/admin called");
        String message = getPrincipalName(principal);
        return ResponseEntity.ok("Hello from Admin endpoint - " + message);
    }

    private static String getPrincipalName(Principal principal){
        return Optional.ofNullable(principal)
                        .map(a->a.getName())
                        .orElse("not availale");
    }
}

// The @RestController and @RequestMapping(“/api/v1”) annotations are used to expose a REST API.

// @GetMapping is used for each of the 3 endpoints. The 3 endpoints have a single method parameter of type java.security.Principal — this will contain details of the authenticated user.

// @CrossOrigin is required to allow the SPA client to call the endpoint from a different host/port origin.

// Each endpoint will return a simple string containing a message and the authenticated username (if present).