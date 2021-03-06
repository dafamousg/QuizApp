import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Quiz } from './Quiz';

interface IHighscoreState {
    highScores: HighScore[];
}

export class HighScores extends React.Component<RouteComponentProps<{}>, IHighscoreState>{

    public constructor() {
        super(); {
            this.state = { highScores: [] };
        }
        this.fetchScores = this.fetchScores.bind(this);
    }

    public render() {

        let count = 0;

        let oldList = this.state.highScores;
        let newList = oldList.map((highscore, index) => <li key={highscore + ":" + index}>{highscore.userName}</li>);

        return <table className="table">
            <thead>
                <tr>
                    <th>Player</th>
                    <th>HighScore</th>
                    <th>When</th>
                </tr>
            </thead>
            <tbody>
                {oldList.map((highscore, index) =>
                    <tr key={highscore.userName + ":" + index}>
                        <td>{highscore.userName}</td>
                        <td>{highscore._HighScore}</td>
                        <td>{highscore.dateTime}</td>
                    </tr>
                )}
            </tbody>
        </table>
    }

    fetchScores() {
        // H�mtar aktuell data fr�n apin

        fetch('/question/GetHighScores')
            .then(data => {
                console.log('highscore returned ', data);
                return data.json();
            })
            .then(obj => {

                this.setState({
                    highScores: obj
                });
            })
            .catch(message => {
                console.log('something went wrong: ' + message);
            })
    }
    componentDidMount() {
        this.fetchScores();
    }
}

interface HighScore {
    _HighScore: number;
    userName: string;
    dateTime: string;
}
//highscore