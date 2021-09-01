import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./Auth/Login/LoginPage";
import RegisterPage from "./Auth/Register/RegisterPage";
import Header from "./DisplayComponents/Header";
import HomePage from "./Home/HomePage";
import ProductPage from "./Product/ProductPage";
import ProductsPage from "./Products/ProductsPage";


const Main = ({ location }) => (
    <>
        <Header />
        <div className="relative">
            <Switch location={location}>
                <Route path="/" exact component={HomePage} />
                <Route path="/auth/login" component={LoginPage} />
                <Route path="/auth/register" component={RegisterPage} />
                <Route path="/products/:productId" component={ProductPage} />
                <Route path="/products" component={ProductsPage} />
            </Switch>
        </div>
        <ToastContainer autoClose={3000} hideProgressBar />
    </>
);
export default withRouter(Main);
