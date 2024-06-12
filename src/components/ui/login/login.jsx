'use client';
import css from './login.css';
import { useRef, useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import LoginButton from './loginButton';
import { redirect } from 'next/dist/server/api-utils';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState({ initial: true, message: null });
    const [passwError, setPasswError] = useState({ initial: true, message: null });
    const [errorMessage, setErrorMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    const refs = {
        emailRef: useRef(),
        passRef: useRef(),
        msgRef: useRef(),
    }

    useEffect(() => {
        if (emailError.initial || passwError.initial || emailError.message || passwError.message) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [emailError, passwError]);

    async function handleLoginSubmit(e){
        e.preventDefault();
        const email = refs.emailRef.current.value;
        const password = refs.passRef.current.value;

        try {
            setLoading(true);
            const responseNextAuth = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (responseNextAuth.ok) {
                console.log(responseNextAuth);
                //sessionStorage.settItem("sessionUser", responseNextAuth)
                // Handle if it's right
                redirect(`/`);
            }else{
                if(responseNextAuth.error === 'fetch failed'){
                    showErrorMessage('El servidor no envió una respuesta.')
                }else{
                    showErrorMessage(responseNextAuth.error);
                }
            }
        } catch (error) {
            console.log(error);
            showErrorMessage('Ocurrió un error en el servidor');
        }finally{
            setLoading(false);
        }

    }

    function showErrorMessage(mensaje, ms){
        if (!ms) ms = 5000;
        setErrorMessage(mensaje);
        setTimeout(() => {
            setErrorMessage('');
        }, ms);
    }

    let emailInputValue = '';
    let timeoutId;

    const handleEmailChange = e => {
        clearTimeout(timeoutId);
        emailInputValue = e.target.value;
        timeoutId = setTimeout(() => {
            validateEmail(e.target.value);
        }, 300);
    }
    const validateEmail = email => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(emailPattern.test(email)){
            setEmailError({
                initial: false,
                message: null
            })
            refs.emailRef.current.classList.remove('outline', 'outline-2', 'outline-rose-500');
        }else{
            setEmailError({
                initial: false,
                message: 'Email no válido'
            })
            refs.emailRef.current.classList.add('outline', 'outline-2', 'outline-rose-500');
        }
    }

    let passwInputValue = '';

    const handlePassChange = e => {
        clearTimeout(timeoutId);
        passwInputValue = e.target.value;
        timeoutId = setTimeout(() => {
            validatePassw(e.target.value);
        }, 600);
    }

    const validatePassw = passw => {
        if(passw.length >= 4){
            setPasswError({
                initial: false,
                message: null
            })
            refs.passRef.current.classList.remove('outline-2', 'outline', 'outline-rose-500');
        }else{
            setPasswError({
                initial: false,
                message: 'Contraseña no válida'
            })
            refs.passRef.current.classList.add('outline', 'outline-2', 'outline-rose-500');
        }
    }

    return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Ingresa a tu cuenta</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method='post'>
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Correo electrónico</label>
                    <div className="mt-1 c-input-container">
                        <input id="email" name="email" type="email" autoComplete="email" onChange={handleEmailChange} ref={refs.emailRef} required className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        { emailError.message && <span className='text-xs c-input-text text-red-600 bg-white'>{emailError.message}</span>}
                    </div>
                </div>
                {/* Contraseña */}
                <div> 
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                    <div className="text-sm">
                        <Link href={'/cambiarclave'} className="font-semibold text-indigo-600 hover:text-indigo-500">Olvidaste tu clave?</Link>
                    </div>
                    </div>
                    <div className="mt-1 c-input-container">
                        <input id="password" name="password" type="password" onChange={handlePassChange} ref={refs.passRef} autoComplete="current-password" required className="box-border block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        {passwError.message && <span className='text-xs c-input-text text-red-600 bg-white'>{passwError.message}</span>}
                    </div>
                </div>
                <div className='min-h-5'>
                    <span ref={refs.msgRef} className='text-sm text-red-600 bg-white'>{errorMessage}</span>
                </div>
                {/* Boton */}
                <div>
                    <LoginButton loading={loading} isDisabled={isDisabled} setEnabled={setIsDisabled} handleLoginSubmit={handleLoginSubmit}></LoginButton>
                </div>
            </form>

            <p className="mt-4 text-center text-sm text-gray-500"> Todavía no te uniste?
                <Link href={'/crearCuenta'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Crear una cuenta</Link>
            </p>
        </div>
    </div>
    );
}

export default Login;