package com.smartcity.smartcity360.partc_escalation.model;

public enum SeverityLevel {

    LOW,        // Handled by Local Community Staff (e.g. garbage delay, streetlight flicker)
    MEDIUM,     // Handled by Area Supervisor (e.g. water leak, traffic light outage, potholes)
    HIGH,       // Handled by City Manager (e.g. structural damage, main gas leak, power outage)
    CRITICAL    // Handled by City Manager & Emergency Disaster Unit (e.g. flood, explosion risk)

}
