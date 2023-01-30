import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import paymentService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";
import { paymentValidationSchema } from "@/schemas/payment-schemas";

export async function checkPayment(req: AuthenticatedRequest, res: Response) {
    const {ticketId} = req.query

    if(!ticketId){
      return res.sendStatus(400)
    }

    try{
      return res.send()
    } catch(err){
      console.log(err)
    }
}

export type PaymentInfo = {
	ticketId: number,
	cardData: {
		issuer: string,
    number: string,
    name: string,
    expirationDate: Date,
    cvv: string
	}
}

export async function newPayment(req: AuthenticatedRequest, res: Response){
  const paymentInfo: PaymentInfo = req.body;

  const {error} = paymentValidationSchema.validate(req.body, {abortEarly: false});

  if (error){
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
  }

  try{
    const response = await paymentService.newPayment(paymentInfo);
    return res.send(response)
  } catch(err){
    console.log(err)
    if(err.name==="NotFoundError"){
      return res.status(404).send(err.message)
    }
    return res.sendStatus(500)
  }
}
