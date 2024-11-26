import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Auth/Signup.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Login from "./pages/Auth/Login.tsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext/AuthContext.tsx";
import { AppContext } from "./context/AppContext/AppContext.tsx";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay.tsx";

const App = () => {
  const { user } = useContext(AuthContext);
  const { isLoading } = useContext(AppContext);

  return (
    <>
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
      {isLoading && <LoadingOverlay />}
    </>
  );
};

export default App;
