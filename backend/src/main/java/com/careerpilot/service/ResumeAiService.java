package com.careerpilot.service;

import com.careerpilot.dto.BulletImproveDtos;
import com.careerpilot.dto.ResumeAnalysisRequest;
import com.careerpilot.dto.ResumeAnalysisResponse;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ResumeAiService {

    private static final Map<String, List<String>> ROLE_SKILLS = new HashMap<>();
    private static final List<String> POWER_VERBS = List.of(
            "spearheaded", "architected", "engineered", "orchestrated", "optimized",
            "developed", "deployed", "automated", "streamlined", "accelerated",
            "reduced", "increased", "designed", "implemented", "scaled", "delivered"
    );

    static {
        ROLE_SKILLS.put("Full Stack Engineer", List.of(
                "java", "spring boot", "react", "typescript", "javascript", "sql", "postgresql",
                "mysql", "docker", "kubernetes", "rest api", "microservices", "git", "ci/cd", "html", "css"
        ));
        ROLE_SKILLS.put("Frontend Developer", List.of(
                "react", "javascript", "typescript", "html5", "css3", "tailwind", "redux",
                "next.js", "vite", "webpack", "responsive design", "rest api", "git", "jest"
        ));
        ROLE_SKILLS.put("Backend Developer", List.of(
                "java", "spring boot", "python", "node.js", "sql", "mysql", "postgresql",
                "redis", "kafka", "rest api", "microservices", "docker", "aws", "git", "junit"
        ));
        ROLE_SKILLS.put("Cloud & DevOps Engineer", List.of(
                "aws", "docker", "kubernetes", "terraform", "ci/cd", "jenkins", "linux",
                "bash", "ansible", "prometheus", "grafana", "git", "python", "helm"
        ));
        ROLE_SKILLS.put("Data Scientist / AI Engineer", List.of(
                "python", "machine learning", "deep learning", "pytorch", "tensorflow",
                "pandas", "numpy", "scikit-learn", "sql", "data analysis", "llm", "langchain", "nlp"
        ));
    }

    public ResumeAnalysisResponse analyzeResume(ResumeAnalysisRequest request) {
        String text = request.getResumeText() != null ? request.getResumeText() : "";
        String textLower = text.toLowerCase();
        String targetRole = (request.getTargetRole() != null && !request.getTargetRole().isBlank()) 
                ? request.getTargetRole() : detectRole(textLower);

        List<String> targetExpectedSkills = ROLE_SKILLS.getOrDefault(targetRole, ROLE_SKILLS.get("Full Stack Engineer"));

        // Match skills
        List<String> matchedSkills = new ArrayList<>();
        List<String> missingSkills = new ArrayList<>();

        for (String skill : targetExpectedSkills) {
            if (textLower.contains(skill.toLowerCase())) {
                matchedSkills.add(skill);
            } else {
                missingSkills.add(skill);
            }
        }

        // Additional skills from description if provided
        if (request.getJobDescription() != null && !request.getJobDescription().isBlank()) {
            String descLower = request.getJobDescription().toLowerCase();
            for (String commonSkill : getAllKnownSkills()) {
                if (descLower.contains(commonSkill) && !targetExpectedSkills.contains(commonSkill)) {
                    if (textLower.contains(commonSkill)) {
                        if (!matchedSkills.contains(commonSkill)) matchedSkills.add(commonSkill);
                    } else {
                        if (!missingSkills.contains(commonSkill)) missingSkills.add(commonSkill);
                    }
                }
            }
        }

        // Action verbs analysis
        List<String> foundVerbs = new ArrayList<>();
        for (String verb : POWER_VERBS) {
            if (textLower.contains(verb)) {
                foundVerbs.add(verb);
            }
        }

        // Quantifiable metrics detection (numbers, percentages, $, etc.)
        Pattern metricPattern = Pattern.compile("(\\d+[%kKmM]?|\\$\\d+)");
        Matcher metricMatcher = metricPattern.matcher(text);
        int metricCount = 0;
        while (metricMatcher.find()) {
            metricCount++;
        }

        // Format and section checks
        List<String> formatIssues = new ArrayList<>();
        if (!textLower.contains("experience") && !textLower.contains("employment") && !textLower.contains("work")) {
            formatIssues.add("Missing clear 'Work Experience' header. ATS scanners look for standard section headings.");
        }
        if (!textLower.contains("skills") && !textLower.contains("technologies")) {
            formatIssues.add("Missing dedicated 'Technical Skills' section.");
        }
        if (!textLower.contains("education")) {
            formatIssues.add("Missing 'Education' or degree section.");
        }
        if (!textLower.contains("projects")) {
            formatIssues.add("Adding a 'Projects' section significantly strengthens candidate evaluation.");
        }
        if (text.length() < 300) {
            formatIssues.add("Resume length appears too brief. Elaborate on project impact and responsibilities.");
        }

        // Score Breakdown calculation
        int keywordScore = targetExpectedSkills.isEmpty() ? 70 : (int) Math.min(100, ((double) matchedSkills.size() / targetExpectedSkills.size()) * 100);
        int impactScore = Math.min(100, Math.max(30, (metricCount * 8) + (foundVerbs.size() * 5)));
        int sectionScore = Math.max(30, 100 - (formatIssues.size() * 15));
        int structureScore = Math.min(100, Math.max(40, text.split("\n").length * 3));

        int atsScore = (int) Math.round((keywordScore * 0.40) + (impactScore * 0.25) + (sectionScore * 0.20) + (structureScore * 0.15));
        atsScore = Math.max(35, Math.min(98, atsScore));

        ResumeAnalysisResponse response = new ResumeAnalysisResponse();
        response.setAtsScore(atsScore);
        response.setDetectedRole(targetRole);
        response.setMatchedSkills(matchedSkills);
        response.setMissingSkills(missingSkills);

        Map<String, Integer> breakdown = new HashMap<>();
        breakdown.put("Keyword Relevance", keywordScore);
        breakdown.put("Quantifiable Impact", impactScore);
        breakdown.put("Section & ATS Parsing", sectionScore);
        breakdown.put("Structure & Readability", structureScore);
        response.setScoreBreakdown(breakdown);

        if (atsScore >= 85) {
            response.setScoreSummary("Outstanding ATS compatibility! Your resume contains high keyword density, strong action verbs, and clear structure.");
        } else if (atsScore >= 70) {
            response.setScoreSummary("Good foundational resume, but incorporates opportunity for ATS ranking improvement with target skills and quantifiable metrics.");
        } else {
            response.setScoreSummary("Needs targeted optimization. Critical keywords and quantifiable metrics are missing, which could lead to ATS screening drops.");
        }

        // Verb suggestions
        List<String> verbSuggestions = new ArrayList<>();
        for (String verb : POWER_VERBS) {
            if (!foundVerbs.contains(verb)) {
                verbSuggestions.add(verb.substring(0, 1).toUpperCase() + verb.substring(1));
            }
            if (verbSuggestions.size() >= 6) break;
        }
        response.setActionVerbSuggestions(verbSuggestions);
        response.setFormatIssues(formatIssues);

        // Strengths & Improvements
        List<String> strengths = new ArrayList<>();
        if (!matchedSkills.isEmpty()) strengths.add("Strong alignment in foundational skills: " + String.join(", ", matchedSkills.subList(0, Math.min(4, matchedSkills.size()))));
        if (foundVerbs.size() >= 3) strengths.add("Utilizes strong action-oriented engineering language.");
        if (metricCount >= 3) strengths.add("Good evidence of quantifiable achievements and business outcomes.");
        if (strengths.isEmpty()) strengths.add("Clear formatting readable by standard parsers.");
        response.setCriticalStrengths(strengths);

        List<String> improvements = new ArrayList<>();
        if (!missingSkills.isEmpty()) {
            improvements.add("Integrate target keywords: " + String.join(", ", missingSkills.subList(0, Math.min(4, missingSkills.size()))));
        }
        if (metricCount < 3) {
            improvements.add("Adopt Google's XYZ formula: 'Accomplished [X] as measured by [Y] by doing [Z]'.");
        }
        if (foundVerbs.size() < 3) {
            improvements.add("Replace passive phrasing ('responsible for', 'worked on') with authoritative impact verbs.");
        }
        response.setKeyImprovements(improvements);

        // Bullet rewrites generator
        List<Map<String, String>> rewrites = new ArrayList<>();
        rewrites.add(Map.of(
                "original", "Worked on backend APIs using Spring Boot and handled database queries.",
                "improved", "Architected 12+ RESTful microservices with Spring Boot and optimized Hibernate queries, reducing API latency by 38%.",
                "impact", "Replaced passive phrasing with 'Architected' and quantified performance latency reduction."
        ));
        rewrites.add(Map.of(
                "original", "Helped team build the frontend in React and fixed bugs.",
                "improved", "Engineered responsive UI modules using React and Tailwind CSS, increasing user session engagement by 24% and resolving 40+ Jira defects.",
                "impact", "Quantified bug resolution and introduced business-oriented engagement metrics."
        ));
        response.setBulletRewrites(rewrites);

        return response;
    }

    public BulletImproveDtos.Response improveBullet(BulletImproveDtos.Request request) {
        String original = request.getOriginalBullet() != null ? request.getOriginalBullet().trim() : "";
        String role = request.getTargetRole() != null ? request.getTargetRole() : "Software Engineer";

        if (original.isEmpty()) {
            return new BulletImproveDtos.Response("", "Please provide a bullet point to enhance.", "XYZ Formula", "Engineered", "25%");
        }

        // Clean common weak beginnings
        String cleaned = original.replaceAll("(?i)^(responsible for|worked on|helped with|participated in|tasked with)\\s*", "");

        String verb = POWER_VERBS.get(new Random().nextInt(POWER_VERBS.size()));
        verb = verb.substring(0, 1).toUpperCase() + verb.substring(1);

        String improved = String.format("%s %s, improving processing efficiency by 35%% and scaling throughput to 50k+ daily requests.", verb, cleaned);

        return new BulletImproveDtos.Response(
                original,
                improved,
                "Accomplished [X] as measured by [Y], by doing [Z]",
                verb,
                "35% efficiency improvement & 50k+ daily requests"
        );
    }

    private String detectRole(String textLower) {
        if (textLower.contains("docker") && textLower.contains("kubernetes") && textLower.contains("ci/cd")) {
            return "Cloud & DevOps Engineer";
        }
        if (textLower.contains("machine learning") || textLower.contains("pytorch") || textLower.contains("pandas")) {
            return "Data Scientist / AI Engineer";
        }
        if (textLower.contains("react") && (textLower.contains("spring") || textLower.contains("node"))) {
            return "Full Stack Engineer";
        }
        if (textLower.contains("react") || textLower.contains("css") || textLower.contains("frontend")) {
            return "Frontend Developer";
        }
        return "Full Stack Engineer";
    }

    private Set<String> getAllKnownSkills() {
        Set<String> all = new HashSet<>();
        for (List<String> list : ROLE_SKILLS.values()) {
            all.addAll(list);
        }
        return all;
    }
}
