import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class SignupForm extends React.Component {
  state = {
    username: '',
    password: '',
    password2: ''
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
      <form onSubmit={e => this.props.handle_signup(e, this.state)} style={{ marginTop: '50px' }}>
        <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
              <Typography variant="h4">
                <span>Signup</span>
            </Typography>
            </Grid>
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
                <TextField
                label="Repeat your Password"
                variant="outlined"
                type="password"
                name="password2"
                value={this.state.password2}
                onChange={this.handle_change}
            />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" size={'large'}>
              Signup
            </Button>
            </Grid>
          </Grid>

         <Grid item xs={12} style={{marginTop: '25px'}}>
          <Link onClick={() => this.props.display_form('login')} style={{marginRight: '15px', cursor: 'pointer'}}>Iniciar sesión</Link>
        </Grid>

      </form>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};