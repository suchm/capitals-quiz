import axios from "axios";

const API_URL = "http://localhost:8000/api";
const ApiPost = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

const ApiGet = axios.create({
    baseURL: `${API_URL}/v1`,
});

export  { ApiPost, ApiGet };
