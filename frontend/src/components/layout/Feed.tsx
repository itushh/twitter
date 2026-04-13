import { useEffect, useState } from "react";
import TweetBox from "../ui/TweetBox";
import Tweet from "../ui/Tweet";
import { axiosInstance } from "../../lib/axios";
import { Loader2 } from "lucide-react";

const Feed = ({ onClick }: { onClick: () => void }) => {
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [feedType, setFeedType] = useState<"forYou" | "following">("forYou");

    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            const endpoint = feedType === "forYou" ? "/posts/all" : "/posts/following";
            const res = await axiosInstance.get(endpoint);
            if (res.data.status === "success") {
                setPosts(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            setPosts([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [feedType]);

    return (
        <div className="border-x w-full border-twitter-border min-h-screen">
            <div className="sticky top-0 bg-twitter-background/80 backdrop-blur-md z-10 border-b border-twitter-border">
                <div className="flex text-[15px]">
                    <div
                        className="flex-1 hover:bg-twitter-hover cursor-pointer transition-colors relative py-4 text-center group"
                        onClick={() => setFeedType("forYou")}
                    >
                        <span className={`font-bold relative z-10 ${feedType === "forYou" ? "text-twitter-text" : "text-twitter-gray"}`}>
                            For you
                        </span>
                        {feedType === "forYou" && (
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-twitter-blue rounded-full" />
                        )}
                    </div>
                    <div
                        className="flex-1 hover:bg-twitter-hover cursor-pointer transition-colors py-4 text-center relative group"
                        onClick={() => setFeedType("following")}
                    >
                        <span className={`font-bold relative z-10 ${feedType === "following" ? "text-twitter-text" : "text-twitter-gray"}`}>
                            Following
                        </span>
                        {feedType === "following" && (
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-twitter-blue rounded-full" />
                        )}
                    </div>
                </div>
            </div>

            <TweetBox msg={feedType === "forYou" ? "What's happening?" : "Catch up with your friends!"} onPostSuccess={fetchPosts} />

            {isLoading ? (
                <div className="flex justify-center p-10">
                    <Loader2 className="w-8 h-8 text-twitter-blue animate-spin" />
                </div>
            ) : posts.length === 0 ? (
                <div className="flex flex-col items-center p-10 text-center gap-2">
                    <p className="font-bold text-xl">
                        {feedType === "forYou" ? "No posts yet" : "No posts from following"}
                    </p>
                    <p className="text-twitter-gray max-w-sm">
                        {feedType === "forYou"
                            ? "Be the first one to post something!"
                            : "Follow some people to see their posts here, or check out what's happening for you."}
                    </p>
                </div>
            ) : (
                posts.map((post) => (
                    <Tweet
                        key={post._id}
                        post={post}
                        onRefresh={fetchPosts}
                        onClick={onClick}
                    />
                ))
            )}
        </div>
    );
};

export default Feed;
