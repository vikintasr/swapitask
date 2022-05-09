import { configureStore } from "@reduxjs/toolkit";
import userss from "./users";

const store = configureStore({
  reducer: { users: userss },
});

export default store;
