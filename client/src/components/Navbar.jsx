import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
  Modal,
  Grid,
} from "@mui/material";
import { orange, blue, grey } from "@mui/material/colors";

import SearchIcon from "@mui/icons-material/Search";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import DownloadIcon from "@mui/icons-material/Download";
import DataPieChart from "./DataPieChart.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  logout,
  db,

} from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  minWidth: "95%",
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: blue[100],
  boxShadow: 24,
  p: 3,
};

function Navbar({ onChangeKeyword, searchKeywords, search, data }) {
  const today = new Date().toLocaleString("en-US");
  const [open, setOpen] = useState(false);
  const [statsPop, setStatsPop] = useState(false);
  const handleStatsClose = (e) => setStatsPop(false);
  const [profilePop, setProfilePop] = useState(false);
  const handleProfileClose = (e) => setProfilePop(false);
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log("this is fetched name:", doc);
      setName(data.name);
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) {
      console.log(user);
      fetchUserName();
    }
    else if (!user) navigate("/");

  }, [user, loading]);

  useEffect(() => {
    search(searchKeywords);
  }, [searchKeywords]);

  const logoutClick = (e) => {
    logout();
  };
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

          <InputBase
            placeholder="search by keyword..."
            onChange={onChangeKeyword}
            style={{ display: "hidden" }}
          />
        </Search>
        <Icons>
          <Tooltip title="Download Full Application Record">
            <Button>
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
            <IconButton onClick={(e) => setStatsPop(true)}>
              <InsertChartIcon sx={{ fontSize: 30, color: "white" }} />
            </IconButton>
          </Tooltip>

          <Tooltip title = {name}>
            <Avatar
            sx={{ width: 40, height: 40 }}
            src="xxxx.png"
            alt={name}
            onClick={(e) => setOpen(true)}

          />
          </Tooltip>
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
        <MenuItem onClick={e => setProfilePop(true)
        }>Profile</MenuItem>
        <MenuItem onClick={logoutClick}>Logout</MenuItem>
      </Menu>
      <Modal open={statsPop} onClose={handleStatsClose}>
        <Box sx={style}>
          <Typography
            style={{ fontFamily: "Roboto", fontWeight: "600" }}
            variant="h6"
            component="h2"
          >
            {" "}
            Your Metrics
          </Typography>
          <DataPieChart data={data} />
        </Box>
      </Modal>
      <Modal open={profilePop} onClose={handleProfileClose}>
        <Box sx={{...style }} align="center">
      <Grid>
          <Avatar
            sx={{ width: 40, height: 40 }}
            src="xxxx.png"
            alt={name}
            onClick={(e) => setOpen(true)}

          />
      </Grid>

          <Typography
            style={{ fontFamily: "Arial", fontWeight: "600", color:blue[900] }}
            variant="h6"
            component="h2"
          >
            {" "}
            Username: {name},

          </Typography>
          <Typography
            style={{ fontFamily: "Arial", fontWeight: "600" }}
            variant="h6"
            component="h2"
          >
            {" "}
            Email: {user?.email}

          </Typography>
          <Typography
            style={{ fontFamily: "Arial", fontWeight: "400", fontStyle: "Italic" }}
          >
            {" "}
            Last Login at: {new Date(Number(user?.metadata.lastLoginAt)).toLocaleString()}

          </Typography>
        </Box>
      </Modal>
    </AppBar>
  );
}

export default Navbar;
