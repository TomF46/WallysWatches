import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _, { debounce } from 'lodash';
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";
import { searchBrands, searchBrandsWithPagination } from "../../../../api/brandsApi";
import BrandsGridWithPagination from "./BrandsGrid/BrandsGridWithPagination";
import BrandSearchForm from "./BrandsSearchForm";

const BrandsManagementPage = () => {
    const [brandsPaginator, setBrandsPaginator] = useState(null);
    const [filters, setFilters] = useState({ name: "" });


    useEffect(() => {
        if (!brandsPaginator) {
            search();
        }
    }, [brandsPaginator])

    useEffect(() => {
        let debounced = debounce(
            () => { search(); }, 50
        );

        debounced();
    }, [filters])

    function search() {
        searchBrands(filters).then(brandsData => {
            setBrandsPaginator(brandsData);
        }).catch(error => {
            toast.error("Error getting brands " + error.message, {
                autoClose: false,
            });
        });
    }

    function getBrandPage(pageUrl) {
        searchBrandsWithPagination(pageUrl, filters).then(brandsData => {
            setBrandsPaginator(brandsData);
        }).catch(error => {
            toast.error("Error getting brands " + error.message, {
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
        <div className="brand-management-page">
            <div className="bg-secondary mb-8">
                <h1 className="font-bold text-3xl text-center items-center py-4">Brand &amp; Brand Management</h1>
            </div>
            <div className="container mx-auto p-4 lg:p-0">
                <p className="text-center">In this area you can add new brands, if you want to add a new brand select the brand you want to add it to and add it on that brands brand addition page.</p>
            </div>
            <div className="container mx-auto mt-8">
                {!brandsPaginator ? (
                    <LoadingMessage message={'Loading brands'} />
                ) : (
                    <>
                        <BrandSearchForm filters={filters} onFilterChange={handleFilterChange} />
                        <div>
                            {brandsPaginator.total > 0 ? (
                                <BrandsGridWithPagination paginationData={brandsPaginator} onPageChange={getBrandPage} />
                            ) : (
                                <p className="text-center">No brands match your search</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BrandsManagementPage;
