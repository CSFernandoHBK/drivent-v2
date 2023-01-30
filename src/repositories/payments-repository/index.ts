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

async function checkPayment(){

}

const paymentRepository = {
    newPayment,
    checkPayment
}

export default paymentRepository