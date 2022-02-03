import types from '../../../redux/constants/typesUi';

const predefined_types = [
    'START_LOADING',
    'FINISH_LOADING',
];

describe('Pruebas con los types pre-definidos, para la parte de [UI]', () => {

    test('Todos los TYPES deben cumplir con la nomenclatura. Además de que todos deben estar pre-definidos en las pruebas', () => {
        const expected_types = {};

        predefined_types.forEach(type => {
            expected_types[`UI_${type}`] = `[UI] ${type}`;
        });
    
        expect( types ).toEqual( expected_types );
    });

    test('No debe haber más elementos de los pre-definidos en la prueba', () => {
        expect( Object.keys(types) ).toHaveLength( predefined_types.length );
    });
});