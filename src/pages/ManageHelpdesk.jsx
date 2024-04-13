import React, { useEffect, useState } from "react";
import { Title } from "../component/Title";
import Modal from "../component/Modal";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../component/Loader";
import { IS_LOADING } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";

const ManageHelpdesk = () => {
  const dispatch = useDispatch();
  const [showModal, setshowModal] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({});
  const authToken = localStorage.getItem("authtoken");
  const [staffData, setStaffData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedSubcategoryUser, setSelectedSubcategoryUser] = useState(null);
  const [isSubCategory, setIsSubcategory] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [parentCategoryId, setParentCategoryId] = useState(null);
  const [isEditModel, setIsEditModel] = useState(false);
  const [type, setType] = useState("Add");
  const [selectedCategoryData, setSelectedCategoryData] = useState({});

  const handleChange = (event, type) => {
    switch (type) {
      case "inputValue":
        const name = event.target.name;
        const value = event.target.value;

        setNewCategory((values) => ({ ...values, [name]: value }));
        break;

      case "dropdownValue":
        const selectedUserId = event.target.value;
        const user = staffData.find(
          (user) => user.id === parseInt(selectedUserId, 10)
        );
        setSelectedUser(user);
        break;

      case "subcategoryInput":
        const subCategoryName = event.target.name;
        const subCategoryValue = event.target.value;

        setSubCategoryData((values) => ({
          ...values,
          [subCategoryName]: subCategoryValue,
        }));
        break;

      case "subcategoryContactPerson":
        const selectedSubcategoryUserId = event.target.value;
        const subCategoryUser = staffData.find(
          (user) => user.id === parseInt(selectedSubcategoryUserId, 10)
        );
        setSelectedSubcategoryUser(subCategoryUser);
        break;

      default:
        break;
    }
  };

  const getStaffData = async () => {
    try {
      const res = await axios.get(
        "https://helpdesk-7ad4.onrender.com/user_accounts/accounts/?role=staff",
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      setStaffData(res.data);
    } catch (error) {
      console.log(error);
      if(error.response.status == 401){
        window.location.href = '/login';
      }
    }
  };

  useEffect(() => {
    getStaffData();
  }, []);

  const getCatrgories = async () => {
    try {
      dispatch({ type: IS_LOADING, payload: true });
      const res = await axios.get(
        "https://helpdesk-7ad4.onrender.com/common/categories/"
      );
      console.log(res);
      setAllCategories(res.data || []);
      dispatch({ type: IS_LOADING, payload: false });
    } catch (error) {
      console.log(error);
      dispatch({ type: IS_LOADING, payload: false });
      if(error.response.status == 401){
        window.location.href = '/login';
      }
    }
  };

  const AddCategories = async () => {
    try {
      console.log(newCategory, "Zdthsghergfed", selectedUser);
      const response = await axios.post(
        "https://helpdesk-7ad4.onrender.com/common/categories/",
        { ...newCategory, contact_person: selectedUser?.id },
        {
          headers: {
            "Content-Type": "application/json", // Set appropriate content type for JSON data
          },
        }
      );

      toast.success("Category added successfully.");
      setshowModal(false);
      getCatrgories();
    } catch (error) {
      console.log(error);
      if(error.response.status == 401){
        window.location.href = '/login';
      }
    }
  };

  const addSubCategories = async () => {
    try {
      console.log(selectedUser, "wefewfefewfew");
      const response = await axios.post(
        "https://helpdesk-7ad4.onrender.com/common/categories/",
        { ...newCategory, contact_person: selectedUser?.id },
        {
          headers: {
            "Content-Type": "application/json", // Set appropriate content type for JSON data
          },
        }
      );

      setParentCategoryId(response?.data?.id);

      toast.success("Category added successfully.");
      getCatrgories();

      console.log(selectedSubcategoryUser, subCategoryData, "etjetyymrtyjry");

      setIsSubcategory(true);
    } catch (error) {
      console.log(error);
      if(error.response.status == 401){
        window.location.href = '/login';
      }
    }
  };

  const submitCategory = async () => {
    try {
      // const getParentId = allCategories.find()
      console.log(parentCategoryId);
      const payload = {
        ...newCategory,
        parent_category: parentCategoryId,
        contact_person: selectedSubcategoryUser?.id,
      };

      const response = await axios.post(
        "https://helpdesk-7ad4.onrender.com/common/categories/",
        payload,
        {
          headers: {
            "Content-Type": "application/json", // Set appropriate content type for JSON data
          },
        }
      );

      toast.success("Subcategory added successfully.");
      getCatrgories();

      setshowModal(false);
      setIsSubcategory(true);
    } catch (error) {
      console.log(error);
      if(error.response.status == 401){
        window.location.href = '/login';
      }
    }
  };

  useEffect(() => {
    getCatrgories();
  }, []);

  const modelContent = () => {
    switch (type) {
      case "Add":
        return (
          <>
            {" "}
            <h2 className="text-lg font-semibold">Add Category</h2>
            <div className="flex flex-col">
              <div className="my-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Category Name
                </label>
                <input
                  type="text"
                  name="category_name"
                  onChange={(e) => handleChange(e, "inputValue")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="my-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Answer:
                </label>
                <input
                  type="text"
                  name="answer"
                  onChange={(e) => handleChange(e, "inputValue")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="my-2 flex">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  contact person name:
                </label>
                <select
                  className="border rounded-md w-[50%] px-1 focus:border-cyan-500"
                  value={selectedUser?.id ?? ""}
                  onChange={(e) => handleChange(e, "dropdownValue")}
                >
                  <option value="">Select User</option>
                  {staffData?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </option>
                  ))}
                </select>
              </div>

              {isSubCategory ? (
                <>
                  <h2 className=" text-lg font-semibold mt-2">
                    Sub Category details
                  </h2>
                  <div className="my-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      sub Category Name
                    </label>
                    <input
                      type="text"
                      name="category_name"
                      onChange={(e) => handleChange(e, "subcategoryInput")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="my-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Answer:
                    </label>
                    <input
                      type="text"
                      name="answer"
                      onChange={(e) => handleChange(e, "subcategoryInput")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="my-2 flex">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      contact person name(if something else):
                    </label>
                    <select
                      className="border rounded-md w-[50%] px-1 focus:border-cyan-500"
                      value={selectedSubcategoryUser?.id ?? ""}
                      onChange={(e) =>
                        handleChange(e, "subcategoryContactPerson")
                      }
                    >
                      <option value="">Select User</option>
                      {staffData?.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.first_name} {user.last_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                ""
              )}

              {isSubCategory ? (
                <div className="grid gap-6 md:grid-cols-1  mt-3">
                  <button
                    onClick={submitCategory}
                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2  mt-3">
                  <button
                    type="button"
                    onClick={addSubCategories}
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Add Sub Category
                  </button>
                  <button
                    onClick={AddCategories}
                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </>
        );
        break;
      case "Edit":
        return <h1>Edit</h1>;
        break;
      case "View":
        const staffuser = staffData.find(
          (user) => user?.id == selectedCategoryData?.contact_person
        );

        console.log(staffuser, "WEgvvwefewf");
        return (
          <>
            <div className="flex flex-col">
              <div className="my-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Category Name
                </label>
                <input
                  type="text"
                  disabledtrue
                  value={selectedCategoryData?.category_name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="my-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Answer:
                </label>
                <input
                  type="text"
                  name="answer"
                  disabled={true}
                  value={selectedCategoryData?.answer}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="my-2 ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  contact person name:
                </label>
                <input
                  type="text"
                  name="answer"
                  disabled={true}
                  value={`${staffuser?.first_name || ""} ${
                    staffuser?.last_name || ""
                  }`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {console.log(selectedCategoryData, "ererer")}
              {selectedCategoryData?.has_subcategories ? (
                <>
                  <h2 className=" text-lg font-semibold mt-2">
                    Sub Category details
                  </h2>

                  {selectedCategoryData?.subcategories.map((data, index) => {

                    const staffuser = staffData.find(
                      (user) => user?.id == data?.contact_person
                    );
                    return (
                      <div key={index}>
                        <div className="my-2">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            sub Category Name
                          </label>
                          <input
                            type="text"
                            name="category_name"
                            disabled={true}
                            value={data.category_name}
                            // onChange={(e) => handleChange(e, "subcategoryInput")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                        <div className="my-2">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Answer:
                          </label>
                          <input
                            type="text"
                            name="answer"
                            disabled={true}
                            value={data.answer}
                            // onChange={(e) => handleChange(e, "subcategoryInput")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                        <div className="my-2 ">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            contact person name:
                          </label>
                          <input
                            type="text"
                            name="answer"
                            disabled={true}
                            value={`${staffuser?.first_name || ""} ${
                              staffuser?.last_name || ""
                            }`}
                            // onChange={(e) => handleChange(e, "subcategoryInput")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                ""
              )}
            </div>
          </>
        );

        break;
      default:
        break;
    }
  };

  return (
    <div className="manage-user-container">
      <div className="flex justify-between items-center">
        <Title />
        <button
          onClick={() => {
            setshowModal((prev) => !prev);
            setIsSubcategory(false);
            setSelectedUser({});
            setSelectedSubcategoryUser({});
            setType("Add");
          }}
          className="px-12 py-3 my-3 font-medium bg-[#ffce47] hover:bg-[rgba(255,206,71,0.8)] uppercase hover:text-black-600 text-black-500 rounded-lg text-sm"
        >
          + Add Category
        </button>
      </div>

      <div className="mt-3 p-0">
        {allCategories.length > 0 ? (
          <>
            {allCategories.map((data, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 my-4 px-5 text-white bg-black"
                  >
                    <div>{data.category_name}</div>
                    <div>
                      <button
                        onClick={() => {
                          // selectedca(data)
                          setType("Edit");
                          setshowModal(true);
                          setSelectedCategoryData(data);
                        }}
                        className="px-5 py-2 rounded-md mr-3 bg-black text-[#ffce47]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          // selectedca(data)
                          setType("View");
                          setshowModal(true);
                          setSelectedCategoryData(data);
                        }}
                        className="bg-[#ffce47] text-black px-6 py-2 rounded-md"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        ) : (
          // <Loader />
          <h1 className="my-7 text-center text-lg">No Categories </h1>
        )}
      </div>

      {showModal && (
        <Modal onClose={() => setshowModal(false)}>
          {modelContent(type)}
          {/* <h2 className="text-lg font-semibold">Add Category</h2>
          <div className="flex flex-col">
            <div className="my-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Category Name
              </label>
              <input
                type="text"
                name="category_name"
                onChange={(e) => handleChange(e, "inputValue")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="my-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Answer:
              </label>
              <input
                type="text"
                name="answer"
                onChange={(e) => handleChange(e, "inputValue")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="my-2 flex">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                contact person name:  
              </label>
              <select
                className="border rounded-md w-[50%] px-1 focus:border-cyan-500"
                value={selectedUser?.id ?? ""}
                onChange={(e) => handleChange(e, "dropdownValue")}
              >
                <option value="">Select User</option>
                {staffData?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </option>
                ))}
              </select>
            </div>

            {isSubCategory ? (
              <>
                <h2 className=" text-lg font-semibold mt-2">
                  Sub Category details
                </h2>
                <div className="my-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    sub Category Name
                  </label>
                  <input
                    type="text"
                    name="category_name"
                    onChange={(e) => handleChange(e, "subcategoryInput")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="my-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Answer:
                  </label>
                  <input
                    type="text"
                    name="answer"
                    onChange={(e) => handleChange(e, "subcategoryInput")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="my-2 flex">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    contact person name(if something else):
                  </label>
                  <select
                    className="border rounded-md w-[50%] px-1 focus:border-cyan-500"
                    value={selectedSubcategoryUser?.id ?? ""}
                    onChange={(e) =>
                      handleChange(e, "subcategoryContactPerson")
                    }
                  >
                    <option value="">Select User</option>
                    {staffData?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              ""
            )}

            {isSubCategory ? (
              <div className="grid gap-6 md:grid-cols-1  mt-3">
                <button
                  onClick={submitCategory}
                  className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2  mt-3">
                <button
                  type="button"
                  onClick={addSubCategories}
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Add Sub Category
                </button>
                <button
                  onClick={AddCategories}
                  className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            )}
          </div> */}
        </Modal>
      )}
    </div>
  );
};

export default ManageHelpdesk;
