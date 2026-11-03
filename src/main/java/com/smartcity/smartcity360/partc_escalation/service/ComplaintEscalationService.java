package com.smartcity.smartcity360.partc_escalation.service;

import com.smartcity.smartcity360.partc_escalation.handler.CityManagerHandler;
import com.smartcity.smartcity360.partc_escalation.handler.ComplaintHandler;
import com.smartcity.smartcity360.partc_escalation.handler.LocalStaffHandler;
import com.smartcity.smartcity360.partc_escalation.handler.SupervisorHandler;
import com.smartcity.smartcity360.partc_escalation.model.Complaint;
import com.smartcity.smartcity360.partc_escalation.model.SeverityLevel;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

// Service assembling the Chain of Responsibility and maintaining in-memory complaint logs
@Service
public class ComplaintEscalationService {

    private final ComplaintHandler chainHead;
    private final List<Complaint> complaintRepository = Collections.synchronizedList(new ArrayList<>());
    private final AtomicInteger idCounter = new AtomicInteger(1001);

    public ComplaintEscalationService() {
        // 1. Build the Chain: Local Staff -> Supervisor -> City Manager
        LocalStaffHandler staff = new LocalStaffHandler();
        SupervisorHandler supervisor = new SupervisorHandler();
        CityManagerHandler manager = new CityManagerHandler();
        staff.setNext(supervisor).setNext(manager);
        this.chainHead = staff;

        // 2. Seed realistic demo complaints
        seedDemoComplaints();
    }

    private void seedDemoComplaints() {
        submitComplaint("Kasun Perera", "0771234567", "Flickering street lamp at corner", "Galle Road", SeverityLevel.LOW);
        submitComplaint("Dr. Nimal Silva", "0718899001", "Main water line burst causing flooding", "Duplication Road", SeverityLevel.MEDIUM);
        submitComplaint("Anura Fernando", "0754433221", "Gas pipe leak near school building", "Regent Street", SeverityLevel.CRITICAL);
    }

    // Submit a new complaint and pass it through the Chain of Responsibility
    public Complaint submitComplaint(String citizenName, String contact, String title, String location, SeverityLevel severity) {
        String complaintId = "CMP-" + idCounter.getAndIncrement();
        Complaint complaint = new Complaint(complaintId, citizenName, contact, title, location, severity);
        // Process request through the Chain of Responsibility starting at chain head
        chainHead.process(complaint);
        // Save to in-memory repository
        complaintRepository.add(0, complaint); // Newest first
        return complaint;
    }

    public List<Complaint> getAllComplaints() {
        return new ArrayList<>(complaintRepository);
    }

    public Complaint getComplaintById(String id) {
        return complaintRepository.stream()
                .filter(c -> c.getId().equalsIgnoreCase(id))
                .findFirst()
                .orElse(null);
    }
}
