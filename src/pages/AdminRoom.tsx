import { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ThemeContext } from '../contexts/ThemeContext';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { ButtonToggle } from '../components/ButtonToggle';

import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import { ModalContext } from '../contexts/ModalContext';

import '../styles/room.scss';

type RoomParams = {
    id: string
};

export function AdminRoom() {
    const { setOpenModal, deleteQuestion, setDeleteQuestion, storageId, setStorageId } = useContext(ModalContext);

    const history = useHistory();

    const params = useParams<RoomParams>();
    const roomId = params.id;

    const { questions, title } = useRoom(roomId);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if(deleteQuestion) {
            (async () => {
                await database.ref(`rooms/${storageId.roomId}/questions/${storageId.questionId}`).remove();
                setDeleteQuestion(false);
            })();
        }
    }, [deleteQuestion]);

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });

        history.push('/');
    };

    async function handleModalAndId(questionId: string) {
        setOpenModal(true);
        setStorageId({questionId, roomId});
    };

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        });
    };

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        });
    };

    return(
        <div id={`page-room-${theme}`}>
            <header>
                <div className="content">
                    <img src={ logoImg } alt="Letmeask" />
                    <div>
                        <RoomCode code={ roomId } theme={ theme } />
                        <Button isOutlined onClick={ handleEndRoom }>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <ButtonToggle top={10} right={1310}/>

            <main>
                <div className="room-title">
                    <h1>Sala { title }</h1>
                    { questions.length > 0 && <span>{ questions.length } pergunta(s)</span> }
                </div>


                <div className="question-list">
                    { questions.map(question => {
                        return(
                            <Question 
                                key={ question.id }
                                content={ question.content }
                                author={ question.author }
                                isAnswered={ question.isAnswered }
                                isHighlighted={ question.isHighlighted }
                            >
                                { !question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={ () => handleCheckQuestionAsAnswered(question.id) }
                                        >
                                            <img src={ checkImg } alt="Marcar pergunta como respondida" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={ () => handleHighlightQuestion(question.id) }
                                        >
                                            <img src={ answerImg } alt="Dar destaque à pergunta" />
                                        </button>
                                    </>
                                ) }
                                <button
                                    type="button"
                                    onClick={ () => handleModalAndId(question.id) }
                                >
                                    <img src={ deleteImg } alt="Remover pergunta" />
                                </button>
                            </Question>
                        );
                    }) }
                </div>
            </main>
        </div>
    );
};