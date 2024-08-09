import axios, { AxiosError } from "axios";
import { store } from "../store";
import { logout } from "../store/authSlice";
import { showToast } from "../store/toastSlice";
import { BACKEND_URL } from "./constants";
const http = axios.create();
http.defaults.baseURL = BACKEND_URL;
http.defaults.headers.common["Content-Type"] = "application/json";
http.interceptors.request.use(
  function (config) {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    if (error) {
      console.log("🚀 ~ error:", error.response?.data);
    }
    if (error.response?.status === 401) {
      // useToastStore.setState({ message: "Vui lòng đăng nhập để tiếp tục", type: "error" });
      // localStorage.removeItem("token");
      // useAuthStore.setState({ token: null });
      // window.location.href = "/";
      // store.dispatch(setAuth({ token: null, role: null }));
      store.dispatch(logout());
      store.dispatch(showToast({ message: "Đăng nhập để tiếp tục", type: "warning" }));
    }
    if (error.response?.status === 404) {
      //   useToastStore.setState({ message: JSON.stringify(error), type: "error" });
      window.location.href = "/404";
    }
    return Promise.reject(error);
  }
);
export default http;
