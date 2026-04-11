import { useState } from "react"
import Feed from "../components/layout/Feed"
import Sidebar from "../components/layout/Sidebar"
import Widgets from "../components/layout/Widgets"
import TweetDetail from "../components/layout/TweetDetail"

const Home = () => {
  const [targetTweet, setTargetTweet] = useState<string | null>(null);

  return (
    <div className="max-w-310 mx-auto flex gap-8">
        <Sidebar />
        {targetTweet ? <TweetDetail onClick={() => setTargetTweet(null)} /> : <Feed onClick={() => setTargetTweet("xyz")} />}
        <Widgets />
    </div>
  )
}

export default Home