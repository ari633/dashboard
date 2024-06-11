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

export default function Companies() {
  const { query: { error, isPending}, totalEmployee, totalCompanies, totalEmployeeInactiveCompany, percentageActiveInactive } = useMyData("companies", getAllCompanies());

  const Prefix1 = () => {
    return (
      <span className="text-green-600">
        <FontAwesomeIcon icon={faArrowUp} /> 16%
      </span>
    );
  };

  const Prefix2 = () => {
    return <span className="font-semibold">{totalEmployeeInactiveCompany}</span>;
  };

  const Prefix3 = () => {
    return <span className="font-semibold">{percentageActiveInactive}%</span>;
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <Card>
        <div className="grid grid-cols-3">
          <AnalyticCard
            amount={totalCompanies}
            prefix={<Prefix1 />}
            subfix="this month"
            label="Total Company"
            icon={faHome}
            isRightBorder
          />
          <AnalyticCard
            amount={totalEmployee}
            prefix={<Prefix2 />}
            subfix="are in inactive companies"
            label="Total Employee"
            icon={faUser}
            isRightBorder
          />
          <AnalyticCard
            amount="65"
            prefix={<Prefix3 />}
            subfix="this month"
            label="Total Company"
            icon={faComputer}
          />
        </div>
      </Card>
    </div>
  );
}
