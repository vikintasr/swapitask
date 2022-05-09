import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../store/users";

const SearchTab = () => {
  const dispatch = useDispatch();
  const [searchItemByName, setSearchItemByName] = useState("");

  const changeSearchTerm = (e) => {
    setSearchItemByName(e.target.value);
  };

  useEffect(() => {
    dispatch(userActions.searchByName(searchItemByName));
  }, [searchItemByName, dispatch]);

  return (
    <input
      className="searchTab"
      onChange={changeSearchTerm}
      type="text"
      value={searchItemByName}
    ></input>
  );
};

export default SearchTab;
