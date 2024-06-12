/* eslint-disable react/prop-types */
export const StatusBadge = ({ status }) => (
  <span
    className={`border block w-24 text-center capitalize rounded ${
      status === "inactive"
        ? "border-red-600	bg-red-200 text-red-600"
        : "border-emerald-600	bg-emerald-200 text-emerald-600"
    }`}
  >
    {status}
  </span>
);