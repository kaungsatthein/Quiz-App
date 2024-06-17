import { useUIState } from "../providers/UIStateProvider";

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

import DarkModeIcon from "./DarkModeIcon";

export default function Navbar() {
  const { setOpenDrawer } = useUIState();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setOpenDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          color="inherit"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Quiz App
        </Typography>

        <DarkModeIcon />
      </Toolbar>
    </AppBar>
  );
}
