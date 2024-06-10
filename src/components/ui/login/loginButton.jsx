import Spinner from "../spinner";

const LoginButton = ({ loading, isDisabled, handleLoginSubmit }) => {
    const enabledClasses = "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
    const disabledClasses = "flex w-full justify-center rounded-md bg-slate-500 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm";
    loading ? isDisabled = false : null;
    return (
        <button type="submit" disabled={isDisabled} onClick={handleLoginSubmit} className={( !loading && !isDisabled ) ? enabledClasses : disabledClasses}>
            {!loading && <>Iniciar sesión</>}
            {loading && <span className="c-span-spinner-parent">Cargando<span className="c-span-spinner-child"><Spinner/></span></span>}
        </button>
    );
}

export default LoginButton;
