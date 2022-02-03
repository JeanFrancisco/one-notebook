import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from './useForm';

describe('Pruebas a los valores por defecto, retornados por el hook useForm', () => {

    test('Debe regresar el estado inicial, las funciones para cambiar los inputs, manejar el submit y resetear el formulario.', () => {

        const initialFormValues = {
            input1: 'Valor Aleatorio 1',
            input2: 23145,
            input3: 'Este es una prueba',
        }

        const { result } = renderHook(() => useForm( initialFormValues ));
        const [ values, handleInputChanges, handleSubmit, reset ] = result.current;

        expect( values ).toEqual( initialFormValues );
        expect(typeof handleInputChanges).toBe('function');
        expect(typeof handleSubmit).toBe('function');
        expect(typeof reset).toBe('function');
    });

});

describe('Pruebas a los manejadores de eventos del formulario (implementados por el hook useForm), y los cambios de estado provocados.', () => {

    const initialFormValues = {
        name: 'username',
        email: 'email@example.org',
    };
    let result;

    beforeEach(() => {
        const { result: hook_result } = renderHook(() => useForm( initialFormValues ));
        result = hook_result;
    });

    test('Debe retornar el estado modificado en la propiedad de: name', () => {
        const [ values, handleInputChanges ] = result.current;
        const testing_name = 'janedoe';
        const expected_object_values = {
            ...values,
            name: testing_name,
        };
        const testing_event = {
            target: {
                name: 'name',
                value: testing_name,
            }
        };

        act(() => {
            handleInputChanges(testing_event);
        });

        const [ updated_values ] = result.current;
        expect( updated_values ).toEqual( expected_object_values );
    });

    test('Debe retornar los valores del formulario al estado por defecto, después de haber reseteado el useForm() hook', () => {
        const [ values, handleInputChanges, , resetValues ] = result.current;

        const testing_event = {
            target: {
                name: 'email',
                value: 'joedoe@example.com',
            }
        };

        act(() => {
            handleInputChanges(testing_event);
            resetValues();
        });

        expect( result.current[0] ).toEqual( values );
    });

    test('Debe reasignar los valores del useForm hook, a los enviados en la función de reset, si estos están indicados en sus parametros', () => {
        const [ , handleInputChanges, , resetValues] = result.current;

        const expected_object_values = {
            name: 'janedoe',
            email: 'janedoe.email@example.org',
        };

        const testing_event = {
            target: {
                name: 'name',
                value: 'johndoe'
            }
        };

        act(() => {
            handleInputChanges(testing_event);
            resetValues(expected_object_values);
        });

        const [ values ] = result.current;
        expect( values ).toEqual( expected_object_values );
    });
});