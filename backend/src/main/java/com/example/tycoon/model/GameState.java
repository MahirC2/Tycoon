package com.example.tycoon.model;

import java.util.List;

public class GameState {
    private final double cash;
    private final double cashPerClick;
    private final List<UpgradeView> upgrades;

    public GameState(double cash, double cashPerClick, List<UpgradeView> upgrades) {
        this.cash = cash;
        this.cashPerClick = cashPerClick;
        this.upgrades = upgrades;
    }

    public double getCash() {
        return cash;
    }

    public double getCashPerClick() {
        return cashPerClick;
    }

    public List<UpgradeView> getUpgrades() {
        return upgrades;
    }
}
