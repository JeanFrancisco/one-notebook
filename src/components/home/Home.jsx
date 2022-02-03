import { useSelector } from "react-redux";
import Sidebar from "./Sidebar/Sidebar";
import Nothing from "./Nothing/Nothing";
import Note from "./Note/Note";

const Home = () => {
    const activeNote = useSelector( store => store.notes.active );

    return <>
        <Sidebar />

        <div className="home__main-content">
            {   (activeNote)
                ? <Note contentNote={ activeNote } />
                : <Nothing />
            }
        </div>
    </>
}

export default Home;