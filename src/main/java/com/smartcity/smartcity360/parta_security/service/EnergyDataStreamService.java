package com.smartcity.smartcity360.parta_security.service;

import com.smartcity.smartcity360.parta_security.decorator.AuthenticationDecorator;
import com.smartcity.smartcity360.parta_security.decorator.CompressionDecorator;
import com.smartcity.smartcity360.parta_security.decorator.EncryptionDecorator;
import com.smartcity.smartcity360.parta_security.model.DataStream;
import com.smartcity.smartcity360.parta_security.model.EnergyMeterStream;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Service to demonstrate dynamic stacking of security decorators at runtime
@Service
public class EnergyDataStreamService {
    public Map<String, Object> processStream(String meterId, double kwh, double voltage,
                                             boolean enableAuth, boolean enableEncryption, boolean enableCompression) {

        // 1. Raw energy meter reading payload
        String rawPayload = String.format("{\"meterId\":\"%s\",\"kwh\":%.2f,\"voltage\":%.1f}", meterId, kwh, voltage);

        // 2. Start with the core concrete component
        EnergyMeterStream coreStream = new EnergyMeterStream();
        DataStream currentStream = coreStream;
        List<String> activeLayers = new ArrayList<>();
        activeLayers.add("Core Raw Stream");
        // 3. Dynamically wrap with decorators based on client choices
        if (enableAuth) {
            currentStream = new AuthenticationDecorator(currentStream, "URBAN-SEC-9921");
            activeLayers.add("Authentication Wrapper (AuthToken: URBAN-SEC-9921)");
        }
        if (enableEncryption) {
            currentStream = new EncryptionDecorator(currentStream);
            activeLayers.add("Encryption Wrapper (Base64)");
        }
        if (enableCompression) {
            currentStream = new CompressionDecorator(currentStream);
            activeLayers.add("Compression Wrapper (GZIP)");
        }
        // 4. Write data through the decorator pipeline
        currentStream.writeData(rawPayload);

        // What is physically stored in the core stream after all wrappings
        String storedPhysicalData = coreStream.readData();
        // 5. Read back through decorators (unwrapping layers)
        String unpackedData = currentStream.readData();
        Map<String, Object> result = new HashMap<>();
        result.put("meterId", meterId);
        result.put("originalPayload", rawPayload);
        result.put("activeLayers", activeLayers);
        result.put("transmittedData", storedPhysicalData);
        result.put("receivedAndUnpackedData", unpackedData);
        result.put("status", "SUCCESS");
        return result;
    }
}
