import * as React from 'react';
import { RouteComponentProps } from 'react-router';

let userName = document.getElementById('react-app')!.textContent;
interface IQuizProps { }
interface IQuizState {
    questions: Quest[];
    selectedOption: string;
    isSubmitButtonDisabled: boolean;
    isNextQuestionButtonDisabled: boolean;
    isOptionDisable: boolean;
    counter: number;
    score: number;
    startQuiz: boolean;
    answerColor: string;
    showAnswer: string;
}

export class Quiz extends React.Component<RouteComponentProps<IQuizProps>, IQuizState>{

    constructor(props: IQuizProps) {
        super(props); {
            this.state = {
                questions: [], selectedOption: "", isSubmitButtonDisabled: true, isNextQuestionButtonDisabled: true, isOptionDisable: false, counter: 0, score: 0, startQuiz: false, answerColor: 'orange', showAnswer: ""

            }
        }
        this.getQuestion = this.getQuestion.bind(this);
        this.SubmitEvent = this.SubmitEvent.bind(this);
        this.manageNextQuestion = this.manageNextQuestion.bind(this);
        this.sendScore = this.sendScore.bind(this);
        this.startQuiz = this.startQuiz.bind(this);
        this.restartQuiz = this.restartQuiz.bind(this);

    }

    public render() {
        return <div>
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>

        </div>;
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
        this.setState({ startQuiz: true; })
        console.log(this.state.startQuiz)
    }

    sendScore() {
        console.log('/Question/ReceiveScore?score=' + this.state.score + '&userName=' + userName);
        fetch('/Question/ReceiveScore?score=' + this.state.score + '&userName' + userName)
            .then(Response => console.log('fetch status: ' + Response.status));
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
        this.setState({ isOptionDisable: false })
        this.setState({ answerColor: 'orange' })
    }

    SubmitEvent(event: any) {
        let finalSelectedOption = this.state.selectedOption;

        let correctAnswers = this.state.questions.filter(x => x.correctAnswer == finalSelectedOption);

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

        console.log(finalSelectedOption);

        this.setState({ isSubmitButtonDisabled: true })
        this.setState({ isNextQuestionButtonDisabled: false })
        this.setState({ isOptionDisable: true })
    }
}

interface Quest {
    question: string;
    correctAnswer: string;
    option1: string;
    option2: string;
    option3: string;
}
