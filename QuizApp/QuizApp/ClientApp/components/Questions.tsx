import * as React from 'react';
import { RouteComponentProps } from 'react-router';


export class Questions extends React.Component<RouteComponentProps<{}>>{

    public constructor() {
        super(); {


        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    public render() {
        return <div>
            <h2>Add a new question to the quiz!</h2>
            <form className="questionForm" onSubmit={this.handleSubmit}>
                <div className=" form-group col-xs-7">
                    <label>Question:</label>
                    <input id="Question" name="Question" type="text" className="form-control" />
                </div>
                <div className="form-group col-xs-7">
                    <label>Option 1:</label>
                    <input id="Option1" name="Option1" type="text" className="form-control" />
                </div>
                <div className="form-group col-xs-7">
                    <label>Option 2:</label>
                    <input id="Option2" name="Option2" type="text" className="form-control" />
                </div>
                <div className="form-group col-xs-7">
                    <label>Option 3:</label>
                    <input id="Option3" name="Option3" type="text" className="form-control" />
                </div>
                <div className="form-group col-xs-7">
                    <label>Correct answer:</label>
                    <input id="CorrectAnswer" name="CorrectAnswer" type="text" className="form-control" />
                    <br />
                    <button type="submit" className="submitBtn">Submit</button>
                </div>
            </form>
        </div>;
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