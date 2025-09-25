import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from "./router/AppRouter";
import { AuthContextProvider } from "./context/AuthContext"; 
import CarbonFootprintDisplay from "./components/CarbonFootprintDisplay";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Navbar />
        <AppRouter />
        <CarbonFootprintDisplay />
      </AuthContextProvider>
    </Router>
  );
}

export default App;
