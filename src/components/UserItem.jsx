import React from "react";

const UserItem = ({ photo, name, email, country, gender, age }) => {
  return (
    <article className="card">
      <img src={photo} alt="user avatar" />
      <h3 className="user__name">{name}</h3>
      <div className="user__details">
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Country:</strong> {country}
        </p>
        <p>
          <strong>Gender:</strong> {gender}
        </p>
        <p>
          <strong>Age:</strong> {age}
        </p>
      </div>
    </article>
  );
};

export default UserItem;
