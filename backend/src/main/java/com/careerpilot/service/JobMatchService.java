package com.careerpilot.service;

import com.careerpilot.dto.JobMatchDtos;
import com.careerpilot.model.JobListing;
import com.careerpilot.repository.JobListingRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class JobMatchService {

    private final JobListingRepository jobRepository;

    public JobMatchService(JobListingRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @PostConstruct
    public void seedJobsIfEmpty() {
        if (jobRepository.count() == 0) {
            jobRepository.saveAll(List.of(
                    new JobListing(
                            "Senior Full Stack Engineer (Java / React)",
                            "CloudScale Technologies",
                            "San Francisco, CA (Remote)",
                            "Remote",
                            "$140,000 - $175,000",
                            "Senior",
                            "Build next-generation distributed SaaS platform using Spring Boot microservices, React 19, and AWS cloud infrastructure.",
                            "Java, Spring Boot, React, TypeScript, Docker, Kubernetes, PostgreSQL, REST API, AWS"
                    ),
                    new JobListing(
                            "Java Backend Engineer",
                            "FinTech Nexus",
                            "New York, NY (Hybrid)",
                            "Hybrid",
                            "$120,000 - $155,000",
                            "Mid",
                            "Design high-throughput banking payment pipelines, ledger reconciliation, and event-driven architectures with Apache Kafka.",
                            "Java, Spring Boot, Microservices, Apache Kafka, Redis, SQL, Docker, JUnit"
                    ),
                    new JobListing(
                            "Frontend Engineer (React / Next.js)",
                            "Veloce Digital",
                            "Austin, TX (Remote)",
                            "Remote",
                            "$110,000 - $140,000",
                            "Mid",
                            "Craft responsive user interfaces, dashboard analytics, and design systems with React, Tailwind CSS, and Next.js.",
                            "React, JavaScript, TypeScript, Tailwind CSS, Next.js, Redux, REST API, Git"
                    ),
                    new JobListing(
                            "Cloud & DevOps Platform Engineer",
                            "AeroCloud Systems",
                            "Seattle, WA (Remote)",
                            "Remote",
                            "$135,000 - $170,000",
                            "Senior",
                            "Manage automated Kubernetes infrastructure, CI/CD deployment pipelines, and observability with Prometheus & Grafana.",
                            "AWS, Docker, Kubernetes, Terraform, CI/CD, GitHub Actions, Linux, Python"
                    ),
                    new JobListing(
                            "Junior Software Developer",
                            "Apex Innovations",
                            "Chicago, IL (On-site)",
                            "Full-time",
                            "$80,000 - $98,000",
                            "Entry",
                            "Collaborate with senior mentors to develop RESTful web services, write unit tests, and support front-end features.",
                            "Java, Spring Boot, React, JavaScript, SQL, Git, HTML, CSS"
                    )
            ));
        }
    }

    public List<JobMatchDtos.MatchedJob> matchJobs(JobMatchDtos.MatchRequest request) {
        List<JobListing> allJobs = jobRepository.findAll();
        List<String> userSkills = request.getUserSkills() != null 
                ? request.getUserSkills().stream().map(String::trim).map(String::toLowerCase).collect(Collectors.toList())
                : new ArrayList<>();

        List<JobMatchDtos.MatchedJob> results = new ArrayList<>();

        for (JobListing job : allJobs) {
            JobMatchDtos.MatchedJob matched = new JobMatchDtos.MatchedJob();
            matched.setId(job.getId());
            matched.setTitle(job.getTitle());
            matched.setCompany(job.getCompany());
            matched.setLocation(job.getLocation());
            matched.setJobType(job.getJobType());
            matched.setSalaryRange(job.getSalaryRange());
            matched.setExperienceLevel(job.getExperienceLevel());
            matched.setDescription(job.getDescription());

            List<String> requiredSkills = Arrays.stream(job.getRequiredSkills().split(","))
                    .map(String::trim)
                    .collect(Collectors.toList());

            List<String> found = new ArrayList<>();
            List<String> missing = new ArrayList<>();

            for (String req : requiredSkills) {
                boolean hasSkill = userSkills.stream().anyMatch(us -> us.equalsIgnoreCase(req) || req.toLowerCase().contains(us) || us.contains(req.toLowerCase()));
                if (hasSkill) {
                    found.add(req);
                } else {
                    missing.add(req);
                }
            }

            int matchScore;
            if (requiredSkills.isEmpty()) {
                matchScore = 75;
            } else {
                matchScore = (int) Math.round(((double) found.size() / requiredSkills.size()) * 100);
            }

            // Role match bonus
            if (request.getTargetRole() != null && !request.getTargetRole().isBlank()) {
                if (job.getTitle().toLowerCase().contains(request.getTargetRole().toLowerCase())) {
                    matchScore = Math.min(100, matchScore + 10);
                }
            }

            matched.setMatchScore(matchScore);
            matched.setMatchedSkills(found);
            matched.setMissingSkills(missing);

            if (matchScore >= 80) {
                matched.setRecommendation("Top Match! You possess the key required tech stack. Strongly recommend applying right away.");
            } else if (matchScore >= 60) {
                matched.setRecommendation("Good Fit. Consider spending a weekend building a small project in " + (missing.isEmpty() ? "related tooling" : missing.get(0)) + " to close the gap.");
            } else {
                matched.setRecommendation("Potential stretch opportunity. Focus on mastering " + String.join(", ", missing.subList(0, Math.min(2, missing.size()))) + " before interviewing.");
            }

            results.add(matched);
        }

        results.sort((a, b) -> Integer.compare(b.getMatchScore(), a.getMatchScore()));
        return results;
    }

    public List<JobListing> getAllJobs() {
        return jobRepository.findAll();
    }
}
