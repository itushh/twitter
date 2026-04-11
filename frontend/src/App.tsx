import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import UnderConstruction from "./components/layout/UnderConstruction";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./context/AuthContext";
import { Loader2 } from "lucide-react";

const App = () => {
  const { authUser, isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-twitter-blue" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authUser ? <Outlet /> : <Navigate to="/login" />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="explore" element={<UnderConstruction />} />
          <Route path="notifications" element={<UnderConstruction />} />
          <Route path="messages" element={<UnderConstruction />} />
          <Route path="lists" element={<UnderConstruction />} />
          <Route path="bookmarks" element={<UnderConstruction />} />
          <Route path="communities" element={<UnderConstruction />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<UnderConstruction />} />
        </Route>

        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <RegisterPage /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;