import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import { Response, Request } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";

export async function getTicketTypes(req: Request, res: Response) {
    try{
        const types = await ticketsService.getTicketTypes();
        return res.status(httpStatus.OK).send(types)
    } catch(err){
      console.log(err)
    }
  }
  
export async function getTicketsForUser(req: AuthenticatedRequest, res: Response) {
    try{


        return res.send()
    } catch(err){
      console.log(err)
    }
}