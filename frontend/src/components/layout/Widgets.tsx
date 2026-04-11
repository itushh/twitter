import { Search, MoreHorizontal } from "lucide-react";

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

const FollowItem = ({ name, username }: { name: string, username: string }) => (
    <div className="px-4 py-3 hover:bg-twitter-hover cursor-pointer transition-colors flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-twitter-gray" />
            <div>
                <p className="font-bold text-[15px] hover:underline leading-tight">{name}</p>
                <p className="text-twitter-gray text-[15px] leading-tight group-hover:underline">@{username}</p>
            </div>
        </div>
        <button className="bg-twitter-text text-twitter-background font-bold px-4 py-1.5 rounded-full text-[14px] hover:bg-opacity-90">
            Follow
        </button>
    </div>
);

const Widgets = () => {
    return (
        <div className="hidden lg:flex sticky top-0 flex-col gap-4 py-3 h-screen w-150">
            <div className="flex items-center gap-4 bg-twitter-background-secondary px-4 py-2.5 rounded-full sticky top-3 z-10 border border-transparent focus-within:border-twitter-blue focus-within:bg-twitter-background transition-all">
                <Search className="w-5 h-5 text-twitter-gray" />
                <input
                    placeholder="Search"
                    className="bg-transparent outline-none text-sm placeholder:text-twitter-gray w-full"
                />
            </div>

            <div className="border border-twitter-border rounded-2xl overflow-hidden mt-3">
                <h2 className="px-4 py-3 text-xl font-bold">What's happening</h2>
                <TrendItem category="Technology · Trending" title="React" posts="1.2M" />
                <TrendItem category="Sports · Trending" title="Champions League" posts="540K" />
                <TrendItem category="Entertainment · Trending" title="Oscars" posts="210K" />
                <TrendItem category="Politics · Trending" title="Global Summit" posts="89K" />
                <div className="px-4 py-3 hover:bg-twitter-hover cursor-pointer transition-colors">
                    <span className="text-twitter-blue text-sm">Show more</span>
                </div>
            </div>

            <div className="border border-twitter-border rounded-2xl overflow-hidden mt-3">
                <h2 className="px-4 py-3 text-xl font-bold">Who to follow</h2>
                <FollowItem name="Elon Musk" username="elonmusk" />
                <FollowItem name="Vercel" username="vercel" />
                <FollowItem name="Lucide" username="lucideicons" />
                <div className="px-4 py-3 hover:bg-twitter-hover cursor-pointer transition-colors">
                    <span className="text-twitter-blue text-sm">Show more</span>
                </div>
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
