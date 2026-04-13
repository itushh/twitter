import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin, Link as LinkIcon, Loader2 } from "lucide-react";
import Tweet from "../ui/Tweet";
import { useAuth } from "../../context/AuthContext";
import { axiosInstance } from "../../lib/axios";

const ProfileView = () => {
    const navigate = useNavigate();
    const { authUser } = useAuth();
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserPosts = async () => {
        if (!authUser) return;
        try {
            const res = await axiosInstance.get(`/posts/user/${authUser.username}`);
            if (res.data.status === "success") {
                setPosts(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching user posts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserPosts();
    }, [authUser]);

    if (!authUser) return null;

    return (
        <div className="w-full border-x border-twitter-border">
            <div className="sticky top-0 bg-twitter-background/80 backdrop-blur-md z-10 px-4 py-1 flex items-center gap-8">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-twitter-hover rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-xl font-bold">{authUser.fullName}</h1>
                    <p className="text-twitter-gray text-[13px]">{authUser.postsCount || 0} posts</p>
                </div>
            </div>

            <div className="h-48 bg-zinc-800 relative">
                {authUser.coverImg && (
                    <img src={authUser.coverImg} alt="Cover" className="w-full h-full object-cover" />
                )}
                <div className="absolute -bottom-16 left-4 w-32 h-32 rounded-full border-4 border-twitter-background bg-twitter-gray overflow-hidden">
                    {authUser.profileImg ? (
                        <img src={authUser.profileImg} alt={authUser.username} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-twitter-gray flex items-center justify-center text-4xl text-white font-bold">
                            {authUser.fullName[0]}
                        </div>
                    )}
                </div>
            </div>

            <div className="px-4 mt-16 pb-4 border-b border-twitter-border">
                <div className="flex justify-end">
                    <button className="border border-twitter-border px-4 py-1.5 rounded-full font-bold hover:bg-twitter-hover transition-colors">
                        Edit profile
                    </button>
                </div>

                <div className="mt-4">
                    <h2 className="text-xl font-bold">{authUser.fullName}</h2>
                    <p className="text-twitter-gray">@{authUser.username}</p>
                </div>

                <p className="mt-3">{authUser.bio || "No bio yet."}</p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-twitter-gray text-[15px]">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>Bengaluru, India</span>
                    </div>
                    {authUser.link && (
                        <div className="flex items-center gap-1">
                            <LinkIcon className="w-4 h-4" />
                            <a href={authUser.link} target="_blank" rel="noreferrer" className="text-twitter-blue hover:underline">
                                {authUser.link.replace(/^https?:\/\//, "")}
                            </a>
                        </div>
                    )}
                    <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        <span>Joined January 2021</span>
                    </div>
                </div>

                <div className="flex gap-4 mt-3 text-[15px]">
                    <div className="hover:underline cursor-pointer">
                        <span className="font-bold">{authUser.followingCount || 0}</span> <span className="text-twitter-gray">Following</span>
                    </div>
                    <div className="hover:underline cursor-pointer">
                        <span className="font-bold">{authUser.followersCount || 0}</span> <span className="text-twitter-gray">Followers</span>
                    </div>
                </div>
            </div>

            <div className="flex border-b border-twitter-border text-[15px]">
                <div className="flex-1 hover:bg-twitter-hover cursor-pointer transition-colors relative py-4 text-center">
                    <span className="font-bold text-twitter-text relative z-10">Posts</span>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-twitter-blue rounded-full" />
                </div>
                <div className="flex-1 hover:bg-twitter-hover cursor-pointer transition-colors py-4 text-center">
                    <span className="text-twitter-gray font-medium">Replies</span>
                </div>
                <div className="flex-1 hover:bg-twitter-hover cursor-pointer transition-colors py-4 text-center">
                    <span className="text-twitter-gray font-medium">Highlights</span>
                </div>
                <div className="flex-1 hover:bg-twitter-hover cursor-pointer transition-colors py-4 text-center">
                    <span className="text-twitter-gray font-medium">Media</span>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-10">
                    <Loader2 className="w-8 h-8 text-twitter-blue animate-spin" />
                </div>
            ) : posts.length === 0 ? (
                <div className="flex flex-col items-center p-10 text-center">
                    <p className="font-bold text-xl">No posts yet</p>
                    <p className="text-twitter-gray">When you post, they'll show up here.</p>
                </div>
            ) : (
                posts.map((post) => (
                    <Tweet
                        key={post._id}
                        post={post}
                        onRefresh={fetchUserPosts}
                    />
                ))
            )}
        </div>
    );
};
export default ProfileView;
