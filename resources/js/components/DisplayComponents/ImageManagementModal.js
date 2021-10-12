import React from "react";
import PropTypes from "prop-types";

const ImageManagementModal = ({ selectedImageOrdinal, onMakePrimaryImage, onRemoveImage, onCancel }) => {
    return (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none" id="modal-id">
            <div className="absolute opacity-40 inset-0 z-0"></div>
            <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-secondary ">
                <div className="">
                    <div className="text-center p-5 flex-auto justify-center">
                        <h2 className="text-xl font-bold pb-2">Actions</h2>
                    </div>
                    <div className="p-3  mt-2 text-center space-x-4 md:block">
                        <div class="flex flex-col w-6/12 mx-auto">
                            <button
                                onClick={onMakePrimaryImage}
                                className="bg-primary text-secondary hover:opacity-75 text-center  text-lg md:px-4 md:py-2 md:leading-none rounded mx-auto my-2 w-full"
                            >
                                Make primary
                            </button>
                            <button
                                onClick={onRemoveImage}
                                className="bg-primary text-secondary hover:opacity-75 text-center  text-lg md:px-4 md:py-2 md:leading-none rounded mx-auto my-2 w-full"
                            >
                                Remove
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

ImageManagementModal.propTypes = {
    selectedImageOrdinal: PropTypes.number.isRequired,
    onCancel: PropTypes.func.isRequired,
    onRemoveImage: PropTypes.func.isRequired,
    onMakePrimaryImage: PropTypes.func.isRequired
};

export default ImageManagementModal;
