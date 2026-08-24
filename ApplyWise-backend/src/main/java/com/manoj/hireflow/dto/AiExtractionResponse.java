package com.manoj.hireflow.dto;

import java.util.List;

public class AiExtractionResponse {

    private List<String> jobRequirements;
    private List<String> candidateSkills;
    private List<PotentialMatch> potentialMatches;

    public List<String> getJobRequirements() {
        return jobRequirements;
    }

    public void setJobRequirements(List<String> jobRequirements) {
        this.jobRequirements = jobRequirements;
    }

    public List<String> getCandidateSkills() {
        return candidateSkills;
    }

    public void setCandidateSkills(List<String> candidateSkills) {
        this.candidateSkills = candidateSkills;
    }

    public List<PotentialMatch> getPotentialMatches() {
        return potentialMatches;
    }

    public void setPotentialMatches(List<PotentialMatch> potentialMatches) {
        this.potentialMatches = potentialMatches;
    }

    public static class PotentialMatch {

        private String jobRequirement;
        private String candidateSkill;

        public String getJobRequirement() {
            return jobRequirement;
        }

        public void setJobRequirement(String jobRequirement) {
            this.jobRequirement = jobRequirement;
        }

        public String getCandidateSkill() {
            return candidateSkill;
        }

        public void setCandidateSkill(String candidateSkill) {
            this.candidateSkill = candidateSkill;
        }
    }
}