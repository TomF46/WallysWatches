import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BagItemRow from "./BagItemRow";
import MoneyFormat from "../DisplayComponents/MoneyFormat";
import CheckoutModal from "../DisplayComponents/CheckoutModal";
import { addOrder } from "../../api/ordersApi";
import { toast } from "react-toastify";
import { removeAllItemsFromBag } from "../../redux/actions/bagActions";
import { saveBag } from "../../tools/localStorage";

const BagPage = ({ bag, removeAllItemsFromBag, history }) => {
    const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

    useEffect(() => {
        saveBag(bag);
    }, [bag])

    function getTotalPrice() {
        return bag.map(item => item.price).reduce((prev, next) => Number(prev) + Number(next));
    }

    function handleCheckout() {
        let products = bag.map(item => { return { id: item.id, quantity: 1 } });
        let order = { orderItems: products }
        addOrder(order).then(res => {
            removeAllItemsFromBag();
            // TODO Go to order info page
            history.push("/");
        }).catch(error => {
            toast.error("Error during checkout" + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <>
            <div className="bg-secondary mb-8">
                <h1 className="font-bold text-3xl text-center items-center py-4">Bag</h1>
            </div>
            <div className="bag-page container mx-auto p-4 lg:p-0">
                {bag.length < 1 ? (
                    <p className="text-center">You do not currently have any items in your bag</p>
                ) : (
                    <>
                        <div className="grid grid-cols-12">
                            <div className="col-span-8">
                                <div className="grid grid-cols-12">
                                    {bag.map((product) => {
                                        return (
                                            <BagItemRow key={product.id} product={product} />
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="rounded overflow-hidden shadow-lg pointer p-4">
                                    <p className="font-bold text-center my-2">Summary</p>
                                    {bag.map((product) => {
                                        return (
                                            <p key={product.id}>{product.fullName}: <MoneyFormat value={product.price} /> </p>
                                        )
                                    })}
                                    <p className="font-bold">Total: <MoneyFormat value={getTotalPrice()} /></p>
                                    <button
                                        onClick={() => { setCheckoutModalOpen(true) }}
                                        className="bg-primary text-secondary hover:opacity-75  text-lg md:px-4 md:py-2 md:leading-none rounded inline-flex items-center my-2"
                                    >
                                        <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span className="ml-1">Checkout</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {checkoutModalOpen && (
                <CheckoutModal onCheckout={handleCheckout} onCancel={() => { setCheckoutModalOpen(false) }} />
            )}
        </>

    );
};

BagPage.propTypes = {
    bag: PropTypes.array.isRequired,
    removeAllItemsFromBag: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        bag: state.bag
    };
};

const mapDispatchToProps = {
    removeAllItemsFromBag
};

export default connect(mapStateToProps, mapDispatchToProps)(BagPage);

