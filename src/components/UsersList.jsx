import React from "react";
import UserItem from "./UserItem";

const UsersList = ({ users, loading }) => {
  return (
    <div className="container">
      {loading && <h1>Loading...</h1>}
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

export default UsersList;
