import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./Auth/Login/LoginPage";
import RegisterPage from "./Auth/Register/RegisterPage";
import Header from "./DisplayComponents/Header";
import HomePage from "./Home/HomePage";


const Main = ({ location }) => (
    <>
        <Header />
        <div className="relative mt-4 ">
            <div className="container mx-auto p-4 lg:p-0">
                <Switch location={location}>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/auth/login" component={LoginPage} />
                    <Route path="/auth/register" component={RegisterPage} />

                </Switch>
            </div>
        </div>
        <ToastContainer autoClose={3000} hideProgressBar />
    </>
);
export default withRouter(Main);
