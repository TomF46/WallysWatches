import React from "react";
import PropTypes from "prop-types";
import ShowcaseItem from "./ShowcaseItem";

const Showcase = ({ images }) => {
    return (
        <div className="showcase flex">
            {images.map((image) => {
                return (
                    <ShowcaseItem key={image.id} image={image} />
                )
            })}
        </div>
    );
};

Showcase.propTypes = {
    images: PropTypes.array.isRequired,
};

export default Showcase;
