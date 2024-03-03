import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "./containers/dataTable";
import Login from "./containers/login";
import Transaction from "./containers/transaction";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>
              E-Wallets
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/transaction"}>
                    Transaction
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <Routes>
            <Route exact path="/" element={<DataTable />} />
            <Route path="/login" element={<Login />} />
            <Route path="/transaction" element={<Transaction />} />
          </Routes>
        </div>
      </div>
      <ToastContainer autoClose={1500} />
    </BrowserRouter>
  );
}

export default App;
