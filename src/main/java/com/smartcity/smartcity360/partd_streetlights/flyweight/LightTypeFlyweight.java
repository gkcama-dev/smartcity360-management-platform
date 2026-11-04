package com.smartcity.smartcity360.partd_streetlights.flyweight;

// Flyweight: Immutable class storing intrinsic (shared) state across thousands of streetlights
public class LightTypeFlyweight {

    private final String model;
    private final int wattage;
    private final String colorTemperature; // e.g. 3000K Warm, 4000K Cool White
    private final int lumens;
    private final String manufacturer;

    public LightTypeFlyweight(String model, int wattage, String colorTemperature, int lumens, String manufacturer) {
        this.model = model;
        this.wattage = wattage;
        this.colorTemperature = colorTemperature;
        this.lumens = lumens;
        this.manufacturer = manufacturer;
    }

    public String getModel() { return model; }
    public int getWattage() { return wattage; }
    public String getColorTemperature() { return colorTemperature; }
    public int getLumens() { return lumens; }
    public String getManufacturer() { return manufacturer; }
}
