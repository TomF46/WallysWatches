import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BrandGridItem from "./BrandGridItem";

const BrandsGrid = ({ brands }) => {
    return (
        <div className="grid grid-cols-12">
            {brands && (
                brands.map((brand) => {
                    return (
                        <BrandGridItem key={brand.id} brand={brand} />
                    )
                })
            )}
        </div>
    );
};

BrandsGrid.propTypes = {
    brands: PropTypes.array.isRequired,
};

export default BrandsGrid;
