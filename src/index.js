import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware,createStore} from "redux";
import {Provider} from 'react-redux'
import {BrowserRouter as Router,Route} from "react-router-dom";
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

// import Login from './login'
import Login from './test/login'
import Index from './test/index'
import rootReducer from './reducer'
import mysaga from './saga'
import App from "./App";
import MyLayout from './Layout';
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware,logger))
sagaMiddleware.run(mysaga)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            {/*<Route path='/admin' component={App}/>*/}
            <Route path='/login' exact component={Login}/>
            <Route path='/' exact component={Index}/>
        </Router>
    </Provider>,
        document.getElementById('root'));

