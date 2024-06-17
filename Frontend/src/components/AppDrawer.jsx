import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import {
  EditNote as EditNoteIcon,
  FormatListBulleted as FormatListBulletedIcon,
  Home as HomeIcon,
  HowToReg as HowToRegIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Person as PersonIcon
} from "@mui/icons-material";

import UserProfile from "./UserProfile";

import { Drawer, Typography } from "@mui/material";
import { useUIState } from "../providers/UIStateProvider";
import { useNavigate } from "react-router-dom";
import { blue, grey } from "@mui/material/colors";
import { useAuth } from "../providers/AuthProvider";

export default function AppDrawer() {
  const { openDrawer, setOpenDrawer } = useUIState();
  const { auth, authUser, setAuth, setAuthUser, isAdmin, highscore } = useAuth();

  const navigate = useNavigate();

  const close = () => {
    setOpenDrawer(false);
  };

  return (
    <Drawer anchor="left" open={openDrawer} onClose={close}>
      <Box sx={{ width: 300 }}>
        {auth && (
          <>
            <Box
              sx={{
                height: 180,
                background: grey[300],
                p: 5,
                position: "relative",
              }}
              onClick={() => {
                navigate(`/edit/${authUser._id}`);
                setOpenDrawer(false);
              }}
            >
              <UserProfile authUser={authUser} />
              <Typography sx={{ position: "absolute", bottom:0, right: 0, m: 2, fontSize: 14, color: blue[500]}}>Highscore: {highscore}</Typography>
            </Box>
          </>
        )}
        <List>
          {auth && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/");
                  setOpenDrawer(false);
                }}
              >
                <ListItemIcon sx={{ mr: -1 }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
          )}
          {!auth && (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/register");
                    setOpenDrawer(false);
                  }}
                >
                  <ListItemIcon sx={{ mr: -1 }}>
                    <HowToRegIcon />
                  </ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/login");
                    setOpenDrawer(false);
                  }}
                >
                  <ListItemIcon sx={{ mr: -1 }}>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sign in" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
        {auth && (
          <>
            {isAdmin && (
              <>
                <Divider />
                <Typography color="primary" sx={{ pl: 2, mt: 2 }}>
                  Admin Panel
                </Typography>
              </>
            )}
            <List>
              {isAdmin && (
                <>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate("/adminAddForm");
                        setOpenDrawer(false);
                      }}
                    >
                      <ListItemIcon sx={{ mr: -1 }}>
                        <EditNoteIcon />
                      </ListItemIcon>
                      <ListItemText primary="Create Questions" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate("/adminQuestions");
                        setOpenDrawer(false);
                      }}
                    >
                      <ListItemIcon sx={{ mr: -1 }}>
                        <FormatListBulletedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Questions" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate("/users");
                        setOpenDrawer(false);
                      }}
                    >
                      <ListItemIcon sx={{ mr: -1 }}>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary="Users" />
                    </ListItemButton>
                  </ListItem>
                </>
              )}
              <ListItem disablePadding sx={{ mt: !isAdmin ? -2 : ""}}>
                <ListItemButton
                  onClick={() => {
                    setAuth(false);
                    setAuthUser({});
                    localStorage.removeItem("token");
                    setOpenDrawer(false);
                    navigate("/login");
                  }}
                >
                  <ListItemIcon sx={{ mr: -1, }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sign out" />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        )}
      </Box>
    </Drawer>
  );
}
