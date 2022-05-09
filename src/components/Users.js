import React from "react";
import PlanetsModal from "./PlanetsModal";

const Users = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <tr>
        <td>{user.name}</td>
        <td>{user.height}</td>
        <td>{user.mass}</td>
        <td>{user.created}</td>
        <td>{user.edited}</td>
        <td className="planetTab" onClick={handleOpen}>
          {user.planet}
        </td>
      </tr>
      <PlanetsModal user={user} open={open} setOpen={setOpen} />
    </>
  );
};

export default Users;
