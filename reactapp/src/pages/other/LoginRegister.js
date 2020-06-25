import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { ToastProvider, useToasts } from 'react-toast-notifications'

const LoginRegister = ({ location }) => {

  let history = useHistory();

  const url = window.$BASE_URL;

  const { pathname } = location;
  const { addToast } = useToasts()

  const submitLogin = (us, pw = null) => {
    var username = us ? us : document.getElementById('login-username').value;
    var password = pw ? pw : document.getElementById('login-password').value;
    
    axios.post(url + '/rest-auth/login/', {
      username: username,
      password: password
    }, )
    .then(function (response) {
      localStorage.setItem('username', username);
      localStorage.setItem('token', 'Token ' + response.data.key);
      history.push('/');

      addToast('¡Bienvenido, ' + username + '!', 
      { 
          appearance: 'info', 
          autoDismiss: true 
      }
  )
    })
    .catch(function (error) {
      console.log(error);
      addToast('No se ha podido iniciar sesión con los datos introducidos', 
        { 
            appearance: 'error', 
            autoDismiss: true 
        }
    )
    });

  }


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if(e.target.id == 'login-password') {
        submitLogin();
      } else {
        submitRegister();
      }
      
    }
  }
  

  const submitRegister = () => {
    var username = document.getElementById('register-username').value;
    var password1 = document.getElementById('register-pwd1').value;
    var password2 = document.getElementById('register-pwd2').value;
    var email = document.getElementById('register-email').value;

    axios.post(url + '/rest-auth/registration/', {
      username: username,
      password1: password1,
      password2: password2,
      email: email
    }, )
    .then(function (response) {   
      addToast('Tu cuenta ha sido creada con éxito, inicia sesión para continuar', 
        { 
            appearance: 'info', 
            autoDismiss: true 
        }
      )
      submitLogin(username, password1);

    })
    .catch(function (error) {
      console.log(error);
      addToast('Ha ocurrido un error intentando crear tu cuenta', 
      { 
          appearance: 'error', 
          autoDismiss: true 
      }
  )
    });
  }

  return (
    <Fragment>
      <MetaTags>
        <title>aloeshop | Login</title>
        <meta
          name="description"
          content="Login page of aloeshop."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                id="login-username"
                                type="text"
                                name="user-name"
                                placeholder="Username"
                              />
                              <input
                                id="login-password"
                                type="password"
                                name="user-password"
                                placeholder="Password"
                                onKeyPress={handleKeyDown}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="button" onClick={() => submitLogin()}>
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                id="register-username"
                                type="text"
                                name="user-name"
                                placeholder="Username"
                              />
                              <input
                                id="register-pwd1"
                                type="password"
                                name="user-password"
                                placeholder="Password"
                              />
                              <input
                                id="register-pwd2"
                                type="password"
                                name="user-password"
                                placeholder="Repeat your Password"
                              />
                              <input
                                id="register-email"
                                name="user-email"
                                placeholder="Email"
                                type="email"
                                onKeyPress={handleKeyDown}
                              />
                              <div className="button-box">
                                <button type="button" onClick={() => submitRegister()}>
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object
};

export default LoginRegister;
