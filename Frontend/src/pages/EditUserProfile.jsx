import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Input,
  Button,
  Typography, Alert
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../providers/AuthProvider";

export default function EditUserProfile() {
  const [hasError, setHasError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { setAuthUser, isAdmin, setIsAdmin } = useAuth();

  console.log(isAdmin);

  const { id } = useParams();
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${api}/api/users/${id}`);
        if (res.status === 200) {
          setName(res.data.name);
          setEmail(res.data.email);
          setHighscore(res.data.highscore);
          setIsAdmin(res.data.isAdmin);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    })();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setHasError(true);
      return;
    }

    const user = {
      name,
      email,
    };

    try {
      const res = await axios.patch(`${api}/api/users/${id}`, user);
      if (res.status === 200) {
        setAuthUser(res.data);
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setHasError(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h5" color="inherit" sx={{ mb: 4 }}>
        Profile Data
      </Typography>
      <form onSubmit={handleUpdate}>
        {hasError && (
          <Alert severity="warning" sx={{ my: 4 }}>
            Please fill all information.
          </Alert>
        )}
        <Input
          fullWidth
          placeholder="Name"
          sx={{ mb: 4 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          fullWidth
          placeholder="Email"
          sx={{ mb: 4 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, p: 1 }}
          type="submit"
        >
          Update Profile
        </Button>
      </form>
    </Container>
  );
}
