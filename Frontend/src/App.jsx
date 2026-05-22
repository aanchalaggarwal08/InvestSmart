import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import CompareStocks from "./pages/comparestocks";
import About from "./pages/about";
import Resources from "./pages/resources";
import Profile from "./pages/profile";

import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/compare" element={<CompareStocks />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


