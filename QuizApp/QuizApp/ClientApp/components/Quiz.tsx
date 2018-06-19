import * as React from 'react';
import { RouteComponentProps } from 'react-router';

let userName = document.getElementById('react-app')!.textContent;
interface IQuizProps { }
interface IQuizState {
    questions: Quest[];
    selectedOption: string;
    isSubmitButtonDisable: boolean;
    isNextQuestionButtonDisable: boolean;
    isOptionDisable: boolean;
    counter: number;
    score: number;
    startQuiz: boolean;
    answerColor: string;
    showAnswer: string;
}

export class Quiz extends React.Component<RouteComponentProps<{}>, IQuizState>{

    constructor() {
        super();
    }

    public render() {
        return <div>
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>

            <button onClick={() => { this.incrementCounter() }}>Increment</button>
        </div>;
    }

    incrementCounter() {
        this.setState({
        });
    }
}


interface Quest {
    question: string;
    correctAnswer: string;
    option1: string;
    option2: string;
    option3: string;
}
