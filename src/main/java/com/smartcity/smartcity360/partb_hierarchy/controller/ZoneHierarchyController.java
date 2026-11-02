package com.smartcity.smartcity360.partb_hierarchy.controller;

import com.smartcity.smartcity360.partb_hierarchy.component.ZoneComponent;
import com.smartcity.smartcity360.partb_hierarchy.service.ZoneHierarchyService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

// REST Controller exposing Part B Composite Pattern endpoints
@RestController
@RequestMapping("/api/part-b")
@CrossOrigin(origins = "*")
public class ZoneHierarchyController{

    private final ZoneHierarchyService hierarchyService;

    public ZoneHierarchyController(ZoneHierarchyService hierarchyService) {
        this.hierarchyService = hierarchyService;
    }

    // Get the full Smart City tree structure
    @GetMapping("/tree")
    public Map<String, Object> getHierarchyTree() {
        return hierarchyService.getCityHierarchy();
    }

    // Shutdown power at any level (City, District, Street, or Building)
    @PostMapping("/power/shutdown")
    public Map<String, Object> shutdownPower(@RequestParam String zoneName) {
        return hierarchyService.shutdownPower(zoneName);
    }

    // Restore power at any level
    @PostMapping("/power/restore")
    public Map<String, Object> restorePower(@RequestParam String zoneName) {
        return hierarchyService.restorePower(zoneName);
    }

    // Get usage and status report for a specific zone
    @GetMapping("/report")
    public Map<String, Object> getZoneReport(@RequestParam(defaultValue = "Metro Colombo City") String zoneName) {
        ZoneComponent zone = hierarchyService.findZone(zoneName);
        if (zone == null) {
            Map<String, Object> err = new HashMap<>();
            err.put("status", "FAILED");
            err.put("message", "Zone not found: " + zoneName);
            return err;
        }
        return zone.getStatusReport();
    }

    // Dynamic endpoint to add new Zone or Building at runtime
    @PostMapping("/add")
    public Map<String, Object> addZone(
            @RequestParam String parentZoneName,
            @RequestParam String newZoneName,
            @RequestParam String zoneType, // DISTRICT, STREET, or BUILDING
            @RequestParam(defaultValue = "Commercial") String buildingType,
            @RequestParam(defaultValue = "100.0") double energyKw) {
        return hierarchyService.addZone(parentZoneName, newZoneName, zoneType, buildingType, energyKw);
    }

}
