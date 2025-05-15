import { Timestamp } from "firebase/firestore";

export type TicketType = {
      id: string;
      nome: string;
      label: string;
      status: "pendente" | "atendendo";
      horaData: Timestamp;
}