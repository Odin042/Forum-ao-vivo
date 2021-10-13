import { useState , FormEvent} from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assents/logo.svg';
import { Button } from '../componets/Button';
import { RoomCode } from '../componets/RoomCode';


import '../styles/room.scss'
import '../styles/question.scss'
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { Question } from '../componets/Question';
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
    id: string;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion , setNewQuestion ] = useState('');
    const roomId = params.id;
    
    
    const {title , questions} = useRoom(roomId)



    async function handleSendQuestion(event: FormEvent) {
        if(newQuestion.trim() === '') {
            return;
        }
   
        if(!user) {
            throw new Error('Você precisa estar logado');
        }
      
        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        };
         await database.ref(`rooms/${roomId}/questions`).push(question);

         setNewQuestion('');
    }
   
    async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
        if(likeId){

            await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()

        }else{

        await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
          authorId: user?.id,
    })
    }
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
                <h1>Sala {title}</h1>
                {questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
              </div> 
             
             <form onSubmit ={handleSendQuestion}>
                 <textarea
                 placeholder="O que vc deseja perguntar?"
                 onChange={event=>setNewQuestion(event.target.value)}
                 value={newQuestion}
                 />

              <div className="form-footer">
                  { user ? (
                      <div className="user-info">
                        <img src = {user.avatar} alt={user.name} />
                        <span>{user.name}</span>
                      </div>
                  ) : (
                    <span> Para enviar uma pergunta,<button>faça seu loguin</button>.</span>
                  ) }
                  <Button type="submit" disabled={!user}>Enviar Pergunta</Button>
              </div>
             </form>
             
            <div className="question-list">
             {questions.map(question => {
                 return (
                    <Question
                       key={question.id}
                       content={question.content}
                       author= {question.author}
                       isAnswered ={question.isAnswered}
                       isHighlighted={question.isHighlighted}
                    >
                     <button
                       className={`like ${question.likeId? 'liked' : ''}`} 
                       type="button"
                       aria-label="like"
                       onClick={() => handleLikeQuestion(question.id , question.likeId) }
                       >
                      
                        { question.likeCount > 0 && <span>{question.likeCount}</span> }
                       <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M6 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V12C1 11.4696 1.21071 10.9609 1.58579 10.5858C1.96086 10.2107 2.46957 10 3 10H6M13 8V4C13 3.20435 12.6839 2.44129 12.1213 1.87868C11.5587 1.31607 10.7956 1 10 1L6 10V21H17.28C17.7623 21.0055 18.2304 20.8364 18.5979 20.524C18.9654 20.2116 19.2077 19.7769 19.28 19.3L20.66 10.3C20.7035 10.0134 20.6842 9.72068 20.6033 9.44225C20.5225 9.16382 20.3821 8.90629 20.1919 8.68751C20.0016 8.46873 19.7661 8.29393 19.5016 8.17522C19.2371 8.0565 18.9499 7.99672 18.66 8H13Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                       </svg>

                       </button>
                    </Question>
                 );
             })}
             </div>
           </main>            
        </div>
    );
  }
