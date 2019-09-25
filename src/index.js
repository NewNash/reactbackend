import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware,createStore} from "redux";
import {Provider} from 'react-redux'
import {BrowserRouter as Router,Route} from "react-router-dom";
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import Login from './login'
import rootReducer from './reducer'
import mysaga from './saga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware,logger))
sagaMiddleware.run(mysaga)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path='/login' component={Login}/>
        </Router>
    </Provider>,
        document.getElementById('root'));

