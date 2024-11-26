import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Auth/Signup.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Login from "./pages/Auth/Login.tsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.tsx";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Dashboard /> : <Navigate to={"/auth/login"} />}
      />
      <Route
        path="/auth/login"
        element={!user ? <Login /> : <Navigate to={"/"} />}
      />
      <Route
        path="/auth/signup"
        element={!user ? <Signup /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
};

export default App;
