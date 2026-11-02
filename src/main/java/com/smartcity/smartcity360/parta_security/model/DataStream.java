package com.smartcity.smartcity360.parta_security.model;

// Common interface for both the core energy meter stream and all security wrappers
public interface DataStream {
    void writeData(String data);
    String readData();
}
