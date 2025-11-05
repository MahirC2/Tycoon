package com.example.tycoon.model;

public class UpgradeView {
    private final String id;
    private final String name;
    private final int level;
    private final double cost;
    private final double bonusPerLevel;

    public UpgradeView(String id, String name, int level, double cost, double bonusPerLevel) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.cost = cost;
        this.bonusPerLevel = bonusPerLevel;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getLevel() {
        return level;
    }

    public double getCost() {
        return cost;
    }

    public double getBonusPerLevel() {
        return bonusPerLevel;
    }
}
