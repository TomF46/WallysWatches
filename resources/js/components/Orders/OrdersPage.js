import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _, { debounce } from 'lodash';
import LoadingMessage from "../DisplayComponents/LoadingMessage";
import { getCurrentUsersOrders, getCurrentUsersOrdersWithPagination } from "../../api/ordersApi";
import OrderListWithPagination from "../DisplayComponents/OrderList/OrderListWithPagination";

const OrdersPage = () => {
    const [ordersPaginator, setOrdersPaginator] = useState(null);


    useEffect(() => {
        if (!ordersPaginator) {
            getMyOrders();
        }
    }, [ordersPaginator])


    function getMyOrders() {
        getCurrentUsersOrders().then(ordersData => {
            console.log(ordersData);
            setOrdersPaginator(ordersData);
        }).catch(error => {
            toast.error("Error getting orders " + error.message, {
                autoClose: false,
            });
        });
    }

    function getMyOrdersPage(pageUrl) {
        getCurrentUsersOrdersWithPagination(pageUrl).then(ordersData => {
            setOrdersPaginator(ordersData);
        }).catch(error => {
            toast.error("Error getting orders " + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <>
            <div className="bg-secondary mb-8">
                <h1 className="font-bold text-3xl text-center items-center py-4">My Orders</h1>
            </div>
            <div className="orders-page container mx-auto p-4 lg:p-0">
                {!ordersPaginator ? (
                    <LoadingMessage message={'Loading your orders'} />
                ) : (
                    <>
                        <div>
                            {ordersPaginator.total > 0 ? (
                                <OrderListWithPagination paginationData={ordersPaginator} onPageChange={getMyOrdersPage} />
                            ) : (
                                <p className="text-center">No orders match your search</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>

    );
};

export default OrdersPage;
