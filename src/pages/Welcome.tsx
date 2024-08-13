import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { BACKEND_IMAGE } from "../utils/constants";
import http from "../utils/http";
import { formatDate } from "../utils/DateTimeFormat";

const INTERVAL = 3000; //1m
// const INTERVAL = 1 * 60 * 1000; //1m
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
      {scheduleQuery.data?.data.schedules.length > 0 && (
        <article className="bg-[#0163C6]  text-[#ededed] text-lg font-black md:text-3xl overflow-hidden whitespace-nowrap w-screen flex">
          <ul
            className="text-marquee"
            style={{
              display: "flex",
              padding: 0,
              animationDuration: scheduleQuery.data?.data.schedules.length * 20 + "s",
            }}
          >
            {scheduleQuery.data?.data.schedules.map((schedule: ScheduleType) => (
              <li
                className="md:py-1"
                style={{ marginLeft: "calc(100vw / 3)", listStyleType: "none" }}
                key={schedule._id}
              >
                &bull; {formatDate(schedule.date)}: {schedule.content}
              </li>
            ))}
          </ul>
        </article>
      )}

      {data?.data.images.length > 0 && (
        <img
          className="w-full h-auto object-cover bg-no-repeat bg-center"
          key={data?.data.images[index]._id}
          src={BACKEND_IMAGE + data?.data.images[index].image}
          alt="Image from database"
        />
      )}
    </div>
  );
}

export default Welcome;
