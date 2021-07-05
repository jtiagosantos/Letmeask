import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

type RoomCodeProps = {
    code: string;
    theme?: string;
};

export function RoomCode(props: RoomCodeProps) {
    
    //função para copiar para a área de transferência
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code);
        toast.success('Copiado para a área de transferência');
    };

    return(
        <>
            <ToastContainer />
            <button className={`room-code-${props.theme}`} onClick={ copyRoomCodeToClipboard }>
                <div>
                    <img src={ copyImg } alt="Copiar código da sala" />
                </div>
                <span>Sala #{ props.code }</span>
            </button>
        </>
    );
};