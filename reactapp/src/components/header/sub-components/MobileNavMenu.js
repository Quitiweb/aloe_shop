import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { ToastProvider, useToasts } from 'react-toast-notifications'

const MobileNavMenu = ({ strings }) => {

  const url = window.$BASE_URL;
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [admin, setAdmin] = useState('');
  const { addToast } = useToasts()

  
  let history = useHistory();

  useEffect(() => {
      axios.get(url + '/api/current_user', {
          headers: {
              Authorization: token
          }
      })
      .then(function (response) {
        setAdmin(response.data.is_superuser)
      }).catch(function (error) {
          history.push('/');
          console.log(error);
      });   
  },[]) 

  const handleLogout = (e) => {

    e.preventDefault();

    axios.post(url + '/rest-auth/logout/', {
    }, )
    .then(function (response) {
      localStorage.removeItem('token');
      setToken(null);
      history.push('/login-register');
      console.log(response);
      addToast('Sesión cerrada correctamente', 
          { 
              appearance: 'success', 
              autoDismiss: true 
          }
      )
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        { token ?
        <div>
           <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>{strings["home"]}</Link>
          </li>
          { admin ?
          <li className="menu-item-has-children">
            <Link to={process.env.PUBLIC_URL + "/dashboard"}>Admin</Link>
          </li>
          : 
            '' 
          }
          <li className="menu-item-has-children">
          <Link to={""} onClick={(e) => handleLogout(e)}>logout</Link>
          </li>
        </div>
        : 
        
        <div>
            <li className="menu-item-has-children">
              <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
            </li>
            <li className="menu-item-has-children">
              <Link to={process.env.PUBLIC_URL + "/login-register"}>
                    Register
              </Link>
            </li>
        </div>
        }
      </ul>
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object
};

export default multilanguage(MobileNavMenu);
