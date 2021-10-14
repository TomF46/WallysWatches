import React from "react";
import PropTypes from "prop-types";

const CheckoutModal = ({ onCheckout, onCancel }) => {
    return (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none" id="modal-id">
            <div className="absolute opacity-40 inset-0 z-0"></div>
            <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-secondary ">
                <div className="">
                    <div className="text-center p-5 flex-auto justify-center">
                        <h2 className="text-xl font-bold pb-2">Checkout</h2>
                        <p>This application was not created with the goal of having a real or sandboxed checkout system, to complete your order please confirm your checkout or press cancel to go back.</p>
                    </div>
                    <div className="p-3  mt-2 text-center space-x-4 md:block">
                        <div className="flex flex-col w-6/12 mx-auto">
                            <button
                                onClick={onCheckout}
                                className="bg-primary text-secondary hover:opacity-75 text-center  text-lg md:px-4 md:py-2 md:leading-none rounded mx-auto my-2 w-full"
                            >
                                Checkout
                            </button>
                            <button
                                onClick={onCancel}
                                className="bg-primary text-secondary hover:opacity-75 text-center  text-lg md:px-4 md:py-2 md:leading-none rounded mx-auto my-2 w-full"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CheckoutModal.propTypes = {
    onCheckout: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default CheckoutModal;
