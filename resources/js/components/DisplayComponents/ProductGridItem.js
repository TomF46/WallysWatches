import React from "react";
import PropTypes from "prop-types";
import MoneyFormat from "./MoneyFormat";
import history from "../../history";

const ProductGridItem = ({ product, asAdmin }) => {

    function view() {
        let link = asAdmin ? `/admin/brands/${product.brand.id}/${product.id}/edit` : `/products/${product.id}`;
        history.push(link)
    }

    return (
        <div className="showcase-item col-span-4 my-4">
            <div className="max-w-sm rounded overflow-hidden shadow-lg pointer mx-4 hover:opacity-75" onClick={() => { view() }}>
                <div className="h-64 bg-cover hover:bg-gray" style={{ backgroundImage: `url(${product.images[0]})` }}></div>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl">{product.fullName}</div>
                    <div className="font-bold text-gray text-l mb-2"><MoneyFormat value={product.price} /></div>
                </div>
            </div>
        </div>
    );
};

ProductGridItem.propTypes = {
    product: PropTypes.object.isRequired,
    asAdmin: PropTypes.bool.isRequired
};

export default ProductGridItem;
