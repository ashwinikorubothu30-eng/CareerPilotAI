package com.careerpilot.dto;

import java.util.List;

public class JobMatchDtos {

    public static class MatchRequest {
        private List<String> userSkills;
        private String targetRole;
        private Integer experienceYears;
        private String preferredLocation;
        private String preferredType; // Remote, Full-time, Hybrid

        public MatchRequest() {}

        public List<String> getUserSkills() { return userSkills; }
        public void setUserSkills(List<String> userSkills) { this.userSkills = userSkills; }

        public String getTargetRole() { return targetRole; }
        public void setTargetRole(String targetRole) { this.targetRole = targetRole; }

        public Integer getExperienceYears() { return experienceYears; }
        public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }

        public String getPreferredLocation() { return preferredLocation; }
        public void setPreferredLocation(String preferredLocation) { this.preferredLocation = preferredLocation; }

        public String getPreferredType() { return preferredType; }
        public void setPreferredType(String preferredType) { this.preferredType = preferredType; }
    }

    public static class MatchedJob {
        private Long id;
        private String title;
        private String company;
        private String location;
        private String jobType;
        private String salaryRange;
        private String experienceLevel;
        private String description;
        private int matchScore; // 0 - 100%
        private List<String> matchedSkills;
        private List<String> missingSkills;
        private String recommendation;

        public MatchedJob() {}

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getCompany() { return company; }
        public void setCompany(String company) { this.company = company; }

        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }

        public String getJobType() { return jobType; }
        public void setJobType(String jobType) { this.jobType = jobType; }

        public String getSalaryRange() { return salaryRange; }
        public void setSalaryRange(String salaryRange) { this.salaryRange = salaryRange; }

        public String getExperienceLevel() { return experienceLevel; }
        public void setExperienceLevel(String experienceLevel) { this.experienceLevel = experienceLevel; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public int getMatchScore() { return matchScore; }
        public void setMatchScore(int matchScore) { this.matchScore = matchScore; }

        public List<String> getMatchedSkills() { return matchedSkills; }
        public void setMatchedSkills(List<String> matchedSkills) { this.matchedSkills = matchedSkills; }

        public List<String> getMissingSkills() { return missingSkills; }
        public void setMissingSkills(List<String> missingSkills) { this.missingSkills = missingSkills; }

        public String getRecommendation() { return recommendation; }
        public void setRecommendation(String recommendation) { this.recommendation = recommendation; }
    }
}
