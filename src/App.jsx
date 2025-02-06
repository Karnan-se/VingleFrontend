import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRouter from "./router/userRouter.jsx";
import AdminRouter from "./router/adminRouter.jsx";
import TutorRouter from "./router/tutorRouter.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<UserRouter />} />
          <Route path="/admin/*" element={<AdminRouter />} />
          <Route path="/tutor/*" element={<TutorRouter />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
