import axios from "axios";
import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [data, setData] = useState({ email: "", password: "" });
 


    useEffect(() => {
        let isAuth = (localStorage.getItem('token'));
        if(isAuth && isAuth !== null) {
            navigate("/dashboard");
        }
    }, []);

  const handleInputChange = (event) => {
   
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  
   const login = async () => {
    await axios
      .post("http://test-api.kk-lotto.com:8080/api/auth/login", data)
      .then(function (response) {
       // console.log(response);
        localStorage.setItem("token",response.data.token);
        navigate('/dashboard')
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="login">
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          name="email"
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          name="password"
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={handleInputChange}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary" onClick={login}>
          Submit
        </button>
      </div>
    </div>
  );
};
export default Login;
