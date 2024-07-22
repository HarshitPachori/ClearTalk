export const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "/api/auth";
export const USER_ROUTES = "/api/user";
export const CONTACT_ROUTES = "/api/contacts";
export const MESSAGE_ROUTES = "/api/messages";

// Auth Routes
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

// User Routes
export const GET_USER_INFO_ROUTE = `${USER_ROUTES}/user-info`;
export const UPDATE_USER_INFO_ROUTE = `${USER_ROUTES}/update-user-info`;
export const UPDATE_USER_PROFILE_PIC_ROUTE = `${USER_ROUTES}/update-user-profile-image`;
export const DELETE_USER_PROFILE_PIC_ROUTE = `${USER_ROUTES}/delete-user-profile-image`;

// Contact Routes
export const SEARCH_CONTACTS_ROUTE = `${CONTACT_ROUTES}/search`;
export const GET_ALL_CONTACTS_FOR_DM_ROUTE = `${CONTACT_ROUTES}/get-contacts-for-dm`;

// Message Routes
export const GET_ALL_MESSAGES_ROUTE = `${MESSAGE_ROUTES}/get-messages`;
export const UPLOAD_FILE_ROUTE = `${MESSAGE_ROUTES}/upload-file`;
