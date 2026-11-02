package com.smartcity.smartcity360.parta_security.decorator;

import com.smartcity.smartcity360.parta_security.model.DataStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

// Concrete Decorator that adds GZIP data compression layer
public class CompressionDecorator extends DataStreamDecorator {
    public CompressionDecorator(DataStream wrappee) {
        super(wrappee);
    }

    @Override
    public void writeData(String data) {
        String compressedData = compress(data);
        super.writeData(compressedData);
    }

    @Override
    public String readData() {
        String data = super.readData();
        return decompress(data);
    }

    private String compress(String data) {
        try {
            ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
            try (GZIPOutputStream gzipStream = new GZIPOutputStream(byteStream)) {
                gzipStream.write(data.getBytes(StandardCharsets.UTF_8));
            }
            return "COMP[" + Base64.getEncoder().encodeToString(byteStream.toByteArray()) + "]";
        } catch (IOException e) {
            return data;
        }
    }

    private String decompress(String data) {
        if (data.startsWith("COMP[") && data.endsWith("]")) {
            try {
                String clean = data.substring(5, data.length() - 1);
                byte[] compressedBytes = Base64.getDecoder().decode(clean);
                ByteArrayInputStream byteStream = new ByteArrayInputStream(compressedBytes);
                GZIPInputStream gzipStream = new GZIPInputStream(byteStream);
                return new String(gzipStream.readAllBytes(), StandardCharsets.UTF_8);
            } catch (IOException e) {
                return data;
            }
        }
        return data;
    }
}
