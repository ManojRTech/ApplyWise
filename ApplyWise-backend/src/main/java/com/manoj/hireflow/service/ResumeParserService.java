package com.manoj.hireflow.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ResumeParserService {
    public String extractText(String filePath) {
        try {
            org.apache.tika.Tika tika = new org.apache.tika.Tika();
            return tika.parseToString(new java.io.File(filePath));
        } catch (Exception e) {
            return "";
        }
    }

    public String extractTextFromFile(MultipartFile file) {
        try {
            org.apache.tika.Tika tika = new org.apache.tika.Tika();

            String text = tika.parseToString(file.getInputStream());

            System.out.println("EXTRACTED TEXT:\n" + text);

            return text;

        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }
}
