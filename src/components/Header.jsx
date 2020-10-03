import React, { useState } from "react";
import PropTypes from "prop-types";

const Header = ({ search }) => {
  const [lang, setLang] = useState("en");
  const changeLanguage = () => {
    if (lang === "en") {
      setLang("hr");
    } else {
      setLang("en");
    }
  };
  return (
    <header className="header">
      <div className="header__title">Users search app</div>
      <div className="header__search">
        <input
          type="search"
          placeholder="Search by country"
          onChange={search}
        />
      </div>
      <span onClick={changeLanguage} className="language">
        EN
      </span>
    </header>
  );
};
Header.propTypes = {
  search: PropTypes.func.isRequired,
};
export default Header;
