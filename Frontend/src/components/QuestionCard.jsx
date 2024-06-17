import {
  Typography,
  Card,
  CardContent,
  List,
  ListItemText,
  Box,
  IconButton,
} from "@mui/material";
import {
  ModeEdit as ModeEditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function QuestionCard({ quiz, i, handleDelete }) {

  const navigate = useNavigate();

  return (
    <Card sx={{ position: "relative", width: 550,minHeight: 300, mr: 3, mb: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" color="inherit">
              {i + 1}. {quiz.question}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton color="primary" onClick={()=>{
              navigate(`/adminQuestions/edit/${quiz._id}`)
            }}>
              <ModeEditIcon />
            </IconButton>
            <IconButton
              sx={{ color: red[500] }}
              onClick={() => {
                handleDelete(quiz._id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        {quiz.options.map((option, i) => {
          return (
            <List key={i}>
              <ListItemText>
                {i + 1}. {option}
              </ListItemText>
            </List>
          );
        })}

        <Box sx={{ bottom: 0, position: "absolute", right: 0, m: 2 }}>
          <Typography color="primary">Answer: {quiz.answer}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
