import { useDispatch } from 'react-redux';
import moment from 'moment';
import { actionSetActiveNote } from '../../../redux/actions/notes';

const JournalEntry = ({ entry }) => {
    const { id, urlImage, title, body, createdAt } = entry;

    const momentCreatedDate = moment(createdAt);
    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch( actionSetActiveNote({ ...entry }) )
    }

    return <div className="journal__entry animate__animated animate__pulse"
            onClick={ handleEntryClick }
        >
        {
            urlImage &&
            <div className="journal__entry-image animate__animated animate__fadeIn animate__slow" style={{
                backgroundImage: `url(${ urlImage })`,
            }}>
            </div>
        }

        <div className="journal__entry-content">
            <h5 className="journal__entry-title">{ title }</h5>
            <p className="journal__entry-description">
                { body }
            </p>
        </div>

        <label className="journal__entry-date">
            { momentCreatedDate.format('dddd') }
            <span className="journal__entry-day">
                { momentCreatedDate.format('Do') }
            </span>
        </label>
    </div>
}

export default JournalEntry;