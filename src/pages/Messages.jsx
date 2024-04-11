import React, { useState } from "react";
import { Title } from "../component/Title";
import Modal from "../component/Modal";
import Chat from "../component/Chat";

const ManageMessages = () => {


  const adminData = [
    {
      name:"peter",
      id:1,
      email:"peter@FaGlassMartiniAlt.com"
    },
    {
      name:"tony",
      id:2,
      email:"tony@FaGlassMartiniAlt.com"
    },
    {
      name:"bruce",
      id:3,
      email:"bruce@FaGlassMartiniAlt.com"
    },
    {
      name:"utsav",
      id:4,
      email:"utsav@FaGlassMartiniAlt.com"
    },
    {
      name:"urvil",
      id:5,
      email:"urvil@FaGlassMartiniAlt.com"
    },
    {
      name:"tom",
      id:6,
      email:"tom@FaGlassMartiniAlt.com"
    },
    {
      name:"stark",
      id:7,
      email:"stark@FaGlassMartiniAlt.com"
    },
    {
      name:"jems",
      id:8,
      email:"jems@FaGlassMartiniAlt.com"
    },

  ]


  const [selectedUser ,setSelectedUser]  = useState({})
  return (
    <div className="manage-user-container h-[calc(100%)]">
      {/* <div className="flex justify-between items-center">
        <Title />
      </div> */}
      <div className="relative h-full">
        <Chat />
      </div>

      {/* <div className="relative flex h-full">
        <div className="flex w-100 flex-col w-[30%]">
          <div className="userListContainer overflow-y-auto">
            {adminData.map((data , index)=>{
              return(
                <>
                  <div onClick={()=>setSelectedUser(data)} className={`${selectedUser?.name === data.name  && "text-green-500"} text-lg p-3 border-2 w-full hover:bg-slate-300`}>{data.name}</div>
                </>
              )
            })}

          </div>
        </div>
        <div className="w-100">
          <div className="chat-header">
            <h1 className="text-center">{ selectedUser ?selectedUser.name : "selected User"}</h1>
          </div>
          <div className="chat-body"></div>
          <div className="chat-footer"></div>
          
        </div>
      </div> */}
    </div>
  );
};

export default ManageMessages;
