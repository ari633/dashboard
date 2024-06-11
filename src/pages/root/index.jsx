import { Header } from "../../components/header";
import Sidebar from "../../components/sidebar";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="flex h-screen bg-gray-200">
      <div className="p-4 space-y-4 overflow-y-scroll bg-white w-64 h-full">
        <Sidebar />
      </div>
      <div className="px-10 py-4 w-full overflow-auto">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
