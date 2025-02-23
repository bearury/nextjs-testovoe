'use client'
import style from './Page.module.scss';
import Link from "next/link";
import cn from "classnames";
import {useRouter} from "next/navigation";
import {useContext, useEffect} from "react";
import {Context} from "@/components/provider/Provider";

const Account = () => {
    const {push} = useRouter();
    const {isAuth} = useContext(Context);

    useEffect(() => {
        !isAuth && push('/');
    }, [isAuth, push]);


    const handlerDownload = () => {
        push('./account/upload')
    }

    const handlerUpload = () => {
        push('./account/download')
    }
    return (
        <div className='h-full'>
            <div className={style.container}>
                <div className={style.breadcrumbs}>
                    <Link href={"/"}>Главная </Link>
                    / 🌀 /
                    <Link className='underline' href={"/account"}> Настройки аккаунта</Link>
                </div>
                <div className={style.blockBtn}>
                    <button onClick={handlerUpload} className={cn(style.loginBtn, style.btn)}>Посмотреть аватар</button>
                    <button onClick={handlerDownload} className={cn(style.regBtn, style.btn)}>Загрузить аватар</button>
                </div>
            </div>
        </div>
    );
};

export default Account;
