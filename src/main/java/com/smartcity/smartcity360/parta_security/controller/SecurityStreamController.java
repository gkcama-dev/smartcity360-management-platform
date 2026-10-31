package com.smartcity.smartcity360.parta_security.controller;

import com.smartcity.smartcity360.parta_security.service.EnergyDataStreamService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

// REST Controller exposing Part A Decorator Pattern functionality
@RestController
@RequestMapping("/api/part-a")
@CrossOrigin(origins = "*")
public class SecurityStreamController {
    private final EnergyDataStreamService streamService;
    public SecurityStreamController(EnergyDataStreamService streamService) {
        this.streamService = streamService;
    }
    @PostMapping("/stream")
    public Map<String, Object> processMeterStream(
            @RequestParam(defaultValue = "EM-COLOMBO-01") String meterId,
            @RequestParam(defaultValue = "142.50") double kwh,
            @RequestParam(defaultValue = "230.0") double voltage,
            @RequestParam(defaultValue = "true") boolean auth,
            @RequestParam(defaultValue = "true") boolean encrypt,
            @RequestParam(defaultValue = "true") boolean compress) {
        return streamService.processStream(meterId, kwh, voltage, auth, encrypt, compress);
    }
}
