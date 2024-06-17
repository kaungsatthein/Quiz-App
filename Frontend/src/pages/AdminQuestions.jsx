import { Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import QuestionCard from "../components/QuestionCard";

export default function AdminQuestions() {
  const [quizes, setQuizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${api}/api/quizes`);
        setQuizes(res.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    const res = await axios.delete(`${api}/api/quizes/${id}`);
    if (res.status === 200) {
      setQuizes(quizes.filter((quiz) => quiz._id !== id));
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        {isLoading ? (
          <Typography variant="h6" color="inherit">
            Loading...
          </Typography>
        ) : (
          <>
            <Typography variant="h5" color="inherit" sx={{ mb: 4 }}>
              Questions
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {quizes.length > 0 ? (
                quizes.map((quiz, i) => {
                  return (
                    <QuestionCard
                      quiz={quiz}
                      key={i}
                      i={i}
                      handleDelete={handleDelete}
                    />
                  );
                })
              ) : (
                <Typography variant="h6" color="inherit">
                  There is no question.
                </Typography>
              )}
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
