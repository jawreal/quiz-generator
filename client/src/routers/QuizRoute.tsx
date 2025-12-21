import MainLayout from "@/layouts/MainLayout";
import QuizPage from "@/pages/QuizPage";
import { Routes, Route, Navigate } from "react-router-dom";

const mockQuiz = {
  title: "Web Development Fundamentals Quiz",
  difficulty: "Beginner",
  quizType: "Mixed",
  score: 7,
  userPrompt: "Create an intermediate-level MERN STACK quiz with 10 questions (5 multiple-choice, 5 identification). Assess knowledge on MongoDB, Express.js, React.js, and Node.js. Include answers and explanations.", 
  questions: [
    // ===== Identification / Enumeration (No options) =====
   /* {
      questionNumber: 1,
      question: "What does HTML stand for?",
      correctAns: "HyperText Markup Language",
      userAns: ""
    },
    {
      questionNumber: 2,
      question: "What is the main purpose of CSS?",
      correctAns: "To style and layout web pages",
      userAns: "Hahha"
    },
    {
      questionNumber: 3,
      question: "Name the JavaScript method used to convert JSON to an object.",
      correctAns: "JSON.parse",
      userAns: ""
    },
    {
      questionNumber: 4,
      question: "What HTTP method is commonly used to update existing data?",
      correctAns: "PUT",
      userAns: "PUT"
    },
    {
      questionNumber: 5,
      question: "What database is commonly used with the MERN stack?",
      correctAns: "MongoDB",
      userAns: ""
    }, */
    // ===== Multiple Choice (With options) =====
    {
      questionNumber: 6,
      question: "Which hook is used for managing state in React?",
      options: ["useEffect", "useState", "useRef", "useMemo"],
      correctAns: "useState",
      userAns: "useStatse"
    }, 
    {
      questionNumber: 7,
      question: "Which of the following is a JavaScript framework?",
      options: ["Laravel", "Django", "React", "Flask"],
      correctAns: "React",
      userAns: ""
    },
    {
      questionNumber: 8,
      question: "Which HTTP status code means 'Not Found'?",
      options: ["200", "201", "404", "500"],
      correctAns: "404",
      userAns: "404"
    },
    {
      questionNumber: 9,
      question: "Which command is used to initialize a Git repository?",
      options: ["git start", "git init", "git create", "git new"],
      correctAns: "git init",
      userAns: ""
    },
    {
      questionNumber: 10,
      question: "Which file is required to run a Node.js project?",
      options: ["index.html", "package.json", "tsconfig.json", "vite.config.ts"],
      correctAns: "package.json",
      userAns: "", 
    }
  ]
};

const QuizRoute = () => {
  return (
  <Routes>
     <Route path="/" element={<MainLayout />}>
       <Route path="create/:quiz_id?" element={<QuizPage {...mockQuiz} />} />
          <Route
            path="*"
            element={<Navigate to="/create/quiz" replace />}
          />
       </Route>
    </Routes>
  );
};

export default QuizRoute;