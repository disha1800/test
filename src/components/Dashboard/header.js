import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

import FilterBy from "./filter";
import List from "./list";
import SortBy from "./sortBy";
const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    if (!token) navigate("/");
  }, [token]);

  const handleClick = (e) => {
    e.preventDefault();

    navigate("/dashboard");
  };
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand style={{ cursor: "pointer" }} onClick={handleClick}>
            Simple Application
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                setToken(localStorage.setItem("token", ""));
              }}
            >
              Logout
            </Nav.Link>
           
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
