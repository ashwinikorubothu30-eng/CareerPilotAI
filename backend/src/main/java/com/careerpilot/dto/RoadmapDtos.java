package com.careerpilot.dto;

import java.util.List;

public class RoadmapDtos {

    public static class Request {
        private String targetRole;
        private String currentLevel; // Beginner, Intermediate, Advanced
        private Integer targetTimelineWeeks;
        private List<String> currentSkills;

        public Request() {}

        public String getTargetRole() { return targetRole; }
        public void setTargetRole(String targetRole) { this.targetRole = targetRole; }

        public String getCurrentLevel() { return currentLevel; }
        public void setCurrentLevel(String currentLevel) { this.currentLevel = currentLevel; }

        public Integer getTargetTimelineWeeks() { return targetTimelineWeeks; }
        public void setTargetTimelineWeeks(Integer targetTimelineWeeks) { this.targetTimelineWeeks = targetTimelineWeeks; }

        public List<String> getCurrentSkills() { return currentSkills; }
        public void setCurrentSkills(List<String> currentSkills) { this.currentSkills = currentSkills; }
    }

    public static class Milestone {
        private String id;
        private String title;
        private String description;
        private List<String> skillsToLearn;
        private List<String> recommendedProjects;
        private List<String> learningResources;
        private boolean completed;

        public Milestone() {}

        public Milestone(String id, String title, String description, List<String> skillsToLearn, 
                         List<String> recommendedProjects, List<String> learningResources) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.skillsToLearn = skillsToLearn;
            this.recommendedProjects = recommendedProjects;
            this.learningResources = learningResources;
            this.completed = false;
        }

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public List<String> getSkillsToLearn() { return skillsToLearn; }
        public void setSkillsToLearn(List<String> skillsToLearn) { this.skillsToLearn = skillsToLearn; }

        public List<String> getRecommendedProjects() { return recommendedProjects; }
        public void setRecommendedProjects(List<String> recommendedProjects) { this.recommendedProjects = recommendedProjects; }

        public List<String> getLearningResources() { return learningResources; }
        public void setLearningResources(List<String> learningResources) { this.learningResources = learningResources; }

        public boolean isCompleted() { return completed; }
        public void setCompleted(boolean completed) { this.completed = completed; }
    }

    public static class Phase {
        private String phaseNumber;
        private String phaseName;
        private String duration;
        private String objective;
        private List<Milestone> milestones;

        public Phase() {}

        public Phase(String phaseNumber, String phaseName, String duration, String objective, List<Milestone> milestones) {
            this.phaseNumber = phaseNumber;
            this.phaseName = phaseName;
            this.duration = duration;
            this.objective = objective;
            this.milestones = milestones;
        }

        public String getPhaseNumber() { return phaseNumber; }
        public void setPhaseNumber(String phaseNumber) { this.phaseNumber = phaseNumber; }

        public String getPhaseName() { return phaseName; }
        public void setPhaseName(String phaseName) { this.phaseName = phaseName; }

        public String getDuration() { return duration; }
        public void setDuration(String duration) { this.duration = duration; }

        public String getObjective() { return objective; }
        public void setObjective(String objective) { this.objective = objective; }

        public List<Milestone> getMilestones() { return milestones; }
        public void setMilestones(List<Milestone> milestones) { this.milestones = milestones; }
    }

    public static class Response {
        private String roleTitle;
        private String targetLevel;
        private int totalEstimatedWeeks;
        private String careerOverview;
        private double expectedMarketSalary;
        private List<Phase> phases;
        private List<String> essentialTools;

        public Response() {}

        public String getRoleTitle() { return roleTitle; }
        public void setRoleTitle(String roleTitle) { this.roleTitle = roleTitle; }

        public String getTargetLevel() { return targetLevel; }
        public void setTargetLevel(String targetLevel) { this.targetLevel = targetLevel; }

        public int getTotalEstimatedWeeks() { return totalEstimatedWeeks; }
        public void setTotalEstimatedWeeks(int totalEstimatedWeeks) { this.totalEstimatedWeeks = totalEstimatedWeeks; }

        public String getCareerOverview() { return careerOverview; }
        public void setCareerOverview(String careerOverview) { this.careerOverview = careerOverview; }

        public double getExpectedMarketSalary() { return expectedMarketSalary; }
        public void setExpectedMarketSalary(double expectedMarketSalary) { this.expectedMarketSalary = expectedMarketSalary; }

        public List<Phase> getPhases() { return phases; }
        public void setPhases(List<Phase> phases) { this.phases = phases; }

        public List<String> getEssentialTools() { return essentialTools; }
        public void setEssentialTools(List<String> essentialTools) { this.essentialTools = essentialTools; }
    }
}
