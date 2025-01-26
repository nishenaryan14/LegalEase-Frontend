import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./scenes/home/Home";
import ReferCase from "./scenes/ReferCase";
import ViewCases from "./scenes/ViewCases";
import MyReferrals from "./scenes/MyReferrals";
import CaseDetails from "./scenes/CaseDetails";
import { Box } from "@mui/material";
import "./App.css";
import Login from "./scenes/login/Login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Box sx={{ mt: 8 }}>
        <Routes>
          <Route
            path="/home"
            element={isAuthenticated ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/refer-case"
            element={isAuthenticated ? <ReferCase /> : <Navigate to="/" />}
          />
          <Route
            path="/view-cases"
            element={isAuthenticated ? <ViewCases /> : <Navigate to="/" />}
          />
          <Route
            path="/my-referrals"
            element={isAuthenticated ? <MyReferrals /> : <Navigate to="/" />}
          />
          <Route
            path="/case-details/:id"
            element={isAuthenticated ? <CaseDetails /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/home" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
