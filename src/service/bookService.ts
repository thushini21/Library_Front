import {apiClient_2} from "./apiClient.ts";
import type {BookForm} from "../models/Books.ts";

export const bookSave = async (book:BookForm) => {
    const response = await apiClient_2.post("/books/addBook",book);
    console.log("return response data",response.data);
    return response.data;
}
export const bookUpdate = async (book:BookForm) => {
    const response = await apiClient_2.put("/books/updateBook",book);
    console.log("return response data",response.data);
    return response.data;
}
export const deleteBook = async (book:BookForm) => {
    const response = await apiClient_2.post("/books/deleteBook",book);
    console.log("return response data",response.data);
    return response.data;
}
export const getAllBook = async () => {
    const response = await apiClient_2.get("/books/getAll");
    console.log("return response data",response.data);
    return response.data;
}
/*
export const getBook = async (book:BookForm) => {
    const response = await apiClient_1.post("/books/addBook",book);
    console.log("return response data",response.data);
    return response.data;
}
*/
