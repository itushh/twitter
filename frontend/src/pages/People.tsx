import Sidebar from "../components/layout/Sidebar"
import Widgets from "../components/layout/Widgets"
import PeopleList from "../components/layout/PeopleList"

const People = () => {
    return (
        <div className="max-w-310 mx-auto flex gap-8">
            <Sidebar />
            <PeopleList />
            <Widgets />
        </div>
    )
}

export default People;
