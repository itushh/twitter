import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const UserCard = ({ user }: { user: any }) => {
    const [isFollowed, setIsFollowed] = useState(user.isFollowing);
    const [loading, setLoading] = useState(false);

    const handleFollow = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.post(`/users/follow/${user._id}`);
            setIsFollowed(res.data.followed);
            toast.success(res.data.message);
        } catch (error: any) {
            toast.error(error.response?.data?.errors?.[0] || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 hover:bg-twitter-hover/30 transition-colors border-b border-twitter-border flex items-center justify-between group">
            <Link to={`/profile/${user.username}`} className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-full bg-twitter-gray overflow-hidden shrink-0 shadow-sm">
                    {user.profileImg ? (
                        <img src={user.profileImg} alt={user.username} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white font-bold bg-twitter-gray text-lg">
                            {user.fullName[0]}
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-[16px] hover:underline leading-tight truncate">{user.fullName}</p>
                    <p className="text-twitter-gray text-[15px] leading-tight truncate">@{user.username}</p>
                    {user.bio && <p className="text-[14px] mt-1 line-clamp-1">{user.bio}</p>}
                </div>
            </Link>
            <button
                onClick={handleFollow}
                disabled={loading}
                className={`font-bold px-5 py-2 rounded-full text-[14px] transition-all ${isFollowed
                        ? "border border-twitter-border hover:border-red-500 hover:text-red-500 hover:bg-red-500/10"
                        : "bg-twitter-text text-twitter-background hover:bg-opacity-90 shadow-md"
                    }`}
            >
                {loading ? "..." : isFollowed ? "Following" : "Follow"}
            </button>
        </div>
    );
};

const PeopleList = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchUsers = async (pageNum: number) => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/users/all?page=${pageNum}&limit=20`);
            if (pageNum === 1) {
                setUsers(res.data.data.users);
            } else {
                setUsers((prev) => [...prev, ...res.data.data.users]);
            }
            setHasMore(res.data.data.page < res.data.data.totalPages);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(1);
    }, []);

    const loadMore = () => {
        if (!loading && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchUsers(nextPage);
        }
    };

    return (
        <div className="w-full border-x border-twitter-border min-h-screen">
            <div className="sticky top-0 bg-twitter-background/80 backdrop-blur-md z-10 px-4 py-3 border-b border-twitter-border">
                <h1 className="text-xl font-bold">People</h1>
                <p className="text-sm text-twitter-gray">Find interesting people to follow</p>
            </div>

            <div className="flex flex-col">
                {users.map((user) => (
                    <UserCard key={user._id} user={user} />
                ))}

                {loading && (
                    <div className="p-8 text-center text-twitter-gray">
                        <div className="animate-spin w-8 h-8 border-4 border-twitter-blue border-t-transparent rounded-full mx-auto mb-2"></div>
                        Searching for people...
                    </div>
                )}

                {!loading && hasMore && (
                    <button
                        onClick={loadMore}
                        className="p-4 text-twitter-blue hover:bg-twitter-hover transition-colors font-medium"
                    >
                        Show more
                    </button>
                )}

                {!loading && users.length === 0 && (
                    <div className="p-12 text-center text-twitter-gray">
                        <p className="text-lg font-bold">No one else here!</p>
                        <p>Invite your friends to join!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PeopleList;
