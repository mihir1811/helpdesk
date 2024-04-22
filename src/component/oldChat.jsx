import React, { useState, useEffect } from "react";
import Conversation from "./Conversation";
import Messages from "./Messages";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ADD_MESSAGES } from "../redux/action";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const authToken = localStorage.getItem("authtoken");
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState(""); // State to store message content
  const userEmail = useSelector((data) => data.userInfo.email);
  const [userslist, setUsersList] = useState([]);
  const userRole = useSelector((state) => state.userInfo.role);
  const userInfo = useSelector((data) => data.userInfo);


  const dispatch = useDispatch();

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const onmessageSend = (message) => {
    // Assuming the server expects messages in a specific format
    const formattedMessage = {
      from: userEmail,
      to: selectedUser,
      message: message,
    };
    const addMessages = [{ ...messages }, formattedMessage];

    // dispatch({ type: ADD_MESSAGES, payload: formattedMessage });
    console.log(addMessages, "QWwesxa");
    if(messages.length == 0) {
      initiatesConversation()
    }
    setMessages((prev) => [...prev, formattedMessage]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (message.trim()) {
      // Check if message is not empty
      console.log(message, "WEvewverd");
      onmessageSend(message);
      setMessage(""); // Clear message input after sending
    }
  };

  const getUsersList = async () => {
    try {
      const res = await axios.get(
        `https://helpdesk-latest.onrender.com/common/messages/get_category_message_users_list/`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      setUsersList(res.data);
    } catch (error) {
      if (error.response.status == 401) {
        window.location.href = "/login";
      }
    }
  };

  const initiatesConversation = async (categoryId) => {
    try {
      const payload = {
        sender: userInfo.id,
        category: selectedCategory.id,
      };

      // const res = axios.post(
      //   "https://helpdesk-latest.onrender.com/common/conversation/"
      // );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  const userList = [
    {
      name: "tony",
      lastMessage: "hello",
      profileImage: "",
      userId: 1,
      lastMessageTimestamp: "",
    },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex h-full bg-white dark:bg-gray-900">
        <div className="w-80 h-full dark:bg-gray-800 bg-gray-100 p-2 hidden md:block">
          <div className="h-full overflow-y-auto">
            {userRole === "parent" && (
              <button className="bg-gray-900 text-white w-full rounded-md py-3">
                new chat
              </button>
            )}
            <Conversation
              users={/* your users data */ userList}
              onUserSelect={handleUserSelect}
            />{" "}
            {/* Pass onUserSelect function */}
          </div>
        </div>
        <div className="flex-grow h-full p-2 rounded-md">
          {/* {selectedUser && ( */}
          <Messages
            isParentUser={userRole === "parent"}
            messages={messages}
            textMsg={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
          />
          {/* )} Filter messages based on selected user */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
