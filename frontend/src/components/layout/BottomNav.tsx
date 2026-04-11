import { NavLink } from "react-router-dom";
import { Home, Search, Bell, Mail } from "lucide-react";

const BottomNav = () => {
    return (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-twitter-background border-t border-twitter-border px-6 py-3 flex justify-between items-center z-50">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-twitter-text" : "text-twitter-gray"}>
                <Home className="w-7 h-7" />
            </NavLink>
            <NavLink to="/explore" className={({ isActive }) => isActive ? "text-twitter-text" : "text-twitter-gray"}>
                <Search className="w-7 h-7" />
            </NavLink>
            <NavLink to="/notifications" className={({ isActive }) => isActive ? "text-twitter-text" : "text-twitter-gray"}>
                <Bell className="w-7 h-7" />
            </NavLink>
            <NavLink to="/messages" className={({ isActive }) => isActive ? "text-twitter-text" : "text-twitter-gray"}>
                <Mail className="w-7 h-7" />
            </NavLink>
        </div>
    );
};

export default BottomNav;
