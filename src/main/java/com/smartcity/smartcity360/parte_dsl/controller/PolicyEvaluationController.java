package com.smartcity.smartcity360.parte_dsl.controller;

import com.smartcity.smartcity360.parte_dsl.context.CityContext;
import com.smartcity.smartcity360.parte_dsl.service.CityPolicyService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

// REST Controller exposing Part E Interpreter Pattern DSL rule engine
@RestController
@RequestMapping("/api/part-e")
@CrossOrigin(origins = "*")
public class PolicyEvaluationController {

    private final CityPolicyService policyService;

    public PolicyEvaluationController(CityPolicyService policyService) {
        this.policyService = policyService;
    }

    // Evaluate all registered municipal rules against telemetry data
    @PostMapping("/evaluate-telemetry")
    public Map<String, Object> evaluateTelemetry(
            @RequestParam(defaultValue = "82.5") double noiseLevel,
            @RequestParam(defaultValue = "23") int timeHour,
            @RequestParam(defaultValue = "150") int parkingDuration,
            @RequestParam(defaultValue = "COMMERCIAL") String vehicleType,
            @RequestParam(defaultValue = "165.0") double airAqi,
            @RequestParam(defaultValue = "INDUSTRIAL") String sensorZone) {
        CityContext context = new CityContext();
        context.set("NOISE_LEVEL", noiseLevel);
        context.set("TIME_HOUR", timeHour);
        context.set("PARKING_DURATION", parkingDuration);
        context.set("VEHICLE_TYPE", vehicleType);
        context.set("AIR_AQI", airAqi);
        context.set("SENSOR_ZONE", sensorZone);
        List<Map<String, Object>> evaluations = policyService.evaluateAllPolicies(context);
        Map<String, Object> response = new HashMap<>();
        response.put("telemetryData", context.getAllParameters());
        response.put("policyEvaluations", evaluations);
        return response;
    }

    // Live custom DSL rule tester
    @PostMapping("/test-rule")
    public Map<String, Object> testCustomRule(
            @RequestParam String dslRule,
            @RequestBody Map<String, Object> sensorData) {
        CityContext context = new CityContext();
        sensorData.forEach(context::set);
        return policyService.evaluateSingleRule("CUSTOM-RULE", dslRule, context);
    }
    
    // Get all registered municipal policy rules
    @GetMapping("/policies")
    public Map<String, String> getPolicies() {
        return policyService.getRegisteredPolicies();
    }
}
