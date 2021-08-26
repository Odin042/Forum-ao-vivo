import { useParams } from 'react-router-dom';
import logoImg from '../assents/logo.svg';
import { Button } from '../componets/Button';
import { RoomCode } from '../componets/RoomCode';

import '../styles/room.scss'

type RoomParams = {
    id: string;
}

export function Room() {
    const params = useParams<RoomParams>();



    return(
        <div id="page-room">
            <header>
               <div className="content">
                   <img src={logoImg} alt = "Letmeask" />
                   <RoomCode code={params.id}/>
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