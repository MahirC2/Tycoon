package com.example.tycoon;

import com.example.tycoon.model.GameState;
import com.example.tycoon.service.GameService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class GameServiceTest {

    private GameService service;

    @BeforeEach
    void setUp() {
        service = new GameService();
    }

    @Test
    void initialStateHasBaseValues() {
        GameState state = service.getState();
        assertThat(state.getCash()).isZero();
        assertThat(state.getCashPerClick()).isEqualTo(1.0);
        assertThat(state.getUpgrades()).allMatch(upgrade -> upgrade.getLevel() == 0);
    }

    @Test
    void clickIncreasesCashByCashPerClick() {
        service.registerClick();
        GameState state = service.getState();
        assertThat(state.getCash()).isEqualTo(1.0);
    }

    @Test
    void purchasingUpgradeIncreasesCashPerClick() {
        for (int i = 0; i < 10; i++) {
            service.registerClick();
        }
        GameState afterClicks = service.getState();
        assertThat(afterClicks.getCash()).isEqualTo(10.0);

        service.purchaseUpgrade("faster-clicker");
        GameState state = service.getState();
        assertThat(state.getCashPerClick()).isGreaterThan(1.0);
        assertThat(state.getUpgrades()
                .stream()
                .filter(upgrade -> upgrade.getId().equals("faster-clicker"))
                .findFirst()
                .orElseThrow()
                .getLevel()).isEqualTo(1);
    }
}
