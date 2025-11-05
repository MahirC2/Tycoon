package com.example.tycoon.model;

public class UpgradeState {
    private final UpgradeType type;
    private int level;

    public UpgradeState(UpgradeType type) {
        this.type = type;
        this.level = 0;
    }

    public UpgradeType getType() {
        return type;
    }

    public int getLevel() {
        return level;
    }

    public void incrementLevel() {
        this.level++;
    }

    public double getCurrentCost() {
        return type.getBaseCost() * Math.pow(type.getCostMultiplier(), level);
    }
}
