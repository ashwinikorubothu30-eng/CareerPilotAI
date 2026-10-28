package com.careerpilot.controller;

import com.careerpilot.dto.RoadmapDtos;
import com.careerpilot.service.RoadmapAiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roadmap")
public class RoadmapController {

    private final RoadmapAiService roadmapAiService;

    public RoadmapController(RoadmapAiService roadmapAiService) {
        this.roadmapAiService = roadmapAiService;
    }

    @GetMapping("/roles")
    public ResponseEntity<List<String>> getAvailableRoles() {
        return ResponseEntity.ok(roadmapAiService.getAvailableRoles());
    }

    @PostMapping("/generate")
    public ResponseEntity<RoadmapDtos.Response> generateRoadmap(@RequestBody RoadmapDtos.Request request) {
        RoadmapDtos.Response response = roadmapAiService.generateRoadmap(request);
        return ResponseEntity.ok(response);
    }
}
