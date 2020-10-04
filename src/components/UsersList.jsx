import React from "react";
import UserItem from "./UserItem";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const UsersList = ({ users, loading }) => {
  const { t } = useTranslation();
  return (
    <div className="container">
      {loading && <h1>{t("loading")}</h1>}
      <section className="card-row">
        {users &&
          users.length > 0 &&
          users.map((user, index) => {
            return <UserItem {...user} key={index} />;
          })}
      </section>
    </div>
  );
};
UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      photo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      gender: PropTypes.oneOf(["male", "female"]).isRequired,
      age: PropTypes.number.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};
export default UsersList;
