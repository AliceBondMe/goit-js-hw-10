import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_zswM3I9IS45JR0W5JmKPkVlwdX25NxDCThEx5v85FFlS7bLvE4bVuMN6Bh8ujkbT";

const BASE_URL = "https://api.thecatapi.com/v1/";
const BREEDS_ENDPOINT = "breeds";
const SEARCH_ENDPOINT = "images/search";

export function fetchBreeds() {
    return fetch(`${BASE_URL}${BREEDS_ENDPOINT}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}

export function fetchCatByBreed(breedId) {
    return axios.get(`${BASE_URL}${SEARCH_ENDPOINT}?breed_ids=${breedId}&has_breeds=1`)
        .then(response => response.data)
}

