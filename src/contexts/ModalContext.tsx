import { createContext, ReactNode, useState } from "react";

type storageIdType = {
    questionId: string;
    roomId: string;
};

type ModalContextType = {
    openModal: boolean;
    deleteQuestion: boolean;
    storageId: storageIdType;
    setOpenModal: (boolean: boolean) => void;
    setDeleteQuestion: (boolean: boolean) => void;
    setStorageId: (storageIdType: storageIdType) => void;
};

type ModalContextProviderProps = {
    children: ReactNode
};

export const ModalContext = createContext({} as ModalContextType);

export function ModalContextProvider(props: ModalContextProviderProps) {
    const [openModal, setOpenModal] = useState(false);
    const [deleteQuestion, setDeleteQuestion] = useState(false);
    const [storageId, setStorageId] = useState({questionId: '', roomId: ''});

    return(
        <ModalContext.Provider value={{ openModal, deleteQuestion, setOpenModal, setDeleteQuestion, storageId, setStorageId }}>
            { props.children }
        </ModalContext.Provider>
    );
};