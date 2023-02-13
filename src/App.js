import "./assets/css/output.css";
import "rsuite/dist/rsuite.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { ProfileProvider } from "./context/profile.context";
import Notfound from "./pages/Notfound";
import SignInUp from "./components/SignInUp";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <ProfileProvider>
        <Routes>
          <Route
            exact={true}
            path={"/"}
            element={
              <PrivateRoute>
                <Dashboard></Dashboard>
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact={true}
            path={"/profilePage"}
            element={
              <PrivateRoute>
                <ProfilePage></ProfilePage>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path={"/signinup"}
            element={
              <PublicRoute>
                <SignInUp></SignInUp>
              </PublicRoute>
            }
          ></Route>

          <Route exact={false} path="*" element={<Notfound></Notfound>}></Route>
        </Routes>
      </ProfileProvider>
    </>
  );
}

export default App;
