import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { addBrand, editBrand, getBrandById, storeBrandLogo } from "../../../../../api/brandsApi";
import BrandForm from "./BrandForm";
import LoadingMessage from "../../../../DisplayComponents/LoadingMessage";
import { editUser } from "../../../../../api/usersApi";

const ManageBrandPage = ({ brandId, history }) => {
    const [brand, setBrand] = useState({
        name: "",
        description: "",
        logo_url: null
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (brandId) {
            getBrand();
        } else {
            setLoaded(true);
        }
    }, [brandId]);

    function getBrand() {
        getBrandById(brandId)
            .then(data => {
                setBrand({ ...data });
                setLoaded(true);
            })
            .catch(error => {
                toast.error(
                    "Error fetching brand" + error.message,
                    {
                        autoClose: false
                    }
                );
            });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setBrand(prevBrand => ({
            ...prevBrand,
            [name]: value
        }));
    }

    function formIsValid() {
        const { name, description, logo_url } = brand;
        const errors = {};
        if (!name) errors.name = "Name is required";
        if (!description) errors.description = "Description is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        if (!brand.logo_url) {
            toast.error("A logo must be added for this brand", {
                autoClose: false,
            })
            return;
        }
        setSaving(true);
        brandId ? edit() : add();
    }

    function formatErrorText(error) {
        let errorText = '';

        for (const [key, value] of Object.entries(error.data.errors)) {
            errorText = `${errorText} ${value}`;
        }

        return errorText;
    }

    function add() {
        addBrand(brand).then(response => {
            toast.success("Successfully Added!");
            history.push(`/admin/brands/${response.data.id}`);
        }).catch(err => {
            setSaving(false);
            toast.error(formatErrorText(err), {
                autoClose: false,
            });
        });
    }

    function edit() {
        editBrand(brand).then(response => {
            toast.success("Successfully Edited!");
            history.push(`/admin/brands/${response.id}`);
        }).catch(err => {
            setSaving(false);
            toast.error(formatErrorText(err), {
                autoClose: false,
            });
        });
    }

    function handleImageUpload(event) {
        let file = event.target.files[0];
        storeBrandLogo(file).then(res => {
            toast.success("Sucessfully uploaded image");
            setBrand(prevBrand => ({
                ...prevBrand,
                logo_url: res.path
            }));
        }).catch(error => {
            setIsUpploadingImage(false);
            toast.error("Unable to uploaded image");
        });
    }

    return (
        <div className="add-brand-page">
            <div className="bg-secondary mb-8">
                <h1 className="font-bold text-3xl text-center items-center py-4">{brandId ? "Edit" : "Add"} brand</h1>
            </div>

            <div className="container mx-auto p-4 lg:p-0">
                {!loaded ? (
                    <div className="shadow page">
                        <LoadingMessage message={"Loading form"} />
                    </div>
                ) : (
                    <BrandForm
                        brand={brand}
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

ManageBrandPage.propTypes = {
    brandId: PropTypes.any
};

const mapStateToProps = (state, ownProps) => {
    return {
        brandId: ownProps.match.params.brandId,
    };
};

export default connect(mapStateToProps)(ManageBrandPage);
