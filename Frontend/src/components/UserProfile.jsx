import { Box, Avatar, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { useAuth } from "../providers/AuthProvider";

export default function UserProfile() {
  const { name, email } = useAuth();

  return (
    <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
      <Avatar
        sx={{
          background: grey[100],
          width: 80,
          height: 80,
          mr: 2,
          color: blue[500],
        }}
      >
        {name[0]}
      </Avatar>
      <Box>
        <Typography variant="h6" sx={{ color: grey[900] }}>
          {name}
        </Typography>
        <Typography sx={{ color: grey[900] }}>{email}</Typography>
      </Box>
    </Box>
  );
}
