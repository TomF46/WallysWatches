import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingMessage from "../DisplayComponents/LoadingMessage";
import { getOrderById } from "../../api/ordersApi";
import BagItemRow from "../Bag/BagItemRow";

const OrderPage = ({ orderId }) => {
    const [order, setOrder] = useState(null);


    useEffect(() => {
        if (!order) {
            getOrder();
        }
    }, [orderId, order])

    function getOrder() {
        getOrderById(orderId).then(orderData => {
            setOrder(orderData);
            console.log(orderData)
        }).catch(error => {
            toast.error("Error getting order " + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <>
            <div className="bg-secondary mb-8">
                <h1 className="font-bold text-3xl text-center items-center py-4">Order</h1>
            </div>
            <div className="order-page container mx-auto p-4 lg:p-0">
                {!order ? (
                    <LoadingMessage message={"Loading Order"} />
                ) : (
                    <>
                        <div className="grid grid-cols-12 mt-8">
                            <div className="col-span-12 text-center">
                                <h1 className="font-bold text-4xl">Status: {order.statusText}</h1>
                            </div>
                            <div className="col-span-12 mt-8">
                                <div className="grid grid-cols-12">
                                    {order.products.map((item) => {
                                        return (
                                            <BagItemRow key={item.id} product={item.product} />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
};

OrderPage.propTypes = {
    orderId: PropTypes.any.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        orderId: ownProps.match.params.orderId
    };
};


export default connect(mapStateToProps)(OrderPage);
