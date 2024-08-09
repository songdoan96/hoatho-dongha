import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { showToast } from "../../store/toastSlice";
import http from "../../utils/http";
import { BACKEND_IMAGE, BACKEND_URL } from "../../utils/constants";

interface ImageType {
  _id: string;
  image: string;
  active: boolean;
}
function AdminHome() {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const { isPending, data } = useQuery({
    queryKey: ["welcomeImages"],
    queryFn: async () => await http.get("/admin/welcome"),
  });

  // console.log("🚀 ~ AdminHome ~ data:", data);
  const mutation = useMutation({
    mutationFn: (formData) => {
      return http.post("/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (response) => {
      dispatch(showToast({ message: response.data.message }));
    },
    onError: (error) => {
      dispatch(
        showToast({
          message: error.response.data.message,
          type: "error",
        })
      );
    },
  });
  function handleUploadSubmit() {
    const formData = new FormData();
    formData.append("file", file);
    mutation.mutate(formData);
  }
  function handleChangeFile(e) {
    setFile(e.target.files[0]);
  }

  const handleToggle = (value: string) => () => {
    console.log("🚀 ~ handleToggle ~ value:", value);
  };

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
              <div className="w-1/2 flex p-2 gap-2" key={image._id}>
                <img
                  src={BACKEND_IMAGE + image.image}
                  alt={image.image}
                  className="h-20 w-40 bg-cover bg-no-repeat object-cover"
                />
                <Checkbox onChange={handleToggle(image._id)} checked={image.active} />
                <Button
                  className="inline-block text-red-500 mt-2"
                  variant="text"
                  startIcon={<DeleteIcon />}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default AdminHome;
