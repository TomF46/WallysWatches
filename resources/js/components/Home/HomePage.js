import React from "react";
import { Link } from "react-router-dom";
import Showcase from "../DisplayComponents/Showcase/Showcase";
import SplashImage from "../DisplayComponents/SplashImage";

const HomePage = () => {
    return (
        <div className="Home-page">
            <SplashImage url={"https://wallys-watches.s3.eu-west-2.amazonaws.com/Splash2Resized.png"} />
            <div className="container mx-auto px-4 lg:p-0">
                <div className="flex">
                    <Link
                        to={`/products`}
                        className="bg-primary text-sm md:px-4 md:py-2 md:leading-none md:border rounded text-white inline-flex items-center mx-auto my-8"
                    >
                        <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="ml-1">Products</span>
                    </Link>
                </div>
                <div className="mb-8">
                    <Showcase />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
