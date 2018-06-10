import * as React from 'react';
import { RouteComponentProps } from 'react-router';


export class Questions extends React.Component<RouteComponentProps<{}>>{
    public constructor() {
        super(); {

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return <div>
            <h3>Here is where you add a question</h3>
            <form className="questionForm" onSubmit={this.handleSubmit}>
            </form>
        </div>
    }


    handleSubmit(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('/Question/AddQuestion', {
            method: 'POST',
            body: data,
        });
    }

}