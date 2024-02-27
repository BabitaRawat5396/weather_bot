import { updateAPI } from "../../state_management/service/operations/apiKeyOperations";
import { useDispatch } from "react-redux";
import { useState } from "react";

const ApiKeyCard = ({ api }) => {
  const dispatch = useDispatch();
  const [newAPI, setNewAPI] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateAPI = () => {
    if (newAPI === "") {
      setIsEditing(false);
      return;
    }
    dispatch(updateAPI(api.name, newAPI));
    setIsEditing(false);
  };

  // const handleDeleteAPI = () => {
  //   dispatch(deleteAPI(api.name));
  // };

  return (
    <div className="api-card">
      <p className="api-name">
        <strong>API Name:</strong> {api.name}
      </p>
      {isEditing ? (
        <div className="input-field">
          <input
            type="text"
            value={newAPI}
            onChange={(e) => setNewAPI(e.target.value)}
            className="api-input"
          />
          <p onClick={() => setIsEditing(false)}>X</p>
        </div>
      ) : (
        <p className="api-key">
          <strong>API Key:</strong> {api.value}
        </p>
      )}
      <div>
        <button
          onClick={isEditing ? handleUpdateAPI : () => setIsEditing(true)}
        >
          {isEditing ? "Save" : "Update"}
        </button>
        {/* <button onClick={handleDeleteAPI}>Delete</button> */}
      </div>
    </div>
  );
};

export default ApiKeyCard;
