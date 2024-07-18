export const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "/api/auth";
export const USER_ROUTES = "/api/user";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO_ROUTE = `${USER_ROUTES}/user-info`;
export const UPDATE_USER_INFO_ROUTE = `${USER_ROUTES}/update-user-info`;
export const UPDATE_USER_PROFILE_PIC_ROUTE = `${USER_ROUTES}/update-user-profile-image`;
export const DELETE_USER_PROFILE_PIC_ROUTE = `${USER_ROUTES}/delete-user-profile-image`;
