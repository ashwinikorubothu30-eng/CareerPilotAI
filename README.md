# 🧭 CareerPilotAI — Intelligent Career Guidance & Interview Copilot

An enterprise-grade full-stack platform built with **Spring Boot (Java 21)** and **React 19 (Vite + Tailwind CSS)** to guide developers from career discovery to technical interview success.

---

## 🚀 Key Modules & Capabilities

1. **AI Resume Optimizer & ATS Scanner**
   - Evaluates resume text against Applicant Tracking System (ATS) parsing rules.
   - Computes weighted score breakdown: *Keyword Density, Quantifiable Metrics, Section Structure, and Action Verbs*.
   - Highlights matching verified competencies (green) vs. missing critical keywords (rose).
   - Interactive **Live Bullet Enhancer** transforming passive statements into Google XYZ achievement bullets (`Accomplished [X] measured by [Y] doing [Z]`).

2. **AI Career Roadmaps & Milestone Navigator**
   - Role tracks: *Full Stack Java & React Engineer, Cloud & DevOps Architect, Backend & Distributed Systems, AI / Machine Learning, Frontend Specialist*.
   - Dynamic timeline adjustment (8 to 32 weeks) and experience levels (Junior, Mid, Senior).
   - Structured phases with hands-on milestone projects, key skills, and authoritative reference guides.
   - Milestone completion checklist with live progress tracking.

3. **AI Mock Technical Interview Simulator**
   - Question bank for technical, system design, and behavioral STAR interviews across Junior, Mid, and Senior difficulty levels.
   - Architectural hint assistance.
   - Real-time AI evaluation engine scoring depth, technical vocabulary, structure, and trade-off analysis.
   - Senior model answers and actionable STAR coaching.

4. **Job Match & Skill Gap Engine**
   - Pre-seeded market listings with salary ranges, locations, and experience tiers.
   - Calculates candidate match percentages against active job requirements.
   - Provides tailored strategic recommendations to close skill gaps before interviewing.

---

## 🛠️ Technology Stack

- **Backend**:
  - Java 21 LTS (Eclipse Adoptium)
  - Spring Boot 4.1.2 (Spring WebMVC, Spring Data JPA, Hibernate, Validation)
  - H2 in-memory database with `/h2-console` enabled (zero external setup required)
  - Configurable for MySQL with 1 line toggle in `application.properties`
  - Maven 3.10.0 Wrapper (`mvnw.cmd`)
- **Frontend**:
  - React 19 + Vite 8
  - Tailwind CSS + Lucide-style inline SVGs
  - Modern Glassmorphism dark UI
  - Reverse proxy config for seamless API routing to `:8080`

---

## 🏃 Quick Start Guide

### 1. Launch Spring Boot Backend (`http://localhost:8080`)
Run from PowerShell or Command Prompt:
```powershell
.\run-backend.cmd
```
*Or directly via Maven wrapper:*
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```
- API Base: `http://localhost:8080/api`
- H2 Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:careerpilotdb`, User: `sa`, Password: *empty*)

### 2. Launch Vite React Frontend (`http://localhost:5173`)
Open another terminal:
```powershell
.\run-frontend.cmd
```
*Or directly:*
```powershell
cd frontend
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 📂 Project Structure

```
CareerPilotAI/
├── backend/
│   ├── .mvn/wrapper/
│   ├── mvnw.cmd
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/careerpilot/
│       │   ├── CareerPilotApplication.java
│       │   ├── config/CorsConfig.java
│       │   ├── controller/ (Resume, Roadmap, Interview, JobMatch, Profile)
│       │   ├── dto/ (Analysis, Improvement, Roadmap, Interview, Jobs)
│       │   ├── model/ (UserProfile, JobListing, InterviewSession, InterviewRecord)
│       │   ├── repository/ (UserProfile, JobListing, InterviewSession, InterviewRecord)
│       │   └── service/ (ResumeAiService, RoadmapAiService, InterviewAiService, JobMatchService)
│       └── resources/
│           └── application.properties
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── components/ (Dashboard, ResumeOptimizer, CareerRoadmap, MockInterview, JobBoard, Navbar, Sidebar, Icons)
│       └── services/api.js
├── run-backend.cmd
├── run-frontend.cmd
└── README.md
```
