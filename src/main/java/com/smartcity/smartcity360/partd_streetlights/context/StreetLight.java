package com.smartcity.smartcity360.partd_streetlights.context;

import com.smartcity.smartcity360.partd_streetlights.flyweight.LightTypeFlyweight;

import java.util.HashMap;
import java.util.Map;

// Context: stores extrinsic (unique) state for a specific physical pole, referencing the shared Flyweight
public class StreetLight {
    private final String id;
    private final double latitude;
    private final double longitude;
    private final String zoneName;
    private boolean powerOn;
    private int brightness; // 0 - 100%
    private final LightTypeFlyweight lightType; // Reference to shared intrinsic flyweight

    public StreetLight(String id, double latitude, double longitude, String zoneName,
                       LightTypeFlyweight lightType) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.zoneName = zoneName;
        this.lightType = lightType;
        this.powerOn = true;
        this.brightness = 100;
    }

    public void setPowerOn(boolean powerOn) {
        this.powerOn = powerOn;
    }

    public void setBrightness(int brightness) {
        this.brightness = Math.max(0, Math.min(100, brightness));
    }

    public String getId() { return id; }
    public double getLatitude() { return latitude; }
    public double getLongitude() { return longitude; }
    public String getZoneName() { return zoneName; }
    public boolean isPowerOn() { return powerOn; }
    public int getBrightness() { return brightness; }
    public LightTypeFlyweight getLightType() { return lightType; }

    public Map<String, Object> getDetails() {
        Map<String, Object> details = new HashMap<>();
        details.put("id", id);
        details.put("coordinates", latitude + ", " + longitude);
        details.put("zone", zoneName);
        details.put("powerOn", powerOn);
        details.put("brightness", brightness + "%");
        details.put("model", lightType.getModel());
        details.put("wattage", lightType.getWattage() + "W");
        details.put("colorTemp", lightType.getColorTemperature());
        details.put("lumens", lightType.getLumens() + " lm");
        details.put("manufacturer", lightType.getManufacturer());
        return details;
    }

}
