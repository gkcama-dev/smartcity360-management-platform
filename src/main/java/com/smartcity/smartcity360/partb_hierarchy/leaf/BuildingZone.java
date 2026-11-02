package com.smartcity.smartcity360.partb_hierarchy.leaf;

import com.smartcity.smartcity360.partb_hierarchy.component.ZoneComponent;

import java.util.HashMap;
import java.util.Map;

// Leaf Node: represents an individual physical building (no children allowed)
public class BuildingZone implements ZoneComponent {

    private final String name;
    private final String buildingType; // e.g. Hospital, Commercial Tower, Hotel
    private boolean powerActive;
    private final double baseConsumptionKw; // Base energy consumption in kW

    public BuildingZone(String name, String buildingType, double baseConsumptionKw) {
        this.name = name;
        this.buildingType = buildingType;
        this.baseConsumptionKw = baseConsumptionKw;
        this.powerActive = true; // Powered ON by default
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public String getZoneType() {
        return "BUILDING";
    }

    public String getBuildingType() {
        return this.buildingType;
    }

    @Override
    public void shutdownPower() {
        this.powerActive = false;
    }

    @Override
    public void restorePower() {
        this.powerActive = true;
    }

    @Override
    public boolean isPowerActive() {
        return this.powerActive;
    }

    @Override
    public double getEnergyConsumption() {
        // If power is shut down, consumption drops to 0.0
        return this.powerActive ? this.baseConsumptionKw : 0.0;
    }

    @Override
    public Map<String, Object> getStatusReport() {
        Map<String, Object> report = new HashMap<>();
        report.put("name", this.name);
        report.put("zoneType", "BUILDING");
        report.put("buildingType", this.buildingType);
        report.put("powerActive", this.powerActive);
        report.put("energyConsumptionKw", getEnergyConsumption());
        return report;
    }
}
