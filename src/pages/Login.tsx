import { ExitToAppOutlined, LockOutlined } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { setAuth } from "../store/authSlice";
import { showToast } from "../store/toastSlice";
import http from "../utils/http";
import { routes } from "../utils/routes";
import axiosErrorMessage from "../utils/axiosError";
function Login() {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.role) {
      routes.map((route) => route.role === auth.role && navigate(route.path));
    }
    setLoading(false);
  }, [auth.role, navigate]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  const mutation = useMutation({
    mutationFn: () => {
      return http.post("/auth/login", formData);
    },
    onSuccess: (data) => {
      dispatch(showToast({ message: data.data.message }));
      dispatch(
        setAuth({
          token: data.data.data.token,
          role: data.data.data.role,
        })
      );
      routes.map((route) => route.role === data.data.data.role && navigate(route.path));
    },
    onError: (error: AxiosError) => {
      setError(axiosErrorMessage(error));
    },
  });
  if (loading) {
    return null;
  }
  return (
    <div className="bg-[#EDF2F7] h-screen flex justify-center items-center">
      <div className="bg-white flex flex-col justify-center p-6 gap-6 mx-4 w-full md:mx-0 md:w-[500px]">
        <div className="flex flex-col justify-center items-center gap-4">
          <LockOutlined color="primary" fontSize="large" className="text-5xl" />
          <h1 className="uppercase font-semibold">Đăng nhập</h1>
        </div>
        <div
          className="flex flex-col gap-6"
          onSubmit={() => {
            setError("");
            mutation.mutate();
          }}
        >
          {error && (
            <div className="w-full md:w-full">
              <Alert severity="error" onClose={() => setError("")}>
                {error}
              </Alert>
            </div>
          )}
          <TextField
            size="small"
            type="text"
            error={false}
            id="username"
            name="username"
            label="Tài khoản"
            className="w-full"
            onChange={handleChange}
          />
          <TextField
            size="small"
            type="password"
            error={false}
            id="password"
            name="password"
            label="Mật khẩu"
            className="w-full"
            onChange={handleChange}
          />
          <LoadingButton
            type="submit"
            loading={mutation.isPending}
            loadingPosition="center"
            startIcon={<ExitToAppOutlined />}
            variant="contained"
            className="w-full transition hover:scale-95"
            onClick={() => {
              setError("");
              mutation.mutate();
            }}
          >
            Đăng nhập
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}

export default Login;
