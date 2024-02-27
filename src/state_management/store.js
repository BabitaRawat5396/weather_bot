import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/loginSlice";
import adminReducer from "./slice/adminSlice";
import apiKeysReducer from "./slice/apiKeySlice";
import frequencyReducer from "./slice/frequencySlice";

const rootReducer = combineReducers({
  login: authReducer,
  admin: adminReducer,
  apiKeys: apiKeysReducer,
  frequency: frequencyReducer,
});

export default rootReducer;
