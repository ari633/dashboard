import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AnalyticCard(props) {
  const { label, amount, prefix, subfix, icon, isRightBorder } = props;
  return (
    <div
      className={`flex md:justify-center md:items-center ${
        isRightBorder ? "md:border-r" : ""
      }`}
    >
      <div className="hidden md:flex w-24 h-24 rounded-full bg-green-100 block flex justify-center items-center text-green-600">
        <FontAwesomeIcon icon={icon} size="2x" />
      </div>
      <div className="pl-5">
        <div className="text-gray-500">{label}</div>
        <div className="text-2xl font-semibold">{amount}</div>
        {prefix} {subfix}
      </div>
    </div>
  );
}

AnalyticCard.propTypes = {
  label: PropTypes.string.isRequired,
  amount: PropTypes.any.isRequired,
  icon: PropTypes.object.isRequired,
  prefix: PropTypes.node,
  isRightBorder: PropTypes.bool,
  subfix: PropTypes.string.isRequired,
};
