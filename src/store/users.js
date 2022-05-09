import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "users",
  initialState: {
    users: [],
    filteredArrayState: [],
    isLoading: true,
    search: "",
  },
  reducers: {
    usersSuccess: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.filteredArrayState = action.payload;
    },
    filterByName: (state) => {
      state.filteredArrayState.sort((a, b) => a.name.localeCompare(b.name));
    },
    filterByHeight: (state) => {
      state.filteredArrayState.sort((a, b) => {
        if (b.height === "unknown" && a.height === "unknown") return 0;
        else if (b.height === "unknown") return -1;
        else if (a.height === "unknown") return 1;
        else return b.height - a.height;
      });
    },
    filterByMass: (state) => {
      state.filteredArrayState.sort((a, b) => {
        if (b.mass === "unknown" && a.mass === "unknown") return 0;
        else if (b.mass === "unknown") return -1;
        else if (a.mass === "unknown") return 1;
        else
          return (
            parseFloat(b.mass.replace(/,/g, "")) -
            parseFloat(a.mass.replace(/,/g, ""))
          );
      });
    },
    searchByName: (state, action) => {
      const filteredUsers = state.users.filter((user) =>
        user.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        filteredArrayState:
          action.payload.length > 0 ? filteredUsers : [...state.users],
      };
    },
  },
});

export default slice.reducer;

export const userActions = slice.actions;
