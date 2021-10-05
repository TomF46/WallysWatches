import React, { useState } from "react";
import { toast } from "react-toastify";
import { AddBrand } from "../../../../../api/brandsApi";
import BrandForm from "./BrandForm";

const AddBrandPage = ({ history }) => {
    const [brand, setBrand] = useState({
        name: "",
        description: "",
        logo_url: "https://via.placeholder.com/150"
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

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
        setSaving(true);
        AddBrand(brand).then(response => {
            console.log(response);
            toast.success("Successfully Added!");
            history.push(`/admin/brands/${response.data.id}`);
        }).catch(err => {
            setSaving(false);
            toast.error(formatErrorText(err), {
                autoClose: false,
            });
        });
    }

    function formatErrorText(error) {
        let errorText = '';

        for (const [key, value] of Object.entries(error.data.errors)) {
            errorText = `${errorText} ${value}`;
        }

        return errorText;
    }

    return (
        <div className="add-brand-page">
            <div className="bg-secondary mb-8">
                <h1 className="font-bold text-3xl text-center items-center py-4">Add brand</h1>
            </div>
            <div className="container mx-auto p-4 lg:p-0">
                <BrandForm
                    brand={brand}
                    errors={errors}
                    onChange={handleChange}
                    onSave={handleSave}
                    saving={saving}
                />
            </div>
        </div>
    );
};

export default AddBrandPage;
