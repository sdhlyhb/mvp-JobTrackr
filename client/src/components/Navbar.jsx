import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import { orange, blue, grey } from "@mui/material/colors";

import SearchIcon from "@mui/icons-material/Search";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import DownloadIcon from "@mui/icons-material/Download";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Logo = styled("div")(({ theme }) => ({
  backgroundColor: "primary",
  width: 60,
  height: 60,
}));

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "40px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

function Navbar() {
  const today = new Date().toLocaleString("en-US");
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Logo>
          <img
            src="img/logo2.png"
            alt="logo"
            style={{ width: 60, height: 60, overflow: "auto" }}
          />
        </Logo>
        <Search>
          <SearchIcon size="large" sx={{ color: grey[500] }} />

          <InputBase placeholder="search..." />
        </Search>
        <Icons>
          <Tooltip title="Download Full Application Record">
            <Button >
              <DownloadIcon sx={{ fontSize: 30, color: "white" }} />
              <a
                href="/api/allApplications/report"
                download={`Application_Record_${today}.csv`}
                style={{ fontSize: 15, color: "white" }}
              >
                {" "}
                record
              </a>
            </Button>
          </Tooltip>
          <Tooltip title="Display Stats">
            <IconButton>
              <InsertChartIcon sx={{ fontSize: 30, color: "white" }} />
            </IconButton>
          </Tooltip>

          <Avatar
            sx={{ width: 40, height: 40 }}
            src="xxxx.png"
            alt="Serena"
            onClick={(e) => setOpen(true)}
          />
        </Icons>
      </StyledToolbar>
      <Menu
        id="positioned-menu"
        aria-labelledby="positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Navbar;