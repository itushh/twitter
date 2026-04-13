import { useState } from "react";
import { Image, Ghost, ListTodo, Smile, CalendarDays, MapPin } from "lucide-react";
import { axiosInstance } from "../../lib/axios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const TweetBox = ({ msg, onPostSuccess }: { msg: string; onPostSuccess?: () => void }) => {
    const [text, setText] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const { authUser } = useAuth();

    const handlePost = async () => {
        if (!text.trim()) return;
        setIsPosting(true);
        try {
            const res = await axiosInstance.post("/posts/create", { text });
            if (res.data.status === "success") {
                setText("");
                toast.success("Tweet posted!");
                if (onPostSuccess) onPostSuccess();
            }
        } catch (error: any) {
            toast.error("Failed to post tweet");
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <div className="px-4 py-2 border-b border-twitter-border flex gap-3">
            <div className="w-10 h-10 rounded-full bg-twitter-gray shrink-0 mt-1 overflow-hidden">
                {authUser?.profileImg ? (
                    <img src={authUser.profileImg} alt="profile" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-twitter-gray" />
                )}
            </div>
            <div className="flex-1">
                <textarea
                    placeholder={msg}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full bg-transparent text-lg outline-none placeholder:text-twitter-gray resize-none py-3"
                    rows={text.split("\n").length || 1}
                />
                <div className="flex items-center justify-between pt-3 pb-1 border-t border-twitter-border/50">
                    <div className="flex items-center gap-1 text-twitter-blue">
                        <div className="p-2 hover:bg-twitter-blue/10 rounded-full cursor-pointer transition-colors">
                            <Image className="w-5 h-5" />
                        </div>
                        <div className="p-2 hover:bg-twitter-blue/10 rounded-full cursor-pointer transition-colors">
                            <Ghost className="w-5 h-5" />
                        </div>
                        <div className="p-2 hover:bg-twitter-blue/10 rounded-full cursor-pointer transition-colors">
                            <ListTodo className="w-5 h-5" />
                        </div>
                        <div className="p-2 hover:bg-twitter-blue/10 rounded-full cursor-pointer transition-colors">
                            <Smile className="w-5 h-5" />
                        </div>
                        <div className="p-2 hover:bg-twitter-blue/10 rounded-full cursor-pointer transition-colors">
                            <CalendarDays className="w-5 h-5" />
                        </div>
                        <div className="p-2 hover:bg-twitter-blue/10 rounded-full cursor-pointer transition-colors opacity-50">
                            <MapPin className="w-5 h-5" />
                        </div>
                    </div>
                    <button
                        onClick={handlePost}
                        disabled={!text.trim() || isPosting}
                        className="bg-twitter-blue text-white font-bold rounded-full px-5 py-1.5 hover:bg-opacity-90 transition-colors disabled:opacity-50"
                    >
                        {isPosting ? "Posting..." : "Post"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TweetBox;
