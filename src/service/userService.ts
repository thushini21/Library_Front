import type {formUser, LibraryMemberUserForm, LoginFormUser, VerifyUser} from "../models/User.ts";
import {apiClient_1, apiClient_2} from "./apiClient.ts";

export const saveUser = async (user: formUser) => {
    const response = await apiClient_1.post("/users/register", user);
    console.log("return response data",response.data);
    return response.data;

}
export const loginUser = async (user: LoginFormUser):Promise<string> => {
    console.log("user in login service",user);
    const response = await apiClient_1.post("/users/login", user);
    console.log("return response data",response.data);
    return response.data.token;

}


export const verifyUserService = async (user: VerifyUser) => {
    const response = await apiClient_1.post("/users/verifyCode", user);
    console.log("return response data",response.data);
    return response.data;

}

export const getUser = async (user: LoginFormUser) => {
    const response = await apiClient_1.post("/users/getUser", user);
    console.log("return response data",response.data);
    return response.data.user;

}
export const getAllUser = async () => {
    const response = await apiClient_2.get("/users/getAllUser");
    console.log("return response data",response.data);
    return response.data;

}
export const addUserMember = async (user: LibraryMemberUserForm) => {
    const response = await apiClient_2.post("/users/addUser", user);
    console.log("return response data",response.data);
    return response.data;

}
export const updateUserMember = async (user: LibraryMemberUserForm) => {
    const response = await apiClient_2.put("/users/updateUser", user);
    console.log("return response data",response.data);
    return response.data;

}
export const deleteUserMember = async (user: LibraryMemberUserForm) => {
    const response = await apiClient_2.post("/users/deleteUser", user);
    console.log("return response data",response.data);
    return response.data;

}