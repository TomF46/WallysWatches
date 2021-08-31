import React from "react";
import PropTypes from "prop-types";
import TextInput from "../FormComponents/TextInput";

const ProductSearchForm = ({ filters, onFilterChange }) => {
    return (
        <div className="grid grid-cols-12 overflow-hidden shadow page mx-4 my-8">
            <div className="col-span-6 p-8">
                <TextInput
                    name="name"
                    label="Name"
                    value={filters.name}
                    onChange={onFilterChange}
                />
            </div>
            <div className="col-span-6 p-8">
                <TextInput
                    name="productCode"
                    label="Product Code"
                    value={filters.producrCode}
                    onChange={onFilterChange}
                />
            </div>
        </div>
    );
};

ProductSearchForm.propTypes = {
    filters: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired
};

export default ProductSearchForm;
