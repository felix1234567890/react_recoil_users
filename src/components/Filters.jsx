import React from "react";
import Select from "react-select";
import Proptypes from "prop-types";
import { useTranslation } from "react-i18next";
import customStyles from "../customStyles";

const Filters = ({ sort, sortOrder }) => {
  const { t } = useTranslation();
  const options = [
    { value: "", label: t("none") },
    { value: "asc", label: t("ageAsc") },
    { value: "desc", label: t("ageDesc") },
    { value: "under40", label: t("ageUnder") },
    { value: "over40", label: t("ageOver") },
    { value: "male", label: t("male") },
    { value: "female", label: t("female") },
  ];
  return (
    <div className="sortBy">
      <span>{t("sortBy")}</span>
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
