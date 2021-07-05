import { useState, createContext, useEffect, ReactNode } from "react";
import { firebase, auth } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
};
  
type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
    children: ReactNode;
};
  
export const AuthContext = createContext({} as AuthContextType); //createContext(a "cara" do que será passado para o contexto)

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => { //Função que fica "ouvindo" se um usuário já tinha sido logado na aplicação
        if(user) {
          const { displayName, photoURL, uid } = user;
  
          if(!displayName || !photoURL) {
            throw new Error('Missing information from Google Account');
          }
  
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          });
        }
      });
  
      return () => {
        unsubscribe(); //boa prática para desligar o eventListener (useEffect) após ele já ser executado uma vez
      };
    }, []); //Assim [] só será executado apenas logo quando entra na aplicação
    
      //Função de autenticação com o Google
      async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider(); //para faazer autenticação com o google
    
        const result = await auth.signInWithPopup(provider); //signInWithPopup para abrir a tela de autenticação com um popup
    
        if(result.user) {
          const { displayName, photoURL, uid } = result.user;
    
          if(!displayName || !photoURL) {
            throw new Error('Missing information from Google Account');
          }
    
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          });
        };
      };

    return(
        <AuthContext.Provider value={{ user, signInWithGoogle }}> { /*Todos os componentes dentro do provider conseguirão acessar os valores do contexto*/ }
            { props.children }
        </AuthContext.Provider>
    );
};