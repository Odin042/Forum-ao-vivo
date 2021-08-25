import { useHistory } from 'react-router-dom';


import illustrationImg from '../assents/Illustration.svg';
import logoImg from '../assents/logo.svg'
import googleIconImg from '../assents/google-icon.png';

import { database } from '../services/firebase';


import '../styles/auth.scss'
import { Button } from '../componets/Button';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';


export function Home() {
   const history = useHistory();
   const{ user, signInWithGoogle } = useAuth();
   const [ roomCode, setRoomCode] = useState('');

   async function handleCreateRoom () {
    if(!user){ //Se  o usuario nao estiver logado, chama da função signInWithGoogle() para forçar o login
      await signInWithGoogle()
    }
   
     history.push('/rooms/new'); // Direciona o usuario após o login
  
  }

   async function handleJoinRoom(event: FormEvent) {
     event.preventDefault();

     if(roomCode.trim() === '') {
       return;
   }

    const roomRef = await database.ref(`rooms/${roomCode}` ).get();

    if(!roomRef.exists()) {
       alert('Room does not exists');
       return;
  }

    history.push(`/rooms/${roomCode}`);
}
   
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
                <button onClick={handleCreateRoom} className = "create-room">
                  <img src={googleIconImg} alt="Botão para criar conta com o google" />
                </button>
                <div className="separator">ou entre em uma sala</div>
                <form onSubmit = {handleJoinRoom}>  
                    <input 
                    type="text"
                    placeholder="Digite o codigo da sala"
                    onChange={event => setRoomCode(event.target.value)}
                    value={roomCode}
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


