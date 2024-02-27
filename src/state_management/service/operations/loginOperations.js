import toast from "react-hot-toast";
import { setLoading, setToken, setUser } from "../../slice/loginSlice";
import { endpoints } from "../api";
import { apiConnector } from "../apiConnector";

const { LOGIN_API } = endpoints;

export function login(formData, navigate) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("POST", LOGIN_API, formData);

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      if (
        response.data.message === "New user created" ||
        response.data.message === "Redirect to Telegram link"
      ) {
        window.location.href = "https://t.me/weather_update_notify_bot";
        return;
      }
      // console.log(response.data);
      toast.success("Login Successful");
      dispatch(setToken(response.data.token));

      dispatch(setUser({ ...response.data.user }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}
