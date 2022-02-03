import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { actionSavingChanges, actionStartUploadFile } from '../../../redux/actions/notes';

const NoteAppBar = () => {
    const dispatch = useDispatch();

    const inputFile = useRef();

    const handleSavingNote = () => {
        dispatch( actionSavingChanges() );
    }

    const handleUploadClick = () => {
        // document.getElementById('selector__file-photo').click(); // Trigger the click event listener..
        inputFile.current.click();
    }

    const handleChangeSelectFile = e => {
        const uniqueFile = e.target.files[0];

        dispatch( actionStartUploadFile(uniqueFile) );
    }

    return <div className="note__appbar">
        <span className="note__appbar-date">28 de agosto de 2020</span>
        <input id="selector__file-photo"
            type='file'
            style={{ display: 'none' }}
            onChange={ handleChangeSelectFile }
            ref={ inputFile }
            />
        <button className="btn btn-primary"
            onClick={ handleUploadClick } >
            <span className="fas fa-cloud-upload-alt fa-sm"> </span>
            &nbsp;
            Subir Imagen
        </button>
        <button className="btn btn-primary"
            onClick={ handleSavingNote }
            >
            <i className="fas far fa-save fa-sm"></i>
            &nbsp;
            Guardar
        </button>
    </div>;
};

export default NoteAppBar;