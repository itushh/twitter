import Sidebar from "./Sidebar";
import Widgets from "./Widgets";

const UnderConstruction = () => {
    return (
        <div className="flex max-w-310 mx-auto gap-8">
            <Sidebar />
            <div className="w-full border-x border-twitter-border flex justify-center items-center">
                <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
                    <h2 className="text-3xl font-bold mt-4">Under Construction</h2>
                    <p className="text-twitter-gray mt-2 max-w-sm">
                        This page is currently being built. Check back soon for more features!
                    </p>
                    <div className="mt-8 p-4 bg-twitter-background-secondary rounded-2xl w-full max-w-xs">
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-full bg-twitter-gray h-10 w-10"></div>
                            <div className="flex-1 space-y-6 py-1">
                                <div className="h-2 bg-twitter-gray rounded"></div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-twitter-gray rounded col-span-2"></div>
                                        <div className="h-2 bg-twitter-gray rounded col-span-1"></div>
                                    </div>
                                    <div className="h-2 bg-twitter-gray rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Widgets />
        </div>
    );
};

export default UnderConstruction;
