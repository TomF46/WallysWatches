import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ProductForm from "./ProductForm";
import { addProduct, editProduct, getProductById, storeProductImage } from "../../../../api/productsApi";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";

const ManageProductPage = ({ brandId, productId, history }) => {
    const [product, setProduct] = useState({
        name: "",
        brand_id: brandId,
        productCode: "",
        description: "",
        price: 0,
        stock: 0,
        images: []
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (productId) {
            getProduct();
        } else {
            setLoaded(true);
        }
    }, [productId]);

    function getProduct() {
        getProductById(productId)
            .then(data => {
                setProduct({ ...data });
                setLoaded(true);
            })
            .catch(error => {
                toast.error(
                    "Error fetching product" + error.message,
                    {
                        autoClose: false
                    }
                );
            });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    }

    function formIsValid() {
        const { name, productCode, description, stock, price } = product;
        const errors = {};
        if (!name) errors.name = "Name is required";
        if (!productCode) errors.productCode = "ProductCode is required";
        if (!description) errors.description = "Description is required";
        if (!stock) errors.stock = "Stock is required";
        if (!price) errors.price = "Price is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        productId ? edit() : add();
    }

    function formatErrorText(error) {
        let errorText = '';

        for (const [key, value] of Object.entries(error.data.errors)) {
            errorText = `${errorText} ${value}`;
        }

        return errorText;
    }

    function add() {
        addProduct(product).then(response => {
            toast.success("Successfully Added!");
            history.push(`/admin/products/${response.data.id}`);
        }).catch(err => {
            setSaving(false);
            toast.error(formatErrorText(err), {
                autoClose: false,
            });
        });
    }

    function edit() {
        editProduct(product).then(response => {
            toast.success("Successfully Edited!");
            history.push(`/admin/products/${response.id}`);
        }).catch(err => {
            setSaving(false);
            toast.error(formatErrorText(err), {
                autoClose: false,
            });
        });
    }

    function handleImageUpload(event) {
        let file = event.target.files[0];
        storeProductImage(file).then(res => {
            toast.success("Sucessfully uploaded image");
            let productClone = { ...product };
            productClone.images.push(res.path);
            setProduct(productClone);
        }).catch(error => {
            setIsUpploadingImage(false);
            toast.error("Unable to uploaded image");
        });
    }

    return (
        <div className="add-product-page">
            <div className="bg-secondary mb-8">
                <h1 className="font-bold text-3xl text-center items-center py-4">{productId ? "Edit" : "Add"} product</h1>
            </div>

            <div className="container mx-auto p-4 lg:p-0">
                {!loaded ? (
                    <div className="shadow page">
                        <LoadingMessage message={"Loading form"} />
                    </div>
                ) : (
                    <ProductForm
                        product={product}
                        errors={errors}
                        onChange={handleChange}
                        onImageUpload={handleImageUpload}
                        onSave={handleSave}
                        saving={saving}
                    />
                )}

            </div>
        </div>
    );
};

ManageProductPage.propTypes = {
    brandId: PropTypes.any,
    productId: PropTypes.any
};

const mapStateToProps = (state, ownProps) => {
    return {
        brandId: ownProps.match.params.brandId,
        productId: ownProps.match.params.productId,
    };
};

export default connect(mapStateToProps)(ManageProductPage);
