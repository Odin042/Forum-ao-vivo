import illustrationImg from '../assents/Illustration.svg';
import logoImg from '../assents/Logo.svg'

import { Link } from 'react-router-dom'

import '../styles/auth.scss'
import { Button } from '../componets/Button';

export function NewRoom() {
    return (
        <div id ="page-auth">
            <aside>
               <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" /> 
               <strong>Crie salas e responda seu publico AO VIVO </strong>
               <p>Crie uma grande rede de pergutas e respostas</p>
            </aside>
            <main>
              <div className="main-content">
                <img src={logoImg} alt="Logo do aplicativo" />
                <h2> Criar uma nova Sala </h2>
                <form>
                    <input 
                    type="text"
                    placeholder="Nome da sala"
                    />
                    <Button type="submit">
                        Entrar na sala
                    </Button>
                </form>
                <p>Quer entrar em uma sala já existente?<Link to ="/">Clique aqui</Link></p>
               </div>
             </main>
        </div>
    )
}