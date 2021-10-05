import React from "react";
import PropTypes from "prop-types";
import history from "../../../../../history";

const BrandGridItem = ({ brand }) => {

    function view() {
        history.push(`/admin/brands/${brand.id}`)
    }

    return (
        <div className="showcase-item col-span-4 my-4">
            <div className="max-w-sm rounded overflow-hidden shadow-lg pointer mx-4 hover:opacity-75" onClick={() => { view() }}>
                <div className="h-64 bg-cover hover:bg-gray" style={{ backgroundImage: `url(${brand.logoUrl})` }}></div>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl">{brand.name}</div>
                </div>
            </div>
        </div>
    );
};

BrandGridItem.propTypes = {
    brand: PropTypes.object.isRequired,
};

export default BrandGridItem;
