import React, { useEffect, useState } from "react";
import { Title } from "../component/Title";
import Modal from "../component/Modal";
import { useSelector, useDispatch } from "react-redux";
import { IS_LOADING } from "../redux/action";
import TanStackTable from "../component/TanstackTable/TanstackTable";
import { Loader } from "../component/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import { Router } from "react-router-dom";

const ManageUser = () => {
  const [showModal, setshowModal] = useState(false);
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const [isEditingData, setIsEditingData] = useState(false);
  const authToken = localStorage.getItem("authtoken");
  const [userData, setUserData] = useState({});
  const userRole = useSelector((state) => state.userInfo.role);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    console.log(name, value, "Setrhdtjydty");
    setUserData((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    const getAdminList = async () => {
      try {
        dispatch({ type: IS_LOADING, payload: true });
        const authToken = localStorage.getItem("authtoken");
        const res = await axios.get(
          "https://helpdesk-latest.onrender.com/user_accounts/accounts/?role=parent",
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );

        dispatch({ type: IS_LOADING, payload: false });
        setUserList(res.data || []);
      } catch (error) {
        console.log(error.response.status == 401, "ergerger");
        if (error.response.status == 401) {
          window.location.href = "/login";
        }

        dispatch({ type: IS_LOADING, payload: false });
      }
    };
    getAdminList();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const authToken = localStorage.getItem("authtoken");
      const res = await axios.delete(
        `https://helpdesk-latest.onrender.com/user_accounts/accounts/${userId}`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      toast.success("Deleted Successfully.");
      getAdminList();
    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        window.location.href = "/login";
      }
    }
  };

  const handleEditUser = async (userData) => {
    console.log(userData, "Zergefews");
    delete userData.password;

    setshowModal(true);
    setIsEditingData(true);
    setUserData(userData);
  };

  const editAdmin = async () => {
    try {
      const res = await axios.patch(
        `https://helpdesk-latest.onrender.com/user_accounts/accounts/${userData.id}/`,
        userData,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      toast.success("edited successfully.");
    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        window.location.href = "/login";
      }
    }
  };

  return (
    <>
      {(userRole === "manager" || "admin") && (
        <>
          <div className="manage-user-container">
            <div className="flex justify-between items-center">
              <Title />
            </div>

            {isLoading ? (
              <Loader />
            ) : (
              <div className="table-container">
                <TanStackTable
                  users={userList}
                  deleteUser={handleDeleteUser}
                  editUser={handleEditUser}
                />
              </div>
            )}

            {showModal && (
              <Modal onClose={() => setshowModal(false)}>
                <h2 className="text-lg font-semibold">
                  {isEditingData ? "Edit User" : " Add User"}
                </h2>
                <div className="flex flex-col">
                  <div className="my-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      last Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={userData.first_name || ""}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="my-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={userData.last_name || ""}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="my-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={userData.email || ""}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  {/* <div className="my-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div> */}

                  {isEditingData ? (
                    <button
                      onClick={editAdmin}
                      className=" mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Edit user
                    </button>
                  ) : (
                    <button
                      onClick={addAdmin}
                      className=" mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Add user
                    </button>
                  )}
                  {/* <button className=" mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button> */}
                </div>
              </Modal>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ManageUser;
