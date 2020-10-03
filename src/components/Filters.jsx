import React from "react";
import Select from "react-select";
import Proptypes from "prop-types";
import customStyles from "../customStyles";

const Filters = ({ sort, sortOrder }) => {
  const options = [
    { value: "", label: "None" },
    { value: "asc", label: "Age - ascending" },
    { value: "desc", label: "Age - descending" },
    { value: "under40", label: "Age - under 40" },
    { value: "over40", label: "Age - over 40" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  return (
    <div className="sortBy">
      <span>Sort by</span>
      <Select
        styles={customStyles}
        defaultValue={options[0]}
        value={sortOrder}
        onChange={sort}
        options={options}
      />
    </div>
  );
};
Filters.propTypes = {
  sort: Proptypes.func.isRequired,
  sortOrder: Proptypes.object.isRequired,
};
export default Filters;
