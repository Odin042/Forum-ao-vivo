import { createContext, useState , useEffect } from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from "./pages/Home"
import { NewRoom } from './pages/NewRoom';


import firebase from 'firebase';
import { auth } from './services/firebase';


import { AuthContextProvider } from './contexts/AuthContext'


function App() {
   
 return (
     <BrowserRouter>  
     <AuthContext.Provider value = {{ user, signInWithGoogle}}>
        <Route path="/" exact component = {Home} />
        <Route path="/rooms/new" component= {NewRoom} />
      </AuthContext.Provider>
     </BrowserRouter>
  );
}


export default App;
