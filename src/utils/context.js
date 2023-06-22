import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { USER_API_ENDPOINT } from "./constant";

const MainContext = React.createContext();
const useMainContext = () => React.useContext(MainContext);

function MainContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);

  const getUserList = () => {
    setLoading(true);
    fetch(USER_API_ENDPOINT)
      .then((response) => {
        if (response.status === 200) return response.json();
        return [];
      })
      .then((data = []) => {
        if (data.length) setUserList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("user_list")) {
      const savedUserList = sessionStorage.getItem("user_list");
      setUserList(JSON.parse(savedUserList));
      setLoading(false);
    } else getUserList();

    return () => setUserList([]);
  }, []);

  useEffect(() => {
    if (userList.length) {
      sessionStorage.setItem("user_list", JSON.stringify(userList));
    }
  }, [userList]);

  const actionHandler = (type = "", data = {}) => {
    let msg = "";
    if (type === "like") {
      msg = "Like" + (data.liked ? "d" : " removed");
    } else if (type === "edit") msg = "Updated user";
    else msg = "Deleted user";
    let updatedUserList = [...userList];
    updatedUserList = updatedUserList.map((userData = {}) =>
      data.id === userData.id ? { ...userData, ...data } : userData
    );
    toast.success(msg + " successfully !");
    setUserList(updatedUserList);
  };

  return (
    <MainContext.Provider
      value={{ loading, userList, getUserList, actionHandler }}
    >
      {children}
    </MainContext.Provider>
  );
}

export { useMainContext, MainContextProvider };
