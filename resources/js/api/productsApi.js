import axiosClient from "../tools/axiosClient";

export function addProduct(product) {
    return axiosClient
        .post("/api/products", product)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

export function editProduct(product) {
    return axiosClient
        .put(`/api/products/${product.id}`, product)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

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

export function storeProductImage(image) {
    const data = new FormData();
    data.append('file', image);
    return axiosClient
        .post("/api/productImages", data)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}
