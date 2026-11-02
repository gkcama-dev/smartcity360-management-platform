package com.smartcity.smartcity360.partb_hierarchy.service;

import com.smartcity.smartcity360.partb_hierarchy.component.ZoneComponent;
import com.smartcity.smartcity360.partb_hierarchy.composite.CompositeZone;
import com.smartcity.smartcity360.partb_hierarchy.leaf.BuildingZone;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

// Service managing the in-memory hierarchical structure of smart zones
@Service
public class ZoneHierarchyService {

    private final CompositeZone rootCity;

    public ZoneHierarchyService() {
        // Initialize the default Smart City hierarchy tree
        this.rootCity = buildDefaultCityHierarchy();
    }

    private CompositeZone buildDefaultCityHierarchy() {

        // Level 1: Root City
        CompositeZone colomboCity = new CompositeZone("Metro Colombo City", "CITY");

        // Level 2: District 1 (Commercial Zone)
        CompositeZone commercialDistrict = new CompositeZone("Commercial District", "DISTRICT");

        // Level 3: Streets in Commercial District
        CompositeZone galleRoad = new CompositeZone("Galle Road", "STREET");
        galleRoad.add(new BuildingZone("Bank of Ceylon Head Office", "Commercial Bank", 450.0));
        galleRoad.add(new BuildingZone("Cinnamon Grand Hotel", "Hospitality / Hotel", 820.5));
        CompositeZone lotusRoad = new CompositeZone("Lotus Road", "STREET");
        lotusRoad.add(new BuildingZone("World Trade Center (Tower A)", "Office Complex", 1200.0));
        commercialDistrict.add(galleRoad);
        commercialDistrict.add(lotusRoad);

        // Level 2: District 2 (Tech & Innovation Zone)
        CompositeZone techDistrict = new CompositeZone("Tech Innovation District", "DISTRICT");
        CompositeZone duplicationRoad = new CompositeZone("Duplication Road", "STREET");
        duplicationRoad.add(new BuildingZone("Virtusa Tech Campus", "IT Park", 650.0));
        duplicationRoad.add(new BuildingZone("Dialog Axiata HQ", "Telecom Center", 890.0));
        CompositeZone hospitalStreet = new CompositeZone("Regent Street", "STREET");
        hospitalStreet.add(new BuildingZone("National Hospital Smart Wing", "Emergency Healthcare", 1500.0));
        techDistrict.add(duplicationRoad);
        techDistrict.add(hospitalStreet);

        // Add both districts to the Root City
        colomboCity.add(commercialDistrict);
        colomboCity.add(techDistrict);
        return colomboCity;
    }

    // Find any component (City, District, Street, or Building) by name
    public ZoneComponent findZone(String name) {
        return search(rootCity, name);
    }

    private ZoneComponent search(ZoneComponent current, String targetName) {
        if (current.getName().equalsIgnoreCase(targetName)) {
            return current;
        }
        for (ZoneComponent child : current.getChildren()) {
            ZoneComponent found = search(child, targetName);
            if (found != null) {
                return found;
            }
        }
        return null;
    }

    // Apply power shutdown uniformly at any level
    public Map<String, Object> shutdownPower(String zoneName) {
        ZoneComponent target = findZone(zoneName);
        Map<String, Object> response = new HashMap<>();
        if (target == null) {
            response.put("status", "FAILED");
            response.put("message", "Zone not found: " + zoneName);
            return response;
        }
        target.shutdownPower();
        response.put("status", "SUCCESS");
        response.put("message", "Power shutdown successfully applied to: " + target.getName() + " [" + target.getZoneType() + "]");
        response.put("updatedStatus", target.getStatusReport());
        return response;
    }

    // Restore power uniformly at any level
    public Map<String, Object> restorePower(String zoneName) {
        ZoneComponent target = findZone(zoneName);
        Map<String, Object> response = new HashMap<>();
        if (target == null) {
            response.put("status", "FAILED");
            response.put("message", "Zone not found: " + zoneName);
            return response;
        }
        target.restorePower();
        response.put("status", "SUCCESS");
        response.put("message", "Power restored successfully to: " + target.getName() + " [" + target.getZoneType() + "]");
        response.put("updatedStatus", target.getStatusReport());
        return response;
    }

    // Get complete city tree structure
    public Map<String, Object> getCityHierarchy() {
        return rootCity.getStatusReport();
    }

    // Dynamically add a new zone (District, Street, or Building) to any parent zone
    public Map<String, Object> addZone(String parentZoneName, String newZoneName, String zoneType,
                                       String buildingType, double energyConsumptionKw) {
        ZoneComponent parent = findZone(parentZoneName);
        Map<String, Object> response = new HashMap<>();
        if (parent == null) {
            response.put("status", "FAILED");
            response.put("message", "Parent zone not found: " + parentZoneName);
            return response;
        }
        try {
            ZoneComponent newComponent;
            if ("BUILDING".equalsIgnoreCase(zoneType)) {
                newComponent = new BuildingZone(newZoneName, buildingType, energyConsumptionKw);
            } else {
                newComponent = new CompositeZone(newZoneName, zoneType.toUpperCase());
            }
            // Using Composite Pattern's uniform add method
            parent.add(newComponent);
            response.put("status", "SUCCESS");
            response.put("message", "New " + zoneType + " ('" + newZoneName + "') successfully added to " + parentZoneName);
            response.put("parentUpdatedReport", parent.getStatusReport());
        } catch (UnsupportedOperationException e) {
            response.put("status", "FAILED");
            response.put("message", "Cannot add children to a Leaf node (Building). Only City, District, or Street can have children!");
        }
        return response;
    }

}
