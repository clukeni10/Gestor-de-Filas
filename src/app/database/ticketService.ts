import { collection, addDoc, Timestamp, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { database } from "./firebase";
import { DispenserOptionType } from "../types/DispenserOptionType";
import { getOptionLabel } from "./optionService";


export interface Ticket {
    id: string;
    nome: string;
    numero: string;
    dataHora: Timestamp;
    status: string;
}


export const saveTicket = async (option: DispenserOptionType, numero: string) => {
    try {
        await addDoc(collection(database, "tickets"), {
            nome: option.nome,
            numero: numero,
            dataHora: Timestamp.now(),
            status: "pendente" // 👈 adiciona este campo aqui
        });
        console.log("Ticket salvo com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar o ticket:", error);
    }
};


export const generateNextTicketNumber = async (nome: string): Promise<string> => {


    const optionsMap = await getOptionLabel();

    const letra = optionsMap[nome];
    if (!letra) throw new Error(`Não foi encontrada uma letra para o nome: ${nome}`);

    const q = query(
        collection(database, "tickets"),
        where("numero", ">=", `${letra}0`),
        where("numero", "<", `${String.fromCharCode(letra.charCodeAt(0) + 1)}0`),
        orderBy("numero", "desc"),
        limit(1)
    );

    const snapshot = await getDocs(q);

    let next = 1;
    if (!snapshot.empty) {
        const lastNumero = snapshot.docs[0].data().numero;
        const match = lastNumero.match(/^([A-E])(\d+)$/);
        if (match) next = parseInt(match[2]) + 1;
    }

    return `${letra}${next}`;
};

export async function fetchTicketsAgrupados() {
  const q = query(collection(database, "tickets"), where("status", "==", "pendente"));
  const snapshot = await getDocs(q);

  const agrupado: { [letra: string]: Ticket[] } = {};

  snapshot.forEach(doc => {
    const data = doc.data() as Ticket;
    const letra = data.numero.charAt(0); // assume que o número começa com "A101", "B002", etc.

    if (!agrupado[letra]) {
      agrupado[letra] = [];
    }

    agrupado[letra].push({ ...data, id: doc.id });
  });

  return agrupado;
}