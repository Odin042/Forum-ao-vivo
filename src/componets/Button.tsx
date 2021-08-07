import { ButtonHTMLAttributes } from 'react' // ButtonHTMLAttributes retorna todas a propriedades de um botão em HTML

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
    return (
        <button className="button" {...props} />
    )
}