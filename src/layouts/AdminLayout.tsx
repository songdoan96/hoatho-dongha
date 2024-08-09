import { Link, Outlet } from "react-router-dom";

export default function NestedList() {
  return (
    <div className="flex h-screen w-full">
      <div className="w-2/12 bg-gray-100">
        <ul>
          <Link to="/admin">Welcome</Link>
        </ul>
      </div>
      <div className="p-2 w-full">
        <Outlet />
      </div>
    </div>
  );
}
