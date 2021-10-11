import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProductGridItem from "./ProductGridItem";

const ProductsGrid = ({ products, asAdmin }) => {
    return (
        <div className="grid grid-cols-12">
            {products && (
                products.map((product) => {
                    return (
                        <ProductGridItem key={product.id} product={product} asAdmin={asAdmin} />
                    )
                })
            )}
        </div>
    );
};

ProductsGrid.propTypes = {
    products: PropTypes.array.isRequired,
    asAdmin: PropTypes.bool.isRequired
};

export default ProductsGrid;
