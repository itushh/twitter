import ProfileView from "../components/layout/ProfileView"
import Sidebar from "../components/layout/Sidebar"
import Widgets from "../components/layout/Widgets"

const Profile = () => {
  return (
    <div className="max-w-310 mx-auto flex gap-8">
        <Sidebar />
        <ProfileView />
        <Widgets />
    </div>
  )
}

export default Profile