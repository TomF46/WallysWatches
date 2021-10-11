import axiosClient from "../tools/axiosClient";

export function addBrand(brand) {
    return axiosClient
        .post("/api/brands", brand)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

export function editBrand(brand) {
    return axiosClient
        .put(`/api/brands/${brand.id}`, brand)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

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

export function storeBrandLogo(image) {
    const data = new FormData();
    data.append('file', image);
    return axiosClient
        .post("/api/brandLogos", data)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}