import React from "react";
import PropTypes from "prop-types";

const ShowcaseItem = ({ image }) => {
    return (
        <div className="showcase-item flex-1">
            <div class="max-w-sm rounded overflow-hidden shadow-lg pointer">
                {/* <img src={image.url} alt="showcase image" className="showcase-image w-full object-cover" /> */}
                <div class="h-64 bg-cover hover:bg-gray" style={{ backgroundImage: `url(${image.url})` }}></div>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl">{image.name}</div>
                    <div class="font-bold text-gray text-l mb-2">£{image.price}</div>
                </div>
            </div>
        </div>
    );
};

ShowcaseItem.propTypes = {
    image: PropTypes.object.isRequired,
};

export default ShowcaseItem;
