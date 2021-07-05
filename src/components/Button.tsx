import { ButtonHTMLAttributes } from "react";

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
    theme?: string;
}; 
//O type ButtonProps recebe todas as propriedades que um botão html pode ter

export function Button({isOutlined = false, theme, ...props}: ButtonProps) {
    return(
        <button 
            className={`button ${theme} ${isOutlined? 'outlined' : '' }`}
            { ...props } 
        /> //todas as props passadas serão colocadas como atributos normalmente
    );
};