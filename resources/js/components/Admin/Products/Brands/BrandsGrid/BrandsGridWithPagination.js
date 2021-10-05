import React from "react";
import PropTypes from "prop-types";
import BrandsGrid from "./BrandsGrid";
import PaginationControls from "../../../../DisplayComponents/PaginationControls";


const BrandsGridWithPagination = ({ paginationData, onPageChange }) => {
    return (
        <div className="brands-grid-w-pagination">
            <BrandsGrid brands={paginationData.data} />
            <PaginationControls to={paginationData.to} from={paginationData.from} of={paginationData.total} onNext={() => onPageChange(paginationData.next_page_url)} onPrevious={() => onPageChange(paginationData.prev_page_url)} currentPage={paginationData.current_page} lastPage={paginationData.last_page} />
        </div>
    );
};

BrandsGridWithPagination.propTypes = {
    paginationData: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default BrandsGridWithPagination;
