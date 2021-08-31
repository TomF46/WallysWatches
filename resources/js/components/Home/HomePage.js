import React from "react";
import { Link } from "react-router-dom";
import Showcase from "../DisplayComponents/Showcase/Showcase";
import SplashImage from "../DisplayComponents/SplashImage";

const HomePage = () => {
    const images = [
        { id: 1, name: "Fossil 10 atm", price: 2500, stock: 10, url: "https://wallys-watches.s3.eu-west-2.amazonaws.com/products/fabian-heimann-4R_WEmhx8og-unsplash.jpg" },
        { id: 2, name: "Rolex Oyster", price: 5000, stock: 2, url: "https://wallys-watches.s3.eu-west-2.amazonaws.com/products/john-torcasio-133Vq4tTpBQ-unsplash.jpg" },
        { id: 3, name: "Omega Seamaster", price: 1999, stock: 1, url: "https://wallys-watches.s3.eu-west-2.amazonaws.com/products/john-torcasio-TJrkkhdB39E-unsplash.jpg" }
    ]
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
                    <Showcase images={images} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
