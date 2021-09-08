import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../assents/logo.svg';
import deleteImg from '../assents/delete.svg';
import checkImg from '../assents/checkImg.svg';
import answerImg from '../assents/answerImg.svg';
import { Button } from '../componets/Button';
import { RoomCode } from '../componets/RoomCode';


import '../styles/room.scss'
import { database } from '../services/firebase';
import { Question } from '../componets/Question';
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    
    
    const {title , questions} = useRoom(roomId)


    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update ({
            endedAt: new Date(),
        })

        history.push('/');
    }

     async function handleDeleteQuestion(questionId: string) {
      if  (window.confirm('Deseja realmente apagar essa pergunta?')){
          await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
      }
    }

     async function handleCheckQuestionAsAnswered(questionID: string) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
          isAnswered: true,
      })
    }
      async function handleHighLightQuestion(questionID: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        })
    }

    return(
        <div id="page-room">
            <header>
               <div className="content">
                   <img src={logoImg} alt = "Letmeask" />
                   <div>
                   <RoomCode code={roomId}/>
                   <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                   </div>
               </div>  
            </header>

            <main>
              <div className="room-title">
                <h1>Sala {title}</h1>
                {questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
              </div> 
             
            <div className="question-list">
             {questions.map(question => {
                 return (
                    <Question 
                       key={question.id}
                       content={question.content}
                       author= {question.author}
                      >
                      
                       <button
                       type="button"
                       onClick={() => handleCheckQuestionAsAnswered(question.id)}
                       >
                        <img src={checkImg} alt="Marca pergunta como respondida" />
                    </button>

                    <button
                       type="button"
                       onClick={() => handleHighLightQuestion(question.id)}
                  >
                        <img src={answerImg} alt="Dar destaque a pergunta" />
                    </button>

                      <button
                         type="button"
                         onClick={() => handleDeleteQuestion(question.id)}
                    >
                          <img src={deleteImg} alt="Remover pergunta" />
                      </button>
                
                   </Question>
                 );
             })}
             </div>
           </main>            
        </div>
    );
  }
