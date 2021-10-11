import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../../../FormComponents/TextInput";
import TextAreaInput from "../../../../FormComponents/TextAreaInput";

const BrandForm = ({
    brand,
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
                                value={brand.name}
                                onChange={onChange}
                                error={errors.name}
                            />
                        </div>
                        <div className="mb-6">
                            <TextAreaInput
                                name="description"
                                label="Description"
                                value={brand.description}
                                onChange={onChange}
                                error={errors.description}
                                required="true"
                            />
                        </div>
                        <label className="bg-primary text-secondary rounded py-2 px-4 hover:opacity-75 inline-flex items-center">
                            {brand.logo_url ? "Edit" : "Add"} Logo
                            <input
                                type="file"
                                name="logo_url"
                                className="border-gray-400 p-2 w-full hidden"
                                onChange={(e) => onImageUpload(e)}

                            />
                        </label>
                        <div className="mb-6">
                            {brand.logo_url && (
                                <div>
                                    <h3 className="font-bold text-xl text-center items-center py-4">Logo</h3>
                                    <img src={brand.logo_url} alt="brand-logo" className="md:max-w-md m-auto" />
                                    {/* <p className="text-red-400 font-bold pointer inline hover:text-red-500" onClick={() => onRemoveImage(questionIndex)}>Remove image</p> */}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-secondary text-primary rounded py-2 px-4 hover:opacity-75 inline-flex items-center"
                            >
                                <svg className="text-primary h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span>{brand.id ? (saving ? "Editing..." : "Edit") : (saving ? "Adding..." : "Add")}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

BrandForm.propTypes = {
    brand: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onImageUpload: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default BrandForm;
