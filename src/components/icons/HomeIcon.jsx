import style from './Icon.module.scss'
import cn from "classnames";
const HomeIcon = ({active}) => {
    return (
        <div className={cn(active ? style.svgActive : style.svg)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="">
                <path d="M10.1708 22.559V15.3539H15.8229V22.559C15.8229 23.3515 16.4588 24 17.236 24H21.4751C22.2522 24 22.8881 23.3515 22.8881 22.559V12.4719H25.2902C25.9402 12.4719 26.2511 11.6506 25.7565 11.2183L13.9436 0.367457C13.4066 -0.122486 12.5871 -0.122486 12.0501 0.367457L0.23718 11.2183C-0.243251 11.6506 0.0534859 12.4719 0.703481 12.4719H3.10564V22.559C3.10564 23.3515 3.7415 24 4.51867 24H8.75776C9.53493 24 10.1708 23.3515 10.1708 22.559Z" />
            </svg>
        </div>
    );
};

export default HomeIcon;
