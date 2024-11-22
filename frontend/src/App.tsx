import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Auth/Signup.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Login from "./pages/Auth/Login.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
