/* eslint-disable react/prop-types */
import { useEffect, useState, useReducer } from "react";
import AnalyticCard from "../../components/card-analytic";
import Card from "../../components/card";
import {
  faArrowUp,
  faHome,
  faUser,
  faComputer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMyData } from "../../hooks/useDataCompany";
import { getAllCompanies } from "../../services/companies";
import Table from "../../components/table";
import useDebounce from "../../hooks/useDebounce";
import { Link } from "react-router-dom";
import { StatusBadge } from "../../components/badge";
import { companyDataReducer } from "../../reducers/companydata";
import { useLoader } from "../../context/Loader";
import Pdf from "../../components/pdf";

const RenderPrefix = ({ className, children }) => (
  <span className={className}>{children}</span>
);

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [status, setStatus] = useState("All");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {
    query: { data, error, isPending },
    totalEmployee,
    totalCompanies,
    totalActiveCompanies,
    totalInactiveCompanies,
    totalEmployeeInactiveCompany,
    percentageActiveInactive,
    activeCompanies,
    inactiveCompanies,
  } = useMyData("companies", getAllCompanies());

  const [companyData, dispatch] = useReducer(companyDataReducer, data);
  const { setIsLoading, setIsError } = useLoader();

  useEffect(() => {
    setIsLoading(isPending);
    setIsError(error);
  });

  useEffect(() => {
    dispatch({
      type: "filter",
      searchTerm: debouncedSearchTerm,
      sortOption: sortOption,
      feedData: data,
      status: status,
    });
    console.log("sortOption", sortOption)
  }, [debouncedSearchTerm, data, sortOption, status]);

  const columns = [
    {
      label: "Company Name",
      display: (item) => (
        <Link
          to={`/companies/${item.id}`}
          className="block max-w-44 truncate text-ellipsis ..."
        >
          {item.name}
        </Link>
      ),
    },
    {
      label: "Address",
      display: (item) => (
        <span className="block max-w-44 truncate text-ellipsis ...">
          {item.address}
        </span>
      ),
    },
    {
      label: "Employee Number",
      display: (item) => <span>{item.employees}</span>,
    },
    {
      label: "Category",
      display: (item) => <span>{item.category}</span>,
    },
    {
      label: "Country",
      display: (item) => (
        <span className="block max-w-44 truncate text-ellipsis ...">
          {item.country}
        </span>
      ),
    },
    {
      label: "Status",
      display: (item) => <StatusBadge status={item.status} />,
    },
  ];

  return (
    <div>
      <div className="pb-10">
        <Card>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-8 md:gap-1">
            <AnalyticCard
              amount={totalCompanies}
              prefix={
                <RenderPrefix className="text-green-600">
                  <FontAwesomeIcon icon={faArrowUp} /> 16%
                </RenderPrefix>
              }
              subfix="this month"
              label="Total Company"
              icon={faHome}
              isRightBorder
            />
            <AnalyticCard
              amount={totalEmployee}
              prefix={
                <RenderPrefix className="font-semibold">
                  {totalEmployeeInactiveCompany}
                </RenderPrefix>
              }
              subfix="are in inactive companies"
              label="Total Employee"
              icon={faUser}
              isRightBorder
            />
            <AnalyticCard
              amount={totalActiveCompanies}
              prefix={
                <RenderPrefix className="font-semibold">
                  {percentageActiveInactive}%
                </RenderPrefix>
              }
              subfix="this month"
              label="Total Company"
              icon={faComputer}
            />
          </div>
        </Card>
      </div>
      <Card>
        <div className="flex flex-col md:flex-row md:justify-between">
          <h1 className="font-semibold text-lg">Companies</h1>
          <div className="space-x-4">
            <input
              type="text"
              placeholder="Filter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 p-2 rounded-md"
            />
            <div className="inline rounded-md bg-gray-100 p-2">
              <span className="text-gray-400">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent"
              >
                <option value="name">Name</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="space-x-4">
            <button
              className={`font-bold ${
                status === "All" ? "text-green-600 underline" : "text-gray-500"
              }`}
              onClick={() => setStatus("All")}
            >
              All ({totalCompanies})
            </button>
            <button
              className={`font-bold ${
                status === "Active"
                  ? "text-green-600 underline"
                  : "text-gray-500"
              }`}
              onClick={() => setStatus("Active")}
            >
              Active ({totalActiveCompanies})
            </button>
            <button
              className={`font-bold ${
                status === "Inactive"
                  ? "text-green-600 underline"
                  : "text-gray-500"
              }`}
              onClick={() => setStatus("Inactive")}
            >
              Inactive ({totalInactiveCompanies})
            </button>
          </div>
          {data && (
            <Pdf
              data={() => {
                if (status === "Active") {
                  return activeCompanies;
                } else if (status === "Inactive") {
                  return inactiveCompanies;
                } else {
                  return data;
                }
              }}
              status={status}
            />
          )}
        </div>
        <Table data={companyData} itemsPerPage={8} columns={columns} />
      </Card>
    </div>
  );
}
