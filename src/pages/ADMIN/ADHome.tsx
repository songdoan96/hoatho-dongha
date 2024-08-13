import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { showToast } from "../../store/toastSlice";
import axiosErrorMessage from "../../utils/axiosError";
import { BACKEND_IMAGE } from "../../utils/constants";
import http from "../../utils/http";

interface ImageType {
  _id: string;
  image: string;
  active: boolean;
}
function AdminHome() {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();

  const { isPending, data, refetch } = useQuery({
    queryKey: ["welcomeImages"],
    queryFn: async () => await http.get("/admin/welcome"),
  });

  const uploadMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return http.post("/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (response) => {
      dispatch(showToast({ message: response.data.message }));
      refetch();
    },
    onError: (error: AxiosError) => {
      dispatch(
        showToast({
          message: axiosErrorMessage(error),
          type: "error",
        })
      );
    },
  });

  const changeActiveMutation = useMutation({
    mutationFn: async (id: string) => await http.post("/admin/upload/" + id),
    onSuccess: (response) => {
      dispatch(showToast({ message: response.data.message }));
      refetch();
    },
    onError: (error: AxiosError) => {
      dispatch(
        showToast({
          message: axiosErrorMessage(error),
          type: "error",
        })
      );
      refetch();
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (id: string) => await http.delete("/admin/upload/" + id),
    onSuccess: (response) => {
      dispatch(showToast({ message: response.data.message }));
      refetch();
    },
    onError: (error: AxiosError) => {
      dispatch(
        showToast({
          message: axiosErrorMessage(error),
          type: "error",
        })
      );
      refetch();
    },
  });

  function handleChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  }
  function handleUploadSubmit() {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      uploadMutation.mutate(formData);
    }
  }
  function handleToggle(id: string) {
    changeActiveMutation.mutate(id);
  }
  function handleDelete(id: string) {
    deleteImageMutation.mutate(id);
  }

  if (isPending) {
    return <Loading full />;
  }

  return (
    <div className="flex flex-col">
      <div>
        <input type="file" accept="image/*" onChange={handleChangeFile} />
        <Button variant="contained" onClick={handleUploadSubmit}>
          Upload
        </Button>
      </div>

      {data?.data && (
        <div className="flex flex-wrap mt-4">
          {data?.data &&
            data.data.images.map((image: ImageType) => (
              <div className="w-full md:w-1/2 flex items-center p-2 gap-2" key={image._id}>
                <img
                  src={BACKEND_IMAGE + image.image}
                  alt={image.image}
                  className="h-20 w-40 bg-cover bg-no-repeat object-cover"
                />
                <Checkbox onChange={() => handleToggle(image._id)} checked={image.active} />
                <IconButton
                  className="text-red-500"
                  onClick={() => {
                    if (confirm("Xóa ảnh này ?")) handleDelete(image._id);
                  }}
                >
                  <Delete />
                </IconButton>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default AdminHome;
