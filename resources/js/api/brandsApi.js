import axiosClient from "../tools/axiosClient";

export function getBrandById(id) {
    return axiosClient
        .get(`/api/brands/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function searchBrands(filters) {
    return axiosClient
        .post(`/api/brands/search`, filters)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function searchBrandsWithPagination(url, filters) {
    return axiosClient
        .post(url, filters)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getBrandProducts(brandId) {
    return axiosClient
        .get(`/api/brands/${brandId}/products`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getBrandProductsPage(url) {
    return axiosClient
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}