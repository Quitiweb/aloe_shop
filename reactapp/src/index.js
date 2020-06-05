import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { Provider } from "react-redux";
import { fetchProducts } from "./redux/actions/productActions";
import rootReducer from "./redux/reducers/rootReducer";
// import products from "./data/products.json";
import App from "./App";
import "./assets/scss/style.scss";
import * as serviceWorker from "./serviceWorker";

import { composeWithDevTools } from "redux-devtools-extension";

import axios from "axios";

var products;

const store = createStore(
  rootReducer,
  load(),
  composeWithDevTools(applyMiddleware(thunk, save()))
);

// window.$BASE_URL = 'http://127.0.0.1:8000';
window.$BASE_URL = 'https://asa.quitiweb.com';
const url = window.$BASE_URL;

// fetch products from json file
axios.get( url + '/api')
  .then(function (response) {
    products = response.data
    console.log(response.data);
    products.map((producto)=>{  
        producto.id = producto.id.toString()
        producto.sku = producto.sku.toString()
        producto.image = [producto.image]
        producto.category = [producto.category]
        producto.tag = [producto.tag]
    }); 
    console.log(products)
    store.dispatch(fetchProducts(products));
    console.log(store)
  })
  .catch(function (error) {
    console.log(error);
  });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
