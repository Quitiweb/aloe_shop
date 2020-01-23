import React from 'react';
import Nav from '../components/Nav';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    MuiSnackbar: {
        marginTop: '15px'
    }
}));

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayed_form: 'login',
            logged_in: localStorage.getItem('token') ? true : false,
            username: '',
            open: false
        };
    }

    componentDidMount() {
        if (this.state.logged_in) {
            fetch('http://localhost:8000/api/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    this.props.setUsername(json.username);
                });
        }
    }

    handle_login = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/api/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                if (json.user) {
                   localStorage.setItem('token', json.token);
                    this.setState({
                        logged_in: true,
                        displayed_form: ''
                    });
                    this.props.setUsername(json.user.username);
                    this.props.setLoginToken(json.token);
                } else {
                    this.setState({ open: true  });
                }
            });
    };

    handle_signup = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: ''
                });
                this.props.setUsername(json.username);
                this.props.setLoginToken(json.token);
            });
    };

    handle_logout = () => {
        localStorage.removeItem('token');
        this.props.setLoginToken(false);
        this.setState({ logged_in: false, username: '' });
    };

    display_form = form => {
        this.setState({
            displayed_form: form
        });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        this.setState({ open: false  });
    };

    render() {
            let form;
        switch (this.state.displayed_form) {
            case 'login':
                form = <LoginForm handle_login={this.handle_login} display_form={this.display_form}/>;
                break;
            case 'signup':
                form = <SignupForm handle_signup={this.handle_signup} display_form={this.display_form}/>;
                break;
            default:
                form = null;
        }

        return (
            <div>
                 <Snackbar
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message="Usuario y/o contraseña incorrectos"
                    action={
                      <React.Fragment>
                        <Button color="secondary" size="small" onClick={this.handleClose}>
                          OK
                        </Button>
                      </React.Fragment>
                    }
                  />

                {form}

                <Nav
                    logged_in={this.state.logged_in}
                    display_form={this.display_form}
                    handle_logout={this.handle_logout}
                />

                <h3>
                    {this.state.logged_in
                        ? `Hello, ${this.props.username}`
                        : ''}
                </h3>
            </div>
        )
    }

}