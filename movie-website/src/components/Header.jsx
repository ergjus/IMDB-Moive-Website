import React from "react";
import InputField from "../utils/InputField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import {TextField} from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Header = ({loggedInUser = "Guest", onLogout, onSearch}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalCLose = () => setModalOpen(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header flex flex-row justify-between items-center content-center p-4 ">
      <h1 className="text-xl font-bold pl-4">IMDb's NextWatch</h1>
      <div className="flex flex-row gap-10" size="small">
        <div className="flex flex-row items-center gap-2 pr-7">
          <IconButton size="small" onClick={handleMenuClick}>
            <Avatar sx={{backgroundColor: "#FBECB2", color: "#151515"}}>
              {loggedInUser[0].toUpperCase()}
            </Avatar>
          </IconButton>
          <h3 className="font-bold">{loggedInUser.toLowerCase()}</h3>
        </div>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClick={handleMenuClose}
          onClose={handleMenuClose}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "#CECFC7",
              color: "#0f172a",
            },
          }}>
          <MenuItem disabled onClick={handleMenuClose}>
            Profile
          </MenuItem>
          <Divider />
          {/* <MenuItem onClick={onLogout}>Log out</MenuItem> */}
          <MenuItem onClick={onLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
              Logout
            </ListItemIcon>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
