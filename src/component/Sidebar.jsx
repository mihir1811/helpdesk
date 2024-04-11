import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminSidebarData, sideBarData } from "../helper/constatnt";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SELECTED_TAB } from "../redux/action";
import LOGO from "../images/ppssf_logo.png";


const Sidebar = () => {
  const isSideBarSmall = useSelector((state) => state.isSideBarSmall);
  const [openSubmenuId, setOpenSubmenuId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.userInfo.role)
  const [pageLinks , setpageLings] = useState(adminSidebarData)
  console.log(userRole ,"wefwefewfewsefw")

  useEffect(()=>{
    if(userRole == "admin" || userRole == "manager"){
      setpageLings(adminSidebarData)
    }else{
      setpageLings(sideBarData)
    }
  }, [])

  const renderSubMenu = (items) => {
    return (
      <ul className="pl-8">
        {items.map((item, index) => (
            <li
              key={index}
              className="my-px flex relative cursor-pointer hover:bg-gray-700 hover:rounded-lg items-center gap-4"
            >
              <span className="absolute left-4">{item.icon()}</span>
              <div
                className={`block py-2 text-gray-300  ml-12  ${
                  isSideBarSmall ? "hover:bg-transparent" : ""
                }`}
                onClick={() => clickedItem(item)}
              >
                {item.name}
              </div>
              {item?.nestedItem?.length > 0 && renderSubMenu(item.nestedItem)}
            </li>
        ))}
      </ul>
    );
  };

  const renderIcon = (IconComponent) =>
    IconComponent && !isSideBarSmall ? <IconComponent /> : null;

  const clickedItem = (click) => {
    dispatch({ type: SELECTED_TAB, payload: click.name });
    navigate(click.route);
    console.log("click", click);
  };

  return (
    <div
      className={`bg-[#111827] text-white  no-scrollbar overflow-y-auto scroll-m-2 h-screen flex flex-col ${
        isSideBarSmall ? "w-0" : "w-80"
      }`}
    >
      <div className="p-0">
        {/* <h1
          className={`text-2xl font-bold text-center ${
            isSideBarSmall ? "hidden" : ""
          }`}
        >
          U-vahan
        </h1> */}
        <img
          src={LOGO}
          width={"60px"}
          className="mx-auto"
          alt="ppssf logo"
        />
      </div>
      <ul className="p-2">
        {pageLinks.map((item, index) => (
          <>
            {item.nestedItem.length ? (
              <>
                <li
                  key={index}
                  className="my-5 flex justify-between hovrer:border  rounded-lg relative hover:bg-gray-700"
                  onClick={() =>
                    setOpenSubmenuId((prevId) =>
                      prevId === item.id ? null : item.id
                    )
                  }
                >
                  <div
                    className={`flex flex-row items-center h-12 px-4 rounded-lg text-gray-300  cursor-pointer ${
                      isSideBarSmall ? "hover:bg-transparent" : ""
                    }`}
                  >
                    <span className="flex items-center justify-center text-lg">
                      {renderIcon(item.icon)}
                    </span>
                    <div>
                      <p>
                        {!isSideBarSmall && (
                          <span className="ml-3">{item.name}</span>
                        )}
                      </p>
                    </div>
                  </div>
                  {item.nestedItem.length > 0 && !isSideBarSmall && (
                    <span className="bottom-4 right-4 absolute">
                      {openSubmenuId === item.id ? (
                        <FaAngleUp />
                      ) : (
                        <FaAngleDown />
                      )}
                    </span>
                  )}
                </li>
                {openSubmenuId === item.id &&
                  !isSideBarSmall &&
                  renderSubMenu(item.nestedItem)}
              </>
            ) : (
              <>
                <div
                  key={index}
                  className="my-5 flex justify-between hovrer:border  rounded-lg relative hover:bg-gray-700"
                  onClick={() => clickedItem(item)}
                >
                  <div
                    className={`flex flex-row items-center h-12 px-4 rounded-lg text-gray-300  cursor-pointer ${
                      isSideBarSmall ? "hover:bg-transparent" : ""
                    }`}
                  >
                    <span className="flex items-center justify-center text-lg">
                      {renderIcon(item.icon)}
                    </span>
                    <div>
                      <p>
                        {!isSideBarSmall && (
                          <span className="ml-3">{item.name}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
