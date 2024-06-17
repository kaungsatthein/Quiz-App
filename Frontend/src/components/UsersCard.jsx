import {
  Typography,
  CardContent,
  Avatar,
  Box,
  IconButton,
  Modal,
  Button,
  Input,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { blue, grey, red } from "@mui/material/colors";
import { useState } from "react";
import axios from "axios";

export default function UsersCard({
  id,
  name,
  email,
  highscore,
  isAdmin,
  handleDelete,
}) {
  const [modal, setModal] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newHighscore, setNewHighscore] = useState(highscore);
  const [newAdmin, setNewAdmin] = useState(isAdmin);

  const api = import.meta.env.VITE_API_URL;

  const handleEdit = () => {
    setModal(true);
  };

  const handleSwitch = () => {
    setNewAdmin((prevNewAdmin) => !prevNewAdmin);
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleSave = async () => {
    const updatedUser = {
      name: newName,
      email: newEmail,
      highscore: newHighscore,
      isAdmin: newAdmin,
    };

    try {
      const res = await axios.patch(`${api}/api/users/${id}`, updatedUser);
      if (res.status === 200) {
        console.log("User updated successfully");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
    setModal(false);
  };

  return (
    <>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            width: 400,
            margin: "auto",
            mt: 20,
            padding: 2,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" color="primary">
            User Detail
          </Typography>
          <Input
            fullWidth
            placeholder="Name"
            sx={{ my: 2 }}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Input
            fullWidth
            placeholder="Email"
            sx={{ my: 2 }}
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <Input
            fullWidth
            placeholder="Highscore"
            sx={{ my: 2 }}
            value={newHighscore}
            onChange={(e) => setNewHighscore(e.target.value)}
          />

          <FormControlLabel
            control={<Switch checked={newAdmin} onChange={handleSwitch} />}
            label="Set as an admin"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleClose} sx={{ mt: 2 }}>
              Close
            </Button>
            <Button onClick={handleSave} sx={{ mt: 2 }}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              background: grey[100],
              width: 80,
              height: 80,
              mr: 2,
              color: blue[500],
            }}
          >
            {newName[0]}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: grey[900] }}>
              {newName}
            </Typography>
            <Typography sx={{ color: grey[900] }}>{newEmail}</Typography>
            <Typography sx={{ color: grey[900] }}>
              Highscore: {newHighscore}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <IconButton sx={{ color: blue[500] }} onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton sx={{ color: red[500] }} onClick={() => handleDelete(id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </>
  );
}
