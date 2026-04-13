import { NavLink } from "react-router-dom";
import {
    Home,
    Search,
    Bell,
    Mail,
    Bookmark,
    Users,
    User,
    MoreHorizontal,
    LogOut
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface SidebarItemProps {
    Icon: any;
    label: string;
    to: string;
}

const SidebarItem = ({ Icon, label, to }: SidebarItemProps) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-4 p-3 rounded-full hover:bg-twitter-hover cursor-pointer transition-colors w-fit group ${isActive ? "font-bold" : "font-normal"}`
        }
    >
        {({ isActive }) => (
            <>
                <Icon className={`w-7 h-7 ${isActive ? "stroke-[2.5px]" : "stroke-2"}`} />
                <span className={`text-xl hidden xl:block`}>{label}</span>
            </>
        )}
    </NavLink>
);

const Sidebar = () => {
    const { authUser, logout } = useAuth();

    return (
        <div className="hidden sm:flex flex-col h-screen sticky top-0 py-2 justify-between w-100">
            <div className="flex flex-col gap-1">
                <NavLink to="/" className="p-3 hover:bg-twitter-blue/10 rounded-full w-fit cursor-pointer transition-colors group">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-twitter-text" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                </NavLink>

                <SidebarItem Icon={Home} label="Home" to="/" />
                <SidebarItem Icon={Search} label="Explore" to="/explore" />
                <SidebarItem Icon={Bell} label="Notifications" to="/notifications" />
                <SidebarItem Icon={Mail} label="Messages" to="/messages" />
                <SidebarItem Icon={Users} label="People" to="/people" />
                <SidebarItem Icon={Bookmark} label="Bookmarks" to="/bookmarks" />
                <SidebarItem Icon={Users} label="Communities" to="/communities" />
                <SidebarItem Icon={User} label="Profile" to="/profile" />
                <SidebarItem Icon={MoreHorizontal} label="More" to="/more" />

                <button className="bg-twitter-blue hover:bg-opacity-90 transition-colors text-white font-bold text-lg rounded-full py-3 xl:w-full mt-4 flex items-center justify-center">
                    <span className="hidden xl:block">Post</span>
                    <span className="xl:hidden text-2xl">+</span>
                </button>
            </div>

            {authUser && (
                <div className="mb-4 p-3 hover:bg-twitter-hover rounded-full cursor-pointer transition-colors flex items-center gap-3">
                    <NavLink to="/profile" className="flex items-center gap-3 flex-1 overflow-hidden">
                        <div className="w-10 h-10 rounded-full bg-twitter-gray shrink-0 overflow-hidden">
                            {authUser.profileImg ? (
                                <img src={authUser.profileImg} alt={authUser.username} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-twitter-gray flex items-center justify-center text-white font-bold">
                                    {authUser.fullName[0]}
                                </div>
                            )}
                        </div>
                        <div className="hidden xl:block flex-1 overflow-hidden">
                            <p className="font-bold text-[15px] truncate">{authUser.fullName}</p>
                            <p className="text-twitter-gray text-[15px] truncate">@{authUser.username}</p>
                        </div>
                    </NavLink>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            logout();
                        }}
                        className="hidden xl:block hover:bg-twitter-blue/10 p-2 rounded-full transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5 text-twitter-text" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
