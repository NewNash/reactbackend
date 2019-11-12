import React from 'react'
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'
import Content from './content'
export  default class Index extends React.Component{
    render() {
        return(
            <div>
                <p>main page</p>
               <p> <Link to='/login'>login</Link></p>
                <Router>
                    <p><Link to='/content'>content</Link></p>
                   <Route path='/content' exact component={Content}/>
                </Router>
            </div>
        )
    }
}