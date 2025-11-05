package com.example.tycoon.web;

import com.example.tycoon.model.GameState;
import com.example.tycoon.service.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public GameState getState() {
        return gameService.getState();
    }

    @PostMapping("/click")
    public GameState registerClick() {
        return gameService.registerClick();
    }

    @PostMapping("/upgrades/{upgradeId}/purchase")
    public GameState purchaseUpgrade(@PathVariable String upgradeId) {
        return gameService.purchaseUpgrade(upgradeId);
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<String> handleIllegalState(IllegalStateException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}
