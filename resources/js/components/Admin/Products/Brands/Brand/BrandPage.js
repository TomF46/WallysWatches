import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingMessage from "../../../../DisplayComponents/LoadingMessage";
import { getBrandById, getBrandProducts, getBrandProductsPage } from "../../../../../api/brandsApi";
import ProductsGridWithPagination from "../../../../DisplayComponents/ProductsGridWithPagination";

const BrandPage = ({ brandId }) => {
    const [brand, setBrand] = useState(null);
    const [productsPaginator, setProductsPaginator] = useState(null);


    useEffect(() => {
        if (!brand) {
            getBrand();
        }
    }, [brandId, brand])

    function getBrand() {
        getBrandById(brandId).then(brandData => {
            setBrand(brandData);
            getProducts();
        }).catch(error => {
            toast.error("Error getting brand " + error.message, {
                autoClose: false,
            });
        });
    }

    function getProducts() {
        getBrandProducts(brandId).then(productsData => {
            setProductsPaginator(productsData);
        }).catch(error => {
            toast.error("Error getting products " + error.message, {
                autoClose: false,
            });
        });
    }

    function getBrandProductsByPage(url) {
        getBrandProductsPage(url).then(productsData => {
            setProductsPaginator(productsData);
        }).catch(error => {
            toast.error("Error getting products " + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <>
            <div className="bg-secondary mb-8">
                <h1 className="font-bold text-3xl text-center items-center py-4">{brand ? brand.name : "Loading..."}</h1>
            </div>
            <div className="brand-page container mx-auto p-4 lg:p-0">
                {!brand ? (
                    <LoadingMessage message={"Loading Brand"} />
                ) : (
                    <>
                        <div className="grid grid-cols-12 mt-8">
                            <div className="col-span-12">
                                {brand.logo_url && (
                                    <div>
                                        <img src={brand.logo_url} alt="brand-logo" className="md:max-w-md m-auto" />
                                        {/* <p className="text-red-400 font-bold pointer inline hover:text-red-500" onClick={() => onRemoveImage(questionIndex)}>Remove image</p> */}
                                    </div>
                                )}
                            </div>
                            <div className="col-span-12 text-center">
                                <h1 className="font-bold text-4xl">{brand.name}</h1>
                                <p className="mt-8">{brand.description}</p>
                            </div>
                        </div>
                        <div className="mx-auto mt-16">
                            {!productsPaginator ? (
                                <LoadingMessage message={'Loading products'} />
                            ) : (
                                <div>
                                    {productsPaginator.total > 0 ? (
                                        <ProductsGridWithPagination paginationData={productsPaginator} onPageChange={getBrandProductsByPage} asAdmin={true} />
                                    ) : (
                                        <p className="text-center">{brand.name} doesn't currently have any available products</p>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center">
                            <Link
                                to={`/admin/brands/${brand.id}/edit`}
                                className="bg-secondary text-primary hover:opacity-75 text-center  text-lg md:px-4 md:py-2 md:leading-none rounded inline-flex items-center mx-auto my-4 "
                            >
                                <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="ml-1">Edit {brand.name}</span>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </>
    )
};

BrandPage.propTypes = {
    brandId: PropTypes.any.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        brandId: ownProps.match.params.brandId
    };
};


export default connect(mapStateToProps)(BrandPage);
