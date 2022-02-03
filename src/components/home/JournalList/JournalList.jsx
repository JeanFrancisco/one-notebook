import { useDispatch, useSelector } from "react-redux";
import JournalEntry from "../JournalEntry/JournalEntry";
import {
    actionReorderByRule,
    actionSetAscendingOrder,
    actionSetDescendingOrder,
} from "../../../redux/actions/notes";

const JournalList = () => {
    const dispatch = useDispatch();
    const items = useSelector( store => store.notes.notes );
    const order = useSelector( store => store.notes.order );
    const orderby = useSelector( store => store.notes.orderby );

    const handleToggleOrderRule = e => {
        dispatch( actionReorderByRule( e.target.value ) );
    }

    const handleToggleOrder = () => {

        if( order === 'asc' ) {
            dispatch( actionSetDescendingOrder() );

            // document.getElementById('btn-sort-icon').setAttribute('class', 'fa fa-sort-amount-up');
            /* Para estos casos. Ambas son malas implementaciones. Ya que se puede usar directamente en la propiedad className. */
            // iconSortRef.current?.setAttribute('class', 'fa fa-sort-amount-up');
        }
        else {
            dispatch( actionSetAscendingOrder() );

            // document.getElementById('btn-sort-icon').setAttribute('class', 'fa fa-sort-amount-down-alt');
            /* Ambas son malas implementaciones. Ya que se puede incluir directamente una condición en la prop className */
            // iconSortRef.current?.setAttribute('class', 'fa fa-sort-amount-down-alt');
        }
    }

    return <div className="journal__list">

        <div className="journal__list-order-form">
            <label className="journal__list-order-title"> Order by: </label>

            <input
                type="radio"
                name="orderBy"
                value="alphabetic"
                onChange={ handleToggleOrderRule }
                checked={ orderby === 'alphabetic' }
                id="alphabetic"/>
            <label htmlFor="alphabetic" >
                Alphabetically</label>

            <input
                type="radio"
                name="orderBy"
                value="cronologic"
                onChange={ handleToggleOrderRule }
                checked={ orderby === 'cronologic' }
                id="cronologic"/>
            <label htmlFor="cronologic" >
                Cronologically</label>

            <button className="btn" onClick={ handleToggleOrder }>
                <i id="btn-sort-icon"
                    className={ `fa fa-sort-amount-${
                        (order === 'asc')
                        ? 'down-alt'
                        : 'up'
                    }` }>
                </i>
            </button>
        </div>

        {   items.map( note => (
                <JournalEntry key={ note.id } entry={ note } />
            ))
        }
    </div>
}

export default JournalList;