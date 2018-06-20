import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Highscore } from './components/Highscore';
import { Quiz } from './components/Quiz';
import { CreateQuestion } from './components/CreateQuestion';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata' component={FetchData} />
    <Route path='/Highscore' component={Highscore} />
    <Route path='/CreateQuestion' component={CreateQuestion} />
</Layout>;
