import { useHistory } from 'react-router-dom';

import illustrationImg from '../assents/Illustration.svg';
import logoImg from '../assents/Logo.svg'
import googleIconImg from '../assents/google-icon.png';


import '../styles/auth.scss'
import { Button } from '../componets/Button';
import firebase from 'firebase';
import { auth } from '../services/firebase';

export function Home() {
   const history = useHistory();

   function handleCreateRoom () {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then (result => {
      console.log(result);
    })
   

    return (
        <div id ="page-auth">
            <aside>
               <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" /> 
               <strong>Crie salas e responda seu publico AO VIVO </strong>
               <p>Crie uma grande rede de pergutas e respostas</p>
            </aside>
            <main>
              <div onClick={handleCreateRoom} className="main-content">
                <img src={logoImg} alt="Logo do aplicativo" />
                <button className = "create-room">
                  <img src={googleIconImg} alt="Botão para criar conta com o google" />
                </button>
                <div className="separator">ou entre em uma sala</div>
                <form>
                    <input 
                    type="text"
                    placeholder="Digite o codigo da sala"
                    />
                    <Button type="submit">
                        Entrar na sala
                    </Button>
                </form>
               </div>
             </main>
        </div>
    
    )
}
}

