import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const Pagination = ({
  pageCount,
  pageNumber,
  increaseNumber,
  decreaseNumber,
}) => {
  const { t } = useTranslation();
  return (
    <div className="buttons">
      {`${pageNumber} / ${pageCount}`}
      {pageNumber > 1 && (
        <button onClick={decreaseNumber}>{t("previous")}</button>
      )}
      {pageNumber < pageCount && (
        <button onClick={increaseNumber}>{t("next")}</button>
      )}
    </div>
  );
};
Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  increaseNumber: PropTypes.func.isRequired,
  decreaseNumber: PropTypes.func.isRequired,
};
export default Pagination;
