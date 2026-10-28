package com.careerpilot.controller;

import com.careerpilot.dto.BulletImproveDtos;
import com.careerpilot.dto.ResumeAnalysisRequest;
import com.careerpilot.dto.ResumeAnalysisResponse;
import com.careerpilot.service.ResumeAiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeAiService resumeAiService;

    public ResumeController(ResumeAiService resumeAiService) {
        this.resumeAiService = resumeAiService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<ResumeAnalysisResponse> analyzeResume(@RequestBody ResumeAnalysisRequest request) {
        ResumeAnalysisResponse response = resumeAiService.analyzeResume(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/improve-bullet")
    public ResponseEntity<BulletImproveDtos.Response> improveBullet(@RequestBody BulletImproveDtos.Request request) {
        BulletImproveDtos.Response response = resumeAiService.improveBullet(request);
        return ResponseEntity.ok(response);
    }
}
