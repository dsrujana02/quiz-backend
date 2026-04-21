package com.quizapp.quiz_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizapp.quiz_backend.entity.Leaderboard;
import com.quizapp.quiz_backend.repository.LeaderboardRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/leaderboard")
public class LeaderboardController {

    @Autowired
    LeaderboardRepository repo;

    @PostMapping("/save")
    public Leaderboard saveScore(@RequestBody Leaderboard data) {
        Leaderboard existing = repo.findByUsername(data.getUsername());
        if (existing != null) {
            existing.setScore(data.getScore());
            existing.setTotal(data.getTotal());
            return repo.save(existing); 
        }
            return repo.save(data);
    }
    

    @GetMapping("/all")
    public List<Leaderboard> getAllScores() {
        return repo.findAll(
            Sort.by(Sort.Direction.DESC, "score")
        );
    }

    @GetMapping("/top")
    public List<Leaderboard> getTopScores() {
        return repo.findTop5ByOrderByScoreDesc();
    }
}