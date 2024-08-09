import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { BACKEND_IMAGE } from "../utils/constants";
import http from "../utils/http";

const INTERVAL = 5 * 60 * 1000; //5p

function Welcome() {
  const [index, setIndex] = useState(0);
  const { data, isFetching } = useQuery({
    queryKey: ["welcome"],
    queryFn: async () => await http.get("/welcome"),
  });

  useEffect(() => {
    setTimeout(() => {
      if (data?.data.images.length) {
        const newIndex = index === data?.data.images.length - 1 ? 0 : index + 1;
        setIndex(newIndex);
      }
    }, INTERVAL);
  }, [data?.data.images.length, index]);

  if (isFetching) {
    return <Loading full />;
  }
  return (
    <div className="flex h-screen justify-center items-center overflow-hidden">
      {data?.data.images.length > 0 ? (
        <img
          className="w-full object-cover bg-no-repeat bg-center"
          key={data?.data.images[index]._id}
          src={BACKEND_IMAGE + data?.data.images[index].image}
          alt="Image from database"
        />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1>Chưa có nội dung thông báo</h1>
        </div>
      )}
    </div>
  );
}

export default Welcome;
