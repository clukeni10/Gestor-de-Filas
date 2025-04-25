import { create } from "zustand"
import { DispenserOptionType } from "../types/DispenserOptionType"
import { PDFDocument, rgb, StandardFonts} from "pdf-lib"

const initialState: State = {
    options: [],
    selectedOption: null
}

interface State {
    options: DispenserOptionType[]
    selectedOption: DispenserOptionType | null
}

interface Actions{
    setSelectedOption: (option: DispenserOptionType) => void
    clearSelectedOption: () => void
    generateTicketPVC: (option: DispenserOptionType) => Promise<Uint8Array>
}

export const useOptionState = create<Actions & State>((set) => ({
    ...initialState,
    setSelectedOption:(selectedOption: DispenserOptionType) => set(() => {
        return ({selectedOption})
    }),
    clearSelectedOption: () => set(() => ({ selectedOption: null })),
    generateTicketPVC: async(option: DispenserOptionType) => {
        
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([300, 400]);
        
        // Get the standard font
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        
        // Set the font size and line height
        const fontSize = 12;
        const titleFontSize = 14;
        const ticketNumberFontSize = 36;
        
        // Define positions
        const { width, height } = page.getSize();
        const centerX = width / 2;
        
        // Add welcome text
        page.drawText(`Bem-Vindo a`, {
          x: centerX - helveticaFont.widthOfTextAtSize(`Bem-Vindo a`, fontSize) / 2,
          y: height - 40,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        
        // Add clinic name
        page.drawText("Clínica General Katondo" + '!', {
          x: centerX - helveticaFont.widthOfTextAtSize("Clínica General Katondo"  + '!', fontSize) / 2,
          y: height - 60,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        
        // Add "Serviço" text
        page.drawText('Serviço', {
          x: centerX - helveticaFont.widthOfTextAtSize('Serviço', fontSize) / 2,
          y: height - 100,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        
        // Add service type (ATENDIMENTO GERAL)
        page.drawText(option.name, {
          x: centerX - helveticaBold.widthOfTextAtSize(option.name, titleFontSize) / 2,
          y: height - 140,
          size: titleFontSize,
          font: helveticaBold,
          color: rgb(0, 0, 0),
        });
        
        // Add ticket number (A 20)
        page.drawText("ticketNumber", {
          x: centerX - helveticaBold.widthOfTextAtSize("ticketNumber", ticketNumberFontSize) / 2,
          y: height - 200,
          size: ticketNumberFontSize,
          font: helveticaBold,
          color: rgb(0, 0, 0),
        });
        
        // Add queue info
        const queueText = `10 pessoas à frente`;
        page.drawText(queueText, {
          x: centerX - helveticaFont.widthOfTextAtSize(queueText, fontSize) / 2,
          y: height - 230,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        
        // Add "thank you" message
        page.drawText('Obrigado por sua visita!', {
          x: centerX - helveticaFont.widthOfTextAtSize('Obrigado por sua visita!', fontSize) / 2,
          y: height - 280,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        
        // Add date and time
        const dateTimeText = `10:40`;
        page.drawText(dateTimeText, {
          x: centerX - helveticaFont.widthOfTextAtSize(dateTimeText, fontSize) / 2,
          y: height - 300,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        
        // Draw bottom line
        page.drawLine({
          start: { x: 20, y: height - 320 },
          end: { x: width - 20, y: height - 320 },
          thickness: 2,
          color: rgb(0, 0, 1), // Blue color
        });
        
        // Serialize the PDFDocument to bytes
        return await pdfDoc.save();
        
    },

        
 
}))