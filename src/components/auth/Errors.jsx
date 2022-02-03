const Errors = ({ errors }) => (
    ( errors !== undefined ) && <>
        <label className="auth__errors">
            { errors }
        </label>
    </>
);

export default Errors;