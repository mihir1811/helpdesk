import React from 'react';
import ConversationItem from './ConversationItem';

const Conversation = ({ userList, handleSelectuser , selecteduser }) => {

  console.log(userList ,"wdcascds")

  return (
    <div className="p-1">
      {userList.map((user, index) => (
        <ConversationItem
          key={index}
          user={user}
          selecteduser={selecteduser}
          name={`${user?.sender?.first_name || user?.first_name} ${user?.sender?.last_name || user?.last_name}`}
          handleSelectuser={handleSelectuser}
        />
      ))}
    </div>
  );
};

export default Conversation;