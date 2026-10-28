package com.careerpilot.dto;

import java.util.List;
import java.util.Map;

public class ResumeAnalysisResponse {
    private int atsScore;
    private String scoreSummary;
    private String detectedRole;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private List<String> actionVerbSuggestions;
    private List<String> formatIssues;
    private List<String> criticalStrengths;
    private List<String> keyImprovements;
    private List<Map<String, String>> bulletRewrites;
    private Map<String, Integer> scoreBreakdown; // Format, Content, Keywords, Impact

    public ResumeAnalysisResponse() {}

    public int getAtsScore() { return atsScore; }
    public void setAtsScore(int atsScore) { this.atsScore = atsScore; }

    public String getScoreSummary() { return scoreSummary; }
    public void setScoreSummary(String scoreSummary) { this.scoreSummary = scoreSummary; }

    public String getDetectedRole() { return detectedRole; }
    public void setDetectedRole(String detectedRole) { this.detectedRole = detectedRole; }

    public List<String> getMatchedSkills() { return matchedSkills; }
    public void setMatchedSkills(List<String> matchedSkills) { this.matchedSkills = matchedSkills; }

    public List<String> getMissingSkills() { return missingSkills; }
    public void setMissingSkills(List<String> missingSkills) { this.missingSkills = missingSkills; }

    public List<String> getActionVerbSuggestions() { return actionVerbSuggestions; }
    public void setActionVerbSuggestions(List<String> actionVerbSuggestions) { this.actionVerbSuggestions = actionVerbSuggestions; }

    public List<String> getFormatIssues() { return formatIssues; }
    public void setFormatIssues(List<String> formatIssues) { this.formatIssues = formatIssues; }

    public List<String> getCriticalStrengths() { return criticalStrengths; }
    public void setCriticalStrengths(List<String> criticalStrengths) { this.criticalStrengths = criticalStrengths; }

    public List<String> getKeyImprovements() { return keyImprovements; }
    public void setKeyImprovements(List<String> keyImprovements) { this.keyImprovements = keyImprovements; }

    public List<Map<String, String>> getBulletRewrites() { return bulletRewrites; }
    public void setBulletRewrites(List<Map<String, String>> bulletRewrites) { this.bulletRewrites = bulletRewrites; }

    public Map<String, Integer> getScoreBreakdown() { return scoreBreakdown; }
    public void setScoreBreakdown(Map<String, Integer> scoreBreakdown) { this.scoreBreakdown = scoreBreakdown; }
}
