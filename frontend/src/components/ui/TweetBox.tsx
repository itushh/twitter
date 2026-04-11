import { Image, Ghost, ListTodo, Smile, CalendarDays, MapPin } from "lucide-react";

const TweetBox = ({ msg }: { msg: string }) => {
    return (
        <div className="px-4 py-2 border-b border-twitter-border flex gap-3">
            <div className="w-10 h-10 rounded-full bg-twitter-gray shrink-0 mt-1" />
            <div className="flex-1">
                <textarea
                    placeholder={msg}
                    className="w-full bg-transparent text-lg outline-none placeholder:text-twitter-gray resize-none py-3"
                    rows={1}
                />
                <div className="flex items-center justify-between pt-3 pb-1">
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
                    <button className="bg-twitter-blue text-white font-bold rounded-full px-5 py-1.5 hover:bg-opacity-90 transition-colors disabled:opacity-50">
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TweetBox;
