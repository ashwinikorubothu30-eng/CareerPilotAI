package com.careerpilot.model;

import jakarta.persistence.*;

@Entity
@Table(name = "job_listings")
public class JobListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String company;
    private String location;
    private String jobType; // Full-time, Remote, Hybrid
    private String salaryRange;
    private String experienceLevel; // Entry, Mid, Senior

    @Column(length = 2000)
    private String description;

    @Column(length = 2000)
    private String requiredSkills;

    @Transient
    private Integer matchScore;

    public JobListing() {}

    public JobListing(String title, String company, String location, String jobType, String salaryRange, 
                      String experienceLevel, String description, String requiredSkills) {
        this.title = title;
        this.company = company;
        this.location = location;
        this.jobType = jobType;
        this.salaryRange = salaryRange;
        this.experienceLevel = experienceLevel;
        this.description = description;
        this.requiredSkills = requiredSkills;
    }

    // Getters and Setters
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

    public String getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(String requiredSkills) { this.requiredSkills = requiredSkills; }

    public Integer getMatchScore() { return matchScore; }
    public void setMatchScore(Integer matchScore) { this.matchScore = matchScore; }
}

