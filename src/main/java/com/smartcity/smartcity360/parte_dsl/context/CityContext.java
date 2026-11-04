package com.smartcity.smartcity360.parte_dsl.context;

import java.util.HashMap;
import java.util.Map;

// Context: Stores real-time sensor telemetry and environmental data for rule evaluation
public class CityContext {

    private final Map<String, Object> parameters = new HashMap<>();

    public void set(String key, Object value) {
        parameters.put(key.toUpperCase().trim(), value);
    }

    public Object get(String key) {
        return parameters.get(key.toUpperCase().trim());
    }

    public double getNumeric(String key) {
        Object val = get(key);
        if (val instanceof Number) {
            return ((Number) val).doubleValue();
        } else if (val != null) {
            try {
                return Double.parseDouble(val.toString());
            } catch (NumberFormatException e) {
                return 0.0;
            }
        }
        return 0.0;
    }

    public String getString(String key) {
        Object val = get(key);
        return val != null ? val.toString().trim() : "";
    }

    public boolean has(String key) {
        return parameters.containsKey(key.toUpperCase().trim());
    }

    public Map<String, Object> getAllParameters() {
        return new HashMap<>(parameters);
    }
}
