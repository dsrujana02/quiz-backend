package com.quizapp.quiz_backend.entity;

public class QuestionWrapper {

    private final int id;
    private final String questionTitle;
    private final String option1;
    private final String option2;
    private final String option3;
    private final String option4;
    private final String rightAnswer;

    
    public QuestionWrapper(int id, String questionTitle, String option1,
                           String option2, String option3, String option4,
                           String rightAnswer) {

        this.id = id;
        this.questionTitle = questionTitle;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.rightAnswer = rightAnswer;
    }

    public int getId() {
        return id;
    }

    public String getQuestionTitle() {
        return questionTitle;
    }

    public String getOption1() {
        return option1;
    }

    public String getOption2() {
        return option2;
    }

    public String getOption3() {
        return option3;
    }

    public String getOption4() {
        return option4;
    }

    public String getRightAnswer() {
        return rightAnswer;
    }
}