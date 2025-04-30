import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Signin from "./pages/signin/signin.jsx";
import Signup from "./pages/signup/signup.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Analytics from "./pages/Analytics/Analytics.jsx";
import Bot from "./pages/Bot/Bot.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Team from "./pages/Team/Team.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import "./App.css";
import Sidebar from "./pages/Sidebar/Sidebar.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/bot" element={<Bot />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
