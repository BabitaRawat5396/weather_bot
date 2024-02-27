import { setApiKeys } from "../../slice/apiKeySlice";
import { endpoints } from "../api";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";

const { GET_ALL_APIS_API, UPDATE_API_API, DELETE_API_API } = endpoints;

export function getAllAPIs() {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", GET_ALL_APIS_API);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setApiKeys(response.data.apis));
      console.log("GET_ALL_APIS_API_RESPONSE", response.data);
      // toast.success("APIs fetched successfully");
    } catch (error) {
      console.log("GET_ALL_APIS_API_ERROR", error);
      toast.error(error.message);
    }
  };
}

export function updateAPI(apiName, newAPI) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("PUT", UPDATE_API_API, {
        apiKeyName: apiName,
        newApiKey: newAPI,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      console.log("UPDATE_API_API_RESPONSE", response.data);

      dispatch(setApiKeys(response.data.apis));
      toast.success("API updated successfully");
    } catch (error) {
      console.log("UPDATE_API_API_ERROR", error);
      toast.error("Unable to update API");
    }
  };
}

// export function deleteAPI(apiKeyName) {
//   return async (dispatch) => {
//     try {
//       const response = await apiConnector("DELETE", DELETE_API_API, {
//         apiKeyName,
//       });

//       if (!response.data.success) {
//         throw new Error(response.data.message);
//       }

//       dispatch(setApiKeys(response.data.apis));
//       toast.success("API deleted successfully");
//     } catch (error) {
//       console.log("DELETE_API_API_ERROR", error);
//       toast.error("Unable to delete API");
//     }
//   };
// }
