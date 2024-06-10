import img from "../../assets/react.svg";
import AnalyticCard from "../../components/analytic-card";
import Card from "../../components/card";
import {
  faArrowUp,
  faHome,
  faUser,
  faComputer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Dashboard() {
  const Prefix1 = () => {
    return (
      <span className="text-green-600">
        <FontAwesomeIcon icon={faArrowUp} /> 16%
      </span>
    );
  };

  const Prefix2 = () => {
    return <span className="font-semibold">111</span>;
  };

  const Prefix3 = () => {
    return <span className="font-semibold">111%</span>;
  };

  return (
    <div>
      <div className="flex justify-between pb-10 items-center">
        <div>
          <h1 className="text-xl">Hello Evano</h1>
        </div>
        <div>
          <img
            className="block mx-auto h-10 rounded-full sm:mx-0 sm:shrink-0"
            src={img}
            alt="Woman's Face"
          />
        </div>
      </div>
      <Card>
        <div className="grid grid-cols-3">
          <AnalyticCard
            amount="65"
            prefix={<Prefix1 />}
            subfix="this month"
            label="Total Company"
            icon={faHome}
            isRightBorder
          />
          <AnalyticCard
            amount="65"
            prefix={<Prefix2 />}
            subfix="this month"
            label="Total Company"
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
