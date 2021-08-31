import React from "react";
import PropTypes from "prop-types";

const SplashImage = ({ url }) => {
    return (
        <div className="splash-container">
            <img src={url} alt="splash image" className="splash-image" />
        </div>
    );
};

SplashImage.propTypes = {
    url: PropTypes.string.isRequired,
};

export default SplashImage;
