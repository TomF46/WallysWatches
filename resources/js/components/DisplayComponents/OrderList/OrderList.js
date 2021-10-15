import React from "react";
import PropTypes from "prop-types";
import OrderListItem from "./OrderListItem";

const OrderList = ({ orders }) => {
    return (
        <div className="grid grid-cols-12">
            {orders && (
                orders.map((order) => {
                    return (
                        <OrderListItem order={order} />
                    )
                })
            )}
        </div>
    );
};

OrderList.propTypes = {
    orders: PropTypes.array.isRequired,
};

export default OrderList;
