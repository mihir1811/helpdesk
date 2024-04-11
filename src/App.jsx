import { Routes, Route } from "react-router-dom";
import AuthWrapper from "./wrapper/AuthWrapper";
import { AdminHome } from "./pages/AdminHome";
import { LogIn } from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { Loader } from "./component/Loader";
import { useSelector } from "react-redux";
import { AddNewDriver } from "./pages/AddNewDriver";
import DriverList from "./pages/ViewDriverList";
import ViewDriverListNew from "./pages/ViewDriverListNew";
import ManageAdmin from "./pages/ManageAdmin";
import ManageUser from "./pages/ManageUser";
import ManageHelpdesk from "./pages/ManageHelpdesk";
import ManageMessages from "./pages/Messages";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthWrapper />}>
          <Route path="/" index element={<AdminHome />} />
          <Route
            path="/manage-admin"
            element={
                <ManageAdmin />
            }
          />
            {/* <Route path="/manage-admin" index element={<ManageAdmin />} /> */}
          <Route path="/manage-user" index element={<ManageUser />} />
          <Route path="/manage-helpdesk" index element={<ManageHelpdesk />} />
          <Route path="/message" index element={<ManageMessages />} />
          <Route path="/profile" index element={<ProfilePage />} />
          {/* <Route path="/add-new-driver" element={<AddNewDriver />} /> */}
          {/* <Route path="/view-driver-list" element={<DriverList />} /> */}
          {/* <Route path="/view-driver-list-new" element={<ViewDriverListNew />} /> */}
        </Route>
        <Route path="/login" element={<LogIn />} />
      </Routes>
      <Toaster />
      {isLoading && <Loader />}
    </>
  );
}

export default App;
