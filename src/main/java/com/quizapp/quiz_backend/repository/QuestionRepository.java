package com.quizapp.quiz_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.quizapp.quiz_backend.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

    
    @Query(value = "SELECT * FROM question LIMIT :num", nativeQuery = true)
    List<Question> findRandomQuestions(@Param("num") int num);

    
    List<Question> findByCategory(String category);

    List<Question> findByCategoryAndDifficulty(String category, String difficulty);

    
    @Query(value = "SELECT * FROM question WHERE category = :category LIMIT :num", nativeQuery = true)
    List<Question> findRandomByCategory(@Param("category") String category, @Param("num") int num);
}
