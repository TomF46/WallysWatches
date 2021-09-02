import React from "react";
import PropTypes from "prop-types";
import TextInput from "../FormComponents/TextInput";
import MoneyInput from "../FormComponents/MoneyInput";

const ProductSearchForm = ({ filters, onFilterChange }) => {
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
            <div className="col-span-6 px-8 py-4">
                <TextInput
                    name="productCode"
                    label="Product Code"
                    value={filters.producrCode}
                    onChange={onFilterChange}
                />
            </div>
            <div className="col-span-6 px-8 py-4">
                <div className="grid grid-cols-12">
                    <div className="col-span-6 pr-2">
                        <MoneyInput
                            name="minCost"
                            label="Min Cost (£)"
                            value={filters.minCost}
                            onChange={onFilterChange}
                        />
                    </div>
                    <div className="col-span-6 pl-2">
                        <MoneyInput
                            name="maxCost"
                            label="Max Cost (£)"
                            value={filters.maxCost}
                            onChange={onFilterChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductSearchForm.propTypes = {
    filters: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired
};

export default ProductSearchForm;
