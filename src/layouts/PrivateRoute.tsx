import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import http from "../utils/http";
import Loading from "../components/Loading";

function PrivateRoute() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async function () {
      try {
        await http.get("/auth/me");
      } catch (error) {
        dispatch(logout());
        navigate("/dang-nhap", { replace: true });
      }
    })();

    setLoading(false);
  }, [dispatch, navigate]);

  return loading ? <Loading full /> : <Outlet />;
}

export default PrivateRoute;
