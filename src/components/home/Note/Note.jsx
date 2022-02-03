import PropTypes from 'prop-types';
import NoteAppBar from '../NoteAppBar/NoteAppBar';
import { useForm } from '../../../hooks/useForm';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { actionSetActiveNote, actionStartDeletingNote } from '../../../redux/actions/notes';
import defaultImageDemo from '../../../images/83968430_104662571102161_9176297833785982976_n.jpg';

const Note = ({ contentNote: thisNote }) => {

    const dispatch = useDispatch();

    const [formNotes, handleInputChange, , resetForm ] = useForm(thisNote);

    /**
     * 
     console.log( thisNote ); // thisNote sí cambia. Pero formNotes no lo hace, porque el hook useForm no se vuelve a reiniciar.
     console.log( formNotes );  // ¡ Reported Bug... formNotes: Mantiene el estado inicial de la primera vez que se renderizó el componente.

     Para solucionar este problema.
     Nosotros reseteamos el formulario, con la función de reset del useForm hook.
     Pero sin crear un ciclo infinito, ya que podría producirse al hacer dependencias con
     el hook useEffect(() => {}, [ thisNote ]); ó también, tal como se probó:
     No se actualize porque siempre toma el valor inicial de la thisNote, sin actualizar los cambios en 
     el formValues o en el state interno del hook useForm(). Para solucionar esto último agregamos el useRef() hook.
    */

    const initialNoteID = useRef( thisNote.id );

    useEffect(() => {

        if( thisNote.id !== initialNoteID.current ) {
            resetForm( thisNote );
            initialNoteID.current = thisNote.id;
        }

    }, [thisNote]);

    // El useRef() + useEffect() anteriores, cumplen la misma función que el siguiente IF:
    // if(thisNote.id !== formNotes.id ) {
    //     resetForm( thisNote );
    // }

    useEffect(() => {

        dispatch( actionSetActiveNote(formNotes) );

    }, [formNotes, dispatch]);

    const imgUrl = thisNote.urlImage || defaultImageDemo;

    const handleDeleteNote = () => {
        dispatch( actionStartDeletingNote(thisNote.id) );
    }

    return <div className="note">
        <NoteAppBar />

        <form className="note__form">
            <input
                type="text"
                name="title"
                value={ formNotes.title }
                onChange={ handleInputChange }
                placeholder="Type an awesome title"
                className="note__input-title animate__animated animate__slideInUp animate__slow"
                />

            <textarea
                name="body"
                value={ formNotes.body }
                onChange={ handleInputChange }
                placeholder="Empty"
                className="note__textarea animate__animated animate__fadeIn animate__slow"
                ></textarea>
        </form>

        <div className="note__footer">
            <img
                src={ imgUrl }
                alt="[note-img-preview]"
                className="note__image-preview animate__animated animate__fadeIn" />

            <button className="btn note__button-delete"
                onClick={ handleDeleteNote }
                >
                <span className="fas fa-trash-alt fa-sm"></span> &nbsp;
                Eliminar Nota</button>
        </div>
    </div>
}

Note.propTypes = {
    contentNote: PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        createdAt: PropTypes.number.isRequired,
    }).isRequired
};

export default Note;