package com.smartcity.smartcity360.partc_escalation.controller;

import com.smartcity.smartcity360.partc_escalation.model.Complaint;
import com.smartcity.smartcity360.partc_escalation.model.SeverityLevel;
import com.smartcity.smartcity360.partc_escalation.service.ComplaintEscalationService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

// REST Controller exposing Part C Chain of Responsibility endpoints
@RestController
@RequestMapping("/api/part-c")
@CrossOrigin(origins = "*")
public class ComplaintController {

    private final ComplaintEscalationService escalationService;

    public ComplaintController(ComplaintEscalationService escalationService) {
        this.escalationService = escalationService;
    }

    // Submit a new citizen complaint
    @PostMapping("/submit")
    public Complaint submitComplaint(
            @RequestParam String citizenName,
            @RequestParam String contact,
            @RequestParam String title,
            @RequestParam String location,
            @RequestParam SeverityLevel severity) {
        return escalationService.submitComplaint(citizenName, contact, title, location, severity);
    }

    // Retrieve all complaints with their full escalation audit trail
    @GetMapping("/complaints")
    public List<Complaint> getAllComplaints() {
        return escalationService.getAllComplaints();
    }

    // Get specific complaint details
    @GetMapping("/{id}")
    public Map<String, Object> getComplaint(@PathVariable String id) {
        Complaint complaint = escalationService.getComplaintById(id);
        Map<String, Object> response = new HashMap<>();
        if (complaint == null) {
            response.put("status", "NOT_FOUND");
            response.put("message", "No complaint found with ID: " + id);
            return response;
        }
        response.put("status", "SUCCESS");
        response.put("complaint", complaint);
        return response;
    }
}
