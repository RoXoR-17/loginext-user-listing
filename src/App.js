import React from "react";
import "react-toastify/dist/ReactToastify.css";

import { useMainContext } from "./utils/context";
import Layout from "./components/Layout";
import Loader from "./components/Loader";
import UserList from "./components/UserList";

function App() {
  const { loading = false } = useMainContext();

  return <Layout>{loading ? <Loader /> : <UserList />}</Layout>;
}

export default App;
