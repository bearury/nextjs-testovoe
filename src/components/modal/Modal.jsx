'use client'
import {useContext, useState} from 'react';
import style from './Modal.module.scss';
import {Context} from "@/components/provider/Provider";
import cn from "classnames";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {CheckBoxIcon, LockIcon, PhoneIcon} from "@/components/icons";
import Link from "next/link";
import {authAPI} from "@/api/api";


const Modal = () => {
    const {isOpen, setIsOpen, type, setIsAuth} = useContext(Context);
    const {push} = useRouter();
    const [errorsAuth, setErrorsAuth] = useState({status: false, message: ''})

    const isLogin = type === 'login';
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        watch,
        clearErrors
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });
    const toggleModal = () => {
        clearErrors('email');
        clearErrors('password');
        clearErrors('password2');
        setIsOpen(!isOpen);
        setErrorsAuth({status: false, message: ''});
    }


    const onSubmit = async ({email, password}) => {
        setIsLoading(true)
        const {data, status} = await authAPI({email, password, isLogin})
        if (status === 200) {
            setIsAuth(true);
            sessionStorage.setItem('token-tt', data.accessToken);
            reset();
            push('/account');
            toggleModal();
        } else {
            setErrorsAuth({status: true, message: data.message})
        }
        setIsLoading(false)
    };


    const handleInput = () => {
        clearErrors('email');
        clearErrors('password');
        clearErrors('password2');
        setErrorsAuth({status: false, message: ''})
    }


    return (
        <div className={cn(isOpen ? style.wrapper : 'hidden')}>
            <div className={style.container}>
                <div className={style.closeBtnWrapper}>
                    <div className={style.closeBtn} onClick={toggleModal}></div>
                </div>
                <h2 className={style.title}>{type === 'login' ? 'Логин' : 'Регистрация'}</h2>
                <div className={style.errorsAuth}>{errorsAuth.message}</div>
                <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                    <label className={style.label}>
                        <PhoneIcon/>
                        Ваш e-mail
                        <input id='email' type='email' name='email' onInput={handleInput}
                               {...register('email', {
                                   required: true,
                                   pattern: {
                                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                       message: 'Не верный формат E-mail',
                                   },
                               })}/>
                    </label>
                    {errors.email && <div className={style.textError}>{errors.email.message}</div>}
                    <label className={style.label}>
                        <LockIcon/>
                        Пароль
                        <input type='password' name="password" onInput={handleInput} {...register('password', {
                            required: true,
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                                message:
                                    'Минимум 8, одна буква, одна цифра, один сепец.символ',
                            },
                        })}/>
                    </label>
                    {errors.password && <div className={style.textError}>{errors.password.message}</div>}
                    {!isLogin ?
                        <>
                            <label className={style.label}>
                                <LockIcon/>
                                Подтвердите пароль
                                <input type='password' name="password2" onInput={handleInput} {...register('password2', {
                                    required: true,
                                    pattern: {
                                        value: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                                        message:
                                            'Минимум 8, одна буква, одна цифра, один сепец.символ',
                                    },
                                    validate: (val) => {
                                        if (watch('password') !== val) {
                                            return 'Введенные пароли не совпадают'
                                        }
                                    }
                                })}/>
                            </label>
                            {errors.password2 && <div className={style.textError}>{errors.password2.message}</div>}
                        </> : <Link href='#' className={style.linkPassword}>Забыли пароль?</Link>
                    }

                    <div className={style.agreement}>
                        <CheckBoxIcon/>
                        <span>
                            Нажимая кнопку, вы подтверждаете, что ознакомились и соглашаетесь с {<Link href='#'>Условиями Соглашения!</Link>} Правилами и политикой конфиденциальности компании
                        </span>
                    </div>
                    <button type='submit' disabled={isLoading} className={style.submitBtn}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
