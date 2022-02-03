import types from '../../../redux/constants/typesNotes';

describe('Pruebas a los types definidos en typesNotes.js', () => {

    test('Debe coincidir con el objeto pre-definido en las pruebas como conjunto', () => {
        const expected_types = {
            NOTES_NEW_NOTE: '[NOTES] NEW_NOTE',
            NOTES_DROP_NOTE: '[NOTES] DROP_NOTE',
            NOTES_SET_ACTIVE: '[NOTES] SET_ACTIVE',
            NOTES_UPDATED_NOTE: '[NOTES] UPDATED_NOTE',
            NOTES_DISPLAY_IN_SIDEBAR: '[NOTES] DISPLAY_IN_SIDEBAR',
            NOTES_CLEANING_WHEN_LOGOUT: '[NOTES] CLEANING_WHEN_LOGOUT',
            NOTES_CHANGE_ORDER: '[NOTES] CHANGE_ORDER',
        }

        expect( types ).toEqual( expected_types );
    });

    test('Todos los TYPES deben cumplir con las normas de nomenclatura.', () => {
        const prefix = 'NOTES';

        for (const keyName in types) {
            expect( keyName ).toContain(`${prefix}_`);
            expect( types[keyName] ).toContain(`[${prefix}] `);
            expect( keyName.replace(`${prefix}_`, '') ).toEqual( types[keyName].replace(`[${prefix}] `, '') );
        }
    });

    test('Todos los TYPES deben ser únicos en su valor, no deberán repetirse los contenidos.', () => {

        for (const keyName in types) {
            /*
            * No tiene mucho sentido esta prueba, con expect evaluando las Object.keys().
            * Porque los objetos  NO  toman 2 propiedades con el mismo nombre
            */
            // expect( Object.keys(types).filter(key => (key === keyName) ) ).toHaveLength(1);


            expect( Object.values(types).filter(value => (value === types[keyName]) ) ).toHaveLength(1);
        }
    });
});