import { createContext , ReactNode , useState ,  useEffect } from "react";
import { auth , firebase} from "../services/firebase";


type User = {  // Criação do objeto USER, com os dados que ele deve conter id: ID do google, unico por usuario  , Name: o nome do usuario conforme o google e avatar: a foto que esta cadastrada no google
    id: string,
    name: string,
    avatar: string
 }
 
 type AuthContextType = { // Declaração para uso na função Autenticação do google, nela e definida a passagem de parametro por usuario e undefined se nao estiver logado
   user: User | undefined;
   signInWithGoogle: () => Promise<void>; //Promise é a usado qnd estamos utilizando funções assíncronas. Usamos isso quando esperamos o retorno de alguma API. 
 }

 type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext ({} as AuthContextType); // Criação de contexto, no caso enviar os dados de loguin para todas as paginas que são necessarias o usuario estar logado.

  
export function AuthContextProvider(props: AuthContextProviderProps ) {
    const [user , setUser] = useState<User>(); // Constante que guarda os dados do usuario e "seta" os dados com setUser
   
    useEffect(() => {  //useEffect guarda a informação de login caso o usuario atualize a pagina.
     const unsubscribe = auth.onAuthStateChanged(user => {
       if(user){
         const{ displayName, photoURL, uid } = user
 
      if (!displayName || !photoURL) { // Caso o usuario nao tenha Nome ou foto, mensagem de erro é apresentada e o loguin nao acontece
        throw new Error('Informações de loguin do Google insuficientes');
      }
 
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
       })
      }
   })
   return () => {
     unsubscribe();
    }
 
   }, [])
 
    async function signInWithGoogle(){ // Usa a autenticação do google pelo FIREBASE
      const provider = new  firebase.auth.GoogleAuthProvider();
 
                                                    
     auth.signInWithPopup(provider).then(result => {                                                   // Função de loguin com o google usando o modo Popup
      if(result.user){
           const{ displayName, photoURL, uid } = result.user
 
        if (!displayName || !photoURL) { // Caso o usuario nao tenha Nome ou foto, mensagem de erro é apresentada e o loguin nao acontece
          throw new Error('Informações de loguin do Google insuficientes');
        }
 
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
         })
        }
     });
  }
  
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
        {props.children}
    </AuthContext.Provider>
    
    );
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
