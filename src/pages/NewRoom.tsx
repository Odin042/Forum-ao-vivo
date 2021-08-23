import { Button } from '../componets/Button';
import { database } from '../services/firebase';
import { FormEvent , useState } from 'react'
import { useAuth } from '../hooks/useAuth'

import illustrationImg from '../assents/Illustration.svg';
import logoImg from '../assents/logo.svg'



import '../styles/auth.scss'

import { Link, useHistory } from 'react-router-dom'




export function NewRoom() {
   const { user } = useAuth();
   const history - useHistory();
   const [newRoom , setNewRoom] = useState('');

   async function handleCreateRoom(event: FormEvent) {
       event.preventDefault();

       if( newRoom.trim() === ''){
         return;
         
       }
      const roomRef = database.ref('rooms');

      const firebaseRoom = await roomRef.push({
          title: newRoom,
          authorId: user?.id,

    })
    history.push('/rooms/${firebaseRoom.key}')
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
                <h2> Criar uma nova Sala </h2>
                <form onSubmit = {handleCreateRoom}>
                    <input 
                    type="text"
                    placeholder="Nome da sala"
                    onChange = {event =>setNewRoom(event.target.value)}
                    value = {newRoom} 
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