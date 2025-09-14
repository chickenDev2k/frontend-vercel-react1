import { data } from "react-router-dom";
import axios from "./axios.customize";
const BASE_URL = await import.meta.env.VITE_BACKEND_URL;
const getAllBookAPI = async (current, pageSize) => {
    const token = localStorage.getItem("access_token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
    const res = await axios.get(URL_BACKEND, config);
    return res.data;
};
const handleUploadFile = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`;
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data",
        },
    };
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file);

    return axios.post(URL_BACKEND, bodyFormData, config);
};
const createBookAPI = async (title, author, price, quantity, category, thumbnail) => {
    const token = localStorage.getItem("access_token");
    const data = {
        thumbnail: thumbnail,
        mainText: title,
        author: author,
        price: price,
        quantity: quantity,
        category: category,
    };
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const URL_BACKEND = `/api/v1/book`;
    const res = await axios.post(URL_BACKEND, data, config);
    return res.data;
};
const updateBookAPI = async (title, author, price, quantity, category, thumbnail, id) => {
    const token = localStorage.getItem("access_token");
    const data = {
        _id: id,
        thumbnail: thumbnail,
        mainText: title,
        author: author,
        price: price,
        quantity: quantity,
        category: category,
    };
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const URL_BACKEND = `/api/v1/book`;
    const res = await axios.put(URL_BACKEND, data, config);
    return res.data;
};

const deleteBookAPI = async (id) => {
    const token = localStorage.getItem("access_token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const URL_BACKEND = `/api/v1/book/${id}`;
    const res = await axios.delete(URL_BACKEND, config);
    return res.data;
};
export { getAllBookAPI, handleUploadFile, createBookAPI, updateBookAPI, deleteBookAPI };
