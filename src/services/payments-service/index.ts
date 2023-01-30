import { PaymentInfo } from "@/controllers/payments-controller"
import { notFoundError } from "@/errors";
import paymentRepository from "@/repositories/payments-repository"


async function newPayment(paymentInfo: PaymentInfo){
    const response = await paymentRepository.newPayment(paymentInfo)

    if(!response){
        throw notFoundError();
    }

    return response;
}

async function checkPayment(){

}

const paymentService = {
    newPayment,
    checkPayment
}

export default paymentService