import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

import FilterBy from "./filter";
import List from "./list";
import SortBy from "./sortBy";
import Header from "./header";
const Dashboard = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState("");
  const [list, setList] = useState("");

  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    if (!token) navigate("/");
  }, [token]);

  const sorting = (e) => {
    setSort(e.target.value);
    list.filter((data) => {
      if (sort === "Men") {
        console.log("Men");
        return data;
      }
      if (data === "Women" && sort === "Women") {
        console.log("Women");
        return data;
      }
      return null;
    });
  };

  // filtering by Gender

  return (
    <>
      <Header />

       {/* <FilterBy sorting={sorting} sort={sort} /> */}
    {/* /  <SortBy /> */}
      <List list={list} setList={setList} />
    </>
  );
};

export default Dashboard;
