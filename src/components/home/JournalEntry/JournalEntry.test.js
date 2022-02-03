import { shallow } from "enzyme";
import { actionSetActiveNote } from "../../../redux/actions/notes";
import JournalEntry from "./JournalEntry";

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
    useDispatch: jest.fn().mockImplementation( () => mockDispatch ),
}));

describe('Pruebas al componente <JournalEntry/>.jsx', () => {

    const entryTest = {
        id: 'TESTS_UNKNOWN_ID',
        body: 'Lorem impsu a dolor graiem',
        title: 'An Awesome Title For Testing',
        urlImage: 'https://example.org/path/to/resources/test_image.png',
        createdAt: 0,
    };

    const wrapper = shallow(<JournalEntry entry={ entryTest } />);

    test('Debe hacer match con el snapshot capturado por defecto', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe llamar al dispatch pasándole la acción actionSetActiveNote(), cuando dé click dentro del recuadro de la Entry', () => {
        wrapper.find('.journal__entry').simulate('click');

        expect( mockDispatch ).toHaveBeenCalledWith( actionSetActiveNote({ ...entryTest }) );
    });

});