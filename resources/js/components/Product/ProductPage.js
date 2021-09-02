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
        <div className="produt-page container mx-auto p-4 lg:p-0">
            {!product ? (
                <LoadingMessage message={"Loading Product"} />
            ) : (
                <div className="grid grid-cols-12 mt-16">
                    <div className="col-span-12 md:col-span-4">
                        <h3 className="font-bold text-2xl">{product.name}</h3>
                        <p className="font-bold text-gray"><MoneyFormat value={product.price} /></p>
                        <p>{product.stock} Remaining</p>
                        <p className="mt-8">{product.description}</p>
                        <button
                            onClick={handleAddToBag}
                            className="bg-primary text-secondary hover:opacity-75 text-sm md:px-4 md:py-2 md:leading-none rounded inline-flex items-center mx-auto my-8"
                        >
                            <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="ml-1">Add to bag</span>
                        </button>
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        {displayedImage && (
                            <img className="product-image" src={displayedImage.url} />
                        )}
                        {product.images.length > 1 && (
                            <div className="image-reel grid grid-cols-12 gap-4 mt-16 px-8">
                                {product.images.map((image, index) => {
                                    return (
                                        index > 0 && (
                                            <div className="h-32 bg-cover hover:opacity-75 col-span-2" style={{ backgroundImage: `url(${image.url})` }} onMouseEnter={() => setDisplayedImage(image)}
                                                onMouseLeave={() => setDisplayedImage(product.images[0])}></div>
                                        )
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
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
