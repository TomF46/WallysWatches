import React from "react";
import PropTypes from "prop-types";
import PaginationControls from "./PaginationControls";
import ProductsGrid from "./ProductsGrid";


const ProductsGridWithPagination = ({ paginationData, onPageChange, asAdmin }) => {
    return (
        <div className="products-grid-w-pagination">
            <ProductsGrid products={paginationData.data} asAdmin={asAdmin} />
            <PaginationControls to={paginationData.to} from={paginationData.from} of={paginationData.total} onNext={() => onPageChange(paginationData.next_page_url)} onPrevious={() => onPageChange(paginationData.prev_page_url)} currentPage={paginationData.current_page} lastPage={paginationData.last_page} />
        </div>
    );
};

ProductsGridWithPagination.propTypes = {
    paginationData: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
    asAdmin: PropTypes.bool.isRequired
};

export default ProductsGridWithPagination;
