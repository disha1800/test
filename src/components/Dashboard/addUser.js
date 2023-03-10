import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = ({
  saveUpdateData,
  setSubmitted,
  submitted,
  validationMessages,
  saveUser,
  filterData,
}) => {

  const [data, setData] = useState("");
  useEffect(() => {
    setData({
      name: filterData && filterData ? filterData.name : "",
      address: filterData && filterData ? filterData.address : "",
      mobile_no: filterData && filterData ? filterData.mobile_no : "",
      email: filterData && filterData ? filterData.email : "",
      gender: filterData && filterData ? filterData.gender : "",
    });
  }, [filterData]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    setData({ ...data, [name]: value });
  };

  const newUser = () => {
    // setData(initialData);
    setData("");
    setSubmitted(false);
  };

  return (
    <>
      {/* <Header /> */}
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
            {filterData ? (
              <button
                onClick={() => saveUpdateData(data, filterData.id)}
                className="btn btn-success"
              >
                Update
              </button>
            ) : (
              <button
                onClick={() => saveUser(data)}
                className="btn btn-success"
              >
                Submit
              </button>
            )}
               
          </div>
        )}
      </div>
    </>
  );
};

export default AddUser;
