import { useNavigate } from "react-router-dom";
import { MessageCircle, Repeat2, Heart, BarChart2, Bookmark, MoreHorizontal } from "lucide-react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

interface User {
    _id: string;
    fullName: string;
    username: string;
    profileImg?: string;
}

interface Post {
    _id: string;
    user: User;
    text: string;
    img?: string;
    likesCount: number;
    retweetsCount: number;
    bookmarksCount: number;
    isLiked: boolean;
    isRetweeted: boolean;
    isBookmarked: boolean;
    isRetweet: boolean;
    originalPost?: Post;
    createdAt: string;
}

interface TweetProps {
    post: Post;
    onRefresh: () => void;
    onClick?: () => void;
}

const Tweet = ({ post, onRefresh, onClick }: TweetProps) => {
    const navigate = useNavigate();

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleAction = async (e: React.MouseEvent, type: "like" | "retweet" | "save") => {
        stopPropagation(e);
        try {
            const res = await axiosInstance.post(`/posts/${type}/${post._id}`);
            if (res.data.status === "success") {
                onRefresh();
            }
        } catch (error: any) {
            toast.error(`Failed to ${type}`);
        }
    };

    const displayPost = post.isRetweet && post.originalPost ? post.originalPost : post;
    const isRetweet = post.isRetweet;

    const timeAgo = (dateString: string) => {
        const now = new Date();
        const past = new Date(dateString);
        const diffInMs = now.getTime() - past.getTime();
        const diffInSec = Math.floor(diffInMs / 1000);
        const diffInMin = Math.floor(diffInSec / 60);
        const diffInHours = Math.floor(diffInMin / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInDays > 0) return `${diffInDays}d`;
        if (diffInHours > 0) return `${diffInHours}h`;
        if (diffInMin > 0) return `${diffInMin}m`;
        return `${diffInSec}s`;
    };

    return (
        <div
            onClick={onClick}
            className="px-4 py-3 border-b border-twitter-border hover:bg-twitter-hover transition-colors cursor-pointer flex flex-col gap-1"
        >
            {isRetweet && (
                <div className="flex items-center gap-2 text-twitter-gray text-xs font-bold ml-8 mb-1">
                    <Repeat2 className="w-3.5 h-3.5" />
                    <span>{post.user.fullName} Retweeted</span>
                </div>
            )}
            <div className="flex gap-3">
                <div
                    className="w-10 h-10 rounded-full bg-twitter-gray shrink-0 overflow-hidden"
                    onClick={(e) => {
                        stopPropagation(e);
                        navigate(`/profile/${displayPost.user.username}`);
                    }}
                >
                    {displayPost.user.profileImg ? (
                        <img src={displayPost.user.profileImg} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-twitter-gray" />
                    )}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-1 group">
                        <span
                            className="font-bold hover:underline"
                            onClick={(e) => {
                                stopPropagation(e);
                                navigate(`/profile/${displayPost.user.username}`);
                            }}
                        >
                            {displayPost.user.fullName}
                        </span>
                        <span className="text-twitter-gray">@{displayPost.user.username}</span>
                        <span className="text-twitter-gray">·</span>
                        <span className="text-twitter-gray hover:underline">{timeAgo(displayPost.createdAt)}</span>
                        <div className="ml-auto" onClick={stopPropagation}>
                            <MoreHorizontal className="w-5 h-5 text-twitter-gray hover:text-twitter-blue hover:bg-twitter-blue/10 rounded-full p-1 transition-colors" />
                        </div>
                    </div>

                    <p className="mt-1 whitespace-pre-wrap">{displayPost.text}</p>

                    {displayPost.img && (
                        <div className="mt-3 rounded-2xl border border-twitter-border overflow-hidden">
                            <img src={displayPost.img} alt="Post media" className="w-full h-auto object-cover max-h-125" />
                        </div>
                    )}

                    <div className="flex justify-between items-center mt-3 text-twitter-gray max-w-md" onClick={stopPropagation}>
                        <div className="flex items-center gap-1.5 group cursor-pointer hover:text-twitter-blue">
                            <div className="p-2 group-hover:bg-twitter-blue/10 rounded-full transition-colors">
                                <MessageCircle className="w-4.5 h-4.5" />
                            </div>
                            <span className="text-sm">0</span>
                        </div>
                        <div
                            className={`flex items-center gap-1.5 group cursor-pointer hover:text-green-500 ${post.isRetweeted ? "text-green-500" : ""
                                }`}
                            onClick={(e) => handleAction(e, "retweet")}
                        >
                            <div className="p-2 group-hover:bg-green-500/10 rounded-full transition-colors">
                                <Repeat2 className={`w-4.5 h-4.5 ${post.isRetweeted ? "fill-green-500/20" : ""}`} />
                            </div>
                            <span className="text-sm">{displayPost.retweetsCount}</span>
                        </div>
                        <div
                            className={`flex items-center gap-1.5 group cursor-pointer hover:text-pink-600 ${post.isLiked ? "text-pink-600" : ""
                                }`}
                            onClick={(e) => handleAction(e, "like")}
                        >
                            <div className="p-2 group-hover:bg-pink-600/10 rounded-full transition-colors">
                                <Heart className={`w-4.5 h-4.5 ${post.isLiked ? "fill-pink-600 text-pink-600" : ""}`} />
                            </div>
                            <span className="text-sm">{displayPost.likesCount}</span>
                        </div>
                        <div className="flex items-center gap-1.5 group cursor-pointer hover:text-twitter-blue">
                            <div className="p-2 group-hover:bg-twitter-blue/10 rounded-full transition-colors">
                                <BarChart2 className="w-4.5 h-4.5" />
                            </div>
                            <span className="text-sm">0</span>
                        </div>
                        <div
                            className={`flex items-center group cursor-pointer hover:text-twitter-blue ${post.isBookmarked ? "text-twitter-blue" : ""
                                }`}
                            onClick={(e) => handleAction(e, "save")}
                        >
                            <div className="p-2 group-hover:bg-twitter-blue/10 rounded-full transition-colors">
                                <Bookmark className={`w-4.5 h-4.5 ${post.isBookmarked ? "fill-twitter-blue" : ""}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tweet;
