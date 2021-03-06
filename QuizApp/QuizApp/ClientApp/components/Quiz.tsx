﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';

let userName = document.getElementById('react-app')!.textContent;

interface IQuizProps { }
interface IQuizState {
    questions: Quest[];
    selectedOption: string;
    isSubmitButtonDisabled: boolean;
    isNextQuestionButtonDisabled: boolean;
    isOptionDisabled: boolean;
    counter: number;
    score: number;
    startQuiz: boolean;
    answerColor: string;
    showAnswer: string;
}

export class Quiz extends React.Component<IQuizProps, IQuizState>{

    public constructor(props: IQuizProps) {
        super(props); {
            this.state = {
                questions: [],
                selectedOption: "",
                isSubmitButtonDisabled: true,
                isNextQuestionButtonDisabled: true,
                isOptionDisabled: false,
                counter: 0,
                score: 0,
                startQuiz: false,
                answerColor: "orange",
                showAnswer: ""
            }
        }

        this.getQuestion = this.getQuestion.bind(this);
        this.SubmitEvent = this.SubmitEvent.bind(this);
        this.manageNextQuestion = this.manageNextQuestion.bind(this);
        this.sendScore = this.sendScore.bind(this);
        this.startQuiz = this.startQuiz.bind(this);
        this.restartQuiz = this.restartQuiz.bind(this);
        this.changeEvent = this.changeEvent.bind(this);
    }

    public render() {

        if (this.state.startQuiz == false) {
            return <div className="text-center">
                <h1>Welcome {userName}!</h1>
                <h1>Press start to begin the game!</h1>
                <button id="startQuizButton" className="btn btn-danger" onClick={this.startQuiz}>Start</button>
            </div>
        }
        else {

            let oldList = this.state.questions;

            let question = oldList.map(x => x.question);
            let option1 = oldList.map(o => o.option1);
            let option2 = oldList.map(o => o.option2);
            let option3 = oldList.map(o => o.option3);

            let counter = this.state.counter;

            if (this.state.questions.length == counter) {

                let maximumScore = this.state.questions.length;
                this.sendScore();
                return < div className="text-center btn btn-default"><h1>You answered {this.state.score} of {this.state.questions.length} questions correct. Do you want to play again?</h1><button id="startQuizButton" className="submitBtn" onClick={this.restartQuiz}>Restart Quiz</button></div>

            }
            else {
                return (
                    <div className="row">
                        <h2 style={{ marginLeft: 5 }}>{question[counter]}</h2>
                        <hr />
                        <h4>
                            <p><input style={{ marginLeft: 10 }} type="radio" name="q1" value={option1[counter]} onChange={this.changeEvent} checked={this.state.selectedOption === option1[counter]} disabled={this.state.isOptionDisabled} /> {option1[counter]}</p>

                            <p><input style={{ marginLeft: 10 }} type="radio" name="q1" value={option2[counter]} onChange={this.changeEvent} checked={this.state.selectedOption === option2[counter]} disabled={this.state.isOptionDisabled} /> {option2[counter]}</p>

                            <p><input style={{ marginLeft: 10 }} type="radio" name="q1" value={option3[counter]} onChange={this.changeEvent} checked={this.state.selectedOption === option3[counter]} disabled={this.state.isOptionDisabled} /> {option3[counter]}</p>
                        </h4>

                        <hr />
                        <div className="row col-md-5">
                            <input type="button" value="Submit" className="btn btn-danger" style={{ marginRight: 10, marginLeft: 5 }} disabled={this.state.isSubmitButtonDisabled} onClick={this.SubmitEvent}></input>
                            <input type="button" value="Next question" id="nextQuestionButton" className="btn btn-primary" disabled={this.state.isNextQuestionButtonDisabled} onClick={this.manageNextQuestion}></input>

                            <label className="pull-right" id="points">{this.state.score} of {this.state.questions.length} correct</label>
                            <p><label id="answerBox" style={{ color: this.state.answerColor, marginLeft: 10 }}>{this.state.showAnswer}</label></p>
                        </div>
                    </div>
                );
            }
        }
    }

    changeEvent(event: any) {
        this.setState({ selectedOption: event.target.value })
        this.setState({ isSubmitButtonDisabled: false })
    }

    restartQuiz() {
        this.setState({ startQuiz: true })
        this.setState({ counter: 0 })
        this.setState({ score: 0 })

        console.log('Restarting quiz status: ' + this.state.startQuiz)
    }

    startQuiz(event: any) {
        this.setState({ startQuiz: true })
        console.log('Starting quiz status: ' + this.state.startQuiz)
    }

    sendScore() {
        console.log('Sending score for user: ' + userName + ' score: ' + this.state.score);
        fetch('/Question/ReceiveScore?score=' + this.state.score + '&userName=' + userName)
            .then(Response => console.log('Fetch response time: ' + Response.status));
    }

    getQuestion() {
        fetch('api/GetQuestions')
            .then(data => {
                console.log('Fetch status: Got all questions!');
                return data.json();
            })
            .then(obj => {
                this.setState({
                    questions: obj
                });
            })
            .catch(message => {
                console.log('Error getting questions: ' + message);
            })
    }
    componentDidMount() {
        this.getQuestion();
    }

    manageNextQuestion(event: any) {
        let count = this.state.counter + 1;

        if (count <= this.state.questions.length) {
            this.setState({ counter: count })
            console.log(this.state.counter);
        }

        this.setState({ isNextQuestionButtonDisabled: true })
        this.setState({ isOptionDisabled: false })
        this.setState({ answerColor: 'white' })
    }

    SubmitEvent(event: any) {

        let lastSelectedOption = this.state.selectedOption;

        let correctAnswers = this.state.questions.filter(x => x.correctAnswer == lastSelectedOption);

        let correctAnswerTemp = this.state.questions.map(ca => ca.correctAnswer);

        if (correctAnswers.length > 0) {
            console.log('User got a point');

            let add = this.state.score + 1;

            this.setState({ score: add })

            this.setState({ answerColor: 'blue' })
            this.setState({ showAnswer: 'Your answer was correct!' })
        }
        else {
            console.log('User answered wrong')
            this.setState({ answerColor: 'red' })
            this.setState({ showAnswer: 'Your answer was wrong. The correct answer was ' + correctAnswerTemp[this.state.counter] })
        }

        console.log('Last selected option: ' + lastSelectedOption);

        this.setState({ isSubmitButtonDisabled: true })
        this.setState({ isNextQuestionButtonDisabled: false })
        this.setState({ isOptionDisabled: true })
    }
}

interface Quest {
    question: string;
    correctAnswer: string;
    option1: string;
    option2: string;
    option3: string;
}
//quiz