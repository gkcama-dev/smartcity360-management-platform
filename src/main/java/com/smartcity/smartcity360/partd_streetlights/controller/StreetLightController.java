package com.smartcity.smartcity360.partd_streetlights.controller;

import com.smartcity.smartcity360.partd_streetlights.service.StreetLightService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

// REST Controller exposing Part D Flyweight Pattern metrics and scale tests
@RestController
@RequestMapping("/api/part-d")
@CrossOrigin(origins = "*")
public class StreetLightController {

    private final StreetLightService streetLightService;
    public StreetLightController(StreetLightService streetLightService) {
        this.streetLightService = streetLightService;
    }

    // Get real-time RAM optimization metrics and Flyweight benchmark results
    @GetMapping("/metrics")
    public Map<String, Object> getMetrics() {
        return streetLightService.getMemoryBenchmarkMetrics();
    }

    // Get a sample of streetlights (e.g. first 20) for visual map/list rendering
    @GetMapping("/sample")
    public List<Map<String, Object>> getSample(@RequestParam(defaultValue = "20") int limit) {
        return streetLightService.getSampleLights(limit);
    }

    // Dynamically regenerate count to test RAM scaling (e.g. 5,000, 20,000, 50,000)
    @PostMapping("/scale")
    public Map<String, Object> scaleStreetLights(@RequestParam(defaultValue = "20000") int count) {
        streetLightService.generateStreetLights(count);
        return streetLightService.getMemoryBenchmarkMetrics();
    }
}
