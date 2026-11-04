package com.smartcity.smartcity360.partd_streetlights.factory;

import com.smartcity.smartcity360.partd_streetlights.flyweight.LightTypeFlyweight;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

// Flyweight Factory: ensures shared intrinsic objects are reused rather than duplicated
public class StreetLightFactory {

    // In-memory cache pool of unique light types
    private static final Map<String, LightTypeFlyweight> pool = new ConcurrentHashMap<>();
    public static LightTypeFlyweight getLightType(String model, int wattage, String colorTemp,
                                                  int lumens, String manufacturer) {
        // Unique composite cache key
        String key = model + "_" + wattage + "_" + colorTemp;
        // If type exists in pool, return existing instance; otherwise create and cache it
        return pool.computeIfAbsent(key, k -> new LightTypeFlyweight(model, wattage, colorTemp, lumens, manufacturer));
    }

    public static int getFlyweightCount() {
        return pool.size();
    }

    public static void clearPool() {
        pool.clear();
    }

}
