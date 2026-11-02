package com.smartcity.smartcity360.partb_hierarchy.component;

import java.util.Collections;
import java.util.List;
import java.util.Map;

// Component Interface: defines uniform operations for both single buildings and zone groups
public interface ZoneComponent {

    String getName();
    String getZoneType();
    void shutdownPower();
    void restorePower();
    boolean isPowerActive();
    double getEnergyConsumption();
    Map<String, Object> getStatusReport();

    // Default implementations for child management (Leaf nodes will ignore or throw unsupported)
    default void add(ZoneComponent component) {
        throw new UnsupportedOperationException("Cannot add child to a leaf node: " + getName());
    }

    default void remove(ZoneComponent component) {
        throw new UnsupportedOperationException("Cannot remove child from a leaf node: " + getName());
    }

    default List<ZoneComponent> getChildren() {
        return Collections.emptyList();
    }
}
