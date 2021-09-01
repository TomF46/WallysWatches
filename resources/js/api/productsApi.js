import axiosClient from "../tools/axiosClient";

export function getProductById(id) {
    return axiosClient
        .get(`/api/products/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function searchProducts(filters) {
    return axiosClient
        .post(`/api/products/search`, filters)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function searchProductsWithPagination(url, filters) {
    return axiosClient
        .post(url, filters)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getShowcase() {
    return axiosClient
        .get("/api/products/showcase")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        });
}
