import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import UnderConstruction from "./components/layout/UnderConstruction";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;