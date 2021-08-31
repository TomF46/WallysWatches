import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { searchProducts, searchProductsWithPagination } from "../../api/productsApi";
import { toast } from "react-toastify";
import _, { debounce } from 'lodash';
import LoadingMessage from "../DisplayComponents/LoadingMessage";
import ProductsGridWithPagination from "../DisplayComponents/ProductsGridWithPagination";
import ProductSearchForm from "./ProductSearchForm";

const ProductsPage = () => {
    const [productsPaginator, setProductsPaginator] = useState(null);
    const [filters, setFilters] = useState({ name: "", productCode: "" });


    useEffect(() => {
        if (!productsPaginator) {
            search();
        }
    }, [productsPaginator])

    useEffect(() => {
        let debounced = debounce(
            () => { search(); }, 50
        );

        debounced();
    }, [filters])

    function search() {
        searchProducts(filters).then(productsData => {
            console.log(productsData);
            setProductsPaginator(productsData);
        }).catch(error => {
            toast.error("Error getting products " + error.message, {
                autoClose: false,
            });
        });
    }

    function getProductPage(pageUrl) {
        searchProductsWithPagination(pageUrl, filters).then(productsData => {
            setProductsPaginator(productsData);
        }).catch(error => {
            toast.error("Error getting products " + error.message, {
                autoClose: false,
            });
        });
    }

    function handleFilterChange(event) {
        const { name, value } = event.target;

        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    }

    return (
        <div className="products-page container mx-auto p-4 lg:p-0">
            {!productsPaginator ? (
                <LoadingMessage message={'Loading products to explore'} />
            ) : (
                <>
                    <ProductSearchForm filters={filters} onFilterChange={handleFilterChange} />
                    <div>
                        {productsPaginator.total > 0 ? (
                            <ProductsGridWithPagination paginationData={productsPaginator} onPageChange={getProductPage} />
                        ) : (
                            <p className="text-center">No products match your search</p>
                        )}
                    </div>
                </>
            )}
        </div>

    );
};

export default ProductsPage;
