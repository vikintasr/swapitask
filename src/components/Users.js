import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const Users = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <tr>
        <td>{user.name}</td>
        <td>{user.height}</td>
        <td>{user.mass}</td>
        <td>{user.created}</td>
        <td>{user.edited}</td>
        <td className="planetTab" onClick={handleOpen}>{user.planet}</td>
      </tr>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Planet name - {user.planet}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Climate - {user.planetClimate}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Diameter - {user.planetDiameter}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Population - {user.planetPopulation}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Users;
