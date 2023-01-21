import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FilterBy from "./filter";
import AddUser from "./addUser";
import { toast } from "react-toastify";
// const List = ({ list, setList }) => {
const List = ({}) => {
  const token = localStorage.getItem("token");
  const [gender, setGender] = useState("");
  const [data, setData] = useState("");
  const [filterData, setFilterData] = useState("");
  const [list, setList] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filterValueEmail, setFilterValueEmail] = useState("");
  const [filterValueMobile, setFilterValueMobile] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getData("");
  }, []);
  async function getData(data) {
    await axios
      .get(`http://test-api.kk-lotto.com:8080/api/customers/paginate?${data}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response);
        setList(response.data.data);
        setSearchApiData(response.data.data);
      })
      .catch(function (error) {
        console.log(error, "this is my error");
      });
  }

  const deleteUser = (id) => {
    axios
      .delete(`http://test-api.kk-lotto.com:8080/api/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response);
        toast.success(response);
        setData(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    getData("");
  };

  const filter = (gender) => {
    setGender(gender);
  };
  const saveUser = async (data) => {
    await axios
      .post("http://test-api.kk-lotto.com:8080/api/customers", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response);
        toast.success(response);
        setSubmitted(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    getData("");
  };

  const updateUser = async (id) => {
    const filterData =
      list &&
      list.filter(function (el) {
        return el.id == id;
      });

    setFilterData(filterData[0]);
  };
  const saveUpdateData = async (data, id) => {
    await axios
      .patch(`http://test-api.kk-lotto.com:8080/api/customers/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response);
        toast.success(response);
        setSubmitted(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    getData("");
  };
  const sortBy = (param) => {
    let params = `sortBy=${param}`;
    getData(params);
  };
  const handleFilterName = (e) => {
    if (e.target.value == "") setList(searchApiData);
    else {
      const filterResult = searchApiData.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setList(filterResult);
    }
    setFilterValue(e.target.value);
  };

  const handleFilterMobile = (e) => {
    if (e.target.value == "") setList(searchApiData);
    else {
      const filterResult = searchApiData.filter((item) =>
        item.mobile_no.includes(e.target.value)
      );
      setList(filterResult);
    }
    setFilterValueMobile(e.target.value);
  };

  const handleFilterEmail = (e) => {
    if (e.target.value == "") setList(searchApiData);
    else {
      const filterResult = searchApiData.filter((item) =>
        item.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setList(filterResult);
    }
    setFilterValueEmail(e.target.value);
  };

  return (
    <>
      {" "}
      <AddUser
        saveUpdateData={(data, id) => saveUpdateData(data, id)}
        filterData={filterData}
        submitted={submitted}
        setSubmitted={setSubmitted}
        saveUser={(data) => saveUser(data)}
      />
      <FilterBy filter={(e) => filter(e)} />
      <div className="m-5">
        <div>
          <input
            placeholder="search by name"
            value={filterValue}
            onInput={(e) => handleFilterName(e)}
            size={50}
            style={{ height: "50px", textalign: "center" }}
          />
        </div>
        <div>
          <input
            placeholder="search by email"
            value={filterValueEmail}
            onInput={(e) => handleFilterEmail(e)}
            size={50}
            style={{ height: "50px", textalign: "center", marginTop: "40px" }}
          />
        </div>
        <div>
          <input
            placeholder="search by mobile_no"
            value={filterValueMobile}
            onInput={(e) => handleFilterMobile(e)}
            size={50}
            style={{ height: "50px", textalign: "center", marginTop: "40px" }}
          />
        </div>
        <Table striped bordered hover style={{ marginTop: "40px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>
                Name <button onClick={() => sortBy("name")}>Sort</button>
              </th>
              <th>
                Email <button onClick={() => sortBy("email")}>Sort</button>
              </th>
              <th>
                Mobile{" "}
                <button onClick={() => sortBy("meobile_no")}>Sort</button>
              </th>
              <th>
                Address <button onClick={() => sortBy("address")}>Sort</button>
              </th>
              <th>
                Gender <button onClick={() => sortBy("gender")}>Sort</button>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((item) => {
                if (item.gender === gender || gender == "") {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile_no}</td>
                      <td>{item.address}</td>
                      <td>{item.gender}</td>
                      <td>
                        <button onClick={() => updateUser(item.id)}>
                          Update
                        </button>
                        <button onClick={() => deleteUser(item.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default List;
