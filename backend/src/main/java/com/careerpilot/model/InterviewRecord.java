package com.careerpilot.model;

import jakarta.persistence.*;

@Entity
@Table(name = "interview_records")
public class InterviewRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sessionId;
    private String question;
    
    @Column(length = 4000)
    private String userAnswer;

    @Column(length = 2000)
    private String feedback;

    private Integer score;

    @Column(length = 2000)
    private String idealAnswer;

    public InterviewRecord() {}

    public InterviewRecord(Long sessionId, String question, String userAnswer, String feedback, Integer score, String idealAnswer) {
        this.sessionId = sessionId;
        this.question = question;
        this.userAnswer = userAnswer;
        this.feedback = feedback;
        this.score = score;
        this.idealAnswer = idealAnswer;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getSessionId() { return sessionId; }
    public void setSessionId(Long sessionId) { this.sessionId = sessionId; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getUserAnswer() { return userAnswer; }
    public void setUserAnswer(String userAnswer) { this.userAnswer = userAnswer; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }

    public String getIdealAnswer() { return idealAnswer; }
    public void setIdealAnswer(String idealAnswer) { this.idealAnswer = idealAnswer; }
}

