import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart } from "../../redux/actions/cartActions";
import { useHistory } from "react-router-dom";
import { ToastProvider, useToasts } from 'react-toast-notifications'

import axios from 'axios';

const IconGroup = ({
  currency,
  cartData,
  wishlistData,
  compareData,
  deleteFromCart,
  iconWhiteClass
}) => {

  let history = useHistory();

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState('');
  const [admin, setAdmin] = useState('');
  const { addToast } = useToasts()

  const url = window.$BASE_URL;

  useEffect(() => {
    axios.get(url + '/api/current_user', {
        headers: {
            Authorization: token
        }
    })
    .then(function (response) {
      setUsername(response.data.username)
      setAdmin(response.data.is_superuser)
    }).catch(function (error) {
        history.push('/');
        console.log(error);
    });   
},[]) 


  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

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

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      <span>{ username }</span>
      <div className="same-style header-search d-none d-lg-block">
      
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={e => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
        <ul>
          {
            
             token ?
              <div>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/my-account"}>
                    my account
                  </Link>
                </li>
                { admin ?
                  <li>
                  <Link to={""} to={process.env.PUBLIC_URL + "/dashboard"}>
                    admin
                  </Link>
                  </li>
                  : 
                  ''
                }
                <li>
                  <Link to={""} onClick={(e) => handleLogout(e)}>
                    logout
                  </Link>
                </li>
              </div>
            :
            <div>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>
                  Register
                </Link>
              </li> 
            </div>
          }
          </ul>
        </div>
      </div>
      {/* <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareData && compareData.length ? compareData.length : 0}
          </span>
        </Link>
      </div> */}
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistData && wishlistData.length ? wishlistData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={e => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart
          cartData={cartData}
          currency={currency}
          deleteFromCart={deleteFromCart}
        />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
