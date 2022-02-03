import { useState } from "react"

export const useForm = (initialFormValues = {}, onSubmitFunction = () => {} )=> {

    const [ values, setValues ] = useState( initialFormValues );

    const handleInputChanges = ({ target }) => {

        const { name, value } = target;

        setValues({
            ...values,
            [ name ]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmitFunction(e);
    }

    const resetForm = ( valuesReset = initialFormValues ) => {
        setValues( valuesReset );
    }

    return [
        values,
        handleInputChanges,
        handleSubmit,
        resetForm,
    ]
}