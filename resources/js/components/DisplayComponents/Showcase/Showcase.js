import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ShowcaseItem from "./ShowcaseItem";
import { getShowcase } from "../../../api/productsApi";
import { toast } from "react-toastify";

const Showcase = ({ }) => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        if (!products) {
            getShowcase().then(showcaseData => {
                setProducts(showcaseData);
            }).catch(error => {
                toast.error("Error getting showcase " + error.message, {
                    autoClose: false,
                });
            });
        }
    }, products)

    return (
        <div className="showcase flex">
            {products && (
                products.map((product) => {
                    return (
                        <ShowcaseItem key={product.id} product={product} />
                    )
                })
            )}
        </div>
    );
};

export default Showcase;
