package com.smartcity.smartcity360.partc_escalation.handler;

import com.smartcity.smartcity360.partc_escalation.model.Complaint;
import com.smartcity.smartcity360.partc_escalation.model.SeverityLevel;

public class SupervisorHandler extends ComplaintHandler{

    @Override
    protected boolean canHandle(Complaint complaint) {
        return complaint.getSeverity() == SeverityLevel.MEDIUM;
    }

    @Override
    protected void resolve(Complaint complaint) {
        complaint.markResolved(getHandlerRole(), "Allocated specialized technical crew and municipal repair budget.");
    }

    @Override
    protected String getHandlerRole() {
        return "Zonal Area Supervisor";
    }
}
