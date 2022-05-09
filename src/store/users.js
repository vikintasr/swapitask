import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/index";

const slice = createSlice({
  name: "users",
  initialState: {
    users: [],
    filteredUsers: [],
    isLoading: true,
    search: "",
  },
  reducers: {
    usersSuccess: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.filteredUsers = action.payload;
    },
    filterByName: (state) => {
      state.filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
    },
    filterByHeight: (state) => {
      state.filteredUsers.sort((a, b) => {
        if (b.height === "unknown" && a.height === "unknown") return 0;
        else if (b.height === "unknown") return -1;
        else if (a.height === "unknown") return 1;
        else return b.height - a.height;
      });
    },
    filterByMass: (state) => {
      state.filteredUsers.sort((a, b) => {
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
        filteredUsers:
          action.payload.length > 0 ? filteredUsers : [...state.users],
      };
    },
  },
});

export default slice.reducer;

const { usersSuccess } = slice.actions;

export const fetchUsers = () => async (dispatch) => {
  if (!localStorage.getItem("peopleInfoInLocalStorage")) {
    let nextPage = "https://swapi.dev/api/people";

    let people = [];
    let fetchedData = [];

    while (nextPage) {
      const res = await fetch(nextPage);

      const { next, results } = await res.json();

      nextPage = next;

      people = [...people, ...results];
    }
    for await (const result of people) {
      const { data: item } = await api.get(result.homeworld);
      fetchedData.push({
        name: result.name,
        height: result.height,
        mass: result.mass,
        created: result.created.substring(0, 10),
        edited: result.edited.substring(0, 10),
        planet: item.name,
        planetDiameter: item.diameter,
        planetClimate: item.climate,
        planetPopulation: item.population,
      });
    }

    localStorage.setItem(
      "peopleInfoInLocalStorage",
      JSON.stringify(fetchedData)
    );

    dispatch(usersSuccess(fetchedData));
  } else {
    dispatch(
      usersSuccess(JSON.parse(localStorage.getItem("peopleInfoInLocalStorage")))
    );
  }
};

export const userActions = slice.actions;
