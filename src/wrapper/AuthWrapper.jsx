import { Navigate, Outlet } from "react-router-dom";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import Footer from "../component/Footer";
import { Title } from "../component/Title";
import { useSelector } from "react-redux";

const AuthWrapper = () => {
  const checktoken = localStorage.getItem("authtoken");
  const { screenSize, isSideBarSmall } = useSelector((state) => state);

  if (checktoken === null) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {true && (
        <>
          <div className="flex h-screen overflow-hidden	">
            <Sidebar />
            <div className="flex-1 relative">
              <Header />
              <div className="bg-[#F4F6F9] w-full h-[calc(100vh_-_112px)] main_content_height overflow-y-auto">
                {/* Main content */}
                <div
                  // style={{ height: screenSize.height - 40 + "px" }}
                  className={`${
                    isSideBarSmall && "mx-auto px-3"
                  } overflow-y-auto no-scrollbar p-5 h-full`}
                >
                  <div className="pt-0  h-full">
                    {/* <Title /> */}
                    <Outlet />
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AuthWrapper;
