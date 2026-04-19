package com.manoj.hireflow.dto;

import com.manoj.hireflow.entity.Application.ApplicationStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusUpdateRequest {
    private String status;
    private String message;
    private String assessmentLink;
}
