import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoute from "../AdminRoute";
import AdminHomePage from "./Admin/AdminHomepage";
import BrandPage from "./Admin/Products/Brands/Brand/BrandPage";
import BrandsManagementPage from "./Admin/Products/Brands/BrandsManagementPage";
import ManageBrandPage from "./Admin/Products/Brands/Management/ManageBrandPage";
import ManageProductPage from "./Admin/Products/Management/ManageProductPage";
import UsersManagementPage from "./Admin/Users/UserManagementPage";
import LoginPage from "./Auth/Login/LoginPage";
import RegisterPage from "./Auth/Register/RegisterPage";
import BagPage from "./Bag/BagPage";
import Header from "./DisplayComponents/Header";
import HomePage from "./Home/HomePage";
import OrderPage from "./Order/OrderPage";
import OrdersPage from "./Orders/OrdersPage";
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
                <AdminRoute
                    path="/admin/brands/:brandId/add"
                    exact
                    component={ManageProductPage
                    }
                />
                <AdminRoute
                    path="/admin/brands/:brandId/:productId/edit"
                    component={ManageProductPage
                    }
                />
                <AdminRoute
                    path="/admin/brands/add"
                    exact
                    component={ManageBrandPage
                    }
                />
                <AdminRoute
                    path="/admin/brands/:brandId/edit"
                    component={ManageBrandPage
                    }
                />
                <AdminRoute
                    path="/admin/brands/:brandId"
                    component={BrandPage
                    }
                />
                <AdminRoute
                    path="/admin/brands"
                    component={BrandsManagementPage
                    }
                />
                <AdminRoute
                    path="/admin/users"
                    component={UsersManagementPage
                    }
                />
                <AdminRoute
                    path="/admin"
                    component={AdminHomePage
                    }
                />
                <Route path="/orders/:orderId" component={OrderPage} />
                <Route path="/orders" component={OrdersPage} />
                <Route path="/products/:productId" component={ProductPage} />
                <Route path="/products" component={ProductsPage} />
                <Route path="/bag" component={BagPage} />
            </Switch>
        </div>
        <ToastContainer autoClose={3000} hideProgressBar />
    </>
);
export default withRouter(Main);
