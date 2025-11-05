package com.example.tycoon.service;

import com.example.tycoon.model.GameState;
import com.example.tycoon.model.UpgradeState;
import com.example.tycoon.model.UpgradeType;
import com.example.tycoon.model.UpgradeView;
import org.springframework.stereotype.Service;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GameService {
    private static final double BASE_CASH_PER_CLICK = 1.0;

    private double cash = 0;
    private final Map<UpgradeType, UpgradeState> upgrades = new EnumMap<>(UpgradeType.class);

    public GameService() {
        for (UpgradeType type : UpgradeType.values()) {
            upgrades.put(type, new UpgradeState(type));
        }
    }

    public synchronized GameState getState() {
        return new GameState(
                round(cash),
                round(getCashPerClick()),
                getUpgradeViews()
        );
    }

    public synchronized GameState registerClick() {
        cash += getCashPerClick();
        return getState();
    }

    public synchronized GameState purchaseUpgrade(String upgradeId) {
        UpgradeType type = UpgradeType.fromId(upgradeId);
        UpgradeState state = upgrades.get(type);
        double cost = state.getCurrentCost();
        if (cash < cost) {
            throw new IllegalStateException("Not enough cash to purchase upgrade");
        }
        cash -= cost;
        state.incrementLevel();
        return getState();
    }

    private List<UpgradeView> getUpgradeViews() {
        return upgrades.values().stream()
                .map(state -> new UpgradeView(
                        state.getType().getId(),
                        state.getType().getDisplayName(),
                        state.getLevel(),
                        round(state.getCurrentCost()),
                        state.getType().getBonusPerLevel()
                ))
                .collect(Collectors.toList());
    }

    private double getCashPerClick() {
        return BASE_CASH_PER_CLICK + upgrades.values().stream()
                .mapToDouble(state -> state.getType().getBonusPerLevel() * state.getLevel())
                .sum();
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
