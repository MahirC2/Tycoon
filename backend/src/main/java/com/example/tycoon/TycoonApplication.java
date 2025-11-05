package com.example.tycoon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TycoonApplication {
    public static void main(String[] args) {
        SpringApplication.run(TycoonApplication.class, args);
    }
}
