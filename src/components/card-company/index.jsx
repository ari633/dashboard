import PropTypes from 'prop-types';
import img from "../../assets/react.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationPin
} from "@fortawesome/free-solid-svg-icons";
const CardCompany = ({ image, name, address, country, employees }) => (
  <div className="p-3 w-full mx-auto bg-white rounded-xl border border-gray-200">
    <img src={image} alt={img} title={name} className='rounded-xl mb-4' loading='lazy'/>
    <div className='pb-2 font-semibold'>{name}</div>
    <div className='pb-2 text-amber-600'>{employees} employees</div>
    <div className='pb-2 text-gray-500'><FontAwesomeIcon icon={faLocationPin} /> {address}, {country}</div>
  </div>
);

CardCompany.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  employees: PropTypes.number.isRequired,
};

export default CardCompany;
