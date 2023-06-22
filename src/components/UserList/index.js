import React from "react";

import "./index.css";
import { useMainContext } from "../../utils/context";
import UserCard from "../UserCard";

function UserList() {
  const { userList = [], getUserList = () => {} } = useMainContext();
  const visibleUserList = userList.filter(({ deleted }) => !deleted);

  if (!visibleUserList.length) {
    return (
      <div className="user-list-empty">
        <p>Looks like user list is empty!</p>
        <button className="primary-button" onClick={() => getUserList()}>
          Reset
        </button>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      {visibleUserList.map((userData = {}) => (
        <UserCard data={userData} key={userData.id} />
      ))}
    </div>
  );
}

export default UserList;
