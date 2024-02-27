import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAPIs } from "../../state_management/service/operations/apiKeyOperations";
import ApiKeyCard from "./ApiKeyCard";

const ManageAPIKeys = () => {
  const { apiKeys } = useSelector((state) => state.apiKeys);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAPIs());
  }, []);

  return (
    <div className="manage-api-keys">
      <h1 className="heading">Manage API Keys</h1>
      <div className="api-cards">
        {apiKeys &&
          apiKeys.map((api, index) => <ApiKeyCard key={index} api={api} />)}
      </div>
    </div>
  );
};

export default ManageAPIKeys;
