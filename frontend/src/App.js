import React, { Component } from 'react';
import './App.css';
import TopBar from "./components/AppBar";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/Login'

class App extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         displayed_form: '',
    //         logged_in: localStorage.getItem('token') ? true : false,
    //         username: '',
    //         open: false
    //     };
    // }
    //
    // componentDidMount() {
    //     if (this.state.logged_in) {
    //         fetch('http://localhost:8000/api/current_user/', {
    //             headers: {
    //                 Authorization: `JWT ${localStorage.getItem('token')}`
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(json => {
    //                 this.setState({ username: json.username });
    //             });
    //     }
    // }
    //
    // handle_login = (e, data) => {
    //     e.preventDefault();
    //     fetch('http://localhost:8000/api/token-auth/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then(res => res.json())
    //         .then(json => {
    //             if (json.user) {
    //                localStorage.setItem('token', json.token);
    //                 this.setState({
    //                     logged_in: true,
    //                     displayed_form: '',
    //                     username: json.user.username
    //                 });
    //             } else {
    //                 this.setState({ open: true  });
    //             }
    //         });
    // };
    //
    // handle_signup = (e, data) => {
    //     e.preventDefault();
    //     fetch('http://localhost:8000/api/users/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then(res => res.json())
    //         .then(json => {
    //             localStorage.setItem('token', json.token);
    //             this.setState({
    //                 logged_in: true,
    //                 displayed_form: '',
    //                 username: json.username
    //             });
    //         });
    // };
    //
    // handle_logout = () => {
    //     localStorage.removeItem('token');
    //     this.setState({ logged_in: false, username: '' });
    // };
    //
    // display_form = form => {
    //     this.setState({
    //         displayed_form: form
    //     });
    // };
    //
    //
    // handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //       return;
    //     }
    //
    //     this.setState({ open: false  });
    // };


    render() {


        return (
            <div className="App">
                <BrowserRouter>

                    <TopBar/>

                    <Switch>
                        <Route exact path='/login' component={Login}/>
                    </Switch>
                </BrowserRouter>

            </div>
        );
    }
}

export default App;