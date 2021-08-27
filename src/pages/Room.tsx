import { useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assents/logo.svg';
import { Button } from '../componets/Button';
import { RoomCode } from '../componets/RoomCode';
import toast, { Toaster } from "react-hot-toast";

import '../styles/room.scss'
import { useAuth } from '../hooks/useAuth';

type RoomParams = {
    id: string;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion , setNewQuestion ] = useState('');
    const roomId = params.id;
    const ErrorLoguin = () => toast.error("Você precisa esta logado :/");

    async function handleSendQuestion() {
        if(newQuestion.trim() === '') {
            return;
        }

        if(!user) {
            throw ErrorLoguin;
        }
       
        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
            },
        };
    }
    return(
        <div id="page-room">
            <header>
               <div className="content">
                   <img src={logoImg} alt = "Letmeask" />
                   <RoomCode code={roomId}/>
               </div>
            </header>

            <main>
              <div className="room-title">
                <h1>Sala React</h1>
                <span>4 perguntas</span>
              </div> 
             
             <form>
                 <textarea
                 placeholder="O que vc deseja perguntar?"
                 onChange={event=>setNewQuestion(event.target.value)}
                 value={newQuestion}
                 />

              <div className="form-footer">
                  <span> Para enviar uma pergunta,<button>faça seu loguin</button>.</span>
                  <Button type="submit">Enviar Pergunta</Button>
              </div>
             </form>
           </main>            
        </div>
    );
  }
