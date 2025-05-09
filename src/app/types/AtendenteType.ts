import { Timestamp } from "firebase/firestore";

export type AtendenteType = {
    id: string
    nome: string
    email: string
    senha:string
    lastLogin?: Timestamp
    updatedAt?: Timestamp;
    createdAt?: Timestamp
    
}