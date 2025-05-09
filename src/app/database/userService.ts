import { collection, addDoc, doc, getDocs, updateDoc, deleteDoc, } from 'firebase/firestore';
import { database } from "./firebase";
import { AtendenteType } from '../types/AtendenteType';

export const addAtendente = async (nome: string, email: string, senha: string) => {
    const data = {
        nome,
        email,
        senha,
        createdAt: new Date(),
        lastLogin: new Date(),
        updatedAt: new Date(),
    };

    return await addDoc(collection(database, "atendentes"), data);
};

export const getAllAtendentes = async (): Promise<AtendenteType[]> => {
    const snapshot = await getDocs(collection(database, "atendentes"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as AtendenteType[];
  };


export const editAtendente = async (id: string, nome: string, email: string, senha: string) => {
    const data = {
        nome,
        email,
        senha,
        lastLogin: new Date(),
        updatedAt: new Date(),
    };

    const atendenteRef = doc(database, "atendentes", id);
    return await updateDoc(atendenteRef, data);
};

export const deleteAtendente = async (id: string) => {
    const atendenteRef = doc(database, "atendentes", id);
    return await deleteDoc(atendenteRef);
  };