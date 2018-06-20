import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Quiz } from './components/Quiz';
import { HighScores } from './components/HighScores';
import { CreateQuestion } from './components/CreateQuestion';

export const routes = <Layout>
    <Route exact path='/quiz' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata' component={FetchData} />
    <Route path='/highscores' component={HighScores} />
    <Route path='/createquestion' component={CreateQuestion} />
</Layout>;
