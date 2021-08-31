import axiosClient from "../tools/axiosClient";

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
