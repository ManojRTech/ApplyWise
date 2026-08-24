package com.manoj.hireflow.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Schema;
import com.google.genai.types.Type;
import com.manoj.hireflow.dto.AiExtractionResponse;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.Map;

@Service
public class LlmExtractionService {

    private final Client client;
    private final ObjectMapper objectMapper;

    public LlmExtractionService(
        ObjectMapper objectMapper,
        @Value("${gemini.api.key}") String geminiApiKey
    ) {
        this.client = Client.builder()
                .apiKey(geminiApiKey)
                .build();

        this.objectMapper = objectMapper;
    }

    public AiExtractionResponse extractSkills(
            String jobDescription,
            String resumeText
    ) {

        String prompt = """
                You are an AI skill analysis system for a recruitment platform.

                Analyze BOTH the job description and the candidate resume.

                Your task has THREE parts:

                PART 1 - Extract job requirements

                Extract meaningful skills and requirements from the job
                description that are relevant for evaluating this candidate.

                Include:
                - Programming languages
                - Frameworks and libraries
                - Databases
                - Cloud platforms
                - Developer tools
                - Technologies
                - APIs
                - Technical concepts
                - Domain-specific competencies
                - Relevant certifications or qualifications
                - Relevant soft skills
                - Meaningful multi-word technical phrases

                Do NOT include generic words such as:
                "the", "best", "good", "excellent", "motivated",
                "candidate", "experience", "responsible", etc.

                PART 2 - Extract candidate skills

                Extract meaningful skills that are actually present or
                clearly demonstrated in the candidate resume.

                Do NOT invent skills.

                PART 3 - Identify potential semantic matches

                For each job requirement, identify candidate skills that
                could reasonably satisfy the requirement.

                IMPORTANT:

                A potential match does NOT require identical wording.

                Consider semantic and contextual relationships.

                Examples of potentially valid matches:

                "REST APIs" ↔ "RESTful web services"
                "JavaScript" ↔ "JS"
                "PostgreSQL" ↔ "Postgres"
                "Spring Boot" ↔ "Spring Boot framework"
                "backend API development" ↔ "REST API development"

                However, do NOT treat merely related technologies as
                equivalent.

                Examples that should NOT automatically be considered matches:

                "Java" ↔ "JavaScript"
                "React" ↔ "Angular"
                "Kubernetes" ↔ "Docker"

                A potential match should mean that the candidate skill
                could reasonably satisfy the specific job requirement,
                not merely that both technologies belong to the same
                general software-development domain.

                IMPORTANT:
                - Keep ALL job requirements even if the candidate does not
                  have them.
                - Keep ALL candidate skills independently.
                - Do NOT remove a job requirement because there is no
                  corresponding candidate skill.
                - Do NOT invent a candidate skill.
                - Do NOT create a potential match merely because two
                  technologies are broadly related.
                - If a job requirement has no reasonable candidate match,
                  do not include it in potentialMatches.

                JOB DESCRIPTION:
                ---
                %s
                ---

                CANDIDATE RESUME:
                ---
                %s
                ---

                Return only the requested structured JSON.
                """.formatted(jobDescription, resumeText);

        Schema potentialMatchSchema =
                Schema.builder()
                        .type(Type.Known.OBJECT)
                        .properties(Map.of(
                                "jobRequirement",
                                Schema.builder()
                                        .type(Type.Known.STRING)
                                        .build(),

                                "candidateSkill",
                                Schema.builder()
                                        .type(Type.Known.STRING)
                                        .build()
                        ))
                        .required(List.of(
                                "jobRequirement",
                                "candidateSkill"
                        ))
                        .build();

        Schema responseSchema =
                Schema.builder()
                        .type(Type.Known.OBJECT)
                        .properties(Map.of(

                                "jobRequirements",
                                Schema.builder()
                                        .type(Type.Known.ARRAY)
                                        .items(
                                                Schema.builder()
                                                        .type(Type.Known.STRING)
                                                        .build()
                                        )
                                        .build(),

                                "candidateSkills",
                                Schema.builder()
                                        .type(Type.Known.ARRAY)
                                        .items(
                                                Schema.builder()
                                                        .type(Type.Known.STRING)
                                                        .build()
                                        )
                                        .build(),

                                "potentialMatches",
                                Schema.builder()
                                        .type(Type.Known.ARRAY)
                                        .items(potentialMatchSchema)
                                        .build()
                        ))
                        .required(List.of(
                                "jobRequirements",
                                "candidateSkills",
                                "potentialMatches"
                        ))
                        .build();

        GenerateContentConfig config =
                GenerateContentConfig.builder()
                        .responseMimeType("application/json")
                        .responseSchema(responseSchema)
                        .build();

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3.5-flash-lite",
                        prompt,
                        config
                );

        String json = response.text();

        try {

            return objectMapper.readValue(
                    json,
                    AiExtractionResponse.class
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse Gemini extraction response",
                    e
            );
        }
    }
}