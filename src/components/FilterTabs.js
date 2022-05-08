import React from "react";
import { userActions } from "../store/users";
import { useDispatch } from "react-redux";

const FilterTabs = () => {
  const dispatch = useDispatch();
  const filterName = () => {
    dispatch(userActions.filterByName());
  };

  const filterHeight = () => {
    dispatch(userActions.filterByHeight());
  };

  const filterMass = () => {
    dispatch(userActions.filterByMass());
  }



  return (
    <tr className="filterTabs">
      <th onClick={filterName}>Name</th>
      <th onClick={filterHeight}>Height</th>
      <th onClick={filterMass}>Mass</th>
      <th>Created</th>
      <th>Edited</th>
      <th>Planet</th>
    </tr>
  );
};

export default FilterTabs;
