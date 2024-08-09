import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PLHome from "./pages/PL/PLHome";
import { RootState } from "./store";
import { hideToast } from "./store/toastSlice";
import Welcome from "./pages/Welcome";
import ADHome from "./pages/ADMIN/ADHome";
import PublicLayout from "./layouts/PublicLayout";
import PrivateRoute from "./layouts/PrivateRoute";
import PLLayout from "./layouts/PLLayout";
import AdminLayout from "./layouts/AdminLayout";
import NotFound from "./pages/NotFound";

export default function App() {
  const { show, message, type } = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<PublicLayout />} />
        <Route index path="/chao-mung" element={<Welcome />} />
        <Route element={<PrivateRoute />}>
          <Route path="/phu-lieu" element={<PLLayout />}>
            <Route index element={<PLHome />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<ADHome />} />
          </Route>
        </Route>
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={show}
        autoHideDuration={3000}
        onClose={() => dispatch(hideToast())}
      >
        <Alert
          onClose={() => dispatch(hideToast())}
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </BrowserRouter>
  );
}
