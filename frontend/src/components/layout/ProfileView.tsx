import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin, Link as LinkIcon } from "lucide-react";
import Tweet from "../ui/Tweet";

const ProfileView = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full border-x border-twitter-border">
            <div className="sticky top-0 bg-twitter-background/80 backdrop-blur-md z-10 px-4 py-1 flex items-center gap-8">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-twitter-hover rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-xl font-bold">Tushar</h1>
                    <p className="text-twitter-gray text-[13px]">45 posts</p>
                </div>
            </div>

            <div className="h-48 bg-zinc-800 relative">
                <div className="absolute -bottom-16 left-4 w-32 h-32 rounded-full border-4 border-twitter-background bg-twitter-gray overflow-hidden">
                    <div className="w-full h-full bg-twitter-gray" />
                </div>
            </div>

            <div className="px-4 mt-16 pb-4 border-b border-twitter-border">
                <div className="flex justify-end">
                    <button className="border border-twitter-border px-4 py-1.5 rounded-full font-bold hover:bg-twitter-hover transition-colors">
                        Edit profile
                    </button>
                </div>

                <div className="mt-4">
                    <h2 className="text-xl font-bold">Tushar</h2>
                    <p className="text-twitter-gray">@tushar_codes</p>
                </div>

                <p className="mt-3">Building things with code. Software Engineer. React & TypeScript enthusiast. 🚀</p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-twitter-gray text-[15px]">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>Bengaluru, India</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <LinkIcon className="w-4 h-4" />
                        <span className="text-twitter-blue">github.com/tushar</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        <span>Joined January 2021</span>
                    </div>
                </div>

                <div className="flex gap-4 mt-3 text-[15px]">
                    <div className="hover:underline cursor-pointer">
                        <span className="font-bold">428</span> <span className="text-twitter-gray">Following</span>
                    </div>
                    <div className="hover:underline cursor-pointer">
                        <span className="font-bold">1.2K</span> <span className="text-twitter-gray">Followers</span>
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

            <Tweet
                displayName="Tushar"
                username="tushar_codes"
                timestamp="2h"
                text="Just finished the layout for my new project! #webdev"
                replies={5}
                retweets={10}
                likes={50}
                views="2K"
            />
        </div>
    );
};

export default ProfileView;
