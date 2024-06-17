import { Container, Typography, Input, Button, Alert } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const { auth } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setHasError(false);
    setErrorMessage("");

    if (!name || !email || !password) {
      setHasError(true);
      setErrorMessage("Please fill all informations.");
      return false;
    }

    const user = {
      name,
      email,
      password,
    };

    try {
      const res = await axios.post(`${api}/api/users/register`, user);
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setHasError(true);
        setErrorMessage("Account is already registered.");
      } else {
        setHasError(true);
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  if (auth) {
    window.location.href = "/home";
    return false;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h5" color="inherit" sx={{ mb: 4 }}>
        Register Form
      </Typography>

      <form onSubmit={handleRegister}>
        {hasError && (
          <Alert severity="warning" sx={{ my: 4 }}>
            {errorMessage}
          </Alert>
        )}
        <Input
          fullWidth
          placeholder="Name"
          sx={{ mb: 4 }}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Input
          type="email"
          fullWidth
          placeholder="Email"
          sx={{ mb: 4 }}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          fullWidth
          placeholder="Password"
          sx={{ mb: 4 }}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, p: 1 }}
          type="submit"
        >
          Register
        </Button>
      </form>
    </Container>
  );
}
