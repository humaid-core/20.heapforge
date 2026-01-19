import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AlumniProfile from "./components/AlumniProfile";
import StudentProfile from "./components/StudentProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Role based routes */}
        <Route path="/alumni/profile" element={<AlumniProfile />} />
        <Route path="/student/profile" element={<StudentProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
