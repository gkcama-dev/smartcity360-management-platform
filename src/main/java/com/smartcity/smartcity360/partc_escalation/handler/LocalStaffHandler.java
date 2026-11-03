package com.smartcity.smartcity360.partc_escalation.handler;

import com.smartcity.smartcity360.partc_escalation.model.Complaint;
import com.smartcity.smartcity360.partc_escalation.model.SeverityLevel;

// Concrete Handler 1: Frontline municipal staff handling LOW severity issues
public class LocalStaffHandler extends ComplaintHandler {

    @Override
    protected boolean canHandle(Complaint complaint) {
        return complaint.getSeverity() == SeverityLevel.LOW;
    }

    @Override
    protected void resolve(Complaint complaint) {
        complaint.markResolved(getHandlerRole(), "Dispatched community maintenance team for quick onsite fix.");
    }

    @Override
    protected String getHandlerRole() {
        return "Local Community Staff";
    }
}
