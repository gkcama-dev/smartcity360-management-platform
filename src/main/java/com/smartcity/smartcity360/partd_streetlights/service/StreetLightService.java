package com.smartcity.smartcity360.partd_streetlights.service;

import com.smartcity.smartcity360.partd_streetlights.context.StreetLight;
import com.smartcity.smartcity360.partd_streetlights.factory.StreetLightFactory;
import com.smartcity.smartcity360.partd_streetlights.flyweight.LightTypeFlyweight;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

// Service simulating tens of thousands of smart streetlights and benchmarking memory savings
@Service
public class StreetLightService {
    private final List<StreetLight> streetLights = new CopyOnWriteArrayList<>();
    private final String[] ZONES = {"Galle Road", "Lotus Road", "Duplication Road", "Regent Street", "Marine Drive"};

    public StreetLightService() {
        // Pre-generate 10,000 smart streetlights on startup
        generateStreetLights(10000);
    }

    public synchronized void generateStreetLights(int count) {
        streetLights.clear();
        StreetLightFactory.clearPool();

        // 3 Standard Municipal Lighting Configurations
        LightTypeFlyweight standardLed = StreetLightFactory.getLightType("Philips LumiStreet BGP213", 60, "4000K Neutral White", 7200, "Philips Signify");
        LightTypeFlyweight highwayLed = StreetLightFactory.getLightType("Osram Streetlight 10 Micro", 120, "5000K Daylight", 15000, "Osram GmbH");
        LightTypeFlyweight ecoSolarLed = StreetLightFactory.getLightType("Cree LEDway Solar Edge", 40, "3000K Warm White", 4800, "Cree Lighting");
        LightTypeFlyweight[] availableTypes = {standardLed, highwayLed, ecoSolarLed};

        Random rand = new Random(42); // Seeded for consistency
        for (int i = 1; i <= count; i++) {
            String id = String.format("SL-COL-%05d", i);
            double lat = 6.9000 + (rand.nextDouble() * 0.0500);
            double lng = 79.8500 + (rand.nextDouble() * 0.0500);
            String zone = ZONES[rand.nextInt(ZONES.length)];
            LightTypeFlyweight selectedType = availableTypes[rand.nextInt(availableTypes.length)];
            streetLights.add(new StreetLight(id, lat, lng, zone, selectedType));
        }
    }

    public Map<String, Object> getMemoryBenchmarkMetrics() {
        int totalLights = streetLights.size();
        int sharedFlyweightCount = StreetLightFactory.getFlyweightCount();
        // Estimated memory calculation:
        // Non-flyweight: each light holds duplicated strings (~250 bytes per light object graph)
        long nonFlyweightEstimatedBytes = (long) totalLights * 250L;

        // Flyweight: 3 shared types (~250 bytes each) + each light only holds references & coordinates (~60 bytes)
        long flyweightEstimatedBytes = (sharedFlyweightCount * 250L) + ((long) totalLights * 60L);

        long bytesSaved = nonFlyweightEstimatedBytes - flyweightEstimatedBytes;
        double percentageSaved = ((double) bytesSaved / nonFlyweightEstimatedBytes) * 100.0;
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalStreetLightsCreated", totalLights);
        metrics.put("uniqueFlyweightObjectsInRam", sharedFlyweightCount);
        metrics.put("withoutFlyweightEstimatedKb", Math.round(nonFlyweightEstimatedBytes / 1024.0));
        metrics.put("withFlyweightEstimatedKb", Math.round(flyweightEstimatedBytes / 1024.0));
        metrics.put("memorySavedKb", Math.round(bytesSaved / 1024.0));
        metrics.put("memorySavedPercentage", String.format("%.2f%%", percentageSaved));
        metrics.put("verdict", "Flyweight pattern saved ~" + String.format("%.1f%%", percentageSaved) + " of JVM heap memory!");
        return metrics;
    }

    public List<Map<String, Object>> getSampleLights(int limit) {
        List<Map<String, Object>> sample = new ArrayList<>();
        int count = Math.min(limit, streetLights.size());
        for (int i = 0; i < count; i++) {
            sample.add(streetLights.get(i).getDetails());
        }
        return sample;
    }

}
