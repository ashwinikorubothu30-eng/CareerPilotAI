package com.careerpilot.controller;

import com.careerpilot.dto.JobMatchDtos;
import com.careerpilot.model.JobListing;
import com.careerpilot.service.JobMatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobMatchController {

    private final JobMatchService jobMatchService;

    public JobMatchController(JobMatchService jobMatchService) {
        this.jobMatchService = jobMatchService;
    }

    @GetMapping
    public ResponseEntity<List<JobListing>> getAllJobs() {
        return ResponseEntity.ok(jobMatchService.getAllJobs());
    }

    @PostMapping("/match")
    public ResponseEntity<List<JobMatchDtos.MatchedJob>> matchJobs(@RequestBody JobMatchDtos.MatchRequest request) {
        List<JobMatchDtos.MatchedJob> matchedJobs = jobMatchService.matchJobs(request);
        return ResponseEntity.ok(matchedJobs);
    }
}
