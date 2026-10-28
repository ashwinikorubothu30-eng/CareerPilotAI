package com.careerpilot.service;

import com.careerpilot.dto.RoadmapDtos;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoadmapAiService {

    public List<String> getAvailableRoles() {
        return List.of(
                "Full Stack Java & React Engineer",
                "Cloud & DevOps Architect",
                "Backend & Distributed Systems Engineer",
                "AI / Machine Learning Engineer",
                "Frontend & UI/UX Specialist"
        );
    }

    public RoadmapDtos.Response generateRoadmap(RoadmapDtos.Request request) {
        String role = (request.getTargetRole() != null && !request.getTargetRole().isBlank()) 
                ? request.getTargetRole() : "Full Stack Java & React Engineer";
        String level = (request.getCurrentLevel() != null && !request.getCurrentLevel().isBlank())
                ? request.getCurrentLevel() : "Beginner";
        int targetWeeks = (request.getTargetTimelineWeeks() != null && request.getTargetTimelineWeeks() > 0)
                ? request.getTargetTimelineWeeks() : 16;

        RoadmapDtos.Response response = new RoadmapDtos.Response();
        response.setRoleTitle(role);
        response.setTargetLevel(level);
        response.setTotalEstimatedWeeks(targetWeeks);

        if (role.toLowerCase().contains("cloud") || role.toLowerCase().contains("devops")) {
            populateDevOpsRoadmap(response);
        } else if (role.toLowerCase().contains("ai") || role.toLowerCase().contains("machine learning") || role.toLowerCase().contains("data")) {
            populateAiRoadmap(response);
        } else if (role.toLowerCase().contains("frontend")) {
            populateFrontendRoadmap(response);
        } else {
            populateFullStackRoadmap(response);
        }

        return response;
    }

    private void populateFullStackRoadmap(RoadmapDtos.Response res) {
        res.setCareerOverview("Full Stack Java & React engineers bridge user-facing interfaces with robust high-performance enterprise backends. Highly sought after across fintech, SaaS, and tier-1 tech.");
        res.setExpectedMarketSalary(115000.0);
        res.setEssentialTools(List.of("Java 21", "Spring Boot", "React 19", "Vite", "PostgreSQL", "Docker", "Git", "Postman", "JUnit / Mockito"));

        List<RoadmapDtos.Phase> phases = new ArrayList<>();

        // Phase 1
        phases.add(new RoadmapDtos.Phase(
                "Phase 1",
                "Core Programming & Modern Web Foundations",
                "Weeks 1 - 4",
                "Master modern Java object-oriented principles, JVM memory model, and React core component lifecycles.",
                List.of(
                        new RoadmapDtos.Milestone(
                                "m1",
                                "Java 21 Deep Dive & Data Structures",
                                "Generics, Collections Framework, Streams API, Concurrency, and Lambdas.",
                                List.of("Java 21", "Collections", "Streams API", "Multithreading"),
                                List.of("Bank Account Transaction Simulator with Thread Safety"),
                                List.of("Oracle Java Tutorials", "Effective Java by Joshua Bloch")
                        ),
                        new RoadmapDtos.Milestone(
                                "m2",
                                "Modern React & Responsive UI",
                                "JSX, state management (Hooks: useState, useEffect, useMemo), Tailwind CSS.",
                                List.of("React 19", "Tailwind CSS", "Vite", "Component Architecture"),
                                List.of("Interactive Analytics Dashboard with dark/light themes"),
                                List.of("React.dev official docs", "Tailwind UI Components")
                        )
                )
        ));

        // Phase 2
        phases.add(new RoadmapDtos.Phase(
                "Phase 2",
                "Backend Architecture with Spring Boot & Persistence",
                "Weeks 5 - 8",
                "Build scalable REST APIs, database schemas, and transactions with Spring Data JPA and Hibernate.",
                List.of(
                        new RoadmapDtos.Milestone(
                                "m3",
                                "RESTful Services & Spring Web",
                                "Controller layers, DTO validation, Custom Exception Handling, and Swagger/OpenAPI docs.",
                                List.of("Spring Boot 3/4", "Spring WebMVC", "Validation", "OpenAPI"),
                                List.of("E-Commerce Product & Order API with full CRUD and validation"),
                                List.of("Baeldung Spring Boot guides", "Spring.io Guides")
                        ),
                        new RoadmapDtos.Milestone(
                                "m4",
                                "Database Persistence & JPA Optimization",
                                "Relational modeling, Indexing, N+1 query problem, Caching with Redis.",
                                List.of("Spring Data JPA", "Hibernate", "PostgreSQL / MySQL", "Redis"),
                                List.of("Inventory Management schema with indexing and cache layer"),
                                List.of("Vlad Mihalcea High-Performance Java Persistence")
                        )
                )
        ));

        // Phase 3
        phases.add(new RoadmapDtos.Phase(
                "Phase 3",
                "Microservices, Security & Cloud Deployment",
                "Weeks 9 - 13",
                "Secure applications with JWT / OAuth2, containerize using Docker, and setup CI/CD pipelines.",
                List.of(
                        new RoadmapDtos.Milestone(
                                "m5",
                                "Authentication & Enterprise Security",
                                "Spring Security 6, JWT stateless auth, role-based access control (RBAC).",
                                List.of("Spring Security", "JWT", "OAuth2", "Password Hashing"),
                                List.of("Multi-tenant Role Auth gateway with Refresh Tokens"),
                                List.of("Spring Security Reference Documentation")
                        ),
                        new RoadmapDtos.Milestone(
                                "m6",
                                "Dockerization & CI/CD Pipelines",
                                "Multi-stage Dockerfiles, Docker Compose, GitHub Actions automated test & deploy.",
                                List.of("Docker", "Docker Compose", "GitHub Actions", "AWS EC2/S3"),
                                List.of("Deploy full-stack React + Spring Boot app on AWS with automated GitHub Actions"),
                                List.of("Docker Deep Dive", "GitHub Actions Documentation")
                        )
                )
        ));

        // Phase 4
        phases.add(new RoadmapDtos.Phase(
                "Phase 4",
                "System Design & Interview Capstone",
                "Weeks 14 - 16",
                "High-level system design (load balancing, messaging with Kafka), portfolio polish, and behavioral readiness.",
                List.of(
                        new RoadmapDtos.Milestone(
                                "m7",
                                "System Design & Distributed Patterns",
                                "Horizontal scaling, Rate limiting, Message queues (Apache Kafka / RabbitMQ).",
                                List.of("System Design", "Kafka", "Caching", "Load Balancing"),
                                List.of("Event-driven Notification Service using Apache Kafka"),
                                List.of("System Design Primer by Donne Martin")
                        ),
                        new RoadmapDtos.Milestone(
                                "m8",
                                "Portfolio Polish & Tech Mock Interviews",
                                "Live deployment, ATS-optimized resume, STAR interview preparation.",
                                List.of("Portfolio", "ATS Resume", "STAR Method", "Behavioral Prep"),
                                List.of("CareerPilotAI Capstone Deployment"),
                                List.of("Cracking the Coding Interview", "Tech Interview Handbook")
                        )
                )
        ));

        res.setPhases(phases);
    }

    private void populateDevOpsRoadmap(RoadmapDtos.Response res) {
        res.setCareerOverview("Cloud & DevOps Engineers automate infrastructure, streamline software releases, and ensure 99.99% system reliability across cloud platforms.");
        res.setExpectedMarketSalary(125000.0);
        res.setEssentialTools(List.of("AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Prometheus", "Grafana", "Linux"));

        List<RoadmapDtos.Phase> phases = List.of(
                new RoadmapDtos.Phase("Phase 1", "Linux, Networking & Containers", "Weeks 1 - 4", "Deep dive into Linux administration, shell scripting, and containerization.", List.of(
                        new RoadmapDtos.Milestone("m1", "Linux Mastery & Bash Automation", "System internals, processes, network sockets, automated backup scripts.", List.of("Linux", "Bash", "SSH", "TCP/IP"), List.of("Automated server health monitor script"), List.of("Linux Journey", "OverTheWire Bandit")),
                        new RoadmapDtos.Milestone("m2", "Docker & Container Architecture", "Images, layers, volumes, multi-stage builds, rootless containers.", List.of("Docker", "Containerd", "Networking"), List.of("Microservices stack running via Docker Compose"), List.of("Docker Docs"))
                )),
                new RoadmapDtos.Phase("Phase 2", "Kubernetes Orchestration & Helm", "Weeks 5 - 9", "Deploy, scale, and manage self-healing container clusters.", List.of(
                        new RoadmapDtos.Milestone("m3", "Kubernetes Core Concepts", "Pods, Deployments, Services, Ingress, ConfigMaps, and Secrets.", List.of("Kubernetes", "kubectl", "Ingress"), List.of("Multi-tier web application deployed on Minikube / K3s"), List.of("Kubernetes The Hard Way", "CKA Prep"))
                )),
                new RoadmapDtos.Phase("Phase 3", "Infrastructure as Code & CI/CD", "Weeks 10 - 13", "Define cloud infrastructure predictably and build release pipelines.", List.of(
                        new RoadmapDtos.Milestone("m4", "Terraform & AWS Cloud", "VPCs, EC2, EKS, RDS provisioned via declarative HCL modules.", List.of("Terraform", "AWS", "IaC"), List.of("Production-ready AWS VPC with private subnets and EKS cluster"), List.of("HashiCorp Learn")),
                        new RoadmapDtos.Milestone("m5", "CI/CD & GitOps with ArgoCD", "Automated deployment upon git push with rollback safety.", List.of("GitHub Actions", "ArgoCD", "GitOps"), List.of("GitOps pipeline deploying changes directly to K8s"), List.of("ArgoCD Docs"))
                )),
                new RoadmapDtos.Phase("Phase 4", "Observability & SRE Practices", "Weeks 14 - 16", "Monitor metrics, logs, traces, and alert on incidents.", List.of(
                        new RoadmapDtos.Milestone("m6", "Monitoring with Prometheus & Grafana", "SLIs/SLOs, alerting rules, distributed tracing with OpenTelemetry.", List.of("Prometheus", "Grafana", "OpenTelemetry"), List.of("Comprehensive metrics dashboard for distributed microservices"), List.of("Google SRE Book"))
                ))
        );
        res.setPhases(phases);
    }

    private void populateAiRoadmap(RoadmapDtos.Response res) {
        res.setCareerOverview("AI & Machine Learning Engineers build intelligent models, leverage LLMs, and operationalize predictive analytics for enterprise problems.");
        res.setExpectedMarketSalary(130000.0);
        res.setEssentialTools(List.of("Python", "PyTorch", "Hugging Face", "LangChain", "FastAPI", "Vector DBs (Chroma/Pinecone)", "Docker"));

        List<RoadmapDtos.Phase> phases = List.of(
                new RoadmapDtos.Phase("Phase 1", "Python & Data Foundations", "Weeks 1 - 4", "Master numerical computing and data exploration.", List.of(
                        new RoadmapDtos.Milestone("m1", "Advanced Python & Math for ML", "Linear algebra, calculus, NumPy vectorized operations, Pandas data manipulation.", List.of("Python", "NumPy", "Pandas"), List.of("Exploratory Data Analysis on real-world salary dataset"), List.of("3Blue1Brown Linear Algebra", "Python for Data Analysis"))
                )),
                new RoadmapDtos.Phase("Phase 2", "Machine Learning & Deep Learning", "Weeks 5 - 9", "Supervised/unsupervised algorithms and neural networks.", List.of(
                        new RoadmapDtos.Milestone("m2", "Scikit-Learn & PyTorch", "Regression, Classification, Tree ensembles (XGBoost), Neural network training loop in PyTorch.", List.of("Scikit-Learn", "PyTorch", "XGBoost"), List.of("Customer churn predictor with 92% AUC-ROC"), List.of("Deep Learning with PyTorch", "Fast.ai"))
                )),
                new RoadmapDtos.Phase("Phase 3", "Generative AI & LLM Engineering", "Weeks 10 - 13", "Build Retrieval-Augmented Generation (RAG) and fine-tune models.", List.of(
                        new RoadmapDtos.Milestone("m3", "RAG Systems & Embeddings", "Vector databases, chunking strategies, prompt engineering, agentic workflows with LangChain/LlamaIndex.", List.of("LangChain", "Vector DB", "RAG", "LLMs"), List.of("Enterprise PDF Chatbot with citation verification"), List.of("DeepLearning.AI Short Courses"))
                )),
                new RoadmapDtos.Phase("Phase 4", "MLOps & Model Deployment", "Weeks 14 - 16", "Deploy models via FastAPI and monitor model drift in production.", List.of(
                        new RoadmapDtos.Milestone("m4", "FastAPI, MLflow & Cloud Serving", "Model quantization, ONNX runtime, containerization, and monitoring.", List.of("FastAPI", "MLflow", "Docker", "AWS SageMaker"), List.of("Production-grade ML inference API with latency < 50ms"), List.of("Made With ML by Goku Mohandas"))
                ))
        );
        res.setPhases(phases);
    }

    private void populateFrontendRoadmap(RoadmapDtos.Response res) {
        res.setCareerOverview("Frontend Specialists craft performant, accessible, and delightful interactive web experiences using modern React, TypeScript, and state management.");
        res.setExpectedMarketSalary(110000.0);
        res.setEssentialTools(List.of("React 19", "TypeScript", "Tailwind CSS", "Next.js", "Zustand", "Playwright", "Figma"));

        List<RoadmapDtos.Phase> phases = List.of(
                new RoadmapDtos.Phase("Phase 1", "TypeScript & Advanced React", "Weeks 1 - 4", "Master type systems, component design patterns, and render optimizations.", List.of(
                        new RoadmapDtos.Milestone("m1", "Strict TypeScript & Custom Hooks", "Generics, Discriminated unions, composition patterns, performance profiling.", List.of("TypeScript", "React 19", "Custom Hooks"), List.of("Accessible Design System with 15+ reusable UI components"), List.of("Total TypeScript", "Epic React"))
                )),
                new RoadmapDtos.Phase("Phase 2", "State Management & Next.js SSR", "Weeks 5 - 9", "Client vs Server components, caching, SEO optimization, and global state.", List.of(
                        new RoadmapDtos.Milestone("m2", "Next.js App Router & Server Actions", "Server-side rendering, streaming, incremental static regeneration (ISR).", List.of("Next.js", "Server Components", "Zustand"), List.of("High-speed E-commerce store with dynamic filtering and cart state"), List.of("Next.js Official Documentation"))
                )),
                new RoadmapDtos.Phase("Phase 3", "Testing, Animation & Web Performance", "Weeks 10 - 13", "Framer Motion, Core Web Vitals, and end-to-end test suites.", List.of(
                        new RoadmapDtos.Milestone("m3", "Playwright & Core Web Vitals", "Lighthouse 100/100, bundle size analysis, e2e testing with Playwright.", List.of("Playwright", "Web Vitals", "Framer Motion"), List.of("Interactive interactive kanban board with fluid animations and 98+ Lighthouse score"), List.of("web.dev Performance Guides"))
                )),
                new RoadmapDtos.Phase("Phase 4", "System Architecture & Interview Readiness", "Weeks 14 - 16", "Frontend system design (virtualization, offline-first, microfrontends).", List.of(
                        new RoadmapDtos.Milestone("m4", "Frontend System Design", "Design Twitter/Netflix frontend architecture, tree-shaking, caching strategies.", List.of("Frontend System Design", "Microfrontends", "Service Workers"), List.of("Full portfolio deployment with custom domain and case studies"), List.of("GreatFrontEnd System Design"))
                ))
        );
        res.setPhases(phases);
    }
}

