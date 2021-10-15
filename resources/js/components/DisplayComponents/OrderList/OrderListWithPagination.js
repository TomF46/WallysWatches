import React from "react";
import PropTypes from "prop-types";
import PaginationControls from "../PaginationControls";
import OrderList from "./OrderList";


const OrderListWithPagination = ({ paginationData, onPageChange }) => {
    return (
        <div className="products-grid-w-pagination">
            <OrderList orders={paginationData.data} />
            <PaginationControls to={paginationData.to} from={paginationData.from} of={paginationData.total} onNext={() => onPageChange(paginationData.next_page_url)} onPrevious={() => onPageChange(paginationData.prev_page_url)} currentPage={paginationData.current_page} lastPage={paginationData.last_page} />
        </div>
    );
};

OrderListWithPagination.propTypes = {
    paginationData: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default OrderListWithPagination;
