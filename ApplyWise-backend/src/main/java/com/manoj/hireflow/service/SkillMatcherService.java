package com.manoj.hireflow.service;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Service
public class SkillMatcherService {
    public double calculateSkillMatch(String resumeText, String jobDescription) {

        Set<String> resumeWords = new HashSet<>(Arrays.asList(
                resumeText.toLowerCase().split("\\W+")
        ));

        Set<String> jobWords = new HashSet<>(Arrays.asList(
                jobDescription.toLowerCase().split("\\W+")
        ));

        Set<String> importantShortWords = Set.of("ai", "ml", "c", "go");

        resumeWords.removeIf(word ->
                word.length() < 3 && !importantShortWords.contains(word)
        );

        Set<String> stopWords = Set.of(
                "the", "and", "for", "with", "you", "are",
                "this", "that", "from", "have", "has"
        );

        jobWords.removeAll(stopWords);
        resumeWords.removeAll(stopWords);

        int matchCount = 0;

        for (String jobWord : jobWords) {
            if (resumeWords.contains(jobWord)) {
                matchCount++;
            }
        }

        System.out.println("JOB WORDS: " + jobWords);
        System.out.println("RESUME WORDS: " + resumeWords);

        for (String word : jobWords) {
            if (resumeWords.contains(word)) {
                System.out.println("MATCHED: " + word);
            }
        }

        int totalSkills = jobWords.size();

        if (totalSkills == 0) return 0;

        double coverage = (matchCount * 100.0) / totalSkills;

        return Math.min(coverage, 85);
    }

}
