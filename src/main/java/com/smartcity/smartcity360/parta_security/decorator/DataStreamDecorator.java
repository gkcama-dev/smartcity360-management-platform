package com.smartcity.smartcity360.parta_security.decorator;

import com.smartcity.smartcity360.parta_security.model.DataStream;

// Base decorator that holds a reference to another DataStream object
public abstract class DataStreamDecorator implements DataStream {

    protected DataStream wrappee;

    public DataStreamDecorator(DataStream wrappee) {
        this.wrappee = wrappee;
    }

    @Override
    public void writeData(String data) {
        // Delegate the write call to the wrapped stream
        wrappee.writeData(data);
    }
    @Override
    public String readData() {
        // Delegate the read call to the wrapped stream
        return wrappee.readData();
    }

}
