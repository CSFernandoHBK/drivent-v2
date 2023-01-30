import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentFromTicketId(req: AuthenticatedRequest, res: Response) {
    const {ticketId} = req.query

    if(!ticketId){
      return res.status(400).send(httpStatus.BAD_REQUEST)
    }

    try{
      return res.send()
    } catch(err){
      console.log(err)
    }
}

export async function newPayment(req: AuthenticatedRequest, res: Response){
  try{
  
  } catch(err){
    console.log(err)
  }
}