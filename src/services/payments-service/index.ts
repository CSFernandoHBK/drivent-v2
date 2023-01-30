import { PaymentInfo } from "@/controllers/payments-controller"
import { notFoundError } from "@/errors";
import paymentRepository from "@/repositories/payments-repository"


async function newPayment(paymentInfo: PaymentInfo){
    const response = await paymentRepository.newPayment(paymentInfo)

    if(!response){
        throw notFoundError();
    }

    await paymentRepository.updateTicket(paymentInfo.ticketId)

    return response;
}

async function checkPayment(ticketId: number){
    const result = await paymentRepository.checkPayment(ticketId)
    
    if(!result){
        throw notFoundError();
    }
    
    return result
}

const paymentService = {
    newPayment,
    checkPayment
}

export default paymentService