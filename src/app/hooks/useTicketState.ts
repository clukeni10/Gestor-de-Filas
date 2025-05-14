import { create } from "zustand";
import { DispenserOptionType } from "../types/DispenserOptionType";

interface TicketStore {
  selectedOption: DispenserOptionType | null;
  ticketNumber: string;
  setTicketNumber: (number: string) => void;
  setSelectedOption: (option: DispenserOptionType) => void;
}

export const useTicketStore = create<TicketStore>((set) => ({
  selectedOption: null,
  ticketNumber: "",
  setTicketNumber: (number) => set({ ticketNumber: number }),
  setSelectedOption: (option) => set({ selectedOption: option }),
}));

