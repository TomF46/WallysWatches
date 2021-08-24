import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Home/HomePage";


const Main = ({ location }) => (
    <>
        <div className="relative mt-4 ">
            <div className="container mx-auto p-4 lg:p-0">
                <Switch location={location}>
                    <Route path="/" component={HomePage} />
                </Switch>
            </div>
        </div>
        <ToastContainer autoClose={3000} hideProgressBar />
    </>
);
export default withRouter(Main);
