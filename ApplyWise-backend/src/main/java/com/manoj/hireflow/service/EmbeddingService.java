package com.manoj.hireflow.service;

import com.google.genai.Client;
import com.google.genai.types.EmbedContentResponse;
import com.manoj.hireflow.dto.AiExtractionResponse;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmbeddingService {

    private final Client client;

    public EmbeddingService(@Value("${gemini.api.key}") String geminiApiKey) {
        this.client = Client.builder()
                .apiKey(geminiApiKey)
                .build();
    }

    public List<Float> generateEmbedding(String text) {

        if (text == null || text.isBlank()) {
            throw new IllegalArgumentException("Text cannot be empty");
        }

        EmbedContentResponse response =
                client.models.embedContent(
                        "gemini-embedding-001",
                        text,
                        null
                );

        return response.embeddings()
                .orElseThrow(() ->
                        new RuntimeException("No embeddings returned"))
                .get(0)
                .values()
                .orElseThrow(() ->
                        new RuntimeException("Embedding values not returned"));
    }

    public double cosineSimilarity(
            List<Float> vectorA,
            List<Float> vectorB
    ) {

        if (vectorA.size() != vectorB.size()) {
            throw new IllegalArgumentException(
                    "Vectors must have the same dimensions"
            );
        }

        double dotProduct = 0.0;
        double magnitudeA = 0.0;
        double magnitudeB = 0.0;

        for (int i = 0; i < vectorA.size(); i++) {

            double a = vectorA.get(i);
            double b = vectorB.get(i);

            dotProduct += a * b;
            magnitudeA += a * a;
            magnitudeB += b * b;
        }

        if (magnitudeA == 0 || magnitudeB == 0) {
            return 0.0;
        }

        return dotProduct /
                (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
    }

    public double calculateSemanticSkillMatch(
            List<String> jobRequirements,
            List<AiExtractionResponse.PotentialMatch> potentialMatches
    ) {

        if (jobRequirements == null || jobRequirements.isEmpty()) {
            return 0.0;
        }

        /*
         * Store the final similarity score for each JD requirement.
         *
         * If a requirement has no potential match,
         * it will remain 0.0.
         */
        Map<String, Double> requirementScores = new HashMap<>();

        // Initially every JD requirement gets 0.
        for (String requirement : jobRequirements) {
            requirementScores.put(requirement, 0.0);
        }

        /*
         * Calculate embeddings ONLY for the potential matches
         * identified by the LLM.
         */
        if (potentialMatches != null) {

            for (AiExtractionResponse.PotentialMatch match
                    : potentialMatches) {

                String requirement = match.getJobRequirement();
                String candidateSkill = match.getCandidateSkill();

                if (requirement == null ||
                        requirement.isBlank() ||
                        candidateSkill == null ||
                        candidateSkill.isBlank()) {

                    continue;
                }

                // Generate embeddings for this matched pair.
                List<Float> requirementVector =
                        generateEmbedding(requirement);

                List<Float> candidateVector =
                        generateEmbedding(candidateSkill);

                double similarity =
                        cosineSimilarity(
                                requirementVector,
                                candidateVector
                        );

                /*
                 * If the LLM somehow returns multiple potential
                 * matches for the same requirement, keep the
                 * strongest one.
                 */
                double currentScore =
                        requirementScores.getOrDefault(
                                requirement,
                                0.0
                        );

                requirementScores.put(
                        requirement,
                        Math.max(currentScore, similarity)
                );
            }
        }

        /*
         * IMPORTANT:
         *
         * Divide by ALL job requirements.
         *
         * Therefore, a missing requirement contributes 0.
         */
        double totalSimilarity = 0.0;

        for (String requirement : jobRequirements) {

            double score =
                    requirementScores.getOrDefault(
                            requirement,
                            0.0
                    );

            totalSimilarity += score;

        }

        double averageSimilarity =
                totalSimilarity / jobRequirements.size();

        return averageSimilarity * 100.0;
    }
}