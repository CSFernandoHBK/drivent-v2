import { prisma } from "@/config";
import dayjs from "dayjs";
import { PaymentInfo } from "@/controllers/payments-controller"
import ticketsRepository from "../tickets-repository";

async function newPayment(paymentInfo: PaymentInfo){
    const ticketInfo = await ticketsRepository.getTicketById(paymentInfo.ticketId)

    if(!ticketInfo){
        return undefined
    }

    const ticketTypeInfo = await ticketsRepository.getTicketType(ticketInfo.ticketTypeId)

    return prisma.payment.create({
        data:{
           "ticketId": paymentInfo.ticketId,
           "value": ticketTypeInfo.price,
           "cardIssuer": paymentInfo.cardData.issuer,
           "cardLastDigits": paymentInfo.cardData.number.slice(paymentInfo.cardData.number.length - 4) 
        }
    })
}

async function checkPayment(ticketId: number){
    return await prisma.payment.findFirst({
        where: {
            ticketId: ticketId
        }
    })
}

async function updateTicket(ticketId: number) {
    await prisma.ticket.update({
        where: {
            id: ticketId
        },
        data: {
            status: "PAID"
        }
    })
}

const paymentRepository = {
    newPayment,
    checkPayment,
    updateTicket
}

export default paymentRepository