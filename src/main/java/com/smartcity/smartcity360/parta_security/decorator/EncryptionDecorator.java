package com.smartcity.smartcity360.parta_security.decorator;

import com.smartcity.smartcity360.parta_security.model.DataStream;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

// Concrete Decorator that adds Base64 encryption/decryption layer
public class EncryptionDecorator extends DataStreamDecorator{

    public EncryptionDecorator(DataStream wrappee) {
        super(wrappee);
    }

    @Override
    public void writeData(String data) {
        // Encrypt data before passing it down the chain
        String encryptedData = encode(data);
        super.writeData(encryptedData);
    }

    @Override
    public String readData() {
        // Read data from the wrapped stream and decrypt it
        String encryptedData = super.readData();
        return decode(encryptedData);
    }

    private String encode(String data) {
        byte[] bytes = data.getBytes(StandardCharsets.UTF_8);
        return "ENC[" + Base64.getEncoder().encodeToString(bytes) + "]";
    }

    private String decode(String data) {
        if (data.startsWith("ENC[") && data.endsWith("]")) {
            String clean = data.substring(4, data.length() - 1);
            byte[] decodedBytes = Base64.getDecoder().decode(clean);
            return new String(decodedBytes, StandardCharsets.UTF_8);
        }
        return data;
    }

}
