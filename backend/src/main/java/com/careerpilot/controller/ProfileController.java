package com.careerpilot.controller;

import com.careerpilot.model.UserProfile;
import com.careerpilot.repository.UserProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserProfileRepository profileRepository;

    public ProfileController(UserProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @GetMapping
    public ResponseEntity<UserProfile> getProfile() {
        List<UserProfile> profiles = profileRepository.findAll();
        if (profiles.isEmpty()) {
            UserProfile defaultProfile = new UserProfile(
                    "Alex Morgan",
                    "alex.morgan@example.com",
                    "Full Stack Java & React Engineer",
                    3,
                    "Java, Spring Boot, React, JavaScript, SQL, Git, REST API, Docker"
            );
            defaultProfile.setBio("Passionate full stack software engineer focused on building robust distributed systems with Spring Boot and reactive, intuitive interfaces with React.");
            defaultProfile = profileRepository.save(defaultProfile);
            return ResponseEntity.ok(defaultProfile);
        }
        return ResponseEntity.ok(profiles.get(0));
    }

    @PostMapping
    public ResponseEntity<UserProfile> saveProfile(@RequestBody UserProfile profile) {
        if (profile.getId() != null && profileRepository.existsById(profile.getId())) {
            UserProfile existing = profileRepository.findById(profile.getId()).get();
            if (profile.getFullName() != null) existing.setFullName(profile.getFullName());
            if (profile.getEmail() != null) existing.setEmail(profile.getEmail());
            if (profile.getTargetRole() != null) existing.setTargetRole(profile.getTargetRole());
            if (profile.getYearsOfExperience() != null) existing.setYearsOfExperience(profile.getYearsOfExperience());
            if (profile.getSkills() != null) existing.setSkills(profile.getSkills());
            if (profile.getBio() != null) existing.setBio(profile.getBio());
            if (profile.getResumeText() != null) existing.setResumeText(profile.getResumeText());
            if (profile.getAtsScore() != null) existing.setAtsScore(profile.getAtsScore());
            if (profile.getReadinessScore() != null) existing.setReadinessScore(profile.getReadinessScore());
            return ResponseEntity.ok(profileRepository.save(existing));
        }
        return ResponseEntity.ok(profileRepository.save(profile));
    }
}
