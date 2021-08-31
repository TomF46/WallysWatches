import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProductGridItem from "./ProductGridItem";

const ProductsGrid = ({ products }) => {
    return (
        <div className="grid grid-cols-12">
            {products && (
                products.map((product) => {
                    return (
                        <ProductGridItem key={product.id} product={product} />
                    )
                })
            )}
        </div>
    );
};

ProductsGrid.propTypes = {
    products: PropTypes.array.isRequired,
};

export default ProductsGrid;
