package com.manoj.hireflow.dto;
import java.util.List;

public class JobInsightDto {
    private double skillCompatibility;
    private double competitionIndex;
    private double employerResponsiveness;
    private double successProbability;
    private int applicantCount;
    private List<String> matchedSkills;
    private List<String> missingSkills;

    // getters
    public double getSkillCompatibility() {
        return skillCompatibility;
    }

    public double getCompetitionIndex() {
        return competitionIndex;
    }

    public double getEmployerResponsiveness() {
        return employerResponsiveness;
    }

    public double getSuccessProbability() {
        return successProbability;
    }

    // setters
    public void setSkillCompatibility(double skillCompatibility) {
        this.skillCompatibility = skillCompatibility;
    }

    public void setCompetitionIndex(double competitionIndex) {
        this.competitionIndex = competitionIndex;
    }

    public void setEmployerResponsiveness(double employerResponsiveness) {
        this.employerResponsiveness = employerResponsiveness;
    }

    public void setSuccessProbability(double successProbability) {
        this.successProbability = successProbability;
    }

    public int getApplicantCount() {
        return applicantCount;
    }

    public void setApplicantCount(int applicantCount) {
        this.applicantCount = applicantCount;
    }

    public List<String> getMatchedSkills() {
        return matchedSkills;
    }

    public void setMatchedSkills(List<String> matchedSkills) {
        this.matchedSkills = matchedSkills;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }
}
