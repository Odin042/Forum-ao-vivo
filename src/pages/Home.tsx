import { useHistory } from 'react-router-dom';
import { useContext } from 'react';

import illustrationImg from '../assents/Illustration.svg';
import logoImg from '../assents/logo.svg'
import googleIconImg from '../assents/google-icon.png';


import '../styles/auth.scss'
import { Button } from '../componets/Button';
import { AuthContext } from './../contexts/AuthContext';


export function Home() {
   const history = useHistory();
   const{ user, signInWithGoogle } = useContext(AuthContext)

   async function handleCreateRoom () {
    if(!user){ //Se  o usuario nao estiver logado, chama da função signInWithGoogle() para forçar o login
      await signInWithGoogle()
    }
   
     history.push('/rooms/new'); // Direciona o usuario após o login
  
  }
   
   
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
    
    );
}


