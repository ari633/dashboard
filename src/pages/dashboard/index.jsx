/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Card from "../../components/card";
import CardCompany from "../../components/card-company";
import { useMyData } from "../../hooks/useDataCompany";
import { getAllCompanies } from "../../services/companies";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";
import { useLoader } from "../../context/Loader";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const {
    query: { error, isPending },
    categoryCount,
    totalCompanies,
    totalActiveCompanies,
    totalInactiveCompanies,
    percentageIndonesiaCompany,
    totalIndonesiaCompany,
    top6ActiveCompanies,
  } = useMyData("companies", getAllCompanies());
  const {setIsLoading, setIsError} = useLoader();
  useEffect(() => {
    setIsLoading(isPending);
    setIsError(error);
  })
  if (isPending || error) return <></>;

  const dataCompanies = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        label: "Companies",
        data: [totalActiveCompanies, totalInactiveCompanies],
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(255, 206, 86, 1)"],
      },
    ],
  };

  const dataCategories = {
    labels: Object.keys(categoryCount),
    datasets: [
      {
        label: "Categories",
        data: Object.values(categoryCount),
        backgroundColor: Object.keys(categoryCount).map(
          () =>
            `rgba(${Math.random() * 255},${Math.random() * 255}, ${
              Math.random() * 255
            }, ${Math.random() * 255})`
        ),
      },
    ],
  };

  return (
    <div>
      <ChartSection
        dataCompanies={dataCompanies}
        dataCategories={dataCategories}
        totalCompanies={totalCompanies}
        totalIndonesiaCompany={totalIndonesiaCompany}
        percentageIndonesiaCompany={percentageIndonesiaCompany}
      />
      <Card>
        <h1 className="font-semibold text-lg">Big 6 Active Companies</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {top6ActiveCompanies.map((item, idx) => (
            <CardCompany
              key={`card_company_dashbard${idx}`}
              address={item.address}
              employees={item.employees}
              image={item.image}
              name={item.name}
              country={item.country}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};



const ChartSection = ({
  dataCompanies,
  dataCategories,
  totalCompanies,
  totalIndonesiaCompany,
  percentageIndonesiaCompany,
}) => (
  <div className="pb-10">
    <div className="grid md:grid-cols-3 grid-cols-1 gap-8 md:gap-4">
      <ChartCard
        title="Active vs Inactive"
        data={dataCompanies}
        ChartComponent={Pie}
      />
      <ChartCard
        title="Categories"
        data={dataCategories}
        ChartComponent={Doughnut}
      />
      <IndonesianCompaniesCard
        totalCompanies={totalCompanies}
        totalIndonesiaCompany={totalIndonesiaCompany}
        percentageIndonesiaCompany={percentageIndonesiaCompany}
      />
    </div>
  </div>
);

const ChartCard = ({ title, data, ChartComponent }) => (
  <div className="p-6 w-full bg-white rounded-xl border border-gray-300">
    <h3 className="uppercase text-gray-500 text-center">{title}</h3>
    <ChartComponent data={data} />
  </div>
);

const IndonesianCompaniesCard = ({
  totalCompanies,
  totalIndonesiaCompany,
  percentageIndonesiaCompany,
}) => (
  <div className="p-6 w-full bg-white rounded-xl border border-gray-300 ">
    <h3 className="uppercase text-gray-500 text-center">
      Indonesian Companies
    </h3>
    <div className="flex flex-col justify-center items-center h-full">
      <h3 className="font-semibold text-4xl">{percentageIndonesiaCompany}%</h3>
      <div className="text-gray-500 font-semibold mt-4">
        ({totalIndonesiaCompany} of {totalCompanies})
      </div>
    </div>
  </div>
);

export default Dashboard;
