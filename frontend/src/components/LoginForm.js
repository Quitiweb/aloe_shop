import React from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";

class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
        <form onSubmit={e => this.props.handle_login(e, this.state)}  style={{ marginTop: '50px' }} >
          <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
            <TextField
                autoComplete={'off'}
                label="Username"
                variant="outlined"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handle_change}
            />
            </Grid>
            <Grid item xs={12}>
                <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handle_change}
            />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" size={'large'}>
              Login
            </Button>
            </Grid>
          </Grid>
        </form>

    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};