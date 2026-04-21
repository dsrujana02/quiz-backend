package com.quizapp.quiz_backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizapp.quiz_backend.entity.Question;
import com.quizapp.quiz_backend.entity.QuestionWrapper;
import com.quizapp.quiz_backend.entity.Response;
import com.quizapp.quiz_backend.repository.QuestionRepository;

@CrossOrigin(origins = "http://localhost:5173")  
@RestController
@RequestMapping("/question")
public class QuestionController {
    @Autowired
    QuestionRepository repo;
    @GetMapping("/all")
    public List<Question> getAllQuestions() {
        return repo.findAll();
    }
    @GetMapping("/random/{num}")
    public List<QuestionWrapper> getRandomQuestions(@PathVariable int num) {

        List<Question> questions = repo.findRandomQuestions(num);

        List<QuestionWrapper> result = new ArrayList<>();

        for (Question q : questions) {
            result.add(new QuestionWrapper(
                    q.getId(),
                    q.getQuestionTitle(),
                    q.getOption1(),
                    q.getOption2(),
                    q.getOption3(),
                    q.getOption4(),
                    q.getRightAnswer()
            ));
        }

        return result;
    }
    @GetMapping("/addtest")
    public String addTestQuestion() {
        Question q = new Question();
        q.setQuestionTitle("Java is?");
        q.setOption1("Language");
        q.setOption2("Animal");
        q.setOption3("Car");
        q.setOption4("Food");
        q.setRightAnswer("Language");
        q.setDifficulty("Easy");
        q.setCategory("Programming");
        repo.save(q);
        return "Added";
    }

    @PostMapping("/add")
    public String addQuestion(@RequestBody Question question) {
        repo.save(question);
        return "Question added successfully";
    }

    
    public int calculateScore(@RequestBody List<Response> responses) {

        int score = 0;

        for (Response res : responses) {
            Question q = repo.findById(res.getId()).orElse(null);

            if (q != null && q.getRightAnswer().equals(res.getResponse())) {
                score++;
            }
        }

        return score;
    }

    
    @GetMapping("/category/{category}")
    public List<QuestionWrapper> getQuestionsByCategory(@PathVariable String category) {

        List<Question> questions = repo.findByCategory(category);

        List<QuestionWrapper> result = new ArrayList<>();

        for (Question q : questions) {
            result.add(new QuestionWrapper(
                    q.getId(),
                    q.getQuestionTitle(),
                    q.getOption1(),
                    q.getOption2(),
                    q.getOption3(),
                    q.getOption4(),
                    q.getRightAnswer()
            ));
        }

        return result;
    }

    
    @GetMapping("/category/{category}/difficulty/{difficulty}")
    public List<QuestionWrapper> getByCategoryAndDifficulty(@PathVariable String category,
                                                            @PathVariable String difficulty) {

        List<Question> questions = repo.findByCategoryAndDifficulty(category, difficulty);

        List<QuestionWrapper> result = new ArrayList<>();

        for (Question q : questions) {
            result.add(new QuestionWrapper(
                    q.getId(),
                    q.getQuestionTitle(),
                    q.getOption1(),
                    q.getOption2(),
                    q.getOption3(),
                    q.getOption4(),
                    q.getRightAnswer()
            ));
        }

        return result;
    }

    
    @GetMapping("/category/{category}/random/{num}")
    public List<QuestionWrapper> getRandomByCategory(@PathVariable String category,
                                                     @PathVariable int num) {

        List<Question> questions = repo.findRandomByCategory(category, num);

        List<QuestionWrapper> result = new ArrayList<>();

        for (Question q : questions) {
            result.add(new QuestionWrapper(
                    q.getId(),
                    q.getQuestionTitle(),
                    q.getOption1(),
                    q.getOption2(),
                    q.getOption3(),
                    q.getOption4(),
                    q.getRightAnswer()
            ));
        }

        return result;
    }
}
