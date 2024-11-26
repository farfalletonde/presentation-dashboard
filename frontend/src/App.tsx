import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Auth/Signup.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Login from "./pages/Auth/Login.tsx";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext/AuthContext.tsx";
import { AppContext } from "./context/AppContext/AppContext.tsx";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay.tsx";

const App = () => {
  const { user } = useContext(AuthContext);
  const { isLoading, error } = useContext(AppContext);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        alert(error);
      }, 80);
    }
  }, [error]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to={"/auth/signup"} />}
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
