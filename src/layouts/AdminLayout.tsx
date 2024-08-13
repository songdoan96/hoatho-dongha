import { Link, Outlet } from "react-router-dom";

export default function NestedList() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <div className="w-full md:w-2/12 bg-gray-100">
        <ul className="flex flex-row md:flex-col  flex-wrap gap-2 p-2">
          <Link to="/admin">Welcome</Link>
          <Link to="/admin/lich-lam-viec">Lịch làm việc</Link>
        </ul>
      </div>
      <div className="p-2 w-full">
        <Outlet />
      </div>
    </div>
  );
}
