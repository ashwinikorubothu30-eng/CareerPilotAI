package com.careerpilot.repository;

import com.careerpilot.model.JobListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobListingRepository extends JpaRepository<JobListing, Long> {
    List<JobListing> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);
    List<JobListing> findByExperienceLevelIgnoreCase(String experienceLevel);
}
