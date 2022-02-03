import { useDispatch, useSelector } from "react-redux";
import JournalList from "../JournalList/JournalList";
import { authFirebaseLogout } from "../../auth/actions";
import { actionAddNewNote } from "../../../redux/actions/notes";

const Sidebar = () => {
    const dispatch = useDispatch();
    const user = useSelector( store => store.auth );

    const handleLogout = () => {
        const asyncAction = authFirebaseLogout();
        dispatch( asyncAction );
    }

    const handleClickNewEntry = () => {
        const asyncAction = actionAddNewNote();
        dispatch( asyncAction );
    }

    return <aside className="sidebar">
        <div className="sidebar__user-info">
            <i className="sidebar__user-icon far fa-moon"></i>
            <p className="sidebar__user-name">
                { user.name }
            </p>

            <button
                className="btn sidebar__user-loggout"
                onClick={ handleLogout } >
                Logout
            </button>
        </div>

        <div className="sidebar__new-entry">
            <button
                onClick={ handleClickNewEntry }
                className="btn">
                <div className="sidebar__new-entry-icon fa-5x">
                    <i className="far fa-calendar"></i>
                    <i className="fas fa-plus" data-fa-transform="shrink-8 left-9 down-5"></i>
                </div>
                <span className="sidebar__new-entry-txt">
                    New Entry
                </span>
            </button>
        </div>

        <JournalList />
    </aside>
}

export default Sidebar;