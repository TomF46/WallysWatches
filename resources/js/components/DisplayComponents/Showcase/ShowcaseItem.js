import React from "react";
import PropTypes from "prop-types";
import MoneyFormat from "../MoneyFormat";

const ShowcaseItem = ({ product }) => {
    return (
        <div className="showcase-item flex-1">
            <div className="max-w-sm rounded overflow-hidden shadow-lg pointer">
                <div className="h-64 bg-cover hover:bg-gray" style={{ backgroundImage: `url(${product.images[0].url})` }}></div>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl">{product.name}</div>
                    <div className="font-bold text-gray text-l mb-2"><MoneyFormat value={product.price} /></div>
                </div>
            </div>
        </div>
    );
};

ShowcaseItem.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ShowcaseItem;
