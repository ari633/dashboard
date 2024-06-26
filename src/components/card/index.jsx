import PropTypes from "prop-types";

export default function Card(props) {
  const { children } = props;
  return (
    <div className="p-6 mx-auto bg-white rounded-xl shadow-lg space-y-8">
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};
