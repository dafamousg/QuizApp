import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Counter } from './Counter';

interface IQuizState {
    highScores: HighScore[];

}

interface CounterState {
    currentCount: number;
}

export class Highscore extends React.Component<RouteComponentProps<{}>, CounterState>{

    constructor() {
        super();
        this.state = { currentCount: 0 };
    }

    public render() {
        return <div>
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>

            <p>Current count: <strong>{this.state.currentCount}</strong></p>

            <button onClick={() => { this.incrementCounter() }}>Increment</button>
        </div>;
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }

}



interface HighScore {
    _HighScore: number;
    userName: string;
    dateTime: string;
}