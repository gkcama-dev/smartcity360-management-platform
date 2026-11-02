package com.smartcity.smartcity360.partb_hierarchy.composite;

import com.smartcity.smartcity360.partb_hierarchy.component.ZoneComponent;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Composite Node: represents a container of zones (City, District, or Street)
public class CompositeZone implements ZoneComponent {

    private final String name;
    private final String zoneType; // CITY, DISTRICT, STREET
    private final List<ZoneComponent> children = new ArrayList<>();

    public CompositeZone(String name, String zoneType) {
        this.name = name;
        this.zoneType = zoneType;
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public String getZoneType() {
        return this.zoneType;
    }

    @Override
    public void add(ZoneComponent component) {
        children.add(component);
    }

    @Override
    public void remove(ZoneComponent component) {
        children.remove(component);
    }

    @Override
    public List<ZoneComponent> getChildren() {
        return this.children;
    }

    @Override
    public void shutdownPower() {
        // Recursively dispatch shutdown command to all children
        for (ZoneComponent child : children) {
            child.shutdownPower();
        }
    }

    @Override
    public void restorePower() {
        // Recursively dispatch restore command to all children
        for (ZoneComponent child : children) {
            child.restorePower();
        }
    }

    @Override
    public boolean isPowerActive() {
        // A composite zone has active power if at least one child has active power
        for (ZoneComponent child : children) {
            if (child.isPowerActive()) {
                return true;
            }
        }
        return false;
    }

    @Override
    public double getEnergyConsumption() {
        // Recursively aggregate total energy consumption of all sub-zones
        double total = 0.0;
        for (ZoneComponent child : children) {
            total += child.getEnergyConsumption();
        }
        return Math.round(total * 100.0) / 100.0;
    }

    @Override
    public Map<String, Object> getStatusReport() {
        Map<String, Object> report = new HashMap<>();
        report.put("name", this.name);
        report.put("zoneType", this.zoneType);
        report.put("powerActive", isPowerActive());
        report.put("totalEnergyKw", getEnergyConsumption());
        report.put("childCount", children.size());
        List<Map<String, Object>> childReports = new ArrayList<>();
        for (ZoneComponent child : children) {
            childReports.add(child.getStatusReport());
        }
        report.put("subZones", childReports);
        return report;
    }
}
