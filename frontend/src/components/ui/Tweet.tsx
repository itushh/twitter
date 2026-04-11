import { useNavigate } from "react-router-dom";
import { MessageCircle, Repeat2, Heart, BarChart2, Share, MoreHorizontal } from "lucide-react";

interface TweetProps {
    id?: string;
    displayName: string;
    username: string;
    timestamp: string;
    text: string;
    image?: string;
    replies: number;
    retweets: number;
    likes: number;
    views: string;
    onClick?: () => void;
}

const Tweet = ({
    displayName,
    username,
    timestamp,
    text,
    image,
    replies,
    retweets,
    likes,
    views,
    onClick
}: TweetProps) => {
    const navigate = useNavigate();

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            onClick={onClick}
            className="px-4 py-3 border-b border-twitter-border hover:bg-twitter-hover transition-colors cursor-pointer flex gap-3"
        >
            <div
                className="w-10 h-10 rounded-full bg-twitter-gray shrink-0"
                onClick={(e) => {
                    stopPropagation(e);
                    navigate("/profile");
                }}
            />
            <div className="flex-1">
                <div className="flex items-center gap-1 group">
                    <span
                        className="font-bold hover:underline"
                        onClick={(e) => {
                            stopPropagation(e);
                            navigate("/profile");
                        }}
                    >
                        {displayName}
                    </span>
                    <span className="text-twitter-gray">@{username}</span>
                    <span className="text-twitter-gray">·</span>
                    <span className="text-twitter-gray hover:underline">{timestamp}</span>
                    <div className="ml-auto" onClick={stopPropagation}>
                        <MoreHorizontal className="w-5 h-5 text-twitter-gray hover:text-twitter-blue hover:bg-twitter-blue/10 rounded-full p-1 transition-colors" />
                    </div>
                </div>

                <p className="mt-1 whitespace-pre-wrap">{text}</p>

                {image && (
                    <div className="mt-3 rounded-2xl border border-twitter-border overflow-hidden">
                        <img src={image} alt="Tweet media" className="w-full h-auto object-cover max-h-125" />
                    </div>
                )}

                <div className="flex justify-between items-center mt-3 text-twitter-gray max-w-md" onClick={stopPropagation}>
                    <div className="flex items-center gap-1.5 group cursor-pointer hover:text-twitter-blue">
                        <div className="p-2 group-hover:bg-twitter-blue/10 rounded-full transition-colors">
                            <MessageCircle className="w-4.5 h-4.5" />
                        </div>
                        <span className="text-sm">{replies}</span>
                    </div>
                    <div className="flex items-center gap-1.5 group cursor-pointer hover:text-green-500">
                        <div className="p-2 group-hover:bg-green-500/10 rounded-full transition-colors">
                            <Repeat2 className="w-4.5 h-4.5" />
                        </div>
                        <span className="text-sm">{retweets}</span>
                    </div>
                    <div className="flex items-center gap-1.5 group cursor-pointer hover:text-pink-600">
                        <div className="p-2 group-hover:bg-pink-600/10 rounded-full transition-colors">
                            <Heart className="w-4.5 h-4.5" />
                        </div>
                        <span className="text-sm">{likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 group cursor-pointer hover:text-twitter-blue">
                        <div className="p-2 group-hover:bg-twitter-blue/10 rounded-full transition-colors">
                            <BarChart2 className="w-4.5 h-4.5" />
                        </div>
                        <span className="text-sm">{views}</span>
                    </div>
                    <div className="flex items-center group cursor-pointer hover:text-twitter-blue">
                        <div className="p-2 group-hover:bg-twitter-blue/10 rounded-full transition-colors">
                            <Share className="w-4.5 h-4.5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tweet;
