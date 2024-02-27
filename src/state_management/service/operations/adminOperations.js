import { setUsers } from "../../slice/adminSlice";
import { endpoints } from "../api";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";

const { GET_ALL_USERS_API, DELETE_USER_API } = endpoints;

export function getAllUsers(token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", GET_ALL_USERS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      console.log("GET_ALL_USERS_API_RESPONSE............", response);
      dispatch(setUsers(response.data.users));
      // toast.success("All Users fetched successfully");
    } catch (error) {
      console.log("GET_ALL_USERS_API_ERROR............", error);
      toast.error(error.message);
    }
  };
}

export function deleteUser(userId) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("DELETE", DELETE_USER_API, userId);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setUsers(response.data.users));
      toast.success("User deleted Successfully");
    } catch (error) {
      console.log("DELETE_USER_API_ERROR", error);
      toast.error("Unable to delete user");
    }
  };
}
