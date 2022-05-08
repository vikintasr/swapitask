import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/users";
import FilterTabs from "./FilterTabs";
import Users from "./Users";
import SearchTab from "./SearchTab";
import LoopIcon from "@mui/icons-material/Loop";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);
  const { filteredUsers } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
    console.log(filteredUsers)
    console.log(users)
  }, [dispatch]);

  return !isLoading ? (
    <>
      <SearchTab />
      <table className="usersTable">
        <tbody>
          <FilterTabs />
          {filteredUsers.map((user) => (
            <Users user={user} />
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <LoopIcon />
  );
};

export default UsersTable;
