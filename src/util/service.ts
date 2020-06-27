/* eslint-disable no-console */
import axios from 'axios';

export const service = axios.create({
    baseURL: process.env.API_URL,
    timeout: 50000,
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.error('Request error:', error);
        Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.error('Response error:' + error);
        return Promise.reject(error);
    }
);

const baseUrl = process.env.REACT_APP_API_URL;
console.log(process.env.NODE_ENV);
console.log(baseUrl);

export const endpoints = {
    GET_USER: `${baseUrl}/getUser`,
};
