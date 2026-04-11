import TweetBox from "../ui/TweetBox";
import Tweet from "../ui/Tweet";

const Feed = ({ onClick }: { onClick: () => void }) => {
    return (
        <div className="border-x w-full border-twitter-border">
            <div className="sticky top-0 bg-twitter-background/80 backdrop-blur-md z-10">
                <div className="flex border-b border-twitter-border text-sm">
                    <div className="flex-1 hover:bg-twitter-hover cursor-pointer transition-colors relative py-4 text-center">
                        <span className="font-bold relative z-10">For you</span>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-twitter-blue rounded-full" />
                    </div>
                    <div className="flex-1 hover:bg-twitter-hover cursor-pointer transition-colors py-4 text-center">
                        <span className="text-twitter-gray font-medium">Following</span>
                    </div>
                </div>
            </div>

            <TweetBox msg="What's happening?" />

            <Tweet
                onClick={onClick}
                displayName="Tushar"
                username="tushar_codes"
                timestamp="2h"
                text="Building a Twitter clone with React and Tailwind CSS v4! The new version of Tailwind is amazing. 🚀 #webdev #reactjs"
                replies={12}
                retweets={45}
                likes={230}
                views="10.5K"
            />

            <Tweet
                onClick={onClick}
                displayName="Elon Musk"
                username="elonmusk"
                timestamp="5h"
                text="Mars is looking good today."
                replies={5430}
                retweets={12300}
                likes={89200}
                views="42M"
            />

            <Tweet
                onClick={onClick}
                displayName="Vercel"
                username="vercel"
                timestamp="8h"
                text="Deploying your React applications has never been easier."
                image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3"
                replies={89}
                retweets={120}
                likes={670}
                views="120K"
            />

            <Tweet
                onClick={onClick}
                displayName="Frontend Master"
                username="frontend_master"
                timestamp="12h"
                text="What's your favorite CSS framework in 2024?\n\n1. Tailwind CSS\n2. Styled Components\n3. CSS Modules\n4. Vanilla CSS"
                replies={230}
                retweets={15}
                likes={89}
                views="15.2K"
            />
        </div>
    );
};

export default Feed;
