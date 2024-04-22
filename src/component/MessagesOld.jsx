import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MessagesOld = ({
  selectedUser,
  allCategories,
  messages,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  message,
  setMessage,
  handleSendMessage,
}) => {
  const [showCategory, setShowCategory] = useState(true);
  const [showSubCategory, setShowSubCategory] = useState(true);
  const userData = useSelector((data) => data.userInfo);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategory(false);
  };

  const handleSubcategory = (data) => {
    setSelectedSubCategory(data);
    setShowSubCategory(false);
  };

  console.log(allCategories, "WRevceaswxswa");
  return (
    <div className="flex-grow h-full flex flex-col">
      <div className="w-full h-15 p-1 bg-[#ffce47] dark:bg-gray-800 shadow-md rounded-xl rounded-bl-none rounded-br-none">
        <div className="flex p-2 align-middle items-center">
          <div className="border rounded-full border-white p-1/2">
            <img
              className="w-14 h-14 rounded-full"
              src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
              alt="avatar"
            />
          </div>
          <div className="flex-grow p-2">
            <div className="text-md text-gray-50 font-semibold">
              {selectedUser?.sender?.first_name}{" "}
              {selectedUser?.sender?.last_name}
            </div>
            {/* <div className="flex items-center">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <div className="text-xs text-gray-50 ml-1">Online</div>
            </div> */}
          </div>
          <div className="flex items-center">
            {/* <button
              type="button"
              className="me-3 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              End Chat
            </button> */}
            <div className="p-2 text-white cursor-pointer hover:bg-black rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {selectedUser.id === "new_chat" ? (
        <div className="w-full flex-grow bg-gray-100 dark:bg-gray-900 my-2 p-2 overflow-y-auto">
          {showCategory &&
            allCategories.map((data, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleCategorySelect(data)}
                  className="flex items-center justify-center w-full"
                >
                  <div className="p-3 bg-gray-400 dark:bg-gray-800  mx-3 my-1 rounded-2xl sm:w-3/4 md:w-3/6">
                    <div className="text-black-700 dark:text-gray-200">
                      {data.category_name}
                    </div>
                  </div>
                </div>
              );
            })}

          {showSubCategory &&
            selectedCategory?.has_subcategories &&
            selectedCategory?.subcategories.map((data, index) => {
              return (
                <div
                  key={index}
                  className="flex items-end justify-center w-full"
                  onClick={() => handleSubcategory(data)}
                >
                  <div className="p-3 bg-gray-400 dark:bg-gray-800  mx-3 my-1 rounded-2xl sm:w-3/4 md:w-3/6">
                    <div className="">{data.category_name}</div>
                  </div>
                </div>
              );
            })}

          {!showCategory && selectedCategory?.answer && (
            <div className="flex items-end w-3/4">
              <div className="p-3 bg-white dark:bg-gray-800  mx-3 my-1 rounded-2xl sm:w-3/4 md:w-3/6">
                <div className="text-black-700 dark:text-gray-200">
                  {selectedCategory?.answer}
                </div>
              </div>
            </div>
          )}
          {!showSubCategory && selectedSubCategory?.answer && (
            <div className="flex items-end w-3/4">
              <div className="p-3 bg-white dark:bg-gray-800  mx-3 my-1 rounded-2xl sm:w-3/4 md:w-3/6">
                <div className="text-black-700 dark:text-gray-200">
                  {selectedCategory?.answer}
                </div>
              </div>
            </div>
          )}

          {messages.map((data, index) => {
            return (
              <div className="flex justify-end" key={index}>
                <div className="flex items-end w-3/4 bg-[rgba(255,206,71,1)] dark:bg-gray-800 m-1 rounded-xl rounded-br-none sm:w-3/4 max-w-xl md:w-auto">
                  <div className="p-2">
                    <div className="text-black-200 ">{data.content}</div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* <div className="flex justify-end">
            <div className="flex items-end w-3/4 bg-[rgba(255,206,71,1)] dark:bg-gray-800 m-1 rounded-xl rounded-br-none sm:w-3/4 max-w-xl md:w-auto">
              <div className="p-2">
                <div className="text-black-200 ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-end w-3/4">
            <img
              className="w-8 h-8 m-3 rounded-full"
              src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
              alt="avatar"
            />
            <div className="p-3 bg-[rgba(255,206,71,0.8)] dark:bg-gray-800 mx-3 my-1 rounded-2xl rounded-bl-none sm:w-3/4 md:w-3/6">
              <div className="text-xs text-black-100 hidden dark:text-gray-200">
                Rey Jhon A. Baqurin
              </div>
              <div className="text-black-700 dark:text-black-200">
                Hello po ang pogi niyo :)
              </div>
              <div className="text-xs text-black-400">just now</div>
            </div>
          </div> */}
        </div>
      ) : (
        <div className="w-full flex-grow bg-gray-100 dark:bg-gray-900 my-2 p-2 overflow-y-auto">
          {messages.map((data, index) => {
            return (
              <div className={`${userData?.id !== data.sender ? "flex justify-end" :"flex items-end w-3/4" } `} key={index}>
                <div className={`flex items-end w-3/4 bg-[rgba(255,206,71,1)] dark:bg-gray-800 m-1 rounded-xl ${userData?.id === data.sender ? "rounded-bl-none" : "rounded-br-none"} sm:w-3/4 max-w-xl md:w-auto`}>
                  <div className="p-2">
                    <div className="text-black-200 ">{data.content}</div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* <div className="flex items-end w-3/4">
            <img
              className="hidden w-8 h-8 m-3 rounded-full"
              src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
              alt="avatar"
            />
            <div className="w-8 m-3 rounded-full" />
            <div className="p-3 bg-[rgba(255,206,71,0.8)] dark:bg-gray-800 mx-3 my-1 rounded-2xl rounded-bl-none sm:w-3/4 md:w-3/6">
              <div className="text-xs text-black-600 dark:text-gray-200">
                Rey Jhon A. Baqurin
              </div>
              <div className="text-black-700 dark:text-gray-200">
                gsegjsghjbdg bfb sbjbfsj fsksnf jsnfj snf nnfnsnfsnj
              </div>
              <div className="text-xs text-black-400">1 day ago</div>
            </div>
          </div>
          <div className="flex items-end w-3/4">
            <img
              className="w-8 h-8 m-3 rounded-full"
              src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
              alt="avatar"
            />
            <div className="p-3 bg-[rgba(255,206,71,0.8)] dark:bg-gray-800  mx-3 my-1 rounded-2xl rounded-bl-none sm:w-3/4 md:w-3/6">
              <div className="text-xs text-black-100 hidden dark:text-gray-200">
                Rey Jhon A. Baqurin
              </div>
              <div className="text-black-700 dark:text-gray-200">
                gsegjsghjbdg bfb sbjbfsj fsksnf jsnfj snf nnfnsnfsnj
              </div>
              <div className="text-xs text-black-400">1 day ago</div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="flex items-end w-auto bg-[rgba(255,206,71,1)] dark:bg-gray-800 m-1 rounded-xl rounded-br-none sm:w-3/4 md:w-auto">
              <div className="p-2">
                <div className="text-black-200">
                  Hello ? How Can i help you ?
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex items-end w-3/4 bg-[rgba(255,206,71,1)] dark:bg-gray-800 m-1 rounded-xl rounded-br-none sm:w-3/4 md:w-auto">
              <div className="p-2">
                <div className="text-black-200">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex items-end w-3/4 bg-[rgba(255,206,71,1)] dark:bg-gray-800 m-1 rounded-xl rounded-br-none sm:w-3/4 max-w-xl md:w-auto">
              <div className="p-2">
                <div className="text-black-200 ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-end w-3/4">
            <img
              className="w-8 h-8 m-3 rounded-full"
              src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
              alt="avatar"
            />
            <div className="p-3 bg-[rgba(255,206,71,0.8)] dark:bg-gray-800 mx-3 my-1 rounded-2xl rounded-bl-none sm:w-3/4 md:w-3/6">
              <div className="text-xs text-black-100 hidden dark:text-gray-200">
                Rey Jhon A. Baqurin
              </div>
              <div className="text-black-700 dark:text-black-200">
                Hello po ang pogi niyo :)
              </div>
              <div className="text-xs text-black-400">just now</div>
            </div>
          </div> */}
        </div>
      )}

      <div className="h-15  p-3 rounded-xl rounded-tr-none rounded-tl-none bg-gray-100 dark:bg-gray-800">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <div className="search-chat flex flex-grow p-2">
            <input
              className="input text-gray-700 dark:text-gray-200 text-sm p-2 focus:outline-none bg-gray-100 dark:bg-gray-800  flex-grow rounded-l-md"
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(e);
                }
              }}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Type your message ..."
            />
            <button
              type="submit"
              className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200  flex justify-center items-center pr-3 text-gray-400 rounded-r-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessagesOld;
