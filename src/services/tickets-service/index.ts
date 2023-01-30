import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";
import { exclude } from "@/utils/prisma-utils";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { Ticket } from "@prisma/client";

async function getTicketTypes(){
    const tickets = await ticketsRepository.findTicketTypes();

    if (!tickets) throw notFoundError();

    return tickets;
}

async function getTicketsByUser(userId: number){
    const enrollmentId = (await enrollmentRepository.findWithAddressByUserId(userId)).id;
    const userTickets = await ticketsRepository.getTicketsByUser(enrollmentId)
    const array = userTickets.map(async (u) => await processData(u))
    return array;
}

async function processData(u: Ticket){
    return {
        id: u.id,
        status: u.status,
        ticketTypeId: u.ticketTypeId,
        enrollmentId: u.enrollmentId,
        TicketType: await ticketsRepository.getTicketType(u.ticketTypeId),
        createdAt: u.createdAt,
        updatedAt: u.updatedAt
    }
}

async function postNewTicket(ticketTypeId: number, userId: number){
    const enrollmentId = (await enrollmentRepository.findWithAddressByUserId(userId)).id
    const newTicket = await ticketsRepository.postNewTicket(enrollmentId, ticketTypeId);
    const ticketType = await ticketsRepository.getTicketType(ticketTypeId)

    const object = {
        id: newTicket.id,
        status: newTicket.status,
        ticketTypeId: ticketTypeId,
        enrollmentId: enrollmentId,
        TicketType: ticketType,
        createdAt: newTicket.createdAt,
        updatedAt: newTicket.updatedAt
    }

    return (object)
}

const ticketsService = {
    getTicketTypes,
    getTicketsByUser,
    postNewTicket
}

export default ticketsService;