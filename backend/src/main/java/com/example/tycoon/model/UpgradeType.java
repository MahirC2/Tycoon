package com.example.tycoon.model;

import java.util.Arrays;

public enum UpgradeType {
    FASTER_CLICKER("faster-clicker", "Faster Clicker", 10, 1.15, 1),
    AUTO_TAP("auto-tap", "Auto Tap", 10_000, 1.0, 3),
    INVESTMENT_BANK("investment-bank", "Investment Bank", 200, 1.22, 8),
    VENTURE_CAPITAL("venture-capital", "Venture Capital", 1000, 1.3, 20);

    private final String id;
    private final String displayName;
    private final double baseCost;
    private final double costMultiplier;
    private final double bonusPerLevel;

    UpgradeType(String id, String displayName, double baseCost, double costMultiplier, double bonusPerLevel) {
        this.id = id;
        this.displayName = displayName;
        this.baseCost = baseCost;
        this.costMultiplier = costMultiplier;
        this.bonusPerLevel = bonusPerLevel;
    }

    public String getId() {
        return id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public double getBaseCost() {
        return baseCost;
    }

    public double getCostMultiplier() {
        return costMultiplier;
    }

    public double getBonusPerLevel() {
        return bonusPerLevel;
    }

    public static UpgradeType fromId(String id) {
        return Arrays.stream(values())
                .filter(upgrade -> upgrade.id.equalsIgnoreCase(id))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown upgrade id: " + id));
    }
}
