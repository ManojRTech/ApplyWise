package com.manoj.hireflow.controller;

import com.manoj.hireflow.dto.ApplicationResponse;
import com.manoj.hireflow.dto.ApplicationSeekerResponse;
import com.manoj.hireflow.dto.JobInsightDto;
import com.manoj.hireflow.dto.StatusUpdateRequest;
import com.manoj.hireflow.entity.Application;
import com.manoj.hireflow.repository.ApplicationRepository;
import com.manoj.hireflow.service.ApplicationService;
import com.manoj.hireflow.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;
    private final ApplicationRepository applicationRepository;
    private final EmailService emailService;

    public ApplicationController(ApplicationService applicationService,  ApplicationRepository applicationRepository, EmailService emailService) {
        this.applicationService = applicationService;
        this.applicationRepository = applicationRepository;
        this.emailService = emailService;
    }

    // JobSeeker applies to job
    @PostMapping("/{jobId}")
    @PreAuthorize("hasRole('JOB_SEEKER')")
    public ResponseEntity<String> applyToJob(
            @PathVariable Long jobId,
            @RequestParam("resume") MultipartFile file,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(
                applicationService.applyToJob(jobId, email, file)
        );
    }

    // Employer views applications for a job
    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<List<ApplicationResponse>> viewApplications(
            @PathVariable Long jobId,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(
                applicationService.getApplicationsForJob(jobId, email)
        );
    }

    // Employer updates status
    @PutMapping("/{applicationId}/status")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<String> updateStatus(
            @PathVariable Long applicationId,
            @RequestParam String status,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(
                applicationService.updateApplicationStatus(applicationId, status, email)
        );
    }

    // JobSeeker views own applications
    @GetMapping("/me")
    @PreAuthorize("hasRole('JOB_SEEKER')")
    public ResponseEntity<List<ApplicationSeekerResponse>> getMyApplications(
            Authentication authentication
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(
                applicationService.getMyApplications(email)
        );
    }

    @DeleteMapping("/{applicationId}")
    @PreAuthorize("hasRole('JOB_SEEKER')")
    public ResponseEntity<String> cancelApplication(
            @PathVariable Long applicationId,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                applicationService.cancelApplication(applicationId, email)
        );
    }

    @PostMapping("/insights/{jobId}")
    public ResponseEntity<?> getInsights(
            @PathVariable Long jobId,
            @RequestParam("file") MultipartFile file
    ) {

        JobInsightDto dto = applicationService.generateInsightsFromResume(jobId, file);

        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdateRequest request,
            Authentication authentication
    ) {
        String employerEmail = authentication.getName();

        applicationService.updateApplicationStatus(
                id,
                request.getStatus(),
                employerEmail,
                request.getAssessmentLink(),
                request.getMessage()
        );

        return ResponseEntity.ok("Status updated successfully");
    }
}