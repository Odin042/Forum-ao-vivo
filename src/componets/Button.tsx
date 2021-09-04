import { ButtonHTMLAttributes } from 'react' // ButtonHTMLAttributes retorna todas a propriedades de um botão em HTML

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined ?: boolean
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
    return (
        <button className={`button ${isOutlined ? 'outlined' : ''}`} 
        {...props}
        /> //O botão recebe todas as propriedades de ButtonHTMLAttributes
    )
}