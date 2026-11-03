package com.smartcity.smartcity360.partc_escalation.handler;

import com.smartcity.smartcity360.partc_escalation.model.Complaint;

// Base Abstract Handler in the Chain of Responsibility
public abstract class ComplaintHandler {

    protected ComplaintHandler nextHandler;

    // Fluent method chaining (e.g. staff.setNext(supervisor).setNext(manager))
    public ComplaintHandler setNext(ComplaintHandler nextHandler) {
        this.nextHandler = nextHandler;
        return nextHandler;
    }

    // Template method defining the chain dispatch flow
    public void process(Complaint complaint) {
        if (canHandle(complaint)) {
            resolve(complaint);
        } else if (nextHandler != null) {
            passToNext(complaint);
        } else {
            complaint.logTrace("End of chain reached. No handler could resolve this complaint!");
        }
    }

    protected abstract boolean canHandle(Complaint complaint);

    protected abstract void resolve(Complaint complaint);

    protected abstract String getHandlerRole();

    protected void passToNext(Complaint complaint) {
        complaint.logTrace("Severity too high for [" + getHandlerRole() + "]. Escalating to next authority...");
        nextHandler.process(complaint);
    }

}
