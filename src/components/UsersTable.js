import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../api/fetchusers";
import FilterTabs from "./FilterTabs";
import Users from "./Users";
import SearchTab from "./SearchTab";
import LoopIcon from "@mui/icons-material/Loop";

const UsersTable = () => {
  const dispatch = useDispatch();

  const { filteredArrayState, isLoading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return !isLoading ? (
    <>
      <SearchTab />
      <table className="usersTable">
        <tbody>
          <FilterTabs />
          {filteredArrayState.map((user) => (
            <Users user={user} />
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <div className="loaderDiv">
      <LoopIcon />
      <p>Fetching the data...</p>
    </div>
  );
};

export default UsersTable;
