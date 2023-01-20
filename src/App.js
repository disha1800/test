import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import  Store  from "./context/store";
import AddUser from "./components/Dashboard/addUser";
function App() {
  return (
    <Router>
      <div className="App">
        <Store>
          <Routes>
            <Route exact path="/" element={<Login />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddUser />} />
          </Routes>
        </Store>
      </div>
    </Router>
  );
}

export default App;
