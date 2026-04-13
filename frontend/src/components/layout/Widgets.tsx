import { Search, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const TrendItem = ({ category, title, posts }: { category: string, title: string, posts: string }) => (
    <div className="px-4 py-3 hover:bg-twitter-hover/50 cursor-pointer transition-colors group relative">
        <div className="flex justify-between items-start text-[13px] text-twitter-gray">
            <span>{category}</span>
            <MoreHorizontal className="w-4 h-4 p-1 hover:text-twitter-blue hover:bg-twitter-blue/10 rounded-full box-content" />
        </div>
        <p className="font-bold text-[15px] mt-0.5">{title}</p>
        <p className="text-[13px] text-twitter-gray mt-1">{posts} posts</p>
    </div>
);

const FollowItem = ({ user, onFollowToggle }: { user: any, onFollowToggle: (id: string) => void }) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFollow = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.post(`/users/follow/${user._id}`);
            setIsFollowed(res.data.followed);
            toast.success(res.data.message);
            onFollowToggle(user._id);
        } catch (error: any) {
            toast.error(error.response?.data?.errors?.[0] || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-4 py-3 hover:bg-twitter-hover cursor-pointer transition-colors flex items-center justify-between group">
            <Link to={`/profile/${user.username}`} className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-twitter-gray overflow-hidden shrink-0">
                    {user.profileImg ? (
                        <img src={user.profileImg} alt={user.username} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white font-bold bg-twitter-gray">
                            {user.fullName[0]}
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-[15px] hover:underline leading-tight truncate">{user.fullName}</p>
                    <p className="text-twitter-gray text-[15px] leading-tight truncate">@{user.username}</p>
                </div>
            </Link>
            <button
                onClick={handleFollow}
                disabled={loading}
                className={`font-bold px-4 py-1.5 rounded-full text-[14px] transition-colors ${isFollowed
                    ? "border border-twitter-border hover:border-red-500 hover:text-red-500 hover:bg-red-500/10"
                    : "bg-twitter-text text-twitter-background hover:bg-opacity-90"
                    }`}
            >
                {loading ? "..." : isFollowed ? "Following" : "Follow"}
            </button>
        </div>
    );
};

const Widgets = () => {
    const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSuggested = async () => {
        try {
            const res = await axiosInstance.get("/users/suggested");
            setSuggestedUsers(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuggested();
    }, []);

    const handleFollowToggle = (_id: string) => {
        // Optionally remove from list or update status
    };

    return (
        <div className="hidden lg:flex sticky top-0 flex-col gap-4 py-3 h-screen w-150 overflow-y-auto no-scrollbar">
            <div className="flex items-center gap-4 bg-twitter-background-secondary px-4 py-2.5 rounded-full sticky top-0 z-10 border border-transparent focus-within:border-twitter-blue focus-within:bg-twitter-background transition-all">
                <Search className="w-5 h-5 text-twitter-gray" />
                <input
                    placeholder="Search"
                    className="bg-transparent outline-none text-sm placeholder:text-twitter-gray w-full"
                />
            </div>

            <div className="border border-twitter-border rounded-2xl overflow-hidden mt-3 bg-twitter-background">
                <h2 className="px-4 py-3 text-xl font-bold">What's happening</h2>
                <TrendItem category="Technology · Trending" title="React" posts="1.2M" />
                <TrendItem category="Sports · Trending" title="Champions League" posts="540K" />
                <TrendItem category="Entertainment · Trending" title="Oscars" posts="210K" />
                <TrendItem category="Politics · Trending" title="Global Summit" posts="89K" />
                <div className="px-4 py-3 hover:bg-twitter-hover cursor-pointer transition-colors border-t border-twitter-border">
                    <span className="text-twitter-blue text-sm">Show more</span>
                </div>
            </div>

            <div className="border border-twitter-border rounded-2xl overflow-hidden mt-3 bg-twitter-background">
                <h2 className="px-4 py-3 text-xl font-bold">Who to follow</h2>
                {loading ? (
                    <div className="px-4 py-3 text-twitter-gray">Loading suggested users...</div>
                ) : (
                    suggestedUsers.map((user) => (
                        <FollowItem key={user._id} user={user} onFollowToggle={handleFollowToggle} />
                    ))
                )}
                {suggestedUsers.length === 0 && !loading && (
                    <div className="px-4 py-3 text-twitter-gray text-sm">No new suggestions</div>
                )}
                <Link to="/people" className="block px-4 py-3 hover:bg-twitter-hover cursor-pointer transition-colors border-t border-twitter-border">
                    <span className="text-twitter-blue text-sm">Show more</span>
                </Link>
            </div>

            <div className="px-4 text-[10px] text-twitter-gray flex flex-wrap gap-x-3 gap-y-1 mt-2">
                <span className="hover:underline cursor-pointer">Terms of Service</span>
                <span className="hover:underline cursor-pointer">Privacy Policy</span>
                <span className="hover:underline cursor-pointer">Cookie Policy</span>
                <span className="hover:underline cursor-pointer">Accessibility</span>
                <span className="hover:underline cursor-pointer">Ads info</span>
                <span className="hover:underline cursor-pointer">More ...</span>
                <span>© 2026 X Corp.</span>
            </div>
        </div>
    );
};

export default Widgets;
