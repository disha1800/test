import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./header";
const AddUser = () => {
  const param = new URLSearchParams(window.location.search)
  const id=param.get('id')
  console.log('id',id)
  const token = localStorage.getItem("token");
const[userData,setUserData]=useState('')
  const navigate = useNavigate();

  console.log('user==',userData)
  const filterData= userData && userData.filter(function (el)
  {
    return el.id ==id
          
  }
  );
  console.log('filterData',filterData);
  const initialData = {
    name: filterData?filterData[0].name:"",
    address:filterData?filterData[0].address:"",
    mobile_no:filterData?filterData[0].mobile_no:"",
    email: filterData?filterData[0].email:"",
    gender: filterData?filterData[0].gender:"",
  };
  console.log('initialData',initialData)
  const [data, setData] = useState(initialData);
    useEffect(() => {
    async function getData() {
     
      await axios
        .get("http://test-api.kk-lotto.com:8080/api/customers/paginate", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(function (response) {
          console.log(response);
          setUserData(response.data.data);
        })
        .catch(function (error) {
          console.log(error, "this is my error");
        });
    }
    if(id){
    getData()
  };
  }, [id]);

  console.log('data',data)
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const saveUser = async () => {
    await axios
      .post("http://test-api.kk-lotto.com:8080/api/customers", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response);
        setSubmitted(true);
      })
      .catch(function (error) {
        console.log(error);
      });
   
  };

  const updateUser = async () => {
    await axios
      .patch(`http://test-api.kk-lotto.com:8080/api/customers/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response);
        setSubmitted(true);
      })
      .catch(function (error) {
        console.log(error);
      });
   
  };

  const newUser = () => {
    setData(initialData);
    setSubmitted(false);
  };
  const handleClick = () => {
    navigate("/dashboard");
  };
  return (
    <>
      <Header />
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newUser}>
              Add
            </button>
            <br />
            <br />
            <br />
            <br />
            <br />

            <button className="btn btn-success" onClick={handleClick}>
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={data.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Address</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={data.address}
                onChange={handleInputChange}
                name="address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Mobile</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={data.mobile_no}
                onChange={handleInputChange}
                name="mobile_no"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Email</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={data.email}
                onChange={handleInputChange}
                name="email"
              />
            </div>
            <div className="form-group" onChange={handleInputChange}>
              <label htmlFor="gender" className="m-4">
                Gender
              </label>
              <label htmlFor="gender">Male</label>{" "}
              <input
                className="m-2"
                type="radio"
                checked={data.gender == "Male"}
                name="gender"
                value="Male"
              />
              <label htmlFor="gender">Female</label>{" "}
              <input
                className="m-2"
                type="radio"
                checked={data.gender == "Female"}
                name="gender"
                value="Female"
              />
            </div>
            {filterData?<button onClick={updateUser} className="btn btn-success">
              Update
            </button>:<button onClick={saveUser} className="btn btn-success">
              Submit
            </button>}
            <div style={{ marginTop: "200px" }}>
              {" "}
              <button className="btn btn-success" onClick={handleClick}>
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddUser;
