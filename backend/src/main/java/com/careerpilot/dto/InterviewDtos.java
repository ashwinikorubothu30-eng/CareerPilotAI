package com.careerpilot.dto;

import java.util.List;

public class InterviewDtos {

    public static class StartRequest {
        private String targetRole;
        private String difficulty; // Junior, Mid, Senior
        private Integer questionCount;

        public StartRequest() {}

        public String getTargetRole() { return targetRole; }
        public void setTargetRole(String targetRole) { this.targetRole = targetRole; }

        public String getDifficulty() { return difficulty; }
        public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

        public Integer getQuestionCount() { return questionCount; }
        public void setQuestionCount(Integer questionCount) { this.questionCount = questionCount; }
    }

    public static class QuestionDto {
        private String id;
        private String targetRole;
        private String category; // Technical, System Design, Behavioral, Problem Solving
        private String question;
        private String hint;
        private List<String> keyEvaluationPoints;

        public QuestionDto() {}

        public QuestionDto(String id, String targetRole, String category, String question, String hint, List<String> keyEvaluationPoints) {
            this.id = id;
            this.targetRole = targetRole;
            this.category = category;
            this.question = question;
            this.hint = hint;
            this.keyEvaluationPoints = keyEvaluationPoints;
        }

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getTargetRole() { return targetRole; }
        public void setTargetRole(String targetRole) { this.targetRole = targetRole; }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public String getQuestion() { return question; }
        public void setQuestion(String question) { this.question = question; }

        public String getHint() { return hint; }
        public void setHint(String hint) { this.hint = hint; }

        public List<String> getKeyEvaluationPoints() { return keyEvaluationPoints; }
        public void setKeyEvaluationPoints(List<String> keyEvaluationPoints) { this.keyEvaluationPoints = keyEvaluationPoints; }
    }

    public static class EvaluateRequest {
        private Long sessionId;
        private String questionId;
        private String question;
        private String userAnswer;
        private String targetRole;
        private String difficulty;

        public EvaluateRequest() {}

        public Long getSessionId() { return sessionId; }
        public void setSessionId(Long sessionId) { this.sessionId = sessionId; }

        public String getQuestionId() { return questionId; }
        public void setQuestionId(String questionId) { this.questionId = questionId; }

        public String getQuestion() { return question; }
        public void setQuestion(String question) { this.question = question; }

        public String getUserAnswer() { return userAnswer; }
        public void setUserAnswer(String userAnswer) { this.userAnswer = userAnswer; }

        public String getTargetRole() { return targetRole; }
        public void setTargetRole(String targetRole) { this.targetRole = targetRole; }

        public String getDifficulty() { return difficulty; }
        public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    }

    public static class EvaluateResponse {
        private int score; // 0 to 100
        private String grade; // Excellent, Good, Average, Needs Improvement
        private String feedback;
        private List<String> strengths;
        private List<String> missingAspects;
        private String sampleAnswer;
        private String starMethodFeedback;

        public EvaluateResponse() {}

        public int getScore() { return score; }
        public void setScore(int score) { this.score = score; }

        public String getGrade() { return grade; }
        public void setGrade(String grade) { this.grade = grade; }

        public String getFeedback() { return feedback; }
        public void setFeedback(String feedback) { this.feedback = feedback; }

        public List<String> getStrengths() { return strengths; }
        public void setStrengths(List<String> strengths) { this.strengths = strengths; }

        public List<String> getMissingAspects() { return missingAspects; }
        public void setMissingAspects(List<String> missingAspects) { this.missingAspects = missingAspects; }

        public String getSampleAnswer() { return sampleAnswer; }
        public void setSampleAnswer(String sampleAnswer) { this.sampleAnswer = sampleAnswer; }

        public String getStarMethodFeedback() { return starMethodFeedback; }
        public void setStarMethodFeedback(String starMethodFeedback) { this.starMethodFeedback = starMethodFeedback; }
    }
}
