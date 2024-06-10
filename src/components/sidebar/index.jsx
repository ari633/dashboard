import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const linkClass =
    "block my-2 py-2.5 px-2 rounded-md transition duration-200 hover:bg-indigo-600 hover:text-white";
  const activeClass = "bg-indigo-600 text-white";

  const getClassName = ({ isActive }) =>
    `${linkClass} ${isActive ? activeClass : "text-gray-500"}`;

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <nav>
        <NavLink to="/" className={getClassName}>
          <FontAwesomeIcon icon={faCoffee} /> Dashboard
        </NavLink>
        <NavLink to="/companies" className={getClassName}>
          <span className="block flex justify-between items-center">
            <span>
              <FontAwesomeIcon icon={faCoffee} /> Companies{" "}
            </span>{" "}
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </NavLink>
      </nav>
    </>
  );
}
