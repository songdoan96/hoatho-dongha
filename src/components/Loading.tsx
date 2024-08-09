import { CircularProgress } from "@mui/material";

function Loading({ full }: { full?: boolean }) {
  return (
    <div className={`${full ? "h-screen" : "h-full"} w-full flex justify-center items-center`}>
      <CircularProgress />
    </div>
  );
}

export default Loading;
