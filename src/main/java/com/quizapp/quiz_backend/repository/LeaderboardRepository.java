package com.quizapp.quiz_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizapp.quiz_backend.entity.Leaderboard;

public interface LeaderboardRepository extends JpaRepository<Leaderboard, Integer> {
    List<Leaderboard> findTop5ByOrderByScoreDesc();
    Leaderboard findByUsername(String username);
    
}