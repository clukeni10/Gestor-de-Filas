import { collection, addDoc, doc, getDocs, updateDoc, deleteDoc, } from 'firebase/firestore';
import { database } from "./firebase";
import { DispenserOptionType } from '../types/DispenserOptionType';

export const addOption = async (nome: string, label: string) => {
      const data = {
            nome,
            label,
            createdAt: new Date(),
            updatedAt: new Date(),
      };

      return await addDoc(collection(database, "opções-dispenser"), data);
};

export const getAllOptions = async (): Promise<DispenserOptionType[]> => {
      const snapshot = await getDocs(collection(database, "opções-dispenser"));
      return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as DispenserOptionType[];
};


export const editOption = async (id:string, nome:string, label:string) => {
      const data = {
            nome,
            label,
            updatedAt: new Date(),
      };

      const optionRef = doc(database, "opções-dispenser", id);
      return await updateDoc(optionRef, data);
};

export const deleteOption = async (id: string) => {
    const optionRef = doc(database, "opções-dispenser", id);
    return await deleteDoc(optionRef);
  };