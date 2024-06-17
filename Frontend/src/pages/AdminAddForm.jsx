import {
  Container,
  Typography,
  Input,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";
import {
  AddCircleOutline as AddCircleOutlineIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { red } from "@mui/material/colors";

export default function AdminAddForm() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [answer, setAnswer] = useState("");
  const [hasError, setHasError] = useState(false);

  const { id } = useParams();
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (id) {
        const res = await axios.get(`${api}/api/quizes/${id}`);
        if (res.status === 200) {
          setQuestion(res.data.question);
          setOptions(res.data.options);
          setAnswer(res.data.answer);
        }
      }
    })();
  }, [id]);

  const addOption = () => {
    if (newOption !== "") {
      setOptions([...options, newOption]);
      setNewOption("");
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!question || options.length === 0 || !answer) {
        setHasError(true);
        return false;
      }
      const quiz = {
        question,
        options,
        answer,
      };
      let res;
      if (id) {
         res = await axios.patch(`${api}/api/quizes/${id}`, quiz);
      } else {
         res = await axios.post(`${api}/api/quizes`, quiz);
      }
      if (res.status === 200) {
        navigate(`/adminQuestions`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h5" color="inherit" sx={{ mb: 4 }}>
        Do you wanna add question?
      </Typography>

      <form onSubmit={handleSubmit}>
        {hasError && (
          <Alert severity="warning" sx={{ my: 4 }}>
            Please fill all informations.
          </Alert>
        )}
        <Input
          value={question}
          fullWidth
          placeholder="Question"
          sx={{ mb: 4 }}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <Input
          value={newOption}
          fullWidth
          placeholder="Options"
          onChange={(e) => {
            setNewOption(e.target.value);
          }}
          endAdornment={
            <IconButton onClick={addOption}>
              <AddCircleOutlineIcon />
            </IconButton>
          }
        />
        <List>
          {options &&
            options.map((option, i) => (
              <ListItem
                key={i}
                secondaryAction={
                  <IconButton
                    edge="end"
                    sx={{ color: red[500] }}
                    onClick={() => handleDelete(i)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText>
                  {i + 1}. {option}
                </ListItemText>
              </ListItem>
            ))}
        </List>
        <Input
          fullWidth
          placeholder="Answer"
          sx={{ my: 4 }}
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
        <Button variant="contained" fullWidth sx={{ mt: 2, p: 1 }} type="submit">
          Add question
        </Button>
      </form>
    </Container>
  );
}
