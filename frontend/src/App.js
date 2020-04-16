import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";

const HomeOrganicFoodTwo = lazy(() =>
  import("./pages/home/HomeOrganicFoodTwo")
);

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
const ShopGridTwoColumn = lazy(() => import("./pages/shop/ShopGridTwoColumn"));

// product pages
const ProductSlider = lazy(() => import("./pages/shop-product/ProductSlider"));

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const Admin = lazy(() => import("./pages/other/Admin"));
const Detalle = lazy(() => import("./pages/other/Detalle"));

const App = props => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json")
        }
      })
    );
  });

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={HomeOrganicFoodTwo}
                />
                {/* Shop pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-standard"}
                  component={ShopGridStandard}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-two-column"}
                  component={ShopGridTwoColumn}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product/:id"}
                  component={ProductSlider}
                />
                {/* <Route
                  path={process.env.PUBLIC_URL + "/product-fixed-image/:id"}
                  component={ProductFixedImage}
                /> */}

                {/* Other pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/about"}
                  component={About}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/contact"}
                  component={Contact}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/login-register"}
                  component={LoginRegister}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={Cart}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/compare"}
                  component={Compare}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/admin"}
                  component={Admin}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/detalle/:id"}
                  component={Detalle}
                />

                
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-standard"}
                  component={ShopGridStandard}
                />



                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(multilanguage(App));
