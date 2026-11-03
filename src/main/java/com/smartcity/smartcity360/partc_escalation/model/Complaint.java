package com.smartcity.smartcity360.partc_escalation.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


// Model representing a citizen complaint along with its resolution and escalation trail
public class Complaint {

    private final String id;
    private final String citizenName;
    private final String contactNumber;
    private final String title;
    private final String location;
    private final SeverityLevel severity;
    private String status; // SUBMITTED, RESOLVED, UNHANDLED
    private String resolvedBy; // Name/Role of the handler who resolved it
    private String resolutionNotes;
    private final String submittedAt;
    private final List<String> escalationHistory = new ArrayList<>();


    public Complaint(String id, String citizenName, String contactNumber, String title,
                     String location, SeverityLevel severity) {
        this.id = id;
        this.citizenName = citizenName;
        this.contactNumber = contactNumber;
        this.title = title;
        this.location = location;
        this.severity = severity;
        this.status = "SUBMITTED";
        this.resolvedBy = "PENDING";
        this.resolutionNotes = "Awaiting review";
        this.submittedAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        logTrace("Complaint registered by citizen: " + citizenName + " [" + severity + "]");
    }

    public void logTrace(String message) {
        this.escalationHistory.add(LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss")) + " - " + message);
    }

    public void markResolved(String handlerRole, String notes) {
        this.status = "RESOLVED";
        this.resolvedBy = handlerRole;
        this.resolutionNotes = notes;
        logTrace("Resolved by [" + handlerRole + "]: " + notes);
    }

    // Getters
    public String getId() { return id; }
    public String getCitizenName() { return citizenName; }
    public String getContactNumber() { return contactNumber; }
    public String getTitle() { return title; }
    public String getLocation() { return location; }
    public SeverityLevel getSeverity() { return severity; }
    public String getStatus() { return status; }
    public String getResolvedBy() { return resolvedBy; }
    public String getResolutionNotes() { return resolutionNotes; }
    public String getSubmittedAt() { return submittedAt; }
    public List<String> getEscalationHistory() { return escalationHistory; }

}
