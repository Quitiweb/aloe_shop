import React, { Component } from 'react';
import './App.css';
import TopBar from "./components/AppBar";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/Login'
import HomePage from './pages/HomePage'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: localStorage.getItem('token') ? localStorage.getItem('token') : false
        }
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <TopBar login={this.state.login}/>
                    <Switch>
                        <Route exact path='/' component={HomePage}/>
                        <Route path='/login' render={(props) => <Login {...props} login={this.state.login} />}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;