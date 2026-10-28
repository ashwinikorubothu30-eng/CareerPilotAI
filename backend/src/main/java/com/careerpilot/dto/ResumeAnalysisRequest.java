package com.careerpilot.dto;

public class ResumeAnalysisRequest {
    private String resumeText;
    private String targetRole;
    private String jobDescription;

    public ResumeAnalysisRequest() {}

    public ResumeAnalysisRequest(String resumeText, String targetRole, String jobDescription) {
        this.resumeText = resumeText;
        this.targetRole = targetRole;
        this.jobDescription = jobDescription;
    }

    public String getResumeText() { return resumeText; }
    public void setResumeText(String resumeText) { this.resumeText = resumeText; }

    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }

    public String getJobDescription() { return jobDescription; }
    public void setJobDescription(String jobDescription) { this.jobDescription = jobDescription; }
}

