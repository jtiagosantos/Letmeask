import { useHistory } from 'react-router-dom'; //importação do hook para trabalhar com navegação de páginas usando botão
import { useAuth } from '../hooks/useAuth';

import { FormEvent, useState, useContext } from 'react';

import { ThemeContext } from '../contexts/ThemeContext';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { database } from '../services/firebase';

import { Button } from '../components/Button';
import { ButtonToggle } from '../components/ButtonToggle';

import '../styles/auth.scss';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

export function Home() {
    const history = useHistory();

    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');
    
    const { theme } = useContext(ThemeContext);

    async function handleCreateRoom() {
        if(!user) {
            await signInWithGoogle();
        }

        history.push('rooms/new'); //navegação para a página de criar sala
    };

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === '') {
            return;
        };

        const roomRef = await database.ref(`rooms/${roomCode}`).get(); //pega todos os registros dessa referência dentro do banco

        if(!roomRef.exists()) {
            alert('Room does not exists.');
            return;
        };

        if(roomRef.val().endedAt) {
            toast.error('Sala já fechada!');
            return;
        }

        history.push(`rooms/${roomCode}`);
    };

    return(
        <>
            <ToastContainer />
            <div id={`page-auth-${theme}`}>
                <aside>
                    <img src={ illustrationImg } alt="Ilustração simbolizando perguntas e respostas" />
                    <strong>Crie salas de Q&amp;A ao vivo</strong>
                    <p>Tire as dúvidas da sua audiência em tempo real</p>
                </aside>

                <main className="main-content">
                    <ButtonToggle top={10} right={1310}/>
                    <div>
                        <img src={ logoImg } alt="Letmeask" />
                        <button onClick={ handleCreateRoom } className="create-room">
                            <img src={ googleIconImg } alt="logo do Google"/>
                            Crie sua sala com o Google 
                        </button>
                        <div className="separator">ou entre em uma sala</div>
                        <form onSubmit={ handleJoinRoom }>
                            <input 
                                type="text"
                                placeholder="Digite o código da sala"
                                onChange={ event => setRoomCode(event.target.value) }
                                value={ roomCode }
                            />
                            <Button type="submit" theme={ theme }>
                                Entrar na sala
                            </Button>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
};