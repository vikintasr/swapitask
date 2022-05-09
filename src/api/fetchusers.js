import { api } from "./index";
import { userActions } from "../store/users";

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
  
      dispatch(userActions.usersSuccess(fetchedData));
    } else {
      dispatch(
        userActions.usersSuccess(JSON.parse(localStorage.getItem("peopleInfoInLocalStorage")))
      );
    }
  };