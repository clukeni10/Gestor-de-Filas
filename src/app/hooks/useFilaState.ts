import { create } from 'zustand';

interface Ticket {
  id: string;
  operation: string; // ex: "Consulta", "Pediatria"
  time: string;
  date: string;
}

interface FilaState {
  fila: Ticket[];
  addTicket: (senha: Ticket) => void;
  nextTicket: () => Ticket | undefined;
}

export const useFilaStore = create<FilaState>((set) => ({
  fila: [],
  addTicket: (senha) =>
    set((state) => ({ fila: [...state.fila, senha] })),
  nextTicket: () => {
  let ticketRemovido: Ticket | undefined;

  set((state) => {
    const [primeira, ...resto] = state.fila;
    ticketRemovido = primeira;
    return { fila: resto };
  });

  return ticketRemovido;
},
}),

);