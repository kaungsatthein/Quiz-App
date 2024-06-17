import { Container, Typography, Input, Button, Alert } from "@mui/material";
import { useAuth } from "../providers/AuthProvider";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { auth, setAuth, setAuthUser } = useAuth();
  const api = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setHasError(false);
    setErrorMessage("");

    if (!email || !password) {
      setHasError(true);
      setErrorMessage("Please fill all informations.");
      return false;
    }
    const user = {
      email,
      password,
    };
    try {
      const res = await axios.post(`${api}/api/users/login`, user);
      if (res.status === 200) {
        const data = res.data;
        localStorage.setItem("token", data.token);
        const verify = await axios.get(`${api}/api/users/verify`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
        if (verify.status === 200) {
          setAuth(true);
          setAuthUser(verify.data.user);
          navigate("/");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setHasError(true);
        setErrorMessage("Account is not found.");
      } else {
        setHasError(true);
        setErrorMessage("Your password is incorrect.");
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
        Login Form
      </Typography>

      <form onSubmit={handleLogin}>
        {hasError && (
          <Alert severity="warning" sx={{ my: 4 }}>
            {errorMessage}
          </Alert>
        )}
        <Input
          fullWidth
          placeholder="Email"
          sx={{ mb: 4 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          fullWidth
          placeholder="Password"
          sx={{ mb: 4 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, p: 1 }}
          type="submit"
        >
          Sign in
        </Button>
        <Button
          variant="text"
          fullWidth
          sx={{ mt: 2, p: 1 }}
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </form>
    </Container>
  );
}
