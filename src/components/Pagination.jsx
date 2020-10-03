import React from "react";

const Pagination = ({
  pageCount,
  pageNumber,
  increaseNumber,
  decreaseNumber,
}) => {
  return (
    <div className="buttons">
      {`${pageNumber} / ${pageCount}`}
      {pageNumber > 1 && <button onClick={decreaseNumber}>Previous</button>}
      {pageNumber < pageCount && <button onClick={increaseNumber}>Next</button>}
    </div>
  );
};

export default Pagination;
