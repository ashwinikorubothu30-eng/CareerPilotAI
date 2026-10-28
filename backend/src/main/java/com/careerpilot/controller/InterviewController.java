package com.careerpilot.controller;

import com.careerpilot.dto.InterviewDtos;
import com.careerpilot.service.InterviewAiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview")
public class InterviewController {

    private final InterviewAiService interviewAiService;

    public InterviewController(InterviewAiService interviewAiService) {
        this.interviewAiService = interviewAiService;
    }

    @PostMapping("/questions")
    public ResponseEntity<List<InterviewDtos.QuestionDto>> getQuestions(@RequestBody InterviewDtos.StartRequest request) {
        List<InterviewDtos.QuestionDto> questions = interviewAiService.getQuestions(request);
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/evaluate")
    public ResponseEntity<InterviewDtos.EvaluateResponse> evaluateAnswer(@RequestBody InterviewDtos.EvaluateRequest request) {
        InterviewDtos.EvaluateResponse response = interviewAiService.evaluateAnswer(request);
        return ResponseEntity.ok(response);
    }
}

