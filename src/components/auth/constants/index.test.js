import types from './index';

describe('Pruebas con los tipos de --[AUTH]--', () => {

    const expected_types = [
        'AUTH_LOGIN',
        'AUTH_LOGOUT',
        'AUTH_SET_ERROR',
        'AUTH_REMOVE_ERROR',
    ];

    test('Debe tener la cantidad de tipos definidos y los mismos definidos.', () => {
        expect( Object.keys(types) ).toHaveLength( expected_types.length );

        expected_types.forEach( type_name => {
            expect( types ).toHaveProperty(type_name);
        });
    });

    test('Los Types deben tener valores únicos de String, sólo elementos únicos que no se repitan entre sus demás propiedades.', () => {
        const values = Object.values(types);

        values.forEach( string_value => {
            expect( values.filter( current_value => (string_value === current_value) ) ).toHaveLength(1);
        });
    });

});