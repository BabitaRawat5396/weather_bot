import { setFrequency } from "../../slice/frequencySlice";
import { endpoints } from "../api";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";

const { GET_FREQUENCIES, UPDATE_FREQUENCIES } = endpoints;

export function getFrequencies() {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", GET_FREQUENCIES);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setFrequency(response.data.frequencies));
      console.log("GET_FREQUENCIES_RESPONSE", response.data);
    } catch (error) {
      console.log("GET_FREQUENCIES_ERROR", error);
      toast.error(error.message);
    }
  };
}

export function updateFrequencies(formData) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("PUT", UPDATE_FREQUENCIES, formData);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      console.log("UPDATE_FREQUENCIES_RESPONSE", response.data);

      dispatch(setFrequency(response.data.frequencies));
      toast.success("frequency updated successfully");
    } catch (error) {
      console.log("UPDATE_FREQUENCIES_ERROR", error);
      toast.error("Unable to update frequency");
    }
  };
}
