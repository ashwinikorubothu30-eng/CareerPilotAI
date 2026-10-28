package com.careerpilot.service;

import com.careerpilot.dto.InterviewDtos;
import com.careerpilot.model.InterviewRecord;
import com.careerpilot.model.InterviewSession;
import com.careerpilot.repository.InterviewRecordRepository;
import com.careerpilot.repository.InterviewSessionRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class InterviewAiService {

    private final InterviewSessionRepository sessionRepository;
    private final InterviewRecordRepository recordRepository;

    private static final Map<String, List<InterviewDtos.QuestionDto>> QUESTION_BANK = new HashMap<>();

    static {
        // Java & Spring Questions
        QUESTION_BANK.put("Full Stack Java & React", List.of(
                new InterviewDtos.QuestionDto(
                        "q1", "Full Stack Java & React", "Technical",
                        "How does the Spring Bean lifecycle work from instantiation to destruction, and what are common lifecycle hooks?",
                        "Think about BeanDefinition, instantiation, Populating properties, BeanPostProcessor, @PostConstruct, and @PreDestroy.",
                        List.of("Bean instantiation", "Dependency Injection", "BeanPostProcessor", "@PostConstruct", "DisposableBean / @PreDestroy")
                ),
                new InterviewDtos.QuestionDto(
                        "q2", "Full Stack Java & React", "Technical",
                        "Explain the difference between useEffect, useMemo, and useCallback in React, and when you should avoid premature optimization.",
                        "Consider re-renders, referential equality for function/object props, and memoization overhead.",
                        List.of("Side effects timing", "Memoized return value vs memoized callback", "Referential equality", "Overhead considerations")
                ),
                new InterviewDtos.QuestionDto(
                        "q3", "Full Stack Java & React", "System Design",
                        "How would you design a rate limiter in a Spring Boot microservice to protect backend endpoints from DDoS or API abuse?",
                        "Mention Token Bucket / Leaky Bucket algorithms, Redis for distributed state, and Spring Cloud Gateway / Filter layers.",
                        List.of("Token bucket or Leaky bucket", "Redis distributed store", "HTTP 429 Too Many Requests response", "Filter/Interceptor implementation")
                ),
                new InterviewDtos.QuestionDto(
                        "q4", "Full Stack Java & React", "Behavioral",
                        "Tell me about a time you had a critical bug in production. How did you triage, resolve it, and prevent recurrence?",
                        "Use the STAR method: Situation, Task, Action (root cause analysis, rollback/fix), and Result (monitoring, post-mortem, tests).",
                        List.of("STAR structure", "Calm triage & communication", "Root cause analysis (RCA)", "Post-mortem & prevention")
                ),
                new InterviewDtos.QuestionDto(
                        "q5", "Full Stack Java & React", "Technical",
                        "What is the N+1 problem in Hibernate / Spring Data JPA and what are the best ways to eliminate it?",
                        "Discuss lazy loading in loops, JOIN FETCH, EntityGraph, and batch fetching (@BatchSize).",
                        List.of("Explanation of 1 initial query + N sub-queries", "JOIN FETCH in JPQL", "@EntityGraph annotation", "Batch fetching")
                )
        ));

        // Frontend Questions
        QUESTION_BANK.put("Frontend Developer", List.of(
                new InterviewDtos.QuestionDto(
                        "fe1", "Frontend Developer", "Technical",
                        "How does React 18/19 Concurrent Mode and automatic batching work under the hood?",
                        "Mention Fiber architecture, lanes/priority scheduling, startTransition, and microtasks.",
                        List.of("Fiber architecture", "Priority levels", "startTransition", "Automatic state batching")
                ),
                new InterviewDtos.QuestionDto(
                        "fe2", "Frontend Developer", "Technical",
                        "What are Core Web Vitals (LCP, INP, CLS) and how would you optimize each for a sluggish web application?",
                        "Address Largest Contentful Paint, Interaction to Next Paint, Cumulative Layout Shift, image optimization, and bundle splitting.",
                        List.of("LCP causes & fixes", "INP / main thread blocking", "CLS layout shifts", "Code splitting & lazy loading")
                ),
                new InterviewDtos.QuestionDto(
                        "fe3", "Frontend Developer", "Behavioral",
                        "Describe a situation where you had a strong disagreement with a UI/UX designer regarding feature feasibility. How was it resolved?",
                        "Focus on collaboration, presenting data/trade-offs, prototyping alternatives, and user-centric outcomes.",
                        List.of("Constructive communication", "Trade-off analysis", "Prototyping alternatives", "User empathy")
                )
        ));

        // DevOps & Cloud Questions
        QUESTION_BANK.put("Cloud & DevOps", List.of(
                new InterviewDtos.QuestionDto(
                        "do1", "Cloud & DevOps", "Technical",
                        "Explain the difference between a Kubernetes Deployment, StatefulSet, and DaemonSet, with realistic use cases for each.",
                        "Think stateless microservices, ordered storage requirements like Kafka/Postgres, and node-level logging agents like Fluentd.",
                        List.of("Deployment: stateless pods & rolling updates", "StatefulSet: sticky identities & PVCs", "DaemonSet: one pod per node (logging/monitoring)")
                ),
                new InterviewDtos.QuestionDto(
                        "do2", "Cloud & DevOps", "Technical",
                        "How do you implement a Zero-Downtime Blue/Green or Canary deployment pipeline using Kubernetes and a service mesh or ingress?",
                        "Explain traffic splitting, automated canary analysis, health probes, and automated rollbacks on error spikes.",
                        List.of("Traffic routing & ingress weights", "Readiness/Liveness probes", "Automated rollback criteria", "Database migration backward compatibility")
                )
        ));
    }

    public InterviewAiService(InterviewSessionRepository sessionRepository, InterviewRecordRepository recordRepository) {
        this.sessionRepository = sessionRepository;
        this.recordRepository = recordRepository;
    }

    public List<InterviewDtos.QuestionDto> getQuestions(InterviewDtos.StartRequest request) {
        String role = request.getTargetRole() != null ? request.getTargetRole() : "Full Stack Java & React";
        List<InterviewDtos.QuestionDto> pool = QUESTION_BANK.getOrDefault(role, QUESTION_BANK.get("Full Stack Java & React"));
        
        int count = (request.getQuestionCount() != null && request.getQuestionCount() > 0) ? request.getQuestionCount() : 5;
        List<InterviewDtos.QuestionDto> selected = new ArrayList<>(pool);
        Collections.shuffle(selected);
        return selected.subList(0, Math.min(count, selected.size()));
    }

    public InterviewDtos.EvaluateResponse evaluateAnswer(InterviewDtos.EvaluateRequest request) {
        String answer = request.getUserAnswer() != null ? request.getUserAnswer().trim() : "";
        String answerLower = answer.toLowerCase();

        InterviewDtos.EvaluateResponse response = new InterviewDtos.EvaluateResponse();

        if (answer.length() < 25) {
            response.setScore(32);
            response.setGrade("Needs Improvement");
            response.setFeedback("Your answer is too brief for an engineering interview. Interviewers look for structured explanations, technical depth, and practical examples.");
            response.setStrengths(List.of("Addressed the question prompt directly."));
            response.setMissingAspects(List.of("Provide architectural reasoning", "Give a concrete code/production example", "Address edge cases and performance trade-offs"));
            response.setSampleAnswer(generateIdealSample(request.getQuestion()));
            response.setStarMethodFeedback("Ensure you elaborate: establish context, explain the technical mechanics, and outline the impact.");
            return response;
        }

        // Scoring algorithm evaluating word count, technical vocabulary, structure, and depth
        int wordCount = answer.split("\\s+").length;
        int lengthScore = Math.min(40, (wordCount / 3));

        int techTermCount = 0;
        List<String> keyTerms = List.of(
                "lifecycle", "bean", "injection", "component", "performance", "cache", "redis",
                "database", "latency", "async", "thread", "concurrency", "test", "mock", "scale",
                "transaction", "rollback", "deploy", "pipeline", "docker", "query", "index"
        );
        for (String term : keyTerms) {
            if (answerLower.contains(term)) techTermCount++;
        }
        int termScore = Math.min(35, techTermCount * 7);

        int structureScore = (answer.contains(".") || answer.contains("\n")) ? 20 : 10;
        if (answerLower.contains("for example") || answerLower.contains("in our project") || answerLower.contains("specifically")) {
            structureScore += 5;
        }

        int totalScore = Math.min(96, Math.max(45, lengthScore + termScore + structureScore));

        response.setScore(totalScore);

        if (totalScore >= 85) {
            response.setGrade("Excellent (Hire Recommendation)");
            response.setFeedback("Impressive technical depth! You explained the core concepts accurately, provided clear rationale, and exhibited senior engineering communication.");
        } else if (totalScore >= 70) {
            response.setGrade("Good (Strong Candidate)");
            response.setFeedback("Solid understanding demonstrated. You covered the main concepts well. Adding specific architectural tradeoffs or production numbers will elevate it to staff level.");
        } else {
            response.setGrade("Fair (Average Candidate)");
            response.setFeedback("Acceptable baseline understanding, but lacks depth in edge cases, internal mechanics, or quantifiable project outcomes.");
        }

        List<String> strengths = new ArrayList<>();
        strengths.add("Directly addresses the primary question requirements.");
        if (techTermCount >= 3) strengths.add("Effectively leveraged standard industry terminology.");
        if (wordCount > 60) strengths.add("Comprehensive explanation with good narrative pacing.");
        response.setStrengths(strengths);

        List<String> missing = new ArrayList<>();
        if (!answerLower.contains("trade-off") && !answerLower.contains("however")) {
            missing.add("Explicitly mention architectural trade-offs or when NOT to use this approach.");
        }
        if (!answerLower.contains("example") && !answerLower.contains("project")) {
            missing.add("Anchor your answer with a concrete project story or metric (e.g. 'In our microservices architecture...').");
        }
        if (missing.isEmpty()) missing.add("Consider proactively discussing testing strategies for this component.");
        response.setMissingAspects(missing);

        response.setSampleAnswer(generateIdealSample(request.getQuestion()));
        response.setStarMethodFeedback("Strong technical articulation. To make it unforgettable, frame outcomes using: 'We chose X over Y because of Z, resulting in 40% less overhead.'");

        // Save record if sessionId provided
        if (request.getSessionId() != null) {
            InterviewRecord rec = new InterviewRecord(
                    request.getSessionId(),
                    request.getQuestion(),
                    answer,
                    response.getFeedback(),
                    totalScore,
                    response.getSampleAnswer()
            );
            recordRepository.save(rec);
        }

        return response;
    }

    private String generateIdealSample(String question) {
        if (question == null) return "Provide a clear definition, walk through the underlying mechanics, discuss real-world trade-offs, and cite a practical production scenario.";
        if (question.toLowerCase().contains("spring bean")) {
            return "In Spring, the Bean Lifecycle proceeds through: 1) Loading BeanDefinition, 2) Instantiation via reflection, 3) Populating properties/dependencies, 4) BeanNameAware / BeanFactoryAware callbacks, 5) BeanPostProcessor postProcessBeforeInitialization, 6) @PostConstruct or InitializingBean.afterPropertiesSet(), 7) BeanPostProcessor postProcessAfterInitialization (where AOP proxies are created), and finally when container shuts down: @PreDestroy or DisposableBean.destroy(). In our microservices, we leverage @PostConstruct for pre-warming caches and @PreDestroy to cleanly flush Kafka message buffers.";
        }
        if (question.toLowerCase().contains("useeffect") || question.toLowerCase().contains("usecallback")) {
            return "useEffect handles asynchronous side-effects (API fetching, subscriptions) after DOM paint. useCallback memoizes function instances across re-renders to prevent unnecessary child re-renders when passing functions as props to React.memo components. useMemo caches expensive computation results. We avoid wrapping every function in useCallback blindly because memoization itself carries memory and dependency array comparison overhead; we reserve it for computationally heavy operations or dependency stability.";
        }
        if (question.toLowerCase().contains("n+1")) {
            return "The N+1 problem occurs when an ORM issues 1 query to fetch parent records, and then issues N subsequent queries in a loop to fetch each parent's associated children due to Lazy Loading. We solve this by: 1) Using 'JOIN FETCH' in JPQL queries, 2) Applying JPA 2.1 @EntityGraph to eagerly fetch attributes dynamically per query, or 3) Configuring @BatchSize(size = 25) so Hibernate fetches child entities in batches via an 'IN' clause rather than individually.";
        }
        return "A top-tier answer starts with a crisp 1-sentence definition, details the internal architecture (data structures / protocol / lifecycles), discusses real-world edge cases and performance trade-offs, and concludes with a concise example from your past work.";
    }
}

