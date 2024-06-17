import React, { useEffect, useState } from "react";
import { Container, Typography, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import axios from "axios";
import UsersCard from "../components/UsersCard";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { isAdmin, auth } = useAuth();
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();


  useEffect(() => {
    if (isAdmin === false || auth === false) {
      // navigate("/");
    } else {
      (async () => {
        try {
          const res = await axios.get(`${api}/api/users`);
          if (res.status === 200) {
            setUsers(res.data);
          }
        } catch (error) {
          console.error("Failed to fetch users:", error);
        }
      })();
    }
  }, [isAdmin, api, navigate]);

  const handleDelete = async (id) => {
    const res = await axios.delete(`${api}/api/users/${id}`);
    if (res.status === 200) {
      setUsers(users.filter((user) => user._id != id));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
        Users
      </Typography>
      {!users ? (
        <Typography variant="h6" color="initial">
          There is no user.
        </Typography>
      ) : (
        users.map((user) => (
          <Card sx={{ mb: 2 }} key={user._id}>
            <UsersCard
              id={user._id}
              name={user.name}
              email={user.email}
              highscore={user.highscore}
              isAdmin={user.isAdmin}
              handleDelete={handleDelete}
            />
          </Card>
        ))
      )}
    </Container>
  );
}
