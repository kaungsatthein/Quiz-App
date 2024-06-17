import { Box, Container, Typography, Divider } from "@mui/material";
import { useAuth } from "../providers/AuthProvider";
import { green, red } from "@mui/material/colors";

export default function Result() {
  const { result } = useAuth();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
        Correct Answer
      </Typography>
      {result &&
        result.map((data, i) => (
          <>
            <Box key={i}>
              <Typography variant="h6" color="inherit" sx={{ mb: 1 }}>
                {i + 1}. {data.question}
              </Typography>
              <Typography>Your answer: {data.userAnswer || ""}</Typography>
              <Typography>Correct answer: {data.correctAnswer}</Typography>
              <Typography sx={{ display: "flex" }}>
                Your answer is
                <Typography
                  sx={{
                    color:
                      data.userAnswer === data.correctAnswer
                        ? green[500]
                        : red[500],
                    pl: 0.5,
                  }}
                >
                  {data.userAnswer === data.correctAnswer ? "true" : "false"}.
                </Typography>
              </Typography>
            </Box>
            <Divider sx={{ my: 1.5 }} />
          </>
        ))}
    </Container>
  );
}
