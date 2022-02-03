import React from 'react';
import { shallow } from 'enzyme';
import { actionSavingChanges, actionStartUploadFile } from '../../../redux/actions/notes';
import NoteAppBar from './NoteAppBar';

const clickInputFile = jest.fn();

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
    useDispatch: jest.fn( () => mockDispatch ),
}));

jest.mock('../../../redux/actions/notes', () => ({
    actionSavingChanges: jest.fn(),
    actionStartUploadFile: jest.fn(),
}));

describe('Pruebas al componente de <NoteAppBar/>.jsx', () => {

    const wrapper = shallow(<NoteAppBar />);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe hacer el match con el snapshot capturado por defecto', () => {
        expect( wrapper ).toMatchSnapshot();
    });


    /* Trying to modify the onClick function, but it fails.
     * Due the setProps method only can be called at the root element */

    // test('Debe ejecutar el click del input con type="file", cuando dé click en el botón de Subir Imagen', () => {
    //     const handleClickFileInput = jest.fn();

    //     wrapper.find('#selector__file-photo').setProps( 'onClick', handleClickFileInput );

    //     wrapper.find('button').first().simulate('click');

    //     expect( handleClickFileInput ).toHaveBeenCalled(1);
    // });

    /* Correct implementation using useRef hook */
    test('Debe ejecutar el click del input con type="file" (Referenciado con useRef), cuando dé click en el botón de Subir Imagen', () => {
        const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { click: clickInputFile } });

        const wrapper = shallow(<NoteAppBar />);

        wrapper.find('button').first().simulate('click');

        expect( clickInputFile ).toHaveBeenCalledTimes(1);
    });

    test('Debe ejecutar la acción actionSavingChanges(), cuando dé click en el botón de Guardar', () => {
        wrapper.find('button').last().simulate('click');

        expect( actionSavingChanges ).toHaveBeenCalledTimes(1);
    });

    test('Debe ejecutar la acción actionStartUploadFile(), cuando haya hecho cambios en el input de type="file"', () => {        
        const fakeFileTest = new File([], 'test_file.txt');

        wrapper.find('input[type="file"]').simulate('change', {
            target: {
                files: [
                    fakeFileTest,
                ],
            }
        });

        expect( actionStartUploadFile ).toHaveBeenCalledWith( fakeFileTest );
    });
});