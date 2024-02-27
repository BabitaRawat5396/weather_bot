const BASE_URL = "http://localhost:4000/api/v1";

export const endpoints = {
  LOGIN_API: BASE_URL + "/auth/login",
  GET_ALL_USERS_API: BASE_URL + "/admin/getAllUsers",
  DELETE_USER_API: BASE_URL + "/admin/deleteUser",
  GET_ALL_APIS_API: BASE_URL + "/apikeys/getAllAPI",
  UPDATE_API_API: BASE_URL + "/apiKeys/updateAPI",
  DELETE_API_API: BASE_URL + "/apiKeys/deleteAPI",
  GET_FREQUENCIES: BASE_URL + "/frequency/getFrequencies",
  UPDATE_FREQUENCIES: BASE_URL + "/frequency/updateFrequencies",
};
