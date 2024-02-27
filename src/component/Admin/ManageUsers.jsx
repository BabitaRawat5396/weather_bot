import { getAllUsers } from "../../state_management/service/operations/adminOperations";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";

const ManageUsers = () => {
  const { token } = useSelector((state) => state.login);
  const { users } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAllUsers() {
      dispatch(getAllUsers(token));
    }

    fetchAllUsers();
  }, []);

  return (
    <div className="manage-users">
      <h1 className="heading">Users</h1>
      <div className="user-cards">
        {users && users.map((user, idx) => <UserCard key={idx} user={user} />)}
      </div>
    </div>
  );
};

export default ManageUsers;
