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
            login: localStorage.getItem('token') ? localStorage.getItem('token') : false,
            username: ''
        }
    }

    setUsername = (username) => {
         this.setState({ username });
    };

    setLoginToken = (login) => {
        this.setState({ login });
    };

    logout = () => {
        localStorage.removeItem('token');
        this.setLoginToken(false);
        this.setUsername('');
    };

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <TopBar login={this.state.login} logout={this.logout}/>
                    <Switch>
                        <Route exact path='/' component={HomePage}/>
                        <Route path='/login' render={(props) => <Login {...props}
                                               login={this.state.login}
                                               username={this.state.username}
                                               setUsername={this.setUsername}
                                               setLoginToken={this.setLoginToken}
                        />}
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;