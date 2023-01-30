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
      return res.sendStatus(500)
    }
  }
  
export async function getTicketsForUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
    try{
      const tickets = await ticketsService.getTicketsByUser(userId)
      if(tickets.length===0){
        return res.sendStatus(404)
      }
      return res.status(200).send(tickets[0])
    } catch(err){
      console.log(err)
      return res.sendStatus(500)
    }
}

export async function postNewTicket(req: AuthenticatedRequest, res: Response){
  const { userId } = req;
  const ticketTypeId = req.body.ticketTypeId as number;

  if(!ticketTypeId){
    return res.status(400).send(httpStatus[400])
  }

  try{
    const newTicket = await ticketsService.postNewTicket(ticketTypeId, userId)
    return res.status(201).send(newTicket)
  } catch(err){
      console.log(err)
      return res.sendStatus(500)
  }
}