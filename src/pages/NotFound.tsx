import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">
            404
          </h1>
          <p className="mb-4 text-2xl tracking-tight font-bold text-gray-900 ">
            TRANG TRUY CẬP KHÔNG TỒN TẠI HOẶC BỊ XÓA.
          </p>
          <Button variant="text" onClick={() => navigate(-1)}>
            QUAY LẠI
          </Button>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
