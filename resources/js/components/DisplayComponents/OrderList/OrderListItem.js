import React from "react";
import PropTypes from "prop-types";
import history from "../../../history";
import MoneyFormat from "../MoneyFormat";

const OrderListItem = ({ order }) => {

    function view() {
        history.push(`/orders/${order.id}`)
    }

    return (
        <div className="col-span-12 rounded overflow-hidden shadow-lg pointer mx-4 my-2" onClick={view}>
            <div className="grid grid-cols-12">
                <div className="col-span-12 p-4">
                    <h3 className="font-bold text-xl">Order: {order.id}</h3>
                    <p>Status: {order.statusText}</p>
                    {order.products && (
                        order.products.map((product) => {
                            return (
                                <p key={product.id}>Product: {product.product.name} Quantity: {product.quantity} Total:<span><MoneyFormat value={product.cost} /></span></p>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

OrderListItem.propTypes = {
    order: PropTypes.object.isRequired,
};

export default OrderListItem;
