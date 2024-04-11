import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IS_LOADING } from "../redux/action";
import axios from "axios";
import toast from "react-hot-toast";


const ProfilePage = () => {
  const userProfileData = useSelector((state) => state.userInfo);
  const [userData, setUserData] = useState(userProfileData);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  console.log(userProfileData, "Adgnsntrsgtnt");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    console.log(name, value, "Setrhdtjydty");
    setUserData((values) => ({ ...values, [name]: value }));
  };

  const saveUserData = async () => {
    try {
      dispatch({ type: IS_LOADING, payload: true });
      console.log("savw data")
      const authToken = localStorage.getItem("authtoken");

      const res = await axios.patch(
        `https://helpdesk-7ad4.onrender.com/user_accounts/accounts/${userData.id}/`,
        userData,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      dispatch({ type: USER_INFO, payload: res.data });
      dispatch({ type: IS_LOADING, payload: false });

      toast.success("edited successfully.");
    } catch (error) {
        dispatch({ type: IS_LOADING, payload: false });
        toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="my-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={userData.first_name || ""}
            disabled={!isEdit}
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
            value={userData.last_name || ""}
            onChange={handleChange}
            disabled={!isEdit}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="my-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            email
          </label>
          <input
            type="text"
            name="email"
            value={userData.email || ""}
            onChange={handleChange}
            disabled={!isEdit}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <button
          onClick={() => {
            setIsEdit(!isEdit);
            setUserData(userProfileData);
          }}
          className=" mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {!isEdit ? "Edit" : "Cancel"}
        </button>
        <button
          onClick={saveUserData}
          className=" mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
