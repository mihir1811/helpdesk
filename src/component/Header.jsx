import React from "react";
import { ReactSVG } from "react-svg";
import bar from "../images/bars.svg";
import { useDispatch, useSelector } from "react-redux";
import { IS_SIDEBAR_SMALL, USER_LOGOUT } from "../redux/action";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const { isSideBarSmall, userInfo } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(userInfo, "userinfo");


const logout = async ()=>{
  
  
  try {
    
      const authToken = localStorage.getItem('authtoken')
      const refreshToken  = localStorage.getItem('refreshToken')
    
      const response = await axios.post(
        "https://helpdesk-7ad4.onrender.com/user_accounts/logout/",
        {
          refresh :refreshToken
        },
        {
          headers: {
            "Content-Type": "application/json", // Set appropriate content type for JSON data
          },
        }
      );
    
      dispatch({ type: USER_LOGOUT });
  } catch (error) {
    console.log(error);
    if(error.response.status == 401){
      window.location.href = '/login';
    }
  }

  // navigate("/");
}

  return (
    <nav className={`${isSideBarSmall ? "w-100" :"w-[calc(100%-320px)]" } bg-[#fefefe] w-full h-16 border shadow-lg text-[#000]`}>
      <div
        className={`${
          !isSideBarSmall && "container"
        } flex justify-between items-center`}
      >
        <div className="p-[21px]">
          <ReactSVG
            className="cursor-pointer"
            src={bar}
            onClick={() =>
              dispatch({
                type: IS_SIDEBAR_SMALL,
                payload: isSideBarSmall === true ? false : true,
              })
            }
          />
        </div>
        <div className="pr-2">
          <button
            className="px-12 py-3  font-medium bg-[#ffce47] hover:bg-[rgba(255,206,71,0.8)] uppercase hover:text-black-600 text-black-500 rounded-lg text-sm"
            onClick={()=>logout()}
          >
            logout  {userInfo?.username ? `(${userInfo?.first_name} ${userInfo?.last_name})`  : ""} 
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
