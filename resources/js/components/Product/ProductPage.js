import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingMessage from "../DisplayComponents/LoadingMessage";
import { getProductById } from "../../api/productsApi";
import MoneyFormat from "../DisplayComponents/MoneyFormat";
import { addItemToBag } from "../../redux/actions/bagActions";
import { saveBag } from "../../tools/localStorage";


const ProductPage = ({ productId, addItemToBag, bag }) => {
    const [product, setProduct] = useState(null);
    const [displayedImage, setDisplayedImage] = useState(null);

    useEffect(() => {
        if (!product) {
            getProduct();
        }
    }, [productId, product])

    useEffect(() => {
        saveBag(bag);
    }, [bag])

    function getProduct() {
        getProductById(productId).then(productData => {
            setProduct(productData);
            setDisplayedImage(productData.images[0]);
        }).catch(error => {
            toast.error("Error getting product " + error.message, {
                autoClose: false,
            });
        });
    }

    function handleAddToBag() {
        addItemToBag(product);
        toast.success("Item added to bag");
    }

    return (
        <>
            <div className="bg-secondary mb-8">
                <h1 className="font-bold text-3xl text-center items-center py-4">{product && (`${product.name}`)}</h1>
            </div>
            <div className="produt-page container mx-auto p-4 lg:p-0">
                {!product ? (
                    <LoadingMessage message={"Loading Product"} />
                ) : (
                    <div className="grid grid-cols-12 mt-16">
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="font-bold text-2xl">{product.name}</h3>
                            <p className="font-bold text-gray"><MoneyFormat value={product.price} /></p>
                            <p>{product.stock} Remaining</p>
                            <p className="mt-8">{product.description}</p>
                            <button
                                onClick={handleAddToBag}
                                className="bg-secondary text-primary hover:opacity-75 text-sm md:px-4 md:py-2 md:leading-none rounded inline-flex items-center mx-auto my-8"
                            >
                                <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="ml-1">Add to bag</span>
                            </button>
                        </div>
                        <div className="col-span-12 md:col-span-6 pl-4">
                            {displayedImage && (
                                <img className="product-image" src={displayedImage} />
                            )}
                            {product.images.length > 1 && (
                                <div className="image-reel grid grid-cols-12 gap-4 mt-16 px-8">
                                    {product.images.map((image, index) => {
                                        return (
                                            index > 0 && (
                                                <div className="h-32 bg-cover hover:opacity-75 col-span-2" style={{ backgroundImage: `url(${image})` }} onMouseEnter={() => setDisplayedImage(image)}
                                                    onMouseLeave={() => setDisplayedImage(product.images[0])}></div>
                                            )
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="col-span-12 bg-secondary my-16 p-4 rounded overflow-hidden shadow-lg">
                            <h3 className="font-bold text-2xl">{product.brand.name}</h3>
                            <p className="mt-2">{product.brand.description}</p>
                            <h3 className="font-bold text-2xl mt-4">Warranty</h3>
                            <p className="mt-2">All items are covered by their manufacturer's by default, please get in touch during this period if you need help and we will direct you to the correct place. For more information about each manufacturer's warranty please see their own website.</p>
                            <h3 className="font-bold text-2xl mt-4">Returns</h3>
                            <p className="mt-2">Refunds can be requested within 21 days of the despatch date, exchanges are allowed within 60 days of despatch. If you exchange your item outside of the 21 day refund policy, a refund will not be offered for the item unless the product is faulty.</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
};

ProductPage.propTypes = {
    productId: PropTypes.any.isRequired,
    bag: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        productId: ownProps.match.params.productId,
        bag: state.bag
    };
};

const mapDispatchToProps = {
    addItemToBag
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
