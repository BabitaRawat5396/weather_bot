import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFrequencies,
  updateFrequencies,
} from "../../state_management/service/operations/frequencyOperations";

const ManageMessage = () => {
  const [formData, setFormData] = useState({
    messageLimit: 0,
    resetDuration: 0,
  });
  const { frequencies } = useSelector((state) => state.frequency);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateFrequencies(formData));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getFrequencies());
      } catch (error) {
        console.log("Error fetching frequencies:", error);
      }
    };

    fetchData();
  }, [dispatch]); // Add dispatch as a dependency

  const messageLimit = frequencies?.[0]?.value || 0;
  const resetDuration = frequencies?.[1]?.value || 0;

  // Set initial form data with values from frequencies
  useEffect(() => {
    setFormData({
      messageLimit,
      resetDuration,
    });
  }, [frequencies]);

  return (
    <div className="manage-message-container">
      <h1 className="heading">Manage Message Frequency</h1>
      <form onSubmit={handleSubmit} className="manage-message-form">
        <div>
          <div className="input-group">
            <label>Message Limit:</label>
            <input
              type="number"
              name="messageLimit"
              value={formData.messageLimit}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="input-group">
            <label>Duration (in milliseconds):</label>
            <input
              type="number"
              name="resetDuration"
              value={formData.resetDuration}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Set Limits
        </button>
      </form>
    </div>
  );
};

export default ManageMessage;
