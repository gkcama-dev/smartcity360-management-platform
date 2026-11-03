package com.smartcity.smartcity360.partc_escalation.handler;

import com.smartcity.smartcity360.partc_escalation.model.Complaint;
import com.smartcity.smartcity360.partc_escalation.model.SeverityLevel;

// Concrete Handler 3: Senior City Director handling HIGH & CRITICAL emergencies
public class CityManagerHandler extends ComplaintHandler{

    @Override
    protected boolean canHandle(Complaint complaint) {
        return complaint.getSeverity() == SeverityLevel.HIGH ||
                complaint.getSeverity() == SeverityLevel.CRITICAL;
    }

    @Override
    protected void resolve(Complaint complaint) {
        if (complaint.getSeverity() == SeverityLevel.CRITICAL) {
            complaint.markResolved(getHandlerRole(),
                    "CRITICAL EMERGENCY: City Disaster Management Unit mobilized & Mayor alerted immediately.");
        } else {
            complaint.markResolved(getHandlerRole(),
                    "HIGH PRIORITY: City Council emergency repair order issued with civil engineering team.");
        }
    }

    @Override
    protected String getHandlerRole() {
        return "Chief City Manager";
    }
}
