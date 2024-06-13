import { Header } from "../../components/header";
import Sidebar from "../../components/sidebar";
import { Outlet } from "react-router-dom";
import { useLoader } from "../../context/Loader";
import Modal from "../../components/modal";

export default function Root() {
  const {isLoading, isError} = useLoader();

  return (
    <div className="flex md:flex-row flex-col h-screen bg-gray-200">
      <div className="p-4 space-y-4 overflow-y-scroll bg-white md:w-64 md:h-full">
        <Sidebar />
      </div>
      <div className="px-10 py-4 w-full overflow-auto">
        <Header />
        {isLoading && <Modal isOpen>Loading...</Modal>}
        {isError && <Modal isOpen>Something went wrong...</Modal>}
        <Outlet />
      </div>
    </div>
  );
}
