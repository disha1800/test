import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./header";
const List = ({ list, setList, sort }) => {
  const token = localStorage.getItem("token");

  const [data, setData] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    async function getData() {
      await axios
        .get("http://test-api.kk-lotto.com:8080/api/customers/paginate", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(function (response) {
          console.log(response);
          setList(response.data.data);
        })
        .catch(function (error) {
          console.log(error, "this is my error");
        });
    }
    getData();
  }, [data]);
  console.log("list==", list);
  const navigate = useNavigate();
  const updateUser = (id) => {
    navigate(`/add/?id=${id}`);

    // axios
    //   .get(`http://test-api.kk-lotto.com:8080/api/customers/paginate/${id}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //     setEdit(response.data.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //  });
  };
console.log('edit',edit)
  const deleteUser = (id) => {
    axios
      .delete(`http://test-api.kk-lotto.com:8080/api/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response);
        setData(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="m-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list?.map((item) => {

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
              })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default List;
