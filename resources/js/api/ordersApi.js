import axiosClient from "../tools/axiosClient";

export function addOrder(order) {
    return axiosClient
        .post("/api/orders", order)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

export function getOrderById(id) {
    return axiosClient
        .get(`/api/orders/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function searchOrders(filters) {
    return axiosClient
        .post(`/api/orders/search`, filters)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function searchOrdersWithPagination(url, filters) {
    return axiosClient
        .post(url, filters)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}