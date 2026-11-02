package com.smartcity.smartcity360.parta_security.model;

// Concrete Component that handles the core data reading and writing
public class EnergyMeterStream implements DataStream {

    private String buffer;

    public EnergyMeterStream() {
        this.buffer = "";
    }

    public EnergyMeterStream(String initialData) {
       this.buffer = initialData;
    }

    @Override
    public void writeData(String data) {
        this.buffer = data;
    }
    @Override
    public String readData() {
        return this.buffer;
    }
}
