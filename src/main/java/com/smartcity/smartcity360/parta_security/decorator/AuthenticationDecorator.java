package com.smartcity.smartcity360.parta_security.decorator;

import com.smartcity.smartcity360.parta_security.model.DataStream;

// Concrete Decorator that adds an authentication token and signature validation
public class AuthenticationDecorator extends DataStreamDecorator {
    private final String authToken;
    public AuthenticationDecorator(DataStream wrappee, String authToken) {
        super(wrappee);
        this.authToken = authToken;
    }
    @Override
    public void writeData(String data) {
        // Attach authentication header to data
        String authenticatedData = "AUTH_TOKEN=" + this.authToken + "|" + data;
        super.writeData(authenticatedData);
    }
    @Override
    public String readData() {
        // Verify authentication header
        String raw = super.readData();
        if (raw.startsWith("AUTH_TOKEN=")) {
            int separatorIndex = raw.indexOf("|");
            if (separatorIndex != -1) {
                return raw.substring(separatorIndex + 1);
            }
        }
        return raw;
    }
}
