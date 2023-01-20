import React, { useState ,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from './header';
const AddUser = () => {
  const token=localStorage.getItem('token')

  const navigate=useNavigate()

useEffect(()=>{
if(!token)
navigate('/')
},[token])
  const initialData = {
    name: "",
    address: "",
    mobile_no: "",
    email: "",
    gender: "",
  };
  const [data, setData] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  
  const saveUser = async () => {
 
    await axios
      .post("http://test-api.kk-lotto.com:8080/api/customers", data, 
     { headers: {Authorization: `Bearer ${token}` }})
      .then(function (response) {
        console.log(response);
        setSubmitted(true);
        // localStorage.setItem("token",response.data.token);
        // navigate('/dashboard')
      })
      .catch(function (error) {
        console.log(error);
      });
    //     TutorialDataService.create(data)
    //       .then(response => {
    //         setTutorial({
    //           id: response.data.id,
    //           title: response.data.title,
    //           description: response.data.description,
    //           published: response.data.published
    //         });
    //         setSubmitted(true);
    //         console.log(response.data);
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       });
  };

  const newUser = () => {
    setData(initialData);
    setSubmitted(false);
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
          <button onClick={saveUser} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default AddUser;
