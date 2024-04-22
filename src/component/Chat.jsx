import React, { useState, useEffect } from "react";
import Conversation from "./Conversation";
import MessagesOld from "./MessagesOld";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { IS_LOADING } from "../redux/action";

const Chat = () => {
  const [userList, setUsersList] = useState([]);
  const [selecteduser, setSelecteduser] = useState({});
  const [allCategories, setAllCategories] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [message, setMessage] = useState(""); // State to store message content
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [conversationData, setConversationData] = useState({});
  const userData = useSelector((data) => data.userInfo);
  const authToken = localStorage.getItem("authtoken");
  const dispatch = useDispatch();

  const handleSelectuser = (data) => {
    console.log(data, "Sfgjxdtfgv");
    setMessagesData([])
    setSelecteduser(data);
  };

  console.log(selecteduser, "erhtsrthfgsd");

  const getChatuserList = async () => {
    try {
      switch (userData.role) {
        case "admin":
          const adminResponse = await axios.get(
            "https://helpdesk-latest.onrender.com/user_accounts/accounts/?role=staff" ,
            {
              headers: {
                Authorization: `Token ${authToken}`,
              },
            }
          );
          setUsersList(adminResponse.data);
          break;
        case "staff":
          const staffResponse = await axios.get(
            `https://helpdesk-latest.onrender.com/common/conversation/list-by-category/38/`,
            {
              headers: {
                Authorization: `Token ${authToken}`,
              },
            }
          );
          setUsersList(staffResponse.data);
          break;
        case "parent":
          const parentResponse = await axios.get(
            `https://helpdesk-latest.onrender.com/common/conversation/list-for-user/${userData.id}/`,
            {
              headers: {
                Authorization: `Token ${authToken}`,
              },
            }
          );
          setUsersList(parentResponse.data);
          break;
        default:
          console.error("Unknown user role:", userData);
      }
    } catch (error) {

      if (error.response.status == 401) {
        window.location.href = "/login";
      }
      console.error("Error fetching user list:", error);
    }
  };

  const getCatrgories = async () => {
    try {
      dispatch({ type: IS_LOADING, payload: true });
      const res = await axios.get(
        "https://helpdesk-latest.onrender.com/common/categories/",
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      console.log(res);
      setAllCategories(res.data || []);
      dispatch({ type: IS_LOADING, payload: false });
    } catch (error) {
      console.log(error);
      dispatch({ type: IS_LOADING, payload: false });
      if (error.response.status == 401) {
        window.location.href = "/login";
      }
    }
  };

  const getMessagesByConversation = async (conversationId) => {
    try {
      const res = await axios.get(
        `https://helpdesk-latest.onrender.com/common/messages/by_conversation/${conversationId}/`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      setMessagesData(res.data);


    } catch (error) {
      if (error.response.statue == 401) {
        window.location.href = "/login";
      }
      console.log(error);
    }
  };

  const sendMessageApi = async (data) => {
    try {
      const payload = {
        content: message,
        sender: userData?.id,
        conversation: conversationData?.id || data?.id || selecteduser?.conversationId,
      };

      // console.log(payload ,'verwvefddsvds' ,conversationData , data , selecteduser)
      const res = await axios.post(
        `https://helpdesk-latest.onrender.com/common/messages/`,
        payload
      );
    } catch (error) {
      console.log(error);
      if (error.response.statue == 401) {
        window.location.href = "/login";
      }
    }
  };

  const getConversationDetails = async (req, res) => {
    try {

      if(selecteduser?.id != "new_chat" && selecteduser?.id){
        const res = await axios.get(
          `https://helpdesk-latest.onrender.com/common/conversation/${selecteduser?.id}/`
        );
        setSelecteduser((prevState)=>{
          return {...prevState ,conversationId:res?.data?.id}
        });

        getMessagesByConversation( selecteduser?.conversationId||res?.data?.id )
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConversationDetails();
  }, [selecteduser?.id]);

  const initiatesConversation = async (categoryId) => {
    try {
      const payload = {
        sender: userData.id,
        category: selectedSubCategory?.id || selectedCategory?.id,
      };

      const res = await axios.post(
        "https://helpdesk-latest.onrender.com/common/conversation/",
        payload,
        {
          headers: {
            "Content-Type": "application/json", // Set appropriate content type for JSON data
          },
        }
      );

      setConversationData(res.data);
      console.log(res.data, "x");
      return res.data;

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const onmessageSend = async (message) => {
    var connvData;
    // Assuming the server expects messages in a specific format
    const formattedMessage = {
      from: userData.email,
      to: selecteduser,
      content: message,
    };
    const addMessages = [{ ...messagesData }, formattedMessage];

    // dispatch({ type: ADD_MESSAGES, payload: formattedMessage });
    console.log(addMessages, "QWwesxa");
    if (messagesData.length == 0) {
      console.log("call api");
      connvData = await initiatesConversation();
    }

    console.log(message ,"Zdfbsdfgsds")

    const payload = {
      content: message,
      sender: userData?.id,
      conversation: conversationData?.id || connvData?.id || selecteduser?.categoryId,
    };

    console.log(payload, "Rvsaccx", connvData, conversationData);

    sendMessageApi(connvData);
    setMessage("");

    setMessagesData((prev) => [...prev, formattedMessage]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (message.trim()) {
      onmessageSend(message);
    }
  };

  useEffect(() => {
    getChatuserList();
    getCatrgories();

    if (userData.role === "parent") {
      setSelecteduser({
        id: "new_chat",
      });
    }
  }, []);

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex h-full bg-white dark:bg-gray-900">
        <div className="w-80 h-full dark:bg-gray-800 bg-gray-100 p-2 hidden md:block">
          <div className="h-full overflow-y-auto">
            {userData.role === "parent" && (
              <button
                className={`  w-full rounded-md py-3 ${
                  selecteduser.id == "new_chat"
                    ? "bg-[#111827] text-white"
                    : "bg-gray-300 hover:bg-gray-400 hover:text-black"
                } `}
                onClick={() => {
                  setSelecteduser({
                    id: "new_chat",
                  });
                }}
              >
                new chat
              </button>
            )}

            {console.log(conversationData, "Aergferfw")}
            <Conversation
              selecteduser={selecteduser}
              userList={userList}
              handleSelectuser={handleSelectuser}
            />
          </div>
        </div>
        <div className="flex-grow h-full p-2 rounded-md">
          <MessagesOld
            selectedUser={selecteduser}
            allCategories={allCategories}
            messages={messagesData}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
