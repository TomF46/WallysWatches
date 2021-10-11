import React from "react";
import PropTypes from "prop-types";
import MoneyInput from "../../../FormComponents/MoneyInput";
import NumberInput from "../../../FormComponents/NumberInput";
import TextInput from "../../../FormComponents/TextInput";
import TextAreaInput from "../../../FormComponents/TextAreaInput";

const ProductForm = ({
    product,
    onSave,
    onChange,
    onImageUpload,
    saving = false,
    errors = {}
}) => {
    return (
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
                                required="true"
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


                        <label className="bg-primary text-secondary rounded py-2 px-4 hover:opacity-75 inline-flex items-center">
                            Add Images
                            <input
                                type="file"
                                name="product_image"
                                className="border-gray-400 p-2 w-full hidden"
                                onChange={(e) => onImageUpload(e)}

                            />
                        </label>

                        {product.images && (
                            product.images.map((image) => {
                                return (
                                    <div className="mb-2">
                                        <img src={image} alt="product-image" className="md:max-w-md m-auto" />
                                    </div>
                                )
                            })
                        )}

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
            </div>
        </form>
    );
};

ProductForm.propTypes = {
    product: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onImageUpload: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default ProductForm;
