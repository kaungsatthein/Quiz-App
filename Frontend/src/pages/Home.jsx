import {
  RadioGroup,
  Radio,
  MobileStepper,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../providers/AuthProvider";
import { green, red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [quizes, setQuizes] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const { auth, authUser, setResult, setHighscore, highscore } = useAuth();

  const maxSteps = quizes.length;
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === false || null) {
      window.location.href = "/login";
    }
    (async () => {
      const api = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${api}/api/quizes`);
      setQuizes(res.data);
    })();
  }, [auth]);

  const handleOption = (questionID, option) => {
    setSelectedOptions((prevSelectedOption) => ({
      ...prevSelectedOption,
      [questionID]: option,
    }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleConfirm = async () => {
    const resultData = quizes.map((quiz) => {
      const userAnswer = selectedOptions[quiz._id];
      const correctAnswer = quiz.answer;
      return {
        question: quiz.question,
        userAnswer,
        correctAnswer,
        isCorrect: userAnswer === correctAnswer,
      };
    });

    setResult(resultData);

    const correct = resultData.filter((result) => result.isCorrect).length;
    const incorrect = resultData.length - correct;

    let high;

    if (correct > highscore) {
      high = correct;
    } else {
      high = highscore;
    }

    const api = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.patch(
        `${api}/api/users/${authUser._id}`,
        { highscore: high }
      );

      if (res.status === 200) {
        setHighscore(high);
        setCorrectCount(correct);
        setIncorrectCount(incorrect);
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Error updating highscore:", error);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    window.location.reload();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
          <Typography variant="h6" id="modal-modal-title">
            Quiz Results
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, color: green[700] }}
          >
            Correct Answers: {correctCount}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 1, color: red[500] }}
          >
            Incorrect Answers: {incorrectCount}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleClose} sx={{ mt: 2 }}>
              Close
            </Button>
            <Button onClick={() => navigate("/result")} sx={{ mt: 2 }}>
              Result
            </Button>
          </Box>
        </Box>
      </Modal>
      {quizes.length > 0 && (
        <Container
          maxWidth="sm"
          sx={{ display: "flex", alignItems: "center", mb: 10 }}
        >
          <FormControl sx={{ width: "100%" }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              {activeStep + 1}. {quizes[activeStep].question}
            </Typography>
            <Box>
              <RadioGroup
                aria-labelledby="quiz-options-group-label"
                name={`quiz-options-group-${activeStep}`}
                value={selectedOptions[quizes[activeStep]._id] || ""}
                onChange={(e) =>
                  handleOption(quizes[activeStep]._id, e.target.value)
                }
              >
                {quizes[activeStep].options.map((option, i) => (
                  <FormControlLabel
                    key={i}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </Box>
          </FormControl>
        </Container>
      )}
      <MobileStepper
        variant="text"
        steps={maxSteps}
        sx={{ m: 15 }}
        activeStep={activeStep}
        nextButton={
          activeStep === maxSteps - 1 ? (
            <Button onClick={handleConfirm}>Confirm</Button>
          ) : (
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          )
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Container>
  );
}
