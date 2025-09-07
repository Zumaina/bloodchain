import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from "./router/AppRouter";
import { AuthContextProvider } from "./context/AuthContext"; // ✅ NEW

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Navbar />
        <AppRouter />
      </AuthContextProvider>
    </Router>
  );
}

export default App;
