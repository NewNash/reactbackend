import React from 'react'
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'

export  default class Login extends React.Component{
    render() {
        return(
            <div>
                <p>login page</p>
                <Link to='/'>main</Link>
            </div>
        )
    }
}