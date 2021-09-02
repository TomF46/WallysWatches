import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BagItemRow from "./BagItemRow";
import MoneyFormat from "../DisplayComponents/MoneyFormat";

const BagPage = ({ bag }) => {

    function getTotalPrice() {
        return bag.map(item => item.price).reduce((prev, next) => Number(prev) + Number(next));
    }

    return (
        <div className="bag-page container mx-auto p-4 lg:p-0">
            <div>
                <h1 className="font-bold text-3xl text-center my-8">Bag</h1>
            </div>
            {bag.length < 1 ? (
                <p className="text-center">You do not currently have any items in your bag</p>
            ) : (
                <>
                    <div className="grid grid-cols-12">
                        <div className="col-span-8">
                            <div className="grid grid-cols-12">
                                {bag.map((product) => {
                                    return (
                                        <BagItemRow product={product} />
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="rounded overflow-hidden shadow-lg pointer p-4">
                                <p className="font-bold text-center my-2">Summary</p>
                                {bag.map((product) => {
                                    return (
                                        <p>{product.name}: <MoneyFormat value={product.price} /> </p>
                                    )
                                })}
                                <p className="font-bold">Total: <MoneyFormat value={getTotalPrice()} /></p>
                                <button
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

    );
};

BagPage.propTypes = {
    bag: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        bag: state.bag
    };
};

const mapDispatchToProps = {
    //
};

export default connect(mapStateToProps, mapDispatchToProps)(BagPage);

