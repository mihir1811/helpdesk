import { Routes, Route } from "react-router-dom";
import AuthWrapper from "./wrapper/AuthWrapper";
import { AdminHome } from "./pages/AdminHome";
import { LogIn } from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { Loader } from "./component/Loader";
import { useSelector } from "react-redux";
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
          <Route path="/manage-admin" index element={<ManageAdmin />} />
          <Route path="/manage-user" index element={<ManageUser />} />
          <Route path="/manage-helpdesk" index element={<ManageHelpdesk />} />
          <Route path="/message" index element={<ManageMessages />} />
          <Route path="/profile" index element={<ProfilePage />} />
          {/* <Route path="/add-new-driver" element={<AddNewDriver />} /> */}
          {/* <Route path="/view-driver-list" element={<DriverList />} /> */}
          {/* <Route path="/view-driver-list-new" element={<ViewDriverListNew />} /> */}
        </Route>
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<h1>404 Page Not Found</h1>} />

      </Routes>
      <Toaster />
      {isLoading && <Loader />}
    </>
  );
}

export default App;




// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import AuthWrapper from "./wrapper/AuthWrapper";
// import { useSelector } from "react-redux";

// const allowedRoles = {
//   dashboard: ["manager", "parent", "staff"],
//   managerDashboard: ["manager"],
//   parentDashboard: ["parent"],
//   staffDashboard: ["staff"],
// };

// const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
//   const authToken = localStorage.getItem("authtoken");
//   const userRole = useSelector((state) => state.userInfo.role);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         authToken && allowedRoles[rest.path].includes(userRole) ? (
//           <Component {...props} />
//         ) : (
//           <h1>not able to access this</h1>
//         )
//       }
//     />
//   );
// };

// const App = () => {
//   const authToken = localStorage.getItem("authtoken");
//   const userRole = useSelector((state) => state.userInfo.role);

//   return (
//     <AuthWrapper>
//       <Routes>
//         <Route path="/" element={<div>Public Component</div>} />
//         <ProtectedRoute
//           path="/dashboard"
//           component={() => <div>Dashboard Component</div>}
//           roles={["manager", "parent", "staff"]}
//         />
//         <ProtectedRoute
//           path="/manager-dashboard"
//           component={() => <div>Manager Dashboard Component</div>}
//           roles={["manager"]}
//         />
//         <ProtectedRoute
//           path="/parent-dashboard"
//           component={() => <div>Parent Dashboard Component</div>}
//           roles={["parent"]}
//         />
//         <ProtectedRoute
//           path="/staff-dashboard"
//           component={() => <div>Staff Dashboard Component</div>}
//           roles={["staff"]}
//         />
//         <Route path="*" element={<h1>404 Page Not Found</h1>} />
//       </Routes>
//     </AuthWrapper>
//   );
// };

// export default App;
