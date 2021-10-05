import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../../FormComponents/TextInput";

const BrandSearchForm = ({ filters, onFilterChange }) => {
    return (
        <div className="grid grid-cols-12 overflow-hidden shadow page mx-4 my-8">
            <div className="col-span-6 px-8 py-4">
                <TextInput
                    name="name"
                    label="Name"
                    value={filters.name}
                    onChange={onFilterChange}
                />
            </div>
        </div>
    );
};

BrandSearchForm.propTypes = {
    filters: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired
};

export default BrandSearchForm;
