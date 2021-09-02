import React from "react";
import PropTypes from "prop-types";
import history from "../../history";
import MoneyFormat from "../DisplayComponents/MoneyFormat";

const BagItemRow = ({ product }) => {

    function view() {
        history.push(`/products/${product.id}`)
    }

    return (
        <div className="col-span-12 rounded overflow-hidden shadow-lg pointer mx-4 mb-2">
            <div className="grid grid-cols-12">
                <div className="col-span-2 h-32 bg-cover  hover:bg-gray" style={{ backgroundImage: `url(${product.images[0].url})` }}></div>
                <div className="cold-span-10 p-4">
                    <div className="font-bold text-xl">{product.name}</div>
                    <div className="font-bold text-gray"><MoneyFormat value={product.price} /></div>
                </div>
            </div>
        </div>
    );
};

BagItemRow.propTypes = {
    product: PropTypes.object.isRequired,
};

export default BagItemRow;
