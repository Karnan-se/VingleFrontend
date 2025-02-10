import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRouter from "./router/userRouter.jsx";
import AdminRouter from "./router/adminRouter.jsx";
import TutorRouter from "./router/tutorRouter.jsx";
import { NotificationProvider } from "./Components/context/notificationContext.jsx";

function App() {
  return (
    <>
      <Router>
      <NotificationProvider>
        <Routes>
          <Route path="/*" element={<UserRouter />} />
          <Route path="/admin/*" element={<AdminRouter />} />
          <Route path="/tutor/*" element={<TutorRouter />}/>
        </Routes>
        </NotificationProvider>
      </Router>
    </>
  );
}

export default App;
