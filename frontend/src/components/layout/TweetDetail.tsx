import { ArrowLeft, MessageCircle, Repeat2, Heart, BarChart2, Share, MoreHorizontal } from "lucide-react";
import TweetBox from "../ui/TweetBox";
import Tweet from "../ui/Tweet";

const TweetDetail = ({ onClick }: { onClick: () => void }) => {

    return (
        <div className="border-x w-full border-twitter-border">
            <div className="sticky top-0 bg-twitter-background/80 backdrop-blur-md z-10 px-4 py-3 flex items-center gap-8 border-b border-twitter-border">
                <button onClick={onClick} className="p-2 hover:bg-twitter-hover rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-bold">Post</h1>
            </div>

            <div className="px-4 py-3 border-b border-twitter-border">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-twitter-gray shrink-0" />
                    <div>
                        <p className="font-bold leading-tight">Tushar</p>
                        <p className="text-twitter-gray leading-tight">@tushar_codes</p>
                    </div>
                    <MoreHorizontal className="w-5 h-5 ml-auto text-twitter-gray" />
                </div>

                <div className="mt-4 text-lg leading-normal whitespace-pre-wrap">
                    This is an expanded view of a tweet. It shows more detail and specific engagement for this post. 
                    <br /><br />
                    #TwitterClone #React
                </div>

                <div className="mt-4 text-twitter-gray flex gap-2 text-[15px] border-b border-twitter-border pb-4">
                    <span>9:42 PM · Apr 11, 2026</span>
                    <span>·</span>
                    <span className="text-twitter-text font-bold">12.5K</span>
                    <span>Views</span>
                </div>

                <div className="py-2 flex justify-around text-twitter-gray">
                    <div className="p-2 hover:bg-twitter-blue/10 hover:text-twitter-blue rounded-full transition-colors cursor-pointer">
                        <MessageCircle className="w-5.5 h-5.5" />
                    </div>
                    <div className="p-2 hover:bg-green-500/10 hover:text-green-500 rounded-full transition-colors cursor-pointer">
                        <Repeat2 className="w-5.5 h-5.5" />
                    </div>
                    <div className="p-2 hover:bg-pink-600/10 hover:text-pink-600 rounded-full transition-colors cursor-pointer">
                        <Heart className="w-5.5 h-5.5" />
                    </div>
                    <div className="p-2 hover:bg-twitter-blue/10 hover:text-twitter-blue rounded-full transition-colors cursor-pointer">
                        <BarChart2 className="w-5.5 h-5.5" />
                    </div>
                    <div className="p-2 hover:bg-twitter-blue/10 hover:text-twitter-blue rounded-full transition-colors cursor-pointer">
                        <Share className="w-5.5 h-5.5" />
                    </div>
                </div>
            </div>

            <TweetBox msg="Post your reply" />

            {/* Simulated Replies */}
            <Tweet
                displayName="Elon Musk"
                username="elonmusk"
                timestamp="1h"
                text="Nice progress!"
                replies={1}
                retweets={2}
                likes={150}
                views="10K"
            />
        </div>
    );
};

export default TweetDetail;
