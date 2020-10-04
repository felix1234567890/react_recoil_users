import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const Header = ({ search }) => {
  const [lang, setLang] = useState("en");
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    lang === "en" ? setLang("hr") : setLang("en");
  };

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);
  return (
    <header className="header">
      <div className="header__title">{t("headerTitle")}</div>
      <div className="header__search">
        <input type="search" placeholder={t("searchText")} onChange={search} />
      </div>
      <span onClick={changeLanguage} className="language">
        {t("lng")}
      </span>
    </header>
  );
};
Header.propTypes = {
  search: PropTypes.func.isRequired,
};
export default Header;
