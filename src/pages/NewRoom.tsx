import { Link, useHistory } from 'react-router-dom'; //para trabalhar com navegação de páginas usando link

import { FormEvent, useState, useContext } from 'react';

import { ThemeContext } from '../contexts/ThemeContext';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { ButtonToggle } from '../components/ButtonToggle';

import { database } from '../services/firebase';

import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';

import { ToastContainer } from 'react-toastify';

export function NewRoom() {
    const [newRoom, setNewRoom] = useState('');

    const { user } = useAuth();
    const history = useHistory();

    const { theme } = useContext(ThemeContext);

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault(); //para retirar evento padrão de formulário (reload da página)

        if(newRoom.trim() === '') { //trim() retira os espaços a direita e a esquerda
            return;
        }

        const roomRef = database.ref('rooms'); //representa a referência para um dado dentro do banco de dados
                                               //cria-se a "categoria" rooms dentro do banco de dados

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });

        history.push(`/admin/rooms/${firebaseRoom.key}`);
    };

    return(
        <div id={`page-auth-${theme}`}>
            <ToastContainer />
            <aside>
                <img src={ illustrationImg } alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>

            <main className="main-content">
            <ButtonToggle top={10} right={1310}/>
                <div>
                    <img src={ logoImg } alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={ handleCreateRoom }>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={ event => setNewRoom(event.target.value) }
                            value={ newRoom }
                        />
                        <Button type="submit" theme={ theme} >
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
};