import type {BorrowBook, BorrowBookForm} from "../models/BorrowBook.ts";
import {apiClient_2} from "./apiClient.ts";

export const saveBorrowBook = async(borrowBook:BorrowBookForm)=>{
    const response = await apiClient_2.post("/booksBorrow/saveBorrowBook",borrowBook);
    console.log("return response data",response.data);
    return response.data;
}
//update use parameter to borrowBook
export const updateBorrowBook = async (borrowBook: BorrowBook)=>{
    const response = await apiClient_2.post("/booksBorrow/updateBorrowBook", borrowBook);
    console.log("return response data",response.data);
    return response.data;
}
export const overDueBorrowBook = async (borrowBook: BorrowBook | undefined)=>{
    const response = await apiClient_2.post("/booksBorrow/overDueBorrowBook", borrowBook);
    console.log("return response data",response.data);
    return response.data;
}
export const getAllBorrowBook = async()=>{
    const response = await apiClient_2.get("/booksBorrow/getAll");
    console.log("return response data",response.data);
    return response.data;
}
