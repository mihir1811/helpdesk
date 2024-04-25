import React, { useEffect, useState } from "react";
import { Title } from "../component/Title";
import Modal from "../component/Modal";
import TanStackTable from "../component/TanstackTable/TanstackTable";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { IS_LOADING } from "../redux/action";
import { Loader } from "../component/Loader";
import { data } from "autoprefixer";
import toast from "react-hot-toast";

const ManageAdmin = () => {
  const [showModal, setshowModal] = useState(false);
  const [adminList, setAdminList] = useState([]);
  const dispatch = useDispatch();
  const [newUserData, setNewUserData] = useState({});
  const [isEditingData, setIsEditingData] = useState(false);
  const authToken = localStorage.getItem("authtoken");
  const userRole = useSelector((state) => state.userInfo.role);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    console.log(name, value, "Setrhdtjydty");
    setNewUserData((values) => ({ ...values, [name]: value }));
  };

  const isLoading = useSelector((state) => state.isLoading);

  const getAdminList = async () => {
    try {
      dispatch({ type: IS_LOADING, payload: true });
      const authToken = localStorage.getItem("authtoken");
      const res = await axios.get(
        "https://helpdesk-latest.onrender.com/user_accounts/accounts/?role=staff",
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      dispatch({ type: IS_LOADING, payload: false });
      setAdminList(res.data || []);
      return res.data;
    } catch (error) {
      console.log(error);
      dispatch({ type: IS_LOADING, payload: false });
      if (error.response.status == 401) {
        window.location.href = "/login";
      }
    }
  };
  useEffect(() => {
    getAdminList();
  }, []);

  const addAdmin = async () => {
    try {
      dispatch({ type: IS_LOADING, payload: true });
      const response = await axios.post(
        "https://helpdesk-latest.onrender.com/user_accounts/accounts/register/staff/",
        { ...newUserData, role: "staff" },
        {
          headers: {
            "Content-Type": "application/json", // Set appropriate content type for JSON data
            Authorization: `Token ${authToken}`,
          },
        }
      );
      setNewUserData({});
      getAdminList();
      setshowModal((prev) => !prev);
      setIsEditingData(false);
      toast.success("added successfully.");
      dispatch({ type: IS_LOADING, payload: false });
    } catch (error) {
      console.log(error);
      dispatch({ type: IS_LOADING, payload: false });

      if (error.response.status == 401) {
        window.location.href = "/login";
      }
    }
  };

  const handleDeleteAdmin = async (userId) => {
    try {
      console.log(userId);
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

  const handleEditAdmin = async (userData) => {
    delete userData.password;

    setshowModal(true);
    setIsEditingData(true);
    setNewUserData(userData);
  };

  const editAdmin = async () => {
    try {
      const res = await axios.patch(
        `https://helpdesk-latest.onrender.com/user_accounts/accounts/${newUserData.id}/`,
        newUserData,
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
        <div className="manage-user-container">
          <div className="flex justify-between items-center">
            <Title />
            <button
              onClick={() => {
                setshowModal((prev) => !prev);
                setNewUserData({});
              }}
              className="px-12 py-3 my-3 font-medium bg-[#ffce47] hover:bg-[rgba(255,206,71,0.8)] uppercase hover:text-black-600 text-black-500 rounded-lg text-sm"
            >
              + Add Admin
            </button>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="table-container">
              <TanStackTable
                users={adminList}
                deleteUser={handleDeleteAdmin}
                editUser={handleEditAdmin}
              />
            </div>
          )}

          {showModal && (
            <Modal onClose={() => setshowModal(false)}>
              <h2 className="text-lg font-semibold">
                {" "}
                {isEditingData ? "Edit" : "Add"} Admin
              </h2>
              <div className="flex flex-col">
                <div className="my-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={newUserData.first_name || ""}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="my-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={newUserData.last_name || ""}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="my-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    email
                  </label>
                  {/* <input
                    type="text"
                    name="email"
                    value={newUserData.email || ""}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  /> */}

                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {newUserData.email}
                </div>
                </div>
                {isEditingData ? (
                  ""
                ) : (
                  <div className="my-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      type="text"
                      name="password"
                      value={newUserData.password || ""}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                )}

                {isEditingData ? (
                  <button
                    onClick={editAdmin}
                    className=" mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Edit Admin
                  </button>
                ) : (
                  <button
                    onClick={addAdmin}
                    className=" mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Add Admin
                  </button>
                )}
              </div>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default ManageAdmin;
