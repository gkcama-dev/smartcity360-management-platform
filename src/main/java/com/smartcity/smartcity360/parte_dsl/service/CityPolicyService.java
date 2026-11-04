package com.smartcity.smartcity360.parte_dsl.service;

import com.smartcity.smartcity360.parte_dsl.context.CityContext;
import com.smartcity.smartcity360.parte_dsl.expression.Expression;
import com.smartcity.smartcity360.parte_dsl.parser.PolicyParser;
import org.springframework.stereotype.Service;

import java.util.*;

// Service acting as the Smart City Policy Rule Engine
@Service
public class CityPolicyService {

    private final Map<String, String> registeredPolicies = new LinkedHashMap<>();

    public CityPolicyService() {
        // Register default municipal policies defined in DSL
        registeredPolicies.put("POL-01", "NOISE_LEVEL > 75 AND TIME_HOUR >= 22");
        registeredPolicies.put("POL-02", "PARKING_DURATION > 120 OR VEHICLE_TYPE == COMMERCIAL");
        registeredPolicies.put("POL-03", "AIR_AQI > 150 AND SENSOR_ZONE == INDUSTRIAL");
    }

    // Evaluate all registered policies against current sensor telemetry
    public List<Map<String, Object>> evaluateAllPolicies(CityContext context) {
        List<Map<String, Object>> results = new ArrayList<>();
        for (Map.Entry<String, String> entry : registeredPolicies.entrySet()) {
            String policyId = entry.getKey();
            String dslRule = entry.getValue();
            Map<String, Object> evalResult = evaluateSingleRule(policyId, dslRule, context);
            results.add(evalResult);
        }
        return results;
    }

    // Parse and evaluate a custom ad-hoc DSL rule on the fly
    public Map<String, Object> evaluateSingleRule(String policyId, String dslRule, CityContext context) {
        Map<String, Object> result = new HashMap<>();
        result.put("policyId", policyId);
        result.put("dslRule", dslRule);
        try {
            // Build AST using Interpreter Pattern
            Expression ast = PolicyParser.parse(dslRule);

            // Interpret against context
            boolean isTriggered = ast.interpret(context);
            result.put("parsedAST", ast.toString());
            result.put("violated", isTriggered);
            result.put("status", isTriggered ? "VIOLATION_TRIGGERED" : "NORMAL_COMPLIANT");
            result.put("message", isTriggered ? "Policy conditions MET - Automated municipal action required!"
                    : "Policy conditions NOT met - Normal operations.");
        } catch (Exception e) {
            result.put("status", "PARSE_ERROR");
            result.put("message", "Error parsing DSL syntax: " + e.getMessage());
            result.put("violated", false);
        }
        return result;
    }

    public Map<String, String> getRegisteredPolicies() {
        return new LinkedHashMap<>(registeredPolicies);
    }
    public void addPolicy(String policyId, String dslRule) {
        registeredPolicies.put(policyId, dslRule);
    }
}
