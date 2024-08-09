import { AxiosError } from "axios";

const axiosErrorMessage = (error: AxiosError) => {
  const message: string =
    (error.response?.data as { message?: string })?.message || "Đăng nhập không thành công";
  return message;
};
export default axiosErrorMessage;
