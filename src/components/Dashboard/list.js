import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Header from './header';
const List = () => {
  const token = localStorage.getItem("token");
  const [list, setList] = useState("");

  useEffect(() => {
    axios
      .get("http://test-api.kk-lotto.com:8080/api/customers/paginate", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response);
        setList(response.data.data);
        // localStorage.setItem("token",response.data.token);
        // navigate('/dashboard')
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  console.log('list==',list)
  const updateUser=(id)=>{
    axios
    .patch(`http://test-api.kk-lotto.com:8080/api/customers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(function (response) {
      console.log(response);
      setList(response.data.data);
      // localStorage.setItem("token",response.data.token);
      // navigate('/dashboard')
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const deleteUser=(id)=>{
    axios
    .delete(`http://test-api.kk-lotto.com:8080/api/customers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(function (response) {
      console.log(response);
     
      // localStorage.setItem("token",response.data.token);
      // navigate('/dashboard')
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
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
          {list && list?.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.mobile_no}</td>
                <td>{item.address}</td>
                <td>{item.gender}</td>
                <td><button onClick={()=>updateUser(item.id)}>Update</button>
                 <button onClick={()=>deleteUser(item.id)}>Delete</button> 
                  
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
