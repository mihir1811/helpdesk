import React, { useEffect } from 'react'

const ConversationItem = ({ name,  selecteduser, user , handleSelectuser}) => {
console.log(selecteduser ,"hiiiii" , user , name) 



    return (
        <div onClick={() => handleSelectuser(user)}>
            <div className={`p-1 m-1 rounded-md ${selecteduser.id == user.id ? "bg-[#111827] text-white " :"bg-gray-300 hover:bg-gray-400"}` } >
                <div className={'flex items-center p-2  cursor-pointer  '}>
                    <div className="w-7 h-7 m-1">
                        <img className="rounded-full" src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" alt="avatar"/>
                    </div>
                    <div className="flex-grow p-2">
                        <div className="flex justify-between text-md ">
                            <div className="text-sm font-medium ">{name}</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationItem