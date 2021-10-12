import React from "react";
import PropTypes from "prop-types";
import MoneyInput from "../../../FormComponents/MoneyInput";
import NumberInput from "../../../FormComponents/NumberInput";
import TextInput from "../../../FormComponents/TextInput";
import TextAreaInput from "../../../FormComponents/TextAreaInput";
import ImageManagementModal from "../../../DisplayComponents/ImageManagementModal";

const ProductForm = ({
    product,
    onSave,
    onChange,
    onImageUpload,
    saving = false,
    errors = {},
    selectedImageOrdinal,
    onImageSelected,
    onModalClosed,
    onImageRemoved,
    onImageMadePrimary
}) => {
    return (
        <>
            <form className="" onSubmit={onSave}>
                <div>
                    <div className="card shadow-md rounded-md p-8">
                        <div>
                            {errors.onSave && (
                                <div className="text-red-500 text-xs p-1" role="alert">
                                    {errors.onSave}
                                </div>
                            )}

                            <div className="mb-6">
                                <TextInput
                                    name="name"
                                    label="Name"
                                    value={product.name}
                                    onChange={onChange}
                                    error={errors.name}
                                />
                            </div>

                            <div className="mb-6">
                                <TextInput
                                    name="productCode"
                                    label="Product Code"
                                    value={product.productCode}
                                    onChange={onChange}
                                    error={errors.productCode}
                                />
                            </div>

                            <div className="mb-6">
                                <TextAreaInput
                                    name="description"
                                    label="Description"
                                    value={product.description}
                                    onChange={onChange}
                                    error={errors.description}
                                    required={true}
                                />
                            </div>

                            <div className="mb-6">
                                <MoneyInput
                                    name="price"
                                    label="Sale price (£)"
                                    value={product.price}
                                    onChange={onChange}
                                    error={errors.price}
                                />
                            </div>

                            <div className="mb-6">
                                <NumberInput
                                    name="stock"
                                    label="Stock"
                                    value={product.stock}
                                    onChange={onChange}
                                    error={errors.stock}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card shadow-md rounded-md p-8 mt-4">
                        <h2 className="font-bold text-2xl text-center items-center py-4">Product Images</h2>
                        {product.images && (
                            product.images.map((image, ordinal) => {
                                return (
                                    <div key={ordinal} className="my-4">
                                        <div className="flex content-center">
                                            <div className="flex-1">
                                                <img src={image} alt="product-image" className="md:max-w-md m-auto hover:opacity-75 pointer" onClick={() => onImageSelected(ordinal)} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                        <div className="flex items-center">
                            <label className="bg-primary text-secondary rounded py-2 px-4 hover:opacity-75 inline-flex items-center m-auto">
                                Add Images
                                <input
                                    type="file"
                                    name="product_image"
                                    className="border-gray-400 p-2 w-full hidden"
                                    onChange={(e) => onImageUpload(e)}

                                />
                            </label>
                        </div>
                    </div>
                    <div className="card shadow-md rounded-md p-8 my-4">
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-secondary text-primary rounded py-2 px-4 hover:opacity-75 inline-flex items-center"
                            >
                                <svg className="text-primary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span>{product.id ? (saving ? "Editing..." : "Edit") : (saving ? "Adding..." : "Add")}</span>
                            </button>
                        </div>
                    </div>

                </div>
            </form>
            {selectedImageOrdinal != null && (
                <ImageManagementModal selectedImageOrdinal={selectedImageOrdinal} onCancel={onModalClosed} onRemoveImage={onImageRemoved} onMakePrimaryImage={onImageMadePrimary} />
            )}
        </>
    );
};

ProductForm.propTypes = {
    product: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onImageUpload: PropTypes.func.isRequired,
    onImageSelected: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    selectedImageOrdinal: PropTypes.any,
    onModalClosed: PropTypes.func.isRequired,
    onImageRemoved: PropTypes.func.isRequired,
    onImageMadePrimary: PropTypes.func.isRequired
};

export default ProductForm;
