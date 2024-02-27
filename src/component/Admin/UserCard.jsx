import React from "react";
import { MdDelete } from "react-icons/md";
import { deleteUser } from "../../state_management/service/operations/adminOperations";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteUser({ id: user._id }));
  };

  return (
    <div className="user-card">
      <div className="user-info">
        <h4>{user.telegramId}</h4>
        <p>{user.name}</p>
        <p>
          {user.city}, {user.country}
        </p>
      </div>
      <MdDelete className="delete-icon" onClick={handleDeleteClick} />
    </div>
  );
};

export default UserCard;
