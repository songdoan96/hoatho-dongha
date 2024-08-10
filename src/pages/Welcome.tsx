import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { BACKEND_IMAGE } from "../utils/constants";
import http from "../utils/http";
import { formatDate } from "../utils/DateTimeFormat";

// const INTERVAL = 1000; //1m
const INTERVAL = 1 * 60 * 1000; //1m
interface ScheduleType {
  _id: string;
  date: Date;
  done: boolean;
  content: string;
}
function Welcome() {
  const [index, setIndex] = useState(0);
  const { data, isFetching } = useQuery({
    queryKey: ["getImages"],
    queryFn: async () => await http.get("/welcome/images"),
  });
  const scheduleQuery = useQuery({
    queryKey: ["getSchedules"],
    queryFn: async () => await http.get("/welcome/schedules"),
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
    <div className="overflow-hidden">
      {scheduleQuery.data?.data.schedules.length && (
        <article className="bg-black text-3xl text-white overflow-hidden whitespace-nowrap w-screen flex">
          <ul
            style={{
              display: "flex",
              padding: 0,
              animationName: "marquee",
              animationIterationCount: "infinite",
              animationDuration: scheduleQuery.data?.data.schedules.length * 10 + "s",
              animationTimingFunction: "linear",
            }}
          >
            {scheduleQuery.data?.data.schedules.map((schedule: ScheduleType) => (
              <li style={{ marginLeft: "100vw" }} key={schedule._id}>
                {formatDate(schedule.date)}: {schedule.content}
              </li>
            ))}
          </ul>
        </article>
      )}

      {/* {scheduleQuery.data?.data.schedules && (
        <div className="overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap uppercase text-3xl font-extrabold">
            {scheduleQuery.data?.data.schedules.map((schedule) => (
              <span className="py-2 ml-12" key={schedule._id}>
                &bull; {schedule.content}
              </span>
            ))}
          </div>
        </div>
      )} */}

      {data?.data.images.length > 0 && (
        <img
          className="w-full h-full object-cover bg-no-repeat bg-center"
          key={data?.data.images[index]._id}
          src={BACKEND_IMAGE + data?.data.images[index].image}
          alt="Image from database"
        />
      )}
    </div>
  );
}

export default Welcome;
