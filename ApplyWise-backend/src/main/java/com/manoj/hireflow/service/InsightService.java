package com.manoj.hireflow.service;

import com.manoj.hireflow.dto.JobInsightDto;
import org.springframework.stereotype.Service;

@Service
public class InsightService {
    public JobInsightDto calculateInsights(
            double skillMatch,
            int applicantCount,
            int employerResponseRate
    ) {

        JobInsightDto dto = new JobInsightDto();

        double skillScore = skillMatch;

        double competitionScore = 100.0 / (1 + applicantCount);

        double employerScore = employerResponseRate;

        double finalScore =
                (0.7 * skillScore) +
                        (0.2 * competitionScore) +
                        (0.1 * employerScore);

        dto.setSkillCompatibility(skillScore);
        dto.setCompetitionIndex(competitionScore);
        dto.setEmployerResponsiveness(employerScore);
        dto.setSuccessProbability(finalScore);
        dto.setApplicantCount(applicantCount);

        return dto;
    }
}
