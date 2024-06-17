import { IconButton } from "@mui/material";
import {
  DarkMode as DarkmodeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";

import { useAppTheme } from "../providers/AppThemeProvider";

export default function DarkModeIcon() {
  
  const { mode, setMode } = useAppTheme();

  return (
    <>
      {mode === "light" ? (
        <IconButton onClick={() => setMode("dark")} color="inherit">
          <DarkmodeIcon />
        </IconButton>
      ) : (
        <IconButton onClick={() => setMode("light")} color="inherit">
          <LightModeIcon />
        </IconButton>
      )}
    </>
  );
}
