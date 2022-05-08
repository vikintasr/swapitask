import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {  userActions } from "../store/users";

const SearchTab = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
  
    const changeSearchTerm = (e) => {
        setSearchTerm(e.target.value);
      };
    
      useEffect(() => {
        dispatch(userActions.searchByName(searchTerm));
      }, [searchTerm, dispatch]);
  
    return (
    
        <input className="searchTab" onChange={changeSearchTerm} type="text" value={searchTerm}></input>
      
    );
};

export default SearchTab;
