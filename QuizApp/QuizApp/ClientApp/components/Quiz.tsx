import * as React from 'react';
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
                return < div className="text-center"><h1>You got {this.state.score} of {this.state.questions.length} points. Do you want to play again?</h1><button id="startQuizButton" className="submitBtn" onClick={this.restartQuiz}>Start</button></div>

            }
            else {
                return (
                    <div className="row">
                        <h2>{question[counter]}</h2>
                        <br />
                            <label className="container">{option1[counter]}
                                <td><input type="radio" name="q1" value={option1[counter]} onChange={this.changeEvent} checked={this.state.selectedOption === option1[counter]} disabled={this.state.isOptionDisabled} /></td>
                            </label>
                        <br/>
                            <label className="container">{option2[counter]}
                                <td><input type="radio" name="q1" value={option2[counter]} onChange={this.changeEvent} checked={this.state.selectedOption === option2[counter]} disabled={this.state.isOptionDisabled} /></td>
                            </label>
                        <br/>
                            <label className="container">{option3[counter]}
                                <td><input type="radio" name="q1" value={option3[counter]} onChange={this.changeEvent} checked={this.state.selectedOption === option3[counter]} disabled={this.state.isOptionDisabled} /></td>
                            </label>
                        <hr />
                        <div>
                            <input type="button" value="Submit" className="btn btn-default" style={{ marginRight: 10 }} disabled={this.state.isSubmitButtonDisabled} onClick={this.SubmitEvent}></input>
                            <input type="button" value="Next question" id="nextQuestionButton" className="btn btn-default" disabled={this.state.isNextQuestionButtonDisabled} onClick={this.manageNextQuestion}></input>

                            <label className="pull-right" id="points">{this.state.score} of {this.state.questions.length} correct</label>
                            <label id="answerBox" style={{ color: this.state.answerColor }}>{this.state.showAnswer} </label>
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

        console.log(this.state.startQuiz)
    }

    startQuiz(event: any) {
        this.setState({ startQuiz: true })
        console.log(this.state.startQuiz)
    }

    sendScore() {
        console.log('/Question/ReceiveScore?score=' + this.state.score + '&userName=' + userName);
        fetch('/Question/ReceiveScore?score=' + this.state.score + '&userName=' + userName)
            .then(Response => console.log('fetch status: ', Response.status));
    }

    getQuestion() {
        fetch('api/GetQuestions')
            .then(data => {
                console.log('Questions return success ', data);
                return data.json();
            })
            .then(obj => {
                this.setState({
                    questions: obj
                });
            })
            .catch(message => {
                console.log('Error: ' + message);
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
        this.setState({ answerColor: 'orange' })
    }

    SubmitEvent(event: any) {
        let lastSelectedOption = this.state.selectedOption;

        let correctAnswers = this.state.questions.filter(x => x.correctAnswer == lastSelectedOption);

        if (correctAnswers.length > 0) {
            console.log('You got one point!');

            let add = this.state.score + 1;

            this.setState({ score: add })

            this.setState({ answerColor: 'blue' })
            this.setState({ showAnswer: 'Your answer was correct!' })
        }
        else {
            console.log('No points for you.')
            this.setState({ answerColor: 'red' })
            this.setState({ showAnswer: 'Your was wrong.' })
        }

        console.log(lastSelectedOption);

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
