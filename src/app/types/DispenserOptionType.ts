import { Timestamp } from "firebase/firestore";

export type DispenserOptionType = {
    id: string
    label: string
    nome: string
    updatedAt?: Timestamp;
    createdAt?: Timestamp
}

