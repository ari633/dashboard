import PropTypes from 'prop-types';

const VARIANT_CLASSES = {
  outline: "border border-gray-500 text-black",
  default: "bg-indigo-500 text-white",
};

export default function Button({ label, variant = 'default', ...rest }) {
  const variantClassName = VARIANT_CLASSES[variant];

  return (
    <button className={`${variantClassName} px-4 py-2 rounded`} {...rest}>{label}</button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
};
