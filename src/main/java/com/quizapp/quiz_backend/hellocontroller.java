package com.quizapp.quiz_backend;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class hellocontroller {

    @GetMapping("/")
    public String home() {
        return "Backend is working!";
    }
}
